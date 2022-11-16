function Gameover({ score, retry }) {
  return (
    <div className="gameover">
      <div className="gameover-message">
        <div className="heading">
          <h1>Gameover!</h1>
        </div>
        <div className="high-score">
          <h2>
            Score: <br /> {score}
          </h2>
        </div>
        <div className="sub">
          <p>You picked the wrong pokemon.</p>
        </div>
        <div className="action">
          <button className="btn btn-retry" onClick={() => retry()}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gameover;
