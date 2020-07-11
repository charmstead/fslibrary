// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"blurImg.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blurImg = "/9j/4AAQSkZJRgABAQAAAQABAAD/4QAiRXhpZgAASUkqAAgAAAABABIBAwABAAAAAQAAAAAAAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wgARCADIASwDASIAAhEBAxEB/8QAHAABAAMBAQEBAQAAAAAAAAAAAgEDBAAFBwYI/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECBAMF/9oADAMBAAIQAxAAAAH8fCj6vAOXUOfIZlUVKSFKOUo59ZEPnLzlyw5cpTU0FY87rtVuNxoi7NeqrTLdrz6sNOvLqxrXoy6Ma/nSH30+AQ+o85QS1YEkFJgaZDlxDTlNicpasA7HnQbsmhY7c6N025vaDfnT01X4t+ii/G9N+e3F/n2VP0uGuXNCWkEtWBNAbYG3AbaltwW7JQ3ZKLHZKHZZm12uyaNs25sXdbnU3G3GnfXbnVttVmNfBus76HEJsmwJorbQFYgNsDscBuwDdkodlktdllktdllktdjszRY7JTYrM6Nieb1kvOutizOpsLl+Gc57eQJIKSISYWmFpkNOIaslNisDZNksWTZmmxOWLJslhpyw5ebzly84edS4csqFL8Pkrq55RQmGiZYrAx2V2DsrsldldhZZXZK7A4ssrctrrctrqslssqcWupS3KpS3KlS3OmZb5pUfEppXT5XKhJeqEaHnRpeZmp5WarMjNdmRxrsxuXY8bNlmNy7LMTNrxOXa8Sja8Sl2rEpdqxKXasSNs45l+NTmno8tKyo1LIq2LGk2rEzY8SjcsSNzwM3vApfQWBHovznHorzmvovzlHpLzXL6K85HpLzlL6K85x6C89L6CwTl8lmjvfF6zzWic8mlZUaVllNayTGxY0bFiS7lhUbngRvfno9BYFHoLz0voPzmegvPUeivPS+ivPceg/PcvoLCpfmXDvSOa5LJqmrZq5LppkummYvmiTROdGhZpjSs0mpZUalkS61kmNixo2LGzYsbNjx2S7LMdsa7Mtkvzzp7Vjp47u4nu4no4UnhSZFImHIksmuSxVIsVUlqqkumpFrpRc6WX2UWxfbRdLfZVbH4PrIbHPqHLg8uDygie6Tp7jp7ie6Tp6Tp6Tp6SZ6UlQiVDJsLHaLpXfXeWWm6X8L3c3Edx0dxEd1nd3Hd3Sd3cdPcTPcTPcTPcKe4ldxL7kT7h29xZd3S3390X3d0v//EAB0QAQEBAQEAAwEBAAAAAAAAAAABERICECAwQFD/2gAIAQEAAQUC/gnxE+mMYkSPMeY8vLw8PDw8p+8+YifGMYkSJEiR5jzHl5eXh5eU/XESfEiRIkSJGJEiRIkSJHmPLy8vLy8p+OMYxjGJGJEiRIkSJEiRIkSJHmJEeXl5efzxjGMSJEiRIkSJEiRIkSJEiRIkRHlE+2MYxjGMYkSJEiRIkSJEiRIkSJEiRIkRERPrjGMYxjGMSJEiRIkSJEiRIkSJEiRIkSJERE++MYxiRIkSJEiRIkSJEiRIkSJEiRIkSJERE/ORIkSJEiRIkSJEiRIkSJEiRIkSInxE/ORIkSJEiRIkREREiRERERP4IiIiIiIiIiIiIifxRERERERERERET41rWta1rW/hqVKlSpUqVKlSpWpUrUrUrWta1rWta1rWta1rWta1qVKlSuk9J6T0np0np06T06dOnTp06dOnTp01rWta1rWtdOnTp0np06T06T06dOnTp06dOnTp06dOnTWta1rWunTp06dOnTp06dOnTp06du3bt27dOnTp06dNa1rWta106dOnTp06dOnTp06dOnTp06dOnTp06dOnTWta1rWta1rWtdOnTp06dOnTp06dOnTp06dJ6T0np199a1rWta1rWta1rp06dOnTp06dOk9JUqVv561rWta1rWta1rWta1rUqVKlSt/l1rWta1rWtSpURE/wYiIif4ERER5ef8CIiPLy8/3xERHl5efj/8QAGxEBAQACAwEAAAAAAAAAAAAAEQABMBAgQGD/2gAIAQMBAT8B14sZmZ8uPYRrIiIiIiIiIjqRERERER8ERERERERGgiIiIiIiIjqREcERERERERHm/8QAGxEBAQACAwEAAAAAAAAAAAAAEQABQBAgMGD/2gAIAQIBAT8B0M2dLNnRz0Z4ZmZmZmZmejMzMzMzMzMzM8MzMzMzMzPwTMzMzM+LMzMzMzPizMzMzMzMzMzM6n//xAAUEAEAAAAAAAAAAAAAAAAAAACQ/9oACAEBAAY/Am2//8QAHBABAQEBAQEBAQEAAAAAAAAAAQARECAwQCEx/9oACAEBAAE/Ie5ZzLIIIIIIIIIQQhBBBEIeRAYw8j/juWWWWQQQQQQQQgghCEEQh8ANAY+bX8ssssssggggggiDgHsAA+IBaBDzy/llllllkFkQhCEIcB+AAAAtEYeAf5ZZZZZBBBBEIQh+MAAAKFUY+GWWWWcEIQhCEPyAAARFAIxj3LLLOCEIQhCEPygAAVVQAEI8FllkEEQhCH6AAACqAgACEOsssgggggg/OAAAAAAACEEIRzLIIIIIIPkAAAIQhDoCEIQhCCIiI8ERER8wAEPkACIiGGGG3pEREfQAClKUpSlDEIQhCEIcNhhhhhhj6AAAAOwOQ5SlKUpSlKU7iEIQhCEKU81U8gA4CHAQhCkIQhwOkpSlKUpSlIQhDgIcJylKUpSlKUpSlKd5SlKUpSEIQhCEKUpSlKUpCEIQhSlKU9ZlKUpSEIQhCEKUpSlKUpSlKUpSlKfGAlKUpSlKQhCEIQhClKUpSlKeYDbbbbbfYBSlKUpSlKQhCEIQhCHkKl22222222230AhCEIQhCEKUpSlPVAj23m2823m2www2xCEIQhCEIdApz5Pw7bbDbbbDDDDDDDDL08/yyyyzmWWfcjhERHoYhB/LLLLLLLPxEREQQhGMIQg/llllllllnyyyyyyyyCCCCCEIRjCEIP5f/9oADAMBAAIAAwAAABA6jEghxQo5KaVGueiMJ5pwJs4rw5aJnYxgWgNaeuxp3zkNRVlgFuA0E/W5bEOJazMl9KLD50pdbKlnlZIDxdoEwLY5BdE5DAq6/Oemq0jfZJqMdc2Rkgt/f822OZ2C0S2M56wQmJx0n5CkRQliQrwYvScWBArffPxKe1MyhdR0YQKogU3N1kfWEgY7pnruIFNdN8XD7IyiSRCTAJJeckkAS8edLLL5cNOXo1yF4L2AMOILzwCCEGH4ML//xAAZEQADAQEBAAAAAAAAAAAAAAAAAREQIDD/2gAIAQMBAT8Qxj4WIQ2C0Ji5faEJiYmJiwh6yEIJEIQSEIQhCyEIQhCYQSEhISEhISEhC8gAggggggkJCQvIALCCRCCQlsIQhCEIQmTELmbCEILUuliIQhCEIQhCEIQmL3AAhCEEiE94ACEITkJ7AAIQhMmQnUIQmJZ//8QAGhEBAQEBAQEBAAAAAAAAAAAAAAEREDAgQP/aAAgBAgEBPxD7tVaqqsWL0rea1rWtWtWqqqvSta1rWtatatWrVq1S1V6b9gUpSlKUtWrfH/rWta0pSlLfSAFKWtWrVvNa1rWta1b81V8L9XmcxjO61rWta1vN7vbzW+QA1rWta1voADWta1q1b+QAABrW91vNa1rW91atf//EACAQAAMAAQUBAQEBAAAAAAAAAAABYRARICExUTBBcUD/2gAIAQEAAT8QaGhoeBIQX+AFVZJLDY7E6eB3HB0mlodAnR+T8j9DloaHsBfYr1vq8+a1/wAIkSBE51wN8xdZ1i9CYv1gMMMLAvnVfk4YIbQKOGJLNvxdJ1C9CH4H2AeFFGItsKlsolsAiROPoiRJkiRE4OiGb6hej8jdD7BUizWOWkS20kSOGOGJEiQJEyZEiT2Xp0Lg3GKKKKyCG6r4kcMMrEjk5E8hMnjnsF0hRDoIoor4AD9ZMjhiRysSOCRLFAhi48/LbcIJwIorNYEiRImRI5WJEiRI4pECREiRIEyPwCFkEuBFFGJHd/kMEMhAiTwzJ4Y5SezCGCO1gUS4EEE/NfwAQI8IZGeVj84VBJRRdmkJCCiiiiiCCCCCCCCCZBUIItoIsrjj7ahBMTGGQ6HQ6NJoNGDDDDIZDDUZbwFE4V/KqKRWLNa/P+AAoIK4alipUsVLFCxcuXLlSpcqVKisWIj3BbFYuXLFixUqVKlihQoULFC5cqVLlSxUqVKlRWXP7FRQoUKFy5cuXLlixYuXKly5QsULFy5cuXLly5UqXKlCguHYuHZQoVKlSpcoWKlC5cuXLFixzdli5cuXLFixYoWKlzj7LlyguHYrEVQuXZQoUKlShQoVKlS5csWLFi5cuXLly5cuXLly5YsWFx7P7EV7FYirFRydnB2UKFCpUqUHejPR3o70oXKlyw70Z6WLFixYsWKlSguHZqxRRRVioVCCcTif05ChQoVKlSpUqUKFChQsWLly5cZ6VHeljg7yahBN6KhN6IoooKhUKhUU2grRo0aN9GejPRno70sWxUK474ODvOrNRM1EExBBOn9CoTEEGjcKf6gAL+MH4WDDPQ0hpsSylla4TExMQQWAggvkAAocYc/J+d1mk2DQ0Ylhd4WEIQhaiwYTGGGH22gozjC/c/8AwfwaQ0NDQ0EjQS0EsISEhISEhIQQQUXFDZH08bFzLLLDDDDGj2pGgkJCCCCCCC+4CgnF3//Z";
},{}],"utility.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function isInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth);
}

exports.isInViewport = isInViewport;

exports.isOutOfViewport = function (elem) {
  // Get element's bounding
  var bounding = elem.getBoundingClientRect(); // Check if it's out of the viewport on each side

  var out = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;
  return out;
};

function registerListener(event, func) {
  if (document.addEventListener) {
    document.addEventListener(event, func, true);
  } else {
    document.attachEvent("on" + event, func);
  }
}

exports.registerListener = registerListener;

function removeListener(event, func) {
  document.removeEventListener(event, func, true);
}

exports.removeListener = removeListener;

function isVisible(elem) {
  var _a = elem.getBoundingClientRect(),
      width = _a.width,
      height = _a.height;

  return !(height === width && height === 0);
}

exports.isVisible = isVisible;

function findDeepestChildElement(elem) {
  return [].slice.call(elem.querySelectorAll("*")).find(function (e) {
    return !e.children.length;
  });
}

exports.findDeepestChildElement = findDeepestChildElement;

function createDocument(html, title) {
  var doc = document.implementation.createHTMLDocument(title);
  doc.documentElement.innerHTML = html;
  return doc;
}

exports.createDocument = createDocument;

exports.escapeRegExp = function (string) {
  return string.replace(/[*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

function whichTransitionEvent() {
  var t,
      el = document.createElement("fakeelement");
  var transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

exports.whichTransitionEvent = whichTransitionEvent;

function whichAnimationEvent() {
  var t,
      el = document.createElement("fakeelement");
  var animations = {
    animation: "animationend",
    OAnimationn: "oAnimationnEnd",
    MozAnimationn: "animationnend",
    WebkitAnimationn: "webkitAnimationnEnd"
  };

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

exports.whichAnimationEvent = whichAnimationEvent;

function debounce(callback, wait) {
  var _this = this;

  var timeout;
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var context = _this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return callback.apply(context, args);
    }, wait);
  };
}

exports.debounce = debounce;

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim(); // Change this to div.childNodes to support multiple top-level nodes

  return div.firstChild;
}

exports.createElementFromHTML = createElementFromHTML;

exports.throttle = function (func, limit) {
  var lastFunc;
  var lastRan;
  return function () {
    var context = this;
    var args = arguments;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

exports.initResize = function () {
  if (typeof Event === "function") {
    // modern browsers
    window.dispatchEvent(new Event("resize"));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    var evt = window.document.createEvent("UIEvents");
    evt.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }
};

exports.dispatchEvent = function (event) {
  if (typeof Event === "function") {
    // modern browsers
    window.dispatchEvent(new Event(event));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    var evt = window.document.createEvent("UIEvents");
    evt.initUIEvent(event, true, false, window, 0);
    window.dispatchEvent(evt);
  }
};
/**
 * @param {HTMLElement} element
 * @returns {number} percent of element in view
 */


function getPercentOfView(element) {
  var viewTop = window.pageYOffset;
  var viewBottom = viewTop + window.innerHeight;
  var rect = element.getBoundingClientRect();
  var elementTop = rect.top + viewTop;
  var elementBottom = elementTop + rect.height;

  if (elementTop >= viewBottom || elementBottom <= viewTop) {
    // heigher or lower than viewport
    return 0;
  } else if (elementTop <= viewTop && elementBottom >= viewBottom) {
    // element is completely in viewport and bigger than viewport
    return 100;
  } else if (elementBottom <= viewBottom) {
    if (elementTop < viewTop) {
      // intersects viewport top
      return Math.round((elementBottom - viewTop) / window.innerHeight * 100);
    } else {
      // completely inside viewport
      return Math.round((elementBottom - elementTop) / window.innerHeight * 100);
    }
  } else {
    // intersects viewport bottom
    //  elementBottom >= viewBottom && elementTop <= viewBottom
    return Math.round((viewBottom - elementTop) / window.innerHeight * 100);
  }
}

exports.getPercentOfView = getPercentOfView;

function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  } // Get the closest matching element


  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }

  return null;
}

exports.getClosest = getClosest;
;
},{}],"../js/util/lang.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOwn = hasOwn;
exports.hyphenate = hyphenate;
exports.camelize = camelize;
exports.ucfirst = ucfirst;
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.includes = includes;
exports.findIndex = findIndex;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isWindow = isWindow;
exports.isDocument = isDocument;
exports.isJQuery = isJQuery;
exports.isNode = isNode;
exports.isNodeCollection = isNodeCollection;
exports.isBoolean = isBoolean;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isNumeric = isNumeric;
exports.isEmpty = isEmpty;
exports.isUndefined = isUndefined;
exports.toBoolean = toBoolean;
exports.toNumber = toNumber;
exports.toFloat = toFloat;
exports.toNode = toNode;
exports.toNodes = toNodes;
exports.toList = toList;
exports.toMs = toMs;
exports.isEqual = isEqual;
exports.swap = swap;
exports.last = last;
exports.each = each;
exports.sortBy = sortBy;
exports.uniqueBy = uniqueBy;
exports.clamp = clamp;
exports.noop = noop;
exports.intersectRect = intersectRect;
exports.pointInRect = pointInRect;
exports.Dimensions = exports.assign = exports.isArray = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var objPrototype = Object.prototype;
var hasOwnProperty = objPrototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

