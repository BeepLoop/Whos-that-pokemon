function Home({ sprite, setIsPlaying }) {
    return (
        <div className="red-400 h-screen">
            <div className="">
                <img
                    className="mx-auto"
                    src="https://fontmeme.com/permalink/221116/753590c15b999a216541dcd2d2de56b4.png"
                />
            </div>
            <div className="flex justify-center my-4">
                <img className="w-48 aspect-square red-500 outline outline-1 rounded-md brightness-0" src={sprite} />
            </div>
            <div className="flex justify-center my-6">
                <button className="bg-red-400 px-3 py-2 rounded-md h-16 w-32 shadow-lg shadow-gray-500/40" onClick={() => setIsPlaying()}>
                    Play
                </button>
            </div>
        </div>
    );
}

export default Home;
