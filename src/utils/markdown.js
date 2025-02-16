import { use as markedUse, parse as markedParse } from 'marked';

const walkTokens = async (token) => {
	if (token.type === 'blockquote') {
		// github warnings
		let tokenlen = 0;
		if (token.text.startsWith('[!NOTE]\n')) {
			tokenlen = 8;
			token.className = 'note';
		} else if (token.text.startsWith('[!TIP]\n')) {
			tokenlen = 7;
			token.className = 'tip';
		} else if (token.text.startsWith('[!IMPORTANT]\n')) {
			tokenlen = 13;
			token.className = 'important';
		} else if (token.text.startsWith('[!WARNING]\n')) {
			tokenlen = 11;
			token.className = 'warning';
		} else if (token.text.startsWith('[!CAUTION]\n')) {
			tokenlen = 11;
			token.className = 'caution';
		}
		if (tokenlen) {
			token.raw = '> ' + token.raw.substring(tokenlen + 2);
			token.text = token.text.substring(tokenlen);
			if (token.tokens.length) {
				token.tokens[0].raw = token.tokens[0].raw.substring(tokenlen);
				token.tokens[0].text = token.tokens[0].text.substring(tokenlen);

				if (token.tokens[0].tokens.length) {
					token.tokens[0].tokens[0].raw = token.tokens[0].tokens[0].raw.substring(tokenlen);
					token.tokens[0].tokens[0].text = token.tokens[0].tokens[0].text.substring(tokenlen);
				}
			}
		}
	}
};

const renderer = {
	// name属性を追加する
	heading({ tokens, depth }) {
		const text = this.parser.parseInline(tokens);
		const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

		return `
			<h${depth}>
				<a name="${escapedText}" class="hashanchor" href="#${escapedText}">
					<span class="header-link"></span>
				</a>
				${text}
			</h${depth}>`;
	},
	blockquote(token) {
		// class属性を追加する
		const tokens = token.tokens;
		const body = this.parser.parse(tokens);
		return `<blockquote class="${token.className || ''}">\n${body}</blockquote>\n`;
	},
};

/**
 * プレーンテキストをマークダウンとしてパースし、HTMLを返す。
 *
 * @param {string} plaintext 
 * @returns {string} HTML文字列
 */
export async function parse(plaintext) {
	if (!plaintext) return '';

	markedUse({ renderer, walkTokens, async: true });
	return await markedParse(plaintext)
}
