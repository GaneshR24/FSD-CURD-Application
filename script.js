const baseUrl = "https://62f27b4218493ca21f34beae.mockapi.io";
const getData = () => {
 requestHandler(`${baseUrl}/users`)
 .then((data) => populateGridContent(data))
 .catch((er) => errorHandler(er))
};

const errorHandler = (er) => {
    console.error(er);
};

const requestHandler = async (url, requestContent = {method: "GET"}) => {
   const response = await fetch(url, requestContent); 
   return await response.json();
};

const populateGridContent = (gridData) => {  
   document.getElementById("tbody").innerHTML = populateGridRowContent (gridData, gridData.length) ;
    };    
   
    let populateGridRowContent = (gridData, length) => {
    let gridContent = "";
    for (let index = 0; index <length; index++) {
       gridContent += ` <tr>
       <th scope="row">${gridData[index].id}</th>
       <td >${gridData[index].name}</td>
       <td><img class ="rounded shadow-lg avatar" src="${gridData[index].avatar}" /></td>
       <td><button class="btn btn-warning" onclick="editClickHandler (${gridData[index].id})" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
       <td><button class="btn btn-primary" onclick="viewClickHandler (${gridData[index].id})" data-bs-toggle="modal" data-bs-target="#viewModal">View</button></td>
       <td><button class="btn btn-danger" onclick="deleteClickHandler (${gridData[index].id}, '${gridData[index].name}')">Delete</button></td>

     </tr>`    
    }
return gridContent;
}

const editClickHandler = (id) => { 
requestHandler (`${baseUrl}/users/${id}`)
.then((data) => {
document.getElementById("editModalID").innerText = data.id;
localStorage.setItem ("id", data.id);
document.getElementById("editModalName").value = data.name;
document.getElementById("editModalImg").src = data.avatar;
})
.catch(er => errorHandler(er));  

};

const viewClickHandler = (id) => {
   requestHandler (`${baseUrl}/users/${id}`)
   .then((data) => {
   document.getElementById("modalID").innerText = data.id;
   document.getElementById("modalName").innerText = data.name;
   document.getElementById("modalImg").src = data.avatar;
  })
   .catch(er => errorHandler(er));  
  };
  

const deleteClickHandler = (id, name) => {
   if (confirm (`Are you sure you want to delete ${name} record?`)) {
      const requestContent = {method: "DELETE"};
      requestHandler(`${baseUrl}/users/${id}`, requestContent)
      .then(() => getData())
      .catch((er) => errorHandler(er))
   }
   
};

const modalSaveClickHandler = () => {
    const id = localStorage.getItem("id");
    const txt =  document.getElementById("editModalName");
    if (validateEditTextBox (txt.value)) { 
      const requestBody = {name: txt.value};
      const requestContent = {
        method: "PUT", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(requestBody),
      };
  
  requestHandler (`${baseUrl}/users/${id}`, requestContent)
     .then((data) => {
      console.log(data);
      getData();
      localStorage.clear();
     })
     .catch(er => errorHandler(er));  
    }    
};
   const validateEditTextBox = (txt) => {
      if (!txt) {
         alert("Name field is mandatory");
         return false; 
   };
   return true; 
   };

   const addClickHander = () => {
      const name = prompt("Enter your Name")
      if (validateEditTextBox(name)) {
         const requestBody = {name};
      const requestContent = {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(requestBody),
      };
  
  requestHandler (`${baseUrl}/users`, requestContent)
     .then((data) => {getData();
       })
     .catch(er => errorHandler(er));  
      };
   };

   getData();