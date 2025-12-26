import { memo, useState } from 'react';

import './Header.css' with { type: 'css' };

import { initial } from 'src/main/consts';
import std from 'page/std';

import utils from 'page/utils';

import { LuMenu, LuMoon, LuSun } from "react-icons/lu";


function SetTheme() {
    
    let [theme, setTheme] = useState(localStorage.getItem(std.key.theme));

    function clickThemeBtn() {
        localStorage.setItem(
            std.key.theme,
            theme != std.Theme.Dark ? std.Theme.Dark : std.Theme.Light
        );
        setTheme(() => localStorage.getItem(std.key.theme))
        utils.decideTheme();
    }

    return (
        <button onClick={clickThemeBtn}>
            {theme == std.Theme.Dark ? <LuSun size={std.size.icon} /> : <LuMoon size={std.size.icon} />}
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
                    <LuMenu size={std.size.icon} />
                </button>
                <div id='title'>{initial}</div>
                <SetTheme></SetTheme>
            </header>
        </>
    );
}

export default memo(Header);
