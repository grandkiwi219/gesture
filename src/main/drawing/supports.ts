import { variable } from "../variable";

export function decideSize(target: Element | Window | null): Coordinate {
    if (target instanceof Element) {
        return {
            x: target.clientWidth,
            y: target.clientHeight
        }
    }

    return {
        x: window.outerWidth,
        y: window.outerHeight
    }

}

export function drawCommand(cvs: HTMLCanvasElement) {
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    
    ctx.reset();

    if (variable.directions.data.length < 1) return;
    const commands = variable.directions.data;

    // ...
}

export function setSizeCanvas(size_coord: Coordinate) {

    const main = variable.drawing_store.main;
    if (main instanceof HTMLElement) {
        main.style.width = `${size_coord.x}px`;
        main.style.height = `${size_coord.y}px`;
    }

    const paper = variable.drawing_store.paper;
    if (paper instanceof HTMLCanvasElement) {
        paper.style.width = `${size_coord.x}px`;
        paper.style.height = `${size_coord.y}px`;
        paper.width = size_coord.x;
        paper.height = size_coord.y;
    }
    else if (paper instanceof HTMLElement) {
        paper.style.width = `${size_coord.x}px`;
        paper.style.height = `${size_coord.y}px`;
    }
}
