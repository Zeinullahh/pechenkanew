"use client";

import { useState } from "react";
import Link from "next/link";
import { kazakhstanBankDetails } from "./kazakhstanBankDetails";

const entities = {
  kz: {
    name: "ТОО «Silence AI»",
    registration: "БИН 250840004804",
    address: "КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж",
    deployment: { en: "Kazakhstan", ru: "Казахстан" },
  },
  ae: {
    name: "Silence AI LLC",
    registration: "Licence Number 2539365.01",
    address: "Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE",
    deployment: {
      en: "United States or Europe; the assigned location is identified in the order or service plan",
      ru: "США или Европа; местонахождение предоставленного сервера указывается в заказе или сервисном плане",
    },
  },
};

const labels = {
  en: {
    heading: "Choose the contracting entity",
    explanation: "Choose the company you intend to contract with, or the company named in your existing order. This selection changes the policy you view; it does not change a signed contract.",
    options: { kz: "Kazakhstan", ae: "UAE" },
    company: "Legal entity",
    registration: "Registration",
    address: "Registered address",
    bank: "Bank details",
    deployment: "Customer deployment server",
    view: "View policy for",
    selected: "Selected",
  },
  ru: {
    heading: "Выберите сторону договора",
    explanation: "Выберите компанию, с которой намерены заключить договор, или компанию, указанную в действующем заказе. Выбор меняет отображаемую политику, но не изменяет подписанный договор.",
    options: { kz: "Казахстан", ae: "ОАЭ" },
    company: "Юридическое лицо",
    registration: "Регистрация",
    address: "Юридический адрес",
    bank: "Банковские реквизиты",
    deployment: "Сервер клиентского развёртывания",
    view: "Открыть политику:",
    selected: "Выбрано",
  },
};

function policyHref(region, policy) {
  return `/${region === "kz" ? "ru/kz" : "en/ae"}/policies/ai-csd/web/${policy}/`;
}

export default function WebJurisdictionSelector({ policy, active, locale = "en" }) {
  const [selection, setSelection] = useState(active || (locale === "ru" ? "kz" : "ae"));
  const selected = active || selection;
  const company = entities[selected];
  const copy = labels[locale === "ru" ? "ru" : "en"];
  const isLanding = !active;

  return (
    <section aria-label={copy.heading} className="mb-8 overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
      <div className="border-b border-white/10 px-5 py-5 sm:px-7">
        <h2 className="text-lg font-semibold text-white">{copy.heading}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-400">{copy.explanation}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 sm:gap-3 sm:p-5" role={isLanding ? "group" : "navigation"} aria-label={copy.heading}>
        {(["kz", "ae"]).map((region) => {
          const isSelected = selected === region;
          const styles = `flex min-h-14 items-center justify-center rounded-xl border px-4 text-center text-base font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 motion-reduce:transform-none ${isSelected ? "border-blue-400 bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:border-blue-300 hover:bg-blue-500" : "border-white/20 bg-white/5 text-zinc-200 hover:border-blue-400 hover:bg-blue-500/15 hover:text-blue-100 hover:shadow-[0_8px_20px_rgba(37,99,235,0.16)]"}`;
          return isLanding ? (
            <button key={region} type="button" aria-pressed={isSelected} onClick={() => setSelection(region)} className={styles}>{copy.options[region]}</button>
          ) : (
            <Link key={region} href={policyHref(region, policy)} lang={region === "kz" ? "ru" : "en"} aria-current={isSelected ? "page" : undefined} className={styles}>{copy.options[region]}</Link>
          );
        })}
      </div>

      <div className="mx-3 mb-3 rounded-xl border border-blue-400/25 bg-blue-500/[0.06] p-5 sm:mx-5 sm:mb-5 sm:p-6" aria-live={isLanding ? "polite" : undefined}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{copy.company}</p>
            <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{company.name}</h3>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200"><span className="size-1.5 rounded-full bg-blue-300" />{copy.selected}: {copy.options[selected]}</span>
        </div>
        <dl className="mt-5 grid gap-4 border-t border-white/10 pt-5 text-sm sm:grid-cols-2">
          <div><dt className="text-zinc-400">{copy.registration}</dt><dd className="mt-1 font-medium text-zinc-100">{company.registration}</dd></div>
          <div className="sm:col-span-2"><dt className="text-zinc-400">{copy.address}</dt><dd className="mt-1 leading-6 text-zinc-100">{company.address}</dd></div>
          {selected === "kz" && <div className="sm:col-span-2"><dt className="text-zinc-400">{copy.bank}</dt><dd className="mt-1 leading-6 text-zinc-100">ИИК (номер счёта): {kazakhstanBankDetails.account}; БИК банка: {kazakhstanBankDetails.bik}; наименование филиала: {kazakhstanBankDetails.branch}; КБе: {kazakhstanBankDetails.kbe}.</dd></div>}
          <div className="sm:col-span-2"><dt className="text-zinc-400">{copy.deployment}</dt><dd className="mt-1 leading-6 text-zinc-100">{company.deployment[locale === "ru" ? "ru" : "en"]}</dd></div>
        </dl>
        {isLanding && <Link href={policyHref(selected, policy)} lang={selected === "kz" ? "ru" : "en"} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(37,99,235,0.35)] active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 motion-reduce:transform-none">{copy.view} {copy.options[selected]} <span aria-hidden="true" className="ml-2">→</span></Link>}
      </div>
    </section>
  );
}
