import qaEnv from '../config/qa-env';
import supertest from 'supertest';
const request = supertest(qaEnv.baseUrl); 

export default request;