import { hasAnyValue, isEmpty } from './object.js';

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
 * @param {*} init 
 * @param {boolean} overwriteAll 
 * @returns {*}
 */
export function getQueryObject(init, overwriteAll) {
    const url = new URL(window.location);
    const searchParams = url.searchParams;
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
 * クエリストリングを更新する
 *
 * @param {object} query 
 * @param {boolean} replaced 現在のstateを置き換える場合true
 */
export function updateQueryString(query, replaced) {
    const url = new URL(window.location);
    Object.keys(query).forEach(k => {
        if (isEmpty(query[k], { zero: true, bool: true })) url.searchParams.delete(k);
        else url.searchParams.set(k, formatValue(query[k]));
    });
    if (replaced) {
        window.history.replaceState(window.history.state, '', url.href);
    } else {
        window.history.pushState({ id: crypto.randomUUID() }, '', url.href);
    }
}
