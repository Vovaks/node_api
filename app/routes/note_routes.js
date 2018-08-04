var ObjectID = require('mongodb').ObjectID;

//TODO: add verifyToken for validate authenticate

module.exports = function(app, db) {

    /**Get by ID**/
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    /**Insert**/
    app.post('/notes', (req, res) => {
        let body = req.body;

        if(body.text && body.title && body.author){
            const note = {
                text: body.text,
                title: body.title,
                author: body.author,
                createDate: new Date()
            };

            db.collection('notes').insert(note, (err, result) => {
                if (err) {
                    return res.send({
                        error: true,
                        message: 'An error has occurred'
                    });
                } else {
                    return res.send({
                        message: 'Note added' + result.ops[0]
                        }
                    );
                }
            });
        }else{
            return res.send({
                error: true,
                message: 'empty inputs'
            });
        }


    });

    /**Delete by id**/
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: 'An error has occurred'
                });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    /**Update**/
    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = {
            text: req.body.body,
            title: req.body.title,
            updateDate: new Date()
        };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
};