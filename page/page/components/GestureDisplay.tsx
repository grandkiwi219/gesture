import { createContext, useEffect, useRef, useState, useContext, useCallback } from 'react';
import { IconType } from 'react-icons';

import { variable } from 'src/main/variable';
import { direction } from 'src/main/consts';
import { exitReset } from 'src/main/process';
import { mouseDown, mouseMove, mouseUp } from 'src/main/event';
import { stopDrawing } from 'src/main/drawing';
import { calcCanvasInsideCoord } from 'src/main/drawing/supports';

import { bg_consts } from 'service/consts';

import '../CSS/GestureDisplay.css' with { type: 'css' };

import std from 'page/std';
import utils from 'page/utils/utils';

import { SettingSetter } from 'page/components/Setting';

import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowRoundBack, IoMdArrowRoundDown, IoMdArrowRoundForward, IoMdArrowRoundUp } from "react-icons/io";
import Input, { pleaseInput } from 'page/components/Input';


const SetDirs = createContext<((directions: direction[]) => void)>(() => {});
const Dirs = createContext<direction[]>([]);

const SetSvgData = createContext<(value: GesturePainting | ((prevState: GesturePainting) => GesturePainting)) => void>(() => {});
const SvgData = createContext<GesturePainting>([]);

function GDirsControl({ children }: Props) {

	const [dirsState, setDirsLegacy] = useState<direction[]>([]);

	return (
		<SetDirs value={setDirsLegacy}>
			<Dirs value={dirsState}>
				{children}
			</Dirs>
		</SetDirs>
	);
}

function GSvgDataControl({ children }: Props) {

	const [svgData, setSvgData] = useState<GesturePainting>([]);

	return (
		<SetSvgData value={setSvgData}>
			<SvgData value={svgData}>
				{children}
			</SvgData>
		</SetSvgData>
	);
}

export function GControl({ children }: Props) {
	return (
		<GDirsControl>
			<GSvgDataControl>
				{children}
			</GSvgDataControl>
		</GDirsControl>
	);
}

const reset_options: ExitReset = {
	stop_drawing: false,
	remove_mouse_move: false,
	reset_directions: false
}

let gesture_context_menu = true;

export function GCanvas({ children }: Props) {

	const cancel = useRef<HTMLButtonElement | null>(null);
	const canvas_wrap = useRef<HTMLDivElement | null>(null);

	const setDirs = useContext(SetDirs);
	const setSvgData = useContext(SetSvgData);

	const set_last_pos = useRef(true);

	function handleSvgSize() {
		setSvgData(s => {
			s[0] = canvas_wrap.current ? [canvas_wrap.current.offsetWidth, canvas_wrap.current.offsetHeight] : bg_consts.size.svg;
			return [...s];
		});
	}

	function handleSvgData(data: Coordinate) {
		const coord = calcCanvasInsideCoord({ x: data.x, y: data.y });

		setSvgData(s => {
			s.push([coord.x, coord.y]);
			return [...s];
		});
	}

 	useEffect(() => {
		gesture_context_menu = true;

		exitReset();
		variable.drawing_store.preserve = false;

		handleSvgSize();
		canvas_wrap.current && canvas_wrap.current.addEventListener('resize', handleSvgSize);

		return () => {
			canvas_wrap.current && canvas_wrap.current.removeEventListener('resize', handleSvgSize);
		}
	});

	return (
		<div ref={canvas_wrap} className='display-base display' style={{
				position: 'relative'
			}}
			onMouseUp={(event) => {
				mouseUp((event as unknown as MouseEvent),
					{
						run: false,
						reset_options: {
							...reset_options,
							execution() {
								!set_last_pos.current && handleSvgData({ x: event.clientX, y: event.clientY });
								set_last_pos.current = true;
							}
						}
					}
				);
			}}
			onMouseLeave={(event) => {
				exitReset({
					...reset_options,
					execution() {
						!set_last_pos.current && handleSvgData({ x: event.clientX, y: event.clientY });
						set_last_pos.current = true;
					}
				});
			}}
			onMouseDown={(event) => {
				mouseDown((event as unknown as MouseEvent), 
					{
						acknowledgeContextMenu: () => {},
						use_mouse_move: false,
						reset_options: {
							...reset_options,
							execution() {
								!set_last_pos.current && handleSvgData({ x: event.clientX, y: event.clientY });
								set_last_pos.current = true;
							}
						}
					}
				);
			}}
			onMouseMove={(event) => {
				const is_new_dir = mouseMove((event as unknown as MouseEvent), {
					ignoreContextMenu: () => {
						cancel.current!.style.display = 'block';
						variable.directions.reset();
						setDirs([]);
						stopDrawing();
						gesture_context_menu = false;

						set_last_pos.current = false;
						setSvgData([]);
						handleSvgSize();
					},
					drawing_target: event.currentTarget,
					show_command: false,
					reset_options: {
						...reset_options,
						execution() {
							!set_last_pos.current && handleSvgData({ x: event.clientX, y: event.clientY });
							set_last_pos.current = true;
						}
					}
				});

				if (!is_new_dir) return;

				setDirs([...variable.directions.data]);

				handleSvgData({ x: variable.changed_pos.x, y: variable.changed_pos.y });
			}}
			onContextMenu={(e) => {
				if (gesture_context_menu) return;

				e.preventDefault();
				e.stopPropagation();
				gesture_context_menu = true;
			}}
		>
			{children}

			<button ref={cancel} className='display-cancel'
				onClick={() => {
					cancel.current!.style.display = 'none';
					setDirs([]);
					exitReset();
					window.dispatchEvent(new Event(std.event.command_added));
				}}
			>
				<MdOutlineCancel size={25} />
			</button>
		</div>
	);
};


