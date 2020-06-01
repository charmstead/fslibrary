import { FsLibrary } from "./fsLibrary";

FsLibrary.prototype.slider = function ({
    sliderComponent
}) {

   const cms = this.getMasterCollection();
  const testimonials = cms.querySelectorAll(".w-dyn-item>div");
  const slideHolder = document.querySelector(sliderComponent + " .w-slider-mask");
  const slideNav = document.querySelector(sliderComponent + " .w-slider-nav");



  const Webflow = (<any>window).Webflow || [];

  Webflow.push(function () {
    const templateSlide = slideHolder.children[0].cloneNode(true);
    const templateSlideNav = slideNav.children[0];
  
    templateSlideNav.classList.remove('w-active')

    
    const templateDot = templateSlideNav.outerHTML;

    slideHolder.innerHTML="";
    slideNav.innerHTML="";

    
    testimonials.forEach((elem,idx) => {
        const newSlide = templateSlide.cloneNode(true);
        (<any>newSlide).innerHTML =elem.outerHTML;

        slideHolder.innerHTML +=(<any>newSlide).outerHTML;
        slideNav.innerHTML +=templateDot;
    });
  });


};


