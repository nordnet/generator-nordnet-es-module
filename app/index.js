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
      var name = this.user.git.name();
      var email = this.user.git.email();
      var moduleKeywords = (props.moduleKeywords || '').trim().split(',').map(function(i) { return (i || '').trim(); });
      var licenseName = props.isCorporate ? props.companyName : name;
      var licenseSite = props.isCorporate ? props.companySite : props.site;
      var humanizedSite = props.site && humanizeUrl(props.site);
      var humanizedCompanySite = (props.isCorporate && props.companySite) && humanizeUrl(props.companySite);
      var humanizedLicenseSite = licenseSite && humanizeUrl(licenseSite);

      var tpl = {
        moduleName: props.moduleName,
        camelModuleName: _s.camelize(props.moduleName),
        moduleDesc: props.moduleDesc,
        moduleKeywords: moduleKeywords,
        moduleVersion: props.moduleVersion,
        moduleLicense: props.moduleLicense,
        github: props.isCorporate ? props.companyGithub : props.github,
        licenseName: licenseName,
        licenseSite: licenseSite,
        humanizedLicenseSite: humanizedLicenseSite,
        name: name,
        email: email,
        site: props.site,
        repositoryUrl: props.repositoryUrl,
        isCorporate: props.isCorporate,
        isOpensource: props.isOpensource,
        companyName: props.companyName,
        companySite: props.companySite,
        humanizedSite: humanizedSite,
        humanizedCompanySite: humanizedCompanySite,
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
    this.installDependencies({ bower: false });
  }
});
