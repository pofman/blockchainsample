# Blockchain sample
## Intro
## Build
```bash
    g++ -std=c++17 -I /usr/local/opt/openssl@1.1/include -I include -L /usr/local/opt/openssl@1.1/lib -lcrypto src/main.cpp src/Block.cpp src/Blockchain.cpp src/PeerReceiver.cpp src/PeerSender.cpp src/BlockchainNetwork.cpp src/ListFilesCommand.cpp src/ReadFileCommand.cpp src/Command.cpp src/GetFilesListCommand.cpp src/ReceiveFileCommand.cpp src/CreateTransactionCommand.cpp src/PrintBlockchainCommand.cpp src/BlockchainCommand.cpp src/ReplaceBlockchainCommand.cpp src/GetBlockchainCommand.cpp src/StringHelper.cpp -o awesomecoin
```
or use cmake to build