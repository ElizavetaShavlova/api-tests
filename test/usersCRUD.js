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
        const res = await request
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_VALID_DATA)
                expect(res.body.code).to.deep.eq(201);
                expect(res.body.data).to.deep.include(USER_VALID_DATA);
                userId = res.body.data.id;
    });  
    it(`2. Get ${userId} user and verify that it has id=${userId}`, async () => {
        const res = await request
        .get(`/users/${userId}?access-token=${TOKEN}`)
            expect(res.body.data.id).to.be.eq(userId);
            console.log(userId); 
    });
    it(`3. Update user name and satus attributes of ${userId} user `, async () => {
        const res = await request
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_NEW_DATA)
                expect(res.body.code).to.deep.eq(200);
                expect(res.body.data.name).to.deep.eq(USER_NEW_DATA.name);
                expect(res.body.data.status).to.deep.eq(USER_NEW_DATA.status);
    });
    it('4. Delete user and verify that his data returnes as null', async () => {
        const res = await  request
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
                expect(res.body.data).to.deep.eq(null);
    });
});

describe('Negative test for CRUD users', () => {
    let userId;
    before(async () => {
        userId = await createRandomUser();
    });
    it('1. Inability to create user account with empty user data', async () => {
        const res =  await request
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(USER_EMPTY_DATA)
                expect(res.body.code).to.deep.eq(422);
                // verify that message for empty 'gender' field is == 'can't be blank, can be male or female'
                const response = res.body.data
                expect(response[2].message).to.equal(`can't be blank, can be male or female`)
                // verify that messages for all other fields are == 'can't be blank'
                response.forEach((data) => {
                    if (Object.keys(response).length == 4) {
                        response.splice(2, 1)               
                    }
                expect(data.message).to.eq(`can't be blank`);
        });
    });
    it(`2. Inability to create user due to Auth error`, async () => {
        const res = await request
            .post('/users')
            .send(USER_VALID_DATA)
                expect(res.body.code).to.deep.eq(401);
                expect(res.body.data.message).to.deep.equal('Authentication failed');
    });
});