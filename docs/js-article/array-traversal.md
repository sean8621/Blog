# JS 数组遍历

## 1.循环遍历

**代码**

```js
for (var i = 0; i < arr.length; i++) {
  // arr 是要遍历的数组
  // arr[i] 是遍历的数组的元素
  // i 是数组的元素对应的下标(索引号)
}
```

## 2.for of 方法

**代码**

```js
for (var item of arr) {
  // item 遍历的数组的元素
}
```

## 3.forEach 遍历

**代码**

```js
arrObj.forEach((item, index, self) => {
  // item 遍历出的每一个元素
  // index 元素对应的下标
  // self 数组本身
  // 无返回值
});
```

## 4.map 映射

**代码**

```js
arrObj.map((item, index, self) => {
  // item 遍历出的每一个元素
  // index 元素对应的下标
  // self 数组本身
  // 有返回值
  // 数组元素个数不变，但是按照一定的条件转换
});
```

## 5.filter 过滤

**代码**

```js
arrObj.filter((item, index, self) => {
  // item 遍历出的每一个元素
  // index 元素对应的下标
  // self 数组本身
  // 有返回值
  // 返回满足某个条件的元素构成的数组
});
```

## 6.reduce 高阶函数（迭代（累加器））

**代码**

```js
arrObj.reduce((total, item, index, self) => {
  // total 初始值或计算结束后的返回值
  // item 遍历出的每一个元素
  // index 元素对应的下标
  // self 数组本身
  // 有返回值
  // 返回计算结束后的total值
}, 0); // 需要设置初始值
```

## 7.every

**代码**

```js
arrObj.every((item, index, self) => {
  // item 遍历出的每一个元素
  // index 元素对应的下标
  // self 数组本身
  // 有返回值
  // 检测数组里的每一个值是否满足指定条件，如果有一个值不满足，返回false，剩余的值不再进行检测
  // 如果所有的值都满足，则返回true
});
```

## 8.some

**代码**

```js
arrObj.some((item, index, self) => {
  // item 遍历出的每一个元素
  // index 元素对应的下标
  // self 数组本身
  // 有返回值
  // 检测数组里的每一个值是否满足指定条件，如果有一个值满足，返回true，剩余的值不再进行检测
  // 如果所有的值都不满足，则返回false
});
```
