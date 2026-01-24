import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import './CSS/Sidebar.css' with { type: 'css' };

import { NavSetter, NavState } from 'page/App';
import { gestureSetting } from 'page/page/GestureSettings';
import { usageSetting } from 'page/page/UsageSettings';
import { pageSetting } from 'page/page/PageSettings';

import packages from '../../package.json' with { type: 'json' };

import std from 'page/std';
import { decideWarnEffect, decideWarnState } from 'page/utils/decider';

import { IconType } from 'react-icons';
import { FaGithub } from "react-icons/fa";
import { BsCursor } from "react-icons/bs";
import { LuMonitor } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineOpenInNew } from "react-icons/md";

import { isFirefox } from 'src/isFirefox';
import { chromeVersion } from 'src/chromeVersion';

import { isUserScriptsAvailable } from 'service/utils';


const menu = {
    main: 'menu',
    wrap: 'menu-wrap',
    top: 'menu-top',
    bottom: 'menu-bottom',
    active: 'active',
}

function NavIcon({ Icon, name }: { Icon: IconType, name: string }) {
    return (
        <>
            <Icon size={std.size.icon}/>&nbsp;&nbsp;<span>{name}</span>
        </>
    );
}

function NavA({ Icon, setting }: NavProps) {

    return (
        <NavLink to={setting.path} className={({isActive}) => isActive ? menu.active : undefined}>
            <NavIcon Icon={Icon} name={setting.name} />
        </NavLink>
    );
}

function NavControl({ children }: Props) {

    const navState = useContext(NavState);
    const setNavState = useContext(NavSetter);

    return (
        <nav id={menu.main} className={navState || ''}
            onClick={(e) => {
                if (
                    navState != std.state.nav.none_open
                    && navState != std.state.nav.icon_open
                ) return;

                const target = e.target as HTMLElement;

                if (
                    document.getElementById(menu.wrap)! === target
                    || document.getElementById(menu.top)! === target
                    || document.getElementById(menu.top)!.getElementsByClassName(menu.active)[0].contains(target)
                    || document.getElementById(menu.bottom)!.contains(target)
                ) return;

                setNavState({ type: 'execute' });
            }}
        >
            {children}
        </nav>
    );
}

function NavUserScriptsDoc() {
    
    const [warnState, setWarnState] = useState<boolean>(decideWarnState());

    useEffect(() => {
        return new decideWarnEffect(warnState, setWarnState).execute();
    });

    return (
        <a href={std.document.doc + (chromeVersion >= 138 ? '' : '#'+std.document.on_developer_mode)} target='_blank'
            style={{
                display: warnState ? '': 'none'
            }}
        >
            <NavIcon Icon={MdOutlineOpenInNew} name='사용자 지정 스크립트 안내서' />
        </a>
    );
}

function NavMenu() {
    return (
        <NavControl>
            <div id={menu.wrap}>
    
                <div id={menu.top}>
                    <NavA Icon={BsCursor} setting={gestureSetting} />
    
                    <NavA Icon={LuMonitor} setting={usageSetting} />
    
                    <NavA Icon={IoNewspaperOutline} setting={pageSetting} />

                    <NavUserScriptsDoc />
                </div>
    
                <div id={menu.bottom}>
                    <a href={packages.homepage} target='_blank'><FaGithub /> GitHub</a>
                    <p>Copyright ⓒ 2025. grandkiwi219 All rights reserved.</p>
                </div>
    
            </div>
        </NavControl>
    );
}

export default NavMenu;
