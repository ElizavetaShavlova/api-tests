import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';

const TOKEN = 
    'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';

describe('Users', () => {
    it('Get /users list and verify that it is not empty (using "done" callback)', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log("error: ", err);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
    it('Get /users list and verify that it is not empty (using promise)', () => {
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });
});
