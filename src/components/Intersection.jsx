import { useEffect, useRef } from 'react';

export default function Intersection({ onAppear, children }) {
	const ref = useRef(null);

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(([ entry ]) => {
			if (!entry.isIntersecting) return;

			onAppear && onAppear();
		});

		if (ref.current) {
			intersectionObserver.observe(ref.current);
		}

		return () => {
			intersectionObserver.disconnect();
		}
	}, [onAppear]);

	return (
		<div className="intersection" ref={ref}>{children}</div>
	);
}