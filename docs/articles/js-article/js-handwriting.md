# JS 手写题

## 手写 toFixed

```js
function toFixed(num, n) {
  // 将 num 乘以 10 的 d 次方，目的是将小数部分移到整数部分。
  // 比如，如果 d = 2，num = 1.234，则结果为 123.4。
  num *= Math.pow(10, n);
  // 使用 Math.round() 将移到整数部分的数字进行四舍五入。
  // 继续上面的例子，结果为 123。
  num = Math.round(num);
  // 将整数部分除以 10 的 d 次方，将整数部分还原为原来的小数形式。
  // 上面例子中，结果为 1.23。
  reuturn num / Math.pow(10, n);
}
function toFixed(num, n) {
    // 先将 value 乘以 10 的 digits 次方，使得我们可以将小数部分转换为整数部分
    // 例如，如果 value = 1.234，digits = 2，那么 temp = 1.234 * 100 = 123.4
    const temp = num*Math.pow(10,n)
    // 将 temp 转换为字符串，然后使用 split('.') 分割整数部分和小数部分
    // 例如，temp = 123.4，那么 left = "123", right = "4"
    let [left,right]=String(temp).split('.')
    // 检查小数部分的第一位数字（right），是否大于或等于 5
    // 如果是，则整数部分 (left) 增加 1，从而实现四舍五入
    if(Number(right)>=5){
        left=Number(left)+1
    }
    // 将四舍五入后的整数部分转换为字符串，并分割成数组
    const leftArr=String(left).split('')
    // 在数组中适当的位置插入小数点，以恢复到 digits 位小数的形式
    // 例如，如果 digits = 2，那么我们就在数组的倒数第 2 位前插入小数点
    leftArr.splice(-digits, 0, '.');
    // 将数组重新组合为字符串，并返回结果
    return leftArr.join('');
}
```

## 手写模板字符串

```js
function template(str, obj) {
    // 使用正则表达式 /{{(.*?)}}/g 查找字符串中的所有占位符
    // 占位符的格式为{{key}}，其中 key 是对象 obj 中的一个属性名
    return str.replace(/{{(.*?)}}/g, function(match, key) {
    // 对于每个匹配到的占位符，使用回调函数替换
    // match 是整个匹配到的字符串 (例如 "{{name}}")
    // key 是正则表达式中捕获的组 (.*?)，即去除花括号后的内容 (例如 "name")
    // 使用 trim() 方法去除 key 前后的空白字符
    // 从对象 obj 中查找与 key 对应的值，并替换掉占位符
    return obj[key.trim()];
    }
}
```

## 手写防抖

```js
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(context, ...arguments);
    }, delay || 500);
  };
}
window.onresize = debounce(function () {
  console.log("resize");
}, 500);
```

## 手写节流

```js
function throttle(fn, delay) {
  let timer = null;
  let firstTime = true;
  let _self = fn;
  return function () {
    let that = this;
    let args = arguments;
    // 第一次执行时，设置一个定时器，然后进入 if 语句
    if (firstTime) {
      _self.apply(that, args);
      return (firstTime = false);
    }
    // 判断是否执行完毕
    if (timer) {
      return false;
    }
    // 设置定时器
    timer = setTimeout(() => {
      cleartimeout(timer);
      timer = null;
      _self.apply(that, args);
    }, delay || 500);
  };
}
window.onresize = throttle(function () {
  console.log("window onresize");
}, 500);
```

## 手写 forEach

```js
let family = ["jim", "tom", "jack", "kim"];
Array.prototype.myforEach = function (func) {
  if (this === null) {
    throw new TypeError("Array.prototype.reduce called on null or undefined");
  }
  if (typeof func !== "function") {
    throw new TypeError(func + " is not a function");
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    func(arr[i], i, arr);
  }
};
family.forEach((item, index, arr) => {
  arr[index] = `hello ${item}`;
}); // ["hello jim", "hello tom", "hello jack", "hello kim"]
family.myforEach((item, index, arr) => {
  arr[index] = `${item}!`;
}); // ["hello jim!", "hello tom!", "hello jack!", "hello kim!"]
```
