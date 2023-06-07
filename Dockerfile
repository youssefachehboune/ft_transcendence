FROM postgres:latest

RUN apt-get update -y

ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=pdb