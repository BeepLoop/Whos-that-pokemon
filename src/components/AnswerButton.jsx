function AnswerButton({ choice, reveal, pickAnswer, correct }) {
  return (
    <>
      <button
        className={
          reveal
            ? choice.id === correct.id
              ? "btn btn-answer correct revealed"
              : "btn btn-answer revealed"
            : "btn btn-answer"
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
