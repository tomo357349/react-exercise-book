import useRouterParams from '../../hooks/useRouterParams.js';
import useTitle from '../../hooks/useTitle.js';

export default function RoutePage2Query() {
	console.log('render RoutePage2Query');

	const { id, name } = useRouterParams();

	useTitle('ルーティング | Page2 | ' + id + ' | ' + name);

	return (
		<>
			<h3>Query</h3>
			<div>id: {id}, name: {name}</div>
		</>
	);
}