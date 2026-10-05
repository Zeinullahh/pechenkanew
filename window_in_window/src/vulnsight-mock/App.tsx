import { useEffect, useState } from "react";
import { appPath, currentLocation, navigate } from "./nav";
import { Shell } from "./Shell";
import { FindingsPage } from "./pages/FindingsPage";
import { NewScanPage } from "./pages/NewScanPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ScanPage } from "./pages/ScanPage";
import { ScansPage } from "./pages/ScansPage";
import { SettingsPage } from "./pages/SettingsPage";

export function App() {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    const onPop = () => setLocation(currentLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const path = appPath(location.split("?")[0]);
  const scanMatch = path.match(/^\/scans\/([^/]+)$/);

  let page = <ProjectsPage />;
  if (path === "/settings") page = <SettingsPage />;
  else if (path === "/findings") page = <FindingsPage />;
  else if (path === "/scans/new") page = <NewScanPage />;
  else if (path === "/scans") page = <ScansPage />;
  else if (scanMatch && scanMatch[1] !== "new") page = <ScanPage scanId={scanMatch[1]} />;
  else if (path === "/dashboard" || path === "/domains" || path === "/repos") {
    page = <ProjectsPage />;
  }

  return <Shell>{page}</Shell>;
}
