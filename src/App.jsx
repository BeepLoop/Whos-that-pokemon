import Pokemon from "./components/Pokemon"
import Answers from "./components/Answers"
import Home from "./components/Home"
import Loading from "./components/Loading"
import Gameover from "./components/Gameover"
import useSound from "use-sound"
import correctSFX from "./assets/audio/correct.mp3"
import wrongSFX from "./assets/audio/wrong.mp3"
import usePokemonProvider from "./hooks/usePokemonProvider"

const DELAY = 1000

function App() {
    const {
        loading,
        pokeList,
        rightPoke,
        score,
        addScore,
        nextRound,
        revealMon,
        revealAnswer,
        canSelect,
        setCanSelect,
        isPlaying,
        startGame,
        playAgain,
        gameover,
        quitGame,
    } = usePokemonProvider()

    const [playCorrectSFX] = useSound(correctSFX)
    const [playWrongSFX] = useSound(wrongSFX, { volume: 0.3 })

    async function evaluateAnswer(id) {
        setCanSelect(false) // prevent clicking answer multiple times
        revealAnswer(true)

        if (rightPoke.id === id) {
            addScore()
            playCorrectSFX()
            confetti({
                particleCount: 50,
                origin: {
                    x: 0.5,
                    y: 1,
                },
                scalar: 2,
            })
            setTimeout(() => {
                nextRound()
            }, DELAY)
        } else {
            playWrongSFX()
            setTimeout(() => {
                quitGame()
            }, DELAY)
        }
    }

    return (
        <div className="mx-auto h-screen max-w-xl bg-yellow-200">
            {isPlaying ? (
                loading ? (
                    <Loading />
                ) : gameover ? (
                    <Gameover
                        score={score}
                        retry={playAgain}
                    />
                ) : (
                    <>
                        <div className="bg-red-400">
                            <h3 className="text-center text-xl">
                                Score: {score}
                            </h3>
                        </div>
                        <div className="">
                            <Pokemon
                                pokemon={rightPoke}
                                reveal={revealMon}
                            />
                        </div>
                        <Answers
                            choices={pokeList}
                            reveal={revealMon}
                            pickAnswer={evaluateAnswer}
                            correct={rightPoke}
                            clickable={canSelect}
                        />
                    </>
                )
            ) : (
                <Home setIsPlaying={startGame} />
            )}
        </div>
    )
}

export default App
