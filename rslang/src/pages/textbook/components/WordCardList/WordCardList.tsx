import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  MouseEvent,
} from 'react';
import { TWord } from '../../../../api/types';
import { SERVER_URL } from '../../../../consts';
import { TPlayListCollection } from '../../TextbookWords/TextbookWords';
import WordCard from '../WordCard/WordCard';

import './WordCardList.scss';

type TWordCardListProps = {
  words: TWord[];
  group?: number;
  onSelectCard: (id: string) => void;
  onUnSelectCard: (id: string) => void;
  isAuthorized?: boolean;
};

const WordCardList = ({
  words,
  group,
  onSelectCard,
  onUnSelectCard,
  isAuthorized,
}: TWordCardListProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playList, setPlayList] = useState<TPlayListCollection>({});
  const [playedWordId, setPlayedWordId] = useState('');
  const playedAudio = useMemo(() => {
    const track = playList[playedWordId]?.[currentTrack];
    return track ? new Audio(track) : null;
  }, [currentTrack, playedWordId, playList]);

  const handleCardHover = useCallback((e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) {
      return;
    }

    setPlayedWordId(target.id);
    setCurrentTrack(0);
  }, []);

  const playTextbookWord = useCallback(() => {
    if (!playedAudio) {
      return;
    }

    if (isPlaying) {
      playedAudio.pause();
      setIsPlaying(false);
      return;
    }

    if (!isPlaying) {
      playedAudio.play();
      setIsPlaying(true);
    }
  }, [isPlaying, playedAudio]);

  useEffect(() => {
    if (playedAudio) {
      playedAudio.addEventListener('ended', () => {
        const nextTrack = playList[playedWordId]?.[currentTrack + 1]
          ? currentTrack + 1
          : 0;
        setIsPlaying(false);
        setCurrentTrack(nextTrack);
      });
    }
  }, [playedAudio, playedWordId, currentTrack, playList]);

  useEffect(() => {
    const newPlayList = words.reduce(
      (acc, { word, audio, audioMeaning, audioExample }) => {
        acc[word] = [
          `${SERVER_URL}/${audio}`,
          `${SERVER_URL}/${audioMeaning}`,
          `${SERVER_URL}/${audioExample}`,
        ];

        return acc;
      },
      {} as TPlayListCollection,
    );
    setPlayList(newPlayList);
  }, [words]);

  return (
    <div className="words_list-container">
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
            key={id}
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
            onHover={handleCardHover}
            onSelectCard={onSelectCard}
            onUnSelectCard={onUnSelectCard}
            group={group}
            isAuthorized={isAuthorized}
          />
        ),
      )}
    </div>
  );
};

export default WordCardList;
