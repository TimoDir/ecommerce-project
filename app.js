const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const {PORT} = require('./config');
const port = PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Users Router
const UsersRouter = require('./server/routes/User/UsersRoute');
app.use('/Users', UsersRouter);

// Product_details route
const ProductsDetailsRouter = require('./server/routes/ProductDetails/ProductDetailsRoute');
app.use('/ProductDetails', ProductsDetailsRouter);

// Products Router
const ProductsRouter = require('./server/routes/Products/ProductsRoute');
app.use('/Products', ProductsRouter);

app.listen(port, ()=>{
    console.log(`App is listening on port: ${port}`)
});