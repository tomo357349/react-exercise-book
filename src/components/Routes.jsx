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
export default function Routes({ template: Template, children, ...templateProps }) {
	// childrenがダイナミックに変化することを許容しないので最初にrefにいれておきそっちを使う
	const refChildren = useRef(children);

	// とはいえ変更は一応反映する（パフォーマンスが悪ければこのコードは削除する
	useEffect(() => {
		refChildren.current = children;
	}, [children]);

	const [child, setChild] = useState();
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
		const selected = selectChild(refChildren.current);
		if (!selected) return;

		const [nextChild, nextRoute] = selected;
		routeRef.current = {
			child: nextChild,
			route: nextRoute,
		};
		setChild(nextChild);
	}, [setChild]);

	useEffect(() => {
		subscribeState(determineRoute);
		determineRoute();

		return () => {
			unsubscribeState(determineRoute);
			clearRouteRef();
		};
	}, [clearRouteRef, determineRoute]);

	if (!child) return null;
	if (Template) return <Template {...templateProps}>{child}</Template>;
	else return <>{child}</>;
}
