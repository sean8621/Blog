import{_ as i,c as a,a1 as e,o as t}from"./chunks/framework.C7DD2qdS.js";const k=JSON.parse('{"title":"CSS 日常遇到的问题","description":"","frontmatter":{},"headers":[],"relativePath":"articles/css-article/css-tips.md","filePath":"articles/css-article/css-tips.md"}'),n={name:"articles/css-article/css-tips.md"};function l(p,s,r,d,h,c){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="css-日常遇到的问题" tabindex="-1">CSS 日常遇到的问题 <a class="header-anchor" href="#css-日常遇到的问题" aria-label="Permalink to &quot;CSS 日常遇到的问题&quot;">​</a></h1><h2 id="_1-flex-布局再使用-padding-会使元素靠右" tabindex="-1">1.flex 布局再使用 padding 会使元素靠右 <a class="header-anchor" href="#_1-flex-布局再使用-padding-会使元素靠右" aria-label="Permalink to &quot;1.flex 布局再使用 padding 会使元素靠右&quot;">​</a></h2><ul><li>原因：display: flex;会使当前 dom 的盒模型变成标准模型,计算宽度不会带上 padding</li><li>解决方式：设置 box-sizing:border-box;(兼容性加上 -webkit 前缀)</li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 标准模型 */</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">box-sizing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">content-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* IE 模型 */</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">box-sizing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">border-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div>`,4)]))}const g=i(n,[["render",l]]);export{k as __pageData,g as default};