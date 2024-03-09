const https = require('http');

https.get('http://localhost:8080', res => {
  let data = '';
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data+=chunk;
  });

  res.on('end', () => {
		console.log(data);
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
