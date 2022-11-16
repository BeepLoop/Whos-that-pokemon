import AnswerButton from "./AnswerButton";

function Answers({ choices, reveal, pickAnswer, correct }) {
  return (
    <div className="answer-tab">
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
