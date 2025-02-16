import { useEffect, useRef } from 'react';

// モジュールはlazyロード
let markdown = null;

/**
 * マークダウンプレビュー
 */
export default function MarkdownPreview({ value }) {
	const ref = useRef(null);

	useEffect(() => {
        console.log('render', value);
		(async () => {
			/** @type {HTMLElement} */
			const el = ref.current;
			if (!el) return;
			if (!markdown) {
				markdown = await import('/src/utils/markdown.js');
			}
            const v = value;
			el.innerHTML = v? await markdown.parse(v) : '';
		})();
	}, [value]);

	return (
		<div className="markdown-preview" ref={ref}></div>
	);
}