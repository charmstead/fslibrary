import { FsLibrary } from "./fsLibrary";

FsLibrary.prototype.tabs = function ({ tabComponent, tabName }) {
  const cms = this.getMasterCollection();
  const testimonials = cms.querySelectorAll(".w-dyn-item>div");

  const tabMenu = document.querySelector(tabComponent + " .w-tab-menu");
  const tabContent = document.querySelector(tabComponent + " .w-tab-content");

  const tabPane = tabContent.children[0];
  const tabLink = tabMenu.getElementsByTagName("a")[0];

  const Webflow = (<any>window).Webflow || [];
  
  Webflow.push(function () {
    const prefix = getPrefix(tabLink.href);
    tabLink.classList.remove("w--current");
    tabPane.classList.remove("w--tab-active");

    const tabLinkClassNames = tabLink.className;
    const tabContentClassNames = tabPane.className;
   
    // clear tabMenu and tabContent

    tabMenu.innerHTML = "";
    tabContent.innerHTML = "";
    initTabs(prefix, tabLinkClassNames, tabContentClassNames);
  });

  const initTabs = (prefix, tabLinkClassNames, tabContentClassNames) => {
    // appends new contents

    testimonials.forEach((element, index) => {
      const name = element.querySelector(tabName).innerHTML;

      const newLink = getTabLink({
        name,
        prefix,
        index,
        classes: tabLinkClassNames,
      });
      tabMenu.innerHTML += newLink;

      const content = element.outerHTML;
      const newPane = getTabPane({
        name,
        prefix,
        index,
        classes: tabContentClassNames,
        content,
      });
      tabContent.innerHTML += newPane;
    });
  };
};

const getTabLink = ({ name, prefix, index, classes }) => {
  const tab = prefix + "-tab-" + index;
  const pane = prefix + "-pane-" + index;

  const isFirst = index == 0;

  let classNames = classes;
  if (isFirst) {
    classNames += " w--current ";
  }

  const tabIndex = isFirst ? "" : `tabindex='-1'`;

  return `<a data-w-tab="${name}" class="${classNames}" id="${tab}" href="#${pane}"
   role="tab"
   aria-controls="${pane}"
   aria-selected="${isFirst}" ${tabIndex}>
            <div>${name}</div>
          </a>`;
};

const getTabPane = ({ name, prefix, index, content, classes }) => {
  const tab = prefix + "-tab-" + index;
  const pane = prefix + "-pane-" + index;

  const isFirst = index == 0;

  let classNames = classes;
  if (isFirst) {
    classNames += " w--tab-active ";
  }

  return `<div data-w-tab="${name}" class="${classNames}" id="${pane}" role="tabpanel" aria-labelledby="${tab}">
${content}
    </div>`;
};

const getPrefix = (val) => {
  return val.match(/(w-tabs-[0-9]{1}-data-w)/gi)[0];
};
