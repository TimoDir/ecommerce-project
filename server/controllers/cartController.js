const {pool} = require("../Model/querie");
const {
    getUserById,
    getOneProductDetailAviable,
    getProductFromId,
    getProductDetailFromIdItem,
    getCartProductDetailPrice,
} = require("../Model/querie");


const addToUserCart = async(request, response) =>{
    const id_user = request.cookies.id;
    const {id_product} = request.body;
    if(!id_user || !id_product) return response.sendStatus(401);
    const product = await getProductFromId(id_product);
    const prodDetailAviable = await getOneProductDetailAviable(id_product);
    //console.log(prodDetailAviable);
    if(!prodDetailAviable || !product)return response.sendStatus(401);
    // add item to the cart with the id of the user
    pool.query('INSERT INTO carts (id_user, id_item) VALUES ($1, $2)', [id_user, prodDetailAviable.id_item]);
    // change aviability to false
    pool.query('UPDATE product_details SET aviability = false WHERE id_item = $1', [prodDetailAviable.id_item]);
    // When a product is added to the cart we remove one from the qty of the product
    pool.query('UPDATE products SET qty = qty-1 WHERE id = $1', [prodDetailAviable.id_product]);
    response.status(201).send(`Product ${product.category} ${product.name} added to the cart for the client id: ${id_user}`);
};

const userRemoveProductCart = async(request, response) =>{
    const id_user = request.cookies.id;
    const {id_item} = request.body;
    if(!id_user || !id_item) return response.sendStatus(401);
    const productDetail = await getProductDetailFromIdItem(id_item);
    const product = await getProductFromId(productDetail.id_product);
    //console.log(prodDetailAviable);
    if(!product)return response.sendStatus(401);
    // remove item from the cart with the id of the user and the item
    pool.query('DELETE FROM carts WHERE id_user = $1 AND id_item = $2', [id_user, id_item]);
    // change aviability to true
    pool.query('UPDATE product_details SET aviability = true WHERE id_item = $1', [id_item]);
    // When a product is remove from the cart we add +1 to the qty of the product
    pool.query('UPDATE products SET qty = qty+1 WHERE id = $1', [product.id]);
    response.status(201).send(`Product ${product.category} ${product.name} removed to the cart for the client id: ${id_user}`);
};

const createOrder = async(id_user, total_price) =>{
    const orders = await pool.query('INSERT INTO orders (id_user, total_price) VALUES ($1, $2) RETURNING *', [id_user, total_price]);
    return orders.rows[0];
}

const orderCart = async(request, response) =>{
    const id_user = request.cookies.id;
    if(!id_user) return response.sendStatus(401);
    const userCart = await getCartProductDetailPrice(id_user);
    const user = await getUserById(id_user);
    // Checking if the userCart and user exist
    if(!userCart || !user) return response.sendStatus(401);
    const total_price = userCart.map(item =>  parseInt(item.price)).reduce((accumulator, price) => accumulator + price);
    // Checking if the user have enougth sold
    if(!user.sold >= total_price) return response.sendStatus(401);
    // Payement of the cart by removing the sold of the user by the total_price
    pool.query('UPDATE users SET sold = sold-$1 WHERE id = $2', [total_price, user.id]);
    // Create the orders 
    const order = await createOrder(user.id, total_price);
    // Checking if the order is created
    if(!order) return response.sendStatus(401);
    // Add the items inside the order
    for (let i = 0; i < userCart.length; i++) {
        const item = userCart[i];
        pool.query('INSERT INTO order_item (id_order, id_item) VALUES ($1, $2)', [order.id, item.id_item]);
        pool.query('DELETE FROM carts WHERE id_user = $1 AND id_item = $2', [user.id, item.id_item]);
    };
    response.status(201).send(`Payement of ${total_price}Krc and creation of the order for ${user.full_name} created in id: ${order.id}`);
};

module.exports = {
    addToUserCart,
    userRemoveProductCart,
    orderCart
}