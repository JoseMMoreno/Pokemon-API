function getPokemonImage() {
    var pokemonName = document.getElementById("pokemon-name").value;
    var request = new XMLHttpRequest();
    request.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemonName);
    request.onload = function () {
        if (request.status === 200) {
            var pokemon = JSON.parse(request.responseText);
            var pokemonImage = pokemon.sprites.front_default;
            document.getElementById("pokemon-image").innerHTML = "<img src='" + pokemonImage + "' alt='" + pokemonName + "'>";
        } else {
            alert("Error getting Pokemon image: " + request.statusText);
        }
    };
    request.send();
}

function getPokemon(pokemonName) {

    document.getElementById("pokemon-image").innerHTML = "";
    document.getElementById("pokemon-card").innerHTML = "";

    var request = new XMLHttpRequest();
    request.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemonName.toLowerCase());
    request.onload = function () {
        if (request.status === 200) {
            var pokemon = JSON.parse(request.responseText);
            // Get the Pokemon's type
            var type = pokemon.types[0].type.name;

            // Get the Pokemon's stats
            var stats = pokemon.stats;

            // Get the Pokemon's moves
            var moves = pokemon.moves;

            // Sort the moves by their power
            var sortedMoves = moves.sort(function (a, b) {
                return b.move.power - a.move.power;
            });

            // Get the top 4 moves
            var strongestMoves = sortedMoves.slice(0, 4);

            // Set the Pokémon card color
            setPokemonCardColor(type);

            document.getElementById("pokemon-card").innerHTML += "<h1>Pokemon: " + pokemonName.toLowerCase() + "</h1>" ;

            // Add the Pokemon's type to the Pokemon card
            document.getElementById("pokemon-card").innerHTML += "<h2>Type: " + type + "</h2>";

            document.getElementById("pokemon-card").innerHTML += "<h1>Stats: " + "</h1>";

            // Create a map of stat names to their corresponding numbers
            var statNames = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];

            // Add the stat names to the Pokemon card
            for (var stat in stats) {
                document.getElementById("pokemon-card").innerHTML += "<h2>" + statNames[stat] + ": " + stats[stat].base_stat + "</h2>";
            }

            document.getElementById("pokemon-card").innerHTML += "<h1>Top 4 Moves: " + "</h1>";
            // Add the Pokemon's strongest moves to the Pokemon card
            for (var move in strongestMoves) {
                document.getElementById("pokemon-card").innerHTML += "<h2>" + strongestMoves[move].move.name + "</h2>";
            }
        } else {
            alert("Error getting Pokemon: " + request.statusText);
        }
    };
    request.send();
}

function setPokemonCardColor(pokemonType) {

     const card = document.getElementById('pokemon-cardcolor');

    // List of all known types you handle in CSS
    const allTypes = [
        "fire", "water", "grass", "electric", "psychic", "rock", "ground", "flying",
        "bug", "ghost", "dragon", "dark", "steel", "fairy"
    ];

    // Remove any existing type classes
    allTypes.forEach(type => card.classList.remove(type));

    // Add the new type class
    card.classList.add(pokemonType);
}
