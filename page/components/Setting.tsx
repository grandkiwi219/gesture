import { createContext, CSSProperties, SetStateAction, useContext, useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

import { storage_area, store } from "src/main/consts";

import { variable } from "src/main/variable";
import { scripts } from "src/main/scripts";

import std, { Theme } from "page/std";

import utils from "page/utils/utils";


export const SettingState = createContext<SettingGesture | null>(null);
export const SettingSetter = createContext<((value: SetStateAction<SettingGesture | null>) => void)>(() => {});

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

function SettingScript({ state, setState }: { state: SettingGesture, setState: ((value: SetStateAction<SettingGesture | null>) => void) }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',

            padding: '10px 10px',

            display: 'flex',
            flexDirection: 'column',
            gap: '10px',

            overflowX: 'hidden',
            overflowY: 'auto'
        }}>
            {Object.values(scripts).map(script => {
                return (
                    <button
                        style={{
                            width: '100%',
                            height: 'fit-content',

                            padding: '10px 15px',

                            borderRadius: '5px',

                            backgroundColor: state.script == script.key ? 'var(--background-color-active)' : '',

                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setState(s => {
                                s!.type = 'script';
                                s!.script = script.key;
                                console.log(s)
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

function SettingCustomScript({ state, setState }: { state: SettingGesture, setState: ((value: SetStateAction<SettingGesture | null>) => void) }) {

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
                data-color-mode={localStorage.getItem(std.key.theme) as Theme || 'light'}
                style={{
                    fontSize: '14px',
                    minHeight: '100%'
                }}
            />
        </div>
    );
}

const std_category: CSSProperties = {
    width: '50%',
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer'
}

const std_category_no_active: CSSProperties = {
    backgroundColor: 'var(--background-color-hover)',
    color: 'gray'
}

function SettingWindow({ state, setState }: { state: SettingGesture, setState: ((value: SetStateAction<SettingGesture | null>) => void) }) {
    return (
        <div style={{
            maxWidth: '400px',
            minWidth: '300px',
            width: '80%',

            maxHeight: '600px',
            minHeight: '450px',
            height: '80%',

            backgroundColor: 'var(--background-color)',
            borderRadius: '20px',
            boxShadow: '0px 0px 8px var(--background-color)',
            
            display: 'flex',
            flexDirection: 'column',

            overflow: 'hidden',

            userSelect: 'none'
        }}>

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
                                const data = await chrome.storage[storage_area].get([store]);

                                if (!Array.isArray(data[store])) {
                                    throw new TypeError('스토어의 형식이 배열이 아닙니다.');
                                }

                                const cmd_key = variable.directions.data.join('');

                                await chrome.storage[storage_area].set(
                                    {
                                        [store]: [...data[store], cmd_key],
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
                            padding: '1px 24px'
                        }}
                        onClick={() => {
                            setState(null);
                        }}
                    >취소</button>
                </div>
            </div>

        </div>
    );
}

export default function() {

    const state = useContext(SettingState);
    const setState = useContext(SettingSetter);

    useEffect(() => {
        if (state) {
            document.documentElement.classList.add('fix');
        }
        else {
            document.documentElement.classList.remove('fix');
        }

    }, [state]);

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
            {state ? <SettingWindow state={state} setState={setState} /> : <></>}
        </div>
    );
}
