import std from "page/std";
import { useEffect, useRef, useState } from "react";

import { options } from "src/main/assets/consts";
import { merge } from "src/main/utils/utils";

import { initial_options } from "service/initial_options";

import '../CSS/UsageOptions.css' with { type: 'css' };

import Input from "page/components/Input";


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
            <UsagePenSize key="size" />

            <UsagePenColor key="color" />
        </>
    );
}

function UsageOption() {
    return (
        <div className='option usage'></div>
    );
}

function UsagePenSize({ key }: { key: string }) {
    return (
        <div key={key} className='option usage'>
            <div className="option-title">
                펜 사이즈
            </div>

            <div className="option-setup">
                <span>사이즈:</span>
                <Input name="usage-pen-size" style={{ width: '70%' }} value={JSON.stringify(options.pen.size)}
                    onChange={e => {
                        options.pen.size = Number(e.currentTarget.value) || initial_options.pen.size;
                    }}
                />
            </div>
        </div>
    );
}

function UsagePenColor({ key }: { key: string }) {
    return (
        <div key={key} className='option usage'>
            <div className="option-title">
                펜 색상
            </div>

            <div className="option-setup">
                <span>색상:</span>
                <Input type="color" name="usage-pen-size" style={{ width: '50%', cursor: 'pointer' }} value={options.pen.color} placeholder="색상 선택이 필요합니다."
                    onChange={e => {
                        options.pen.color = e.currentTarget.value || initial_options.pen.color;
                    }}
                />
            </div>
        </div>
    );
}
