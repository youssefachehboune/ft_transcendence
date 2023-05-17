
Here you can create a docker container containing the database, it will create the necessary tables and initializes them.

To create the docker image:
```
docker build -t mydb .
```

To run the docker container in detached mode:
```
docker run -d -p 5432:5432 --name mydb mydb
```

To execute psql commands in the container:
```
docker exec -it mydb psql "postgresql://myuser:mypassword@localhost:5432/pdb"
```

after running the previous command run ```select * from "texts";``` to check if the texts table has been created and filled.