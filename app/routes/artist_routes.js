var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    /**Get all**/
    app.get('/artists', function (req, res) {
        db.collection('artists').find().toArray(function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        });
    });

    /**Get by ID**/
    app.get('/artists/:id', function (req, res) {
        db.collection('artists').findOne({_id: ObjectID(req.params.id)}, function (err, doc) {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            res.send(doc);
        });
    });

    /** Insert **/
    app.post('/artists', function (req, res) {
        let artist = {
            name: req.body.name,
            description: req.body.description,
            site: req.body.description
        };
        db.collection('artists').insert(artist, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(artist);
        })
    });

    /**Update by id**/
    app.put('/artists/:id', function (req, res) {
        db.collection('artists').updateOne(
            {_id: ObjectID(req.params.id)},
            {"$set": {"name": req.body.name}},
            function (err, result) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(200)
            }
        )
    });

    app.delete('/artists/:id', function (req, res) {
        db.collection('artists').deleteOne(
            {_id: ObjectID(req.params.id)},
            function (err, result) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(200)
            }
        )
    });
};