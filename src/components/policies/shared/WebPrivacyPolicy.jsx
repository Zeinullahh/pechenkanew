"use client";

import PolicyLayout from "./PolicyLayout";
import WebJurisdictionSelector from "./WebJurisdictionSelector";

const base = "/policies/ai-csd/web";
const kz = `/ru/kz${base}`;
const ae = `/en/ae${base}`;

const notices = {
  en: {
    title: "AI-CSD 1 Web Security — UAE",
    subtitle: "Privacy Policy",
    nav: ["Kazakhstan", "UAE"],
    sections: [
      { id: "about", title: "1. About this notice", items: [
        ["1.1 What it covers", "This notice explains personal-data processing connected with the UAE Web Security service, its console, protected traffic, accounts, support and purchases. It is a privacy notice, not a grant of service rights. The Terms of Service and its Data Processing Addendum (DPA) govern service and processor obligations. Email Security has a separate notice."],
        ["1.2 Responsible company", 'The relevant service company is Silence AI LLC, Licence Number 2539365.01, Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. Use this notice when that company and the UAE deployment appear in the actual order. UI language, visitor IP and URL locale do not establish the contracting party. Privacy questions: info@silenceai.net.'],
        ["1.3 Roles", "For protected-site visitors’ request logs and security events, the customer normally determines purposes as controller and Silence AI processes on its documented instructions under the DPA. Silence AI determines purposes for its own console-account administration, support, subscription administration, fraud prevention and service security. Payment providers and a separately operated SSO service may have their own roles; their exact arrangements are described below and in the applicable notices."],
        ["1.4 Service boundary", "The intended UAE console is https://web.csd.silenceai.net. This notice also covers related APIs, the supplied agent, active proxy/WAF, incident and log views, and traffic at protected customer domains or IPs. The console supplies the protection-connection IP for each deployment; that IP can change or differ by customer. The separately deployed sign-in/SSO portal’s actual domain, operator and notice must be identified in onboarding materials after verification. A sign-in redirect does not remove Silence AI’s Web Security obligations."],
      ] },
      { id: "information", title: "2. Data and sources", items: [
        ["2.1 Customer personnel", "Customers and their staff may supply names, work contact details, organization, account identifiers, role and configuration choices, support messages and billing contacts. The console or separate SSO service may supply account/session identifiers. This notice does not assume that the CMC stores passwords or full payment-card numbers."],
        ["2.2 Website visitors", "Protected-site traffic and security systems may provide visitor IP addresses, request URIs, timestamps, HTTP headers, user-agent strings, country indicators, traffic and attack metadata, incident records, and agent/edge telemetry. The customer controls which sites and traffic are connected."],
        ["2.3 Other records", "Depending on features actually enabled, we may receive wallet and transaction references, audit and diagnostic logs, cookie or device data, and support attachments. AI features may process prompts, responses, tool results, provider or model settings and selected security data if configured. The actual AI provider and data sent must be disclosed in the deployment’s current subprocessor or data-flow schedule before use."],
      ] },
      { id: "purposes", title: "3. Purposes and roles", items: [
        ["3.1 Customer instructions", "As processor, Silence AI analyzes traffic routed through the customer's configured Web Security deployment to provide the proxy/WAF service, incident and log views, subject to the customer's instructions and DPA. Where included and enabled, WAF, IPS and DDoS controls are designed to detect and mitigate threats; they cannot identify or stop every attack. Malicious requests may pass and legitimate requests may be blocked. Traffic not routed through the service is outside this protection. We do not repurpose identifiable visitor logs for independent marketing or product analytics merely because this notice mentions improvement."],
        ["3.2 Our account operations", "As controller for our own activities, we administer accounts and subscriptions, respond to support requests, maintain audit trails, secure the service, detect fraud and meet invoice or legal duties. These account and administration purposes do not expand the traffic covered by the customer's configured protection. We may use genuinely aggregated or de-identified service statistics for capacity planning and improvement; we do not present identifiable customer activity to other customers as evidence of traction."],
        ["3.3 AI processing", "AI-assisted analysis applies only to enabled features and the DPA instructions for customer-controlled data. Before enabling an AI feature, we will identify its provider, processing location, data sent (including any security-tool results), and retention in the deployment's data-flow information available from info@silenceai.net."],
      ] },
      { id: "recipients", title: "4. Recipients and payments", items: [
        ["4.1 Payment transactions", "A Web Security subscription is required; usage over its included allowance is intended to debit a prepaid WebSOC balance. Manual funding may be offered, while automatic threshold top-up is planned and requires separate authorization if deployed. For online sales under agreements with Silence AI LLC in the UAE, Paddle.com handles checkout, billing and collection as authorized reseller and merchant of record, and relevant Paddle companies act as controllers for their own payment activities. Under its Buyer Terms the buyer-facing entity is Paddle.com Inc. for US buyers, Paddle.com (Canada) Ltd. for Canadian buyers, or Paddle.com Market Limited (England and Wales, number 8172165, 30 Old Bailey, London EC4M 7AU, UK) for buyers elsewhere. Silence AI may receive purchaser identity, invoice, subscription, transaction status, wallet credit and limited payment-method references needed for administration; the actual fields and invoice issuer must match the live checkout. Card numbers, card-network and fraud-service flows require separate verification. Paddle is not automatically a subprocessor of Web Security visitor logs."],
        ["4.2 Other recipients", "Depending on the actual deployment, recipients may include hosting and object-storage providers, backup and monitoring services, support providers, the separate SSO operator and enabled AI model providers. Service subprocessors act under the DPA; independent controllers follow their own notices. The current non-sensitive subprocessor list and relevant locations can be requested from info@silenceai.net. We may also disclose data when required by law."],
      ] },
      { id: "retention", title: "5. Retention and deletion", items: [
        ["5.1 Traffic and SIEM", "A 90-day default for web-server logs, changeable by the customer, and 7-, 30- and 90-day SIEM choices are planned. Until a setting is available for the customer's deployment, the retention period stated in the order or data-retention schedule applies. Raw web logs, structured security events, incidents and backups may have different periods. Ask info@silenceai.net for the period applying to each category and when a requested change takes effect. The 25 GB included SIEM storage allowance is a capacity limit, not a retention period."],
        ["5.2 Other categories", "Account and support records are kept while needed to administer the active relationship and resolve requests, then according to a documented deletion schedule. Transaction and invoice records are kept for the applicable tax, accounting and dispute periods. AI conversations, prompts, audit and diagnostic records follow the configured feature and security schedules; those periods must be disclosed for the active deployment. Backups expire under their documented rotation and may lag primary deletion. We do not promise a single period for every category."],
        ["5.3 End of service", "For customer-controlled data, the customer may request return or deletion under the DPA, subject to legal retention and backup cycles. For data Silence AI controls, account users may request deletion where applicable; records required for invoices, disputes, security or law may be retained for the relevant period. Contact us for the active retention schedule and deletion status."],
      ] },
      { id: "rights", title: "6. Individual rights", items: [
        ["6.1 Account users", "For account, billing, support and service-administration data that Silence AI controls, account users may request access, correction, deletion, restriction, objection or portability where applicable law grants those rights. Contact info@silenceai.net; we will verify the request and respond within the period required by that law. If GDPR applies, its ordinary response period is one month, subject to permitted extensions. Relevant users may complain to the competent data-protection authority."],
        ["6.2 Protected-site visitors", "The customer whose protected site was visited normally controls the resulting traffic, incident and log data and is primarily responsible for receiving and answering visitor rights requests. Visitors should identify and contact that customer using the site's privacy notice. If a visitor contacts Silence AI about customer-controlled data, we will, where possible, direct or pass the request to the customer and provide reasonable assistance under DPA Section 12.9. The customer decides how to respond; Silence AI cannot independently promise deletion or other action on customer-controlled data."],
      ] },
      { id: "security", title: "7. Security", items: [
        ["7.1 Safeguards", "We use access controls, transport encryption, logging and operational security measures appropriate to the service. The exact measures for a deployment, including encryption at rest, MFA, backup and incident response arrangements, are available on request at info@silenceai.net. No measure guarantees absolute security."],
      ] },
      { id: "transfers", title: "8. Locations and transfers", items: [
        ["8.1 Hosting", "A customer contracting with Silence AI LLC is provided a Web Security deployment on a server located in the United States or Europe. The location assigned to that customer is identified in the order, plan or linked data-location schedule. This does not establish where SSO, support, payment data, backups, AI inference or other subprocessors process information. Their destinations and access locations are disclosed in the applicable data-flow schedule."],
        ["8.2 Safeguards", "Where personal data leaves the UAE or another jurisdiction with applicable transfer rules, each flow must use a permitted transfer basis and required safeguards. GDPR transfer mechanisms apply where GDPR governs a relevant transfer. TLS is a security control, not a legal transfer mechanism. The contract’s UAE governing-law clause does not displace mandatory privacy law."],
      ] },
      { id: "cookies", title: "9. Cookies and similar technologies", items: [
        ["9.1 Scope and choice", "The console, separate SSO portal, marketing site, analytics tools and payment checkout may use different cookies or device technologies. Their actual inventory, purposes, providers and durations must be confirmed. Necessary access/security cookies and any optional analytics or marketing technologies must be distinguished, with consent choices where required. The applicable Web Security Cookie Policy explains the verified uses; the SSO and payment providers may publish separate notices."],
      ] },
      { id: "legal-basis", title: "10. Legal bases for our controller activities", items: [
        ["10.1 Account and service administration", "Where GDPR applies to Silence AI’s controller processing, account setup, subscription administration and support requested under a service contract rely on performance of that contract where the individual is party, or legitimate interests in serving the customer where they are its staff. Service security, fraud prevention and diagnostic logging rely on legitimate interests in protecting customers and the platform, subject to balancing and any right to object. Invoice and tax records rely on legal obligations. Optional marketing and nonessential tracking rely on consent where required; consent may be withdrawn for future processing."],
        ["10.2 Other applicable law", "For processing governed by UAE law, we rely on valid consent or an applicable statutory permission for each controller activity, and obtain consent where the law requires it. The customer establishes the lawful basis for its website visitors’ traffic processing. The DPA governs our processor role."],
      ] },
      { id: "incidents", title: "11. Security incidents", items: [
        ["11.1 Customer data", "When acting as processor, if we become aware of a confirmed personal-data breach affecting customer-controlled data, we notify the customer/controller without undue delay and provide available technical details and reasonable operational assistance under DPA Section 12.10 and applicable law. The customer assesses and fulfils its own legal duties to notify affected visitors and authorities. Our assistance does not transfer those duties to us, without limiting any independent duty that applicable law imposes on Silence AI."],
        ["11.2 Our data", "For account, billing, support and service-administration data that Silence AI controls, we assess and make any notices to affected individuals or authorities required by applicable law, within its applicable deadlines. Our controller duties for those data do not make Silence AI responsible for the customer's notices about customer-controlled visitor data."],
      ] },
      { id: "changes", title: "12. Notice changes", items: [
        ["12.1 Updates", "We will publish an effective date and give notice of material changes as required. A new processing purpose will use the notice or renewed consent required by applicable law; continued use alone is not universal consent."],
      ] },
      { id: "contact", title: "13. Contact and requests", items: [
        ["13.1 Contact", 'Silence AI LLC, Licence Number 2539365.01, Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. Privacy and DPA requests: info@silenceai.net.'],
        ["13.2 Requests", "For data we control, tell us the relevant account and request type so we can verify and answer your request. Protected-site visitors should ordinarily contact the customer through that site's privacy notice; if a visitor contacts us, identify the site so we can direct or pass the request to the customer where possible. Applicable law governs response periods and complaint routes."],
      ] },
      { id: "law", title: "14. Applicable privacy rules", items: [
        ["14.1 Contractual and statutory routes", "For a contractual dispute with Silence AI LLC, Terms of Service Section 11.13 sets written notice, 30 days of good-faith negotiation and, if unresolved, the competent courts in Sharjah, UAE. This route does not limit mandatory consumer or data-subject rights, complaints to a data-protection authority or other regulator, or a forum required by applicable law. Paddle purchase disputes follow its separate Buyer Terms."],
      ] },
    ],
  },
  ru: {
    title: "AI-CSD 1 Web Security — Казахстан",
    subtitle: "Политика конфиденциальности",
    nav: ["Казахстан", "ОАЭ"],
    sections: [
      { id: "about", title: "1. О настоящем уведомлении", items: [
        ["1.1 Предмет", "Настоящая Политика объясняет обработку персональных данных в казахстанском сервисе Web Security: в консоли, защищаемом трафике, учётных записях, поддержке и платежах. Она является уведомлением, а не договором о предоставлении доступа. Условия предоставления услуг и их приложение об обработке данных (DPA) регулируют договорные и процессорские обязанности. Для Email Security действует отдельная политика."],
        ["1.2 Ответственная компания", "Поставщик услуги — ТОО «Silence AI», БИН 250840004804. Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж. Эта версия относится к заказу с данной компанией и казахстанскому развёртыванию. Язык, IP-адрес и локаль URL сами по себе не определяют сторону договора. Контакт: info@silenceai.net."],
        ["1.3 Роли", "В отношении журналов запросов посетителей защищаемых сайтов и событий безопасности клиент обычно определяет цели обработки как оператор данных, а Silence AI обрабатывает данные по его документированным инструкциям согласно DPA. Silence AI самостоятельно определяет цели администрирования своих учётных записей, поддержки, подписок, предотвращения мошенничества и безопасности сервиса. Банк и отдельно развёрнутый сервис входа могут иметь самостоятельные роли; их нужно определить по фактической схеме."],
        ["1.4 Область действия", "Предполагаемый адрес казахстанской консоли: https://kz.web.csd.silenceai.net. Политика также охватывает связанные API, поставляемый агент, активный прокси/WAF, просмотр инцидентов и журналов, а также трафик защищаемых доменов и IP клиентов. Консоль предоставляет IP-адрес подключения защиты для конкретного развёртывания; адрес может меняться. Домен, оператор и политика отдельного портала входа/SSO должны быть подтверждены в материалах подключения. Перенаправление на него не прекращает обязанностей Silence AI по Web Security."],
      ] },
      { id: "information", title: "2. Данные и источники", items: [
        ["2.1 Сотрудники клиента", "Клиент и его сотрудники могут предоставлять имена, рабочие контакты, данные организации, идентификаторы аккаунтов, роли, настройки, обращения в поддержку и контакты для счетов. Консоль либо отдельный SSO может передавать идентификаторы аккаунта и сеанса. Настоящая Политика не утверждает, что CMC хранит пароли или полные номера платёжных карт."],
        ["2.2 Посетители сайтов", "Защищаемый сайт и системы безопасности могут передавать IP-адреса посетителей, URI запросов, метки времени, HTTP-заголовки, user-agent, признаки страны, метаданные трафика и атак, записи инцидентов и телеметрию агента или прокси. Клиент определяет подключаемые сайты и трафик."],
        ["2.3 Другие записи", "В зависимости от реально включённых функций могут обрабатываться записи о балансе и операциях, журналы аудита и диагностики, данные cookie и устройства, вложения обращений в поддержку. Функции ИИ могут обрабатывать запросы, ответы, результаты инструментов, настройки модели или провайдера и выбранные данные безопасности. Фактический ИИ-провайдер и передаваемые данные должны быть раскрыты в действующем перечне потоков и субобработчиков до использования."],
      ] },
      { id: "purposes", title: "3. Цели и роли", items: [
        ["3.1 Инструкции клиента", "Как обработчик Silence AI анализирует трафик, направленный через настроенное развёртывание Web Security клиента, для работы прокси/WAF, просмотра инцидентов и журналов по инструкциям клиента и DPA. Если средства WAF, IPS и защиты от DDoS включены в план и активированы, они предназначены для обнаружения и снижения угроз, но не могут выявить или остановить каждую атаку. Вредоносный запрос может пройти, а легитимный — быть заблокирован. Защита не распространяется на трафик, не направленный через услугу. Идентифицируемые журналы посетителей не используются для независимого маркетинга или аналитики только потому, что в этой Политике упомянуто улучшение сервиса."],
        ["3.2 Собственные операции", "Для собственных целей Silence AI управляет аккаунтами и подписками, отвечает на обращения, ведёт аудит, обеспечивает безопасность сервиса, выявляет мошенничество и исполняет обязанности по счетам и закону. Эти цели администрирования не расширяют круг трафика, охваченного настроенной защитой клиента. Для планирования мощности и улучшения могут применяться действительно агрегированные или обезличенные показатели. Идентифицируемая активность клиента не показывается другим клиентам как доказательство востребованности сервиса."],
        ["3.3 ИИ", "Анализ с ИИ относится только к включённым функциям и инструкциям DPA в отношении данных клиента. До включения ИИ-функции сведения о провайдере, месте обработки, передаваемых данных (включая результаты инструментов безопасности) и сроке хранения предоставляются в информации о потоках данных по запросу на info@silenceai.net."],
      ] },
      { id: "recipients", title: "4. Получатели и платежи", items: [
        ["4.1 Платёжные операции", "Для Web Security требуется подписка; превышение включённого объёма предполагается оплачивать из предоплаченного баланса WebSOC. Ручное пополнение может быть доступно, а автоматическое пополнение по порогу планируется и требует отдельного разрешения при внедрении. Платежи по договорам с ТОО «Silence AI» в Казахстане обрабатывает ТОО «ФинCeрвисы». Silence AI может получать данные плательщика, счёта, подписки, статуса операции, пополнения баланса и ограниченные сведения о способе оплаты для администрирования. Фактические поля, получатель платежа и выставитель счёта указываются в действующей форме оплаты и счёте. Применимые условия и политика обработки платёжных данных показываются клиенту при оплате."],
        ["4.2 Другие получатели", "В зависимости от реального развёртывания получателями могут быть хостинг и объектное хранилище, резервное копирование, мониторинг, поддержка, отдельный оператор SSO и включённые ИИ-провайдеры. Субобработчики услуги действуют по DPA; самостоятельные операторы — по своим политикам. Актуальный неконфиденциальный перечень субобработчиков и места обработки можно запросить по info@silenceai.net. Передача также возможна по требованию закона."],
      ] },
      { id: "retention", title: "5. Хранение и удаление", items: [
        ["5.1 Веб-журналы и SIEM", "Срок хранения веб-журналов 90 дней по умолчанию с возможностью изменения клиентом, а также варианты SIEM на 7, 30 и 90 дней планируются. Пока настройка не доступна для развёртывания клиента, действует срок, указанный в заказе или графике хранения данных. Исходные веб-журналы, структурированные события безопасности, инциденты и резервные копии могут иметь разные сроки. Срок для каждой категории и момент вступления в силу запрошенного изменения можно узнать по info@silenceai.net. Включённые 25 ГБ SIEM — лимит объёма, а не срок хранения."],
        ["5.2 Прочие данные", "Учётные и обращения в поддержку хранятся, пока это нужно для действующих отношений и решения запросов, затем удаляются по документированному графику. Записи операций и счета сохраняются в течение применимых налоговых, бухгалтерских и претензионных сроков. Чаты ИИ, запросы, аудит и диагностика хранятся по графикам включённых функций и безопасности; их периоды должны быть раскрыты для действующего развёртывания. Резервные копии удаляются по своему циклу и могут отставать от удаления основной записи. Единый срок для всех данных не обещается."],
        ["5.3 Завершение услуги", "Для данных под контролем клиента он может запросить возврат или удаление по DPA с учётом закона и цикла резервного копирования. В отношении собственных данных Silence AI пользователь аккаунта может запросить удаление, где это допускается; счета, споры, безопасность и закон могут требовать сохранения отдельных записей. Действующий график хранения и статус удаления можно запросить у нас."],
      ] },
      { id: "rights", title: "6. Права физических лиц", items: [
        ["6.1 Пользователи аккаунтов", "В отношении данных аккаунта, оплаты, поддержки и администрирования сервиса, цели обработки которых определяет Silence AI, пользователь может запросить доступ, исправление, удаление и осуществить другие права, предусмотренные применимым законом. Обращение направляется на info@silenceai.net; мы проверяем заявителя и отвечаем в установленный применимым законом срок. При наличии оснований можно обратиться в уполномоченный орган Казахстана или иной компетентный орган."],
        ["6.2 Посетители защищаемых сайтов", "Клиент, чей защищаемый сайт посещён, обычно определяет цели обработки данных трафика, инцидентов и журналов и несёт основную ответственность за получение запросов посетителей о реализации прав и ответы на них. Посетителю следует связаться с клиентом по контактам в политике конфиденциальности сайта. Если посетитель обратится в Silence AI по поводу данных клиента, мы по возможности направим или передадим запрос клиенту и окажем разумное содействие согласно Разделу 12.9 DPA. Решение по запросу принимает клиент; Silence AI не может самостоятельно обещать удаление или иное действие в отношении данных, которыми управляет клиент."],
      ] },
      { id: "security", title: "7. Безопасность", items: [
        ["7.1 Меры", "Мы применяем контроль доступа, шифрование при передаче, журналирование и операционные меры, соразмерные услуге. Конкретные меры для развёртывания, включая шифрование при хранении, MFA, резервное копирование и реагирование на инциденты, можно запросить по info@silenceai.net. Абсолютная безопасность не гарантируется."],
      ] },
      { id: "transfers", title: "8. Места обработки и передачи", items: [
        ["8.1 Развёртывание", "Сервер клиентского развёртывания по договору с ТОО «Silence AI» находится в Казахстане. Местонахождение производственных баз, сырых и структурированных журналов, резервных копий, объектного хранилища и прокси указывается отдельно в заказе или приложении о местонахождении данных. Это не означает, что SSO, платежи, ИИ, доступ поддержки, мониторинг или субобработчики находятся в Казахстане. Направления передачи и места доступа указываются в применимом перечне потоков данных."],
        ["8.2 Гарантии", "Для передачи за пределы Казахстана либо другой применимой юрисдикции каждый поток требует законного основания и предусмотренных гарантий с учётом статей 12 и 16 законодательства Казахстана о персональных данных и иных применимых норм. TLS — мера безопасности, а не самостоятельное правовое основание передачи. Выбор договорного права не отменяет обязательные правила защиты данных."],
      ] },
      { id: "cookies", title: "9. Cookie и сходные технологии", items: [
        ["9.1 Область и выбор", "Консоль, отдельный SSO, рекламный сайт, аналитика и платёжная форма могут использовать разные cookie и данные устройства. Их фактический перечень, цели, провайдеры и сроки нужно подтвердить. Необходимые cookie для входа и безопасности следует отделять от необязательной аналитики и маркетинга и получать согласие там, где оно требуется. Применимая Политика cookie Web Security описывает проверенное использование; у SSO и платёжного провайдера могут быть отдельные политики."],
      ] },
      { id: "legal-basis", title: "10. Основания собственной обработки", items: [
        ["10.1 По видам деятельности", "Для регистрации и исполнения подписки обрабатываются необходимые контакты и данные аккаунта на основании согласия субъекта либо применимого разрешения закона. Для ответа на обращение используются предоставленные контактные данные в объёме запроса; для счетов и бухгалтерии — данные, требуемые законом; для безопасности и предотвращения мошенничества — применимое разрешение закона или согласие, когда оно необходимо. Необязательный маркетинг и отслеживание основаны на отдельном согласии там, где оно требуется; согласие можно отозвать на будущее через info@silenceai.net."],
        ["10.2 Данные клиента", "Законное основание обработки посетителей своего сайта определяет клиент как оператор данных. Silence AI действует как обработчик по его инструкциям и DPA, а не выбирает за клиента основание для сбора трафика."],
      ] },
      { id: "incidents", title: "11. Инциденты безопасности", items: [
        ["11.1 Данные клиента", "Когда Silence AI действует как обработчик и ей становится известно о подтверждённом нарушении персональных данных, затрагивающем данные клиента, она без неоправданной задержки уведомляет клиента-оператора и предоставляет доступные технические сведения и разумное операционное содействие согласно Разделу 12.10 DPA и применимому закону. Клиент оценивает и выполняет собственные обязанности по уведомлению затронутых посетителей и органов. Содействие Silence AI не переносит на неё эти обязанности клиента, не ограничивая самостоятельные обязанности Silence AI по применимому закону."],
        ["11.2 Собственные данные", "В отношении данных аккаунта, оплаты, поддержки и администрирования сервиса, цели обработки которых определяет Silence AI, компания оценивает необходимость уведомления субъектов и органов и направляет обязательные уведомления в сроки, установленные применимым законом. Эти обязанности Silence AI не заменяют обязанности клиента по уведомлению о нарушении данных посетителей, которыми управляет клиент."],
      ] },
      { id: "changes", title: "12. Изменения уведомления", items: [
        ["12.1 Обновления", "При публикации указывается дата вступления в силу; о существенных изменениях сообщается по закону. Для новой цели обработки предоставляется необходимое уведомление или запрашивается новое согласие, когда это требуется. Одно лишь продолжение использования не является универсальным согласием."],
      ] },
      { id: "contact", title: "13. Контакты и запросы", items: [
        ["13.1 Контакт", "ТОО «Silence AI», БИН 250840004804. Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж. Запросы по Политике и DPA: info@silenceai.net."],
        ["13.2 Рассмотрение", "По данным, цели обработки которых определяет Silence AI, укажите аккаунт и вид запроса, чтобы мы могли проверить и рассмотреть его. Посетителям защищаемого сайта обычно следует обращаться к клиенту по контактам в политике этого сайта; если посетитель обращается к нам, следует указать сайт, чтобы мы по возможности направили или передали запрос клиенту. Сроки ответа и порядок обжалования определяются применимым законом."],
      ] },
      { id: "law", title: "14. Применимые нормы о данных", items: [
        ["14.1 Договорные и законные способы защиты", "Для договорного спора с ТОО «Silence AI» Раздел 11.13 Условий предоставления услуг предусматривает письменное уведомление, 30 дней добросовестных переговоров и, если спор не урегулирован, обращение в компетентный суд Казахстана по правилам подсудности ГПК РК. Этот порядок не ограничивает обязательные права потребителей и субъектов данных, обращения в уполномоченные органы или подсудность, установленную законом."],
      ] },
    ],
  },
};

