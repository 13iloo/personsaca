FROM mcr.microsoft.com/mssql/server:2022-latest

LABEL version '1.0.0'

ARG sa_password="Qaz!wsx2"
ARG buildno

ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=$sa_password
ENV MSSQL_PID=Developer

EXPOSE 1433




# docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest