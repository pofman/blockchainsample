#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <regex.h>
#include <thread>
#include <iostream>
#include "Blockchain.h"

class PeerSender
{
private:
	std::string SenderName ="";
	int SenderPort=0;
	int sockfd=0,portno=0;
	struct sockaddr_in serv_addr;
	struct hostent *server;
	char buffer[256]={0};
	char ip[INET_ADDRSTRLEN]={0};
	char *receive=NULL;
    std::shared_ptr<Blockchain> blockchain;
	void GetPrompt(char *cmd);

public:
	PeerSender(std::shared_ptr<Blockchain> blockchain);
	~PeerSender();
	void RegisterPeer(std::string hostname, int port);
	void FileDownload();
};