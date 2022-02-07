import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

type TEnglishLevelButtonProps = {
  id: string;
  code: string;
  level: string;
  onHover: (e: MouseEvent) => void;
};

export const EnglishLevelButton = ({
  id,
  code,
  level,
  onHover,
}: TEnglishLevelButtonProps) => (
  <Button
    component={Link}
    to={`/textbook/words/${id}`}
    id={id}
    key={id}
    variant="contained"
    className={`textbook_btn textbook_button-${id}`}
    onMouseEnter={onHover}
  >
    <span className="textbook_code-title">{code}</span>
    <span className="textbook_level-title">{level}</span>
  </Button>
);
