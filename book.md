# Nexo 编程语言教程

## 1. 介绍

### 1.1 Nexo 语言简介

Nexo 是一种简洁易用的原创编程语言，使用 Node.js 实现的解释型语言。它设计的目标是提供一种简单但功能强大的编程工具，适合初学者学习编程概念，同时也能用于实际项目开发。

### 1.2 语言特性

- 简洁的函数定义语法
- 支持递归函数
- 模块系统支持
- 清晰的条件和循环语句
- 支持中文标识符
- 简洁的返回语句
- 注释支持
- 布尔值支持（true/false关键字）
- 逻辑非操作符（!）
- 自增自减语法糖（++/--）
- REPL交互式环境
- 单文件执行支持

### 1.3 安装和环境设置

要使用 Nexo 语言，您需要先安装 Node.js。安装完成后，您可以按照以下步骤设置 Nexo 环境：

1. 克隆或下载 Nexo 语言的代码仓库
2. 在终端中导航到 Nexo 目录
3. 安装依赖：`npm install`
4. （可选）将 Nexo 安装为全局命令：`npm link`

### 1.4 第一个 Nexo 程序

让我们创建一个简单的 Nexo 程序来熟悉基本语法：

```nexo
fc mn() {
    ehco("Hello, Nexo!")
}
```

将上述代码保存为 `main.nexo`，然后在终端中运行：

```bash
node nexo.js main.nexo
```

您应该会看到输出：`Hello, Nexo!`

## 2. 基础语法

### 2.1 变量和数据类型

Nexo 语言支持以下数据类型：

- 数字（Number）：整数
- 字符串（String）：用双引号包围的文本
- 布尔值（Boolean）：`true` 或 `false`
- 数组（Array）：用大括号包围的元素集合

变量声明和赋值非常简单：

```nexo
// 数字变量
age = 25

// 字符串变量
name = "Nexo"

// 布尔值变量
is_valid = true

// 数组变量
numbers = {1, 2, 3, 4, 5}
```

### 2.2 运算符

Nexo 支持以下运算符：

- 算术运算符：`+`, `-`, `*`, `/`
- 比较运算符：`==`, `!=`, `<`, `>`, `<=`, `>=`
- 逻辑运算符：`!`（逻辑非）
- 赋值运算符：`=`
- 自增自减运算符：`++`, `--`

### 2.3 条件语句

Nexo 的条件语句使用 `if` 和 `el`（else）关键字：

```nexo
if (条件) {
    // 条件为真时执行
} el {
    // 条件为假时执行
}
```

示例：

```nexo
fc check_number(n) {
    if (n > 0) {
        ehco("正数")
    } el if (n < 0) {
        ehco("负数")
    } el {
        ehco("零")
    }
}
```

### 2.4 循环语句

Nexo 使用 `wh`（while）关键字来创建循环：

```nexo
wh (条件) {
    // 循环体
}
```

示例：

```nexo
fc count_to_ten() {
    i = 1
    wh (i <= 10) {
        ehco(i)
        i++
    }
}
```

### 2.5 函数定义和调用

函数定义使用 `fc` 关键字，返回值使用 `rt` 关键字：

```nexo
fc 函数名(参数1, 参数2) {
    // 函数体
    rt 返回值
}
```

函数调用：

```nexo
函数名(参数1, 参数2)
```

示例：

```nexo
fc add(a, b) {
    rt a + b
}

result = add(5, 3)
ehco("5 + 3 = " + result)
```

### 2.6 注释

Nexo 支持单行注释，使用 `//` 开始：

```nexo
// 这是一行注释
age = 25 // 这也是注释
```

## 3. 数据结构

### 3.1 数组操作

Nexo 提供了丰富的数组操作：

```nexo
// 声明数组
numbers = {1, 2, 3, 4, 5}

// 访问数组元素
first = numbers[0]
ehco("第一个元素: " + first)

// 修改数组元素
numbers[1] = 100
ehco("修改后: " + numbers[1])

// 添加元素
numbers.add(6, 7, 8)
ehco("添加后长度: " + len(numbers))

// 删除元素（按索引）
numbers.del(2)
ehco("删除索引2后: " + numbers)

// 删除元素（按值）
numbers.del(100)
ehco("删除值100后: " + numbers)
```

### 3.2 字符串操作

