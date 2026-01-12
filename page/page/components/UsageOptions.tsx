import std from "page/std";
import { useEffect } from "react";

import { options } from "src/main/consts";
import { merge } from "src/main/utils/utils";

import { initial_options } from "service/initial_options";

import '../CSS/UsageOptions.css' with { type: 'css' };

import Input from "page/components/Input";


interface UsageKey {
    key: string;
}

interface UsageProps extends Props {
    key: string;
    title: string;
    context?: string;
}

function Divider() {
    return (
        <div className='option divider' />
    );
}

function UsageOption({ key, title, context, children }: UsageProps) {
    return (
        <div key={key} className='option usage'>
            <div className="option-title">
                {title}
            </div>

            <div className="option-setup">
                {context ? <span>{context}:</span> : null}
                {children}
            </div>
        </div>
    );
}

export default function() {

    let legacy_options: Object = {};

    useEffect(() => {
        legacy_options = JSON.parse(JSON.stringify(options));

        function optionsEvent() {
            legacy_options = JSON.parse(JSON.stringify(options));
        }

        window.addEventListener(std.event.options_loaded, optionsEvent);

        return () => {
            merge(options, legacy_options);
            window.removeEventListener(std.event.options_loaded, optionsEvent);
        }
    });

    return (
        <>
            <UsagePenSize key="pen-size" />

            <UsagePenColor key="pen-color" />

            <Divider />

            <UsageGestureCmdDisplay key="gesture-cmd-display" />
        </>
    );
}

function UsagePenSize({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="펜 사이즈" context="사이즈">
            <Input name="usage-pen-size" style={{ width: '70%' }} value={options.pen.size}
                onChange={e => {
                    options.pen.size = Number(e.currentTarget.value) || initial_options.pen.size;
                }}
            />
        </UsageOption>
    );
}

function UsagePenColor({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="펜 색상" context="색상">
            <Input type="color" name="usage-pen-size" style={{ width: '50%', cursor: 'pointer' }} value={options.pen.color} placeholder="색상 선택이 필요합니다."
                onChange={e => {
                    options.pen.color = e.currentTarget.value || initial_options.pen.color;
                }}
            />
        </UsageOption>
    );
}

function UsageGestureCmdDisplay({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="제스처 명령어 설명 보기">
            <div style={{
                width: '100%',
                height: 'fit-content',

                display: 'flex'
            }}>
                <input id="usage-gesture-cmd-display" type="checkbox" defaultChecked={options.gesture.cmd.display}
                    style={{
                      cursor: 'pointer'  
                    }}
                    onChange={e => {
                        options.gesture.cmd.display = e.currentTarget.checked;
                    }}
                />
                <label htmlFor="usage-gesture-cmd-display" style={{
                    padding: '0px 10px',
                    userSelect: 'none',
                    cursor: 'pointer',
                    flexGrow: '1'
                }}><span style={{ width: '100%' }}>설명 보기</span></label>
            </div>
        </UsageOption>
    );
}
