/**
 * ボタンコンポーネント
 */
export default function Button({ type, face, onClick, children, ...otherButtonProps }) {
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
            {...otherButtonProps}
        >
            {children}
        </button>
    );
}