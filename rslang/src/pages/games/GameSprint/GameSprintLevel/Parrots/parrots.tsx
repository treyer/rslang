import { useState, useEffect } from 'react';
import { TCorrectAnsCount } from '../../../../../General/types';

import './parrots.scss';

const Parrots = ({ correctAnswersCount }: TCorrectAnsCount) => {
  const [displayParrot2, setDisplayParrot2] = useState(false);
  const [displayParrot3, setDisplayParrot3] = useState(false);
  const [displayParrot4, setDisplayParrot4] = useState(false);

  useEffect(() => {
    if (correctAnswersCount === 0) {
      setDisplayParrot2(false);
      setDisplayParrot3(false);
      setDisplayParrot4(false);
    }
    if (correctAnswersCount >= 4) {
      setDisplayParrot2(true);
    }
    if (correctAnswersCount >= 8) {
      setDisplayParrot3(true);
    }
    if (correctAnswersCount >= 12) {
      setDisplayParrot4(true);
    }
  }, [correctAnswersCount]);

  return (
    <div className="parrots-wrapper">
      <div
        className="branch"
        style={{
          backgroundImage: `url(/assets/img/branch.png)`,
        }}
      />
      <div
        className="parrot-1"
        style={{
          backgroundImage: `url(/assets/img/parrot-1.png)`,
        }}
      />
      {displayParrot2 && (
        <div
          className="parrot-2"
          style={{
            backgroundImage: `url(/assets/img/parrot-2.png)`,
          }}
        />
      )}
      {displayParrot3 && (
        <div
          className="parrot-3"
          style={{
            backgroundImage: `url(/assets/img/parrot-3.png)`,
          }}
        />
      )}
      {displayParrot4 && (
        <div
          className="parrot-4"
          style={{
            backgroundImage: `url(/assets/img/parrot-4.png)`,
          }}
        />
      )}
    </div>
  );
};

export default Parrots;
