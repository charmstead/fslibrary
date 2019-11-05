import Animate from './animate'
import { once } from '../js/util/index';

class FsLibrary {

    constructor(cms_selector: string) {

        this.cms_selector = cms_selector;

    }

    private cms_selector: string;

    private animation: Animatn = {
        enable: true,
        duration: 250,
        easing: 'ease-in-out',
        effects: 'translate(0px,0px)',
        queue: true
    };

    private addClass: boolean;

    private addClassConfig: AddClass;

    private animationStyle: string = `
        

    @keyframes fade-in {
        0% {
            opacity: 0;
           transform:{{transform}};
        }
        100% {
            transform:translate(0) rotate3d(0) rotate(0) scale(1);
            opacity: 1;
        }
      }
      
      .fslib-fadeIn {
        animation-name: fade-in;
        animation-duration: {{duration}}s;
        animation-iteration-count: 1;
        animation-timing-function: {{easing}};
        animation-fill-mode: forwards;
      }
`;


    private makeStyleSheet({ duration = 1, easing = 'ease-in-out', transform = 'translate(0)' }) {

        this.animationStyle = this.animationStyle.replace('{{duration}}', '' + duration);
        this.animationStyle = this.animationStyle.replace('{{ease}}', easing);
        this.animationStyle = this.animationStyle.replace('{{transform}}', transform);

        const head = document.head || document.getElementsByTagName('head')[0];
        const style: any = document.createElement('style');
        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = this.animationStyle;
        } else {
            style.appendChild(document.createTextNode(this.animationStyle));
        }

