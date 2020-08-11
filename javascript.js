let btn = document.getElementById('search');
let input = document.querySelector('input#pokemon');
let pokemonSearch = 'https://pokeapi.co/api/v2/pokemon/';


// This function makes the HTML
function pokemonHtml (poke) {
    let html = document.getElementById('html');
    let section = document.createElement('section');
    section.setAttribute('id','contain');

    if(html.hasChildNodes()) {
        let remove = document.getElementById('contain');
        remove.remove();
        html.append(section);
        section.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png" alt="pokemon picture">
        <div class="card-body">
            <h5 class="card-title">Number: ${poke.id}, ${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h5>
            <p class="card-text">${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)} is ${Math.round((poke.height/10)/0.3048)} ft tall, and weighs ${poke.weight / 10} kg, or ${Math.round((poke.weight/10)/0.45359237)} lbs</p>
            <a href="https://bulbapedia.bulbagarden.net/wiki/${poke.name}_(Pok%C3%A9mon)" class="btn btn-primary">Go to Bulbapedia</a>
        </div>
        </div>
    `;
}   else {
    html.append(section);
    section.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png" alt="pokemon picture">
        <div class="card-body">
            <h5 class="card-title">Number: ${poke.id}, ${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h5>
            <p class="card-text">${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)} is ${Math.round((poke.height/10)/0.3048)} ft tall, and weighs ${poke.weight / 10} kg, or ${Math.round((poke.weight/10)/0.45359237)} lbs</p>
            <a href="https://bulbapedia.bulbagarden.net/wiki/${poke.name}_(Pok%C3%A9mon)" class="btn btn-primary">Go to Bulbapedia</a>
        </div>
        </div>
    `
    };
};

//This function grabs the first 151 pokemon
function carousel(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151/')
    .then(res => res.json())
    .then(json => idSearch(json))
    
};

//This function takes the 151 pokemon and turns them into a usable image
function idSearch(myArr) {
    for(let i = 1; i < myArr.results.length; i++ ) {
        let id = myArr.results[i].name;
        let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
        const search = new XMLHttpRequest;
        search.open('GET', url);
        search.send();
        search.onreadystatechange = function () {
             if (search.readyState === 4 && search.status === 200) {
                 let poke = JSON.parse(search.responseText)
                 let scroll = document.querySelector('.photobanner')
                 let image = document.createElement('img')
                 image.setAttribute('class', 'pokemonImage');
                 image.setAttribute('alt', 'Pokemon Immage')
                 image.setAttribute('src', `https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png`)
                 scroll.appendChild(image)
             };
         };
    };   
};



btn.addEventListener('click', (event) => {
    fetch(pokemonSearch + input.value.toLowerCase())
    .then(res => res.json())
    .then(json => pokemonHtml(json))
    
});



