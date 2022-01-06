import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.json("hello")
})

app.listen(3333, () => console.log("Servidor rodando"))