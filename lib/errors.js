/* Noip.com errors */
module.exports = {
  nohost: 'Hostname supplied does not exist under specified account, client exit and require user to enter new login credentials before performing an additional request.',
  badauth: 'Invalid username password combination',
  badagent: 'Client disabled. Client should exit and not perform any more updates without user intervention.',
  '!donator': 'An update request was sent including a feature that is not available to that particular user such as offline options.',
  abuse: 'Username is blocked due to abuse. Either for not following our update specifications or disabled due to violation of the No-IP terms of service. Terms of service can be viewed on noip.com. Client should stop sending updates.',
  '911': 'A fatal error on our side such as a database outage. Retry the update no sooner than 30 minutes.'
}
