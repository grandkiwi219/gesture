import { useContext, useState } from 'react';

import './CSS/Header.css' with { type: 'css' };

import { NavContext } from 'page/App';

import { initial } from 'src/main/consts';
import std from 'page/std';

import utils from 'page/utils/utils';

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

export default function() {

    const nav_context = useContext(NavContext);

    return (
        <>
            <header>
                <button className='opacity'
                    onClick={() => {
                        nav_context?.setNavMenuState({ type: 'execute' });
                    }}
                >
                    <LuMenu size={std.size.icon} />
                </button>
                <div id='title'>{initial}</div>
                <SetTheme></SetTheme>
            </header>
        </>
    );
};
