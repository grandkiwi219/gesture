import { isFirefox } from "src/isFirefox";

export function calcAngleDegrees({ x, y }: CoordinateObj): Angle {
    return (Math.atan2(y, x) * 180) / Math.PI;
}

function canScroll(el: Element, scrollAxis: 'scrollTop' | 'scrollLeft'): boolean {
    if (0 === el[scrollAxis]) {
        el[scrollAxis] = 1;
        if (0.8 <= el[scrollAxis] && el[scrollAxis] <= 1) {
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

export function encodeMap<V>(keys: string[], result: KeyObject<V>) {
    const map = new Map<string, V>();
    keys.forEach(key => {
        map.set(key, result[key]);
    });
    return map;
}

export function decodeMap<V>(map: Map<string, V>) {
    const result: KeyObject<V> = {}
    map.forEach((v, k) => {
        result[k] = v;
    });
    return result;
}

export function merge(target: object, source: object) {
    for (const key of Object.keys(source)) {
        const sourceValue: any = source[key as keyof typeof source];
        const targetValue: any = target[key as keyof typeof target];

        if (Array.isArray(sourceValue)) {
            (target[key as keyof typeof target] as any) = sourceValue;
        } 
        else if (sourceValue instanceof Object && targetValue instanceof Object) {
            merge(targetValue, sourceValue);
        } 
        else {
            (target[key as keyof typeof target] as any) = sourceValue;
        }
    }

    return target;
}

export function px(num: number): string {
    return `${num}px`;
}

export const postMsg = isFirefox
? function(target: Window | null, message: any) {
    target?.postMessage(JSON.stringify(message), '*');
}
: function(target: Window | null, message: any) {
    target?.postMessage(message, '*');
}

export const getMsg = isFirefox
? function(data: any) { // firefox
    if (typeof data == 'string') {
        const obj = JSON.parse(data);
        return obj instanceof Object ? obj : undefined;
    }
    else
        return undefined;
}
: function(data: any) { // chrome
    if (data instanceof Object)
        return data;
    else 
        return undefined;
}
