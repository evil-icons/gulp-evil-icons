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
var icons       = require("evil-icons");
var PluginError = gutil.PluginError;


function buildParamsFromString(string) {
  var paramsString;
  var params = {};
  var string = string.trim().replace(/['"]/gi, '');

  string.split(' ').forEach(function(param){
    var param = param.split('=');
    var key   = param[0];
    var value = param[1];

    params[key] = value;
  });

  return params;
}


function replaceIconTags(src) {
  var match, tag, params, icon, name;
  var html = src.toString();
  var iconRegexp  = /<icon\s+([-=\w\d'"\s]+)\s*\/?>(<\/icon>)?/gi;

  while (match = iconRegexp.exec(html)) {
    tag     = match[0];
    params  = buildParamsFromString(match[1]);
    name    = params.name;

    delete params.name;

    icon = icons.icon(name, params)
    html = html.replace(tag, icon);
  }

  return html;
}


function iconize(src) {
  var html  = src.toString();
  html = html.replace(/<body.*>/, function(match) { return match + icons.sprite });
  return replaceIconTags(html);
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
