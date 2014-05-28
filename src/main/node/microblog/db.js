/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-7-1
 * Time: 下午8:56
 * To change this template use File | Settings | File Templates.
 */
var  settings = require('./settings');
var  Db = require('mongodb').Db;
var  Connection = require('mongodb').Connection;
var  Server = require('mongodb').Server;

module.exports = new  Db(settings.db, new  Server(settings.host, Connection.DEFAULT_PORT, {}));
