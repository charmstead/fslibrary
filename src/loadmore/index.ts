import { FsLibrary } from "../fsLibrary";
import "./util";
import {
  throttle,
  getPercentOfView,
  isInViewport,
  isOutOfViewport,
} from "../utility";

FsLibrary.prototype.loadmore = function (
  config: LoadMore = {
    button: "a.w-pagination-next",
    loadAll: false,
    resetIx: true,
    animation: this.animation,
    infiniteScroll: true,
    infiniteScrollPercentage: 80,
  }
): void {
  if (!this.indexSet) {
    this.setNextButtonIndex();
  }

  const master_collection = this.getMasterCollection();
  const getCollections = () => this.getMasterCollection();
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

  const {
    button,
    resetIx = true,
    loadAll = false,
    infiniteScroll = true,
    infiniteScrollPercentage = 80,
  } = config;

  const nextButton = this.getLoadmoreHref(button);
  nextButton.setAttribute("data-href", (<any>nextButton).href);
  nextButton.removeAttribute("href");

  let busy = false;

  (<any>nextButton).onclick = (evt) => {
    initFetch();
  };

  const initScroll = throttle((evt) => {
    const parent = getCollections();
    const children = parent.children;
    const len = children.length;

    const pos = Math.round((infiniteScrollPercentage * len) / 100);

    if (isInViewport(children[pos]) || !isOutOfViewport(parent).bottom) {
      initFetch();
    }
  }, 700);

  if (infiniteScroll) {
    document.addEventListener("scroll", initScroll);
  }

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
      this.appendToCms(nextcollection.firstElementChild.children).then(
        (res) => {
          if (resetIx) {
            this.reinitializeWebflow();
          }
        }
      );
      const aHref = nextcollection.querySelector(".w-pagination-next");
      this.setLoadmoreHref(aHref.href);
      this.index++;
      busy = false;

      if (recursive) {
        initFetch(true);
      }
    }
  };
};

interface LoadMore {
  button: string;
  loadAll?: boolean;
  resetIx?: boolean;
  animation?: Animatn;
  infiniteScroll?: boolean;
  infiniteScrollPercentage?: number;
}

interface Animatn {
  enable?: boolean;
  easing?: string;
  duration?: number;
  effects?: string;
  queue?: boolean;
}
