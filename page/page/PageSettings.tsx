import { useEffect, useRef, useState } from 'react';

import './CSS/PageSettings.css' with { type: 'css' };

import std from 'page/std';

import { regex, sites, storage_area } from 'src/main/consts';

import Input, { pleaseInput } from 'page/components/Input';

import { MdPlaylistRemove } from "react-icons/md";


export const pageSetting: Setting = {
    name: '페이지 설정',
    path: '/page'
}

const PS_input_msg = '사이트 도메인 혹은 주소를 입력해주세요.';

function PSSetup() {

    const PS_input = useRef<HTMLInputElement | null>(null);

    return (
        <div className='ps-setup'>
            <Input ref={PS_input} name='ps-input' className='ps-input'
                onKeyDownCase={e => {
                    switch (e.key) {
                        case 'Enter':
                            let site = e.currentTarget.value;

                            if (!site) {
                                pleaseInput(PS_input_msg, e.currentTarget);
                                return;
                            }

                            site = PSCleanUpSite(site);

                            PSSubmit(site);
                            e.currentTarget.value = '';
                            break;

                        default: break;
                    }
                }}
            />

            <button className='ps-submit'
                onClick={e => {
                    if (!PS_input.current) return;

                    let site = PS_input.current.value;

                    if (!site) {
                        pleaseInput(PS_input_msg, PS_input.current);
                        return;
                    }

                    site = PSCleanUpSite(site);

                    PSSubmit(site);
                    PS_input.current.value = '';
                }}
            >추가하기</button>
        </div>
    );
}

function PSSubmit(site: string) {
    chrome.storage[storage_area].get(sites).then(re => {
        if (Array.isArray(re[sites])) {
            chrome.storage[storage_area].set({
                [sites]: [...re[sites], site]
            });
        }
        else {
            chrome.storage[storage_area].set({
                [sites]: [site]
            });
        }
    });
}

function PSCleanUpSite(site: string) {
    let result;

    if (regex.host.test(site)) {
        try {
            result = site.match(regex.host)![0];
        } catch (error) {
            result = site;
            console.error('주소를 호스트만으로 변환하는 과정에서 오류가 발생했습니다:', error);
        }
    }
    else {
        result = site;
    }

    return result;
}


function PSList() {

    const [sitesState, setSitesState] = useState<any[]>([]);

    useEffect(() => {
        function siteLoadedEvent(e: any) {
            const detail = (e as CustomEvent).detail;

            if (!detail) return;

            setSitesState(() => detail);
        }

        window.addEventListener(std.event.site_loaded, siteLoadedEvent);

        chrome.storage[storage_area].get(sites).then(re => {
            const result = re[sites];
            if (Array.isArray(result)) {
                setSitesState(() => result);
            }
            else {
                chrome.storage[storage_area].remove(sites);
            }
        });

        return () => {
            window.removeEventListener(std.event.site_loaded, siteLoadedEvent);
        }
    });

    return (
        <div className='ps-list'>
            {sitesState.map(site => {
                return typeof site != 'string'
                    ? null
                    : (<PSItem key={site} site={site} />);
            })}
        </div>
    );
}

function PSItem({ key, site }: { key: string, site: string }) {
    return (
        <div className='ps-item' key={key}>
            <div className='ps-site'>
                <span>{site}</span>
            </div>
            <button
                onClick={() => {
                    chrome.storage[storage_area].get(sites).then(re => {
                        if (Array.isArray(re[sites])) {
                            chrome.storage[storage_area].set({
                                [sites]: re[sites].filter(s => s != site) 
                            });
                        }
                        else {
                            chrome.storage[storage_area].remove(sites);
                        }
                    });
                }}
            >
                <MdPlaylistRemove size={std.size.icon} />
            </button>
        </div>
    );
}

export default function() {

    return (
        <div className='ps-wrap'>

            <PSSetup />

            <PSList />

        </div>
    );
}
