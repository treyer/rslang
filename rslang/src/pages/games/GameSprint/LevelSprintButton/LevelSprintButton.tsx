import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { TLevelGameProps } from '../../../../General/types';

const LevelSprintButton = ({ id, code, onHover }: TLevelGameProps) => (
  <Button
    component={Link}
    to={`/games/sprint/${code}`}
    id={id}
    key={id}
    variant="contained"
    className={`game_btn game_button-${id}`}
    onMouseEnter={onHover}
  >
    <span className="game_code-title">{code}</span>
  </Button>
);

export default memo(LevelSprintButton);
