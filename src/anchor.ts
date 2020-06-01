import { FsLibrary } from "./fsLibrary";

FsLibrary.prototype.anchor = function ({
  button,
  buttonsTarget,
  activeClass,
  anchorLink,
  sectionAnchorTarget,
}) {
  const cms = this.getMasterCollection();

  const targetHolder = document.querySelector(buttonsTarget);
  targetHolder.innerHTML = "";

  const testimonial = cms.querySelectorAll(sectionAnchorTarget);

  const Webflow = (<any>window).Webflow || [];

  Webflow.push(function () {
    testimonial.forEach((elem, idx) => {
      const anchor_link = elem.querySelector(anchorLink).textContent.trim();
      const sidebar_link = elem.querySelector(button);

      elem.id = anchor_link;
      sidebar_link.href = "#" + anchor_link;

      targetHolder.innerHTML += sidebar_link.outerHTML;

      (<any>targetHolder.children[idx]).addEventListener("click", (event) => {
        const target = event.currentTarget;
        const active = String(activeClass).replace(".", "");
      
        removeActiveClassFromTriggers(target, active);
      
        if(!target.contains(active)){
            target.classList.add(active);
        }
        
      });

    });
  });

  const removeActiveClassFromTriggers = ( target, activeClass) => {
    document.querySelector(buttonsTarget).children.forEach((elem) => {
      if (elem.outerHTML != target.outerHTML) {
        elem.classList.remove(activeClass);
      }
    });
  };
};


