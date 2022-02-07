type TTextbookLevelInformation = {
  img: string;
  text: string;
};

export const TextbookLevelInformation = ({
  img,
  text,
}: TTextbookLevelInformation) => {
  return (
    <section className="textbook_level-list-section-inform">
      <img src={img} alt="English level img" className="textbook_img" />
      <p className="textbook_level-list-text">{text}</p>
    </section>
  );
};
