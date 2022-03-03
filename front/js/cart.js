// Création des cartes - Page 'cart'

// Appel de la fonction recupDataAPI
recupDataAPI(panierJS);

// Récupération de l'id de chaque produit dans LS
let panierLS = localStorage.getItem("panier");
console.log(panierLS)
let panierJS = JSON.parse(panierLS); // objet JS
console.table(Object.values(panierJS)) // = console.table(panierJS)

// les produits (objet JS) contenus dans la variable 'panierJS' (= 'panierLS')
/* panierJS = {
    canap1 = {
        idProduit: '15452',
        couleur: 'Blue',
        qte: '2'
    } ,
    canap2 = {
        idProduit: '454564',
        couleur: 'Green',
        qte: '1'
    }
} */

// ForEach pour récupérer la liste des canap sélectionnés (objets JS) de 'panierJS' (propriétés du array)
for (let allCanapSelect of panierJS) {
    //console.table(allCanapSelect);

    // Chaque canap est dans un array
    let canapSelect = [allCanapSelect];
    //console.table(canapSelect)

    // Pour récupérer les id des canap sélectionnés
    let idCanapSelect = allCanapSelect.idProduit;
    console.log(idCanapSelect)
    
    // Pour récupérer la couleur des canap sélectionnés
    let couleurCanapSelect = allCanapSelect.couleur;
    console.log(couleurCanapSelect)
    
    // Récupération de la qte des canap sélectionnés
    let qteCanapSelect = allCanapSelect.qte;
    console.log(qteCanapSelect)  

}

// Fonction qui récupère les données des produits du catalogue de l'API + affichage des informations des produits
function recupDataAPI(panierJS) {
    fetch("http://localhost:3000/api/products" + idCanapSelect)
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            // Afficher les données sous forme de tableau
            console.table(data)

            // Carte initiale : récupération
            let card = document.getElementsByClassName("cart__item");

            // Suppression du noeud contenant la carte initiale (visuellement)
            let cardParent = document.getElementById("items");
            let cardEnfant = document.querySelector("#items > a");
            cardParent.removeChild(cardEnfant);

            // Création de la boucle : clonage des cartes + récupération des infos de chaque produit sélectionné
            for (let canapSelect of data) {
                //console.log(canapSelect.altTxt)

                // Clonage de la carte exemple
                // Enfant créé : Carte clonée 'nouvelle carte' : création des autres cartes
                let clone = card.cloneNode(true);

                // Modification des données des produits (photo de chaque produit) - attributs HTML
                clone.querySelector("article > img").setAttribute("src", canapSelect.imageUrl);
                // Modification des données des produits (de l'attribut de la photo de chaque produit) - attributs HTML
                clone.querySelector("article > img").setAttribute("alt", canapSelect.altTxt);

                // Modification des données des produits (nom de chaque produit) - attributs HTML
                clone.querySelector(".productName").innerText = canapSelect.name;
                // OU clone.querySelector("article > h3").innerText = canapSelect.name;

                // Modification des données des produits (description de chaque produit) - attributs HTML
                clone.querySelector(".productDescription").innerText = canapSelect.description;
                // OU clone.querySelector("article > p").innerText = canapSelect.description;

                // Modification du lien de chaque produit
                clone.setAttribute("href", "product.html?id=" + canapSelect._id);
                console.log("product.html?id=" + canapSelect._id)

                // Sélectionne le futur parent : items du clone
                let parent = document.getElementById("items");
                // Ajout de l'enfant à la fin de la liste des enfants du parent
                parent.appendChild(clone);
            }
        })
        .catch(function (err) {});
};