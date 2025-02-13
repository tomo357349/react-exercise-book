/**
 * 引数のうち、nullかundefinedではない最初の値を返す。
 * 
 * @param {...any}
 * @returns {any}
 */
export function nvl() {
	const res = [...arguments].reduce((p, c) => {
		if (!isVoid(p)) return p;
		return c;
	}, null);
	return res;
}

/**
 * 引数がnullかundefinedではないことを検証する。
 *
 * @param {any} o
 * @returns {boolean} nullでもundefinedでもない場合true、それ以外の場合false
 */
export function isVoid(o) {
	if (o === undefined) return true;
	if (o === null) return true;
	return false;
}

/**
 * 引数がnullかundefinedか空文字（`''`）ではないことを検証する。
 *
 * @param {any} o
 * @return {boolean} nullでもundefinedでも空文字でもない場合true、それ以外の場合false
 */
export function isEmpty(o) {
	if (o === undefined) return true;
	if (o === null) return true;
	if (o === '') return true;
	return false;
}

export function hasValue(map) {
	const keys = Object.keys(map);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (!isEmpty(map[key])) return true;
	}
	return false;
}

/**
 * 2つのオブジェクトが同じオブジェクトかどうかを比較する。
 * 特にJSON同士の比較の場合、`JSON.stringify(a) === JSON.stringify(b)`を使うよりもずっと効率よく処理できる。
 *
 * - 文字列、数値、真偽値、Dateオブジェクト、配列、JSONオブジェクトの比較ができる
 * - JSONオブジェクトの場合、プロパティに値がない状態とプロパティがない状態の比較は「等しい」とみなす
 *
 * @param {any} a
 * @param {any} b
 * @returns {boolean} 同じ場合true、異なる場合false
 */
export function isSame(a, b) {
	if (a === b) return true;
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

export function sanitizeHtml(html) {
	return html
	.replaceAll('&', '&amp;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;')
	.replaceAll('"', '&quot;')
	.replaceAll('\'', '&$039;');
}
