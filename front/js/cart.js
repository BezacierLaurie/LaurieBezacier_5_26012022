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

    var panierJS = JSON.parse(panierLS); // objet JS

    // Boucle forEach sur 'panierJS' pour récupérer les 'id' des 'canap' sélectionnés
    for (let canapsSelectPanierJS of panierJS) {

        /* let idCanapSelect = canapsSelectPanierJS.idProduit;
        console.log(idCanapSelect) */

        // Appel de la fonction 'recupDataAPI'
        recupDataAPI_LS(canapsSelectPanierJS);
    }

    // Carte initiale : récupération
    let card = document.querySelector("#cart__items > article");

    // Suppression du noeud contenant la carte initiale (visuellement)
    let cardParent = document.getElementById("cart__items");
    let cardEnfant = document.querySelector("#cart__items > article");
    cardParent.removeChild(cardEnfant);

    // Fonction qui récupère les données des produits du catalogue de l'API et du LS + affichage des informations des produits / attribut 'canap' = clone de l'attribut 'SelectPanierJS' (objet JS)
    function recupDataAPI_LS(canap) {
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

                // Prix du 'canap' sélectionné
                let prixCanap = data.price*canap.qte;
                clone.querySelector(".cart__item__content .prixProduitSelect").innerText = prixCanap + " €";

                // Données récupérées dans LS

                // Couleur du 'canap' sélectionné
                clone.querySelector(".cart__item__content .couleurProduitSelect").innerText = canap.couleur;



                // Quantité (initiale) du 'canap' sélectionné
                clone.querySelector(".cart__item__content .cart__item__content__settings__quantity > input").setAttribute("value", canap.qte);

                // Modification (de la valeur) de la quantité initiale
                clone.querySelector(".cart__item__content .cart__item__content__settings__quantity > input").addEventListener('change', function (canap) {
                    //console.log("change : OK !")

                    // Pour connaitre l'index de l'objet 'canap' (dont on souhaite modifier la 'qte') dans le array 'panier'
                    const indexProduit = (item) => (item.idProduit == canap.idProduit) && (item.couleur == canap.couleur); // méthode 'item' : true (si 'idProduit' du 'panier(LS)' est identique à celui de l'objet JS ''canap'' (de panier(JS))) ou false (si différent)

                    let index = panierJS.findIndex(indexProduit); // méthode 'findIndex' : '-1' s'il n'existe pas , sinon renvoie son 'index'
                    console.log(index)

                    if (index == -1) // Si l'index de l'objet 'canap' n'est pas présent dans le array 'panier'
                    {
                        // Alors modifier la quantité initiale
                        // Conversion des 'qte' ('string') en 'qte' (nb) pour pouvoir réaliser l'addition des 'qte'
                        let qteTotale = parseInt(panierJS[index].qte) + parseInt(canap.qte);
                        console.log(qteTotale)

                        // Modification (de la valeur) de la quantité initiale
                        panierJS[index].qte = qteTotale;

                        console.log("quantité initiale modifiée")

                        // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
                        panierLS = JSON.stringify(panierJS); // string

                        // Création d'une nouvelle valeur à la clé 'panier'
                        localStorage.setItem("panier", panierLS);

                        console.log("panier mis à jour sur LS")
                    }
                });

                // Ajout de nouveaux enfants (cards clonnées) à la fin de la liste des enfants (déjà existants) du parent 'cardParent'
                cardParent.appendChild(clone);
            })
            .catch(function (err) {});
    };

    // Supression d'un 'canap' dans le panier

    let btnSup = document.querySelector(".cart__item__content__settings__delete .deleteItem");

    for (let canap of panierJS) {

        btnSup.addEventListener('click', supCanap(canap));
        console.log('btnSup fonctionne')
    }

    function supCanap(canap) {

        // Pour connaitre l'index de l'objet 'canap' (à supprimer) dans le array 'panier'
        const indexProduit = (item) => (item.idProduit == canap.idProduit) && (item.couleur == canap.couleur); // méthode 'item' : true (si 'idProduit' du 'panier(LS)' est identique à celui de l'objet JS 'produit' (de panier(JS))) ou false (si différent)
        let index = panierJS.findIndex(indexProduit); // méthode 'findIndex' : '-1' s'il n'existe pas , sinon renvoie son 'index'
        console.log(index)

        if (index !== -1) {
            panierJS.splice(index, 1);
            // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
            panierLS = JSON.stringify(panierJS); // string

            // Création d'une nouvelle valeur à la clé 'panier'
            localStorage.setItem("panier", panierLS);

            alert("le canap a bien été supprimé")
        }
    };

    // Prix total 
     
    // Nb d'articles

};