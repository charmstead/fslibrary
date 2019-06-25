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

            if (i % 2 == 1) {
                elem.className = `${elem.className} ${object.flip_selector.replace(/(.|#)/, "")}`
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
    public static addClasses(object: Array<AltClass>) {

        object.map(({ target_selector, flip_selector }) => {
            //get all collections
            const master_collection: any = document.querySelectorAll(target_selector);
            master_collection.forEach((elem, i) => {
                if (i % 2 == 1) {
                    elem.className = `${elem.className} ${flip_selector.replace(/(.|#)/, "")}`

                }
            })
        })

    }

    /**
     * 
     * @param cms_selector 
     * @param cms_filter 
     */
    public static cmsfilter(cms_selector: string, cms_filter: Array<Array<string>>, filter_type: string = 'and') {

        let filter = []//2D array to hold categories of filter selectors and their corresponding

        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(cms_selector));

        const cms_filter_master_collection = [];

        //creates a clone of the list
        master_collection.map((elem) => {
            cms_filter_master_collection.push(elem.cloneNode(true));
        })
        

        let prevClicked;

        cms_filter.map((val, index) => {
            filter[index] = {} //initialise default values

            val.map((filter_selector) => {
                const element = document.querySelector(filter_selector);
                const tag_element = element && element.tagName;
                console.log(element)

                
                if (!element) {
                    return
                }

                if (tag_element == "SELECT") {
                    (<any>document.querySelector(filter_selector)).onchange = function (event) {
                        let filter_text = event.currentTarget.selectedOptions[0].getAttribute("data-search") || '';

                        filterHelper(filter_type, filter_selector, index, filter_text)
                    }
                }
                else if (tag_element == "INPUT") {//handle checkbox and radio button
                    (<any>document.querySelector(filter_selector)).onchange = function (event) {
                        let filter_text = event.currentTarget.getAttribute("data-search") || '';

                        if (!event.target.checked) {
                            filter_text = '';
                        }
                        filterHelper(filter_type, filter_selector, index, filter_text)
                    }
                }
                else {
                    (<any>document.querySelector(filter_selector)).onclick = function (event) {
                        const active= event.currentTarget.className;

                        if(active.includes("active")){
                            event.currentTarget.classList.remove("active")
                        }
                        else{
                            event.currentTarget.classList.add("active")
                        }
                        //only one element should have active class for or
                        if (/^or$/i.test(filter_type)) {
                            
                            if(prevClicked){
                                prevClicked.classList.remove("active")
                            }
                            else{
                                prevClicked=event.currentTarget;
                            }
                        }
                        prevClicked=event.currentTarget;

                        
                        let filter_text = event.currentTarget.getAttribute("data-search") || '';
                        filterHelper(filter_type, filter_selector, index, filter_text)
                    }
                }

            })

        })

        function filterHelper(filter_type, filter_selector, index, filter_text) {

            if (/^or$/i.test(filter_type)) {
                (<any>filter[index]) = {}
                filter[index][filter_selector] = filter_text;
            }
            else {//it is definitely "and"

                //checks if it has previously been clicked
                if (filter_selector in (<any>filter[index])) {
                    delete filter[index][filter_selector]

                }
                else {
                    filter[index][filter_selector] = filter_text;

                }
            }
            filterHandler();


            console.log(filter)

        }


        function filterHandler() {
            console.log(filter)
            cms_filter_master_collection.map((elem, i) => {

                const search_result = filter.reduce((curr, search) => {
                    //creating a regex to test against
                    const val = `(${Object["values"](search).join("|")})`;

                    const result = [].slice.call(elem.cloneNode(true).firstElementChild.children).map((item, j) => {

                        const re = new RegExp(val, "i");
                        const valid = re.test(item.textContent);

                        if (valid) {
                            item.style.display = "block"
                        }
                        else {
                            item.style.display = "none"
                        }

                        return item.outerHTML;
                    })

                    if (curr.length < 1) {
                        return result;
                    }

                    return [...curr.filter((a) => result.includes(a))]
                }, []).join("").trim()

                if (search_result.length > 1) {
                    master_collection[i].firstElementChild.innerHTML = search_result;
                }

            })
        }
    }
}

interface AltClass {
    target_selector: string,
    flip_selector: string
}


// interface FilterObject {
//     filter_selector: string,
//     filter_text: string
// }