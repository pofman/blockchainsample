#pragma once
#include "../Command.h"
#include "../Color.h"

class GetFilesListCommand : public Command
{
public:
    GetFilesListCommand(int socketId);
    void Execute() override;
private:
    char *receive=NULL;
};