Nexo 提供了多种字符串操作函数：

```nexo
// 字符串长度
str = "Hello, Nexo!"
ehco("长度: " + len(str))

// 字符串截取
sub_str = sub(str, 7, 4)
ehco("截取: " + sub_str) // 输出 "Nexo"

// 字符串切片
slice_str = slice(str, 7, 11)
ehco("切片: " + slice_str) // 输出 "Nexo"

// 查找子字符串
pos = index(str, "Nexo")
ehco("位置: " + pos) // 输出 7

// 替换子字符串
replaced = rep(str, "Nexo", "World")
ehco("替换后: " + replaced) // 输出 "Hello, World!"

// 转换为大写
upper = up(str)
ehco("大写: " + upper) // 输出 "HELLO, NEXO!"

// 转换为小写
lower = low(upper)
ehco("小写: " + lower) // 输出 "hello, nexo!"

// 去除前后空格
spaced = "  Hello  "
trimmed = trim(spaced)
ehco("去除空格: " + trimmed) // 输出 "Hello"

// 拆分字符串
csv = "a,b,c,d"
array = spl(csv, ",")
ehco("拆分后: " + array) // 输出 "a,b,c,d"

// 连接数组元素
joined = join(array, "-")
ehco("连接后: " + joined) // 输出 "a-b-c-d"
```

## 4. 模块系统

### 4.1 模块的创建

要创建一个模块，只需创建一个 `.nexo` 文件，其中包含函数和变量定义：

```nexo
// math.nexo
fc add(a, b) {
    rt a + b
}

fc subtract(a, b) {
    rt a - b
}

fc multiply(a, b) {
    rt a * b
}

fc divide(a, b) {
    rt a / b
}
```

### 4.2 模块的使用

要使用一个模块，只需通过模块名访问其中的函数：

```nexo
// main.nexo
fc mn() {
    result = math.add(5, 3)
ehco("5 + 3 = " + result)
    
    result = math.subtract(10, 4)
ehco("10 - 4 = " + result)
    
    result = math.multiply(6, 7)
ehco("6 * 7 = " + result)
    
    result = math.divide(20, 4)
ehco("20 / 4 = " + result)
}
```

## 5. 内置函数

### 5.1 数学函数

- `abs(x)`：返回绝对值
- `sqrt(x)`：返回平方根
- `pow(x, y)`：返回 x 的 y 次方
- `sin(x)`：返回正弦值
- `cos(x)`：返回余弦值
- `tan(x)`：返回正切值

### 5.2 字符串函数

- `len(arg)`：返回字符串或数组的长度
- `tostr(arg)`：将值转换为字符串
- `sub(str, start, length)`：截取子字符串
- `slice(str, start, end)`：切片操作
- `index(str, substr)`：查找子字符串位置
- `rep(str, oldStr, newStr)`：替换子字符串
- `up(str)`：转换为大写
- `low(str)`：转换为小写
- `trim(str)`：去除前后空格
- `spl(str, sep)`：拆分字符串为数组
- `join(array, sep)`：数组元素连接为字符串

### 5.3 输入输出函数

- `ehco(args...)`：输出内容
- `fin()`：读取用户输入，不带提示
- `finp(prompt)`：读取用户输入，带提示信息

### 5.4 文件操作函数

- `wr(filePath, content)`：写入文件
- `ct(filePath)`：读取文件内容

## 6. 算法教学

### 6.1 基础算法

#### 6.1.1 线性搜索

```nexo
fc linear_search(array, target) {
    i = 0
    wh (i < len(array)) {
        if (array[i] == target) {
            rt i
        }
        i++
    }
    rt -1
}

// 使用示例
numbers = {5, 2, 9, 1, 5, 6}
target = 9
result = linear_search(numbers, target)
if (result != -1) {
    ehco("找到目标值 " + target + " 在索引 " + result)
} el {
    ehco("未找到目标值 " + target)
}
```

#### 6.1.2 二分搜索

```nexo
fc binary_search(array, target) {
    low = 0
    high = len(array) - 1
    
    wh (low <= high) {
        mid = (low + high) / 2
        if (array[mid] == target) {
            rt mid
        } el if (array[mid] < target) {
            low = mid + 1
        } el {
            high = mid - 1
        }
    }
    rt -1
}

// 使用示例
// 注意：二分搜索要求数组已排序
numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9}
target = 7
result = binary_search(numbers, target)
if (result != -1) {
    ehco("找到目标值 " + target + " 在索引 " + result)
} el {
    ehco("未找到目标值 " + target)
}
```

