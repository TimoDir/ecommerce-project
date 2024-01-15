// **** Dom manipulation **** //

// Product Details
export const productDetailsList = async (products) =>{
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
export const productList = async (products) =>{
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


export const addProduct = () =>{
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

export const addStock = (products) =>{
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

export const deleteProduct = (products) =>{
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