import Icon from './Icon.jsx';

/**
 * コントロールラッパー（入力コントロールのレイアウトのためのラッパーコンポーネント）
 */
export default function ControlWrapper({ label, labelFor, componentSize, icon, children }) {
    const wrapperClassName = 'form-control-wrapper' + (componentSize ? ' control-size-' + componentSize : '');
    const controlClassName = 'form-control' + (icon ? ' form-control-with-icon' : '');

    return (
        <div className={wrapperClassName}>
            <div className={controlClassName}>
                {children}
                {icon && <Icon name={icon} />}
                {label && <label title={label} htmlFor={labelFor}>{label}</label>}
            </div>
        </div>
    );
}