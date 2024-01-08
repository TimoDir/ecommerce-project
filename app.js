const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getAllProducts, getProductById, addProduct, deleteProduct} =  require('./db/querie');
const {PORT} = require('./config');
const port = PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
    res.send('Express app is working!')
});

// Product routes
app.get('/Products', getAllProducts);
app.get('/Products/:id', getProductById);
app.post('/Products/AddProduct', addProduct);
app.delete('/Products/:id/deleteProduct', deleteProduct);

app.listen(port, ()=>{
    console.log(`App is listening on port: ${port}`)
});