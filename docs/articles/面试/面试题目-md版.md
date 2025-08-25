## 1 JS 事件循环 (Event Loop)

**高频追问**

- 微任务和宏任务的区别是什么？
- setTimeout 和 Promise 谁先执行？为什么？
- 浏览器和 Node.js 的事件循环有区别吗？

**核心答案（扩展版）**

- JS 是单线程的，通过事件循环（Event Loop）实现异步执行。
- **执行顺序**：同步任务 → 微任务 → 宏任务 → 下一轮循环。

  - **同步任务**：立即执行代码
  - **微任务（Microtask）**：Promise.then、MutationObserver、queueMicrotask，优先于宏任务
  - **宏任务（Macrotask / Task）**：setTimeout、setInterval、I/O 回调

- 浏览器事件循环：执行全局同步 → 微任务队列 → 宏任务队列 → 渲染 → 下一轮循环
- Node.js 事件循环分阶段执行：Timers → I/O Callbacks → Idle/Prepare → Poll → Check → Close Callbacks

**示例代码**

```js
console.log("1"); // 同步
setTimeout(() => console.log("2"), 0); // 宏任务
Promise.resolve().then(() => console.log("3")); // 微任务
console.log("4"); // 同步
```

**输出顺序**：1 4 3 2

**追问延伸**

- 微任务会阻塞渲染，长时间微任务可能导致 UI 卡顿。
- setTimeout(fn,0) 并不保证立即执行，进入宏任务队列等待下一轮事件循环。
- Promise 链中 then 多层形成微任务队列，保持顺序可预测。

---

## 2 TypeScript 优势

**高频追问**

- 接口 (interface) 和类型别名 (type) 区别？
- 泛型怎么保证类型安全？
- 装饰器 (Decorator) 在前端项目有什么应用？

**核心答案（扩展版）**

- TypeScript 提供 **静态类型检查**，提前发现潜在错误，减少运行时异常。
- **接口 / 类型别名**：定义对象、函数或类结构约束，接口可继承，类型别名更灵活。
- **泛型**：在函数、类、接口中实现类型复用，同时保证类型安全。
- **装饰器**：用于类和类方法的元编程，可实现 AOP、依赖注入、权限控制等。
- **优势场景**：大型项目、跨模块开发、多人协作、第三方库类型定义。
- **注意事项**：类型过度约束可能增加复杂度；泛型递归需注意性能和可读性。

**示例代码**

```ts
interface User {
  name: string;
  age: number;
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user: User = { name: "Tom", age: 18 };
console.log(getProperty(user, "name")); // Tom

function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
}
class Test {
  @log
  say(msg: string) {
    console.log(msg);
  }
}
new Test().say("Hello");
```

**追问延伸**

- 接口继承 vs 类型别名交叉类型
- 泛型约束 `extends` 的实际应用
- 装饰器在 Vue2 class-component、Angular DI 等场景

---

## 3 闭包作用

**高频追问**

- 闭包会造成内存泄漏吗？
- 闭包和模块化有什么关系？
- 常见应用场景有哪些？

**核心答案（扩展版）**

- 闭包是函数和其 **词法作用域** 的组合。
- 用途：封装私有变量、缓存计算结果、模块化逻辑封装。
- **内存泄漏**：闭包保留外部引用，可能阻止垃圾回收；需注意解除引用。
- **应用场景**：计数器、事件处理器、函数工厂、惰性加载。

**示例代码**

```js
function counter() {
  let count = 0;
  return () => ++count;
}
const c = counter();
console.log(c()); // 1
console.log(c()); // 2
```

**追问延伸**

- 闭包与模块化的关系：模块内部函数形成闭包，数据私有化
- 内存泄漏调试方法：Chrome DevTools 的 Memory 快照
- 高阶函数、柯里化都常用闭包实现

---

## 4 this 指向规则

**高频追问**

- 箭头函数 vs 普通函数 this 指向
- bind/call/apply 如何影响 this
- 构造函数中的 this

**核心答案（扩展版）**

- **四类规则**：

  1. 默认绑定（非严格模式：全局对象，严格模式：undefined）
  2. 隐式绑定（对象调用）
  3. 显式绑定（call / apply / bind）
  4. 构造函数绑定（new 调用）

