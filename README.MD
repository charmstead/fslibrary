# FsLibrary for Webflow

# The functionalities consist of the following

1. combine: To combine all the collection items into one collection.
2. addClass/addClasses: To add custom class selectors to specific DOM elements.
3. cmsfilter: To perform filter on collection items.



# Usage
The FsLibrary provide set of static functions listed above via a named property
globally accessible with the name "fsLibrary"

Include the /dist/index.js file in your html element.

```
<script src="/dist/index.js"></script>
<script>

    //combine
    fsLibrary.combine('.w-dyn-list')

    //addclass
    fsLibrary.addClass({
        target_selector: ".project-feature",
        flip_selector: ".flip-row"
    })
</script>

```

##  Combine functionality

The combine function takes a parameter of string which is the
cms collection outer wrapper class selector.

The combine function retrieves all the collection items and combine it
into the first collection wrapper.

****usage:****

```
//combine
fsLibrary.combine('.w-dyn-list')
```


##  AddClass functionality

To addclass a custom class to an elem can be done using the following functions:

addclass: targets a single element.
addClasses: more than one element

The addclass functions accepts an object parameter with two key/value pair of
target element selector and the class selector to add.

{
    target_selector: ".project-feature",
    flip_selector: ".flip-row"
}

****usage:****

```
fsLibrary.addClass({
    target_selector: ".project-feature",
    flip_selector: ".flip-row"
})

// or use the addClasses
var _to_flip = [
    {
        target_selector: ".project-feature",
        flip_selector: ".flip-row"
    },
    {
        target_selector: ".project-feature-content",
        flip_selector: ".flip-text"
    },
    {
        target_selector: ".project-feature-image",
        flip_selector: ".flip-image"
    }
]

fsLibrary.addClasses(_to_flip)

```

##  cmsfilter functionality

To perform filter functions on the list of collection items:

The cmsfilter functions takes two parameter and/or and optional third parameter "OR" or "AND"
depending on the type of the filter functionality you want to perform.

The "and" shows intersection of filtered results across provided filters.

The first parameter is the cms collection wrapper selector
The second parameter is a 2D array of categories of filter elem selector.

****usage:****
Create the elements you want to use as your filter and add a "data-search" attribute initialised
to the corresponding search string you want to match in the collection items.

For select elem, add the "data-search" attribute to the children elements option tags.

```
//Example for "OR" filter

<div class="filter-bar">
    <div  class="filter-button cat-reset">
        <div>All</div>
    </div>
    <div data-search='CATEGORY A' class="filter-button cat-a">
        <div>Category A</div>
    </div>
    <div data-search='CATEGORY B' class="filter-button cat-b">
        <div>Category B</div>
    </div>
    <div data-search='CATEGORY C' class="filter-button cat-c">
        <div>Category C</div>
    </div>
    <div data-search='CATEGORY D' class="filter-button cat-d">
        <div>Category D</div>
    </div>
    <div data-search='CATEGORY E' class="filter-button cat-e">
        <div>Category E</div>
    </div>
</div>

var _cms_filter = [".cat-a", ".cat-b", ".cat-c", ".cat-d", ".cat-e",".cat-reset"]

fsLibrary.cmsfilter('.w-dyn-list',[_cms_filter],"or")

```

```
//Example for "OR" filter with select

<select name="my_filter" class="select_filter">
    <option data-search=''>RESET</option>
    <option data-search='CATEGORY A'> Category A</option>
    <option data-search='CATEGORY B'> Category B</option>
    <option data-search='CATEGORY C'> Category C</option>
    <option data-search='CATEGORY D'> Category D</option>
    <option data-search='CATEGORY E'> Category E</option>
</select>

var _cms_filter = [".select_filter"]
fsLibrary.cmsfilter('.w-dyn-list',[_cms_filter],"or")

//OR


<select name="my_filter" class="select_filter">
    <option class="cat-reset" data-search=''>RESET</option>
    <option class="cat-a" data-search='CATEGORY A'> Category A</option>
    <option class="cat-b" data-search='CATEGORY B'> Category B</option>
    <option class="cat-c" data-search='CATEGORY C'> Category C</option>
    <option class="cat-d" data-search='CATEGORY D'> Category D</option>
    <option class="cat-e" data-search='CATEGORY E'> Category E</option>
</select>

var _cms_filter = [".cat-a", ".cat-b", ".cat-c", ".cat-d", ".cat-e",".cat-reset"]

fsLibrary.cmsfilter('.w-dyn-list',[_cms_filter],"or")

```

```
//Example for "AND" filter

<div class="filter-bar">
    <div class="filter-cat-1">
        <div class="filter-button cat-a" data-search='CATEGORY A'>
            <div>A</div>
        </div>
        <div class="filter-button cat-b" data-search='CATEGORY B'>
            <div>B</div>
        </div>
        <div class="filter-button cat-c" data-search='CATEGORY C'>
            <div>C</div>
        </div>
        <div class="filter-button cat-d" data-search='CATEGORY D'>
            <div>D</div>
        </div>
        <div class="filter-button cat-e" data-search='CATEGORY E'>
            <div>E</div>
        </div>
    </div>
    <div class="filter-cat-2">
        <div class="filter-button red" data-search='RED'>
            <div>Red</div>
        </div>
        <div class="filter-button green" data-search='GREEN'>
            <div>Green</div>
        </div>
        <div class="filter-button blue" data-search='BLUE'>
            <div>Blue</div>
        </div>
    </div>
    <div class="filter-cat-3">
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox" name="jan" data-search="Jan" class="w-checkbox-input">
            <label for="checkbox" class="w-form-label">Jan</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-2" name="may" data-search="May" class="w-checkbox-input">
            <label for="checkbox-2" class="w-form-label">May</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-3" name="dec" data-search="Dec" class="w-checkbox-input">
            <label for="checkbox-3" class="w-form-label">Dec</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-4" name="april" data-search="April"
                class="w-checkbox-input">
            <label for="checkbox-4" class="w-form-label">April</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-5" name="sept" data-search="Sept" class="w-checkbox-input">
            <label for="checkbox-5" class="w-form-label">Sept</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-6" name="feb" data-search="Feb" class="w-checkbox-input">
            <label for="checkbox-6" class="w-form-label">Feb</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-7" name="june" data-search="June" class="w-checkbox-input">
            <label for="checkbox-7" class="w-form-label">June</label>
        </div>
    </div>
</div>


var _cms_button_filter = [".cat-a", ".cat-b", ".cat-c", ".cat-d", ".cat-e"]
var _mnth_button_filter = ["#checkbox", "#checkbox-2", "#checkbox-3", "#checkbox-4", "#checkbox-5", "#checkbox-6", "#checkbox-7"]
var _color_button_filter = [".red", ".green", ".blue"]

var _FILTERS = [_cms_button_filter, _mnth_button_filter, _color_button_filter]
//default is and
fsLibrary.cmsfilter('.w-dyn-list', _FILTERS)

```