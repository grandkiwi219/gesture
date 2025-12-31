import { createContext, useEffect, useRef, useState, useContext, useCallback } from 'react';
import { IconType } from 'react-icons';

import { variable } from 'src/main/variable';
import { direction } from 'src/main/consts';
import { exitReset } from 'src/main/process';
import { mouseDown, mouseMove, mouseUp } from 'src/main/event';
import { stopDrawing } from 'src/main/drawing';

import '../CSS/GestureDisplay.css' with { type: 'css' };

import utils from 'page/utils/utils';

import { SettingSetter } from 'page/components/Setting';

import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowRoundBack, IoMdArrowRoundDown, IoMdArrowRoundForward, IoMdArrowRoundUp } from "react-icons/io";


const SetDirs = createContext<((directions: direction[]) => void)>(() => {});
const Dirs = createContext<direction[]>([]);

export function GControl({ children }: Props) {

	const [dirsState, setDirsLegacy] = useState<direction[]>([]);

	return (
		<SetDirs value={setDirsLegacy}>
			<Dirs value={dirsState}>
				{children}
			</Dirs>
		</SetDirs>
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

	const setDirs = useContext(SetDirs);

	useEffect(() => {
		gesture_context_menu = true;

		exitReset();
		variable.drawing_store.preserve = false;
	});

	return (
		<div className='display-base display' style={{
				position: 'relative'
			}}
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
						cancel.current!.style.display = 'block';
						variable.directions.reset();
						setDirs([]);
						stopDrawing();
						gesture_context_menu = false;
					},
					drawing_target: event.currentTarget,
					show_command: false,
					reset_options
				});

				if (!is_new_dir) return;

				setDirs([...variable.directions.data]);
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
				}}
			>
				<MdOutlineCancel size={25} />
			</button>
		</div>
	);
};

function gestureMouseUp(event: any) {
	mouseUp(event, { run: false, reset_options });
}

function gestureMouseLeave() {
	exitReset(reset_options);
}


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

export function GSetups() {

    const naming = useRef<HTMLInputElement | null>(null);

	const setSetting = useContext(SettingSetter);

    return (
        <div className='display-base setups'>

            <div className='naming'>
                <input ref={naming} id='naming-input' type="text" 
                    placeholder='설명 추가'
                    onKeyDown={e => {
                        if (
                            e.altKey
                            || e.shiftKey
                            || e.ctrlKey
                            || e.metaKey
                        ) return;

                        if (naming.current!.classList.contains('warning')) {
                            naming.current?.classList.remove('warning');
                        }

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

            <button className='opacity display'
                onClick={async () => {
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
                        const description = naming.current.value;
                        setSetting({ description });
                        return;
                    }
                    
                    naming.current.focus();
                    naming.current.classList.add('warning');
					utils.showAlert({ type: 'error', msg: '제스처에 대한 설명을 작성하셔야 합니다.' });
					naming.current.style.transform = 'translateX(-5px)';
					await utils.setDelay(120);
					naming.current.style.transform = 'translateX(5px)';
					await utils.setDelay(120);
					naming.current.style = '';
                }}
            >
                추가하기
            </button>

        </div>
    );
}
