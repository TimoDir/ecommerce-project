const productList = document.getElementById("ProductList");

const Products = [];

const getProducts = async () =>{
    try{
        fetch("http://localhost:3000/Products").then(response => response.json())
        .then((products)=>{
            products.forEach(product =>{
                Products.push(product);
                // creation of a list 
                const productContainer = document.createElement('tr');
                productContainer.setAttribute("id", `${product.id}${product.name}`);
                productContainer.innerHTML =`
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.color}</td>
                <td>${product.qty}</td>
                <td>
                    <button id="addStock${product.id}">Add stock:</button><input id="InputStock${product.id}" type="number">
                    <button id="deleteProduct${product.id}">delete</button>
                </td>`;
                productList.appendChild(productContainer);
            });
        });
    }catch{
        console.log('something went wrong');
    };    
};

getProducts();

module.exports = {
    products: Products,
}