import { useImperativeHandle, useRef } from 'react';

/**
 * フォームコンポーネント
 */
export default function Form({ ref, onSubmit, children }) {
    const innerRef = useRef();

    useImperativeHandle(ref, () => {
		return innerRef.current;
	}, [ ]);

    function handleSubmit(evt) {
        // いずれにせよAPIリクエストしかしないのでsubmitイベントは必ず止めておく
        evt.preventDefault();

        /** @type {HTMLFormElement} */
		const formEl = innerRef.current;
		if (!formEl) return;

		if (formEl.checkValidity()) {
			onSubmit && onSubmit(formEl);
		} else {
			formEl.reportValidity();
		}
    }

    return (
        <form ref={innerRef} onSubmit={handleSubmit}>
            {children}
        </form>
    );
}