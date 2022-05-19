import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/'); 
// const request = supertest('https://gorest.co.in/public/v2/'); 
import { expect } from 'chai';

const TOKEN = 'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';
const USER_VALID_DATA = {
    "name":"Eliz",
    "email":`eliz${Math.floor(Math.random()*9999)}@test.info`,
    "gender":"female",
    "status":"active"
    };
const USER_NEW_DATA = {
    "name": "Eliz5558",
    "status": "inactive"
    };
const USER_EMPTY_DATA = {};
let userId;
// CRUD for users
/**
 * @todo
 * 1. use shared store to avoid undefind in test names
 * 2. move all user data to another file (fixtures?)
 */
describe('Positive tests for CRUD users', () => {
    it('1. Create user account with valid data', () => {
        return request
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_VALID_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(201);
                expect(res.body.data).to.deep.include(USER_VALID_DATA);
                userId = res.body.data.id;
                console.log(userId);
        });
    });  
    it(`2. Get ${userId} user and verify that it has id=${userId}`, () => {
        return request.get(`/users/${userId}?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(userId);
            console.log(userId);
        })        
    });
    it(`3. Update user name and satus attributes of ${userId} user `, () => {
        return request
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_NEW_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(200);
                expect(res.body.data.name).to.deep.eq(USER_NEW_DATA.name);
                expect(res.body.data.status).to.deep.eq(USER_NEW_DATA.status);
                console.log(userId);
            });
    });
    it('4. Delete user and verify that his data returnes as null', () => {
        return request
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) => {
                expect(res.body.data).to.deep.eq(null);
                console.log(userId);
            });
    });
});

describe('Negative test for create users', () => {
    it('4. Inability to create user account with empty user data', () => {
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
});