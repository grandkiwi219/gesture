import { drawing_elements, options } from "src/main/consts";
import { variable } from "src/main/variable";
import { calcCanvasInsideCoord, decideSize, drawCommand, setDynamicSizeCanvas, setSizeCanvas } from "./supports";
import logger from "../utils/logger";

export function startDrawing() {
    const std_target = variable.drawing_store.target;

    if (!std_target) return;

    let target = std_target;
    const coord: CoordinateObj = decideSize(target);

    if (!(target instanceof Element)) {
        target = document.documentElement;
    }

    const main = document.createElement(drawing_elements.main.tag);
    const paper = document.createElement(drawing_elements.paper.tag);
    const command = document.createElement(drawing_elements.command.tag);
    const command_img = document.createElement(drawing_elements.command_img.tag);
    const command_text = document.createElement(drawing_elements.command_text.tag);

    const shadow = main.attachShadow({ mode: "open" });
    
    if (std_target instanceof Window || std_target == document.documentElement) {
        variable.drawing_store.target_is_window = true;

        main.style.position = 'fixed';
        command.style.position = 'fixed';
    }
    else {
        variable.drawing_store.target_is_window = false;

        main.style.position = 'absolute';
        command.style.position = 'absolute';
    }

    /* main */
    Object.assign(main.style, drawing_elements.main.style);
    variable.drawing_store.main = main;

    /* paper */
    Object.assign(paper.style, drawing_elements.paper.style);
    variable.drawing_store.paper = paper;
    shadow.appendChild(paper);

    setSizeCanvas(coord);
    
    /* command */
    Object.assign(command.style, drawing_elements.command.style);
    variable.drawing_store.command = command;
    
    /* command_img */
    Object.assign(command_img.style, drawing_elements.command_img.style);
    variable.drawing_store.command_img = command_img;
    command.appendChild(command_img);
    
    /* command_text */
    Object.assign(command_text.style, drawing_elements.command_text.style);
    variable.drawing_store.command_text = command_text;
    command.appendChild(command_text);

    shadow.appendChild(command);

    target.appendChild(main);
}

export function continueDrawing({ x, y }: CoordinateObj) {
    const canvas = variable.drawing_store.paper;
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        stopDrawing();
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        stopDrawing();
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const coord = calcCanvasInsideCoord({ x, y }, rect);

    const size = options.pen.size;

    ctx.strokeStyle = options.pen.color;
    ctx.lineWidth = size;

    ctx.beginPath();

    if (variable.last_pos.x >= 0 && variable.last_pos.y >= 0) {
        ctx.moveTo(variable.last_pos.x - rect.left, variable.last_pos.y - rect.top);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }
    else {
        ctx.fillStyle = options.pen.color;
        ctx.arc(coord.x, coord.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    setDynamicSizeCanvas(canvas);
}

export function showCommandDrawing(description: string | undefined, gesturePainting: GesturePainting | undefined) {
    const cmd = variable.drawing_store.command;
    const cxt = variable.drawing_store.command_text;
    const cmg = variable.drawing_store.command_img;
    if (
        ((!cmd || !(cmd instanceof HTMLElement))) ||
        ((!cxt || !(cxt instanceof HTMLElement))) ||
        ((!cmg || !(cmg instanceof HTMLImageElement)))
    ) {
        stopDrawing();
        return;
    }
    
    if (!options.gesture.cmd.display || typeof description != 'string') {
        cmg.src = '';
        cxt.textContent = '';
        cmd.style.display = 'none';
        return;
    }

    /* if (gesturePainting) {
        cmg.src = gesturePainting;
        cmg.style.display = 'block';
        cmg.addEventListener('error', (e) => {
            cmg.style.display = 'none';
            logger.error('cmg: ', e);
        }, { once: true });
    }
    else { */
        cmg.src = '';
        cmg.style.display = 'none';
    /* } */
    cxt.textContent = description;
    cmd.style.display = 'flex';
}

export function stopDrawing() {
    variable.drawing_store.target = null;
    if (variable.drawing_store.main) {
        variable.drawing_store.main.remove();
        variable.drawing_store.main = null;
    }
    if (variable.drawing_store.paper) {
        variable.drawing_store.paper.remove();
        variable.drawing_store.paper = null;
    }
    if (variable.drawing_store.command) {
        variable.drawing_store.command.remove();
        variable.drawing_store.command = null;
    }
    if (variable.drawing_store.command_img) {
        variable.drawing_store.command_img.remove();
        variable.drawing_store.command_img = null;
    }
    if (variable.drawing_store.command_text) {
        variable.drawing_store.command_text.remove();
        variable.drawing_store.command_text = null;
    }
}
