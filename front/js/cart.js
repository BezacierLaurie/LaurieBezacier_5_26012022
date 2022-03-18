// Eviter l'erreur (dans la console) lorsque LS vide
if (panierLS !== null) {
    afficherProduits();
}

function afficherProduits() {

    // Création des cartes - Page 'cart'

    // Récupération de l'id de chaque produit dans LS
    let panierLS = localStorage.getItem("panier");
    //console.log(panierLS)

    var panierJS = JSON.parse(panierLS); // objet JS

    // Boucle forEach sur 'panierJS' pour récupérer les 'id' des canaps sélectionnés
    for (let canapsSelectPanierJS of panierJS) {

        let idCanapSelect = canapsSelectPanierJS.idProduit;
        console.log(idCanapSelect)

        // Appel de la fonction 'recupDataAPI'
        recupDataAPI_LS(canapsSelectPanierJS);
        console.log(canapsSelectPanierJS)

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
                // Afficher les données sous forme de tableau
                //console.table(data)

                // Clonage des cartes + récupération des infos de chaque canap sélectionné

                // Clonage de la carte exemple
                let clone = card.cloneNode(true);
                //console.log(clone)

                // Données récupérées dans l'API
                // Photo du produit sélectionné
                clone.querySelector(".cart__item__img > img").setAttribute("src", data.imageUrl);
                //console.log(data.imageUrl)

                // Alt de la photo du produit sélectionné
                clone.querySelector(".cart__item__img > img").setAttribute("alt", data.altTxt);

                // Nom du produit sélectionné
                clone.querySelector(".cart__item__content__description > h2").innerText = data.name;

                // Prix du produit sélectionné
                clone.querySelector(".cart__item__content .prixProduitSelect").innerText = data.price;

                // Données récupérées dans LS
                // Couleur du produit sélectionné
                clone.querySelector(".cart__item__content .couleurProduitSelect").innerText = canap.couleur;

                // Quantité du produit sélectionné
                clone.querySelector(".cart__item__content__settings__quantity > input").value = canap.qteTotale;

                // Sélectionne le futur parent : cart__items du clone ('article')
                //let cardParent = document.getElementById("cart__items");
                // Ajout de nouveaux enfants (cards clonnées) à la fin de la liste des enfants (déjà existants) du parent
                cardParent.appendChild(clone);
            })
            .catch(function (err) {});
    };

}