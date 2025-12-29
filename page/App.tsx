import { ActionDispatch, createContext, useEffect, useReducer, useRef } from 'react';
import { HashRouter } from 'react-router-dom';

import './App.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page from './components/Page';

import std from './std';

import { navMenuReducer } from './utils/reducer';
import { resizeNav } from './utils/decider';


export const NavContext = createContext<{
	navMenuState: string,
	setNavMenuState: ActionDispatch<any>
} | null>(null);

function AppControl({ init_nav_state, init_nav_short_state, children }: AppProps) {

	const navShortState = useRef(init_nav_short_state);
	const [navMenuState, setNavMenuState] = useReducer<string, any>(navMenuReducer(navShortState), init_nav_state);

	useEffect(() => {
		resizeNav(navShortState, setNavMenuState);

		window.addEventListener('resize', () => {
			resizeNav(navShortState, setNavMenuState);
		});
	}, []);

	return (
		<NavContext value={{
			navMenuState,
			setNavMenuState
		}}>
			{children}
		</NavContext>
	);
}

export default function() {

	let init_nav_state: string;
	try {
		init_nav_state = localStorage.getItem(std.key.nav) ?? std.state.nav.long;
	} catch (error) {
		init_nav_state = std.state.nav.long;
	}

	let init_nav_short_state: boolean;
	try {
		init_nav_short_state = JSON.parse(localStorage.getItem(std.key.nav_short) ?? 'false');
	} catch (error) {
		init_nav_short_state = false;
	}

	return (
		<AppControl init_nav_state={init_nav_state} init_nav_short_state={init_nav_short_state}>
			<Header></Header>

			<HashRouter>

				<Sidebar></Sidebar>

				<Page></Page>

			</HashRouter>
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
