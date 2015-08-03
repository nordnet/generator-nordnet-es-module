'use strict';

var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');
var normalizeUrl = require('normalize-url');
var humanizeUrl = require('humanize-url');

module.exports = yeoman.generators.Base.extend({
  init: function () {
    var cb = this.async();

    this.prompt([{
      name: 'isCorporate',
      message: 'corporate?',
      type: 'confirm',
      store: true,
      default: true
    }, {
      name: 'isOpensource',
      message: 'open-source?',
      type: 'confirm',
      default: true
    }, {
      name: 'moduleName',
      message: 'name:',
      default: this.appname.replace(/\s/g, '-'),
      filter: function (val) { return _s.slugify(val); }
    }, {
      name: 'moduleDesc',
      message: 'description:'
    }, {
      name: 'moduleKeywords',
      message: 'keywords:'
    }, {
      name: 'moduleVersion',
      message: 'version:',
      store: true,
      default: '0.0.0',
    }, {
      name: 'moduleLicense',
      message: 'license:',
      store: true,
      default: 'MIT',
    }, {
      name: 'github',
      message: 'your github:',
      store: true,
      validate: function (val) {
        return val.length > 0 ? true : 'You have to provide a username';
      }
    }, {
      name: 'site',
      message: 'your site:',
      store: true,
      filter: function (val) { return normalizeUrl(val); }
    }, {
      when: function(props) { return props.isCorporate; },
      name: 'companyName',
      message: 'company name:',
      store: true
    }, {
      when: function(props) { return props.isCorporate; },
      name: 'companyGithub',
      message: 'company github:',
      store: true,
      validate: function (val) {
        return val.length > 0 ? true : 'You have to provide a username';
      }
    }, {
      when: function(props) { return props.isCorporate; },
      name: 'companySite',
      message: 'company site:',
      store: true
    }, {
      when: function(props) { return props.isCorporate && !props.isOpensource; },
      name: 'repositoryUrl',
      message: 'repository url:',
      validate: function (val) {
        return val.length > 0 ? true : 'You have to repositoryUrl URL';
      }
    }, {
      when: function(props) { return props.isCorporate && !props.isOpensource; },
      name: 'publishConfig',
      message: 'publishConfig:',
      store: true,
      validate: function (val) {
        return val.length > 0 ? true : 'You have to provide a publishConfig URL';
      }
    }], function (props) {
      var licenseName = props.isCorporate ? props.companyName : this.user.git.name();
      var licenseSite = props.isCorporate ? props.companySite : props.site;
      var tpl = {
        moduleName: props.moduleName,
        moduleDesc: props.moduleDesc,
        moduleKeywords: (props.moduleKeywords || '').trim().split(',').map(function(i) { return (i || '').trim(); }),
        moduleVersion: props.moduleVersion,
        moduleLicense: props.moduleLicense,
        camelModuleName: _s.camelize(props.moduleName),
        github: props.isCorporate ? props.companyGithub : props.github,
        licenseName: licenseName,
        licenseSite: licenseSite,
        humanizedLicenseSite: licenseSite && humanizeUrl(licenseSite),
        name: this.user.git.name(),
        email: this.user.git.email(),
        site: props.site,
        repositoryUrl: props.repositoryUrl,
        isCorporate: props.isCorporate,
        isOpensource: props.isOpensource,
        companyName: props.companyName,
        companySite: props.companySite,
        humanizedSite: props.site && humanizeUrl(props.site),
        humanizedCompanySite: props.isCorporate && humanizeUrl(props.companySite),
        publishConfig: props.publishConfig,
      };

      var cpTpl = function (from, to) {
        this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), tpl);
      }.bind(this);

      mkdirp('src');
      mkdirp('test');

      cpTpl('_README.md',     'README.md');
      cpTpl('_index.js',      'src/index.js');
      cpTpl('_index.test.js', 'test/index.test.js');
      cpTpl('_package.json',  'package.json');
      cpTpl('editorconfig',   '.editorconfig');

      cpTpl('travis.yml',     '.travis.yml');
      cpTpl('jscsrc',         '.jscsrc');
      cpTpl('eslintrc',       '.eslintrc');
      cpTpl('eslintignore',   '.eslintignore');

      cpTpl('gitignore',      '.gitignore');
      cpTpl('npmignore',      '.npmignore');
      cpTpl('istanbul.yml',   '.istanbul.yml');
      cpTpl('mocha.opts',     'test/mocha.opts');

      cb();
    }.bind(this));
  },
  install: function () {
    this.installDependencies({bower: false});
  }
});
