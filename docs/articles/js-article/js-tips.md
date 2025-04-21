# JavaScript 技巧

## 一、为什么`typeof []` 的返回值是 `"object"`

### 历史原因

JavaScript 最初设计时开发周期较短，语言的类型系统设计相对简单。在早期版本中，JavaScript 只有少数几种基本数据类型（如 `number`、`string`、`boolean`、`null`、`undefined`），而其他所有非基本数据类型的值都被归类为 `object`。数组在 JavaScript 中属于复合数据类型，并非基本数据类型，因此按照当时的设计逻辑，`typeof` 运算符对数组返回 `"object"`。

### 底层实现机制

JavaScript 中的值在底层以二进制形式存储，每个值都有一个类型标签来表示其类型。在 JavaScript 引擎内部，类型标签是一个很小的整数，用于标识值的类型。对于大多数对象（包括数组），类型标签表示的就是对象类型。`typeof` 运算符是根据这个类型标签来判断值的类型的，由于数组的类型标签和普通对象一样被标记为对象类型，所以 `typeof []` 返回 `"object"`。

### 示例代码验证

```javascript
console.log(typeof []); // 输出: "object"
console.log(typeof {}); // 输出: "object"
```

### 如何准确判断数组类型

由于 `typeof` 无法准确区分数组和普通对象，你可以使用以下几种方法来判断一个值是否为数组：

- **`Array.isArray()` 方法**：这是 ES5 引入的方法，专门用于判断一个值是否为数组，使用起来简单直接。

```javascript
const arr = [];
console.log(Array.isArray(arr)); // 输出: true
```

- **`instanceof` 运算符**：用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。
  **虽然通常可用,但在多框架环境下可能失效,因为 Array 构造函数可能来自不同的执行上下文。另外,如果修改了对象的原型链,这个方法也会失效。**

```javascript
const arr = [];
console.log(arr instanceof Array); // 输出: true
```

- **`Object.prototype.toString.call()` 方法**：可以返回一个表示对象类型的字符串，通过判断该字符串是否为 `[object Array]` 来确定是否为数组。

```javascript
const arr = [];
console.log(Object.prototype.toString.call(arr) === "[object Array]"); // 输出: true
```

## 二、toString()

1. `toString()` 方法用于将一个对象转换为字符串。
2. `2.toString()` 会导致语法错误,因为 JavaScript 解析器会将点号优先识别为小数点，而不是对象属性访问符，所以会报语法错误。
3. `2..toString()` 第一个点号被解析为小数点，第二个点号被正确解析为对象属性访问符。这种写法虽然看起来怪异，但在 JavaScript 中是完全有效的语法。
4. `2 .toString()` 通过在数字和点号之间添加空格，可以帮助 JavaScript 解析器正确理解这是一个方法调用而不是小数点。这种写法语法正确且清晰。
5. `(2).toString()`使用括号将数字括起来，可以明确地将其转换为对象，然后调用 toString()方法。这是最常用和最清晰的写法。

- 开发中推荐使用 D 的写法，因为它最清晰易懂。

## 三、window.open

1. `window.open()` 方法用于在浏览器中打开一个新的窗口或标签页。
2. `window.open()` 方法的第一个参数是要打开的 URL，第二个参数是窗口名称，第三个参数是窗口特性。
3. `window.open()` 方法返回一个对新打开窗口的引用，如果浏览器不允许弹出窗口，则返回 `null`。
4. `window.open()` 方法的行为可能会受到浏览器的弹出窗口拦截器的影响，因此在某些情况下可能无法打开新窗口。
5. 调用 window.open 方法以后，远程 URL 不会被立即载入，载入过程是异步的。

## 四、JS 数字在计算机内存中占用多少 Byte

**8 个 Byte 4 个字节**
这是因为 JavaScript 遵循 IEEE 754 标准,使用双精度浮点数来表示所有数值类型。在这个格式中:

