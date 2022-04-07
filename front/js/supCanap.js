// 'index' = 'compteur'
function supCanap(index) {

    let panierJS = JSON.parse(panierLS); // objet JS

    panierJS.splice(index, 1);

    // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
    panierLS = JSON.stringify(panierJS); // string

    // Création d'une nouvelle valeur à la clé 'panier'
    localStorage.setItem("panier", panierLS);

    alert("le canap a bien été supprimé")
};