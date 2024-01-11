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