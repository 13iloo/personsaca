The dockerpersons application system, consisting of microservice 

Each folder contains its source code and settings for deployment, like dockar and azure
Here we have the root composition files for docker and azure

To build every microservice in docker, write in this root folder:
docker compose -f docker/docker-compose.yml build

To run them all write:
docker compose -f docker/docker-compose.yml up -d

To run them all write:
docker compose up

And to tear down the containers write:
docker compose -f docker/docker-compose.yml down


