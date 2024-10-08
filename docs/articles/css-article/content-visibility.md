# 使用 content-visibility 优化渲染性能

## 何为 content-visibility?

`content-visibility`：属性控制一个元素是否渲染其内容，它允许用户代理（浏览器）潜在地省略大量布局和渲染工作，直到需要它为止。

> MDN 原文：The content-visibility CSS property controls whether or not an element renders its contents at all, along with forcing a strong set of containments, allowing user agents to potentially omit large swathes of layout and rendering work until it becomes needed. Basically it enables the user agent to skip an element's rendering work (including layout and painting) until it is needed — which makes the initial page load much faster.

常见属性

```css
/* Keyword values */
content-visibility: visible;
content-visibility: hidden;
content-visibility: auto;
```

分别解释一下：

- `content-visibility: visible`：默认值，没有任何效果，相当于没有添加`content-visibility`，元素的渲染与往常一致。
- `content-visibility: hidden`：与`display: none`类似，用户代理将跳过其内容的渲染。（这里需要注意的是，跳过的是内容的渲染）
- `content-visibility: auto`：如果该元素不在屏幕上，并且与用户无关，则不会渲染其后代元素。

**contain-intrinsic-size**
当然，除`content-visibility`之外，还有一个与之配套的属性--`contain-intrinsic-size`。

`contain-intrinsic-size`：控制由`content-visibility`指定的元素的自然大小。

上面两个属性光看定义和介绍会有点绕。

我们首先来看看`content-visibility`如何具体使用。

`content-visibility`: visible 是默认值，添加后没有任何效果，我们就直接跳过。

## 利用 content-visibility: hidden 优化展示切换性能

首先来看看`content-visibility: hidden`，它通常会拿来和`display: none`做比较，但是其实它们之间还是有很大的不同的。

首先，假设我们有两个 DIV 包裹框：

```html
<div class="g-wrap">
  <div>1111</div>
  <div class="hidden">2222</div>
</div>
```

设置两个 div 为 200x200 的黑色块：

```css
.g-wrap > div {
  width: 200px;
  height: 200px;
  background: #000;
}
```

![效果1](./assets/content-visibility-1.png)

接下来，我们给其中的 .hidden 设置 content-visibility: hidden，看看会发生什么：

```css
.hidden {
  content-visibility: hidden;
}
```

![效果2](./assets/content-visibility-2.png)

注意，仔细看效果，这里添加了`content-visibility: hidden`之后，**消失的只是添加了该元素的 div 的子元素消失不见，而父元素本身及其样式，还是存在页面上的。**

如果我们去掉设置了`content-visibility: hidden`的元素本身的 width、height、padding、margin 等属性，则元素看上去就如同设置了 display: none 一般，在页面上消失不见了。

那么，`content-visibility: hidden`的作用是什么呢？

设置了`content-visibility: hidden`的元素，其元素的子元素将被隐藏，但是，它的渲染状态将会被缓存。所以，当`content-visibility: hidden`被移除时，用户代理无需重头开始渲染它和它的子元素。

因此，如果我们将这个属性应用在一些一开始需要被隐藏，但是其后在页面的某一时刻需要被渲染，或者是一些需要被频繁切换显示、隐藏状态的元素上，其渲染效率将会有一个非常大的提升。

## 利用`content-visibility: auto`实现虚拟列表

接下来是`content-visibility`的核心用法，利用`auto`属性值。
`content-visibility: auto`的作用是，如果该元素不在屏幕上，并且与用户无关，则不会渲染其后代元素。是不是与 LazyLoad 非常类似？
我们来看这样一个 DEMO，了解其作用：
假设，我们存在这样一个 HTML 结构，含有大量的文本内容：

```html
<div class="g-wrap">
  <div class="paragraph">...</div>
  // ... 包含了 N 个 paragraph
  <div class="paragraph">...</div>
</div>
```

每个`.paragraph`的内容如下：
![Alt](./assets/content-visibility-3.png)
因此，整个的页面看起来就是这样的：
![Alt](./assets/content-visibility-4.gif)

由于，我们没有对页面内容进行任何处理，因此，所有的`.paragraph`在页面刷新的一瞬间，都会进行渲染，看到的效果就如上所示。

当然，现代浏览器愈加趋于智能，基于这种场景，其实我们非常希望对于仍未看到，仍旧未滚动到的区域，可以延迟加载，只有到我们需要展示、滚动到该处时，页面内容才进行渲染。

基于这种场景，`content-visibility: auto`就应运而生了，它允许浏览器对于设置了该属性的元素进行判断，如果该元素当前不处于视口内，则不渲染该元素。

我们基于上述的代码，只需要最小化，添加这样一段代码：

```css
.paragraph {
  content-visibility: auto;
}
```

