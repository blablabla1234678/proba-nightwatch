const usersFixture = require('./users.json');
const api = 'http://localhost:8000/api/';

describe('users', () => {
    it('can list empty users', async ({supertest}) => {
        const response = await supertest.request(api).get('users');
        expect(response.statusCode).to.eq(200);
        expect(response._body).to.be.an('array')
        expect(response._body.length).to.eq(0);
    });

    it('can create and list users', async ({supertest}) => {
        const usersData = Object.values(usersFixture);
        for (let userData of usersData){
            let response = await supertest.request(api)
                .post('users')
                .send(userData)
                .set('Content-type', 'application/json')
            expect(response.statusCode).to.eq(201);
            expect(response._body.name).to.eq(userData.name);
            expect(response._body.email).to.eq(userData.email);
        }
        let response = await supertest.request(api).get('users');
        expect(response.statusCode).to.eq(200);
        expect(response._body.length).to.eq(usersData.length);
        for (let index = 0; index<usersData.length; ++index){
            expect(response._body[index].name).to.eq(usersData[index].name);
            expect(response._body[index].email).to.eq(usersData[index].email);
        }
    });
});
  