import { useRef } from 'react';
import ControlWrapper from './ControlWrapper.jsx';
import Input from './Input.jsx';

function getComponentId() {
    return 'Input-' + crypto.randomUUID();
}

/**
 * 入力コントロールコンポーネント
 */
export default function InputControl({ label, componentSize, icon, ...inputProps }) {
    const componentId = useRef(getComponentId()).current;

    return (
        <ControlWrapper label={label} labelFor={componentId} componentSize={componentSize} icon={icon}>
            <Input {...inputProps} id={componentId} />
        </ControlWrapper>
    );
}