const mysql = require(`mysql`);

module.exports.Connection = class Connection {
    constructor(pUser, pPass, pHost, pPort, pDatabase) {
        // Class Variables
        this.user = pUser;
        this.pass = pPass;
        this.host = pHost;
        this.port = pPort;
        this.database = pDatabase;
    
        // Configuration Object
        this.configuration = {
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database,
        }

        // Database Connection Initialisation
        this.connection = mysql.createConnection(this.configuration);
        this.connection.connect();
    }

    GetData = function() {
        // Initialisation
        let data = {}

        // Processing

        
        // Return
        return data;
    }

    SetData = function() {

    }
}