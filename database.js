module.exports = class Connection {
    constructor(pUser, pPass, pServer, pPort, pDatabase) {
        this.user = pUser;
        this.pass = pPass;
        this.server = pServer;
        this.port = pPort;
        this.database = pDatabase;
    }
}