#include "include/PeerSender.h"
#include "include/Color.h"
#include "include/Blockchain.h"
#include "include/commands/GetFilesListCommand.h"
#include "include/commands/ReceiveFileCommand.h"
#include <errno.h>

PeerSender::PeerSender(std::shared_ptr<Blockchain> blockchain)
{
    this->blockchain = blockchain;
}

PeerSender::~PeerSender()
{
	int errorCode;
	socklen_t errorCodeSize = sizeof(errorCode);
	if(getsockopt(sockfd, SOL_SOCKET, SO_ERROR, &errorCode, &errorCodeSize) == 0)
		close(sockfd);
}

void PeerSender::RegisterPeer(std::string hostname, int port){
	this->SenderName=hostname;
	this->SenderPort=port;
}

void PeerSender::FileDownload(){

	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if (sockfd < 0)
		throw std::runtime_error("ERROR opening socket");
	server = gethostbyname(SenderName.c_str());
	if (server == NULL) {
		throw std::runtime_error("ERROR, no such host\n");
	}
	bzero((char *) &serv_addr, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	bcopy((char *) server->h_addr,(char *)&serv_addr.sin_addr.s_addr, server->h_length);
	serv_addr.sin_port = htons(SenderPort);
	auto connectResult = connect(sockfd, (struct sockaddr *) &serv_addr, sizeof(serv_addr));
	printf("Connecting to %s:%d with result: %d\n", SenderName.c_str(), SenderPort, connectResult);
	if ( connectResult < 0)
		throw std::runtime_error("ERROR connecting");

	std::cout << "The list of files which can be downloaded are:\n";
	char cmd[MAX_COMMAND_LEN];
	strcpy(cmd,"ls"); //listing of server files
	while (strcmp(cmd, "exit")) {
		if (!strcmp(cmd, "ls")) {
			if (send(sockfd, "ls", MAX_COMMAND_LEN, 0) < 0) {
				std::cerr<< "ERROR sending" << strerror(errno) << "\n";
			};
			GetFilesListCommand(sockfd, &receive).Execute();
			std::cout<< receive <<"\n";
			free(receive);
		} else {
			std::cout <<" Requested command is " << cmd  <<std::endl;
			if (send(sockfd, cmd, MAX_COMMAND_LEN, 0) < 0) {
				std::cerr << "command:send_request: Sending Error\n";
			}
			ReceiveFileCommand(sockfd).Execute();
		}
		std::cout << "Type the 'filename' to download or 'exit' to discontinue " << std::endl;
		GetPrompt(cmd);
	}
	if (send(sockfd, "disconnect", MAX_PACKET_CHUNK_LEN, 0) < 0) {
		std::cerr <<"Error send while exiting\n";
	}

	close(sockfd);
}

void PeerSender::GetPrompt(char *cmd) {
	printf("%s> %s", KGRN, RESET);
	scanf("%[^\n]", cmd);
	getchar();
	return;
}
