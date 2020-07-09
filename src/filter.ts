import { FsLibrary } from "./fsLibrary";
import { debounce, escapeRegExp } from "./utility";
import Animate from "./animate";

const a = {
  filterWrapper: ".filter-cat-range",
  filterType: "multi",
  filterBy: ".project-number",
  range: true,
};

            filter={
              name:{
                target:
                query:[],
                range:false
              }
            }

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
  let filter={} //Array<{ [key: string]: string }> = []; //2D array to hold categories of filter selectors and their corresponding

  
  //get all collections

  const get_cms_items: any = () =>
    [].slice.call(document.querySelectorAll(this.cms_selector));

  if (Array.isArray(cms_filter)) {
    cms_filter.map((val, index) => {
      let prevClicked;
      const { filterType,filterBy="",range=false,filterWrapper } = val;

      const filter_group = [].slice.call(
        document.querySelectorAll(`${filterWrapper} [filter-by]`)
      );
      assignChangeEventToButtons({
        index,
        prevClicked,
        filter_group,
        ...val
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

  function conditionalReset(filterText, index) {
    const isEmpty = !filterText.trim();
    const tag = Object.values(filter[index]);

    if (isEmpty && tag.includes(filterText)) {
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
    filter_group,
    filterType = filter_type,
    filterBy="",
    range=false
  }) {

    filter[index]={
       target:filterBy,
       query:[],
       range
    }


    filter_group.map((elem, j) => {
      const tag_element = elem && elem.tagName;

      if (tag_element == "SELECT") {
        (<any>elem).addEventListener(
          "change",
          debounce((event) => {
            const filterText = event.target.selectedOptions[0].value || "";

            // conditionalReset(filterText, index) &&
              initFilter({
                filterType,
                index,
                filterText,
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
                const filterText = event.target.value;
                // conditionalReset(filterText, index) &&
                  initFilter({
                  filterType,
                    
                    index,
                    filterText,
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
              // conditionalReset(filterText, index) &&
                initFilter({filterType,  index, filterText });
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

          // conditionalReset(filterText, index) &&
            initFilter({filterType,  index, filterText });
        };
      }
    });
  }

  const initFilter = ({
    filterType,
    index,
    filterText,
    wildcard = false,
  }) => {
    if (animation.enable && animation.queue && filterActive) {
      return filterQueue.push(() =>
        filterHelper({ filterType, index, filterText, wildcard })
      );
    }

    return filterHelper({ filterType, index, filterText, wildcard });
  };

  const filterHelper = ({
    filterType,
    index,
    filterText,
    wildcard = false,
  }) => {
    filterActive = true;
    filterText = escapeRegExp(filterText.replace(/\*/gi, ""));
   
   const prevClicked= filter[index].query.includes(filterText);
   const update= filter[index].query.filter((val)=>val!=filterText);

      //checks if it has previously been clicked
      if (prevClicked && !wildcard) {
            if (
      /^exclusive$/i.test(filter_type) ||
      /^exclusive$/i.test(filterType)
    ) {
         filter[index].query=update;
         return
    }
      //it is definitely "multi"
         filter[index].query.push(filterText);

      } else {
         filter[index].query=[filterText];
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


    const queries = Object["values"](filter);

    master_collection.map((elem, i) => {
      const search_result = queries.reduce((curr, {query,target,range}) => {
        //creating a regex to test against
        const val = range?query:`(${(query).join("|")})`;

        const result = [].slice.call(elem.children).map((item, j) => {
          const re = new RegExp(val, "gi");
          const textContent = target?item.querySelector(target):item.textContent;
          const valid = re.test(textContent);

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
