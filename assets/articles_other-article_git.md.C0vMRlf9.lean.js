import{_ as s,c as t,a1 as e,o as i}from"./chunks/framework.C7DD2qdS.js";const g=JSON.parse('{"title":"git 命令","description":"","frontmatter":{},"headers":[],"relativePath":"articles/other-article/git.md","filePath":"articles/other-article/git.md"}'),p={name:"articles/other-article/git.md"};function n(c,a,l,o,r,h){return i(),t("div",null,a[0]||(a[0]=[e(`<h1 id="git-命令" tabindex="-1">git 命令 <a class="header-anchor" href="#git-命令" aria-label="Permalink to &quot;git 命令&quot;">​</a></h1><h2 id="一、-cherry-pick-合并特定的提交-commits" tabindex="-1">一、 cherry-pick 合并特定的提交（commits） <a class="header-anchor" href="#一、-cherry-pick-合并特定的提交-commits" aria-label="Permalink to &quot;一、 cherry-pick 合并特定的提交（commits）&quot;">​</a></h2><ol><li><p>出你想要合并的提交的哈希值。你可以使用 git log 查看提交历史来找到它们。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git log &lt;branch&gt;</span></span></code></pre></div></li><li><p>确定你想要合并的提交的哈希值后，切换到你想要应用这些更改的分支：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git checkout &lt;target-branch&gt;</span></span></code></pre></div></li><li><p>使用 git cherry-pick 命令合并这些提交</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git cherry-pick &lt;commit-hash&gt;</span></span></code></pre></div></li><li><p>如果你想合并一系列连续的提交，可以使用下面的语法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git cherry-pick &lt;start-commit-hash&gt;^..&lt;end-commit-hash&gt;</span></span></code></pre></div></li><li><p>例子</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 查看feature分支的提交历史</span></span>
<span class="line"><span>git log feature</span></span>
<span class="line"><span># 切换到 master 分支</span></span>
<span class="line"><span>git checkout master</span></span>
<span class="line"><span># 合并特定的提交</span></span>
<span class="line"><span>git cherry-pick 1a2b3c4</span></span></code></pre></div></li></ol>`,3)]))}const u=s(p,[["render",n]]);export{g as __pageData,u as default};