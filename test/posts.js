import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/'); 
import { expect } from 'chai';
import { before } from 'mocha';
import { createRandomUser } from '../helper/user_helper';
const TOKEN = 'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';

describe.only('User Posts', () => {
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