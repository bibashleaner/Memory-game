
        export const FetchData = async() =>{
            try{
                // fetch 12 pokemon from API
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15`);

                // if(!response.ok){
                //     throw new Error(`HTTP Error! status: ${response.status}`);
                // }

                const data = await response.json();

                // map the results into the card objects with id, name, image
                return data.results.map((pokemon) =>{

                    // extract the pokemon's id from the url
                    const id = pokemon.url.split('/')[6];
                    return {
                        id: pokemon.name,
                        name: pokemon.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`
                    }
                })
            }
            catch(error){
                console.error('Error fetching data:', error);
                return [];
            }
        }