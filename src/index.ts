class fsLibrary {

    constructor(cms_selector: string, animation?: Animatn) {

        this.cms_selector = cms_selector;

        if (animation) {
            animation.enable = !/^false$/.test(String(animation.enable));
            this.animation = animation;

            const effects = animation.effects.replace('fade', '');
            const { duration, easing } = animation;
            this.makeStyleSheet({ duration, easing, transform: effects })

        }
        else {
            this.makeStyleSheet({});
        }
    }

    private cms_selector: string;

    private animation: Animatn = {
        enable: true,
        duration: 250,
        easing: 'ease-in-out',
        effects: 'fade'
    };

    private initialLayoutMode;

    private addClass: boolean;

    private addClassConfig: AddClass;

    private animationStyle: string = `
        
        .fslib-normal{
            position:relative;
        }
        .fslib-normal div{
            -webkit-transition: all {{duration}}ms {{ease}};
            -moz-transition: all {{duration}}ms {{ease}};
            -o-transition: all {{duration}}ms {{ease}};
            transition: all {{duration}}ms {{ease}};
        }
        

        .fslib-transform{
            transform:{{transform}};
        }
        
    
          @keyframes fade-in {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
          }
          
          .fslib-fadeIn {
            animation-name: fade-in;
            animation-duration: 1s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
    `;

    private makeStyleSheet({ duration = 250, easing = 'ease-in-out', transform = 'translate(0)' }) {

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



    public loadmore(config: LoadMore = { button: "", actualLoadMore: true, initialLoad: 12, loadPerClick: 12 }): void {
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

    private setInitialLayoutMode() {

        const get_cms_items: any = () => [].slice.call(document.querySelectorAll(this.cms_selector));

        //storing initial layoutMode
        this.initialLayoutMode = this.getLayoutMode();
    }

    private getLayoutMode() {

        const get_cms_items: any = () => [].slice.call(document.querySelectorAll(this.cms_selector));
        return (
            get_cms_items().map((elem, i) => {

                return (
                    [].slice.call(elem.children).map((item, j) => {
                        const coordinates = item.getBoundingClientRect();
                        return {
                            x: coordinates.left,
                            y: coordinates.top
                        };
                    }))
            })
        );
    }

    /**
     * 
     * @param cms_selector 
     */
    public cmsfilter(cms_filter = [], filter_type = 'single') {
        const animation = this.animation;

        let filter: Array<{ [key: string]: string }> = []//2D array to hold categories of filter selectors and their corresponding

        //get all collections

        const get_cms_items: any = () => [].slice.call(document.querySelectorAll(this.cms_selector));

        if (!this.initialLayoutMode) {
            this.setInitialLayoutMode();
        }

        let filter_group: any[] = [];

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


        function assignChangeEventToButtons(index, prevClicked, filter_option = filter_type) {
            filter[index] = {} //initialise default values
            filter_group.map((elem, j) => {
                const id = `${index}${j}`;
                const tag_element = elem && elem.tagName;

                if (tag_element == "SELECT") {
                    (<any>elem).onchange = function (event) {
                        let filter_text = event.currentTarget.selectedOptions[0].getAttribute("data-search") || '';

                        filterHelper({ filter_option, id, index, filter_text })
                    }
                }
                else if (tag_element == "INPUT") {//handle checkbox and radio button
                    (<any>elem).onchange = function (event) {
                        let filter_text = event.currentTarget.getAttribute("data-search") || '';

                        if (!event.target.checked) {
                            filter_text = '';
                        }
                        filterHelper({ filter_option, id, index, filter_text })
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

                        let filter_text = prevClicked.getAttribute("data-search") || '';
                        filterHelper({ filter_option, id, index, filter_text })
                    }
                }
            })
        }


        function filterHelper({ filter_option, id, index, filter_text }) {

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
            findAndMatchFilterText();

        }


        const findAndMatchFilterText = () => {
            const lastLayoutMode = this.getLayoutMode();
            const master_collection = get_cms_items();
            master_collection.map((elem, i) => {


                if (!elem.classList.contains('fslib-normal')) {
                    elem.classList.add('fslib-normal')
                }


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

                let pos = 0;

                if (search_result.length > 1) {
                    [].slice.call(master_collection[i].children)
                        .map((child, k) => {

                            if (!animation.enable) {
                                child.style.display = search_result[k].style.display;
                                return;
                            }
                            child.addEventListener("transitionend", (evt) => {
                                if (search_result[k].style.display == 'none') {
                                    child.style.position = 'absolute';
                                    child.classList.remove('fslib-transform')

                                }
                                else {
                                    child.style.position = 'static';

                                }
                            });



                            if (search_result[k].style.display == 'none') {
                                child.classList.add('fslib-transform')
                                child.style.opacity = '0'
                            }
                            else {

                                const lastX = this.initialLayoutMode[i][pos].x;
                                const lastY = this.initialLayoutMode[i][pos].y;

                                const childDeltaX = lastX - lastLayoutMode[i][k].x
                                const childDeltaY = lastY - lastLayoutMode[i][k].y;

                                requestAnimationFrame(() => {
                                    child.style.opacity = '1'

                                });


                                console.log(k)

                                child.animate([
                                    { transform: `none` },
                                    { transform: `translate(${childDeltaX}px, ${childDeltaY}px)` }
                                ], { duration: animation.duration, easing: animation.easing });




                                pos++;
                            }

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
    loadPerClick: number
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
}


interface Filter {
    cms_filter: FilterGroup[] | string;
    filter_type: string;
}

function getAbsoluteBoundingRect(el) {
    var doc = document,
        win = window,
        body = doc.body,

        // pageXOffset and pageYOffset work everywhere except IE <9.
        offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
            (<any>(doc.documentElement || body.parentNode || body)).scrollLeft,
        offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
            (<any>(doc.documentElement || body.parentNode || body)).scrollTop,

        rect = el.getBoundingClientRect();

    if (el !== body) {
        var parent = el.parentNode;

        // The element's rect will be affected by the scroll positions of
        // *all* of its scrollable parents, not just the window, so we have
        // to walk up the tree and collect every scroll offset. Good times.
        while (parent !== body) {
            offsetX += parent.scrollLeft;
            offsetY += parent.scrollTop;
            parent = parent.parentNode;
        }
    }

    return {
        bottom: rect.bottom + offsetY,
        height: rect.height,
        left: rect.left + offsetX,
        right: rect.right + offsetX,
        top: rect.top + offsetY,
        width: rect.width
    };
}