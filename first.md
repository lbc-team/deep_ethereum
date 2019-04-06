
# 开始篇

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

## 编译geth

因为本书讲解环境时 go-ethereum 1.8.23，因此为了减少沟通成本，请在本机准备好随时可使用的 geth 可执行程序。

1. 打开 go-ethereum 目录

    ```bash
    cd $GOPATH/src/github.com/ethereum/go-ethereum
    ```

1. 编译 go-ethereum

    ```bash
    make
    # output:
    #   Done building.
    #   Run: "$GOPATH/src/github.com/ethereum/go-ethereum/build/bin/geth" to launch geth.
    ```

    注意：命令是在 Mac 环境下执行，如果是 Windows 电脑，则有所差异，下同。

1. 拷贝可执行程序

    ```bash
    mv $GOPATH/src/github.com/ethereum/go-ethereum/build/bin/geth $GOPATH/bin/geth1823
    ```

    Go 开发中，一般环境变量 `$GOPATH` 均有设置，且 `$GOPATH/bin` 目录也会加入环境变量，方便命令行直接执行可执行程序。
因此 geth 执行程序也重命名为 geth1823 存放至此。

1. 检查文件

    ```bash
    geth1823 version
    # output:
    #   Geth
    #   Version: 1.8.23-stable
    #   ...
    ```