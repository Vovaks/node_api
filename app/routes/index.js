const noteRoutes = require('./note_routes');
const artistRoutes = require('./artist_routes');
const authenticateRoutes = require('./authenticate_routes');

module.exports = function(app, db) {
    noteRoutes(app, db);
    artistRoutes(app, db);
    authenticateRoutes(app, db);
};