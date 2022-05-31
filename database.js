const fetch = require(`node-fetch`);
const mysql = require(`mysql`);
const util = require('util');
const { json } = require('express/lib/response');

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

    GetData = async function () {
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

        // Add query results to returnData variable
        returnData.current = currentQueryResult;
        returnData.daily = dailyQueryResult;

        // Return
        return returnData;
    }

    SetData = function () {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=51.5072&lon=0.1276&exclude=minutely,hourly&appid=${process.env.WEATHER_KEY}`)
            .then(res => res.json())
            .then(data => {
                // Parse data into js object
                const currentData = {
                    location: "London",
                    name: data.current.weather.main,
                    temperature: data.current.temp,
                    min_temperature: data.daily[0].temp.min,
                    max_temperature: data.daily[0].temp.max,
                    wind_speed: data.current.wind_speed,
                    rain_probability: data.daily[0].pop,
                    precipitation: data.daily[0].rain,
                }

                // Prepare queries
                const currentQueryString = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
                const currentQueryInserts = ["current",
                    "name", currentData.name,
                    "temperature", currentData.temperature,
                    "min_temperature", currentData.min_temperature,
                    "max_temperature", currentData.max_temperature,
                    "wind_speed", currentData.wind_speed,
                    "rain_probability", currentData.rain_probability,
                    "precipitation", currentData.precipitation];
                const currentQuery = mysql.format(currentQueryString, currentQueryInserts);

                // Perform queries
                this.connection.query(currentQuery);
            });
    }
}