import { useRef } from 'react';
import ControlWrapper from './ControlWrapper.jsx';
import TagLabel from './TagLabel.jsx';

function getComponentId() {
    return 'Tag-' + crypto.randomUUID();
}

/**
 * タグコントロールコンポーネント
 */
export default function TagControl({ label, componentSize, ...tagProps }) {
    const componentId = useRef(getComponentId()).current;

    return (
        <ControlWrapper label={label} labelFor={componentId} componentSize={componentSize}>
            <TagLabel {...tagProps} id={componentId} />
        </ControlWrapper>
    );
}