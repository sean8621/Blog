# CSS 日常遇到的问题

## 1.flex 布局再使用 padding 会使元素靠右

- 原因：display: flex;会使当前 dom 的盒模型变成标准模型,计算宽度不会带上 padding
- 解决方式：设置 box-sizing:border-box;(兼容性加上 -webkit 前缀)

```css
/* 标准模型 */
box-sizing: content-box;
/* IE 模型 */
box-sizing: border-box;
```

## 2.移动端 1px 边框问题

- 原因：移动端 1px 边框问题，主要是因为移动端浏览器的渲染机制，在移动端浏览器中，1px 边框的宽度会根据屏幕的像素密度进行放大，所以需要根据屏幕的像素密度进行设置，否则会出现 1px 边框的宽度不一致的问题。
- 解决方案：

1. 0.5px 边框：一个简单的解决方案

此方法涉及在设备像素比为 2 或更高时有条件地应用 0.5px 边框。

```js
// Check if devicePixelRatio exists and is greater than or equal to 2
if(window.devicePixelRatio && devicePixelRatio>=2){
  // Create a temporary div element for testing
  var testElem = document.createElement('div');
  // Apply a 0.5px transparent border to the test element
  testElem.style.border = '.5px solid transparent';
  // Append the test element to the body
  document.body.appendChild(testElem);
  // Check if the rendered height is 1px (meaning 0.5px border works)
  if(testElem.offsetHeight == 1){
    // If yes, add the 'hairlines' class to the HTML element
    document.querySelector('html').classList.add('hairlines');
  }
  // Remove the test element
  document.body.removeChild(testElem);
}
//  Place the above script inline. If it's inside a function,
// wrap it in $(document).ready(function(){}) to ensure it runs after the DOM is ready.

// Default border style
div{
  border: 1px solid #bbb;
}
// Apply 0.5px border when 'hairlines' class is present
.hairlines div {
  border-width: 0.5px;
}
```

2. 边框图像：完美的边框

使用专门制作的边框图像是一种有效的方法。以下是创建底部边框的方法

```css
.border-bottom-1px {
  // Set other border widths to 0
  border-width: 0 0 1px 0;
  // Apply the border-image – ‘linenew.png’
  // (assuming you have an image for this)
  border-image: url(linenew.png) 0 0 2 0 stretch;
  // For webkit browsers
  -webkit-border-image: url(linenew.png) 0 0 2 0 stretch;
}
```

解释:

- 我们只在底部设置边框（border-width：0 0 1px 0）。

- 使用的图像（“linenew.png”）假定为 2px 高。

- 图像顶部 1px 是透明的，底部 1px 包含实际边框颜色

3. Background-Image：背景技巧
   与 border-image 类似，此方法利用预先准备的图像作为边框。

```css
.backround-image-1px {
  // Set the background image, repeating it along the x-axis and positioning it at the left bottom
  background: url(../img/line.png) repeat-x left bottom;
  // Set the background size for Webkit browsers
  -webkit-background-size: 100% 1px;
  // Set the background size (1px height for the border effect)
  background-size: 100% 1px;
}
```

注意事项：

- 更改颜色需要替换图像。
- 圆角可能会显得模糊，需要额外的样式。

4. 多背景渐变:边框的错觉
   我们可以使用渐变背景来模仿边框的外观。渐变的一半显示所需的颜色，而另一半保持透明。

```css
.background-gradient-1px {
  // Create a multi-background with linear gradients for each side
  background: line-gradient(180deg, black, black 50%, transparent 50%) top left /
      100% 1px no-repeat, line-gradient(
        90deg,
        black,
        black 50%,
        transparent 50%
      ) top right / 1px 100% no-repeat,
    line-gradient(0, black, black 50%, transparent 50%) bottom right / 100% 1px no-repeat,
    line-gradient(-90deg, black, black 50%, transparent 50%) bottom left / 1px 100%
      no-repeat;
}

/* Alternatively, use an older syntax for Webkit browsers*/
.background-gradient-1px {
  // Apply a linear gradient from top to bottom
  background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-step(0.5, transparent),
      // Transparent at 50%
      color-step(0.5, #c8c7cc),
      // Color starts at 50%
      to(#c8c7cc)
    ) // End color
    left bottom repeat-x;
  // Set the background size
  background-size: 100% 1px;
}
```

