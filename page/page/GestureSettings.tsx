import { memo, createContext, useEffect, useRef, useState, useContext, useCallback } from 'react';
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

const SetDirs = createContext<((directions: direction[]) => void)>(() => {});
const Dirs = createContext<direction[]>([]);

function GControl({ children }: Props) {

	const [dirsState, setDirsLegacy] = useState<direction[]>([]);

	const setDirsState = useCallback((directions: direction[]) => {
		return setDirsLegacy(directions);
	}, []);

	return (
		<SetDirs value={setDirsState}>
			<Dirs value={dirsState}>
				{children}
			</Dirs>
		</SetDirs>
	);
}

const reset_options: ExitReset = {
	stop_drawing: false,
	remove_mouse_move: false
}

let gesture_context_menu = true;

const GCanvas = memo(function({ children }: Props) {

	const drawing_target = useRef(null);
	const setDirs = useContext(SetDirs);

	useEffect(() => {
		gesture_context_menu = true;

		exitReset();
		variable.drawing_store.preserve = false;
	});

	return (
		<div className='display-base display'
			ref={drawing_target}
			onMouseUp={gestureMouseUp}
			onMouseLeave={gestureMouseLeave}
			onMouseDown={(event) => {
				mouseDown((event as unknown as MouseEvent), 
					{
						acknowledgeContextMenu: () => {},
						use_mouse_move: false,
						reset_options
					}
				);
			}}
			onMouseMove={(event) => {
				const is_new_dir = mouseMove((event as unknown as MouseEvent), {
					ignoreContextMenu: () => {
						try {
							setDirs([]);
						} catch (error) {
							console.error('에러!', error)
						}
						stopDrawing();
						gesture_context_menu = false;
					},
					drawing_target: drawing_target.current,
					show_command: false,
					reset_options
				});

				if (!is_new_dir) return;

				try {
					setDirs([...variable.directions.data]);
				} catch (error) {
					console.error('에러!?', error)
				}
			}}
			onContextMenu={(e) => {
				if (gesture_context_menu) return;

				e.preventDefault();
				e.stopPropagation();
				gesture_context_menu = true;
			}}
		>
			{children}
		</div>
	);
});

const dirEl: { [key in direction]: IconType } = {
	[direction.Right]: IoMdArrowRoundForward,
	[direction.Left]: IoMdArrowRoundBack,
	[direction.Up]: IoMdArrowRoundUp,
	[direction.Down]: IoMdArrowRoundDown
}

function GDisplay() {

	const dirs = useContext(Dirs);

	return (
		<div className='display-base direction-settings'>

			<div className='display-base setups'>
				<div className='naming'>
					<input id='naming-input' type="text" 
						placeholder='설명 추가'
						onKeyDown={e => {
							if (
								e.altKey
								|| e.shiftKey
								|| e.ctrlKey
								|| e.metaKey
							) return;

							switch (e.key) {
								case 'Escape':
									document.body.focus();
									break;

								default:
									break;
							}
						}}
					/>
				</div>
				<button className='opacity display'>추가하기</button>
			</div>

			<div className='display-base display dirs'>
				{dirs.map(dir => {
					const Icon = dirEl[dir];
					return (<div className='dir'><Icon size='30px' /></div>);
				})}
			</div>
			
		</div>
	);
}

export default function() {
	return (
		<DisplayContainer>
			<GControl>
				<GCanvas>
					<GridCanvas />
				</GCanvas>

				<GDisplay />
			</GControl>

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
	mouseUp(event, { run: false, reset_options });
}

function gestureMouseLeave() {
	exitReset(reset_options);
}
