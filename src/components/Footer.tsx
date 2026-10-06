import { SiteImage } from "./SiteImage";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark brand-mark-dark" aria-hidden="true">
            <SiteImage sizes="48px" src="/logo.png" alt="" loading="lazy" />
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
          <a href="#cases">Работы</a>
          <a href="#material">Материалы</a>
          <a href="#process">Этапы</a>
          <a href="#contact">Контакты</a>
          <a href="/privacy">Политика</a>
          <a href="/consent">Согласие</a>
          <a href="/cookies">Cookie</a>
          <a href="/analytics-consent">Аналитика</a>
          <a href="/requisites">Реквизиты и контакты</a>
          <button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>Настройки cookie</button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Мягкие окна МО</span>
        <span>ИП Струков Павел Александрович · ИНН 504813988660 · ОГРНИП 326508100587469</span>
      </div>
    </footer>
  );
}
