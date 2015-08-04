'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var user = require('yeoman-generator/lib/actions/user').git;

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
      '.istanbul.yml',
      'package.json',
      'README.md',
      'src/index.js',
      'test/index.test.js',
      'test/mocha.opts',
    ];

    helpers.mockPrompt(this.generator, {
      moduleName: 'module',
      moduleDesc: 'Your awsm module!'
    });

    this.generator.run(function () {
      assert.file(expected);
      cb();
    });
  });

  it('README corporate true without site', function (cb) {
    helpers.mockPrompt(this.generator, {
      isCorporate: true,
      moduleName: 'module',
      companyName: 'Unicorn inc'
    });

    this.generator.run(function () {
      assert.fileContent('README.md', /Unicorn inc/);
      cb();
    });
  });

  it('README corporate true with site', function (cb) {
    helpers.mockPrompt(this.generator, {
      isCorporate: true,
      moduleName: 'module',
      companyName: 'Unicorn inc',
      companySite: 'Unicorn.inc',
    });

    this.generator.run(function () {
      assert.fileContent('README.md', /Unicorn inc/);
      assert.fileContent('README.md', /Unicorn.inc/);
      cb();
    });
  });


  it('README corporate false without site', function (cb) {
    helpers.mockPrompt(this.generator, {
      isCorporate: false,
      moduleName: 'module',
    });

    this.generator.run(function () {
      assert.fileContent('README.md', user.name());
      cb();
    });
  });

  it('README corporate false with site', function (cb) {
    helpers.mockPrompt(this.generator, {
      isCorporate: false,
      moduleName: 'module',
      site: 'asd'
    });

    this.generator.run(function () {
      assert.fileContent('README.md', user.name());
      cb();
    });
  });

  it('README opensource true', function (cb) {
    helpers.mockPrompt(this.generator, {
      isOpensource: true,
      moduleName: 'module',
    });

    this.generator.run(function () {
      assert.fileContent('README.md', /NPM version/);
      assert.fileContent('README.md', /npm-image/);
      cb();
    });
  });

  it('README opensource false', function (cb) {
    helpers.mockPrompt(this.generator, {
      isOpensource: false,
      moduleName: 'module',
    });

    this.generator.run(function () {
      assert.noFileContent('README.md', /NPM version/);
      assert.noFileContent('README.md', /npm-image/);
      cb();
    });
  });


});
