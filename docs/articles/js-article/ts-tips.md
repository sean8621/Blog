# TypeScript 技巧

## 一、类型复用

type 定义的类型可以通过交叉类型（&）来进行复用，而 interface 定义的类型则可以通过继承（extends）来实现复用。值得注意的是，type 和 interface 定义的类型也可以互相复用。下面是一些简单的示例：
**type 类型复用示例**

```ts
type Point = {
  x: number;
  y: number;
};

type Coordinate = Point & {
  z: number;
};
```

**interface 类型复用示例**

```ts
interface Point {
  x: number;
  y: number;
}

interface Coordinate extends Point {
  z: number;
}
```

**interface 复用 type 定义的类型示例**

```ts
type Point = {
  x: number;
  y: number;
};

interface Coordinate extends Point {
  z: number;
}
```

**type 复用 interface 定义的类型示例**

```ts
interface Point {
  x: number;
  y: number;
}

type Coordinate = Point & {
  z: number;
};
```

## 二、新增属性的复用方式

- Omit 和 Pick 分别用于排除和选择类型中的属性，具体使用哪一个取决于具体需求。

**Omit**

```ts
interface Props {
  a: string;
  b: string;
  c: string;
}

interface Props1 extends Omit<Props, "c"> {
  e: string;
}
```

**Pick**

```ts
interface Props {
  a: string;
  b: string;
  c: string;
}

interface Props1 extends Pick<Props, "a" | "b"> {
  e: string;
}
```

## 三、统一使用组件库的基础类型

在开发组件库时，我们经常面临相似功能组件属性命名不一致的问题，例如，用于表示组件是否显示的属性，可能会被命名为 show、open 或 visible。这不仅影响了组件库的易用性，也降低了其可维护性。
为了解决这一问题，定义一套统一的基础类型至关重要。这套基础类型为组件库的开发提供了坚实的基础，确保了所有组件在命名上的一致性。

```ts
import { CSSProperties } from "react";

type Size = "small" | "middle" | "large";

type BaseProps<T> = {
  /**
   * 自定义样式类名
   */
  className?: string;
  /**
   * 自定义样式对象
   */
  style?: CSSProperties;
  /**
   * 控制组件是否显示
   */
  visible?: boolean;
  /**
   * 定义组件的大小，可选值为 small（小）、middle（中）或 large（大）
   */
  size?: Size;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 组件是否为只读状态
   */
  readOnly?: boolean;
  /**
   * 组件的默认值
   */
  defaultValue?: T;
  /**
   * 组件的当前值
   */
  value?: T;
  /**
   * 当组件值变化时的回调函数
   */
  onChange: (value: T) => void;
};
```

基于这些基础类型，定义具体组件的属性类型变得简单而直接：

```ts
interface WInputProps extends BaseProps<string> {
  /**
   * 输入内容的最大长度
   */
  maxLength?: number;
  /**
   * 是否显示输入内容的计数
   */
  showCount?: boolean;
}
```

## 四、处理含有不同类型元素的数组

通过元组，我们可以在一个数组中包含不同类型的元素，同时保持每个元素类型的明确性。

```ts
function useMyHook(): [string, number] {
  return ["示例文本", 42];
}

function MyComponent() {
  const [text, number] = useMyHook();
  console.log(text); // 输出字符串
  console.log(number); // 输出数字
  return null;
}
```

在这个例子中，useMyHook 函数返回一个明确类型的元组，包含一个 string 和一个 number。在 MyComponent 组件中使用这个 Hook 时，我们可以通过解构赋值来获取这两个不同类型的值，同时保持类型安全。

## 五、处理参数数量和类型不固定的函数

当函数的参数数量不固定、类型不同或返回值类型不同时,通过函数重载，我们可以在同一函数名下定义多个函数实现，根据不同的参数类型、数量或返回类型进行区分。

```ts
function greet(name: string): string;
function greet(age: number): string;
function greet(value: any): string {
  if (typeof value === "string") {
    return `Hello, ${value}`;
  } else if (typeof value === "number") {
    return `You are ${value} years old`;
  }
}
```

在这个例子中，我们为 greet 函数提供了两种调用方式，使得函数使用更加灵活，同时保持类型安全。

对于箭头函数，虽然它们不直接支持函数重载，但我们可以通过定义函数签名的方式来实现类似的效果。
这种方法利用了类型系统来提供编译时的类型检查，模拟了函数重载的效果。

```ts
type GreetFunction = {
  (name: string): string;
  (age: number): string;
};

const greet: GreetFunction = (value: any): string => {
  if (typeof value === "string") {
    return `Hello, ${value}`;
  } else if (typeof value === "number") {
    return `You are ${value} years old.`;
  }
  return "";
};
```

## 六、组件属性定义：使用 type 还是 interface

由于同名接口会自动合并，而同名类型别名会冲突，我推荐使用 interface 定义组件属性。这样，使用者可以通过 declare module 语句自由扩展组件属性，增强了代码的灵活性和可扩展性。

```ts
interface UserInfo {
  name: string;
}
interface UserInfo {
  age: number;
}

const userInfo: UserInfo = { name: "张三", age: 23 };
```

## 七、declare module

在 TypeScript 中，declare module 语句用于扩展或修改现有的模块的类型定义，而不需要提供具体的实现。这通常用于为第三方库或模块声明类型，特别是当库本身没有提供类型定义文件时。
declare module 允许你为模块添加、修改或覆盖类型声明，例如接口、类型别名、函数声明等。这对于在使用没有类型定义的 JavaScript 库时非常有用，因为它可以让你在 TypeScript 项目中安全地使用这些库。
**使用 declare module 的例子**
假设你正在使用一个名为 my-library 的第三方 JavaScript 库，但没有可用的 TypeScript 类型定义。你可以创建一个 .d.ts 文件（例如 my-library.d.ts），并在其中使用 declare module 来声明库的类型。

```ts
// my-library.d.ts

// 声明 my-library 模块，并为其添加一个函数的类型声明
declare module "my-library" {
  export function doSomething(a: number, b: number): number;

  // 你可以继续添加更多的类型声明，例如接口、类等
  interface MyLibraryOptions {
    enableLogging?: boolean;
  }
}
```

在上面的例子中，我们为 my-library 模块添加了一个函数 doSomething 的类型声明，以及一个 MyLibraryOptions 接口。这样，当你在 TypeScript 项目中使用 my-library 时，就可以获得类型检查和自动完成功能。

**如何使用声明的模块**
在你的 TypeScript 项目中，你现在可以像使用带有类型定义的模块一样使用 my-library：

```ts
// app.ts

import * as myLib from "my-library";

// 现在可以使用 doSomething 函数，并且会有类型检查和自动完成
myLib.doSomething(2, 3);

// 也可以使用 MyLibraryOptions 接口
const options: myLibrary.MyLibraryOptions = { enableLogging: true };
```

通过这种方式，declare module 使得你可以为任何 JavaScript 库提供 TypeScript 类型声明，从而在 TypeScript 项目中获得更好的开发体验。需要注意的是，declare module 只是声明了类型，并不会生成任何实际的 JavaScript 代码。因此，当你使用 declare module 时，确保相应的 JavaScript 库已经在你的项目中可用。

# 参考文章

1. [TypeScript 很麻烦 💔，不想使用！](https://juejin.cn/post/7344282440725577765)
2. [TypeScript -- declare module](https://www.jianshu.com/p/185baca5a938)
