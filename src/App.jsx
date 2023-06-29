import { useEffect, useState } from "react";
import Pokemon from "./components/Pokemon";
import Answers from "./components/Answers";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Gameover from "./components/Gameover";
import useSound from "use-sound";
import correctSFX from './assets/audio/correct.mp3'
import wrongSFX from './assets/audio/wrong.mp3'

const MAX_NUM_OF_POKEMONS = 897;
const NUMBER_OF_ANSWERS = 4;
const DELAY = 1000;

function App() {
    const [pokemonToGuess, setPokemonToGuess] = useState([]);
    const [correctPokemon, setCorrectPokemon] = useState({});
    const [rounds, setRounds] = useState(0);
    const [score, setScore] = useState(0);
    const [reveal, setReveal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameover, setGameover] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [playCorrectSFX] = useSound(correctSFX)
    const [playWrongSFX] = useSound(wrongSFX, { volume: 0.3 })

    const { VITE_POKE_API } = import.meta.env

    useEffect(() => {
        startRound();
    }, [rounds]);

    async function startRound() {
        setIsLoading(true);
        setReveal(false);
        await fetchPokemonToGuess();
        setIsLoading(false);
    }

    async function fetchPokemonToGuess() {
        const randomPokemons = await Promise.all([
            fetchRandomPokemon(),
            fetchRandomPokemon(),
            fetchRandomPokemon(),
            fetchRandomPokemon(),
        ]);

        const selectedPokemons = [];

        randomPokemons.forEach((pokemon) => {
            selectedPokemons.push({
                id: pokemon.id,
                name: pokemon.species.name,
                sprite: pokemon.sprites.front_default,
            });
        });

        setPokemonToGuess([...selectedPokemons]);
        pickRandomFromPokemonToGuess();

        function pickRandomFromPokemonToGuess() {
            const index = Math.floor(Math.random() * NUMBER_OF_ANSWERS);
            setCorrectPokemon(selectedPokemons[index]);
        }

        async function fetchRandomPokemon() {
            const random = Math.floor(Math.random() * MAX_NUM_OF_POKEMONS + 1);

            const res = await fetch(`${VITE_POKE_API}${random}`);
            return await res.json();
        }
    }

    function play() {
        setIsPlaying(true);
    }

    async function evaluateAnswer(id) {
        setReveal(true);

        if (correctPokemon.id === id) {
            setScore((current) => (current = current + 1));
            playCorrectSFX()
            confetti({
                particleCount: 50,
                origin: {
                    x: 0.5,
                    y: 1,
                },
                scalar: 2,
            });
            setTimeout(() => {
                setRounds((current) => (current = current + 1));
            }, DELAY);
        } else {
            playWrongSFX()
            setTimeout(() => {
                setGameover(true);
            }, DELAY);
        }
    }

    function tryAgain() {
        setScore(curr => curr *= 0);
        setRounds(0);
        setIsPlaying(false);
        setGameover(false);
    }

    return (
        <div className="mx-auto h-screen max-w-xl bg-yellow-200">
            {isPlaying ? (
                isLoading ? (
                    <Loading />
                ) : gameover ? (
                    <Gameover score={score} retry={tryAgain} />
                ) : (
                    <>
                        <div className="bg-red-400">
                            <h3 className="text-center text-xl">Score: {score}</h3>
                        </div>
                        <div className="">
                            <Pokemon pokemon={correctPokemon} reveal={reveal} />
                        </div>
                        <Answers
                            choices={pokemonToGuess}
                            reveal={reveal}
                            pickAnswer={evaluateAnswer}
                            correct={correctPokemon}
                        />
                    </>
                )
            ) : (
                <Home sprite={correctPokemon.sprite} setIsPlaying={play} />
            )}
        </div>
    );
}

export default App;
