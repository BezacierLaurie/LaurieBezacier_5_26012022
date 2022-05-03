// Récupération de 'panier' du LS
let panierLS = localStorage.getItem("panier"); // String

// Prix total du panier - Valeur initiale
var totalPanier = 0;

// Eviter l'erreur (dans la console) lorsque LS vide
if (panierLS !== null) {
    afficherProduits();
} else {
    console.log("Aucun 'canap' n'est encore présent dans le panier")
};

async function afficherProduits() {

    let panierJS = JSON.parse(panierLS); // objet JS

    // Compteur = sert à récupérer l'index du array 'panier' - Valeur initiale
    let compteur = 0;

    // Boucle forEach sur 'panierJS' pour récupérer les 'canap' sélectionnés
    for (let canapsSelectPanierJS of panierJS) {
        // Appel de la fonction 'afficherProduit' ('rangée' dans une variable permet de récupérer le prix de chacun des 'canap')
        await afficherProduit(canapsSelectPanierJS, compteur);

        // Récupère l'index à chacun des tours (de la boucle)
        compteur = compteur + 1; // idem : 'compteur++;' 
    }

    // Changement du prix total du panier (visuellement)
    document.getElementById("totalPrice").innerHTML = totalPanier;

    // Suppression du noeud contenant la carte initiale
    let cardParent = document.getElementById("cart__items");
    let cardEnfant = document.querySelector("#cart__items > article");
    cardParent.removeChild(cardEnfant);

    // Nb d'articles
    document.getElementById("totalQuantity").innerText = panierJS.length;
};

// Fonction qui affiche chacun des 'canap' sélectionnés, en récupérant les données dans l'API et du LS et en affichant ces informations / attribut (en paramètre) 'canap' = clone de l'attribut 'canapsSelectPanierJS' déclaré antérieurement (objet JS)
function afficherProduit(canap, index) {
    return fetch("http://localhost:3000/api/products/" + canap.idProduit)
        .then(function (response) {
            //console.table(response)
            return response.json()
        })
        .then(function (data) {
            // Clonage de la carte initiale + récupération des infos de chacun des 'canap' sélectionnés

            // Carte initiale : récupération
            let card = document.querySelector("#cart__items > article");

            // Clonage de la carte exemple
            let clone = card.cloneNode(true);

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

            // Prix (initial) du 'canap' sélectionné
            let prixCanap = data.price * canap.qte;
            clone.querySelector(".cart__item__content .prixProduitSelect").innerText = prixCanap + " €";

            // Calcul du prix total du panier
            totalPanier = totalPanier + prixCanap;

            // Supression d'un 'canap' dans le panier
            let btnSup = clone.querySelector(".deleteItem");
            btnSup.addEventListener('click', function () {
                supCanap(index);
            });

            // Sélectionne le futur parent 
            let cardParent = document.getElementById("cart__items");
            // Ajout de nouveaux enfants (cards clonnées) à la fin de la liste des enfants (déjà existants) du parent 'cardParent'
            cardParent.appendChild(clone);
        })
        .catch(function (err) {});
};

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

// 'index' = 'compteur'
function supCanap(index) {

    let panierJS = JSON.parse(panierLS); // objet JS

    panierJS.splice(index, 1);

    // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
    panierLS = JSON.stringify(panierJS); // string

    // Création d'une nouvelle valeur à la clé 'panier'
    localStorage.setItem("panier", panierLS);

    // Pour rafraichir la page : mise à jour des infos
    document.location.reload();

    console.log("le canap a bien été supprimé");
};

// Formulaire coordonnées utilisateur

// Vérification des données utilisateur

// Prénom (en HTML et CSS)
var firstNameUser = document.getElementById("firstName");

// Nom
var lastNameUser = document.getElementById("lastName");
let messError_LastNameUser = document.getElementById("lastNameErrorMsg");

lastNameUser.addEventListener('change', function (event) {
    valid_LastNameUser(event);
});

function valid_LastNameUser(event) {
    if (isValid_LastName(event.target.value) || lastNameUser.value == "") {
        messError_LastNameUser.innerText = " ";
    } else {
        messError_LastNameUser.innerText = "Valeur du champ incorrecte";

        // Pour empêcher l'envoi des données du formulaire
        event.preventDefault();
    }
};

// Regex pour vérifier la valeur de 'lastNameUser'
function isValid_LastName(value) {
    let regex_LastName = /^[a-zA-ZÀ-ÿ]+$/;
    return regex_LastName.test(value);
};

// Adresse
var addressUser = document.getElementById("address");
let messError_AddressUser = document.getElementById("addressErrorMsg");

addressUser.addEventListener('change', function (event) {
    valid_AddressUser(event);
});

function valid_AddressUser(event) {
    if (isValid_AddressCity(event.target.value) || addressUser.value == "") {
        messError_AddressUser.innerText = " ";
    } else {
        messError_AddressUser.innerText = "Valeur du champ incorrecte";

        // Pour empêcher l'envoi des données du formulaire
        event.preventDefault();
    }
};

// Ville
var cityUser = document.getElementById("city");
let messError_CityUser = document.getElementById("cityErrorMsg");

cityUser.addEventListener('change', function (event) {
    valid_CityUser(event);
});

function valid_CityUser(event) {
    if (isValid_AddressCity(event.target.value) || cityUser.value == "") {
        messError_CityUser.innerText = " ";
    } else {
        messError_CityUser.innerText = "Valeur du champ incorrecte";

        // Pour empêcher l'envoi des données du formulaire
        event.preventDefault();
    }
};

// Regex (identique) pour vérifier la valeur de 'addressUser' et de 'cityUser'
function isValid_AddressCity(value) {
    let regex_AdressCity = /^[a-zA-Z0-9\é\è\ê\s,.'-]{3,}$/;
    return regex_AdressCity.test(value);
};

// Mail
var mailUser = document.getElementById("email");
let messError_MailUser = document.getElementById("emailErrorMsg");

mailUser.addEventListener('change', function (event) {
    valid_MailUser(event);
});

function valid_MailUser(event) {
    if (isValid_Mail(event.target.value) || mailUser.value == "") {
        messError_MailUser.innerText = " ";
    } else {
        messError_MailUser.innerText = "Valeur du champ incorrecte";

        // Pour empêcher l'envoi des données du formulaire
        event.preventDefault();
    }
};

// Regex pour vérifier la valeur de 'mailUser'
function isValid_Mail(value) {
    let regex_Mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex_Mail.test(value);
};

// Envoi des données utilisateur - Btn 'Commander !'

let form = document.querySelector("form");

form.addEventListener('submit', function (event) {

    // Pour empêcher les paramètres par défaut du 'submit'
    event.preventDefault()

    let panierJS = JSON.parse(panierLS);

    let newFirstName = document.getElementById("firstName").value;
    let newLastName = document.getElementById("lastName").value;
    let newAddress = document.getElementById("address").value;
    let newCity = document.getElementById("city").value;
    let newEmail = document.getElementById("email").value;

    for (let canapsSelect of panierJS) {
        var arrayIdProduct = [canapsSelect.idProduit];
        console.log(arrayIdProduct);
    };

    let contactUser = {
        contact: {
            firstName: newFirstName,
            lastName: newLastName,
            address: newAddress,
            city: newCity,
            email: newEmail
        },
        products: arrayIdProduct
    };

    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactUser)
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log('Success:', data);

            let idCommandeUser = data.orderId;
            console.log(idCommandeUser);

            // Redirection vers la page 'confirmation'
            document.location.replace("../html/confirmation.html?orderId=" + idCommandeUser);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});