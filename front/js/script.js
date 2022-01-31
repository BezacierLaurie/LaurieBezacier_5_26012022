// Variable dont la valeur est le contenu de l'élément Id items
let recupItems = document.getElementById(items);

// Création des cartes
// Fonction qui récupère les données des articles du catalogue de l'API
function recupDataAPI() {
    const response = fetch("http://localhost:3000/api/products")
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            console.table(data)
            // Création de la boucle qui récupère toutes les infos des produits
            for (let canap of data) {
                // Récupérer le nom du produit
                let nom = document.getElementsByClassName("productName");
                console.log(canap.name)
                // Modifier le nom du produit
                nom.innerHTML = canap.name;
                //console.log(nom)
                // Récupérer l'image
                let img = document.querySelectorAll('#items a.article > img');
                console.log(canap.imageUrl)
                // Modifier l'image 
                img.innerHTML = canap.imageUrl;
                // Récupérer l'attribut alt
                /* let alt = document.getElementById('items');
                console.log(canap.altTxt)
                // Modifier l'attribut alt
                alt.innerHTML = canap.altTxt; */
                // Récupérer la description
                let descr = document.getElementsByClassName('productDescription');
                console.log(canap.description)
                // Modifier la description
                descr.innerHTML = canap.description;
                // Récupérer les ID
                //console.log(canap._id) */
            }


        })
        .catch(function (err) {});
};

// Appel de la fonction recupDataAPI
recupDataAPI();