import { isVisible } from "./utility";
import { FsLibrary } from "./fsLibrary";

  /**
   * Combine all the collection items into one collection.
   */
FsLibrary.prototype.combine=function() {
    this.setNextButtonIndex();
    //get all collections
    const visible_collection: any = [].slice
      .call(document.querySelectorAll(this.cms_selector))
      .filter(isVisible);
    let nextButton = null;

    //copies the cms items into the first collection list
    visible_collection[0].innerHTML = visible_collection
      .reduce((curr, item) => {
        //gets all the items
        const aNextButton = item.nextElementSibling;
        if (aNextButton && isVisible(aNextButton) && !nextButton) {
          nextButton = aNextButton.outerHTML;
        }
        return [...curr, item.innerHTML];
      }, [])
      .join("");

    if (nextButton) {
      nextButton.outerHTML = nextButton.outerHTML + nextButton;
    }

    //deletes the rest collection list
   const done= visible_collection.map((elem: Element, i: number) => {
      if (i > 0) {
        elem.parentElement.outerHTML = "";
      }
      return Promise.resolve()
    })

    Promise.all(done).then(r=>{
      if((<any>window).Webflow.require("ix2")){
        this.reinitializeWebflow();
      }
    })

}