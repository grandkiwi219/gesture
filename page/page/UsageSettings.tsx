import { useEffect, useRef } from 'react';

import { exitReset } from 'src/main/process';
import { mouseDown, mouseMove, mouseUp } from 'src/main/event';
import { variable } from 'src/main/variable';

import utils from 'page/utils/utils';

import GridCanvas from 'page/components/GridCanvas';
import DisplayContainer from 'page/components/DisplayContainer';

import UsageOptions from './components/UsageOptions';
import { options, storage_area, storage_keys } from 'src/main/consts';


export const usageSetting: Setting = {
    name: '사용 설정',
    path: '/usage'
}

let usage_context_menu = true;

function UsageDisplay({ children }: Props) {

    const drawing_target = useRef(null);

    useEffect(() => {
        usage_context_menu = true;
        
        exitReset();
        variable.drawing_store.preserve = false;
    });

    return (
        <>
            <div className='display-base display'
                style={{
                    position: 'relative'
                }}
                ref={drawing_target}
                onMouseUp={usageMouseUp}
                onMouseLeave={usageMouseLeave}
                onMouseDown={(event) => {
                    mouseDown((event as unknown as MouseEvent), 
                        {
                            use_mouse_move: false,
                            reset_options: {
                                remove_mouse_move: false
                            }
                        }
                    );
                }}
                onMouseMove={(event) => {
                    mouseMove((event as unknown as MouseEvent), {
                        ignoreContextMenu: () => usage_context_menu = false,
                        drawing_target: drawing_target.current,
                        show_command: true
                    });
                }}
                onContextMenu={(e) => {
                    if (usage_context_menu) return;
    
                    e.preventDefault();
                    e.stopPropagation();
                    usage_context_menu = true;
                }}
            >
                {children}
            </div>

            <UsageSubmitBtn />
        </>
    );
}

function UsageSubmitBtn() {

    let submit = false;

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className='opacity display' style={{
                backgroundColor: 'var(--background-color)'
            }}
                onClick={async e => {
                    if (submit) return;

                    submit = true;
                    await chrome.storage[storage_area].set({
                        [storage_keys.options]: options
                    });
                    submit = false;
                    utils.showAlert({ msg: '저장이 완료되었습니다.' });
                }}
            >저장하기</button>
        </div>
    );
}

export default function() {
    return (
        <DisplayContainer>
            <UsageDisplay>
                <GridCanvas />
            </UsageDisplay>

            <UsageOptions />
        </DisplayContainer>
    );
}

function usageMouseUp(event: any) {
    mouseUp(event, { run: false, reset_options: { remove_mouse_move: false } });
}

function usageMouseLeave() {
	exitReset({ remove_mouse_move: false });
}
