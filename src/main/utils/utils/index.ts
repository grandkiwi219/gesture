export function calcAngleDegrees({ x, y }: Coordinate): Angle {
    return (Math.atan2(y, x) * 180) / Math.PI;
}

function canScroll(el: Element, scrollAxis: 'scrollTop' | 'scrollLeft'): boolean {
    if (0 === el[scrollAxis]) {
        el[scrollAxis] = 1;
        if (1 === el[scrollAxis]) {
            el[scrollAxis] = 0;
            return true;
        }
    } else {
        return true;
    }
    return false;
}

export function isScrollableX(el: Element): boolean {
    return (el.scrollWidth > el.clientWidth) && canScroll(el, 'scrollLeft') && ('hidden' !== getComputedStyle(el).overflowX);
}

export function isScrollableY(el: Element): boolean {
    return (el.scrollHeight > el.clientHeight) && canScroll(el, 'scrollTop') && ('hidden' !== getComputedStyle(el).overflowY);
}

export function isScrollable(el: Element): boolean {
    return isScrollableX(el) || isScrollableY(el);
}
