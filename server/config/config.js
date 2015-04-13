var config = {
    development: {
        dbName: 'tom',
        dbHost: 'localhost',
        dbPort: 27017,
        serverPort: 3000,
        serverIp:'127.0.0.1'
    },
    test: {
        dbName: 'test',
        dbHost: 'localhost',
        dbPort: 27017,
        serverPort: 8888,
        serverIp:'127.0.0.1'
    },
    production: {
        dbUsername: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
        dbPassword: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
        dbHost: process.env.OPENSHIFT_MONGODB_DB_HOST,
        dbPort: process.env.OPENSHIFT_MONGODB_DB_PORT,
        dbName: process.env.OPENSHIFT_APP_NAME,
        serverPort: process.env.OPENSHIFT_NODEJS_PORT,
        serverIp: process.env.OPENSHIFT_NODEJS_IP
    },

    secret: "ajajaj",     // secret JWT keyword
    expiration: 30000000  //JWT expiration time - 30 000s
};
module.exports = config;
