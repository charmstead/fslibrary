
class fsLibrary {

    constructor() {

    }
    /**
     * Accepts the cms collector outer wrapper selector
     * and combine all the collection items into one collection.
     * @param cms_selector cms_outer_wrapper selector
     */
    public static combine(cms_selector: string) {

        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(cms_selector));
        //checks if the right selector was passed in
        if (master_collection[0].childElementCount !== 1) {
            throw ("combine expects the cms_outer_wrapper css selector");
        }
        else {
            //copies the cms items into the first collection list
            master_collection[0].firstElementChild.innerHTML = (
                [...master_collection].reduce((curr, items) => {
                    //gets all the items  
                    return [...curr, ...items.firstElementChild.innerHTML]
                }, []).join("")
            )

            //deletes the rest collection list
            master_collection.forEach((elem: Element, i: number) => {
                if (i > 0) {
                    elem.outerHTML = ""
                }
            })

        }

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
        const master_collection: any = document.querySelectorAll(object.target_selector);
        master_collection.forEach((elem, i) => {
            if (i % 2 == 0) {
                elem.className = `${elem.className} ${object.flip_selector}`
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
    public static mutateTarget(object: Array<AltClass>) {

        object.map(({ target_selector, flip_selector }) => {
            //get all collections
            const master_collection: any = document.querySelectorAll(target_selector);
            master_collection.forEach((elem, i) => {
                if (i % 2 == 0) {
                    elem.className = `${elem.className} ${flip_selector}`

                }
            })
        })

    }

    /**
     * 
     * @param cms_selector 
     * @param cms_filter 
     */
    public static cmsfilter(cms_selector: string, cms_filter: Array<FilterObject>) {

        let filter = {};
        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(cms_selector));

        const cms_filter_master_collection = [];
        //creates a clone of the list
        master_collection.map((elem) => {
            cms_filter_master_collection.push(elem.cloneNode(true));
        })


        cms_filter.map(({ filter_selector, filter_text }) => {

            (<any>document.querySelector(filter_selector)).onclick = function (event) {

                //checks if it has previously been clicked
                if (filter_selector in filter) {
                    delete filter[filter_selector]
                    filterHandler();
                }
                else {
                    filter[filter_selector] = filter_text;
                    filterHandler();
                }

            }

        })

        function filterHandler() {
            //creating a regex to test against
            const val = `(${Object["values"](filter).join("|")})`;

            cms_filter_master_collection.map((elem, i) => {

                const result = (
                    [].slice.call(elem.cloneNode(true).firstElementChild.children).map((item, j) => {

                        const re = new RegExp(val, "i");
                        const valid = re.test(item.textContent);

                        if (valid) {
                            item.style.display = "block"
                        }
                        else {
                            item.style.display = "none"
                        }

                        return item.outerHTML;

                    }).join("")
                ).trim()

                if (result.length > 1) {
                    master_collection[i].firstElementChild.innerHTML = result;
                }

            })
        }


    }
}

interface AltClass {
    target_selector: string,
    flip_selector: string
}


interface FilterObject {
    filter_selector: string,
    filter_text: string
}