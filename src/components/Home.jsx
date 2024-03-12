import usePokemonProvider from "../hooks/usePokemonProvider"

function Home() {
    const { startGame } = usePokemonProvider()

    return (
        <div className="red-400 h-screen">
            <div className="">
                <img
                    className="mx-auto"
                    src="https://fontmeme.com/permalink/221116/753590c15b999a216541dcd2d2de56b4.png"
                />
            </div>
            <div className="my-6 mt-24 flex justify-center">
                <button
                    className="h-16 w-32 rounded-md bg-red-400 px-3 py-2 shadow-lg shadow-gray-500/40 hover:contrast-75"
                    onClick={() => startGame()}
                >
                    Play
                </button>
            </div>
        </div>
    )
}

export default Home
