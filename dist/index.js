var fsLibrary=function(){function e(){}return e.commonValue=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e[0].filter(function(t){return e.every(function(e){return e.includes(t)})})},e.combine=function(e){var t=[].slice.call(document.querySelectorAll(e));if(1!==t[0].childElementCount)throw"combine expects the cms_outer_wrapper css selector";t[0].firstElementChild.innerHTML=t.slice().reduce(function(e,t){return e.concat(t.firstElementChild.innerHTML)},[]).join(""),t.forEach(function(e,t){0<t&&(e.outerHTML="")})},e.addClass=function(n){document.querySelectorAll(n.target_selector).forEach(function(e,t){t%2==1&&(e.className=e.className+" "+n.flip_selector.replace(/(.|#)/,""))})},e.addClasses=function(e){e.map(function(e){var t=e.target_selector,n=e.flip_selector;document.querySelectorAll(t).forEach(function(e,t){t%2==1&&(e.className=e.className+" "+n.replace(/(.|#)/,""))})})},e.cmsfilter=function(e,t,c){void 0===c&&(c="and");var o=[],a=[].slice.call(document.querySelectorAll(e)),l=[];function i(e,t,n,r){/^or$/i.test(e)?(o[n]={},o[n][t]=r):t in o[n]?delete o[n][t]:o[n][t]=r,l.map(function(c,e){var t=o.reduce(function(e,t){var r="("+Object.values(t).join("|")+")",n=[].slice.call(c.cloneNode(!0).firstElementChild.children).map(function(e,t){var n=new RegExp(r,"i").test(e.textContent);return e.style.display=n?"block":"none",e.outerHTML});return e.length<1?n:e.filter(function(e){return n.includes(e)}).slice()},[]).join("").trim();1<t.length&&(a[e].firstElementChild.innerHTML=t)})}a.map(function(e){l.push(e.cloneNode(!0))}),t.map(function(e,r){o[r]={},e.map(function(n){var e=document.querySelector(n),t=e&&e.tagName;e&&("SELECT"==t?document.querySelector(n).onchange=function(e){var t=e.currentTarget.selectedOptions[0].getAttribute("data-search")||"";i(c,n,r,t)}:"INPUT"==t?document.querySelector(n).onchange=function(e){var t=e.currentTarget.getAttribute("data-search")||"";e.target.checked||(t=""),i(c,n,r,t)}:document.querySelector(n).onclick=function(e){e.currentTarget.className.includes("active")?e.currentTarget.classList.remove("active"):e.currentTarget.classList.add("active");var t=e.currentTarget.getAttribute("data-search")||"";i(c,n,r,t)})})})},e}();