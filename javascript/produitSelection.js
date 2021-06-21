// récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;

//Extraction de l'ID
const urlSearchParams = new URLSearchParams(queryString_url_id);

//Récupération de l'ID avec la méthode get
const leId = urlSearchParams.get('_id');
// console.log(leId);

const erreur = "Il y a une erreur dans l'URL de l'API";

//Affichage du produit (de l'objet dans l'API) qui a été sélectionné par l'ID

let affichagePageProduit = document.querySelector('#affichagePageProduit');
// console.log(affichagePageProduit);

//Avec fetch et en mettant la valeur de l'ID à la fin de l'URL

// Fonction asynchrone fetch pour récupérer la page de la caméra avec son ID

async function idProduitSelectionner() {
    //Appel de l'API avec ID
    //Utilisation d'un Try & Catch pour capturer les erreurs
    try {
        let data = await fetch('http://localhost:3000/api/cameras/' + leId);
        const idCameras = await data.json();
        // console.log(idCameras);
            affichagePageProduit.innerHTML = `
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 m-3">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="card shadow-sm">
                            <!-- Insérer l'image de la caméra "imageUrl"  -->
                            <img src="${idCameras.imageUrl}" alt="${idCameras.name}" class="imgProduit">
                    
                                <div class="card-body">
                                    <!-- Afficher le nom de la caméra "name" -->
                                    <h2 class="text-center nomProduit">${idCameras.name}</h2>
                                    <!-- Afficher la description du produit ZURSS 50S "description" -->
                                    <p class="card-text descriptionProduit">Description de la caméra ${idCameras.name} : ${idCameras.description}</p>
                                    <!-- Afficher la description du produit ZURSS 50S "description" -->
                                    <p class="card-text descriptionProduit">Les différents objectifs : ${idCameras.lenses}</p>
                                    <!-- Afficher le prix du produit ZURSS 50S en euros "price" -->
                                    <p class="prixProduit"><strong>${idCameras.price / 100} € </strong></p>
                                </div>
                                <form class="card-body">
                                    <label for="lenses_cameras">Choisir l'objectif : </label>
                                        <select  name="lenses_cameras" id="lenses_cameras" > 
                                            <option value="lenses_1">${idCameras.lenses[0]}</option>
                                            <option value="lenses_2">${idCameras.lenses[1]}</option>
                                            <option value="lenses_3">${idCameras.lenses[2]}</option>
                                        </select>
                                </form>
                                <div class="d-grid gap-2 col-md-3 offset-md-3 mx-auto">
                                    <button id="btnPanier" type="submit" name="btn-panier" class="btn btn-primary mt-2 mb-2">Ajouter l'article au panier</button>    
                                </div>
                        </div>
                    </div>
                </div>; `;

                //GESTION DU PANIER
                //Sélection de l'ID du formulaire
                let idForm = document.querySelector('#lenses_cameras')
                console.log(idForm);
                

                //Sélection du bouton Ajouter l'article au panier

                let btnPanier = document.querySelector('#btnPanier')
                console.log(btnPanier);

                //Ecouter le bouton et envoyer le panier
                btnPanier.addEventListener("click", (e)=>{
                    e.preventDefault;

                    //Mettre le choix de l'utilisateur dans une variable

                    let choixObjectif = idForm.value;

                     //Récupération des valeurs du formulaire

                    let optionsCameras = {
                        imageCamera: idCameras.imageUrl,
                        nomCamera: idCameras.name,
                        idCamera: idCameras._id,
                        lensesCamera: choixObjectif,
                        quantite: 1,
                        prixCamera: idCameras.price / 100,
                    }
                    console.log(optionsCameras);
                })

               
                
                

    } catch (erreur) {
        console.log(erreur);
    }
    
}

// Cette fonction asynchrone attend le retour de la fonction asynchrone 
async function run() {
    await idProduitSelectionner()
}

// Cette fonction s'éxécute en premier
run();





// Récupération des données sélectionnées par le client et envoie du panier