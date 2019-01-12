const R = require('ramda');
const bcryptjs = require('bcryptjs');

const compare = R.curry(function(saltRounds, text, hash, cb) {
  console.log(hash, saltRounds);
  const saltRoundsString = String(saltRounds).padStart(2, 0);
  if (!hash.startsWith('$2a$'+saltRoundsString)){
    cb(null, false);
    return;
  }
  cb(null, true);
  bcryptjs.compare
});

module.exports = function(saltRounds = 12) {
  const hash = R.curry(bcryptjs.hash);
  const hash12 = hash(R.__, saltRounds);

  return {
    hash: hash12,
    compare: compare(saltRounds)
  };
}