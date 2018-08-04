let config = {};

config.port = 3012;

config.mongoDb = {};
config.mongoDb.url = "mongodb://admin:qwe123@ds157901.mlab.com:57901/vovaks";

config.jwt = {};
config.jwt.secretKey = 'mySecretKey';
config.jwt.expiresIn = '300s';

config.response = {};
config.response.header = ["Access-Control-Allow-Origin", "http://127.0.0.1:3000"];

module.exports = config;