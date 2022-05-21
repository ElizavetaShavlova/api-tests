import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/'); 
const TOKEN = 'a45e357c080a761f2194bc699f5ef27f1311fdaa50ce8af5658e92377bb42e54';

export const createRandomUser = async () => {
    const USER_VALID_DATA = {
            email:`eliz${Math.floor(Math.random()*9999)}@test.info`,
            name:"Eliz",
            gender:"female",
            status:"active",
        };
    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(USER_VALID_DATA)
    return res.body.data.id;
};