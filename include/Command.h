#pragma once

class Command
{
    public:
        Command();
        virtual void Execute(int socketId, const char * cmd) = 0;
};