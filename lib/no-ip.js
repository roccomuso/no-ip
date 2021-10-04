import { get } from 'axios'
import { isIP } from 'net'
import { inherits } from 'util'
import ms from 'ms'
import { EventEmitter } from 'events'
import { version } from '../package.json'
import ERR_DESCRIPTION from './errors.js'
const debug = require('debug')('no-ip')

const DEFAULT_REFRESH_INTERVAL = ms('1h') // 1 hour

function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function NoIP (opts) {
  EventEmitter.call(this)
  opts = opts || {}
  if (!opts.hostname || !opts.pass) throw Error('Missing params!')
  if (!validateEmail(opts.user)) throw Error('Provide a valid Email')

  this.options = {
    responseType: 'text',
    headers: {
      'user-agent': opts.userAgent || 'Node-NoIP/v' + version + ' ' + opts.user
    },
    auth: {
      username: opts.user,
      password: opts.pass
    },
    params: {
      hostname: opts.hostname
    }
  }

  this.loop = null
}

inherits(NoIP, EventEmitter)

NoIP.prototype.setOffline = function (isOffline) {
  this.options.params.offline = isOffline ? 'YES' : 'NO'
  return this /* method chaining */
}

NoIP.prototype.setIp = function (ip) {
  if (isIP(ip)) {
    // set custom IP
    this.options.params.myip = ip
  }
  return this /* method chaining */
}

NoIP.prototype.update = function (ip) {
  const self = this
  this.setIp(ip)
  get('https://dynupdate.no-ip.com/nic/update', this.options)
    .then(function (response) {
      debug('Got response:', response.status, response.data)
      const data = response.data.trim()
      const f = data.match(/good|nochg/g)
      if (f) {
        // Success
        self.emit('success', f[0] === 'good', data.split(' ')[1])
      } else {
        // Error
        self.emit('error', {
          status: data,
          desc: ERR_DESCRIPTION[data] || 'No description'
        })
      }
    }).catch(function (err) {
      debug('HTTP error:', err)
      const data = err.response ? err.response.data.trim() : null
      if (data) {
        self.emit('error', {
          status: data,
          desc: ERR_DESCRIPTION[data] || 'No description'
        })
      } else {
        self.emit('error', err)
      }
    })
}

NoIP.prototype.start = function (interval) {
  const self = this
  this.stop()
  debug('Automatic update started')
  this.update()
  this.loop = setInterval(function () {
    self.update()
  }, interval ? ms(interval) : DEFAULT_REFRESH_INTERVAL)
}

NoIP.prototype.stop = function () {
  debug('Automatic update stopped')
  clearInterval(this.loop)
}

export default NoIP
