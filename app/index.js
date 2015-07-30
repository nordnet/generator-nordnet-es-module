'use strict';

var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  init: function () {
    var cb = this.async();

    this.prompt([{
      name: 'moduleName',
      message: 'name:',
      default: this.appname.replace(/\s/g, '-'),
      filter: function (val) {
        return _s.slugify(val);
      }
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
      name: 'repositoryUrl',
      message: 'repository:'
    }, {
      name: 'publishConfig',
      message: 'publishConfig:',
      store: true,
    }], function (props) {
      var tpl = {
        moduleName: props.moduleName,
        moduleDesc: props.moduleDesc,
        moduleKeywords: (props.moduleKeywords || '').trim().split(',').map(function(i) { return (i || '').trim(); }),
        moduleVersion: props.moduleVersion,
        camelModuleName: _s.camelize(props.moduleName),
        name: this.user.git.name(),
        email: this.user.git.email(),
        repositoryUrl: props.repositoryUrl,
        publishConfig: props.publishConfig,
      };

      var cpTpl = function (from, to) {
        this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), tpl);
      }.bind(this);

      mkdirp('src');
      mkdirp('test');

      cpTpl('_index.js', 'src/index.js');
      cpTpl('_index.test.js', 'test/index.test.js');
      cpTpl('_package.json', 'package.json');
      cpTpl('_README.md', 'README.md');
      cpTpl('travis.yml', '.travis.yml');
      cpTpl('editorconfig', '.editorconfig');
      cpTpl('gitignore', '.gitignore');
      cpTpl('npmignore', '.npmignore');
      cpTpl('eslintrc', '.eslintrc');
      cpTpl('eslintignore', '.eslintignore');
      cpTpl('jscsrc', '.jscsrc');

      cb();
    }.bind(this));
  },
  install: function () {
    this.installDependencies({bower: false});
  }
});
