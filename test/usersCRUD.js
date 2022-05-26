import request from '../config/supertest';
import { expect } from 'chai';
const TOKEN = process.env.USER_TOKEN;
import { USER_VALID_DATA } from '../helper/user_helper';
import { USER_NEW_DATA } from '../helper/user_helper';
import { USER_EMPTY_DATA } from '../helper/user_helper';
import { createRandomUser } from '../helper/user_helper';

// CRUD for users
/**
 * @todo
 * 1. use shared store to avoid undefind in test names
 */
describe('Positive tests for CRUD users', () => {
    let userId;
    it('1. Create user account with valid data', async () => {
        await request
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_VALID_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(201);
                expect(res.body.data).to.deep.include(USER_VALID_DATA);
                userId = res.body.data.id;
        });
    });  
    it(`2. Get ${userId} user and verify that it has id=${userId}`, () => {
        return request.get(`/users/${userId}?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(userId);
            console.log(userId);
        })        
    });
    it(`3. Update user name and satus attributes of ${userId} user `, async () => {
        await request
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_NEW_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(200);
                expect(res.body.data.name).to.deep.eq(USER_NEW_DATA.name);
                expect(res.body.data.status).to.deep.eq(USER_NEW_DATA.status);
            });
    });
    it('4. Delete user and verify that his data returnes as null', async () => {
        await  request
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) => {
                expect(res.body.data).to.deep.eq(null);
            });
    });
});

describe('Negative test for CRUD users', () => {
    let userId;
    before(async () => {
        userId = await createRandomUser();
    });
    it('1. Inability to create user account with empty user data', async () => {
        await request
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
    it(`2. Inability to create user due to Auth error`, async () => {
        await request
            .post('/users')
            .send(USER_VALID_DATA)
            .then((res) => {
                expect(res.body.code).to.deep.eq(401);
                expect(res.body.data.message).to.deep.equal('Authentication failed');
            });
    });
});