#### 6.1.3 冒泡排序

```nexo
fc bubble_sort(array) {
    n = len(array)
    i = 0
    wh (i < n - 1) {
        j = 0
        wh (j < n - i - 1) {
            if (array[j] > array[j + 1]) {
                // 交换元素
                temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
            j++
        }
        i++
    }
    rt array
}

// 使用示例
numbers = {64, 34, 25, 12, 22, 11, 90}
sorted = bubble_sort(numbers)
ehco("排序后: " + sorted)
```

#### 6.1.4 选择排序

```nexo
fc selection_sort(array) {
    n = len(array)
    i = 0
    wh (i < n - 1) {
        min_idx = i
        j = i + 1
        wh (j < n) {
            if (array[j] < array[min_idx]) {
                min_idx = j
            }
            j++
        }
        // 交换元素
        temp = array[min_idx]
        array[min_idx] = array[i]
        array[i] = temp
        i++
    }
    rt array
}

// 使用示例
numbers = {64, 25, 12, 22, 11}
sorted = selection_sort(numbers)
ehco("排序后: " + sorted)
```

#### 6.1.5 插入排序

```nexo
fc insertion_sort(array) {
    n = len(array)
    i = 1
    wh (i < n) {
        key = array[i]
        j = i - 1
        wh (j >= 0 && array[j] > key) {
            array[j + 1] = array[j]
            j--
        }
        array[j + 1] = key
        i++
    }
    rt array
}

// 使用示例
numbers = {12, 11, 13, 5, 6}
sorted = insertion_sort(numbers)
ehco("排序后: " + sorted)
```

### 6.2 递归算法

#### 6.2.1 阶乘

```nexo
fc factorial(n) {
    if (n <= 1) {
        rt 1
    } el {
        rt n * factorial(n - 1)
    }
}

// 使用示例
result = factorial(5)
ehco("5 的阶乘: " + result) // 输出 120
```

#### 6.2.2 斐波那契数列

```nexo
fc fibonacci(n) {
    if (n <= 1) {
        rt n
    } el {
        rt fibonacci(n - 1) + fibonacci(n - 2)
    }
}

// 使用示例
ehco("斐波那契数列前10项:")
i = 0
wh (i < 10) {
    ehco(fibonacci(i))
    i++
}
```

#### 6.2.3 汉诺塔

```nexo
fc hanoi(n, source, target, auxiliary) {
    if (n == 1) {
        ehco("移动盘子 1 从 " + source + " 到 " + target)
    } el {
        hanoi(n - 1, source, auxiliary, target)
        ehco("移动盘子 " + n + " 从 " + source + " 到 " + target)
        hanoi(n - 1, auxiliary, target, source)
    }
}

// 使用示例
ehco("汉诺塔解法 (3个盘子):")
hanoi(3, "A", "C", "B")
```

### 6.3 高级算法

#### 6.3.1 快速排序

```nexo
fc quick_sort(array) {
    if (len(array) <= 1) {
        rt array
    }
    
    pivot = array[len(array) - 1]
    left = {}
    right = {}
    
    i = 0
    wh (i < len(array) - 1) {
        if (array[i] < pivot) {
            left.add(array[i])
        } el {
            right.add(array[i])
        }
        i++
    }
    
    // 递归排序左右两部分
    sorted_left = quick_sort(left)
    sorted_right = quick_sort(right)
    
    // 合并结果
    sorted_left.add(pivot)
    j = 0
    wh (j < len(sorted_right)) {
        sorted_left.add(sorted_right[j])
        j++
    }
    
    rt sorted_left
}

// 使用示例
numbers = {10, 7, 8, 9, 1, 5}
sorted = quick_sort(numbers)
ehco("排序后: " + sorted)
```

#### 6.3.2 归并排序

