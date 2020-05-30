import { FsLibrary } from "./fsLibrary";

FsLibrary.prototype.nest = function ({ textList, nestSource, nestTarget }) {
  this.setNestConfig({ textList, nestSource, nestTarget });

  const master_collections = document.querySelectorAll(this.cms_selector);

  const sourceLinks = [].slice.call(
    document.querySelectorAll(nestSource + " a")
  );

  master_collections.forEach((collection, i) => {
    const textArray = collection.querySelectorAll(textList);

    const target = collection.querySelectorAll(nestTarget);

    textArray.forEach((textElem, j) => {
      if (textElem && target[j]) {
        let tags = textElem.textContent;

        tags = tags.replace(/\s*,\s*/gi, "|");
        const tagsArry = tags.split("|");
        tags = "^(" + tags + ")$";

        target[j].innerHTML = sourceLinks
          .filter((link) => {
            const regex = new RegExp(tags, "gi");
            const test = regex.test(link.textContent.trim());
            return test;
          })
          .sort((a, b) => {
            return (
              tagsArry.indexOf(a.textContent.trim()) -
              tagsArry.indexOf(b.textContent.trim())
            );
          })
          .map((elem) => elem.outerHTML)
          .join("");
      }
    });
  });
};

FsLibrary.prototype.setNestConfig = function (config) {
  if (!this.nestConfig) {
    this.nestConfig = config;
  }
};
