require('dotenv').config()
import request from '../config/supertest';
import { expect } from 'chai';
import { before } from 'mocha';
import { createRandomUser } from '../helper/user_helper';
const TOKEN = process.env.USER_TOKEN;

describe('Creation blogposts with valid data and verify that it is created', () => {
    let postId, userId;
    before(async () => {
        userId = await createRandomUser();
    });
    it('Create a post', async () => {
        const POST_DATA = {
            user_id: userId,
            title: 'my title',
            body: 'my blog post1'
            };
        const postRes = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(POST_DATA);
                
        expect(postRes.body.data).to.deep.include(POST_DATA);
        postId = postRes.body.data.id;
    });
    it(`Get post ${postId}`, async () => {
        await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);
        });
    });
describe('Negative tests. Inability to create blogposts', () => {
        let postId, userId;
        before(async () => {
        userId = await createRandomUser();
    });
    it('401. Inability to create post if user not authorized', async () => {
        const POST_DATA = {
            user_id: userId,
            title: 'my title',
            body: 'my blog post'
            };
        const postRes = await request
            .post('posts')
            .send(POST_DATA);
        expect(postRes.body.code).to.eq(401);
        expect(postRes.body.data.message).to.eq('Authentication failed')
        });
    it('422. Inability to create post due to sending lack of data', async () => {
            const POST_INVALID_DATA = {
            user_id: userId,
            title: "",
            body: 'my blog post'
            };
        const postRes = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(POST_INVALID_DATA);
        expect(postRes.body.code).to.eq(422);
        expect(postRes.body.data[0].field).to.eq('title');
        expect(postRes.body.data[0].message).to.eq(`can't be blank`);
        });
    });