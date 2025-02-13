import Route from '../../components/Route.jsx';
import NavLink from '../../components/NavLink.jsx';
import Routes from '../../components/Routes.jsx';
import RoutePage1 from './RoutePage1.jsx';
import RoutePage2 from './RoutePage2.jsx';

export default function Page() {
	return (
		<article>
			<h1>Router Sample</h1>
			<ul>
				<li><NavLink to="/routing/page1">page1</NavLink></li>
				<li><NavLink to="/routing/page2">page2</NavLink></li>
				<li><NavLink to="/routing/page2/1">page2/1</NavLink></li>
				<li><NavLink to="/routing/page2/2">page2/2</NavLink></li>
			</ul>
			<hr />
			<Routes>
				<Route path="page1" element={<RoutePage1 />} />
				<Route path="page2/*" element={<RoutePage2 />} />
			</Routes>
		</article>
	);
}