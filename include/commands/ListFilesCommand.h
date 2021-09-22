#pragma once
#include "../Command.h"
#include "../Color.h"

class ListFilesCommand : public Command
{
public:
    ListFilesCommand(int socketId);
    void Execute() override;
private:
    char *bufferResult;
    void ListCommand(char bufferResult[]);
    void listfiles();
};