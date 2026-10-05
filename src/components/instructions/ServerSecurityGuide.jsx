"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, LayoutDashboard, List, Mail, Menu, Server, X } from "lucide-react";

const slugify = (value) => value
  .normalize("NFKC")
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, "-")
  .replace(/(^-|-$)/g, "");
const inline = (text) => text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
  if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
  if (part.startsWith("`") && part.endsWith("`")) return <code key={index} dir="ltr" className="inline-block rounded bg-blue-300/10 px-1.5 py-0.5 font-mono text-sm text-blue-100">{part.slice(1, -1)}</code>;
  const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (link) return <a key={index} href={link[2]} className="text-blue-300 underline decoration-blue-500/40 underline-offset-4 transition hover:text-blue-200">{link[1]}</a>;
  return part;
});

function parseGuide(markdown, headingIds = []) {
  const lines = markdown.replace(/\r/g, "").split("\n"); const blocks = []; let index = 0; let headingIndex = 0;
  while (index < lines.length) {
    const line = lines[index]; if (!line.trim()) { index++; continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)$/); if (heading) { blocks.push({ type: "heading", level: heading[1].length, text: heading[2], id: headingIds[headingIndex] || slugify(heading[2]) }); headingIndex++; index++; continue; }
    if (line.startsWith("> ")) { blocks.push({ type: "callout", text: line.slice(2) }); index++; continue; }
    if (/^\|/.test(line) && /^\|[-| :]+\|$/.test(lines[index + 1] || "")) { const row = (value) => value.split("|").slice(1, -1).map((cell) => cell.trim()); const headers = row(line); const rows = []; index += 2; while (index < lines.length && /^\|/.test(lines[index])) { rows.push(row(lines[index])); index++; } blocks.push({ type: "table", headers, rows }); continue; }
    const listItem = line.match(/^(\s*)(?:(\d+)\.|[-*+])\s+(.+)$/);
    if (listItem) {
      const ordered = Boolean(listItem[2]);
      const items = [];
      while (index < lines.length) {
        const match = lines[index].match(/^(\s*)(?:(\d+)\.|[-*+])\s+(.+)$/);
        if (!match) break;
        const depth = match[1].replace(/\t/g, "    ").length;
        if (depth > 0 && items.length) {
          items[items.length - 1].children.push({ text: match[3] });
        } else if (depth === 0 && Boolean(match[2]) === ordered) {
          items.push({ text: match[3], children: [] });
        } else {
          break;
        }
        index++;
      }
      blocks.push({ type: ordered ? "ordered" : "unordered", items });
      continue;
    }
    const paragraph = [line.trim()]; index++; while (index < lines.length && lines[index].trim() && !/^(#{1,6})\s|^> |^\||^\s*(?:[-*+]|\d+\.)\s/.test(lines[index])) { paragraph.push(lines[index].trim()); index++; } blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  } return blocks;
}

function buildChapters(blocks, chapterLevel = 1, overviewTitle = "Overview") {
  const chapters = [];
  let chapter = null;
  let section = null;

  for (const block of blocks) {
    if (block.type === "heading" && block.level < chapterLevel) {
      if (chapterLevel > 1 && !chapter) {
        chapter = { id: `${block.id}-overview`, title: overviewTitle, sections: [], description: "" };
        chapters.push(chapter);
        section = null;
      }
      continue;
    }

    if (block.type === "heading" && block.level === chapterLevel) {
      chapter = { id: block.id, title: block.text, sections: [], description: "" };
      chapters.push(chapter);
      section = null;
      continue;
    }

    if (!chapter) continue;

    if (block.type === "heading" && block.level === chapterLevel + 1) {
      section = { id: block.id, title: block.text, blocks: [] };
      chapter.sections.push(section);
      continue;
    }

    if (!section) {
      section = { id: chapter.id, title: chapter.title, blocks: [] };
      chapter.sections.push(section);
    }
    section.blocks.push(block);
  }

  return chapterLevel === 1
    ? chapters.filter((item) => item.title !== "Silence AI")
    : chapters;
}

function filterChapters(chapters, view) {
  if (!view) return chapters;

  if (view.chapterRules) {
    return chapters.flatMap((chapter) => {
      const rule = view.chapterRules.find((item) => chapter.title.startsWith(`${item.chapter} `));
      if (!rule) return [];
      if (rule.sections === true) return [chapter];

      const sections = chapter.sections.filter((section) =>
        rule.sections.some((prefix) => section.title.startsWith(`${prefix} `))
      );
      return sections.length > 0 ? [{ ...chapter, sections }] : [];
    });
  }

  if (!view.chapters) return chapters;

  return chapters.flatMap((chapter) => {
    const rule = view.chapters[chapter.title];
    if (!rule) return [];
    if (rule === true) return [chapter];

    const sections = chapter.sections.filter((section) => rule.includes(section.title));
    return sections.length > 0 ? [{ ...chapter, sections }] : [];
  });
}

function Block({ block }) {
  if (block.type === "heading") return <h4 className="mt-7 break-words text-lg font-bold text-emerald-200">{block.text}</h4>;
  if (block.type === "callout") return <div className="my-5 flex gap-3 rounded-xl border border-blue-400/20 bg-blue-400/5 p-5 text-sm leading-7 text-blue-50 shadow-[0_0_28px_-15px_rgba(59,130,246,.55)]"><AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-blue-300" /><p>{inline(block.text)}</p></div>;
  if (block.type === "ordered" || block.type === "unordered") { const Tag = block.type === "ordered" ? "ol" : "ul"; return <Tag className={`${block.type === "ordered" ? "list-decimal" : "list-disc"} ms-6 my-5 space-y-3 ps-3 leading-7 text-slate-300 marker:text-blue-400`}>{block.items.map((item, index) => <li key={index}>{inline(item.text)}{item.children.length > 0 && <ul className="mt-2 list-disc space-y-1.5 ps-6 marker:text-emerald-400">{item.children.map((child, childIndex) => <li key={childIndex}>{inline(child.text)}</li>)}</ul>}</li>)}</Tag>; }
  if (block.type === "table") return <div className="my-5 overflow-x-auto rounded-xl border border-white/10 bg-[#040e1c]/80 shadow-[0_15px_45px_-30px_rgba(59,130,246,.45)]"><table className="min-w-full text-start text-sm"><thead className="bg-gradient-to-r from-blue-500/15 to-emerald-500/10 text-blue-100"><tr>{block.headers.map((cell, index) => <th key={index} className="whitespace-nowrap px-4 py-3 font-semibold">{inline(cell)}</th>)}</tr></thead><tbody className="divide-y divide-white/5">{block.rows.map((row, rowIndex) => <tr key={rowIndex} className="transition hover:bg-white/[.025]">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 align-top leading-6 text-slate-300">{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
  return <p className="break-words leading-7 text-slate-300">{inline(block.text)}</p>;
}

export default function ServerSecurityGuide({ markdown, anchorMarkdown, locale = "en", direction = "ltr", pageTitle = "Server Security Instruction Guide", productLabel = "Server Security", chapterHeadingLevel = 1, chapterAudienceLabels = {}, uiLabels = {}, guideViews = [], defaultViewId }) {
  const labels = {
    sections: "Sections",
    topic: "topic",
    topics: "topics",
    overview: "Overview",
    reference: "Reference",
    closeSections: "Close sections",
    guideSelector: "Choose instruction system",
    ...uiLabels,
  };
  const headingIds = useMemo(() => parseGuide(anchorMarkdown || markdown).filter((block) => block.type === "heading").map((block) => block.id), [anchorMarkdown, markdown]);
  const allChapters = useMemo(() => buildChapters(parseGuide(markdown, headingIds), chapterHeadingLevel, labels.overview), [markdown, headingIds, chapterHeadingLevel, labels.overview]);
  const [activeViewId, setActiveViewId] = useState(defaultViewId || guideViews[0]?.id || "");
  const activeView = guideViews.find((view) => view.id === activeViewId);
  const chapters = useMemo(() => filterChapters(allChapters, activeView), [allChapters, activeView]);
  const [activeChapterId, setActiveChapterId] = useState(() => chapters[0]?.id || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const chapterRefs = useRef(new Map());
  const desktopSectionListRef = useRef(null);
  const desktopSectionButtonRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveChapterId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1] }
    );

    chapterRefs.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [chapters]);

  useEffect(() => {
    const container = desktopSectionListRef.current;
    const activeButton = desktopSectionButtonRefs.current.get(activeChapterId);
    if (!container || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const edgePadding = 8;

    if (buttonRect.top < containerRect.top + edgePadding) {
      container.scrollTo({
        top: container.scrollTop + buttonRect.top - containerRect.top - edgePadding,
        behavior: "smooth",
      });
    } else if (buttonRect.bottom > containerRect.bottom - edgePadding) {
      container.scrollTo({
        top: container.scrollTop + buttonRect.bottom - containerRect.bottom + edgePadding,
        behavior: "smooth",
      });
    }
  }, [activeChapterId]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const audienceLabel = (chapterTitle) => activeView?.label || chapterAudienceLabels[chapterTitle] || productLabel;

  const chooseView = (view) => {
    setActiveViewId(view.id);
    const firstChapter = filterChapters(allChapters, view)[0];
    setActiveChapterId(firstChapter?.id || "");
    setMenuOpen(false);
  };

  const chooseChapter = (id) => {
    setActiveChapterId(id);
    setMenuOpen(false);
    chapterRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionButtons = (mobile = false) => chapters.map((item) => {
    const isActive = item.id === activeChapterId;
    const itemAudience = activeView?.label || chapterAudienceLabels[item.title];
    return (
      <button
        key={item.id}
        ref={mobile ? undefined : (node) => {
          if (node) desktopSectionButtonRefs.current.set(item.id, node);
          else desktopSectionButtonRefs.current.delete(item.id);
        }}
        onClick={() => chooseChapter(item.id)}
        className={`group relative w-full overflow-hidden rounded-xl border p-4 text-start transition-all duration-300 ${
          isActive
            ? "border-blue-500/40 bg-gradient-to-r from-blue-950/70 via-blue-950/35 to-black shadow-[0_0_28px_rgba(37,99,235,0.18)]"
            : "border-transparent bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.055]"
        } ${mobile ? "min-h-[74px]" : ""}`}
        aria-current={isActive ? "location" : undefined}
      >
        {isActive && (
          <span className="absolute start-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-e-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.95)]" />
        )}
        <span className={`block text-sm font-semibold transition-colors ${isActive ? "text-blue-100" : "text-slate-400 group-hover:text-white"}`}>
          {item.title}
        </span>
        {itemAudience && (
          <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${activeView?.id === "workspace" ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300" : activeView?.id === "admin" ? "border-blue-500/25 bg-blue-500/10 text-blue-300" : "border-white/10 bg-white/5 text-slate-400"}`}>
            {itemAudience}
          </span>
        )}
        <span className="mt-1 block text-[11px] leading-relaxed text-slate-600">
          {item.sections.length} {item.sections.length === 1 ? labels.topic : labels.topics}
        </span>
      </button>
    );
  });

  return (
    <div lang={locale} dir={direction} className="relative min-h-screen w-full overflow-hidden bg-black text-slate-200 selection:bg-blue-600/40 selection:text-white">
      <div className="pointer-events-none fixed inset-0 bg-black">
        <div className="absolute -left-56 -top-56 h-[40rem] w-[40rem] rounded-full bg-blue-700/[0.08] blur-[170px]" />
        <div className="absolute -bottom-64 right-[5%] h-[38rem] w-[38rem] rounded-full bg-emerald-600/[0.06] blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-28 pt-28 sm:px-6 lg:px-8">
        <div className="pt-2 lg:ps-[334px]">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {pageTitle}
          </h1>
          <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-500/45 via-emerald-500/15 to-transparent" />
          {guideViews.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-[#03050a]/90 p-1.5" role="tablist" aria-label={labels.guideSelector}>
              {guideViews.map((view) => {
                const selected = view.id === activeViewId;
                const Icon = view.id === "workspace" ? Mail : LayoutDashboard;
                return (
                  <button
                    key={view.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => chooseView(view)}
                    className={`flex min-w-0 items-center gap-3 rounded-xl border px-3 py-3 text-start transition-all duration-300 sm:px-4 ${selected ? view.id === "workspace" ? "border-emerald-500/35 bg-emerald-500/10 text-white shadow-[0_0_24px_rgba(16,185,129,0.12)]" : "border-blue-500/40 bg-blue-500/10 text-white shadow-[0_0_24px_rgba(37,99,235,0.16)]" : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"}`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${selected ? view.id === "workspace" ? "text-emerald-400" : "text-blue-400" : "text-slate-600"}`} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold sm:text-base">{view.label}</span>
                      <span className="mt-0.5 hidden text-xs leading-5 text-slate-500 sm:block">{view.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="sticky top-24 z-30 mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/25 bg-black/90 py-3 text-sm font-semibold text-blue-100 shadow-[0_0_24px_rgba(37,99,235,0.16)] backdrop-blur-xl lg:hidden"
        >
          <Menu className="h-4 w-4" />{labels.sections}
        </button>

        <div className="mt-8 lg:ps-[334px]">
          <aside className="fixed bottom-6 top-24 z-30 hidden w-[280px] lg:block" style={{ insetInlineStart: "max(2rem, calc((100vw - 1500px) / 2 + 2rem))" }}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#03050a]/95 p-3 shadow-[0_24px_80px_-35px_rgba(0,0,0,1)] backdrop-blur-xl">
              <div className="flex items-center gap-2 px-3 pb-4 pt-2 text-slate-500">
                <List className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">{labels.sections}</span>
              </div>
              <div ref={desktopSectionListRef} className="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                {sectionButtons()}
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="space-y-24">
              {chapters.map((guideChapter, chapterIndex) => (
                <section
                  key={guideChapter.id}
                  id={guideChapter.id}
                  ref={(node) => {
                    if (node) chapterRefs.current.set(guideChapter.id, node);
                    else chapterRefs.current.delete(guideChapter.id);
                  }}
                  className="scroll-mt-28"
                >
                  <div className="mb-10">
                    <p className={`mb-2 text-xs font-bold uppercase tracking-[.2em] ${chapterIndex % 2 === 0 ? "text-blue-400" : "text-emerald-400"}`}>
                      {guideChapter.id.startsWith("appendix") ? labels.reference : audienceLabel(guideChapter.title)}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{guideChapter.title}</h2>
                    <div className={`mt-7 h-px w-full bg-gradient-to-r ${chapterIndex % 2 === 0 ? "from-blue-500/50 via-blue-500/15" : "from-emerald-500/45 via-emerald-500/15"} to-transparent`} />
                  </div>

                  <div className="relative space-y-16">
                    <div className={`absolute bottom-6 start-[18px] top-6 hidden w-px bg-gradient-to-b ${chapterIndex % 2 === 0 ? "from-blue-500/25" : "from-emerald-500/25"} to-transparent xl:block`} />
                    {guideChapter.sections.map((section, sectionIndex) => {
                      const implicitSection = section.id === guideChapter.id;
                      const green = (chapterIndex + sectionIndex) % 2 === 1;
                      return (
                        <section key={`${guideChapter.id}-${section.id}`} className="scroll-mt-28">
                          <div className={implicitSection ? "" : "flex gap-5 md:gap-6"}>
                            {!implicitSection && (
                              <div className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border shadow-lg ${
                                green
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/15"
                                  : "border-blue-500/35 bg-blue-500/10 text-blue-400 shadow-blue-500/20"
                              }`}>
                                <Server className="h-5 w-5" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              {!implicitSection && (
                                <h3 className={`${green ? "text-emerald-300" : "text-blue-300"} flex items-center gap-3 text-xl font-bold md:text-2xl`}>
                                  <span>{section.title}</span>
                                  <span className="h-px max-w-28 flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                                </h3>
                              )}
                              <div className={`${implicitSection ? "" : "mt-6"} space-y-4`}>
                                {section.blocks.map((block, blockIndex) => <Block key={blockIndex} block={block} />)}
                              </div>
                            </div>
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <button className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} aria-label={labels.closeSections} />
            <div className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col border-s border-blue-500/20 bg-black p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300">{labels.sections}</span>
                <button onClick={() => setMenuOpen(false)} aria-label={labels.closeSections} className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto">{sectionButtons(true)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
