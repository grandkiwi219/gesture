import { memo, Ref, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';

import { variable } from 'src/main/variable';
import { direction } from 'src/main/consts';
import { exitReset } from 'src/main/process';
import { mouseDown, mouseMove, mouseUp } from 'src/main/event';
import { stopDrawing } from 'src/main/drawing';

import './CSS/GestureSettings.css' with { type: 'css' };

import GridCanvas from 'page/components/GridCanvas';
import DisplayContainer from 'page/components/DisplayContainer';

import { MdAddCircleOutline } from "react-icons/md";
import { IoMdArrowRoundBack, IoMdArrowRoundDown, IoMdArrowRoundForward, IoMdArrowRoundUp } from "react-icons/io";


export const gestureSetting: Setting = {
	name: '제스처 설정',
	path: '/',
}

const GestureCanvas = memo(function({ setDirs, children }: Props & { setDirs: (dirs: direction[]) => void }) {

	const drawing_target = useRef(null);
	const context_menu = useRef(true);

	useEffect(() => {
		console.log('제스처')
		exitReset();

		variable.drawing_store.preserve = false;
	});

	return (
		<div className='display-base display'
			ref={drawing_target}
			onMouseUp={gestureMouseUp}
			onMouseLeave={gestureMouseLeave}
			onMouseDown={(event) => {
				stopDrawing();
				setDirs([]);
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
				const is_new_dir = mouseMove((event as unknown as MouseEvent), { 
					ignoreContextMenu: () => context_menu.current = false,
					drawing_target: drawing_target.current,
					show_command: false
				});

				if (!is_new_dir) return;

				setDirs([...variable.directions.data]);
			}}
			onContextMenu={(e) => {
				if (context_menu.current) return;

				e.preventDefault();
				e.stopPropagation();
			}}
		>
			{children}
		</div>
	);
})

const dirEl: { [key in direction]: IconType } = {
	[direction.Right]: IoMdArrowRoundForward,
	[direction.Left]: IoMdArrowRoundBack,
	[direction.Up]: IoMdArrowRoundUp,
	[direction.Down]: IoMdArrowRoundDown
}

function GestureDisplays({ children }: Props) {

	const display_dirs: Ref<HTMLDivElement> = useRef(null);

	const [dirs, setDirs] = useState<direction[]>([]);

	return (
		<>
			<GestureCanvas setDirs={setDirs}>
				{children}
			</GestureCanvas>

			<div className='display-base direction-settings'>
				<div className='display-base btns'>
					<button className='opacity display'>??????</button>
					<button className='opacity display'>Add</button>
				</div>
				<div ref={display_dirs} className='display-base display dirs'>
					{dirs.map(dir => {
						const Icon = dirEl[dir];
						return (<div className='dir'><Icon size='30px' /></div>);
					})}
				</div>
			</div>
		</>
	);
}

export default function() {
	console.log('제스처 wrap');
	return (
		<DisplayContainer>
			<GestureDisplays>
				<GridCanvas />
			</GestureDisplays>

			<>
				<button className="opacity option generate">
					<MdAddCircleOutline size="30px" />
				</button>
				<div className="option grab"></div>
			</>
		</DisplayContainer>
	);
}

function gestureMouseUp(event: any) {
	mouseUp(event, { run: false, reset_options: { stop_drawing: false, remove_mouse_move: false } });
}

function gestureMouseLeave() {
	exitReset({ stop_drawing: false, remove_mouse_move: false });
}
