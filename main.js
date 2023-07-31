import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { addProduct } from './controllers/productController.js';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DBURI)
.then(() => {
    app.listen(PORT,async () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});



app.post('/submit', addProduct);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addProduct.html'));
})
