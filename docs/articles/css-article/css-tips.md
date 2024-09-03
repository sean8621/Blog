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
