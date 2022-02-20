import { Button, Typography } from '@mui/material';
import { HeaderType, THeaderResult } from '../../General/types';
import './ResultHeader.scss';

const ResultHeader = ({
  headerName,
  headerValue,
  headerType,
}: THeaderResult) => {
  const styleWrong = {
    backgroundColor: '#CC3300',
    color: 'white',
    borderRadius: '10px',
  };

  const styleCorrect = {
    backgroundColor: '#33FF66',
    color: 'white',
    borderRadius: '10px',
  };

  return (
    <div className="game-results-header-wrapper">
      <Typography className="game-results-header-name" variant="h5">
        {headerName}
      </Typography>
      <Button
        variant="contained"
        disabled
        className={`game-results-header-value ${
          headerType === HeaderType.correct ? 'result-correct' : ''
        } ${headerType === HeaderType.wrong ? 'result-wrong' : ''}`}
        style={
          // eslint-disable-next-line no-nested-ternary
          headerType === HeaderType.correct
            ? styleCorrect
            : headerType === HeaderType.wrong
            ? styleWrong
            : {}
        }
      >
        {headerValue}
      </Button>
    </div>
  );
};

export default ResultHeader;
