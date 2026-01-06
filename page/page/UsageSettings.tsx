import { useEffect, useRef } from 'react';

import { exitReset, setCommand } from 'src/main/process';
import { mouseDown, mouseMove, mouseUp, storageChanged } from 'src/main/event';
import { variable } from 'src/main/variable';

import GridCanvas from 'page/components/GridCanvas';
import DisplayContainer from 'page/components/DisplayContainer';


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
        <div className='display'
            ref={drawing_target}
            onMouseUp={usageMouseUp}
            onMouseLeave={usageMouseLeave}
            onMouseDown={(event) => {
                mouseDown((event as unknown as MouseEvent), 
                    {
                        acknowledgeContextMenu: () => usage_context_menu = true,
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
            }}
        >
            {children}
        </div>
    );
}

function UsageOptions() {

    

    return (
        <>
            {}
        </>
    );
}

function UsageOption() {
    return (
        <div className='option'></div>
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
