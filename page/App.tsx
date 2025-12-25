import { HashRouter } from 'react-router-dom';

import './App.css' with { type: 'css' };
import './CSS/Buttons.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Page from './components/Page';
import { useReducer } from 'react';
import p_consts from './p_consts';


function navMenuReducer(state: any, { type, input }: { type?: string, input?: string }) {
	if (type == 'execute') {
		switch(state) {
			case p_consts.state.nav.short:
				localStorage.setItem(p_consts.key.nav, p_consts.state.nav.long);
				return p_consts.state.nav.long;

			case p_consts.state.nav.none:
				localStorage.setItem(p_consts.key.nav, p_consts.state.nav.none);
				return p_consts.state.nav.none_open;

			case p_consts.state.nav.none_open:
				localStorage.setItem(p_consts.key.nav, p_consts.state.nav.none);
				return p_consts.state.nav.none;

			default:
				localStorage.setItem(p_consts.key.nav, p_consts.state.nav.short);
				return p_consts.state.nav.short;
		}
	}
	else {
		switch (input) {
			case p_consts.state.nav.short:
				localStorage.setItem(p_consts.key.nav, p_consts.state.nav.short);
				return p_consts.state.nav.short;

			case p_consts.state.nav.none:
				localStorage.setItem(p_consts.key.nav, p_consts.state.nav.none);
				return p_consts.state.nav.none;

			case p_consts.state.nav.none_open:
				localStorage.setItem(p_consts.key.nav, p_consts.state.nav.none);
				return p_consts.state.nav.none_open;

			default:
				localStorage.removeItem(p_consts.key.nav);
				return p_consts.state.nav.long;

		}
	}
}

function AppControl({ children }: Props) {

	let init_nav_state;

	try {
		init_nav_state = localStorage.getItem(p_consts.key.nav) ?? p_consts.state.nav.long;
	} catch (error) {
		init_nav_state = p_consts.state.nav.long;
	}

	const [navMenuState, setNavMenuState] = useReducer<string, any>(navMenuReducer, init_nav_state);

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
