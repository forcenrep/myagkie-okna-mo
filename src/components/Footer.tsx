export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark brand-mark-dark" aria-hidden="true">
            <span />
          </span>
          <span>
            Мягкие окна
            <small>Московская область</small>
          </span>
        </a>
        <p>
          Мягкие окна для веранд, террас и беседок. Изготовление и монтаж под
          ключ.
        </p>
        <div className="footer-links">
          <a href="#projects">Работы</a>
          <a href="#material">Материалы</a>
          <a href="#process">Этапы</a>
          <a href="#contact">Контакты</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Мягкие окна МО</span>
        <span>Прототип сайта</span>
      </div>
    </footer>
  );
}
