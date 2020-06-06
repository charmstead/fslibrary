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
	const out:any = {};
	out.top = bounding.top < 0;
	out.left = bounding.left < 0;
	out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	out.any = out.top || out.left || out.bottom || out.right;
	out.all = out.top && out.left && out.bottom && out.right;

	return out;

};

export function registerListener(event, func) {
  if (document.addEventListener) {
    document.addEventListener(event, func,true);
  } else {
    (document as any).attachEvent("on" + event, func);
  }
}

export function removeListener(event, func) {
    document.removeEventListener(event, func,true);
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
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export const initResize=()=>{
  
  if (typeof(Event) === 'function') {
    // modern browsers
    window.dispatchEvent(new Event('resize'));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    const evt = window.document.createEvent('UIEvents'); 
    (<any>evt).initUIEvent('resize', true, false, window, 0); 
    window.dispatchEvent(evt);
  }
}