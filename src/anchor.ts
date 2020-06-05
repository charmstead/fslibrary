import { FsLibrary } from "./fsLibrary";
import {
  createElementFromHTML,
  registerListener,
  isOutOfViewport,
} from "./utility";


FsLibrary.prototype.anchor = function ({
  anchorButton,
  buttonsTarget,
  activeClass,
  anchorId,
}) {
  const cms = this.getMasterCollection();
  const active = String(activeClass).replace(".", "");

  const targetHolder = document.querySelector(buttonsTarget);
  targetHolder.innerHTML = "";

  const testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>div"));

  const Webflow = (<any>window).Webflow || [];

  // Webflow.push(function () {
  const done = testimonials.map((elem, idx, arr) => {
    let anchor_link = elem.querySelector(anchorId).textContent.trim();
    anchor_link = anchor_link.replace(/\s+/gi, "-");
    const sidebar_link = elem.querySelector(anchorButton);

    elem.id = anchor_link;
    sidebar_link.href = "#" + anchor_link;

    const sidelink: any = createElementFromHTML(sidebar_link.outerHTML);

    targetHolder.appendChild(sidelink);

    if (idx == 0) {
      sidelink.classList.add(active);
    }


    return Promise.resolve();
  });

  Promise.all(done).then(() => {
    registerListener("scroll",onScroll)
  });

  // });

  const removeActiveClassFromTriggers = (target, activeClass) => {
    document.querySelectorAll(buttonsTarget + ">a").forEach((elem) => {
      if (elem.outerHTML != target.outerHTML) {
        elem.classList.remove(activeClass);
      }
    });
  };

  const onScroll = () => {
    document.querySelectorAll(buttonsTarget + ">a").forEach((elem, i) => {
      const href = (<any>elem).href.match(/#(.*)?/)[1];
      const targetElem = document.getElementById(href);
      // const deepest = findDeepestChildElement(targetElem);
      const check = isOutOfViewport(targetElem);

      if (!check.bottom && !check.top) {
        removeActiveClassFromTriggers(elem, active);
        elem.classList.add(active);
      } else {
        elem.classList.remove(active);
      }
    });
  };
};
