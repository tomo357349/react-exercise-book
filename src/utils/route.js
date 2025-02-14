let currentRoute = [];
let currentParams = {};
const subscriptions = [];
const delayedSubscriptions = [];
let lastSubscription = null;

/**
 * 現在のパスを返す
 *
 * @returns {string}
 */
export function getPath() {
	return '/' + currentRoute.map(r => r.path).join('/');
}

/**
 * 現在のパスパラメータを返す
 *
 * @returns {object}
 */
export function getParams() {
	return currentParams;
}

/**
 * パスにノードを追加する
 *
 * @param {string} node ノード名
 * @return {{path: string}}
 */
export function putPath(node) {
	if (!node) return;
	const routeNode = { path: node };
	currentRoute.push(routeNode);
	return routeNode;
}

/**
 * パスから指定したノード以降のノードをすべて削除する
 * @param {{path: string}} routeNode
 */
export function removePath(routeNode) {
	const idx = currentRoute.indexOf(routeNode);
	if (idx > -1) currentRoute.splice(idx, currentRoute.length - idx);
}

/**
 * パスをマッチングする
 *
 * 現在までの深さのパスに、引数で指定したパスを繋いでURLにマッチするかを判定する
 * マッチした場合は、マッチしたパスの残り部分とパラメータを返す
 * @param {string} path
 * @returns {string[]|[]} マッチしたパスの残り部分とパラメータ
 */
export function matchPath(path) {
	const destRoute = window.location.pathname.substring(1).split('/');
	if (destRoute.length && !destRoute[0]) destRoute.shift(); // ルートパスの場合['']になっているので削除
	const testRoute = currentRoute.map(r => r.path);
	const gainRoute = [];
	if (path) [].push.apply(testRoute, path.split('/'));

	const useWildcard = (testRoute[testRoute.length - 1] === '*');
	if (useWildcard) testRoute.pop();

	if (testRoute.length === 0 && destRoute.length === 0) {
		return ['', currentParams];
	}

	while (testRoute.length) {
		const testToken = testRoute.shift();
		const destToken = destRoute.shift();
		if (destToken && testToken.charAt(0) === ':') currentParams[testToken.substring(1)] = destToken;
		else if (testToken !== destToken) return;
		gainRoute.push(destToken);
	}
	// console.log('matchPath', path, gainRoute, currentRoute);
	if (useWildcard) return [gainRoute.slice(currentRoute.length).join('/'), currentParams];
	if (destRoute.length) return;
	return [gainRoute.slice(currentRoute.length).join('/'), currentParams];
}

/**
 * ルーターを初期化する
 */
export function createRouteTree() {
	currentRoute = [];
	currentParams = {};
}

/**
 * ステート変更時イベントのハンドラを登録する
 *
 * イベントハンドラはwindowオブジェクトのpopstateイベントを検出した場合と、
 * jumpToメソッドによりhistoryにpushStateされたときに実行される
 *
 * @param {function} callback
 * @param {{root: boolean, last: boolean, watch: boolean}} options rootはルートノードとして使う場合true、lastは最後のハンドラとして使う場合true、watchはルーティングとは関係のない個所でステート変更を監視する場合true
 */
export function subscribeState(callback, {root, last, watch} = {}) {
	if (last) {
		// すべてのルーティングが終わった後に実行するハンドラ
		lastSubscription = callback;
	} else if (watch) {
		// Router関連ではない処理、たとえばuseQueryStringなどのハンドラは
		// ルーティングによってコンポーネント自体が破棄され
		// サブスクライブが不要になる場合があるため遅延実行するグループに入れる
		delayedSubscriptions.push(callback);
	} else {
		subscriptions[root ? 'unshift' : 'push'](callback);
	}
}

/**
 * ステート変更時イベントのハンドラを削除する
 *
 * @param {function} callback
 */
export function unsubscribeState(callback) {
	const idx = subscriptions.indexOf(callback);
	if (idx > -1) subscriptions.splice(idx, 1);

	const idx2 = delayedSubscriptions.indexOf(callback);
	if (idx2 > -1) delayedSubscriptions.splice(idx2, 1);

	if (lastSubscription === callback) lastSubscription = null;
}

/**
 * サブスクライブ要求されているハンドラを全て呼び出す。
 */
function callSubscriptions() {
	// ハンドラを順にコールする。ルーティングの上から順。
	subscriptions.forEach(callback => callback());
	// 最後のハンドラをコールする。（ルーティングパラメータはルーティングが決定したあとに処理したい）
	if (lastSubscription) lastSubscription();
	// 遅延実行グループのハンドラをコールする。このハンドラは、ルーティングの結果、破棄されたコンポーネントによって
	// タイムアウトしている間になくなっている場合がある。
	setTimeout(() => delayedSubscriptions.forEach(callback => callback()), 0);
}

/**
 * 履歴を1つ戻る
 */
export function back() {
	history.back();
}

/**
 * 指定されたURLに遷移する
 *
 * 遷移後にステート変更時イベントのハンドラが呼び出される
 */
export function jump(to) {
	window.history.pushState({ id: crypto.randomUUID() }, '', to);
	callSubscriptions();
}

/**
 * ステートを置き換える
 *
 * ステートを進める場合はjumpToを使う
 * ステート置き換え時にステート変更時イベントのハンドラは呼び出されない
 *
 * @param {string} to 
 */
export function replace(to) {
	window.history.replaceState(window.history.state, '', to);
	// replaceの場合はルートは変わらないのでサブスクライブしない。
	// また、replaceStateしたコンポーネント自身がステートが変わっていることを認識しているので
	// 遅延実行するグループのハンドラも呼び出さない。
}

/**
 * パスを変換する
 *
 * 相対パスは許容しない
 *
 * @param {string} to
 */
export function href(to) {
	if (/^(\.|[^/])/.test(to)) throw new Error('href requires absolute path, not ' + to);
	const url = new URL(to, window.location.href).pathname;
	return url;
}

window.addEventListener('popstate', () => {
	callSubscriptions();
});