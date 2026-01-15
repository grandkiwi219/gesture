import { createContext, memo, useContext, useEffect, useRef, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

import { storage_area, storage_keys } from "src/main/consts";

import { variable } from "src/main/variable";
import { scripts } from "src/main/scripts";

import std, { Theme } from "page/std";

import utils from "page/utils/utils";


export const SettingState = createContext<SettingGesture | null>(null);
export const SettingSetter = createContext<((value: React.SetStateAction<SettingGesture | null>) => void)>(() => {});

export function SettingControl({ children }: Props) {

    const [state, setState] = useState<SettingGesture | null>(null);

    return (
        <SettingSetter value={setState}>
            <SettingState value={state}>
                {children}
            </SettingState>
        </SettingSetter>
    );
}

function SettingScript({ state, setState }: { state: SettingGesture, setState: ((value: React.SetStateAction<SettingGesture | null>) => void) }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',

            padding: '10px 10px',

            display: 'flex',
            flexDirection: 'column',

            overflowX: 'hidden',
            overflowY: 'auto'
        }}>
            {Object.values(scripts).map(script => {
                return (
                    <button
                        style={{
                            width: '100%',
                            height: 'fit-content',

                            padding: '15px 15px',

                            borderRadius: '5px',

                            backgroundColor: state.script == script.key ? 'var(--background-color-active)' : '',

                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setState(s => {
                                s!.type = 'script';
                                s!.script = script.key;
                                return { ...s! };
                            });
                        }}
                    >
                        {script.description}
                    </button>
                );
            })}
        </div>
    );
}

function SettingCustomScript({ state, setState }: { state: SettingGesture, setState: ((value: React.SetStateAction<SettingGesture | null>) => void) }) {

    const theme = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light';

    return (
        <div style={{
            width: '100%',
            height: '100%',
            overflow: 'auto'
        }}>
            <CodeEditor
                value={state.script ? state.script : ''}
                language="js"
                placeholder="사용자 지정 스크립트 작성이 필요합니다."
                onChange={(evn) => {
                    setState(s => {
                        s!.type = 'custom_script';
                        s!.script = evn.target.value;
                        return { ...s! };
                    });
                }}
                padding={15}
                data-color-mode={theme}
                style={{
                    fontSize: '14px',
                    minHeight: '100%'
                }}
            />
        </div>
    );
}

const std_category: React.CSSProperties = {
    width: '50%',
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer'
}

const std_category_no_active: React.CSSProperties = {
    backgroundColor: 'var(--background-color-hover)',
    color: 'gray'
}

const SettingWindowStyle = memo(function() {
    return (
        <style>{`
            #setting-window {
                max-width: 400px;
                min-width: 300px;
                width: 80%;

                max-height: 600px;
                min-height: 450px;
                height: 80%;

                background-color: var(--background-color);
                border-radius: 20px;
                box-shadow: 0px 0px 8px var(--background-color);

                display: flex;
                flex-direction: column;

                overflow: hidden;

                use-select: none;

                opacity: 0;

                transform: translateY(20px);

                transition: transform .12s, opacity .12s;
            }

            #setting-window.active {
                opacity: 1;

                transform: translateY(0);
            }
        `}</style>
    );
});

function SettingWindow({ state, setState }: { state: SettingGesture, setState: ((value: React.SetStateAction<SettingGesture | null>) => void) }) {

    const setting = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function escapeSettingWindow(e: KeyboardEvent) {
            if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) return;

            if (e.key == 'Escape')
                setState(null);
        }

        window.addEventListener('keydown', escapeSettingWindow);

        document.documentElement.classList.add('fix');

        void async function () {
            await utils.setDelay(0);
            setting.current!.className = 'active';
        }();

        return () => {
            window.removeEventListener('keydown', escapeSettingWindow);
            document.documentElement.classList.remove('fix');
        }
    }, []);

    return (
        <>
            <SettingWindowStyle />

            <div ref={setting} id="setting-window">
    
                <div style={{
                    width: '100%',
                    height: '60px',
    
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div
                        style={{
                            ...std_category,
                            ...(state.type != 'custom_script' ? {} : std_category_no_active)
                        }}
                        onClick={() => {
                            if (state.type != 'custom_script') return;
                            setState(s => {
                                s!.type = 'script';
                                s!.script = null;
                                return { ...s! };
                            });
                        }}
                    >
                        <span>내장 스크립트</span>
                    </div>
    
                    <div
                        style={{
                            ...std_category,
                            ...(state.type == 'custom_script' ? {} : std_category_no_active)
                        }}
                        onClick={() => {
                            if (state.type == 'custom_script') return;
                            setState(s => {
                                s!.type = 'custom_script';
                                s!.script = null;
                                return { ...s! };
                            });
                        }}
                    >
                        <span>사용자 지정 스크립트</span>
                    </div>
                </div>
    
                {state.type == 'custom_script' ? <SettingCustomScript state={state} setState={setState} /> : <SettingScript state={state} setState={setState} />}
    
                <div style={{
                    width: '100%',
                    height: '60px',
    
                    padding: '0 60px',
    
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div style={{
                        width: '50%',
    
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <button
                            style={{
                                padding: '10px 24px'
                            }}
                            onClick={async event => {
                                if (!state.script) {
                                    utils.showAlert({
                                        type: 'error',
                                        msg: '스크립트를 선택 혹은 작성하셔야 합니다.'
                                    });
                                    return;
                                }
    
                                try {
                                    const data = await chrome.storage[storage_area].get([storage_keys.store]);
    
                                    if (!Array.isArray(data[storage_keys.store])) {
                                        throw new TypeError('스토어의 형식이 배열이 아닙니다.');
                                    }
    
                                    const cmd_key = variable.directions.data.join('');
    
                                    await chrome.storage[storage_area].set(
                                        {
                                            [storage_keys.store]: [...(data[storage_keys.store] as string[]), cmd_key],
                                            [cmd_key]: {
                                                type: state.type || 'script',
                                                script: state.script,
                                                gesturePainting: state.gesturePainting,
                                                description: state.description
                                            }
                                        }
                                    );
                                    
                                    utils.showAlert({ msg: `"${state.description}"(이)가 추가되었습니다.` });
    
                                    window.dispatchEvent(new Event(std.event.command_added));
    
                                    setState(null);
                                } catch (error) {
                                    console.error(error);
    
                                    utils.showAlert({ type: 'error', msg: `"${state.description}"(을)를 추가하는 도중 오류가 발생했습니다.` });
                                }
                            }}
                        >확인</button>
                    </div>
    
                    <div style={{
                        width: '50%',
    
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <button
                            style={{
                                padding: '10px 24px'
                            }}
                            onClick={() => {
                                setState(null);
                            }}
                        >취소</button>
                    </div>
                </div>
    
            </div>
        </>
    );
}

export default function() {

    const state = useContext(SettingState);
    const setState = useContext(SettingSetter);

    return (
        <div 
            style={state ? {
                width: '100dvw',
                height: '100dvh',

                backgroundColor: 'rgba(0, 0, 0, 0.25)',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                position: 'fixed',
                top: '0',
                left: '0',

                zIndex: 100000
            } : {
                display: 'none',

                position: 'fixed',
                top: '0',
                left: '0'
            }}
            onClick={event => {
                if (event.target != event.currentTarget) return;
                setState(null);
            }}
        >
            {state ? <SettingWindow state={state} setState={setState} /> : null}
        </div>
    );
}
