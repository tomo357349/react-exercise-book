/**
 * 文字列の頭文字を大文字に変換する
 *
 * @param {string} s 
 * @returns {string}
 */
export function capitalize(s) {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
}