var hyphenateCache = {};
var hyphenateRe = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
  if (!(str in hyphenateCache)) {
    hyphenateCache[str] = str.replace(hyphenateRe, '$1-$2').toLowerCase();
  }

  return hyphenateCache[str];
}

var camelizeRe = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRe, toUpper);
}

function toUpper(_, c) {
  return c ? c.toUpperCase() : '';
}

function ucfirst(str) {
  return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
}

var strPrototype = String.prototype;

var startsWithFn = strPrototype.startsWith || function (search) {
  return this.lastIndexOf(search, 0) === 0;
};

function startsWith(str, search) {
  return startsWithFn.call(str, search);
}

var endsWithFn = strPrototype.endsWith || function (search) {
  return this.substr(-search.length) === search;
};

function endsWith(str, search) {
  return endsWithFn.call(str, search);
}

var arrPrototype = Array.prototype;

var includesFn = function includesFn(search, i) {
  return ~this.indexOf(search, i);
};

var includesStr = strPrototype.includes || includesFn;
var includesArray = arrPrototype.includes || includesFn;

function includes(obj, search) {
  return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
}

var findIndexFn = arrPrototype.findIndex || function (predicate) {
  for (var i = 0; i < this.length; i++) {
    if (predicate.call(arguments[1], this[i], i, this)) {
      return i;
    }
  }

  return -1;
};

function findIndex(array, predicate) {
  return findIndexFn.call(array, predicate);
}

var isArray = Array.isArray;
exports.isArray = isArray;

function isFunction(obj) {
  return typeof obj === 'function';
}

function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

var toString = objPrototype.toString;

function isPlainObject(obj) {
  return toString.call(obj) === '[object Object]';
}

function isWindow(obj) {
  return isObject(obj) && obj === obj.window;
}

function isDocument(obj) {
  return isObject(obj) && obj.nodeType === 9;
}

function isJQuery(obj) {
  return isObject(obj) && !!obj.jquery;
}

function isNode(obj) {
  return obj instanceof Node || isObject(obj) && obj.nodeType >= 1;
}

function isNodeCollection(obj) {
  return toString.call(obj).match(/^\[object (NodeList|HTMLCollection)\]$/);
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number';
}

function isNumeric(value) {
  return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
}

function isEmpty(obj) {
  return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
}

function isUndefined(value) {
  return value === void 0;
}

function toBoolean(value) {
  return isBoolean(value) ? value : value === 'true' || value === '1' || value === '' ? true : value === 'false' || value === '0' ? false : value;
}

function toNumber(value) {
  var number = Number(value);
  return !isNaN(number) ? number : false;
}

function toFloat(value) {
  return parseFloat(value) || 0;
}

function toNode(element) {
  return isNode(element) || isWindow(element) || isDocument(element) ? element : isNodeCollection(element) || isJQuery(element) ? element[0] : isArray(element) ? toNode(element[0]) : null;
}

function toNodes(element) {
  return isNode(element) ? [element] : isNodeCollection(element) ? arrPrototype.slice.call(element) : isArray(element) ? element.map(toNode).filter(Boolean) : isJQuery(element) ? element.toArray() : [];
}

function toList(value) {
  return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(function (value) {
    return isNumeric(value) ? toNumber(value) : toBoolean(value.trim());
  }) : [value];
}

function toMs(time) {
  return !time ? 0 : endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000;
}

function isEqual(value, other) {
  return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, function (val, key) {
    return val === other[key];
  });
}

function swap(value, a, b) {
  return value.replace(new RegExp("".concat(a, "|").concat(b), 'mg'), function (match) {
    return match === a ? b : a;
  });
}

var assign = Object.assign || function (target) {
  target = Object(target);

  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    var source = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];

    if (source !== null) {
      for (var key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key];
        }
      }
    }
  }

  return target;
};

exports.assign = assign;

function last(array) {
  return array[array.length - 1];
}

function each(obj, cb) {
  for (var key in obj) {
    if (false === cb(obj[key], key)) {
      return false;
    }
  }

  return true;
}

function sortBy(array, prop) {
  return array.sort(function (_ref, _ref2) {
    var _ref$prop = _ref[prop],
        propA = _ref$prop === void 0 ? 0 : _ref$prop;
    var _ref2$prop = _ref2[prop],
        propB = _ref2$prop === void 0 ? 0 : _ref2$prop;
    return propA > propB ? 1 : propB > propA ? -1 : 0;
  });
}

function uniqueBy(array, prop) {
  var seen = new Set();
  return array.filter(function (_ref3) {
    var check = _ref3[prop];
    return seen.has(check) ? false : seen.add(check) || true;
  } // IE 11 does not return the Set object
  );
}

function clamp(number) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Math.min(Math.max(toNumber(number) || 0, min), max);
}

function noop() {}

function intersectRect(r1, r2) {
  return r1.left < r2.right && r1.right > r2.left && r1.top < r2.bottom && r1.bottom > r2.top;
}

function pointInRect(point, rect) {
  return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
}

var Dimensions = {
  ratio: function ratio(dimensions, prop, value) {
    var _ref4;

    var aProp = prop === 'width' ? 'height' : 'width';
    return _ref4 = {}, _defineProperty(_ref4, aProp, dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp]), _defineProperty(_ref4, prop, value), _ref4;
  },
  contain: function contain(dimensions, maxDimensions) {
    var _this = this;

    dimensions = assign({}, dimensions);
    each(dimensions, function (_, prop) {
      return dimensions = dimensions[prop] > maxDimensions[prop] ? _this.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
    });
    return dimensions;
  },
  cover: function cover(dimensions, maxDimensions) {
    var _this2 = this;

    dimensions = this.contain(dimensions, maxDimensions);
    each(dimensions, function (_, prop) {
      return dimensions = dimensions[prop] < maxDimensions[prop] ? _this2.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
    });
    return dimensions;
  }
};
exports.Dimensions = Dimensions;
},{}],"../js/util/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attr = attr;
exports.hasAttr = hasAttr;
exports.removeAttr = removeAttr;
exports.data = data;

var _lang = require("./lang");

function attr(element, name, value) {
  if ((0, _lang.isObject)(name)) {
    for (var key in name) {
      attr(element, key, name[key]);
    }

    return;
  }

  if ((0, _lang.isUndefined)(value)) {
    element = (0, _lang.toNode)(element);
    return element && element.getAttribute(name);
  } else {
    (0, _lang.toNodes)(element).forEach(function (element) {
      if ((0, _lang.isFunction)(value)) {
        value = value.call(element, attr(element, name));
      }

      if (value === null) {
        removeAttr(element, name);
      } else {
        element.setAttribute(name, value);
      }
    });
  }
}

function hasAttr(element, name) {
  return (0, _lang.toNodes)(element).some(function (element) {
    return element.hasAttribute(name);
  });
}

function removeAttr(element, name) {
  element = (0, _lang.toNodes)(element);
  name.split(' ').forEach(function (name) {
    return element.forEach(function (element) {
      return element.hasAttribute(name) && element.removeAttribute(name);
    });
  });
}

function data(element, attribute) {
  for (var i = 0, attrs = [attribute, "data-".concat(attribute)]; i < attrs.length; i++) {
    if (hasAttr(element, attrs[i])) {
      return attr(element, attrs[i]);
    }
  }
}
},{"./lang":"../js/util/lang.js"}],"../js/util/env.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointerCancel = exports.pointerLeave = exports.pointerEnter = exports.pointerUp = exports.pointerMove = exports.pointerDown = exports.hasTouch = exports.isRtl = exports.isIE = void 0;

var _attr = require("./attr");

/* global DocumentTouch */
var isIE = /msie|trident/i.test(window.navigator.userAgent);
exports.isIE = isIE;
var isRtl = (0, _attr.attr)(document.documentElement, 'dir') === 'rtl';
exports.isRtl = isRtl;
var hasTouchEvents = ('ontouchstart' in window);
var hasPointerEvents = window.PointerEvent;
var hasTouch = hasTouchEvents || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints; // IE >=11

exports.hasTouch = hasTouch;
var pointerDown = hasPointerEvents ? 'pointerdown' : hasTouchEvents ? 'touchstart' : 'mousedown';
exports.pointerDown = pointerDown;
var pointerMove = hasPointerEvents ? 'pointermove' : hasTouchEvents ? 'touchmove' : 'mousemove';
exports.pointerMove = pointerMove;
var pointerUp = hasPointerEvents ? 'pointerup' : hasTouchEvents ? 'touchend' : 'mouseup';
exports.pointerUp = pointerUp;
var pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouchEvents ? '' : 'mouseenter';
exports.pointerEnter = pointerEnter;
var pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouchEvents ? '' : 'mouseleave';
exports.pointerLeave = pointerLeave;
var pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';
exports.pointerCancel = pointerCancel;
},{"./attr":"../js/util/attr.js"}],"../js/util/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.queryAll = queryAll;
exports.find = find;
exports.findAll = findAll;
exports.matches = matches;
exports.closest = closest;
exports.parents = parents;
exports.escape = escape;

var _attr = require("./attr");

var _lang = require("./lang");

function query(selector, context) {
  return (0, _lang.toNode)(selector) || find(selector, getContext(selector, context));
}

function queryAll(selector, context) {
  var nodes = (0, _lang.toNodes)(selector);
  return nodes.length && nodes || findAll(selector, getContext(selector, context));
}

function getContext(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return isContextSelector(selector) || (0, _lang.isDocument)(context) ? context : context.ownerDocument;
}

function find(selector, context) {
  return (0, _lang.toNode)(_query(selector, context, 'querySelector'));
}

function findAll(selector, context) {
  return (0, _lang.toNodes)(_query(selector, context, 'querySelectorAll'));
}

function _query(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var queryFn = arguments.length > 2 ? arguments[2] : undefined;

  if (!selector || !(0, _lang.isString)(selector)) {
    return null;
  }

  selector = selector.replace(contextSanitizeRe, '$1 *');
  var removes;

  if (isContextSelector(selector)) {
    removes = [];
    selector = splitSelector(selector).map(function (selector, i) {
      var ctx = context;

      if (selector[0] === '!') {
        var selectors = selector.substr(1).trim().split(' ');
        ctx = closest(context.parentNode, selectors[0]);
        selector = selectors.slice(1).join(' ').trim();
      }

      if (selector[0] === '-') {
        var _selectors = selector.substr(1).trim().split(' ');

        var prev = (ctx || context).previousElementSibling;
        ctx = matches(prev, selector.substr(1)) ? prev : null;
        selector = _selectors.slice(1).join(' ');
      }

      if (!ctx) {
        return null;
      }

      if (!ctx.id) {
        ctx.id = "uk-".concat(Date.now()).concat(i);
        removes.push(function () {
          return (0, _attr.removeAttr)(ctx, 'id');
        });
      }

      return "#".concat(escape(ctx.id), " ").concat(selector);
    }).filter(Boolean).join(',');
    context = document;
  }

  try {
    return context[queryFn](selector);
  } catch (e) {
    return null;
  } finally {
    removes && removes.forEach(function (remove) {
      return remove();
    });
  }
}

var contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;

function isContextSelector(selector) {
  return (0, _lang.isString)(selector) && selector.match(contextSelectorRe);
}

var selectorRe = /.*?[^\\](?:,|$)/g;

function splitSelector(selector) {
  return selector.match(selectorRe).map(function (selector) {
    return selector.replace(/,$/, '').trim();
  });
}

var elProto = Element.prototype;
var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;

function matches(element, selector) {
  return (0, _lang.toNodes)(element).some(function (element) {
    return matchesFn.call(element, selector);
  });
}

var closestFn = elProto.closest || function (selector) {
  var ancestor = this;

  do {
    if (matches(ancestor, selector)) {
      return ancestor;
    }

    ancestor = ancestor.parentNode;
  } while (ancestor && ancestor.nodeType === 1);
};

function closest(element, selector) {
  if ((0, _lang.startsWith)(selector, '>')) {
    selector = selector.slice(1);
  }

  return (0, _lang.isNode)(element) ? closestFn.call(element, selector) : (0, _lang.toNodes)(element).map(function (element) {
    return closest(element, selector);
  }).filter(Boolean);
}

function parents(element, selector) {
  var elements = [];
  element = (0, _lang.toNode)(element);

  while ((element = element.parentNode) && element.nodeType === 1) {
    if (matches(element, selector)) {
      elements.push(element);
    }
  }

  return elements;
}

var escapeFn = window.CSS && CSS.escape || function (css) {
  return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) {
    return "\\".concat(match);
  });
};

function escape(css) {
  return (0, _lang.isString)(css) ? escapeFn.call(null, css) : '';
}
},{"./attr":"../js/util/attr.js","./lang":"../js/util/lang.js"}],"../js/util/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVoidElement = isVoidElement;
exports.isVisible = isVisible;
exports.isInput = isInput;
exports.filter = filter;
exports.within = within;
exports.selInput = void 0;

var _selector = require("./selector");

var _lang = require("./lang");

var voidElements = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  menuitem: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

function isVoidElement(element) {
  return (0, _lang.toNodes)(element).some(function (element) {
    return voidElements[element.tagName.toLowerCase()];
  });
}

function isVisible(element) {
  return (0, _lang.toNodes)(element).some(function (element) {
    return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
  });
}

var selInput = 'input,select,textarea,button';
exports.selInput = selInput;

function isInput(element) {
  return (0, _lang.toNodes)(element).some(function (element) {
    return (0, _selector.matches)(element, selInput);
  });
}

function filter(element, selector) {
  return (0, _lang.toNodes)(element).filter(function (element) {
    return (0, _selector.matches)(element, selector);
  });
}

function within(element, selector) {
  return !(0, _lang.isString)(selector) ? element === selector || ((0, _lang.isDocument)(selector) ? selector.documentElement : (0, _lang.toNode)(selector)).contains((0, _lang.toNode)(element)) // IE 11 document does not implement contains
  : (0, _selector.matches)(element, selector) || (0, _selector.closest)(element, selector);
}
},{"./selector":"../js/util/selector.js","./lang":"../js/util/lang.js"}],"../js/util/event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.off = off;
exports.once = once;
exports.trigger = trigger;
exports.createEvent = createEvent;
exports.toEventTargets = toEventTargets;
exports.isTouch = isTouch;
exports.getEventPos = getEventPos;

var _env = require("./env");

var _filter = require("./filter");

var _selector = require("./selector");

var _lang = require("./lang");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function on() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _getArgs = getArgs(args),
      _getArgs2 = _slicedToArray(_getArgs, 5),
      targets = _getArgs2[0],
      type = _getArgs2[1],
      selector = _getArgs2[2],
      listener = _getArgs2[3],
      useCapture = _getArgs2[4];

  targets = toEventTargets(targets);

  if (listener.length > 1) {
    listener = detail(listener);
  }

  if (useCapture && useCapture.self) {
    listener = selfFilter(listener);
  }

  if (selector) {
    listener = delegate(targets, selector, listener);
  }

  useCapture = useCaptureFilter(useCapture);
  type.split(' ').forEach(function (type) {
    return targets.forEach(function (target) {
      return target.addEventListener(type, listener, useCapture);
    });
  });
  return function () {
    return off(targets, type, listener, useCapture);
  };
}

function off(targets, type, listener) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  useCapture = useCaptureFilter(useCapture);
  targets = toEventTargets(targets);
  type.split(' ').forEach(function (type) {
    return targets.forEach(function (target) {
      return target.removeEventListener(type, listener, useCapture);
    });
  });
}

