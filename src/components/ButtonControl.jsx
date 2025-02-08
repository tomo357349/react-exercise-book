import Button from './Button.jsx';
import ControlWrapper from './ControlWrapper.jsx';

/**
 * ボタンコントロールコンポーネント
 */
export default function ButtonControl({ componentSize, ...buttonProps }) {
    return (
        <ControlWrapper componentSize={componentSize}>
            <Button {...buttonProps} />
        </ControlWrapper>
    );
}