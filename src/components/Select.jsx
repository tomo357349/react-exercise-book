/**
 * 選択肢を表示するコンポーネント
 */
export default function Select({ name, value, options, onChange, readOnly, ...otherInputProps }) {
    const indexValue = options.findIndex(o => o.value === value);
    const className = readOnly ? 'select-read-only' : '';

    function handleInput(evt) {
        const name = evt.target.name;
        const idx = +evt.target.value;
        onChange && onChange(options[idx].value, name);
    };

    return (
        <select
            name={name}
            value={indexValue}
            className={className}
            onChange={handleInput}
            {...otherInputProps}
        >
            {options.map((o, i) => (
                <option key={i} value={i}>{o.label}</option>
            ))}
        </select>
    );
}