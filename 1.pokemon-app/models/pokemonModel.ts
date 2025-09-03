import axios from "axios";

export interface Pokemon {
    id: number;
    name: string;
    type: string;
}

/** Fetch a Pokemon by name from PokeAPI */
async function fetchPokemonData(name: string): Promise<Pokemon | null> {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const data = response.data as {
            id: number;
            name: string;
            types: { type: { name: string } }[];
        };
        const types = data.types.map((t: { type: { name: string } }) => t.type.name);
        return { id: data.id, name: data.name, type: types.join(", ") };
    } catch (error) {
        return null;
    }
}

/** Find Pokemon by name */
export async function findPokemonByName(
    name: string
): Promise<{ pokemon: Pokemon | null; message: string }> {
    const pokemon = await fetchPokemonData(name);
    if (pokemon) {
        return { pokemon, message: `Hooray! Found Pokemon: '${pokemon.name}'.` };
    } else {
        return { pokemon: null, message: `Oops! We couldn't find a Pokemon named '${name}'.` };
    }
}

/** Find Pokemon by type */
export async function findPokemonByType(
    type: string
): Promise<{ pokemon: Pokemon[]; message: string }> {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
        const data = response.data as { pokemon: { pokemon: { name: string } }[] };
        const pokemons: Pokemon[] = [];

        for (const entry of data.pokemon) {
            const p = await fetchPokemonData(entry.pokemon.name);
            if (p) pokemons.push(p);
        }

        if (pokemons.length === 0) return { pokemon: [], message: `No Pokemon of type '${type}' were found.` };
        return { pokemon: pokemons, message: `Found ${pokemons.length} Pokemon(s) of type '${type}'.` };
    } catch (error) {
        return { pokemon: [], message: `No Pokemon of type '${type}' were found.` };
    }
}
