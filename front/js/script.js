// Création des cartes
// Fonction qui récupère les données des articles du catalogue de l'API + modification des informations des produits
function recupDataAPI() {
    const response = fetch("http://localhost:3000/api/products")
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            // Afficher les données sous forme de tableau
            console.table(data)
            // Création de la boucle qui récupère toutes les infos des produits
            for (let canap of data) {
                console.log(canap.name)
                // Récupérer le nom du produit
                let nom = document.getElementsByClassName("productName");
                // Modifier le nom du produit
                //card 1 = nouveau nom de la card 1
                nom[0].innerHTML = canap.name
                nom[1].innerHTML = canap.name
                nom[2].innerHTML = canap.name
                nom[3].innerHTML = canap.name
                nom[4].innerHTML = canap.name
                nom[5].innerHTML = canap.name
                nom[6].innerHTML = canap.name
                nom[7].innerHTML = canap.name
                console.log(nom[1])
                
                /* // Récupérer l'image
                let img = document.querySelectorAll("#items a.article > img");
                console.log(canap.imageUrl)
                // Modifier l'image 
                //img[0].innerHTML = canap.imageUrl
                //console.log(img) */
                /* // Récupérer l'attribut alt
                 let alt = document.getElementById('items');
                console.log(canap.altTxt)
                // Modifier l'attribut alt
                alt.innerHTML = canap.altTxt; */
                /* // Récupérer la description
                let descr = document.getElementsByClassName("productDescription");
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