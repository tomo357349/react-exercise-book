import { useEffect, useRef } from 'react';

/**
 * 第1引数の要素が第2引数に含まれるか検査
 *
 * @param {HTMLElement} el
 * @param {HTMLElement} expectedParent
 */
function containsElement(el, expectedParent) {
	if (!el.parentNode) return false;
	if (el.parentNode === expectedParent) return true;
	return checkParent(el.parentNode, expectedParent);
}

/**
 * ダイアログバックドロップコンポーネント
 * 
 * onCloseはバックドロップをクリックするかEscキーが押された際に呼び出されるコールバック
 * onActionはEnterキーが押された時に呼び出されるコールバック
 */
export default function DialogBackdrop({ onClose, onAction, children }) {
	const lastRef = useRef(document.activeElement);
	const ref = useRef(null);

	useEffect(() => {
		// キーイベントでダイアログを操作したい
		// フォーカスがダイアログの子要素のいずれにもない場合、このコンポーネントにフォーカスする
		/** @type {HTMLElement} */
		const el = ref.current;
		if (!containsElement(document.activeElement, el)) el.focus();

		return () => {
			// development mode対策：初回の破棄時にはまだこのダイアログ内のコンポーネントにフォーカスがあるので無視する
			if (containsElement(document.activeElement, el)) return;

			if (lastRef.current) lastRef.current.focus();
		};
	}, []);

	function handleKeyUp(evt) {
		evt.stopPropagation();
		if (evt.key === 'Escape') {
			handleClose();
		}
	}

	function handleKeyDown(evt) {
		evt.stopPropagation();
		if (evt.key === 'Enter') {
			if (onAction) {
				onAction(evt);
				if (!evt.defaultPrevented) {
					handleClose();
				}
			}
		}
	}

	function handleClose(evt) {
		if (evt) evt.stopPropagation();
		setTimeout(() => {
			if (onClose) onClose();
		});
	}

	return (
		<div tabIndex="0" ref={ref} className="dialog-backdrop" onClick={handleClose} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
			{ children }
		</div>
	);
}