#!/usr/bin/env node

var argv = require('../lib/argv')
var NoIP = require('../lib/no-ip')

var noip = new NoIP({
  hostname: argv.hostname,
  user: argv.username,
  pass: argv.password
})

noip.on('error', function(err){
  console.log(err)
})

noip.on('success', function(isChanged, ip){
  console.log(isChanged, ip)
})

/* CLI Flow */

noip.setOffline(argv.offline)

if (argv.ip){
  noip.setIp(argv.ip)
}

if (argv.start){
  noip.start(argv.interval)
  console.log('No-ip client started...')
} else {
  noip.update()
}
