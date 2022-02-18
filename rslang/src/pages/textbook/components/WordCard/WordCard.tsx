import { memo, MouseEvent, useCallback, useState } from 'react';

import classNames from 'classnames';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

import { SERVER_URL } from '../../../../consts';
import { DICTIONARY_CATEGORIES } from '../../constants/constants';
import { getTooltipMessage } from '../../utils/getTooltipMesage';

type TWordCardProps = {
  id: string;
  word: string;
  image: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  onPlayWord: (e: MouseEvent) => void;
  onHover: (e: MouseEvent) => void;
  onSelectCard: (id: string) => void;
  onUnSelectCard: (id: string) => void;
  isSelected: boolean;
  isStudied: boolean;
  group?: number;
  isAuthorized?: boolean;
  currCategory?: string;
};

const WordCard = ({
  id,
  word,
  image,
  textMeaning,
  textExample,
  transcription,
  wordTranslate,
  textMeaningTranslate,
  textExampleTranslate,
  onPlayWord,
  onHover,
  onSelectCard,
  onUnSelectCard,
  group,
  isAuthorized,
  currCategory,
  isSelected,
  isStudied,
}: TWordCardProps) => {
  const [selected, setSelected] = useState(false);
  const handleSelectCard = useCallback(() => {
    onSelectCard(id);
    setSelected(true);
  }, [id, onSelectCard]);

  const handleUnSelectCard = useCallback(() => {
    onUnSelectCard(id);
    setSelected(false);
  }, [id, onUnSelectCard]);

  return (
    <Card
      sx={{ maxWidth: 345 }}
      className={classNames('words_list-card', `textbook_word-card-${group}`, {
        'is-selected': selected || isSelected,
        'is-studied': isStudied,
      })}
      id={word}
      onMouseEnter={onHover}
    >
      <CardMedia
        component="img"
        height="170"
        image={`${SERVER_URL}/${image}`}
        alt={word}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          textAlign="right"
          component="div"
          display="flex"
          alignItems="center"
        >
          <span>{word}</span>
          <CardActions>
            <IconButton aria-label="volume" onClick={onPlayWord}>
              <VolumeUpIcon />
            </IconButton>
          </CardActions>
          <CardActions>
            <Tooltip title={getTooltipMessage(currCategory)}>
              <IconButton
                id={id}
                aria-label="add"
                onClick={handleSelectCard}
                className={classNames({
                  'is-unauthorized': !isAuthorized,
                })}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить из сложных слов">
              <IconButton
                aria-label="remove"
                onClick={handleUnSelectCard}
                className={classNames({
                  'is-unauthorized': !isAuthorized,
                  'is-difficult':
                    currCategory === '1' || currCategory === '2'
                      ? DICTIONARY_CATEGORIES[0].activeBtn
                      : false,
                })}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Typography>
        <Typography variant="subtitle1" textAlign="right">
          {wordTranslate} {transcription}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="right">
          {textMeaning.replace(/<\/?[a-zA-Z]+>/gi, '')}
        </Typography>
        <Typography variant="body2" textAlign="right">
          {textExample.replace(/<\/?[a-zA-Z]+>/gi, '')}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="right">
          {textMeaningTranslate}
        </Typography>
        <Typography variant="body2" textAlign="right">
          {textExampleTranslate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(WordCard);
