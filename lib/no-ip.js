var axios = require('axios')
var validator = require('validator')
var net = require('net')
var util = require('util')
var debug = require('debug')('no-ip')
var EventEmitter = require('events').EventEmitter
var pckg = require('../package.json')
var ERR_DESCRIPTION = require('./errors.js')

function NoIP (opts) {
  EventEmitter.call(this)
  opts = opts || {}
  if (!opts.hostname || !opts.pass) throw Error('Missing params!')
  if (!validator.isEmail(opts.user)) throw Error('Provide a valid Email')

  this.options = {
    responseType: 'text',
    headers: {
      'user-agent': opts.userAgent || 'Node-NoIP/v' + pckg.version + ' rocco@hackerstribe.com'
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

util.inherits(NoIP, EventEmitter);

NoIP.prototype.setOffline = function (isOffline) {
  this.options.params.offline = isOffline ? 'YES' : 'NO'
}

NoIP.prototype.update = function(ip){
  var self = this
  if (net.isIP(ip)){
    // set custom IP
    this.options.params.myip = ip
  }
  axios.get('https://dynupdate.no-ip.com/nic/update', this.options)
    .then(function(response) {
      debug('Got response:', response.status, response.data)
      var data = response.data.trim()
      var f = data.match(/good|nochg/g)
      if (f){
        // Success
        self.emit('success', f[0] === 'good', data.split(' ')[1])
      } else {
        // Error
        self.emit('error', {
          status: data,
          desc: ERR_DESCRIPTION[data] || 'No description'
        })
      }
    }).catch(function(err){
      debug('HTTP error:', err)
      var data = err.response ? err.response.data.trim() : null
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
  var self = this
  this.stop()
  debug('Automatic update started')
  this.update()
  this.loop = setInterval(function(){
    self.update()
  }, interval || 3600000) // default 1h.
}

NoIP.prototype.stop = function () {
  debug('Automatic update stopped')
  clearInterval(this.loop)
}


module.exports = NoIP
