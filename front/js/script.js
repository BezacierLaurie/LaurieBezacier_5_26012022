// Création des cartes - Page 'index'
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

            // Carte initiale : récupération
            let card = document.querySelector("#items > a");

            // Suppression du noeud contenant la carte initiale (visuellement)
            let cardParent = document.getElementById("items");
            let cardEnfant = document.querySelector("#items > a");
            cardParent.removeChild(cardEnfant);

            // Création de la boucle : clonage des cartes + récupération des infos de chaque produit
            for (let canap of data) {
                //console.log(canap.altTxt)

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

                // Sélectionne le futur parent : items du clone
                let parent = document.getElementById("items");
                // Ajout de l'enfant à la fin de la liste des enfants du parent
                parent.appendChild(clone);

                // Modification du lien de chaque produit
                clone.setAttribute("href", idCards);
                // MDN
                /* let params = (new URL("./product.html?id=".canap._id)).searchParams;
                let idCards = params.get(canap._id); */
                // WTL X
                /* let url = "./product.html?id=" + canap._id;
                let newUrl = new URL(url);
                let idCards = newUrl.searchParams.get("canap_id"); */
                console.log("./product.html?id=" + canap._id)
            }
        })
        .catch(function (err) {});
};

// Appel de la fonction recupDataAPI
recupDataAPI();