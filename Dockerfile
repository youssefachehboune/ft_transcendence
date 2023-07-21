FROM debian:latest

RUN apt-get -y update && apt-get -y install curl

RUN curl https://deb.nodesource.com/setup_16.x | /bin/bash

RUN apt-get -y install nodejs

RUN apt-get -y install npm

COPY ./backend/ ./backend/