const cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
  originWhitelist: [],
}).listen(8080, 'localhost', () => {
  console.log('CORS Anywhere is running on http://localhost:8080');
});
