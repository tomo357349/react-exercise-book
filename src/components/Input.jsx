import BoolInput from './BoolInput.jsx';

function convertText(s, type) {
    if (type === 'number') return +s;
    return s;
}

/**
 * 入力コンポーネント
 */
export default function Input({ type, name, value, placeholder, onChange, readOnly, disabled, min, max, step }) {
    // チェックボックスは除く
    if (type === 'checkbox') {
        return <BoolInput
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
        />;
    }

    const inputType = type || 'text';

    function handleInput(evt) {
		const name = evt.target.name;
		const text = evt.target.value;
        const value = convertText(text, type);
		onChange && onChange(value, name);
	};

    return (
        <input
            type={inputType}
            name={name}
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            readOnly={readOnly}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
        />
	);
}