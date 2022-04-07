// Eviter l'erreur (dans la console) lorsque LS vide

// Récupération de l'id de chaque 'canap' dans LS
let panierLS = localStorage.getItem("panier");
//console.log(panierLS)

if (panierLS !== null) {
    afficherProduits();
} else {
    console.log("Aucun 'canap' n'est encore présent dans le panier")
};

function afficherProduits() {

    let panierJS = JSON.parse(panierLS); // objet JS

    // Compteur = sert à récupérer l'index du array 'panier' - Valeur initiale
    let compteur = 0;

    // Total du prix du panier - Valeur initiale
    let prixTotal = 0;

    // Suppression du noeud contenant la carte initiale (visuellement)
    let cardParent = document.getElementById("cart__items");
    let cardEnfant = document.querySelector("#cart__items > article");
    cardParent.removeChild(cardEnfant);

    // Boucle forEach sur 'panierJS' pour récupérer les 'canap' sélectionnés
    for (let canapsSelectPanierJS of panierJS) {
        // Appel de la fonction 'afficherProduit' ('rangée' dans une variable permet de récupérer le prix de chacun des 'canap')
        let prixProduit = afficherProduit(canapsSelectPanierJS);

        // Calcul du total du prix du panier
        prixTotal = prixTotal + prixProduit;

        // Récupère l'index à chacun des tours (de la boucle)
        compteur = compteur + 1; // idem : 'compteur++;' 
    }

    // Nb d'articles
    document.getElementById("totalQuantity").innerText = panierJS.length;
};

// Fonction qui affiche chacun des 'canap' sélectionnés, en récupérant les données dans l'API et du LS et en affichant ces informations / attribut (en paramètre) 'canap' = clone de l'attribut 'canapsSelectPanierJS' déclaré antérieurement (objet JS)
function afficherProduit(canap) {
    fetch("http://localhost:3000/api/products/" + canap.idProduit)
        .then(function (response) {
            //console.table(response)
            return response.json()
        })
        .then(function (data, canap) {
            // Clonage de la carte initiale + récupération des infos de chacun des 'canap' sélectionnés

            // Carte initiale : récupération
            let card = document.querySelector("#cart__items > article");
            console.log(card);
            
            // Clonage de la carte exemple
            let clone = card.cloneNode(true);
            console.log(clone)

            // Données récupérées dans l'API

            // Photo du 'canap' sélectionné
            clone.querySelector(".cart__item__img > img").setAttribute("src", data.imageUrl);
            //console.log(data.imageUrl)

            // Alt de la photo du 'canap' sélectionné
            clone.querySelector(".cart__item__img > img").setAttribute("alt", data.altTxt);

            // Nom du 'canap' sélectionné
            clone.querySelector(".cart__item__content__description > h2").innerText = data.name;

            // Données récupérées dans LS

            // Couleur du 'canap' sélectionné
            clone.querySelector(".cart__item__content .couleurProduitSelect").innerText = canap.couleur;

            // Quantité (initiale) du 'canap' sélectionné
            clone.querySelector(".itemQuantity").setAttribute("value", canap.qte);

            /* // Modification (de la valeur) de la quantité initiale
            clone.querySelector(".itemQuantity").addEventListener('change', function (event) {
                modifQte(index, event);
            });
 */
            /* // Supression d'un 'canap' dans le panier

            let btnSup = clone.querySelector(".deleteItem");

            btnSup.addEventListener('click', function () {
                console.log("événement joué");
                supCanap(index);
            }); */

            // Sélectionne le futur parent 
            let cardParent = document.getElementById("cart__items");
            // Ajout de nouveaux enfants (cards clonnées) à la fin de la liste des enfants (déjà existants) du parent 'cardParent'
            cardParent.appendChild(clone);

            // Calcul du prix de chacun des 'canap' sélectionnés
            return canap.qte * prixCanap;
        })
        .catch(function (err) {});
};

/* // 'index' = 'compteur'
function modifQte(index, event) {

    let panierJS = JSON.parse(panierLS); // objet JS

    // Modification (de la valeur) de la quantité initiale
    panierJS[index].qte = event.target.value; // event.target = représente l'input 'ciblé' (dans le DOM) 

    console.log("quantité initiale modifiée")

    // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
    panierLS = JSON.stringify(panierJS); // string

    // Création d'une nouvelle valeur à la clé 'panier'
    localStorage.setItem("panier", panierLS);

    console.log("panier mis à jour sur LS");

    // Pour rafraichir la page : mise à jour des infos
    document.location.reload();
}; */

/* // 'index' = 'compteur'
function supCanap(index) {

    let panierJS = JSON.parse(panierLS); // objet JS

    panierJS.splice(index, 1);

    // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
    panierLS = JSON.stringify(panierJS); // string

    // Création d'une nouvelle valeur à la clé 'panier'
    localStorage.setItem("panier", panierLS);

    alert("le canap a bien été supprimé")
}; */