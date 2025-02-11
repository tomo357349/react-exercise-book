import { useEffect, useState } from 'react';

/**
 * トーストコンポーネント
 */
export default function Toast({ message, description, face, close }) {
	const [className, setClassName] = useState('toast-appears toast ' + (face ? ' toast-' + face : ''));

	useEffect(() => {
		setTimeout(() => {
			setClassName('toast ' + (face ? ' toast-' + face : ''));
		}, 10);
	}, [face]);

    return (
        <div className={className} onClick={ close }>
            <div className="toast-message">{message}</div>
            {description && <div className="toast-description">{description}</div>}
        </div>
    );
}