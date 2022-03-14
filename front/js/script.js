// Création des cartes - Page 'index'

// Appel de la fonction recupDataAPI
recupDataAPI();

// Fonction qui récupère les données des produits du catalogue de l'API + affichage des informations des produits
function recupDataAPI() {
    fetch("http://localhost:3000/api/products")
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            // Afficher les données sous forme de tableau
            console.table(data)

            // Carte initiale : récupération
            let card = document.querySelector("#items > a");

            // Suppression du noeud contenant la carte initiale (visuellement)
            let cardParent = document.getElementById("items");
            let cardEnfant = document.querySelector("#items > a");
            cardParent.removeChild(cardEnfant);

            // Création de la boucle : clonage des cartes + récupération des infos de chaque produit
            for (let canap of data) {
                //console.log(canap)

                // Clonage de la carte exemple
                // Enfant créé : Carte clonée 'nouvelle carte' : création des autres cartes
                let clone = card.cloneNode(true);

                // Modification des données des produits (photo de chaque produit) - attributs HTML
                clone.querySelector("article > img").setAttribute("src", canap.imageUrl);
                // Modification des données des produits (de l'attribut de la photo de chaque produit) - attributs HTML
                clone.querySelector("article > img").setAttribute("alt", canap.altTxt);

                // Modification des données des produits (nom de chaque produit) - attributs HTML
                clone.querySelector(".productName").innerText = canap.name;
                // OU clone.querySelector("article > h3").innerText = canap.name;

                // Modification des données des produits (description de chaque produit) - attributs HTML
                clone.querySelector(".productDescription").innerText = canap.description;
                // OU clone.querySelector("article > p").innerText = canap.description;

                // Modification du lien de chaque produit
                clone.setAttribute("href", "product.html?id=" + canap._id);
                console.log("product.html?id=" + canap._id)

                // Sélectionne le futur parent : items du clone ('a')
                let parent = document.getElementById("items");
                // Ajout de nouveaux enfants (cards clonnées) à la fin de la liste des enfants (déjà existants) du parent
                parent.appendChild(clone);
            }
        })
        .catch(function (err) {});
};