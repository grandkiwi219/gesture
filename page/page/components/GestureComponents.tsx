import { createContext, useEffect, useRef, useState, useContext, useCallback } from 'react';
import { IconType } from 'react-icons';

import { variable } from 'src/main/variable';
import { direction } from 'src/main/consts';
import { exitReset } from 'src/main/process';
import { mouseDown, mouseMove, mouseUp } from 'src/main/event';
import { stopDrawing } from 'src/main/drawing';

import '../CSS/GestureComponents.css' with { type: 'css' };

import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowRoundBack, IoMdArrowRoundDown, IoMdArrowRoundForward, IoMdArrowRoundUp } from "react-icons/io";


const SetDirs = createContext<((directions: direction[]) => void)>(() => {});
const Dirs = createContext<direction[]>([]);

export function GControl({ children }: Props) {

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

export function GCanvas({ children }: Props) {

	const drawing_target = useRef(null);
	const cancel = useRef<HTMLButtonElement | null>(null);

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
						cancel.current!.style.display = 'block';
						setDirs([]);
						stopDrawing();
						gesture_context_menu = false;
					},
					drawing_target: drawing_target.current,
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

const dirEl: { [key in direction]: IconType } = {
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
                onClick={() => {
                    if (!naming.current) return;
                    
                    if (naming.current.value) {
                        const key = variable.directions.data.join('');
                        if (variable.command_store.has(key)) {
                            // 중복시 알림창

                            return;
                        }

                        const description = naming.current.value;
                        // 세팅창 생성

                        return;
                    }
                    
                    // 알림창
                    naming.current.focus();
                    naming.current.classList.add('warning');
                }}
            >
                추가하기
            </button>

        </div>
    );
}
