const request = require('supertest');
const app = require('../app');

//please make new account only
//if you already use ID, it will give error as result. So please make new ID whenever you run this 
//Make account and add or delete board
describe("test for user account/", ()=> {
    test("test register", async (done) => {
        request(app)
            .post('/auth/register')
            .send({
                users: "jestTestAccount",
                password: "1234",
                FirstName: "fn",
                LastName: 'ln'
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "insertID": true,
                message: "User registered"
            }, done)
    })
    test("test login", (done) => {
        request(app)
            .post('/auth/login')
            .send({
                users: "jestTestAccount",
                password: "1234"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "loginStatus": true,
                message: "login successful"
            }, done)
    })
})


//Jest for friendController
describe("test for friend list", () => {
    test("make new friend account", async (done) => {
        request(app)
            .post('/auth/register')
            .send({
                users: "testFriend",
                password: "1234",
                FirstName: "fn",
                LastName: 'ln'
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "insertID": true,
                message: "User registered"
            }, done)
    })
    test("add friend", async (done) => {
        request(app)
            .post('/auth/jestTestAccount/addFriend')
            .send({
                friendID: "testFriend"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "usernameStatus": true,
                message: "username successful"
            }, done)
    })
    test("delete friend", async (done) => {
        request(app)
            .post('/auth/jestTestAccount/deleteFriend')
            .send({
                friendID: "testFriend"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "usernameStatus2": true,
                message: "username successful"
            }, done)
    })
    test("add friend", async (done) => {
        request(app)
            .post('/auth/jestTestAccount/addFriend')
            .send({
                friendID: "testFriend"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "usernameStatus": true,
                message: "username successful"
            }, done)
    })
    test("get friend list", async () => {
        const {body} = await request(app).get('/auth/jestTestAccount3/getFriends') 
        expect(body.length).toEqual(1);
    })
})

// Jest boardController.js
describe("test for board list", ()=> {
    test("add board", async (done) => {
        request(app)
            .post('/auth/jestTestAccount3/addBoard')
            .send({
                boardName: "JestBoardA3"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Insert new Board"
            },done)
    })
    test("add board", async (done) => {
        request(app)
            .post('/auth/jestTestAccount3/addBoard')
            .send({
                boardName: "JestBoardB3"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Insert new Board"
            },done)
    })
    test("add board", async (done) => {
        request(app)
            .post('/auth/jestTestAccount3/addBoard')
            .send({
                boardName: "JestBoardC3"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Insert new Board"
            },done)
    })
    test("delete board", async (done) => {
        request(app)
            .post('/auth/jestTestAccount3/deleteBoard')
            .send({
                boardName: "JestBoardB3"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Delete that board"
            },done)
    })
    test("get board list", async () => {
        const {body} = await request(app).get('/auth/jestTestAccount3/main') 
        expect(body.length).toEqual(2);
    })
})

// jest for boardSharing
describe("test for board sharing", ()=> {
    test("share board", async (done) => {
        request(app)
            .post('/auth/jestTestAccount3/addBoardShare')
            .send({
                userID: "testFriend3",
                boardName: "JestBoardA3"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "status": true,
                message: "username successful"
            },done)
    })
})

// jest for magnetController.js
describe("test for magnet part", () => {
    test("add text magnet1", async (done) => {
        request(app)
            .post('/board/JestBoardA1/addMagnet')
            .send({
                magnetName: "jest 1",
                textMagnet: "this is for jest magnet"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Add new Magnet"
            }, done)
    })
    test("add text magnet2", async (done) => {
        request(app)
            .post('/board/JestBoardA1/addMagnet')
            .send({
                magnetName: "jest 2",
                textMagnet: "this is for jest magnet2"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Add new Magnet"
            }, done)
    })
    test("delete magnet2", async (done) => {
        request(app)
            .post('/board/JestBoardA1/deleteMagnet')
            .send({
                magnetName: "jest 1"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Delete magnet"
            }, done)
    })
    test("get magnet list", async () => {
        const {body} = await request(app).get('/board/JestBoardA1/getAllMagnet') 
        expect(body.length).toEqual(1);
    })
})

//jest for imageController.js
const testImage = `${__dirname}/DuckFace-Jest.PNG`
describe('test image controller', () => {    
    test('get image list', async () => {
        const {body} = await request(app).get('/board/JestBoardA1/getImage') 
        expect(body.length).toEqual(1);
    })
})