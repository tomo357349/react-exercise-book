import { useCallback, useState } from "react";

export default function Accordion({ children, title, open, onToggle }) {
    const [isOpen, setIsOpen] = useState(open);
    const className = `accordion ${isOpen ? 'accordion-open' : ''}`;

    const toggle = useCallback(() => {
        setIsOpen(!isOpen);
        if (onToggle) onToggle(!isOpen);
    }, [isOpen, onToggle]);

    return (
        <div className={className}>
            <div className="accordion-header" onClick={toggle}>
                <span className="accordion-title">{title}</span>
            </div>
            {isOpen && <div className="accordion-body">{children}</div>}
        </div>
    );
}