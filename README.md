# BEng-Thesis
BEng Thesis for AGH Computer Science studies

## Backend setup with docker
We go to the "api" folder. If we execute the command for the first time:
```
docker-compose up --build
```
If we run the backend using the docker again, we can omit the `--build` option.

## Frontend setup with docker
We go to the "frontend" folder. If we execute the command for the first time:
```
docker-compose up --build
```
If we run the backend using the docker again, we can omit the `--build` option.

## General setup with docker (production version)
We go to the main folder ("systematic-chaos"). From this folder, execute the following command:
```
docker-compose up -d --build
```
The above command will run both the backend and the frontend.