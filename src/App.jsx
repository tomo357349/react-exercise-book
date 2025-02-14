import { lazy } from 'react';

import Route from './components/Route.jsx';
import NavLink from './components/NavLink.jsx';
import BrowserRouter from './components/BrowserRouter.jsx';
import Routes from './components/Routes.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import Home from './pages/home/Page.jsx';
import BasicLayout from './layouts/BasicLayout.jsx';
// import Routing from './pages/routing/Page.jsx';
const Routing = lazy(() => import('./pages/routing/Page.jsx'));
// import Query from './pages/query/Page.jsx';
const Query = lazy(() => import('./pages/query/Page.jsx'));
// import Search from './pages/search/Page.jsx';
const Search = lazy(() => import('./pages/search/Page.jsx'));
// import UI from './pages/ui/Page.jsx';
const UI = lazy(() => import('./pages/ui/Page.jsx'));
// import Layout from './pages/layout/Page.jsx';
const Layout = lazy(() => import('./pages/layout/Page.jsx'));

export default function App() {
    const menu = (
        <ul className="menu">
            <li><NavLink to="/">ホーム</NavLink></li>
            <li><NavLink to="/routing">ルーティング検証</NavLink></li>
            <li><NavLink to="/query">クエリストリング検証</NavLink></li>
            <li><NavLink to="/search">検索・登録デモ</NavLink></li>
            <li><NavLink to="/ui">UIサンプル</NavLink></li>
            <li><NavLink to="/layout">レイアウトサンプル</NavLink></li>
        </ul>
    );

    return (
        <ToastContainer>
            <BrowserRouter>
                <Routes template={BasicLayout} menu={menu}>
                    <Route path="" element={<Home />} />
                    <Route path="routing/*" element={<Routing />} />
                    <Route path="query/*" element={<Query />} />
                    <Route path="search" element={<Search />} />
                    <Route path="ui" element={<UI />} />
                    <Route path="layout" element={<Layout />} />
                    <Route path="*" element={<div>Error</div>} />
                </Routes>
            </BrowserRouter>
        </ToastContainer>
    );
}
