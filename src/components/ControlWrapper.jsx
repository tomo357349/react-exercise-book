/**
 * コントロールラッパー（入力コントロールのレイアウトのためのラッパーコンポーネント）
 */
export default function ControlWrapper({ label, labelFor, componentSize, children }) {
    const controlClassName = 'form-control-wrapper' + (componentSize ? ' control-size-' + componentSize : '');

    return (
        <div className={controlClassName}>
            <div className="form-control">
                {children}
                {label && <label title={label} htmlFor={labelFor}>{label}</label>}
            </div>
        </div>
    );
}