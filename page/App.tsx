import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css' with { type: 'css' };
import './CSS/Buttons.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import GestureSettings, { gestureSetting } from './page/GestureSettings';
import UsageSettings, { usageSetting } from './page/UsageSettings';
import PageSettings, { pageSetting } from './page/PageSettings';
import Page from './components/Page';
import { useReducer } from 'react';
import p_consts from './p_consts';


export default function() {

	function navMenuReducer(state: any, action: string) {
		switch (action) {
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

	const init_nav_state = localStorage.getItem(p_consts.key.nav);

	const [navMenuState, setNavMenuState] = useReducer(navMenuReducer, 
		typeof init_nav_state == 'string'
		? init_nav_state
		: p_consts.state.nav.long
	);

	return (
		<>
			<Header navMenuState={navMenuState} setNavMenuState={setNavMenuState}></Header>

			<HashRouter>
				<Sidebar state={navMenuState}></Sidebar>

				<Page>
					<Routes>
						<Route path={gestureSetting.path} element={<GestureSettings></GestureSettings>}></Route>
						<Route path={usageSetting.path} element={<UsageSettings></UsageSettings>}></Route>
						<Route path={pageSetting.path} element={<PageSettings></PageSettings>}></Route>
						<Route path="*" element={<Navigate to={gestureSetting.path} replace={true} />} />
					</Routes>
				</Page>
			</HashRouter>
		</>
	);
}

// 제스쳐 설정 -> 말 그대로 제스쳐 설정
// 사용 설정 -> 커맨드 표시 크기 조절 혹은 펜 색 변경 등
// 페이지 설정 -> 차단할 페이지
