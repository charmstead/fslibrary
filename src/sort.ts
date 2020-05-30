import { FsLibrary } from "./fsLibrary";
import Animate from "./animate";
import {debounce} from './utility'


FsLibrary.prototype.sort=function({
    sortTrigger,
    sortReverse,
    activeClass,
    animation,
  }) {
    animation = { ...this.animation, ...animation };
   
    if (animation) {
      animation.enable = !/^false$/.test(String(animation.enable));
      const effects = animation.effects.replace("fade", "");
      animation.effects = effects;

      if (animation.effects.indexOf("translate") < 0) {
        animation.effects += " translate(0px,0px)  ";
      }
      this.animation = animation;
    }

    animation = this.animation;

    const get_cms_items: any = () =>
      [].slice.call(document.querySelectorAll(this.cms_selector));

    const triggerElem = [].slice.call(document.querySelectorAll(sortTrigger));

    triggerElem.map((elem) => {
      const triggerTag = elem && elem.tagName;

      if (triggerTag == "SELECT") {
        (<any>elem).addEventListener(
          "change",
          debounce((event) => {
            let sortTarget = event.target.selectedOptions[0].value;
            sortTarget = sortTarget || event.getAttribute("sort-by");

            sortHelper({ sortTarget, sortReverse });
          }, 200)
        );
      } else if (triggerTag == "INPUT") {
        //handle checkbox and radio button

        (<any>elem).addEventListener(
          "change",
          debounce((event) => {
            const sortTarget = event.target.getAttribute("sort-by") || "";
            const active = String(activeClass).replace(".", "");

            removeActiveClassFromTriggers(sortTarget, active);

            event.target.classList.toggle(active);
            sortHelper({ sortTarget, sortReverse });
          }, 200)
        );
      } else {
        (<any>elem).addEventListener("click", (event) => {
          const target = event.currentTarget;
          const sortTarget = target.getAttribute("sort-by") || "";
          const active = String(activeClass).replace(".", "");

          const previouslyClicked = target.classList.contains(active);

          removeActiveClassFromTriggers(target, active);

          elem.classList.toggle(active);

          const isReversed = previouslyClicked ? !sortReverse : sortReverse;

          sortHelper({ sortTarget, sortReverse: isReversed });
        });
      }
    });

    const removeActiveClassFromTriggers = (target, activeClass) => {
      triggerElem.forEach((elem) => {
        if (elem.outerHTML != target.outerHTML) {
          elem.classList.remove(activeClass);
        }
      });
    };

    const collator = new Intl.Collator("en", {
      numeric: true,
      sensitivity: "base",
    });

    const sortHelper = ({ sortTarget, sortReverse }) => {
      const initSort = () => sortMasterCollection({ sortReverse, sortTarget });

      if (animation.enable) {
        const target = document.querySelector(this.cms_selector);
        Animate.methods.animate(initSort, target, animation);
      } else {
        initSort();
      }
    };

    const sortMasterCollection = ({ sortTarget, sortReverse }) => {
      const master_collection = get_cms_items();

      master_collection.map((elem) => {
        return [].slice
          .call(elem.children)
          .sort((a, b) => {
            const x = a.querySelector(sortTarget).textContent;
            const y = b.querySelector(sortTarget).textContent;

            return collator.compare(x, y);
          })
          .map((sortedElem) => {
            if (sortReverse) {
              elem.insertBefore(sortedElem, elem.firstChild);
              return;
            }
            elem.appendChild(sortedElem);
          });
      });
    };
  }