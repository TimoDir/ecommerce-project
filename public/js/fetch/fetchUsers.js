// **** Dom manipulation **** //

// Users
export const usersList = async (users) =>{
    const usersListContenaire = document.getElementById("UsersList");
    users.forEach(user =>{
        // creation of a list 
        const userContainer = document.createElement('tr');
        userContainer.setAttribute("id", `${user.id}${user.full_name}`);
        userContainer.innerHTML =`
        <td>${user.id}</td>
        <td>${user.full_name}</td>
        <td>${user.email}</td>
        <td>${user.sold}</td>
        <td>
            <button id="addSoldToUser${user.id}">Add sold:</button><input id="InputSold${user.id}" type="number">
        </td>
        <td>
            <button id="deleteUser${user.id}">delete</button>
        </td>`;
        usersListContenaire.appendChild(userContainer);
    });
};

// **** Data base manipulation **** //


export const addUser = () =>{
    const formAddUser = document.getElementById('formAddUser');
    const submitButtonUser = document.getElementById('submit-user');
  
    submitButtonUser.addEventListener('click', async () => {
      const dataFormAddUser = new FormData(formAddUser);
      const data = {};
      dataFormAddUser.forEach((value, key) => data[key] = value );
  
      try{
        await fetch(`http://localhost:3000/Users/addUser`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        console.log(
            `Sucess User added.\n
            name: ${data.full_name}\n
            email: ${data.email}\n
            sold: ${data.sold}\n`
        );
      }catch{
        console.log("Error");
      };
    });
};

export const addSold = (users) =>{
    users.forEach(user => {
        const addSoldButton = document.getElementById(`addSoldToUser${user.id}`);
        addSoldButton.addEventListener('click', async()=>{
            const soldToAdd = document.getElementById(`InputSold${user.id}`).value;
            // Update the stock value using the 'POST' method
            try {
                await fetch(`http://localhost:3000/Users/${user.id}/addSold`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ qty: soldToAdd })
                });
                console.log(`Sold added by ${soldToAdd}Kc for user id: ${user.id}.`);
            } catch (error) {
                console.log("Error to the add Stock route", error);
            };
        });
    });
};

export const deleteUser = (users) =>{
    users.forEach(user => {
        const deleteUserButton = document.getElementById(`deleteUser${user.id}`);
        deleteUserButton.addEventListener('click', async()=>{
            try{
                await fetch(`http://localhost:3000/Users/${user.id}/deleteUser`, {
                    method: 'DELETE',
                });
                console.log(`Delete user ${user.full_name} of ID: ${user.id}`);
            }catch{
                console.log(`Error to delete the user ${user.full_name} of ID: ${user.id}`);
            };
        });
    });
};