```nexo
fc merge(left, right) {
    result = {}
    i = 0
    j = 0
    
    wh (i < len(left) && j < len(right)) {
        if (left[i] < right[j]) {
            result.add(left[i])
            i++
        } el {
            result.add(right[j])
            j++
        }
    }
    
    // 添加剩余元素
    wh (i < len(left)) {
        result.add(left[i])
        i++
    }
    
    wh (j < len(right)) {
        result.add(right[j])
        j++
    }
    
    rt result
}

fc merge_sort(array) {
    if (len(array) <= 1) {
        rt array
    }
    
    mid = len(array) / 2
    left = {}
    right = {}
    
    i = 0
    wh (i < mid) {
        left.add(array[i])
        i++
    }
    
    wh (i < len(array)) {
        right.add(array[i])
        i++
    }
    
    left = merge_sort(left)
    right = merge_sort(right)
    
    rt merge(left, right)
}

// 使用示例
numbers = {38, 27, 43, 3, 9, 82, 10}
sorted = merge_sort(numbers)
ehco("排序后: " + sorted)
```

#### 6.3.3 动态规划示例：斐波那契数列

```nexo
fc fibonacci_dp(n) {
    if (n <= 1) {
        rt n
    }
    
    dp = {}
    dp[0] = 0
    dp[1] = 1
    
    i = 2
    wh (i <= n) {
        dp[i] = dp[i - 1] + dp[i - 2]
        i++
    }
    
    rt dp[n]
}

// 使用示例
ehco("动态规划计算斐波那契数列:")
i = 0
wh (i < 10) {
    ehco("fib(" + i + ") = " + fibonacci_dp(i))
    i++
}
```

## 7. 实战项目

### 7.1 计算器

```nexo
fc calculate(operation, a, b) {
    if (operation == "add") {
        rt a + b
    } el if (operation == "subtract") {
        rt a - b
    } el if (operation == "multiply") {
        rt a * b
    } el if (operation == "divide") {
        if (b == 0) {
            rt "错误: 除数不能为零"
        }
        rt a / b
    } el {
        rt "错误: 不支持的操作"
    }
}

fc mn() {
    ehco("简单计算器")
    ehco("可用操作: add, subtract, multiply, divide")
    
    operation = finp("请输入操作: ")
    a = parseInt(finp("请输入第一个数: "))
    b = parseInt(finp("请输入第二个数: "))
    
    result = calculate(operation, a, b)
    ehco("结果: " + result)
}
```

### 7.2 猜数字游戏

```nexo
fc mn() {
    ehco("猜数字游戏")
    ehco("我想了一个1到100之间的数字，你有10次机会猜中它。")
    
    // 生成1-100之间的随机数
    target = Math.floor(Math.random() * 100) + 1
    attempts = 0
    max_attempts = 10
    
    wh (attempts < max_attempts) {
        guess = parseInt(finp("请输入你的猜测: "))
        attempts++
        
        if (guess < target) {
            ehco("太小了！")
        } el if (guess > target) {
            ehco("太大了！")
        } el {
            ehco("恭喜你，猜对了！你用了 " + attempts + " 次机会。")
            return
        }
        
        ehco("你还有 " + (max_attempts - attempts) + " 次机会。")
    }
    
    ehco("很遗憾，你没有在10次机会内猜中。正确答案是 " + target + "。")
}
```

### 7.3 简单的待办事项列表

```nexo
fc mn() {
    todo_list = {}
    ehco("待办事项列表")
    ehco("命令: add (添加), list (查看), remove (删除), quit (退出)")
    
    wh (true) {
        command = finp("请输入命令: ")
        
        if (command == "add") {
            task = finp("请输入任务: ")
            todo_list.add(task)
            ehco("任务已添加。")
        } el if (command == "list") {
            ehco("待办事项:")
            if (len(todo_list) == 0) {
                ehco("无待办事项。")
            } el {
                i = 0
                wh (i < len(todo_list)) {
                    ehco(i + 1 + ". " + todo_list[i])
                    i++
                }
            }
        } el if (command == "remove") {
            if (len(todo_list) == 0) {
                ehco("无待办事项可删除。")
            } el {
                index = parseInt(finp("请输入要删除的任务编号: ")) - 1
                if (index >= 0 && index < len(todo_list)) {
                    removed = todo_list[index]
                    todo_list.del(index)
                    ehco("已删除任务: " + removed)
                } el {
                    ehco("无效的任务编号。")
                }
            }
        } el if (command == "quit") {
            ehco("再见！")
            return
        } el {
            ehco("未知命令。请使用 add, list, remove 或 quit。")
        }
    }
}
```

