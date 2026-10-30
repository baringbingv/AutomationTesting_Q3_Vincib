
const BASE_URL = 'https://reqres.in/api';

// Helper untuk mengambil API Key
const getApiHeaders = () => {
  return cy.env(['REQRES_API_KEY']).then(({ REQRES_API_KEY }) => ({
    'x-api-key': REQRES_API_KEY
  }));
};

describe('ReqRes API Automation - Cypress', () => {

  // TC01 - GET List Users
  it('TC01 - GET list users', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/users?page=2`,
        headers: apiHeaders,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.page).to.eq(2);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0);
      });
    });
  });

  // TC02 - GET Single User
  it('TC02 - GET single user', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/users/2`,
        headers: apiHeaders,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(2);
        expect(response.body.data.email).to.be.a('string');
        expect(response.body.data.first_name).to.be.a('string');
      });
    });
  });

  // TC03 - GET User Not Found
  it('TC03 - GET user not found', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/users/23`,
        headers: apiHeaders,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.be.empty;
      });
    });
  });

  // TC04 - GET List Resources
  it('TC04 - GET list resources', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/unknown`,
        headers: apiHeaders,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0);
        expect(response.body.data[0]).to.have.property('name');
      });
    });
  });

  // TC05 - GET Single Resource
  it('TC05 - GET single resource', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/unknown/2`,
        headers: apiHeaders,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(2);
        expect(response.body.data.name).to.be.a('string');
        expect(response.body.data.color).to.be.a('string');
      });
    });
  });

  // TC06 - POST Create User
  it('TC06 - POST create user', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'POST',
        url: `${BASE_URL}/users`,
        headers: apiHeaders,
        body: {
          name: 'Vinci',
          job: 'QA Tester',
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.name).to.eq('Vinci');
        expect(response.body.job).to.eq('QA Tester');
        expect(response.body.id).to.exist;
        expect(response.body.createdAt).to.exist;
      });
    });
  });

  // TC07 - PUT Update User
  it('TC07 - PUT update user', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'PUT',
        url: `${BASE_URL}/users/2`,
        headers: apiHeaders,
        body: {
          name: 'Vinci',
          job: 'QA Engineer',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('Vinci');
        expect(response.body.job).to.eq('QA Engineer');
        expect(response.body.updatedAt).to.exist;
      });
    });
  });

  // TC08 - PATCH Update User
  it('TC08 - PATCH update user', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'PATCH',
        url: `${BASE_URL}/users/2`,
        headers: apiHeaders,
        body: {
          job: 'Automation Tester',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.job).to.eq('Automation Tester');
        expect(response.body.updatedAt).to.exist;
      });
    });
  });

  // TC09 - DELETE User
  it('TC09 - DELETE user', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'DELETE',
        url: `${BASE_URL}/users/2`,
        headers: apiHeaders,
      }).then((response) => {
        expect(response.status).to.eq(204);
        expect([null, '']).to.include(response.body);
      });
    });
  });

  // TC10 - POST Register Successful
  it('TC10 - POST register successful', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'POST',
        url: `${BASE_URL}/register`,
        headers: apiHeaders,
        body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.exist;
        expect(response.body.token).to.be.a('string');
        expect(response.body.token).not.to.be.empty;
      });
    });
  });

  // TC11 - POST Register Without Password
  it('TC11 - POST register without password', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'POST',
        url: `${BASE_URL}/register`,
        headers: apiHeaders,
        body: {
          email: 'sydney@fife',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Missing password');
      });
    });
  });

  // TC12 - POST Login Successful
  it('TC12 - POST login successful', () => {
    getApiHeaders().then((apiHeaders) => {
      cy.request({
        method: 'POST',
        url: `${BASE_URL}/login`,
        headers: apiHeaders,
        body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.be.a('string');
        expect(response.body.token).not.to.be.empty;
      });
    });
  });

});
