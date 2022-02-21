import { useEffect } from 'react';

type TAnswer = {
  answerText: string;
  index: number;
  correctAnswer: string;
  currentAnswer: string;
  onSelectAnswer: (answerText: string) => void;
};

const Answer = ({
  answerText,
  index,
  correctAnswer,
  currentAnswer,
  onSelectAnswer,
}: TAnswer) => {
  const numberMap = ['1', '2', '3', '4', '5'];
  const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  const isWrongAnswer =
    currentAnswer === answerText && currentAnswer !== correctAnswer;
  const correctAnswerClass = isCorrectAnswer ? 'correct-answer' : '';
  const wrongAnswerClass = isWrongAnswer ? 'wrong-answer' : '';
  const disabledClass = currentAnswer ? 'disabled-answer' : '';

  useEffect((): (() => void) => {
    if (isCorrectAnswer) {
      const soundCorrect = new Audio('/assets/audio/correct-answer.mp3');
      soundCorrect.play();
    }
    return () => {};
  }, [isCorrectAnswer]);

  return (
    <div
      className={`audio-answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => onSelectAnswer(answerText)}
    >
      <div className="audio-answer_number">{numberMap[index]}</div>
      <div className="audio-answer_text">{answerText}</div>
    </div>
  );
};

export default Answer;
