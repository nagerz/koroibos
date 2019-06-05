var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Athelete = require('../../models').Athelete;
var Event = require('../../models').Event;
var EventAthelete = require('../../models').EventAthelete;
var Team = require('../../models').Team;

describe('EventAthelete Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return EventAthelete.create({EventId: 1, AtheleteId: 1, medal: 'Gold'})
    .then(ea => {
      expect(ea).toBeInstanceOf(EventAthelete)
    })
  })

  test('It has attributes', () => {
    return EventAthelete.create({EventId: 1, AtheleteId: 2, medal: 'Gold'})
    .then(ea => {
      expect(ea.EventId).toBe(1)
      expect(ea.AtheleteId).toBe(2)
      expect(ea.medal).toBe('Gold')
    })
  })

  test('It has relationships', () => {
    return EventAthelete.create({EventId: 2, AtheleteId: 2, medal: 'Gold'},
                                {include: [{model: Event}, {model: Athelete}]
    })
    .then(ea => {
      return ea.reload();
    })
    .then(ea => {
      expect(ea.EventId).toBe(2)
      expect(ea.AtheleteId).toBe(2)
      expect(ea.Event.id).toBe(2)
      expect(ea.Athelete.id).toBe(2)
      expect(ea.Event.name).toBe("Gymnastics Men's Individual All-Around")
      expect(ea.Athelete.name).toBe('Nstor Abad Sanjun')
    })
  })

  test('It cannot be created without a event', () => {
    expect(EventAthelete.create({AtheleteId: 2, medal: 'Gold'})).rejects.toThrow()
  })

  test('It cannot be created without a athelete', () => {
    expect(EventAthelete.create({EventId: 1, medal: 'Gold'})).rejects.toThrow()
  })

  test('It cannot be created with duplicate event/athelete', () => {
    expect(EventAthelete.create({EventId: 1, AtheleteId: 1, medal: 'Gold'})).rejects.toThrow()
  })
})
