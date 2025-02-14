import { useCallback, useEffect, useState } from 'react';

import RouterContext from '../contexts/RouterContext.js';
import { createRouteTree, getParams, subscribeState, unsubscribeState } from '../utils/route.js';

createRouteTree(); // ルートを初期化

/**
 * ルータコンポーネント
 *
 * 配下にRoutesとRouteコンポーネントを持ち、URLパスからそれらの設定に従いコンポーネントを選択する
 */
export default function BrowserRouter({ children }) {
	const [params, setParams] = useState();

	const callback = useCallback(() => {
		// Routes処理が始まる前に呼び出す
		createRouteTree(); // ルートを再設定するのでいったんリセット
	}, []);

	const lastCallback = useCallback(() => {
		// Routes処理がすべて終わった後に呼び出す
		setParams(getParams()); // パラメータを取得
	}, [setParams]);

	useEffect(() => {
		subscribeState(callback, { root: true });
		subscribeState(lastCallback, { last: true });

		setParams(getParams());

		return () => {
			unsubscribeState(callback);
			unsubscribeState(lastCallback);
		};
	}, [callback, lastCallback]);

	return <RouterContext value={[params]}>{children}</RouterContext>;
}