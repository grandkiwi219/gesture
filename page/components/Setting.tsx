import { createContext, memo, useContext, useEffect, useRef, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

import { storage_area, storage_keys } from "src/main/consts";

import { variable } from "src/main/variable";
import { scripts } from "src/main/scripts";
import { isUserScripts } from "src/isUserScripts";

import std from "page/std";
import utils from "page/utils/utils";
import { styling } from "page/utils/styling";
import { decideWarnEffect, decideWarnState } from "page/utils/decider";

import { MdHeight, MdOutlineOpenInNew } from "react-icons/md";



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

function SettingCustomScriptWarn() {

    const id = 'setting-custom-script-warn';

    return (
        <>
            <style>
                {styling(`#${id} *`, {
                    color: 'white'
                })}

                {styling(`#${id} > div`, {
                    padding: '5px 20px',
                    wordBreak: 'keep-all'
                })}

                {styling(`#${id} a`, {
                    textDecoration: 'underline',

                    transition: 'opacity var(--transition-speed)',

                    cursor: 'pointer'
                })}

                {styling(`#${id} a:hover`, {
                    opacity: '60%',
                })}
            </style>
            <div id={id} style={{
                width: '100%',
                height: '20%',
    
                backgroundColor: 'rgb(255, 55, 55)',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <div>
                    사용자 지정 스크립트를 사용하기 위해서는 {isUserScripts ? '사용자 스크립트 허용이 필요합니다.' : '개발자 모드가 켜져 있어야 합니다.'}
                </div>
                <div>
                    {isUserScripts
                    ? <>
                        <a onClick={() => {
                            chrome.tabs.create({ url: `chrome://extensions/?id=${location.host}` });
                        }} target="_blank">
                            <MdOutlineOpenInNew />&nbsp;사용자 스크립트 허용
                        </a>
                        으
                    </>
                    : <a onClick={() => {
                        chrome.tabs.create({ url: 'chrome://extensions/' });
                    }} target="_blank">
                        <MdOutlineOpenInNew />&nbsp;확장 프로그램 관리
                    </a>
                    }
                    로 가서 설정해주시길 바랍니다.
                </div>
                <div>
                    <a href={std.document.doc + (isUserScripts ? '' : '#'+std.document.on_developer_mode)} target="_blank">
                        <MdOutlineOpenInNew />&nbsp;만약 안내가 필요하시다면 이 곳을 눌러 확인하시길 바랍니다.
                    </a>
                </div>
            </div>
        </>
    );
}

function SettingCustomScript({ state, setState }: { state: SettingGesture, setState: ((value: React.SetStateAction<SettingGesture | null>) => void) }) {

    const theme = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light';
    
    const [warnState, setWarnState] = useState<boolean>(decideWarnState());

    useEffect(() => {
        return new decideWarnEffect(warnState, setWarnState).execute();
    });

    return (
        <div style={{
            width: '100%',
            height: '100%',
            overflow: 'auto'
        }}>
            {
                warnState
                ? <SettingCustomScriptWarn />
                : null
            }
            <div style={{
                width: '100%',
                height: warnState ? '80%' : '100%',
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
        </div>
    );
}

const SettingIfUseCustomScript = memo(function() {

    const { type } = useContext(SettingState)!;

    const id = 'setting-if-use-custom-script';

    const setting_csw = useRef<HTMLDivElement>(null);

    const transition_opacity = 'opacity .24s ease-in';

    const height = {
        width: .1,
        height: .2
    }

    const width = {
        width: .2,
        height: .15
    }

    const stable = {
        width: .1,
        height: .1
    }

    useEffect(() => {
        const tg = setting_csw.current!;

        if (type != 'custom_script') {
            tg.classList.add('hide');
            (async () => {
                await utils.setDelay(250);
                if (!tg.classList.contains('hide')) return;
                tg.className = '';
            })();
            return;
        }

        const empty = tg.className == '';

        tg.className = '';

        (async () => {
            if (!empty) await utils.setDelay(10);
            tg.classList.add('height');

            await utils.setDelay(200);

            if (!tg.classList.contains('height')) return;
            tg.classList.add('width');

            await utils.setDelay(200);

            if (!tg.classList.contains('width')) return;
            tg.classList.add('stable');
        })();
    }, [type]);

    return (
        <>
            <style>
                {styling(`#${id}`, {
                    width: '0',
                    height: '0',

                    backgroundColor: 'rgb(255, 55, 55)',

                    borderRadius: 'var(--paper-border-radius)',

                    position: 'absolute',
                    top: '0',
                    left: '50%',
                    transform: 'translateY(-110%) translateX(-50%)',

                    opacity: '1',

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    overflow: 'hidden',
                })}

                {styling(`#${id} *`, {
                    color: 'rgba(0, 0, 0, 0)',
                    textAlign: 'center'
                })}

                {styling(`#${id}.width *`, {
                    color: 'white'
                })}

                {styling(`#${id} > *`, {
                    overflow: 'hidden'
                })}

                {styling(`#${id}.height`, {
                    height: 'calc(100px + 10px)',

                    padding: '10px 24px',

                    transition: `padding ${height.width}s linear, height ${height.height}s ease`
                })}

                {styling(`#${id}.hide`, {
                    opacity: '0',
                    
                    transition: `padding ${height.width}s linear, height ${height.height}s ease, ${transition_opacity}`
                })}

                {styling(`#${id}.width`, {
                    width: 'calc(100% + 20px)',
                    height: 'calc(100px - 10px)',

                    transition: `width ${width.width}s ease, height ${width.height}s ease-in, ${transition_opacity}`
                })}

                {styling(`#${id}.stable`, {
                    width: '100%',
                    height: '100px',
                    
                    transition: `width ${stable.width}s ease-in, height ${stable.height}s ease-in, ${transition_opacity}`
                })}
            </style>
    
            <div id={id} ref={setting_csw}>
                <span style={{
                    fontSize: '16px'
                }}>
                    ※ 경고! ※
                </span>
                <span style={{
                    fontSize: '14px'
                }}>
                    보안 문제에 직면하지 않기 위해 입력하실 코드를 이해할 수 있거나 신뢰할 수 있어야 합니다!
                </span>
            </div>
        </>
    );
});

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
        <style>
            {styling('#setting-window', {
                maxWidth: '400px',
                minWidth: '300px',
                width: '80%',

                maxHeight: '600px',
                minHeight: '450px',
                height: '60%',

                backgroundColor: 'var(--background-color)',
                borderRadius: '20px',
                boxShadow: '0px 0px 8px var(--background-color)',

                display: 'flex',
                flexDirection: 'column',

                // overflow: 'hidden',

                userSelect: 'none',

                opacity: '0',

                transform: 'translateY(20px)',

                transition: 'transform .12s, opacity .12s'
            })}
            
            {styling('#setting-window.active', {
                opacity: '1',

                transform: 'translateY(0)'
            })}
        </style>
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
                            borderTopLeftRadius: 'var(--paper-border-radius)',
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
                            borderTopRightRadius: 'var(--paper-border-radius)',
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

                <SettingIfUseCustomScript />
    
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
