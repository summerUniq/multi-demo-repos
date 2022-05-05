# git 仓库提交记录没有记录contribution

## 原因

提交代码的邮箱不是github配置过的邮箱， github记录的是github关联或配置过的邮箱的提交记录

## 排查方式

git log 查看提交邮箱

## 解决方案

需要记录之后的代码提交：
1- 修改全局的git user.name 或 user.email

```bash
git config --global user.name “github’s Name”
git config --global user.email "github@xx.com"
```

2- 修改本仓库的user.name 或user.email

```bash
git config user.name “github’s Name”
git config user.email "github@xx.com"
```

如果想记录之前的提交记录， 也是两种方式：
1- 将提交邮箱添加到github的邮箱里面
settings->email->add
2- 修改以前提交记录的邮箱

```bash
git filter-branch -f --env-filter '
if [ "$GIT_AUTHOR_NAME" = "oldName" ]
then
export GIT_AUTHOR_NAME="newName"
export GIT_AUTHOR_EMAIL="newEmail"
fi
' HEAD

git filter-branch -f --env-filter '
if [ "$GIT_COMMITTER_NAME" = "oldName" ]
then
export GIT_COMMITTER_NAME="newName"
export GIT_COMMITTER_EMAIL="newEmail"
fi
' HEAD
```
