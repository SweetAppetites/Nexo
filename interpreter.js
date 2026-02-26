const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');

// 解释器 - 执行抽象语法树
class Interpreter {
    constructor() {
        // 全局作用域
        this.globalScope = {
            // 内置函数 - 使用rest参数来处理任意数量的参数
            ehco: (...args) => {
                console.log(args.join(' '));
            },
            
            // 数学函数
            abs: (x) => Math.abs(x),
            sqrt: (x) => Math.sqrt(x),
            pow: (x, y) => Math.pow(x, y),
            sin: (x) => Math.sin(x),
            cos: (x) => Math.cos(x),
            tan: (x) => Math.tan(x),
            
            // 字符串操作
            len: (arg) => {
                return typeof arg === 'string' || Array.isArray(arg) ? arg.length : 0;
            },
            tostr: (arg) => String(arg),
            
            // 数据转换函数
            tonum: (arg) => {
                const num = Number(arg);
                return isNaN(num) ? 0 : num;
            },
            tobool: (arg) => Boolean(arg),
            toarr: (arg) => {
                if (Array.isArray(arg)) {
                    return arg;
                } else if (arg === undefined || arg === null) {
                    return [];
                } else {
                    return [arg];
                }
            },
            // 新增字符串操作函数
            sub: (str, start, length) => {
                return typeof str === 'string' ? str.substr(start, length) : '';
            },
            slice: (str, start, end) => {
                return typeof str === 'string' ? str.slice(start, end) : '';
            },
            index: (str, substr) => {
                return typeof str === 'string' ? str.indexOf(substr) : -1;
            },
            rep: (str, oldStr, newStr) => {
                return typeof str === 'string' ? str.replace(oldStr, newStr) : '';
            },
            up: (str) => {
                return typeof str === 'string' ? str.toUpperCase() : '';
            },
            low: (str) => {
                return typeof str === 'string' ? str.toLowerCase() : '';
            },
            trim: (str) => {
                return typeof str === 'string' ? str.trim() : '';
            },
            spl: (str, sep) => {
                return typeof str === 'string' ? str.split(sep) : [];
            },
            join: (arr, sep) => {
                return Array.isArray(arr) ? arr.join(sep || '') : '';
            },
            
            // 输入函数
            fin: () => {
                const input = readlineSync.question('');
                return input;
            },
            finp: (prompt) => {
                const input = readlineSync.question(prompt);
                return input;
            },
            
            // 文件读写 - 重命名为ct和wr
            ct: (filePath) => {
                return fs.readFileSync(filePath, 'utf8');
            },
            wr: (filePath, content) => {
                fs.writeFileSync(filePath, content);
                return true;
            }
        };
        
        // 模块缓存
        this.modules = {};
    }

    // 执行文件
    runFile(filePath) {
        const sourceCode = fs.readFileSync(filePath, 'utf8');
        const lexer = new Lexer(sourceCode);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        
        // 执行AST
        this.executeProgram(ast, this.globalScope);
        
        // 查找并执行主函数 mn()
        if (this.globalScope['mn']) {
            this.globalScope['mn']();
        }
    }

    // 加载模块
    loadModule(moduleName) {
        // 检查模块是否已加载
        if (this.modules[moduleName]) {
            return this.modules[moduleName];
        }
        
        // 构造模块文件路径
        const modulePath = path.join(__dirname, `${moduleName}.nexo`);
        
        try {
            const sourceCode = fs.readFileSync(modulePath, 'utf8');
            const lexer = new Lexer(sourceCode);
            const tokens = lexer.tokenize();
            const parser = new Parser(tokens);
            const ast = parser.parse();
            
            // 创建模块作用域
            const moduleScope = { ...this.globalScope };
            
            // 执行模块代码
            this.executeProgram(ast, moduleScope);
            
            // 缓存模块
            this.modules[moduleName] = moduleScope;
            
            return moduleScope;
        } catch (error) {
            throw new Error(`无法加载模块 ${moduleName}: ${error.message}`);
        }
    }

    // 执行程序
    executeProgram(ast, scope) {
        for (const statement of ast.body) {
            this.execute(statement, scope);
        }
    }

