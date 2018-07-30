var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.post('/logup', function (req, res) {
        const user = {user: req.body.user, email: req.body.email, password: req.body.password};
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
                res.send('successfully registered')
            }
        });

    });

    app.post('/login', function (req, res) {

        const details = {"user": req.body.user, "password":req.body.password};
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('item_id', item._id);
                res.send('successfully login: ' + item);
            }
        });
    });

    app.get('/logout', function (req, res) {
        res.send('logout')
    });
};