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
        // Prepare Queries
        const currentQueryString = "SELECT * FROM ?? WHERE ?? = ??"
        const currentQueryInserts = ['current', 'location', 'London'];
        const currentQuery = mysql.format(currentQueryString, currentQueryInserts);

        const dailyQueryString = "SELECT * FROM ??";
        const dailyQueryInserts = ['daily'];
        const dailyQuery = mysql.format(dailyQueryString, dailyQueryInserts);

        

        // Return
        return data;
    }

    SetData = function() {

    }
}