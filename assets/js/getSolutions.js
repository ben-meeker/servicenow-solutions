import fs from 'fs'
import path from 'path'
//var fs = require("fs"),
//path = require("path");

var p = "/Users/ben/scripting/servicenow/servicenow-solutions/solutions"
fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }
    files.map(function (file) {
        return file;
    }).filter(function (file) {
        return fs.statSync(path.join(p, file)).isDirectory();
    }).forEach(function (files) {
        console.log("%s", files);
    });
});

let getSolutions = new Promise(function (resolve, reject) {

    var p = "/solutions"
    fs.readdir(p, function (err, files) {
        if (err) {
            reject();
        }
        files.map(function (file) {
            return file;
        }).filter(function (file) {
            return fs.statSync(path.join(p, file)).isDirectory();
        }).forEach(function (files) {
            console.log("%s", files);
        }).resolve();
    });
});

