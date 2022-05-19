import supertest from "supertest";
const request = supertest('https://gorest.co.in/public-api/'); 
// const request = supertest('https://gorest.co.in/public/v2/'); 
import { expect } from 'chai';

const TOKEN = 
    'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';
            
describe('List of User Accounts', () => {
    it('1. Get list of users and verify that it is not empty (using "done" callback)', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log("error: ", err);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
    it('2. Get list of users and verify that it is not empty (using promise)', () => {
        return request.get(`/users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });
    it('3. Get list of users with the following filter params: female, active, from page 5', () => {
        const URL = `/users?access-token=${TOKEN}&gender=female&status=active&page=5`
        return request.get(URL).then((res) =>{
            res.body.data.forEach((data) => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
            });
        });
    });
    /**
     * @TODO 
     * 2. replace urls in all tests with updated url
     */
});
