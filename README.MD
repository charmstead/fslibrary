# FsLibrary for Webflow

# The functionalities consist of the following

1. combine: To combine all the collection items into one collection.
2. addClass/addClasses: To add custom class selectors to specific DOM elements.
3. filter: To perform filter on collection items.
4. loadmore: To perform a loadmore contents of a cms collection as they are needed.




# Usage
The FsLibrary provide set of static functions listed above via a named property
globally accessible with the name "fsLibrary"

Include the /dist/index.js file in your html element.

Create an instance of the fsLibrary and pass in the CSS selector of 
the cms items parent container element.

The fsLibrary constructor takes an optional second argument object which defines the 
type of lazy loading feature to be enabled on the cms items.

Type 1: Using background image on div
Type 2: using image img tag.
```
<script src="/dist/index.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function(event) { 

    var _animation = {
        enable: true,
        duration: 1,
        easing: 'ease-in-out',
        effects: 'fade translate(30px,100px) rotate(200deg) scale(0.2)'
    }

    var lazyLoadOption={
        type:1,
        className:"bg-none"
    }

    var fsLib = new FsLibrary('.w-dyn-items',lazyLoadOption)

    //combine
    fsLib.combine()

    //cms filter
    fsLib.filter({
        filterOptions: _FILTERS,
        filterType: "multi",
        animation: _animation
    })

    //cms loadmore
    fsLib.loadmore({
        button: ".load-more-button",
        actualLoadMore: true,
        initialLoad: 12,
        loadPerClick: 12,
        animation:_animation
    })


    //addclasses

    fslib.addClasses({
        classArray: fsAddClass,
        frequency: 3,
        start: 1
    })

});
</script>

```
##  Animation

The animation will be disabled if the property "enable" is set to false.
A custom animation effects can be defined in the "effects" property.
The effects can be defined as several value of css transform property.
e.g scale,translate,rotate.

To include a fadein-out animation, simply include string "fade" in the effects definition. 

****Animationo property:****


Property | Required | Default
--- | --- | --- 
enable | false | true
duration | true | 1
easing | true | linear
effects | true | fade


##  Combine functionality

The combine function takes no parameter. The combine is invoked on the 
Css selector of the parent container element of the cms items passed in as 
the constructor argument used instantiation of the fsLibrary object.
i.e cms collection inner wrapper class selector.

The combine function retrieves all the collection items and combine it
into the first collection wrapper.

****usage:****

```
var fsLib = new FsLibrary('.w-dyn-items')
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
    animation:Animation
}

The loadmore performs a lazyloading on the specified cms collection items and present to the viewport
the number of items specified in the initialLoad property. 
Clicking the loadmore button subsequently loads loadPerClick amount of the collection items and add it to the parent container. 

The animation property is optional. If provided, the property will be used to animated in the elements to be added to the page.

****usage:****

```
var fsLib = new FsLibrary('.w-dyn-items')
var _animation = {
    enable: true,
    duration: 1,
    easing: 'ease-in-out',
    effects: 'fade translate(30px,100px) rotate(200deg) scale(0.2)'
}

var _loadMoreConfig = {
            button: ".load-more-button",
            actualLoadMore: true,
            initialLoad: 12,
            loadPerClick: 12,
            animation:_animation
        }

fsLib.loadmore(_loadMoreConfig)
```

##  AddClasses functionality

To add classnames to a particular list and also specify additional instructions of how
the classnames should be added to the list

The addclass functions accepts parameters.
1. An object defined as below:
{
    classArray: Array<AltClass>; //list of classnames you want to add
    frequency: number; //The frequency or order of addition of class to the list
    start: number; //position of list item to start with
}

where AltClass is defined as 
interface AltClass {
    classTarget: string;
    classToAdd: string
}
****usage:****

```
let fsLib = new FsLibrary('.w-dyn-items')

let fsAddClass = [
    {
        classTarget: ".project-feature",
        classToAdd: ".flip-row"
    },
    {
        classTarget: ".project-feature-content",
        classToAdd: ".flip-text"
    },
    {
        classTarget: ".project-feature-image",
        classToAdd: ".flip-image"
    }
]

fsLib.addClasses(".w-dyn-items", {
    classArray: fsAddClass,
    frequency: 2,
    start: 1
})

```


##  filter functionality

To perform filter functions on the list of collection items:

The filter functions takes an object parameter with the following keys:

filterOptions,filterType,animation

The filter filterType can be "exclusive" or "MULTI" depending on the type of the filter functionality you want to perform.
It is an optional key, if omitted, the filterType will be determined by the type of filter passed in.

The "MULTI" shows intersection of filtered results across provided group of filters.

The filterOptions key can be a string or Array of objects that contain css selector of the parent container of the filter buttons/elements.

The filterOptions key is a ****STRING**** for the case of a "exclusive" filter option. The css selector of the parent container of the filter buttons/elements is passed as the argument.
Otherwise it is an Array of objects with below structure for the case of "MULTI" filter option.
var _FILTERS = [
    {
        filterWrapper: ".filter-cat-1",
        filterType: "exclusive"
    },
    {
        filterWrapper: ".filter-cat-2",
        filterType: "multi"
    },
    {
        filterWrapper: ".filter-cat-3",
        filterType: "multi"
    }
]

The variable "_FILTER" above is passed as the first argument.

The ****filterWrapper**** property is the css selector of the parent container of the filter buttons/elements.
The ****filterType**** property is filter option you wish to assign to the current filter group. This becomes
powerful as allows you to mix both "MULTI" and "exclusive" filter functionalities.

The animation key is also optional. It determines the effects you want to be applied to the filtered elements.



****usage:****
Create the elements you want to use as your filter and add a "filter-by" attribute initialized
to the corresponding search string you want to match in the collection items.

For SELECT Tag, add the "filter-by" attribute to the children elements option tags.

```
//Example for "exclusive" filter

