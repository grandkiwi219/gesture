import { ChangeEvent, CSSProperties, HTMLInputTypeAttribute, KeyboardEventHandler, RefObject } from "react";

import './CSS/Input.css' with { type: 'css' };

import utils from "page/utils/utils";


export default function({
    id,
    name,
    ref,
    className,
    style,
    type,
    placeholder,
    value,
    onKeyDownCase,
    onChange
}: {
    id?: string,
    name?: string,
    ref?: RefObject<any>,
    className?: string,
    style?: CSSProperties,
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    value?: string,
    onKeyDownCase?: KeyboardEventHandler<HTMLInputElement>,
    onChange?: ((e: ChangeEvent<HTMLInputElement>) => void)
}) {
    return (
        <input id={id} name={name} ref={ref} className={'input ' + (className ?? '')} style={style}
            type={type ?? 'text'} 
            placeholder={placeholder ?? '작성이 필요합니다.'}
            defaultValue={value}
            onKeyDown={(e) => {
                if (
                    e.altKey
                    || e.shiftKey
                    || e.ctrlKey
                    || e.metaKey
                ) return;

                switch (e.key) {
                    case 'Escape':
                        document.documentElement.focus();
                        break;

                    default:
                        onKeyDownCase && onKeyDownCase(e);
                        break;
                }
            }}
            onChange={e => {
                if (e.currentTarget.classList.contains('warning')) {
                    e.currentTarget.classList.remove('warning');
                }



                onChange && onChange(e);
            }}
        />
    );
}

export async function pleaseInput(msg: string, target: HTMLElement){
	target.focus();
	target.classList.add('warning');
	utils.showAlert({ type: 'error', msg: msg });
	target.style.transform = 'translateX(-5px)';
	await utils.setDelay(120);
	target.style.transform = 'translateX(5px)';
	await utils.setDelay(120);
	target.style.transform = '';
}
