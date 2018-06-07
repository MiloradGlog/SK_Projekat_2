# Recursive JS
Load and run modules recursively.
With recursive.js you'll can load modules and access them by a simple object.

```sh
.
└── views                                   {
    ├── index.js                                index  : data, 
	└── sample                    TO            sample : {
	    ├── index.js             >>>>               index : data, 
	    └── test                                    test  : {
	        └── something.js                            something : data } } }
# data can be anything that the js file exports
```

### Dependencies
Recursive JS uses just one dependencie:
* [Underscore] - Underscore is a JavaScript library that provides a whole mess of useful functional programming helpers without extending any built-in objects.

### Installation
```sh
$ npm install recursivejs --save
```

### Usage
```js
var recursive = require('recursive')
,   views     = recursive.require('./views'); // views, like sample above

// Assuming that something.js exports method 'doSomething':
views.sample.test.something.doSomething('RecursiveJs');
```

[Underscore]: <https://www.npmjs.com/package/underscore>
