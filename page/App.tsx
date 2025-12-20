import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css' with { type: 'css' };

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Home from './page/Home';
import Settings from './page/Settings';

const paths = [
	{
		path: '/',
		element: <Home></Home>,
	},
	{
		path: '/settings',
		element: <Settings></Settings>,
	},
];

export default function () {
	return (
		<>
			<Header></Header>

			<HashRouter>
				<Sidebar></Sidebar>
				<Routes>
					<Route path="/" element={<Home></Home>}></Route>
					<Route path="/settings" element={<Settings></Settings>}></Route>
					<Route path="*" element={<Navigate to="/" replace={true} />} />
				</Routes>
			</HashRouter>
		</>
	);
}
