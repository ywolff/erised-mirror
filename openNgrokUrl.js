const fetch = require('node-fetch');
const open = require('open');
const clipboardy = require('clipboardy');

fetch('http://localhost:4040/api/tunnels')
  .then(res => res.json())
  .then(json => json.tunnels.find(tunnel => tunnel.proto === 'https'))
  .then(secureTunnel => {
    open(secureTunnel.public_url);
    clipboardy.writeSync(secureTunnel.public_url);
    console.log(`Mirror can be found at [ ${secureTunnel.public_url} ] (copied to clipboard)`);
  })
  .catch(err => {
    if (err.code === 'ECONNREFUSED') {
      return console.error("Looks like you're not running ngrok.")
    }
    console.error(err)
  });