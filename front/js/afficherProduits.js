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

    // Boucle forEach sur 'panierJS' pour récupérer les 'id' des 'canap' sélectionnés
    for (let canapsSelectPanierJS of panierJS) {
        // Appel de la fonction 'afficherProduit' ('ranger' dans une variable permet de récupérer le prix de chacun des 'canap')
        let prixProduit = afficherProduit(canapsSelectPanierJS, compteur);
        console.log(prixProduit);

        // Calcul du total du prix du panier
        prixTotal = prixTotal + prixProduit;
        console.log(prixTotal);

        // Récupère l'index à chacun des tours (de la boucle)
        compteur = compteur + 1; // idem : 'compteur++;' 
    }

    // Nb d'articles
    document.getElementById("totalQuantity").innerText = panierJS.length;
};