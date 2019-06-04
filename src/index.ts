
class fsLibrary {

    constructor() {

    }
    /**
     * Accepts the cms collector outer wrapper selector
     * and combine all the collection items into one collection.
     * @param selector cms_outer_wrapper selector
     */
    public static combine(selector: string) {

        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(selector));
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
            elem.className = `${elem.className} ${object.selector}`
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

        object.map(({ target_selector, selector }) => {
            //get all collections
            const master_collection:any = document.querySelectorAll(target_selector);
            master_collection.forEach((elem,i)=>{
                elem.className= `${elem.className} ${selector}`
            })
        })

    }

    public static filter() {

    }
}

interface AltClass {
    target_selector: string,
    selector: string
}

// export {fsLibrary} ;
