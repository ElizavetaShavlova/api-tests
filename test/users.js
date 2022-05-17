import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/');
import { expect } from 'chai';

const TOKEN = 
    'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';
const USER_DATA_VALID = {
            "name":"Eliz",
            "email":`eliz${Math.floor(Math.random()*9999)}@test.info`,
            "gender":"female",
            "status":"active"
            }
            
describe('User Accounts', () => {
    it('Get: get list of users and verify that it is not empty (using "done" callback)', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log("error: ", err);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
    it('Get: get list of users and verify that it is not empty (using promise)', () => {
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });
    it('Get 3141-rd user and verify that it has id=3141', () => {
        return request.get(`users/3141?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(3141);
        })        
    });
    it('Get: get users with query params: female, active, from page 5', () => {
        const URL = `users?access-token=${TOKEN}&gender=female&status=active&page=5`
        return request.get(URL).then((res) =>{
            res.body.data.forEach((data) => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
            });
        });
    });
    it('Post: Create user account with valid data', () => {
        return request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_DATA_VALID)
            .then((res) => {
                expect(res.body.code).to.deep.eq(201);
                expect(res.body.data.status).to.deep.include(USER_DATA_VALID.status);
                expect(res.body.data.email).to.deep.include(USER_DATA_VALID.email);
                console.log(`code is:  ${res.body.code}\n status is: ${USER_DATA_VALID.status}\n email is: ${USER_DATA_VALID.email}`);
        });
    });
});
