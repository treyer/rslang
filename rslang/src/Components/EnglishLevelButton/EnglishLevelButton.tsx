import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import classNames from 'classnames';

type TEnglishLevelButtonProps = {
  id: string;
  code: string;
  level?: string;
  path: string;
  onHover?: (e: MouseEvent) => void;
  currLevel?: string;
};

const EnglishLevelButton = ({
  id,
  code,
  level,
  path,
  onHover,
  currLevel,
}: TEnglishLevelButtonProps) => (
  <Button
    component={Link}
    to={`${path}${id}`}
    id={id}
    key={id}
    variant="contained"
    className={classNames(`textbook_btn textbook_button-${id}`, {
      'textbook_active-btn': id === currLevel,
    })}
    onMouseEnter={onHover}
  >
    <span className="textbook_code-title">{code}</span>
    <span className="textbook_level-title">{level}</span>
  </Button>
);

export default memo(EnglishLevelButton);
