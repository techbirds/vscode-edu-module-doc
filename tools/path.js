const jsonfile = require('jsonfile');
const fs = require('fs');
const spec = require('./source/edu-front-spec.json');
const vendor = require('./source/edu-front-vendor.json');
const pool = require('./source/edu-frontend.json');

let objs = [],
    outpath = '../src/path.ts'

function list() {
    var outs = [];
    spec.forEach(function (item, index) {
        outs.push({
            name: item.name,
            path: item.web_url
        })
    })

    vendor.forEach(function (item, index) {
        outs.push({
            name: item.name,
            path: item.web_url
        })
    })

    pool.forEach(function (item, index) {
        outs.push({
            name: item.name,
            path: item.web_url
        })
    })
    return outs;
}

jsonfile.writeFileSync(outpath, list());
let data = fs.readFileSync(outpath); //read existing contents into data
let fd = fs.openSync(outpath, 'w+');
let buffer = new Buffer('export default ');
fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
fs.close(fd);