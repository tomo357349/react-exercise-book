import { useState } from 'react';
import Button from '../../components/Button.jsx';
import useTitle from '../../hooks/useTitle.js';
import useStatus from '../../hooks/useStatus.js';

export default function Page() {
    useTitle('レイアウト');
    const setStatus = useStatus('レイアウトページを表示');

    const [lines, setLines] = useState([]);

    function handleClick() {
        setLines(lines => [...lines, '' + Math.random()]);
        setStatus('cnt=' + lines.length, 500);
    }
    return (
        <>
            <h1>Layout</h1>
            <Button onClick={handleClick}>ステータス更新</Button>
            {lines.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
        </>
    );
}