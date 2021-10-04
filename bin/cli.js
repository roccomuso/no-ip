#!/usr/bin/env node

import { hostname as _hostname, username, password, offline, ip as _ip, start, interval } from '../lib/argv'
import NoIP from '../lib/no-ip'

const noip = new NoIP({
  hostname: _hostname,
  user: username,
  pass: password
})

noip.on('error', function (err) {
  console.log(err)
})

noip.on('success', function (isChanged, ip) {
  console.log(isChanged, ip)
})

/* CLI Flow */

noip.setOffline(offline)

if (_ip) {
  noip.setIp(_ip)
}

if (start) {
  noip.start(interval)
  console.log('No-ip client started...')
} else {
  noip.update()
}
