var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Sport = require('../../models').Sport;

describe('Sport Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return Sport.create({name: 'test name'})
    .then(sport => {
      expect(sport).toBeInstanceOf(Sport)
    })
  })

  test('It has attributes', () => {
    return Sport.create({name: 'another test name'})
    .then(sport => {
      expect(sport.name).toBe('another test name')
    })
  })

  test('It cannot be created without a name', () => {
    expect(Sport.create()).rejects.toThrow()
  })

  test('It cannot be created with a duplicate name', () => {
    expect(Sport.create({name: 'test name'})).rejects.toThrow()
  });
})
