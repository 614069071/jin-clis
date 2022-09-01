#! /usr/bin/env node

const program = require('commander');
const versionPlugin = require('./plugin/version');
const renamePlugin = require('./plugin/name');
const langPlugin = require('./plugin/lang');
const vuePlugin = require('./plugin/vue');

program.use = function (fn) {
  fn && fn(this);

  return this;
};

program.use(versionPlugin).use(renamePlugin).use(langPlugin).use(vuePlugin);

program.parse(process.argv);
