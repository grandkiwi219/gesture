import { useEffect, useRef } from 'react';

import './_pages.css' with { type: 'css' };

import { exitReset } from 'src/main/process';
import { variable } from 'src/main/variable';
import { mouseDown, mouseMove, mouseUp } from 'src/main/event';
import { stopDrawing } from 'src/main/drawing';

import GridCanvas from 'page/components/GridCanvas';

import { MdAddCircleOutline } from "react-icons/md";


export const gestureSetting: Setting = {
	name: '제스처 설정',
	path: '/',
}

export default function() {

	const drawing_target = useRef(null);
	const context_menu = useRef(true);

	useEffect(() => {
		console.log('제스처')
		exitReset();

		variable.directions.reset();
		variable.drawing_store.preserve = false;
	});

	return (
		<div className="container">
			<div className="display-container">
				<div className='display'
					ref={drawing_target}
					onMouseUp={gestureMouseUp}
					onMouseLeave={gestureMouseLeave}
					onMouseDown={(event) => {
						stopDrawing();
						mouseDown((event as unknown as MouseEvent), 
							{
								acknowledgeContextMenu: () => context_menu.current = true,
								use_mouse_move: false,
								reset_options: {
									stop_drawing: false,
									remove_mouse_move: false
								}
							}
						);
					}}
					onMouseMove={(event) => {
						mouseMove((event as unknown as MouseEvent), { 
							ignoreContextMenu: () => context_menu.current = false,
							drawing_target: drawing_target.current,
							show_command: false
						});
					}}
					onContextMenu={(e) => {
						if (context_menu.current) return;

						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<GridCanvas />
				</div>
			</div>
			
			<div className="options-container">
				<button className="opacity option generate">
					<MdAddCircleOutline size="30px" />
				</button>
				<div className="option"></div>
			</div>
		</div>
	);
}

function gestureMouseUp(event: any) {
	mouseUp(event, { run: false, reset_options: { stop_drawing: false, remove_mouse_move: false } });
}

function gestureMouseLeave() {
	exitReset({ stop_drawing: false, remove_mouse_move: false });
}
