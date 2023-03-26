import { useEffect, useState } from "react";
import Pokemon from "./components/Pokemon";
import Answers from "./components/Answers";
import "./App.css";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Gameover from "./components/Gameover";
import useSound from "use-sound";
import sfx from '../src/correct.mp3';

const MAX_NUM_OF_POKEMONS = 897;
const NUMBER_OF_ANSWERS = 4;
const DELAY = 1500;

function App() {
    const [pokemonToGuess, setPokemonToGuess] = useState([]);
    const [correctPokemon, setCorrectPokemon] = useState({});
    const [rounds, setRounds] = useState(0);
    const [score, setScore] = useState(0);
    const [reveal, setReveal] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameover, setGameover] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [playSFX] = useSound(sfx)

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
            console.log("pick correct pokemon");
        }

        async function fetchRandomPokemon() {
            const random = Math.floor(Math.random() * MAX_NUM_OF_POKEMONS + 1);

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
            console.log("fetch pokemon");
            return await res.json();
        }
    }

    function play() {
        setIsPlaying(true);
    }

    async function evaluateAnswer(id) {
        setReveal(true);

        if (correctPokemon.id === id) {
            setAnswerStatus(true);

            playSFX()
            confetti({
                particleCount: 50,
                origin: {
                    x: 0.5,
                    y: 1,
                },
                scalar: 2,
            });
            setTimeout(() => {
                console.log("correct");
                setScore((current) => (current = current + 1));
                setRounds((current) => (current = current + 1));
            }, DELAY);
        } else {
            setTimeout(() => {
                setGameover(true);
            }, DELAY);
        }
    }

    function tryAgain() {
        setScore(0);
        setRounds(0);
        setIsPlaying(false);
        setGameover(false);
    }

    return (
        <div className="App">
            {isPlaying ? (
                isLoading ? (
                    <Loading />
                ) : gameover ? (
                    <Gameover score={score} retry={tryAgain} />
                ) : (
                    <>
                        <div className="score-board">
                            <h3>Score: {score}</h3>
                        </div>
                        <div className="pokemon-tab">
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
