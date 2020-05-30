import { FsLibrary } from "./fsLibrary";

FsLibrary.prototype.addclasses = function (
  config: AddClass = { classArray: [], frequency: 2, start: 1 }
): void {
    
  const parent: any = document.querySelector(this.cms_selector);
  const { frequency, start, classArray: classNames } = config;

  this.addClassConfig = config;
  this.addClass = true;

  if (frequency < 0) {
    throw "unaccepted value passed as frequency";
  } else if (start < 1) {
    throw "unaccepted value passed as start";
  }

  classNames.map(({ classTarget: target, classToAdd: alt }) => {
    let list = parent.querySelectorAll(target);
    let targerIsDirectChild = true;

    if (parent.children[0] != list[0]) {
      targerIsDirectChild = false;
      list = parent.children;
    }

    const addon = alt.replace(/\./g, "");

    for (let j = start - 1; j < list.length; j += frequency) {
      if (targerIsDirectChild) {
        list[j].classList.toggle(addon);
      } else {
        list[j].querySelectorAll(target).forEach((elem) => {
          elem.classList.toggle(addon);
        });
      }

      if (frequency == 0) {
        break;
      }

      this.reinitializeWebflow();
    }
  });
};

interface AddClass {
  classArray: Array<AltClass>; //list of classnames you want to add
  frequency: number; //The frequency or order of addition of class to the list
  start: number; //position of list item to start with
}

interface AltClass {
  classTarget: string;
  classToAdd: string;
}
