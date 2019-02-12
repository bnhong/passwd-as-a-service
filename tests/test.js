var request = require('supertest');

describe('Test GET for /users and /group', function() {
    var server;
    beforeEach(function() {
        //delete require.cache[require.resolve('../server')];
        server = require('../server');
    });
    // afterEach(function(done) {
    //     server.close(done);
    afterEach(function() {
        server.close();
    });

    // Test GET /users
    it('responds to /users', function testUsers(done) {
        request(server)
            .get('/users')
            .expect(200, done);
    });

    // Test GET /users with query params
    it('responds to /users?name=test', function testUsersQueryName(done) {
        request(server)
            .get('/users?name=test')
            .expect(200, done);
    });
    it('responds to /users?uid=9000', function testUsersQueryUid(done) {
        request(server)
            .get('/users?uid=9000')
            .expect(200, done);
    });
    it('responds to /users?gid=9000', function testUsersQueryGid(done) {
        request(server)
            .get('/users?gid=9000')
            .expect(200, done);
    });
    it('responds to /users?comment=unittest', function testUsersQueryComment(done) {
        request(server)
            .get('/users?comment=unittest')
            .expect(200, done);
    });
    it('responds to /users?home=/test/user', function testUsersQueryHome(done) {
        request(server)
            .get('/users?home=/test/user')
            .expect(200, done);
    });
    it('responds to /users?shell=/usr/bin/test', function testUsersQueryShell(done) {
        request(server)
            .get('/users?shell=/usr/bin/test')
            .expect(200, done);
    });
    it('responds to /users?name=test&uid=9000', function testUsersQueryName(done) {
        request(server)
            .get('/users?name=test&uid=9000')
            .expect(200, done);
    });
    it('responds to /users?name=test&uid=9009', function testUsersQueryName(done) {
        request(server)
            .get('/users?name=test&uid=9009')
            .expect(404, done);
    });
    it('responds to /users?name=doesnotexist', function testUsersQueryName(done) {
        request(server)
            .get('/users?name=doesnotexist')
            .expect(404, done);
    });

    // Test GET /users/:uid
    it('responds to /users/9000', function testUsersUid(done) {
        request(server)
            .get('/users/9000')
            .expect(200, done);
    });
    it('responds to /users/9001', function testUsersUidInvalid(done) {
        request(server)
            .get('/users/9001')
            .expect(404, done);
    });

    // Test GET /users/:uid/groups
    it('responds to /users/3000/groups', function testUsersUidGroups(done) {
        request(server)
            .get('/users/3000/groups')
            .expect(200, done);
    });

    // Test GET /groups
    it('responds to /groups', function testGroups(done) {
        request(server)
            .get('/groups')
            .expect(200, done);
    });

    //Test GET /groups with query params
    it('responds to /groups?name=people', function testGroupsQueryName(done) {
        request(server)
            .get('/groups?name=people')
            .expect(200, done);
    });
    it('responds to /groups?gid=2000', function testGroupsQueryUid(done) {
        request(server)
            .get('/groups?gid=2000')
            .expect(200, done);
    });
    it('responds to /groups?member=bunreth', function testGroupsQueryGid(done) {
        request(server)
            .get('/groups?member=bunreth')
            .expect(200, done);
    });
    it('responds to /groups?member=roy', function testGroupsQueryGid(done) {
        request(server)
            .get('/groups?member=roy')
            .expect(200, done);
    });

    // Test GET /groups/:gid
    it('responds to /groups/2000', function testGroupsGid(done) {
        request(server)
            .get('/groups/2000')
            .expect(200, done);
    });
    it('responds to /groups/2019', function testGroupsGidInvalid(done) {
        request(server)
            .get('/groups/2019')
            .expect(404, done);
    });

    it('404 everything else', function test404(done) {
        request(server)
            .get('/invalid/user')
            .expect(404, done);
    });
});
