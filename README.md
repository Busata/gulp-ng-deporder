## Usage

```javascript
var deporder = require('gulp-ng-deporder');
var concat   = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src('./lib/*.js')
    .pipe(deporder())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});
```
Inspired by: https://github.com/mkleehammer/gulp-deporder/ !

This will reorder any javascript file containing an angular.module() declaration. In case a file was found containing
an angular.module("foo") before a file containing angular.module("foo", []) was found, it will sort it out.

This way, you can reuse an angular.module in several file & won't need any dependency management (browserify, requireJS...)

## TODO:

- Write tests before publishing it to npm?
- Integrate it with gulp-deporder by making the regex an option?
- Handle angular.modules declared over seperate lines, handle?
- Find the edge-cases...

## LICENSE

(MIT License)

Copyright (c) 2014 Dries De Smet <driesdesmet@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.