"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const RuAiSocCookiesEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Политика использования файлов cookie (Email) - Silence AI';
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const sections = [
    { id: 'about', title: '1. О настоящей Политике использования файлов cookie' },
    { id: 'types-of-cookies', title: '2. Типы используемых нами файлов cookie' },
    { id: 'what-we-dont-use', title: '3. Что мы не используем' },
    { id: 'how-we-use-cookies', title: '4. Как мы используем технические файлы cookie' },
    { id: 'cookie-duration', title: '5. Срок действия и хранение файлов cookie' },
    { id: 'managing-cookies', title: '6. Управление настройками файлов cookie' },
    { id: 'third-party-services', title: '7. Сторонние сервисы' },
    { id: 'updates', title: '8. Обновления настоящей Политики использования файлов cookie' },
    { id: 'contact', title: '9. Контактная информация' },
    { id: 'relationship-to-policies', title: '10. Взаимосвязь с другими политиками' },
  ];

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={sections} />
        </div>
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-8">Политика использования файлов cookie — компонент Email</h1>
          <div className="space-y-8">
            <section id="about">
              <h2 className="text-2xl font-semibold mb-4">1. О настоящей Политике использования файлов cookie</h2>
            <p className="mb-4"><strong>1.1 Введение:</strong> Настоящая Политика объясняет использование файлов cookie в услуге Email Security по договору с ТОО &quot;Silence AI&quot; в Казахстане. Панель администратора CMC находится по адресу <strong>kz.mail.csd.silenceai.net</strong>, а рабочее пространство сотрудников — <strong>kz.mail.silenceai.net</strong>. Для договоров с Silence AI LLC в ОАЭ используются адреса <strong>mail.csd.silenceai.net</strong> и <strong>mail.silenceai.net</strong>. Администратор настраивает компанию, домены, учётные записи и безопасность в CMC; сотрудники читают, составляют, отправляют и управляют письмами в рабочем пространстве. Домены не определяют физическое расположение серверов.</p>
            <p><strong>1.2 Что такое файлы cookie:</strong> Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете или мобильном телефоне) при посещении веб-сайта. Они помогают веб-сайтам запоминать информацию о вашем посещении, что может упростить повторное посещение сайта и сделать его более полезным для вас.</p>
          </section>
            <section id="types-of-cookies">
              <h2 className="text-2xl font-semibold mb-4">2. Типы используемых нами файлов cookie</h2>
            <p className="mb-4"><strong>2.1 Технические файлы cookie:</strong> Необходимые cookie могут поддерживать сеанс входа, защиту учётной записи, настройки и навигацию в CMC и почтовом рабочем пространстве. Сами по себе cookie не выполняют и не гарантируют проверки писем.</p>
            <p><strong>2.2 Категории файлов cookie:</strong> Необходимые cookie используются для аутентификации и доступа к применимым доменам CMC и рабочего пространства. Если применяются необязательные технологии аналитики или настроек, их назначение и требуемый законом выбор должны быть раскрыты отдельно.</p>
          </section>
            <section id="what-we-dont-use">
              <h2 className="text-2xl font-semibold mb-4">3. Что мы не используем</h2>
            <p className="mb-4"><strong>3.1 Отсутствие маркетинговых и отслеживающих файлов cookie:</strong> Мы не используем: маркетинговые или рекламные файлы cookie, файлы cookie для отслеживания в социальных сетях, сторонние аналитические файлы cookie (за пределами строго необходимого), технологии межсайтового отслеживания, файлы cookie для поведенческого профилирования, необязательные сторонние файлы cookie.</p>
            <p><strong>3.2 Отсутствие передачи данных на основе файлов cookie:</strong> Мы не: передаём данные файлов cookie третьим лицам в маркетинговых целях, используем файлы cookie для таргетирования рекламы, создаём подробные профили пользователей для коммерческой эксплуатации, участвуем в обмене или продаже данных на основе файлов cookie.</p>
          </section>
            <section id="how-we-use-cookies">
              <h2 className="text-2xl font-semibold mb-4">4. Как мы используем технические файлы cookie</h2>
            <p className="mb-4"><strong>4.1 Управление сеансами:</strong> Необходимые cookie могут поддерживать вход и защищать доступ к CMC на kz.mail.csd.silenceai.net и рабочему пространству на kz.mail.silenceai.net. Каждый домен может иметь собственный сеанс.</p>
            <p className="mb-4"><strong>4.2 Функции безопасности:</strong> Технические cookie могут поддерживать защиту сеанса и учётной записи, включая меры против несанкционированного доступа и подделки межсайтовых запросов (CSRF).</p>
            <p><strong>4.3 Функциональность платформы:</strong> Cookie могут сохранять настройки интерфейса и поддерживать просмотр папок и результатов проверок Email Security. Проверки писем зависят от настроек услуги и условий, указанных в Условиях предоставления услуг; Сообщение, признанное только подделанным, направляется в Spam, а название папки не доказывает выполнение всех проверок.</p>
          </section>
            <section id="cookie-duration">
              <h2 className="text-2xl font-semibold mb-4">5. Срок действия и хранение файлов cookie</h2>
            <p className="mb-4"><strong>5.1 Сеансовые файлы cookie:</strong> Большинство наших файлов cookie являются сеансовыми и: истекают при закрытии браузера, автоматически удаляются после завершения сеанса, не сохраняются на вашем устройстве в течение длительного времени.</p>
            <p><strong>5.2 Постоянные файлы cookie:</strong> Некоторые технические файлы cookie могут сохраняться для: целей аутентификации (обычно не более 30 дней), хранения пользовательских предпочтений (до их удаления вручную), поддержания настроек безопасности (в соответствии с конфигурацией пользователя).</p>
          </section>
            <section id="managing-cookies">
              <h2 className="text-2xl font-semibold mb-4">6. Управление настройками файлов cookie</h2>
            <p className="mb-4"><strong>6.1 Элементы управления браузера:</strong> Вы можете управлять файлами cookie через настройки вашего браузера: Chrome: {'Настройки > Конфиденциальность и безопасность > Файлы cookie и другие данные сайтов'}. Firefox: {'Настройки > Приватность и защита > Куки и данные сайтов'}. Safari: {'Настройки > Конфиденциальность > Управление данными веб-сайтов'}. Edge: {'Настройки > Файлы cookie и разрешения сайта > Файлы cookie и данные сайтов'}.</p>
            <p><strong>6.2 Последствия отключения технических файлов cookie:</strong> Блокировка cookie, необходимых для аутентификации, может помешать входу в CMC или рабочее пространство и просмотру данных учётной записи. Настройки cookie в браузере не определяют, какие серверные проверки писем выполняются для почтового ящика.</p>
          </section>
            <section id="third-party-services">
              <h2 className="text-2xl font-semibold mb-4">7. Сторонние сервисы</h2>
            <p className="mb-4"><strong>7.1 Ограниченное использование сторонних файлов cookie:</strong> Отдельные формы оплаты и интеграции могут использовать собственные cookie. По договорам с ТОО &quot;Silence AI&quot; в Казахстане платежи обрабатывает ТОО &quot;ФинCeрвисы&quot;; по договорам с Silence AI LLC в ОАЭ онлайн-платежи обрабатывает Paddle.com как продавец по платёжной операции (merchant of record). Применимые платёжные условия и сведения о cookie показывает фактическая форма оплаты.</p>
            <p><strong>7.2 Контроль сторонних файлов cookie:</strong> Любые сторонние файлы cookie ограничиваются: технической функциональностью, необходимой для наших сервисов, обработкой платежей и операциями выставления счетов, необходимыми потребностями в безопасности и инфраструктуре. Мы не разрешаем третьим лицам устанавливать необязательные отслеживающие или маркетинговые файлы cookie через нашу платформу.</p>
          </section>
            <section id="updates">
              <h2 className="text-2xl font-semibold mb-4">8. Обновления настоящей Политики использования файлов cookie</h2>
            <p className="mb-4"><strong>8.1 Изменения политики:</strong> Мы можем обновлять настоящую Политику использования файлов cookie, чтобы: отражать изменения в использовании нами файлов cookie, соответствовать обновлённым требованиям законодательства, повышать прозрачность наших практик.</p>
            <p><strong>8.2 Уведомление об изменениях:</strong> О существенных изменениях будет сообщаться посредством: уведомлений по электронной почте зарегистрированным пользователям, уведомлений на платформе, обновления даты публикации настоящей политики.</p>
          </section>
            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">9. Контактная информация</h2>
            <p>По вопросам об этой Политике обращайтесь по адресу info@silenceai.net. Сторона договора определяется заказом: для Казахстана — ТОО &quot;Silence AI&quot;, БИН 250840004804; для ОАЭ — Silence AI LLC, licence number 2539365.01.</p>
          </section>
            <section id="relationship-to-policies">
              <h2 className="text-2xl font-semibold mb-4">10. Взаимосвязь с другими политиками</h2>
            <p>Настоящая Политика дополняет Условия предоставления услуг, Условия использования и Политику конфиденциальности Email Security по применимому региональному договору. Они доступны в разделе политик AI-CSD Email на сайте.</p>
          </section>
          </div>
          <p className="mt-8 text-sm text-gray-400">Последнее обновление: 22.09.2025</p>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default RuAiSocCookiesEmail;
