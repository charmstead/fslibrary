import { FsLibrary } from "./fsLibrary";
import { registerListener, isInViewport } from "./utility";

FsLibrary.prototype.lazyLoad=function(cms_selector, className) {
    let lazy: any = [];
    registerListener("load", setLazy);
    registerListener("load", lazyLoad);
    registerListener("scroll", lazyLoad);
    registerListener("resize", lazyLoad);

    function setLazy() {
      lazy = [].slice.call(
        document.querySelectorAll(`${cms_selector} .${className}`)
      );
    }

    function lazyLoad() {
      for (var i = 0; i < lazy.length; i++) {
        if (isInViewport(lazy[i])) {
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
      lazy = [].filter.call(lazy, (elem) => {
        return elem.classList.contains(className);
      });
    }
  }
