import yeoman from 'yeoman-generator';
import _s from 'underscore.string';
import mkdirp from 'mkdirp';
import normalizeUrl from 'normalize-url';
import humanizeUrl from 'humanize-url';

module.exports = yeoman.generators.Base.extend({
  init() {
    const cb = this.async();

    this.prompt([
      {
        name: 'isCorporate',
        message: 'corporate?',
        type: 'confirm',
        store: true,
        default: true,
      }, {
        name: 'isOpensource',
        message: 'open-source?',
        type: 'confirm',
        default: true,
      }, {
        name: 'moduleName',
        message: 'name:',
        default: this.appname.replace(/\s/g, '-'),
        filter: val => _s.slugify(val),
      }, {
        name: 'moduleDesc',
        message: 'description:',
      }, {
        name: 'moduleKeywords',
        message: 'keywords:',
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
        validate: val => (val.length > 0) ? true : 'You have to provide a username',
      }, {
        name: 'site',
        message: 'your site:',
        store: true,
        filter: val => normalizeUrl(val),
      }, {
        when: props => props.isCorporate,
        name: 'companyName',
        message: 'company name:',
        store: true,
      }, {
        when: props => props.isCorporate,
        name: 'companyGithub',
        message: 'company github:',
        store: true,
        validate: val => (val.length > 0) ? true : 'You have to provide a username',
      }, {
        when: props => props.isCorporate,
        name: 'companySite',
        message: 'company site:',
        store: true,
      }, {
        when: props => !props.isOpensource,
        name: 'repositoryUrl',
        message: 'repository url:',
        validate: val => (val.length > 0) ? true : 'You have to repositoryUrl URL',
      }, {
        when: props => !props.isOpensource,
        name: 'publishConfig',
        message: 'publishConfig:',
        store: true,
        validate: val => (val.length > 0) ? true : 'You have to provide a publishConfig URL',
      },
    ], props => {
      const name = this.user.git.name();
      const email = this.user.git.email();
      const moduleKeywords = (props.moduleKeywords || '').trim().split(',').map(i => (i || '').trim());
      const licenseName = props.isCorporate ? props.companyName : name;
      const licenseSite = props.isCorporate ? props.companySite : props.site;
      const humanizedSite = props.site && humanizeUrl(props.site);
      const humanizedCompanySite = (props.isCorporate && props.companySite) && humanizeUrl(props.companySite);
      const humanizedLicenseSite = licenseSite && humanizeUrl(licenseSite);

      const tpl = {
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

      const cpTpl = (from, to) => {
        this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), tpl);
      };

      mkdirp('src');
      mkdirp('test');

      cpTpl('_README.md',     'README.md');
      cpTpl('_indexjs',       'src/index.js');
      cpTpl('_testjs',        'test/test.js');
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

  install() {
    this.installDependencies({ bower: false });
  },
});
