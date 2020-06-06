import { FsLibrary } from "./fsLibrary";
import { createElementFromHTML } from "./utility";

FsLibrary.prototype.slider = function ({
    sliderComponent,
    resetIx
}) {


  const cms = this.getMasterCollection();
  const testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>div"));

  const slideContainer = document.querySelector(sliderComponent);

  const slideHolder = slideContainer.querySelector(".w-slider-mask");
  const slideNav = slideContainer.querySelector(".w-slider-nav");



  const Webflow = (<any>window).Webflow || [];
  Webflow.push(()=> {
    if((<any>window).___toggledInit___){
      return;
    }
    const templateSlide = slideHolder.children[0].cloneNode(true);
    const templateSlideNav = slideNav.children[0];
  
    templateSlideNav.classList.remove('w-active')

    
    const templateDot = templateSlideNav.outerHTML;

    slideHolder.innerHTML="";
    slideNav.innerHTML="";

    
    const done =testimonials.map((elem,idx,arr) => {
        const newSlide:any = templateSlide.cloneNode(true);
        newSlide.innerHTML =elem.outerHTML;

        slideHolder.innerHTML +=(<any>newSlide).outerHTML;
        slideNav.innerHTML +=templateDot;

        return Promise.resolve(true);
    });

    Promise.all(done).then(r=>{
      slideContainer.outerHTML+="";
      (<any>window).___toggledInit___=true;
      (<any>window).Webflow.ready();
      !!resetIx &&  this.reinitializeWebflow();

    })

  });


};


