# Blockchain sample
## Intro
## Build
```bash
    g++ -std=c++17 -I /usr/local/opt/openssl@1.1/include -I include -L /usr/local/opt/openssl@1.1/lib -lcrypto main.cpp Block.cpp Blockchain.cpp PeerReceiver.cpp PeerSender.cpp BlockchainNetwork.cpp ListFilesCommand.cpp ReadFileCommand.cpp Command.cpp GetFilesListCommand.cpp ReceiveFileCommand.cpp CreateTransactionCommand.cpp PrintBlockchainCommand.cpp BlockchainCommand.cpp ReplaceBlockchainCommand.cpp -o tinchocoin.app 
```
or use cmake to build