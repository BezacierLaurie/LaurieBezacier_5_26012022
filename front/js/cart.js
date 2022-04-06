// Eviter l'erreur (dans la console) lorsque LS vide

// Récupération de l'id de chaque 'canap' dans LS
let panierLS = localStorage.getItem("panier");
//console.log(panierLS)

if (panierLS !== null) {
    afficherProduits();
} else {
    console.log("Aucun 'canap' n'est encore présent dans le panier")
}

function afficherProduits() {

    // Création des cartes - Page 'cart'

    let panierJS = JSON.parse(panierLS); // objet JS

    // Compteur = sert à récupérer l'index du array 'panier'
    let compteur = 0; // Valeur initiale

    // Boucle forEach sur 'panierJS' pour récupérer les 'id' des 'canap' sélectionnés
    for (let canapsSelectPanierJS of panierJS) {
        // Appel de la fonction 'afficherProduit'
        afficherProduit(canapsSelectPanierJS, compteur);

        // Récupère l'index à chacun des tours (de la boucle)
        compteur = compteur + 1; // idem : 'compteur++;' 
    }

    // Carte initiale : récupération
    let card = document.querySelector("#cart__items > article");

    // Suppression du noeud contenant la carte initiale (visuellement)
    let cardParent = document.getElementById("cart__items");
    let cardEnfant = document.querySelector("#cart__items > article");
    cardParent.removeChild(cardEnfant);

    // Fonction qui affiche chacun des 'canap' sélectionnés, en récupérant les données dans l'API et du LS et en affichant ces informations / attribut 'canap' = clone de l'attribut 'SelectPanierJS' (objet JS)
    function afficherProduit(canap, compteur) {
        fetch("http://localhost:3000/api/products/" + canap.idProduit)
            .then(function (response) {
                //console.table(response)
                return response.json()
            })
            .then(function (data) {
                // Clonage des cartes + récupération des infos de chaque 'canap' sélectionné

                // Clonage de la carte exemple
                let clone = card.cloneNode(true);
                //console.log(clone)

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

                // Prix (initial) du 'canap' sélectionné
                let prixCanap = data.price * canap.qte;
                clone.querySelector(".cart__item__content .prixProduitSelect").innerText = prixCanap + " €";

                // Quantité (initiale) du 'canap' sélectionné
                clone.querySelector(".itemQuantity").setAttribute("value", canap.qte);

                // Modification (de la valeur) de la quantité initiale
                clone.querySelector(".itemQuantity").addEventListener('change', function (event) {
                    modifQte(compteur, event, data, canap, clone);
                });

                /* // Supression d'un 'canap' dans le panier

                let btnSup = document.querySelector(".deleteItem");

                btnSup.addEventListener('click', function (event) {
                    supCanap(index, event);
                });
 */
                // Ajout de nouveaux enfants (cards clonnées) à la fin de la liste des enfants (déjà existants) du parent 'cardParent'
                cardParent.appendChild(clone);
            })
            .catch(function (err) {});
    };

    // 'index' = 'compteur'
    function modifQte(index, event, data, canap, clone) {

        // Modification (de la valeur) de la quantité initiale
        panierJS[index].qte = event.target.value; // event.target = représente l'input 'ciblé' (dans le DOM) 

        console.log("quantité initiale modifiée")

        // Modification du prix (initial) du 'canap' sélectionné
        let prixCanap = data.price * canap.qte;
        clone.querySelector(".cart__item__content .prixProduitSelect").innerText = prixCanap + " €";

        // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
        panierLS = JSON.stringify(panierJS); // string

        // Création d'une nouvelle valeur à la clé 'panier'
        localStorage.setItem("panier", panierLS);

        console.log("panier mis à jour sur LS")
    };

    // 'index' = 'compteur'
    function supCanap(index, event) {

        event.target;
        panierJS.splice(index, 1);

        // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
        panierLS = JSON.stringify(panierJS); // string

        // Création d'une nouvelle valeur à la clé 'panier'
        localStorage.setItem("panier", panierLS);

        alert("le canap a bien été supprimé")
    };

    // Prix total 

    /* for (let prixCanapAll of panierJS){
        let prixTotal = prixCanap+
    };
    let totalPrice = document.getElementById("totalPrice"); */

    // Nb d'articles
    document.getElementById("totalQuantity").innerText=panierJS.length;
};