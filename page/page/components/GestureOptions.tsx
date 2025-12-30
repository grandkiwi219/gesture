import { useEffect, useRef, useState } from "react";

import '../CSS/GestureOPtions.css' with { type: 'css' };

import { dirEl } from "./GestureDisplay";

import std from "page/std";

import utils from "page/utils/utils";

import { variable } from "src/main/variable";
import { direction, storage_area, store } from "src/main/consts";

import { MdAddCircleOutline } from "react-icons/md";
import { MdPlaylistRemove } from "react-icons/md";


const type: { [key in GestureType]: string } = {
    'script': '내장 스크립트',
    'custom_script': '사용자 지정 스크립트'
}

// 정리 필요

function GOptionAdd({ state }: { state?: number }) {
    return (
        <button className="opacity option generate" value={state || undefined}>
            <MdAddCircleOutline size={30} />
        </button>
    );
}

function GODirs({ dirs }: { dirs: direction[] }) {   
    return (
        <>
            {dirs.map(dir => {
                const Icon = dirEl[dir];
                return (
                    <div className='dir translucent' style={{
                        padding: '6px',
                        paddingBottom: '5px',
                    }}>
                        <Icon size='15px' />
                    </div>
                );
            })}
        </>
    );
}

function GODesc({ command, dirs }: { command: Gesture, dirs: direction[] }) {

    const scroll_dirs_width = 160;

    const scroll_dirs = useRef<HTMLDivElement>(null);
    const scroll_dirs_wrap = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scroll_dirs.current) return;

        let scrollAmount = 0;
        let isScrolling = false;
        
        scroll_dirs.current.addEventListener('wheel', scrollX, { passive: false });

        function scrollX(e: WheelEvent) {
            if (scroll_dirs.current!.scrollWidth <= scroll_dirs_width) return;

            e.preventDefault();
        
            scrollAmount += e.deltaY;
        
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        }
        
        function smoothScroll() {
            if (!scroll_dirs.current) return;

            scroll_dirs.current.scrollLeft += scrollAmount * 0.2;
            scrollAmount *= 0.7;
        
            if (Math.abs(scrollAmount) > 0.5) {
                requestAnimationFrame(smoothScroll);
            } else {
                isScrolling = false;
            }
        }

        return () => {
            if (!scroll_dirs.current) return;

            scroll_dirs.current.removeEventListener('wheel', scrollX);
        }
    });

    return (
        <div style={{
            flexGrow: 1,
            display: 'flex',
            gap: '5px',
            flexDirection: 'column'
        }}>

            <div style={{
                width: `${scroll_dirs_width}px`,
                paddingTop: '3px',
                fontSize: 15,
                textOverflow: 'ellipsis',
                whiteSpace: 'wrap',
                overflow: 'hidden'
            }}>
                {command?.description}
            </div>

            <div style={{
                color: 'gray'
            }}>
                유형: {type[(command?.type || 'custom_script')]}
            </div>

            <div ref={scroll_dirs} className="option-dirs" style={{
                width: `${scroll_dirs_width}px`
            }}>
                <div ref={scroll_dirs_wrap} style={{
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    gap: '5px',
                }}>
                    <GODirs dirs={dirs} />
                </div>
            </div>

        </div>
    );
}

function GOption({ cmd_key, command, dirs, state }: { cmd_key: string, command: Gesture, dirs: direction[], state: number }) {
    
    const option = useRef<HTMLDivElement>(null);
    
    return (
        <div ref={option} className="option" key={cmd_key}>

            <img src={command?.gesturePainting || '#'} alt={cmd_key} aria-value={state}
                onError={event => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.style.width = '0';
                }}
                onLoad={event => {
                    event.currentTarget.style.width = '';
                }}
            />

            <GODesc command={command} dirs={dirs} />

            <button
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: 'gray'
                }}
                onClick={async () => {
                    try {
                        const legacy_data = await chrome.storage[storage_area].get([store]);

                        if (!Array.isArray(legacy_data[store])) {
                            throw new TypeError('스토어의 데이터가 배열이 아닙니다.');
                        }

                        await chrome.storage[storage_area].set({ [store]: legacy_data[store].filter(r => r != cmd_key) });

                        await chrome.storage[storage_area].remove(cmd_key);
                        
                        utils.showAlert({ msg: `"${command.description}"(이)가 제거되었습니다.` });
                    } catch (error) {
                        console.error(error);
                        
                        utils.showAlert({ type: 'error', msg: `"${command.description}"(이)가 제거 도중 오류가 발생했습니다.` });
                    }
                }}
            >
                <MdPlaylistRemove size={std.size.icon}/>
            </button>
        </div>
    );
}

export function GOptions() {

    const [state, setState] = useState(0);

    useEffect(() => {
        window.addEventListener(std.event.command_loaded, () => {
            setState((state) => state += 1);
        });
    }, []);

    return (
        <>
            {variable.command_store.keys().map(cmd_key => {                
                const command = variable.command_store.get(cmd_key);
                const dirs = cmd_key.split('') as direction[];

                return (<GOption cmd_key={cmd_key} command={command!} dirs={dirs} state={state} />);
            })}
        </>
    );
}
