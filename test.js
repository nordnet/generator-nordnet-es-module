'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('generator', function () {
  beforeEach(function (cb) {
    var deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        cb(err);
        return;
      }

      this.generator = helpers.createGenerator('nordnet-es-module:app', deps, null, {skipInstall: true});
      cb();
    }.bind(this));
  });

  it('generates expected files', function (cb) {

    var expected = [
      '.jscsrc',
      '.eslintrc',
      '.eslintignore',
      '.editorconfig',
      '.gitignore',
      '.npmignore',
      '.travis.yml',
      'package.json',
      'README.md',
      'src/index.js',
      'test/index.test.js',
    ];

    helpers.mockPrompt(this.generator, {
      moduleName: 'module',
      pipe: 'dl',
      moduleDesc: 'Your awsm module!'
    });

    this.generator.run(function () {
      assert.file(expected);
      cb();
    });
  });
});
