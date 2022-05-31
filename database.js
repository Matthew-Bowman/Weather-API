const mysql = require(`mysql`);

module.exports = class Connection {
    constructor(pUser, pPass, pHost, pPort, pDatabase) {
        this.user = pUser;
        this.pass = pPass;
        this.host = pHost;
        this.port = pPort;
        this.database = pDatabase;
    }
}