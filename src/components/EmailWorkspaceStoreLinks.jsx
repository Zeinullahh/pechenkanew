import { FaApple, FaGooglePlay } from "react-icons/fa";

const stores = [
  {
    name: "App Store",
    buttonText: "Download on the App Store",
    href: "https://apps.apple.com/kz/app/silence-mail/id6779718272",
    Icon: FaApple,
  },
  {
    name: "Google Play",
    buttonText: "Get it on Google Play",
    href: "https://play.google.com/store/apps/details?id=mail.silenceai.net",
    Icon: FaGooglePlay,
  },
];

export default function EmailWorkspaceStoreLinks({ stacked = false, className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <h3 className="text-xl font-bold text-white sm:text-2xl">Email Workspace Mobile App</h3>
      <p className="mb-5 mt-2 text-base text-white/75">Download the app for iPhone or Android.</p>
      <div className={`flex w-full items-center justify-center gap-3 ${stacked ? "flex-col" : "flex-wrap"}`}>
        {stores.map(({ name, buttonText, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download Email Workspace on ${name}`}
            className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/20 bg-black/70 px-5 py-3 text-base font-semibold text-white transition-colors hover:border-blue-300/60 hover:bg-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${stacked ? "w-full" : "min-w-60"}`}
          >
            <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span>{buttonText}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
