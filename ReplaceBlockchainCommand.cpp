#include "include/commands/ReplaceBlockchainCommand.h"

ReplaceBlockchainCommand::ReplaceBlockchainCommand(std::shared_ptr<Blockchain> blockchain)
    : BlockchainCommand(blockchain)
{}

void ReplaceBlockchainCommand::Execute(int socketId, const char * cmd)
{
    
}