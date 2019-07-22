class fsLibrary {

    constructor() {

    }


    private static addClass:boolean;

    private static addClassConfig:AddClass;

    private static addClassContainer:string;

    /**
     * Accepts the cms collector outer wrapper selector
     * and combine all the collection items into one collection.
     * @param cms_selector cms_wrapper selector
     */
    public static combine(cms_selector: string) {

        //get all collections
        const master_collection: any = [].slice.call(document.querySelectorAll(cms_selector));


        //copies the cms items into the first collection list
        master_collection[0].innerHTML = (
            [...master_collection].reduce((curr, items) => {
                //gets all the items  
                return [...curr, ...items.innerHTML]
            }, []).join("")
        )

        //deletes the rest collection list
        master_collection.forEach((elem: Element, i: number) => {
            if (i > 0) {
                elem.outerHTML = ""
            }
        })


    }



    public static loadmore(container:string,config:LoadMore={button:"",actualLoadMore:true,initialLoad:12,loadPerClick:12}):void{
        const parent:any = document.querySelector(container);
        const collection: any[] = [].slice.call(parent.children);
        const clone: any[] = [].slice.call(parent.cloneNode(true).children);
        
        const {button,actualLoadMore,initialLoad,loadPerClick} = config;

        let reserve = [];
        reserve = clone.filter((child,i)=>{

            if(i<initialLoad){
                return false;
            }

            collection[i].outerHTML="";
            return true;
        });

        (<any>document.querySelector(button)).onclick = function(){
           const addon= reserve.splice(0,loadPerClick);
            addon.map((elem)=>{
                document.querySelector(container).appendChild(elem);
            })

            if(this.addClass && this.container == container){
                this.addClasses(container,this.config);
            }
        }
        
    }


    /**
     * 
     * @param container The css selector of the parent container elem of the list you want to add classnames to.
     * @param config  defined as
     *  {
     *     classNames: Array<AltClass>; //list of classnames you want to add
     *     frequency: number; //The frequency or order of addition of class to the list
     *     start: number; //position of list item to start with
     * }
     */
    public static addClasses(container, config: AddClass = { classNames: [], frequency: 2, start: 1 }): void {
        const parent: any = document.querySelector(container);
        const { frequency, start,classNames } = config;
        
        this.addClassContainer=container;
        this.addClassConfig=config;
        this.addClass=true;

        if (frequency < 0) {
            throw "unaccepted value passed as frequency";
        }
        else if (start < 1) {
            throw "unaccepted value passed as start";
        }

       classNames.map(({ target, alt }) => {
            const list = parent.querySelectorAll(target);
            for (let j = start - 1; j < list.length; j += frequency) {
                
                const addon = alt.replace(/\./g, "")
                if(list[j].className.indexOf(addon) <0){
                    list[j].className += " " + addon  
                }

                if (frequency == 0) {
                    break;
                }
            }
        })        
    }

    /**
     * 
     * @param cms_selector 
     * @param cms_filter 
     */
    public static cmsfilter(cms_selector: string, cms_filter: Array<FilterGroup> | string, filter_type: string = 'single') {

        let filter: Array<{ [key: string]: string }> = []//2D array to hold categories of filter selectors and their corresponding

        //get all collections
        const get_cms_items: any = ()=> [].slice.call(document.querySelectorAll(cms_selector));

        let filter_group: any[] = [];

        if (Array.isArray(cms_filter)) {
            cms_filter.map((val, index) => {
                let prevClicked;
                const { filter_option } = val;

                filter_group = [].slice.call(document.querySelectorAll(`${val.filter_group} [data-search]`));
                assignChangeEventToButtons(index, prevClicked, filter_option)

            })
        }
        else if (typeof cms_filter == "string") {
            let prevClicked;
            filter_group = [].slice.call(document.querySelectorAll(`${cms_filter} [data-search]`));
            assignChangeEventToButtons(0, prevClicked)
        }
        else {
            throw "Incorrect type passed as cms_filter"
        }


        function assignChangeEventToButtons(index, prevClicked, filter_option = filter_type) {
            filter[index] = {} //initialise default values
            filter_group.map((elem, j) => {
                const id = `${index}${j}`;
                const tag_element = elem && elem.tagName;

                if (tag_element == "SELECT") {
                    (<any>elem).onchange = function (event) {
                        let filter_text = event.currentTarget.selectedOptions[0].getAttribute("data-search") || '';

                        filterHelper({ filter_option, id, index, filter_text })
                    }
                }
                else if (tag_element == "INPUT") {//handle checkbox and radio button
                    (<any>elem).onchange = function (event) {
                        let filter_text = event.currentTarget.getAttribute("data-search") || '';

                        if (!event.target.checked) {
                            filter_text = '';
                        }
                        filterHelper({ filter_option, id, index, filter_text })
                    }
                }
                else {
                    (<any>elem).onclick = function (event) {
                        const active = event.currentTarget.className;

                        //only one element should have active class for or
                        if (/^single$/i.test(filter_type) || /^single$/i.test(filter_option)) {
                            if (prevClicked) prevClicked.classList.remove("active")
                        }

                        prevClicked = event.currentTarget;

                        if (active.includes("active")) {
                            prevClicked.classList.remove("active")
                        }
                        else {
                            prevClicked.classList.add("active")
                        }

                        let filter_text = prevClicked.getAttribute("data-search") || '';
                        filterHelper({ filter_option, id, index, filter_text })
                    }
                }
            })
        }


        function filterHelper({ filter_option, id, index, filter_text }) {

            if (/^single$/i.test(filter_type) || /^single$/i.test(filter_option)) {

                //checks if it has previously been clicked                
                if (id in filter[index]) {
                    delete filter[index][id];
                }
                else {
                    filter[index] = {};
                    filter[index][id] = filter_text;
                }

            }
            else {//it is definitely "multi"

                //checks if it has previously been clicked
                if (id in filter[index]) {

                    delete filter[index][id];
                }
                else {
                    filter[index][id] = filter_text;
                }

            }
            findAndMatchFilterText();
            console.log(filter)

        }


        function findAndMatchFilterText() {
            const master_collection =get_cms_items();
            master_collection.map((elem, i) => {

                const search_result = filter.reduce((curr, search) => {

                    //creating a regex to test against
                    const val = `(${Object["values"]((search)).join("|")})`;

                    const result = [].slice.call(elem.cloneNode(true).children).map((item, j) => {

                        const re = new RegExp(val, "i");
                        const valid = re.test(item.textContent);

                        if (valid) {
                            item.style.display = "block"
                        }
                        else {
                            item.style.display = "none"
                        }

                        // return item.outerHTML;
                        return item;
                    })

                    if (curr.length < 1) {
                        return result;
                    }

                    // return [...curr.filter((a) => result.includes(a))]

                    //intersections of the results
                    return [...curr.map((a, index) => {
                        if (a.style.display !== result[index].style.display) {
                            a.style.display = "none";
                        }
                        return a;
                    })]

                }, [])//.join("").trim()

                if (search_result.length > 1) {
                    console.log(search_result.length);

                    [].slice.call(master_collection[i].children)
                        .map((child, k) => {
                            child.style.display = search_result[k].style.display;

                        })
                }

            })
        }
    }
}

interface AltClass {
    target: string;
    alt: string
}

interface LoadMore{
    button:string;
    actualLoadMore:boolean;
    initialLoad:number;
    loadPerClick:number
}

interface AddClass {
    classNames: Array<AltClass>; //list of classnames you want to add
    frequency: number; //The frequency or order of addition of class to the list
    start: number; //position of list item to start with
}

interface FilterGroup {
    filter_group: string;
    filter_option: string
}
