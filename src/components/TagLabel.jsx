import { isEmpty } from '../utils/object.js';

/**
 * タグコンポーネント
 *
 * @param {string} tag タグ名
 * @param {string} [face] タグの色
 * @param {boolean} [disabled] タグを無効にする
 * @param {function} [onClick] クリック時のコールバック
 */
export default function TagLabel({ tag, face, disabled, onClick }) {
    if (isEmpty(tag)) return null;

    const className = `tag tag-${face || 'primary'} ${disabled ? 'tag-disabled' : ''}`;
    return (
        <span className={className} onClick={onClick}>
            {tag}
        </span>
    );
}