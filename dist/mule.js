"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Mule = /** @class */ (function () {
    function Mule(config) {
        fs.readdir(config.mulepath, function (err, files) {
            var txtFiles = files.filter(function (el) { return /\.txt$/.test(el); });
            txtFiles.forEach(function (file) {
                fs.readFileSync(path.join(config.mulepath, file), "utf-8")
                    .split(/\r?\n/)
                    .forEach(function (line) {
                    JSON.parse(line);
                });
            });
        });
    }
    return Mule;
}());
exports.Mule = Mule;
