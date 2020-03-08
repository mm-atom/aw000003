const http = require('http');

const server = http.createServer((req, res) => {
	const acao = req.headers.origin;
	res.writeHead(200, {
		'Access-Control-Allow-Origin': acao,
		'Access-Control-Allow-Headers': 'content-type, x-requested-with',
		'Access-Control-Allow-Methods': 'POST,GET'
	});

	res.write('mmstudio', () => {
		res.end();
	});
});

server.listen(8889);
