const Footer = () => {
  return (
    <div className="App-footer">
      <div className="footer-container">
        <div className="footer-data">
          <p className="copyright">©</p>
          <p className="year">2022</p>
          <a
            className="github-username"
            href="https://github.com/treyer"
            target="_blank"
            rel="noreferrer"
          >
            Andrei Kazhanenka
          </a>
          <a
            className="github-username"
            href="https://github.com/MarinaPresmytskaia"
            target="_blank"
            rel="noreferrer"
          >
            Marina Presmytskaia
          </a>
          <a
            className="github-username"
            href="https://github.com/vikysan77"
            target="_blank"
            rel="noreferrer"
          >
            Viktoria Tsimakhovich
          </a>
        </div>
        <a
          aria-label="Link"
          className="rss-logo"
          href="https://rs.school/index.html"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundImage: `url(./assets/svg/rss.svg)`,
          }}
        >
          {' '}
        </a>
      </div>
    </div>
  );
};

export default Footer;
