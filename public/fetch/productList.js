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
            <button id="deleteProduct${product.id}">delete</button>
        </td>`;
        productListContenaire.appendChild(productContainer);
    });
};