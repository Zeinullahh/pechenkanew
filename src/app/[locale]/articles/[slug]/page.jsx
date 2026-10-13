import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock3, ShieldAlert } from "lucide-react";
import { articles, getArticle } from "@/content/articles";
import styles from "../articles.module.css";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: `${article.title} | Silence Articles`, description: article.dek };
}

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main className={`${styles.page} ${styles.articlePage}`}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.articleShell}>
        <Link className={styles.backLink} href={`/${locale}/articles`}><ArrowLeft size={16} /> All articles</Link>
        <div className={styles.articleTopline}><span className={styles.category}>{article.category}</span><span>FIELD NOTE / 001</span></div>
        <header className={styles.articleHeader}>
          <h1>{article.title}</h1>
          <p>{article.dek}</p>
          <div className={styles.articleMeta}><span>By Silence editorial</span><span>{article.dateLabel}</span><span><Clock3 size={14} /> {article.readingTime}</span></div>
        </header>
        <div className={styles.articleHero} aria-hidden="true"><div className={styles.visualGrid} /><div className={styles.heroOrb} /><ShieldAlert size={76} strokeWidth={1} /><span>THREAT INTELLIGENCE / ROUTEROS</span><strong>01 — 06</strong></div>
        <div className={styles.sourceNote}>Based on reporting by <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">{article.source} <ArrowUpRight size={14} /></a>. This is an editorial summary; consult the original advisory for the full technical detail and latest guidance.</div>

        <div className={styles.articleGrid}>
          <aside className={styles.articleAside} aria-label="On this page">
            <p>IN THIS ARTICLE</p>
            <a href="#overview">01 <span>The situation</span></a>
            <a href="#vulnerabilities">02 <span>The vulnerabilities</span></a>
            <a href="#indicators">03 <span>Signs of compromise</span></a>
            <a href="#response">04 <span>What to do now</span></a>
            <a className={styles.asideSource} href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Original report <ArrowUpRight size={14} /></a>
          </aside>
          <article className={styles.articleContent}>
            <div className={styles.summary}><span>THE SHORT VERSION</span><p>CERT Polska reports active exploitation of a two flaw SSH chain affecting MikroTik RouterOS. Devices with SSH reachable from public networks are at particular risk. Install a fixed release, then inspect the device for signs of unauthorized changes.</p></div>
            <section id="overview"><span className={styles.sectionNumber}>01 / OVERVIEW</span><h2>The situation</h2><p>CERT Polska identified six RouterOS vulnerabilities and confirmed attacks using a chain it calls MikroTrick. The chain can give an unauthenticated attacker full control of a device when its SSH service is exposed to the internet.</p><p>MikroTik has released fixes. According to CERT Polska, the patched releases prevent the attacks it observed. Updating is the first priority, followed by a careful review of logs and configuration.</p></section>
            <section id="vulnerabilities"><span className={styles.sectionNumber}>02 / TECHNICAL CONTEXT</span><h2>Three flaws to understand</h2><p>The research covers several RouterOS components. These three findings explain much of the immediate risk:</p><div className={styles.cveList}><div><span>CVE-2026-67276 <b>CVSS 9.2</b></span><h3>SSH authentication bypass</h3><p>Incomplete public key validation could let an attacker authenticate as a known user without that user’s private key.</p></div><div><span>CVE-2026-86060 <b>CVSS 9.2</b></span><h3>SSH privilege manipulation</h3><p>A crafted username could turn an SSH session into one with full administrative privileges.</p></div><div><span>CVE-2026-67277 <b>CVSS 8.8</b></span><h3>Bandwidth-test memory exposure</h3><p>A separate service flaw could disclose kernel memory or cause a remote restart.</p></div></div></section>
            <section id="indicators"><span className={styles.sectionNumber}>03 / INVESTIGATION</span><h2>Look beyond the patch</h2><p>Updating closes the known vulnerabilities, but administrators also need to check whether a device was already changed. CERT Polska recommends reviewing unknown users, scripts, scheduler tasks, proxy servers, and tunnels.</p><p>The report highlights an unexpected high privilege account named <code>ops</code> and particular SSH log entries as possible indicators. RouterOS’s “Flagged” marker can identify selected suspicious changes; its absence does not prove the device is clean.</p><div className={styles.pullQuote}>“The absence of the marker does not rule out an earlier compromise.”<span>— CERT Polska</span></div></section>
            <section id="response"><span className={styles.sectionNumber}>04 / RESPONSE</span><h2>What to do now</h2><ol className={styles.steps}><li><strong>Update RouterOS.</strong> CERT Polska lists fixed versions 7.25beta3, 7.24.2, 7.23.4, and 6.49.21. Check the vendor’s bulletin for the release appropriate to your device.</li><li><strong>Review the device.</strong> Inspect logs, the Flagged marker, user accounts, scripts, scheduled tasks, and other configuration changes.</li><li><strong>Contain suspected compromise.</strong> Isolate the device and preserve logs and configuration before resetting it. Rebuild from a trusted configuration and rotate affected credentials.</li></ol><p>If an update must be delayed, restrict exposed management services to trusted networks. This is a temporary measure; the update remains necessary.</p></section>
            <div className={styles.articleEnd}><span>END OF ARTICLE / 001</span><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Read the full CERT Polska report <ArrowUpRight size={16} /></a></div>
          </article>
        </div>
        <Link className={styles.returnCard} href={`/${locale}/articles`}><span>KEEP READING</span><strong>Back to all articles</strong><ArrowUpRight size={22} /></Link>
      </div>
    </main>
  );
}
