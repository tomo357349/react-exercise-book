import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import InputControl from './InputControl.jsx';

/**
 * 補助入力付き入力コントロールコンポーネント
 *
 * このコンポーネントはマスタデータを検索して取得したリストからコードを選択するような使用方法を想定している。
 */
export default function InputAssistControl({ ref, list, name, value, onChange, ...inputProps }) {
    const innerRef = useRef();

    useImperativeHandle(ref, () => {
        return innerRef.current;
    }, [ ]);

    const ulRef = useRef();

    // propsをrefにコピーしておき、依存関係なくuseEffectで使いたい

    const nameRef = useRef(name);
    useEffect(() => {
        nameRef.current = name;
    }, [name]);

    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    const dataRef = useRef(list);
    // dataRef用のuseEffectは、依存関係の問題でfilterData()の定義より下に移動

    // 選択中のリストアイテムインデックス
    const [selectedIdx, setSelectedIdx] = useState(0);
    // 依存関係なくuseEffectで使うためのref
    const selectedIdxRef = useRef(selectedIdx);

    // フィルタ済みのリストアイテム
    const [filteredData, setFilteredData] = useState();
    // 依存関係なくuseEffectで使うためのref
    const filteredDataRef = useRef();

    // リストアイテム選択イベントハンドラ
    const handleSelect = useCallback((evt, d) => {
        evt.preventDefault(); // アンカーなのでイベントを止めておく
        evt.stopPropagation();
        filteredDataRef.current = null;
        setFilteredData(null);
        if (onChange) onChange(d.value, name);
        innerRef.current.focus();
    }, [name, onChange, setFilteredData]);

    // 入力値でデータをフィルタリング
    const filterData = useCallback((value) => {
        if (!dataRef.current) {
            filteredDataRef.current = null;
        } else if (!value) {
            filteredDataRef.current = null;
        } else {
            // 大文字小文字を区別せずフィルタリング
            value = value.toLowerCase();
            filteredDataRef.current = dataRef.current.filter(d => {
                if (!value) return false;
                if (d.value.toLowerCase().indexOf(value) > -1) return true;
                if (d.desc.toLowerCase().indexOf(value) > -1) return true;
                return false;
            });
        }
        // 描画用に、refだけでなくstateも更新する
        setFilteredData(filteredDataRef.current);
    }, [setFilteredData]);

    // dataRef用のuseEffect
    useEffect(() => {
        dataRef.current = list;

        // 入力にフォーカスがある場合はフィルタされたリストを表示する
        /** @type {HTMLInputElement} */
        const inputEl = innerRef.current;
        if (document.activeElement === inputEl && list) {
            filterData(value);
        } 
    }, [value, list, filterData]);

    useEffect(() => {
        /** @type {HTMLInputElement} */
        const el = innerRef.current;
        el.addEventListener('keydown', handleKeyDown);
        el.addEventListener('keyup', handleKeyUp);
        el.addEventListener('focus', handleFocus);
        el.addEventListener('blur', handleBlur);

        return () => {
            el.removeEventListener('keydown', handleKeyDown);
            el.removeEventListener('keyup', handleKeyUp);
            el.removeEventListener('focus', handleFocus);
            el.removeEventListener('blur', handleBlur);
        }

        // 選択されたアイテムまでスクロール
        function scrollToSelectedItem(idx) {
            const child = ulRef.current.children[idx];
            if (child) child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // キーダウンイベントハンドラ
        // 上下の矢印キーで選択アイテム変更、Enterキーで確定
        function handleKeyDown(evt) {
            if (evt.key === 'ArrowDown') {
                evt.preventDefault();
                evt.stopPropagation();
                if (!filteredDataRef.current) return;
                let nextIdx = (selectedIdxRef.current || 0) + 1;
                if (nextIdx >= filteredDataRef.current.length) nextIdx = 0;
                selectedIdxRef.current = nextIdx;
                setSelectedIdx(nextIdx);
                scrollToSelectedItem(nextIdx);
            } else if (evt.key === 'ArrowUp') {
                evt.preventDefault();
                evt.stopPropagation();
                if (!filteredDataRef.current) return;
                let nextIdx = (selectedIdxRef.current || 0) - 1;
                if (nextIdx < 0) nextIdx = filteredDataRef.current.length - 1;
                selectedIdxRef.current = nextIdx;
                setSelectedIdx(nextIdx);
                scrollToSelectedItem(nextIdx);
            } else if (evt.key === 'Enter') {
                evt.preventDefault();
                evt.stopPropagation();
                if (onChangeRef.current) {
                    onChangeRef.current(filteredDataRef.current[selectedIdxRef.current].value, nameRef.current);
                }
            }
        }

        // キーアップイベントハンドラ
        // EnterやEscapeならリストを閉じる。
        function handleKeyUp(evt) {
            if (evt.key === 'Enter' || evt.key === 'Escape') {
                filterData(null);
            // } else {
            //     filterData(evt.target.value);
            }
        }

        // フォーカスイベントハンドラ
        // 入力が半端で確定していない場合は選択リストを表示する
        function handleFocus(evt) {
            if (!evt.target.value) return;
            if (!dataRef.current) return;
            if (dataRef.current.find(d => d.value === evt.target.value)) return;
            filterData(evt.target.value);
        }

        // ブラーイベントハンドラ
        // フォーカスがない場合はリストを表示しない
        function handleBlur() {
            // アンカーのクリックイベントのためにblurする場合があるので、
            // setTimeoutで少し遅延させる。
            setTimeout(() => {
                filterData(null);
                setSelectedIdx(0);
            }, 200);
        }
    
    }, [filterData, setSelectedIdx]);

    return (
        <div className="input-list-wrapper">
            <InputControl ref={innerRef} name={name} value={value} onChange={onChange} {...inputProps} autoComplete="off" />
            {filteredData && <ul className="input-list" ref={ulRef}>
                {filteredData.map((d, i) => (
                    <li key={d.value} tabIndex="0">
                        <a className={selectedIdx === i ? 'input-list-selected' : ''} onClick={(evt) => {handleSelect(evt, d)}}>
                            <span className="input-list-value">{d.value}</span>
                            <span className="input-list-desc">{d.desc}</span>
                        </a>
                    </li>
                ))}
            </ul>}
        </div>
    );
}