// 词法分析器 - 将源代码转换为标记流
class Lexer {
    constructor(sourceCode) {
        this.sourceCode = sourceCode;
        this.position = 0;
        this.currentChar = sourceCode[0];
    }

    // 前进到下一个字符
    advance() {
        this.position++;
        this.currentChar = this.position < this.sourceCode.length ? this.sourceCode[this.position] : null;
    }

    // 跳过空格和换行
    skipWhitespace() {
        while (this.currentChar && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    // 跳过注释（// 到行尾）
    skipComment() {
        if (this.currentChar === '/' && this.sourceCode[this.position + 1] === '/') {
            while (this.currentChar && this.currentChar !== '\n') {
                this.advance();
            }
            this.advance(); // 跳过换行
        }
    }

    // 获取数字标记
    number() {
        let result = '';
        while (this.currentChar && /\d/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return { type: 'NUMBER', value: parseInt(result) };
    }

    // 获取标识符或关键字
    identifier() {
        let result = '';
        while (this.currentChar && /[a-zA-Z0-9_\u4e00-\u9fa5]/u.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        // 关键字列表
        const keywords = {
            'fc': 'FUNCTION',
            'if': 'IF',
            'el': 'ELSE',
            'elif': 'ELIF',
            'rt': 'RETURN',
            'wh': 'WHILE',
            'mn': 'MAIN',
            'true': 'BOOLEAN',
            'false': 'BOOLEAN'
        };

        return {
            type: keywords[result] || 'IDENTIFIER',
            value: result
        };
    }

    // 获取字符串标记
    string() {
        let result = '';
        this.advance(); // 跳过开头的引号
        
        while (this.currentChar && this.currentChar !== '"') {
            // 处理转义字符
            if (this.currentChar === '\\') {
                this.advance(); // 跳过反斜杠
                if (this.currentChar) {
                    switch (this.currentChar) {
                        case 'n':
                            result += '\n';
                            break;
                        case 't':
                            result += '\t';
                            break;
                        case '"':
                            result += '"';
                            break;
                        case '\\':
                            result += '\\';
                            break;
                        default:
                            result += this.currentChar;
                    }
                    this.advance();
                }
            } else {
                result += this.currentChar;
                this.advance();
            }
        }
        
        this.advance(); // 跳过结尾的引号
        return { type: 'STRING', value: result };
    }

    // 主函数：生成标记流
    tokenize() {
        const tokens = [];

        while (this.currentChar) {
            if (this.currentChar === '/' && this.sourceCode[this.position + 1] === '/') {
                this.skipComment();
                continue;
            }

            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (/\d/.test(this.currentChar)) {
                tokens.push(this.number());
                continue;
            }

            if (/[a-zA-Z_\u4e00-\u9fa5]/u.test(this.currentChar)) {
                tokens.push(this.identifier());
                continue;
            }

            if (this.currentChar === '"') {
                tokens.push(this.string());
                continue;
            }

            switch (this.currentChar) {
            case '=':
                if (this.sourceCode[this.position + 1] === '=') {
                    tokens.push({ type: 'EQUALS', value: '==' });
                    this.advance();
                } else {
                    tokens.push({ type: 'ASSIGN', value: '=' });
                }
                break;
            case '+':
                if (this.sourceCode[this.position + 1] === '+') {
                    tokens.push({ type: 'INCREMENT', value: '++' });
                    this.advance();
                } else {
                    tokens.push({ type: 'PLUS', value: '+' });
                }
                break;
            case '-':
                if (this.sourceCode[this.position + 1] === '-') {
                    tokens.push({ type: 'DECREMENT', value: '--' });
                    this.advance();
                } else {
                    tokens.push({ type: 'MINUS', value: '-' });
                }
                break;
            case '*':
                tokens.push({ type: 'MULTIPLY', value: '*' });
                break;
            case '/':
                tokens.push({ type: 'DIVIDE', value: '/' });
                break;
            case '.':
                tokens.push({ type: 'DOT', value: '.' });
                break;
            case '(':
                tokens.push({ type: 'LPAREN', value: '(' });
                break;
            case ')':
                tokens.push({ type: 'RPAREN', value: ')' });
                break;
            case '{':
                tokens.push({ type: 'LBRACE', value: '{' });
                break;
            case '}':
                tokens.push({ type: 'RBRACE', value: '}' });
                break;
            case '[':
                tokens.push({ type: 'LBRACKET', value: '[' });
                break;
            case ']':
                tokens.push({ type: 'RBRACKET', value: ']' });
                break;
            case ',':
                tokens.push({ type: 'COMMA', value: ',' });
                break;
            case '<':
                if (this.sourceCode[this.position + 1] === '=') {
                    tokens.push({ type: 'LESS_EQUAL', value: '<=' });
                    this.advance();
                } else {
                    tokens.push({ type: 'LESS_THAN', value: '<' });
                }
                break;
            case '>':
                if (this.sourceCode[this.position + 1] === '=') {
                    tokens.push({ type: 'GREATER_EQUAL', value: '>=' });
                    this.advance();
                } else {
                    tokens.push({ type: 'GREATER_THAN', value: '>' });
                }
                break;
            case '!':
                if (this.sourceCode[this.position + 1] === '=') {
                    tokens.push({ type: 'NOT_EQUAL', value: '!=' });
                    this.advance();
                } else {
                    tokens.push({ type: 'NOT', value: '!' });
                }
                break;
            default:
                throw new Error(`Unexpected character: ${this.currentChar} at position ${this.position}`);
            }
            this.advance();
        }

        return tokens;
    }
}

module.exports = { Lexer };
