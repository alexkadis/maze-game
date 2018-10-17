"use strict";
var fs_1 = require("fs");
var path_1 = require("path");
var es6_promise_1 = require("es6-promise");
var log = function (err) { return console.log(err); };
var isFile = function (f) { return fs_1.statSync(f).isFile(); };
var write = function (fName, str) { return new es6_promise_1.Promise(function (res, rej) {
    fs_1.writeFile(path_1.resolve(fName), str, function (err) {
        if (err)
            return rej(err);
        return res(str);
    });
}); };
var readFolder = function (folder) { return new es6_promise_1.Promise(function (res, rej) {
    fs_1.readdir(path_1.resolve(folder), function (err, files) {
        if (err)
            rej(err);
        var fileList = files.map(function (f) { return path_1.join(folder, f); });
        res(fileList.filter(isFile));
    });
}); };
var read = function (fName) { return new es6_promise_1.Promise(function (res, rej) {
    fs_1.readFile(path_1.resolve(fName), function (err, str) {
        if (err)
            rej(err);
        var newText = str.toString().replace(/^(\s+)(protected|private)/gim, '$1 public ');
        newText = newText.toString().replace(/^class /g, 'export class ');
        res(newText);
    });
}); };
var concat = function (files) { return new es6_promise_1.Promise(function (res, rej) {
    return es6_promise_1.Promise.all(files.map(read))
        .then(function (src) { return res(src.join('\n')); })["catch"](rej);
}); };
module.exports = function (folder, outFile) { return new es6_promise_1.Promise(function (res, rej) {
    var concatenated;
    if (typeof folder === 'string') {
        concatenated = readFolder(folder)
            .then(concat);
    }
    else {
        concatenated = concat(folder);
    }
    if (outFile) {
        concatenated.then(function (out) { return write(outFile, out)
            .then(res)["catch"](rej); })["catch"](rej);
    }
    else {
        concatenated.then(res)["catch"](rej);
    }
}); };
