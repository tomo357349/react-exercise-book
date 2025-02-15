import { useCallback, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import PageContext from '../contexts/PageContext.js';
import Button from '../components/Button.jsx';

/**
 * ページのベーシックなレイアウト
 */
export default function BasicLayout({ menu, children }) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const statusHndl = useRef(null);
    const [isMenuShown, setIsMenuShowwn] = useState(false);
    const [isAppear, setIsAppear] = useState(false);

    const handleSetTitle = useCallback((nextTitle) => {
        setTitle(nextTitle);
        if (typeof(nextTitle) === 'function') nextTitle = nextTitle();
        const idx = document.title.indexOf(' - ');
        document.title = nextTitle + (idx > -1 ? document.title.substring(idx) : ' - ' + document.title);
    }, [setTitle]);

    const handleSetStatus = useCallback((nextStatus, duration = 3000) => {
        if (statusHndl.current) clearTimeout(statusHndl.current);

        setStatus(nextStatus);
        statusHndl.current = setTimeout(() => {
            setStatus('');
        }, duration);
    }, [setStatus]);

    const handleClickMenu = useCallback(() => {
        const nextIsMenuShown = !isMenuShown;
        if (nextIsMenuShown) {
            setIsMenuShowwn(nextIsMenuShown);
            setTimeout(() => setIsAppear(nextIsMenuShown), 0);
        } else {
            setIsAppear(nextIsMenuShown);
            setTimeout(() => setIsMenuShowwn(nextIsMenuShown), 200);
        }
    }, [isMenuShown, setIsMenuShowwn]);

    return (
        <PageContext value={{ setTitle: handleSetTitle, setStatus: handleSetStatus}}>
            <header>
                <Button face="clear" onClick={handleClickMenu}><Icon name="bars" /></Button>
                <div className="page-title">{title}</div>
            </header>
            <main role="main">
                {children}
            </main>
            <footer>
                <div className="page-status">{status}</div>
            </footer>
            {menu && isMenuShown && <>
                <div className="page-menu-backdrop" onClick={handleClickMenu}>
                    <nav className={isAppear ? 'page-menu appear' : 'page-menu'}>{menu}</nav>
                </div>
            </>}
        </PageContext>
    );
}