import { useCallback, useState, useMemo, useEffect } from 'react';
import { TWord } from '../../../api/types';
import WordsAPI from '../../../api/wordsAPI';

import { SERVER_URL } from '../../../consts';
import WordCard from '../components/WordCard/WordCard';

import './TextbookWords.scss';

const obj = {
  id: '5e9f5ee35eb9e72bc21af500',
  group: '0',
  page: '4',
  word: 'kilometer',
  image: 'files/05_0097.jpg',
  audio: 'files/05_0097.mp3',
  audioMeaning: 'files/05_0097_meaning.mp3',
  audioExample: 'files/05_0097_example.mp3',
  textMeaning:
    'A <i>kilometer</i> is a unit of measurement that is 1,000 meters.',
  textExample: 'A marathon is 42.2 <b>kilometers</b>.',
  transcription: '[kilάmətər]',
  textExampleTranslate: 'Марафон 42,2 километра',
  textMeaningTranslate:
    'Километр - это единица измерения, которая составляет 1000 метров',
  wordTranslate: 'километ',
};

const TextbookWords = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [words, setWords] = useState<TWord[]>([]);
  const playList = [
    `${SERVER_URL}/${obj.audio}`,
    `${SERVER_URL}/${obj.audioMeaning}`,
    `${SERVER_URL}/${obj.audioExample}`,
  ];
  const audio = useMemo(() => {
    const a = new Audio(playList[currentTrack]);
    return a;
  }, [currentTrack]);
  const playTextbookWord = useCallback(() => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return undefined;
    }

    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      return undefined;
    }

    return undefined;
  }, [isPlaying, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => {
      const nextTrack = playList[currentTrack + 1] ? currentTrack + 1 : 0;
      setIsPlaying(false);
      setCurrentTrack(nextTrack);
    });
  }, [audio]);

  useEffect(() => {
    WordsAPI.getWords(0, 1, (data: TWord[]) => setWords(data));
  }, []);

  return (
    <div className="textbook_page">
      <div className="textbook_words-container">
        {words.map(
          ({
            id,
            word,
            image,
            textMeaning,
            textExample,
            transcription,
            wordTranslate,
            textMeaningTranslate,
            textExampleTranslate,
          }) => (
            <WordCard
              id={id}
              word={word}
              image={image}
              textMeaning={textMeaning}
              textExample={textExample}
              transcription={transcription}
              wordTranslate={wordTranslate}
              textMeaningTranslate={textMeaningTranslate}
              textExampleTranslate={textExampleTranslate}
              onPlayWord={playTextbookWord}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default TextbookWords;
