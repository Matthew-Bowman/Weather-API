const app = require(`express`)();
const port = 8080;

app.get('/london', (req, res) => {
    res.status(200).send({
        
    });
});

app.listen(port, () => {
    console.log(`Live on: http://localhost:${port}`);
});