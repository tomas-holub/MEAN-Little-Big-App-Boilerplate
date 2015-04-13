var config = {
    development: {
        dbName: 'tom',
        dbHost: 'localhost',
        dbPort: 27017,
        port: 3000,
        ip:'127.0.0.1'
    },
    test: {
        dbName: 'test',
        dbHost: 'localhost',
        dbPort: 27017,
        port: 8888,
        ip:'127.0.0.1'
    },
    // secret keyword
    secret: "ajajaj",
    // expiration in ms:
    expiration: 30000000  //30s
    //expiration: 30000  //30s
};
module.exports = config;
