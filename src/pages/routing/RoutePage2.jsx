import Route from "../../components/Route.jsx";
import Routes from "../../components/Routes.jsx";
import RoutePage2Sub from './RoutePage2Sub.jsx';

export default function RoutePage2() {
	console.log('render RoutePage2');

	return (
		<Routes>
			<Route path="" element={<div>xxx</div>} />
			<Route path=":id/*" element={<RoutePage2Sub />} />
		</Routes>
	);
}
