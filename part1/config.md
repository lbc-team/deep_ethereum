# 链参数配置

以太坊的基础配置用于服务于链，启动以太坊节点，则需要将链配置载入。
因此，在以太坊中内置了主网(mainnet)、测试网(testnet)、Rinkeby、Goerli网络中链配置。

初始启动节点时，将根据不同的参数（--dev、--testnet）来默认加载不同链配置。

## 链配置

不同于传统软件，因为区块链的不可篡改性，要求对同一个区块，不管出块时的软件版本，还是10年后的软件版本。都需要保证软件对已出块区块做出相同操作。因此区块链的链配置，不得随意更改，还需要维护重要历史变更内容。

下面是链的核心配置信息，定义在 params/config.go 中：

```go
type ChainConfig struct {
	ChainID *big.Int  
	HomesteadBlock *big.Int 
	DAOForkBlock   *big.Int  
	DAOForkSupport bool   

	// EIP150 implements the Gas price changes (https://github.com/ethereum/EIPs/issues/150)
	EIP150Block *big.Int     
	EIP150Hash  common.Hash 

	EIP155Block *big.Int  
	EIP158Block *big.Int  

	ByzantiumBlock      *big.Int  
	ConstantinopleBlock *big.Int  
	PetersburgBlock     *big.Int  
	EWASMBlock          *big.Int  

	// Various consensus engines
	Ethash *EthashConfig  
	Clique *CliqueConfig
}
```

区块链的不可篡改性，非中心化程序使得区块链网络程序升级复杂化。从链核心配置，可折射一个区块链网络所经历的关键时刻。 

如上的以太坊链配置，并非程序期初编写，而是随以太坊发展，在共识协议重大变更时积累而成。 下面是各项配置的作用说明：

### ChainID

链标识符，是在[EIP155](http://eips.ethereum.org/EIPS/eip-155)改进方案中实现，用于防止重放攻击。

重放攻击是在以太坊第一次硬分叉（以太经典）时，引入的Bug。
导致一笔交易，在两条链上同样有效，造成双花。

当前以太坊生态中不同网络环境下的链网络信息[^1]:

|Chain ID|Name|Short Name|Chain|Network|Network ID|
|--- |--- |--- |--- |--- |--- |
|1|Ethereum Mainnet|eth|ETH|mainnet|1|
|2|Expanse Network|exp|EXP|mainnet|1|
|3|Ethereum Testnet Ropsten|rop|ETH|ropsten|3|
|4|Ethereum Testnet Rinkeby|rin|ETH|rinkeby|4|
|5|Ethereum Testnet Görli|gor|ETH|goerli|5|
|6|Ethereum Classic Testnet Kotti|kot|ETC|kotti|6|
|8|Ubiq Network Mainnet|ubq|UBQ|mainnet|1|
|9|Ubiq Network Testnet|tubq|UBQ|mainnet|2|
|28|Ethereum Social|etsc|ETSC|mainnet|1|
|30|RSK Mainnet|rsk|RSK|mainnet|775|
|31|RSK Testnet|trsk|RSK|testnet|8052|
|42|Ethereum Testnet Kovan|kov|ETH|kovan|42|
|60|GoChain|go|GO|mainnet|60|
|61|Ethereum Classic Mainnet|etc|ETC|mainnet|1|
|62|Ethereum Classic Testnet|tetc|ETC|testnet|2|
|64|Ellaism|ella|ELLA|mainnet|1|
|76|Mix|mix|MIX|mainnet|1|
|77|POA Network Sokol|poa|POA|sokol|1|
|88|TomoChain|tomo|TOMO|mainnet|88|
|99|POA Network Core|skl|POA|core|2|
|100|xDAI Chain|xdai|XDAI|mainnet|1|
|101|Webchain|web|WEB|mainnet|37129|
|101|EtherInc|eti|ETI|mainnet|1|
|820|Callisto Mainnet|clo|CLO|mainnet|1|
|821|Callisto Testnet|tclo|CLO|testnet|2|
|1620|Atheios|ath|ATH|mainnet|11235813|
|1856|Teslafunds|tsf|TSF|mainnet|1|
|1987|EtherGem|egem|EGEM|mainnet|1987|
|2018|EOS Classic|eosc|EOSC|mainnet|1|
|24484|Webchain (after block xxxxxxx)|web|WEB|mainnet|37129|
|31102|Ethersocial Network|esn|ESN|mainnet|1|
|200625|Akaroma|aka|AKA|mainnet|200625|
|246529|ARTIS sigma1|ats|ARTIS|sigma1|246529|
|246785|ARTIS tau1|ats|ARTIS|tau1|246785|
|1313114|Ether-1|etho|ETHO|mainnet|1313114|
|7762959|Musicoin|music|MUSIC|mainnet|7762959|
|18289463|IOLite|ilt|ILT|mainnet|18289463|
|3125659152|Pirl|pirl|PIRL|mainnet|3125659152|
|385|Lisinski|lisinski|CRO|mainnet|385|
|108|ThunderCore Mainnet|TT|TT|mainnet|108|
|18|ThunderCore Testnet|TST|TST|testnet|18|
|11|Metadium Mainnet|meta|META|mainnet|11|
|12|Metadium Testnet|kal|META|testnet|12|
|13371337|PepChain Churchill|tpep|PEP|testnet|13371337|



### HomesteadBlock

以太坊 homested 版本硬分叉高度。
意味着从此高度开始，新区块受 homested 版本共识规则约束。
因涉及共识变更，如果希望继续接受新区块则必须升级以太坊程序，属于区块链硬分叉。
如果不原因接受共识变更，则可以独立使用新的 ChainID 继续原共识，且必须独立维护版本。

### DAOForkBlock和DAOForkSupport

以太坊应对[The DAO 攻击](http://chainb.com/?P=Cont&id=1290)所实施的软件软分叉。
在程序代码中嵌入关于 The DAO 账户控制代码，来锁定资产转移。

这是以太坊首个ICO筹集资金达 1.5 亿美元的众筹项目，占有近以太坊总币 15%。
攻击的影响关乎以太坊生死，以太基金会介入并组织社区投票决定，是否愿意通过修改程序来干预这个 ICO 智能合约，以避免资金流向黑客。

最终因为社区的不同意见，利益与信念的交融，在 1920000 高度进行硬分叉。
分叉出以太坊和以太经典。  

### EIP150Block与EIP150Hash

[EIP150](http://eips.ethereum.org/EIPS/eip-150) 提案生效高度。
该提案是为解决拒绝服务攻击，而通过提高 IO 操作相关的 Gas 来预防攻击。

主要注意的是Go语言版并非以太坊的第一个实现版本，属于新语言重写。
此部分代码是在2016年11月21日提交的[#a8ca75](https://github.com/ethereum/go-ethereum/commit/a8ca75738a45a137ff7b2dfa276398fad26439da)中实现。
而EIP150激活的区块高度是 [2463000](https://etherscan.io/block/2463000)，在2016年10月18日出块。

因此，在配置中特别写入了 EIP150 激活区块 2463000 的哈希值。

###  ByzantiumBlock

2017年10月16日，以太坊从第4370000号区块起顺利完成了代号为Byzantium的硬分叉。
Byzantium是Metropolis升级计划中的第一步，为之后的Constantinople硬分叉做好了铺垫。
 

### ConstantinopleBlock


### PetersburgBlock


### EWASMBlock
 


[^1]: 数据来源自 [chain.network](https://chainid.network/)。