- 1 位用于符号(正负)
- 11 位用于指数
- 52 位用于小数部分(尾数)
  总共 64 位,也就是 8 字节。

## 五、js 中的运算符优先级

1. 成员访问和计算属性

`.`（点操作符）

`[]`（计算属性）

`new`（创建实例）

`()`（函数调用）

`new.target`（在构造函数中使用）

2. 新的运算符（ES6+）

`...`（展开运算符）

`super`（调用父类的构造函数）

3. 递增和递减

`++`（递增）

`--`（递减）

4. 一元运算符

`delete`

`void`

`typeof`

`+`（一元加）

`-`（一元减）

`~`（位非）

`!`（逻辑非）

5. 乘法、除法和取模

`\*`（乘法）

`/`（除法）

`%`（取模）

6. 加法和减法

`+`（加法）

`-`（减法）

7. 小于、大于和相等比较

`<`（小于）

`>` （大于）

`<=`（小于等于）

`>=`（大于等于）

`in`（属性存在）

`instanceof`（实例检查）

8. 等号

`==`（等于）

`!=`（不等于）

`===`（严格等于）

`!==`（严格不等于）

9. 按位与

`&`（按位与）

10. 按位异或

`^`（按位异或）

11. 按位或

`|`（按位或）

12. 逻辑与

`&&`（逻辑与）

13. 逻辑或

`||`（逻辑或）

14. 可选链（ES2020+）

`?.`（可选链操作符）

15. 空值合并运算符（ES2020+）

`??`（空值合并操作符）

16. 条件（三元）运算符

`?:`（条件运算符）

17. 赋值运算符

`=`（赋值）

`+=`、`-=`、`\*=`、`/=`、`%=`、`<<=`、`>>=`、`>>>=`、`&=`、`^=`、`|=`等复合赋值运算符。

18. 逗号运算符

`,`（逗号运算符，通常用于分隔多个表达式在单个语句中执行，但优先级最低，因为它主要用于分隔表达式而不是控制运算顺序。）

## 六、sessionStorage、localStorage、cookie

1. 存储容量：
   - `cookie`：每个 cookie 大小限制在 4KB 左右，浏览器对每个域名的 cookie 数量有限制（通常是 20 个）。
   - `sessionStorage`：每个域名的存储容量通常在 5MB 到 10MB 之间。
   - `localStorage`：每个域名的存储容量通常在 5MB 到 10MB 之间。
2. 存储方式：`cookie`、`sessionStorage`、`localStorage` 都是键值对存储，但存储方式不同。

3. 存储时间：`localStorage`的数据会永久保存,`sessionStorage`的数据在页面关闭后失效,`cookie`的数据在浏览器关闭后失效。

4. 三者都受同源策略限制,不能跨域访问

## 七、export 命令

1. export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
2. export 命令必须提供对外的接口，其他脚本才可以通过这个接口，取到对应的值，本质上是在接口名与模块内部变量之间，建立了一一对应的关系

## 八、选择题

```js
for(var i=0;i<3;++i){
    setTimeout(function(){
        console.log(i)；
    },100);
}
// 答案: 3,3,3
```

- 详细分析过程如下:

1. for 循环创建了 3 个 setTimeout 任务,每个任务都包含一个回调函数
2. 这些回调函数都共享同一个变量 i,因为 var 声明的是函数作用域变量
3. 当 setTimeout 的回调函数真正执行时,循环已经完成,此时 i 的值已经变成 3
4. 所以三个回调函数执行时读取到的都是同一个 i 的值,即 3

- 如果想要实现 0,1,2 的输出,可以:

1. 使用 let 代替 var 声明 i
2. 使用闭包保存每次循环时 i 的值
3. 将 i 作为参数传入立即执行函数

## 九、选择题

```js
const print = (fn) => {
  let a = 200;
  fn();
};
let a = 100;
const fn = () => {
  console.log(a);
};
print(fn);
// 答案：200
```

- 关于闭包和作用域的理解，自由变量的查找是在函数定义的地方，向上级查找，而不是在执行的地方

