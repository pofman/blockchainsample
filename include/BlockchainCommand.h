#include "Blockchain.h"
#include "domain/Peer.h"

class BlockchainCommand
{
public:
    BlockchainCommand(Blockchain *blockchain);
    virtual ~BlockchainCommand();

    virtual void Execute(Peer peer) const = 0;
};
