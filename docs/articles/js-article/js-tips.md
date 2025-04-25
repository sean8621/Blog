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

## 十八、解构

```js
const [a, b] = "123";
const { c, d } = "123";
console.log(a); // 输出：1
console.log(b); // 输出：2
console.log(c); // 输出：undefined
console.log(d); // 输出：undefined
```

- 使用数组解构时，被解构的值需要包含一个迭代器，而字符串原生就携带有一个 Iterator 迭代器，因此可以顺利的对字符串'123'进行解构
- 使用对象解构时，被解构值需要被强制转换为对象，因此字符串'123'被转换为 String 对象，但是当解构一个未定义的属性时得到的值为 undefined

## 十九、闭包

- 闭包的核心特性就是能够访问其他函数内部的变量。它可以"记住"并访问所在的词法作用域,即使函数是在当前词法作用域之外执行。
- 过度使用闭包确实可能导致内存泄露。因为闭包会保持对外部变量的引用,如果闭包的生命周期较长,就会阻止这些变量被垃圾回收器回收。
- 从技术角度来说,所有的 JavaScript 函数都是闭包,因为它们都可以访问外部作用域的变量。即使是一个简单的函数,也会创建一个闭包来访问其所在的词法环境。

## 二十、选择题

```js
let obj = {
  num1: 117,
};
let res = obj;
obj.child = obj = { num2: 935 };
var x = (y = res.child.num2);
console.log(obj.child); // 输出：undefined
console.log(res.num1); // 输出：117
console.log(y); // 输出：935
console.log(x); // 输出：935
console.log(obj); // 输出：{num2: 935}
console.log(res); // 输出：{num1: 117,child: {num2: 935}}
```

## 二十一、axios 取消请求方法

- Axios 自带的 cancelToken 对象
  `AbortController` 是一个浏览器提供的 API，用于取消正在进行的异步操作，如 Fetch 请求或 Axios 请求。你可以创建一个 `AbortController` 实例，并在 Axios 请求配置中通过 signal 属性传递它。

```js
import axios from "axios";

const controller = new AbortController();

axios
  .get("/foo/bar", {
    signal: controller.signal,
  })
  .then((response) => {
    // 处理响应
  })
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("请求被取消");
    } else {
      console.error("发生了一个错误:", error);
    }
  });

// 取消请求
controller.abort();
```

- 浏览器内置的 AbortController 对象
  CancelToken 是 Axios 自带的一个类，用于实现请求取消功能。你需要创建一个 CancelToken 实例，并在请求配置中通过 cancelToken 属性传递它。

```js
import axios from "axios";
import CancelToken from "axios/cancelToken";

let cancel;

// 发起请求
axios
  .get("/foo/bar", {
    cancelToken: new CancelToken((c) => (cancel = c)),
  })
  .then((response) => {
    // 处理响应
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log("请求被取消");
    } else {
      console.error("发生了一个错误:", error);
    }
  });

// 取消请求
if (cancel) {
  cancel("取消请求的原因");
}
```

