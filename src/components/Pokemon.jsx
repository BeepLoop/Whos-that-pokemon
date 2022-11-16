function Pokemon({ pokemon, reveal }) {
  return (
    <div className="pokemon-img">
      <img className={reveal ? "img" : "img hidden"} src={pokemon.sprite} />
    </div>
  );
}

export default Pokemon;
