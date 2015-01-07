/*
 * gulp-evil-icons
 * https://github.com/outpunk/gulp-evil-icons
 *
 * Copyright (c) 2015 Alexander Madyankin
 * Licensed under the MIT license.
 */

"use strict";

var through     = require('through2');
var gutil       = require('gulp-util');
var cheerio     = require("cheerio");
var icons       = require("evil-icons");
var PluginError = gutil.PluginError;


function iconize(html) {
  var $ = cheerio.load(html);

  $("body").prepend(icons.sprite);

  $("icon").each(function(i, el){
    var icon      = $(el);
    var name      = icon.attr("name");

    var params    = {};
    params.size   = icon.attr("size");
    params.class  = icon.attr("class");

    var html      = icons.icon(name, params);

    $(this).replaceWith(html);
  });

  return $.html();
}


function gulpEvilIcons() {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    }

    var html = iconize(file.contents);

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
