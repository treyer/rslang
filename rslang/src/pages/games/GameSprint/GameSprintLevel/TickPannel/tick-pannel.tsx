import { useState, useEffect } from 'react';
import { TCorrectAnsCount } from '../../../../../General/types';
import Tick from '../Tick/tick';
import './tick-pannel.scss';

const TickPannel = ({ correctAnswersCount }: TCorrectAnsCount) => {
  const [statusTick1, setStatusTick1] = useState(false);
  const [statusTick2, setStatusTick2] = useState(false);
  const [statusTick3, setStatusTick3] = useState(false);

  useEffect(() => {
    if (
      correctAnswersCount === 4 ||
      correctAnswersCount === 8 ||
      correctAnswersCount === 0
    ) {
      setStatusTick1(false);
    } else {
      setStatusTick1(true);
    }

    if (
      correctAnswersCount === 2 ||
      correctAnswersCount === 3 ||
      correctAnswersCount === 6 ||
      correctAnswersCount === 7 ||
      correctAnswersCount >= 10
    ) {
      setStatusTick2(true);
    } else {
      setStatusTick2(false);
    }

    if (
      correctAnswersCount === 3 ||
      correctAnswersCount === 7 ||
      correctAnswersCount >= 11
    ) {
      setStatusTick3(true);
    } else {
      setStatusTick3(false);
    }
  }, [correctAnswersCount]);

  return (
    <div
      className="tick-wrapper"
      style={{
        justifyContent: `${
          correctAnswersCount >= 12 ? 'center' : 'space-between'
        }`,
      }}
    >
      {correctAnswersCount < 12 && <Tick status={statusTick1} />}
      <Tick status={statusTick2} />
      {correctAnswersCount < 12 && <Tick status={statusTick3} />}
    </div>
  );
};

export default TickPannel;
