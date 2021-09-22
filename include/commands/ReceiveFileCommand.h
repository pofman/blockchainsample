#pragma once
#include "../Command.h"
#include "../Color.h"

class ReceiveFileCommand : public Command
{
public:
    ReceiveFileCommand(int socketId);
    void Execute() override;
};