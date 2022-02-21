import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Games = () => {
  return (
    <div className="App-games">
      <div className="games-container">
        <Card sx={{ maxWidth: 500, height: 600 }} className="games-card">
          <CardMedia
            component="img"
            alt="sprint"
            height="300"
            image="./assets/img/proficiency.jpg"
          />
          <CardContent sx={{ height: 200 }}>
            <Typography gutterBottom variant="h4" component="div">
              Спринт
            </Typography>
            <Typography variant="h6">
              Проверьте, сколько очков вы можете получить за одну минуту,
              угадывая слова. С помощью этой игры вы тренируете навык быстрого
              перевода с английского языка на русский.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={Link}
              to="/games/sprint"
              variant="contained"
              className="games-btn"
            >
              Играть
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 500, height: 600 }} className="games-card">
          <CardMedia
            component="img"
            alt="sprint"
            height="300"
            image="./assets/img/headphones.jpg"
          />
          <CardContent sx={{ height: 200 }}>
            <Typography gutterBottom variant="h4" component="div">
              Аудиовызов
            </Typography>
            <Typography variant="h6">
              Проверьте, сколько слов вы правильно переведете. С помощью этой
              игры вы улучшите восприятие речи на слух.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={Link}
              to="/games/audio"
              variant="contained"
              className="games-btn"
            >
              Играть
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Games;
