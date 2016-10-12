var mysql = require('mysql');
var Promise = require('bluebird');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

var connection = mysql.createConnection(
	{
		host: '127.0.0.1',
		user: 'root',
		password: 'xujiaqi252',
		database: 'board',
		multipleStatements: true
	}
);

module.exports = connection;

// var mysql = require('mysql');
// var connection = mysql.createConnection(
// 	{
// 		host: 'sqld.duapp.com',
// 		user: 'db158a9f13f845ca80fa7fd91a0b3975',
// 		password: '1e8deb6465444b549d7f1dfa33e9d24d',
// 		database: 'FqkbWsGFPKUyQhzvZGye',
// 		port: '4050',
// 		multipleStatements: true
// 	}
// );
//
// module.exports = connection;
