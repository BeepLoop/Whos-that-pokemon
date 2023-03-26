function AnswerButton({ choice, reveal, pickAnswer, correct }) {
    return (
        <>
            <button
                className={
                    reveal
                        ? choice.id === correct.id
                            ? "choice-btn bg-green-400"
                            : "choice-btn bg-red-400"
                        : "choice-btn bg-orange-300"
                }
                onClick={() => {
                    pickAnswer(choice.id);
                }}
            >
                {choice.name}
            </button>
        </>
    );
}

export default AnswerButton;
