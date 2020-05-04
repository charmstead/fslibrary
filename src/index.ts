import Animate from './animate'
import { once } from '../js/util/index';
import { registerListener, isInViewport, isVisible, createDocument, escapeRegExp } from './utility';



class FsLibrary {

    constructor(cms_selector: string, opt: LazyLoad = { type: 1, className: "image" }) {

        //   this.lazyLoadOpt={type:1,...opt};
        opt && this.lazyLoad(cms_selector, opt.className)

        this.cms_selector = cms_selector;

    }
    private indexSet: boolean;

    private cms_selector: string;

    private animation: Animatn = {
        enable: true,
        duration: 250,
        easing: 'ease-in-out',
        effects: 'translate(0px,0px)',
        queue: true
    };

    private addClass: boolean;
    private index: number = 0;

    private hidden_collections: any[];

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

    private tinyImgBase64 = `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`;


    private reinitializeWebflow() {
        (<any>window).Webflow.destroy();
        (<any>window).Webflow.ready();
        (<any>window).Webflow.require("ix2").init();
    }

    private lazyLoad(cms_selector, className) {

        let lazy: any = [];
        registerListener('load', setLazy);
        registerListener('load', lazyLoad);
        registerListener('scroll', lazyLoad);
        registerListener('resize', lazyLoad);

        function setLazy() {
            lazy = [].slice.call(document.querySelectorAll(`${cms_selector} .${className}`));

        }

        function lazyLoad() {
            for (var i = 0; i < lazy.length; i++) {
                if (isInViewport(lazy[i])) {

                    // if (lazy[i].getAttribute('data-src')){
                    //     lazy[i].src = lazy[i].getAttribute('data-src');
                    //     lazy[i].removeAttribute('data-src');
                    // }

                    if (lazy[i].classList.contains(className)) {
                        lazy[i].classList.remove(className)
                    }
                }
            }

            cleanLazy();
        }

        function cleanLazy() {
            // lazy = [].filter.call(lazy, function(l){ return l.getAttribute('data-src');});
            lazy = [].filter.call(lazy, (elem) => {
                return elem.classList.contains(className)
            });
        }

    }


    private makeStyleSheet({ duration = 1, easing = 'ease-in-out', transform = 'translate(0)' }) {

        this.animationStyle = this.animationStyle.replace('{{duration}}', '' + duration);
        this.animationStyle = this.animationStyle.replace('{{ease}}', easing);
        this.animationStyle = this.animationStyle.replace('{{transform}}', transform);

        const head = document.head || document.getElementsByTagName('head')[0];
        const lazyLoadCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.css">`;
        head.innerHTML += lazyLoadCss;
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

    private setNextButtonIndex() {

        const cmsList = document.querySelectorAll(this.cms_selector);

        for (let i = 0; i < cmsList.length; i++) {
            const nextSibling = cmsList[i].nextElementSibling;
            if (nextSibling && isVisible(nextSibling) && nextSibling.querySelector('w-pagination-next')) {
                this.index = i;
            }
        }
        this.indexSet = true;

    }

    /**
     * Combine all the collection items into one collection.
     */
    public combine() {
        this.setNextButtonIndex();
        //get all collections
        const visible_collection: any = [].slice.call(document.querySelectorAll(this.cms_selector)).filter(isVisible);
        let nextButton = null;

        //copies the cms items into the first collection list
        visible_collection[0].innerHTML = (
            visible_collection.reduce((curr, item) => {
                //gets all the items  
                const aNextButton = item.nextElementSibling;
                if (aNextButton && isVisible(aNextButton) && !nextButton) {
                    nextButton = aNextButton.outerHTML;
                }
                return [...curr, item.innerHTML];
            }, []).join("")
        );

        if (nextButton) {
            nextButton.outerHTML = nextButton.outerHTML + nextButton;
        }

        //deletes the rest collection list
        visible_collection.forEach((elem: Element, i: number) => {
            if (i > 0) {
                elem.parentElement.outerHTML = "";
            }
        })


    }

    private getMasterCollection() {
        return document.querySelector(this.cms_selector)
    }

    private getNextData(url) {
        return new Promise((resolve) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();
            xhr.onload = () => {

                if (xhr.status == 200) {
                    // done(xhr.response);
                    return resolve(xhr.response);
                }
            };
        })
            .then(res => res)
    }

