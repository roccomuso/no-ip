var argv = require('yargs')
  .usage('Usage: no-ip -h [hostname] -u [user] -p [password] -t [interval(ms)] -i [customIP] -s')
  .help('help')
  .alias('help', 'H')
  .option('hostname', {
        alias: 'h',
        demand: true,
        describe: 'Your hostname',
        type: 'string'
    })
  .option('username', {
        alias: 'u',
        demand: true,
        describe: 'Username for the noip.com DDNS account',
        type: 'string'
    })
  .option('password', {
        alias: 'p',
        demand: true,
        describe: 'You account password',
        type: 'string'
    })
  .implies('username', 'password')
  .implies('password', 'username')
  .option('ip', {
        alias: 'i',
        demand: false,
        describe: 'Set a custom IP Address',
        type: 'string'
    })
  .option('offline', {
        alias: 'o',
        demand: false,
        describe: 'Sets the current host to offline status.',
        type: 'boolean'
    })
  .option('interval', {
        alias: 't',
        demand: false,
        describe: 'Renewal interval, in milliseconds.',
        type: 'number'
    })
  .default('interval', 3600000) // 1h by default
  .option('start', {
        alias: 's',
        demand: false,
        describe: 'Start automatic renewal once an hour by default',
        type: 'boolean'
    })
  .example('no-ip -h hello-world.ddns.net -u hello -p s3cr3t -s', 'Start automatic DNS renewal once an hour')
  .example('no-ip -h hello-world.ddns.net -u hello -p s3cr3t', 'Send a single update request using your current IP address')
  .example('no-ip -h hello-world.ddns.net -u hello -p s3cr3t -i 173.26.2.66', 'Send a single update request using a custom IP Address')
  .example('no-ip -h hello-world.ddns.net -u hello -p s3cr3t -t 604800000 -s', 'Start automatic DNS renewal once a week')
  .epilogue('@Author: Rocco Musolino - github.com/roccomuso/no-ip - @Copyright 2017')
  .argv;

module.exports = argv;
