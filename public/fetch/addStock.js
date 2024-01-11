export const addStock = (products) =>{
    products.forEach(product => {
        const addStockButton = document.getElementById(`addStock${product.id}`);
        addStockButton.addEventListener('click', async()=>{
            const qtyToAdd = document.getElementById(`InputStock${product.id}`).value;
            // Update the stock value name qty
            try{
                await fetch(`http://localhost:3000/Products/${product.id}/addStock`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({qty: qtyToAdd })
                });
                console.log(`${qty} quantity added at product ID: ${product.id}`);
            }catch{
                console.log("Error to the add Stock route");
            };

            // Create a product_detail * the quantity add previously
            for (let i = 0; i < qtyToAdd; i++) {
                try{
                    await fetch(`http://localhost:3000/Products/${product.id}/addProductDetail`, {
                        method: 'POST' 
                    });
                    console.log(`Product_details ${i+1} added for Product ID:${product.id}`);
                }catch{
                    console.log("Error to the add Product detail");
                };
            };
        });
    });
};