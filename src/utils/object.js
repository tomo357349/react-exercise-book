/**
 * 引数がnullやundefinedでないかどうかを調べます。
 *
 * @param {any} o 
 * @returns {boolean} nullやundefinedでないならtrue
 */
export function isVoid(o) {
	if (o === undefined) return true;
	if (o === null) return true;
	return false;
}

/**
 * 引数がnullやundefinedか空文字でないかどうかを調べます。
 *
 * @param {any} o 
 * @returns {boolean} nullやundefinedか空文字でないならtrue
 */
export function isEmpty(o) {
	if (o === undefined) return true;
	if (o === null) return true;
	if (o === '') return true;
	return false;
}

/**
 * 2つのJSONオブジェクトが同じかどうかを調べます。
 *
 * @param {any} a 
 * @param {any} b 
 * @returns {boolean} 同じならtrue
 */
export function isSame(a, b) {
	if (Object.is(a, b)) return true;
	const aIsVoid = isVoid(a);
	const bIsVoid = isVoid(b);
	if (aIsVoid !== bIsVoid) return false;
	else if (aIsVoid) return true;

	const aIsDate = a instanceof Date;
	const bIsDate = b instanceof Date;
	if (aIsDate !== bIsDate) return false;
	else if (aIsDate) {
		if (a.getTime() !== b.getTime()) return false;
		return true;
	}

	const aIsArray = Array.isArray(a);
	const bIsArray = Array.isArray(b);
	if (aIsArray !== bIsArray) return false;
	else if (aIsArray) {
		if (a.length !== b.length) return false;
		for (let i = 0; i< a.length; i++) {
			if (!isSame(a[i], b[i])) return false;
		}
		return true;
	}

	const aIsObject = typeof(a) === 'object';
	const bIsObject = typeof(b) === 'object';
	if (aIsObject !== bIsObject) return false;
	else if (aIsObject) {
		const aProps = Object.keys(a).filter(k => !isVoid(a[k]));
		const bProps = Object.keys(b).filter(k => !isVoid(b[k]));
		if (aProps.length !== bProps.length) return false;
		for (let i = 0; i < aProps.length; i++) {
			const prop = aProps[i];
			const bIdx = bProps.indexOf(prop);
			if (bIdx < 0) return false;
			bProps.splice(bIdx, 1);
			if (!isSame(a[prop], b[prop])) return false;
		}
		return true;
	}
	return false;
}
