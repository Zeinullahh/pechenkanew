import React, { useState } from "react";
import EdgeGlowCard from "./EdgeGlowCard";
import GlowButton from "./GlowButton";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [budgetField, setBudgetField] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useLanguage();

  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(t("contactForm.errorRequired", "Please fill in all required fields"));
      return;
    }

    setLoading(true);
    try {
      // Simulate an API call — replace with real POST when ready
      await new Promise((res) => setTimeout(res, 800));
      setSuccess(true);
      setSuccessMessage(t("contactForm.success", "Thank you! We'll get back to you soon."));
      setName("");
      setEmail("");
      setType("");
      setBudgetField("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setErrorMsg(t("contactForm.errorSend", "Sorry, something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          {t("contactForm.title", "Contact Us")}
        </h2>
      </div>
      <div className="max-w-xl mx-auto">
        {success && (
          <div className="mb-4 rounded bg-green-600/20 border border-green-500/30 text-green-200 p-3 text-center">
            {successMessage}
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 rounded bg-red-600/20 border border-red-500/30 text-red-200 p-3 text-center">
            {errorMsg}
          </div>
        )}
        <EdgeGlowCard
          mode="static"
          spotlight
          {...defaultGlowPalette}
          outerClassName="group relative z-10 rounded-[30px] p-[2px] edge-glow-card--default"
          innerClassName="glass-card rounded-[26px]"
        >
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-6 overflow-hidden rounded-[22px] border border-white/12 p-8 space-y-4"
            style={{
              boxShadow: "0 18px 45px rgba(5,12,32,0.55)",
              background: "linear-gradient(150deg, rgba(2,5,12,0.97), rgba(0,1,4,0.98))",
            }}
          >
            <label htmlFor="name" className="sr-only">
              {t("contactForm.placeholders.name", "Your name")}
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder={t("contactForm.placeholders.name", "Your name")}
              className="w-full px-4 py-2 border border-white/20 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF00B7] transition-colors"
            />

            <label htmlFor="email" className="sr-only">
              {t("contactForm.placeholders.email", "your@email.com")}
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder={t("contactForm.placeholders.email", "your@email.com")}
              className="w-full px-4 py-2 border border-white/20 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF00B7] transition-colors"
            />

            <label htmlFor="type" className="sr-only">
              {t("contactForm.placeholders.type", "Project type")}
            </label>
            <input
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              placeholder={t("contactForm.placeholders.type", "Project type")}
              className="w-full px-4 py-2 border border-white/20 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF00B7] transition-colors"
            />

            <label htmlFor="budget" className="sr-only">
              {t("contactForm.placeholders.budget", "Budget")}
            </label>
            <input
              id="budget"
              name="budget"
              value={budgetField}
              onChange={(e) => setBudgetField(e.target.value)}
              type="text"
              placeholder={t("contactForm.placeholders.budget", "Budget")}
              className="w-full px-4 py-2 border border-white/20 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF00B7] transition-colors"
            />

            <label htmlFor="message" className="sr-only">
              {t("contactForm.placeholders.message", "Tell us about your project")}
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder={t("contactForm.placeholders.message", "Tell us about your project")}
              className="w-full px-4 py-2 border border-white/20 rounded-lg resize-none bg-black/40 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF00B7] transition-colors"
              style={{ minHeight: "120px", maxHeight: "200px" }}
            />

            <GlowButton
              type="submit"
              disabled={loading}
              className="w-full"
              innerClassName="w-full"
            >
              {loading ? t("contactForm.submit.loading", "Sending...") : t("contactForm.submit.idle", "Send Message")}
            </GlowButton>
          </form>
        </EdgeGlowCard>
      </div>
    </section>
  );
};

export default ContactForm;
