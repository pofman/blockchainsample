#include <sys/socket.h>
#include "include/commands/ReadFileCommand.h"

ReadFileCommand::ReadFileCommand(int socketId, const char *fileName)
: Command(socketId), fileName(fileName)
{
}

void ReadFileCommand::Execute()
{
    char buff[MAX_BUFFER_LEN + 3];
	memset(buff, 0, sizeof(buff));
    char folder[sizeof(SERVER_SHARED_DIR)+1];
    strcpy(folder, SERVER_SHARED_DIR);
	FILE *fp = fopen(strcat(strcat(folder, "/"), fileName), "rb");
	if (fp == NULL) {
		std::cerr <<"File open error\n";
		return;
	}

	if (strlen(fileName) >= MAX_BUFFER_LEN) {
		std::cerr << "ERROR: Please use a filename less than 256 characters\n";
		fclose(fp);
		return;
	}

	// Length
	int SIZE = GetFilesize(fp);
	char snum[5];
	sprintf(snum, "%d", SIZE);

	// Write all
	memset(buff, 0, sizeof(buff));
	strcat(buff, fileName);
	strcat(buff, "|");
	strcat(buff, snum);
	printf("FILE_NAME_DATA: %s\n",buff);
	if (strlen(snum) + strlen(fileName) + 1 > MAX_PACKET_CHUNK_LEN) {
		std::cerr << "Name + Size length exceeded. Error may occur.\n";
	}

	send(socketId, buff, MAX_PACKET_CHUNK_LEN, 0);

	int R;
	memset(buff, 0, sizeof(buff));
	while ((R = fread(buff, sizeof(char), MAX_PACKET_CHUNK_LEN, fp))) {
		if (send(socketId, buff, MAX_PACKET_CHUNK_LEN, 0) < 0) {
			perror("Sending Error");
		};
		bzero(buff, MAX_PACKET_CHUNK_LEN);
	}

	memset(buff, 0, sizeof(buff));
	fclose(fp);
}

int ReadFileCommand::GetFilesize(FILE* fileid) {
	fseek(fileid, 0L, SEEK_END);
	int sz = ftell(fileid);
	fseek(fileid, 0L, SEEK_SET);
	return sz;
}