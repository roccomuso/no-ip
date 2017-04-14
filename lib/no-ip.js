var axios = require('axios')
var validator = require('validator')
var net = require('net')
var util = require('util')
var EventEmitter = require('events').EventEmitter
var pckg = require('../package.json')

function NoIP (opts) {
  EventEmitter.call(this)
  opts = opts || {}
  if (!opts.domain || !opts.pass) throw Error('Missing params!')
  if (!validator.isEmail(opts.email)) throw Error('Provide a valid Email')

  this.options = {
    method: 'get',
    url: 'https://dynupdate.no-ip.com/nic/update',
    responseType: 'text',
    headers: {
      'user-agent': opts.userAgent || 'Node-NoIP/v' + pckg.version + ' ' + pckg.author
    },
    auth: {
      username: opts.email,
      password: opts.pass
    }
  }

}

util.inherits(NoIP, EventEmitter);

NoIP.prototype.update = function(ip){
  if (net.isIP(ip)){
    // TODO.
    options.headers['']


  }
  axios.get(this.options)
    .then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }).catch(function(err){
      console.log('Error:', err)
    })
}

NoIP.prototype.start = function () {

}



module.exports = NoIP

if (!module.parent){
  var noip = new NoIP({

  }'domain', 'username', 'password')
  noip.update() // Manual Update, you can also pass a custom ip address
  noip.start()
  noip.stop()
  // ?hostname=mytest-testdomain.com&myip=1.2.3.4
}
