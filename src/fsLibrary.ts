import { blurImg } from "./blurImg";
import { isVisible, initResize } from "./utility";

export function FsLibrary(
  cms_selector: string,
  opt: LazyLoad = { type: 1, className: "image" }
) {
  opt && this.lazyLoad(cms_selector, opt.className);

  this.cms_selector = cms_selector;
  this.indexSet;

  this.cms_selector;

  this.animation = {
    enable: true,
    duration: 250,
    easing: "ease-in-out",
    effects: "translate(0px,0px)",
    queue: true,
  };

  this.addClass;

  this.nestConfig;

  this.index = 0;

  this.hidden_collections;

  this.addClassConfig;

  this.animationStyle = `
        
          @keyframes fade-in {
              0% {
                  opacity: 0;
                 transform:{{transform}};
              }
              100% {
                  transform:translate(0) rotate3d(0) rotate(0) scale(1);
                  opacity: 1;
              }
            }
            
            .fslib-fadeIn {
              animation-name: fade-in;
              animation-duration: {{duration}}s;
              animation-iteration-count: 1;
              animation-timing-function: {{easing}};
              animation-fill-mode: forwards;
            }
        `;

  this.tinyImgBase64 = blurImg;
}

FsLibrary.prototype.setNextButtonIndex = function () {
  const cmsList = document.querySelectorAll(this.cms_selector);

  for (let i = 0; i < cmsList.length; i++) {
    const nextSibling = cmsList[i].nextElementSibling;
    if (
      nextSibling &&
      isVisible(nextSibling) &&
      nextSibling.querySelector("w-pagination-next")
    ) {
      this.index = i;
    }
  }
  this.indexSet = true;
};

FsLibrary.prototype.getMasterCollection = function () {
  return document.querySelector(this.cms_selector);
};

FsLibrary.prototype.reinitializeWebflow = function () {
  // (<any>window).Webflow.destroy();
  (<any>window).Webflow.ready();
  (<any>window).Webflow.require("ix2").init();
  setTimeout(()=>{
    initResize();
  },20)
};

FsLibrary.prototype.makeStyleSheet = function ({
  duration = 1,
  easing = "ease-in-out",
  transform = "translate(0)",
}) {
  this.animationStyle = this.animationStyle.replace(
    "{{duration}}",
    "" + duration
  );
  this.animationStyle = this.animationStyle.replace("{{ease}}", easing);
  this.animationStyle = this.animationStyle.replace("{{transform}}", transform);

  const head = document.head || document.getElementsByTagName("head")[0];
  const lazyLoadCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.css">`;
  head.innerHTML += lazyLoadCss;
  const style: any = document.createElement("style");
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

interface LazyLoad {
  type: number;
  className: string;
}

interface Animatn {
  enable?: boolean;
  easing?: string;
  duration?: number;
  effects?: string;
  queue?: boolean;
}


(window as any).FsLibrary = FsLibrary;