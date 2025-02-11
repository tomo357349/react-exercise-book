import Button from './Button.jsx';
import ControlWrapper from './ControlWrapper.jsx';

/**
 * ボタンコントロールコンポーネント
 */
export default function ButtonControl({ componentSize, icon, ...buttonProps }) {
    return (
        <ControlWrapper componentSize={componentSize} icon={icon}>
            <Button {...buttonProps} />
        </ControlWrapper>
    );
}