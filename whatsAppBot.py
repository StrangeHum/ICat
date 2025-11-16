// requirements: whatsapp-web.js, express (для QR/сессии если нужно)
const { Client } = require('whatsapp-web.js');
const fetch = require('node-fetch');
const client = new Client();
const TARGET = 'https://your-server.example.com/ingest';

client.on('message', msg => {
  const payload = {
    id: msg.id._serialized,
    from: msg.from,
    body: msg.body,
    timestamp: msg.timestamp
  };
  fetch(TARGET, {method:'POST', body: JSON.stringify(payload), headers:{'Content-Type':'application/json'}});
});

client.initialize();