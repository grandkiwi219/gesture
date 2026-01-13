import { createContext, useEffect, useReducer, useRef } from 'react';
import { HashRouter } from 'react-router-dom';

import './App.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page from './components/Page';
import Setting, { SettingControl } from './components/Setting';

import std from './std';

import { navMenuReducer } from './utils/reducer';
import { resizeNav } from './utils/decider';

import { setCommand, setOPtions } from 'src/main/process';
import { storageChanged } from 'src/main/event';


export const NavState = createContext<string | null>(null);
export const NavSetter = createContext<((value: React.SetStateAction<any | null>) => void)>(() => {});

function getInitNavShort() {
	let state: boolean;
	try {
		state = JSON.parse(localStorage.getItem(std.key.nav_short) ?? 'false');
	} catch (error) {
		state = false;
	}

	return state;
}

function AppControl({ children }: Props) {

	const navShortState = useRef(getInitNavShort());
	const [navMenuState, setNavMenuState] = useReducer<string, any>(navMenuReducer(navShortState), std.state.nav.none);

	useEffect(() => {
		resizeNav(navShortState, setNavMenuState);

		window.addEventListener('resize', () => {
			resizeNav(navShortState, setNavMenuState);
		});
	}, []);

	return (
		<NavSetter value={setNavMenuState}>
			<NavState value={navMenuState}>
				{children}
			</NavState>
		</NavSetter>
	);
}

export default function() {

	useEffect(() => {
		chrome.runtime.onMessage.addListener(mainStorageChanged);
		async function mainStorageChanged(message: ContentMessage, sender: chrome.runtime.MessageSender, sendResponse: ((response?: any) => void)) {
			await storageChanged(message);

			switch (message?.credit) {
				case 'commands':
					window.dispatchEvent(new Event(std.event.command_loaded));
					break;

				case 'sites':
					window.dispatchEvent(new CustomEvent(std.event.site_loaded, { detail: [...new Set(message.data)] }));
					break;

				case 'options':
					window.dispatchEvent(new Event(std.event.options_loaded));
					break;

				default:
					break;
			}
		}

		setCommand().then(() => {
			window.dispatchEvent(new Event(std.event.command_loaded));
		});

		setOPtions().then(() => {
			window.dispatchEvent(new Event(std.event.options_loaded));
		});
	}, []);

	return (
		<AppControl>
			<Header />

			<SettingControl>
				<HashRouter>
					<Sidebar />
					<Page />
				</HashRouter>
	
				<Setting />
			</SettingControl>
		</AppControl>
	);
}

// 제스쳐 설정 -> 말 그대로 제스쳐 설정
// 사용 설정 -> 커맨드 표시 크기 조절 혹은 펜 색 변경 등
// 페이지 설정 -> 차단할 페이지

// 커맨드 표시 끄기
// 커맨드 이름 끄기
// 커맨드 제스처 그림 끄기

// 커맨드 추가시 중복 경고 -> 덮어씌우겠습니까?

// 커맨드 제스처 그림 제거/변경/끄기(단일)
// 커맨드 제스처 이름 제거/변경/끄기(단일)
// 커맨드 제스처 변경
/*
커맨드 스크립트 변경
ㅡㅡㅡㅡㅡㅡㅡㅡㅡ
|		|		| -> 1. script | 2. custom_script
|		ㅡㅡㅡㅡㅡ     selector       textarea
|				|
|				|
|				|
|				|
|				|
ㅡㅡㅡㅡㅡㅡㅡㅡㅡ

*/
