function Gameover({ score, retry }) {
    return (
        <div className="grid h-screen place-items-center">
            <div className="max-w-md rounded-lg bg-slate-100 p-4 text-center shadow-lg shadow-black/20 outline outline-1  outline-slate-500">
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
                    <button className="rounded-md bg-red-400 px-3 py-2 shadow-lg shadow-black/20 hover:contrast-75" onClick={() => retry()}>
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Gameover;
