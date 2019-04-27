在以太坊中最重要的数字签名属交易签名，这也是以太坊账户私钥最核心用途。私钥用于对内容(交易、文本)签名，以证明该内容来自签名者签发。这里，我只讨论以太坊最新的交易签名与交易解析签名者流程。

## 交易签名流程

以太坊加密算法是采用比特币的椭圆曲线 secp256k1加密算法。签名交易对应代码如下：

```go
//core/types/transaction_signing.go:56
func SignTx(tx *Transaction, s Signer, prv *ecdsa.PrivateKey) (*Transaction, error) {//❶
   h := s.Hash(tx)//❷
   sig, err := crypto.Sign(h[:], prv)//❸
   if err != nil {
      return nil, err
   }
   return tx.WithSignature(s, sig)//❹
}
```

+ ❶ 交易签名时，需要提供一个签名器(Signer)和私钥(PrivateKey)。需要Singer是因为在[EIP155](http://eips.ethereum.org/EIPS/eip-155)修复简单重复攻击漏洞后，需要保持旧区块链的签名方式不变，但又需要提供新版本的签名方式。因此通过接口实现新旧签名方式，根据区块高度创建不同的签名器。

  ```
  //core/types/transaction_signing.go:42
  func MakeSigner(config *params.ChainConfig, blockNumber *big.Int) Signer {
     var signer Signer
     switch {
     case config.IsEIP155(blockNumber):
        signer = NewEIP155Signer(config.ChainID)
     case config.IsHomestead(blockNumber):
        signer = HomesteadSigner{}
     default:
        signer = FrontierSigner{}
     }
     return signer
  }
  ```

+ ❷ 重点介绍EIP155改进提案中所实现的新哈希算法，主要目的是获取交易用于签名的哈希值 TxSignHash。和旧方式相比，哈希计算中混入了链ID和两个空值。注意这个哈希值 TxSignHash 在EIP155中并不等同于交易哈希值。

  ![以太坊交易签名内容哈希新补充](https://img.learnblockchain.cn/2019/04/27_tx-sign-content-hash.png!de)

  这样，一笔已签名的交易就只可能属于某一确定的唯一一条区块链。

+ ❸  内部利用私钥使用secp256k1加密算法对`TxSignHash`签名，获得签名结果`sig`。

+ ❹ 执行交易`WithSignature`方法，将签名结果解析成三段`R、S、V`，拷贝交易对象并赋值签名结果。最终返回一笔新的已签名交易。

  ```go
  func (tx *Transaction) WithSignature(signer Signer, sig []byte) (*Transaction, error) {
     r, s, v, err := signer.SignatureValues(tx, sig)
     if err != nil {
        return nil, err
     }
     cpy := &Transaction{data: tx.data}
     cpy.data.R, cpy.data.S, cpy.data.V = r, s, v
     return cpy, nil
  }
  ```

根据上面代码逻辑，提炼出如下交易签名流程，整个过程利用了 RLP编码、Keccak256哈希算法和椭圆曲线 secp256k1加密算法。从这里可以看出，密码学技术是区块链成功的最大基石。

![以太坊交易签名流程](https://img.learnblockchain.cn/2019/04/27_ethereum-tx-sign-flow.png!de)

## 交易签名解析流程

签名交易后，如何才能获得交易签名者呢？未完，待写…...