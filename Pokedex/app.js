let allPokemon = []; // stock les pokemons
let tableauFin = []; 
const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');
const loading = document.querySelector('.loader')

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};


function fetchPokemonBase(){

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(response => response.json())
    .then((allPokemon) => {
         //console.log(data);
        allPokemon.results.forEach((pokemon) => {
            fetchPokemonComplet(pokemon);
        })
    })
}

fetchPokemonBase();

function fetchPokemonComplet(pokemon) {
    let objPokemonFull = {};
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
    .then(response => response.json())
    .then((pokeData) => {
    //console.log(pokeData);

    objPokemonFull.pic = pokeData.sprites.front_default;
    objPokemonFull.type = pokeData.types[0].type.name;
    objPokemonFull.id = pokeData.id;

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
     .then(response => response.json())
     .then((pokeData) => {
             //console.log(pokeData);

        objPokemonFull.name = pokeData.names[4].name;
        allPokemon.push(objPokemonFull);

        if(allPokemon.length === 151) {
             //console.log(allPokemon);

             // tri du tableau du plus petit au plus grand id
            tableauFin = allPokemon.sort((a,b) => {
            
            return a.id - b.id;
            
        }).slice(0,21); // Récuperation des 21 premiers pokemons
            // console.log(tableauFin);

                createCard(tableauFin);
                loading.style.display = "none";
             }
         })
    })
}

// CREATION DE CARTES

function createCard(arr) {
   for(let i = 0; i < arr.length; i++) {
       
    const carte = document.createElement('li');
    let couleur = types[arr[i].type];
    carte.style.background = couleur;
   
    const txtCarte = document.createElement('h5');
    txtCarte.innerText = arr[i].name;

    const idCarte = document.createElement('p');
    idCarte.innerText = `ID# ${arr[i].id}`;

    const imgCarte = document.createElement('img');
    imgCarte.src = arr[i].pic;

    carte.appendChild(imgCarte);
    carte.appendChild(txtCarte);
    carte.appendChild(idCarte);

    listePoke.appendChild(carte);
   } 
}

// SCROLL INFINI
window.addEventListener('scroll', () => {

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // scrollTop = scroll depuis le top
    //scrollHeight = scroll total
    // clientHeight = hauteur de la fenetre , partie visible
    //console.log(scrollTop, scrollHeight, clientHeight);

    if(clientHeight + scrollTop >= scrollHeight -20 ) {
        addPoke(6);
    }

})

let index = 21;

function addPoke(nb) {

    if(index > 151) {
       return; 
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// SYSTEME DE RECHERCHE


searchInput.addEventListener('keyup', recherche);

/*
Recherche avec le formulaire
const formRecherche = document.querySelector('form');
formRecherche.addEventListener('submit', (e) => {
    e.preventDefault();
    recherche();
})
*/

function recherche() {
    if(index < 151) {
        addPoke(130);
    }

    let filter, allLi,titleValue, allTitles;

    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5')

    for( i = 0; i < allLi.length; i++) {
        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }
    }
}

// ANIMATION INPUT

// Si l'input est rempli on rajoute une class a l'element parentsinon on supprime cette classe
searchInput.addEventListener('input', function(e) {
    if(e.target.value !== "") {
        e.target.parentNode.classList.add('active-input')
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input')
        
    }
})