import { useRef } from 'react';
import ControlWrapper from './ControlWrapper.jsx';
import Select from './Select.jsx';

function getComponentId() {
    return 'Input-' + crypto.randomUUID();
}

/**
 * 選択コントロールコンポーネント
 */
export default function SelectControl({ label, componentSize, ...inputProps }) {
    const componentId = useRef(getComponentId()).current;

    return (
        <ControlWrapper label={label} labelFor={componentId} componentSize={componentSize}>
            <Select {...inputProps} id={componentId}/>
        </ControlWrapper>
    );
}