        return style;
    }

    /**
     * Combine all the collection items into one collection.
     */
    public combine() {

        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(this.cms_selector));

        //copies the cms items into the first collection list
        master_collection[0].innerHTML = (
            [...master_collection].reduce((curr, items) => {
                //gets all the items  
                return [...curr, ...items.innerHTML]
            }, []).join("")
        )

        //deletes the rest collection list
        master_collection.forEach((elem: Element, i: number) => {
            if (i > 0) {
                elem.outerHTML = ""
            }
        })


    }



    public loadmore(config: LoadMore = { button: "", actualLoadMore: false, initialLoad: 12, loadPerClick: 12, animation: this.animation }): void {


        if (!config.actualLoadMore) return;


        if (config.animation) {
            const effects = config.animation.effects.replace('fade', '');
            let { duration, easing } = config.animation;
            duration = duration ? duration / 1000 : 1;
            easing = easing || 'linear';
            this.makeStyleSheet({ duration, easing, transform: effects })

        }
        else {
            this.makeStyleSheet({});
        }

        const parent: any = document.querySelector(this.cms_selector);
        const collection: any[] = [].slice.call(parent.children);
        const clone: any[] = [].slice.call(parent.cloneNode(true).children);

        const { button, actualLoadMore, initialLoad, loadPerClick } = config;

        let reserve = [];
        reserve = clone.filter((child, i) => {

            if (i < initialLoad) {
                return false;
            }

            collection[i].outerHTML = "";
            return true;
        });

        (<any>document.querySelector(button)).onclick = () => {
            const addon = reserve.splice(0, loadPerClick);
            addon.map((elem) => {
                elem.classList.add('fslib-fadeIn')

                once(elem, whichAnimationEvent(), ({type}) => {
                    elem.classList.remove('fslib-fadeIn')
                })
                
                document.querySelector(this.cms_selector).appendChild(elem);
            })

            if (this.addClass) {
                this.addClasses(this.addClassConfig);
            }

            if (reserve.length == 0) {
                (<any>document.querySelector(button)).style.display = 'none';
            }
        }



    }


    /**
     * 
     * @param container The css selector of the parent container elem of the list you want to add classnames to.
     * @param config  defined as
     *  {
     *     classNames: Array<AltClass>; //list of classnames you want to add
     *     frequency: number; //The frequency or order of addition of class to the list
     *     start: number; //position of list item to start with
     * }
     */
    public addClasses(config: AddClass = { classNames: [], frequency: 2, start: 1 }): void {
        const parent: any = document.querySelector(this.cms_selector);
        const { frequency, start, classNames } = config;

        this.addClassConfig = config;
        this.addClass = true;

        if (frequency < 0) {
            throw "unaccepted value passed as frequency";
        }
        else if (start < 1) {
            throw "unaccepted value passed as start";
        }

        classNames.map(({ target, alt }) => {
            const list = parent.querySelectorAll(target);
            for (let j = start - 1; j < list.length; j += frequency) {

                const addon = alt.replace(/\./g, "")
                if (list[j].className.indexOf(addon) < 0) {
                    list[j].className += " " + addon
                }

                if (frequency == 0) {
                    break;
                }
            }
        })
    }


    /**
     * 
     * @param cms_selector 
     */
    public cmsfilter(config = { cms_filter: [], filter_type: 'single', animation: this.animation }) {

        let { cms_filter, filter_type, animation } = config;

        animation = {...this.animation,...animation};

        filter_type = filter_type ? filter_type : (typeof cms_filter == 'string') ? 'single' : 'multi';

        const self = this;
        if (animation) {
            animation.enable = !/^false$/.test(String(animation.enable));
            const effects = animation.effects.replace('fade', '');
            animation.effects = effects;

            if (animation.effects.indexOf('translate') < 0) {
                animation.effects += ' translate(0px,0px)  '
            }
            this.animation = animation;
        }
        animation = this.animation;

        let filterActive = false;
        let filterQueue = [];
        let filter: Array<{ [key: string]: string }> = []//2D array to hold categories of filter selectors and their corresponding

        //get all collections

        const get_cms_items: any = () => [].slice.call(document.querySelectorAll(this.cms_selector));

        let filter_group: any[] = [];
        let resetButtonIndex;

        if (Array.isArray(cms_filter)) {
            cms_filter.map((val, index) => {
                let prevClicked;
                const { filter_option } = val;

                filter_group = [].slice.call(document.querySelectorAll(`${(<any>val).filter_group} [data-search]`));
                assignChangeEventToButtons(index, prevClicked, filter_option)

            })
        }
        else if (typeof cms_filter == "string") {
            let prevClicked;
            filter_group = [].slice.call(document.querySelectorAll(`${cms_filter} [data-search]`));
            assignChangeEventToButtons(0, prevClicked)
        }
        else {
            throw "Incorrect type passed as cms_filter"
        }

        function conditionalReset(filter_text,index){
            const isEmpty = !filter_text.trim();
            const tag=Object.values(filter[index]);

            if(isEmpty && tag.includes(filter_text)){
                return false;
            }

            if(isEmpty && !tag.length){
                return false;
            }
            return true;
        }

        function assignChangeEventToButtons(index, prevClicked, filter_option = filter_type) {
            filter[index] = {} //initialise default values
            filter_group.map((elem, j) => {
                const id = `${index}${j}`;
                const tag_element = elem && elem.tagName;

                let filter_text;

                if (tag_element == "SELECT") {
                    (<any>elem).onchange = function (event) {

                        filter_text = event.currentTarget.selectedOptions[0].getAttribute("data-search") || '';

                        conditionalReset(filter_text,index) && initFilter({ filter_option, id, index, filter_text })

                    }
                }
                else if (tag_element == "INPUT") {//handle checkbox and radio button
                    (<any>elem).onchange = function (event) {
                        filter_text = event.currentTarget.getAttribute("data-search") || '';

                        if (!event.target.checked) {
                            filter_text = '';
                        }

                        conditionalReset(filter_text,index) && initFilter({ filter_option, id, index, filter_text })
                        

                    }
                }
                else {
                    (<any>elem).onclick = function (event) {
                        const active = event.currentTarget.className;

                        //only one element should have active class for or
                        if (/^single$/i.test(filter_type) || /^single$/i.test(filter_option)) {
                            if (prevClicked) prevClicked.classList.remove("active")
                        }

                        prevClicked = event.currentTarget;

                        if (active.includes("active")) {
                            prevClicked.classList.remove("active")
                        }
                        else {
                            prevClicked.classList.add("active")
                        }

                        filter_text = prevClicked.getAttribute("data-search") || '';

                        //prevent further filter if filter is empty and reset button is clicked.

                        conditionalReset(filter_text,index) && initFilter({ filter_option, id, index, filter_text })

                    }
                }
            })
        }

        const initFilter = ({ filter_option, id, index, filter_text }) => {
            if (animation.queue && filterActive) {
                return filterQueue.push(() => filterHelper({ filter_option, id, index, filter_text }));
            }

            return filterHelper({ filter_option, id, index, filter_text })
        }

        const filterHelper = ({ filter_option, id, index, filter_text }) => {
            filterActive = true;

            if (/^single$/i.test(filter_type) || /^single$/i.test(filter_option)) {

                //checks if it has previously been clicked                
                if (id in filter[index]) {
                    delete filter[index][id];
                }
                else {
                    filter[index] = {};
                    filter[index][id] = filter_text;
                }

            }
            else {//it is definitely "multi"

                //checks if it has previously been clicked
                if (id in filter[index]) {

                    delete filter[index][id];
                }
                else {
                    filter[index][id] = filter_text;
                }

            }
            //try to fix queue here
            if (animation.enable) {
                const target = document.querySelector(this.cms_selector);
                Animate.methods.animate(findAndMatchFilterText, target, animation).then(() => {
                    filterActive = false;
                    const nextAnimation = filterQueue.shift();
                    if (nextAnimation) {
                        nextAnimation.call(null);
                    }

                });
            }
            else {
                findAndMatchFilterText();
            }

        }


        const findAndMatchFilterText = () => {
            // filterActive = true;
            const master_collection = get_cms_items();
            master_collection.map((elem, i) => {

                const search_result = filter.reduce((curr, search) => {

                    //creating a regex to test against
                    const val = `(${Object["values"]((search)).join("|")})`;

                    const result = [].slice.call(elem.children).map((item, j) => {

                        const re = new RegExp(val, "i");
                        const valid = re.test(item.textContent);

                        const clonedItem = item.cloneNode(true);

                        if (valid) {
                            clonedItem.style.display = "block"
                        }
                        else {
                            clonedItem.style.display = "none"
                        }

                        // return clonedItem.outerHTML;
                        return clonedItem;
                    })

                    if (curr.length < 1) {
                        return result;
                    }

                    // return [...curr.filter((a) => result.includes(a))]

                    //intersections of the results
                    return [...curr.map((a, index) => {
                        if (a.style.display !== result[index].style.display) {
                            a.style.display = "none";
                        }
                        return a;
                    })]

                }, [])//.join("").trim()

                if (search_result.length > 1) {
                    [].slice.call(master_collection[i].children)
                        .map((child, k) => {
                            child.style.display = search_result[k].style.display;
                        });

                }

            })
        }
    }
}

interface AltClass {
    target: string;
    alt: string
}

interface LoadMore {
    button: string;
    actualLoadMore: boolean;
    initialLoad: number;
    loadPerClick: number;
    animation?: Animatn
}

interface AddClass {
    classNames: Array<AltClass>; //list of classnames you want to add
    frequency: number; //The frequency or order of addition of class to the list
    start: number; //position of list item to start with
}

interface FilterGroup {
    filter_group: string;
    filter_option: string
}

interface Animatn {
    enable?: boolean;
    easing?: string;
    duration?: number;
    effects?: string;
    queue?: boolean
}


interface Filter {
    cms_filter: FilterGroup[] | string;
    filter_type: string;
}


// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent() {
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

function whichAnimationEvent() {
    var t,
        el = document.createElement("fakeelement");

    var animations = {
        "animation": "animationend",
        "OAnimationn": "oAnimationnEnd",
        "MozAnimationn": "animationnend",
        "WebkitAnimationn": "webkitAnimationnEnd"
    }

    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

(window as any).FsLibrary = FsLibrary;