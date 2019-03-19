
欢迎勇敢的你！

## 以太坊版本说明

为保持一致的源代码讲解环境，本书采用以太坊当前最新发行版 v1.8.23。因此，如果需要，你必须在本地签出此版本分支代码进行查看。命令如下：

首先，创建文件夹存放源代码：
```bash
mkdir -p $GOPATH/src/github.com/ethereum/go-ethereum
```
再从Github下载以太坊Go-ethereum项目源代码：
```bash
cd $GOPATH/src/github.com/ethereum/go-ethereum
git clone https://github.com/ethereum/go-ethereum.git  ./
```
下载成功后，切换 git 分支到 v1.8.23：
```bash
git checkout v1.8.23
```
当你切换分支成功后，看到命令行最后一行信息应该是：
```text
HEAD is now at c942700... Merge pull request #19029 from holiman/update1.8
```
