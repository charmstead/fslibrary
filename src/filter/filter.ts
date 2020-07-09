import { FsLibrary } from "../fsLibrary";
import { debounce, escapeRegExp } from "../utility";
import Animate from "../animate";
import {
  shouldFilter,
  preventParentFormSubmission,
  resetAllFilter,
  removeMsg,
  preventFormSubmission,
} from "./helper";

FsLibrary.prototype.filter = function ({
  filterArray = [],
  filterReset = "",
  animation = this.animation,
  activeClass = "active",
}) {
  let cms_filter = filterArray;
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
  let filter = {}; //to hold categories of filter selectors and their corresponding
  let triggerSelectors = [];

  //get all collections

  const get_cms_items: any = () =>
    [].slice.call(document.querySelectorAll(this.cms_selector));

  if (Array.isArray(cms_filter)) {
    cms_filter.map((val, index) => {
      let prevClicked;
      const { filterWrapper } = val;

      const selector = `${filterWrapper} [filter-by]`;
      triggerSelectors.push(selector);
      const filter_group = [].slice.call(document.querySelectorAll(selector));
      assignChangeEventToButtons({
        index,
        prevClicked,
        filter_group,
        ...val,
      });
    });
  } else if (typeof cms_filter == "string") {
    let prevClicked;
    const selector = `${cms_filter} [filter-by]`;
    triggerSelectors.push(selector);

    const filter_group = [].slice.call(document.querySelectorAll(selector));
    assignChangeEventToButtons({ index: 0, prevClicked, filter_group });
  } else {
    throw "Incorrect type passed as cms_filter";
  }

  if (filterReset) {
    const resetButton = document.querySelector(filterReset);
    resetButton.addEventListener("click", () => {
      initFilter({ reset: true });
    });
  }

  function assignChangeEventToButtons({
    index,
    prevClicked,
    filter_group,
    filterType = filter_type,
    filterBy = "",
    range = false,
  }) {
    filter[index] = {
      target: filterBy,
      query: [],
      range,
    };

    filter_group.map((elem, j) => {
      const tag_element = elem && elem.tagName;
      let oldValue = "";

      if (tag_element == "SELECT") {
        (<any>elem).addEventListener(
          "change",
          debounce((event) => {
            const filterText = event.target.selectedOptions[0].value || "";

            const hold = oldValue;
            oldValue = filterText;

            shouldFilter(filter, filterText, index) &&
              initFilter({
                filterType,
                index,
                filterText,
                oldValue: hold,
                wildcard: true,
              });
          }, 500)
        );
      } else if (tag_element == "FORM") {
        preventFormSubmission(elem);
        const minInput = elem.querySelector('input[name="min"]');
        const maxInput = elem.querySelector('input[name="max"]');

        const hold = oldValue;

        const passValue = (filterText) => {
          oldValue = filterText;

          return initFilter({
            index,
            filterType,
            wildcard: true,
            oldValue: hold,
            filterText,
          });
        };

        addInputListener(minInput, maxInput, passValue);
        addInputListener(maxInput, minInput, passValue);
      } else if (tag_element == "INPUT") {
        //handle checkbox and radio button

        switch (elem.type) {
          case "text":
            preventParentFormSubmission(elem);

            (<any>elem).addEventListener(
              "input",
              debounce((event) => {
                const filterText = event.target.value;
                const hold = oldValue;
                oldValue = filterText;

                shouldFilter(filter, filterText, index) &&
                  initFilter({
                    filterType,
                    index,
                    filterText,
                    oldValue: hold,
                    wildcard: true,
                  });
              }, 500)
            );
            break;
          default:
            (<any>elem).addEventListener("change", (event) => {
              const filterText = !event.target.checked
                ? ""
                : event.currentTarget.getAttribute("filter-by") || "";
              shouldFilter(filter, filterText, index) &&
                initFilter({ filterType, index, filterText });
            });
            break;
        }
      } else {
        (<any>elem).onclick = (event) => {
          const active = event.currentTarget.className;

          //only one element should have active class for or
          if (
            /^exclusive$/i.test(filter_type) ||
            /^exclusive$/i.test(filterType)
          ) {
            if (prevClicked) prevClicked.classList.remove(activeClass);
          }

          prevClicked = event.currentTarget;

          if (active.includes(activeClass)) {
            prevClicked.classList.remove(activeClass);
          } else {
            prevClicked.classList.add(activeClass);
          }

          const filterText = prevClicked.getAttribute("filter-by") || "";

          //prevent further filter if filter is empty and reset button is clicked.

          shouldFilter(filter, filterText, index) &&
            initFilter({ filterType, index, filterText });
        };
      }
    });
  }

  const initFilter = ({
    filterType = "exclusive",
    index = 0,
    filterText = "",
    oldValue = "",
    wildcard = false,
    reset = false,
  }) => {
    filterText = escapeRegExp(filterText.replace(/\*/gi, ""));

    const prevClicked = filter[index].query.includes(filterText);
    const update = filter[index].query.filter((val) => val != filterText);
    const nonWildcard = filter[index].query.filter((val) => val != oldValue);

    if (reset) {
      filter = resetAllFilter({ filter, activeClass, triggerSelectors });
    }
    //checks if it has previously been clicked
    else if (prevClicked && !wildcard) {
      filter[index].query = update;
    } else {
      filter[index].query = nonWildcard;
      if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filterType)) {
        filter[index].query = [filterText];
      } else {
        //it is definitely "multi"
        filter[index].query.push(filterText);
      }
    }
    if (animation.enable && animation.queue && filterActive) {
      return filterQueue.push(() => filterHelper());
    }

    return filterHelper();
  };

  const filterHelper = () => {
    filterActive = true;

    //try to fix queue here
    if (animation.enable) {
      const target = document.querySelector(this.cms_selector);
      return Animate.methods
        .animate(
          () => findAndMatchFilterText(filter, get_cms_items()),
          target,
          animation
        )
        .then(() => {
          filterActive = false;

          const nextAnimation = filterQueue.shift();
          if (nextAnimation) {
            nextAnimation.call(null);
          }
        });
    }

    findAndMatchFilterText(filter, get_cms_items());
  };
};