function once() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var _getArgs3 = getArgs(args),
      _getArgs4 = _slicedToArray(_getArgs3, 6),
      element = _getArgs4[0],
      type = _getArgs4[1],
      selector = _getArgs4[2],
      listener = _getArgs4[3],
      useCapture = _getArgs4[4],
      condition = _getArgs4[5];

  var off = on(element, type, selector, function (e) {
    var result = !condition || condition(e);

    if (result) {
      off();
      listener(e, result);
    }
  }, useCapture);
  return off;
}

function trigger(targets, event, detail) {
  return toEventTargets(targets).reduce(function (notCanceled, target) {
    return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail));
  }, true);
}

function createEvent(e) {
  var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var detail = arguments.length > 3 ? arguments[3] : undefined;

  if ((0, _lang.isString)(e)) {
    var event = document.createEvent('CustomEvent'); // IE 11

    event.initCustomEvent(e, bubbles, cancelable, detail);
    e = event;
  }

  return e;
}

function getArgs(args) {
  if ((0, _lang.isFunction)(args[2])) {
    args.splice(2, 0, false);
  }

  return args;
}

function delegate(delegates, selector, listener) {
  var _this = this;

  return function (e) {
    delegates.forEach(function (delegate) {
      var current = selector[0] === '>' ? (0, _selector.findAll)(selector, delegate).reverse().filter(function (element) {
        return (0, _filter.within)(e.target, element);
      })[0] : (0, _selector.closest)(e.target, selector);

      if (current) {
        e.delegate = delegate;
        e.current = current;
        listener.call(_this, e);
      }
    });
  };
}

function detail(listener) {
  return function (e) {
    return (0, _lang.isArray)(e.detail) ? listener.apply(void 0, _toConsumableArray([e].concat(e.detail))) : listener(e);
  };
}

function selfFilter(listener) {
  return function (e) {
    if (e.target === e.currentTarget || e.target === e.current) {
      return listener.call(null, e);
    }
  };
}

function useCaptureFilter(options) {
  return options && _env.isIE && !(0, _lang.isBoolean)(options) ? !!options.capture : options;
}

function isEventTarget(target) {
  return target && 'addEventListener' in target;
}

function toEventTarget(target) {
  return isEventTarget(target) ? target : (0, _lang.toNode)(target);
}

function toEventTargets(target) {
  return (0, _lang.isArray)(target) ? target.map(toEventTarget).filter(Boolean) : (0, _lang.isString)(target) ? (0, _selector.findAll)(target) : isEventTarget(target) ? [target] : (0, _lang.toNodes)(target);
}

function isTouch(e) {
  return e.pointerType === 'touch' || !!e.touches;
}

function getEventPos(e) {
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'client';
  var touches = e.touches,
      changedTouches = e.changedTouches;

  var _ref = touches && touches[0] || changedTouches && changedTouches[0] || e,
      x = _ref["".concat(prop, "X")],
      y = _ref["".concat(prop, "Y")];

  return {
    x: x,
    y: y
  };
}
},{"./env":"../js/util/env.js","./filter":"../js/util/filter.js","./selector":"../js/util/selector.js","./lang":"../js/util/lang.js"}],"../js/util/promise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deferred = exports.Promise = void 0;

var _lang = require("./lang");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = 'Promise' in window ? window.Promise : PromiseFn;
exports.Promise = Promise;

var Deferred = function Deferred() {
  var _this = this;

  _classCallCheck(this, Deferred);

  this.promise = new Promise(function (resolve, reject) {
    _this.reject = reject;
    _this.resolve = resolve;
  });
};
/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */


exports.Deferred = Deferred;
var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;
var async = 'setImmediate' in window ? setImmediate : setTimeout;

function PromiseFn(executor) {
  this.state = PENDING;
  this.value = undefined;
  this.deferred = [];
  var promise = this;

  try {
    executor(function (x) {
      promise.resolve(x);
    }, function (r) {
      promise.reject(r);
    });
  } catch (e) {
    promise.reject(e);
  }
}

PromiseFn.reject = function (r) {
  return new PromiseFn(function (resolve, reject) {
    reject(r);
  });
};

PromiseFn.resolve = function (x) {
  return new PromiseFn(function (resolve, reject) {
    resolve(x);
  });
};

PromiseFn.all = function all(iterable) {
  return new PromiseFn(function (resolve, reject) {
    var result = [];
    var count = 0;

    if (iterable.length === 0) {
      resolve(result);
    }

    function resolver(i) {
      return function (x) {
        result[i] = x;
        count += 1;

        if (count === iterable.length) {
          resolve(result);
        }
      };
    }

    for (var i = 0; i < iterable.length; i += 1) {
      PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
    }
  });
};

PromiseFn.race = function race(iterable) {
  return new PromiseFn(function (resolve, reject) {
    for (var i = 0; i < iterable.length; i += 1) {
      PromiseFn.resolve(iterable[i]).then(resolve, reject);
    }
  });
};

var p = PromiseFn.prototype;

p.resolve = function resolve(x) {
  var promise = this;

  if (promise.state === PENDING) {
    if (x === promise) {
      throw new TypeError('Promise settled with itself.');
    }

    var called = false;

    try {
      var then = x && x.then;

      if (x !== null && (0, _lang.isObject)(x) && (0, _lang.isFunction)(then)) {
        then.call(x, function (x) {
          if (!called) {
            promise.resolve(x);
          }

          called = true;
        }, function (r) {
          if (!called) {
            promise.reject(r);
          }

          called = true;
        });
        return;
      }
    } catch (e) {
      if (!called) {
        promise.reject(e);
      }

      return;
    }

    promise.state = RESOLVED;
    promise.value = x;
    promise.notify();
  }
};

p.reject = function reject(reason) {
  var promise = this;

  if (promise.state === PENDING) {
    if (reason === promise) {
      throw new TypeError('Promise settled with itself.');
    }

    promise.state = REJECTED;
    promise.value = reason;
    promise.notify();
  }
};

p.notify = function notify() {
  var _this2 = this;

  async(function () {
    if (_this2.state !== PENDING) {
      while (_this2.deferred.length) {
        var _this2$deferred$shift = _this2.deferred.shift(),
            _this2$deferred$shift2 = _slicedToArray(_this2$deferred$shift, 4),
            onResolved = _this2$deferred$shift2[0],
            onRejected = _this2$deferred$shift2[1],
            resolve = _this2$deferred$shift2[2],
            reject = _this2$deferred$shift2[3];

        try {
          if (_this2.state === RESOLVED) {
            if ((0, _lang.isFunction)(onResolved)) {
              resolve(onResolved.call(undefined, _this2.value));
            } else {
              resolve(_this2.value);
            }
          } else if (_this2.state === REJECTED) {
            if ((0, _lang.isFunction)(onRejected)) {
              resolve(onRejected.call(undefined, _this2.value));
            } else {
              reject(_this2.value);
            }
          }
        } catch (e) {
          reject(e);
        }
      }
    }
  });
};

p.then = function then(onResolved, onRejected) {
  var _this3 = this;

  return new PromiseFn(function (resolve, reject) {
    _this3.deferred.push([onResolved, onRejected, resolve, reject]);

    _this3.notify();
  });
};

p.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};
},{"./lang":"../js/util/lang.js"}],"../js/util/ajax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajax = ajax;
exports.getImage = getImage;

var _event = require("./event");

var _promise = require("./promise");

var _lang = require("./lang");

function ajax(url, options) {
  return new _promise.Promise(function (resolve, reject) {
    var env = (0, _lang.assign)({
      data: null,
      method: 'GET',
      headers: {},
      xhr: new XMLHttpRequest(),
      beforeSend: _lang.noop,
      responseType: ''
    }, options);
    env.beforeSend(env);
    var xhr = env.xhr;

    for (var prop in env) {
      if (prop in xhr) {
        try {
          xhr[prop] = env[prop];
        } catch (e) {}
      }
    }

    xhr.open(env.method.toUpperCase(), url);

    for (var header in env.headers) {
      xhr.setRequestHeader(header, env.headers[header]);
    }

    (0, _event.on)(xhr, 'load', function () {
      if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        resolve(xhr);
      } else {
        reject((0, _lang.assign)(Error(xhr.statusText), {
          xhr: xhr,
          status: xhr.status
        }));
      }
    });
    (0, _event.on)(xhr, 'error', function () {
      return reject((0, _lang.assign)(Error('Network Error'), {
        xhr: xhr
      }));
    });
    (0, _event.on)(xhr, 'timeout', function () {
      return reject((0, _lang.assign)(Error('Network Timeout'), {
        xhr: xhr
      }));
    });
    xhr.send(env.data);
  });
}

function getImage(src, srcset, sizes) {
  return new _promise.Promise(function (resolve, reject) {
    var img = new Image();
    img.onerror = reject;

    img.onload = function () {
      return resolve(img);
    };

    sizes && (img.sizes = sizes);
    srcset && (img.srcset = srcset);
    img.src = src;
  });
}
},{"./event":"../js/util/event.js","./promise":"../js/util/promise.js","./lang":"../js/util/lang.js"}],"../js/util/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ready = ready;
exports.index = index;
exports.getIndex = getIndex;
exports.empty = empty;
exports.html = html;
exports.prepend = prepend;
exports.append = append;
exports.before = before;
exports.after = after;
exports.remove = remove;
exports.wrapAll = wrapAll;
exports.wrapInner = wrapInner;
exports.unwrap = unwrap;
exports.fragment = fragment;
exports.apply = apply;
exports.$ = $;
exports.$$ = $$;

var _event = require("./event");

var _selector = require("./selector");

var _lang = require("./lang");

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
    return;
  }

  var unbind = (0, _event.on)(document, 'DOMContentLoaded', function () {
    unbind();
    fn();
  });
}

function index(element, ref) {
  return ref ? (0, _lang.toNodes)(element).indexOf((0, _lang.toNode)(ref)) : (0, _lang.toNodes)((element = (0, _lang.toNode)(element)) && element.parentNode.children).indexOf(element);
}

function getIndex(i, elements) {
  var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var finite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  elements = (0, _lang.toNodes)(elements);
  var _elements = elements,
      length = _elements.length;
  i = (0, _lang.isNumeric)(i) ? (0, _lang.toNumber)(i) : i === 'next' ? current + 1 : i === 'previous' ? current - 1 : index(elements, i);

  if (finite) {
    return (0, _lang.clamp)(i, 0, length - 1);
  }

  i %= length;
  return i < 0 ? i + length : i;
}

function empty(element) {
  element = $(element);
  element.innerHTML = '';
  return element;
}

function html(parent, html) {
  parent = $(parent);
  return (0, _lang.isUndefined)(html) ? parent.innerHTML : append(parent.hasChildNodes() ? empty(parent) : parent, html);
}

function prepend(parent, element) {
  parent = $(parent);

  if (!parent.hasChildNodes()) {
    return append(parent, element);
  } else {
    return insertNodes(element, function (element) {
      return parent.insertBefore(element, parent.firstChild);
    });
  }
}

function append(parent, element) {
  parent = $(parent);
  return insertNodes(element, function (element) {
    return parent.appendChild(element);
  });
}

function before(ref, element) {
  ref = $(ref);
  return insertNodes(element, function (element) {
    return ref.parentNode.insertBefore(element, ref);
  });
}

function after(ref, element) {
  ref = $(ref);
  return insertNodes(element, function (element) {
    return ref.nextSibling ? before(ref.nextSibling, element) : append(ref.parentNode, element);
  });
}

function insertNodes(element, fn) {
  element = (0, _lang.isString)(element) ? fragment(element) : element;
  return element ? 'length' in element ? (0, _lang.toNodes)(element).map(fn) : fn(element) : null;
}

function remove(element) {
  (0, _lang.toNodes)(element).map(function (element) {
    return element.parentNode && element.parentNode.removeChild(element);
  });
}

function wrapAll(element, structure) {
  structure = (0, _lang.toNode)(before(element, structure));

  while (structure.firstChild) {
    structure = structure.firstChild;
  }

  append(structure, element);
  return structure;
}

function wrapInner(element, structure) {
  return (0, _lang.toNodes)((0, _lang.toNodes)(element).map(function (element) {
    return element.hasChildNodes ? wrapAll((0, _lang.toNodes)(element.childNodes), structure) : append(element, structure);
  }));
}

function unwrap(element) {
  (0, _lang.toNodes)(element).map(function (element) {
    return element.parentNode;
  }).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  }).forEach(function (parent) {
    before(parent, parent.childNodes);
    remove(parent);
  });
}

var fragmentRe = /^\s*<(\w+|!)[^>]*>/;
var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

function fragment(html) {
  var matches = singleTagRe.exec(html);

  if (matches) {
    return document.createElement(matches[1]);
  }

  var container = document.createElement('div');

  if (fragmentRe.test(html)) {
    container.insertAdjacentHTML('beforeend', html.trim());
  } else {
    container.textContent = html;
  }

  return container.childNodes.length > 1 ? (0, _lang.toNodes)(container.childNodes) : container.firstChild;
}

function apply(node, fn) {
  if (!node || node.nodeType !== 1) {
    return;
  }

  fn(node);
  node = node.firstElementChild;

  while (node) {
    apply(node, fn);
    node = node.nextElementSibling;
  }
}

function $(selector, context) {
  return !(0, _lang.isString)(selector) ? (0, _lang.toNode)(selector) : isHtml(selector) ? (0, _lang.toNode)(fragment(selector)) : (0, _selector.find)(selector, context);
}

function $$(selector, context) {
  return !(0, _lang.isString)(selector) ? (0, _lang.toNodes)(selector) : isHtml(selector) ? (0, _lang.toNodes)(fragment(selector)) : (0, _selector.findAll)(selector, context);
}

function isHtml(str) {
  return str[0] === '<' || str.match(/^\s*</);
}
},{"./event":"../js/util/event.js","./selector":"../js/util/selector.js","./lang":"../js/util/lang.js"}],"../js/util/class.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.removeClasses = removeClasses;
exports.replaceClass = replaceClass;
exports.hasClass = hasClass;
exports.toggleClass = toggleClass;

var _attr = require("./attr");

var _lang = require("./lang");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function addClass(element) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  apply(element, args, 'add');
}

function removeClass(element) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  apply(element, args, 'remove');
}

function removeClasses(element, cls) {
  (0, _attr.attr)(element, 'class', function (value) {
    return (value || '').replace(new RegExp("\\b".concat(cls, "\\b"), 'g'), '');
  });
}

function replaceClass(element) {
  (arguments.length <= 1 ? undefined : arguments[1]) && removeClass(element, arguments.length <= 1 ? undefined : arguments[1]);
  (arguments.length <= 2 ? undefined : arguments[2]) && addClass(element, arguments.length <= 2 ? undefined : arguments[2]);
}

function hasClass(element, cls) {
  return cls && (0, _lang.toNodes)(element).some(function (element) {
    return element.classList.contains(cls.split(' ')[0]);
  });
}

function toggleClass(element) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  if (!args.length) {
    return;
  }

  args = getArgs(args);
  var force = !(0, _lang.isString)((0, _lang.last)(args)) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

  args = args.filter(Boolean);
  (0, _lang.toNodes)(element).forEach(function (_ref) {
    var classList = _ref.classList;

    for (var i = 0; i < args.length; i++) {
      supports.Force ? classList.toggle.apply(classList, _toConsumableArray([args[i]].concat(force))) : classList[(!(0, _lang.isUndefined)(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]);
    }
  });
}

function apply(element, args, fn) {
  args = getArgs(args).filter(Boolean);
  args.length && (0, _lang.toNodes)(element).forEach(function (_ref2) {
    var classList = _ref2.classList;
    supports.Multiple ? classList[fn].apply(classList, _toConsumableArray(args)) : args.forEach(function (cls) {
      return classList[fn](cls);
    });
  });
}

