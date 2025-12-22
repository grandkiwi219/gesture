import { drawing_elements, drawing_options } from "src/main/consts";
import { variable } from "src/main/variable";
import logger from "../utils/logger";

export function startDrawing() {
    if (!variable.drawing_store.target) return;

    let target = variable.drawing_store.target;
    let coord: Coordinate = {
        x: 0,
        y: 0
    }

    if (target instanceof Element) {
        coord = {
            x: target.clientWidth,
            y: target.clientHeight
        }
    }
    else {
        target = document.documentElement;
        coord = {
            x: window.outerWidth,
            y: window.outerHeight
        }
    }

    const main = document.createElement(drawing_elements.main.tag);
    main.style.width = `${coord.x}px`;
    main.style.height = `${coord.y}px`;
    variable.drawing_store.main = main;

    const shadow = main.attachShadow({ mode: "open" });

    const paper = document.createElement(drawing_elements.paper.tag);
    paper.style.width = `${coord.x}px`;
    paper.style.height = `${coord.y}px`;
    if (drawing_elements.paper?.style && typeof drawing_elements.paper?.style == 'object') {
        Object.assign(paper.style, drawing_elements.paper.style);
    }
    if (paper instanceof HTMLCanvasElement) {
        paper.width = coord.x;
        paper.height = coord.y;
    }
    variable.drawing_store.paper = paper;
    shadow.appendChild(paper);

    const command = document.createElement(drawing_elements.command.tag);
    if (drawing_elements.command?.style && typeof drawing_elements.command?.style == 'object') {
        Object.assign(command.style, drawing_elements.command.style);
    }
    variable.drawing_store.command = command;

    const command_canvas = document.createElement(drawing_elements.command_canvas.tag);
    if (drawing_elements.command_canvas?.style && typeof drawing_elements.command_canvas?.style == 'object') {
        Object.assign(command_canvas.style, drawing_elements.command_canvas.style);
    }
    variable.drawing_store.command_canvas = command_canvas;
    command.appendChild(command_canvas);

    const command_text = document.createElement(drawing_elements.command_text.tag);
    if (drawing_elements.command_text?.style && typeof drawing_elements.command_text?.style == 'object') {
        Object.assign(command_text.style, drawing_elements.command_text.style);
    }
    variable.drawing_store.command_text = command_text;
    command.appendChild(command_text);

    shadow.appendChild(command);

    target.appendChild(main);
}

export function continueDrawing({ x, y }: Coordinate) {
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
    const coord: Coordinate = {
        x: x - rect.left,
        y: y - rect.top
    }

    const size = drawing_options.pen.size;

    ctx.strokeStyle = drawing_options.pen.color;
    ctx.lineWidth = size;

    ctx.beginPath();

    if (variable.last_pos.x >= 0 && variable.last_pos.y >= 0) {
        ctx.moveTo(variable.last_pos.x - rect.left, variable.last_pos.y - rect.top);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    } else {
        ctx.fillStyle = drawing_options.pen.color;
        ctx.arc(coord.x, coord.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

export function showCommandDrawing(description: string | undefined) {
    const cmd = variable.drawing_store.command;
    const cxt = variable.drawing_store.command_text;
    const cvs = variable.drawing_store.command_canvas;
    if (
        ((!cmd || !(cmd instanceof HTMLElement))) ||
        ((!cxt || !(cxt instanceof HTMLElement))) ||
        ((!cvs || !(cvs instanceof HTMLElement)))
    ) {
        stopDrawing();
        return;
    }
    
    if (typeof description != 'string') {
        cxt.textContent = '';
        cmd.style.display = 'none';
        return;
    }

    if (cvs instanceof HTMLCanvasElement) {
        drawCommand(cvs);
    }

    //temp
    cvs.style.display = 'none';

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
    if (variable.drawing_store.command_canvas) {
        variable.drawing_store.command_canvas.remove();
        variable.drawing_store.command_canvas = null;
    }
    if (variable.drawing_store.command_text) {
        variable.drawing_store.command_text.remove();
        variable.drawing_store.command_text = null;
    }
}

function drawCommand(cvs: HTMLCanvasElement) {
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    
    ctx.reset();

    if (variable.directions.data.length < 1) return;
    const commands = variable.directions.data;

    // ...
}
