import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const CodeBlock = ({ children }) => (
    <pre className="rounded-2xl bg-black/60 px-4 py-3 text-sm font-mono text-white/90 shadow-inner">
        <code>{children}</code>
    </pre>
);

const Section = ({ title, children }) => (
    <section className="space-y-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {children}
    </section>
);

const Subsection = ({ title, children }) => (
    <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white/90">{title}</h4>
        {children}
    </div>
);

const List = ({ ordered = false, children, className, ...props }) => {
    const Tag = ordered ? "ol" : "ul";
    return (
        <Tag
            className={cn(
                ordered ? "list-decimal space-y-2 pl-6 text-white/80" : "list-disc space-y-2 pl-6 text-white/80",
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
};

const Paragraph = ({ children, className }) => (
    <p className={cn("text-white/80", className)}>{children}</p>
);

export default function EmailSecurityDoc() {
    return (
        <Card className="bg-[#0B1428]/90 backdrop-blur-xl">
            <CardHeader className="pb-4">
                <CardTitle className="text-3xl">Email Security System</CardTitle>
                <CardDescription className="text-base text-white/70">Документация | Версия 1.0</CardDescription>
            </CardHeader>
            <Separator className="mx-6" />
            <CardContent className="p-0">
                <ScrollArea className="h-[70vh] px-6 py-8">
                    <div className="space-y-10 text-sm md:text-base">
                        <Section title="Содержание">
                            <List ordered>
                                <li>Начало работы и пошаговые инструкции</li>
                                <li>Работа с почтой</li>
                                <li>Администрирование домена</li>
                                <li>Концепции</li>
                                <li>Управление доступом</li>
                                <li>Правила тарификации</li>
                            </List>
                        </Section>

                        <Separator className="bg-white/5" />

                        <Section title="Начало работы и пошаговые инструкции">
                            <Subsection title="Для администратора">
                                <Paragraph>Чтобы начать работу с системой:</Paragraph>
                                <List ordered>
                                    <li>Войдите в CMC Admin Panel через admin.silenceai.net используя Google или Microsoft OAuth.</li>
                                    <li>Добавьте домен вашей компании.</li>
                                    <li>Подтвердите владение доменом через DNS.</li>
                                    <li>Настройте записи безопасности (SPF, DKIM, DMARC).</li>
                                    <li>Создайте email-аккаунты для сотрудников.</li>
                                </List>
                                <Paragraph>После настройки пользователи смогут входить в webmail-клиент и отправлять защищенные письма.</Paragraph>
                            </Subsection>
                            <Subsection title="Для пользователя">
                                <Paragraph>Чтобы начать работать с почтой:</Paragraph>
                                <List ordered>
                                    <li>Получите учетные данные от администратора.</li>
                                    <li>Войдите на mail.silenceai.net через email/пароль или OAuth.</li>
                                    <li>Отправьте первое письмо через кнопку «Compose».</li>
                                    <li>Ознакомьтесь с системными папками, куда автоматически попадают письма по категориям безопасности.</li>
                                </List>
                                <Paragraph>Входящие письма автоматически проверяются на угрозы и распределяются по папкам.</Paragraph>
                            </Subsection>

                            <Subsection title="Работа с доменами">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Добавить домен</h5>
                                        <List ordered>
                                            <li>Откройте CMC Admin Panel.</li>
                                            <li>Нажмите «Add Domain».</li>
                                            <li>Введите доменное имя без www (например, company.com).</li>
                                            <li>Нажмите «Add».</li>
                                        </List>
                                        <Paragraph>Система сгенерирует verification token для подтверждения владения доменом.</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Подтвердить владение доменом</h5>
                                        <Paragraph>После добавления домена необходимо подтвердить, что вы владелец.</Paragraph>
                                        <List ordered>
                                            <li>Скопируйте TXT-запись из CMC:</li>
                                        </List>
                                        <CodeBlock>{`_cmc-verification.company.com TXT "cmc-verify-abc123xyz"`}</CodeBlock>
                                        <List ordered start={2}>
                                            <li>Добавьте эту запись в DNS-настройки вашего домена.</li>
                                            <li>Дождитесь автоматической проверки (каждые 5 минут) или нажмите «Check Now».</li>
                                        </List>
                                        <Paragraph>Верификация может занять до 48 часов. После успешной проверки статус домена изменится на verified.</Paragraph>
                                    </div>
                                </div>
                            </Subsection>

                            <Subsection title="Настройка DNS-записей">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">SPF</h5>
                                        <Paragraph>SPF определяет, какие серверы могут отправлять почту от вашего домена.</Paragraph>
                                        <List ordered>
                                            <li>В CMC откройте раздел «DNS Configuration» → «SPF».</li>
                                            <li>Нажмите «Check Current SPF» для проверки существующих записей.</li>
                                            <li>Нажмите «Generate SPF Record».</li>
                                            <li>Скопируйте предложенную запись:</li>
                                        </List>
                                        <CodeBlock>{`company.com TXT "v=spf1 include:_spf.silenceai.net -all"`}</CodeBlock>
                                        <List ordered start={5}>
                                            <li>Добавьте запись в DNS.</li>
                                        </List>
                                        <Paragraph>Если у вас уже есть SPF-запись (например, для Gmail), добавьте наш include перед финальным квалификатором -all.</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">DKIM</h5>
                                        <Paragraph>DKIM добавляет криптографическую подпись к вашим письмам.</Paragraph>
                                        <List ordered>
                                            <li>В CMC откройте «DNS Configuration» → «DKIM».</li>
                                            <li>Нажмите «Generate DKIM Keys».</li>
                                            <li>Система создаст пару ключей (приватный хранится на сервере, публичный для DNS).</li>
                                            <li>Скопируйте DNS-запись:</li>
                                        </List>
                                        <CodeBlock>{`silenceai._domainkey.company.com TXT "v=DKIM1; k=rsa; p=MIIBIjAN..."`}</CodeBlock>
                                        <List ordered start={5}>
                                            <li>Добавьте запись в DNS.</li>
                                        </List>
                                        <Paragraph>Проверьте статус через «Verify DKIM».</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">DMARC</h5>
                                        <Paragraph>DMARC определяет действия с письмами, не прошедшими SPF/DKIM проверку.</Paragraph>
                                        <List ordered>
                                            <li>В CMC откройте «DNS Configuration» → «DMARC».</li>
                                            <li>Выберите политику:</li>
                                        </List>
                                        <List>
                                            <li>quarantine — отправить в спам (рекомендуется)</li>
                                            <li>reject — отклонить письмо</li>
                                        </List>
                                        <List ordered start={3}>
                                            <li>Нажмите «Generate DMARC Record».</li>
                                            <li>Скопируйте запись:</li>
                                        </List>
                                        <CodeBlock>{`_dmarc.company.com TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@silenceai.net"`}</CodeBlock>
                                        <List ordered start={5}>
                                            <li>Добавьте запись в DNS.</li>
                                        </List>
                                        <Paragraph>Начните с политики quarantine, проверьте отчеты за 1–2 недели, затем можете перейти на reject.</Paragraph>
                                    </div>
                                </div>
                            </Subsection>

                            <Subsection title="Управление пользователями">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Создать email-аккаунт</h5>
                                        <List ordered>
                                            <li>Откройте раздел «Email Accounts» в CMC.</li>
                                            <li>Нажмите «Create Account».</li>
                                            <li>Заполните необходимые поля.</li>
                                        </List>
                                        <Paragraph className="font-medium text-white/80">Требуемые параметры:</Paragraph>
                                        <List>
                                            <li>Email: john.doe@company.com</li>
                                            <li>Имя и фамилия</li>
                                            <li>Пароль (минимум 8 символов, uppercase, lowercase, цифра, спецсимвол)</li>
                                            <li>Storage quota: выберите размер хранилища</li>
                                        </List>
                                        <List ordered start={4}>
                                            <li>Нажмите «Create».</li>
                                        </List>
                                        <Paragraph>Пользователь сразу сможет войти в webmail.</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Приостановить или активировать аккаунт</h5>
                                        <List ordered>
                                            <li>Найдите пользователя в списке «Email Accounts».</li>
                                            <li>В меню Actions выберите нужное действие.</li>
                                        </List>
                                        <List>
                                            <li>«Suspend» — приостановить (пользователь не сможет войти)</li>
                                            <li>«Activate» — восстановить доступ</li>
                                        </List>
                                        <List ordered start={3}>
                                            <li>Подтвердите действие.</li>
                                        </List>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Изменить квоту хранилища</h5>
                                        <List ordered>
                                            <li>Найдите пользователя в списке.</li>
                                            <li>В меню Actions выберите «Edit Quota».</li>
                                            <li>Выберите новый размер хранилища.</li>
                                            <li>Сохраните изменения.</li>
                                        </List>
                                        <Paragraph>Изменения применяются немедленно.</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Удалить аккаунт</h5>
                                        <List ordered>
                                            <li>Найдите пользователя в списке.</li>
                                            <li>В меню Actions выберите «Delete».</li>
                                            <li>Подтвердите удаление.</li>
                                        </List>
                                        <Paragraph className="text-white/70">Внимание: Все данные пользователя будут удалены безвозвратно.</Paragraph>
                                    </div>
                                </div>
                            </Subsection>
                        </Section>

                        <Separator className="bg-white/5" />

                        <Section title="Работа с почтой">
                            <Subsection title="Отправить письмо">
                                <List ordered>
                                    <li>В webmail нажмите «Compose».</li>
                                    <li>Заполните поля To, Subject, Body.</li>
                                    <li>При необходимости прикрепите файлы (до 25 МБ на файл).</li>
                                    <li>Нажмите «Send».</li>
                                </List>
                                <Paragraph>Письмо автоматически подписывается DKIM и отправляется.</Paragraph>
                            </Subsection>

                            <Subsection title="Создать custom folder с правилами">
                                <Paragraph>Custom folders автоматически сортируют письма по заданным критериям.</Paragraph>
                                <List ordered>
                                    <li>В sidebar нажмите «Create Folder».</li>
                                    <li>Введите название папки (например, «Clients»).</li>
                                    <li>Нажмите «Add Rules».</li>
                                    <li>Настройте правило.</li>
                                </List>
                                <Paragraph className="font-medium text-white/80">Пример правила:</Paragraph>
                                <List>
                                    <li>Filter by: Sender Domain</li>
                                    <li>Match mode: Contains</li>
                                    <li>Value: client.com</li>
                                </List>
                                <Paragraph>Отметьте «Apply to existing emails», если нужно применить к уже полученным письмам, и нажмите «Create».</Paragraph>
                                <Paragraph>Все новые письма от *@client.com будут автоматически попадать в папку «Clients».</Paragraph>
                            </Subsection>

                            <Subsection title="Добавить отправителя в Whitelist">
                                <Paragraph>Если письмо попало в SPAM по ошибке:</Paragraph>
                                <List ordered>
                                    <li>Откройте письмо в папке SPAM.</li>
                                    <li>Нажмите «Not Spam» → «Add to Whitelist».</li>
                                    <li>Выберите Whitelist sender email или Whitelist sender domain.</li>
                                    <li>Подтвердите действие.</li>
                                </List>
                                <Paragraph>Все будущие письма от этого отправителя не будут попадать в спам.</Paragraph>
                            </Subsection>

                            <Subsection title="Настроить email-подпись">
                                <List ordered>
                                    <li>Откройте Settings → «Email Signature».</li>
                                    <li>Включите «Enable signature».</li>
                                    <li>Введите текст подписи.</li>
                                    <li>Нажмите «Save».</li>
                                </List>
                                <Paragraph>Подпись будет автоматически добавляться ко всем исходящим письмам.</Paragraph>
                            </Subsection>

                            <Subsection title="Настроить автоответчик">
                                <List ordered>
                                    <li>Откройте Settings → «Vacation Responder».</li>
                                    <li>Включите «Enable vacation responder».</li>
                                    <li>Укажите даты начала и окончания.</li>
                                    <li>Введите текст автоответа.</li>
                                    <li>Отметьте «Reply once per sender», чтобы отправлять ответ только один раз.</li>
                                    <li>Нажмите «Save».</li>
                                </List>
                                <Paragraph>Автоответчик будет работать в указанные даты и автоматически отключится.</Paragraph>
                            </Subsection>

                            <Subsection title="Настроить переадресацию">
                                <List ordered>
                                    <li>Откройте Settings → «Email Forwarding».</li>
                                    <li>Нажмите «Add Forwarding Address».</li>
                                    <li>Введите email для пересылки.</li>
                                    <li>Отметьте «Keep copy in inbox», если хотите сохранять копию.</li>
                                    <li>Нажмите «Save».</li>
                                </List>
                                <Paragraph>Все входящие письма будут автоматически пересылаться на указанный адрес.</Paragraph>
                            </Subsection>
                        </Section>

                        <Separator className="bg-white/5" />

                        <Section title="Администрирование домена">
                            <Subsection title="Просмотреть email-активность домена">
                                <Paragraph>Администраторы могут видеть все письма всех пользователей домена.</Paragraph>
                                <List ordered>
                                    <li>Откройте CMC → «Email Activity».</li>
                                    <li>Используйте фильтры по пользователю, папке, дате и типу угрозы.</li>
                                    <li>Для поиска используйте строку по теме или отправителю.</li>
                                </List>
                            </Subsection>

                            <Subsection title="Удалить письма у всех пользователей">
                                <Paragraph>Если обнаружено вредоносное письмо, отправленное всем сотрудникам:</Paragraph>
                                <List ordered>
                                    <li>Откройте «Email Activity».</li>
                                    <li>Найдите письмо через фильтры или поиск.</li>
                                    <li>Отметьте нужные письма.</li>
                                    <li>Нажмите «Delete Selected».</li>
                                    <li>Подтвердите массовое удаление.</li>
                                </List>
                                <Paragraph>Письма будут удалены у всех пользователей домена.</Paragraph>
                            </Subsection>
                        </Section>

                        <Separator className="bg-white/5" />

                        <Section title="Концепции">
                            <Subsection title="Обзор системы">
                                <Paragraph>Email Security System — платформа для защиты корпоративной почты от киберугроз.</Paragraph>
                                <Paragraph className="font-medium text-white/80">Компоненты:</Paragraph>
                                <List>
                                    <li>CMC Admin Panel — панель администратора для управления доменами, пользователями и DNS-настройками.</li>
                                    <li>Webmail Client — почтовый клиент для сотрудников с автоматической защитой от угроз.</li>
                                    <li>Infrastructure Services — SMTP-сервер и система безопасности для обработки писем.</li>
                                </List>
                            </Subsection>

                            <Subsection title="Система защиты">
                                <Paragraph>Каждое входящее письмо проходит проверку через шесть уровней защиты:</Paragraph>
                                <List>
                                    <li>Layer 0: Phishing Domain Check — проверка домена отправителя по базе известных фишинговых доменов.</li>
                                    <li>Layer 1: Spoof Detection — проверка SPF, DKIM и DMARC записей.</li>
                                    <li>Layer 2: Spam Detection — анализ письма через RSPAMD на спам-признаки.</li>
                                    <li>Layer 3: Link Scanner — сканирование ссылок через URLScan.io.</li>
                                    <li>Layer 4: Antivirus — проверка вложений антивирусом Bitdefender.</li>
                                    <li>Layer 5: AI Phishing Detection — анализ содержания письма через AI.</li>
                                </List>
                                <Paragraph>При обнаружении угрозы обработка останавливается, и письмо помещается в соответствующую папку.</Paragraph>
                            </Subsection>

                            <Subsection title="Папки системы">
                                <Paragraph>Письма автоматически распределяются по папкам:</Paragraph>
                                <List>
                                    <li>Unfiltered — новые письма до обработки.</li>
                                    <li>Secure — безопасные письма, прошедшие все проверки.</li>
                                    <li>Possibly Spoofed — письма с подозрительной аутентификацией отправителя.</li>
                                    <li>SPAM — спам-письма.</li>
                                    <li>Dangerous Links — письма с вредоносными ссылками.</li>
                                    <li>Malware — письма с вирусами во вложениях.</li>
                                    <li>Possibly Phishing — письма с признаками фишинга.</li>
                                    <li>Sent — отправленные письма.</li>
                                </List>
                                <Paragraph>Одно письмо может находиться в нескольких папках одновременно.</Paragraph>
                            </Subsection>

                            <Subsection title="Пользовательские папки">
                                <Paragraph>Пользователи могут создавать собственные папки с правилами фильтрации.</Paragraph>
                                <Paragraph className="font-medium text-white/80">Правила фильтрации:</Paragraph>
                                <List>
                                    <li>По домену отправителя</li>
                                    <li>По email отправителю</li>
                                    <li>По теме письма</li>
                                    <li>По имени отправителя</li>
                                </List>
                                <Paragraph className="font-medium text-white/80">Режимы совпадения:</Paragraph>
                                <List>
                                    <li>Contains — содержит</li>
                                    <li>Equals — точное совпадение</li>
                                    <li>Starts with — начинается с</li>
                                    <li>Ends with — заканчивается на</li>
                                </List>
                                <Paragraph>Правила можно применить к уже полученным письмам (retroactive filtering).</Paragraph>
                            </Subsection>

                            <Subsection title="SPF (Sender Policy Framework)">
                                <Paragraph>SPF — DNS-запись, определяющая серверы, которым разрешено отправлять почту от имени домена.</Paragraph>
                                <Paragraph className="font-medium text-white/80">Формат:</Paragraph>
                                <CodeBlock>{`v=spf1 include:_spf.silenceai.net -all`}</CodeBlock>
                                <Paragraph className="font-medium text-white/80">Механизмы:</Paragraph>
                                <List>
                                    <li>include:domain — разрешить серверы из указанного домена</li>
                                    <li>ip4:x.x.x.x — разрешить IP-адрес</li>
                                    <li>-all — отклонить остальные</li>
                                    <li>~all — пометить остальные как подозрительные</li>
                                </List>
                                <Paragraph>Получатель проверяет, что IP-адрес отправителя разрешен в SPF-записи домена.</Paragraph>
                            </Subsection>

                            <Subsection title="DKIM (DomainKeys Identified Mail)">
                                <Paragraph>DKIM добавляет криптографическую подпись к письмам, подтверждая подлинность отправителя.</Paragraph>
                                <Paragraph>При отправке письма сервер подписывает его приватным ключом и добавляет заголовок DKIM-Signature. Получатель проверяет подпись с помощью публичного ключа из DNS.</Paragraph>
                                <Paragraph className="font-medium text-white/80">DNS-запись:</Paragraph>
                                <CodeBlock>{`selector._domainkey.domain.com TXT "v=DKIM1; k=rsa; p=публичный_ключ"`}</CodeBlock>
                                <Paragraph>Приватный ключ хранится на сервере и не передается клиентам.</Paragraph>
                            </Subsection>

                            <Subsection title="DMARC (Domain-based Message Authentication)">
                                <Paragraph>DMARC определяет политику обработки писем, не прошедших SPF или DKIM.</Paragraph>
                                <Paragraph className="font-medium text-white/80">Формат:</Paragraph>
                                <CodeBlock>{`_dmarc.domain.com TXT "v=DMARC1; p=quarantine; rua=mailto:reports@domain.com"`}</CodeBlock>
                                <Paragraph className="font-medium text-white/80">Параметры:</Paragraph>
                                <List>
                                    <li>p=quarantine — отправить в спам</li>
                                    <li>p=reject — отклонить письмо</li>
                                    <li>p=none — только мониторинг</li>
                                    <li>rua= — адрес для отчетов</li>
                                </List>
                                <Paragraph>Если проверка не пройдена, применяется указанная политика.</Paragraph>
                            </Subsection>

                            <Subsection title="Вложения и антивирус">
                                <Paragraph className="font-medium text-white/80">Ограничения:</Paragraph>
                                <List>
                                    <li>Максимальный размер файла: 25 МБ</li>
                                    <li>Поддерживаются все типы файлов</li>
                                </List>
                                <Paragraph>Все вложения сканируются антивирусом Bitdefender. Зараженные файлы помещаются в карантин.</Paragraph>
                            </Subsection>

                            <Subsection title="Квоты и лимиты">
                                <Paragraph className="font-medium text-white/80">Квота хранилища:</Paragraph>
                                <Paragraph>При достижении 100% квоты пользователь не сможет отправлять и получать письма.</Paragraph>
                                <Paragraph className="font-medium text-white/80">Лимиты отправки:</Paragraph>
                                <List>
                                    <li>Business Standard: 1000 писем в день</li>
                                    <li>Business Premium: 2000 писем в день</li>
                                    <li>Enterprise: 10000 писем в день</li>
                                </List>
                                <Paragraph className="font-medium text-white/80">Лимит пользователей:</Paragraph>
                                <List>
                                     <li>Business планы: неограниченное количество пользователей (в зависимости от количества сотрудников)</li>
                                     <li>Enterprise планы: без ограничений</li>
                                </List>
                            </Subsection>
                        </Section>

                        <Separator className="bg-white/5" />

                        <Section title="Управление доступом">
                            <Subsection title="Роли пользователей">
                                <Paragraph className="font-medium text-white/80">Admin</Paragraph>
                                <List>
                                    <li>Полный доступ к CMC Admin Panel</li>
                                    <li>Управление доменами и DNS</li>
                                    <li>Создание и управление пользователями</li>
                                    <li>Просмотр всех писем домена</li>
                                    <li>Массовые операции с письмами</li>
                                </List>
                                <Paragraph className="font-medium text-white/80">Subordinate</Paragraph>
                                <List>
                                    <li>Ограниченный доступ к CMC</li>
                                    <li>Просмотр списка пользователей</li>
                                    <li>Доступ только к своим письмам</li>
                                </List>
                                <Paragraph className="font-medium text-white/80">User</Paragraph>
                                <List>
                                    <li>Доступ к webmail-клиенту</li>
                                    <li>Работа со своими письмами</li>
                                    <li>Настройка личных параметров</li>
                                </List>
                            </Subsection>

                            <Subsection title="Назначение ролей">
                                <List>
                                    <li>Auto-admin: первый пользователь, вошедший через OAuth, получает роль Admin.</li>
                                    <li>Создание Subordinate: Admin создает subordinate-пользователей в разделе «User Management».</li>
                                    <li>Создание User: Admin создает email-аккаунты в разделе «Email Accounts».</li>
                                </List>
                            </Subsection>

                            <Subsection title="Аутентификация">
                                <List>
                                    <li>OAuth 2.0: вход через Google или Microsoft с PKCE.</li>
                                    <li>Email/Password: вход по учетным данным, выданным администратором.</li>
                                    <li>JWT-токены: срок действия 7 дней, хранятся в httpOnly cookie.</li>
                                    <li>Обновление токенов: автоматическое через refresh token.</li>
                                </List>
                            </Subsection>

                            <Subsection title="Защита доступа">
                                <List>
                                    <li>Rate Limiting: максимум 5 попыток входа за 15 минут с одного IP.</li>
                                    <li>Session Management: валидация активных сессий в базе данных.</li>
                                    <li>Audit Logging: журнал критичных действий администраторов и пользователей.</li>
                                </List>
                            </Subsection>
                        </Section>

                        <Separator className="bg-white/5" />

                        <Section title="Правила тарификации">
                             <Subsection title="Business планы">
                                <Paragraph>Для компаний с разным количеством сотрудников.</Paragraph>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Business Standard — $7.30/пользователь/месяц</h5>
                                        <Paragraph>Для кого: Предприятия с 15 или менее сотрудниками.</Paragraph>
                                        <Paragraph className="font-medium text-white/80">Основные возможности:</Paragraph>
                                        <List>
                                            <li>For enterprises with 15 or less employees</li>
                                            <li>Custom company email on your own domain</li>
                                            <li>AI-powered threat detection</li>
                                            <li>Multi-layered email security pipeline</li>
                                            <li>Automatic email sorting into security folders</li>
                                            <li>Custom folders with auto-filtering rules</li>
                                            <li>8 GB хранения на пользователя</li>
                                            <li>Full-text email search</li>
                                            <li>24/7 email and web support</li>
                                        </List>
                                         <Paragraph>Оплата: Monthly $8.60/user | Yearly $7.30/user.</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Business Premium 100 — $12.00/пользователь/месяц</h5>
                                        <Paragraph>Для кого: Предприятия с 15-300 сотрудниками.</Paragraph>
                                        <Paragraph className="font-medium text-white/80">Основные возможности:</Paragraph>
                                        <List>
                                            <li>For enterprises with 15-300 employees</li>
                                            <li>Admin console for domain-wide management</li>
                                            <li>AI-powered threat detection и многоуровневая защита</li>
                                            <li>Advanced link scanning и антивирусная защита вложений</li>
                                            <li>Email flow visualization и массовое управление письмами</li>
                                            <li>Custom folders with auto-filtering rules</li>
                                            <li>50 GB хранения на пользователя</li>
                                            <li>Multi-account support with Gmail and Outlook</li>
                                            <li>24/7 email and web support</li>
                                        </List>
                                         <Paragraph>Оплата: Monthly $13.45/user | Yearly $12.00/user.</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Business MAX 100 — $25.00/пользователь/месяц</h5>
                                        <Paragraph>Для кого: Предприятия с более чем 300 сотрудниками.</Paragraph>
                                        <Paragraph className="font-medium text-white/80">Основные возможности:</Paragraph>
                                        <List>
                                            <li>Unlimited number of users</li>
                                            <li>Advanced Admin console for enterprise-wide management</li>
                                            <li>AI-powered threat detection и многоуровневая защита</li>
                                            <li>Advanced link scanning и антивирусная защита вложений</li>
                                            <li>Email flow visualization и массовое управление письмами</li>
                                            <li>Custom folders with auto-filtering rules</li>
                                            <li>200 GB хранения на пользователя</li>
                                            <li>Multi-account support with Gmail and Outlook</li>
                                            <li>24/7 priority email and web support</li>
                                        </List>
                                         <Paragraph>Оплата: $25.00/user/month</Paragraph>
                                    </div>
                                </div>
                            </Subsection>

                            <Subsection title="Enterprise планы">
                                <Paragraph>Для крупных компаний без ограничения по количеству пользователей.</Paragraph>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Enterprise E3 — $36.00/пользователь/месяц</h5>
                                        <Paragraph>Для кого: Крупные компании (300+ пользователей).</Paragraph>
                                        <Paragraph className="font-medium text-white/80">Основные возможности:</Paragraph>
                                        <List>
                                            <li>Supports unlimited users</li>
                                            <li>Admin console with enterprise-grade management</li>
                                            <li>AI-powered threat detection и многоуровневая защита</li>
                                            <li>Email flow visualization и массовое управление письмами</li>
                                            <li>Custom folders и правила фильтрации</li>
                                            <li>5 TB хранения на пользователя</li>
                                            <li>Multi-account support with Gmail и Outlook</li>
                                            <li>24/7 email и web support</li>
                                        </List>
                                        <Paragraph>Оплата: только годовая — $36.00/user/month, требуется annual commitment.</Paragraph>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-base font-semibold text-white">Enterprise E5 — $57.00/пользователь/месяц</h5>
                                        <Paragraph>Для кого: Enterprise с максимальными требованиями.</Paragraph>
                                        <Paragraph className="font-medium text-white/80">Дополнительно к Enterprise E3:</Paragraph>
                                        <List>
                                            <li>10 TB хранения на пользователя</li>
                                            <li>Priority support с сокращенным временем реакции</li>
                                            <li>Dedicated account management</li>
                                        </List>
                                        <Paragraph>Оплата: только годовая — $57.00/user/month, требуется annual commitment.</Paragraph>
                                    </div>
                                </div>
                            </Subsection>

                            <Subsection title="Условия оплаты">
                                <Paragraph className="font-medium text-white/80">Периоды оплаты:</Paragraph>
                                <List>
                                    <li>Monthly — ежемесячная оплата</li>
                                    <li>Yearly — оплата за год со скидкой 20%</li>
                                </List>
                                <Paragraph className="font-medium text-white/80">Способы оплаты:</Paragraph>
                                <List>
                                    <li>Банковские карты через Stripe</li>
                                    <li>Банковские переводы (для Enterprise)</li>
                                </List>
                                <Paragraph>Автопродление: уведомление отправляется за 7 дней до продления. Upgrade доступен в любое время, downgrade вступает в силу со следующего периода.</Paragraph>
                            </Subsection>
                        </Section>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
