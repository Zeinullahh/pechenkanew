"use client";

import PolicyLayout from "./PolicyLayout";
import WebJurisdictionSelector from "./WebJurisdictionSelector";

const base = "/policies/ai-csd/web";
const kazakhstan = `/ru/kz${base}`;
const uae = `/en/ae${base}`;

const policies = {
  en: {
    title: "AI-CSD 1 Web Security — UAE",
    subtitle: "Terms of Use",
    nav: ["Kazakhstan", "UAE"],
    sections: [
      { id: "about", title: "1. About These Terms", items: [
        ["1.1 Parties and scope", 'These Terms of Use govern the Web Security service supplied under the applicable order by Silence AI LLC, Licence Number 2539365.01, registered at Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. This UAE version applies when that company is the customer’s contracting provider. The actual order or service agreement and deployment region determine the applicable version; language, IP address and URL locale alone do not.'],
        ["1.2 Authority and acceptance", "A person accepting these Terms for an organization represents that they are authorized to do so. The applicable order and Terms of Service determine when acceptance and the subscription take effect. Access through a sign-in portal does not remove the Web Security provider’s obligations."],
        ["1.3 Covered service and access", "The Web Security service comprises the CMC console and incident/log views, supplied agent and active reverse-proxy or WAF protection, related APIs, configuration, telemetry and support included in the order or subscription. The customer console address is provided in onboarding materials. The console provides the IP address for connecting or configuring protection for the customer’s sites; that IP can vary by customer or deployment. A covered proxy, API, site or agent endpoint remains covered when it uses another hostname or IP. The separately deployed authentication/SSO portal is identified in onboarding materials; its domain, operator, applicable terms and privacy notice are stated there. Email Security is a separate service."],
        ["1.4 Eligible users", "Users must meet the eligibility and account requirements in the applicable order and law. An organization is responsible for authorizing its users."],
      ] },
      { id: "service-description", title: "2. Service and Pricing", items: [
        ["2.1 Protection", "The service applies configured protection only to traffic routed through the customer's connected Web Security deployment. Where included and enabled, WAF, IPS and DDoS controls are designed to detect and mitigate threats; they cannot identify or stop every attack. Some malicious requests may pass and some legitimate requests may be blocked. The service does not inspect traffic that the customer has not routed through it. Country controls, port restrictions and other features apply only where enabled and described in the customer's plan or documentation."],
        ["2.2 Included features", "The order or service plan identifies the Web Security features supplied to the customer and any included request or SIEM-storage allowances. Usage and measurement rules apply as stated in that order or plan."],
        ["2.3 Price schedule", "Subscription prices, billing periods and any usage-overage rates are stated in the applicable order, service plan or checkout before charges apply. Silence AI may change prices for a future billing period only after emailing the sign-in address at least 30 calendar days before the new price takes effect, as detailed in Terms of Service Section 6.6. Changes to other terms follow Section 11.6."],
      ] },
      { id: "sla", title: "3. Availability and SLA", items: [
        ["3.1 SLA remedy", "The sole service-availability credit and claim procedure are in the Web Security Terms of Service, Section 6.7. These Terms of Use do not create an additional refund of usage charges during downtime."],
        ["3.2 Claims", "A customer seeking a downtime credit must follow the evidence, timing and calculation rules in Terms of Service Section 6.7."],
        ["3.3 Maintenance", "Maintenance and other exclusions from downtime are those defined in Terms of Service Section 6.7. We will give advance notice when required by that agreement."],
      ] },
      { id: "user-responsibilities", title: "4. Acceptable Use", items: [
        ["4.1 Account security", "Keep account credentials secure, manage authorized users and promptly report suspected unauthorized access."],
        ["4.2 Authorization", "Protect or test only sites, systems and traffic that you own or are authorized to protect or test, and comply with applicable law."],
        ["4.3 Prohibited conduct", "Do not disrupt the service, bypass its security controls, infringe others’ rights or use it to attack unauthorized systems. Documented service APIs and automation approved under the order or documentation are permitted."],
      ] },
      { id: "data-processing", title: "5. Data Processing and Infrastructure", items: [
        ["5.1 Data terms", "The Web Security Terms of Service, including its Section 12 Data Processing Addendum, govern customer-data processing. A customer contracting with Silence AI LLC is provided a Web Security deployment on a server located in the United States or Europe. The location assigned to that customer is identified in the order, plan or linked data-location schedule. Server hosting does not establish the locations of backups, SSO, payment data, support access or subprocessors. Applicable privacy and transfer laws continue to apply."],
      ] },
      { id: "service-activation", title: "6. Subscription and Activation", items: [
        ["6.1 Subscription required", "A Web Security subscription under an order or service plan is required. Pay-as-you-go is only a mechanism for usage above included allowances, not a standalone plan. Onboarding and activation occur as stated in the actual order and service flow; no free trial is promised here."],
        ["6.2 Billing and wallet", "The order or plan controls subscription payment, renewal, any prepaid balance and charges for usage beyond included allowances. Renewal alone does not authorize a recurring card charge. A manual or automatic top-up applies only if offered in the checkout and authorized by the customer; the checkout states its amount, trigger, payment method and cancellation method. Failed payments or additional authentication delay crediting. Terms of Service Section 6.3 controls the details. For online transactions under an agreement with Silence AI LLC in the UAE, Paddle.com handles payment as authorized reseller and merchant of record while Silence AI supplies Web Security. Paddle’s Buyer Terms govern the purchase, and the checkout or invoice identifies the applicable Paddle entity."],
      ] },
      { id: "ip-rights", title: "7. Intellectual Property", items: [
        ["7.1 Provider rights", "Silence AI and its licensors retain rights in the service, software and documentation. The subscription grants only the use rights in the Terms of Service."],
        ["7.2 Customer data", "The customer retains rights in its data and grants the permissions needed to provide the service, as described in the Terms of Service."],
      ] },
      { id: "privacy", title: "8. Privacy and Data Protection", items: [
        ["8.1 Privacy notice", "The applicable Web Security Privacy Policy explains processing for which Silence AI is a controller. It is a notice, not a replacement for the Data Processing Addendum or mandatory data-subject rights."],
        ["8.2 Payment data", "For Paddle purchases, Paddle’s Buyer Terms govern the purchase transaction separately from Silence AI’s service terms, and Paddle’s Privacy Notice explains its own payment-data activities. The payment-data location is distinct from Web Security hosting."],
      ] },
      { id: "cookies", title: "9. Cookies", items: [["9.1 Notice", "The Web Security Cookie Policy explains cookies and similar technologies used for access and operation."]] },
      { id: "liability", title: "10. Liability", items: [
        ["10.1 Service limits", "Security outputs can include false positives and false negatives. The warranties, exclusions and remedies in Terms of Service Sections 3, 6.7 and 9 apply."],
        ["10.2 Liability cap", "The liability cap and exceptions are those in Terms of Service Sections 9.3–9.4; these Terms do not create a different twelve-month cap."],
        ["10.3 Excluded losses", "The exclusions in Terms of Service Section 9.2 apply subject to its exceptions and mandatory law."],
      ] },
      { id: "updates", title: "11. Updates and Support", items: [
        ["11.1 Versions", "Silence AI may update the service as described in Terms of Service Section 3.3. The protection IP supplied for a customer may change under Section 3.3.2."],
        ["11.2 Support", "Support is available through info@silenceai.net as described in Terms of Service Section 3.1."],
      ] },
      { id: "termination", title: "12. Term and Termination", items: [
        ["12.1 Customer cancellation", "Stopping use or closing an account does not itself cancel the agreed subscription term, accrued fees or a separate Paddle purchase. The order, applicable checkout terms and Terms of Service Section 10 govern notice, cancellation and any refund."],
        ["12.2 Suspension and termination", "Silence AI may suspend or terminate only as allowed by the Terms of Service, the order and applicable law. Obligations accrued before termination remain due."],
      ] },
      { id: "indemnification", title: "13. Indemnification", items: [["13.1 Claims", "Any customer indemnity, claim process and exceptions are governed by Terms of Service Section 8. These Terms do not add a broader indemnity."]] },
      { id: "governing-law", title: "14. Governing Law and Disputes", items: [
        ["14.1 Contract law", "The UAE law provision in Terms of Service Section 11.13 governs this service agreement, subject to mandatory law. It does not displace applicable privacy or consumer protections."],
        ["14.2 Notice, negotiation and courts", "A party raising a contractual dispute or alleged non-compliance gives the other written notice describing the issue and requested resolution. The parties attempt good-faith mutual negotiation for 30 calendar days after receipt. If unresolved, either party may bring the dispute before the competent courts in Sharjah, UAE under Terms of Service Section 11.13. Urgent interim relief may be sought sooner. Mandatory consumer and data-subject rights, regulator complaint routes, and a forum required by law remain available. Paddle’s Buyer Terms may apply different law and courts to a Paddle purchase."],
      ] },
      { id: "changes", title: "15. Changes", items: [["15.1 Amendments", "Changes, notice, objections and effective dates follow Terms of Service Section 11.6. Continued use is assessed under that clause and applicable law."]] },
      { id: "contact", title: "16. Contact", items: [["16.1 Provider", 'Silence AI LLC, Licence Number 2539365.01, Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. Legal notices and support: info@silenceai.net.']] },
      { id: "misc", title: "17. Other Terms", items: [
        ["17.1 Severability", "If a provision is unenforceable, the remaining provisions continue to the extent allowed by law."],
        ["17.2 Agreement documents", "These Terms, the applicable Web Security Terms of Service and its DPA, and the customer’s order or service plan form the service agreement. If they conflict, the order controls its commercial specifics, the DPA controls personal-data processing, and the Terms of Service control other legal terms; these Terms of Use describe operational use. Mandatory law prevails. Privacy and Cookie Policies are notices and do not waive statutory rights."],
        ["17.3 Assignment", "Assignment follows Terms of Service Section 11.9."],
      ] },
    ],
  },
  ru: {
    title: "AI-CSD 1 Web Security — Казахстан",
    subtitle: "Условия использования",
    nav: ["Казахстан", "ОАЭ"],
    sections: [
      { id: "about", title: "1. О настоящих Условиях", items: [
        ["1.1 Стороны и предмет", "Настоящие Условия использования регулируют услугу Web Security, предоставляемую по применимому заказу ТОО «Silence AI», БИН 250840004804. Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж. Эта версия применяется при договоре с казахстанской компанией и соответствующем развёртывании. Сторона договора определяется заказом, а не языком, IP-адресом посетителя или локалью URL."],
        ["1.2 Полномочия и принятие", "Лицо, принимающее Условия от имени организации, подтверждает свои полномочия. Момент принятия и начала подписки определяется заказом и Условиями предоставления услуг. Перенаправление на портал входа не прекращает обязанностей поставщика Web Security."],
        ["1.3 Услуга и точки доступа", "Web Security включает консоль CMC и просмотр инцидентов и журналов, предоставленный агент и активную защиту через обратный прокси или WAF, связанные API, конфигурацию, телеметрию и поддержку по заказу или подписке. Адрес клиентской консоли указывается в материалах подключения. В консоли клиенту предоставляется IP-адрес для подключения или настройки защиты своих сайтов; он может различаться между клиентами и развёртываниями. Другой домен или IP защищаемого сайта, прокси, API или агента не исключает его из настоящих Условий. Отдельный портал аутентификации/SSO указывается в материалах подключения; там же указываются его домен, оператор, применимые условия и уведомление о конфиденциальности. Email Security регулируется отдельно."],
        ["1.4 Пользователи", "Пользователи должны соответствовать требованиям заказа и закона; организация управляет доступом своих уполномоченных пользователей."],
      ] },
      { id: "service-description", title: "2. Услуга и цены", items: [
        ["2.1 Защита", "Услуга применяет настроенную защиту только к трафику, направленному через подключённое развёртывание Web Security клиента. Если средства WAF, IPS и защиты от DDoS включены в план и активированы, они предназначены для обнаружения и снижения угроз, но не могут выявить или остановить каждую атаку. Часть вредоносных запросов может пройти, а часть легитимных — быть заблокирована. Трафик, не направленный клиентом через услугу, ею не анализируется. Управление по странам, ограничения портов и другие функции действуют только при включении и описании в плане или документации клиента."],
        ["2.2 Включённые функции", "Заказ или сервисный план определяет предоставляемые клиенту функции Web Security и включённый объём запросов либо хранения журналов SIEM. Правила измерения и использования действуют согласно заказу или плану."],
        ["2.3 Тарифы", "Цена подписки, период оплаты и возможные ставки за превышение включённого объёма указываются в применимом заказе, сервисном плане или форме оплаты до начисления платы. Silence AI вправе менять цены для будущего расчётного периода только после уведомления по адресу электронной почты, используемому для входа, не менее чем за 30 календарных дней до вступления новой цены в силу согласно Разделу 6.6 Условий предоставления услуг. Иные изменения регулируются Разделом 11.6."],
      ] },
      { id: "sla", title: "3. Доступность и SLA", items: [
        ["3.1 Компенсация по SLA", "Единственный кредит за недоступность услуги и порядок подачи требования приведены в Разделе 6.7 Условий предоставления услуг Web Security. Настоящие Условия не создают дополнительного возврата платы за использование во время простоя."],
        ["3.2 Требование", "При обращении за кредитом клиент соблюдает правила о сроках, доказательствах и расчёте из Раздела 6.7 Условий предоставления услуг."],
        ["3.3 Техническое обслуживание", "Исключения из времени простоя, включая обслуживание, определены Разделом 6.7 Условий предоставления услуг. Предварительное уведомление направляется, когда оно предусмотрено Соглашением."],
      ] },
      { id: "user-responsibilities", title: "4. Допустимое использование", items: [
        ["4.1 Безопасность аккаунта", "Обеспечивайте сохранность учётных данных, управляйте доступом пользователей и своевременно сообщайте о подозрении на несанкционированный доступ."],
        ["4.2 Разрешение", "Защищайте или тестируйте только сайты, системы и трафик, которыми владеете или в отношении которых имеете разрешение, и соблюдайте применимый закон."],
        ["4.3 Запреты", "Запрещено нарушать работу услуги, обходить её защиту, нарушать права других лиц или атаковать системы без разрешения. Документированные API и согласованная автоматизация разрешены."],
      ] },
      { id: "data-processing", title: "5. Обработка данных и инфраструктура", items: [
        ["5.1 Условия обработки", "Обработка данных клиента регулируется Условиями предоставления услуг Web Security, включая DPA в Разделе 12. Серверы казахстанского клиентского развёртывания, по заявленной схеме, находятся в Казахстане. Это не устанавливает местонахождение резервных копий, SSO, платёжных данных, доступа поддержки и субобработчиков. Применимые требования к данным и передаче сохраняются."],
      ] },
      { id: "service-activation", title: "6. Подписка и активация", items: [
        ["6.1 Обязательная подписка", "Для Web Security требуется подписка по заказу или сервисному плану. Оплата по факту использования применяется только к превышению включённого объёма и не является отдельным тарифом. Порядок подключения определяется фактическим заказом и интерфейсом; бесплатный пробный период настоящими Условиями не обещается."],
        ["6.2 Оплата и баланс", "Заказ или план определяет оплату подписки, продление, предоплаченный баланс и плату за превышение включённого объёма. Само продление не разрешает периодическое списание с карты. Ручное или автоматическое пополнение применяется, только если оно предложено в форме оплаты и разрешено клиентом; форма указывает сумму, условие списания, способ оплаты и отмены. При неудачном платеже или дополнительной аутентификации баланс не пополняется до успешной оплаты. Подробности определяет Раздел 6.3 Условий предоставления услуг. Для договоров с ТОО «Silence AI» в Казахстане платежи обрабатывает ТОО «ФинCeрвисы». Форма оплаты и счёт указывают получателя платежа и применимые условия."],
      ] },
      { id: "ip-rights", title: "7. Интеллектуальная собственность", items: [
        ["7.1 Права поставщика", "Права на услугу, программное обеспечение и документацию принадлежат Silence AI или его лицензиарам. Объём права использования определён Условиями предоставления услуг."],
        ["7.2 Данные клиента", "Клиент сохраняет права на свои данные и предоставляет разрешения, необходимые для оказания услуги, согласно Условиям предоставления услуг."],
      ] },
      { id: "privacy", title: "8. Конфиденциальность и защита данных", items: [
        ["8.1 Уведомление", "Применимая Политика конфиденциальности Web Security описывает обработку данных, за которую Silence AI отвечает как оператор. Она не заменяет DPA и не отменяет обязательные права субъектов данных."],
        ["8.2 Платёжные данные", "Платежи по договорам с ТОО «Silence AI» в Казахстане обрабатывает ТОО «ФинCeрвисы». Обработка платёжных данных регулируется условиями и политикой, показанными клиенту при оплате. Местонахождение платёжных данных отличается от местонахождения серверов Web Security."],
      ] },
      { id: "cookies", title: "9. Файлы cookie", items: [["9.1 Уведомление", "Политика cookie Web Security описывает технологии, используемые для доступа к услуге и её работы."]] },
      { id: "liability", title: "10. Ответственность", items: [
        ["10.1 Ограничения услуги", "Результаты защиты могут содержать ложноположительные и ложноотрицательные срабатывания. Гарантии, исключения и средства защиты определены Разделами 3, 6.7 и 9 Условий предоставления услуг."],
        ["10.2 Предел ответственности", "Предел и исключения из него определены Разделами 9.3–9.4 Условий предоставления услуг; настоящие Условия не устанавливают иной предел за 12 месяцев."],
        ["10.3 Исключённые убытки", "Исключения в Разделе 9.2 Условий предоставления услуг применяются с учётом его оговорок и обязательного закона."],
      ] },
      { id: "updates", title: "11. Обновления и поддержка", items: [
        ["11.1 Версии", "Silence AI может обновлять услугу согласно Разделу 3.3 Условий предоставления услуг. Выданный клиенту IP-адрес защиты может изменяться по Разделу 3.3.2."],
        ["11.2 Поддержка", "Поддержка предоставляется через info@silenceai.net согласно Разделу 3.1 Условий предоставления услуг."],
      ] },
      { id: "termination", title: "12. Срок и прекращение", items: [
        ["12.1 Отмена клиентом", "Прекращение использования или закрытие аккаунта само по себе не отменяет согласованный срок подписки и уже начисленные платежи. Уведомление, отмена и возврат регулируются заказом, условиями фактической формы оплаты и Разделом 10 Условий предоставления услуг."],
        ["12.2 Приостановление и расторжение", "Silence AI вправе приостановить доступ или расторгнуть договор только согласно Условиям предоставления услуг, заказу и применимому закону. Обязательства, возникшие до расторжения, сохраняются."],
      ] },
      { id: "indemnification", title: "13. Возмещение убытков", items: [["13.1 Требования", "Возмещение убытков клиентом, порядок рассмотрения требований и исключения регулируются Разделом 8 Условий предоставления услуг. Настоящие Условия не расширяют это обязательство."]] },
      { id: "governing-law", title: "14. Применимое право и споры", items: [
        ["14.1 Право", "Казахстанское право применяется к настоящему договору согласно Разделу 11.13 Условий предоставления услуг с учётом обязательных норм. Это не отменяет применимые нормы о защите данных и потребителей."],
        ["14.2 Уведомление, переговоры и суд", "Сторона, заявляющая о договорном споре или предполагаемом нарушении, письменно уведомляет другую сторону, описывая вопрос и предлагаемое решение. Стороны добросовестно проводят взаимные переговоры в течение 30 календарных дней после получения уведомления. Если спор не урегулирован, каждая сторона может обратиться в компетентный суд Казахстана согласно Разделу 11.13 Условий предоставления услуг и правилам подсудности ГПК РК, включая статью 32 с её ограничениями. За срочными обеспечительными мерами можно обратиться раньше. Обязательные права потребителей и субъектов данных, обращения в государственные органы и установленная законом подсудность сохраняются."],
      ] },
      { id: "changes", title: "15. Изменения", items: [["15.1 Поправки", "Изменения, уведомление, возражения и момент вступления в силу регулируются Разделом 11.6 Условий предоставления услуг и применимым законом."]] },
      { id: "contact", title: "16. Контакты", items: [["16.1 Поставщик", "ТОО «Silence AI», БИН 250840004804. Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж. Юридические уведомления и поддержка: info@silenceai.net."]] },
      { id: "misc", title: "17. Прочие условия", items: [
        ["17.1 Делимость", "Если положение не имеет силы, остальные действуют в объёме, допускаемом законом."],
        ["17.2 Договорные документы", "Настоящие Условия, применимые Условия предоставления услуг Web Security с DPA, а также заказ или сервисный план составляют договор об услуге. При противоречии заказ определяет коммерческие условия, DPA — обработку персональных данных, а Условия предоставления услуг — иные юридические условия; настоящие Условия описывают использование услуги. Обязательные нормы закона имеют преимущество. Политики конфиденциальности и cookie являются уведомлениями и не отменяют законных прав."],
        ["17.3 Уступка", "Уступка регулируется Разделом 11.9 Условий предоставления услуг."],
      ] },
    ],
  },
};

