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
