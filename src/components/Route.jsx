/**
 * ルートコンポーネント
 *
 * Routesの直下に配置するコンポーネント
 * - pathに現在のルートからのパスを指定する。`*`でワイルドカードを指定できる。配下にまだルートが続く場合は`any/*`のように指定する
 * - 現在のノードのルートを使う場合はindexを指定する
 * - elementに、このルートに到達した場合に表示するJSXを記述する
 */
export default function Route({ path, index, element: Element }) { // eslint-disable-line no-unused-vars
	return Element;
}