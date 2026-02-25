const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 导入解释器模块
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Interpreter } = require('./interpreter');

// REPL模式
function startRepl() {
    const interpreter = new Interpreter();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'nexo> '
    });

    console.log('Nexo 解释器');
    console.log('输入 .exit 退出');
    rl.prompt();

    rl.on('line', (line) => {
        line = line.trim();
        if (line === '.exit') {
            rl.close();
            return;
        }

        if (line) {
            try {
                // 执行单行代码
                const lexer = new Lexer(line);
                const tokens = lexer.tokenize();
                const parser = new Parser(tokens);
                const ast = parser.parse();
                
                // 执行AST
                interpreter.executeProgram(ast, interpreter.globalScope);
            } catch (error) {
                console.error('错误:', error.message);
            }
        }
        
        rl.prompt();
    });

    rl.on('close', () => {
        console.log('\n退出解释器');
        process.exit(0);
    });
}

// 执行指定文件
function runFile(filePath) {
    try {
        // 创建解释器实例
        const interpreter = new Interpreter();
        
        // 执行指定文件
        interpreter.runFile(filePath);
        
        console.log('\n执行完成！');
    } catch (error) {
        console.error('执行错误:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 主函数
function main() {
    // 获取命令行参数
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // 没有参数，启动REPL模式
        startRepl();
    } else if (args.length === 1) {
        // 有一个参数，执行指定的.nexo文件
        const filePath = args[0];
        if (fs.existsSync(filePath)) {
            runFile(filePath);
        } else {
            console.error(`错误: 文件 '${filePath}' 不存在`);
            process.exit(1);
        }
    } else {
        // 参数过多
        console.log('用法:');
        console.log('  node nexo.js          # 启动REPL模式');
        console.log('  node nexo.js file.nexo # 执行指定的.nexo文件');
        process.exit(1);
    }
}

// 启动解释器
main();
