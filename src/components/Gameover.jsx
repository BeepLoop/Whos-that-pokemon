function Gameover({ score, retry }) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-slate-100 rounded-lg p-4 shadow-lg shadow-black/20 text-center max-w-md outline outline-1  outline-slate-500">
        <div className="my-4">
          <h1 className="text-2xl font-bold">Gameover!</h1>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-bold text-red-400">
            Score: <br /> {score}
          </h2>
        </div>
        <div className="">
          <p className="text-lg">You picked the wrong pokemon.</p>
        </div>
        <div className="my-4">
          <button className="bg-red-400 px-3 py-2 rounded-md shadow-lg shadow-black/20" onClick={() => retry()}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gameover;
