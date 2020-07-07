export function isInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export const isOutOfViewport = function (elem) {
  // Get element's bounding
  var bounding = elem.getBoundingClientRect();

  // Check if it's out of the viewport on each side
  const out: any = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom =
    bounding.bottom >
    (window.innerHeight || document.documentElement.clientHeight);
  out.right =
    bounding.right >
    (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;

  return out;
};

export function registerListener(event, func) {
  if (document.addEventListener) {
    document.addEventListener(event, func, true);
  } else {
    (document as any).attachEvent("on" + event, func);
  }
}

export function removeListener(event, func) {
  document.removeEventListener(event, func, true);
}

export function isVisible(elem) {
  const { width, height } = elem.getBoundingClientRect();

  return !(height === width && height === 0);
}

export function findDeepestChildElement(elem) {
  return [].slice
    .call(elem.querySelectorAll("*"))
    .find((e) => !(<any>e).children.length);
}

export function createDocument(html, title) {
  const doc = document.implementation.createHTMLDocument(title);
  doc.documentElement.innerHTML = html;
  return doc;
}

export const escapeRegExp = (string) => {
  return string.replace(/[*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

export function whichTransitionEvent() {
  var t,
    el = document.createElement("fakeelement");

  var transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

export function whichAnimationEvent() {
  var t,
    el = document.createElement("fakeelement");

  var animations = {
    animation: "animationend",
    OAnimationn: "oAnimationnEnd",
    MozAnimationn: "animationnend",
    WebkitAnimationn: "webkitAnimationnEnd",
  };

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

export function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
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

export const initResize = () => {
  if (typeof Event === "function") {
    // modern browsers
    window.dispatchEvent(new Event("resize"));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    const evt = window.document.createEvent("UIEvents");
    (<any>evt).initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }
};

export const dispatchEvent = (event) => {
  if (typeof Event === "function") {
    // modern browsers
    window.dispatchEvent(new Event(event));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    const evt = window.document.createEvent("UIEvents");
    (<any>evt).initUIEvent(event, true, false, window, 0);
    window.dispatchEvent(evt);
  }
};

/**
 * @param {HTMLElement} element
 * @returns {number} percent of element in view
 */
export function getPercentOfView(element) {
  const viewTop = window.pageYOffset;
  const viewBottom = viewTop + window.innerHeight;
  const rect = element.getBoundingClientRect();
  const elementTop = rect.top + viewTop;
  const elementBottom = elementTop + rect.height;

  if (elementTop >= viewBottom || elementBottom <= viewTop) {
    // heigher or lower than viewport
    return 0;
  } else if (elementTop <= viewTop && elementBottom >= viewBottom) {
    // element is completely in viewport and bigger than viewport
    return 100;
  } else if (elementBottom <= viewBottom) {
    if (elementTop < viewTop) {
      // intersects viewport top
      return Math.round(((elementBottom - viewTop) / window.innerHeight) * 100);
    } else {
      // completely inside viewport
      return Math.round(
        ((elementBottom - elementTop) / window.innerHeight) * 100
      );
    }
  } else {
    // intersects viewport bottom
    //  elementBottom >= viewBottom && elementTop <= viewBottom
    return Math.round(((viewBottom - elementTop) / window.innerHeight) * 100);
  }
}


export function getClosest (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        (<any>Element.prototype).matchesSelector ||
	        (<any>Element.prototype).mozMatchesSelector ||
	        (<any>Element.prototype).msMatchesSelector ||
	        (<any>Element.prototype).oMatchesSelector ||
	        (<any>Element.prototype).webkitMatchesSelector ||
	        function(s) {
	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                i = matches.length;
	            while (--i >= 0 && matches.item(i) !== this) {}
	            return i > -1;
	        };
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};