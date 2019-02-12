var express = require('express');
var app = express();
var loadData = require('./loadData.js');

// load data from passwd and group files
var users = loadData.passwd();
var groups = loadData.group();

// GET /
// Returns a message describing the application
app.get('/', (req, res) => {
    res.status(200).send('Passwd as a Service');
});

// GET /users
// Returns a list of all users on the system, as defined in the /etc/passwd file
// Supports query parameters
app.get('/users', (req, res) => {
    let name = req.query.name;
    let uid = req.query.uid;
    let gid = req.query.gid;
    let comment = req.query.comment;
    let home = req.query.home;
    let shell = req.query.shell;

    let result = [];

    for (let i = 0; i < users.length; i++) {
        // check if current user matches any of the supplied query params.
        // if so, push to result array
        if ((users[i].name == name || name == undefined) &&
            (users[i].uid == uid || uid == undefined) &&
            (users[i].gid == gid || gid == undefined) &&
            (users[i].comment == comment || comment == undefined) &&
            (users[i].home == home || home == undefined) &&
            (users[i].shell == shell || shell == undefined)) {
            result.push(users[i]);
        }
    }

    // if result found for query params, send 200
    // if no result found for query params, send 404
    // if not query params provided, send 200
    if (result && result.length) {
        res.status(200).send(result);
    } else {
        if (Object.keys(req.query).length > 0) {
            res.status(404).send();
        }
        res.status(200).send(users);
    }
});

// GET /users/<uid>
// Returns a single user with <uid>. Return 404 if not found.
app.get('/users/:uid', (req, res) => {
    let found = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].uid == req.params.uid) {
            found = i;
        }
    }

    if (found > -1) {
        res.status(200).send(users[found]);
    } else {
        res.status(404).send();
    }
});

// GET /users/<uid>/groups
// Returns all the groups for a given user
app.get('/users/:uid/groups', (req, res) => {
    let current = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].uid == req.params.uid) {
            current = i;
        }
    }

    let result = [];

    // check if current user exists in group
    // if so, push to result array
    if (current > -1) {
        for (let i = 0; i < groups.length; i++) {
            if (users[current].gid == groups[i].gid) {
                result.push(groups[i]);
            }
        }
        res.status(200).send(result);
    } else {
        res.status(404).send();
    }
});

// GET /groups
// Returns a list of all groups on the system
// Supports query parameters
app.get('/groups', (req, res) => {
    let name = req.query.name;
    let gid = req.query.gid;
    let member = req.query.member;

    let result = [];

    for (let i = 0; i < groups.length; i++) {
        // check if current group matches any of the supplied query params.
        // if so, push to result array
        if ((groups[i].name == name || name == undefined) &&
            (groups[i].gid == gid || gid == undefined)) {
            result.push(groups[i]);
        } else if (member) {
            let members = groups[i].members;
            let memberFound = false;

            // if only a single member was provided, search for member in
            // members list of current group
            // if found,  push to result array
            for (let j = 0; j < members.length; j++) {
                if (groups[i].members[j] == member) {
                    result.push(groups[i]);
                }
            }

            if (memberFound) {
                result.push(groups[i]);
            }
        }
    }

    // if result found for query params, send 200
    // if no result found for query params, send 404
    // if not query params provided, send 200
    if (result && result.length) {
        res.status(200).send(result);
    } else {
        if (Object.keys(req.query).length > 0) {
            res.status(404).send();
        }

        res.status(200).send(groups);
    }


});

// GET /groups/<gid>
// Returns a single group with <gid>. Returns 404 if not found.
app.get('/groups/:gid', (req, res) => {
    let found = -1;

    for (let i = 0; i < groups.length; i++) {
        if (groups[i].gid == req.params.gid) {
            found = i;
        }
    }

    if (found > -1) {
        res.status(200).send(groups[found]);
    } else {
        res.status(404).send();
    }
});

// Listen to the specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
module.exports = server;
