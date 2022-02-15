import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

type TTextbookGamesButtonProps = {
  path: string;
  name: string;
  className: string;
};

const TextbookGamesButton = ({
  path,
  name,
  className,
}: TTextbookGamesButtonProps) => (
  <Button
    component={Link}
    to={`${path}`}
    variant="contained"
    className={className}
  >
    <span className="textbook_games-button-title">{name}</span>
  </Button>
);

export default memo(TextbookGamesButton);
