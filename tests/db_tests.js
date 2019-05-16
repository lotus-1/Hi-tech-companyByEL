
const tape = require("tape");
const lowercase = require("../database/db_bulid");
const request = require('supertest');

const stringUtils = require('./strings.js')
test('lowercase should make everything in the original string lower case', function (t) {
  const result = stringUtils.lowercase('Testing lowerCase')
  const expected = 'testing lowercase'
  t.ok(result)
  t.deepEqual(result, expected)
  t.end()
});
