export const deleteProduct = (products) =>{
    products.forEach(product => {
        const addDeleteProduct = document.getElementById(`deleteProduct${product.id}`);
        addDeleteProduct.addEventListener('click', async()=>{
            // Delete all the Product_details of a Product
            try{
                await fetch(`http://localhost:3000/Products/${product.id}/deleteAllProductDetailByProduct`, {
                    method: 'DELETE' 
                });
                console.log(`Delete all the product details of the product id:${product.id}`);
            }catch{
                console.log(`Error to delete all the product details of product id:${product.id} `);
            };

            // Delete the Product
            try{
                await fetch(`http://localhost:3000/Products/${product.id}/deleteProduct`, {
                    method: 'DELETE',
                });
                console.log(`Delete the product ID: ${product.id}`);
            }catch{
                console.log(`Error to delete the product id: ${product.id}`);
            };
        });
    });
};