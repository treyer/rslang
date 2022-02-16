import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

type TEnglishLevelButtonProps = {
  id: string;
  code: string;
  level?: string;
  path: string;
  onHover?: (e: MouseEvent) => void;
};

const EnglishLevelButton = ({
  id,
  code,
  level,
  path,
  onHover,
}: TEnglishLevelButtonProps) => (
  <Button
    component={Link}
    to={`${path}${id}`}
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

export default memo(EnglishLevelButton);
