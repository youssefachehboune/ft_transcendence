FROM postgres:latest

RUN apt-get update -y

COPY init.sql /docker-entrypoint-initdb.d/
COPY *.csv /csv/

RUN chmod a+r /docker-entrypoint-initdb.d/init.sql

ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=pdb