    // 执行语句或表达式
    execute(node, scope) {
        switch (node.type) {
            case 'Program':
                return this.executeProgram(node, scope);
            
            case 'FunctionDeclaration':
                return this.executeFunctionDeclaration(node, scope);
            
            case 'IfStatement':
                return this.executeIfStatement(node, scope);
            
            case 'WhileStatement':
                return this.executeWhileStatement(node, scope);
            
            case 'ReturnStatement':
                return this.executeReturnStatement(node, scope);
            
            case 'AssignmentExpression':
                return this.executeAssignmentExpression(node, scope);
            
            case 'CallExpression':
                return this.executeCallExpression(node, scope);
            
            case 'ModuleCallExpression':
                return this.executeModuleCallExpression(node, scope);
            
            case 'MethodCallExpression':
                return this.executeMethodCallExpression(node, scope);
            
            case 'MemberExpression':
                return this.executeMemberExpression(node, scope);
            
            case 'BinaryExpression':
                return this.executeBinaryExpression(node, scope);
            
            case 'ArrayExpression':
                return this.executeArrayExpression(node, scope);
            
            case 'ArrayAccessExpression':
                return this.executeArrayAccessExpression(node, scope);
            
            case 'Literal':
                return node.value;
            
            case 'UnaryExpression':
                return this.executeUnaryExpression(node, scope);
            
            case 'UpdateExpression':
                return this.executeUpdateExpression(node, scope);
            
            case 'Identifier':
                return this.executeIdentifier(node, scope);
            
            default:
                throw new Error(`未知的节点类型: ${node.type}`);
        }
    }

    // 执行函数声明
    executeFunctionDeclaration(node, scope) {
        const { name, params, body } = node;
        
        // 在作用域中创建函数
        const func = (...args) => {
            // 创建函数作用域
            const funcScope = { ...scope };
            
            // 将参数绑定到函数作用域
            for (let i = 0; i < params.length; i++) {
                funcScope[params[i]] = args[i] !== undefined ? args[i] : null;
            }
            
            // 执行函数体，收集私有变量
            let result = null;
            let returned = false;
            
            for (const statement of body) {
                result = this.execute(statement, funcScope);
                
                // 检查是否有返回语句
                if (result && result.type === 'RETURN_VALUE') {
                    returned = true;
                    break;
                }
            }
            
            // 将函数作用域中的变量复制到函数对象（排除全局变量）
            for (const key in funcScope) {
                if (!scope.hasOwnProperty(key)) {
                    func[key] = funcScope[key];
                }
            }
            
            // 如果有返回值，返回实际值；否则返回null
            return returned ? result.value : null;
        };
        
        // 将函数存储在全局作用域中
        scope[name] = func;
    }

    // 执行if语句
    executeIfStatement(node, scope) {
        const condition = this.execute(node.condition, scope);
        
        if (condition) {
            for (const statement of node.consequent) {
                const result = this.execute(statement, scope);
                if (result && result.type === 'RETURN_VALUE') {
                    return result;
                }
            }
        } else if (node.alternate) {
            for (const statement of node.alternate) {
                const result = this.execute(statement, scope);
                if (result && result.type === 'RETURN_VALUE') {
                    return result;
                }
            }
        }
    }

    // 执行while语句
    executeWhileStatement(node, scope) {
        while (this.execute(node.condition, scope)) {
            for (const statement of node.body) {
                const result = this.execute(statement, scope);
                if (result && result.type === 'RETURN_VALUE') {
                    return result;
                }
            }
        }
    }

    // 执行return语句
    executeReturnStatement(node, scope) {
        const value = this.execute(node.argument, scope);
        return { type: 'RETURN_VALUE', value: value };
    }

    // 执行数组表达式
    executeArrayExpression(node, scope) {
        const elements = node.elements.map(el => this.execute(el, scope));
        
        // 为数组添加内置方法
        elements.add = function(...args) {
            this.push(...args);
            return this;
        };
        
        elements.del = function(index) {
            if (typeof index === 'number') {
                this.splice(index, 1);
            } else {
                // 支持删除任意类型的值
                const idx = this.indexOf(index);
                if (idx !== -1) {
                    this.splice(idx, 1);
                }
            }
            return this;
        };
        
        return elements;
    }

    // 执行数组访问表达式
    executeArrayAccessExpression(node, scope) {
        const array = this.execute(node.array, scope);
        const index = this.execute(node.index, scope);
        
        if (Array.isArray(array)) {
            return array[index];
        } else {
            throw new Error(`类型错误: 无法对非数组进行索引访问`);
        }
    }

    // 执行赋值表达式
    executeAssignmentExpression(node, scope) {
        // 处理数组元素赋值：array[0] = 5
        if (node.left.type === 'ArrayAccessExpression') {
            const array = this.execute(node.left.array, scope);
            const index = this.execute(node.left.index, scope);
            const value = this.execute(node.right, scope);
            
            if (Array.isArray(array)) {
                array[index] = value;
                return value;
            } else {
                throw new Error(`类型错误: 无法对非数组元素进行赋值`);
            }
        } 
        // 普通变量赋值
        else if (node.left.type === 'Identifier') {
            const name = node.left.name;
            const value = this.execute(node.right, scope);
            scope[name] = value;
            return value;
        } else {
            throw new Error(`类型错误: 无法赋值给非标识符或数组元素`);
        }
    }

