const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const config = require('config');

// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 Error processing:
 - The error handler must be the last one added with app.use.
 - The error handler accepts the next call. It can be used to combine multiple error handlers.
 */
app.use((err, request, response, next) => {
    console.log(err);// errors logs in console.log
    response.status(500).send("Something broke!");
});

app.get('/', function (req, res) {
    res.send('Hello API');
});

MongoClient.connect(config.mongoDb.url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    let database = client.db('vovaks');

    require('./app/routes')(app, database); //initialize routes

    app.listen(config.port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${config.port}`)
    });
});
