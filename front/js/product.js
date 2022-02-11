// Récupération de l'id de chaque produit dans son URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id)

// Appel de la fonction 'recupDataProduit'
recupDataProduit();

// Récupération des données de chaque produit 
function recupDataProduit() {
    Promise.all([
            fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
            .then(function (response1) {
                console.table(response1)
                return response1.json()
            })
            .then(function (data1) {
                console.log(data1)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data1.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data1.altTxt);

                document.getElementById("title").innerText = data1.name;
                document.getElementById("price").innerText = data1.price;

                document.getElementById("description").innerText = data1.description;

            }),

            fetch("http://localhost:3000/api/products/415b7cacb65d43b2b5c1ff70f3393ad1")
            .then(function (response2) {
                console.table(response2)
                return response2.json()
            })
            .then(function (data2) {
                console.log(data2)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data2.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data2.altTxt);

                document.getElementById("title").innerText = data2.name;
                document.getElementById("price").innerText = data2.price;

                document.getElementById("description").innerText = data2.description;

            }),

            fetch("http://localhost:3000/api/products/055743915a544fde83cfdfc904935ee7")
            .then(function (response3) {
                console.table(response3)
                return response3.json()
            })
            .then(function (data3) {
                console.log(data3)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data3.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data3.altTxt);

                document.getElementById("title").innerText = data3.name;
                document.getElementById("price").innerText = data3.price;

                document.getElementById("description").innerText = data3.description;

            }),

            fetch("http://localhost:3000/api/products/a557292fe5814ea2b15c6ef4bd73ed83")
            .then(function (response4) {
                console.table(response4)
                return response4.json()
            })
            .then(function (data4) {
                console.log(data4)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data4.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data4.altTxt);

                document.getElementById("title").innerText = data4.name;
                document.getElementById("price").innerText = data4.price;

                document.getElementById("description").innerText = data4.description;

            }),

            fetch("http://localhost:3000/api/products/8906dfda133f4c20a9d0e34f18adcf06")
            .then(function (response5) {
                console.table(response5)
                return response5.json()
            })
            .then(function (data5) {
                console.log(data5)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data5.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data5.altTxt);

                document.getElementById("title").innerText = data5.name;
                document.getElementById("price").innerText = data5.price;

                document.getElementById("description").innerText = data5.description;

            }),

            fetch("http://localhost:3000/api/products/77711f0e466b4ddf953f677d30b0efc9")
            .then(function (response6) {
                console.table(response6)
                return response6.json()
            })
            .then(function (data6) {
                console.log(data6)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data6.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data6.altTxt);

                document.getElementById("title").innerText = data6.name;
                document.getElementById("price").innerText = data6.price;

                document.getElementById("description").innerText = data6.description;

            }),

            fetch("http://localhost:3000/api/products/034707184e8e4eefb46400b5a3774b5f")
            .then(function (response7) {
                console.table(response7)
                return response7.json()
            })
            .then(function (data7) {
                console.log(data7)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data7.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data7.altTxt);

                document.getElementById("title").innerText = data7.name;
                document.getElementById("price").innerText = data7.price;

                document.getElementById("description").innerText = data7.description;

            }),

            fetch("http://localhost:3000/api/products/a6ec5b49bd164d7fbe10f37b6363f9fb")
            .then(function (response8) {
                console.table(response8)
                return response8.json()
            })

            .then(function (data8) {
                console.log(data8)

                // Modifications des données de chaque produit
                document.querySelector(".item__img > img").setAttribute("src", data8.imageUrl);
                document.querySelector(".item__img > img").setAttribute("alt", data8.altTxt);

                document.getElementById("title").innerText = data8.name;
                document.getElementById("price").innerText = data8.price;

                document.getElementById("description").innerText = data8.description;

            })
        ])
        .catch(function (err) {});

};