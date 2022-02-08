import { memo } from 'react';

type TTextbookLevelInformation = {
  img: string;
  text: string;
};

const TextbookLevelInformation = ({ img, text }: TTextbookLevelInformation) => (
  <section className="textbook_level-list-section-inform">
    <img src={img} alt="English level img" className="textbook_img" />
    <p className="textbook_level-list-text">{text}</p>
  </section>
);

export default memo(TextbookLevelInformation);
