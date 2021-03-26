const request = require('supertest');
const app = require('../app');

//please make new account only
//if you already use ID, it will give error as result. So please make new ID whenever you run this test
describe("POST/", ()=> {
    test("test register", async (done) => {
        request(app)
            .post('/auth/register')
            .send({
                users: "jestTest",
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
                users: "jestTest",
                password: "1234"
            })
            .set('Accept', 'application/json')
            .expect(200, {
                "loginStatus": true,
                message: "login successful"
            }, done)
    })
})
