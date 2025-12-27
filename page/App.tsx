import { useEffect, useReducer, useRef } from 'react';
import { HashRouter } from 'react-router-dom';

import './App.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page from './components/Page';

import std from './std';

import { navMenuReducer } from './utils/reducer';
import { resizeNav } from './utils/decider';


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
		<>
			<Header setNavMenuState={setNavMenuState}></Header>

			<HashRouter>
				<Sidebar state={navMenuState} setState={setNavMenuState}></Sidebar>

				{children}
			</HashRouter>
		</>
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
			<Page></Page>
		</AppControl>
	);
}

// 제스쳐 설정 -> 말 그대로 제스쳐 설정
// 사용 설정 -> 커맨드 표시 크기 조절 혹은 펜 색 변경 등
// 페이지 설정 -> 차단할 페이지

// 도화지 -> 독립적인 이벤트만 송신, 도화지 비우라는 신호 수신 받음
