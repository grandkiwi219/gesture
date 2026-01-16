import { variable } from "../variable";

export function decideSize(target: Element | Window | null): CoordinateObj {
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
/* 
type SetSizeOption = { set_paper?: boolean, use_x?: boolean, use_y?: boolean };

export function setSizeCanvas(size_coord: CoordinateObj,
{ set_paper = true, use_x = true, use_y = true }
: SetSizeOption
= {}
) {

    const main = variable.drawing_store.main;
    if (main instanceof HTMLElement) {
        if (use_x) main.style.width = `${size_coord.x}px`;
        if (use_y) main.style.height = `${size_coord.y}px`;
    }

    const paper = variable.drawing_store.paper;
    if (set_paper && paper instanceof HTMLCanvasElement) {
        if (use_x) paper.width = size_coord.x;
        if (use_y) paper.height = size_coord.y;
    }
}

export async function setDynamicSizeCanvas(canvas: HTMLCanvasElement) {
    const size_coord: CoordinateObj = decideSize(variable.drawing_store.target);

    if (variable.drawing_store.target_is_window) {
        if (canvas.width <= size_coord.x && canvas.height <= size_coord.y) {
            decideResizeMethod();
        }
        return;
    }

    if (canvas.width <= size_coord.x && canvas.height <= size_coord.y) {
        decideResizeMethod();
    }
    // else if (canvas.width )

    function decideResizeMethod(options?: SetSizeOption) {
        variable.drawing_store.preserve
            ? preserveCanvas(canvas, canvas.getContext('2d')!, size_coord, options)
            : setSizeCanvas(size_coord, options);
    }
}

function preserveCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size_coord: CoordinateObj, options?: SetSizeOption) {
    const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setSizeCanvas(size_coord, options);
    ctx.putImageData(tempImage, 0, 0);
} */

export function setSizeCanvas(size_coord: CoordinateObj, set_paper: boolean = true) {

    const main = variable.drawing_store.main;
    if (main instanceof HTMLElement) {
        main.style.width = `${size_coord.x}px`;
        main.style.height = `${size_coord.y}px`;
    }

    const paper = variable.drawing_store.paper;
    if (set_paper && paper instanceof HTMLCanvasElement) {
        paper.width = size_coord.x;
        paper.height = size_coord.y;
    }
}

export async function setDynamicSizeCanvas(canvas: HTMLCanvasElement, set_paper?: boolean) {
    const size_coord: CoordinateObj = decideSize(variable.drawing_store.target);

    if (variable.drawing_store.target_is_window) {
        if (canvas.width < size_coord.x && canvas.height < size_coord.y) {
            variable.drawing_store.preserve
                ? preserveCanvas(canvas, canvas.getContext('2d')!, size_coord)
                : setSizeCanvas(size_coord, set_paper);
        }
        return;
    }

    if (canvas.width != size_coord.x && canvas.height != size_coord.y) {
        variable.drawing_store.preserve
            ? preserveCanvas(canvas, canvas.getContext('2d')!, size_coord)
            : setSizeCanvas(size_coord, set_paper);
    }
}

function preserveCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size_coord: CoordinateObj) {
    const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setSizeCanvas(size_coord);
    ctx.putImageData(tempImage, 0, 0);
}

export function calcCanvasInsideCoord({ x, y }: CoordinateObj, legacy_rect?: DOMRect): CoordinateObj {
    const rect = legacy_rect || (variable.drawing_store.paper as HTMLCanvasElement).getBoundingClientRect();
    return {
        x: x - rect.left,
        y: y - rect.top
    }
}
