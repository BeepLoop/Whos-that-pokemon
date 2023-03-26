function Pokemon({ pokemon, reveal }) {
    return (
        <div className="flex justify-center my-8">
            <img className={
                reveal
                    ? "brightness-100 aspect-square w-52 outline outline-1 rounded-md"
                    : "brightness-0 aspect-square w-52 outline outline-1 rounded-md"
            } src={pokemon.sprite} />
        </div>
    );
}

export default Pokemon;
