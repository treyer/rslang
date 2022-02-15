import { TTickStatus } from '../../../../../General/types';

const Tick = ({ status }: TTickStatus) => {
  return (
    <div
      className="tick"
      style={{
        backgroundImage: `url(/assets/img/${status ? 'tick' : 'no-tick'}.png)`,
        backgroundSize: '30px 30px',
        width: '30px',
        height: '30px',
      }}
    />
  );
};

export default Tick;
