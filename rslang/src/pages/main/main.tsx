import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Main = () => {
  return (
    <div className="App-main">
      <div className="main-section-start">
        <Card className="main-card">
          <CardMedia
            component="img"
            alt="board"
            width={500}
            height={500}
            image="/assets/bg/board.jpg"
          />
        </Card>
        <Card className="main-card">
          <CardContent>
            <Typography variant="h2" paddingTop={15} height={100}>
              RSLang
            </Typography>
            <Typography
              variant="h4"
              paddingTop={5}
              paddingBottom={8}
              height={100}
            >
              Начните изучать английский язык уже сегодня!
            </Typography>
            <Typography variant="h6">
              * Пройдите регистрацию, чтобы использовать все возможности
              приложения.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div
        className="main-container-paral"
        style={{
          backgroundImage: `url(/assets/bg/london5.png)`,
        }}
      />
      <div className="main-container">
        <Typography variant="h4" paddingTop={0}>
          Преимущества приложения
        </Typography>
      </div>
      <div className="main-section_end">
        <Card sx={{ maxWidth: 300 }} className="main-card">
          <CardMedia
            component="img"
            alt="img"
            width={200}
            height={300}
            image="/assets/img/pre-intermediate.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Учебник
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Содержит более 3500 слов разного уровня сложности. Для удобства
              изучения созданы 6 разделов по уровням сложности.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300 }} className="main-card">
          <CardMedia
            component="img"
            alt="img"
            width={200}
            height={300}
            image="/assets/img/advanced.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Словарь
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Содержит слова,которые использовал пользователь ( сложные,
              изучаемые и уже изученные слова ). Необходима авторизация.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300 }} className="main-card">
          <CardMedia
            component="img"
            alt="img"
            width={200}
            height={300}
            image="/assets/img/proficiency.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Игры
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Данный раздел содержит 2 мини-игры: Спринт и Аудиовызов. Хороший
              способ закрепить изученные слова. Доступны и неавторизованным
              пользавателям.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300 }} className="main-card">
          <CardMedia
            component="img"
            alt="img"
            width={200}
            height={300}
            image="/assets/img/intermediate.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Статистика
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Данный раздел содержит краткосрочную статистику по играм и по
              словам за kaftan день изучения. Доступно Boche авторизации.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Main;
