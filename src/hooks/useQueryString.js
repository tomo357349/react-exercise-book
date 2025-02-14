import { useCallback, useEffect, useRef, useState } from 'react';

import { isEmpty, isSame, hasAnyValue } from '../utils/object.js';
import { subscribeState, unsubscribeState } from '../utils/route.js';

/**
 * クエリストリングの値文字列を適切なデータ型に変換する
 *
 * @param {string} v 
 * @param {*} p 
 * @returns {*}
 */
function parseByValueType(v, p) {
	if (!v) return p;

	const typ = typeof(p);
	if (typ === 'number') {
		return +v;
	} else if (typ === 'boolean') {
		return v === 'true' || v === '1';
	} else {
		return v;
	}
}

/**
 * 値をクエリストリング用文字列に変換する
 * @param {*} v 
 * @returns {string}
 */
function formatValue(v) {
	const typ = typeof(v);
	if (typ === 'number') {
		return ''+v;
	} else if (typ === 'boolean') {
		return v ? 'true' : 'false';
	} else if (v instanceof Date) {
		return v.toISOString();
	} else {
		return v;
	}
}

/**
 * クエリストリングからパラメータを読み取る
 *
 * @param {URLSearchParams} searchParams 
 * @param {*} init 
 * @param {boolean} overwriteAll 
 * @returns {*}
 */
export function getParams(searchParams, init, overwriteAll) {
	const o = {};
	Object.keys(init).map(k => {
		o[k] = parseByValueType(searchParams.get(k), init[k]);
	});
	if (overwriteAll && !hasAnyValue(o, { zero: true, bool: true })) {
		Object.keys(init).map(k => {
			o[k] = parseByValueType(searchParams.get(k), init[k]);
		});
	}
	return o;
}

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
	const getQueryString = useCallback(() => {
		const url = new URL(window.location);
		return getParams(url.searchParams, oldParams.current, true);
	}, []);

	// クエリオブジェクト
	const [query, setQuery] = useState(getQueryString());

	/**
	 * クエリオブジェクトを更新する
	 */
	const updateQuery = useCallback(() => {
		const nextQuery = getQueryString();
		setQuery(nextQuery);
		return nextQuery;
	}, [setQuery]);

	useEffect(() => {
		if (!ignore) subscribeState(updateQuery, { watch: true });

		return () => {
			if (!ignore) unsubscribeState(updateQuery);
		};
	}, [updateQuery]);

	/**
	 * クエリオブジェクトをクエリストリングに反映する
	 */
	const setQueryString = useCallback((q, replaced) => {
		if (!q) return updateQuery();

		const url = new URL(window.location);
		Object.keys(q).forEach(k => {
			if (isEmpty(q[k], { zero: true, bool: true })) url.searchParams.delete(k);
			else url.searchParams.set(k, formatValue(q[k]));
		});
		if (replaced) {
			window.history.replaceState(window.history.state, '', url.href);
		} else {
			window.history.pushState({ id: crypto.randomUUID() }, '', url.href);
		}
		return updateQuery();
	}, [updateQuery]);

	return [query, setQueryString];
}
