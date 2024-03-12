import usePokemonProvider from "../hooks/usePokemonProvider"

function Answers({ handleAnswer }) {
    const { pokeList, rightPoke, revealMon, canSelect } = usePokemonProvider()

    return (
        <div className="grid grid-rows-2 rounded-lg bg-slate-100 p-4 shadow-lg shadow-black/20">
            {pokeList.map((choice) => {
                return (
                    <button
                        key={choice.id}
                        className={
                            revealMon
                                ? choice.id === rightPoke.id
                                    ? "choice-btn bg-green-400"
                                    : "choice-btn bg-red-400"
                                : "choice-btn bg-orange-300"
                        }
                        onClick={() => {
                            if (!canSelect) return
                            handleAnswer(choice.id)
                        }}
                    >
                        {choice.name}
                    </button>
                )
            })}
        </div>
    )
}

export default Answers