function linksFor(locale, section) {
  const prefix = locale === "ru" ? kz : ae;
  if (section === "about" || section === "purposes" || section === "incidents" || section === "law") return [
    [`${prefix}/terms_of_service/`, locale === "ru" ? "Условия предоставления услуг и DPA" : "Terms of Service and DPA"],
    [`${prefix}/terms_of_use/`, locale === "ru" ? "Условия использования" : "Terms of Use"],
  ];
  if (section === "recipients") return locale === "ru"
    ? []
    : [["https://www.paddle.com/legal/buyer-terms", "Paddle Buyer Terms"], ["https://www.paddle.com/legal/privacy", "Paddle Privacy Notice"]];
  if (section === "cookies") return [[locale === "ru" ? "/ru/kz/policies/ai-csd/web/cookies/" : "/en/ae/policies/ai-csd/web/cookies/", locale === "ru" ? "Политика cookie Web Security" : "Web Security Cookie Policy"]];
  return [];
}

export default function WebPrivacyPolicy({ locale }) {
  const lang = locale === "ru" ? "ru" : "en";
  const notice = notices[lang];
  return (
    <PolicyLayout title={notice.title} subtitle={notice.subtitle} sections={notice.sections.map(({ id, title }) => ({ id, title }))}>
      <WebJurisdictionSelector policy="privacy" active={lang === "ru" ? "kz" : "ae"} locale={lang} />
      {notice.sections.map((section) => (
        <section id={section.id} key={section.id} lang={lang}>
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          {section.items.map(([label, body]) => <p className="mb-4" key={label}><strong>{label}:</strong> {body}</p>)}
          {linksFor(lang, section.id).length > 0 && <p className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">{linksFor(lang, section.id).map(([href, label]) => <a className="text-blue-400 underline" href={href} key={href}>{label}</a>)}</p>}
        </section>
      ))}
      <p className="mt-8 text-sm text-gray-400">{lang === "ru" ? "Обновлено 7 октября 2026 года." : "Updated 7 October 2026."}</p>
    </PolicyLayout>
  );
}
