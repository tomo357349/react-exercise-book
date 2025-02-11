import { useEffect, useState } from 'react';
import { capitalize } from '../utils/string.js';

let fa = null;

export default function Icon({ name, face, onClick }) {
    const [icon, setIcon] = useState();
    const capName = capitalize(name);
    const className = `icon ${face ? `icon-${face}` : ''}`;

    useEffect(() => {
        if (!capName) return;

        const faName = `fa${capName}`;

        if (fa) {
            setIcon(fa[faName]);
            return;
        }

        loadFaModule();

        async function loadFaModule() {
            fa = await import('@fortawesome/free-solid-svg-icons');
            setIcon(fa[faName]);
        }
    }, [capName])

    if (!icon) return null;

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`}
            className={className}
            onClick={onClick}
        >
            <path d={icon.icon[4]} />
        </svg>
    );
}