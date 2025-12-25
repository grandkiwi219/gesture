import { useEffect } from 'react';

import './_pages.css' with { type: 'css' };

import std from 'page/std';
import utils from 'page/utils';

import { MdAddCircleOutline } from "react-icons/md";

export const gestureSetting: Setting = {
	name: '제스처 설정',
	path: '/',
}

export default function() {
	console.log('제스처')

	useEffect(() => {
		const canvas = document.getElementsByClassName('display')[0] as HTMLCanvasElement;

		canvas.width = std.size.display;
		canvas.height = std.size.display;
		
		utils.drawBoard(canvas.getContext("2d")!);
	}, []);

	return (
		<div className="container">
			<div className="display-container">
				<canvas className="display" />
			</div>

			<div className="options-container">
				<div className="option"></div>
				<button className="opacity option generate">
					<MdAddCircleOutline size="30px" />
				</button>
			</div>
		</div>
	);
}
