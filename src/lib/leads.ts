import { siteConfig } from "../config";

export function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits === "8" || digits === "7") return "+7 (";
  if (digits.startsWith("8") || digits.startsWith("7")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (!digits) return "";
  let result = `+7 (${digits.slice(0, 3)}`;
  if (digits.length >= 3) result += ")";
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`;
  return result;
}

export async function submitLead(data: FormData, formId: string) {
  data.set("consent", "true");
  data.set("consentVersion", siteConfig.consentVersion);
  data.set("formId", formId);
  const response = await fetch("/api/leads", {
    method: "POST",
    body: data,
    headers: { "Idempotency-Key": crypto.randomUUID() },
  });
  const result = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку");
  window.dispatchEvent(new CustomEvent("lead-submit-success"));
}
