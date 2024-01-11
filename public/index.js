import {addProduct}  from "./fetch/addProduct";
import {productList} from "./fetch/productList";
import {deleteProduct} from "./fetch/deleteProduct";
import {addStock} from "./fetch/addStock";
import { productDetailsList } from "./fetch/productDetailsList";

addProduct();

try {
    fetch("http://localhost:3000/Products").then(response => response.json())
    .then((products)=>{
        productList(products);
        deleteProduct(products);
        addStock(products);
    });
} catch (error) {
    console.log(error);
};

try {
    fetch("http://localhost:3000/ProductDetails/getAll").then(response => response.json())
    .then((productDetails)=>{
        productDetailsList(productDetails);
    });
} catch (error) {
    console.log(error);
};