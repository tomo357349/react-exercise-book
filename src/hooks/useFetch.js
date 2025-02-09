import { useCallback, useEffect, useRef, useState } from 'react';
import fetchData from '../utils/fetch.js';
import { isSame } from '../utils/object.js';

/**
 * @typedef IUseFetchResults
 * @property {any[]} data 最後のフェッチ処理で取得したデータ
 * @property {boolean} isFetching フェッチ処理中はtrueになります。
 * @property {Error} error 最後のフェッチ処理で発生したエラー
 * @property {fetchData} fetchNext フェッチ処理関数
 */

/**
 * フェッチ処理で取得したデータ
 * @param {string} url
 * @param {any} params
 * @param {RequestInit} opts
 * @returns {IUseFetchResults}
 */
export default function useFetch(initialUrl, initialParams, initialOpts) {
    const paramsRef = useRef();
    const optsRef = useRef();
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState(false);

    if (!isSame(paramsRef.current, initialParams)) {
        paramsRef.current = initialParams;
    }    
    const currentParams = paramsRef.current;

    if (!isSame(optsRef.current, initialOpts)) {
        optsRef.current = initialOpts;
    }
    const currentOpts = optsRef.current;

    const fetchNext = useCallback(async (url, params, opts) => {
        setIsFetching(true);

        try {
            const nextData = await fetchData(url, params, opts);
            setData(nextData);
            setError(null);
            return nextData;
        } catch (err) {
            setData(null);
            setError(err);
            throw err;
        } finally {
            setIsFetching(false);
        }
    }, [paramsRef, optsRef, setIsFetching, setData, setError]);

    useEffect(() => {
        if (!initialUrl) return;

        callFetch(initialUrl, currentParams,  currentOpts);

        async function callFetch(url, params, opts) {
            try {
                await fetchNext(url, params, opts);
            } catch (err) {
                console.error(err);
            }
        }
    }, [initialUrl, currentParams, currentOpts]);

    return { data, isFetching, error, fetchNext };
}