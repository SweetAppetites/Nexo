# Nexo 编程语言 / Nexo Programming Language

Nexo 是一种简洁易用的原创编程语言，使用 Node.js 实现的解释型语言。
Nexo is a concise and easy-to-use original programming language, implemented as an interpreted language using Node.js.

## 语言特性 / Language Features

- 简洁的函数定义语法 / Concise function definition syntax
- 支持递归函数 / Support for recursive functions
- 模块系统支持 / Module system support
- 清晰的条件和循环语句 / Clear conditional and loop statements
- 支持中文标识符 / Support for Chinese identifiers
- 简洁的返回语句 / Concise return statement
- 注释支持 / Comment support
- 布尔值支持（true/false关键字） / Boolean support (true/false keywords)
- 逻辑非操作符（!） / Logical NOT operator (!)
- 自增自减语法糖（++/--） / Increment/decrement syntax sugar (++/--)
- REPL交互式环境 / REPL interactive environment
- 单文件执行支持 / Single file execution support

## 语法参考 / Syntax Reference

### 1. 函数定义 / Function Definition
```
fc 函数名(参数1, 参数2) {
    // 函数体
    rt 返回值
}
```

### 2. 条件语句 / Conditional Statements
```
if (条件) {
    // 条件为真时执行
} el {
    // 条件为假时执行
}
```

### 3. 循环语句 / Loop Statements
```
wh (条件) {
    // 循环体
}
```

### 4. 变量赋值 / Variable Assignment
```
变量名 = 值
```

### 5. 函数调用 / Function Call
```
函数名(参数1, 参数2)
```

### 6. 模块调用 / Module Call
```
模块名.函数名(参数1, 参数2)
```

### 7. 数组支持 / Array Support
```
// 声明数组
numbers = {1, 2, 3, 4, 5}

// 访问数组元素
first = numbers[0]

// 修改数组元素
numbers[1] = 100

// 添加元素
numbers.add(6, 7, 8)

// 删除元素（按索引）
numbers.del(2)

// 删除元素（按值）
numbers.del(100)
```

### 8. 输出语句 / Output Statement
```
ehco("输出内容", 变量)
```

### 9. 输入语句 / Input Statement
```
// 读取用户输入，不带提示
input = fin()

// 读取用户输入，带提示信息
name = finp("请输入您的名字: ")
```

### 10. 内置函数 / Built-in Functions
```
// 数学函数
abs(-5)       // 绝对值
sqrt(16)      // 平方根
pow(2, 3)     // 幂运算

// 字符串操作
len("hello")          // 字符串长度
len(numbers)         // 数组长度
tostr(123)           // 转换为字符串
sub("hello", 1, 3)    // 截取子字符串（起始位置，长度）
slice("hello", 1, 4)  // 切片操作（起始位置，结束位置）
index("hello", "ll")  // 查找子字符串位置
rep("hello", "l", "x")   // 替换子字符串
up("hello")          // 转换为大写
low("HELLO")         // 转换为小写
trim("  hello  ")     // 去除前后空格
spl("a,b,c", ",")     // 拆分字符串为数组
join(array, "-")      // 数组元素连接为字符串

// 文件读写
wr("file.txt", "内容")  // 写入文件
content = ct("file.txt") // 读取文件
```

### 11. 变量作用域 / Variable Scope
```
// 全局变量 - 可以在任何地方访问
global_var = "我是全局变量"

// 函数定义
fc test_func() {
    // 函数私有变量
    private_var = "我是私有变量"
    
    rt "函数执行完成"
}

// 调用函数
test_func()

// 通过函数名.变量名访问函数私有变量
ehco(test_func.private_var)
```

### 11. 注释 / Comments
```
// 这是一行注释
```

### 14. 布尔值 / Boolean Values
```
// 使用布尔值
is_true = true
is_false = false

// 在条件语句中使用
if (is_true) {
    ehco("条件为真")
} el {
    ehco("条件为假")
}
```

### 15. 逻辑非操作符 / Logical NOT Operator
```
// 使用 ! 否定布尔值
result = !true  // false
result = !false // true
result = !0     // true
result = !1     // false
```

### 16. 自增自减运算符 / Increment/Decrement Operators
```
// 后置自增/自减（先使用后修改）
x = 5
y = x++  // y = 5, x = 6
y = x--  // y = 6, x = 5

// 前置自增/自减（先修改后使用）
x = 5
y = ++x  // y = 6, x = 6
y = --x  // y = 5, x = 5

// 在循环中使用
idx = 0
wh (idx < 5) {
    ehco(idx)
    idx++
}
```

## 解释器实现 / Interpreter Implementation

解释器使用 Node.js 实现，分为三个主要部分：
The interpreter is implemented using Node.js and consists of three main parts:

### 1. 词法分析器 (lexer.js) / Lexer (lexer.js)
将源代码转换为标记流，识别关键字、运算符、标识符等。
Converts source code into a token stream, identifying keywords, operators, identifiers, etc.

