"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMessages } from "next-intl";
import {
    ShieldCheck,
    Menu,
    Hash,
    X,
    ChevronRight,
    Globe,
    User,
    Server,
    Settings,
    Sparkles,
    Lock,
    Database,
    KeyRound,
    BadgeCheck,
    CornerUpRight,
    PenLine,
    Clock,
    Paperclip,
    FolderKanban,
    CreditCard
} from "lucide-react";

const calloutClassMap = {
    info: "border border-purple-500/20 bg-purple-500/5 text-purple-200 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]",
    warning: "border border-blue-500/20 bg-blue-500/5 text-blue-200 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]",
    success: "border border-emerald-500/20 bg-emerald-500/5 text-emerald-200 shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]",
};

const transition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };
const HEADER_OFFSET = 120;
const CONTENT_SCROLL_OFFSET = 120;
const FIRST_SECTION_SCROLL_MARGIN = 140;

const getTheme = (title) => {
    const t = (title || "").toLowerCase();
    if (/admin|config|setup|server/.test(t)) return 'admin';
    if (/dns|domain|record|spf|dkim|dmarc/.test(t)) return 'domain';
    if (/user|employee|client/.test(t)) return 'user';
    return 'default';
};

const themeStyles = {
    admin: {
        icon: Settings,
        text: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        glow: "shadow-purple-500/20",
        decoration: "from-purple-500/40"
    },
    domain: {
        icon: Globe,
        text: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        glow: "shadow-violet-500/20",
        decoration: "from-violet-500/40"
    },
    user: {
        icon: User,
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        glow: "shadow-emerald-500/20",
        decoration: "from-emerald-500/40"
    },
    default: {
        icon: ShieldCheck,
        text: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        glow: "shadow-purple-500/20",
        decoration: "from-purple-500/40"
    }
};

const getIconForSection = (title, fallbackIcon) => {
    const t = (title || "").toLowerCase();

    if (/dns|record/.test(t)) return Database;
    if (/spf/.test(t)) return ShieldCheck;
    if (/dkim/.test(t)) return KeyRound;
    if (/dmarc/.test(t)) return BadgeCheck;
    if (/authentication|oauth|login/.test(t)) return Lock;
    if (/users|account|quota/.test(t)) return User;
    if (/forwarding/.test(t)) return CornerUpRight;
    if (/signature/.test(t)) return PenLine;
    if (/auto-reply|vacation/.test(t)) return Clock;
    if (/attachments|antivirus/.test(t)) return Paperclip;
    if (/folders|rules/.test(t)) return FolderKanban;
    if (/payment|billing/.test(t)) return CreditCard;

    return fallbackIcon;
};

