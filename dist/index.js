var fsLibrary=function(){function e(){}return e.combine=function(e){var t=[].slice.call(document.querySelectorAll(e));if(1!==t[0].childElementCount)throw"combine expects the cms_outer_wrapper css selector";t[0].firstElementChild.innerHTML=t.slice().reduce(function(e,t){return e.concat(t.firstElementChild.innerHTML)},[]).join(""),t.forEach(function(e,t){0<t&&(e.outerHTML="")})},e.addClass=function(n){document.querySelectorAll(n.target_selector).forEach(function(e,t){t%2==1&&(console.log(e),e.className=e.className+" "+n.flip_selector.replace(/(.|#)/,""))})},e.mutateTarget=function(e){e.map(function(e){var t=e.target_selector,n=e.flip_selector;document.querySelectorAll(t).forEach(function(e,t){t%2==1&&(e.className=e.className+" "+n.replace(/(.|#)/,""))})})},e.cmsfilter=function(e,t,c){void 0===c&&(c="and");var r={},o=[].slice.call(document.querySelectorAll(e)),n=[];function l(e,t,n){/^or$/i.test(e)?(r={})[t]=n:t in r?delete r[t]:r[t]=n,a(),console.log(r)}function a(){var c="("+Object.values(r).join("|")+")";n.map(function(e,t){var n=[].slice.call(e.cloneNode(!0).firstElementChild.children).map(function(e,t){var n=new RegExp(c,"i").test(e.textContent);return e.style.display=n?"block":"none",e.outerHTML}).join("").trim();1<n.length&&(o[t].firstElementChild.innerHTML=n)})}o.map(function(e){n.push(e.cloneNode(!0))}),t.map(function(n){var e=document.querySelector(n),t=e&&e.tagName;console.log(e),e&&("SELECT"==t?document.querySelector(n).onchange=function(e){var t=e.currentTarget.selectedOptions[0].getAttribute("data-search")||"";l(c,n,t)}:"INPUT"==t?document.querySelector(n).onchange=function(e){var t=e.currentTarget.getAttribute("data-search")||"";e.target.checked||(t=""),l(c,n,t)}:document.querySelector(n).onclick=function(e){var t=e.currentTarget.getAttribute("data-search")||"";l(c,n,t)})})},e}();