# gulp-evil-icons

This plugin allows to use [Evil Icons] in your project with Gulp.

[Evil Icons]: http://evil-icons.io


<p align="center"><a href="https://evilmartians.com/">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Sponsored by Evil Martians" width="236" height="54">
</a></p>

## Usage

### Overview
If you haven't used [Gulp](http://gulpjs.com) before, be sure to check out
the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide.
Once you're familiar with it, you may install the plugin with this command:

```shell
npm install gulp-evil-icons --save-dev
```

In your project's Gulpfile you can use it like so:

```js
var evilIcons = require("gulp-evil-icons");

gulp.task('default', function () {
  return gulp.src('src/index.html')
    .pipe(evilIcons())
    .pipe(gulp.dest('build'));
});
```

### Using icons
Once you have added the plugin section to your Gulpfile, you can use
the icons in your html with the `icon` tag:

```html
<icon name="ei-archive" />
<icon name="ei-chart" size="s" />
<icon name="ei-check" size="m" />
<icon name="ei-cart" size="l" class="foo" />
```

The sprite will be added to your html automatically, and the `icon` tags will
be replaced with actual SVG code.

The only thing you have to add to your code explicitly is the stylesheet:
```html
<link rel="stylesheet" href="../node_modules/evil-icons/assets/css/evil-icons.css">
```


