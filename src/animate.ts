import { addClass, append, assign, css, fastdom, height, includes, index, isVisible, noop, position, Promise, removeClass, scrollTop, toFloat, toNodes, Transition } from '../js/util/index';

const targetClass = 'uk-animation-target';

export default {

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

        animate(action, target, animation) {
            const { duration, easing, effects } = animation;
            const effect = String(effects).replace(/^fade /gi, "");
            addStyle();

            let children = toNodes(target.children);
            let propsFrom = children.map(el => getProps(el, true));

            const oldHeight = height(target);
            const oldScrollY = window.pageYOffset;

            action();

            Transition.cancel(target);
            children.forEach(Transition.cancel);

            reset(target);
            // this.$update(target);
            fastdom.flush();

            const newHeight = height(target);

            children = children.concat(toNodes(target.children).filter(el => !includes(children, el)));

            const propsTo = children.map((el, i) =>
                el.parentNode && i in propsFrom
                    ? propsFrom[i]
                        ? isVisible(el)
                            ? getPositionWithMargin(el)
                            : { opacity: 0 }
                        : { opacity: isVisible(el) ? 1 : 0 }
                    : false
            );

            propsFrom = propsTo.map((props, i) => {
                const from = children[i].parentNode === target
                    ? propsFrom[i] || getProps(children[i])
                    : false;

                if (from) {
                    if (!props) {
                        delete from.opacity;
                    } else if (!('opacity' in props)) {
                        const { opacity } = from;

                        if (opacity % 1) {
                            props.opacity = 1;
                        } else {
                            delete from.opacity;
                        }
                    }
                }

                return from;
            });

            addClass(target, targetClass);
            children.forEach((el, i) => {
                if (propsFrom[i]) {
                    css(el, propsFrom[i])
                }
            });

            css(target, 'height', oldHeight);
            scrollTop(window, oldScrollY);

            return Promise.all(
                children.map((el, i) => {

                    if (propsFrom[i] && propsTo[i]) {
                        if(propsTo[i].opacity==0){
                            propsTo[i].transform=effect;
                        }
                        else{
                            propsTo[i].transform='';
                        }
                        if(propsFrom[i].opacity==0){
                            el.style.transform=effect;
                        }
                        return Transition.start(el, propsTo[i], duration, easing)
                    }
                    return Promise.resolve();
                }).concat(Transition.start(target, { height: newHeight }, duration, easing))
            )
                .then(() => {

                    children.forEach((el, i) => {
                        css(el, { display: propsTo[i].opacity === 0 ? 'none' : '', zIndex: '' })
                    });
                    reset(target);
                    // this.$update(target);
                    fastdom.flush(); // needed for IE11ssa
                }, noop);

        }
    }
};

function getProps(el, opacity?) {
    const zIndex = css(el, 'zIndex');
    return isVisible(el)
        ? assign({
            display: '',
            opacity: opacity ? css(el, 'opacity') : '0',
            pointerEvents: 'none',
            position: 'absolute',
            zIndex: zIndex === 'auto' ? index(el) : zIndex
        }, getPositionWithMargin(el))
        : false;
}

export function reset(el) {
    css(el.children, {
        height: '',
        left: '',
        opacity: '',
        pointerEvents: '',
        transform:'',
        position: '',
        top: '',
        width: ''
    });
    removeClass(el, targetClass);
    css(el, 'height', '');
}

function getPositionWithMargin(el) {
    const { height, width } = el.getBoundingClientRect();
    let { top, left } = position(el);
    top += toFloat(css(el, 'marginTop'));
    return { top, left, height, width };
}

let style;

function addStyle() {
    if (style) {
        return;
    }
    style = append(document.head, '<style>').sheet;
    style.insertRule(
        `.${targetClass} > * {
            margin-top: 0 !important;
            /*transform: none !important;*/
        }`, 0
    );
}
