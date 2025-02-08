/**
 * 真偽値入力コンポーネント
 */
export default function BoolInput({ name, value, onChange }) {
    function handleChange(evt) {
        // 値としてtrue/falseを使い、value属性ではなくchecked属性を値とリンクさせる。
        const nextValue = evt.target.checked;
        onChange && onChange(nextValue, name);
    }

    return (
        <input type="checkbox" name={name} value="1" checked={value} onChange={handleChange} />
    );
}