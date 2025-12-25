import { Navigate, Route, Routes } from 'react-router-dom';

import './Page.css' with { type: 'css' };

import GestureSettings, { gestureSetting } from 'page/page/GestureSettings';
import UsageSettings, { usageSetting } from 'page/page/UsageSettings';
import PageSettings, { pageSetting } from 'page/page/PageSettings';

export default function() {

    return (
        <div id="page">
            <div className="paper">
                <Routes>
                    <Route path={gestureSetting.path} element={<GestureSettings></GestureSettings>}></Route>
                    <Route path={usageSetting.path} element={<UsageSettings></UsageSettings>}></Route>
                    <Route path={pageSetting.path} element={<PageSettings></PageSettings>}></Route>
                    <Route path="*" element={<Navigate to={gestureSetting.path} replace={true} />} />
                </Routes>
            </div>
        </div>
    );
}
