var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Team = require('../../models').Team;

describe('Team Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return Team.create({name: 'test name'})
    .then(team => {
      expect(team).toBeInstanceOf(Team)
    })
  })

  test('It has attributes', () => {
    return Team.create({name: 'another test name'})
    .then(team => {
      expect(team.name).toBe('another test name')
    })
  })

  test('It cannot be created without a name', () => {
    expect(Team.create()).rejects.toThrow()
  })

  test('It cannot be created with a duplicate name', () => {
    expect(Team.create({name: 'test name'})).rejects.toThrow()
  });
})
