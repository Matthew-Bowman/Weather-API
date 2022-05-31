const app = require(`express`)();
const port = 8080;

const database = require(`./database`);
const connection = new database.Connection(`root`, ``, `localhost`, 3306, `weather_api`);

app.get('/london', (req, res) => {
    res.status(200).send({

    });
});

app.listen(port, () => {
    console.log(`Live on: http://localhost:${port}`);
});