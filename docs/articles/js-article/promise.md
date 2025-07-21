# Promise 状态吸收

- 当有两个 promise 对象时，另一个 promise 对象状态会吸收第一个 promise 对象状态,根据第一个 promise 对象状态决定第二个 promise 对象状态。
  promistA+规范只描述状态吸收的行为，具体状态吸收过程由 v8 引擎自行实现，具体实现：1.微队列进行准备、吸收两个过程。

```js
// 场景一
const p1 = new Promise((resolve, reject) => {
  resolve();
});

const p2 = new Promise((resolve, reject) => {
  resolve(p1);
});

console.log(p1);
console.log(p2);
// Promise { undefined }
// Promise { <pending> }
```

```js
// 场景二
const p1 = Promise.resolve(1);
const p2 = p1.then(() => p1);
```

```js
// 场景三
const p1 = Promise.resolve(1);
async function test() {
  return p1;
}
const p2 = test();
console.log(p2 === p1);
// False
```

```js
// 题目
async function async1() {
  console.log(1);
  await async2();
  console.log("AA");
}

async function async2() {  //状态吸收需要经过准备、吸收两个微队列的过程
  return Promise.resolve(2);  
}

async1();

Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  });

// 1 3 4 AA 5
```
