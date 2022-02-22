let idProduit = localStorage.getItem("idProduit");
console.log(idProduit)

// Appel de la fonction 'recupDataProduitSelect'
recupDataProduitSelect()

// Récupération des données de chaque produit sélectionnés grâce à son id
async function recupDataProduitSelect() {
    await fetch("http://localhost:3000/api/products/" + idProduit) // Concaténation
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            // Modifications des données de chaque produit
            modifDataProduitSelect(data);

        })
        .catch(function (err) {});

};

function modifDataProduitSelect(data) {
    // Image + alt
    document.querySelector(".cart__item__img > img").setAttribute("src", data.imageUrl);
    document.querySelector(".cart__item__img > img").setAttribute("alt", data.altTxt);
    // Nom
    document.querySelector(".cart__item__content__description > h2").innerText = data.name;
    
    // Couleur
    let classColorProduit = document.querySelectorAll(".cart__item__content__description > p:nth-child(1)");
    classColorProduit.innerText = localStorage.getItem("colorProduit");
    console.log(classColorProduit)

    /* // Prix
    let prixProduit = document.querySelectorAll(".cart__item__content__description > p:nth-child(2)");
    prixProduit.innerText = data.price;
    console.log(prixProduit)
    // Quantité
    let qteSelect = localStorage.getItem("qteProduit");
    document.getElementsByClassName("itemQuantity").setAttribute("value", qteSelect);
    console.log(qteSelect)
 */
};