/* // Récupération de 'panier' du LS
let panierLS = localStorage.getItem("panier"); // String

let panierJS = JSON.parse(panierLS); // objet JS
console.log(panierJS);

for(let canapsSelect of panierJS){
    var idProducts = canapsSelect.idProduit
};


var inputFirstName = document.getElementById("firstName").value;
var inputLastName = document.getElementById("lastName").value;
var inputAddress = document.getElementById("address").value;
var inputCity = document.getElementById("city").value;
var inputEmail = document.getElementById("email").value;

let contactUser = {
    contactUserObj: {
        firstName: inputFirstName,
        lastName: inputLastName,
        address: inputAddress,
        city: inputCity,
        email: inputEmail
    },
    products: [panierJS.idProducts]
}

recupDataUser(panierJS);

function recupDataUser(panierJS) {
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactUser)
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log('Success:', data);
        })
        .catch(function (err) {
            console.error('Error:', error);
        });
}; */