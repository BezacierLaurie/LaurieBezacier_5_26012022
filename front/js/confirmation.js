// Récupération de l'id de chaque commande par URL
let params = (new URL(document.location)).searchParams;
let orderId = params.get('orderId');
console.log(orderId);

let idCommande = document.getElementById("orderId");
idCommande.innerText = orderId;