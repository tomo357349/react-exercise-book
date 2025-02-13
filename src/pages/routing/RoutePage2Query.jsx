import useRouterParams from '../../hooks/useRouterParams.js';

export default function RoutePage2Query() {
	console.log('render RoutePage2Query');

	const { id, name } = useRouterParams();

	return (
		<>
			<h3>Query</h3>
			<div>id: {id}, name: {name}</div>
		</>
	);
}