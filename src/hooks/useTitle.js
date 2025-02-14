import { useContext, useEffect } from 'react';
import PageContext from '../contexts/PageContext';

/**
 * ページのタイトルを設定するフック
 * @returns {{ setTitle: React.Dispatch<React.SetStateAction<string>, setStatus: React.Dispatch<React.SetStateAction<string> }}
 */
export default function useTitle(title) {
    const { setTitle } = useContext(PageContext);

    useEffect(() => {
        setTitle(title);
    }, [title, setTitle]);
}