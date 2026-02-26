// 语法分析器 - 将标记流转换为抽象语法树
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
        this.currentToken = tokens[0];
    }

    // 前进到下一个标记
    advance() {
        this.position++;
        this.currentToken = this.position < this.tokens.length ? this.tokens[this.position] : null;
    }

    // 匹配当前标记类型
    match(type) {
        if (this.currentToken && this.currentToken.type === type) {
            this.advance();
            return true;
        }
        return false;
    }

    // 程序的入口点 - 解析所有语句
    parse() {
        const statements = [];
        while (this.currentToken) {
            statements.push(this.statement());
        }
        return { type: 'PROGRAM', body: statements };
    }

    // 解析语句
    statement() {
        if (this.currentToken.type === 'FUNCTION') {
            return this.functionDeclaration();
        }
        return this.expressionStatement();
    }

    // 解析函数声明：fc 函数名(参数) { 函数体 }
    functionDeclaration() {
        this.advance(); // 跳过 'fc'
        
        const name = this.currentToken.value;
        this.advance(); // 跳过函数名
        
        this.match('LPAREN'); // 匹配 '('
        
        // 解析参数列表
        const params = [];
        while (this.currentToken && this.currentToken.type === 'IDENTIFIER') {
            params.push(this.currentToken.value);
            this.advance();
            if (this.currentToken && this.currentToken.type === 'COMMA') {
                this.advance();
            }
        }
        
        this.match('RPAREN'); // 匹配 ')'
        this.match('LBRACE'); // 匹配 '{'
        
        // 解析函数体
        const body = this.blockStatement();
        
        return {
            type: 'FunctionDeclaration',
            name: name,
            params: params,
            body: body
        };
    }

    // 解析代码块 { ... }
    blockStatement() {
        const statements = [];
        
        while (this.currentToken && this.currentToken.type !== 'RBRACE') {
            statements.push(this.statement());
        }
        
        this.match('RBRACE'); // 匹配 '}'
        return statements;
    }

    // 解析表达式语句
    expressionStatement() {
        if (this.currentToken.type === 'IF') {
            return this.ifStatement();
        }
        if (this.currentToken.type === 'WHILE') {
            return this.whileStatement();
        }
        if (this.currentToken.type === 'RETURN') {
            return this.returnStatement();
        }
        
        // 处理前置自增/自减：++x 或 --x
        if (this.currentToken.type === 'INCREMENT' || this.currentToken.type === 'DECREMENT') {
            const operator = this.currentToken.value;
            this.advance();
            
            if (this.currentToken.type === 'IDENTIFIER') {
                const identifier = this.identifier();
                return {
                    type: 'UpdateExpression',
                    operator: operator,
                    argument: identifier,
                    prefix: true
                };
            }
        }
        
        const stmt = this.assignmentStatement();
        
        // 处理后置自增/自减：x++ 或 x--
        if (this.currentToken && (this.currentToken.type === 'INCREMENT' || this.currentToken.type === 'DECREMENT')) {
            const operator = this.currentToken.value;
            this.advance();
            return {
                type: 'UpdateExpression',
                operator: operator,
                argument: stmt,
                prefix: false
            };
        }
        
        return stmt;
    }

    // 解析if语句：if (条件) { 代码块 } elif (条件) { 代码块 } el { 代码块 }
    ifStatement() {
        this.advance(); // 跳过 'if'
        
        this.match('LPAREN'); // 匹配 '('
        const condition = this.expression();
        this.match('RPAREN'); // 匹配 ')'
        
        this.match('LBRACE'); // 匹配 '{'
        const consequent = this.blockStatement();
        
        let alternate = null;
        let currentIf = null;
        
        // 处理 elif 分支
        while (this.currentToken && this.currentToken.type === 'ELIF') {
            this.advance(); // 跳过 'elif'
            
            this.match('LPAREN'); // 匹配 '('
            const elifCondition = this.expression();
            this.match('RPAREN'); // 匹配 ')'
            
            this.match('LBRACE'); // 匹配 '{'
            const elifConsequent = this.blockStatement();
            
            // 创建新的 IfStatement
            const newIf = {
                type: 'IfStatement',
                condition: elifCondition,
                consequent: elifConsequent,
                alternate: null
            };
            
            if (!alternate) {
                // 第一个 elif 作为初始 if 的 alternate
                alternate = newIf;
                currentIf = newIf;
            } else {
                // 后续的 elif 作为前一个 if 的 alternate
                currentIf.alternate = newIf;
                currentIf = newIf;
            }
        }
        
        // 处理 else 分支
        if (this.currentToken && this.currentToken.type === 'ELSE') {
            this.advance(); // 跳过 'el'
            this.match('LBRACE'); // 匹配 '{'
            const elseBlock = this.blockStatement();
            
            if (currentIf) {
                // 如果有 elif 分支，else 作为最后一个 elif 的 alternate
                currentIf.alternate = elseBlock;
            } else {
                // 如果没有 elif 分支，else 作为初始 if 的 alternate
                alternate = elseBlock;
            }
        }
        
        return {
            type: 'IfStatement',
            condition: condition,
            consequent: consequent,
            alternate: alternate
        };
    }

    // 解析while语句：wh (条件) { 代码块 }
    whileStatement() {
        this.advance(); // 跳过 'wh'
        
        this.match('LPAREN'); // 匹配 '('
        const condition = this.expression();
        this.match('RPAREN'); // 匹配 ')'
        
        this.match('LBRACE'); // 匹配 '{'
        const body = this.blockStatement();
        
        return {
            type: 'WhileStatement',
            condition: condition,
            body: body
        };
    }

    // 解析return语句：rt 表达式
    returnStatement() {
        this.advance(); // 跳过 'rt'
        const argument = this.expression();
        return {
            type: 'ReturnStatement',
            argument: argument
        };
    }

    // 解析赋值语句：变量名 = 表达式
    assignmentStatement() {
        const left = this.identifier();
        
        if (this.currentToken && this.currentToken.type === 'ASSIGN') {
            this.advance(); // 跳过 '='
            const right = this.expression();
            return {
                type: 'AssignmentExpression',
                left: left,
                right: right
            };
        } else {
            return left;
        }
    }

    // 解析标识符或函数调用
    identifier() {
        let left = {
            type: 'Identifier',
            name: this.currentToken.value
        };
        this.advance();
        
        // 处理链式调用（如 a.b.c() 或 array.add()）
        while (this.currentToken && (this.currentToken.type === 'DOT' || this.currentToken.type === 'LBRACKET')) {
            if (this.currentToken.type === 'DOT') {
                this.advance(); // 跳过 '.'
                
                if (this.currentToken && this.currentToken.type === 'IDENTIFIER') {
                    const propertyName = this.currentToken.value;
                    this.advance();
                    
                    // 检查是否是函数调用
                    if (this.currentToken && this.currentToken.type === 'LPAREN') {
                        this.advance(); // 跳过 '('
                        
                        const args = [];
                        while (this.currentToken && this.currentToken.type !== 'RPAREN') {
                            args.push(this.expression());
                            if (this.currentToken && this.currentToken.type === 'COMMA') {
                                this.advance();
                            }
                        }
                        
                        this.match('RPAREN'); // 匹配 ')'
                        
                        // 模块调用：module.func()
                        if (left.type === 'Identifier') {
                            return {
                                type: 'ModuleCallExpression',
                                module: left.name,
                                function: propertyName,
                                arguments: args
                            };
                        } 
                        // 对象方法调用：obj.method()
                        else {
                            return {
                                type: 'MethodCallExpression',
                                object: left,
                                method: propertyName,
                                arguments: args
                            };
                        }
                    }
                    
                    // 普通属性访问
                    left = {
                        type: 'MemberExpression',
                        object: left,
                        property: propertyName
                    };
                }
            } 
            // 数组访问：array[0]
            else if (this.currentToken.type === 'LBRACKET') {
                this.advance();
                const index = this.expression();
                this.match('RBRACKET');
                
                left = {
                    type: 'ArrayAccessExpression',
                    array: left,
                    index: index
                };
            }
        }
        
        // 检查是否是函数调用
        if (this.currentToken && this.currentToken.type === 'LPAREN') {
            this.advance(); // 跳过 '('
            
            // 解析参数列表
            const args = [];
            while (this.currentToken && this.currentToken.type !== 'RPAREN') {
                args.push(this.expression());
                if (this.currentToken && this.currentToken.type === 'COMMA') {
                    this.advance();
                }
            }
            
            this.match('RPAREN'); // 匹配 ')'
            
            return {
                type: 'CallExpression',
                callee: left,
                arguments: args
            };
        }
        
        return left;
    }

    // 解析表达式
    expression() {
        let expr = this.assignmentExpression();
        
        // 处理后置自增/自减：x++ 或 x--
        if (this.currentToken && (this.currentToken.type === 'INCREMENT' || this.currentToken.type === 'DECREMENT')) {
            const operator = this.currentToken.value;
            this.advance();
            return {
                type: 'UpdateExpression',
                operator: operator,
                argument: expr,
                prefix: false
            };
        }
        
        return expr;
    }

    // 赋值表达式
    assignmentExpression() {
        let left = this.logicalOrExpression();
        
        if (this.currentToken && this.currentToken.type === 'ASSIGN') {
            this.advance(); // 跳过 '='
            const right = this.assignmentExpression();
            return {
                type: 'AssignmentExpression',
                left: left,
                right: right
            };
        }
        
        return left;
    }

    // 逻辑或表达式
    logicalOrExpression() {
        let left = this.logicalAndExpression();
        return left;
    }

    // 逻辑与表达式
    logicalAndExpression() {
        let left = this.equalityExpression();
        return left;
    }

    // 相等性表达式（==, !=）
    equalityExpression() {
        let left = this.relationalExpression();
        
        while (this.currentToken && ['EQUALS', 'NOT_EQUAL'].includes(this.currentToken.type)) {
            const operator = this.currentToken.value;
            this.advance();
            const right = this.relationalExpression();
            left = {
                type: 'BinaryExpression',
                left: left,
                operator: operator,
                right: right
            };
        }
        
        return left;
    }

    // 关系表达式（<, >, <=, >=）
    relationalExpression() {
        let left = this.additiveExpression();
        
        while (this.currentToken && ['LESS_THAN', 'GREATER_THAN', 'LESS_EQUAL', 'GREATER_EQUAL'].includes(this.currentToken.type)) {
            const operator = this.currentToken.value;
            this.advance();
            const right = this.additiveExpression();
            left = {
                type: 'BinaryExpression',
                left: left,
                operator: operator,
                right: right
            };
        }
        
        return left;
    }

    // 加法表达式（+, -）
    additiveExpression() {
        let left = this.multiplicativeExpression();
        
        while (this.currentToken && ['PLUS', 'MINUS'].includes(this.currentToken.type)) {
            const operator = this.currentToken.value;
            this.advance();
            const right = this.multiplicativeExpression();
            left = {
                type: 'BinaryExpression',
                left: left,
                operator: operator,
                right: right
            };
        }
        
        return left;
    }

    // 乘法表达式（*, /）
    multiplicativeExpression() {
        let left = this.primaryExpression();
        
        while (this.currentToken && ['MULTIPLY', 'DIVIDE'].includes(this.currentToken.type)) {
            const operator = this.currentToken.value;
            this.advance();
            const right = this.primaryExpression();
            left = {
                type: 'BinaryExpression',
                left: left,
                operator: operator,
                right: right
            };
        }
        
        return left;
    }

    // 基本表达式（数字、字符串、括号表达式、标识符、数组）
    primaryExpression() {
        // 处理逻辑非表达式：!expression
        if (this.currentToken && this.currentToken.type === 'NOT') {
            this.advance();
            const argument = this.primaryExpression();
            return { type: 'UnaryExpression', operator: '!', argument: argument };
        }
        
        // 处理前置自增/自减：++x 或 --x
        if (this.currentToken.type === 'INCREMENT' || this.currentToken.type === 'DECREMENT') {
            const operator = this.currentToken.value;
            this.advance();
            
            if (this.currentToken.type === 'IDENTIFIER') {
                const identifier = this.identifier();
                return {
                    type: 'UpdateExpression',
                    operator: operator,
                    argument: identifier,
                    prefix: true
                };
            }
        }
        
        // 处理负数字面量
        if (this.currentToken && this.currentToken.type === 'MINUS') {
            this.advance();
            if (this.match('NUMBER')) {
                return { type: 'Literal', value: -this.tokens[this.position - 1].value };
            }
        }
        
        if (this.match('NUMBER')) {
            return { type: 'Literal', value: this.tokens[this.position - 1].value };
        }
        
        if (this.match('STRING')) {
            return { type: 'Literal', value: this.tokens[this.position - 1].value };
        }
        
        if (this.match('BOOLEAN')) {
            return { type: 'Literal', value: this.tokens[this.position - 1].value === 'true' };
        }
        
        if (this.match('LPAREN')) {
            const expr = this.expression();
            this.match('RPAREN');
            return expr;
        }
        
        // 数组声明：{1, 2, 3}
        if (this.match('LBRACE')) {
            const elements = [];
            while (this.currentToken && this.currentToken.type !== 'RBRACE') {
                elements.push(this.expression());
                if (this.currentToken && this.currentToken.type === 'COMMA') {
                    this.advance();
                }
            }
            this.match('RBRACE');
            return {
                type: 'ArrayExpression',
                elements: elements
            };
        }
        
        const identifier = this.identifier();
        
        // 数组访问：identifier[1]
        if (this.currentToken && this.currentToken.type === 'LBRACKET') {
            this.advance();
            const index = this.expression();
            this.match('RBRACKET');
            return {
                type: 'ArrayAccessExpression',
                array: identifier,
                index: index
            };
        }
        
        return identifier;
    }
}

module.exports = { Parser };