function getArgs(args) {
  return args.reduce(function (args, arg) {
    return args.concat.call(args, (0, _lang.isString)(arg) && (0, _lang.includes)(arg, ' ') ? arg.trim().split(' ') : arg);
  }, []);
} // IE 11


var supports = {
  get Multiple() {
    return this.get('_multiple');
  },

  get Force() {
    return this.get('_force');
  },

  get: function get(key) {
    if (!(0, _lang.hasOwn)(this, key)) {
      var _document$createEleme = document.createElement('_'),
          classList = _document$createEleme.classList;

      classList.add('a', 'b');
      classList.toggle('c', false);
      this._multiple = classList.contains('b');
      this._force = !classList.contains('c');
    }

    return this[key];
  }
};
},{"./attr":"../js/util/attr.js","./lang":"../js/util/lang.js"}],"../js/util/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = css;
exports.getStyles = getStyles;
exports.getStyle = getStyle;
exports.getCssVar = getCssVar;
exports.propName = propName;

var _env = require("./env");

var _dom = require("./dom");

var _class = require("./class");

var _lang = require("./lang");

var cssNumber = {
  'animation-iteration-count': true,
  'column-count': true,
  'fill-opacity': true,
  'flex-grow': true,
  'flex-shrink': true,
  'font-weight': true,
  'line-height': true,
  'opacity': true,
  'order': true,
  'orphans': true,
  'stroke-dasharray': true,
  'stroke-dashoffset': true,
  'widows': true,
  'z-index': true,
  'zoom': true
};

function css(element, property, value) {
  return (0, _lang.toNodes)(element).map(function (element) {
    if ((0, _lang.isString)(property)) {
      property = propName(property);

      if ((0, _lang.isUndefined)(value)) {
        return getStyle(element, property);
      } else if (!value && !(0, _lang.isNumber)(value)) {
        element.style.removeProperty(property);
      } else {
        element.style[property] = (0, _lang.isNumeric)(value) && !cssNumber[property] ? "".concat(value, "px") : value;
      }
    } else if ((0, _lang.isArray)(property)) {
      var styles = getStyles(element);
      return property.reduce(function (props, property) {
        props[property] = styles[propName(property)];
        return props;
      }, {});
    } else if ((0, _lang.isObject)(property)) {
      (0, _lang.each)(property, function (value, property) {
        return css(element, property, value);
      });
    }

    return element;
  })[0];
}

function getStyles(element, pseudoElt) {
  element = (0, _lang.toNode)(element);
  return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt);
}

function getStyle(element, property, pseudoElt) {
  return getStyles(element, pseudoElt)[property];
}

var vars = {};

function getCssVar(name) {
  var docEl = document.documentElement;

  if (!_env.isIE) {
    return getStyles(docEl).getPropertyValue("--uk-".concat(name));
  }

  if (!(name in vars)) {
    /* usage in css: .uk-name:before { content:"xyz" } */
    var element = (0, _dom.append)(docEl, document.createElement('div'));
    (0, _class.addClass)(element, "uk-".concat(name));
    vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
    (0, _dom.remove)(element);
  }

  return vars[name];
}

var cssProps = {};

function propName(name) {
  var ret = cssProps[name];

  if (!ret) {
    ret = cssProps[name] = vendorPropName(name) || name;
  }

  return ret;
}

var cssPrefixes = ['webkit', 'moz', 'ms'];

function vendorPropName(name) {
  name = (0, _lang.hyphenate)(name);
  var style = document.documentElement.style;

  if (name in style) {
    return name;
  }

  var i = cssPrefixes.length,
      prefixedName;

  while (i--) {
    prefixedName = "-".concat(cssPrefixes[i], "-").concat(name);

    if (prefixedName in style) {
      return prefixedName;
    }
  }
}
},{"./env":"../js/util/env.js","./dom":"../js/util/dom.js","./class":"../js/util/class.js","./lang":"../js/util/lang.js"}],"../js/util/animation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transition = transition;
exports.animate = animate;
exports.Animation = exports.Transition = void 0;

var _attr = require("./attr");

var _promise = require("./promise");

var _event = require("./event");

var _style = require("./style");

var _lang = require("./lang");

var _class = require("./class");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function transition(element, props) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
  var timing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'linear';
  return _promise.Promise.all((0, _lang.toNodes)(element).map(function (element) {
    return new _promise.Promise(function (resolve, reject) {
      for (var name in props) {
        var value = (0, _style.css)(element, name);

        if (value === '') {
          (0, _style.css)(element, name, value);
        }
      }

      var timer = setTimeout(function () {
        return (0, _event.trigger)(element, 'transitionend');
      }, duration);
      (0, _event.once)(element, 'transitionend transitioncanceled', function (_ref) {
        var type = _ref.type;
        clearTimeout(timer);
        (0, _class.removeClass)(element, 'uk-transition');
        (0, _style.css)(element, {
          'transition-property': '',
          'transition-duration': '',
          'transition-timing-function': ''
        });
        type === 'transitioncanceled' ? reject() : resolve();
      }, {
        self: true
      });
      (0, _class.addClass)(element, 'uk-transition');
      (0, _style.css)(element, (0, _lang.assign)({
        'transition-property': Object.keys(props).map(_style.propName).join(','),
        'transition-duration': "".concat(duration, "ms"),
        'transition-timing-function': timing
      }, props));
    });
  }));
}

var Transition = {
  start: transition,
  stop: function stop(element) {
    (0, _event.trigger)(element, 'transitionend');
    return _promise.Promise.resolve();
  },
  cancel: function cancel(element) {
    (0, _event.trigger)(element, 'transitioncanceled');
  },
  inProgress: function inProgress(element) {
    return (0, _class.hasClass)(element, 'uk-transition');
  }
};
exports.Transition = Transition;
var animationPrefix = 'uk-animation-';
var clsCancelAnimation = 'uk-cancel-animation';

function animate(element, animation) {
  var _arguments = arguments;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var origin = arguments.length > 3 ? arguments[3] : undefined;
  var out = arguments.length > 4 ? arguments[4] : undefined;
  return _promise.Promise.all((0, _lang.toNodes)(element).map(function (element) {
    return new _promise.Promise(function (resolve, reject) {
      if ((0, _class.hasClass)(element, clsCancelAnimation)) {
        requestAnimationFrame(function () {
          return _promise.Promise.resolve().then(function () {
            return animate.apply(void 0, _toConsumableArray(_arguments)).then(resolve, reject);
          });
        });
        return;
      }

      var cls = "".concat(animation, " ").concat(animationPrefix).concat(out ? 'leave' : 'enter');

      if ((0, _lang.startsWith)(animation, animationPrefix)) {
        if (origin) {
          cls += " uk-transform-origin-".concat(origin);
        }

        if (out) {
          cls += " ".concat(animationPrefix, "reverse");
        }
      }

      reset();
      (0, _event.once)(element, 'animationend animationcancel', function (_ref2) {
        var type = _ref2.type;
        var hasReset = false;

        if (type === 'animationcancel') {
          reject();
          reset();
        } else {
          resolve();

          _promise.Promise.resolve().then(function () {
            hasReset = true;
            reset();
          });
        }

        requestAnimationFrame(function () {
          if (!hasReset) {
            (0, _class.addClass)(element, clsCancelAnimation);
            requestAnimationFrame(function () {
              return (0, _class.removeClass)(element, clsCancelAnimation);
            });
          }
        });
      }, {
        self: true
      });
      (0, _style.css)(element, 'animationDuration', "".concat(duration, "ms"));
      (0, _class.addClass)(element, cls);

      function reset() {
        (0, _style.css)(element, 'animationDuration', '');
        (0, _class.removeClasses)(element, "".concat(animationPrefix, "\\S*"));
      }
    });
  }));
}

var _inProgress = new RegExp("".concat(animationPrefix, "(enter|leave)"));

var Animation = {
  in: function _in(element, animation, duration, origin) {
    return animate(element, animation, duration, origin, false);
  },
  out: function out(element, animation, duration, origin) {
    return animate(element, animation, duration, origin, true);
  },
  inProgress: function inProgress(element) {
    return _inProgress.test((0, _attr.attr)(element, 'class'));
  },
  cancel: function cancel(element) {
    (0, _event.trigger)(element, 'animationcancel');
  }
};
exports.Animation = Animation;
},{"./attr":"../js/util/attr.js","./promise":"../js/util/promise.js","./event":"../js/util/event.js","./style":"../js/util/style.js","./lang":"../js/util/lang.js","./class":"../js/util/class.js"}],"../js/util/dimensions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionAt = positionAt;
exports.offset = offset;
exports.position = position;
exports.boxModelAdjust = boxModelAdjust;
exports.flipPosition = flipPosition;
exports.isInView = isInView;
exports.scrolledOver = scrolledOver;
exports.scrollTop = scrollTop;
exports.offsetPosition = offsetPosition;
exports.toPx = toPx;
exports.width = exports.height = void 0;

var _style = require("./style");

var _attr = require("./attr");

var _filter = require("./filter");

var _lang = require("./lang");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dirs = {
  width: ['x', 'left', 'right'],
  height: ['y', 'top', 'bottom']
};

function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {
  elAttach = getPos(elAttach);
  targetAttach = getPos(targetAttach);
  var flipped = {
    element: elAttach,
    target: targetAttach
  };

  if (!element || !target) {
    return flipped;
  }

  var dim = getDimensions(element);
  var targetDim = getDimensions(target);
  var position = targetDim;
  moveTo(position, elAttach, dim, -1);
  moveTo(position, targetAttach, targetDim, 1);
  elOffset = getOffsets(elOffset, dim.width, dim.height);
  targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);
  elOffset['x'] += targetOffset['x'];
  elOffset['y'] += targetOffset['y'];
  position.left += elOffset['x'];
  position.top += elOffset['y'];

  if (flip) {
    var boundaries = [getDimensions(getWindow(element))];

    if (boundary) {
      boundaries.unshift(getDimensions(boundary));
    }

    (0, _lang.each)(dirs, function (_ref, prop) {
      var _ref2 = _slicedToArray(_ref, 3),
          dir = _ref2[0],
          align = _ref2[1],
          alignFlip = _ref2[2];

      if (!(flip === true || (0, _lang.includes)(flip, dir))) {
        return;
      }

      boundaries.some(function (boundary) {
        var elemOffset = elAttach[dir] === align ? -dim[prop] : elAttach[dir] === alignFlip ? dim[prop] : 0;
        var targetOffset = targetAttach[dir] === align ? targetDim[prop] : targetAttach[dir] === alignFlip ? -targetDim[prop] : 0;

        if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {
          var centerOffset = dim[prop] / 2;
          var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;
          return elAttach[dir] === 'center' && (apply(centerOffset, centerTargetOffset) || apply(-centerOffset, -centerTargetOffset)) || apply(elemOffset, targetOffset);
        }

        function apply(elemOffset, targetOffset) {
          var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

          if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
            position[align] = newVal;
            ['element', 'target'].forEach(function (el) {
              flipped[el][dir] = !elemOffset ? flipped[el][dir] : flipped[el][dir] === dirs[prop][1] ? dirs[prop][2] : dirs[prop][1];
            });
            return true;
          }
        }
      });
    });
  }

  offset(element, position);
  return flipped;
}

function offset(element, coordinates) {
  element = (0, _lang.toNode)(element);

  if (coordinates) {
    var currentOffset = offset(element);
    var pos = (0, _style.css)(element, 'position');
    ['left', 'top'].forEach(function (prop) {
      if (prop in coordinates) {
        var value = (0, _style.css)(element, prop);
        (0, _style.css)(element, prop, coordinates[prop] - currentOffset[prop] + (0, _lang.toFloat)(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value));
      }
    });
    return;
  }

  return getDimensions(element);
}

function getDimensions(element) {
  element = (0, _lang.toNode)(element);

  if (!element) {
    return {};
  }

  var _getWindow = getWindow(element),
      top = _getWindow.pageYOffset,
      left = _getWindow.pageXOffset;

  if ((0, _lang.isWindow)(element)) {
    var _height = element.innerHeight;
    var _width = element.innerWidth;
    return {
      top: top,
      left: left,
      height: _height,
      width: _width,
      bottom: top + _height,
      right: left + _width
    };
  }

  var style, hidden;

  if (!(0, _filter.isVisible)(element) && (0, _style.css)(element, 'display') === 'none') {
    style = (0, _attr.attr)(element, 'style');
    hidden = (0, _attr.attr)(element, 'hidden');
    (0, _attr.attr)(element, {
      style: "".concat(style || '', ";display:block !important;"),
      hidden: null
    });
  }

  var rect = element.getBoundingClientRect();

  if (!(0, _lang.isUndefined)(style)) {
    (0, _attr.attr)(element, {
      style: style,
      hidden: hidden
    });
  }

  return {
    height: rect.height,
    width: rect.width,
    top: rect.top + top,
    left: rect.left + left,
    bottom: rect.bottom + top,
    right: rect.right + left
  };
}

function position(element) {
  element = (0, _lang.toNode)(element);
  var parent = element.offsetParent || getDocEl(element);
  var parentOffset = offset(parent);

  var _reduce = ['top', 'left'].reduce(function (props, prop) {
    var propName = (0, _lang.ucfirst)(prop);
    props[prop] -= parentOffset[prop] + (0, _lang.toFloat)((0, _style.css)(element, "margin".concat(propName))) + (0, _lang.toFloat)((0, _style.css)(parent, "border".concat(propName, "Width")));
    return props;
  }, offset(element)),
      top = _reduce.top,
      left = _reduce.left;

  return {
    top: top,
    left: left
  };
}

var height = dimension('height');
exports.height = height;
var width = dimension('width');
exports.width = width;

function dimension(prop) {
  var propName = (0, _lang.ucfirst)(prop);
  return function (element, value) {
    element = (0, _lang.toNode)(element);

    if ((0, _lang.isUndefined)(value)) {
      if ((0, _lang.isWindow)(element)) {
        return element["inner".concat(propName)];
      }

      if ((0, _lang.isDocument)(element)) {
        var doc = element.documentElement;
        return Math.max(doc["offset".concat(propName)], doc["scroll".concat(propName)]);
      }

      value = (0, _style.css)(element, prop);
      value = value === 'auto' ? element["offset".concat(propName)] : (0, _lang.toFloat)(value) || 0;
      return value - boxModelAdjust(prop, element);
    } else {
      (0, _style.css)(element, prop, !value && value !== 0 ? '' : +value + boxModelAdjust(prop, element) + 'px');
    }
  };
}

function boxModelAdjust(prop, element) {
  var sizing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'border-box';
  return (0, _style.css)(element, 'boxSizing') === sizing ? dirs[prop].slice(1).map(_lang.ucfirst).reduce(function (value, prop) {
    return value + (0, _lang.toFloat)((0, _style.css)(element, "padding".concat(prop))) + (0, _lang.toFloat)((0, _style.css)(element, "border".concat(prop, "Width")));
  }, 0) : 0;
}

function moveTo(position, attach, dim, factor) {
  (0, _lang.each)(dirs, function (_ref3, prop) {
    var _ref4 = _slicedToArray(_ref3, 3),
        dir = _ref4[0],
        align = _ref4[1],
        alignFlip = _ref4[2];

    if (attach[dir] === alignFlip) {
      position[align] += dim[prop] * factor;
    } else if (attach[dir] === 'center') {
      position[align] += dim[prop] * factor / 2;
    }
  });
}

function getPos(pos) {
  var x = /left|center|right/;
  var y = /top|center|bottom/;
  pos = (pos || '').split(' ');

  if (pos.length === 1) {
    pos = x.test(pos[0]) ? pos.concat(['center']) : y.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
  }

  return {
    x: x.test(pos[0]) ? pos[0] : 'center',
    y: y.test(pos[1]) ? pos[1] : 'center'
  };
}

