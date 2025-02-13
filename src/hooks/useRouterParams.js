import { useContext } from 'react';

import RouterContext from '../contexts/RouterContext.js';

export default function useRouterParams() {
	const [params] = useContext(RouterContext);

	return params || {};
}
