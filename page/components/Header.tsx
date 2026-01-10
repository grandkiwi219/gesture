import { useContext, useState } from 'react';

import './CSS/Header.css' with { type: 'css' };

import { NavSetter } from 'page/App';

import { initial } from 'src/main/consts';
import std from 'page/std';

import utils from 'page/utils/utils';

import { LuMenu, LuMoon, LuSun } from "react-icons/lu";


function SetTheme() {    
    let [theme, setTheme] = useState(localStorage.getItem('theme'));

    function clickThemeBtn() {
        localStorage.setItem(
            'theme',
            theme != 'dark' ? 'dark' : 'light'
        );
        setTheme(() => localStorage.getItem('theme'));
        decideTheme();
    }

    return (
        <button onClick={clickThemeBtn}>
            {theme == 'dark' ? <LuSun size={std.size.icon} /> : <LuMoon size={std.size.icon} />}
        </button>
    );
}

export default function() {

    const setNavState = useContext(NavSetter);

    return (
        <>
            <header>
                <button className='opacity'
                    onClick={() => {
                        setNavState({ type: 'execute' });
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