5. Box-shadow:跳出框框
   让我们利用 CSS 阴影来创建令人信服的边框效果。

```css
.box-shadow-1px {
  // Apply an inset box shadow – the negative spread simulates a thin border
  box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```

6. 视口+Rem:动态二重奏
   调整视口的 rem 基值有助于在不同设备上实现一致的 1px 边框。请记住，使用此技术修改旧项目可能需要进行重大调整。
   **优点**：适用于各种布局的适应性解决方案。
   **缺点**：对于遗留项目来说可能具有挑战性。

```html
// For a device pixel ratio of 1, set the viewport as follows:
<meta
  name="viewport"
  content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
/>

// For a device pixel ratio of 2
<meta
  name="viewport"
  content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
/>
// For a device pixel ratio of 3
<meta
  name="viewport"
  content="initial-scale=0.333333, maximum-scale=0.333333, minimum-scale=0.333333, user-scalable=no"
/>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,user-scalable=no"
    />
    <title>rem+viewport</title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
      }
      #box {
        width: 8rem;
        height: 8rem;
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <div id="box"></div>

    <script type="text/javascript">
      // Get the device pixel ratio
      var dpr = window.devicePixelRatio; // Example: 2 on a Retina display
      console.log(dpr, "dpr+++");

      // Calculate the inverse scale
      var scale = 1 / dpr;
      // Get the initial viewport width – this might be inaccurate due to the dpr
      var width = document.documentElement.clientWidth; // Example: 375 on an iPhone X
      // Adjust the viewport meta tag to counteract the device pixel ratio
      var metaNode = document.querySelector('meta[name="viewport"]');
      metaNode.setAttribute(
        "content",
        "width=device-width,initial-scale=" + scale + ",user-scalable=no"
      );
      // Recalculate the width after viewport adjustment
      var width = document.documentElement.clientWidth; // Now, it should be closer to 750
      // Dynamically set the base font size using rem units
      var styleN = document.createElement("style");
      styleN.innerHTML = "html{font-size: " + width / 16 + "px !important;}";
      document.head.appendChild(styleN);
    </script>
  </body>
</html>
```

7. 伪元素+变换：传统项目英雄
   这种方法对现有项目非常方便。我们删除原始边框，并利用伪元素制作 1px 边框，将其缩小以获得像素完美的外观。

```css
.scale-1px {
  position: relative;
  border: none; // Remove any default borders
}

.scale-1px:after {
  content: "";
  position: absolute;
  bottom: 0;
  background: #000; // Set the desired border color
  width: 100%;
  height: 1px;
  transform: scale(0.5); // Scale down to 0.5 to achieve a thinner border
  transform-origin: 0 0;
}
.scale-1px-top {
  border: none;
  position: relative;
}
.scale-1px-top:before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 200%; // Stretch to cover potential scaling issues
  height: 1px;
  border-top: 1px solid #e7e7e7;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.scale-1px-bottom {
  border: none;
  position: relative;
}
.scale-1px-bottom:before {
  content: "";
  position: absolute;
  display: block;
  bottom: -1px; // Adjust position to avoid overlapping content
  left: 0;
  width: 200%;
  height: 1px;
  border-bottom: 1px solid #ccc;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.borderRadius-1px {
  border-radius: 0.16rem;
  border: none;
  position: relative;
}
.borderRadius-1px:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #d1d1d1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200%; // Ensure the pseudo-element covers the entire element
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: left top;
  transform-origin: left top;
  border-radius: 0.16rem;
}
```

8. SVG:绘制线条

- 我们也可以使用 SVG 直接绘制 1px 线条。

```html
<svg width="100%" height="1" style="position: absolute; bottom: 0; left: 0;">
  <line
    x1="0"
    y1="0"
    x2="1000"
    y2="0"
    style="stroke:#E5E5E5; stroke-width:1"
  ></line>
</svg>
```

摘自[8 个解决移动端 1px 边框困境的方案](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649141719&idx=1&sn=35a037fba4d9e8dbb1d287ce3bde159e&chksm=bfa302e895c261298eb7b7b06876f5323f64f3dc8ce683366da6a24ab115f64ab7c83a792274&scene=27)
