import { HashRouter } from 'react-router-dom';

import './App.css' with { type: 'css' };
import './CSS/Buttons.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Page from './components/Page';
import { useEffect, useReducer } from 'react';
import std from './std';


function navMenuReducer(state: any, { type, input }: { type?: 'execute' | null, input?: string }) {
	if (type == 'execute') {
		switch(state) {
			case std.state.nav.short:
				localStorage.setItem(std.key.nav, std.state.nav.long);
				return std.state.nav.long;

			case std.state.nav.icon:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon_open;

			case std.state.nav.icon_open:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon;

			case std.state.nav.none:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none_open;

			case std.state.nav.none_open:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none;

			default:
				localStorage.setItem(std.key.nav, std.state.nav.short);
				return std.state.nav.short;
		}
	}
	else {
		switch (input) {
			case std.state.nav.short:
				localStorage.setItem(std.key.nav, std.state.nav.short);
				return std.state.nav.short;

			case std.state.nav.icon:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon;

			case std.state.nav.icon_open:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon_open;

			case std.state.nav.none:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none;

			case std.state.nav.none_open:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none_open;

			default:
				localStorage.removeItem(std.key.nav);
				return std.state.nav.long;

		}
	}
}

function AppControl({ children }: Props) {

	let init_nav_state;

	try {
		init_nav_state = localStorage.getItem(std.key.nav) ?? std.state.nav.long;
	} catch (error) {
		init_nav_state = std.state.nav.long;
	}

	const [navMenuState, setNavMenuState] = useReducer<string, any>(navMenuReducer, init_nav_state);

	useEffect(() => {
		window.addEventListener('resize', () => {
			const width = window.innerWidth;

			if (width >= std.size.nav.long) {
				setNavMenuState({ input: std.state.nav.long });
			}
			else if (width >= std.size.nav.short) {
				setNavMenuState({ input: std.state.nav.short });
			}
			else if (width >= std.size.nav.icon) {
				setNavMenuState({ input: std.state.nav.icon });
			}
			else {
				setNavMenuState({ input: std.state.nav.none });
			}
		});
	}, []);

	// nav_short 스토리지 만들어서 롱 상태에서 접었을 당시 쇼츠로 변환한 것을 기억하게 하기

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
	return (
		<AppControl>
			<Page></Page>
		</AppControl>
	);
}

// 제스쳐 설정 -> 말 그대로 제스쳐 설정
// 사용 설정 -> 커맨드 표시 크기 조절 혹은 펜 색 변경 등
// 페이지 설정 -> 차단할 페이지
