var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Events API', () => {
  describe('Test GET /api/v1/events', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a successful request for all events grouped by sport', () => {
      return request(app).get('/api/v1/events').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.events.length).toBe(6)
        expect(response.body.events[0].sport).toBe("athletics")
        expect(response.body.events[0].events.length).toBe(1)
        expect(response.body.events[0].events[0]).toBe("Athletics Men's 5,000 metres")
      })
    })

    test('it should return a successful request for all medalists for an event', () => {
      return request(app).get('/api/v1/events/11/medalists').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.event).toBe("Handball Men's Handball")
        expect(response.body.medalists.length).toBe(1)
        expect(response.body.medalists[0].name).toBe('Luc Abalo')
        expect(response.body.medalists[0].team).toBe('France')
        expect(response.body.medalists[0].age).toBe(31)
        expect(response.body.medalists[0].medal).toBe('Silver')
      })
    })

  })
})
