const mysql = require(`mysql`);

module.exports.Connection = class Connection {
    constructor(pUser, pPass, pHost, pPort, pDatabase) {
        this.user = pUser;
        this.pass = pPass;
        this.host = pHost;
        this.port = pPort;
        this.database = pDatabase;
    
        this.configuration = {
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
        }
    }
}