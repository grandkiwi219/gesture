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

export async function setDynamicSizeCanvas(canvas: HTMLCanvasElement) {
    const size_coord: Coordinate = decideSize(variable.drawing_store.target);

    if (variable.drawing_store.target_is_window) {
        if (canvas.width < size_coord.x && canvas.height < size_coord.y) {
            variable.drawing_store.preserve
                ? preserveCanvas(canvas, canvas.getContext('2d')!, size_coord)
                : setSizeCanvas(size_coord);
        }
        return;
    }

    if (canvas.width != size_coord.x && canvas.height != size_coord.y) {
        variable.drawing_store.preserve
            ? preserveCanvas(canvas, canvas.getContext('2d')!, size_coord)
            : setSizeCanvas(size_coord);
    }
}

function preserveCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size_coord: Coordinate) {
    const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setSizeCanvas(size_coord);
    ctx.putImageData(tempImage, 0, 0);
}

export function calcCanvasInsideCoord({ x, y }: Coordinate, legacy_rect?: DOMRect): Coordinate {
    const rect = legacy_rect || (variable.drawing_store.paper as HTMLCanvasElement).getBoundingClientRect();
    return {
        x: x - rect.left,
        y: y - rect.top
    }
}
