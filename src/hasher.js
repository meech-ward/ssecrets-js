const R = require('ramda');
const bcryptjs = require('bcryptjs');

const compare = R.curry(function(saltRounds, text, hash, cb) {
  console.log(hash, saltRounds);
  const saltRoundsString = String(saltRounds).padStart(2, 0);
  if (!hash.startsWith('$2a$'+saltRoundsString)){
    cb(null, false);
    return;
  }
  bcryptjs.compare(text, hash, cb);
});

/**
 * Setup the hash and compare functions with a given number of salt rounds. 
 * All compares must have hashes with that number of salt rounds.
 */
module.exports = function(saltRounds = 12) {
  const hash = R.curry(bcryptjs.hash);
  const hashRounds = hash(R.__, saltRounds);

  return {
    /**
     * Hash some text.
     * @param text the plain text to hash.
     * @param cb (error, hash)
     */
    hash: hashRounds,
    /**
     * Compare a hash and plain text.
     * @param text the plain text to compare it to
     * @param hash the hash to compare to
     * @param cb (error, match)
     */
    compare: compare(saltRounds)
  };
}