再看看效果，仔细观察右侧的滚动条：
![Alt](./assets//content-visibility-5.png)

> 这里我使用了`::-webkit-scrollbar`相关样式，让滚动条更明显。

可能你还没意识到发生了什么，我们对比下添加了`content-visibility: auto`和没有添加`content-visibility: auto`的两种效果下文本的整体高度：
![Alt](./assets/content-visibility-6.png)

有着非常明显的差异，这是因为，设置了`content-visibility: auto`的元素，在非可视区域内，目前并没有被渲染，因此，右侧内容的高度其实是比正常状态下少了一大截的。

好，我们实际开始进行滚动，看看会发生什么：
![Alt](./assets/content-visibility-7.gif)

由于下方的元素在滚动的过程中，出现在视口范围内才被渲染，因此，滚动条出现了明显的飘忽不定的抖动现象。（当然这也是使用了`content-visibility: auto`的一个小问题之一），不过明显可以看出，这与我们通常使用 JavaScript 实现的虚拟列表非常类似。

当然，在向下滚动的过程中，上方消失的已经被渲染过且消失在视口的元素，也会因为消失在视口中，重新被隐藏。因此，即便页面滚动到最下方，整体的滚动条高度还是没有什么变化的。

## content-visibility 是否能够优化渲染性能？

那么，`content-visibility`是否能够优化渲染性能呢？

在 [Youtube -- Slashing layout cost with content-visibility](https://www.youtube.com/watch?v=FFA-v-CIxJQ&t=869s) 中，给了一个非常好的例子。

这里我简单复现一下。

对于一个存在巨量 HTML 内容的页面，譬如类似于这个页面 -- [HTML - Living Standard](https://html.spec.whatwg.org/)

![Alt](./assets/content-visibility-8.gif)

可以感受到，往下翻，根本翻不到尽头。（这里我在本地模拟了该页面，复制了该页面的所有 DOM，并非实际在该网站进行测试）

如果不对这个页面做任何处理，看看首次渲染需要花费的时间：
![Alt](./assets/content-visibility-9.png)
可以看到，DOMContentLoaded 的时间的 `3s+`，而花费在 Rendering 上的就有整整 `2900ms`！

而如果给这个页面的每个段落，添加上`content-visibility: auto`，再看看整体的耗时：
![Alt](./assets/content-visibility-10.png)
可以看到，DOMContentLoaded 的时间骤降至了 `500ms+`，而花费在 Rendering 上的，直接优化到了 `61ms`！

`2900ms --> 61ms`，可谓是惊人级别的优化了。因此，`content-visibility: auto` 对于长文本、长列表功能的优化是显而易见的。

## 利用`contain-intrinsic-size`解决滚动条抖动问题

当然，`content-visibility`也存在一些小问题。

从上面的例子，也能看到，在利用`content-visibility: auto`处理长文本、长列表的时候。在滚动页面的过程中，滚动条一直在抖动，这不是一个很好的体验。

当然，这也是许多虚拟列表都会存在的一些问题。

好在，规范制定者也发现了这个问题。这里我们可以使用另外一个 CSS 属性，也就是文章一开头提到的另外一个属性 -- `contain-intrinsic-size`，来解决这个问题。

`contain-intrinsic-size`：控制由`content-visibility`指定的元素的自然大小。

什么意思呢？

还是上面的例子

```html
<div class="g-wrap">
  <div class="paragraph">...</div>
  // ... 包含了 N 个 paragraph
  <div class="paragraph">...</div>
</div>
```

如果我们不使用`contain-intrinsic-size`，只对视口之外的元素使用`content-visibility: auto`，那么视口外的元素高度通常就为 0。

> 当然，如果直接给父元素设置固定的 height，也是会有高度的。

那么实际的滚动效果，滚动条就是抖动的：
![Alt](./assets/content-visibility-11.gif)

所以，我们可以同时利用上`contain-intrinsic-size`，如果能准确知道设置了`content-visibility: auto`的元素在渲染状态下的高度，就填写对应的高度。如果如法准确知道高度，也可以填写一个大概的值：

```css
.paragraph {
  content-visibility: auto;
  contain-intrinsic-size: 320px;
}
```

如此之后，浏览器会给未被实际渲染的视口之外的`.paragraph`元素一个高度，避免出现滚动条抖动的现象：
![Alt](./assets/content-visibility-12.gif)
你可以自己亲自尝试感受一下：[CodePen Demo -- content-visibility: auto Demo](https://codepen.io/Chokcoco/pen/rNJvPEX)

## `content-visibility: auto` VS `LazyLoad`

那么，`content-visibility: auto` **是否可以替代** LazyLoad（懒加载）呢？

我们来看看我们通常对于 LazyLoad（懒加载）的一个定义。

**LazyLoad**：通常而言，LazyLoad 的作用在于，当页面未滚动到相应区域，该区域内的资源（网络请求）不会被加载。反之，当页面滚动到相应区域，相关资源的请求才会被发起。

那么，如果 `content-visibility: auto` 要能够替代 LazyLoad，则需要做到，初始化渲染的时候，在页面当前展示范围外的，设定了 `content-visibility: auto` 的元素内的一些静态资源不会被加载。

这里我尝试做了一个简单的 DEMO：

还是借助上述的代码，假设我们有如下的 HTML 结构，也就是在上述代码基础上，插入一些图片资源：

```html
<div class="g-wrap">
  <div class="paragraph">...</div>
  // ... 包含了 N 个 paragraph
  <div class="paragraph">...</div>
  <div class="g-img">
    <img
      src="https://www.womenly.net/wp-content/uploads/2017/03/Tips-to-Maintain-the-Soft-Skin.jpg"
    />
  </div>
  <div class="g-img">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8kEsEE3hJ64aU-_TKQJtvKDtTOGQfT3A4A&usqp=CAU"
    />
  </div>
  <div class="g-img">
    <img
      src="https://i.pinimg.com/originals/e8/ba/25/e8ba252917952f23dfc9715e942e654e.jpg"
    />
  </div>
</div>
```

相应设置下 CSS：

```css
.paragraph,
.g-img {
  content-visibility: auto;
}
```

当刷新页面的时候，观察网络请求（Network）的状况：
![Alt](./assets/content-visibility-13.png)

即便当前页面可视区域外的内容未被渲染，但是图片依然会被加载！

因此，这也得到了一个非常重要的结论：

`content-visibility: auto` 无法直接替代 LazyLoad，设置了 `content-visibility: auto` 的元素在可视区外只是未被渲染，但是其中的静态资源仍旧会在页面初始化的时候被全部加载。

所以，在实际使用中，如果你的业务中已经使用了比较完善的 Lazyload 处理长列表或者一些图片资源，那么 `content-visibility: auto` 不是更好的选择。

## 可访问性功能探究

当然，`content-visibility: auto` 的特性又引申出了另外一个有意思的点。

如果说可视区外的内容未被渲染，那是否会影响用户进行全文检索呢？毕竟这是一个非常重要的功能。

我们再来做个探究，还是上面的 DEMO，我们在首尾添加两个特殊的字符串：

```html
<div class="g-wrap">
  <div class="text">
    <p>content-visibility: auto 对搜索功能影响的探究</p>
  </div>
  <div class="paragraph">...</div>
  // ... 包含了 N 个 paragraph
  <div class="paragraph">...</div>
  <div class="text">
    <p>content-visibility: auto 对搜索功能影响的探究</p>
  </div>
</div>
```

相应设置下 CSS：

```css
.paragraph,
.text {
  content-visibility: auto;
}
```

好，如此一来，在页面刷新后，第二个`.text`是处于未被渲染状态，我们试着全局`ctrl + F`查找一下，看看能找到几个：
![Alt](./assets/content-visibility-14.png)
很有意思的现象，全局查找的时候，可以找到当前未被渲染的元素内的内容。

这里，我们可以得到另外一个非常重要的点：

**即便存在设置了**`content-visibility: auto`**的未被渲染的元素，但是它并不会影响全局的搜索功能。**

这也是`content-visibility`设计上充分的考虑，对**可访问性**功能，或者说用户体验的考量，有了这一点，对于它的实际使用有着非常大的帮助。

## content-visibility 的一些其他问题

首先，看看 content-visibility 的兼容性（2024-08-14）：
![Alt](./assets/content-visibility-15.png)
同时，也有一些同学表示，利用`content-visibility: auto`只能解决部分场景，在海量 DOM 的场景下的实际效果，还有待进一步的实测。真正运用的时候，多做对比，在做取舍。

当然，现代浏览器已经越来越智能，类似`content-visibility`功能的属性也越来越多，我们在性能优化的路上有了更多选择，总归是一件好事。

## 总结

1. 在一些需要被频繁切换显示、隐藏状态的元素上，使用 content-visibility: hidden，用户代理无需重头开始渲染它和它的子元素，能有效的提升切换时的渲染性能；
2. content-visibility: auto 的作用更加类似于虚拟列表，使用它能极大的提升长列表、长文本页面的渲染性能；
3. 合理使用 contain-intrinsic-size 预估设置了 content-visibility: auto 元素的高宽，可以有效的避免滚动条在滚动过程中的抖动；
4. content-visibility: auto 无法直接替代 LazyLoad，设置了 content-visibility: auto 的元素在可视区外只是未被渲染，但是其中的静态资源仍旧会在页面初始化的时候被全部加载；
5. 即便存在设置了 content-visibility: auto 的未被渲染的元素，但是它并不会影响全局的搜索功能。


[原文地址](https://github.com/chokcoco/iCSS/issues/185)
