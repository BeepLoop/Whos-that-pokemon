import AnswerButton from "./AnswerButton";

function Answers({ choices, reveal, pickAnswer, correct }) {
    return (
        <div className="bg-slate-100 grid grid-rows-2 p-4 rounded-xl outline outline-1 outline-slate:500 shadow-lg shadow-black/20">
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
