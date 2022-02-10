// Récupération de l'id de chaque produit dans son URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id)

function recupIdProduit() {
    fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
        .then(function (response) {
            console.table(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            // Modifications des données de chaque produit

            document.querySelector(".item__img > img").setAttribute("src", data.imageUrl);
            document.querySelector(".item__img > img").setAttribute("alt", data.altTxt);

            document.getElementById("title").innerText = data.name;
            document.getElementById("price").innerText = data.price;

            document.getElementById("description").innerText = data.description;

        })
        .catch(function (err) {});
};

// Appel de la fonction 'recupIdProduit'
recupIdProduit();
