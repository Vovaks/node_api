const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (app, db) {

    app.post('/logup', function (req, res) {
        let body = req.body;
        let user = {
            user: body.user.trim(),
            email: body.email.trim(),
            password: body.password,
            admin: false,
            isEmailVerified: false
        };

        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
                res.send({
                    result: result.ops[0],
                    message: 'successfully registered'
                });
            }
        });
    });

    app.post('/login', function (req, res) {
        const details = {
            "user": req.body.user,
            "password": req.body.password
        };

        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.status(404).send({
                    error: true,
                    message: 'Username or Password is Wrong'
                });
            } else if (item) {
                jwt.sign({item}, config.jwt.secretKey, {expiresIn: config.jwt.expiresIn}, (err, token) => {
                    // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
                    res.header (
                        "Access-Control-Allow-Headers: Origin",
                        "Content-Type",
                        "X-Auth-Token",
                        "Authorization"
                    );
                    res.send({
                        token: token
                    });
                });
            } else {
                res.send({
                    error: true,
                    message: 'User not found'
                });
            }
        });
    });

    app.get('/logout', function (req, res) {
        req.session = null;
        console.log('req.session.authenticate - logout', req.session);
        res.send('logout')
    });

    app.post('/userCheck', verifyToken, function (req, res) {
        jwt.verify(req.token, config.verify.secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                res.json({
                    message: 'User Check...',
                    authData
                });
            }
        });
    });

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
    function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }

};