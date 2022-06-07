import request from '../config/supertest';
import { expect } from 'chai';
const TOKEN = process.env.USER_TOKEN;
            
describe('List of User Accounts', () => {
    it('1. Get list of users and verify that it is not empty (using "done" callback)', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log("error: ", err);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
    it('2. Get list of users and verify that it is not empty (using promise)', async () => {
        const res = await request
        .get(`/users?access-token=${TOKEN}`)
            expect(res.body.data).to.not.be.empty;
    });
    it('3. Get list of users with the following filter params: female, active, from page 5', async () => {
        const URL = `/users?access-token=${TOKEN}&gender=female&status=active&page=5`
        const res = await request
        .get(URL)
            res.body.data.forEach((data) => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
        });
    });
    /**
     * @TODO 
     * 2. replace urls in all tests with updated url
     */
});
