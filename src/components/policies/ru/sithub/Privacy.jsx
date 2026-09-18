"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const RuSithubPrivacy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sections = [
    { id: 'introduction', title: '1. Введение и принципы' },
    { id: 'architectural-guarantees', title: '2. Архитектурные гарантии конфиденциальности' },
    { id: 'information-collected', title: '3. Информация, которую мы собираем' },
    { id: 'purposes-legal-bases', title: '4. Цели и правовые основания обработки' },
    { id: 'data-storage-security', title: '5. Хранение и безопасность данных' },
    { id: 'data-transfer', title: '6. Передача и раскрытие данных' },
    { id: 'international-transfers', title: '7. Международная передача данных' },
    { id: 'data-subject-rights', title: '8. Права субъектов данных' },
    { id: 'cookies-tracking', title: '9. Файлы cookie и технологии отслеживания' },
    { id: 'data-retention', title: '10. Хранение данных' },
    { id: 'childrens-privacy', title: '11. Конфиденциальность детей' },
    { id: 'user-responsibilities', title: '12. Ваши обязанности по защите данных' },
    { id: 'transparency-report', title: '13. Отчёт о прозрачности' },
    { id: 'dpa', title: '14. Соглашение об обработке данных (DPA)' },
    { id: 'changes', title: '15. Изменения в Политике конфиденциальности' },
    { id: 'contact', title: '16. Контактная информация' },
  ];

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={sections} />
        </div>
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">Платформа Sithub</h1>
          <h2 className="text-2xl text-gray-400 mb-8">Политика конфиденциальности</h2>

          <div className="space-y-8">
            <section id="introduction">
              <h2 className="text-2xl font-semibold mb-4">1. ВВЕДЕНИЕ И ПРИНЦИПЫ</h2>

              <h3 className="text-xl font-semibold mb-3">1.1 Цель настоящей Политики</h3>
              <p className="mb-4">Настоящая Политика конфиденциальности (далее — «Политика») описывает принципы и практики обработки данных при использовании платформы Sithub. Политика является неотъемлемой частью Условий предоставления услуг и должна рассматриваться в совокупности с ними.</p>

              <h3 className="text-xl font-semibold mb-3">1.2 Принцип конфиденциальности по замыслу</h3>
              <p className="mb-4">Sithub построен на архитектурном принципе минимизации сбора данных. Конфиденциальность — это не дополнительная функция, а фундаментальная характеристика архитектуры системы.</p>

              <h3 className="text-xl font-semibold mb-3">1.3 Применимое законодательство</h3>
              <p className="mb-4">Настоящая Политика разработана с учётом:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Закона Республики Казахстан «О персональных данных и их защите»</li>
                <li>Общего регламента ЕС о защите данных (GDPR) — для пользователей из Европейского союза</li>
                <li>Иных применимых норм о защите данных, действующих в юрисдикции Пользователя</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">1.4 Контролёр и обработчик данных</h3>
              <p className="mb-4"><strong>В отношении персональных данных, обрабатываемых в связи с подписками:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Контролёр данных:</strong> Silence AI</li>
                <li>Мы определяем цели и средства обработки информации о подписке</li>
              </ul>
              <p className="mb-4"><strong>В отношении данных, обрабатываемых на Платформе:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Контролёр данных:</strong> Пользователь (вы контролируете свой код и данные разработки)</li>
                <li><strong>Обработчик данных:</strong> не применимо — мы не обрабатываем ваши данные разработки</li>
              </ul>
            </section>

            <section id="architectural-guarantees">
              <h2 className="text-2xl font-semibold mb-4">2. АРХИТЕКТУРНЫЕ ГАРАНТИИ КОНФИДЕНЦИАЛЬНОСТИ</h2>

              <h3 className="text-xl font-semibold mb-3">2.1 Основной принцип изоляции данных</h3>
              <p className="mb-4">Исходный код Пользователя обрабатывается исключительно на локальной инфраструктуре Пользователя. Архитектура Sithub спроектирована так, чтобы исключить передачу исходного кода на серверы Провайдера.</p>

              <h3 className="text-xl font-semibold mb-3">2.2 Техническая реализация изоляции</h3>

              <h4 className="text-lg font-semibold mb-2">Управление репозиториями:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Работает полностью на вашей инфраструктуре</li>
                <li>Не содержит функций сетевой передачи кода</li>
                <li>Все репозитории хранятся локально</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Сканирование безопасности:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Работает полностью на вашей инфраструктуре</li>
                <li>Обнаружение уязвимостей выполняется локально</li>
                <li>Результаты сканирования остаются на ваших серверах</li>
                <li>Фрагменты кода не передаются за пределы инфраструктуры</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Служба обновлений:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Единственный компонент, взаимодействующий с серверами Провайдера</li>
                <li>Передаёт только данные, указанные в разделе 3.2</li>
                <li>Загружает базы данных уязвимостей на вашу инфраструктуру</li>
                <li>Модуль сканирования изолирован от сетевых функций</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.3 Что это означает на практике</h3>
              <p className="mb-4">Провайдер не имеет технической возможности доступа к:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Исходному коду, хранящемуся на Платформе</li>
                <li>Результатам сканирования безопасности</li>
                <li>Истории коммитов и изменениям кода</li>
                <li>Именам файлов и структуре проектов</li>
                <li>Метаданным репозиториев</li>
              </ul>
              <p className="mb-4"><strong>Важное уточнение:</strong> Данная гарантия действует при условии корректной эксплуатации Sithub в соответствии с технической документацией и при отсутствии действий Пользователя по ручной передаче данных во внешние сервисы.</p>
            </section>

            <section id="information-collected">
              <h2 className="text-2xl font-semibold mb-4">3. ИНФОРМАЦИЯ, КОТОРУЮ МЫ СОБИРАЕМ</h2>

              <h3 className="text-xl font-semibold mb-3">3.1 Информация о подписке (обязательная)</h3>
              <p className="mb-4">Для предоставления услуг мы собираем следующую информацию:</p>

              <h4 className="text-lg font-semibold mb-2">Корпоративная информация:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Название организации (для корпоративных подписок)</li>
                <li>Контактный адрес электронной почты для связи</li>
                <li>Страна регистрации (для соблюдения применимого законодательства)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Лицензионная информация:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Хеш лицензионного ключа (необратимое криптографическое преобразование)</li>
                <li>Дата активации подписки</li>
                <li>Дата окончания действия подписки</li>
                <li>Статус подписки (активна/неактивна/приостановлена)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Платёжная информация:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Платёжные реквизиты обрабатываются сторонними платёжными операторами</li>
                <li>Провайдер не хранит полные данные банковских карт</li>
                <li>Мы храним только информацию о типе способа оплаты и последние четыре цифры карты</li>
              </ul>
              <p className="mb-4"><strong>Правовое основание (для пользователей из ЕС):</strong> исполнение договора (GDPR, статья 6(1)(b))</p>

              <h3 className="text-xl font-semibold mb-3">3.2 Технические данные от Sithub (автоматические)</h3>
              <p className="mb-4">При проверке лицензии и запросе обновлений Sithub передаёт:</p>

              <h4 className="text-lg font-semibold mb-2">Данные аутентификации:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Хеш лицензионного ключа</li>
                <li>Криптографический токен сессии (временный)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Технические метаданные:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Временная метка запроса (дата и время в формате UTC)</li>
                <li>Установленная версия Sithub (например, «2.1.3»)</li>
                <li>Хеш идентификатора установки (необратимое преобразование уникального ID)</li>
                <li>IP-адрес (автоматически регистрируется сервером, используется для предотвращения злоупотреблений)</li>
              </ul>
              <p className="mb-4"><strong>Правовое основание:</strong> законные интересы Провайдера в предотвращении мошенничества и обеспечении безопасности (GDPR, статья 6(1)(f))</p>
              <p className="mb-4"><strong>Срок хранения:</strong> 90 дней</p>

              <h3 className="text-xl font-semibold mb-3">3.3 Техническая телеметрия (по желанию)</h3>
              <p className="mb-4">При вашем явном согласии мы можем собирать дополнительную техническую информацию для повышения качества обслуживания:</p>

              <h4 className="text-lg font-semibold mb-2">Информация об использовании:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Частота запросов обновлений</li>
                <li>Статистика загрузки обновлений безопасности</li>
                <li>Время последнего успешного обновления</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Отчёты об ошибках:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Трассировки стека без исходного кода</li>
                <li>Сообщения об ошибках</li>
                <li>Информация о системном окружении (ОС, версия, архитектура)</li>
                <li>Журналы системных вызовов (без пользовательских данных)</li>
              </ul>
              <p className="mb-4"><strong>Важно:</strong> Отчёты об ошибках проходят автоматическую фильтрацию для удаления любых фрагментов кода или конфиденциальных данных перед передачей.</p>
              <p className="mb-4"><strong>Правовое основание:</strong> согласие (GDPR, статья 6(1)(a)) — вы можете отозвать согласие в любой момент в настройках Sithub</p>

              <h3 className="text-xl font-semibold mb-3">3.4 Информация, которую мы НЕ собираем</h3>
              <p className="mb-4">Мы прямо <strong>не собираем, не обрабатываем и не храним</strong>:</p>

              <h4 className="text-lg font-semibold mb-2">Исходный код:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Код в репозиториях</li>
                <li>Содержимое файлов</li>
                <li>Фрагменты кода</li>
                <li>Комментарии в коде</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Результаты анализа:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Результаты сканирования безопасности</li>
                <li>Обнаруженные уязвимости в вашем коде</li>
                <li>Отчёты о качестве кода</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Метаданные разработки:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Имена файлов и каталогов</li>
                <li>Структуру проекта</li>
                <li>Историю коммитов</li>
                <li>Сообщения коммитов</li>
                <li>Информацию о ветках</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Информацию о пользователях:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Имена разработчиков</li>
                <li>Адреса электронной почты разработчиков</li>
                <li>Структуру команды</li>
                <li>Права доступа внутри организации</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Учётные данные:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Пароли</li>
                <li>Ключи API</li>
                <li>Токены доступа</li>
                <li>Ключи SSH</li>
                <li>Сертификаты</li>
              </ul>
            </section>

            <section id="purposes-legal-bases">
              <h2 className="text-2xl font-semibold mb-4">4. ЦЕЛИ И ПРАВОВЫЕ ОСНОВАНИЯ ОБРАБОТКИ</h2>

              <h3 className="text-xl font-semibold mb-3">4.1 Управление подпиской</h3>
              <p className="mb-4"><strong>Цель:</strong> предоставление доступа к Sithub и обновлениям</p>
              <p className="mb-4"><strong>Обрабатываемые данные:</strong> информация о подписке, статус лицензии</p>
              <p className="mb-4"><strong>Правовое основание:</strong> исполнение договора (GDPR, статья 6(1)(b)); для Казахстана: согласие на обработку персональных данных при заключении договора</p>
              <p className="mb-4"><strong>Действия:</strong> проверка активности лицензии, обработка продлений подписки, отправка уведомлений о статусе подписки, предоставление доступа к обновлениям безопасности</p>

              <h3 className="text-xl font-semibold mb-3">4.2 Доставка обновлений безопасности</h3>
              <p className="mb-4"><strong>Цель:</strong> обеспечение актуальности баз данных уязвимостей</p>
              <p className="mb-4"><strong>Обрабатываемые данные:</strong> хеш лицензионного ключа, версия Sithub, временные метки запросов</p>
              <p className="mb-4"><strong>Правовое основание:</strong> исполнение договора (GDPR, статья 6(1)(b))</p>
              <p className="mb-4"><strong>Действия:</strong> аутентификация запросов на обновление, передача баз данных уязвимостей, передача исправлений безопасности, мониторинг работоспособности службы обновлений</p>

              <h3 className="text-xl font-semibold mb-3">4.3 Повышение качества обслуживания</h3>
              <p className="mb-4"><strong>Цель:</strong> разработка и совершенствование баз данных безопасности</p>
              <p className="mb-4"><strong>Обрабатываемые данные:</strong> техническая телеметрия (только при наличии вашего согласия), анонимные отчёты об ошибках</p>
              <p className="mb-4"><strong>Правовое основание:</strong> согласие (GDPR, статья 6(1)(a))</p>
              <p className="mb-4"><strong>Действия:</strong> исследование новых угроз и уязвимостей, повышение точности обнаружения уязвимостей, разработка новых сигнатур безопасности, исправление ошибок в компонентах Sithub</p>
              <p className="mb-4"><strong>Источники информации:</strong> результаты анализа угроз, проводимого подразделением Threat Hunters компании Silence AI. <strong>НЕ</strong> ваш код.</p>

              <h3 className="text-xl font-semibold mb-3">4.4 Соблюдение законодательства</h3>
              <p className="mb-4"><strong>Цель:</strong> выполнение юридических обязательств</p>
              <p className="mb-4"><strong>Обрабатываемые данные:</strong> информация о подписке, платёжные записи</p>
              <p className="mb-4"><strong>Правовое основание:</strong> юридическая обязанность (GDPR, статья 6(1)(c)); для Казахстана: требования налогового и бухгалтерского законодательства</p>
              <p className="mb-4"><strong>Действия:</strong> хранение платёжных записей (7 лет — требование налогового законодательства), ответы на судебные предписания, предоставление информации регуляторным органам (только при наличии законного основания), предотвращение мошенничества</p>

              <h3 className="text-xl font-semibold mb-3">4.5 Предотвращение злоупотреблений</h3>
              <p className="mb-4"><strong>Цель:</strong> защита от мошенничества и нарушений Условий</p>
              <p className="mb-4"><strong>Обрабатываемые данные:</strong> IP-адреса запросов, частота запросов обновлений, шаблоны использования</p>
              <p className="mb-4"><strong>Правовое основание:</strong> законные интересы (GDPR, статья 6(1)(f)) — наши законные интересы: предотвращение мошенничества, защита от злоупотребления лицензиями</p>
              <p className="mb-4"><strong>Действия:</strong> выявление подозрительной активности, блокировка скомпрометированных лицензий, предотвращение несанкционированного распространения</p>
            </section>

            <section id="data-storage-security">
              <h2 className="text-2xl font-semibold mb-4">5. ХРАНЕНИЕ И БЕЗОПАСНОСТЬ ДАННЫХ</h2>

              <h3 className="text-xl font-semibold mb-3">5.1 Данные, хранящиеся у Провайдера</h3>
              <p className="mb-4"><strong>На серверах Провайдера хранится только следующее:</strong></p>
              <div className="mb-4">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">Тип данных</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Местонахождение</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Шифрование</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Срок хранения</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Информация о подписке</td>
                      <td className="border border-gray-700 px-4 py-2">Республика Казахстан</td>
                      <td className="border border-gray-700 px-4 py-2">AES-256</td>
                      <td className="border border-gray-700 px-4 py-2">Срок действия + 1 год</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Платёжные записи</td>
                      <td className="border border-gray-700 px-4 py-2">Платёжный оператор</td>
                      <td className="border border-gray-700 px-4 py-2">Соответствие PCI DSS</td>
                      <td className="border border-gray-700 px-4 py-2">7 лет (требование закона)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Хеши лицензионных ключей</td>
                      <td className="border border-gray-700 px-4 py-2">Республика Казахстан</td>
                      <td className="border border-gray-700 px-4 py-2">Bcrypt</td>
                      <td className="border border-gray-700 px-4 py-2">Срок действия + 1 год</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Журналы запросов</td>
                      <td className="border border-gray-700 px-4 py-2">Республика Казахстан</td>
                      <td className="border border-gray-700 px-4 py-2">TLS 1.3 при передаче</td>
                      <td className="border border-gray-700 px-4 py-2">90 дней</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Базы данных безопасности</td>
                      <td className="border border-gray-700 px-4 py-2">Республика Казахстан (зеркала в ЕС)</td>
                      <td className="border border-gray-700 px-4 py-2">Не требуется (публичная информация)</td>
                      <td className="border border-gray-700 px-4 py-2">Постоянно (продукт)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3">5.2 Данные, хранящиеся на инфраструктуре Пользователя</h3>
              <p className="mb-4"><strong>Исключительно на вашей инфраструктуре:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Весь исходный код</li>
                <li>Результаты сканирования безопасности</li>
                <li>История коммитов</li>
                <li>Метаданные репозиториев</li>
                <li>Информация о пользователях и права доступа</li>
                <li>Загруженные базы данных уязвимостей</li>
              </ul>
              <p className="mb-4"><strong>Ответственность:</strong> Пользователь самостоятельно обеспечивает хранение, резервное копирование и безопасность этих данных.</p>

              <h3 className="text-xl font-semibold mb-3">5.3 Технические меры безопасности</h3>
              <p className="mb-4">Провайдер применяет следующие меры для защиты данных, хранящихся на наших серверах:</p>

              <h4 className="text-lg font-semibold mb-2">Шифрование:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>При хранении:</strong> AES-256 для баз данных с конфиденциальной информацией</li>
                <li><strong>При передаче:</strong> TLS 1.3 (версии ниже TLS 1.2 не принимаются)</li>
                <li><strong>Хеширование:</strong> Bcrypt для лицензионных ключей (необратимое преобразование)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Контроль доступа:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Многофакторная аутентификация для административного доступа</li>
                <li>Принцип минимальных привилегий для сотрудников</li>
                <li>Журналирование всех административных действий</li>
                <li>Регулярный аудит прав доступа</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Сетевая безопасность:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Периметровые межсетевые экраны</li>
                <li>Системы обнаружения вторжений (IDS/IPS)</li>
                <li>Защита от DDoS-атак</li>
                <li>Регулярное сканирование уязвимостей</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Мониторинг и реагирование:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Круглосуточный мониторинг безопасности 24/7</li>
                <li>Автоматические оповещения о подозрительной активности</li>
                <li>План реагирования на инциденты</li>
                <li>Регулярные учения по безопасности</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.4 Аудит безопасности</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Ежегодный независимый аудит безопасности сторонней компанией</li>
                <li>Регулярное тестирование на проникновение</li>
                <li>Публикация сводных отчётов (без раскрытия уязвимостей)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.5 Уведомление об инцидентах</h3>
              <p className="mb-4">В случае инцидента безопасности, затрагивающего ваши данные:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Уведомление Пользователей:</strong> в течение 72 часов с момента обнаружения</li>
                <li><strong>Уведомление регулятора (для пользователей из ЕС):</strong> в течение 72 часов (требование GDPR)</li>
                <li><strong>Уведомление регулятора Казахстана:</strong> в соответствии с законодательством о персональных данных</li>
              </ul>
            </section>

            <section id="data-transfer">
              <h2 className="text-2xl font-semibold mb-4">6. ПЕРЕДАЧА И РАСКРЫТИЕ ДАННЫХ</h2>

              <h3 className="text-xl font-semibold mb-3">6.1 Внутреннее использование</h3>
              <p className="mb-4">Доступ к данным Пользователей имеют только те сотрудники Провайдера, которым это необходимо для выполнения служебных обязанностей:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Системные администраторы (для обслуживания инфраструктуры)</li>
                <li>Служба поддержки (для решения технических проблем)</li>
                <li>Бухгалтерия (для обработки платежей)</li>
              </ul>
              <p className="mb-4">Все сотрудники подписывают соглашения о конфиденциальности.</p>

              <h3 className="text-xl font-semibold mb-3">6.2 Сторонние обработчики данных</h3>
              <p className="mb-4">Мы используем следующие категории сторонних обработчиков:</p>

              <h4 className="text-lg font-semibold mb-2">Платёжные операторы:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Для обработки платежей по подписке</li>
                <li>Соответствие PCI DSS</li>
                <li>Примеры: Stripe, PayPal, Kaspi.kz (для клиентов из Казахстана)</li>
                <li>Имеют собственные политики конфиденциальности</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Хостинг-провайдеры:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Для размещения серверов обновлений</li>
                <li>Местонахождение: Республика Казахстан (основные серверы), ЕС (зеркала для клиентов из ЕС)</li>
                <li>Действуют в соответствии с Соглашениями об обработке данных (DPA)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Сервисы мониторинга и безопасности:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Для обеспечения работоспособности и безопасности инфраструктуры</li>
                <li>Доступ ограничен техническими метаданными (журналы, метрики)</li>
                <li>Отсутствие доступа к информации о подписках</li>
              </ul>

              <p className="mb-4"><strong>Важно:</strong> Все сторонние обработчики:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Подписывают Соглашения об обработке данных (DPA)</li>
                <li>Соблюдают принцип минимизации доступа</li>
                <li>Не используют данные в собственных целях</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.3 Передача правоохранительным органам</h3>
              <p className="mb-4">Мы можем раскрывать информацию правоохранительным или регуляторным органам:</p>

              <h4 className="text-lg font-semibold mb-2">Когда это требуется:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>По судебному предписанию</li>
                <li>По повестке в суд</li>
                <li>При наличии юридической обязанности по применимому законодательству</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Процедура:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Проверка законности запроса юридическим отделом</li>
                <li>Предоставление только минимально необходимой информации</li>
                <li>Уведомление Пользователя (если это не запрещено судебным предписанием)</li>
                <li>Документирование всех запросов для отчёта о прозрачности</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Что НЕ МОЖЕТ быть предоставлено:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Исходный код (поскольку мы его не храним)</li>
                <li>Результаты сканирования (поскольку они хранятся локально у Пользователя)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.5 Что мы НИКОГДА не делаем</h3>
              <p className="mb-4">Провайдер <strong>никогда</strong> не будет:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Продавать данные Пользователей третьим лицам</li>
                <li>Сдавать данные в аренду в маркетинговых целях</li>
                <li>Монетизировать данные сверх оплаты подписки</li>
                <li>Передавать данные брокерам данных</li>
                <li>Использовать данные для таргетированной рекламы</li>
              </ul>
            </section>

            <section id="international-transfers">
              <h2 className="text-2xl font-semibold mb-4">7. МЕЖДУНАРОДНАЯ ПЕРЕДАЧА ДАННЫХ</h2>

              <h3 className="text-xl font-semibold mb-3">7.1 Местонахождение серверов</h3>
              <p className="mb-4"><strong>Основные серверы:</strong> Республика Казахстан</p>

              <h3 className="text-xl font-semibold mb-3">7.2 Передача из ЕС в Казахстан (для пользователей из ЕС)</h3>
              <p className="mb-4"><strong>Правовое основание передачи:</strong> Провайдер использует <strong>Стандартные договорные условия (SCC)</strong>, утверждённые Решением Европейской комиссии 2021/914.</p>

              <h4 className="text-lg font-semibold mb-2">Дополнительные гарантии:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Шифрование данных при передаче (TLS 1.3)</li>
                <li>Шифрование данных при хранении (AES-256)</li>
                <li>Ограниченный доступ к данным</li>
                <li>Регулярный аудит безопасности</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Доступ к SCC:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Стандартные договорные условия доступны для ознакомления по запросу</li>
                <li>Направляйте запрос на: info@silenceai.net</li>
                <li>SCC автоматически включаются в Соглашение об обработке данных (DPA) для корпоративных клиентов из ЕС</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">7.3 Что передаётся за границу</h3>
              <p className="mb-4"><strong>При использовании за пределами Казахстана передаётся:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Информация о подписке (для управления лицензией)</li>
                <li>Запросы на загрузку обновлений безопасности</li>
                <li>Базы данных безопасности (загружаются к вам)</li>
              </ul>

              <p className="mb-4"><strong>Что НЕ передаётся:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Исходный код (остаётся на вашей локальной инфраструктуре)</li>
                <li>Результаты сканирования (обрабатываются локально)</li>
                <li>Информация о разработчиках (управляется локально)</li>
              </ul>
            </section>

            <section id="data-subject-rights">
              <h2 className="text-2xl font-semibold mb-4">8. ПРАВА СУБЪЕКТОВ ДАННЫХ</h2>

              <h3 className="text-xl font-semibold mb-3">8.1 Применимость прав</h3>
              <p className="mb-4">Права, описанные в настоящем разделе, применяются:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Для всех Пользователей:</strong> базовые права в соответствии с законодательством Казахстана</li>
                <li><strong>Для Пользователей из ЕС:</strong> расширенные права в соответствии с GDPR</li>
                <li><strong>Для Пользователей из других юрисдикций:</strong> права в соответствии с применимым законодательством</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">8.2 Право на доступ (GDPR, статья 15)</h3>
              <p className="mb-4">Вы имеете право получить:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Подтверждение того, обрабатываем ли мы ваши персональные данные</li>
                <li>Копию ваших персональных данных</li>
                <li>Информацию о целях обработки, категориях данных, получателях</li>
                <li>Срок хранения данных</li>
                <li>Информацию о ваших правах</li>
              </ul>
              <p className="mb-4"><strong>Как воспользоваться:</strong> Направьте запрос на info@silenceai.net. Мы ответим в течение 30 дней (GDPR) или 15 дней (законодательство Казахстана). Данные будут предоставлены в структурированном, широко используемом формате (JSON или PDF).</p>

              <h3 className="text-xl font-semibold mb-3">8.3 Право на исправление (GDPR, статья 16)</h3>
              <p className="mb-4">Вы имеете право на исправление неточных персональных данных: исправление контактной информации, обновление названия организации, исправление платёжных реквизитов.</p>

              <h3 className="text-xl font-semibold mb-3">8.4 Право на удаление / «Право быть забытым» (GDPR, статья 17)</h3>
              <p className="mb-4">Вы имеете право запросить удаление ваших персональных данных. Ограничения: мы не можем удалить данные, если их хранение требуется по закону (например, платёжные записи — 7 лет) или необходимо для исполнения договора (пока подписка активна).</p>

              <h3 className="text-xl font-semibold mb-3">8.5 Право на ограничение обработки (GDPR, статья 18)</h3>
              <p className="mb-4">Вы можете запросить ограничение обработки ваших данных на период проверки точности данных, если обработка является незаконной, но вы не хотите удаления, или если данные необходимы вам в юридических целях.</p>

              <h3 className="text-xl font-semibold mb-3">8.6 Право на переносимость данных (GDPR, статья 20)</h3>
              <p className="mb-4">Вы имеете право получить свои данные в структурированном, машиночитаемом формате (JSON, CSV, XML). Направьте запрос на info@silenceai.net с указанием предпочтительного формата.</p>

              <h3 className="text-xl font-semibold mb-3">8.7 Право на возражение (GDPR, статья 21)</h3>
              <p className="mb-4">Вы имеете право возразить против обработки, основанной на законных интересах. Мы прекратим обработку, если не сможем продемонстрировать превалирующие законные основания.</p>

              <h3 className="text-xl font-semibold mb-3">8.8 Право на отзыв согласия (GDPR, статья 7(3))</h3>
              <p className="mb-4">Если обработка основана на согласии, вы можете отозвать согласие в любой момент. В настройках Sithub: отключите опцию «Отправлять телеметрию» или направьте запрос на info@silenceai.net.</p>

              <h3 className="text-xl font-semibold mb-3">8.9 Право на подачу жалобы в надзорный орган</h3>
              <p className="mb-4"><strong>Для пользователей из ЕС:</strong> Вы имеете право подать жалобу в надзорный орган по защите данных вашей страны.</p>
              <p className="mb-4"><strong>Для пользователей из Казахстана:</strong> Вы можете обратиться в уполномоченный орган по защите прав субъектов персональных данных Республики Казахстан.</p>
            </section>

            <section id="cookies-tracking">
              <h2 className="text-2xl font-semibold mb-4">9. ФАЙЛЫ COOKIE И ТЕХНОЛОГИИ ОТСЛЕЖИВАНИЯ</h2>

              <h3 className="text-xl font-semibold mb-3">9.1 Использование файлов cookie</h3>
              <p className="mb-4">Провайдер использует минимальное количество файлов cookie:</p>

              <h4 className="text-lg font-semibold mb-2">Строго необходимые cookie (не требуют согласия):</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Сессионный cookie для аутентификации в личном кабинете</li>
                <li>Cookie для сохранения языковых предпочтений</li>
                <li>Cookie безопасности (токены CSRF)</li>
              </ul>
              <p className="mb-4">Срок действия: до конца сессии или 30 дней</p>

              <h4 className="text-lg font-semibold mb-2">Аналитические cookie (требуют согласия):</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Если включены: базовая аналитика использования веб-сайта (не платформы Sithub)</li>
                <li>Мы используем собственное решение (не Google Analytics)</li>
                <li>Данные анонимизируются</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">9.3 Отсутствие отслеживания</h3>
              <p className="mb-4">Мы <strong>НЕ используем:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Трекеры социальных сетей</li>
                <li>Рекламные трекеры</li>
                <li>Сторонние трекеры для профилирования</li>
                <li>Системы межсайтового отслеживания</li>
              </ul>
            </section>

            <section id="data-retention">
              <h2 className="text-2xl font-semibold mb-4">10. ХРАНЕНИЕ ДАННЫХ</h2>

              <h3 className="text-xl font-semibold mb-3">10.1 Сроки хранения</h3>
              <div className="mb-4">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">Тип данных</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Срок хранения</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Правовое основание</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Информация о подписке</td>
                      <td className="border border-gray-700 px-4 py-2">Срок действия + 1 год</td>
                      <td className="border border-gray-700 px-4 py-2">Возможные споры, возвраты средств</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Платёжные записи</td>
                      <td className="border border-gray-700 px-4 py-2">7 лет после транзакции</td>
                      <td className="border border-gray-700 px-4 py-2">Налоговое законодательство Казахстана, ЕС</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Хеши лицензионных ключей</td>
                      <td className="border border-gray-700 px-4 py-2">Срок действия + 1 год</td>
                      <td className="border border-gray-700 px-4 py-2">Предотвращение злоупотреблений</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Журналы запросов обновлений</td>
                      <td className="border border-gray-700 px-4 py-2">90 дней</td>
                      <td className="border border-gray-700 px-4 py-2">Техническая поддержка, безопасность</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Техническая телеметрия</td>
                      <td className="border border-gray-700 px-4 py-2">1 год</td>
                      <td className="border border-gray-700 px-4 py-2">Улучшение сервиса</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Отчёты об ошибках</td>
                      <td className="border border-gray-700 px-4 py-2">2 года</td>
                      <td className="border border-gray-700 px-4 py-2">Исправление ошибок</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3">10.2 Удаление по истечении срока</h3>
              <p className="mb-4">По истечении срока хранения:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Данные автоматически помечаются для удаления</li>
                <li>Окончательное удаление происходит в течение 30 дней</li>
                <li>Резервные копии перезаписываются в течение 90 дней</li>
                <li>Журналы удаления сохраняются для аудита</li>
              </ul>
            </section>

            <section id="childrens-privacy">
              <h2 className="text-2xl font-semibold mb-4">11. КОНФИДЕНЦИАЛЬНОСТЬ ДЕТЕЙ</h2>

              <h3 className="text-xl font-semibold mb-3">11.1 Возрастные ограничения</h3>
              <p className="mb-4">Sithub не предназначен для использования лицами моложе 18 лет. Это профессиональный инструмент разработки и корпоративное программное обеспечение. Мы сознательно не собираем данные лиц моложе 18 лет.</p>

              <h3 className="text-xl font-semibold mb-3">11.2 Исключение: использование с согласия родителей</h3>
              <p className="mb-4">Лица в возрасте от 16 до 18 лет могут использовать Sithub с письменного согласия родителей или законных представителей.</p>
            </section>

            <section id="user-responsibilities">
              <h2 className="text-2xl font-semibold mb-4">12. ВАШИ ОБЯЗАННОСТИ ПО ЗАЩИТЕ ДАННЫХ</h2>

              <h3 className="text-xl font-semibold mb-3">12.1 Обязанности Пользователя</h3>
              <p className="mb-4">Провайдер обеспечивает конфиденциальность на уровне архитектуры. Вы несёте ответственность за:</p>

              <h4 className="text-lg font-semibold mb-2">Безопасность инфраструктуры:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Правильную настройку межсетевого экрана</li>
                <li>Контроль доступа к серверам, на которых развёрнут Sithub</li>
                <li>Регулярное обновление операционной системы</li>
                <li>Физическую безопасность оборудования</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Предотвращение ручной передачи данных:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Не загружайте код вручную во внешние облачные сервисы</li>
                <li>Не копируйте репозитории в общедоступные сервисы (GitHub, GitLab и т. д.)</li>
                <li>Обучайте разработчиков принципам безопасной работы</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Управление пользователями:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Контролируйте, кто имеет доступ к Sithub</li>
                <li>Используйте надёжные пароли и многофакторную аутентификацию</li>
                <li>Своевременно отзывайте доступ уволенных сотрудников</li>
                <li>Применяйте принцип минимальных привилегий</li>
              </ul>
            </section>

            <section id="transparency-report">
              <h2 className="text-2xl font-semibold mb-4">13. ОТЧЁТ О ПРОЗРАЧНОСТИ</h2>

              <h3 className="text-xl font-semibold mb-3">13.1 Приверженность прозрачности</h3>
              <p className="mb-4">Провайдер привержен прозрачности в отношении запросов правоохранительных органов, инцидентов безопасности и изменений в практиках обработки данных.</p>

              <h3 className="text-xl font-semibold mb-3">13.2 Уведомление об инцидентах безопасности</h3>
              <p className="mb-4">В случае нарушения безопасности данных:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Уведомление Пользователей:</strong> в течение 72 часов с момента обнаружения</li>
                <li><strong>Содержание уведомления:</strong> характер инцидента, затронутые категории данных, рекомендации для Пользователей</li>
                <li><strong>Способ уведомления:</strong> электронная почта + уведомление в интерфейсе Sithub</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">13.3 Раскрытие запросов правоохранительных органов</h3>
              <p className="mb-4">Провайдер будет уведомлять Пользователей о запросах правоохранительных органов, за исключением случаев, когда уведомление запрещено судебным предписанием, с указанием характера запроса и с предоставлением копии запроса (если это разрешено).</p>
            </section>

            <section id="dpa">
              <h2 className="text-2xl font-semibold mb-4">14. СОГЛАШЕНИЕ ОБ ОБРАБОТКЕ ДАННЫХ (DPA) ДЛЯ КОРПОРАТИВНЫХ КЛИЕНТОВ ИЗ ЕС</h2>

              <h3 className="text-xl font-semibold mb-3">14.1 Применимость DPA</h3>
              <p className="mb-4">Для корпоративных клиентов из Европейского союза, использующих Sithub для обработки персональных данных своих сотрудников, Провайдер предоставляет Соглашение об обработке данных (DPA).</p>

              <h3 className="text-xl font-semibold mb-3">14.2 Содержание DPA</h3>
              <p className="mb-4">DPA включает:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Стандартные договорные условия ЕС (SCC)</li>
                <li>Описание предмета и продолжительности обработки</li>
                <li>Характер и цели обработки</li>
                <li>Типы персональных данных</li>
                <li>Категории субъектов данных</li>
                <li>Обязанности и права контролёра и обработчика</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">14.3 Запрос DPA</h3>
              <p className="mb-4">Для запроса DPA: направьте запрос на info@silenceai.net, укажите название вашей организации и контактную информацию. DPA будет предоставлено в течение 5 рабочих дней.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">15. ИЗМЕНЕНИЯ В ПОЛИТИКЕ КОНФИДЕНЦИАЛЬНОСТИ</h2>

              <h3 className="text-xl font-semibold mb-3">15.1 Право на изменение</h3>
              <p className="mb-4">Провайдер оставляет за собой право изменять настоящую Политику в связи с изменениями применимого законодательства, развитием функциональности Sithub, улучшением защиты прав Пользователей или изменениями в практиках обработки данных.</p>

              <h3 className="text-xl font-semibold mb-3">15.2 Уведомление об изменениях</h3>
              <p className="mb-4">О существенных изменениях (затрагивающих права или изменяющих практики обработки) уведомление направляется по электронной почте за 30 дней до даты вступления в силу, а также посредством уведомления в интерфейсе Sithub и публикации на веб-сайте с выделением изменений.</p>

              <h3 className="text-xl font-semibold mb-3">15.3 Согласие с изменениями</h3>
              <p className="mb-4">Продолжая использовать Sithub после вступления изменений в силу, вы подтверждаете согласие с обновлённой Политикой. Если вы не согласны с изменениями, вы имеете право прекратить использование Sithub с пропорциональным возвратом средств при отмене в течение 14 дней после уведомления о существенных изменениях.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">16. КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
              <p className="mb-4">Вопросы о конфиденциальности? Вопросы об этой политике? Вопросы о том, какие данные мы храним?</p>
              <p className="mb-4">Свяжитесь с нами:</p>
              <p className="mb-2"><strong>Электронная почта:</strong> info@silenceai.net</p>
              <p className="mb-4">Настоящая Политика конфиденциальности разработана для обеспечения прозрачности наших практик обработки данных и защиты ваших прав. Sithub построен на принципе минимизации сбора данных: мы собираем только информацию, необходимую для предоставления услуг, и никогда не получаем доступ к вашему исходному коду.</p>
            </section>
          </div>

          <p className="mt-8 text-sm text-gray-400">Дата вступления в силу: 13 января 2026 г.</p>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default RuSithubPrivacy;
