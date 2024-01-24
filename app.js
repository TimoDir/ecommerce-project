const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const app = express();
const {PORT} = require('./config');
const port = PORT;

app.use((req, res, next)=>{
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "/public")));

app.get('/tools', (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "html", "tools.html"));
});

app.get('/signIn', (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "html", "signIn.html"));
});

// Users Router
const UsersRouter = require('./server/routes/UsersRoute');
app.use('/Users', UsersRouter);

// Product_details route
const ProductsDetailsRouter = require('./server/routes/ProductDetailsRoute');
app.use('/ProductDetails', ProductsDetailsRouter);

// Products Router
const ProductsRouter = require('./server/routes/ProductsRoute');
app.use('/Products', ProductsRouter);

app.listen(port, ()=>{
    console.log(`App is listening on port: ${port}`)
});