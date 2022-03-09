// Création des cartes - Page 'cart'

// Récupération de l'id de chaque produit dans LS
let panierLS = localStorage.getItem("panier");
//console.log(panierLS)

var panierJS = JSON.parse(panierLS); // objet JS

// Affichage d'un tableau contenant les valeurs des propriétés du array 'panierLS' (objet JS)
//console.table(Object.values(panierJS)) // = console.table(panierJS)

// Récupération du premier canap sélectionné (objet JS)
let canapSelectPanierJS = Object.values(panierJS[0]);
//console.table(canapSelectPanierJS)

// Récupération de l'id du premier canap sélectionné
var idCanapSelect = canapSelectPanierJS[0];
console.log(idCanapSelect)

// Appel de la fonction 'recupDataAPI'
recupDataAPI();

// Fonction qui récupère les données des produits du catalogue de l'API + affichage des informations des produits
function recupDataAPI() {
    fetch("http://localhost:3000/api/products/" + idCanapSelect)
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            // Afficher les données sous forme de tableau
            console.table(data)

            // Carte initiale : récupération
            let card = document.querySelector("#cart__items > article");

            // Suppression du noeud contenant la carte initiale (visuellement)
            let cardParent = document.getElementById("cart__items");
            let cardEnfant = card;
            cardParent.removeChild(cardEnfant);

            // Création de la boucle : clonage des cartes + récupération des infos de chaque produit sélectionné
            for (let canapSelect of data) {
                console.log(canapSelect)

                // Clonage de la carte exemple
                var clone = card.cloneNode(true);

                // Photo du produit sélectionné
                clone.querySelector(".cart__item__img > img").setAttribute("src", canapSelect.imageURL);

                // Alt de la photo du produit sélectionné
                clone.querySelector(".cart__item__img > img").setAttribute("alt", canapSelect.altTxt);

                // Nom du produit sélectionné
                clone.querySelector(".cart__item__content__description > h2").innerText = canapSelect.name;

                // Prix du produit sélectionné
                clone.querySelector(".cart__item__content .prixProduitSelect").innerText = canapSelect.price;

                // Sélection du futur parent : 'cart__items' du clone
                let parent = document.getElementById("cart__items");
                // Ajout de l'enfant à la fin de la liste des enfants du parent
                parent.appendChild(clone);
            }

            // Appel de la fonction 'recupDataLS'
            recupDataLS();
        })
        .catch(function (err) {});
};

function recupDataLS() {
    // ForEach pour récupérer la liste des données des canaps sélectionnés (objets JS) de 'panierJS' (propriétés du array)
    for (let allCanapSelect of panierJS) {
        //console.table(allCanapSelect);

        // Couleur du produit sélectionné
        clone.querySelector(".cart__item__content .couleurProduitSelect").innerText = allCanapSelect.couleur;

        // Quantité du produit sélectionné
        clone.querySelector(".cart__item__content__settings__quantity > input").value = allCanapSelect.qte;
    }
}