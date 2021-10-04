<span align="center">

# NoIP

<a href="https://www.npmjs.com/package/noip"><img title="npm version" src="https://badgen.net/npm/v/noip?icon=npm&label" ></a>
<a href="https://www.npmjs.com/package/noip"><img title="npm downloads" src="https://badgen.net/npm/dt/noip?label=downloads" ></a>

> [Noip.com](https://noip.com) Dynamic DNS update client built in Node.js. **It makes easy to remote access your connected devices**!

</span>

## Install

The easiest way to get **noip** is with npm:

    $ npm install noip --save

or having it globally installed and used as a standalone tool:

    $ npm install -g noip

## Example usage

```javascript
var NoIP = require('noip')

var noip = new NoIP({
  hostname: 'hello-world.ddns.net',
  user: 'hello@world.com',
  pass: 's3cr3tz'
})

noip.on('error', function(err){
  console.log(err)
})

noip.on('success', function(isChanged, ip){
  console.log(isChanged, ip)
})

noip.update() // Manual update, you can also provide a custom IP address

// noip.start() // start an automatic renewal every 1h by default or provide a custom ms.
// noip.stop() // stop the previously started automatic update

```

## Events

`.on('success', callback)`: The callback accepts two params `isChanged` and `ip` that gives you the current IP address your domain is currently pointing to and a boolean value indicating if an update was performed.

`.on('error', callback)`: Called when an [error](https://www.noip.com/integrate/response) occurs.

## Methods

`.update([ip])`: Send an update request. Optionally you can provide a custom IP.

`.start([ms])`: Start an automatic renewal every 1h by default or provide a custom [ms](https://github.com/zeit/ms).

`.stop()`: Stop the automatic update.

`.setOffline([boolean])`: Sets the current host to offline status. Offline settings are an Enhanced / No-IP Plus feature. You should call the `update` method after this flag have been set.

`.setIp([ip])`: Set a custom IP Address for the update requests.

## Standalone usage

If used standalone, I recommend you to start it with some process manager, like [PM2](https://github.com/Unitech/pm2).

    $ noip -h hello-world.ddns.net -u hello -p s3cr3t -s

That start automatic DNS renewal once an hour.
To see supported parameters and usage examples just type:

    $ noip --help


# Debug

This module makes use of the node [DEBUG](https://github.com/visionmedia/debug) module.
You can enable it setting the `DEBUG` env var to `noip` before the app starts:

    $ DEBUG=noip

## Author

Rocco Musolino ([@roccomuso](https://twitter.com/roccomuso))

## License

MIT
