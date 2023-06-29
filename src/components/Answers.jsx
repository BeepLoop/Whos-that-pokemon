import AnswerButton from "./AnswerButton";

function Answers({ choices, reveal, pickAnswer, correct }) {
    return (
        <div className="grid grid-rows-2 rounded-lg bg-slate-100 p-4 shadow-lg shadow-black/20">
            {choices.map((choice) => {
                return (
                    <AnswerButton
                        key={choice.id}
                        choice={choice}
                        reveal={reveal}
                        pickAnswer={pickAnswer}
                        correct={correct}
                    />
                );
            })}
        </div>
    );
}

export default Answers;
