import { FsLibrary } from "../fsLibrary";
import './util'

FsLibrary.prototype.loadmore = function (
  config: LoadMore = {
    button: "a.w-pagination-next",
    loadAll: false,
    resetIx: true,
    animation: this.animation,
  }
): void {
  if (!this.indexSet) {
    this.setNextButtonIndex();
  }

  this.setHiddenCollections();

  if (config.animation) {
    const effects = config.animation.effects.replace("fade", "");
    let { duration, easing } = config.animation;
    duration = duration ? duration / 1000 : 1;
    easing = easing || "linear";
    this.makeStyleSheet({ duration, easing, transform: effects });
  } else {
    this.makeStyleSheet({});
  }

  const { button, resetIx = true, loadAll = false } = config;

  const nextButton = this.getLoadmoreHref(button);
  nextButton.setAttribute("data-href", (<any>nextButton).href);
  nextButton.removeAttribute("href");

  let busy = false;

  (<any>nextButton).onclick = (evt) => {
    initFetch();
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    loadAll && initFetch(true);
  });

  const initFetch = (recursive = false) => {
    if (busy) return false;

    const href = nextButton.getAttribute("data-href");

    busy = true;

    if (href) {
      return this.getNextData(href).then((res) => {
        //enable button
        this.appendPaginatedData(<any>res);
        busy = false;

        if (resetIx) {
          this.reinitializeWebflow();
        }

        if (recursive) {
          initFetch(true);
        }
      });
    }

    const nextcollection = this.hidden_collections.shift();

    if (nextcollection) {
      this.appendToCms(nextcollection.firstElementChild.children);
      const aHref = nextcollection.querySelector(".w-pagination-next");
      this.setLoadmoreHref(aHref.href);
      this.index++;
      busy = false;

      if (recursive) {
        initFetch(true);
      }
    }
    if (resetIx) {
      this.reinitializeWebflow();
    }
  };
};

interface LoadMore {
  button: string;
  loadAll?: boolean;
  resetIx?: boolean;
  animation?: Animatn;
}

interface Animatn {
  enable?: boolean;
  easing?: string;
  duration?: number;
  effects?: string;
  queue?: boolean;
}
