const request = require('supertest');
const app = require('../app');

//please make new account only
//if you already use ID, it will give error as result. So please make new ID whenever you run this 
//Make account and add or delete board
// describe("test for user account/", ()=> {
//     test("test register", async (done) => {
//         request(app)
//             .post('/auth/register')
//             .send({
//                 users: "jestBackEndAccount",
//                 password: "123456789",
//                 FirstName: "BackEnd",
//                 LastName: "Jest"
//             })
//             .set('Accept', 'application/json')
//             .expect(200, {
//                 "insertID": true,
//                 message: "User registered"
//             }, done)
//     })
//     // test("test login", (done) => {
//     //     request(app)
//     //         .post('/auth/login')
//     //         .send({
//     //             users: "jestBackEndAccount",
//     //             password: "123456789"
//     //         })
//     //         .set('Accept', 'application/json')
//     //         .expect(200, {
//     //             "loginStatus": true,
//     //             message: "login successful"
//     //         }, done)
//     // })
// })

//Jest for friendController
describe("test for friend list", () => {
    // test("make new friend account", async (done) => {
    //     request(app)
    //         .post('/auth/register')
    //         .send({
    //             users: "testFriend",
    //             password: "123456789",
    //             FirstName: "Test",
    //             LastName: 'Friend'
    //         })
    //         .set('Accept', 'application/json')
    //         .expect(200, {
    //             "insertID": true,
    //             message: "User registered"
    //         }, done)
    // })
    test("add friend", async (done) => {
        request(app)
            .post('/auth/jestBackEndAccount/addFriend')
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
        const {body} = await request(app).get('/auth/jestBackEndAccount/getFriends') 
        expect(body.length).toEqual(1);
    })
    test("delete friend", async (done) => {
        request(app)
            .post('/auth/jestBackEndAccount/deleteFriend')
            .send({
                friendID: "testFriend"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "usernameStatus2": true,
                message: "username successful"
            }, done)
    })
})

// Jest boardController.js
describe("test for board list", ()=> {
    test("add board", async (done) => {
        request(app)
            .post('/auth/jestBackEndAccount/addBoard')
            .send({
                boardName: "JestBoardA"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "newboardstatus": true
            },done)
    })
    test("add board", async (done) => {
        request(app)
            .post('/auth/jestBackEndAccount/addBoard')
            .send({
                boardName: "JestBoardB"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "newboardstatus": true
            },done)
    })
    test("delete board", async (done) => {
        request(app)
            .post('/auth/jestBackEndAccount/deleteBoard')
            .send({
                boardName: "JestBoardB"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Delete that board"
            },done)
    })
    test("get board list", async () => {
        const {body} = await request(app).get('/auth/jestBackEndAccount/main') 
        expect(body.length).toEqual(1);
    })
})

//jest for boardSharing
describe("test for board sharing", ()=> {
    test("share board", async (done) => {
        request(app)
            .post('/auth/jestBackEndAccount/addBoardShare')
            .send({
                userID: "testFriend",
                boardName: "JestBoardA"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "status": true,
                message: "username successful"
            },done)
    })
    test("get list of shared member", async () => {
        const {body} = await request(app).get('/board/JestBoardA/getUsers') 
        expect(body.length).toEqual(2);
    })
})

// jest for magnetController.js
describe("test for magnet part", () => {
    test("add text magnet1", async (done) => {
        request(app)
            .post('/board/JestBoardA/addMagnet')
            .send({
                magnetName: "1",
                textMagnet: "this is for jest magnet 1",
                xPosition: 10,
                yPosition: 12
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Add new Magnet"
            }, done)
    })
    test("add text magnet2", async (done) => {
        request(app)
            .post('/board/JestBoardA/addMagnet')
            .send({
                magnetName: "2",
                textMagnet: "this is for jest magnet 2",
                xPosition: 45,
                yPosition: 232
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Add new Magnet"
            }, done)
    })
    test("get magnet list", async () => {
        const {body} = await request(app).get('/board/JestBoardA/getAllMagnet') 
        expect(body.length).toEqual(2);
    })
    test("delete magnet1", async (done) => {
        request(app)
            .post('/board/JestBoardA/deleteMagnet')
            .send({
                magnetName: "1"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Delete magnet"
            }, done)
    })
})

//jest for imageController.js
describe('test image controller', () => {    
    test('upload image', async (done)=> {
        request(app)
            .post('/board/JestBoardA/uploadImage')
            .attach('test', __dirname + '/test.PNG')
            .expect(500, done)
    })

    test('get image list', async () => {
        const {body} = await request(app).get('/board/JestBoardA/getImage') 
        expect(body.length).toEqual(0);
    })
})

//jest for update position of magnet 
describe("test for update position of image and text magnet", () => {
    test("update text magnet position", async(done) => {
        request(app)
            .post('/board/JestBoardA/updateImagePosition')
            .send({
                magnetName: "2",
                xPosition: "99",
                yPosition: "100",
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message : "Update position"
            }, done)
    })
})

// reset all test result
describe("reset/", ()=>{
    test("delete magnet2", async (done) => {
        request(app)
            .post('/board/JestBoardA/deleteMagnet')
            .send({
                magnetName: "2"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Delete magnet"
            }, done)
    })
    test("delete board", async (done) => {
        request(app)
            .post('/auth/jestBackEndAccount/deleteBoard')
            .send({
                boardName: "JestBoardA"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                message: "Delete that board"
            },done)
    })
    test("delete user", (done) => {
        request(app)
            .get('/auth/jestBackEndAccount/deleteAccount')
            .set('Accept', 'application/json')
            .expect(200, {
                message: "delete user"
            }, done)
    })
    test("delete user", (done) => {
        request(app)
            .get('/auth/testFriend/deleteAccount')
            .set('Accept', 'application/json')
            .expect(200, {
                message: "delete user"
            }, done)
    })
})
