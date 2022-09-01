const fs = require('fs');
const xlsx = require('node-xlsx');

function deldir(path, callback) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    files.length &&
      files.forEach(file => {
        let cret = path + '/' + file;

        if (fs.statSync(cret).isDirectory()) {
          deldir(cret);
        } else {
          fs.unlinkSync(cret);
        }
      });

    callback && callback();
  } else {
    fs.mkdir(path, err => {
      if (err) return;

      callback && callback();
    });
  }
}

function xlxsParse(path) {
  const sheets = xlsx.parse(path);
  const data = sheets[0].data;
  const langs = data[1].slice(1);
  const len = langs.length;
  const trans = data.slice(2);
  const colles = Array(len)
    .fill('')
    .map(() => ({}));

  trans.forEach(([k, ...arr]) => arr.forEach((v, i) => (colles[i][k] = v || '')));

  colles.forEach(
    (e, i) =>
      langs[i] && fs.writeFile(`./dist/${langs[i]}.json`, JSON.stringify(e), err => err && console.log('err', err))
  );
}

module.exports = function (program) {
  program.command('locale <name>').action(name => {
    console.log('locale loading...');
    deldir('./dist', () => xlxsParse(`./${name}`));
  });
};
