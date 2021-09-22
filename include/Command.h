#pragma once

class Command
{
    public:
        Command(int socketId);
        virtual void Execute() = 0;
    protected:
        int socketId;
};