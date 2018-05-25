/*
 * gulp-evil-icons
 * https://github.com/outpunk/gulp-evil-icons
 *
 * Copyright (c) 2015 Alexander Madyankin
 * Licensed under the MIT license.
 */

"use strict";

var through     = require('through2');
var PluginError = require('plugin-error');
var icons       = require("evil-icons");


function gulpEvilIcons() {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    }

    var html = icons.iconizeHtml(file.contents);

    if (file.isBuffer()) {
      file.contents = new Buffer(html);
    }

    if (file.isStream()) {
      this.emit("error", new PluginError("gulp-evil-icons", "Streaming not supported"));
      return cb();
    }

    this.push(file);
    cb(null, file);
  });
};


module.exports = gulpEvilIcons;
