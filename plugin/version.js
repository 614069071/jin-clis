const package = require('../package');

module.exports = function (program) {
  program.version(package.version, '-v, --version');
};
