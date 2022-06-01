const app = require(`express`)();

require(`dotenv`).config();

const database = require(`./database`);
const connection = new database.Connection(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_PORT, process.env.DB_DATABASE);

const updater = require(`./updater`);

app.get('/london', (req, res) => {
    connection.GetData().then(data => {
        res.status(200).send(data);
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Live on: http://localhost:${process.env.PORT}`);
});

setInterval(updater.Update, 60000, connection);