function getOffsets(offsets, width, height) {
  var _split = (offsets || '').split(' '),
      _split2 = _slicedToArray(_split, 2),
      x = _split2[0],
      y = _split2[1];

  return {
    x: x ? (0, _lang.toFloat)(x) * ((0, _lang.endsWith)(x, '%') ? width / 100 : 1) : 0,
    y: y ? (0, _lang.toFloat)(y) * ((0, _lang.endsWith)(y, '%') ? height / 100 : 1) : 0
  };
}

function flipPosition(pos) {
  switch (pos) {
    case 'left':
      return 'right';

    case 'right':
      return 'left';

    case 'top':
      return 'bottom';

    case 'bottom':
      return 'top';

    default:
      return pos;
  }
}

function isInView(element) {
  var topOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var leftOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!(0, _filter.isVisible)(element)) {
    return false;
  }

  element = (0, _lang.toNode)(element);
  var win = getWindow(element);
  var client = element.getBoundingClientRect();
  var bounding = {
    top: -topOffset,
    left: -leftOffset,
    bottom: topOffset + height(win),
    right: leftOffset + width(win)
  };
  return (0, _lang.intersectRect)(client, bounding) || (0, _lang.pointInRect)({
    x: client.left,
    y: client.top
  }, bounding);
}

function scrolledOver(element) {
  var heightOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!(0, _filter.isVisible)(element)) {
    return 0;
  }

  element = (0, _lang.toNode)(element);
  var win = getWindow(element);
  var doc = getDocument(element);
  var elHeight = element.offsetHeight + heightOffset;

  var _offsetPosition = offsetPosition(element),
      _offsetPosition2 = _slicedToArray(_offsetPosition, 1),
      top = _offsetPosition2[0];

  var vp = height(win);
  var vh = vp + Math.min(0, top - vp);
  var diff = Math.max(0, vp - (height(doc) + heightOffset - (top + elHeight)));
  return (0, _lang.clamp)((vh + win.pageYOffset - top) / ((vh + (elHeight - (diff < vp ? diff : 0))) / 100) / 100);
}

function scrollTop(element, top) {
  element = (0, _lang.toNode)(element);

  if ((0, _lang.isWindow)(element) || (0, _lang.isDocument)(element)) {
    var _getWindow2 = getWindow(element),
        scrollTo = _getWindow2.scrollTo,
        pageXOffset = _getWindow2.pageXOffset;

    scrollTo(pageXOffset, top);
  } else {
    element.scrollTop = top;
  }
}

function offsetPosition(element) {
  var offset = [0, 0];

  do {
    offset[0] += element.offsetTop;
    offset[1] += element.offsetLeft;

    if ((0, _style.css)(element, 'position') === 'fixed') {
      var win = getWindow(element);
      offset[0] += win.pageYOffset;
      offset[1] += win.pageXOffset;
      return offset;
    }
  } while (element = element.offsetParent);

  return offset;
}

function toPx(value) {
  var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'width';
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  return (0, _lang.isNumeric)(value) ? +value : (0, _lang.endsWith)(value, 'vh') ? percent(height(getWindow(element)), value) : (0, _lang.endsWith)(value, 'vw') ? percent(width(getWindow(element)), value) : (0, _lang.endsWith)(value, '%') ? percent(getDimensions(element)[property], value) : (0, _lang.toFloat)(value);
}

function percent(base, value) {
  return base * (0, _lang.toFloat)(value) / 100;
}

function getWindow(element) {
  return (0, _lang.isWindow)(element) ? element : getDocument(element).defaultView;
}

function getDocument(element) {
  return (0, _lang.toNode)(element).ownerDocument;
}

function getDocEl(element) {
  return getDocument(element).documentElement;
}
},{"./style":"../js/util/style.js","./attr":"../js/util/attr.js","./filter":"../js/util/filter.js","./lang":"../js/util/lang.js"}],"../js/util/fastdom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastdom = void 0;

var _promise = require("./promise");

/*
    Based on:
    Copyright (c) 2016 Wilson Page wilsonpage@me.com
    https://github.com/wilsonpage/fastdom
*/
var fastdom = {
  reads: [],
  writes: [],
  read: function read(task) {
    this.reads.push(task);
    scheduleFlush();
    return task;
  },
  write: function write(task) {
    this.writes.push(task);
    scheduleFlush();
    return task;
  },
  clear: function clear(task) {
    return remove(this.reads, task) || remove(this.writes, task);
  },
  flush: flush
};
exports.fastdom = fastdom;

function flush() {
  var recursion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  runTasks(fastdom.reads);
  runTasks(fastdom.writes.splice(0, fastdom.writes.length));
  fastdom.scheduled = false;

  if (fastdom.reads.length || fastdom.writes.length) {
    scheduleFlush(recursion + 1);
  }
}

var RECURSION_LIMIT = 5;

function scheduleFlush(recursion) {
  if (!fastdom.scheduled) {
    fastdom.scheduled = true;

    if (recursion > RECURSION_LIMIT) {
      throw new Error('Maximum recursion limit reached.');
    } else if (recursion) {
      _promise.Promise.resolve().then(function () {
        return flush(recursion);
      });
    } else {
      requestAnimationFrame(function () {
        return flush();
      });
    }
  }
}

function runTasks(tasks) {
  var task;

  while (task = tasks.shift()) {
    task();
  }
}

function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}
},{"./promise":"../js/util/promise.js"}],"../js/util/mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseTracker = MouseTracker;

var _event = require("./event");

var _lang = require("./lang");

var _dimensions = require("./dimensions");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function MouseTracker() {}

MouseTracker.prototype = {
  positions: [],
  position: null,
  init: function init() {
    var _this = this;

    this.positions = [];
    this.position = null;
    var ticking = false;
    this.unbind = (0, _event.on)(document, 'mousemove', function (e) {
      if (ticking) {
        return;
      }

      setTimeout(function () {
        var time = Date.now();
        var length = _this.positions.length;

        if (length && time - _this.positions[length - 1].time > 100) {
          _this.positions.splice(0, length);
        }

        _this.positions.push({
          time: time,
          x: e.pageX,
          y: e.pageY
        });

        if (_this.positions.length > 5) {
          _this.positions.shift();
        }

        ticking = false;
      }, 5);
      ticking = true;
    });
  },
  cancel: function cancel() {
    if (this.unbind) {
      this.unbind();
    }
  },
  movesTo: function movesTo(target) {
    if (this.positions.length < 2) {
      return false;
    }

    var p = (0, _dimensions.offset)(target);
    var position = (0, _lang.last)(this.positions);

    var _this$positions = _slicedToArray(this.positions, 1),
        prevPos = _this$positions[0];

    if (p.left <= position.x && position.x <= p.right && p.top <= position.y && position.y <= p.bottom) {
      return false;
    }

    var points = [[{
      x: p.left,
      y: p.top
    }, {
      x: p.right,
      y: p.bottom
    }], [{
      x: p.right,
      y: p.top
    }, {
      x: p.left,
      y: p.bottom
    }]];

    if (p.right <= position.x) {// empty
    } else if (p.left >= position.x) {
      points[0].reverse();
      points[1].reverse();
    } else if (p.bottom <= position.y) {
      points[0].reverse();
    } else if (p.top >= position.y) {
      points[1].reverse();
    }

    return !!points.reduce(function (result, point) {
      return result + (slope(prevPos, point[0]) < slope(position, point[0]) && slope(prevPos, point[1]) > slope(position, point[1]));
    }, 0);
  }
};

function slope(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}
},{"./event":"../js/util/event.js","./lang":"../js/util/lang.js","./dimensions":"../js/util/dimensions.js"}],"../js/util/options.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeOptions = mergeOptions;
exports.parseOptions = parseOptions;

var _lang = require("./lang");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var strats = {};
strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat; // args strategy

strats.args = function (parentVal, childVal) {
  return childVal !== false && concatStrat(childVal || parentVal);
}; // update strategy


strats.update = function (parentVal, childVal) {
  return (0, _lang.sortBy)(concatStrat(parentVal, (0, _lang.isFunction)(childVal) ? {
    read: childVal
  } : childVal), 'order');
}; // property strategy


strats.props = function (parentVal, childVal) {
  if ((0, _lang.isArray)(childVal)) {
    childVal = childVal.reduce(function (value, key) {
      value[key] = String;
      return value;
    }, {});
  }

  return strats.methods(parentVal, childVal);
}; // extend strategy


strats.computed = strats.methods = function (parentVal, childVal) {
  return childVal ? parentVal ? (0, _lang.assign)({}, parentVal, childVal) : childVal : parentVal;
}; // data strategy


strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    }

    return function (vm) {
      return mergeFnData(parentVal, childVal, vm);
    };
  }

  return mergeFnData(parentVal, childVal, vm);
};

function mergeFnData(parentVal, childVal, vm) {
  return strats.computed((0, _lang.isFunction)(parentVal) ? parentVal.call(vm, vm) : parentVal, (0, _lang.isFunction)(childVal) ? childVal.call(vm, vm) : childVal);
} // concat strategy


function concatStrat(parentVal, childVal) {
  parentVal = parentVal && !(0, _lang.isArray)(parentVal) ? [parentVal] : parentVal;
  return childVal ? parentVal ? parentVal.concat(childVal) : (0, _lang.isArray)(childVal) ? childVal : [childVal] : parentVal;
} // default strategy


function defaultStrat(parentVal, childVal) {
  return (0, _lang.isUndefined)(childVal) ? parentVal : childVal;
}

function mergeOptions(parent, child, vm) {
  var options = {};

  if ((0, _lang.isFunction)(child)) {
    child = child.options;
  }

  if (child.extends) {
    parent = mergeOptions(parent, child.extends, vm);
  }

  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }

  for (var key in parent) {
    mergeKey(key);
  }

  for (var _key in child) {
    if (!(0, _lang.hasOwn)(parent, _key)) {
      mergeKey(_key);
    }
  }

  function mergeKey(key) {
    options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
  }

  return options;
}

function parseOptions(options) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  try {
    return !options ? {} : (0, _lang.startsWith)(options, '{') ? JSON.parse(options) : args.length && !(0, _lang.includes)(options, ':') ? _defineProperty({}, args[0], options) : options.split(';').reduce(function (options, option) {
      var _option$split = option.split(/:(.*)/),
          _option$split2 = _slicedToArray(_option$split, 2),
          key = _option$split2[0],
          value = _option$split2[1];

      if (key && !(0, _lang.isUndefined)(value)) {
        options[key.trim()] = value.trim();
      }

      return options;
    }, {});
  } catch (e) {
    return {};
  }
}
},{"./lang":"../js/util/lang.js"}],"../js/util/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _attr = require("./attr");

var _event = require("./event");

var _promise = require("./promise");

var _lang = require("./lang");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var id = 0;

var Player = /*#__PURE__*/function () {
  function Player(el) {
    _classCallCheck(this, Player);

    this.id = ++id;
    this.el = (0, _lang.toNode)(el);
  }

  _createClass(Player, [{
    key: "isVideo",
    value: function isVideo() {
      return this.isYoutube() || this.isVimeo() || this.isHTML5();
    }
  }, {
    key: "isHTML5",
    value: function isHTML5() {
      return this.el.tagName === 'VIDEO';
    }
  }, {
    key: "isIFrame",
    value: function isIFrame() {
      return this.el.tagName === 'IFRAME';
    }
  }, {
    key: "isYoutube",
    value: function isYoutube() {
      return this.isIFrame() && !!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
    }
  }, {
    key: "isVimeo",
    value: function isVimeo() {
      return this.isIFrame() && !!this.el.src.match(/vimeo\.com\/video\/.*/);
    }
  }, {
    key: "enableApi",
    value: function enableApi() {
      var _this = this;

      if (this.ready) {
        return this.ready;
      }

      var youtube = this.isYoutube();
      var vimeo = this.isVimeo();
      var poller;

      if (youtube || vimeo) {
        return this.ready = new _promise.Promise(function (resolve) {
          (0, _event.once)(_this.el, 'load', function () {
            if (youtube) {
              var listener = function listener() {
                return post(_this.el, {
                  event: 'listening',
                  id: _this.id
                });
              };

              poller = setInterval(listener, 100);
              listener();
            }
          });
          listen(function (data) {
            return youtube && data.id === _this.id && data.event === 'onReady' || vimeo && Number(data.player_id) === _this.id;
          }).then(function () {
            resolve();
            poller && clearInterval(poller);
          });
          (0, _attr.attr)(_this.el, 'src', "".concat(_this.el.src).concat((0, _lang.includes)(_this.el.src, '?') ? '&' : '?').concat(youtube ? 'enablejsapi=1' : "api=1&player_id=".concat(_this.id)));
        });
      }

      return _promise.Promise.resolve();
    }
  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      if (!this.isVideo()) {
        return;
      }

      if (this.isIFrame()) {
        this.enableApi().then(function () {
          return post(_this2.el, {
            func: 'playVideo',
            method: 'play'
          });
        });
      } else if (this.isHTML5()) {
        try {
          var promise = this.el.play();

          if (promise) {
            promise.catch(_lang.noop);
          }
        } catch (e) {}
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this3 = this;

      if (!this.isVideo()) {
        return;
      }

      if (this.isIFrame()) {
        this.enableApi().then(function () {
          return post(_this3.el, {
            func: 'pauseVideo',
            method: 'pause'
          });
        });
      } else if (this.isHTML5()) {
        this.el.pause();
      }
    }
  }, {
    key: "mute",
    value: function mute() {
      var _this4 = this;

      if (!this.isVideo()) {
        return;
      }

      if (this.isIFrame()) {
        this.enableApi().then(function () {
          return post(_this4.el, {
            func: 'mute',
            method: 'setVolume',
            value: 0
          });
        });
      } else if (this.isHTML5()) {
        this.el.muted = true;
        (0, _attr.attr)(this.el, 'muted', '');
      }
    }
  }]);

  return Player;
}();

exports.Player = Player;

function post(el, cmd) {
  try {
    el.contentWindow.postMessage(JSON.stringify((0, _lang.assign)({
      event: 'command'
    }, cmd)), '*');
  } catch (e) {}
}

function listen(cb) {
  return new _promise.Promise(function (resolve) {
    (0, _event.once)(window, 'message', function (_, data) {
      return resolve(data);
    }, false, function (_ref) {
      var data = _ref.data;

      if (!data || !(0, _lang.isString)(data)) {
        return;
      }

      try {
        data = JSON.parse(data);
      } catch (e) {
        return;
      }

      return data && cb(data);
    });
  });
}
},{"./attr":"../js/util/attr.js","./event":"../js/util/event.js","./promise":"../js/util/promise.js","./lang":"../js/util/lang.js"}],"../js/util/intersection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntersectionObserver = void 0;

var _lang = require("./lang");

var _event = require("./event");

