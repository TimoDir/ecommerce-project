const productList = document.getElementById("ProductList");

const Products = [];

const getProducts = async () =>{
    try{
        fetch("http://localhost:3000/Products").then(response => response.json())
        .then((products)=>{
            products.forEach(product =>{
                Products.push(product);
                // creation of a list 
                const productContainer = document.createElement('div');
                productContainer.setAttribute("id", `${product.id}${product.name}`);
                productContainer.innerHTML =`
                <h4>Category: ${product.category}</h4>
                <ul>
                    <li>ID: ${product.id}</li>
                    <li>Name: ${product.name}</li>
                    <li>Price: ${product.price}</li>
                    <li>Color: ${product.color}</li>
                    <li>Quantity: ${product.qty}</li>
                </ul>
                <button id="addStock${product.id}">Add stock:</button><input id="addStock${product.id}" type="number">
                <button id="deleteProduct${product.id}">delete</button>
                `;
                productList.appendChild(productContainer);
            });
        });
    }catch{
        console.log('something went wrong');
    };    
};

getProducts();

module.exports = {
    Products,
}