import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/'); 
// const request = supertest('https://gorest.co.in/public/v2/'); 
import { expect } from 'chai';

const TOKEN = 
    'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';
const USER_VALID_DATA = {
            "name":"Eliz",
            "email":`eliz${Math.floor(Math.random()*9999)}@test.info`,
            "gender":"female",
            "status":"active"
            };
const USER_EMPTY_DATA = {};
        const USER_NEW_DATA = {
            "name": "Eliz5558",
            "status": "inactive"
        };
            
describe('User Accounts', () => {
    it('1) Get: get list of users and verify that it is not empty (using "done" callback)', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log("error: ", err);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
    it('2) Get: get list of users and verify that it is not empty (using promise)', () => {
        return request.get(`/users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });
    it.skip('3) Get 3141-rd user and verify that it has id=3141', () => {
        return request.get(`/users/3141?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(3141);
        })        
    });
    it('4) Get: get users with query params: female, active, from page 5', () => {
        const URL = `/users?access-token=${TOKEN}&gender=female&status=active&page=5`
        return request.get(URL).then((res) =>{
            res.body.data.forEach((data) => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
            });
        });
    });
    it('5) Post: Create user account with valid data', () => {
        return request
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_VALID_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(201);
                expect(res.body.data).to.deep.include(USER_VALID_DATA);
        });
    });
    it('6) Post: Ibability to create user account with empty user data', () => {
        return request
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_EMPTY_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(422);
                res.body.data.forEach((data) => {
                expect(data.message).to.eq(`can't be blank`);
            });
        });
    });
    /**
     * @TODO 
     * 2. replace urls in all tests with updated url
     * 3. delete forEach file
     */
    it('7) Put: Update user attributes (name and status)', () => {
        return request
            .put('/users/2517')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_NEW_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(200);
                expect(res.body.data.name).to.deep.eq(USER_NEW_DATA.name);
                expect(res.body.data.status).to.deep.eq(USER_NEW_DATA.status);
            });
    });
});
