import { FsLibrary } from "../fsLibrary";
import { whichAnimationEvent, createDocument, isVisible } from "../utility";
import { once } from "../../js/util/index";



FsLibrary.prototype.getNextData = function (url) {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status == 200) {
        // done(xhr.response);
        return resolve(xhr.response);
      }
    };
  }).then((res) => res);
};

FsLibrary.prototype.appendPaginatedData = function (data: string) {
  const newDoc = createDocument(data, "newDoc" + Date.now());
  const collection = newDoc.querySelectorAll(this.cms_selector)[this.index];
  const nextHref = collection.parentElement.querySelector(".w-pagination-next");
  nextHref
    ? this.setLoadmoreHref((<any>nextHref).href)
    : this.setLoadmoreHref("");
  collection && this.appendToCms(collection.children);

  if (!this.hidden_collections.length && !nextHref) {
    (<any>this.getLoadmoreHref()).outerHTML = "";
  }
};

FsLibrary.prototype.appendToCms = function (collection) {
  const master_collection = this.getMasterCollection();

  const append=[].slice.call(collection).map((element) => {
    element.classList.add("fslib-fadeIn");

    once(element, whichAnimationEvent(), ({ type }) => {
      element.classList.remove("fslib-fadeIn");
    });

    master_collection.appendChild(element);
    if (this.addClass) {
      this.addclasses(this.addClassConfig);
    }
    return Promise.resolve();
  });

  if (this.nestConfig) {
    this.nest(this.nestConfig);
  }

  return Promise.all(append);
};

FsLibrary.prototype.setLoadmoreHref = function (url) {
  const master_collection = this.getMasterCollection();
  const hrefButton = master_collection.parentElement.querySelector(
    "a.w-pagination-next"
  );
  hrefButton.setAttribute("data-href", url || (<any>hrefButton).href);
  return hrefButton;
};

FsLibrary.prototype.getLoadmoreHref = function (selector?) {
  const master_collection = this.getMasterCollection();
  console.log(master_collection)
  const hrefButton = master_collection.parentElement.querySelector(
    selector || "a.w-pagination-next"
  );
  return hrefButton;
};

FsLibrary.prototype.getHiddenCollections = function (): any[] {
  return [].slice
    .call(document.querySelectorAll(this.cms_selector))
    .filter((e) => !isVisible(e));
};

FsLibrary.prototype.setHiddenCollections = function () {
  const collection = this.getHiddenCollections();
  this.hidden_collections = collection.map((val) =>
    val.parentElement.cloneNode(true)
  );

//   collection.forEach((val) => (val.parentNode.outerHTML = ""));
};
