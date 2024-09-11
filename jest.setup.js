const nock = require('nock');

// Disable all real network requests
nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

nock.emitter.on('no match', (req) => {
  console.error(`Unexpected HTTP request: ${req.method} ${req.href}`);
});