    private appendPaginatedData(data: string) {
        const newDoc = createDocument(data, "newDoc" + Date.now());
        const collection = newDoc.querySelectorAll(this.cms_selector)[this.index];
        const paginationWrapper = newDoc.querySelectorAll('.w-pagination-wrapper')[this.index];
        const nextHref = paginationWrapper.querySelector(".w-pagination-next");
        collection && this.appendToCms(collection.children);
        nextHref ? this.setLoadmoreHref((<any>nextHref).href) : this.setLoadmoreHref('');

        if (!this.hidden_collections.length && !nextHref) {
            (<any>document.querySelector('.w-pagination-wrapper')).outerHTML = ''
        }

        this.reinitializeWebflow();

    }

    private appendToCms(collection) {
        const master_collection = this.getMasterCollection();

        [].slice.call(collection).forEach(element => {
            element.classList.add('fslib-fadeIn')

            once(element, whichAnimationEvent(), ({ type }) => {
                element.classList.remove('fslib-fadeIn')
            });

            master_collection.appendChild(element);
            if (this.addClass) {
                this.addclasses(this.addClassConfig);
            }
        });
    }

    private setLoadmoreHref(url) {
        const master_collection = this.getMasterCollection();
        master_collection.parentElement.querySelector("a.w-pagination-next").setAttribute('data-href', url);
    }

    private getHiddenCollections(): any[] {
        return [].slice.call(document.querySelectorAll(this.cms_selector)).filter(e => !isVisible(e));
    }

    private setHiddenCollections() {
        const collection = this.getHiddenCollections();
        this.hidden_collections = collection.map(val => val.parentElement.cloneNode(true));

        collection.forEach(val => val.parentNode.outerHTML = "");
    }

    public loadmore(config: LoadMore = { button: "a.w-pagination-next", loadAll: false, animation: this.animation }): void {

        if (!this.indexSet) {
            this.setNextButtonIndex();
        }
        this.setHiddenCollections();

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


        const { button, loadAll = false } = config;

        const nextButton = document.querySelector(button);
        nextButton.setAttribute("data-href", (<any>nextButton).href);
        nextButton.removeAttribute('href');
        let busy = false;


        (<any>nextButton).onclick = (evt) => {
            initFetch();
        }

        document.addEventListener("DOMContentLoaded", function (event) {

            loadAll && initFetch(true);

        });

        const initFetch = (recursive = false) => {

            if (busy) return false;

            const href = nextButton.getAttribute("data-href");

            busy = true;

            if (href) {

                return this.getNextData(href).then(res => {
                    //enable button
                    this.appendPaginatedData(<any>res);
                    busy = false;

                    if (recursive) {
                        initFetch(true);
                    }

                });
            }

            const nextcollection = this.hidden_collections.shift();


            if (nextcollection) {

                this.appendToCms(nextcollection.firstElementChild.children);
                const aHref = nextcollection.querySelector('.w-pagination-next');
                this.setLoadmoreHref(aHref.href);
                this.index++;
                busy = false;

                if (recursive) {
                    initFetch(true);
                }

            }



        }

    }

    /**
     * 
     * @param container The css selector of the parent container elem of the list you want to add classnames to.
     * @param config  defined as
     *  {
     *     classArray: Array<AltClass>; //list of classnames you want to add
     *     frequency: number; //The frequency or order of addition of class to the list
     *     start: number; //position of list item to start with
     * }
     */
    public addclasses(config: AddClass = { classArray: [], frequency: 2, start: 1 }): void {
        const parent: any = document.querySelector(this.cms_selector);
        const { frequency, start, classArray: classNames } = config;

        this.addClassConfig = config;
        this.addClass = true;

        if (frequency < 0) {
            throw "unaccepted value passed as frequency";
        }
        else if (start < 1) {
            throw "unaccepted value passed as start";
        }

        classNames.map(({ classTarget: target, classToAdd: alt }) => {

            let list = parent.querySelectorAll(target);
            let targerIsDirectChild = true;

            if (parent.children[0] != list[0]) {
                targerIsDirectChild = false;
                list = parent.children;
            }


            const addon = alt.replace(/\./g, "")

            for (let j = start - 1; j < list.length; j += frequency) {

                if (targerIsDirectChild) {
                    list[j].classList.toggle(addon);
                }
                else {
                    list[j].querySelectorAll(target).forEach(elem => {
                        elem.classList.toggle(addon);
                    })
                }


                if (frequency == 0) {
                    break;
                }

                this.reinitializeWebflow()

            }
        })
    }


