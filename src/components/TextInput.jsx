/**
 * テキスト入力コンポーネント
 */
export default function TextInput({ value, placeholder, onChange }) {
	function handleInput(evt) {
		const value = evt.target.value;
		onChange && onChange(value);
	};

    return (
        <input
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
        />
	);
}