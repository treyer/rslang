import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useCallback, MouseEvent } from 'react';

import { SERVER_URL } from '../../../consts';
import './TextbookWords.scss';

const TextbookWords = () => {
  const playTextbookWord = useCallback((e: MouseEvent) => {
    const audio = new Audio(`${SERVER_URL}/files/01_0001.mp3`);
    audio.play();
  }, []);

  return (
    <div className="textbook_page">
      <div className="textbook_words-container">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="170"
            image={`${SERVER_URL}/files/01_0001.jpg`}
            alt="agree"
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
              <span>agree</span>
              <CardActions>
                <IconButton aria-label="volume" onClick={playTextbookWord}>
                  <VolumeUpIcon />
                </IconButton>
              </CardActions>
              <CardActions>
                <IconButton aria-label="volume">
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton aria-label="volume">
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </CardActions>
            </Typography>
            <Typography variant="subtitle1" textAlign="right">
              согласна [əgríː]
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="right"
            >
              To <i>agree</i> is to have the same opinion or belief as another
              perso...
            </Typography>
            <Typography variant="body2" textAlign="right">
              The students <b>agree</b> they have too much homework.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="right"
            >
              Согласиться - значит иметь то же мнение или убеждение, что и
              другой че...
            </Typography>
            <Typography variant="body2" textAlign="right">
              Студенты согласны, что у них слишком много домашней работы
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextbookWords;
