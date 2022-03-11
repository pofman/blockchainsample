# Blockchain sample
## Intro
## Build
```bash
    g++ -std=c++17 -I /usr/local/opt/openssl@1.1/include -I include -L /usr/local/opt/openssl@1.1/lib -lcrypto src/main.cpp src/Block.cpp src/Blockchain.cpp src/PeerReceiver.cpp src/PeerSender.cpp src/BlockchainNetwork.cpp src/ListFilesCommand.cpp src/ReadFileCommand.cpp src/Command.cpp src/GetFilesListCommand.cpp src/ReceiveFileCommand.cpp src/CreateTransactionCommand.cpp src/PrintBlockchainCommand.cpp src/BlockchainCommand.cpp src/ReplaceBlockchainCommand.cpp src/GetBlockchainCommand.cpp src/StringHelper.cpp -o awesomecoin
```
or use cmake to build
## Init private chain

```bash
# important to have some private keys or key store wallets to init the chain in the genisis block
geth init --datadir {yourPath} genesis.json
geth --datadir {yourPath} -networkid 15 --http --allow-insecure-unlock
```

Remember to unlock accounts in order to perfom transactions
```bash
geth attach {yourDataPath}/geth.ipc
```
```javascript
personal.unlockAccount("{accNumber}", "{accPhrase}", 0) //0 refers to the number of seconds to unlock the account, 0 means forever
```
## Utilized patterns
* Contract Self Destruction Pattern
* Factory Contract Pattern
* Name Registry Pattern
* Mapping Iterator Pattern
* Sending ethers from contract: Withdrawal pattern
