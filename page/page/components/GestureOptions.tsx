import { useEffect, useRef, useState } from "react";
import { svg, stagger, animate, createScope, Scope } from 'animejs';

import '../CSS/GestureOptions.css' with { type: 'css' };

import { dirEl } from "./GestureDisplay";

import std from "page/std";

import utils from "page/utils/utils";

import { variable } from "src/main/variable";
import { storage_area, storage_keys } from "src/main/consts";
import { direction } from "src/main/direction";

import { MdAddCircleOutline } from "react-icons/md";
import { MdPlaylistRemove } from "react-icons/md";
import { options } from "src/main/enum";


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
                    <div className='dir translucent'>
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

function GOption({ key, cmd_key, command, dirs }: { key: string, cmd_key: string, command: Gesture, dirs: direction[] }) {

    const svgData = useRef<SVGSVGElement>(null);
    const root = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);

    useEffect(() => {
        if (!svgData.current) return;

        scope.current = createScope({ root }).add(self => {

            const drawSvg = animate(svg.createDrawable('polyline'), {
                draw: '0 1',
                ease: 'linear',
                duration: cmd_key.length * 450,
                loop: true,
                loopDelay: 500,
                autoplay: false
            });

            self!.add('play', () => {
                drawSvg.play();
            });

            self!.add('stop', () => {
                drawSvg.complete();
                drawSvg.cancel();
            });
        });

        scope.current.methods.stop();

        return () => {
            scope.current && scope.current.revert();
        }
    });
    
    return (
        <div className="option" key={key} ref={root}
            onMouseEnter={() => {
                if (!scope.current) return;
                
                scope.current.methods.play();
            }}
            onMouseLeave={() => {
                if (!scope.current) return;

                scope.current.methods.stop();
            }}
        >

            {
                (
                    command?.gesturePainting
                    && Array.isArray(command.gesturePainting)
                    && command.gesturePainting.length > 2
                    && command.gesturePainting.every(na => Array.isArray(na))
                )
                ? <svg
                    ref={svgData}
                    stroke={options.pen.color}
                    stroke-width={options.pen.size}
                    fill="none"
                    viewBox={`0 0 ${command.gesturePainting![0][0]} ${command.gesturePainting![0][1]}`}
                    stroke-linecap="round"
                >
                    <polyline points={command.gesturePainting!.slice(1, command.gesturePainting.length).map((na, i) => `${na[0]},${na[1]}`).join(' ')}></polyline>
                </svg>
                : <div style={{ width: '0' }}></div>
            }

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
                        const legacy_data = await chrome.storage[storage_area].get([storage_keys.store]);

                        if (!Array.isArray(legacy_data[storage_keys.store])) {
                            throw new TypeError('스토어의 데이터가 배열이 아닙니다.');
                        }

                        await chrome.storage[storage_area].set({ [storage_keys.store]: (legacy_data[storage_keys.store] as string[]).filter(r => r != cmd_key) });

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

                return (<GOption key={cmd_key + state} cmd_key={cmd_key} command={command!} dirs={dirs} />);
            })}
        </>
    );
}
