import { useRef } from 'react';
import ControlWrapper from './ControlWrapper.jsx';
import MultiLineInput from './MultiLineInput.jsx';

function getComponentId() {
    return 'MLInput-' + crypto.randomUUID();
}

/**
 * 入力コントロールコンポーネント
 */
export default function InputControl({ label, componentSize, ...inputProps }) {
    const componentId = useRef(getComponentId()).current;

    return (
        <ControlWrapper label={label} labelFor={componentId} componentSize={componentSize}>
            <MultiLineInput {...inputProps} id={componentId} />
        </ControlWrapper>
    );
}