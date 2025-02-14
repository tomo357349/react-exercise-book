import { lazy } from 'react';

import Route from './components/Route.jsx';
import NavLink from './components/NavLink.jsx';
import BrowserRouter from './components/BrowserRouter.jsx';
import Routes from './components/Routes.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import Home from './pages/home/Page.jsx';
// import Routing from './pages/routing/Page.jsx';
const Routing = lazy(() => import('./pages/routing/Page.jsx'));
// import Query from './pages/query/Page.jsx';
const Query = lazy(() => import('./pages/query/Page.jsx'));
// import Search from './pages/search/Page.jsx';
const Search = lazy(() => import('./pages/search/Page.jsx'));
// import UI from './pages/ui/Page.jsx';
const UI = lazy(() => import('./pages/ui/Page.jsx'));

export default function App() {
    return (
        <ToastContainer>
            <ul className="menu">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/routing">Routing</NavLink></li>
                <li><NavLink to="/query">Querystring</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
                <li><NavLink to="/ui">UI</NavLink></li>
            </ul>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="routing/*" element={<Routing />} />
                    <Route path="query/*" element={<Query />} />
                    <Route path="search" element={<Search />} />
                    <Route path="ui" element={<UI />} />
                    <Route path="*" element={<div>Error</div>} />
                </Routes>
            </BrowserRouter>
        </ToastContainer>
    );
}
