import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#projects", label: "Наши работы" },
  { href: "#material", label: "Материалы" },
  { href: "#process", label: "Как работаем" },
  { href: "#faq", label: "Вопросы" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner glass-surface">
        <a className="brand" href="#top" aria-label="Мягкие окна МО — наверх">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>
            Мягкие окна
            <small>Московская область</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="phone-link" href="tel:+79267254858">
            <Phone size={16} aria-hidden="true" />
            <span>+7 (926) 725-48-58</span>
          </a>
          <a className="button button-small" href="#contact">
            Рассчитать
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <nav className="mobile-nav" aria-label="Мобильная навигация">
            {links.map((link) => (
              <a
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="tel:+79267254858" onClick={() => setIsOpen(false)}>
              +7 (926) 725-48-58
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
