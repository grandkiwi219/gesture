import React from 'react';
import { NavLink } from 'react-router';

import './Sidebar.css' with { type: 'css' };

import { gestureSetting } from 'page/page/GestureSettings';
import { usageSetting } from 'page/page/UsageSettings';
import { pageSetting } from 'page/page/PageSettings';

import { FaGithub } from "react-icons/fa";
import { BsCursor } from "react-icons/bs";
import { LuMonitor } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";

import packages from '../../package.json' with { type: 'json' };
import p_consts from 'page/p_consts';


const menu = {
    main: 'menu',
    wrap: 'menu-wrap',
    top: 'menu-top',
    bottom: 'menu-bottom',
    active: 'active',
}

function NavA({ Icon, setting }: NavProps) {

    return (
        <NavLink to={setting.path} className={({isActive}) => isActive ? menu.active : undefined}>
            <Icon size={p_consts.icon_size}/>&nbsp;&nbsp;{setting.name}
        </NavLink>
    );
}

function NavWrap({ state, setState, children }: NavWrapProps) {

    return (
        <nav id={menu.main} className={state}
            onClick={(e) => {
                if (state != p_consts.state.nav.none_open) return;

                const target = e.target as HTMLElement;

                if (
                    document.getElementById(menu.wrap)! === target
                    || document.getElementById(menu.top)! === target
                    || document.getElementById(menu.top)!.getElementsByClassName(menu.active)[0].contains(target)
                    || document.getElementById(menu.bottom)!.contains(target)
                ) return;

                setState({ input: p_consts.state.nav.none });
            }}
        >
            {children}
        </nav>
    );
}

function NavMenu({ state, setState }: NavMenuProps) {

    return (
        <NavWrap state={state} setState={setState}>
            <div id={menu.wrap}>
    
                <div id={menu.top}>
                    <NavA Icon={BsCursor} setting={gestureSetting} />
    
                    <NavA Icon={LuMonitor} setting={usageSetting} />
    
                    <NavA Icon={IoNewspaperOutline} setting={pageSetting} />
                </div>
    
                <div id={menu.bottom}>
                    <a href={packages.homepage} target='_blank'><FaGithub /> GitHub</a>
                    <p>Copyright ⓒ 2025. {packages.author} All rights reserved.</p>
                </div>
    
            </div>
        </NavWrap>
    );
}

export default NavMenu;
