import { useCallback, useEffect, useRef, useState } from 'react';

import { matchPath, putPath, removePath, subscribeState, unsubscribeState } from '../utils/route.js';

/**
 * 対象の要素にルーティングできるか確認する
 *
 * @param {ReactNode} child 
 * @returns {[ReactNode, {path: string}] | undefined}
 */
function checkChild(child) {
	const childPath = child.props.path || '';
	const matched = matchPath(childPath);
	if (matched) {
		const [path] = matched;
		const route = putPath(path);
		return [child, route];
	}
}

/**
 * ぶら下がったRouteコンポーネントのうち現在のパスに該当するものを選ぶ
 *
 * @param {ReactNode|ReactNode[]} children Routeコンポーネント
 * @returns {[ReactNode, {path: string}]} 選ばれたRouteコンポーネント、パラメータ、ルート
 */
function selectChild(children) {
	if (!Array.isArray(children)) children = [children];

	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		const checked = checkChild(child);
		if (checked) return checked;
	}
}

/**
 * ルート分岐コンポーネント
 *
 * Router配下の任意のノードに配置するコンポーネント。
 * URLパスに従い配下のRouteのうちひとつを選択して描画する。
 */
export default function Routes({ element: Element, children }) {
	const [child, setChild] = useState();
	// const [cnt, setCnt] = useState(0); // 同じchildでも再描画するためのカウンタ
	const routeRef = useRef(null);

	/**
	 * ルートの参照をクリアする
	 */
	const clearRouteRef = useCallback(() => {
		if (!routeRef.current) return;
		if (routeRef.current.route) removePath(routeRef.current.route);
		routeRef.current = null;
	}, []);

	/**
	 * ルートを決定し、ルートの参照にセットする
	 * レンダーのためにchildも更新する
	 */
	const determineRoute = useCallback(() => {
		// setCnt(cnt => (cnt + 1) % 1000); // 1000まででループ
		const selected = selectChild(children);
		if (!selected) return;

		const [nextChild, nextRoute] = selected;
		routeRef.current = {
			child: nextChild,
			route: nextRoute,
		};
		setChild(nextChild);
	}, [children, setChild]);

	/**
	 * state変更後イベントハンドラ
	 */
	const handleStateChange = useCallback(() => {
		determineRoute();
	}, [determineRoute]);

	useEffect(() => {
		subscribeState(handleStateChange);
		determineRoute();

		return () => {
			unsubscribeState(handleStateChange);
			clearRouteRef();
		};
	}, [clearRouteRef, determineRoute, handleStateChange]);

	if (!child) return null;
	// if (Element) return <Element key={cnt}>{child}</Element>;
	// else return <RouteWrapper key={cnt}>{child}</RouteWrapper>;
	if (Element) return <Element>{child}</Element>;
	else return <>{child}</>;
}

/**
 * ルーティングが決定したときに描画するコンポーネントのためのラッパー
 * コンポーネント更新のためにkeyをつけたいのでこのラッパーを挟む
 */
function RouteWrapper({ children }) {
	return <>{children}</>;
}