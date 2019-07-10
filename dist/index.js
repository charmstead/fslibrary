var fsLibrary = /** @class */ (function () {
    function fsLibrary() {
    }
    fsLibrary.commonValue = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        var res = arr[0].filter(function (x) {
            return arr.every(function (y) { return y.includes(x); });
        });
        return res;
    };
    /**
     * Accepts the cms collector outer wrapper selector
     * and combine all the collection items into one collection.
     * @param cms_selector cms_outer_wrapper selector
     */
    fsLibrary.combine = function (cms_selector) {
        //get all collections
        var master_collection = [].slice.call(document.querySelectorAll(cms_selector));
        //copies the cms items into the first collection list
        master_collection[0].innerHTML = (master_collection.slice().reduce(function (curr, items) {
            //gets all the items  
            return curr.concat(items.innerHTML);
        }, []).join(""));
        //deletes the rest collection list
        master_collection.forEach(function (elem, i) {
            if (i > 0) {
                elem.outerHTML = "";
            }
        });
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
        var master_collection = document.querySelectorAll(object.target);
        master_collection.forEach(function (elem, i) {
            if (i % 2 == 1) {
                elem.className = elem.className + " " + object.alt.replace(/(.|#)/, "");
            }
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
    fsLibrary.addClasses = function (container, object) {
        if (object === void 0) { object = { classNames: [], frequency: 2, start: 1 }; }
        var parent = document.querySelector(container);
        var frequency = object.frequency, start = object.start, classNames = object.classNames;
        if (frequency < 0) {
            throw "unaccepted value passed as frequency";
        }
        else if (start < 1) {
            throw "unaccepted value passed as start";
        }
        classNames.map(function (_a) {
            var target = _a.target, alt = _a.alt;
            var list = parent.querySelectorAll(target);
            for (var j = start - 1; j < list.length; j += frequency) {
                list[j].className += " " + alt.replace(/\./g, "");
                if (frequency == 0) {
                    break;
                }
            }
        });
    };
    /**
     *
     * @param cms_selector
     * @param cms_filter
     */
    fsLibrary.cmsfilter = function (cms_selector, cms_filter, filter_type) {
        if (filter_type === void 0) { filter_type = 'single'; }
        var filter = []; //2D array to hold categories of filter selectors and their corresponding
        //get all collections
        var master_collection = [].slice.call(document.querySelectorAll(cms_selector));
        var cms_filter_master_collection = [];
        //creates a clone of the list
        master_collection.map(function (elem) {
            cms_filter_master_collection.push(elem.cloneNode(true));
        });
        var filter_group = [];
        if (Array.isArray(cms_filter)) {
            cms_filter.map(function (val, index) {
                var prevClicked;
                var filter_option = val.filter_option;
                filter_group = [].slice.call(document.querySelectorAll(val.filter_group + " [data-search]"));
                assignChangeEventToButtons(index, prevClicked, filter_option);
            });
        }
        else if (typeof cms_filter == "string") {
            var prevClicked = void 0;
            filter_group = [].slice.call(document.querySelectorAll(cms_filter + " [data-search]"));
            assignChangeEventToButtons(0, prevClicked);
        }
        else {
            throw "Incorrect type passed as cms_filter";
        }
        function assignChangeEventToButtons(index, prevClicked, filter_option) {
            if (filter_option === void 0) { filter_option = filter_type; }
            filter[index] = {}; //initialise default values
            filter_group.map(function (elem, j) {
                var id = "" + index + j;
                var tag_element = elem && elem.tagName;
                if (tag_element == "SELECT") {
                    elem.onchange = function (event) {
                        var filter_text = event.currentTarget.selectedOptions[0].getAttribute("data-search") || '';
                        filterHelper({ filter_option: filter_option, id: id, index: index, filter_text: filter_text });
                    };
                }
                else if (tag_element == "INPUT") { //handle checkbox and radio button
                    elem.onchange = function (event) {
                        var filter_text = event.currentTarget.getAttribute("data-search") || '';
                        if (!event.target.checked) {
                            filter_text = '';
                        }
                        filterHelper({ filter_option: filter_option, id: id, index: index, filter_text: filter_text });
                    };
                }
                else {
                    elem.onclick = function (event) {
                        var active = event.currentTarget.className;
                        //only one element should have active class for or
                        if (/^single$/i.test(filter_type) || /^single$/i.test(filter_option)) {
                            if (prevClicked)
                                prevClicked.classList.remove("active");
                        }
                        prevClicked = event.currentTarget;
                        if (active.includes("active")) {
                            prevClicked.classList.remove("active");
                        }
                        else {
                            prevClicked.classList.add("active");
                        }
                        var filter_text = prevClicked.getAttribute("data-search") || '';
                        filterHelper({ filter_option: filter_option, id: id, index: index, filter_text: filter_text });
                    };
                }
            });
        }
        function filterHelper(_a) {
            var filter_option = _a.filter_option, id = _a.id, index = _a.index, filter_text = _a.filter_text;
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
            else { //it is definitely "multi"
                //checks if it has previously been clicked
                if (id in filter[index]) {
                    delete filter[index][id];
                }
                else {
                    filter[index][id] = filter_text;
                }
            }
            findAndMatchFilterText();
            console.log(filter);
        }
        function findAndMatchFilterText() {
            cms_filter_master_collection.map(function (elem, i) {
                var search_result = filter.reduce(function (curr, search) {
                    //creating a regex to test against
                    var val = "(" + Object["values"]((search)).join("|") + ")";
                    var result = [].slice.call(elem.cloneNode(true).children).map(function (item, j) {
                        var re = new RegExp(val, "i");
                        var valid = re.test(item.textContent);
                        if (valid) {
                            item.style.display = "block";
                        }
                        else {
                            item.style.display = "none";
                        }
                        // return item.outerHTML;
                        return item;
                    });
                    if (curr.length < 1) {
                        return result;
                    }
                    // return [...curr.filter((a) => result.includes(a))]
                    //intersections of the results
                    return curr.map(function (a, index) {
                        if (a.style.display !== result[index].style.display) {
                            a.style.display = "none";
                        }
                        return a;
                    }).slice();
                }, []); //.join("").trim()
                if (search_result.length > 1) {
                    console.log(search_result.length);
                    [].slice.call(master_collection[i].children)
                        .map(function (child, k) {
                        child.style.display = search_result[k].style.display;
                    });
                }
            });
        }
    };
    return fsLibrary;
}());
