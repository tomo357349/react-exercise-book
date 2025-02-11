/**
 * 複数行テキスト入力コンポーネント
 */
export default function MultiLineInput({ name, value, placeholder, onChange, rows, ...otherInputProps }) {

    function handleInput(evt) {
		const name = evt.target.name;
		const value = evt.target.value;
		onChange && onChange(value, name);
	};

    return (
        <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            rows={rows}
            onInput={handleInput}
            {...otherInputProps}
        />
    );
}