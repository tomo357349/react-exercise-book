import { useCallback, useEffect, useRef, useState } from 'react';

import { isSame } from '../utils/object.js';
import { subscribeState, unsubscribeState } from '../utils/route.js';
import { getQueryObject, updateQueryString } from '../utils/querystring.js';

/**
 * クエリストリングの読み取りと書き込みを行うメソッドを返す
 *
 * @param {object} defaultParams パラメータオブジェクトの初期値（クエリストリングは、このオブジェクトのプロパティ値のデータ型をもとにパースされる。このオブジェクトに設定していないプロパティは、クエリストリングにあっても無視される。）
 * @param {boolean} ignoreStateChange stateの変更をウォッチしない場合true（この値は、レンダー内で変化させても反映されない）
 * @returns {[object, (object, boolean) => object]}
 */
export default function useQueryString(defaultParams, ignoreStateChange) {
	// defaultParamsをメモ化
	const oldParams = useRef(defaultParams);
	if (!isSame(oldParams.current, defaultParams)) {
		oldParams.current = defaultParams;
	}

	// ignoreStateChangeをメモ化（初期値から変わらないと想定）
	const ignore = useRef(ignoreStateChange);

	/**
	 * クエリストリングからクエリオブジェクトを作成する
	 */
	const getQuery = useCallback(() => {
		return getQueryObject(oldParams.current, true);
	}, []);

	// クエリオブジェクト
	const [query, setQuery] = useState(getQuery());

	/**
	 * クエリオブジェクトを更新する
	 */
	const updateQuery = useCallback(() => {
		const nextQuery = getQuery();
		setQuery(nextQuery);
		return nextQuery;
	}, [getQuery, setQuery]);

	useEffect(() => {
		if (!ignore) subscribeState(updateQuery, { watch: true });

		return () => {
			if (!ignore) unsubscribeState(updateQuery);
		};
	}, [updateQuery]);

	/**
	 * クエリオブジェクトをクエリストリングに反映する
	 */
	const handleSetQuery = useCallback((q, replaced) => {
		if (!q) return updateQuery();

		updateQueryString(q, replaced);
		return updateQuery();
	}, [updateQuery]);

	return [query, handleSetQuery];
}
