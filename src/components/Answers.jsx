function Answers({ choices, reveal, pickAnswer, correct, clickable }) {
    return (
        <div className="grid grid-rows-2 rounded-lg bg-slate-100 p-4 shadow-lg shadow-black/20">
            {choices.map((choice) => {
                return (
                    <button
                        key={choice.id}
                        className={
                            reveal
                                ? choice.id === correct.id
                                    ? "choice-btn bg-green-400"
                                    : "choice-btn bg-red-400"
                                : "choice-btn bg-orange-300"
                        }
                        onClick={() => {
                            if (!clickable) return
                            pickAnswer(choice.id);
                        }}
                    >
                        {choice.name}
                    </button>
                );
            })}
        </div>
    );
}

export default Answers;
