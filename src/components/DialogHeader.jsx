/**
 * ダイアログヘッダコンポーネント
 *
 * ダイアログのタイトルバー。
 */
export default function DialogHeader({ title }) {
	return (
		<div className="dialog-header">
			<div className="dialog-title">{title}</div>
		</div>
	);
}