- **箭头函数**：没有自己的 this，继承外层作用域的 this

**示例代码**

```js
const obj = {
  a: 1,
  fn() {
    console.log(this.a);
  },
};
obj.fn(); // 1
const f = obj.fn;
f(); // undefined (严格模式)
const g = f.bind(obj);
g(); // 1
```

**追问延伸**

- 箭头函数与闭包结合，避免 this 指向丢失
- Vue / React 中常见 this 问题及解决方法

明白了，我会从 **第 5 条（this 指向规则）** 开始，序号按你要求从 5 开始，顺序生成到第 27 条，全部用 Markdown 格式，每条包含：

- 高频追问
- 核心答案（扩展版）
- 示例代码 / 图示
- 追问延伸

---

## 5 Vue3 vs Vue2

**高频追问**

- 为什么 Composition API 更适合大型项目？
- Proxy 与 defineProperty 的区别？
- Tree-shaking、Fragment、Teleport、Suspense 的实际作用？

**核心答案（扩展版）**

- Vue3 使用 **Composition API**：逻辑复用和组合性更好，适合大型项目
- Vue3 响应式基于 **Proxy**，性能优于 Vue2 的 defineProperty
- 新特性：

  - **Fragment**：支持组件返回多个根节点
  - **Teleport**：跨 DOM 渲染
  - **Suspense**：异步组件加载等待

- 支持 **Tree-shaking**，减少打包体积

**示例代码**

```js
import { ref, computed } from "vue";
export default {
  setup() {
    const count = ref(0);
    const double = computed(() => count.value * 2);
    function increment() {
      count.value++;
    }
    return { count, double, increment };
  },
};
```

**追问延伸**

- Composition API 如何实现逻辑复用（可用 composables 示例）
- Proxy 对数组、对象变化监听的原理
- Suspense 在实际异步请求场景的应用

---

## 6 Vue 响应式原理

**高频追问**

- Proxy vs defineProperty 的具体性能差异
- Vue3 响应式对数组的操作如何追踪？
- 响应式系统如何避免不必要的渲染？

**核心答案（扩展版）**

- Vue2 用 **defineProperty**，递归劫持对象属性，性能低，新增属性需 Vue.set
- Vue3 用 **Proxy**，无需递归，支持动态属性监听，对数组操作性能更优
- 响应式系统通过 **依赖收集** (Dep/Effect) 精准触发更新

**示例代码**

```js
import { reactive, effect } from "vue";

const state = reactive({ count: 0 });
effect(() => console.log(state.count));
state.count++; // 自动触发 effect
```

**追问延伸**

- Proxy 可以劫持哪些操作（get/set/deleteProperty）
- Vue3 中 effect 和依赖收集机制
- 如何避免重复渲染和无限循环

---

## 7 React Hooks 原理

**高频追问**

- 为什么 Hooks 只能在函数顶层调用？
- useState / useEffect 内部原理
- 闭包问题如何避免？

**核心答案（扩展版）**

- Hooks 依赖 **调用顺序**，函数顶层保证每次渲染调用顺序一致
- useState 维护内部状态快照，useEffect 负责副作用
- 闭包问题可能导致 stale state，用 useRef / useCallback / useEffect 解决

**示例代码**

```js
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>Add</button>;
}
```

**追问延伸**

- 自定义 Hook 如何复用逻辑
- useReducer 和 useState 的适用场景
- useEffect 清理函数的作用

---

## 8 组件复用与状态管理

**高频追问**

- Pinia 与 Vuex 的差异
- 如何模块化管理组件状态
- 跨组件 / 跨页面状态共享

**核心答案（扩展版）**

- Pinia：轻量、组合式 API、支持 TS 类型推导
- Vuex：经典模块化、严格模式
- 模块化封装组件状态，Pinia 更适合组合式逻辑
- 跨组件可通过全局 store 或事件总线实现

**示例代码**

```ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ name: "Tom", age: 18 }),
  actions: {
    updateName(n: string) {
      this.name = n;
    },
  },
});
```

**追问延伸**

- 何时选择 Pinia 或 Vuex
- store 动态注册与模块拆分策略
- SSR 环境下状态管理注意事项
