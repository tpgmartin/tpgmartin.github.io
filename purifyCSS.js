var purify-css = require('purify-css');
var fs = require('fs');

purify-css('./_site/about/index.html', './assets/css/style.css', {output: './'})