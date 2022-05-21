import localEnv from './localEnv';
import supertest from 'supertest';
const request = supertest(localEnv.baseUrl); 

export default request;