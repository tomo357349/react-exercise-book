import { useCallback, useEffect, useState } from 'react';

import useQueryString from './useQueryString.js';
import { subscribeState, unsubscribeState } from '../utils/route.js';
import { isSame } from '../utils/object.js';

/**
 * クエリストリングと連動したフォームを管理するフック
 *
 * クエリストリングに対するアクセサだけ欲しい場合はuseQueryStringを使用する。
 * 
 * このフックは３つの要素を含む配列を返す。
 *
 * ```js
 * const [form, setForm, setQuery] = useQueryStringForm(defaultParams);
 * ```
 *
 * - 1つめの`form`は、ユーザフォームのデータストアstate
 * - 2つめの`setForm`は、formのstate更新関数
 * - 3つめの`setQuery`は、ブラウザのURL欄のクエリストリングを更新し、formに反映する関数（現在のformの値から変更がない場合は無視）
 *
 * @param {object} defaultParams 
 * @returns {[object, React.Dispatch<object>, ((object || function), boolean) => object]} 0: form, 1: setForm, 3: setQuery
 */
export default function useQueryStringForm(defaultParams) {
	if (!defaultParams) {
		throw new Error('useQueryForm requires defaultParam argument.');
	}
	if (typeof(defaultParams) !== 'object') {
		throw new Error('defaultParam of useQueryForm must be object but receives ' + typeof(defaultParams) + '.');
	}

	const [query, setQuery] = useQueryString(defaultParams, true);
	const [form, setForm] = useState(query);

	/**
	 * クエリの変更ハンドラ
	 *
	 * クエリの変更内容をフォームにも反映する
	 * すでにフォームに反映済みならばそのまま古いフォームを使う
	 *
	 * @param {object || function} next
	 * @param {boolean} replaced デフォルトではhistoryにpushStateします。trueが指定された場合replaceStateします。
	 */
	const handleSetQuery = useCallback((nextOrFunc, replaced) => {
		if (typeof(nextOrFunc) === 'function') {
			const func = nextOrFunc;
			setQuery(func, replaced);
			setForm(form => {
				const nextForm = form();
				return isSame(form, nextForm) ? form : nextForm;
			});
		} else {
			const nextParams = nextOrFunc;
			setQuery(nextParams, replaced);
			setForm(form => isSame(form, nextParams) ? form : nextParams);
		}
	}, [setForm, setQuery]);

	/**
	 * クエリとフォームを更新する
	 */
	const updateQuery = useCallback(() => {
		const nextQuery = setQuery();
		setForm(nextQuery);
	}, [setForm, setQuery]);

	useEffect(() => {
		subscribeState(updateQuery, { watch: true });

		return () => {
			unsubscribeState(updateQuery);
		};
	}, [updateQuery]);

	return [form, setForm, handleSetQuery];
}