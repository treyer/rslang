import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { SERVER_URL } from '../../../../consts';

const GameSprintLevel = () => {
  return (
    <div className="App-games">
      <div className="games-container">
        <Card sx={{ maxWidth: 500, height: 500 }}>
          <CardMedia
            component="img"
            height="300"
            image={`${SERVER_URL}/files/01_0001.jpg`}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Спринт
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Next
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default GameSprintLevel;
