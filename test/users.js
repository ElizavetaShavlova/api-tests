import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';

const TOKEN = 
    'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';

describe('Users', () => {
    it('Get /users', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log(err);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
});
