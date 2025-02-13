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
		subscribeState(callback, true);
		subscribeState(lastCallback, false, true);

		setParams(getParams());

		return () => {
			unsubscribeState(callback);
			unsubscribeState(lastCallback);
		};
	}, [callback, lastCallback]);

	// 開発用
	if (process.env.NODE_ENV === 'development') {
		// 本番用のログインページはReactアプリケーション内におかないため、開発用のログインページを表示する
		if (location.pathname === '/login') {
			return (
				<main style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, display: "grid", gridTemplateRows: "1fr auto 1fr", gridTemplateColumns: "1fr auto 1fr"}}>
					<article style={{gridRow: 2, gridColumn: 2, textAlign: "center"}}>
						<h1>開発用ログインページ</h1>
						<div>ユーザID: u0001</div>
						<div>ユーザ名: 山田太郎</div>
						<button onClick={() => location.href = '/'}>ログイン</button>
					</article>
				</main>
			);
		}
	}

	return <RouterContext value={[params]}>{children}</RouterContext>;
}