# generator-nordnet-es-module

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> Scaffold out an ES6 node module

* `npm init` compliant
* ES6 workflow
* Structured and trustworthy README
* Tests, tdd and test coverage
* [Ready to use with travis and coveralls](#next-steps)
* [Eslint][eslint-config], [jscs][jscs-config] and [editorconfig][editorconfig] support
* Windows friendly
* ![Badges][badges]

[eslint-config]: https://github.com/nordnet/eslint-config-nordnet
[jscs-config]: https://github.com/nordnet/jscs-config-nordnet
[editorconfig]: http://editorconfig.org/

## For whom?

For us and you. Specifically suitable for:

* nordnet’s open-source and internal projects (yep, we kinda lazy)
* for other companies’s open-source projects
* for personal open-source node modules

## Extra questions:

Generator will ask several questions. Main question is do you want to create _corporate_ or your own project? Not less important question is do you want to open-source your new project or not?

> corporate? Yn

Positive answer will lead to few questions about your company (name, github, site) and answers will be reflected almost only in License section.

> open-source? Yn

Positive answer will lead to github optimised workflow, otherwize you
will be asked about [publishConfig][sinopia] url and end up with custom stash'n'jenkins flow.

![transparent-banking example](https://i.imgur.com/tqbTOVH.png)

[tdd]: https://iamstarkov.com/start-with-testing/
[badges]: https://img.shields.io/badge/with-badges-brightgreen.svg?style=flat-square
[sinopia]: https://docs.npmjs.com/misc/registry#i-don-t-want-my-package-published-in-the-official-registry-it-s-private "I don't want my package published in the official registry. It's private."

## Install

    npm install --global yo generator-nordnet-es-module

## Usage

    # create folder for your project
    mkdir transparent-banking
    cd transparent-banking

    # run generator
    yo nordnet-es-module

    # make initial commit
    git init
    git commit -am 'init commit'

## License

MIT © [Nordnet Bank AB](https://www.nordnet.se/)

[npm-url]: https://npmjs.org/package/generator-nordnet-es-module
[npm-image]: https://img.shields.io/npm/v/generator-nordnet-es-module.svg?style=flat-square

[travis-url]: https://travis-ci.org/nordnet/generator-nordnet-es-module
[travis-image]: https://img.shields.io/travis/nordnet/generator-nordnet-es-module.svg?style=flat-square

[depstat-url]: https://david-dm.org/nordnet/generator-nordnet-es-module
[depstat-image]: https://david-dm.org/nordnet/generator-nordnet-es-module.svg?style=flat-square
