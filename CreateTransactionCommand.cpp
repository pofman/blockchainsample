#include <ctime>
#include <sstream>
#include "include/commands/CreateTransactionCommand.h"
#include "include/TransactionData.h"

CreateTransactionCommand::CreateTransactionCommand(std::shared_ptr<Blockchain> blockchain)
: BlockchainCommand(blockchain)
{}

void CreateTransactionCommand::Execute(int socketId, const char * cmd)
{
    time_t dataTime;
    std::stringstream ss(cmd);
    std::string arg;
    std::vector<std::string> args;

    while (ss >> arg)
    {
        args.push_back(arg);
    }

    blockchain->addBlock(TransactionData(stod(args[3]), args[1], args[2], time(&dataTime)));
}