### 7.4 文本分析工具

```nexo
fc count_words(text) {
    words = spl(text, " ")
    return len(words)
}

fc count_characters(text) {
    return len(text)
}

fc count_sentences(text) {
    sentences = spl(text, ".")
    return len(sentences)
}

fc mn() {
    ehco("文本分析工具")
    ehco("请输入一段文本，我将分析其中的单词数、字符数和句子数。")
    
    text = finp("请输入文本: ")
    
    word_count = count_words(text)
    char_count = count_characters(text)
    sentence_count = count_sentences(text)
    
    ehco("分析结果:")
    ehco("单词数: " + word_count)
    ehco("字符数: " + char_count)
    ehco("句子数: " + sentence_count)
}
```

## 8. 语言参考

### 8.1 完整语法表

| 语法元素 | 示例 | 说明 |
|---------|------|------|
| 函数定义 | `fc add(a, b) { rt a + b }` | 定义一个名为 add 的函数，接受两个参数并返回它们的和 |
| 条件语句 | `if (x > 0) { ehco("正数") } el { ehco("非正数") }` | 根据条件执行不同的代码块 |
| 循环语句 | `wh (i < 10) { ehco(i); i++ }` | 当条件为真时重复执行代码块 |
| 变量赋值 | `x = 10` | 将值 10 赋给变量 x |
| 函数调用 | `add(5, 3)` | 调用 add 函数，传入参数 5 和 3 |
| 模块调用 | `math.add(5, 3)` | 调用 math 模块中的 add 函数 |
| 数组声明 | `numbers = {1, 2, 3, 4, 5}` | 声明一个包含 5 个元素的数组 |
| 数组访问 | `first = numbers[0]` | 访问数组的第一个元素 |
| 输出语句 | `ehco("Hello")` | 输出内容到控制台 |
| 输入语句 | `name = finp("请输入姓名: ")` | 读取用户输入，带提示信息 |
| 注释 | `// 这是注释` | 单行注释 |

### 8.2 内置函数参考

#### 数学函数
- `abs(x)`：返回绝对值
- `sqrt(x)`：返回平方根
- `pow(x, y)`：返回 x 的 y 次方
- `sin(x)`：返回正弦值
- `cos(x)`：返回余弦值
- `tan(x)`：返回正切值

#### 字符串函数
- `len(arg)`：返回字符串或数组的长度
- `tostr(arg)`：将值转换为字符串
- `sub(str, start, length)`：截取子字符串
- `slice(str, start, end)`：切片操作
- `index(str, substr)`：查找子字符串位置
- `rep(str, oldStr, newStr)`：替换子字符串
- `up(str)`：转换为大写
- `low(str)`：转换为小写
- `trim(str)`：去除前后空格
- `spl(str, sep)`：拆分字符串为数组
- `join(array, sep)`：数组元素连接为字符串

#### 输入输出函数
- `ehco(args...)`：输出内容
- `fin()`：读取用户输入，不带提示
- `finp(prompt)`：读取用户输入，带提示信息

#### 文件操作函数
- `wr(filePath, content)`：写入文件
- `ct(filePath)`：读取文件内容

### 8.3 最佳实践

1. **命名规范**：使用有意义的变量和函数名，对于中文标识符，确保其含义清晰。

2. **代码组织**：将相关功能组织到模块中，提高代码的可维护性。

3. **注释**：为复杂的代码添加注释，解释其功能和实现思路。

4. **错误处理**：在可能出现错误的地方添加适当的错误处理逻辑。

5. **性能考虑**：对于大型数据处理，选择合适的算法和数据结构。

6. **代码风格**：保持一致的缩进和代码风格，提高代码的可读性。

## 9. 总结

Nexo 是一种简洁易用的编程语言，它提供了现代编程语言的基本特性，同时保持了语法的简洁性。通过本教程，您已经学习了 Nexo 的基本语法、数据结构、模块系统和内置函数，以及如何使用 Nexo 实现各种算法和项目。

Nexo 的设计理念是"简单但强大"，它适合初学者学习编程概念，也可以用于实际项目开发。随着您对 Nexo 的熟悉，您可以尝试创建更复杂的项目，或者甚至为 Nexo 语言本身做出贡献。

祝您在 Nexo 的编程之旅中取得成功！