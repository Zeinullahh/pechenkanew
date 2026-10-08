"use client";

import PolicyLayout from "./PolicyLayout";
import WebJurisdictionSelector from "./WebJurisdictionSelector";

const base = "/policies/ai-csd/web";

const copy = {
  en: {
    title: "Web Security — UAE",
    subtitle: "Cookie Notice",
    region: "ae",
    prefix: "/en/ae",
    sections: [
      { id: "scope", title: "1. Scope", body: "This notice covers browser cookies and similar device storage used when accessing the Web Security console and related account pages supplied under an order with Silence AI LLC, Licence Number 2539365.01, Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. The console is https://web.csd.silenceai.net. Protection of a customer site can use a different IP or hostname. Cookies used on that customer's site are also subject to its own notice." },
      { id: "purposes", title: "2. Purposes", body: "The console may use essential storage for sign-in sessions, security, preferences and operation. Optional analytics or marketing technology, if enabled, requires the choice or consent required by applicable law. The active cookie inventory, providers and durations depend on the deployed console and can be requested at info@silenceai.net; this notice does not assert that every cookie is essential." },
      { id: "other-services", title: "3. Separate services", body: "The separately deployed sign-in/SSO service may set its own cookies. Its operator, domain and privacy notice must be identified in onboarding materials. A payment checkout may also set cookies for fraud prevention and transactions. For online purchases under an agreement with Silence AI LLC in the UAE, Paddle.com handles payment as authorized reseller and merchant of record. The displayed checkout identifies the applicable Paddle entity and payment terms." },
      { id: "choice", title: "4. Choices and contact", body: "You can control cookies through browser settings; blocking essential session storage may prevent sign-in. Where optional cookies are used, the applicable consent controls must allow the choices required by law. For access, deletion or other data requests, contact info@silenceai.net. Our Privacy Policy explains the controller and processor roles, retention and statutory rights." },
    ],
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  ru: {
    title: "Web Security — Казахстан",
    subtitle: "Уведомление о cookie",
    region: "kz",
    prefix: "/ru/kz",
    sections: [
      { id: "scope", title: "1. Область действия", body: "Уведомление относится к cookie и аналогичному хранению в браузере при доступе к консоли Web Security и связанным страницам аккаунта по заказу с ТОО «Silence AI», БИН 250840004804. Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж. Консоль: https://kz.web.csd.silenceai.net. Защита сайта клиента может использовать другой IP-адрес или домен. Cookie на самом сайте клиента также регулируются его уведомлением." },
      { id: "purposes", title: "2. Цели", body: "Консоль может использовать необходимые данные браузера для сеанса входа, безопасности, настроек и работы сервиса. Необязательная аналитика или маркетинговые технологии, если они включены, требуют выбора или согласия согласно применимому закону. Действующий перечень cookie, провайдеров и сроков зависит от развёртывания; его можно запросить по info@silenceai.net. Настоящее уведомление не утверждает, что все cookie являются необходимыми." },
      { id: "other-services", title: "3. Отдельные сервисы", body: "Отдельно развёрнутый сервис входа/SSO может устанавливать собственные cookie. Его оператор, домен и политика должны быть указаны в материалах подключения. Платёжная форма также может использовать cookie для защиты от мошенничества и проведения платежа. Платежи по договорам с ТОО «Silence AI» в Казахстане обрабатывает ТОО «ФинCeрвисы». Реальная платёжная форма указывает применимые условия и получателя платежа." },
      { id: "choice", title: "4. Выбор и контакт", body: "Управлять cookie можно в настройках браузера; блокирование необходимых данных сеанса может помешать входу. При использовании необязательных cookie должны предоставляться предусмотренные законом элементы выбора. Запросы о доступе, удалении и других правах направляйте на info@silenceai.net. Политика конфиденциальности описывает роли сторон, хранение и законные права." },
    ],
    privacy: "Политика конфиденциальности",
    terms: "Условия предоставления услуг",
  },
};

export default function WebCookieNotice({ locale }) {
  const lang = locale === "ru" ? "ru" : "en";
  const data = copy[lang];
  return (
    <PolicyLayout title={data.title} subtitle={data.subtitle} sections={data.sections.map(({ id, title }) => ({ id, title }))}>
      <WebJurisdictionSelector policy="cookies" active={data.region} locale={lang} />
      {data.sections.map((section) => (
        <section id={section.id} key={section.id} lang={lang}>
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          <p className="mb-4">{section.body}</p>
        </section>
      ))}
      <p className="flex gap-4 text-sm"><a className="text-blue-400 underline" href={`${data.prefix}${base}/privacy/`}>{data.privacy}</a><a className="text-blue-400 underline" href={`${data.prefix}${base}/terms_of_service/`}>{data.terms}</a></p>
      <p className="mt-8 text-sm text-gray-400">{lang === "ru" ? "Обновлено 7 октября 2026 года." : "Updated 7 October 2026."}</p>
    </PolicyLayout>
  );
}
