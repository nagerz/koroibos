var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Athelete = require('../../models').Athelete;
var Event = require('../../models').Event;
var EventAthelete = require('../../models').EventAthelete;
var Team = require('../../models').Team;

describe('Athelete Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return Athelete.create({name: 'test athelete', sex: 'M', age: 30, height: 50, weight: 100, TeamId: 1})
    .then(athelete => {
      expect(athelete).toBeInstanceOf(Athelete)
    })
  })

  test('It has attributes', () => {
    return Athelete.create({name: 'another test athelete', sex: 'M', age: 30, height: 50, weight: 100, TeamId: 1})
    .then(athelete => {
      expect(athelete.name).toBe('another test athelete')
      expect(athelete.sex).toBe('M')
      expect(athelete.age).toBe(30)
      expect(athelete.height).toBe(50)
      expect(athelete.weight).toBe(100)
      expect(athelete.TeamId).toBe(1)
    })
  })

  test('It has relationships', () => {
    return Athelete.create({name: 'test athelete 3', sex: 'M', age: 30, height: 50, weight: 100, TeamId: 1},
                          {include: [{model: Team}]
    })
    .then(athelete => {
      return athelete.reload();
    })
    .then(athelete => {
      expect(athelete.name).toBe('test athelete 3')
      expect(athelete.TeamId).toBe(1)
      expect(athelete.Team.id).toBe(1)
      expect(athelete.Team.name).toBe('Romania')
    })
  })

  test('It cannot be created without a name', () => {
    expect(Athelete.create({sex: 'M', age: 30, height: 50, weight: 100, TeamId: 1})).rejects.toThrow()
  })

  test('It cannot be created with a duplicate name', () => {
    expect(Athelete.create({name: 'test athelete', sex: 'M', age: 30, height: 50, weight: 100, TeamId: 1})).rejects.toThrow()
  });
})
