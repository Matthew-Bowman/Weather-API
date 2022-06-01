const app = require(`express`)();
const fetch = require(`node-fetch`);
require(`dotenv`).config();

// const database = require(`./database`);
// const connection = new database.Connection(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_PORT, process.env.DB_DATABASE);

const updater = require(`./updater`);

app.get('/london', (req, res) => {
    GetData().then(data => {
        res.status(200).send(data);
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Live on: http://localhost:${process.env.PORT}`);
});

// setInterval(updater.Update, 60000, connection);

async function GetData() {
    returnData = {
        current: {

        },
        daily: [

        ]
    };
    
    await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=51.5072&lon=0.1276&exclude=minutely,hourly&appid=${process.env.WEATHER_KEY}`)
        .then(res => res.json())
        .then(data => {



            // Prepare Data
            const currentData = {
                location: "London",
                name: data.current.weather[0].main,
                icon: data.current.weather[0].icon,
                temperature: data.current.temp,
                min_temperature: data.daily[0].temp.min,
                max_temperature: data.daily[0].temp.max,
                wind_speed: data.current.wind_speed,
                rain_probability: data.daily[0].pop,
                precipitation: data.daily[0].rain,
            }
            returnData.current = currentData;

            for (entry of data.daily) {
                // Prepare Data
                const dailyData = {
                    datetime: entry.dt,
                    icon: entry.weather[0].icon,
                    min_temperature: entry.temp.min,
                    max_temperature: entry.temp.max,
                }

                returnData.daily.push(dailyData);
            }


        });

    return returnData;
}