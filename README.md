
# Demo Application For Career And Event CRUD Operations With Authentication




## Descirption

Built using NestJs framework TypeScript starter repository. It uses MongoDB as backend

Application is designed as different modules which can easily be ported as individual backend application with minimum coding.
It has a common module which is used to bootstrap application, load middlewares , define database schemas, authenticate each requests.

We have defined custom annotations as middleware to check authentication of requests


## Tech Stack

**Server:** Node v16.13.1, npm 8.3.0 Express, NestJS, MongoDB latest
 

## Installation
Checkout the demo project from repo and Open a terminal inside the project . 

**Note:**In order to run the project  @nestjs/cli should be installed globally

```bash
  git clone https://github.com/jerryfabiantt/demo-mongo-crud.git
  cd demo-mongo-crud
  npm install -g @nestjs/cli
  npm i
```


## Running Migrations

To run migrations, do the following, open two terminals from the project root folder

### 1st Terminal:
```bash
    cd _commands
    npm i
    npm run start:dev
```

### 2nd Terminal:
In the other one do the following
```bash
    cd _commands
    node dist/main.js -- command:user:createUser
```

Once this is run the following can be used to login

email: admin@mailinator.com

password: test123

Now both the terminals can be closed


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




