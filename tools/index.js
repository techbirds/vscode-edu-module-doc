const rp = require('request-promise');
const jsonfile = require('jsonfile');
const private_token = 'ST8Q2wh6ZEpQg1xvzyZ7';
const groups = ['edu-front-spec', 'edu-front-vendor', 'edu-frontend'];

console.log('start...');

rp({
    url: 'https://g.hz.netease.com/api/v3/groups?statistics=true&private_token=' + private_token,
    json: true
}).then(function (res) {

    let gs = [];

    res.forEach(element => {
        if (groups.includes(element.name)) {
            gs.push(element)
        };
    });

    gs.forEach(element => {
        rp({
            url: 'https://g.hz.netease.com/api/v3/groups/' + element.id + '?private_token=' + private_token,
            json: true
        }).then(function (res) {
            jsonfile.writeFile('./source/' + res.name + '.json', res.projects, {spaces: 2, EOL: '\r\n'},function (err) {
                if(!!err) console.error(err)
                console.log('write ' + res.name + ' finished!');
            })
        })
    })
    
});