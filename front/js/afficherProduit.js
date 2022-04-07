// Fonction qui affiche chacun des 'canap' sélectionnés, en récupérant les données dans l'API et du LS et en affichant ces informations / attribut 'canap' = clone de l'attribut 'SelectPanierJS' (objet JS)
function afficherProduit(canap, compteur) {
    fetch("http://localhost:3000/api/products/" + canap.idProduit)
        .then(function (response) {
            //console.table(response)
            return response.json()
        })
        .then(function (data, canap) {
            // Clonage des cartes + récupération des infos de chacun des 'canap' sélectionnés

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

            // Modification (de la valeur) de la quantité initiale
            clone.querySelector(".itemQuantity").addEventListener('change', function (event) {
                modifQte(index, event);
            });

            // Supression d'un 'canap' dans le panier

            let btnSup = clone.querySelector(".deleteItem");

            btnSup.addEventListener('click', function () {
                console.log("événement joué");
                supCanap(compteur);
            });

            // Sélectionne le futur parent 
            let cardParent = document.getElementById("cart__items");
            // Ajout de nouveaux enfants (cards clonnées) à la fin de la liste des enfants (déjà existants) du parent 'cardParent'
            cardParent.appendChild(clone);

            // Calcul du prix de chacun des 'canap' sélectionnés
            return canap.qte * prixCanap;
        })
        .catch(function (err) {});
};