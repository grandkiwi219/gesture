import { useEffect, useRef } from "react";

import std from "page/std";
import utils from "page/utils/utils";

import './CSS/GridCanvas.css' with { type: 'css' };

export default function() {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current as unknown as HTMLCanvasElement;

        if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;

        canvas.width = std.size.display;
        canvas.height = std.size.display;

        utils.drawBoard(canvas.getContext("2d")!);
    }, []);

    return (
        <canvas ref={ref} className="grid-canvas" />
    );
}
