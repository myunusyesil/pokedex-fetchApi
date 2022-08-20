const pokeContainer = document.querySelector('.poke-container')

const pokeCount = 151;

const getPokeData = async (id) =>  {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let data = await response.json();
   
        // create pokeElement 
        const createPokeCard =  async (pokemon) => {
            let pokeName = pokemon.name;
            let pokeId = pokemon.id;
            pokeId= pokeId.toString().padStart(3,0);
            let pokeWeight = pokemon.weight;
            let imgUrl = pokemon.sprites.front_shiny;
            let pokeType = pokemon.types[0].type.name;
    
            let pokeEl = document.createElement('div');
            pokeEl.classList.add('poke-box');
            
            pokeEl.innerHTML = `
            <img src="${imgUrl}" alt="${pokeName}" width="200px">
            <h3 class="poke-title">${pokeName}</h3>
            <p class="poke-id">#${pokeId}</p>
            <p class="poke-weight">${pokeWeight} kg</p>
            <p class="poke-type">${pokeType}</p>
            `
            pokeContainer.appendChild(pokeEl);
    
        }
        createPokeCard(data);
    }

    const initPokemon = async () => {
        for ( let i=1 ; i < pokeCount ; i++ ) {
            await getPokeData(i);
        }
    }
    
    initPokemon();

    
    const filterValue = document.querySelector('#poke-input');

   filterValue.addEventListener('input', function() {
        let filter = filterValue.value.toString().toLowerCase();
        console.log(filter);
        const pokeName = document.querySelectorAll('.poke-title');
        // console.log(pokeName);
        
        pokeName.forEach(element => {
            element.parentElement.style.display = 'block';
            if (!element.innerHTML.includes(filter)) {
                // console.log(filter, element.innerHTML)
                element.parentElement.style.display = 'none';
            }
            else {
                element.parentElement.style.display = 'block';
            }
        });
        
   })

    
