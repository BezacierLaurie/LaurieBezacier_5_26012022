// 'index' = 'compteur'
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
};