import constants from 'page/constants';
import assets from 'page/assets';

function SetTheme() {
    return (
        <button
            onClick={() => {
                localStorage.setItem(
                    constants.key.theme,
                    localStorage.getItem(constants.key.theme) != constants.Theme.Dark
                        ? constants.Theme.Dark
                        : constants.Theme.Light,
                );
                assets.decideTheme();
            }}
        >
            누르면 테마가 바껴양!!!!!!!!!!!!!!!!!!!!!!
        </button>
    );
}

export default function () {
    return (
        <div>
            <SetTheme></SetTheme>
        </div>
    );
}