var _dimensions = require("./dimensions");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IntersectionObserver = 'IntersectionObserver' in window ? window.IntersectionObserver : /*#__PURE__*/function () {
  function IntersectionObserverClass(callback) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$rootMargin = _ref.rootMargin,
        rootMargin = _ref$rootMargin === void 0 ? '0 0' : _ref$rootMargin;

    _classCallCheck(this, IntersectionObserverClass);

    this.targets = [];

    var _split$map = (rootMargin || '0 0').split(' ').map(_lang.toFloat),
        _split$map2 = _slicedToArray(_split$map, 2),
        offsetTop = _split$map2[0],
        offsetLeft = _split$map2[1];

    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;
    var pending;

    this.apply = function () {
      if (pending) {
        return;
      }

      pending = requestAnimationFrame(function () {
        return setTimeout(function () {
          var records = _this.takeRecords();

          if (records.length) {
            callback(records, _this);
          }

          pending = false;
        });
      });
    };

    this.off = (0, _event.on)(window, 'scroll resize load', this.apply, {
      passive: true,
      capture: true
    });
  }

  _createClass(IntersectionObserverClass, [{
    key: "takeRecords",
    value: function takeRecords() {
      var _this2 = this;

      return this.targets.filter(function (entry) {
        var inView = (0, _dimensions.isInView)(entry.target, _this2.offsetTop, _this2.offsetLeft);

        if (entry.isIntersecting === null || inView ^ entry.isIntersecting) {
          entry.isIntersecting = inView;
          return true;
        }
      });
    }
  }, {
    key: "observe",
    value: function observe(target) {
      this.targets.push({
        target: target,
        isIntersecting: null
      });
      this.apply();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.targets = [];
      this.off();
    }
  }]);

  return IntersectionObserverClass;
}();
exports.IntersectionObserver = IntersectionObserver;
},{"./lang":"../js/util/lang.js","./event":"../js/util/event.js","./dimensions":"../js/util/dimensions.js"}],"../js/util/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajax = require("./ajax");

Object.keys(_ajax).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ajax[key];
    }
  });
});

var _animation = require("./animation");

Object.keys(_animation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _animation[key];
    }
  });
});

var _attr = require("./attr");

Object.keys(_attr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _attr[key];
    }
  });
});

var _class = require("./class");

Object.keys(_class).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _class[key];
    }
  });
});

var _dimensions = require("./dimensions");

Object.keys(_dimensions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dimensions[key];
    }
  });
});

var _dom = require("./dom");

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dom[key];
    }
  });
});

var _env = require("./env");

Object.keys(_env).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _env[key];
    }
  });
});

var _event = require("./event");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event[key];
    }
  });
});

var _fastdom = require("./fastdom");

Object.keys(_fastdom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fastdom[key];
    }
  });
});

var _filter = require("./filter");

Object.keys(_filter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filter[key];
    }
  });
});

var _lang = require("./lang");

Object.keys(_lang).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lang[key];
    }
  });
});

var _mouse = require("./mouse");

Object.keys(_mouse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mouse[key];
    }
  });
});

var _options = require("./options");

Object.keys(_options).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _options[key];
    }
  });
});

var _player = require("./player");

Object.keys(_player).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _player[key];
    }
  });
});

var _promise = require("./promise");

Object.keys(_promise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _promise[key];
    }
  });
});

var _intersection = require("./intersection");

Object.keys(_intersection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _intersection[key];
    }
  });
});

var _selector = require("./selector");

Object.keys(_selector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _selector[key];
    }
  });
});

var _style = require("./style");

Object.keys(_style).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _style[key];
    }
  });
});
},{"./ajax":"../js/util/ajax.js","./animation":"../js/util/animation.js","./attr":"../js/util/attr.js","./class":"../js/util/class.js","./dimensions":"../js/util/dimensions.js","./dom":"../js/util/dom.js","./env":"../js/util/env.js","./event":"../js/util/event.js","./fastdom":"../js/util/fastdom.js","./filter":"../js/util/filter.js","./lang":"../js/util/lang.js","./mouse":"../js/util/mouse.js","./options":"../js/util/options.js","./player":"../js/util/player.js","./promise":"../js/util/promise.js","./intersection":"../js/util/intersection.js","./selector":"../js/util/selector.js","./style":"../js/util/style.js"}],"fsLibrary.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var blurImg_1 = require("./blurImg");

var utility_1 = require("./utility");

var index_1 = require("../js/util/index");

function FsLibrary(cms_selector, opt) {
  if (opt === void 0) {
    opt = {
      type: 1,
      className: "image"
    };
  }

  opt && this.lazyLoad(cms_selector, opt.className);
  this.cms_selector = cms_selector;
  this.indexSet;
  this.cms_selector;
  this.animation = {
    enable: true,
    duration: 250,
    easing: "ease-in-out",
    effects: "translate(0px,0px)",
    queue: true
  };
  this.addClass;
  this.nestConfig;
  this.index = 0;
  this.hidden_collections;
  this.addClassConfig;
  this.animationStyle = "\n        \n          @keyframes fade-in {\n              0% {\n                  opacity: 0;\n                 transform:{{transform}};\n              }\n              100% {\n                  transform:translate(0) rotate3d(0) rotate(0) scale(1);\n                  opacity: 1;\n              }\n            }\n            \n            .fslib-fadeIn {\n              animation-name: fade-in;\n              animation-duration: {{duration}}s;\n              animation-iteration-count: 1;\n              animation-timing-function: {{easing}};\n              animation-fill-mode: forwards;\n            }\n        ";
  this.tinyImgBase64 = blurImg_1.blurImg;
}

exports.FsLibrary = FsLibrary;

FsLibrary.prototype.setNextButtonIndex = function () {
  var cmsList = document.querySelectorAll(this.cms_selector);

  for (var i = 0; i < cmsList.length; i++) {
    var nextSibling = cmsList[i].nextElementSibling;

    if (nextSibling && utility_1.isVisible(nextSibling) && nextSibling.querySelector("w-pagination-next")) {
      this.index = i;
    }
  }

  this.indexSet = true;
};

FsLibrary.prototype.getMasterCollection = function () {
  return document.querySelector(this.cms_selector);
};

FsLibrary.prototype.reinitializeWebflow = function () {
  window.Webflow.destroy();
  window.Webflow.ready();

  window.Webflow.require("ix2").init();

  index_1.trigger(document, 'readystatechange');
  window.Webflow.redraw.up();
};

FsLibrary.prototype.makeStyleSheet = function (_a) {
  var _b = _a.duration,
      duration = _b === void 0 ? 1 : _b,
      _c = _a.easing,
      easing = _c === void 0 ? "ease-in-out" : _c,
      _d = _a.transform,
      transform = _d === void 0 ? "translate(0)" : _d;
  this.animationStyle = this.animationStyle.replace("{{duration}}", "" + duration);
  this.animationStyle = this.animationStyle.replace("{{ease}}", easing);
  this.animationStyle = this.animationStyle.replace("{{transform}}", transform);
  var head = document.head || document.getElementsByTagName("head")[0];
  var lazyLoadCss = "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.css\">";
  head.innerHTML += lazyLoadCss;
  var style = document.createElement("style");
  head.appendChild(style);
  style.type = "text/css";

  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = this.animationStyle;
  } else {
    style.appendChild(document.createTextNode(this.animationStyle));
  }

  return style;
};

window.FsLibrary = FsLibrary;
},{"./blurImg":"blurImg.ts","./utility":"utility.ts","../js/util/index":"../js/util/index.js"}],"addClasses.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("./fsLibrary");

fsLibrary_1.FsLibrary.prototype.addclasses = function (config) {
  var _this = this;

  if (config === void 0) {
    config = {
      classArray: [],
      frequency: 2,
      start: 1
    };
  }

  var parent = document.querySelector(this.cms_selector);
  var frequency = config.frequency,
      start = config.start,
      classNames = config.classArray;
  this.addClassConfig = config;
  this.addClass = true;

  if (frequency < 0) {
    throw "unaccepted value passed as frequency";
  } else if (start < 1) {
    throw "unaccepted value passed as start";
  }

  classNames.map(function (_a) {
    var target = _a.classTarget,
        alt = _a.classToAdd;
    var list = parent.querySelectorAll(target);
    var targerIsDirectChild = true;

    if (parent.children[0] != list[0]) {
      targerIsDirectChild = false;
      list = parent.children;
    }

    var addon = alt.replace(/\./g, "");

    for (var j = start - 1; j < list.length; j += frequency) {
      if (targerIsDirectChild) {
        list[j].classList.toggle(addon);
      } else {
        list[j].querySelectorAll(target).forEach(function (elem) {
          elem.classList.toggle(addon);
        });
      }

      if (frequency == 0) {
        break;
      }

      _this.reinitializeWebflow();
    }
  });
};
},{"./fsLibrary":"fsLibrary.ts"}],"animate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../js/util/index");

var targetClass = 'uk-animation-target';
exports.default = {
  // props: {
  //     animation: Number
  // },
  // data: {
  //     animation: 400
  // },
  // computed: {
  //     target() {
  //         return this.$el;
  //     }
  // },
  methods: {
    animate: function animate(action, target, animation) {
      var duration = animation.duration,
          easing = animation.easing,
          effects = animation.effects;
      var effect = String(effects).replace(/^fade /gi, "");
      addStyle();
      var children = index_1.toNodes(target.children);
      var propsFrom = children.map(function (el) {
        return getProps(el, true);
      });
      var childrenMargin = children.map(function (el) {
        return index_1.css(el, 'margin');
      });
      var oldHeight = index_1.height(target);
      var oldScrollY = window.pageYOffset;
      action();
      index_1.Transition.cancel(target);
      children.forEach(index_1.Transition.cancel);
      reset(target); // this.$update(target);

      index_1.fastdom.flush();
      var newHeight = index_1.height(target);
      children = children.concat(index_1.toNodes(target.children).filter(function (el) {
        return !index_1.includes(children, el);
      }));
      var propsTo = children.map(function (el, i) {
        return el.parentNode && i in propsFrom ? propsFrom[i] ? index_1.isVisible(el) ? getPositionWithMargin(el) : {
          opacity: 0
        } : {
          opacity: index_1.isVisible(el) ? 1 : 0
        } : false;
      });
      propsFrom = propsTo.map(function (props, i) {
        var from = children[i].parentNode === target ? propsFrom[i] || getProps(children[i]) : false;

        if (from) {
          if (!props) {
            delete from.opacity;
          } else if (!('opacity' in props)) {
            var opacity = from.opacity;

            if (opacity % 1) {
              props.opacity = 1;
            } else {
              delete from.opacity;
            }
          }
        }

        return from;
      });
      index_1.addClass(target, targetClass);
      children.forEach(function (el, i) {
        if (propsFrom[i]) {
          index_1.css(el, propsFrom[i]);
        }
      });
      index_1.css(target, 'height', oldHeight);
      children.map(function (el, i) {
        return el.style["margin"] = childrenMargin[i];
      });
      index_1.scrollTop(window, oldScrollY);
      return index_1.Promise.all(children.map(function (el, i) {
        if (propsFrom[i] && propsTo[i]) {
          if (propsTo[i].opacity == 0) {
            propsTo[i].transform = effect;
          } else {
            propsTo[i].transform = '';
          }

          if (propsFrom[i].opacity == 0) {
            el.style.transform = effect;
          }

          return index_1.Transition.start(el, propsTo[i], duration, easing);
        }

        return index_1.Promise.resolve();
      }).concat(index_1.Transition.start(target, {
        height: newHeight
      }, duration, easing))).then(function () {
        children.forEach(function (el, i) {
          index_1.css(el, {
            display: propsTo[i].opacity === 0 ? 'none' : '',
            zIndex: ''
          });
        });
        reset(target); // this.$update(target);

        index_1.fastdom.flush(); // needed for IE11ssa
      }, index_1.noop);
    }
  }
};

function getProps(el, opacity) {
  var zIndex = index_1.css(el, 'zIndex');
  return index_1.isVisible(el) ? index_1.assign({
    display: '',
    opacity: opacity ? index_1.css(el, 'opacity') : '0',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: zIndex === 'auto' ? index_1.index(el) : zIndex
  }, getPositionWithMargin(el)) : false;
}

function reset(el) {
  index_1.css(el.children, {
    height: '',
    left: '',
    opacity: '',
    pointerEvents: '',
    transform: '',
    position: '',
    top: '',
    width: '',
    margin: ''
  });
  index_1.removeClass(el, targetClass);
  index_1.css(el, 'height', '');
}

exports.reset = reset;

function getPositionWithMargin(el) {
  var _a = el.getBoundingClientRect(),
      height = _a.height,
      width = _a.width;

  var _b = index_1.position(el),
      top = _b.top,
      left = _b.left;

  top += index_1.toFloat(index_1.css(el, 'marginTop'));
  return {
    top: top,
    left: left,
    height: height,
    width: width
  };
}

exports.getPositionWithMargin = getPositionWithMargin;
var style;

function addStyle() {
  if (style) {
    return;
  }

  style = index_1.append(document.head, '<style>').sheet;
  style.insertRule("." + targetClass + " > * {\n            margin-top: 0 !important;\n            /*transform: none !important;*/\n        }", 0);
}

function fGetCSSProperty(s, e) {
  try {
    return s.currentStyle ? s.currentStyle[e] : window.getComputedStyle(s)[e];
  } catch (x) {
    return null;
  }
}

function fGetOffSetParent(s) {
  var a = s.offsetParent || document.body;

  while (a && a.tagName && a != document.body && fGetCSSProperty(a, 'position') == 'static') {
    a = a.offsetParent;
  }

  return a;
}

function GetPosition(s) {
  var b = fGetOffSetParent(s);
  return {
    Left: b.offsetLeft + s.offsetLeft,
    Top: b.offsetTop + s.offsetTop
  };
}
},{"../js/util/index":"../js/util/index.js"}],"filter/helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utility_1 = require("../utility");

exports.removeMsg = function (message) {
  if (message === void 0) {
    message = "No match found.";
  }

  var msg = document.querySelector(".fslib-no-match");

  if (msg) {
    msg.outerHTML = "";
  }

  var note = document.createElement("div");
  note.style.padding = "15px";
  note.className = "fslib-no-match";
  note.textContent = "No match found.";
  return note;
};

function shouldFilter(filter, filterText, index) {
  var isEmpty = !filterText.trim();
  var tag = filter[index].query;

  if (isEmpty && tag.includes(filterText)) {
    return false;
  }

  if (isEmpty && !tag.length) {
    return false;
  }

  return true;
}

exports.shouldFilter = shouldFilter;

exports.preventParentFormSubmission = function (elem) {
  var formElem = utility_1.getClosest(elem, "form");

  if (formElem) {
    exports.preventFormSubmission(formElem);
  }
};

exports.preventFormSubmission = function (formElem) {
  formElem.onsubmit = function (evt) {
    evt.preventDefault();
    return false;
  };
};

exports.resetAllFilter = function (_a) {
  var filter = _a.filter,
      triggerSelectors = _a.triggerSelectors,
      activeClass = _a.activeClass;
  triggerSelectors.map(function (selector) {
    document.querySelectorAll(selector).forEach(function (elem, i) {
      elem.classList.remove(activeClass);

      if (elem.tagName == "INPUT") {
        switch (elem.type) {
          case "text":
            elem.value = "";
            break;

          default:
            elem.checked = false;
            break;
        }
      }
    });
  });
  Object["values"](filter).forEach(function (val, idx) {
    filter[idx].query = [];
  });
  return filter;
};
},{"../utility":"utility.ts"}],"filter/filter.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
  }

  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("../fsLibrary");

var utility_1 = require("../utility");

var animate_1 = __importDefault(require("../animate"));

var helper_1 = require("./helper");

