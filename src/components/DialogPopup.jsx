import { useEffect, useMemo, useState } from 'react';

/**
 * ダイアログポップアップコンポーネント
 */
export default function DialogPopup({ className, children }) {
	// アニメーションのためのクラス付与制御のために使うstate
	const [appear, setAppear] = useState(false);

	const innnerClassName = useMemo(() => {
		return (className ? className : '') + ' dialog' + (appear ? ' dialog-appear' : '');
	}, [className, appear]);

	useEffect(() => {
		setAppear(true);
	}, [setAppear]);

	return (
		<div className={innnerClassName} onClick={evt => evt.stopPropagation()}>
			{children}
		</div>
	);
}