### 2. 语法分析器 (parser.js) / Parser (parser.js)
将标记流转换为抽象语法树 (AST)，解析程序结构。
Converts the token stream into an Abstract Syntax Tree (AST), parsing the program structure.

### 3. 解释器核心 (interpreter.js) / Interpreter Core (interpreter.js)
执行抽象语法树，管理变量作用域，处理函数调用和模块加载。
Executes the abstract syntax tree, manages variable scopes, and handles function calls and module loading.

## 使用方法 / Usage

### 1. 安装 Node.js / Install Node.js
确保你的系统已经安装了 Node.js。
Ensure your system has Node.js installed.

### 2. 运行程序 / Run Program

#### 2.1 安装全局命令（可选） / Install Global Command (Optional)

如果希望在任何目录下直接使用 `nexo` 命令，可以将解释器安装为全局模块：
If you want to use the `nexo` command directly in any directory, you can install the interpreter as a global module:

```bash
npm link
```

或使用 `npx` 临时运行：
Or use `npx` to run temporarily:

```bash
npx nexo
```

#### 2.2 REPL 交互式环境 / REPL Interactive Environment

##### 2.2.1 使用 `node nexo.js` 进入 REPL / Enter REPL using `node nexo.js`
在项目目录中直接运行解释器（不指定文件名），将进入交互式环境：
Run the interpreter directly in the project directory (without specifying a filename) to enter the interactive environment:
```bash
node nexo.js
```

##### 2.2.2 使用 `nexo` 命令进入 REPL / Enter REPL using `nexo` command
如果已安装全局命令或使用 `npx`：
If you have installed the global command or use `npx`:
```bash
nexo
```
or
```bash
npx nexo
```

这将显示 `nexo>` 提示符，你可以直接输入 Nexo 代码并执行。输入 `.exit` 可退出 REPL。
This will display the `nexo>` prompt, where you can directly input and execute Nexo code. Type `.exit` to exit the REPL.

#### 2.3 执行指定文件 / Execute Specific File

##### 2.3.1 执行特定文件 / Execute Specific File

使用 `node nexo.js`：
Using `node nexo.js`:
```bash
node nexo.js file.nexo
```

使用 `nexo` 命令：
Using `nexo` command:
```bash
nexo file.nexo
```

##### 2.3.2 执行默认文件 / Execute Default File

如果需要执行 `main.nexo` 文件，可以显式指定：
If you need to execute the `main.nexo` file, you can specify it explicitly:

使用 `node nexo.js`：
Using `node nexo.js`:
```bash
node nexo.js main.nexo
```

使用 `nexo` 命令：
Using `nexo` command:
```bash
nexo main.nexo
```

### 3. 编写自己的程序 / Write Your Own Program

创建一个新的 `.nexo` 文件，或者修改现有的文件。程序入口是 `mn()` 函数，解释器会自动执行这个函数。
Create a new `.nexo` file or modify an existing one. The program entry point is the `mn()` function, which the interpreter will automatically execute.

## 示例代码 / Example Code

### 1. 主程序示例 (main.nexo) / Main Program Example (main.nexo)
```
fc mn() {
    // 基础输出
    ehco("--- 开始执行 ---")
    
    // 调用本地函数
    an()
    
    // 调用 eee.nexo 中的函数
    eee.sh()

    // 演示循环结构 (While Loop)
    idx = 0
    wh (idx < 3) {
        ehco("循环计数: " + idx)
        idx = idx + 1
    }

    // 调用 math.nexo 演示递归 (证明图灵完备)
    num = 5
    res = math.fact(num)
    
    output = "5 的阶乘结果是: " + res
    ehco(output)
}

fc an() {
    ehco("本地函数被调用")
}
```

### 2. 模块示例 (eee.nexo) / Module Example (eee.nexo)
```
fc sh() {
    po="你好👋 来自 eee 模块"
    ehco(po)
    
    // 演示简单的逻辑分支
    is_ok = 1
    if (is_ok == 1) {
        ehco("状态: 正常")
    } el {
        ehco("状态: 错误")
    }
}
```

### 3. 数学函数示例 (math.nexo) / Mathematics Function Example (math.nexo)
```
// 计算阶乘的递归函数
fc fact(n) {
    if (n <= 1) {
        rt 1
    } el {
        // 递归调用自身
        prev = fact(n - 1)
        rt n * prev
    }
}

// 斐波那契数列示例
fc fib(n) {
    if (n <= 1) {
        rt n
    }
    
    a = fib(n - 1)
    b = fib(n - 2)
    rt a + b
}
```

## 执行结果 / Execution Result

运行 `node nexo.js` 后的输出：
Output after running `node nexo.js`:
```
--- 开始执行 ---
本地函数被调用
你好👋 来自 eee 模块
状态: 正常
循环计数: 0
循环计数: 1
循环计数: 2
5 的阶乘结果是: 120

执行完成！
```

## 扩展建议 / Extension Suggestions

1.使字符串操作函数名更符合Nexo风格 / 1.Make string operation function names more consistent with Nexo style

## 许可证 / License

MIT