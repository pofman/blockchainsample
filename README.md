# Blockchain sample
## Intro
## Build
```bash
    g++ -std=c++17 -I /usr/local/opt/openssl@1.1/include -I include -L /usr/local/opt/openssl@1.1/lib -lcrypto main.cpp Block.cpp Blockchain.cpp PeerReceiver.cpp PeerSender.cpp BlockchainNetwork.cpp -o tinchocoin.app
```