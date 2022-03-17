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

    let qte = document.getElementById("quantity").value;

    // Création de l'objet 'produit' 
    var produit = {
        idProduit: id,
        couleur: colorChoice,
        qteTotale: qte
    };

    // Récupération du 'panier' (dans LS)
    let panier = localStorage.getItem("panier"); // string ou undefined
    // Si le panier n'existe pas dans LS 
    if (panier == null) {
        // Alors le créer en objet JS (array vide)
        panier = [] // objet JS
    }
    // Sinon convertir le tableau déjà existant en objet JS (array) (pour pouvoir pusher dedans de nouveaux éléments)
    else {
        panier = JSON.parse(panier); // objet JS
    }

   //panier.push(produit);

    // Fonction pour savoir si l'objet 'produit' est présent dans le array 'panier'
    function include(panier, produit)
    {
        let includeTest = panier.indexOf(produit) != -1;
        console.log(includeTest) // true = oui / false = non
        return (panier.indexOf(produit) != -1);
    }

     if (include(panier, produit) == false) {
        // Push l'objet 'produit' dans le array (objet JS)
        panier.push(produit);
        console.log('produit ajouté')
    } else {
        console.log("produit déjà présent")

        // Appel de la fonction 'ajoutQteSup'
        ajoutQteSup(produit)
    } 
 
    // Création de la fonction 'ajoutQteSup'
    function ajoutQteSup(produit) {
        qte = produit.qteTotale + produit.qteTotale;
        console.log('quantité modifiée')
    };

    // Conversion du array (objet JS) en 'string' (pour pouvoir le re-stocker dans LS) 
    panier = JSON.stringify(panier); // string

    // Création d'une nouvelle valeur à la clé 'panier'
    localStorage.setItem("panier", panier);

    // Pour empecher le changement de page au 'clic' (du Btn)
    event.preventDefault();
});