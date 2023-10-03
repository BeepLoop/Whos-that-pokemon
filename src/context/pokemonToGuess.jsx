import { createContext, useEffect, useState } from "react"

export const PokemonToGuess = createContext()

export default function PokemonProvider({ children }) {
    const [score, setScore] = useState(0)
    const [round, setRound] = useState(1)
    const [pokeList, setPokeList] = useState([])
    const [rightPoke, setRightPoke] = useState(null)
    const [revealMon, setRevealMon] = useState(false)
    const [canSelect, setCanSelect] = useState(true)
    const [loading, setLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [gameover, setGameover] = useState(false)

    const MAX_NUM_OF_POKEMONS = 897
    const NUMBER_OF_ANSWERS = 4

    useEffect(() => {
        setLoading(true)
        fetchPokemonToGuess()
        setLoading(false)
    }, [round])

    useEffect(() => {
        pickPokeToGuess()
        setRevealMon(false)
        setCanSelect(true)
    }, [pokeList])

    async function fetchPokemonToGuess() {
        const randomPokemons = await Promise.all([
            fetchRandomPokemon(),
            fetchRandomPokemon(),
            fetchRandomPokemon(),
            fetchRandomPokemon(),
        ])

        const pokeList = randomPokemons.map((pokemon) => {
            return {
                id: pokemon.id,
                name: pokemon.species.name,
                sprite: pokemon.sprites.front_default,
            }
        })
        setPokeList(pokeList)
    }

    function pickPokeToGuess() {
        const index = Math.floor(Math.random() * NUMBER_OF_ANSWERS)
        setRightPoke(pokeList[index])
    }

    // fetch random pokemon
    async function fetchRandomPokemon() {
        const { VITE_POKE_API } = import.meta.env
        const random = Math.floor(Math.random() * MAX_NUM_OF_POKEMONS + 1)
        const res = await fetch(`${VITE_POKE_API}${random}`)
        return await res.json()
    }

    function playAgain() {
        setScore(0)
        setRound(0)
        setIsPlaying(false)
        setGameover(false)
    }

    function startGame() {
        setIsPlaying(true)
    }

    function quitGame() {
        setGameover(true)
    }

    function revealAnswer() {
        setRevealMon(true)
    }

    function addScore() {
        setScore((curr) => curr + 1)
    }

    function nextRound() {
        setRound(curr => curr + 1)
    }

    return (
        <PokemonToGuess.Provider
            value={{
                pokeList,
                rightPoke,
                score,
                addScore,
                nextRound,
                revealMon,
                revealAnswer,
                canSelect,
                setCanSelect,
                playAgain,
                quitGame,
                loading,
                isPlaying,
                startGame,
                gameover,
            }}
        >
            {children}
        </PokemonToGuess.Provider>
    )
}
