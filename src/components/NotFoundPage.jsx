"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, House, Mail, X } from "lucide-react";
import { supportedLocales } from "@/i18n/locales.mjs";
import styles from "./NotFoundPage.module.css";

const copy = {
  en: { title: "Page not found", description: "The address may have changed, or the link may be incorrect. Let's get you back on track.", home: "Back to home", help: "Need help?", contact: "Please contact us at", close: "Close" },
  ru: { title: "Страница не найдена", description: "Возможно, адрес изменился или в ссылке есть ошибка. Вернитесь на главную страницу.", home: "На главную", help: "Нужна помощь?", contact: "Свяжитесь с нами по адресу", close: "Закрыть" },
  de: { title: "Seite nicht gefunden", description: "Die Adresse hat sich möglicherweise geändert oder der Link ist fehlerhaft. Zurück zur Startseite.", home: "Zur Startseite", help: "Benötigen Sie Hilfe?", contact: "Kontaktieren Sie uns unter", close: "Schließen" },
  fr: { title: "Page introuvable", description: "L’adresse a peut-être changé ou le lien est incorrect. Revenez à la page d’accueil.", home: "Retour à l’accueil", help: "Besoin d’aide ?", contact: "Contactez-nous à l’adresse", close: "Fermer" },
  ja: { title: "ページが見つかりません", description: "アドレスが変更されたか、リンクに誤りがある可能性があります。ホームページにお戻りください。", home: "ホームに戻る", help: "お困りですか？", contact: "お問い合わせ先", close: "閉じる" },
  ko: { title: "페이지를 찾을 수 없습니다", description: "주소가 변경되었거나 링크가 잘못되었을 수 있습니다. 홈으로 돌아가 주세요.", home: "홈으로 돌아가기", help: "도움이 필요하신가요?", contact: "문의 이메일", close: "닫기" },
  zh: { title: "页面未找到", description: "页面地址可能已更改，或链接有误。请返回首页。", home: "返回首页", help: "需要帮助？", contact: "请通过以下邮箱联系我们", close: "关闭" },
  ar: { title: "الصفحة غير موجودة", description: "ربما تغير عنوان الصفحة أو كان الرابط غير صحيح. يمكنك العودة إلى الصفحة الرئيسية.", home: "العودة إلى الرئيسية", help: "هل تحتاج إلى مساعدة؟", contact: "يرجى التواصل معنا عبر", close: "إغلاق" },
  tr: { title: "Sayfa bulunamadı", description: "Adres değişmiş veya bağlantı hatalı olabilir. Ana sayfaya dönebilirsiniz.", home: "Ana sayfaya dön", help: "Yardıma mı ihtiyacınız var?", contact: "Lütfen bize şu adresten ulaşın", close: "Kapat" },
};

const localePattern = new RegExp(`^/(${supportedLocales.join("|")})(?:/|$)`);

export default function NotFoundPage() {
  const [locale, setLocale] = useState("en");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const resolvedLocale = window.location.pathname.match(localePattern)?.[1] ?? "en";
    setLocale(resolvedLocale);
    document.body.classList.add("not-found-page");

    return () => document.body.classList.remove("not-found-page");
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isHelpOpen && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!isHelpOpen && dialog.open) {
      dialog.close();
    }
  }, [isHelpOpen]);

  const message = copy[locale];

  return (
    <div className={styles.page} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <main className={styles.inner}>
        <section className={styles.hero} aria-labelledby="not-found-title">
          <div className={styles.copy}>
            <div className={styles.eyebrow}><span className={styles.statusDot} /> ERROR 404</div>
            <h1 id="not-found-title">{message.title}</h1>
            <p>{message.description}</p>

            <div className={styles.actions}>
              <a href="/" className={styles.homeButton}>
                <House size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>{message.home}</span>
                <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <button type="button" className={styles.helpLink} onClick={() => setIsHelpOpen(true)}>
                <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>{message.help}</span>
              </button>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.halo} />
            <div className={styles.orbitOuter} />
            <div className={styles.orbitInner} />
            <span className={styles.orbitPoint} />
            <span className={styles.errorNumber}>404</span>
            <div className={styles.visualCaption}><span /> ROUTE NOT FOUND</div>
          </div>
        </section>

      </main>
      <dialog
        ref={dialogRef}
        className={styles.helpDialog}
        aria-labelledby="not-found-help-title"
        aria-describedby="not-found-help-description"
        onClose={() => setIsHelpOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsHelpOpen(false);
        }}
      >
        <div className={styles.helpDialogContent}>
          <button ref={closeButtonRef} type="button" className={styles.closeButton} aria-label={message.close} onClick={() => setIsHelpOpen(false)}>
            <X size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <div className={styles.helpDialogIcon}><Mail size={23} strokeWidth={1.7} aria-hidden="true" /></div>
          <h2 id="not-found-help-title">{message.help}</h2>
          <p id="not-found-help-description">
            {message.contact}{" "}
            <a href="mailto:info@silenceai.net" className={styles.contactEmail}>info@silenceai.net</a>
          </p>
        </div>
      </dialog>
    </div>
  );
}
