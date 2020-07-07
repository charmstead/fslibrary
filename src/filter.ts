import { FsLibrary } from "./fsLibrary";
import { debounce, escapeRegExp } from "./utility";
import Animate from "./animate";

FsLibrary.prototype.filter = function (
  config = { filterArray: [], animation: this.animation, activeClass: "active" }
) {
  let { filterArray: cms_filter, animation, activeClass } = config;
  activeClass = activeClass || "active";

  animation = { ...this.animation, ...animation };

  let filter_type = typeof cms_filter == "string" ? "exclusive" : "multi";

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

  let filterActive = false;
  let filterQueue = [];
  let filter: Array<{ [key: string]: string }> = []; //2D array to hold categories of filter selectors and their corresponding

  //get all collections

  const get_cms_items: any = () =>
    [].slice.call(document.querySelectorAll(this.cms_selector));

  if (Array.isArray(cms_filter)) {
    cms_filter.map((val, index) => {
      let prevClicked;
      const { filterType: filter_option } = val;

      const filter_group = [].slice.call(
        document.querySelectorAll(`${(<any>val).filterWrapper} [filter-by]`)
      );
      assignChangeEventToButtons({
        index,
        prevClicked,
        filter_option,
        filter_group,
      });
    });
  } else if (typeof cms_filter == "string") {
    let prevClicked;
    const filter_group = [].slice.call(
      document.querySelectorAll(`${cms_filter} [filter-by]`)
    );
    assignChangeEventToButtons({ index: 0, prevClicked, filter_group });
  } else {
    throw "Incorrect type passed as cms_filter";
  }

  function conditionalReset(filter_text, index) {
    const isEmpty = !filter_text.trim();
    const tag = Object.values(filter[index]);

    if (isEmpty && tag.includes(filter_text)) {
      return false;
    }

    if (isEmpty && !tag.length) {
      return false;
    }
    return true;
  }

  function assignChangeEventToButtons({
    index,
    prevClicked,
    filter_option = filter_type,
    filter_group,
  }) {
    filter[index] = {}; //initialise default values
    filter_group.map((elem, j) => {
      const id = `${index}${j}`;
      const tag_element = elem && elem.tagName;

      if (tag_element == "SELECT") {
        (<any>elem).addEventListener(
          "change",
          debounce((event) => {
            const filter_text = event.target.selectedOptions[0].value || "";

            conditionalReset(filter_text, index) &&
              initFilter({
                filter_option,
                id,
                index,
                filter_text,
                wildcard: true,
              });
          }, 500)
        );
      } else if (tag_element == "INPUT") {
        //handle checkbox and radio button

        switch (elem.type) {
          case "text":
            (<any>elem).addEventListener(
              "input",
              debounce((event) => {
                const filter_text = event.target.value;
                conditionalReset(filter_text, index) &&
                  initFilter({
                    filter_option,
                    id,
                    index,
                    filter_text,
                    wildcard: true,
                  });
              }, 500)
            );
            break;
          default:
            (<any>elem).addEventListener("change", (event) => {
              const filter_text = !event.target.checked
                ? ""
                : event.currentTarget.getAttribute("filter-by") || "";
              conditionalReset(filter_text, index) &&
                initFilter({ filter_option, id, index, filter_text });
            });
            break;
        }
      } else {
        (<any>elem).onclick = (event) => {
          const active = event.currentTarget.className;

          //only one element should have active class for or
          if (
            /^exclusive$/i.test(filter_type) ||
            /^exclusive$/i.test(filter_option)
          ) {
            if (prevClicked) prevClicked.classList.remove(activeClass);
          }

          prevClicked = event.currentTarget;

          if (active.includes(activeClass)) {
            prevClicked.classList.remove(activeClass);
          } else {
            prevClicked.classList.add(activeClass);
          }

          const filter_text = prevClicked.getAttribute("filter-by") || "";

          //prevent further filter if filter is empty and reset button is clicked.

          conditionalReset(filter_text, index) &&
            initFilter({ filter_option, id, index, filter_text });
        };
      }
    });
  }

  const initFilter = ({
    filter_option,
    id,
    index,
    filter_text,
    wildcard = false,
  }) => {
    if (animation.enable && animation.queue && filterActive) {
      return filterQueue.push(() =>
        filterHelper({ filter_option, id, index, filter_text, wildcard })
      );
    }

    return filterHelper({ filter_option, id, index, filter_text, wildcard });
  };

  const filterHelper = ({
    filter_option,
    id,
    index,
    filter_text,
    wildcard = false,
  }) => {
    filterActive = true;
    filter_text = escapeRegExp(filter_text.replace(/\*/gi, ""));
    if (
      /^exclusive$/i.test(filter_type) ||
      /^exclusive$/i.test(filter_option)
    ) {
      //checks if it has previously been clicked
      if (id in filter[index] && !wildcard) {
        delete filter[index][id];
      } else {
        filter[index] = {};
        filter[index][id] = filter_text;
      }
    } else {
      //it is definitely "multi"

      //checks if it has previously been clicked
      if (id in filter[index] && !wildcard) {
        delete filter[index][id];
      } else {
        filter[index][id] = filter_text;
      }
    }
    //try to fix queue here
    if (animation.enable) {
      const target = document.querySelector(this.cms_selector);
      return Animate.methods
        .animate(findAndMatchFilterText, target, animation)
        .then(() => {
          filterActive = false;

          const nextAnimation = filterQueue.shift();
          if (nextAnimation) {
            nextAnimation.call(null);
          }
        });
    }

    findAndMatchFilterText();
  };

  const findAndMatchFilterText = () => {
    const master_collection = get_cms_items();
    master_collection.map((elem, i) => {
      const search_result = filter.reduce((curr, search) => {
        //creating a regex to test against
        const val = `(${Object["values"](search).join("|")})`;

        const result = [].slice.call(elem.children).map((item, j) => {
          const re = new RegExp(val, "gi");
          const valid = re.test(item.textContent);

          const clonedItem = item.cloneNode(true);

          if (valid) {
            clonedItem.style.display = "block";
          } else {
            clonedItem.style.display = "none";
          }

          // return clonedItem.outerHTML;
          return clonedItem;
        });

        if (curr.length < 1) {
          return result;
        }

        // return [...curr.filter((a) => result.includes(a))]

        //intersections of the results
        return [
          ...curr.map((a, index) => {
            if (a.style.display !== result[index].style.display) {
              a.style.display = "none";
            }
            return a;
          }),
        ];
      }, []); //.join("").trim()

      if (search_result.length > 1) {
        [].slice.call(master_collection[i].children).map((child, k) => {
          child.style.display = search_result[k].style.display;
        });
      }
    });
  };
};
import { FsLibrary } from "./fsLibrary";
import { debounce, escapeRegExp } from "./utility";
import Animate from "./animate";

