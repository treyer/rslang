import { HeaderType, TGameResults } from '../../General/types';
import ResultHeader from '../ResultHeader/ResultHeader';
import ResultWord from '../ResultWord/ResultWord';
import './GameResults.scss';

const GameResults = ({
  correctCount,
  wrongCount,
  correctWords,
  wrongWords,
}: TGameResults) => {
  return (
    <div>
      <ResultHeader
        headerName="Ошибок"
        headerValue={wrongCount}
        headerType={HeaderType.wrong}
      />
      <div className="game-results-wrong-wrapper">
        {wrongWords.map((el) => (
          <ResultWord
            key={`${el.wordTranslate}`}
            word={el.word}
            wordTranslate={el.wordTranslate}
            audioSrc={el.audio}
          />
        ))}
      </div>
      <ResultHeader
        headerName="Знаю"
        headerValue={correctCount}
        headerType={HeaderType.correct}
      />
      <div className="game-results-correct-wrapper">
        {correctWords.map((el) => (
          <ResultWord
            key={`${el.wordTranslate}`}
            word={el.word}
            wordTranslate={el.wordTranslate}
            audioSrc={el.audio}
          />
        ))}
      </div>
    </div>
  );
};

export default GameResults;
