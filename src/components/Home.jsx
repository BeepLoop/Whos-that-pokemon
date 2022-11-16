function Home({ sprite, setIsPlaying }) {
  return (
    <div className="home">
      <div className="title">
        <img
          className="title-img"
          src="https://fontmeme.com/permalink/221116/753590c15b999a216541dcd2d2de56b4.png"
        />
      </div>
      <div className="img-container">
        <img className="home-img" src={sprite} />
      </div>
      <button className="btn btn-play" onClick={() => setIsPlaying()}>
        Play
      </button>
    </div>
  );
}

export default Home;
