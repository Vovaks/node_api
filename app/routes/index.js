const noteRoutes = require('./note_routes');
const artistRoutes = require('./artist_routes');
const authenticateRoutes = require('./authenticate_routes');
const phoneRoutes = require('./phone_routes');

module.exports = function(app, db) {
    authenticateRoutes(app, db);
    noteRoutes(app, db);
    artistRoutes(app, db);
    phoneRoutes(app, db);
};