import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';

const TOKEN = 
    'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';

describe('List of user accounts', () => {
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
    it('Get 3141-rd user and verify that it has id=3141', () => {
        return request.get(`users/3141?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(3141);
        })        
    });
    it('Get users with query params: female, active, from page 5', () => {
        const URL = `users?access-token=${TOKEN}&gender=female&status=active&page=5`
        return request.get(URL).then((res) =>{
            res.body.data.forEach((data) => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
            });
        });
    });
});
