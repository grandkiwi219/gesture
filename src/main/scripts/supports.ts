import { isScrollableX, isScrollableY } from "src/main/utils/utils";
import { variable } from "src/main/variable";

export function findScrollable(target: Element | null, coord: 'x' | 'y' = 'y'): Element {
    let checkFunc;

    switch (coord) {
        case 'x': 
            checkFunc = isScrollableX;
            break;
        default:
            checkFunc = isScrollableY;
            break;
    }

    let scrollable_el = null;
    if (target) {
        let current_target = target;
        do {
            if (checkFunc(current_target)) {
                scrollable_el = current_target;
            }
            else {
                const result: Element | null = current_target?.parentElement ?? null;
                if (!result) break;
                current_target = result;
            }
        } while (!scrollable_el);
        
    }
    
    if (!scrollable_el) scrollable_el = document.documentElement;

    return scrollable_el;
}

export function excludePaper(el: Element) {
    const paper = variable.drawing_store?.main;
    return paper
        && el !== paper
        && paper?.contains(el)
}
