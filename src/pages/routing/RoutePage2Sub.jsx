import Route from '../../components/Route.jsx';
import NavLink from '../../components/NavLink.jsx';
import Routes from '../../components/Routes.jsx';
import useRouterParams from '../../hooks/useRouterParams.js';
import RoutePage2Query from './RoutePage2Query.jsx';
import useTitle from '../../hooks/useTitle.js';

export default function RoutePage2Sub() {
	console.log('render RoutePage2Sub');

	const { id } = useRouterParams();

	useTitle('ルーティング | Page2 | ' + id);

	return (
		<article>
			<h2>Page2</h2>
			<div>id: {id}</div>
			<ul>
				<li><NavLink to="/routing">go to rtsample</NavLink></li>
				<li><NavLink to="/routing/page2/1">go to page2/1</NavLink></li>
				<li><NavLink to="/routing/page2/2">go to page2/2</NavLink></li>
				<li><NavLink to="/routing/page2/2/xxx">go to page2/2/xxx</NavLink></li>
				<li><NavLink to="/routing/page2/3/yyy">go to page2/3/yyy</NavLink></li>
			</ul>
			<Routes>
				<Route path="" element={<>void</>} />
				<Route path=":name" element={<RoutePage2Query />} />
			</Routes>
		</article>
	);
}