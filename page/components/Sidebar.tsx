import { useContext } from 'react';
import { NavLink } from 'react-router';

import './CSS/Sidebar.css' with { type: 'css' };

import { NavSetter, NavState } from 'page/App';
import { gestureSetting } from 'page/page/GestureSettings';
import { usageSetting } from 'page/page/UsageSettings';
import { pageSetting } from 'page/page/PageSettings';

import packages from '../../package.json' with { type: 'json' };
import std from 'page/std';

import { FaGithub } from "react-icons/fa";
import { BsCursor } from "react-icons/bs";
import { LuMonitor } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";


const menu = {
    main: 'menu',
    wrap: 'menu-wrap',
    top: 'menu-top',
    bottom: 'menu-bottom',
    active: 'active',
}

/* import { MdOutlineOpenInNew } from "react-icons/md";
<MdOutlineOpenInNew /> */

function NavA({ Icon, setting }: NavProps) {

    return (
        <NavLink to={setting.path} className={({isActive}) => isActive ? menu.active : undefined}>
            <Icon size={std.size.icon}/>&nbsp;&nbsp;{setting.name}
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

function NavMenu() {
    return (
        <NavControl>
            <div id={menu.wrap}>
    
                <div id={menu.top}>
                    <NavA Icon={BsCursor} setting={gestureSetting} />
    
                    <NavA Icon={LuMonitor} setting={usageSetting} />
    
                    <NavA Icon={IoNewspaperOutline} setting={pageSetting} />
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
