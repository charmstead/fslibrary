# FsLibrary for Webflow

# The functionalities consist of the following

1. combine: To combine all the collection items into one collection.
2. addClass/addClasses: To add custom class selectors to specific DOM elements.
3. cmsfilter: To perform filter on collection items.
4. loadmore: To perform a loadmore contents of a cms collection as they are needed.




# Usage
The FsLibrary provide set of static functions listed above via a named property
globally accessible with the name "fsLibrary"

Include the /dist/index.js file in your html element.

Create an instance of the fsLibrary and pass in the CSS selector of 
the cms items parent container element.

The fsLibrary constructor takes an optional second argument object which defines the 
animation that will be used in the transition of the cms items.
```
<script src="/dist/index.js"></script>
<script>
    var _animation = {
            enable: true,
            duration: 1,
            easing: 'ease-in-out',
            effects: 'fade translate(30px,100px) rotate(200deg) scale(0.2)'
        }

    var fsLib = new fsLibrary('.w-dyn-items',_animation)

    //combine
    fsLib.combine()

    //cms filter
    fsLib.cmsfilter({
        cms_filter: ".filter-bar",
        filter_type: "single"
    })

    //cms loadmore
    fsLib.loadmore({
        button: ".load-more-button",
        actualLoadMore: true,
        initialLoad: 12,
        loadPerClick: 12
    })


    //addclasses

    fslib.addClasses({
        classNames: fsAddClass,
        frequency: 3,
        start: 1
    })
</script>

```
##  Animation

The animation will be disabled if the property "enable" is set to false.
A custom animation effects can be defined in the "effects" property.
The effects can be defined as several value of css transform property.
e.g scale,translate,rotate.

To include a fadein-out animation, simply include string "fade" in the effects definition. 

****Animationo property:****

Property | enable | duration | easing | effects
--- | --- | --- | --- |---
Required | false | true | true | true | 289
--- | --- | --- | --- |---
Default | true | 1 | linear | fade


##  Combine functionality

The combine function takes no parameter. The combine is invoked on the 
Css selector of the parent container element of the cms items passed in as 
the constructor argument used instantiation of the fsLibrary object.
i.e cms collection inner wrapper class selector.

The combine function retrieves all the collection items and combine it
into the first collection wrapper.

****usage:****

```
var fsLib = new fsLibrary('.w-dyn-items')
//combine
fsLib.combine('.w-dyn-items')
```


##  LoadMore functionality

The loadmore function takes a parameters:
1. An object that defines the configuration of the loadmore which is defined as follow:

interface LoadMore{
    button:string; //css selector of the loadmore button
    actualLoadMore:boolean;
    initialLoad:number;
    loadPerClick:number
}

The loadmore performs a lazyloading on the specified cms collection items and present to the viewport
the number of items specified in the initialLoad property. 
Clicking the loadmore button subsequently loads loadPerClick amount of the collection items and add it to the parent container. 

****usage:****

```
var fsLib = new fsLibrary('.w-dyn-items')

var _loadMoreConfig = {
            button: ".load-more-button",
            actualLoadMore: true,
            initialLoad: 12,
            loadPerClick: 12
        }

fsLib.loadmore(_loadMoreConfig)
```

##  AddClasses functionality

To add classnames to a particular list and also specify additional instructions of how
the classnames should be added to the list

The addclass functions accepts parameters.
1. An object defined as below:
{
    classNames: Array<AltClass>; //list of classnames you want to add
    frequency: number; //The frequency or order of addition of class to the list
    start: number; //position of list item to start with
}

where AltClass is defined as 
interface AltClass {
    target: string;
    alt: string
}
****usage:****

```
let fsLib = new fsLibrary('.w-dyn-items')

let fsAddClass = [
    {
        target: ".project-feature",
        alt: ".flip-row"
    },
    {
        target: ".project-feature-content",
        alt: ".flip-text"
    },
    {
        target: ".project-feature-image",
        alt: ".flip-image"
    }
]

fsLib.addClasses(".w-dyn-items", {
    classNames: fsAddClass,
    frequency: 2,
    start: 1
})

```


##  cmsfilter functionality

To perform filter functions on the list of collection items:

The cmsfilter functions takes a parameter and/or and optional second parameter "SINGLE" or "MULTI"
depending on the type of the filter functionality you want to perform.

The "MULTI" shows intersection of filtered results across provided group of filters.

The first parameter can be a string or Array of objects that contain css selector of the parent container of the filter buttons/elements.

The first parameter is a ****STRING**** for the case of a "SINGLE" filter option. The css selector of the parent container
of the filter buttons/elements is passed as the argument.

The first parameter is a Array of objects with below structure for the case of "MULTI" filter option.
var _FILTERS = [
    {
        filter_group: ".filter-cat-1",
        filter_option: "single"
    },
    {
        filter_group: ".filter-cat-2",
        filter_option: "multi"
    },
    {
        filter_group: ".filter-cat-3",
        filter_option: "multi"
    }
]

The variable "_FILTER" above is passed as the first argument.

The ****filter_group**** property is the css selector of the parent container of the filter buttons/elements.
The ****filter_option**** property is filter option you wish to assign to the current filter group. This becomes
powerful as allows you to mix both "MULTI" and "SINGLE" filter functionalities.


****usage:****
Create the elements you want to use as your filter and add a "data-search" attribute initialized
to the corresponding search string you want to match in the collection items.

For SELECT Tag, add the "data-search" attribute to the children elements option tags.

```
//Example for "SINGLE" filter

<div class="filter-bar"><!--parent container elem-->
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

let fsLib = new fsLibrary('.w-dyn-items')

fsLib.cmsfilter(".filter-bar","single")

```

```
//Example for "SINGLE" filter with select
//For SELECT Tag, use the css selector of the select as the parent container elem

<select name="my_filter" class="select_filter"><!--parent container elem-->
    <option data-search=''>RESET</option>
    <option data-search='CATEGORY A'> Category A</option>
    <option data-search='CATEGORY B'> Category B</option>
    <option data-search='CATEGORY C'> Category C</option>
    <option data-search='CATEGORY D'> Category D</option>
    <option data-search='CATEGORY E'> Category E</option>
</select>

let fsLib = new fsLibrary('.w-dyn-items')

fsLib.cmsfilter(".select_filter","single")

```

```
//Example for "MULTI" filter

<div class="filter-bar">
    <div class="filter-cat-1">
        <div class="filter-button" data-search='CATEGORY A'>
            <div>A</div>
        </div>
        <div class="filter-button" data-search='CATEGORY B'>
            <div>B</div>
        </div>
        <div class="filter-button" data-search='CATEGORY C'>
            <div>C</div>
        </div>
        <div class="filter-button" data-search='CATEGORY D'>
            <div>D</div>
        </div>
        <div class="filter-button" data-search='CATEGORY E'>
            <div>E</div>
        </div>
    </div>
    <div class="filter-cat-2">
        <div class="filter-button" data-search='RED'>
            <div>Red</div>
        </div>
        <div class="filter-button" data-search='GREEN'>
            <div>Green</div>
        </div>
        <div class="filter-button" data-search='BLUE'>
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

let fsLib = new fsLibrary('.w-dyn-items')

var _FILTERS = [
    {
        filter_group: ".filter-cat-1",
        filter_option: "single"
    },
    {
        filter_group: ".filter-cat-2",
        filter_option: "multi"
    },
    {
        filter_group: ".filter-cat-3",
        filter_option: "multi"
    }
]
     
fsLib.cmsfilter(_FILTERS,"multi")

```