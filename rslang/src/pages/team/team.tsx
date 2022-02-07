import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Team = () => {
  return (
    <div className="App-team">
      <div className="team-container">
        <Card sx={{ maxWidth: 400 }} className="team-card">
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image="./assets/img/andrey.jpg"
              alt="andrey"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="team-text"
              >
                Андрей Кожаненко
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="team-text"
              >
                Team lead
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="team-text"
              >
                Координировал команду
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href="https://github.com/treyer"
              target="_blank"
              rel="noreferrer"
              className="team-button"
            >
              GitHub
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 400 }} className="team-card">
          <CardActionArea>
            <CardMedia
              className="ggg"
              component="img"
              height="300"
              image="./assets/img/marina.jpg"
              alt="marina"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="team-text"
              >
                Марина Пресмыцкая
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="team-text"
              >
                Developer
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="team-text"
              >
                Настроила Бекенд
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href="https://github.com/MarinaPresmytskaia"
              target="_blank"
              rel="noreferrer"
              className="team-button"
            >
              GitHub
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 400 }} className="team-card">
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image="./assets/img/vika.jpg"
              alt="viktoria"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="team-text"
              >
                Виктория Тимахович
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="team-text"
              >
                Developer
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="team-text"
              >
                Стартовая верстка.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href="https://github.com/vikysan77"
              target="_blank"
              rel="noreferrer"
              className="team-button"
            >
              GitHub
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Team;
