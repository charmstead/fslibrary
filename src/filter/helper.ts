import { getClosest } from "../utility";

export const removeMsg = (message = "No match found.") => {
  const msg = document.querySelector(".fslib-no-match");
  if (msg) {
    msg.outerHTML = "";
  }

  const note = document.createElement("div");
  note.style.padding = "15px";
  note.className = "fslib-no-match";
  note.textContent = "No match found.";
  return note;
};

export function shouldFilter(filter, filterText, index) {
  const isEmpty = !filterText.trim();
  const tag = filter[index].query;

  if (isEmpty && tag.includes(filterText)) {
    return false;
  }

  if (isEmpty && !tag.length) {
    return false;
  }
  return true;
}

export const preventParentFormSubmission = (elem) => {
  const formElem = getClosest(elem, "form");
  if (formElem) {
    preventFormSubmission(formElem);
  }
};
export const preventFormSubmission = (formElem) => {
  formElem.onsubmit = (evt) => {
    evt.preventDefault();
    return false;
  };
};

export const resetAllFilter = ({ filter, triggerSelectors, activeClass }) => {
  triggerSelectors.map((selector) => {
    document.querySelectorAll(selector).forEach((elem, i) => {
      elem.classList.remove(activeClass);

      if (elem.tagName == "INPUT") {
        switch (elem.type) {
          case "text":
            elem.value = "";
            break;
          default:
            elem.checked = false;
            break;
        }
      }
    });
  });

  Object["values"](filter).forEach((val, idx) => {
    filter[idx].query = [];
  });
  return filter;
};
