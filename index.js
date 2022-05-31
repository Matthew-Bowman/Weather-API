const app = require(`express`)();
const port = 8080;

app.listen(port, () => {
    console.log(`Live on: http://localhost:${port}`);
});