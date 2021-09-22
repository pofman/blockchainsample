#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include "include/commands/GetFilesListCommand.h"

GetFilesListCommand::GetFilesListCommand(int socketId, char **buffer)
    : Command(socketId), buffer(buffer)
{}

void GetFilesListCommand::Execute()
{
	int R, received = 0;
    char small_buff[MAX_BUFFER_LEN];
	memset(small_buff, 0, sizeof(small_buff));
	R = recv(socketId, small_buff, MAX_PACKET_CHUNK_LEN, 0);
	if (R < 0)
		throw std::runtime_error("Error receving files list");
	
	int to_receive = atoi(small_buff);
	*buffer = (char*) malloc(sizeof(char) * (to_receive + 100));
	memset(small_buff, 0, sizeof(small_buff));
	**buffer = '\0';

	while (received < to_receive) {
		R = recv(socketId, small_buff, MAX_PACKET_CHUNK_LEN, 0);
		if (R < 0) {
			printf("ERROR: Received Failed\n");
		}
		strncat(*buffer, small_buff, strlen(small_buff) - 1);
		memset(small_buff, 0, sizeof(small_buff));
		received += R;
	}
	return;
}