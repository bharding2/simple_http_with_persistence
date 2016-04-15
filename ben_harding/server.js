const http = require('http');
const fs = require('fs');

var slothbearServer = http.createServer((req, res) => {
  // post json data to new json file in /data (0 based index filename .json)
  if (req.method === 'POST' && req.url === '/notes') {
    fs.readdir(__dirname + '/data', (err, files) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Some error');
        return res.end();
      }
      req.pipe(fs.createWriteStream(__dirname + '/data/' + files.length + '.json'));
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('file stored as ' + files.length + '.json');
        return res.end();
      });
    });
  }
  // list number of json files in /data
  if (req.method === 'GET' && req.url === '/notes') {
    fs.readdir(__dirname + '/data', (err, files) => {
      if (err) return console.log(err);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('files stored: ' + files.join(', '));
      return res.end();
    });
  }
  // return note from the file at /data/_filename_.json
  if (req.method === 'GET' && req.url.startsWith('/notes/')) {
    return res.end();
  }
});

slothbearServer.listen(3000, () => console.log('server up on 3000'));