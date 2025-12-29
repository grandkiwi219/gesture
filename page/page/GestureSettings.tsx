// import './CSS/GestureSettings.css' with { type: 'css' };

import DisplayContainer from 'page/components/DisplayContainer';
import { GCanvas, GControl, GDirs, GDisplay, GSetups } from './components/GestureComponents';
import GridCanvas from 'page/components/GridCanvas';

import { MdAddCircleOutline } from "react-icons/md";



export const gestureSetting: Setting = {
	name: '제스처 설정',
	path: '/',
}

export default function() {
	return (
		<DisplayContainer>
			<GControl>
				<GCanvas>
					<GridCanvas />
				</GCanvas>

				<GDisplay>
					<GSetups />

					<div className='display-base display dirs'>
						<GDirs />
					</div>
				</GDisplay>
			</GControl>

			<>
				<button className="opacity option generate">
					<MdAddCircleOutline size={30} />
				</button>
				<div className="option grab"></div>
			</>
		</DisplayContainer>
	);
}
