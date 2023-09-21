<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Auth-Roles API Microservices

1. Clone project from github
2. ```yarn install```
3. Clone file ```.env.template``` and rename it to ```.env```
4. use your environment variables ( for test reasons they will stay in this file)
5. up docker
```
docker-compose up -d
```
6. run : ```yarn start:dev``` (after run docker, if at first time it does not run because is trying to connect => ctrl + c and the try again, 
it is because sometimes docker is not ready inmediatly)

7. postman: https://interstellar-crescent-253112.postman.co/workspace/dfsdf~ab9a2158-73df-4e5c-ad1b-833cc6d3ba62/collection/24745741-9bcd4694-4cc6-477d-94a2-71044bac21b1?action=share&creator=24745741




instructions
1. execute seed
2. you can create a new account or use any existing
3. logIn and use the uuid
4. assign-role with uuid (admin)
5. login again and take jwt
6. use it in refreshJWT bearer token or in jwttoken (just admin role) 




