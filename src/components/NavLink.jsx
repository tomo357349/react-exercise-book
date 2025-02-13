import { jump } from '../utils/route.js';

/**
 * ルーター内の遷移に使用するアンカー
 *
 * 引数toにパスを設定する。パスは必ず絶対パスで記述する。
 * ルーター外への遷移には、通常のアンカー（`<a>`）を使用する。
 */
export default function NavLink({ to, children }) {
	function handleClick(evt) {
		// リンクをクリックしたときにページ遷移をキャンセルする
		evt.preventDefault();

		jump(to);
	}

	return (
		<a href={to} onClick={handleClick}>{children}</a>
	)
}