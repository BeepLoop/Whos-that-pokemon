import { useContext } from "react"
import { PokemonToGuess } from "../context/pokemonToGuess"

export default function usePokemonProvider() {
    return useContext(PokemonToGuess)
}