    // 执行方法调用表达式（如 array.add(5)）
    executeMethodCallExpression(node, scope) {
        const object = this.execute(node.object, scope);
        const args = node.arguments.map(arg => this.execute(arg, scope));
        const methodName = node.method;
        
        // 检查方法是否存在
        if (typeof object[methodName] !== 'function') {
            throw new Error(`对象 ${object} 没有方法 ${methodName}`);
        }
        
        return object[methodName](...args);
    }

    // 执行成员表达式（如 object.property）
    executeMemberExpression(node, scope) {
        const object = this.execute(node.object, scope);
        const propertyName = node.property;
        
        return object[propertyName];
    }

    // 执行函数调用
    executeCallExpression(node, scope) {
        if (node.callee.type === 'Identifier') {
            const funcName = node.callee.name;
            const args = node.arguments.map(arg => this.execute(arg, scope));
            
            // 检查函数是否存在
            if (typeof scope[funcName] !== 'function') {
                throw new Error(`未定义的函数: ${funcName}`);
            }
            
            // 对于内置函数，直接传递参数，而不是数组
            return scope[funcName](...args);
        } else {
            // 处理其他类型的函数调用
            const callee = this.execute(node.callee, scope);
            const args = node.arguments.map(arg => this.execute(arg, scope));
            
            if (typeof callee !== 'function') {
                throw new Error(`无法调用非函数: ${callee}`);
            }
            
            return callee(...args);
        }
    }

    // 执行模块函数调用或属性访问
    executeModuleCallExpression(node, scope) {
        const moduleName = node.module;
        const funcName = node.function;
        const args = node.arguments.map(arg => this.execute(arg, scope));
        
        // 检查是否是函数名.变量名的访问方式
        const object = scope[moduleName];
        
        if (object) {
            // 如果是属性访问（包括函数私有变量）
            if (args.length === 0 && object.hasOwnProperty(funcName)) {
                return object[funcName];
            }
            // 如果是函数调用
            else if (typeof object[funcName] === 'function') {
                return object[funcName](...args);
            }
        }
        
        try {
            // 尝试作为模块调用
            const moduleScope = this.loadModule(moduleName);
            
            if (typeof moduleScope[funcName] === 'function') {
                return moduleScope[funcName](...args);
            } else if (args.length === 0 && moduleScope.hasOwnProperty(funcName)) {
                // 如果不是函数但有该属性，返回属性值
                return moduleScope[funcName];
            }
        } catch (moduleError) {
            // 如果模块调用失败，抛出错误
            throw new Error(`未定义的函数或变量: ${moduleName}.${funcName}`);
        }
    }

    // 执行二元表达式（数学运算、比较等）
    executeBinaryExpression(node, scope) {
        const left = this.execute(node.left, scope);
        const right = this.execute(node.right, scope);
        
        switch (node.operator) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            case '==':
                return left === right;
            case '<':
                return left < right;
            case '>':
                return left > right;
            case '<=':
                return left <= right;
            case '>=':
                return left >= right;
            case '!=':
                return left !== right;
            default:
                throw new Error(`未知的运算符: ${node.operator}`);
        }
    }

    // 执行一元表达式（如 !expression）
    executeUnaryExpression(node, scope) {
        const argument = this.execute(node.argument, scope);
        
        switch (node.operator) {
            case '!':
                return !argument;
            default:
                throw new Error(`未知的一元运算符: ${node.operator}`);
        }
    }
    
    // 执行更新表达式（如 ++x, x--）
    executeUpdateExpression(node, scope) {
        // 获取标识符名称
        let identifierName;
        if (node.argument.type === 'Identifier') {
            identifierName = node.argument.name;
        } else {
            throw new Error(`更新表达式只支持标识符`);
        }
        
        // 获取当前值
        const currentValue = scope[identifierName];
        if (currentValue === undefined) {
            throw new Error(`未定义的变量: ${identifierName}`);
        }
        
        // 计算新值
        let newValue;
        if (node.operator === '++') {
            newValue = currentValue + 1;
        } else if (node.operator === '--') {
            newValue = currentValue - 1;
        } else {
            throw new Error(`未知的更新运算符: ${node.operator}`);
        }
        
        // 更新变量
        scope[identifierName] = newValue;
        
        // 前置操作返回新值，后置操作返回旧值
        return node.prefix ? newValue : currentValue;
    }
    
    // 执行标识符
    executeIdentifier(node, scope) {
        if (scope[node.name] === undefined) {
            throw new Error(`未定义的变量: ${node.name}`);
        }
        return scope[node.name];
    }
}

module.exports = { Interpreter };
