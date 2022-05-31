const mysql = require(`mysql`);
const util = require('util');

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
        
        // node native promisify
        this.query = util.promisify(this.connection.query).bind(this.connection);
    }

    GetData = async function() {
        // Initialisation
        let returnData = {}

        // Processing
        // Prepare Queries
        const currentQueryString = "SELECT * FROM ?? WHERE ?? = ?"
        const currentQueryInserts = ['current', 'location', 'London'];
        const currentQuery = mysql.format(currentQueryString, currentQueryInserts);

        const dailyQueryString = "SELECT * FROM ??";
        const dailyQueryInserts = ['daily'];
        const dailyQuery = mysql.format(dailyQueryString, dailyQueryInserts);

        // Perform Queries
        const currentQueryResult = await this.query(currentQuery);
        const dailyQueryResult = await this.query(dailyQuery);

        // Parse Data
        let currentQueryData = {}
        let dailyQueryData = []

        // Add query results to returnData variable
        returnData.current = currentQueryData;
        returnData.daily = dailyQueryData;
        // Return
        return returnData;
    }

    SetData = function() {

    }
}