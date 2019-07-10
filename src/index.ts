class fsLibrary {

    constructor() {

    }


    private static commonValue(...arr) {
        let res = arr[0].filter(function (x) {
            return arr.every((y) => y.includes(x))
        })
        return res;
    }

    /**
     * Accepts the cms collector outer wrapper selector
     * and combine all the collection items into one collection.
     * @param cms_selector cms_outer_wrapper selector
     */
    public static combine(cms_selector: string) {

        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(cms_selector));


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

    /**
     * Accept key/value pair
     * {
     * target://selector of the target element,
     * selector: //selector to append to the target element
     * }
     * @param object values of targetSelector element and selector class to add to Element
     */
    public static addClass(object: AltClass) {
        //get all collections
        const master_collection: any = document.querySelectorAll(object.target);
        master_collection.forEach((elem, i) => {

            if (i % 2 == 1) {
                elem.className = `${elem.className} ${object.alt.replace(/(.|#)/, "")}`
            }
        })
    }

    /**
 * Accept array of key/value pair
 * {
 * target://selector of the target element,
 * selector: //selector to append to the target element
 * }
 * @param object array values of targetSelector element and selector class to add to Element
 */
    /**
     * 
     * @param container The css selector of the parent container elem of the list you want to add classnames to.
     * @param object defined as
     *  {
     *     classNames: Array<AltClass>; //list of classnames you want to add
     *     frequency: number; //The frequency or order of addition of class to the list
     *     start: number; //position of list item to start with
     * }
     */
    public static addClasses(container, object: AddClass = { classNames: [], frequency: 2, start: 1 }): void {
        const parent: any = document.querySelector(container);
        const { frequency, start,classNames } = object;


        if (frequency < 0) {
            throw "unaccepted value passed as frequency";
        }
        else if (start < 1) {
            throw "unaccepted value passed as start";
        }

       classNames.map(({ target, alt }) => {
            const list = parent.querySelectorAll(target);
            for (let j = start - 1; j < list.length; j += frequency) {
                
                list[j].className += " " + alt.replace(/\./g, "")

                if (frequency == 0) {
                    break;
                }
            }
        })

    }

    /**
     * 
     * @param cms_selector 
     * @param cms_filter 
     */
    public static cmsfilter(cms_selector: string, cms_filter: Array<FilterGroup> | string, filter_type: string = 'single') {

        let filter: Array<{ [key: string]: string }> = []//2D array to hold categories of filter selectors and their corresponding

        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(cms_selector));

        const cms_filter_master_collection = [];

        //creates a clone of the list
        master_collection.map((elem) => {
            cms_filter_master_collection.push(elem.cloneNode(true));
        })

        let filter_group: any[] = [];

        if (Array.isArray(cms_filter)) {
            cms_filter.map((val, index) => {
                let prevClicked;
                const { filter_option } = val;

                filter_group = [].slice.call(document.querySelectorAll(`${val.filter_group} [data-search]`));
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
            console.log(filter)

        }


        function findAndMatchFilterText() {
            cms_filter_master_collection.map((elem, i) => {

                const search_result = filter.reduce((curr, search) => {

                    //creating a regex to test against
                    const val = `(${Object["values"]((search)).join("|")})`;

                    const result = [].slice.call(elem.cloneNode(true).children).map((item, j) => {

                        const re = new RegExp(val, "i");
                        const valid = re.test(item.textContent);

                        if (valid) {
                            item.style.display = "block"
                        }
                        else {
                            item.style.display = "none"
                        }

                        // return item.outerHTML;
                        return item;
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
                    console.log(search_result.length);

                    [].slice.call(master_collection[i].children)
                        .map((child, k) => {
                            child.style.display = search_result[k].style.display;

                        })
                }

            })
        }
    }
}

interface AltClass {
    target: string;
    alt: string
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
