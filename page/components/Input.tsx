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
    ref?: React.RefObject<any>,
    className?: string,
    style?: React.CSSProperties,
    type?: React.HTMLInputTypeAttribute,
    placeholder?: string,
    value?: any,
    onKeyDownCase?: React.KeyboardEventHandler<HTMLInputElement>,
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void)
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

export function InputCheckBox({
    id,
    name,
    checked,
    context,
    style,
    onChange
}: {
    id?: string,
    name?: string,
    checked?: boolean,
    context: string,
    style?: React.CSSProperties
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void)
}) {
    return (
        <label style={{
            width: '100%',
            height: 'fit-content',

            display: 'flex',
            alignItems: 'center',
            gap: '10px',

            userSelect: 'none',
            cursor: 'pointer',

            ...style
        }}>
            <input id={id} name={name} type="checkbox" defaultChecked={checked}
                onChange={onChange}
            />
            <span style={{ width: '100%' }}>{context}</span>
        </label>
    );
}
