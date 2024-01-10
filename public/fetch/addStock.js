const products = require("../productList");

products.forEach(product => {
    const addStockButton = document.getElementById(`addStock${product.id}`);
    addStockButton.addEventListener('click', async()=>{
        const qtyToAdd = document.getElementById(`InputStock${product.id}`).value;
        if (qtyToAdd < 1) {
            return;
        };
        try{
            // Update the stock value name qty
            const responseAddStock = await fetch(`http://localhost:3000/Products/addStock`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: {qty: qtyToAdd }
            });
            const resultAddStock = await responseAddStock.json();
            console.log(`Sucess: ${resultAddStock}`);
            // Create a product_detail * the quantity add previously
            for (let i = 0; i < qtyToAdd; i++) {
                const responseCreateDetail = await fetch(`http://localhost:3000/Products/${product.id}/:id/addProductDetail`, {
                    method: 'POST' 
                });
                const resultCreateDetail = await responseCreateDetail.json();
                console.log(`Sucess: ${resultCreateDetail}`);
            };
        }catch{
            console.log("Error");
        };
    });
});