## 十、静态方法和实例方法

1. 静态方法：属于类本身的方法，可以直接通过类名调用，不需要实例化对象。
2. 实例方法：属于实例对象的方法，需要通过实例对象调用。
3. 区别：

- 静态方法通过类名调用
- 实例方法通过实例调用
- 静态方法中的 this 指向类本身
- 实例方法中的 this 指向实例对象

## 十一、阻止浏览器默认行为

- 在现代浏览器中,推荐使用`event.preventDefault()`。
- `window.event.cancelBubble = true `是用来阻止事件冒泡的,不是用来阻止默认行为的
- `event.preventDefault()` 是标准 DOM 事件模型中用来阻止默认行为的方法,但在 IE 浏览器中不支持,所以不是通用解决方案。
- `event.stopPropagation()` 同样是用来阻止事件冒泡的方法,这是标准 DOM 事件模型中的方法,不能阻止默认行为。

## 十二、Node.js 模块加载机制

1. 首先查找核心模块(CORE MODULES)
   Node.js 会优先检查是否是内置的核心模块,如 fs、http 等。

2. 其次查找当前目录下的模块文件(B 选项路径)
   在当前目录下查找 othermodule.js 文件。

3. 然后查找当前目录的 node_modules 目录(A 选项路径)
   在当前目录的 node_modules 文件夹中查找 othermodule 模块。

4. 最后逐级向上查找 node_modules 目录(D 选项路径)
   如果在当前目录没找到,就会往上一级目录查找其 node_modules。

这种查找顺序设计保证了:

1. 核心模块的加载优先级最高
2. 本地模块优先于全局模块
3. 遵循就近原则,从当前目录逐步向上查找
4. 提高了模块的查找效率和可维护性

## 十三、js 变量提升

```js
var a = 1;
function test() {
  console.log(a);
  if (false) {
    var a = 2;
  }
}
test();
// 答案：undefined
```

上述代码等价于：

```js
var a = 1;
function test() {
  var a; // 变量提升，此时a是undefined
  console.log(a);
  if (false) {
    a = 2; // 这行代码永远不会执行
  }
}
```

## 十四、选择题

```js
console.log(0 && 1, 0 || 1, 1 && 3, 1 || 3);
// 0 1 3 1
```

- 0 && 1 结果为 0：
  因为&&运算符遇到假值就会立即返回,0 是假值,所以直接返回 0。

- 0 || 1 结果为 1：
  因为||运算符遇到假值会继续往后找真值,0 是假值所以继续判断 1,1 是真值所以返回 1。

- 1 && 3 结果为 3：
  因为&&运算符在左侧为真值时会返回右侧操作数,1 是真值所以返回 3。

- 1 || 3 结果为 1：
  因为||运算符遇到真值就会立即返回,1 是真值所以直接返回 1。

## 十五、for in 与 for of 区别

在 JavaScript 中，`for...in` 和 `for...of` 是两种不同的循环结构，用途和行为也有所不同。以下是它们的区别和适用场景：

---

### **1. `for...in`**

#### 语法：

```javascript
for (let i in item) {
  // 执行代码
}
```

#### 特点：

- **用于遍历对象的可枚举属性**。
- `i` 是属性名（键），而不是值。
- 主要适用于对象（包括数组、普通对象等）。
- 遍历的是对象的**键**，而不是值。

#### 示例：

```javascript
let obj = { a: 1, b: 2, c: 3 };

for (let key in obj) {
  console.log(key); // 输出: "a", "b", "c"
  console.log(obj[key]); // 输出: 1, 2, 3
}

// 数组的情况
let arr = ["x", "y", "z"];
for (let index in arr) {
  console.log(index); // 输出: "0", "1", "2" （索引）
  console.log(arr[index]); // 输出: "x", "y", "z" （值）
}
```

#### 注意事项：

