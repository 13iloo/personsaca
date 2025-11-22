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
# personsaca

Person management system with academic focus.

## Overview

A web application for managing person records in an academic context, featuring CRUD operations and data organization.

## Features

- Person record management
- CRUD operations
- Search and filter functionality
- Data validation
- Responsive design
- Export capabilities

## Technologies Used

- Frontend framework
- Backend API
- Database management
- Form validation

## Getting Started

```bash
# Clone the repository
git clone https://github.com/13iloo/personsaca.git

# Navigate to project directory
cd personsaca

# Install dependencies
npm install

# Set up database
# [Add database setup instructions]

# Run the application
npm start
```

## Author

**Bilal Hassen Osman**
- LinkedIn: [bilal-hassen-osman](https://www.linkedin.com/in/bilal-hassen-osman-2840a6171/)
- Email: Bilalhassen239@gmail.com

## License

[Specify your license]


