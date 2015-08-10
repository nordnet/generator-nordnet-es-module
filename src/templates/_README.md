# <%= moduleName %>

<% if (isOpensource) { %>[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]<% } %>

> <%= moduleDesc %>

## Install

    npm install --save <%= moduleName %>

## Usage

```js
import <%= camelModuleName %> from '<%= moduleName %>';

<%= camelModuleName %>('transparent banking'); // transparent banking
```

## API

### <%= camelModuleName %>(input, [options])

#### input

*Required*  
Type: `String`

Lorem ipsum.

#### options

##### foo

Type: `Boolean`  
Default: `false`

Lorem ipsum.

## License

<%= moduleLicense %> © <% if (licenseSite) { %>[<%= licenseName %>](<%= humanizedLicenseSite %>)<% } else { %><%= licenseName %><% } %>

<% if (isOpensource) { %>[npm-url]: https://npmjs.org/package/<%= moduleName %>
[npm-image]: https://img.shields.io/npm/v/<%= moduleName %>.svg?style=flat-square

[travis-url]: https://travis-ci.org/<%= github %>/<%= moduleName %>
[travis-image]: https://img.shields.io/travis/<%= github %>/<%= moduleName %>.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/<%= github %>/<%= moduleName %>
[coveralls-image]: https://img.shields.io/coveralls/<%= github %>/<%= moduleName %>.svg?style=flat-square

[depstat-url]: https://david-dm.org/<%= github %>/<%= moduleName %>
[depstat-image]: https://david-dm.org/<%= github %>/<%= moduleName %>.svg?style=flat-square<% } %>
