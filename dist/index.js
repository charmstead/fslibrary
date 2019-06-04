var fsLibrary = /** @class */ (function () {
    function fsLibrary() {
    }
    /**
     * Accepts the cms collector outer wrapper selector
     * and combine all the collection items into one collection.
     * @param selector cms_outer_wrapper selector
     */
    fsLibrary.combine = function (selector) {
        //get all collections
        var master_collection = [].slice.call(document.querySelectorAll(selector));
        //checks if the right selector was passed in
        if (master_collection[0].childElementCount !== 1) {
            throw ("combine expects the cms_outer_wrapper css selector");
        }
        else {
            //copies the cms items into the first collection list
            master_collection[0].firstElementChild.innerHTML = (master_collection.slice().reduce(function (curr, items) {
                //gets all the items  
                return curr.concat(items.firstElementChild.innerHTML);
            }, []).join(""));
            //deletes the rest collection list
            master_collection.forEach(function (elem, i) {
                if (i > 0) {
                    elem.outerHTML = "";
                }
            });
        }
    };
    /**
     * Accept key/value pair
     * {
     * target://selector of the target element,
     * selector: //selector to append to the target element
     * }
     * @param object values of targetSelector element and selector class to add to Element
     */
    fsLibrary.addClass = function (object) {
        //get all collections
        var master_collection = document.querySelectorAll(object.target_selector);
        master_collection.forEach(function (elem, i) {
            elem.className = elem.className + " " + object.selector;
        });
    };
    /**
 * Accept array of key/value pair
 * {
 * target://selector of the target element,
 * selector: //selector to append to the target element
 * }
 * @param object array values of targetSelector element and selector class to add to Element
 */
    fsLibrary.mutateTarget = function (object) {
        object.map(function (_a) {
            var target_selector = _a.target_selector, selector = _a.selector;
            //get all collections
            var master_collection = document.querySelectorAll(target_selector);
            master_collection.forEach(function (elem, i) {
                elem.className = elem.className + " " + selector;
            });
        });
    };
    fsLibrary.filter = function () {
    };
    return fsLibrary;
}());
// export {fsLibrary} ;
