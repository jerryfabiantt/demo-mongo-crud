
# Demo Application For Career And Event CRUD Operations With Authentication




## Descirption

Built using NestJs framework TypeScript starter repository. It uses MongoDB as backend

Application is designed as different modules which can easily be ported as individual backend application with minimum coding.
It has a common module which is used to bootstrap application, load middlewares , define database schemas, authenticate each requests.

We have defined custom annotations as middleware to check authentication of requests


## Tech Stack

**Server:** Node, Express, NestJS, MongoDB


## Installation
Checkout the demo project and Open a terminal inside the project 

Install demo-project with npm

```bash
  git clone https://chizelsdev@bitbucket.org/chizelsdev/demo-mongo-crud.git
  cd demo-mongo-crud
  npm i
```

## Running the project

Commands for running the project are given in Package.json file. 

To run the project in development mode
    
```bash
 npm run start:dev
```
To run the project in Production mode

```bash
 npm run buld
 npm run start:prod
```



## Running Migraions

To run migrations, do the following

```bash
    cd _commands
    npm i
    npm run start:dev
```

open another terminal

```bash
    cd _commands
    node dist/main.js -- command:user:createUser
```


