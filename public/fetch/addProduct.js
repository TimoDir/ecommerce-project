export const addProduct = () =>{
  const formAddProduct = document.getElementById('formAddPorduct');
  const submitButtonProduct = document.getElementById('submit-product');

  submitButtonProduct.addEventListener('click', async (e) => {
    e.preventDefault()
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