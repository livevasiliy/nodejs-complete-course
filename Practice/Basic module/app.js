const http = require('http');

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Home page</title></head><body><h1>Welcome !</h1><form action="/create-user" method="POST"><input name="username" type="text"></input><button type="submit">Send</button></form></body></html>');
    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Users</title></head><body><ul><li>User 1</li><li>User 2</li></ul></body></html>')
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    })
  }
});

server.listen(3000);