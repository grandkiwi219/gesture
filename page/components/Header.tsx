import constants from 'page/p_consts';
import assets from 'page/assets';
import { useState } from 'react';
import { LuMenu, LuMoon, LuSun } from "react-icons/lu";

import './Header.css' with { type: 'css' };

import { initial } from 'src/main/consts';
import p_consts from 'page/p_consts';

function SetTheme() {
    
    let [theme, setTheme] = useState(localStorage.getItem(constants.key.theme));

    function clickThemeBtn() {
        localStorage.setItem(
            constants.key.theme,
            theme != constants.Theme.Dark ? constants.Theme.Dark : constants.Theme.Light
        );
        setTheme(() => localStorage.getItem(constants.key.theme))
        assets.decideTheme();
    }

    return (
        <button onClick={clickThemeBtn}>
            {theme == constants.Theme.Dark ? <LuSun size={constants.icon_size} /> : <LuMoon size={constants.icon_size} />}
        </button>
    );
}

export default function({ navMenuState, setNavMenuState }: HeaderProps) {
    return (
        <>
            <header>
                <button className='opacity'
                    onClick={() => {
                        switch(navMenuState) {
                            case p_consts.state.nav.short:
                                setNavMenuState(p_consts.state.nav.long);
                                break;

                            case p_consts.state.nav.none:
                                setNavMenuState(p_consts.state.nav.none_open);
                                break;

                            case p_consts.state.nav.none:
                                setNavMenuState(p_consts.state.nav.none);
                                break;

                            default:
                                setNavMenuState(p_consts.state.nav.short);
                                break;
                        }
                    }}
                >
                    <LuMenu size={constants.icon_size} />
                </button>
                <div id='title'>{initial}</div>
                <SetTheme></SetTheme>
            </header>
        </>
    );
}
