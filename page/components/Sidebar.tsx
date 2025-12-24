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


function NavA({ Icon, to, children }: NavProps) {
    return (
        <NavLink to={to} className={({isActive}) => isActive ? 'active' : undefined}><Icon size={p_consts.icon_size}/>&nbsp;&nbsp;{children}</NavLink>
    );
}

export default function({ state }: NavMenuProps) {
    return (
        <>
            <nav id="menu" className={state}>
                <div id='menu-wrap'>
                    <div id='menu-top'>
                        <NavA Icon={BsCursor} to={gestureSetting.path}>
                            {gestureSetting.name}
                        </NavA>

                        <NavA Icon={LuMonitor} to={usageSetting.path}>
                            {usageSetting.name}
                        </NavA>

                        <NavA Icon={IoNewspaperOutline} to={pageSetting.path}>
                            {pageSetting.name}
                        </NavA>
                    </div>
                    <div id='menu-bottom'>
                        <a href={packages.homepage} target='_blank'><FaGithub /> GitHub</a>
                        <p>Copyright ⓒ 2025. {packages.author} All rights reserved.</p>
                    </div>
                </div>
            </nav>
        </>
    );
}
