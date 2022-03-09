// Carte initiale : récupération
let card = document.querySelector("#cart__items > article");

// Suppression du noeud contenant la carte initiale (visuellement)
let cardParent = document.getElementById("cart__items");
let cardEnfant = card;
cardParent.removeChild(cardEnfant);

// Clonage de la carte exemple
let clone = card.cloneNode(true);

// Photo du produit sélectionné
clone.querySelector(".cart__item__img > img").setAttribute("src", '#');
// Alt de la photo du produit sélectionné
clone.querySelector(".cart__item__img > img").setAttribute("alt", "Photo du canapé sélectionné");

// Nom du produit sélectionné
clone.querySelector(".cart__item__content__description > h2").innerText = "Nom du canapé";

// Couleur du produit sélectionné
clone.querySelector(".cart__item__content .couleurProduitSelect").innerText = "couleur sélectionnée";

// Prix du produit sélectionné
clone.querySelector(".cart__item__content .prixProduitSelect").innerText = "prix sélectionné";

// Quantité du produit sélectionné
clone.querySelector(".cart__item__content__settings__quantity > input").value= "45";

// Sélection du futur parent : 'cart__items' du clone
let parent = document.getElementById("cart__items");
// Ajout de l'enfant à la fin de la liste des enfants du parent
parent.appendChild(clone);