function linksFor(locale, section) {
  const prefix = locale === "ru" ? kazakhstan : uae;
  if (section === "service-description") return [
    [`${prefix}/terms_of_service/`, locale === "ru" ? "Условия предоставления услуг и тарифный порядок" : "Terms of Service and plan terms"],
    ["/#pricing", locale === "ru" ? "Тарифы Web Security на сайте" : "Website Web Security pricing"],
    ["mailto:info@silenceai.net?subject=WebSOC%20plan%20schedule", locale === "ru" ? "Запросить применимый тарифный план" : "Request the applicable plan schedule"],
  ];
  if (section === "data-processing" || section === "liability" || section === "sla" || section === "service-activation" || section === "termination" || section === "indemnification" || section === "governing-law" || section === "changes" || section === "misc") {
    return [[`${prefix}/terms_of_service/`, locale === "ru" ? "Условия предоставления услуг" : "Terms of Service"]];
  }
  if (section === "privacy") {
    return [
      [`${prefix}/privacy/`, locale === "ru" ? "Политика конфиденциальности" : "Privacy Policy"],
      ...(locale === "ru" ? [] : [["https://www.paddle.com/legal/buyer-terms", "Paddle Buyer Terms"], ["https://www.paddle.com/legal/privacy", "Paddle Privacy Notice"]]),
    ];
  }
  if (section === "cookies") return [[locale === "ru" ? "/ru/kz/policies/ai-csd/web/cookies/" : "/en/ae/policies/ai-csd/web/cookies/", locale === "ru" ? "Политика cookie" : "Cookie Policy"]];
  return [];
}

export default function WebTermsOfUse({ locale }) {
  const lang = locale === "ru" ? "ru" : "en";
  const policy = policies[lang];
  return (
    <PolicyLayout title={policy.title} subtitle={policy.subtitle} sections={policy.sections.map(({ id, title }) => ({ id, title }))}>
      <WebJurisdictionSelector policy="terms_of_use" active={lang === "ru" ? "kz" : "ae"} locale={lang} />
      {policy.sections.map((section) => (
        <section id={section.id} key={section.id} lang={lang}>
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          {section.items.map(([label, body]) => <p className="mb-4" key={label}><strong>{label}:</strong> {body}</p>)}
          {linksFor(lang, section.id).length > 0 && <p className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">{linksFor(lang, section.id).map(([href, label]) => <a className="text-blue-400 underline" href={href} key={href}>{label}</a>)}</p>}
        </section>
      ))}
    </PolicyLayout>
  );
}
