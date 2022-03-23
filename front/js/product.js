// Récupération de l'id de chaque produit dans son URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id)

// Appel de la fonction 'recupDataProduit'
recupDataProduit();

// Récupération des données de chaque produit grâce à son id
async function recupDataProduit() {
    await fetch("http://localhost:3000/api/products/" + id) // Concaténation
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            //console.log(data)

            // Modifications des données de chaque produit
            modifDataProduit(data);

        })
        .catch(function (err) {});

};

function modifDataProduit(data) {

    document.querySelector(".item__img > img").setAttribute("src", data.imageUrl);
    document.querySelector(".item__img > img").setAttribute("alt", data.altTxt);

    document.getElementById("title").innerText = data.name;
    document.getElementById("price").innerText = data.price;

    document.getElementById("description").innerText = data.description;

    // Liste déroulante
    let tabColors = data.colors;
    //console.log(tabColors)

    let select = document.getElementById("colors");

    for (let color of tabColors) {
        //console.log(color)

        let option = document.createElement("option");
        option.innerText = color;
        option.setAttribute("value", color);
        select.appendChild(option);
    };
};


// Evenement 'onClick' sur le bouton 'Ajout au panier' :

let btn = document.getElementById("addToCart");

// Evénement 'clic' du Btn
btn.addEventListener('click', function (event) {

    // Stockage des données du produit dans localStorage sans écraser la valeur de la clé

    let listeColors = document.getElementById("colors");
    let colorChoice = listeColors.options[listeColors.selectedIndex].text;

    // Input
    let qte = document.getElementById("quantity").value;

    // Création de l'objet 'produit' 
    var produit = {
        idProduit: id,
        couleur: colorChoice,
        qte: qte
    };

    // Récupération du 'panier' (dans LS)
    let panier = localStorage.getItem("panier"); // string ou undefined
    // Si le panier n'existe pas dans LS 
    if (panier == null) {
        // Alors le créer en objet JS (array vide)
        panier = [] // objet JS
        console.log(panier)
    }
    // Sinon convertir le tableau déjà existant en objet JS (array) (pour pouvoir pusher dedans de nouveaux éléments)
    else {
        panier = JSON.parse(panier); // objet JS
        console.table(panier)
    }

    //panier.push(produit);

    // Pour connaitre l'index de l'objet 'produit' dans le array 'panier'
    const indexProduit = (item) => item.id === produit.idProduit && item.color === produit.couleur;
    let index = panier.findIndex(indexProduit);
    console.log("l'index du produit est : " + index) // '-1' s'il n'existe pas , sinon son 'index'
    
    console.log("la quantité du produit est : " + produit.qte) // qte nb

    console.table(panier) // qte string (dans 'panier')
    console.log(produit.qte) // qte nb
    
    // Condition : 
    if (index == -1) // Si l'index de l'objet 'produit' n'est pas présent dans le array 'panier'
    {
        // Alors pusher l'objet 'produit' dans le array 'panier' (objet JS)
        panier.push(produit);

        console.log('produit ajouté')
    } else // Sinon (s'il est déjà présent) modifier sa quantité initiale
    {
        console.log("produit déjà présent")

        /* // Conversion en nb pour pouvoir réaliser l'addition des 'qte'
        let qteTotale = parseInt(panier[index].qte) + parseInt(produit.qte);

        produit.qte = qteTotale;
        console.log(produit.qte) */

        panier[index].qte = JSON.parseInt(panier[index].qte); // nb

        produit.qte = JSON.parseInt(produit.qte); // nb

        let qteTotale = panier[index].qte + produit.qte // nb

        // Modification de la valeur de la quantité initiale
        produit.qte = qteTotale // nb
        console.log("nouvelle quantité : " + produit.qte)
    }

    // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
    panier = JSON.stringify(panier); // string

    // Création d'une nouvelle valeur à la clé 'panier'
    localStorage.setItem("panier", panier);

    // Pour empecher le changement de page au 'clic' (du Btn)
    event.preventDefault();
});