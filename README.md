# DEVICEindex

## Table of contents
- [DEVICEindex](#deviceindex)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Setup](#setup)
      - [To run the backend server.](#to-run-the-backend-server)
      - [To run the client server.](#to-run-the-client-server)

## General info
This project is sample project is managing locations that control multiple devices. This is done as a internship practical test for LAYOUTindex. 
	
## Technologies
Project is created with:
* React with redux
* Node and Express
* MongoDB
	
## Setup
To run this project, install it locally using npm:

#### To run the backend server.
Add a ``.env`` file to server folder containing the following
```
MONGO_URL = ___YOUR_MONGO__URL___
PORT = 3001
```
```
$ cd ../server
$ npm install
$ nodemon index.js
```

#### To run the client server.
```
$ cd ../client
$ npm install
$ npm start
```

If the you want to change the backend server port make sure to change it in the front-end package.json file as well. 
```
  Line 5:"proxy": "http://localhost:NEWPORT",
```