摘自[Axios 取消请求，封装全局取消请求，axios-retry 请求重试](https://juejin.cn/post/7406166286130135081?searchId=202504221620580D5651B8CE2316AFCF63)

[axios 取消请求原理参考](https://juejin.cn/post/7284417436752265277?searchId=20250422163230E92011E94A065597E303)

## 二十二、内存泄漏情况

1. 全局变量

```js
// 意外的全局变量
function foo(arg) {
  bar = "this is a hidden global variable";
}

// this创建的
function foo() {
  this.variable = "potential accidental global";
}
// foo 调用自己，this 指向了全局对象（window）
foo();
```

- 使用严格模式，可以避免意外的全局变量

2. 闭包

```js
function bindEvent() {
  var obj = document.createElement("XXX");
  var unused = function () {
    console.log(obj, "闭包内引用obj obj不会被释放");
  };
  obj = null; // 解决方法
}
```

3. 定时器

```js
var someResource = getData();
setInterval(function () {
  var node = document.getElementById("Node");
  if (node) {
    // 处理 node 和 someResource
    node.innerHTML = JSON.stringify(someResource);
  }
}, 1000);
```

4. 没有及时清除的 dom 元素

```js
const refA = document.getElementById("refA");
document.body.removeChild(refA); // dom删除了
console.log(refA, "refA"); // 但是还存在引用能console出整个div 没有被回收
refA = null;
console.log(refA, "refA"); // 解除引用
```

5. 没有及时清除监听事件

```js
function test() {
  let el = document.createElement("div");
  document.body.appendChild(el);
  let child = document.createElement("div");
  el.appendChild(child);
  
  document.body.removeChild(el) // 由于 el 变量存在，el及其子元素都不能被GC
  el = null;   // 虽置空了 el 变量，但由于 child 变量引用 el 的子节点，所以 el 元素依然不能被GC
  child = null; // 已无变量引用，此时el可以GC
  
}
​
test();
```

6. 循环引用

- 如果两个对象相互引用，且不存在其他对象对它们的引用，就会导致这两个对象无法被正常释放，从而导致内存泄漏。

```js
function test() {
  var obj1 = {};
  var obj2 = {};
  obj1.prop = obj2;
  obj2.prop = obj1;
}
test();
```

7. eventBus 未清理

- 在 Vue 应用中，eventBus 是常用的组件通信方式之一，但如果使用不当，也会导致内存泄漏。

8. 未调用销毁函数

```js
const sortableInstance = Sortable.create(……)
sortableInstance.destroy()
```

- 调用 destroy() 以移除插件中创建的事件及对象，否则可能造成内存泄漏。

9. 未清理的 Console 输出
   当开发人员使用 Console 输出大量数据时，这些数据可能会残留在浏览器的内存中，并在长时间的使用后导致浏览器变慢，并占用大量的内存。虽然这些数据不会直接导致内存泄漏，但是会降低应用程序的响应速度和性能，影响用户体验。

## 二十三、APP 与 H5 通信

[JSBridge](https://juejin.cn/post/7293728293768855587?searchId=2025042311531746337FABD975D5F3B315#heading-4)

1. JsBridge

- 实现步骤
  1. 初始化 WebViewJavascriptBridge 对象：
     - 对于 Android，如果 WebViewJavascriptBridge 对象已经存在，则直接使用；如果不存在，则在 'WebViewJavascriptBridgeReady' 事件触发时获取 WebViewJavascriptBridge 对象。
     - 对于 iOS，如果 WebViewJavascriptBridge 对象已经存在，直接使用；如果不存在，则创建一个隐藏的 iframe 来触发 WebViewJavascriptBridge 的初始化，并在初始化完成后通过 WVJBCallbacks 回调数组来获取 WebViewJavascriptBridge 对象。
  2. 注册事件
     提供了 callHandler 和 registerHandler 两个方法，分别用于在 JS 中调用 APP 端的方法和注册供 APP 端调用的 JS 方法。
  3. 调用方法
     当 APP 或 JS 需要调用对方的方法时，只需调用 callHandler 或 registerHandler 方法即可。

```js
const { userAgent } = navigator;
const isAndroid = userAgent.indexOf("android") > -1; // android终端

/**
 * Android  与安卓交互时：
 *      1、不调用这个函数安卓无法调用 H5 注册的事件函数；
 *      2、但是 H5 可以正常调用安卓注册的事件函数；
 *      3、还必须在 setupWebViewJavascriptBridge 中执行 bridge.init 方法，否则：
 *          ①、安卓依然无法调用 H5 注册的事件函数
 *          ①、H5 正常调用安卓事件函数后的回调函数无法正常执行
 *
 * @param {*} callback
 */
function androidFn(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      () => {
        callback(window.WebViewJavascriptBridge);
      },
      false
    );
  }
}

/**
 * IOS 与 IOS 交互时，使用这个函数即可，别的操作都不需要执行
 */
function iosFn(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "https://__BRIDGE_LOADED__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

/**
 * 注册 setupWebViewJavascriptBridge 方法
 *  之所以不将上面两个方法融合成一个方法，是因为放在一起，那么就只有 iosFuntion 中相关的方法体生效
 */
const setupWebViewJavascriptBridge = isAndroid ? androidFn : iosFn;

/**
 * 这里如果不做判断是不是安卓，而是直接就执行下面的方法，就会导致
 *      1、IOS 无法调用 H5 这边注册的事件函数
 *      2、H5 可以正常调用 IOS 这边的事件函数，并且 H5 的回调函数可以正常执行
 */
if (isAndroid) {
  /**
   * 与安卓交互时，不调用这个函数会导致：
   *      1、H5 可以正常调用 安卓这边的事件函数，但是无法再调用到 H5 的回调函数
   *
   * 前提 setupWebViewJavascriptBridge 这个函数使用的是 andoirFunction 这个，否则还是会导致上面 1 的现象出现
   */
  setupWebViewJavascriptBridge((bridge) => {
    console.log("打印***bridge", bridge);
    // 注册 H5 界面的默认接收函数（与安卓交互时，不注册这个事件无法接收回调函数）
    bridge.init((message, responseCallback) => {
      responseCallback("JS 初始化");
    });
  });
}

export default {
  // js调APP方法 （参数分别为:app提供的方法名  传给app的数据  回调）
  callHandler(name, params, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler(name, params, callback);
    });
  },

  // APP调js方法 （参数分别为:js提供的方法名  回调）
  registerHandler(name, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.registerHandler(name, (data, responseCallback) => {
        callback(data, responseCallback);
      });
    });
  },
};
```

总结：

1. 跟 IOS 交互的时候，只需要且必须注册 iosFuntion 方法即可，不能在 setupWebViewJavascriptBridge 中执行 bridge.init 方法，否则 IOS 无法调用到 H5 的注册函数；
2. 与安卓进行交互的时候

- 使用 iosFuntion，就可以实现 H5 调用 安卓的注册函数，但是安卓无法调用 H5 的注册函数， 并且 H5 调用安卓成功后的回调函数也无法执行
- 使用 andoirFunction 并且要在 setupWebViewJavascriptBridge 中执行 bridge.init 方法， 安卓才可以正常调用 H5 的回调函数，并且 H5 调用安卓成功后的回调函数也可以正常执行了

H5 使用
h5 获取 app 返回数据

```js
jsBridge.callHandler("getAppUserInfo", { title: "首页" }, (data) => {
  console.log("获取app返回的数据", data);
});
```

app 获取 h5 数据

```js
jsBridge.registerHandler("getInfo", (data, responseCallback) => {
  console.log("打印***get app data", data);
  responseCallback("我是返回的数据");
});
```

两者都可通信，只要一方使用 registerHandler 注册了事件，另一方通过 callHandler 接受数据

[postMessage 和 iframe](https://juejin.cn/post/7294425916549152783#heading-9)

1. postMessage
   postMessage 可以安全地实现跨源通信。从广义上讲，一个窗口可以获得对另一个窗口的引用（比如  targetWindow = window.opener），然后在窗口上调用  targetWindow.postMessage()  方法分发一个  MessageEvent  消息。

A:

```html
<input type="text" id="ipt" />
<button id="btn">点击操作页面</button>
<script>
  btn.onclick = function () {
    const w2 = window.open("http://127.0.0.1:5500/src/utils/index2.html");

    w2.onload = function () {
      w2.postMessage("页面一 发送====> 页面二", "http://127.0.0.1:5500");
    };
  };

  window.addEventListener("message", function (e) {
    console.log(e.data);
    ipt.value = e.data;
  });
</script>
```

B:

```html
<h2 id="h2">标题二</h2>
<button id="btn">点击</button>

<script>
  const parentWindow = window.opener;
  /* 如果是从 http://127.0.0.1:5500 中的某个页面将B页面打开，那么就能成功发送跨文档信息
     如果讲此处的URI换成"*"，就意味着任何网页打开B页面，都能收到B页面传输的信息
     */
  btn.onclick = function () {
    parentWindow.postMessage(h2.innerHTML, "http://127.0.0.1:5500");
  };
  window.addEventListener("message", function (e) {
    console.log(e.data);
    ipt.value = e.data;
  });
</script>
```

1. iframe:
   父:

```html
<iframe
  src="http://127.0.0.1:5500/src/utils/index2.html"
  frameborder="1"
  width="100%"
  height="500px"
  id="Bframe"
></iframe>

<script>
  window.onload = () => {
    let frame = window.frames[0];
    frame.postMessage("父====>子", "http://127.0.0.1:5500");
  };
  window.addEventListener("message", function (e) {
    console.log("父接受数据", e.data);
  });
</script>
```

子:

```html
<input type="text" id="ipt" />
<button id="frameBtn">iframe点击</button>

<script>
  frameBtn.onclick = function () {
    window.top.postMessage(h2.innerHTML, "http://127.0.0.1:5500");
  };
  window.addEventListener("message", function (e) {
    console.log(e.data);
    ipt.value = e.data;
  });
</script>
```
