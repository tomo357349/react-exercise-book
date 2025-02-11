import ControlWrapper from './ControlWrapper.jsx';

/**
 * ラベルコントロールコンポーネント
 */
export default function LabelControl({ label, componentSize, value }) {
    return (
        <ControlWrapper label={label} componentSize={componentSize}>
            <span className="text-label">{value}</span>
        </ControlWrapper>
    );
}