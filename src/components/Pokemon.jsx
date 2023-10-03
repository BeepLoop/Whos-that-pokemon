function Pokemon({ pokemon, reveal }) {
    return (
        <div className="my-8 flex justify-center">
            <img
                className={
                    reveal
                        ? "aspect-square w-52 rounded-md outline outline-1 brightness-100"
                        : "aspect-square w-52 rounded-md outline outline-1 brightness-0"
                }
                src={pokemon.sprite}
            />
        </div>
    )
}

export default Pokemon