FsLibrary.prototype.filter = function (
  config = { filterArray: [], animation: this.animation, activeClass: "active" }
) {
  let { filterArray: cms_filter, animation, activeClass } = config;
  activeClass = activeClass || "active";

  animation = { ...this.animation, ...animation };

  let filter_type = typeof cms_filter == "string" ? "exclusive" : "multi";

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

  let filterActive = false;
  let filterQueue = [];
  let filter: Array<{ [key: string]: string }> = []; //2D array to hold categories of filter selectors and their corresponding

  //get all collections

  const get_cms_items: any = () =>
    [].slice.call(document.querySelectorAll(this.cms_selector));

  if (Array.isArray(cms_filter)) {
    cms_filter.map((val, index) => {
      let prevClicked;
      const { filterType: filter_option } = val;

      const filter_group = [].slice.call(
        document.querySelectorAll(`${(<any>val).filterWrapper} [filter-by]`)
      );
      assignChangeEventToButtons({
        index,
        prevClicked,
        filter_option,
        filter_group,
      });
    });
  } else if (typeof cms_filter == "string") {
    let prevClicked;
    const filter_group = [].slice.call(
      document.querySelectorAll(`${cms_filter} [filter-by]`)
    );
    assignChangeEventToButtons({ index: 0, prevClicked, filter_group });
  } else {
    throw "Incorrect type passed as cms_filter";
  }

  function conditionalReset(filter_text, index) {
    const isEmpty = !filter_text.trim();
    const tag = Object.values(filter[index]);

    if (isEmpty && tag.includes(filter_text)) {
      return false;
    }

    if (isEmpty && !tag.length) {
      return false;
    }
    return true;
  }

  function assignChangeEventToButtons({
    index,
    prevClicked,
    filter_option = filter_type,
    filter_group,
  }) {
    filter[index] = {}; //initialise default values
    filter_group.map((elem, j) => {
      const id = `${index}${j}`;
      const tag_element = elem && elem.tagName;

      if (tag_element == "SELECT") {
        (<any>elem).addEventListener(
          "change",
          debounce((event) => {
            const filter_text = event.target.selectedOptions[0].value || "";

            conditionalReset(filter_text, index) &&
              initFilter({
                filter_option,
                id,
                index,
                filter_text,
                wildcard: true,
              });
          }, 500)
        );
      } else if (tag_element == "INPUT") {
        //handle checkbox and radio button

        switch (elem.type) {
          case "text":
            (<any>elem).addEventListener(
              "input",
              debounce((event) => {
                const filter_text = event.target.value;
                conditionalReset(filter_text, index) &&
                  initFilter({
                    filter_option,
                    id,
                    index,
                    filter_text,
                    wildcard: true,
                  });
              }, 500)
            );
            break;
          default:
            (<any>elem).addEventListener("change", (event) => {
              const filter_text = !event.target.checked
                ? ""
                : event.currentTarget.getAttribute("filter-by") || "";
              conditionalReset(filter_text, index) &&
                initFilter({ filter_option, id, index, filter_text });
            });
            break;
        }
      } else {
        (<any>elem).onclick = (event) => {
          const active = event.currentTarget.className;

          //only one element should have active class for or
          if (
            /^exclusive$/i.test(filter_type) ||
            /^exclusive$/i.test(filter_option)
          ) {
            if (prevClicked) prevClicked.classList.remove(activeClass);
          }

          prevClicked = event.currentTarget;

          if (active.includes(activeClass)) {
            prevClicked.classList.remove(activeClass);
          } else {
            prevClicked.classList.add(activeClass);
          }

          const filter_text = prevClicked.getAttribute("filter-by") || "";

          //prevent further filter if filter is empty and reset button is clicked.

          conditionalReset(filter_text, index) &&
            initFilter({ filter_option, id, index, filter_text });
        };
      }
    });
  }

  const initFilter = ({
    filter_option,
    id,
    index,
    filter_text,
    wildcard = false,
  }) => {
    if (animation.enable && animation.queue && filterActive) {
      return filterQueue.push(() =>
        filterHelper({ filter_option, id, index, filter_text, wildcard })
      );
    }

    return filterHelper({ filter_option, id, index, filter_text, wildcard });
  };

  const filterHelper = ({
    filter_option,
    id,
    index,
    filter_text,
    wildcard = false,
  }) => {
    filterActive = true;
    filter_text = escapeRegExp(filter_text.replace(/\*/gi, ""));
    if (
      /^exclusive$/i.test(filter_type) ||
      /^exclusive$/i.test(filter_option)
    ) {
      //checks if it has previously been clicked
      if (id in filter[index] && !wildcard) {
        delete filter[index][id];
      } else {
        filter[index] = {};
        filter[index][id] = filter_text;
      }
    } else {
      //it is definitely "multi"

      //checks if it has previously been clicked
      if (id in filter[index] && !wildcard) {
        delete filter[index][id];
      } else {
        filter[index][id] = filter_text;
      }
    }
    //try to fix queue here
    if (animation.enable) {
      const target = document.querySelector(this.cms_selector);
      return Animate.methods
        .animate(findAndMatchFilterText, target, animation)
        .then(() => {
          filterActive = false;

          const nextAnimation = filterQueue.shift();
          if (nextAnimation) {
            nextAnimation.call(null);
          }
        });
    }

    findAndMatchFilterText();
  };

  const findAndMatchFilterText = () => {
    const master_collection = get_cms_items();
    master_collection.map((elem, i) => {
      const search_result = filter.reduce((curr, search) => {
        //creating a regex to test against
        const val = `(${Object["values"](search).join("|")})`;

        const result = [].slice.call(elem.children).map((item, j) => {
          const re = new RegExp(val, "gi");
          const valid = re.test(item.textContent);

          const clonedItem = item.cloneNode(true);

          if (valid) {
            clonedItem.style.display = "block";
          } else {
            clonedItem.style.display = "none";
          }

          // return clonedItem.outerHTML;
          return clonedItem;
        });

        if (curr.length < 1) {
          return result;
        }

        // return [...curr.filter((a) => result.includes(a))]

        //intersections of the results
        return [
          ...curr.map((a, index) => {
            if (a.style.display !== result[index].style.display) {
              a.style.display = "none";
            }
            return a;
          }),
        ];
      }, []); //.join("").trim()

      if (search_result.length > 1) {
        [].slice.call(master_collection[i].children).map((child, k) => {
          child.style.display = search_result[k].style.display;
        });
      }
    });
  };
};
