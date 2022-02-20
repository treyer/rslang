import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import StatisticsTableContainer from '../StatisticsTableContainer/StatisticsTableContainer';
import UsersStatisticAPI from '../../../api/usersStatisticAPI';
import { TStatistic } from '../../../api/types';

const Statistics = () => {
  const [learnedCounterWord, setLearnedCounterWord] = useState(0);

  useEffect(() => {
    const userId = `${localStorage.getItem('userId')}`;
    const token = `${localStorage.getItem('token')}`;
    UsersStatisticAPI.getStatistics(userId, token, (data: TStatistic) =>
      setLearnedCounterWord(data.learnedWords),
    );
  }, []);

  return (
    <div className="App-statistics">
      <Typography variant="h4" component="h3">
        Общая статистика за день
      </Typography>
      <StatisticsTableContainer learnedCounterWord={learnedCounterWord} />
      <Typography variant="h4" component="h3">
        Статистика по играм
      </Typography>
      <Typography variant="h5" component="h3">
        Аудиовызов
      </Typography>
      <StatisticsTableContainer learnedCounterWord={learnedCounterWord} />
      <Typography variant="h5" component="h3">
        Спринт
      </Typography>
      <StatisticsTableContainer learnedCounterWord={learnedCounterWord} />
    </div>
  );
};

export default Statistics;
