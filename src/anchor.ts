import { FsLibrary } from "./fsLibrary";
import { createElementFromHTML } from "./utility";

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

  const testimonials = cms.querySelectorAll(".w-dyn-item>div");


  const Webflow = (<any>window).Webflow || [];

  // Webflow.push(function () {
    testimonials.forEach((elem, idx) => {
      let anchor_link = elem.querySelector(anchorId).textContent.trim()
      anchor_link=anchor_link.replace(/\s+/gi, "-");
      const sidebar_link = elem.querySelector(anchorButton);

      elem.id = anchor_link;
      sidebar_link.href = "#" + anchor_link;

      const sidelink:any = createElementFromHTML(sidebar_link.outerHTML);

      targetHolder.appendChild(sidelink);

      if(idx==0){
        sidelink.classList.add(active)
      }

      sidelink.addEventListener("click", (event) => {
        const target:any = event.currentTarget;
      
        removeActiveClassFromTriggers(target, active);
      
        if(!target.classList.contains(active)){
            target.classList.add(active);
        }
        
      });

    });
  // });

  const removeActiveClassFromTriggers = ( target, activeClass) => {
    document.querySelectorAll(buttonsTarget+">a").forEach((elem) => {
      if (elem.outerHTML != target.outerHTML) {
        elem.classList.remove(activeClass);
      }
    });
  };
};


