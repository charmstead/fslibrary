var fsLibrary = /** @class */ (function () {
    function fsLibrary(cms_selector, animation) {
        this.animation = {
            enable: true,
            duration: 1,
            easing: 'linear',
            effects: 'fade'
        };
        this.animationStyle = "\n    \n        .fslib-normal div{\n            opacity:1;\n            transform:scale(0) translate(0) translate3d(0) rotate(0) rotateZ(0) ;\n        }\n        \n        .fslib-animation div{\n            transition-property: all;\n            transition-duration: {{duration}}s;\n            transition-timing-function: {{ease}};\n        }\n    \n        .fslib-fade{\n            opacity:0;\n        }\n       \n        .fslib-transform{\n            transform:{{transform}};\n        }\n        \n    \n          @keyframes fade-in {\n            0% {\n                opacity: 0;\n            }\n            100% {\n                opacity: 1;\n            }\n          }\n          \n          .fslib-fadeIn {\n            animation-name: fade-in;\n            animation-duration: 1s;\n            animation-iteration-count: 1;\n            animation-fill-mode: forwards;\n          }\n    ";
        this.cms_selector = cms_selector;
        if (animation) {
            animation.enable = !/^false$/.test(String(animation.enable));
            this.animation = animation;
            console.log(animation);
            var effects = animation.effects.replace('fade', '');
            var duration = animation.duration, easing = animation.easing;
            this.makeStyleSheet({ duration: duration, easing: easing, transform: effects });
        }
        else {
            this.makeStyleSheet({});
        }
    }
    fsLibrary.prototype.makeStyleSheet = function (_a) {
        var _b = _a.duration, duration = _b === void 0 ? 1 : _b, _c = _a.easing, easing = _c === void 0 ? 'linear' : _c, _d = _a.transform, transform = _d === void 0 ? 'translate(0)' : _d;
        this.animationStyle = this.animationStyle.replace('{{duration}}', '' + duration);
        this.animationStyle = this.animationStyle.replace('{{ease}}', easing);
        this.animationStyle = this.animationStyle.replace('{{transform}}', transform);
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = this.animationStyle;
        }
        else {
            style.appendChild(document.createTextNode(this.animationStyle));
        }
    };
    /**
     * Combine all the collection items into one collection.
     */
    fsLibrary.prototype.combine = function () {
        //get all collections
        var master_collection = [].slice.call(document.querySelectorAll(this.cms_selector));
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
    fsLibrary.prototype.loadmore = function (config) {
        var _this = this;
        if (config === void 0) { config = { button: "", actualLoadMore: true, initialLoad: 12, loadPerClick: 12 }; }
        var parent = document.querySelector(this.cms_selector);
        var collection = [].slice.call(parent.children);
        var clone = [].slice.call(parent.cloneNode(true).children);
        var button = config.button, actualLoadMore = config.actualLoadMore, initialLoad = config.initialLoad, loadPerClick = config.loadPerClick;
        var reserve = [];
        reserve = clone.filter(function (child, i) {
            if (i < initialLoad) {
                return false;
            }
            collection[i].outerHTML = "";
            return true;
        });
        document.querySelector(button).onclick = function () {
            var addon = reserve.splice(0, loadPerClick);
            addon.map(function (elem) {
                elem.classList.add('fslib-fadeIn');
                document.querySelector(_this.cms_selector).appendChild(elem);
            });
            if (_this.addClass) {
                _this.addClasses(_this.addClassConfig);
            }
        };
    };
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
    fsLibrary.prototype.addClasses = function (config) {
        if (config === void 0) { config = { classNames: [], frequency: 2, start: 1 }; }
        var parent = document.querySelector(this.cms_selector);
        var frequency = config.frequency, start = config.start, classNames = config.classNames;
        this.addClassConfig = config;
        this.addClass = true;
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
                var addon = alt.replace(/\./g, "");
                if (list[j].className.indexOf(addon) < 0) {
                    list[j].className += " " + addon;
                }
                if (frequency == 0) {
                    break;
                }
            }
        });
    };
    /**
     *
     * @param cms_selector
     */
    fsLibrary.prototype.cmsfilter = function (cms_filter, filter_type) {
        var _this = this;
        if (cms_filter === void 0) { cms_filter = []; }
        if (filter_type === void 0) { filter_type = 'single'; }
        var animation = this.animation;
        var filter = []; //2D array to hold categories of filter selectors and their corresponding
        //get all collections
        var get_cms_items = function () { return [].slice.call(document.querySelectorAll(_this.cms_selector)); };
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
        var findAndMatchFilterText = function () {
            var master_collection = get_cms_items();
            master_collection.map(function (elem, i) {
                if (!elem.classList.contains('fslib-animation')) {
                    elem.classList.add('fslib-animation');
                }
                if (!elem.classList.contains('fslib-normal')) {
                    elem.classList.add('fslib-normal');
                }
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
                    [].slice.call(master_collection[i].children)
                        .map(function (child, k) {
                        child.addEventListener("transitionend", function (evt) {
                            if (child.style.opacity == '0' || child.classList.contains('fslib-transform')) {
                                child.style.display = 'none';
                            }
                        });
                        if (animation.enable) {
                            console.log(animation);
                            if (search_result[k].style.display == 'none') {
                                if (animation.effects.indexOf('fade') > -1) {
                                    child.style.opacity = '0';
                                }
                                child.classList.add('fslib-transform');
                            }
                            else {
                                child.style.display = 'block';
                                requestAnimationFrame(function () {
                                    child.classList.remove('fslib-transform');
                                    if (animation.effects.indexOf('fade') > -1) {
                                        child.style.opacity = '1';
                                    }
                                });
                            }
                        }
                        else {
                            child.style.display = search_result[k].style.display;
                        }
                    });
                }
            });
        };
    };
    return fsLibrary;
}());