- 对于数组，`for...in` 遍历的是数组的索引（字符串形式），而不是元素值。
- 不建议用 `for...in` 遍历数组，因为它会遍历所有可枚举属性（包括原型链上的属性），可能会导致意外行为。
- 如果需要遍历对象的键，使用 `for...in` 是合适的。

---

### **2. `for...of`**

#### 语法：

```javascript
for (let i of item) {
  // 执行代码
}
```

#### 特点：

- **用于遍历可迭代对象（如数组、字符串、Map、Set 等）的值**。
- `i` 是值本身，而不是键或索引。
- 只能用于实现了 **`[Symbol.iterator]`** 方法的对象（即支持迭代协议的对象）。
- 不适用于普通的对象（非可迭代对象）。

#### 示例：

```javascript
// 数组
let arr = ["x", "y", "z"];
for (let value of arr) {
  console.log(value); // 输出: "x", "y", "z"
}

// 字符串
let str = "hello";
for (let char of str) {
  console.log(char); // 输出: "h", "e", "l", "l", "o"
}

// Map
let map = new Map([
  ["a", 1],
  ["b", 2],
]);
for (let [key, value] of map) {
  console.log(key, value); // 输出: "a 1", "b 2"
}

// Set
let set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value); // 输出: 1, 2, 3
}
```

#### 注意事项：

- 普通对象不是可迭代对象，因此不能直接使用 `for...of`。
  ```javascript
  let obj = { a: 1, b: 2 };
  for (let value of obj) {
    console.log(value); // 报错：obj is not iterable
  }
  ```
- 如果需要对普通对象使用 `for...of`，可以先将其转换为可迭代的形式，例如通过 `Object.entries()`。

---

### **总结对比**

| 特性                 | `for...in`                   | `for...of`                              |
| -------------------- | ---------------------------- | --------------------------------------- |
| **适用范围**         | 对象（包括数组、普通对象等） | 可迭代对象（数组、字符串、Map、Set 等） |
| **返回值**           | 键（属性名）                 | 值                                      |
| **是否适合数组**     | 不推荐，可能包含额外属性     | 推荐，直接遍历数组的值                  |
| **是否适合普通对象** | 适合，用于遍历对象的键       | 不适合，普通对象不可迭代                |

---

### **选择建议**

1. 如果需要遍历对象的键（属性名），使用 `for...in`。
2. 如果需要遍历数组、字符串或其他可迭代对象的值，使用 `for...of`。
3. 如果需要同时获取键和值，可以结合 `Object.entries()` 使用 `for...of`：
   ```javascript
   let obj = { a: 1, b: 2 };
   for (let [key, value] of Object.entries(obj)) {
     console.log(key, value); // 输出: "a 1", "b 2"
   }
   ```

## 十六、new Boolean()与 Boolean()区别

```js
var x = new Boolean(false);
if (x) {
  alert("hi");
}
var y = Boolean(0);
if (y) {
  alert("hello");
}
```

- `var x = new Boolean(false)` 创建了一个 `Boolean` 对象。尽管传入的参数是 `false`，但是在 `if` 语句中进行条件判断时，对象总是会被计算为 `true`，因此会执行 `alert('hi')`。

- `var y = Boolean(0)` 则是调用 `Boolean` 函数将 `0` 转换为布尔值 `false`，在 `if` 语句中进行条件判断时，`false` 不会执行对应的代码块，因此不会执行 `alert('hello')`。

## 十七、选择题

```js
output(typeof (function() {output(“Hello World!”)})());
// Hello World! undefined
```

- 逐步分析执行过程：

1. 首先,定义了一个匿名函数 function() {output("Hello World!")}
2. 通过末尾的()立即执行这个函数
3. 函数执行时会先输出"Hello World!"
4. 函数没有显式的 return 语句,所以返回 undefined
5. 最后对这个 undefined 值执行 typeof 操作,结果为"undefined"
6. 最终输出"undefined"

- 任何函数执行完一次，如果没有 return 返回值和声明变量接受返回值，都会立即消失，永远找不到值！
