import express from 'express';
import products from './Data/products.js';
const port = 8000;

const app = express();

app.get('/', (req, res) =>{
    res.send('Api is Running......')

})
app.get('/api/products', (req, res) =>{
    res.json(products);

})

app.get('/mehedi', (req, res) =>{
    res.send("Its Working");
})

app.listen(port, ()=>console.log(`Server runing on port ${port}`));