// Variable dont la valeur est le contenu de l'élément Id
let recupItems = document.getElementById(items);
// Fonction qui récupère les données des articles du catalogue de l'API
function recupDataAPI() {
    const response = fetch("http://localhost:3000/api/products")
        .then(function (response) {
            //console.table(response)
            return response.json();
        })
        .then(function (data) {
            //console.table(data)
            //let dataAPI = data.products;
        })
        .catch(function(err){   
        });
};

// Autre syntaxe
/* let recupItems = () => fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => console.log(data.products[0]))
    .catch(err => console.log("Erreur", err)) */

// Appel de la fonction
recupDataAPI();
