
export function isInViewport(el){
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom >= 0 && 
        rect.right >= 0 && 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
     );
}
export function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        (window as any).attachEvent('on' + event, func)
    }
}

export function isVisible(elem) {
  const {width,height}= elem.getBoundingClientRect();

  return !(height === width && height===0)
}


export function createDocument(html, title) {
    const doc = document.implementation.createHTMLDocument(title)
    doc.documentElement.innerHTML = html
    return doc
  }

  export const escapeRegExp = (string)=>{
    return string.replace(/[*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


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