import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import './TextbookWords.scss';

const TextbookWords = () => {
  return (
    <div className="textbook_page">
      <div className="textbook_words-container">
        <Card variant="outlined">
          <CardActionArea sx={{ maxWidth: 400 }} className="textbook_word">
            <CardMedia
              component="img"
              height="300"
              image="/assets/img/pre-intermediate.jpg"
              alt=""
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="textbok_words-text"
              >
                Слово
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default TextbookWords;
