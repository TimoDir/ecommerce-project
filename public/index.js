import { usersList, addUser, addSold, deleteUser } from "./fetch/fetchUsers";
import { addProduct, productList, deleteProduct, addStock, productDetailsList } from "./fetch/fetchProduct";

// *** Users section *** //
addUser();

try {
    fetch("http://localhost:3000/Users").then(response => response.json())
    .then((users)=>{
        usersList(users);
        addSold(users);
        deleteUser(users);
    });
} catch (error) {
    console.log(error);
};

// *** Products section *** //
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

// *** Product_Details section *** //
try {
    fetch("http://localhost:3000/ProductDetails").then(response => response.json())
    .then((productDetails)=>{
        productDetailsList(productDetails);
    });
} catch (error) {
    console.log(error);
};