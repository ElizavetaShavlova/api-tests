import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/'); 
// const request = supertest('https://gorest.co.in/public/v2/'); 
import { expect } from 'chai';

const TOKEN = 'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';

describe.only('Posts', () => {
    it('Create a post', async () => {
        const POST_DATA = {
            "user_id": "9676",
            "title":"title of post1",
            "body":"body of post1"
            }
        const res = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(POST_DATA)
            console.log(res.body);
    });
});