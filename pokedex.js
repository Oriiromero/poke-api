//FUNCION PARA ACCEDER A LA URL CON LOS DATOS
const getUrl = async (iterator) => {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${iterator}`); //llamo a la api, toma un iterador para ubicar cada url
        let pokemon = await response.json(); //convierte esa respuesta en json, desglosa cada objeto de cada pokemon
        createPoke(pokemon); //utilizo esa respuesta para crear cada caja en la funcion createPoke
    } catch (err) {
        console.log(`Message: ${err}`);
    }
}
//FUNCION PARA ITERAR EL ID DE CADA POKEMON EN LA URL 
const fetchIterator = async () => {

    for(let i = 1; i < 152; i++) 
    {
       await getUrl(i); //utilizo el url de getUrl y le asigno su iterador 
    }

}
fetchIterator();


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

//FUNCION PARA CREAR CADA POKEMON
function createPoke(pokemon) {
    const ol$$ = document.querySelector('ol');

    const li$$ = document.createElement('li');
    ol$$.appendChild(li$$);

    const pokeDiv$$ = document.createElement('div');
    pokeDiv$$.classList.add('pokemon__div')

    let statBase = pokemon.stats[0].base_stat;
    let statName = pokemon.stats[0].stat.name;

    switch(pokemon.types[0].type.name) {
        case 'grass':
        pokeDiv$$.style.backgroundColor = colours.grass;
        break;
        case 'fire': 
        pokeDiv$$.style.backgroundColor = colours.fire;
        break;
        case 'water':
        pokeDiv$$.style.backgroundColor = colours.water;
        break;
        case 'bug':
        pokeDiv$$.style.backgroundColor = colours.bug;
        break;
        case 'electric':
        pokeDiv$$.style.backgroundColor = colours.electric;
        break;
        case 'normal':
        pokeDiv$$.style.backgroundColor = colours.normal;
        break;
        case 'ice':
        pokeDiv$$.style.backgroundColor = colours.ice;
        break;
        case 'fighting':
        pokeDiv$$.style.backgroundColor = colours.fighting;
        break;
        case 'poison':
        pokeDiv$$.style.backgroundColor = colours.poison;
        break;
        case 'ground':
        pokeDiv$$.style.backgroundColor = colours.ground;
        break;
        case 'flying':
        pokeDiv$$.style.backgroundColor = colours.flying;
        break;
        case 'psychic':
        pokeDiv$$.style.backgroundColor = colours.psychic;
        break;
        case 'rock':
        pokeDiv$$.style.backgroundColor = colours.rock;
        break;
        case 'ghost':
        pokeDiv$$.style.backgroundColor = colours.ghost;
        break;
        case 'dragon':
        pokeDiv$$.style.backgroundColor = colours.dragon;
        break;
        case 'dark':
        pokeDiv$$.style.backgroundColor = colours.dark;
        break;
        case 'fairy':
        pokeDiv$$.style.backgroundColor = colours.fairy;
        break;
        case 'steel':
        pokeDiv$$.style.backgroundColor = colours.steel;
        break;
    }

    const pokeTypes = pokemon.types.map((type)=> type.type.name).join(', ');
    console.log(pokeTypes);''

    const pokeInnerHtml = `
        <div class='poke-img'>
            <img src='${pokemon.sprites.other.home.front_default}'>
        </div>
        <div class="poke-name">
            <h2> ${pokemon.name} </h2>
        </div>
        <div class="poke-info">
            <p> Height: ${pokemon.height} </p>
            <p> Weight: ${pokemon.weight} </p>
        </div>
        <div class='poke-stats'>
            <h5> Stats </h5>
            <p> ${statBase} ${statName}</p>
            <h5> Type </h5>
            <p>${pokeTypes}</p>
        </div>
    `;



    pokeDiv$$.innerHTML = pokeInnerHtml;

    li$$.appendChild(pokeDiv$$);

}