const config = require('config');
const mongoose = require('mongoose');

const cfg = config.CONNECTIONS.MONGO;
const connectionString = cfg.HOST.includes('local')
    ? `mongodb://${cfg.HOST}/${cfg.DATABASE}`
    : `mongodb://${cf.USER}:${cfg.PASSWORD}@${server}:${cfg.PORT}/${cfg.DATABASE}`;

const dbConnectionOptions = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};
mongoose.connect(connectionString, dbConnectionOptions);

mongoose.Promise = global.Promise;

module.exports = mongoose;


module.exports.checkConnection = (callback) => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection failed'));
    db.once('open', _ => {
        callback();
        // console.log('Database connected:', db.name)
    });
    //or call function
    // mongoose.connect(connectionString, dbConnectionOptions, (err, client) => {
    //     if (err) throw console.log(err);
    //     console.log(`Connected MongoDB: ${client.connection.db.databaseName}`);
    // });
}