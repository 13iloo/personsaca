# Base Alpine Linux image with Node 20.x
FROM node:20-alpine

# the basedir is relative to where the docker context is!
ARG basedir=".."
ARG build_info="Persons-Api docker comtainer build"
ARG buildno
ARG db_host
ARG db_port
ARG db_name
# ARG db_username username is declared somewhere else
ARG db_password


ENV NODE_ENV=production
ENV BUILD_INFO=$build_info
ENV DB_HOST=$db_host
ENV DB_PORT=$db_port
ENV DB_NAME=$db_name
ENV DB_PASSWORD=$db_password


# Place our app here
WORKDIR /home/app

# Install bash inside container just for debugging if you like and know how to :-)
RUN apk update && apk add bash && apk add curl

# NPM install packages
COPY ${basedir}/package*.json ./

# Change if you like, so that we can select for local debug and azure production
# RUN npm install --production
RUN npm install

# NPM is done, now copy in the code for the project to the workdir
COPY ${basedir}/src ./src

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]