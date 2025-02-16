import { useState } from 'react';
import MarkdownPreview from '../../components/MarkdownPreview.jsx';
import sample from './sample.js';
import useDeferredState from '../../hooks/useDeferredState.js';

export default function Page() {
    const [text, setText] = useState(sample);
    const [deferredText, setDeferredText] = useDeferredState(text, 500);

    function handleInput(evt) {
        const text = evt.target.value;
        setText(text);
        setDeferredText(text);
    }

    return (
        <div className="page-markdown">
            <div className="page-markdown-panel">
                <textarea className="page-markdown-editor" value={text} onInput={handleInput} />
            </div>
            <div className="page-markdown-panel">
                <MarkdownPreview value={deferredText} />
            </div>
        </div>
    );
}