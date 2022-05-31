const app = require(`express`)();
const port = 8080;

require(`dotenv`).config();

const database = require(`./database`);
const connection = new database.Connection(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_PORT, process.env.DB_DATABASE);

const updater = require(`./updater`);

app.get('/london', (req, res) => {
    res.status(200).send(connection.GetData());
});

app.listen(port, () => {
    console.log(`Live on: http://localhost:${port}`);
});