fsLibrary_1.FsLibrary.prototype.filter = function (_a) {
  var _this = this;

  var _b = _a.filterArray,
      filterArray = _b === void 0 ? [] : _b,
      _c = _a.filterReset,
      filterReset = _c === void 0 ? "" : _c,
      _d = _a.animation,
      animation = _d === void 0 ? this.animation : _d,
      _e = _a.activeClass,
      activeClass = _e === void 0 ? "active" : _e;
  var cms_filter = filterArray;
  activeClass = activeClass || "active";
  animation = __assign({}, this.animation, animation);
  var filter_type = typeof cms_filter == "string" ? "exclusive" : "multi";

  if (animation) {
    animation.enable = !/^false$/.test(String(animation.enable));
    var effects = animation.effects.replace("fade", "");
    animation.effects = effects;

    if (animation.effects.indexOf("translate") < 0) {
      animation.effects += " translate(0px,0px)  ";
    }

    this.animation = animation;
  }

  animation = this.animation;
  var filterActive = false;
  var filterQueue = [];
  var filter = {}; //to hold categories of filter selectors and their corresponding

  var triggerSelectors = []; //get all collections

  var get_cms_items = function get_cms_items() {
    return [].slice.call(document.querySelectorAll(_this.cms_selector));
  };

  if (Array.isArray(cms_filter)) {
    cms_filter.map(function (val, index) {
      var prevClicked;
      var filterWrapper = val.filterWrapper;
      var selector = filterWrapper + " [filter-by]";
      triggerSelectors.push(selector);
      var filter_group = [].slice.call(document.querySelectorAll(selector));
      assignChangeEventToButtons(__assign({
        index: index,
        prevClicked: prevClicked,
        filter_group: filter_group
      }, val));
    });
  } else if (typeof cms_filter == "string") {
    var prevClicked = void 0;
    var selector = cms_filter + " [filter-by]";
    triggerSelectors.push(selector);
    var filter_group = [].slice.call(document.querySelectorAll(selector));
    assignChangeEventToButtons({
      index: 0,
      prevClicked: prevClicked,
      filter_group: filter_group
    });
  } else {
    throw "Incorrect type passed as cms_filter";
  }

  if (filterReset) {
    var resetButton = document.querySelector(filterReset);
    resetButton.addEventListener("click", function () {
      initFilter({
        reset: true
      });
    });
  }

  function assignChangeEventToButtons(_a) {
    var index = _a.index,
        prevClicked = _a.prevClicked,
        filter_group = _a.filter_group,
        _b = _a.filterType,
        filterType = _b === void 0 ? filter_type : _b,
        _c = _a.filterByClass,
        filterByClass = _c === void 0 ? null : _c,
        _d = _a.filterRange,
        filterRange = _d === void 0 ? false : _d;
    filter[index] = {
      target: filterByClass,
      query: [],
      filterRange: filterRange
    };
    filter_group.map(function (elem, j) {
      var tag_element = elem && elem.tagName;
      var oldValue = "";

      if (tag_element == "SELECT") {
        elem.addEventListener("change", utility_1.debounce(function (event) {
          var filterText = event.target.selectedOptions[0].value || "";
          var hold = oldValue;
          oldValue = filterText;
          helper_1.shouldFilter(filter, filterText, index) && initFilter({
            filterType: filterType,
            index: index,
            filterText: filterText,
            oldValue: hold,
            wildcard: true
          });
        }, 500));
      } else if (tag_element == "FORM") {
        helper_1.preventFormSubmission(elem);
        var minInput = elem.querySelector('input[name="min"]');
        var maxInput = elem.querySelector('input[name="max"]');
        var hold_1 = oldValue;

        var passValue = function passValue(filterText) {
          oldValue = filterText;
          return initFilter({
            index: index,
            filterType: filterType,
            wildcard: true,
            oldValue: hold_1,
            filterText: filterText
          });
        };

        addInputListener(minInput, maxInput, passValue);
        addInputListener(maxInput, minInput, passValue);
      } else if (tag_element == "INPUT") {
        //handle checkbox and radio button
        switch (elem.type) {
          case "text":
            helper_1.preventParentFormSubmission(elem);
            elem.addEventListener("input", utility_1.debounce(function (event) {
              var filterText = event.target.value;
              var hold = oldValue;
              oldValue = filterText;
              helper_1.shouldFilter(filter, filterText, index) && initFilter({
                filterType: filterType,
                index: index,
                filterText: filterText,
                oldValue: hold,
                wildcard: true
              });
            }, 500));
            break;

          default:
            elem.addEventListener("change", function (event) {
              var filterText = !event.target.checked ? "" : event.currentTarget.getAttribute("filter-by") || "";
              helper_1.shouldFilter(filter, filterText, index) && initFilter({
                filterType: filterType,
                index: index,
                filterText: filterText
              });
            });
            break;
        }
      } else {
        elem.onclick = function (event) {
          var active = event.currentTarget.className; //only one element should have active class for or

          if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filterType)) {
            if (prevClicked) prevClicked.classList.remove(activeClass);
          }

          prevClicked = event.currentTarget;

          if (active.includes(activeClass)) {
            prevClicked.classList.remove(activeClass);
          } else {
            prevClicked.classList.add(activeClass);
          }

          var filterText = prevClicked.getAttribute("filter-by") || ""; //prevent further filter if filter is empty and reset button is clicked.

          helper_1.shouldFilter(filter, filterText, index) && initFilter({
            filterType: filterType,
            index: index,
            filterText: filterText
          });
        };
      }
    });
  }

  var initFilter = function initFilter(_a) {
    var _b = _a.filterType,
        filterType = _b === void 0 ? "exclusive" : _b,
        _c = _a.index,
        index = _c === void 0 ? 0 : _c,
        _d = _a.filterText,
        filterText = _d === void 0 ? "" : _d,
        _e = _a.oldValue,
        oldValue = _e === void 0 ? "" : _e,
        _f = _a.wildcard,
        wildcard = _f === void 0 ? false : _f,
        _g = _a.reset,
        reset = _g === void 0 ? false : _g;
    filterText = utility_1.escapeRegExp(filterText.replace(/\*/gi, ""));
    var prevClicked = filter[index].query.includes(filterText);
    var update = filter[index].query.filter(function (val) {
      return val != filterText;
    });
    var nonWildcard = filter[index].query.filter(function (val) {
      return val != oldValue;
    });

    if (reset) {
      filter = helper_1.resetAllFilter({
        filter: filter,
        activeClass: activeClass,
        triggerSelectors: triggerSelectors
      });
    } //checks if it has previously been clicked
    else if (prevClicked && !wildcard) {
        filter[index].query = update;
      } else {
        filter[index].query = nonWildcard;

        if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filterType)) {
          filter[index].query = [filterText];
        } else {
          //it is definitely "multi"
          filterText && filterText.length && filter[index].query.push(filterText);
        }
      }

    if (animation.enable && animation.queue && filterActive) {
      return filterQueue.push(function () {
        return filterHelper();
      });
    }

    return filterHelper();
  };

  var filterHelper = function filterHelper() {
    filterActive = true; //try to fix queue here

    if (animation.enable) {
      var target = document.querySelector(_this.cms_selector);
      return animate_1.default.methods.animate(function () {
        return findAndMatchFilterText(filter, get_cms_items());
      }, target, animation).then(function () {
        filterActive = false;
        var nextAnimation = filterQueue.shift();

        if (nextAnimation) {
          nextAnimation.call(null);
        }
      });
    }

    findAndMatchFilterText(filter, get_cms_items());
  };
};

var findAndMatchFilterText = function findAndMatchFilterText(filter, master_collection) {
  var disposableNote = helper_1.removeMsg();
  var queries = Object["values"](filter);
  master_collection.map(function (elem, i) {
    var search_result = queries.reduce(function (curr, _a) {
      var query = _a.query,
          target = _a.target,
          filterRange = _a.filterRange; //creating a regex to test against

      var val = filterRange ? query : "(" + query.join("|") + ")";
      var result = [].slice.call(elem.children).map(function (item, j) {
        var re = new RegExp(val, "gi"); //checks if target is specified, otherwise use the textcontent from item

        var textContent = (item.querySelector(target) || item).textContent;
        var valid = filterRange ? isInRange(val, textContent) : re.test(textContent);
        var clonedItem = item.cloneNode(true);

        if (valid) {
          clonedItem.style.display = "block";
        } else {
          clonedItem.style.display = "none";
        } // return clonedItem.outerHTML;


        return clonedItem;
      });

      if (curr.length < 1) {
        return result;
      } //intersections of the results


      return curr.map(function (a, index) {
        if (a.style.display !== result[index].style.display) {
          a.style.display = "none";
        }

        return a;
      }).slice();
    }, []); //.join("").trim()

    if (search_result.length > 1) {
      [].slice.call(master_collection[i].children).map(function (child, k) {
        child.style.display = search_result[k].style.display;
      });
    }

    var height = master_collection[i].getBoundingClientRect().height; //empty search match

    if (height < 1) {
      master_collection[i].appendChild(disposableNote);
    }
  });
};

var isInRange = function isInRange(searchRanges, targetText) {
  var ans = searchRanges.filter(function (range) {
    var boundaries = range.split("-").map(parseFloat);
    var num = targetText.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") || 0;
    num = parseFloat(num);
    return (num - boundaries[0]) * (num - boundaries[1]) <= 0;
  });
  return searchRanges.length ? ans.length : true;
};

var addInputListener = function addInputListener(elem, otherElem, fxn) {
  elem.addEventListener("input", utility_1.debounce(function (event) {
    event.target.value = event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    var name = event.target.name;
    var val = event.target.value;
    var otherValue = otherElem.value || 0;
    var filter_text = name == "min" ? val + "-" + otherValue : otherValue + "-" + val;
    fxn(filter_text);
  }, 500));
};
},{"../fsLibrary":"fsLibrary.ts","../utility":"utility.ts","../animate":"animate.ts","./helper":"filter/helper.ts"}],"combine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utility_1 = require("./utility");

var fsLibrary_1 = require("./fsLibrary");
/**
 * Combine all the collection items into one collection.
 */


fsLibrary_1.FsLibrary.prototype.combine = function () {
  var _this = this;

  this.setNextButtonIndex(); //get all collections

  var visible_collection = [].slice.call(document.querySelectorAll(this.cms_selector)).filter(utility_1.isVisible);
  var nextButton = null; //copies the cms items into the first collection list

  visible_collection[0].innerHTML = visible_collection.reduce(function (curr, item) {
    //gets all the items
    var aNextButton = item.nextElementSibling;

    if (aNextButton && utility_1.isVisible(aNextButton) && !nextButton) {
      nextButton = aNextButton.outerHTML;
    }

    return curr.concat([item.innerHTML]);
  }, []).join("");

  if (nextButton) {
    nextButton.outerHTML = nextButton.outerHTML + nextButton;
  } //deletes the rest collection list


  var done = visible_collection.map(function (elem, i) {
    if (i > 0) {
      elem.parentElement.outerHTML = "";
    }

    return Promise.resolve();
  });
  Promise.all(done).then(function (r) {
    if (window.Webflow.require("ix2")) {
      _this.reinitializeWebflow();
    }
  });
};
},{"./utility":"utility.ts","./fsLibrary":"fsLibrary.ts"}],"lazyLoad.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("./fsLibrary");

var utility_1 = require("./utility");

fsLibrary_1.FsLibrary.prototype.lazyLoad = function (cms_selector, className) {
  var lazy = [];
  utility_1.registerListener("load", setLazy);
  utility_1.registerListener("load", lazyLoad);
  utility_1.registerListener("scroll", lazyLoad);
  utility_1.registerListener("resize", lazyLoad);

  function setLazy() {
    lazy = [].slice.call(document.querySelectorAll(cms_selector + " ." + className));
  }

  function lazyLoad() {
    for (var i = 0; i < lazy.length; i++) {
      if (utility_1.isInViewport(lazy[i])) {
        // if (lazy[i].getAttribute('data-src')){
        //     lazy[i].src = lazy[i].getAttribute('data-src');
        //     lazy[i].removeAttribute('data-src');
        // }
        if (lazy[i].classList.contains(className)) {
          lazy[i].classList.remove(className);
        }
      }
    }

    cleanLazy();
  }

  function cleanLazy() {
    // lazy = [].filter.call(lazy, function(l){ return l.getAttribute('data-src');});
    lazy = [].filter.call(lazy, function (elem) {
      return elem.classList.contains(className);
    });
  }
};
},{"./fsLibrary":"fsLibrary.ts","./utility":"utility.ts"}],"nest.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("./fsLibrary");

fsLibrary_1.FsLibrary.prototype.nest = function (_a) {
  var textList = _a.textList,
      nestSource = _a.nestSource,
      nestTarget = _a.nestTarget;
  this.setNestConfig({
    textList: textList,
    nestSource: nestSource,
    nestTarget: nestTarget
  });
  var master_collections = document.querySelectorAll(this.cms_selector);
  var sourceLinks = [].slice.call(document.querySelectorAll(nestSource + " a"));
  master_collections.forEach(function (collection, i) {
    var textArray = collection.querySelectorAll(textList);
    var target = collection.querySelectorAll(nestTarget);
    textArray.forEach(function (textElem, j) {
      if (textElem && target[j]) {
        var tags_1 = textElem.textContent;
        tags_1 = tags_1.replace(/\s*,\s*/gi, "|");
        var tagsArry_1 = tags_1.split("|");
        tags_1 = "^(" + tags_1 + ")$";
        target[j].innerHTML = sourceLinks.filter(function (link) {
          var regex = new RegExp(tags_1, "gi");
          var test = regex.test(link.textContent.trim());
          return test;
        }).sort(function (a, b) {
          return tagsArry_1.indexOf(a.textContent.trim()) - tagsArry_1.indexOf(b.textContent.trim());
        }).map(function (elem) {
          return elem.outerHTML;
        }).join("");
      }
    });
  });
};

fsLibrary_1.FsLibrary.prototype.setNestConfig = function (config) {
  if (!this.nestConfig) {
    this.nestConfig = config;
  }
};
},{"./fsLibrary":"fsLibrary.ts"}],"sort.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
  }

  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("./fsLibrary");

var animate_1 = __importDefault(require("./animate"));

var utility_1 = require("./utility");

fsLibrary_1.FsLibrary.prototype.sort = function (_a) {
  var _this = this;

  var sortTrigger = _a.sortTrigger,
      sortReverse = _a.sortReverse,
      activeClass = _a.activeClass,
      animation = _a.animation;
  animation = __assign({}, this.animation, animation);

  if (animation) {
    animation.enable = !/^false$/.test(String(animation.enable));
    var effects = animation.effects.replace("fade", "");
    animation.effects = effects;

    if (animation.effects.indexOf("translate") < 0) {
      animation.effects += " translate(0px,0px)  ";
    }

    this.animation = animation;
  }

  animation = this.animation;

  var get_cms_items = function get_cms_items() {
    return [].slice.call(document.querySelectorAll(_this.cms_selector));
  };

  var triggerElem = [].slice.call(document.querySelectorAll(sortTrigger));
  triggerElem.map(function (elem) {
    var triggerTag = elem && elem.tagName;

    if (triggerTag == "SELECT") {
      elem.addEventListener("change", utility_1.debounce(function (event) {
        var sortTarget = event.target.selectedOptions[0].value;
        sortTarget = sortTarget || event.getAttribute("sort-by");
        sortHelper({
          sortTarget: sortTarget,
          sortReverse: sortReverse
        });
      }, 200));
    } else if (triggerTag == "INPUT") {
      //handle checkbox and radio button
      elem.addEventListener("change", utility_1.debounce(function (event) {
        var sortTarget = event.target.getAttribute("sort-by") || "";
        var active = String(activeClass).replace(".", "");
        removeActiveClassFromTriggers(sortTarget, active);
        event.target.classList.toggle(active);
        sortHelper({
          sortTarget: sortTarget,
          sortReverse: sortReverse
        });
      }, 200));
    } else {
      elem.addEventListener("click", function (event) {
        var target = event.currentTarget;
        var sortTarget = target.getAttribute("sort-by") || "";
        var active = String(activeClass).replace(".", "");
        var previouslyClicked = target.classList.contains(active);
        removeActiveClassFromTriggers(target, active);
        elem.classList.toggle(active);
        var isReversed = previouslyClicked ? !sortReverse : sortReverse;
        sortHelper({
          sortTarget: sortTarget,
          sortReverse: isReversed
        });
      });
    }
  });

  var removeActiveClassFromTriggers = function removeActiveClassFromTriggers(target, activeClass) {
    triggerElem.forEach(function (elem) {
      if (elem.outerHTML != target.outerHTML) {
        elem.classList.remove(activeClass);
      }
    });
  };

  var collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base"
  });

  var sortHelper = function sortHelper(_a) {
    var sortTarget = _a.sortTarget,
        sortReverse = _a.sortReverse;

    var initSort = function initSort() {
      return sortMasterCollection({
        sortReverse: sortReverse,
        sortTarget: sortTarget
      });
    };

    if (animation.enable) {
      var target = document.querySelector(_this.cms_selector);
      animate_1.default.methods.animate(initSort, target, animation);
    } else {
      initSort();
    }
  };

  var sortMasterCollection = function sortMasterCollection(_a) {
    var sortTarget = _a.sortTarget,
        sortReverse = _a.sortReverse;
    var master_collection = get_cms_items();
    master_collection.map(function (elem) {
      return [].slice.call(elem.children).sort(function (a, b) {
        var x = a.querySelector(sortTarget).textContent;
        var y = b.querySelector(sortTarget).textContent;
        return collator.compare(x, y);
      }).map(function (sortedElem) {
        if (sortReverse) {
          elem.insertBefore(sortedElem, elem.firstChild);
          return;
        }

        elem.appendChild(sortedElem);
      });
    });
  };
};
},{"./fsLibrary":"fsLibrary.ts","./animate":"animate.ts","./utility":"utility.ts"}],"loadmore/util.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("../fsLibrary");

