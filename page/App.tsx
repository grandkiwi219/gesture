import { useEffect, useReducer } from 'react';
import { HashRouter } from 'react-router-dom';

import './App.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page from './components/Page';

import std from './std';

import { navMenuReducer } from './utils/reducer';


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

// 도화지 -> 독립적인 이벤트만 송신, 도화지 비우라는 신호 수신 받음
