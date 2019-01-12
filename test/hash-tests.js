const assert = require('assert');
const hasher = require('../src/hash');

describe("hash", function() {
  describe("#compare", function() {
    it("should give false when salt rounds don't match", function() {
      const saltRounds = 5;
      const {compare} = hasher(saltRounds);
      const {hash} = hasher(4);
      hash("hello", (err, hashed) => {
        compare("hello", hashed, (err, match) => {
          assert.equal(err, null);
          assert.equal(match, false);
        });
      })
      
    });
    it("should give true when salt rounds do match", function() {
      const saltRounds = 4;
      const {hash, compare} = hasher(saltRounds);
      hash("hello", (err, hashed) => {
        compare("hello", hashed, (err, match) => {
          assert.equal(err, null);
          assert.equal(match, true);
        });
      });
    });
  });
});