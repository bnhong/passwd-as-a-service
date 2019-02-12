# Passwd as a Service

Minimal HTTP service to expose user and group information from /etc/passwd and /etc/groups files.

## Prerequisites

* Install the latest node (v8.0.0 or later).
* Download files from this repository.

## Running the service

1. Navigate to the root directory.
2. npm install (if packages have not been installed)
3. npm start

Note: The application currently runs using provided passwd and group files. If you wish to use your own, change the following variables to  point to your own files:

./loadData.js
* const PASSWD_FILE
* const GROUP_FILE

## Running the unit test cases

1. Navigate to the root directory.
2. npm test

## API calls
The following API calls are supported (hyperlinks included for testing with the default port):

GET /users: http://localhost:8080/users

GET /users with query parameters: http://localhost:8080/users?uid=3000

GET /users/<uid>: http://localhost:8080/users/3000
  
GET /users/<uid>/groups: http://localhost:8080/users/3000/groups
  
GET /groups: http://localhost:8080/groups

GET /groups with query parameters: http://localhost:8080/groups?gid=2000

GET /groups/<gid>: http://localhost:8080/groups/2000
