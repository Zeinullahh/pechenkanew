import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, ShieldAlert } from "lucide-react";
import { articles } from "@/content/articles";
import styles from "./articles.module.css";

export const metadata = {
  title: "Articles | Silence",
  description: "Security news, research, and practical guidance from Silence.",
};

export default async function ArticlesPage({ params }) {
  const { locale } = await params;
  const [featured] = articles;

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.eyebrow}><span className={styles.signal} /> SILENCE / JOURNAL <span className={styles.eyebrowLine} /> 001</div>
        <section className={styles.intro} aria-labelledby="articles-title">
          <div>
            <p className={styles.kicker}>THE SECURITY BRIEF</p>
            <h1 id="articles-title">Stories behind<br /><em>the signal.</em></h1>
          </div>
          <p className={styles.introCopy}>Clear thinking on the threats shaping our digital world. Research, context, and practical next steps for the people defending it.</p>
        </section>

        <div className={styles.sectionHeading}><span>01 / LATEST STORY</span><span>FIELD NOTES &amp; ANALYSIS</span></div>
        <Link className={styles.feature} href={`/${locale}/articles/${featured.slug}`}>
          <div className={styles.featureVisual} aria-hidden="true">
            <div className={styles.visualGrid} />
            <div className={styles.orbitOne} /><div className={styles.orbitTwo} />
            <div className={styles.visualCore}><ShieldAlert size={44} strokeWidth={1.15} /></div>
            <div className={styles.visualTop}>THREAT REPORT <span>№ 001 / 2026</span></div>
            <div className={styles.visualBottom}>ROUTEROS <span>ACTIVE / 09.2026</span></div>
          </div>
          <div className={styles.featureBody}>
            <div className={styles.featureMeta}><span className={styles.category}>{featured.category}</span><span>{featured.dateLabel}</span></div>
            <h2>{featured.title}</h2>
            <p>{featured.dek}</p>
            <div className={styles.featureFooter}><span><BookOpen size={15} /> {featured.readingTime}</span><span className={styles.readLink}>Read the article <ArrowUpRight size={18} /></span></div>
          </div>
        </Link>

        <div className={styles.lowerRow}>
          <div><span className={styles.smallLabel}>A NOTE FROM THE EDITORS</span><h2>More clarity.<br />Less noise.</h2></div>
          <p>Our articles are designed for a deeper read: concise summaries up front, the technical details in context, and clear actions you can take away. More stories are on the way.</p>
          <Link href={`/${locale}/articles/${featured.slug}`} aria-label={`Read ${featured.title}`}><ArrowRight size={22} /></Link>
        </div>
      </div>
    </main>
  );
}
