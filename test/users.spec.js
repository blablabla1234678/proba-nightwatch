describe('users', function () {
    const api = 'http://localhost:8000/api/';

    it('can list empty users', async ({supertest}) => {
        console.log(supertest);
        const response = await supertest.request(api)
            .get('users');
        expect(response.statusCode).to.eq(200);
        expect(response._body).to.be.an('array')
        expect(response._body.length).to.eq(0);
    });

  });
  