const BackgroundAmbience = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-full w-full bg-[#020617]">
        {/* Top-left purple glow */}
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
        {/* Bottom-right violet glow */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
        {/* Mid-top purple glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full" />
    </div>
);

const MobileDrawer = ({ title, closeLabel, isOpen, onClose, children }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="lg:hidden fixed inset-0 z-[60]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="absolute inset-y-0 right-0 w-full max-w-sm bg-[#0a0f1f] border-l border-white/10 shadow-2xl overflow-y-auto"
                >
                    <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0a0f1f]/80 backdrop-blur-md border-b border-white/5">
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-400">{title}</span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

const renderBodyBlock = (block, blockIndex) => {
    if (!block) return null;

    if (block.type === "paragraph") {
        return (
            <p key={`p-${blockIndex}`} className="text-slate-300 leading-7">
                {block.content}
            </p>
        );
    }

    if (block.type === "list") {
        return (
            <div key={`l-${blockIndex}`} className="space-y-3 my-4">
                {block.title && (
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        {block.title}
                    </div>
                )}
                <ul className="space-y-2">
                    {block.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-400/60 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (block.type === "orderedList") {
        return (
            <div key={`ol-${blockIndex}`} className="space-y-3 my-4">
                <ol className="space-y-2 counter-reset-list">
                    {block.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 leading-relaxed group">
                            <span className="flex h-5 w-5 items-center justify-center rounded border border-white/10 bg-white/5 text-xs font-medium text-slate-400 shrink-0 mt-1 group-hover:border-purple-500/30 group-hover:text-purple-400 transition-colors">
                                {idx + 1}
                            </span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

    if (block.type === "code") {
        return (
            <div key={`c-${blockIndex}`} className="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#02040a] shadow-inner">
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
                    <span className="ml-2 font-mono text-xs text-slate-500">Terminal</span>
                </div>
                <div className="overflow-x-auto p-4">
                    <pre className="font-mono text-sm text-purple-50">
                        <code>{block.content}</code>
                    </pre>
                </div>
            </div>
        );
    }

    if (block.type === "callout") {
        const intent = block.intent || "info";
        return (
            <div key={`co-${blockIndex}`} className={cn(
                "my-5 rounded-xl border p-4 text-sm leading-relaxed backdrop-blur-sm",
                calloutClassMap[intent]
            )}>
                {block.content}
            </div>
        );
    }

    return null;
};

const EmailSecurityDocumentation = () => {
    const { t } = useLanguage();
    const messages = useMessages();
    const doc = messages?.documentation?.emailSecurity ?? {};
    const labels = messages?.documentation?.system ?? {};

    const chapters = useMemo(() => doc?.chapters ?? [], [doc]);
    const heroTitle = doc?.title ?? "System Documentation";
    const heroSubtitle = doc?.subtitle ?? "Reference";
    const heroDescription = doc?.description ?? "";

    const sectionRefs = useRef(new Map());
    const observerRef = useRef(null);
    const isProgrammaticScrollRef = useRef(false);
    const programmaticResetRef = useRef(null);

    const [activeChapter, setActiveChapter] = useState(() => chapters[0]?.id ?? "");
    const [activeSection, setActiveSection] = useState(() => chapters[0]?.sections?.[0]?.id ?? "");
    const [navOpen, setNavOpen] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);

    // Initial load sync
    useEffect(() => {
        if (!chapters.length) return;

        // Ensure activeChapter is valid
        const chapterExists = chapters.some(c => c.id === activeChapter);
        if (!chapterExists) {
            setActiveChapter(chapters[0].id);
        }
    }, [chapters, activeChapter]);

    const currentChapter = useMemo(() =>
        chapters.find(c => c.id === activeChapter) || chapters[0] || null
        , [chapters, activeChapter]);

    const currentSections = useMemo(() => currentChapter?.sections || [], [currentChapter]);

    // Update activeSection when chapter changes if needed
    useEffect(() => {
        if (currentSections.length > 0) {
            const sectionExists = currentSections.some(s => s.id === activeSection);
            if (!sectionExists) {
                setActiveSection(currentSections[0].id);
            }
        }
    }, [currentChapter, currentSections, activeSection]);

    // Handlers
    const resetProgrammaticState = useCallback(() => {
        if (programmaticResetRef.current) clearTimeout(programmaticResetRef.current);
        programmaticResetRef.current = setTimeout(() => {
            isProgrammaticScrollRef.current = false;
        }, 800);
    }, []);

    const handleChapterSelect = useCallback((chapterId) => {
        setActiveChapter(chapterId);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const scrollToSection = useCallback((sectionId) => {
        const node = sectionRefs.current.get(sectionId);
        if (!node) return;

        isProgrammaticScrollRef.current = true;
        const top = node.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 20;

        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(sectionId);
        resetProgrammaticState();
    }, [resetProgrammaticState]);

    // Intersection Observer for Scroll Spy
    useEffect(() => {
        const observerCallback = (entries) => {
            if (isProgrammaticScrollRef.current) return;

            const intersecting = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (intersecting.length > 0) {
                const sectionId = intersecting[0].target.id;
                if (sectionId) setActiveSection(sectionId);
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
            threshold: [0, 0.2, 0.4]
        });

        currentSections.forEach(section => {
            const node = sectionRefs.current.get(section.id);
            if (node) observer.observe(node);
        });

        return () => observer.disconnect();
    }, [currentSections]);

    return (
        <div className="relative min-h-screen w-full text-slate-200 selection:bg-purple-500/30 selection:text-purple-50">
            <BackgroundAmbience />

            <div className="relative z-10 w-full flex flex-col items-center">
                {/* HERO SECTION */}
                <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative">
                    {/* Background Glows for Hero */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 z-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/30 blur-[120px] rounded-full mix-blend-screen" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 w-full rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 via-violet-500/10 to-purple-500/40 shadow-[0_0_50px_-10px_rgba(168,85,247,0.25)]"
                    >
                        <div className="relative w-full overflow-hidden rounded-2xl bg-[#030712]/80 backdrop-blur-2xl">
                            {/* Grid & Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative p-8 md:p-12 lg:p-16 text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-200">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>{heroSubtitle}</span>
                                    </div>
                                </div>
                                <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                    <span className="bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-transparent">
                                        {heroTitle}
                                    </span>
                                </h1>
                                <p className="mx-auto max-w-2xl text-lg text-slate-300/80 font-light leading-relaxed">
                                    {heroDescription}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* VIDEO EMBED */}
                <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
                        <div className="relative w-full rounded-2xl overflow-hidden border border-purple-500/20 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] bg-black">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    src="https://www.youtube.com/embed/3lW9az21aDk"
                                    title="AI-CSD Email Security"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="relative w-full rounded-2xl overflow-hidden border border-purple-500/20 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] bg-black">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    src="https://www.youtube.com/embed/HGhDQ3bhk6o"
                                    title="AI-CSD Email Security Additional Info"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE CONTROLS */}
                <div className="lg:hidden w-full px-4 mb-8 flex gap-3 sticky top-4 z-40">
                    <button
                        onClick={() => setNavOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#030712]/80 backdrop-blur-md py-3 text-sm font-semibold shadow-lg active:scale-95 transition-all"
                    >
                        <Menu size={18} />
                        {labels.sections ?? "Sections"}
                    </button>
                    <button
                        onClick={() => setTocOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#030712]/80 backdrop-blur-md py-3 text-sm font-semibold shadow-lg active:scale-95 transition-all"
                    >
                        <Hash size={18} />
                        {labels.topics ?? "Topics"}
                    </button>
                </div>

                {/* MAIN CONTENT LAYOUT */}
                <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,220px)] gap-8 lg:gap-12 relative">

                        {/* LEFT SIDEBAR (Chapters) */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24 max-h-[calc(100vh-140px)] w-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="flex items-center gap-2 mb-6 px-2 text-slate-500">
                                    <Menu size={14} />
                                    <span className="text-xs font-bold uppercase tracking-widest">
                                        {labels.sections ?? "MENU"}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {chapters.map((chapter) => {
                                        const isActive = activeChapter === chapter.id;
                                        return (
                                            <button
                                                key={chapter.id}
                                                onClick={() => handleChapterSelect(chapter.id)}
                                                className={cn(
                                                    "relative w-full rounded-xl p-4 text-left transition-all duration-300 group overflow-hidden",
                                                    isActive
                                                        ? "border border-purple-500/30 bg-gradient-to-r from-purple-950/40 to-[#020617] shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                                                        : "border border-transparent bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
                                                )}
                                            >
                                                {isActive && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                                )}
                                                <div className={cn(
                                                    "text-sm font-semibold transition-colors mb-1",
                                                    isActive ? "text-purple-100" : "text-slate-400 group-hover:text-slate-200"
                                                )}>
                                                    {chapter.title}
                                                </div>
                                                <div className="text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                                                    {chapter.description}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </aside>

                        {/* CENTER CONTENT */}
                        <main className="min-w-0">
                            {/* Chapter Header */}
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                                    {currentChapter?.title}
                                </h2>
                                {currentChapter?.description && (
                                    <p className="text-slate-400 font-light leading-relaxed">
                                        {currentChapter.description}
                                    </p>
                                )}
                                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/20 to-transparent mt-8" />
                            </div>

                            {/* Sections */}
                            <div className="space-y-16 relative">
                                {/* Connector Line (XL only) */}
                                <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden xl:block" />

                                {currentSections.map((section, index) => {
                                    const themeKey = getTheme(section.title);
                                    const Icon = getIconForSection(section.title, themeStyles[themeKey].icon);

                                    const isPurple = index % 2 === 0;
                                    const theme = {
                                        text: isPurple ? "text-purple-400" : "text-emerald-400",
                                        bg: isPurple ? "bg-purple-500/10" : "bg-emerald-500/10",
                                        border: isPurple ? "border-purple-500/20" : "border-emerald-500/20",
                                        glow: isPurple ? "shadow-purple-500/20" : "shadow-emerald-500/20"
                                    };

                                    return (
                                        <motion.section
                                            key={section.id}
                                            id={section.id}
                                            ref={(el) => {
                                                if (el) sectionRefs.current.set(section.id, el);
                                                else sectionRefs.current.delete(section.id);
                                            }}
                                            initial={index === 0 ? false : { opacity: 0, x: -10 }}
                                            whileInView={index === 0 ? undefined : { opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={transition}
                                            className="relative scroll-mt-32 group"
                                        >
                                            <div className="flex gap-6">
                                                {/* Icon Box */}
                                                <div className={cn(
                                                    "flex-none w-9 h-9 rounded-lg border flex items-center justify-center backdrop-blur-xl shadow-lg z-10 transition-transform group-hover:scale-110 duration-500",
                                                    theme.bg, theme.border, theme.glow
                                                )}>
                                                    <Icon className={cn("w-5 h-5", theme.text)} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0 pt-1">
                                                    <h3 className={cn("text-xl font-bold mb-4 flex items-center gap-3", theme.text)}>
                                                        {section.title}
                                                        {/* Optional decorative line */}
                                                        <div className={cn("h-px flex-1 bg-gradient-to-r from-white/10 to-transparent max-w-[100px] ml-4 opacity-50")} />
                                                    </h3>

                                                    {section.description && (
                                                        <p className="text-slate-400 mb-6 font-light">
                                                            {section.description}
                                                        </p>
                                                    )}

                                                    <div className="space-y-4">
                                                        {section.body.map((block, idx) => renderBodyBlock(block, idx))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.section>
                                    );
                                })}
                            </div>
                        </main>

                        {/* RIGHT SIDEBAR (TOC) */}
                        <aside className="hidden md:block">
                            <div className="sticky top-24 max-h-[calc(100vh-140px)] w-[200px] lg:w-[220px] overflow-y-auto pl-4 custom-scrollbar overflow-x-hidden">
                                <div className="flex items-center gap-2 mb-6 text-slate-500">
                                    <Hash size={14} />
                                    <span className="text-xs font-bold uppercase tracking-widest">
                                        {labels.topics ?? "CONTENTS"}
                                    </span>
                                </div>

                                <div className="flex flex-col border-l border-white/5 relative">
                                    {/* Active highlight runner could go here, but using simpler styling as requested */}
                                    {currentSections.map((section) => {
                                        const isActive = activeSection === section.id;
                                        const theme = themeStyles[getTheme(section.title)];

                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={cn(
                                                    "text-left py-2 pl-4 text-sm transition-all duration-300 -ml-px border-l-2",
                                                    isActive
                                                        ? cn("border-l-current font-semibold translate-x-1", theme.text)
                                                        : "border-transparent text-slate-500 hover:text-slate-300 hover:border-white/20"
                                                )}
                                            >
                                                {section.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* MOBILE DRAWERS */}
                <MobileDrawer
                    title={labels.sections ?? "Sections"}
                    isOpen={navOpen}
                    onClose={() => setNavOpen(false)}
                >
                    <div className="space-y-2">
                        {chapters.map(c => (
                            <button
                                key={c.id}
                                onClick={() => { handleChapterSelect(c.id); setNavOpen(false); }}
                                className={cn(
                                    "w-full p-4 rounded-xl text-left border transition-all",
                                    activeChapter === c.id
                                        ? "bg-purple-500/10 border-purple-500/30 text-purple-200"
                                        : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                                )}
                            >
                                <div className="font-semibold">{c.title}</div>
                                <div className="text-xs opacity-70 mt-1 line-clamp-1">{c.description}</div>
                            </button>
                        ))}
                    </div>
                </MobileDrawer>

                <MobileDrawer
                    title={labels.topics ?? "Topics"}
                    isOpen={tocOpen}
                    onClose={() => setTocOpen(false)}
                >
                    <div className="space-y-1">
                        {currentSections.map(s => (
                            <button
                                key={s.id}
                                onClick={() => { scrollToSection(s.id); setTocOpen(false); }}
                                className={cn(
                                    "w-full py-3 px-4 rounded-lg text-left text-sm transition-all flex items-center gap-2",
                                    activeSection === s.id
                                        ? "bg-purple-500/10 text-purple-200 font-medium"
                                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                )}
                            >
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    activeSection === s.id ? "bg-purple-400" : "bg-slate-600"
                                )} />
                                {s.title}
                            </button>
                        ))}
                    </div>
                </MobileDrawer>

            </div>
        </div>
    );
};

export default EmailSecurityDocumentation;