<div class="filter-bar"><!--parent container elem-->
    <div  class="filter-button cat-reset">
        <div>All</div>
    </div>
    <div filter-by='CATEGORY A' class="filter-button cat-a">
        <div>Category A</div>
    </div>
    <div  filter-by='CATEGORY B' class="filter-button cat-b">
        <div>Category B</div>
    </div>
    <div filter-by='CATEGORY C' class="filter-button cat-c">
        <div>Category C</div>
    </div>
    <div filter-by='CATEGORY D' class="filter-button cat-d">
        <div>Category D</div>
    </div>
    <div filter-by='CATEGORY E' class="filter-button cat-e">
        <div>Category E</div>
    </div>
</div>

let fsLib = new FsLibrary('.w-dyn-items')

var _animation = {
    enable: true,
    duration: 1,
    queue:false, //default true
    easing: 'ease-in-out',
    effects: 'fade translate(30px,100px) rotate(200deg) scale(0.2)'
}

fsLib.filter({
    filterOptions: ".filter-bar",
    filterType: "exclusive",
    animation: _animation
})

or

fsLib.filter({
    filterOptions: ".filter-bar",
    animation: _animation
})

```

```
//Example for "exclusive" filter with select
//For SELECT Tag, use the css selector of the select as the parent container elem

<select name="my_filter" class="select_filter"><!--parent container elem-->
    <option filter-by=''>RESET</option>
    <option filter-by='CATEGORY A'> Category A</option>
    <option filter-by='CATEGORY B'> Category B</option>
    <option filter-by='CATEGORY C'> Category C</option>
    <option filter-by='CATEGORY D'> Category D</option>
    <option filter-by='CATEGORY E'> Category E</option>
</select>

let fsLib = new FsLibrary('.w-dyn-items')

var _animation = {
    enable: true,
    duration: 1,
    easing: 'ease-in-out',
    effects: 'fade translate(30px,100px) rotate(200deg) scale(0.2)'
}

fsLib.filter(".select_filter","exclusive", _animation)

```

```
//Example for "MULTI" filter

<div class="filter-bar">
    <div class="filter-cat-1">
        <div class="filter-button" filter-by='CATEGORY A'>
            <div>A</div>
        </div>
        <div class="filter-button" filter-by='CATEGORY B'>
            <div>B</div>
        </div>
        <div class="filter-button" filter-by='CATEGORY C'>
            <div>C</div>
        </div>
        <div class="filter-button" filter-by='CATEGORY D'>
            <div>D</div>
        </div>
        <div class="filter-button" filter-by='CATEGORY E'>
            <div>E</div>
        </div>
    </div>
    <div class="filter-cat-2">
        <div class="filter-button" filter-by='RED'>
            <div>Red</div>
        </div>
        <div class="filter-button" filter-by='GREEN'>
            <div>Green</div>
        </div>
        <div class="filter-button" filter-by='BLUE'>
            <div>Blue</div>
        </div>
    </div>
    <div class="filter-cat-3">
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox" name="jan" filter-by="Jan" class="w-checkbox-input">
            <label for="checkbox" class="w-form-label">Jan</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-2" name="may" filter-by="May" class="w-checkbox-input">
            <label for="checkbox-2" class="w-form-label">May</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-3" name="dec" filter-by="Dec" class="w-checkbox-input">
            <label for="checkbox-3" class="w-form-label">Dec</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-4" name="april" filter-by="April"
                class="w-checkbox-input">
            <label for="checkbox-4" class="w-form-label">April</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-5" name="sept" filter-by="Sept" class="w-checkbox-input">
            <label for="checkbox-5" class="w-form-label">Sept</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-6" name="feb" filter-by="Feb" class="w-checkbox-input">
            <label for="checkbox-6" class="w-form-label">Feb</label>
        </div>
        <div class="w-checkbox checkbox">
            <input type="checkbox" id="checkbox-7" name="june" filter-by="June" class="w-checkbox-input">
            <label for="checkbox-7" class="w-form-label">June</label>
        </div>
    </div>
</div>

let fsLib = new FsLibrary('.w-dyn-items')

var _FILTERS = [
    {
        filterWrapper: ".filter-cat-1",
        filterType: "exclusive"
    },
    {
        filterWrapper: ".filter-cat-2",
        filterType: "multi"
    },
    {
        filterWrapper: ".filter-cat-3",
        filterType: "multi"
    }
]

var _animation = {
    enable: true,
    duration: 1,
    easing: 'ease-in-out',
    effects: 'fade translate(30px,100px) rotate(200deg) scale(0.2)'
}
     
fsLib.filter(_FILTERS,"multi", _animation)

```