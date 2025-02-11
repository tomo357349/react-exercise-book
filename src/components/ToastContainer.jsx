import { useCallback, useState } from 'react';
import ToastContext from '../contexts/ToastContext.js';
import Toast from './Toast.jsx';

/**
 * @typedef IToastOptions
 * @property {string} message メッセージ
 * @property {string} [description] 説明（省略可）
 * @property {'primary' | 'secondary' | 'assertive' | 'cancel' } [face] 表現（省略可）
 * @property {number} [timeout] タイムアウト（ms）（省略可）
 * @property {() => void} [onClose] 閉じるときの処理（省略可）
 */

/**
 * トーストコンテナコンポーネント
 */
export default function ToastContainer({ children }) {
	const [ toasts, setToasts ] = useState([]);

	const showToast = useCallback(
        /**
         * @param {IToastOptions} toastOpts 
         * @returns 
         */
        (toastOpts) => {
            const id = crypto.randomUUID();
            const timeoutHndl = setTimeout(closeToast, toastOpts.timeout || 3000);
            
            const toast = {
                ...toastOpts,
                id,
                timeoutHndl,
                close: closeToast,
            };
            setToasts(toasts => [...toasts, toast]);
            return closeToast;

            function closeToast() {
                if (timeoutHndl) clearTimeout(timeoutHndl);
                setToasts(toasts => toasts.filter(d => d.id !== id));
                if (toastOpts.onClose) toastOpts.onClose();
            }
        },
        [setToasts]
    );

	return (
        <ToastContext value={showToast}>
            {children}
            {toasts.length && <div className="toast-backdrop">
                {toasts.map(d => (
                    <Toast key={d.id}
                        message={d.message}
                        description={d.description}
                        face={d.face}
                        close={d.close}
                    />
                ))}
            </div>}
        </ToastContext>
	);
}