const findAndMatchFilterText = (filter, master_collection) => {
  const disposableNote = removeMsg();
  let queries = Object["values"](filter);

  master_collection.map((elem, i) => {
    const search_result: any = queries.reduce(
      (curr: any, { query, target, range }) => {
        //creating a regex to test against
        const val = range ? query : `(${query.join("|")})`;

        const result = [].slice.call(elem.children).map((item, j) => {
          const re = new RegExp(val, "gi");
          const textContent = target
            ? item.querySelector(target).textContent
            : item.textContent;

          const valid = range
            ? isInRange(val, textContent)
            : re.test(textContent);

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

        //intersections of the results
        return [
          ...curr.map((a, index) => {
            if (a.style.display !== result[index].style.display) {
              a.style.display = "none";
            }
            return a;
          }),
        ];
      },
      []
    ); //.join("").trim()

    if (search_result.length > 1) {
      [].slice.call(master_collection[i].children).map((child, k) => {
        child.style.display = search_result[k].style.display;
      });
    }

    const { height } = master_collection[i].getBoundingClientRect();

    //empty search match
    if (height < 1) {
      master_collection[i].appendChild(disposableNote);
    }
  });
};

const isInRange = (searchRanges, targetText) => {
  const ans = searchRanges.filter((range) => {
    const boundaries = range.split("-").map(parseFloat);

    let num =
      targetText.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") || 0;
    num = parseFloat(num);

    return (num - boundaries[0]) * (num - boundaries[1]) <= 0;
  });

  return searchRanges.length ? ans.length : true;
};

const addInputListener = (elem, otherElem, fxn) => {
  (<any>elem).addEventListener(
    "input",
    debounce((event) => {
      event.target.value = event.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");

      const name = event.target.name;

      const val = event.target.value;

      const otherValue = otherElem.value || 0;

      const filter_text =
        name == "min" ? `${val}-${otherValue}` : `${otherValue}-${val}`;

      fxn(filter_text);
    }, 500)
  );
};
