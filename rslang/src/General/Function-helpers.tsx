import { TQuestion } from '../Context/audio-context';

export const shuffleAnswers = (question: TQuestion) => {
  const unshuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ];
  return unshuffledAnswers.sort(() => {
    return Math.random() - 0.5;
  });
};

export type TBackendQuestion = {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
};

export const normalQuestions = (backendQuestions: TBackendQuestion[]) => {
  return backendQuestions
    .sort(() => {
      return Math.random() - 0.5;
    })
    .map((backendQuestion, index) => {
      const incorrectAnswers: string[] = [];
      for (let i = 0; i < 4; i += 1) {
        const idx = Math.round(Math.random() * 19);
        if (
          idx !== index &&
          !incorrectAnswers.includes(backendQuestions[idx].wordTranslate)
        ) {
          incorrectAnswers.push(backendQuestions[idx].wordTranslate);
        } else {
          i -= 1;
        }
      }
      return {
        word: backendQuestion.word,
        correctAnswer: backendQuestion.wordTranslate,
        question: backendQuestion.audio,
        incorrectAnswers,
        audioExample: backendQuestion.audioExample,
        audioMeaning: backendQuestion.audioMeaning,
        group: backendQuestion.group,
        id: backendQuestion.id,
        image: backendQuestion.image,
        page: backendQuestion.page,
        textExample: backendQuestion.textExample,
        textExampleTranslate: backendQuestion.textExampleTranslate,
        textMeaning: backendQuestion.textMeaning,
        textMeaningTranslate: backendQuestion.textMeaningTranslate,
        transcription: backendQuestion.transcription,
      };
    });
};
