export const PACKAGE_FAMILIES = Object.freeze(["deb", "rpm"]);

const PRESENTATION = Object.freeze({
  deb: { os: "Ubuntu Server", versions: "22.04 LTS / 24.04 LTS", packageType: "DEB package", installTool: "apt" },
  rpm: { os: "Fedora Server", versions: "44", packageType: "RPM package", installTool: "dnf" },
});

export function packagePresentation(metadata) {
  if (!metadata || !PACKAGE_FAMILIES.includes(metadata.family) || !PRESENTATION[metadata.family]) throw new TypeError("Unsupported package metadata");
  return { ...PRESENTATION[metadata.family], ...metadata };
}

export function installCommand(metadata) {
  const value = packagePresentation(metadata);
  return `sudo ${value.installTool} install ./${value.filename}`;
}

export function provisioningPresentation(provisioning, enrolled) {
  if (!provisioning) return enrolled
    ? { label: "Enrolled", detail: "Machine identity is established. Waiting for installation status.", tone: "cyan" }
    : { label: "Not enrolled", detail: "Choose a package, install it, then generate an enrollment code.", tone: "slate" };
  const stages = {
    enrollment_started: ["Enrollment in progress", "Machine identity is established; installation is starting.", "cyan"],
    manifest_verified: ["Verified release ready", "The signed Server Security release was verified.", "cyan"],
    artifacts_downloaded: ["Installing security stack", "Verified release artifacts were downloaded.", "cyan"],
    installing_core: ["Installing core protection", "Guard and core services are being installed.", "cyan"],
    core_healthy: ["Core check completed", "The installer passed its initial core check; installation continues.", "cyan"],
    installing_sensors: ["Installing sensors", "Security sensors are being installed and checked.", "cyan"],
    complete: ["Installation complete", "Installation finished. See Server Security for current protection health.", "cyan"],
    degraded: ["Degraded", "The server is enrolled, but some protection components need attention.", "amber"],
    failed: ["Installation failed", provisioning.failureMessage || "The server remains enrolled. Review the failure and retry through the existing installer recovery flow.", "rose"],
    rolled_back: ["Rolled back", "Installation returned to the previous known-good release.", "amber"],
    uninstalled: ["Security stack removed", "The machine identity may remain available for a future reinstall.", "slate"],
  };
  const [label, detail, tone] = stages[provisioning.stage] || ["Provisioning", "The server reported an installation update.", "cyan"];
  return { label, detail, tone };
}
