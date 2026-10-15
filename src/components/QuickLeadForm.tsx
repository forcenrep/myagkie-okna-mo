import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

import { siteConfig } from "../config";
import { formatPhone, submitLead } from "../lib/leads";

type QuickLeadFormProps = {
  description: string;
  formId: string;
  title: string;
  onSuccess?: () => void;
};

export function QuickLeadForm({ description, formId, title, onSuccess }: QuickLeadFormProps) {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    if (!siteConfig.collectionEnabled) {
      setStatus("Онлайн-заявки пока недоступны. Позвоните нам: +7 (926) 725-48-58.");
      return;
    }
    if (!consent) {
      setStatus("Отметьте согласие на обработку данных.");
      return;
    }
    setSending(true);
    try {
      await submitLead(new FormData(event.currentTarget), formId);
      setSent(true);
      onSuccess?.();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Не удалось отправить заявку");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return <div className="quick-lead-success" role="status"><Check aria-hidden="true" /><strong>Заявка отправлена</strong><span>Скоро позвоним и уточним детали.</span></div>;
  }

  return (
    <form className="quick-lead-form" onSubmit={handleSubmit}>
      <div className="quick-lead-heading"><h2>{title}</h2><p>{description}</p></div>
      <div className="quick-lead-fields">
        <label><span>Ваше имя</span><input name="name" autoComplete="name" placeholder="Ваше имя" /></label>
        <label><span>Телефон</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} placeholder="+7 (___) ___-__-__" /></label>
      </div>
      <button className="quick-lead-submit" type="submit" disabled={sending}>{sending ? "Отправляем…" : "Получить расчёт"}<ArrowRight aria-hidden="true" /></button>
      <label className="quick-lead-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>Согласен с <a href="/consent" target="_blank" rel="noreferrer">обработкой персональных данных</a></span></label>
      {status && <p className="quick-lead-status" role="alert">{status}</p>}
    </form>
  );
}