    /**
     * 
     * @param cms_selector 
     */
    public filter(config = { filterArray: [], animation: this.animation, activeClass: 'active' }) {

        let { filterArray: cms_filter, animation, activeClass } = config;
        activeClass = activeClass || 'active';

        animation = { ...this.animation, ...animation };

        let filter_type = (typeof cms_filter == 'string') ? 'exclusive' : 'multi';


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


        if (Array.isArray(cms_filter)) {
            cms_filter.map((val, index) => {
                let prevClicked;
                const { filterType: filter_option } = val;

                const filter_group = [].slice.call(document.querySelectorAll(`${(<any>val).filterWrapper} [filter-by]`));
                assignChangeEventToButtons({ index, prevClicked, filter_option, filter_group })

            })
        }
        else if (typeof cms_filter == "string") {
            let prevClicked;
            const filter_group = [].slice.call(document.querySelectorAll(`${cms_filter} [filter-by]`));
            assignChangeEventToButtons({ index: 0, prevClicked, filter_group })
        }
        else {
            throw "Incorrect type passed as cms_filter"
        }

        function conditionalReset(filter_text, index) {
            const isEmpty = !filter_text.trim();
            const tag = Object.values(filter[index]);

            if (isEmpty && tag.includes(filter_text)) {
                return false;
            }

            if (isEmpty && !tag.length) {
                return false;
            }
            return true;
        }

        function assignChangeEventToButtons({ index, prevClicked, filter_option = filter_type, filter_group }) {
            filter[index] = {} //initialise default values
            filter_group.map((elem, j) => {
                const id = `${index}${j}`;
                const tag_element = elem && elem.tagName;


                if (tag_element == "SELECT") {
                    (<any>elem).addEventListener('change', debounce((event) => {

                        const filter_text = event.target.selectedOptions[0].value || '';

                        conditionalReset(filter_text, index) && initFilter({ filter_option, id, index, filter_text, wildcard: true })
                    }, 500))
                }
                else if (tag_element == "INPUT") {//handle checkbox and radio button

                    switch (elem.type) {

                        case 'text':
                            (<any>elem).addEventListener('input', debounce((event) => {
                                const filter_text = event.target.value;
                                conditionalReset(filter_text, index) && initFilter({ filter_option, id, index, filter_text, wildcard: true })
                            }, 500))
                            break;
                        default:
                            (<any>elem).addEventListener('change', (event) => {
                                const filter_text = (!event.target.checked) ? '' : event.currentTarget.getAttribute("filter-by") || '';
                                conditionalReset(filter_text, index) && initFilter({ filter_option, id, index, filter_text })
                            });
                            break;
                    }

                }
                else {
                    (<any>elem).onclick = ((event) => {

                        const active = event.currentTarget.className;

                        //only one element should have active class for or
                        if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filter_option)) {
                            if (prevClicked) prevClicked.classList.remove(activeClass)
                        }

                        prevClicked = event.currentTarget;

                        if (active.includes(activeClass)) {
                            prevClicked.classList.remove(activeClass)
                        }
                        else {
                            prevClicked.classList.add(activeClass)
                        }

                        const filter_text = prevClicked.getAttribute("filter-by") || '';

                        //prevent further filter if filter is empty and reset button is clicked.

                        conditionalReset(filter_text, index) && initFilter({ filter_option, id, index, filter_text })

                    })
                }
            })
        }

        const initFilter = ({ filter_option, id, index, filter_text, wildcard = false }) => {

            if (animation.queue && filterActive) {
                return filterQueue.push(() => filterHelper({ filter_option, id, index, filter_text, wildcard }));
            }

            return filterHelper({ filter_option, id, index, filter_text, wildcard });
        }

        const filterHelper = ({ filter_option, id, index, filter_text, wildcard = false }) => {
            filterActive = true;
            filter_text = escapeRegExp(filter_text.replace(/\*/gi, ''));
            if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filter_option)) {

                //checks if it has previously been clicked                
                if (id in filter[index] && !wildcard) {
                    delete filter[index][id];
                }
                else {
                    filter[index] = {};
                    filter[index][id] = filter_text;
                }

            }
            else {//it is definitely "multi"

                //checks if it has previously been clicked
                if (id in filter[index] && !wildcard) {

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

                        const re = new RegExp(val, "gi");
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


    public sort({
        sortTrigger,
        sortReverse,
        activeClass,
        animation = this.animation
    }) {

        animation = { ...this.animation, ...animation };
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


        const get_cms_items: any = () => [].slice.call(document.querySelectorAll(this.cms_selector));


        const triggerElem = [].slice.call(document.querySelectorAll(sortTrigger));


        triggerElem.map((elem) => {

            const triggerTag = elem && elem.tagName;

            if (triggerTag == "SELECT") {
                (<any>elem).addEventListener('change', debounce((event) => {

                    let sortTarget = event.target.selectedOptions[0].value;
                    sortTarget = sortTarget || event.getAttribute('sort-by');

                    sortHelper({ sortTarget, sortReverse });

                }, 200))
            }
            else if (triggerTag == "INPUT") {//handle checkbox and radio button

                (<any>elem).addEventListener('change', debounce((event) => {

                    const sortTarget = event.target.getAttribute("sort-by") || '';
                    const active = String(activeClass).replace('.', '');

                    removeActiveClassFromTriggers(sortTarget, active);

                    event.target.classList.toggle(active);
                    sortHelper({ sortTarget, sortReverse });
                }, 200));
            }
            else {
                (<any>elem).addEventListener('click', (event) => {
                    const target = event.currentTarget;
                    const sortTarget = target.getAttribute("sort-by") || '';
                    const active = String(activeClass).replace('.', '');

                    const previouslyClicked = target.classList.contains(active);

                    removeActiveClassFromTriggers(target, active);

                    elem.classList.toggle(active);


                    const isReversed = previouslyClicked ? !sortReverse : sortReverse;

                    sortHelper({ sortTarget, sortReverse: isReversed });

                });
            }
        })


        const removeActiveClassFromTriggers = (target, activeClass) => {
            triggerElem.forEach((elem) => {
                if (elem.outerHTML != target.outerHTML) {
                    elem.classList.remove(activeClass);
                }
            });
        }


        const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

        const sortHelper = ({ sortTarget, sortReverse }) => {

            const initSort = () => sortMasterCollection({ sortReverse, sortTarget });

            if (animation.enable) {

                const target = document.querySelector(this.cms_selector);
                Animate.methods.animate(initSort, target, animation);
            }
            else {
                initSort();
            }

        }

        const sortMasterCollection = ({ sortTarget, sortReverse }) => {
            const master_collection = get_cms_items();

            master_collection.map((elem) => {

                return (
                    [].slice.call(elem.children)
                        .sort((a, b) => {
                            const x = a.querySelector(sortTarget).textContent;
                            const y = b.querySelector(sortTarget).textContent;

                            return collator.compare(x, y);

                        })
                        .map((sortedElem) => {
                            if (sortReverse) {
                                elem.insertBefore(sortedElem, elem.firstChild)
                                return;
                            }
                            elem.appendChild(sortedElem)
                        })
                )
            }
            )
        }
    }
}

interface AltClass {
    classTarget: string;
    classToAdd: string
}

interface LoadMore {
    button: string;
    loadAll?: boolean;
    animation?: Animatn
}

interface AddClass {
    classArray: Array<AltClass>; //list of classnames you want to add
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

interface LazyLoad {
    type: number;
    className: string;
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

function debounce(callback, wait) {

    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}

(window as any).FsLibrary = FsLibrary;