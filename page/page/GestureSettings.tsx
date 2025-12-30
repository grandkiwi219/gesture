import DisplayContainer from 'page/components/DisplayContainer';

import { GOptions } from './components/GestureOptions';
import { GCanvas, GControl, GDirs, GDisplay, GSetups } from './components/GestureDisplay';

import GridCanvas from 'page/components/GridCanvas';



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

			<GOptions />
		</DisplayContainer>
	);
}
