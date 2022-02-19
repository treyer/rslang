import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

type TTextbookGamesButtonProps = {
  path: string;
  name: string;
  className?: string;
  disabledBtn?: boolean;
  onClick?: (e: MouseEvent) => void;
  id?: string;
};

const TextbookGamesButton = ({
  disabledBtn,
  path,
  name,
  className,
  id,
  onClick,
}: TTextbookGamesButtonProps) => (
  <Button
    disabled={disabledBtn}
    id={id}
    component={Link}
    to={`${path}`}
    variant="contained"
    className={className}
    onClick={onClick}
  >
    <span className="textbook_games-button-title">{name}</span>
  </Button>
);

export default memo(TextbookGamesButton);
