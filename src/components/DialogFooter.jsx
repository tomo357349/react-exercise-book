/**
 * ダイアログフッタコンポーネント
 *
 * OKやキャンセルなどのボタンを配置するために使用。
 */
export default function DialogFooter({ children }) {
	return (
		<div className="dialog-footer">
			{children}
		</div>
	);
}