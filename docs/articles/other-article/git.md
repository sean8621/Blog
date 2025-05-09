# git 命令

## 一、 cherry-pick 合并特定的提交（commits）

1. 出你想要合并的提交的哈希值。你可以使用 git log 查看提交历史来找到它们。

   ```
   git log <branch>
   ```

2. 确定你想要合并的提交的哈希值后，切换到你想要应用这些更改的分支：

   ```
   git checkout <target-branch>
   ```

3. 使用 git cherry-pick 命令合并这些提交

   ```
   git cherry-pick <commit-hash>
   ```

4. 如果你想合并一系列连续的提交，可以使用下面的语法：

   ```
   git cherry-pick <start-commit-hash>^..<end-commit-hash>
   ```

5. 例子

   ```
   # 查看feature分支的提交历史
   git log feature
   # 切换到 master 分支
   git checkout master
   # 合并特定的提交
   git cherry-pick 1a2b3c4
   ```

## 二、git revert 撤销 merge 之后再次 merge 代码无变化
1. 场景复现：前段时间，把开发分支代码合并到主分支，需求变动需要撤销合并，后面开发完成后再次合并代码，发现代码无变化，
2. 原因：`git revert <commit-id>`是用于在下次提交时删除某个文件，以达到撤销的目的。当再次合并相同的提交时因为此提交是存在主分支上的，所以git会拒绝重复的合并commit。 
3. 解决：
   1. 暴力解决：手动修改然后提交代码。
   2. 再次`revert`：对`revert`的那次记录再次进行`revert`操作。
4. 原因深究：[merge原理](https://juejin.cn/post/7426287101425844278)
