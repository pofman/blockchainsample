#pragma once
#include "../Command.h"
#include "../Color.h"

class GetFilesListCommand : public Command
{
public:
    GetFilesListCommand(int socketId, char **buffer);
    void Execute() override;
private:
    char **buffer;
};