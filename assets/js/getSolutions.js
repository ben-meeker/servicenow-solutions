var fs = require("fs"),
path = require("path");

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
    // if (x === y) {
    //     resolve();
    // } else {
    //     reject();
    // }
});

getSolutions.
    then(function () {
        console.log('Success, You are a GEEK');
    }).
    catch(function () {
        console.log('Some error has occurred');
    });
