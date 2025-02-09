import { isEmpty } from './object.js';

/**
 * JSONオブジェクトをクエリストリングに変換します。
 *
 * @param {any} params 
 * @returns {string}
 */
function toQueryString(params) {
	if (!params) return '';
	const keys = Object.keys(params);
	if (!keys || !keys.length) return '';
	return '?' + keys.filter(key => {
        return !isEmpty(params[key]);
    }).map(k => {
		return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
	}).join('&');
}

/**
 * APIデータをフェッチします。
 *
 * @param {string} url URL
 * @param {any} params JSONオブジェクト
 * @param {RequestInit} opts fetchリクエストのオプション（bodyは引数paramsで上書きされます）
 * @returns {any}
 */
export default async function fetchData(url, params, opts) {
    let body = opts && opts.body;
    let queryString = '';
    if (opts && opts.method !== 'GET') {
        if (params) {
            body = JSON.stringify(params);
        }
    } else {
        queryString = toQueryString(params);
    }
    const res = await fetch(url + queryString, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        ...opts,
        body
    });
    if (!res.ok) throw new Error(res.status + ':' + res.statusText);
    if (res.headers.get('Content-Type').indexOf('application/json') > -1) {
        const json = await res.json();
        return json;
    } else {
        const text = await res.text();
        return text;
    }
}