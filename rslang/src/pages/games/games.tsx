import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Games = () => {
  return (
    <div className="App-games">
      <div className="games-container">
        <Card sx={{ maxWidth: 500, height: 500 }}>
          <CardMedia
            component="img"
            alt="sprint"
            height="300"
            image="./assets/img/sprint1.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Спринт
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Проверьте, сколько очков вы можете получить за одну минуту,
              угадывая слова. С помощью этой игры вы тренируете навык быстрого
              перевода с английского языка на русский.
            </Typography>
          </CardContent>
          <CardActions>
            Выберите сложность:
            <Button size="small">1</Button>
            <Button size="small">2</Button>
            <Button size="small">3</Button>
            <Button size="small">4</Button>
            <Button size="small">5</Button>
            <Button size="small">6</Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 500, height: 500 }}>
          <CardMedia
            component="img"
            alt="sprint"
            height="300"
            image="./assets/img/audio.jpeg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Аудиовызов
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Проверьте,сколько слов вы правильно переведете.С помощью этой игры
              вы улучшите восприятие речи на слух.
            </Typography>
          </CardContent>
          <CardActions>
            Выберите сложность:
            <Button size="small">1</Button>
            <Button size="small">2</Button>
            <Button size="small">3</Button>
            <Button size="small">4</Button>
            <Button size="small">5</Button>
            <Button size="small">6</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Games;
