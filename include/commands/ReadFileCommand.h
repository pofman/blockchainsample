#pragma once
#include <iostream>
#include "../Command.h"
#include "../Color.h"

class ReadFileCommand : public Command {
public:
    ReadFileCommand(int socketId, const char *fileName);
    void Execute() override;
private:
    const char *fileName;
    int GetFilesize(FILE* fileid);
};