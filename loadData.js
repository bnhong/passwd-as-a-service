var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

// location of passwd and group files
const PASSWD_FILE = './passwd.txt';
const GROUP_FILE = './group.txt';

module.exports = {
    passwd: function() {
        var instream = fs.createReadStream(PASSWD_FILE);
        var outstream = new stream;
        var rl = readline.createInterface(instream, outstream);

        var users = [];

        rl.on('line', function(line) {
          var data = line.split(":");
          var user = {
              name: data[0],
              uid: data[2],
              gid: data[3],
              comment: data[4],
              home: data[5],
              shell: data[6]
          }

          users.push(user);
        });

        rl.on('close', function() {
          console.log('users', users);
        });

        return users;
    },

    group: function() {
        var instream = fs.createReadStream(GROUP_FILE);
        var outstream = new stream;
        var rl = readline.createInterface(instream, outstream);

        var groups = [];

        rl.on('line', function(line) {
          var data = line.split(":");
          var group = {
              name: data[0],
              gid: data[2],
              members: data[3].split(",")
          }

          groups.push(group);
        });

        rl.on('close', function() {
          console.log('groups', groups);
        });

        return groups;
    }
}
