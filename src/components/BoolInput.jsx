import { useRef } from 'react';

function getComponentId() {
    return 'BoolInput-' + crypto.randomUUID();
}

/**
 * 真偽値入力コンポーネント
 */
export default function BoolInput({ name, value, label, onChange, ...otherInputProps }) {
    const componentId = useRef(getComponentId()).current;

    function handleChange(evt) {
        // 値としてtrue/falseを使い、value属性ではなくchecked属性を値とリンクさせる。
        const nextValue = evt.target.checked;
        onChange && onChange(nextValue, name);
    }

    return (
        <div className="form-control">
            <input type="checkbox"
                id={componentId}
                name={name}
                value="1"
                checked={value}
                onChange={handleChange}
                {...otherInputProps}
            />
            {label && <label title={label} htmlFor={componentId}>{label}</label>}
        </div>
    );
}