const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getAllProducts, getProductById, addProduct} =  require('./db/querie');
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
    res.send('Express app is working!')
});

  app.listen(port, ()=>{
    console.log(`App is listening on port: ${port}`)
});