var utility_1 = require("../utility");

var index_1 = require("../../js/util/index");

fsLibrary_1.FsLibrary.prototype.getNextData = function (url) {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status == 200) {
        // done(xhr.response);
        return resolve(xhr.response);
      }
    };
  }).then(function (res) {
    return res;
  });
};

fsLibrary_1.FsLibrary.prototype.appendPaginatedData = function (data) {
  var newDoc = utility_1.createDocument(data, "newDoc" + Date.now());
  var collection = newDoc.querySelectorAll(this.cms_selector)[this.index];
  var nextHref = collection.parentElement.querySelector(".w-pagination-next");
  nextHref ? this.setLoadmoreHref(nextHref.href) : this.setLoadmoreHref("");
  collection && this.appendToCms(collection.children);

  if (!this.hidden_collections.length && !nextHref) {
    this.getLoadmoreHref().outerHTML = "";
  }
};

fsLibrary_1.FsLibrary.prototype.appendToCms = function (collection) {
  var _this = this;

  var master_collection = this.getMasterCollection();
  var append = [].slice.call(collection).map(function (element) {
    element.classList.add("fslib-fadeIn");
    index_1.once(element, utility_1.whichAnimationEvent(), function (_a) {
      var type = _a.type;
      element.classList.remove("fslib-fadeIn");
    });
    master_collection.appendChild(element);

    if (_this.addClass) {
      _this.addclasses(_this.addClassConfig);
    }

    return Promise.resolve();
  });

  if (this.nestConfig) {
    this.nest(this.nestConfig);
  }

  return Promise.all(append);
};

fsLibrary_1.FsLibrary.prototype.setLoadmoreHref = function (url) {
  var master_collection = this.getMasterCollection();
  var hrefButton = master_collection.parentElement.querySelector("a.w-pagination-next");
  hrefButton.setAttribute("data-href", url || hrefButton.href);
  return hrefButton;
};

fsLibrary_1.FsLibrary.prototype.getLoadmoreHref = function (selector) {
  var master_collection = this.getMasterCollection();
  var hrefButton = master_collection.parentElement.querySelector(selector || "a.w-pagination-next");
  return hrefButton;
};

fsLibrary_1.FsLibrary.prototype.getHiddenCollections = function () {
  return [].slice.call(document.querySelectorAll(this.cms_selector)).filter(function (e) {
    return !utility_1.isVisible(e);
  });
};

fsLibrary_1.FsLibrary.prototype.setHiddenCollections = function () {
  var collection = this.getHiddenCollections();
  this.hidden_collections = collection.map(function (val) {
    return val.parentElement.cloneNode(true);
  }); //   collection.forEach((val) => (val.parentNode.outerHTML = ""));
};
},{"../fsLibrary":"fsLibrary.ts","../utility":"utility.ts","../../js/util/index":"../js/util/index.js"}],"loadmore/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("../fsLibrary");

require("./util");

var utility_1 = require("../utility");

fsLibrary_1.FsLibrary.prototype.loadmore = function (config) {
  var _this = this;

  if (config === void 0) {
    config = {
      button: "a.w-pagination-next",
      loadAll: false,
      resetIx: true,
      animation: this.animation,
      infiniteScroll: false,
      infiniteScrollPercentage: 80
    };
  }

  if (!this.indexSet) {
    this.setNextButtonIndex();
  }

  var master_collection = this.getMasterCollection();

  var getCollections = function getCollections() {
    return _this.getMasterCollection();
  };

  this.setHiddenCollections();

  if (config.animation) {
    var effects = config.animation.effects.replace("fade", "");
    var _a = config.animation,
        duration = _a.duration,
        easing = _a.easing;
    duration = duration ? duration / 1000 : 1;
    easing = easing || "linear";
    this.makeStyleSheet({
      duration: duration,
      easing: easing,
      transform: effects
    });
  } else {
    this.makeStyleSheet({});
  }

  var button = config.button,
      _b = config.resetIx,
      resetIx = _b === void 0 ? false : _b,
      _c = config.loadAll,
      loadAll = _c === void 0 ? false : _c,
      _d = config.infiniteScroll,
      infiniteScroll = _d === void 0 ? false : _d,
      _e = config.infiniteScrollPercentage,
      infiniteScrollPercentage = _e === void 0 ? 80 : _e;
  var nextButton = this.getLoadmoreHref(button);
  nextButton.setAttribute("data-href", nextButton.href);
  nextButton.removeAttribute("href");
  var busy = false;

  nextButton.onclick = function (evt) {
    initFetch();
  };

  var initScroll = utility_1.throttle(function (evt) {
    var parent = getCollections();
    var children = parent.children;
    var len = children.length;
    var pos = Math.round(infiniteScrollPercentage * len / 100);

    if (utility_1.isInViewport(children[pos]) || !utility_1.isOutOfViewport(parent).bottom) {
      initFetch();
    }
  }, 700);

  if (infiniteScroll) {
    console.log("infinite scroll added");
    document.addEventListener("scroll", initScroll);
  }

  document.addEventListener("DOMContentLoaded", function (event) {
    loadAll && initFetch(true);
  });

  var initFetch = function initFetch(recursive) {
    if (recursive === void 0) {
      recursive = false;
    }

    if (busy) return false;
    var href = nextButton.getAttribute("data-href");
    busy = true;

    if (href) {
      return _this.getNextData(href).then(function (res) {
        //enable button
        _this.appendPaginatedData(res);

        busy = false;

        if (resetIx) {
          _this.reinitializeWebflow();
        }

        if (recursive) {
          initFetch(true);
        }
      });
    }

    var nextcollection = _this.hidden_collections.shift();

    if (nextcollection) {
      _this.appendToCms(nextcollection.firstElementChild.children).then(function (res) {
        if (resetIx) {
          _this.reinitializeWebflow();
        }
      });

      var aHref = nextcollection.querySelector(".w-pagination-next");

      _this.setLoadmoreHref(aHref.href);

      _this.index++;
      busy = false;

      if (recursive) {
        initFetch(true);
      }
    }
  };
};
},{"../fsLibrary":"fsLibrary.ts","./util":"loadmore/util.ts","../utility":"utility.ts"}],"tabs.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("./fsLibrary");

fsLibrary_1.FsLibrary.prototype.tabs = function (_a) {
  var _this = this;

  var tabComponent = _a.tabComponent,
      tabName = _a.tabName,
      _b = _a.resetIx,
      resetIx = _b === void 0 ? true : _b;
  var cms = this.getMasterCollection();
  var testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>*"));
  var tabMenu = document.querySelector(tabComponent + " .w-tab-menu");
  var tabContent = document.querySelector(tabComponent + " .w-tab-content");
  var tabPane = tabContent.children[0];
  var tabLink = tabMenu.getElementsByTagName("a")[0];
  var Webflow = window.Webflow || [];
  Webflow.push(function () {
    if (window.___toggledInitTab___) {
      return;
    }

    var prefix = getPrefix(tabLink.href);
    tabLink.classList.remove("w--current");
    tabPane.classList.remove("w--tab-active");
    var tabLinkClassNames = tabLink.className;
    var tabContentClassNames = tabPane.className; // clear tabMenu and tabContent

    tabMenu.innerHTML = "";
    tabContent.innerHTML = "";
    Promise.all(initTabs(prefix, tabLinkClassNames, tabContentClassNames)).then(function (res) {
      window.___toggledInitTab___ = true;
      window.Webflow.ready();
      !!resetIx && _this.reinitializeWebflow();
    });
  });

  var initTabs = function initTabs(prefix, tabLinkClassNames, tabContentClassNames) {
    // appends new contents
    return testimonials.map(function (element, index) {
      var name = element.querySelector(tabName).innerHTML;
      var newLink = getTabLink({
        name: name,
        prefix: prefix,
        index: index,
        classes: tabLinkClassNames
      });
      tabMenu.innerHTML += newLink;
      var content = element.outerHTML;
      var newPane = getTabPane({
        name: name,
        prefix: prefix,
        index: index,
        classes: tabContentClassNames,
        content: content
      });
      tabContent.innerHTML += newPane;
      return Promise.resolve();
    });
  };
};

var getTabLink = function getTabLink(_a) {
  var name = _a.name,
      prefix = _a.prefix,
      index = _a.index,
      classes = _a.classes;
  var tab = prefix + "-tab-" + index;
  var pane = prefix + "-pane-" + index;
  var isFirst = index == 0;
  var classNames = classes;

  if (isFirst) {
    classNames += " w--current ";
  }

  var tabIndex = isFirst ? "" : "tabindex='-1'";
  return "<a data-w-tab=\"" + name + "\" class=\"" + classNames + "\" id=\"" + tab + "\" href=\"#" + pane + "\"\n   role=\"tab\"\n   aria-controls=\"" + pane + "\"\n   aria-selected=\"" + isFirst + "\" " + tabIndex + ">\n            <div>" + name + "</div>\n          </a>";
};

var getTabPane = function getTabPane(_a) {
  var name = _a.name,
      prefix = _a.prefix,
      index = _a.index,
      content = _a.content,
      classes = _a.classes;
  var tab = prefix + "-tab-" + index;
  var pane = prefix + "-pane-" + index;
  var isFirst = index == 0;
  var classNames = classes;

  if (isFirst) {
    classNames += " w--tab-active ";
  }

  return "<div data-w-tab=\"" + name + "\" class=\"" + classNames + "\" id=\"" + pane + "\" role=\"tabpanel\" aria-labelledby=\"" + tab + "\">\n" + content + "\n    </div>";
};

var getPrefix = function getPrefix(val) {
  return val.match(/(w-tabs-[0-9]{1}-data-w)/gi)[0];
};
},{"./fsLibrary":"fsLibrary.ts"}],"anchor.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("./fsLibrary");

var utility_1 = require("./utility");

fsLibrary_1.FsLibrary.prototype.anchor = function (_a) {
  var anchorButton = _a.anchorButton,
      buttonsTarget = _a.buttonsTarget,
      activeClass = _a.activeClass,
      anchorId = _a.anchorId;
  var cms = this.getMasterCollection();
  var active = String(activeClass).replace(".", "");
  var targetHolder = document.querySelector(buttonsTarget);
  targetHolder.innerHTML = "";
  var testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>div"));
  var Webflow = window.Webflow || []; // Webflow.push(function () {

  var done = testimonials.map(function (elem, idx, arr) {
    var anchor_link = elem.querySelector(anchorId).textContent.trim();
    anchor_link = anchor_link.replace(/\s+/gi, "-");
    var sidebar_link = elem.querySelector(anchorButton);
    elem.id = anchor_link;
    sidebar_link.href = "#" + anchor_link;
    var sidelink = utility_1.createElementFromHTML(sidebar_link.outerHTML);
    targetHolder.appendChild(sidelink);

    if (idx == 0) {
      sidelink.classList.add(active);
    }

    return Promise.resolve();
  });
  Promise.all(done).then(function () {
    utility_1.registerListener("scroll", onScroll);
  }); // });

  var removeActiveClassFromTriggers = function removeActiveClassFromTriggers(target, activeClass) {
    document.querySelectorAll(buttonsTarget + ">a").forEach(function (elem) {
      if (elem.outerHTML != target.outerHTML) {
        elem.classList.remove(activeClass);
      }
    });
  };

  var onScroll = function onScroll() {
    document.querySelectorAll(buttonsTarget + ">a").forEach(function (elem, i) {
      var href = elem.href.match(/#(.*)?/)[1];
      var targetElem = document.getElementById(href); // const deepest = findDeepestChildElement(targetElem);

      var check = utility_1.isOutOfViewport(targetElem);

      if (!check.bottom && !check.top) {
        removeActiveClassFromTriggers(elem, active);
        elem.classList.add(active);
      } else {
        elem.classList.remove(active);
      }
    });
  };
};
},{"./fsLibrary":"fsLibrary.ts","./utility":"utility.ts"}],"slider.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fsLibrary_1 = require("./fsLibrary");

fsLibrary_1.FsLibrary.prototype.slider = function (_a) {
  var _this = this;

  var sliderComponent = _a.sliderComponent,
      _b = _a.resetIx,
      resetIx = _b === void 0 ? true : _b;
  var cms = this.getMasterCollection();
  var testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>*"));
  var slideContainer = document.querySelector(sliderComponent);
  var slideHolder = slideContainer.querySelector(".w-slider-mask");
  var slideNav = slideContainer.querySelector(".w-slider-nav");
  var Webflow = window.Webflow || [];
  Webflow.push(function () {
    if (window.___toggledInit___) {
      return;
    }

    var templateSlide = slideHolder.children[0].cloneNode(true);
    var templateSlideNav = slideNav.children[0];
    templateSlideNav.classList.remove('w-active');
    var templateDot = templateSlideNav.outerHTML;
    slideHolder.innerHTML = "";
    slideNav.innerHTML = "";
    var done = testimonials.map(function (elem, idx, arr) {
      var newSlide = templateSlide.cloneNode(true);
      newSlide.innerHTML = elem.outerHTML;
      slideHolder.innerHTML += newSlide.outerHTML;
      slideNav.innerHTML += templateDot;
      return Promise.resolve(true);
    });
    Promise.all(done).then(function (r) {
      slideContainer.outerHTML += "";
      window.___toggledInit___ = true;
      window.Webflow.ready();
      !!resetIx && _this.reinitializeWebflow();
    });
  });
};
},{"./fsLibrary":"fsLibrary.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./addClasses");

require("./filter/filter");

require("./combine");

require("./lazyLoad");

require("./nest");

require("./sort");

require("./loadmore/index");

require("./tabs");

require("./anchor");

require("./slider");
},{"./addClasses":"addClasses.ts","./filter/filter":"filter/filter.ts","./combine":"combine.ts","./lazyLoad":"lazyLoad.ts","./nest":"nest.ts","./sort":"sort.ts","./loadmore/index":"loadmore/index.ts","./tabs":"tabs.ts","./anchor":"anchor.ts","./slider":"slider.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33387" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], "fsLibrary")