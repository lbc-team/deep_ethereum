# Summary

* [开始](first.md)
* [术语表](term.md)
* [资源库](resource.md)

## 数据结构与对象

* [链参数配置](part1/config.md)
* [创世区块与链配置载入分析](part1/genesis.md)
* [账户](part1/account.md)
* [理解Gas和手续费](part1/gas.md)
* [交易](part1/transaction.md)
* [区块](part1/block.md)
* [交易收据](part1/receipt.md)
* [布隆Bloom](part1/bloom.md)
* [合约事件](part1/evnet.md)

## 挖矿核心

* [交易池](/part2/txSummary.md) 
	* [以太坊交易池设计](/part2/txPool.md)
	* [本地待处理交易存储](/part2/txJournal.md)
	* [交易入队列](/part2/txAddTx.md)
	* [交易队列与容量控制](/part2/txPromote.md)
* [矿工](part2/miner.md)
* [Gas](part2/gas.md)
* [价格预测](part2/gpo.md)
* [状态库](part2/statedb.md)
* [工作量证明](etherhash.md)

## 底层核心技术实现

* [编码协议RLP](part3/rlp.md)
* [哈希](part3/hash.md)
* [签名与验证](part3/sign-and-valid.md)
* [密码库](part3/crypto.md)
* [虚拟机](part3/evm.md)
* [默克尔前缀树](part3/mpt.md)
* [点对点网络](part3/p2p.md)
* [通信协议](part3/socket.md)

## 独立功能技术实现

* [钱包](part4/wallet.md)
* [密语 Whisper](part4/whisper.md)
* [分布式存储 Swarm](part4/swarm.md)
* [区块同步](part4/sync.md)
* [交易回测](part4/tracer.md)
* [轻客户端](lclient.md)
* [移动版](mobile.md)

## 辅助功能技术实现

* [日志](part5/log.md)
* [事件](part5/event.md)
* [控制台](part5/console.md)
* [仪表板](part5/dashborad.md)
* [ABI](part5/abi.md)
* [GraphQL](part5/graphql.md)
* [公共库](part5/common.md)
* [指标库](part5/metric.md)

## [以太坊攻击事件](part6/README.md)

* [The DAO攻击](part6/dao.md)    

## geth命令