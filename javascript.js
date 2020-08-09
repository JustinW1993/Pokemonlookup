let btn = document.getElementById('search');


// This function Grabs the input and returns the pokemon
function pokemonSearch(callback) {
    let input = document.querySelector('input#pokemon');
    let url = 'https://pokeapi.co/api/v2/pokemon/' + input.value;
    url = url.toLowerCase()
    const search = new XMLHttpRequest;
    search.open('GET', url);
    search.onreadystatechange = function () {
        if (search.readyState === 4 && search.status === 200) {
            let poke = JSON.parse(search.responseText)
            input.value = '';
            return callback(poke);
        } else if (search.readyState === 4 && search.status === 404) {
            alert(`Pokemon ${input.value} was not found!`)

        } else if (search.readyState === 4 && search.status === 500) {
            alert(`ERROR 500!`)
        }
    }
    search.send()
}

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

// This function grabs the first 151 pokemon
function carousel(callback){
    let carUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151/'
    const pokemonList = new XMLHttpRequest;
    let pokeList;
    pokemonList.open('GET', carUrl); 
    pokemonList.onreadystatechange = function () {
        if (pokemonList.readyState === 4 && pokemonList.status === 200) {
            pokeList = JSON.parse(pokemonList.responseText)
            return callback(pokeList);
        };
    };
    pokemonList.send();  
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
    pokemonSearch(pokemonHtml);
});



