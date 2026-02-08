import std from "page/std";
import { useEffect, useState } from "react";

import { options } from "src/main/enum";
import { merge } from "src/main/utils/utils";

import { GestureCmdPosition, initial_options } from "service/initial_options";

import '../CSS/UsageOptions.css' with { type: 'css' };

import Input, { InputCheckBox } from "page/components/Input";


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

interface KeyProps extends Props {
    key: any;
}

function UL({ key, children }: KeyProps) {
    return (
        <div key={key} style={{
            width: '100%',
            height: 'fit-content',

            display: 'flex',
            flexFlow: 'column wrap',
            alignItems: 'center',
            gap: '10px'
        }}>
            {children}
        </div>
    );
}

export default function() {

    const [key, setKey] = useState(0);

    let legacy_options: Object = {};

    useEffect(() => {
        legacy_options = JSON.parse(JSON.stringify(options));

        function optionsEvent() {
            legacy_options = JSON.parse(JSON.stringify(options));
            setKey(s => s + 1);
        }

        window.addEventListener(std.event.options_loaded, optionsEvent);

        return () => {
            merge(options, legacy_options);
            window.removeEventListener(std.event.options_loaded, optionsEvent);
        }
    });

    return (
        <UL key={key}>
            <UsagePenSize key="pen-size" />

            <UsagePenColor key="pen-color" />

                    <Divider />

            <UsageCmdDisplay key="cmd-display" />

            <UsageCmdPosition key="cmd-position" />

            {/* <UsageCmdPainting key="cmd-painting" /> */}

            <UsageCmdRate key="cmd-rate" />
            
                    <Divider />

            <UsagePaintingUse key="painting-use" />

                    <Divider />

            <UsageRangeStart key="range-start" />

            <UsageRangeDecide key="range-decide" />
        </UL>
    );
}

/* pen */

function UsagePenSize({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="펜 사이즈" context="사이즈">
            <Input type="number" id={key} style={{ width: '70%' }} value={options.pen.size}
                onChange={e => {
                    options.pen.size = Number(e.currentTarget.value) ?? initial_options.pen.size;
                }}
            />
        </UsageOption>
    );
}

function UsagePenColor({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="펜 색상" context="색상">
            <Input type="color" id={key} style={{ width: '50%', cursor: 'pointer' }} value={options.pen.color} placeholder="색상 선택이 필요합니다."
                onChange={e => {
                    options.pen.color = e.currentTarget.value || initial_options.pen.color;
                }}
            />
        </UsageOption>
    );
}

/* cmd */

function UsageCmdDisplay({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="제스처 명령어 설명 보기">
            <InputCheckBox id={key} checked={options.cmd.visible} context="설명 보기"
                onChange={e => {
                    options.cmd.visible = e.currentTarget.checked ?? initial_options.cmd.visible;
                }}
            />
        </UsageOption>
    );
}

function UsageCmdPosition({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="제스처 명령어 설명 위치" context="위치">
            <select defaultValue={options.cmd.position}
                onChange={e => {
                    options.cmd.position = e.target.value as GestureCmdPosition;
                }}
            >
                {Object.values(GestureCmdPosition).map(pos => {
                    return (
                        <option value={pos}>{pos}</option>
                    );
                })}
            </select>
        </UsageOption>
    );
}

function UsageCmdRate({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="제스처 명령어 설명 크기 비율" context="크기 비율">
            <Input type="number" id={key} style={{ width: '70%' }} value={options.cmd.rate}
                onChange={e => {
                    options.cmd.rate = Number(e.currentTarget.value) || initial_options.cmd.rate;
                }}
            />
        </UsageOption>
    );
}

/* painting */

function UsagePaintingUse({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="제스처 그리기 사용">
            <InputCheckBox id={key} checked={options.painting.use} context="그리기 사용"
                onChange={e => {
                    options.painting.use = e.currentTarget.checked ?? initial_options.painting.use;
                }}
            />
        </UsageOption>
    );
}

/* range */

function UsageRangeStart({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="제스처 시작 범위" context="범위">
            <Input type="number" id={key} style={{ width: '70%' }} value={options.range.start}
                onChange={e => {
                    options.range.start = Number(e.currentTarget.value) || initial_options.range.start;
                }}
            />
        </UsageOption>
    );
}

function UsageRangeDecide({ key }: UsageKey) {
    return (
        <UsageOption key={key} title="제스처 새로운 방향 감지 범위" context="범위">
            <Input type="number" id={key} style={{ width: '70%' }} value={options.range.decide}
                onChange={e => {
                    options.range.decide = Number(e.currentTarget.value) || initial_options.range.decide;
                }}
            />
        </UsageOption>  
    );
}
