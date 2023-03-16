
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const pokemons = [];
let pokesToShow = 152;
let startNumber = 1;

//FUNCION PARA ACCEDER A LA URL CON LOS DATOS
const getUrl = async (iterator) => {

    const url = 'https://pokeapi.co/api/v2/pokemon/';

    try{
        let response = await fetch(`${url}${iterator}`); //llamo a la api, toma un iterador para ubicar cada url
        let pokemon = await response.json(); //convierte esa respuesta en json, desglosa cada objeto de cada pokemon
        let pokeText = pokemon.abilities.map((url)=> url.ability.url);
        let texts = [];
        for (let url of pokeText){
            const res = await fetch(url);
        const ability = await res.json();
        const textAbility = ability.effect_entries.map((effect) => {
            if (effect.language.name == 'en'){
                texts.push(effect.effect);
            }
            }) 
        }

        pokemon = {...pokemon, textos: texts};
        createPoke(pokemon); //utilizo esa respuesta para crear cada caja en la funcion createPoke
        pokemons.push(pokemon);
    } catch (err) {
        console.log(`Message: ${err}`);
    }
}


//FUNCION PARA ITERAR EL ID DE CADA POKEMON EN LA URL 
const fetchIterator = async (startNumber, endNumber) => {

    for(let i = startNumber; i < endNumber; i++) 
    {
       await getUrl(i); //utilizo el url de getUrl y le asigno su iterador 
    }

}
fetchIterator(startNumber, pokesToShow);


const ol$$ = document.querySelector('ol');

//FUNCION PARA CREAR CADA POKEMON
async function createPoke(pokemon) {
    
    const pokeDiv$$ = document.createElement('div');
    pokeDiv$$.classList.add('flip-card');

    const pokeCard$$ = document.createElement('div');
    pokeCard$$.classList.add('flip-card-inner');
    pokeDiv$$.appendChild(pokeCard$$);

    let statBase = pokemon.stats[0].base_stat;
    let statName = pokemon.stats[0].stat.name;

    //asigno su primer tipo (siempre existente) al color 1
    let colour1 = getColour(pokemon.types[0].type.name);

    //obtengo su color 2 si tiene un segundo subtipo y sino, imprimo su color1
    let colour2 = pokemon.types.length > 1 ? getColour(pokemon.types[1].type.name) : colour1;

    //asigno el gradiante al div con ambos o un color
    pokeCard$$.style.backgroundImage = `linear-gradient(${colour1}, ${colour2})`;

    //aqui se coge el type de cada pokemon y si tiene mas de uno ambos
    const pokeTypes = pokemon.types.map((type)=> type.type.name);

     //aqui se coge los names de abilities de cada pokemon 
    const pokeAbilityName = pokemon.abilities.map((ability)=> ability.ability.name);

    const pokeInnerHtml = `
            <div class='flip-card-front'>
                <div class='poke-id'>
                    <p> #${pokemon.id}</p>
                </div>
                <div class='poke-img'>
                    <img src='${pokemon.sprites.other.home.front_default}'>
                </div>
                <div class='poke-name'>
                    <h2> ${pokemon.name} </h2>
                </div>
                <div class='poke-types'>
                    <h5> Type </h5>
                    <p> ${pokeTypes} </p>
                </div>
                <div class='poke-body'>
                    <div class='poke-body-h'>
                     <h5> Height:</h5> <p>${pokemon.height} </p>
                    </div>
                    <div class='poke-body-w'>
                        <h5> Weight:</h5> <p>${pokemon.weight} </p>
                    </div>
                </div>
            </div>
            <div class='flip-card-back'>
                <div class='poke-ability'>
                    <h5> Abilities </h5>
                    <h4>  ${pokeAbilityName}</h4>
                    <h6> ${pokeAbilityName[0]}:</h6>
                    <p>${pokemon.textos[0]} </p>
                </div>
                </div>
            </div>
    `;


    pokeCard$$.innerHTML = pokeInnerHtml;

    ol$$.appendChild(pokeDiv$$);

}

function getColour(type){ //Esta funcion recibe como parametro el type del pokemon, y devuelve su correlacion en color 

    switch(type) {
        case 'grass':
        return colours.grass; 
        case 'fire': 
        return colours.fire;
        case 'water':
       return colours.water;
        case 'bug':
       return colours.bug;
        case 'electric':
       return colours.electric;
        case 'normal':
       return colours.normal;
        case 'ice':
       return colours.ice;
        case 'fighting':
       return colours.fighting;
        case 'poison':
       return colours.poison;
        case 'ground':
       return colours.ground;
        case 'flying':
       return colours.flying;
        case 'psychic':
       return colours.psychic;
        case 'rock':
       return colours.rock;
        case 'ghost':
       return colours.ghost;
        case 'dragon':
       return colours.dragon;
        case 'dark':
       return colours.dark;
        case 'fairy':
       return colours.fairy;
        case 'steel':
       return colours.steel;
        
    }
}

const input$$ = document.querySelector('.search-input');

function inputVal(pokemons) {
    input$$.addEventListener('input', ()=> findPokemon(input$$.value, pokemons)); 
}   

function findPokemon(filter, pokemons) {

    const filterPokes = pokemons.filter((pokemon) => pokemon.name.includes(filter));

    ol$$.innerHTML = '';

    for(var i = 0; i < filterPokes.length; i++)
    {
        createPoke(filterPokes[i]);
    }
    
}

inputVal(pokemons);

//TILT LOGO
let start = document.querySelector('.logo-box');
let ex = 10;
function swing(element) {

    function update(time) {
        
        const x = Math.sin(time / 1231) * ex;
        const y = Math.sin(time / 1458) * ex;

        element.style.transform = [
            `rotateX(${x}deg)`,
            `rotateY(${y}deg)`
        ].join(' ');

        requestAnimationFrame(update);
    }
    update(0); //love your nested functions
}

swing(start);
