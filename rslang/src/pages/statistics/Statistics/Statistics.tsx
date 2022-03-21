import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import StatisticsTableContainer from '../StatisticsTableContainer/StatisticsTableContainer';
import UsersStatisticAPI from '../../../api/usersStatisticAPI';
import { TOptionalStatistic, TStatistic } from '../../../api/types';

import './Statistics.scss';
import { TStatisticType } from '../../../General/types';

const Statistics = () => {
  const [learnedCounterWord, setLearnedCounterWord] = useState(0);
  const [optional, setOptional] = useState<TOptionalStatistic>({});

  useEffect(() => {
    const userId = `${localStorage.getItem('userId')}`;
    const token = `${localStorage.getItem('token')}`;
    UsersStatisticAPI.getStatistics(userId, token, (data: TStatistic) => {
      setLearnedCounterWord(data.learnedWords);
      if (data.optional) setOptional(data.optional);
    });
  }, []);

  return (
    <div className="App-statistics">
      <div className="statistics_container">
        <Typography variant="h4" component="h3" marginBottom="15px">
          Общая статистика за день
        </Typography>
        <StatisticsTableContainer
          learnedCounterWord={learnedCounterWord}
          optional={optional}
          statisticType={TStatisticType.common}
        />
        <Typography
          variant="h4"
          component="h3"
          marginBottom="15px"
          marginTop="15px"
        >
          Статистика по играм
        </Typography>
        <Typography variant="h5" component="h3" marginBottom="15px">
          Аудиовызов
        </Typography>
        <StatisticsTableContainer
          learnedCounterWord={learnedCounterWord}
          optional={optional}
          statisticType={TStatisticType.audio}
        />
        <Typography
          variant="h5"
          component="h3"
          marginBottom="15px"
          marginTop="15px"
        >
          Спринт
        </Typography>
        <StatisticsTableContainer
          learnedCounterWord={learnedCounterWord}
          optional={optional}
          statisticType={TStatisticType.sprint}
        />
      </div>
    </div>
  );
};

export default Statistics;