export function GDisplay({ children }: Props) {
	return (
		<div className='display-base direction-settings'>

			{children}
			
		</div>
	);
}

export const dirEl: { [key in direction]: IconType } = {
	[direction.Right]: IoMdArrowRoundForward,
	[direction.Left]: IoMdArrowRoundBack,
	[direction.Up]: IoMdArrowRoundUp,
	[direction.Down]: IoMdArrowRoundDown
}

export function GDirs() {

    const dirs = useContext(Dirs);

    return (
        <>
            {dirs.map(dir => {
                const Icon = dirEl[dir];
                return (<div className='dir'><Icon size='30px' /></div>);
            })}
        </>
    );
}

const GS_desc_msg = '제스처에 대한 설명을 작성하셔야 합니다.';

export function GSetups() {

    const naming = useRef<HTMLInputElement | null>(null);

	const setSetting = useContext(SettingSetter);
	const svgData = useContext(SvgData);

	useEffect(() => {
		window.addEventListener(std.event.command_added, commandAdded);

		return () => window.removeEventListener(std.event.command_added, commandAdded);

		function commandAdded() {
			naming.current && (naming.current.value = '');
		}
	});

    return (
        <div className='display-base setups'>

            <div className='naming'>
                <Input id='naming-input' ref={naming}
                    placeholder='설명 추가'
                    onKeyDownCase={e => {
                        switch (e.key) {
							case 'Enter':
								if (e.currentTarget.value) {
                        			setSetting({ description: e.currentTarget.value, gesturePainting: svgData });
								}
								else {
									pleaseInput(GS_desc_msg, e.currentTarget);
								}
								break;

                            default:
                                break;
                        }
                    }}
                />
            </div>

            <button className='opacity display'
                onClick={() => {
                    if (!naming.current) return;

					if (variable.directions.data.length < 1) {
						utils.showAlert({ type: 'dev', msg: '허용되지 않은 경로입니다.' });
						return;
					}
                    
					const key = variable.directions.data.join('');
					if (variable.command_store.has(key)) {
						utils.showAlert({ type: 'error', msg: '동일한 제스처가 존재합니다.' });
						return;
					}

                    if (naming.current.value) {
                        setSetting({ description: naming.current.value, gesturePainting: svgData });
                        return;
                    }
                    
                    pleaseInput(GS_desc_msg, naming.current);
                }}
            >
                추가하기
            </button>

        </div>
    );
}
