const download = require('download-git-repo');

module.exports = function (program) {
  program.command('vue <name>').action(name => {
    console.log('create vue loading ...');

    download('github:614069071/jin-vue-cli', name, err => {
      console.log(err ? 'create vue error' : 'create vue success');
    });
  });
};
