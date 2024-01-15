/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSold: () => (/* binding */ addSold),
/* harmony export */   addUser: () => (/* binding */ addUser),
/* harmony export */   deleteUser: () => (/* binding */ deleteUser),
/* harmony export */   usersList: () => (/* binding */ usersList)
/* harmony export */ });
// **** Dom manipulation **** //

// Users
const usersList = async (users) =>{
    const usersListContenaire = document.getElementById("UsersList");
    users.forEach(user =>{
        // creation of a list 
        const userContainer = document.createElement('tr');
        userContainer.setAttribute("id", `${user.id}${user.full_name}`);
        userContainer.innerHTML =`
        <td>${user.id}</td>
        <td>${user.full_name}</td>
        <td>${user.email}</td>
        <td>${user.sold}</td>
        <td>
            <button id="addSoldToUser${user.id}">Add sold:</button><input id="InputSold${user.id}" type="number">
        </td>
        <td>
            <button id="deleteUser${user.id}">delete</button>
        </td>`;
        usersListContenaire.appendChild(userContainer);
    });
};

// **** Data base manipulation **** //


const addUser = () =>{
    const formAddUser = document.getElementById('formAddUser');
    const submitButtonUser = document.getElementById('submit-user');
  
    submitButtonUser.addEventListener('click', async () => {
      const dataFormAddUser = new FormData(formAddUser);
      const data = {};
      dataFormAddUser.forEach((value, key) => data[key] = value );
  
      try{
        await fetch(`http://localhost:3000/Users/addUser`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        console.log(
            `Sucess User added.\n
            name: ${data.full_name}\n
            email: ${data.email}\n
            sold: ${data.sold}\n`
        );
      }catch{
        console.log("Error");
      };
    });
};

const addSold = (users) =>{
    users.forEach(user => {
        const addSoldButton = document.getElementById(`addSoldToUser${user.id}`);
        addSoldButton.addEventListener('click', async()=>{
            const soldToAdd = document.getElementById(`InputSold${user.id}`).value;
            // Update the stock value using the 'POST' method
            try {
                await fetch(`http://localhost:3000/Users/${user.id}/addSold`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ qty: soldToAdd })
                });
                console.log(`Sold added by ${soldToAdd}Kc for user id: ${user.id}.`);
            } catch (error) {
                console.log("Error to the add Stock route", error);
            };
        });
    });
};

const deleteUser = (users) =>{
    users.forEach(user => {
        const deleteUserButton = document.getElementById(`deleteUser${user.id}`);
        deleteUserButton.addEventListener('click', async()=>{
            try{
                await fetch(`http://localhost:3000/Users/${user.id}/deleteUser`, {
                    method: 'DELETE',
                });
                console.log(`Delete user ${user.full_name} of ID: ${user.id}`);
            }catch{
                console.log(`Error to delete the user ${user.full_name} of ID: ${user.id}`);
            };
        });
    });
};

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProduct: () => (/* binding */ addProduct),
/* harmony export */   addStock: () => (/* binding */ addStock),
/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),
/* harmony export */   productDetailsList: () => (/* binding */ productDetailsList),
/* harmony export */   productList: () => (/* binding */ productList)
/* harmony export */ });
// **** Dom manipulation **** //

// Product Details
const productDetailsList = async (products) =>{
    const productDetailsListContenaire = document.getElementById("ProductDetailList");
    products.forEach(product =>{
        // creation of a list 
        const productDetailsContainer = document.createElement('tr');
        productDetailsContainer.setAttribute("id", `${product.id_product}${product.id_item}`);
        productDetailsContainer.innerHTML =`
        <td>${product.id_product}</td>
        <td>${product.aviability}</td>
        <td>${product.id_item}</td>
        <td>
            <button id="deleteProductDetail${product.id_item}">delete</button>
        </td>`;
        productDetailsListContenaire.appendChild(productDetailsContainer);
    });
};

