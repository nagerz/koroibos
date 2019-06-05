var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Olympian Stats API', () => {
  describe('Test GET /api/v1/olympian_stats', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a successful request for all olympians', () => {
      return request(app).get('/api/v1/olympian_stats').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.olympian_stats.total_competing_olympians).toBe(6)
        expect(response.body.olympian_stats.average_weight.unit).toBe("kg")
        expect(response.body.olympian_stats.average_weight.male_olympians).toBe(76.3)
        expect(response.body.olympian_stats.average_weight.female_olympians).toBe(87)
        expect(response.body.olympian_stats.average_age).toBe(24)
      })
    })

  })
})
