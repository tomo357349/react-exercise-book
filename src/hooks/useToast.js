import { useContext } from 'react';
import ToastContext from '../contexts/ToastContext';

/**
 * トースト表示フック
 * @returns {(opts: import('../components/ToastContainer').IToastOptions) => void}
 */
export default function useToast() {
    return useContext(ToastContext);
}