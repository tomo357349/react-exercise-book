import useTitle from '../../hooks/useTitle.js';

export default function RoutePage1() {
	console.log('render RoutePage1');
    useTitle('ルーティング | Page1');

	return (
		<div>Page1</div>
	);
}