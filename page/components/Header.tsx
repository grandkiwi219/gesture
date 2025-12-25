import React from 'react';

import constants from 'page/p_consts';
import assets from 'page/assets';
import { useState } from 'react';
import { LuMenu, LuMoon, LuSun } from "react-icons/lu";

import './Header.css' with { type: 'css' };

import { initial } from 'src/main/consts';


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

function Header({ setNavMenuState }: HeaderProps) {

    return (
        <>
            <header>
                <button className='opacity'
                    onClick={() => {
                        setNavMenuState({ type: 'execute' });
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

export default React.memo(Header);
