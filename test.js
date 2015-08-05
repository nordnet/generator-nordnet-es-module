'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var throws = require('assert').throws;
var doesNotThrow = require('assert').doesNotThrow;
var assert = require('yeoman-assert');
var user = require('yeoman-generator/lib/actions/user').git;
var fs = require('fs-extra');

describe('generator', function() {
  beforeEach(function(done) {
    var deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        done(err);
        return;
      }

      this.generator = helpers.createGenerator('nordnet-es-module:app', deps, null, {skipInstall: true});
      done();
    }.bind(this));
  });

  it('generates expected files', function(done) {

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

    this.generator.run(function() {
      assert.file(expected);
      done();
    });
  });

  it('README corporate true without site', function(done) {
    helpers.mockPrompt(this.generator, {
      isCorporate: true,
      moduleName: 'module',
      companyName: 'Unicorn inc'
    });

    this.generator.run(function() {
      assert.fileContent('README.md', /Unicorn inc/);
      done();
    });
  });

  it('README corporate true with site', function(done) {
    helpers.mockPrompt(this.generator, {
      isCorporate: true,
      moduleName: 'module',
      companyName: 'Unicorn inc',
      companySite: 'Unicorn.inc',
    });

    this.generator.run(function() {
      assert.fileContent('README.md', /Unicorn inc/);
      assert.fileContent('README.md', /Unicorn.inc/);
      done();
    });
  });


  it('README corporate false without site', function(done) {
    helpers.mockPrompt(this.generator, {
      isCorporate: false,
      moduleName: 'module',
    });

    this.generator.run(function() {
      assert.fileContent('README.md', user.name());
      done();
    });
  });

  it('README corporate false with site', function(done) {
    helpers.mockPrompt(this.generator, {
      isCorporate: false,
      moduleName: 'module',
      site: 'asd'
    });

    this.generator.run(function() {
      assert.fileContent('README.md', user.name());
      done();
    });
  });

  it('README opensource true', function(done) {
    helpers.mockPrompt(this.generator, {
      isOpensource: true,
      moduleName: 'module',
    });

    this.generator.run(function() {
      assert.fileContent('README.md', /NPM version/);
      assert.fileContent('README.md', /npm-image/);
      done();
    });
  });

  it('README opensource false', function(done) {
    helpers.mockPrompt(this.generator, {
      isOpensource: false,
      moduleName: 'module',
    });

    this.generator.run(function() {
      assert.noFileContent('README.md', /NPM version/);
      assert.noFileContent('README.md', /npm-image/);
      done();
    });
  });

  it('PKG validity, isCorporate true', function(done) {
    helpers.mockPrompt(this.generator, { isCorporate: true });
    this.generator.run(function() {
      fs.readJson('./package.json', function(err, res) {
        doesNotThrow(function() { if (err) throw err; }, /Unexpected token/);
        done();
      });
    });
  });

  it('PKG validity, isCorporate false', function(done) {
    helpers.mockPrompt(this.generator, { isCorporate: false });
    this.generator.run(function() {
      fs.readJson('./package.json', function(err, res) {
        doesNotThrow(function() { if (err) throw err; }, /Unexpected token/);
        done();
      });
    });
  });

  it('PKG validity, isOpensource true', function(done) {
    helpers.mockPrompt(this.generator, { isOpensource: true });
    this.generator.run(function() {
      fs.readJson('./package.json', function(err, res) {
        doesNotThrow(function() { if (err) throw err; }, /Unexpected token/);
        done();
      });
    });
  });

  it('PKG validity, isOpensource false', function(done) {
    helpers.mockPrompt(this.generator, { isOpensource: false });
    this.generator.run(function() {
      fs.readJson('./package.json', function(err, res) {
        doesNotThrow(function() { if (err) throw err; }, /Unexpected token/);
        done();
      });
    });
  });

  it('PKG crossplatform, isCorporate true', function(done) {
    helpers.mockPrompt(this.generator, { isCorporate: true });
    this.generator.run(function() {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

  it('PKG crossplatform, isCorporate false', function(done) {
    helpers.mockPrompt(this.generator, { isCorporate: false });
    this.generator.run(function() {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

  it('PKG crossplatform, isOpensource true', function(done) {
    helpers.mockPrompt(this.generator, { isOpensource: true });
    this.generator.run(function() {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

  it('PKG crossplatform, isOpensource false', function(done) {
    helpers.mockPrompt(this.generator, { isOpensource: false });
    this.generator.run(function() {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

});
