var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Olympians API', () => {
  describe('Test GET /api/v1/olympians', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a successful request', () => {
      return request(app).get('/api/v1/olympians').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.olympians.length).toBe(6)
        expect(response.body.olympians[0].name).toBe("Patimat Abakarova")
        expect(response.body.olympians[0].team).toBe("Azerbaijan")
        expect(response.body.olympians[0].age).toBe(21)
        expect(response.body.olympians[0].sport).toBe("taekwondo")
        expect(response.body.olympians[0].total_medals_won).toBe(1)
      })
    })
  })
})
