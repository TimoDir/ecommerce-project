const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const app = express();
const {SERVER} = require('./config');
const PORT = SERVER.PORT;
const {verifyJWT} = require('./middlewares/verifyJWT');

app.use((req, res, next)=>{
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

app.get('/home', (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.get('/login', (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "html", "logIn.html"));
});

app.get('/shop', verifyJWT, (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "html", "shop.html"));
});

app.get('/signup', (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "html", "signup.html"));
});

app.get('/tools', /*verifyJWT,*/ (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "html", "tools.html"));
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

// Cart Router
const CartRouter = require('./server/routes/CartRoute');
app.use('/Cart', CartRouter);

app.listen(PORT, ()=>{
    console.log(`App is listening on port: ${PORT}`)
});