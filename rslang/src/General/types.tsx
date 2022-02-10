import { MouseEvent } from 'react';

export type TPath = {
  id: number;
  routePath: string;
  title: string;
  element: JSX.Element;
};

export type TLevelGameProps = {
  id: string;
  code: string;
  onHover: (e: MouseEvent) => void;
};
