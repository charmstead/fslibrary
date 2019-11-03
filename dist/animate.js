"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../js/util/index");
var targetClass = 'uk-animation-target';
exports.default = {
    // props: {
    //     animation: Number
    // },
    // data: {
    //     animation: 400
    // },
    // computed: {
    //     target() {
    //         return this.$el;
    //     }
    // },
    methods: {
        animate: function (action, target, animation) {
            var duration = animation.duration, easing = animation.easing, effects = animation.effects;
            var effect = String(effects).replace(/^fade /gi, "");
            addStyle();
            var children = index_1.toNodes(target.children);
            var propsFrom = children.map(function (el) { return getProps(el, true); });
            var oldHeight = index_1.height(target);
            var oldScrollY = window.pageYOffset;
            action();
            index_1.Transition.cancel(target);
            children.forEach(index_1.Transition.cancel);
            reset(target);
            // this.$update(target);
            index_1.fastdom.flush();
            var newHeight = index_1.height(target);
            children = children.concat(index_1.toNodes(target.children).filter(function (el) { return !index_1.includes(children, el); }));
            var propsTo = children.map(function (el, i) {
                return el.parentNode && i in propsFrom
                    ? propsFrom[i]
                        ? index_1.isVisible(el)
                            ? getPositionWithMargin(el)
                            : { opacity: 0 }
                        : { opacity: index_1.isVisible(el) ? 1 : 0 }
                    : false;
            });
            propsFrom = propsTo.map(function (props, i) {
                var from = children[i].parentNode === target
                    ? propsFrom[i] || getProps(children[i])
                    : false;
                if (from) {
                    if (!props) {
                        delete from.opacity;
                    }
                    else if (!('opacity' in props)) {
                        var opacity = from.opacity;
                        if (opacity % 1) {
                            props.opacity = 1;
                        }
                        else {
                            delete from.opacity;
                        }
                    }
                }
                return from;
            });
            index_1.addClass(target, targetClass);
            children.forEach(function (el, i) {
                if (propsFrom[i]) {
                    index_1.css(el, propsFrom[i]);
                }
            });
            index_1.css(target, 'height', oldHeight);
            index_1.scrollTop(window, oldScrollY);
            return index_1.Promise.all(children.map(function (el, i) {
                if (propsFrom[i] && propsTo[i]) {
                    return index_1.Transition.start(el, propsTo[i], duration, easing);
                }
                return index_1.Promise.resolve();
            }).concat(index_1.Transition.start(target, { height: newHeight }, duration, easing)))
                .then(function () {
                children.forEach(function (el, i) {
                    index_1.css(el, { display: propsTo[i].opacity === 0 ? 'none' : '', zIndex: '', transform: el.style.transform });
                });
                reset(target);
                // this.$update(target);
                index_1.fastdom.flush(); // needed for IE11
            }, index_1.noop);
        }
    }
};
function getProps(el, opacity) {
    var zIndex = index_1.css(el, 'zIndex');
    return index_1.isVisible(el)
        ? index_1.assign({
            display: '',
            opacity: opacity ? index_1.css(el, 'opacity') : '0',
            pointerEvents: 'none',
            position: 'absolute',
            zIndex: zIndex === 'auto' ? index_1.index(el) : zIndex
        }, getPositionWithMargin(el))
        : false;
}
function reset(el) {
    index_1.css(el.children, {
        height: '',
        left: '',
        opacity: '',
        pointerEvents: '',
        position: '',
        top: '',
        width: ''
    });
    index_1.removeClass(el, targetClass);
    index_1.css(el, 'height', '');
}
exports.reset = reset;
function getPositionWithMargin(el) {
    var _a = el.getBoundingClientRect(), height = _a.height, width = _a.width;
    var _b = index_1.position(el), top = _b.top, left = _b.left;
    top += index_1.toFloat(index_1.css(el, 'marginTop'));
    return { top: top, left: left, height: height, width: width };
}
var style;
function addStyle() {
    if (style) {
        return;
    }
    style = index_1.append(document.head, '<style>').sheet;
    style.insertRule("." + targetClass + " > * {\n            margin-top: 0 !important;\n            /*transform: none !important;/*\n        }", 0);
}
