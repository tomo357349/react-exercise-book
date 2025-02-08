/**
 * ボタンコンポーネント
 */
export default function Button({ type, face, onClick, children, disabled }) {
	const btnType = !type ? 'button' : type;
	const className = (!face || face === 'positive') ? null
	: (face === 'secondary') ? 'btn-secondary'
	: (face === 'assertive') ? 'btn-assertive'
	: (face === 'clear') ? 'btn-clear'
	: null;

	return (
        <button
			type={btnType}
			className={className}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}