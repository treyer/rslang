import { memo, MouseEvent } from 'react';
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

import { SERVER_URL } from '../../../../consts';

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
}: TWordCardProps) => (
  <Card sx={{ maxWidth: 345 }} className="textbook_word-card">
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
          <IconButton aria-label="volume" onClick={onPlayWord} id={id}>
            <VolumeUpIcon />
          </IconButton>
        </CardActions>
        <CardActions>
          <IconButton aria-label="add">
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton aria-label="remove">
            <RemoveCircleOutlineIcon />
          </IconButton>
        </CardActions>
      </Typography>
      <Typography variant="subtitle1" textAlign="right">
        {wordTranslate} {transcription}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="right">
        {textMeaning}
      </Typography>
      <Typography variant="body2" textAlign="right">
        {textExample}
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

export default memo(WordCard);
