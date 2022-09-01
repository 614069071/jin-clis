const fs = require('fs');

function rename(path = './') {
  fs.readdir(path, function (err, list) {
    if (err) return;

    list.forEach((e, i) => {
      const current = path + '/' + e;
      fs.stat(current, function (err, data) {
        if (err) return;

        if (data.isDirectory()) {
          rename(current);
        } else {
          const arr = e.split('.');
          const cname = arr[arr.length - 1].split('').reverse().join('');

          fs.renameSync(current, path + '/' + i + '.' + cname);
        }
      });
    });
  });
}

module.exports = function (program) {
  program.command('rename <name>').action(name => {
    rename(name);
  });
};
