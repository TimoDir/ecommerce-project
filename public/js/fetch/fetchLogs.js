// **** Data base manipulation **** //

export const logIn = () =>{
    const formLogUser = document.getElementById('formLogUser');
    const submitButtonUser = document.getElementById('log_user');
  
    submitButtonUser.addEventListener('click', async (e) => {
        e.preventDefault()
        const dataFormLogUser = new FormData(formLogUser);
        const data = {};
        dataFormLogUser.forEach((value, key) => data[key] = value );
        console.log(stringify(data));
        try{
            await fetch(`http://localhost:3000/Users/logIn`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            console.log(`Sucess user email: ${data.email} is login.`);
        }catch{
            console.log("Error");
        };
    });
};