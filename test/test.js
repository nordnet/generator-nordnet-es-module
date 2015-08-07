import path from 'path';
import { test as helpers } from 'yeoman-generator';
import { equal, doesNotThrow } from 'assert';
import assert from 'yeoman-assert';
import { git as user } from 'yeoman-generator/lib/actions/user';
import fs from 'fs-extra';

describe('generator', () => {
  let _this;
  beforeEach(function beforeEachHook(done) {
    _this = this;
    helpers.testDirectory(path.join(__dirname, 'temp'), err => {
      if (err) {
        done(err);
        return;
      }

      _this.generator = helpers.createGenerator('nordnet-es-module:app', ['../../app'], null, { skipInstall: true });
      done();
    });
  });

  it('generates expected files', done => {
    helpers.mockPrompt(_this.generator, {
      moduleName: 'module',
      moduleDesc: 'Your awsm module!',
    });

    _this.generator.run(() => {
      assert.file(['.jscsrc', '.eslintrc', '.eslintignore', '.editorconfig', '.gitignore', '.npmignore', '.travis.yml', '.istanbul.yml', 'package.json', 'README.md', 'src/index.js', 'test/test.js', 'test/mocha.opts']);
      done();
    });
  });

  it('README corporate true without site', done => {
    helpers.mockPrompt(_this.generator, {
      isCorporate: true,
      moduleName: 'module',
      companyName: 'Unicorn inc',
    });

    _this.generator.run(() => {
      assert.fileContent('README.md', /Unicorn inc/);
      done();
    });
  });

  it('README corporate true with site', done => {
    helpers.mockPrompt(_this.generator, {
      isCorporate: true,
      moduleName: 'module',
      companyName: 'Unicorn inc',
      companySite: 'Unicorn.inc',
    });

    _this.generator.run(() => {
      assert.fileContent('README.md', /Unicorn inc/);
      assert.fileContent('README.md', /Unicorn.inc/);
      done();
    });
  });

  it.only('README corporate false without site', done => {
    helpers.mockPrompt(_this.generator, {
      isCorporate: false,
      moduleName: 'module',
    });
    _this.generator.run(() => {
      assert.fileContent('README.md', user.name());
      done();
    });
  });

  it('README corporate false with site', done => {
    helpers.mockPrompt(_this.generator, {
      isCorporate: false,
      moduleName: 'module',
      site: 'asd',
    });

    _this.generator.run(() => {
      assert.fileContent('README.md', user.name());
      done();
    });
  });

  it('README opensource true', done => {
    helpers.mockPrompt(_this.generator, {
      isOpensource: true,
      moduleName: 'module',
    });

    _this.generator.run(() => {
      assert.fileContent('README.md', /NPM version/);
      assert.fileContent('README.md', /npm-image/);
      done();
    });
  });

  it('README opensource false', done => {
    helpers.mockPrompt(_this.generator, {
      isOpensource: false,
      moduleName: 'module',
    });

    _this.generator.run(() => {
      assert.noFileContent('README.md', /NPM version/);
      assert.noFileContent('README.md', /npm-image/);
      done();
    });
  });

  it('PKG validity, isCorporate true', done => {
    helpers.mockPrompt(_this.generator, { isCorporate: true });
    _this.generator.run(() => {
      fs.readJson('./package.json', err => {
        doesNotThrow(() => { if (err) throw err; }, /Unexpected token/);

        done();
      });
    });
  });

  it('PKG validity, isCorporate false', done => {
    helpers.mockPrompt(_this.generator, { isCorporate: false });
    _this.generator.run(() => {
      fs.readJson('./package.json', err => {
        doesNotThrow(() => { if (err) throw err; }, /Unexpected token/);

        done();
      });
    });
  });

  it('PKG validity, isOpensource true', done => {
    helpers.mockPrompt(_this.generator, { isOpensource: true });
    _this.generator.run(() => {
      fs.readJson('./package.json', err => {
        doesNotThrow(() => { if (err) throw err; }, /Unexpected token/);

        done();
      });
    });
  });

  it('PKG validity, isOpensource false', done => {
    helpers.mockPrompt(_this.generator, { isOpensource: false });
    _this.generator.run(() => {
      fs.readJson('./package.json', err => {
        doesNotThrow(() => { if (err) throw err; }, /Unexpected token/);

        done();
      });
    });
  });

  it('PKG crossplatform, isCorporate true', done => {
    helpers.mockPrompt(_this.generator, { isCorporate: true });
    _this.generator.run(() => {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

  it('PKG crossplatform, isCorporate false', done => {
    helpers.mockPrompt(_this.generator, { isCorporate: false });
    _this.generator.run(() => {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

  it('PKG crossplatform, isOpensource true', done => {
    helpers.mockPrompt(_this.generator, { isOpensource: true });
    _this.generator.run(() => {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

  it('PKG crossplatform, isOpensource false', done => {
    helpers.mockPrompt(_this.generator, { isOpensource: false });
    _this.generator.run(() => {
      assert.noFileContent('package.json', /&&/);
      done();
    });
  });

  it('PKG publishConfig', done => {
    helpers.mockPrompt(_this.generator, {
      isOpensource: false,
      publishConfig: 'sinopia.ftw',
    });
    _this.generator.run(() => {
      fs.readJson('./package.json', (err, res) => {
        equal(res.publishConfig.registry, 'sinopia.ftw');
        done();
      });
    });
  });

  it('PKG scripts, isOpensource true', done => {
    helpers.mockPrompt(_this.generator, { isOpensource: true });
    _this.generator.run(() => {
      fs.readJson('./package.json', (err, res) => {
        equal(Object.keys(res.scripts).length, 12);
        done();
      });
    });
  });

  it('PKG scripts, isOpensource false', done => {
    helpers.mockPrompt(_this.generator, { isOpensource: false });
    _this.generator.run(() => {
      fs.readJson('./package.json', (err, res) => {
        equal(Object.keys(res.scripts).length, 23);
        done();
      });
    });
  });

  it('PKG repository, isOpensource true', done => {
    helpers.mockPrompt(_this.generator, { github: 'nordnet' });
    _this.generator.run(() => {
      fs.readJson('./package.json', (err, res) => {
        equal(res.repository.url, 'git+https://github.com/nordnet/temp.git');
        done();
      });
    });
  });

  it('PKG repository, isOpensource false', done => {
    helpers.mockPrompt(_this.generator, { isOpensource: false, repositoryUrl: 'git+https://private.git' });
    _this.generator.run(() => {
      fs.readJson('./package.json', (err, res) => {
        equal(res.repository.url, 'git+https://private.git');
        done();
      });
    });
  });

  it('PKG bugs', done => {
    helpers.mockPrompt(_this.generator, { github: 'nordnet' });
    _this.generator.run(() => {
      fs.readJson('./package.json', (err, res) => {
        equal(res.bugs.url, 'https://github.com/nordnet/temp/issues');
        done();
      });
    });
  });

  it('PKG homepage', done => {
    helpers.mockPrompt(_this.generator, { github: 'nordnet' });
    _this.generator.run(() => {
      fs.readJson('./package.json', (err, res) => {
        equal(res.homepage, 'https://github.com/nordnet/temp#readme');
        done();
      });
    });
  });
});
