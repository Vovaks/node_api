const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let config = require('config');


let phones =
    {
        "phones": [
            {
                "id": "1",
                "categoryId": "1",
                "name": "Apple iPhone 5c",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta",
                "price": 823,
                "image": "/uploads/iphone5c-selection-hero-2013.png",
                "cpu": "1.3GHz Apple A6",
                "camera": "8mp (3264x2448)",
                "size": "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
                "weight": "132 grams (4.7 ounces) with battery",
                "display": "4.0 326 pixel density",
                "battery": "1480 mAh",
                "memory": "16GB, 32GB and RAM 1 GB"
            },
            {
                "id": "2",
                "categoryId": "1",
                "name": "Apple iPhone 6",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta",
                "price": 953,
                "image": "/uploads/51u6y9Rm8QL._SY300_.jpg",
                "cpu": "1.3GHz Apple A6",
                "camera": "8mp (3264x2448)",
                "size": "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
                "weight": "132 grams (4.7 ounces) with battery",
                "display": "4.0 326 pixel density",
                "battery": "1480 mAh",
                "memory": "16GB, 32GB and RAM 1 GB"
            },
            {
                "id": "3",
                "categoryId": "4",
                "name": "Lenovo A6000",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta",
                "price": 764,
                "image": "/uploads/_35%20(1).JPG",
                "cpu": "1.3GHz Apple A6",
                "camera": "8mp (3264x2448)",
                "size": "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
                "weight": "132 grams (4.7 ounces) with battery",
                "display": "4.0 326 pixel density",
                "battery": "1480 mAh",
                "memory": "16GB, 32GB and RAM 1 GB"
            },
            {
                "id": "4",
                "categoryId": "5",
                "name": "Nokia Lumia 1520",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta",
                "price": 674,
                "image": "/uploads/Lumia1520-Front-Back-png.png",
                "cpu": "1.3GHz Apple A6",
                "camera": "8mp (3264x2448)",
                "size": "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
                "weight": "132 grams (4.7 ounces) with battery",
                "display": "4.0 326 pixel density",
                "battery": "1480 mAh",
                "memory": "16GB, 32GB and RAM 1 GB"
            },
            {
                "id": "5",
                "categoryId": "3",
                "name": "HTC One",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta",
                "price": 674,
                "image": "/uploads/htc-one-m7-802w-dual-sim-silver.jpg",
                "cpu": "1.3GHz Apple A6",
                "camera": "8mp (3264x2448)",
                "size": "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
                "weight": "132 grams (4.7 ounces) with battery",
                "display": "4.0 326 pixel density",
                "battery": "1480 mAh",
                "memory": "16GB, 32GB and RAM 1 GB"
            },
            {
                "id": "6",
                "categoryId": "2",
                "name": "Samsung Galaxy S6",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta",
                "price": 674,
                "image": "/uploads/Agnes_Case_for_Samsung_Galaxy_S6_(1)__92643_thumb.jpg",
                "cpu": "1.3GHz Apple A6",
                "camera": "8mp (3264x2448)",
                "size": "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
                "weight": "132 grams (4.7 ounces) with battery",
                "display": "4.0 326 pixel density",
                "battery": "1480 mAh",
                "memory": "16GB, 32GB and RAM 1 GB"
            }
        ]
    };

app.get('/', function (req, res) {
    res.send('Hello API');
});

app.get('/phones', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(phones);
});

app.get('/phone/:id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let phone = phones.phones.find(function (phone) {
        // return phone.id === Number(req.params.id); //if id Number
        return phone.id === req.params.id;//
    });
    res.send(phone);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 Error processing:
 - The error handler must be the last one added with app.use.
 - The error handler accepts the next call. It can be used to combine multiple error handlers.
 */
app.use((err, request, response, next) => {
    // логирование ошибки, пока просто console.log
    console.log(err);
    response.status(500).send("Something broke!");
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

