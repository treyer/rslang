import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Team = () => {
  return (
    <div className="App-team">
      <div className="team-container">
        <Card sx={{ maxWidth: 400 }} className="team-card">
          <CardActionArea>
            <img
              className="team-img_static"
              src="./assets/img/2GU.jpg"
              alt=""
              width={400}
              height={400}
            />
            <img
              className="team-img_active"
              src="./assets/gif/2GU.gif"
              alt=""
              width={400}
              height={400}
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
            <img
              className="team-img_static"
              src="./assets/img/Ao.jpg"
              alt=""
              width={400}
              height={400}
            />
            <img
              className="team-img_active"
              src="./assets/gif/Ao.gif"
              alt=""
              width={400}
              height={400}
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
            <img
              className="team-img_static"
              src="./assets/img/KHO.jpg"
              alt=""
              width={400}
              height={400}
            />
            <img
              className="team-img_active"
              src="./assets/gif/KHO.gif"
              alt=""
              width={400}
              height={400}
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
