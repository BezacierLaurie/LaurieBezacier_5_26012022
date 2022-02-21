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
            console.log(data)

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
        console.log(color)

        let option = document.createElement("option");
        option.innerText = color;
        option.setAttribute("value", color);
        select.appendChild(option);
    };
};


// Panier (ajout produits)

// Onclick
let btn = document.getElementById("addToCart");
btn.addEventListener('click', function (event) {
    // Stockage des données dans 'Local Storage'

    // 1ère syntaxe :
    // localStorage.setItem("idProduit", id);
    // JSON.parse : Sert à convertir les données au format JSON, qui sont dans le Local Storage, en objet JS
    //let prodEnrLS = JSON.parse(localStorage.getItem("id"));
/*     let optionSelect = document.select.option.text;
    localStorage.setItem("colorProduit", optionSelect);
 */
    // 2ème syntaxe :
    // Création d'objet 'produit' = permet de regrouper les données des produits en une seule clé / valeur
/*     var produit = {
        idProduit: id,
        couleur: couleur,
        qte: "0 - 100"
    };
    localStorage.setItem('produitSelect', JSON.stringify(produit)); // La méthode JSON.stringify() transforme en chaîne de caractères JSON l'objet (JS) transmis en paramètre. 
 */
/*     produitJSON = localStorage.getItem('produitSelect');
    produit = produitJSON && JSON.Parse(produitJSON); // la méthode JSON.Parse() transforme la chaîne de caractères JSON en objet (JS).
 */


    // 3ème syntaxe :
    // Si la clé existe alors 'afficher sa valeur' dans LocalStorage
    if(localStorage.getItem('idProduit', 'colorProduit', 'qteProduit')) {
        afficherValueStorage();
      } 
      // Sinon 'créer sa valeur' dans LocalStorage
      else {
        creerValueStorage();
      }
      
      function afficherValueStorage() {
        var currentId = localStorage.getItem('idProduit');
        var currentColor = localStorage.getItem('colorProduit');
        var currentQte = localStorage.getItem('qteProduit');
      }
      
      function creerValueStorage() {
        localStorage.setItem('idProduit', id);
        
        let listeColors = document.getElementById("colors");
        let colorChoice = listeColors.options[listeColors.selectedIndex].text;
        localStorage.setItem('colorProduit', colorChoice);
        
        let qte = document.getElementById("quantity");
        localStorage.setItem('qteProduit', qte.value);
      }
      

    // Pour empecher le changement de page au 'clic' (du bouton)
    event.preventDefault();
});

