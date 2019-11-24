
export function isInViewport(el){
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom >= 0 && 
        rect.right >= 0 && 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
     );
}
export function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        (window as any).attachEvent('on' + event, func)
    }
}

export function isVisible(elem) {
  const {width,height}= elem.getBoundingClientRect();

  return !(height === width && height===0)
}


export function createDocument(html, title) {
    const doc = document.implementation.createHTMLDocument(title)
    doc.documentElement.innerHTML = html
    return doc
  }