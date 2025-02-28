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

```javascript
const arr = [];
console.log(arr instanceof Array); // 输出: true
```

- **`Object.prototype.toString.call()` 方法**：可以返回一个表示对象类型的字符串，通过判断该字符串是否为 `[object Array]` 来确定是否为数组。

```javascript
const arr = [];
console.log(Object.prototype.toString.call(arr) === "[object Array]"); // 输出: true
```
