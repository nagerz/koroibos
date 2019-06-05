var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Event = require('../../models').Event;
var Sport = require('../../models').Sport;

describe('Event Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return Event.create({name: 'test name', SportId: 1})
    .then(event => {
      expect(event).toBeInstanceOf(Event)
    })
  })

  test('It has attributes', () => {
    return Event.create({name: 'another test name', SportId: 1},
                        {include: [{model: Sport}]
    })
    .then(event => {
      return event.reload();
    })
    .then(event => {
      expect(event.name).toBe('another test name')
      expect(event.SportId).toBe(1)
      expect(event.Sport.id).toBe(1)
      expect(event.Sport.name).toBe('weightlifting')
    })
  })

  test('It cannot be created without a name', () => {
    expect(Event.create({SportId: 1})).rejects.toThrow()
  })

  test('It cannot be created with a duplicate name', () => {
    expect(Event.create({name: 'test name', SportId: 1})).rejects.toThrow()
  });
})
