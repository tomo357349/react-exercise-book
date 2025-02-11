import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './index.css';

createApplication();

/**
 * mswを起動する
 */
async function startMsw() {
	const { worker } = await import('./mocks/browser.js');
	await worker.start({
		onUnhandledRequest: 'bypass', // 'warn'
		// onUnhandledRequest(req, print) {
		// 	// if (req.url.includes('/icons.svg')) return;
		// 	// if (req.url.includes('/src/')) return;
		// 	// if (req.url.includes('/node_modules/')) return;
		// 	print.warning();
		// },
	});
}

/**
 * アプリケーションを作成する
 */
async function createApplication() {
	if (process.env.NODE_ENV === 'development') {
		await startMsw();
	}

	createRoot(document.getElementById('root')).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