// Products
const productList = async (products) =>{
    const productListContenaire = document.getElementById("ProductList");
    products.forEach(product =>{
        // creation of a list 
        const productContainer = document.createElement('tr');
        productContainer.setAttribute("id", `${product.id}${product.name}`);
        productContainer.innerHTML =`
        <td>${product.id}</td>
        <td>${product.category}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.color}</td>
        <td>${product.qty}</td>
        <td>
            <button id="addStock${product.id}">Add stock:</button><input id="InputStock${product.id}" type="number">
        </td>
        <td>
            <button id="deleteProduct${product.id}">delete</button>
        </td>`;
        productListContenaire.appendChild(productContainer);
    });
};

// **** Data base manipulation **** //


const addProduct = () =>{
    const formAddProduct = document.getElementById('formAddPorduct');
    const submitButtonProduct = document.getElementById('submit-product');
  
    submitButtonProduct.addEventListener('click', async () => {
      const dataFormAddProduct = new FormData(formAddProduct);
      const data = {};
      dataFormAddProduct.forEach((value, key) => data[key] = value );
  
      try{
        await fetch(`http://localhost:3000/Products/addProduct`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        console.log("Sucess Product added.");
      }catch{
        console.log("Error");
      };
    });
};

const addStock = (products) =>{
    products.forEach(product => {
        const addStockButton = document.getElementById(`addStock${product.id}`);
        addStockButton.addEventListener('click', async()=>{
            const qtyToAdd = document.getElementById(`InputStock${product.id}`).value;
            // Create product details using the 'POST' method
            try {
                await fetch(`http://localhost:3000/Products/${product.id}/addStock`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ qty: qtyToAdd })
                });
                console.log("POST request triggered successfully");
            } catch (error) {
                console.log("Error to the add Stock route", error);
            };
            // Update the stock value using the 'POST' method
            try {
                await fetch(`http://localhost:3000/Products/${product.id}/addStock`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ qty: qtyToAdd })
                });
                console.log("PUT request triggered successfully");
            } catch (error) {
                console.log("Error to the add Stock route", error);
            };
        });
    });
};

const deleteProduct = (products) =>{
    products.forEach(product => {
        const addDeleteProduct = document.getElementById(`deleteProduct${product.id}`);
        addDeleteProduct.addEventListener('click', async()=>{
            try{
                await fetch(`http://localhost:3000/Products/${product.id}/deleteProduct`, {
                    method: 'DELETE',
                });
                console.log(`Delete the product and product details of ID: ${product.id}`);
            }catch{
                console.log(`Error to delete the product id: ${product.id}`);
            };
        });
    });
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch_fetchUsers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _fetch_fetchProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



// *** Users section *** //
(0,_fetch_fetchUsers__WEBPACK_IMPORTED_MODULE_0__.addUser)();

try {
    fetch("http://localhost:3000/Users").then(response => response.json())
    .then((users)=>{
        (0,_fetch_fetchUsers__WEBPACK_IMPORTED_MODULE_0__.usersList)(users);
        (0,_fetch_fetchUsers__WEBPACK_IMPORTED_MODULE_0__.addSold)(users);
        (0,_fetch_fetchUsers__WEBPACK_IMPORTED_MODULE_0__.deleteUser)(users);
    });
} catch (error) {
    console.log(error);
};

// *** Products section *** //
(0,_fetch_fetchProduct__WEBPACK_IMPORTED_MODULE_1__.addProduct)();

try {
    fetch("http://localhost:3000/Products").then(response => response.json())
    .then((products)=>{
        (0,_fetch_fetchProduct__WEBPACK_IMPORTED_MODULE_1__.productList)(products);
        (0,_fetch_fetchProduct__WEBPACK_IMPORTED_MODULE_1__.deleteProduct)(products);
        (0,_fetch_fetchProduct__WEBPACK_IMPORTED_MODULE_1__.addStock)(products);
    });
} catch (error) {
    console.log(error);
};

// *** Product_Details section *** //
try {
    fetch("http://localhost:3000/ProductDetails").then(response => response.json())
    .then((productDetails)=>{
        (0,_fetch_fetchProduct__WEBPACK_IMPORTED_MODULE_1__.productDetailsList)(productDetails);
    });
} catch (error) {
    console.log(error);
};
})();

/******/ })()
;