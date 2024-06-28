import{_ as a,c as n,o as s,a3 as e}from"./chunks/framework.DYHN1iTi.js";const x=JSON.parse('{"title":"nginx 清除页面缓存","description":"","frontmatter":{},"headers":[],"relativePath":"nginx-article/clear-html-cache.md","filePath":"nginx-article/clear-html-cache.md"}'),p={name:"nginx-article/clear-html-cache.md"},l=e(`<h1 id="nginx-清除页面缓存" tabindex="-1">nginx 清除页面缓存 <a class="header-anchor" href="#nginx-清除页面缓存" aria-label="Permalink to &quot;nginx 清除页面缓存&quot;">​</a></h1><h2 id="有时候项目重新部署后用户端访问到的还是旧的页面-这是因为-nginx-缓存了旧的页面-所以需要清除缓存。" tabindex="-1">有时候项目重新部署后用户端访问到的还是旧的页面，这是因为 nginx 缓存了旧的页面，所以需要清除缓存。 <a class="header-anchor" href="#有时候项目重新部署后用户端访问到的还是旧的页面-这是因为-nginx-缓存了旧的页面-所以需要清除缓存。" aria-label="Permalink to &quot;有时候项目重新部署后用户端访问到的还是旧的页面，这是因为 nginx 缓存了旧的页面，所以需要清除缓存。&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        root /var/www/html;</span></span>
<span class="line"><span>        index index.html index.htm;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 清除缓存</span></span>
<span class="line"><span>        add_header Cache-Control &#39;no-cache, no-store, must-revalidate&#39;;</span></span>
<span class="line"><span>        add_header Pragma &#39;no-cache&#39;;</span></span>
<span class="line"><span>        expires 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,3),t=[l];function i(c,r,o,h,d,_){return s(),n("div",null,t)}const g=a(p,[["render",i]]);export{x as __pageData,g as default};
