import {
    addProduct, 
    productList, 
    deleteProduct, 
    addStock, 
    productDetailsList
}  from "./fetch/fetchProduct";

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
    fetch("http://localhost:3000/ProductDetails").then(response => response.json())
    .then((productDetails)=>{
        productDetailsList(productDetails);
    });
} catch (error) {
    console.log(error);
};