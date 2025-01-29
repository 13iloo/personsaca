to build locally in docker, write in the this folder:
docker build . -f docker/Dockerfile --build-arg sa_password=<yourpassword> -t dockerpersons/persons-msdb


To run it: (set the env variables -p to your some suitable port, ie not 1433 if you have local sql express running)
docker run -d -p 1434:1433 --name personsMSDB dockerpersons/persons-msdb