# Silence AI Server Security User Guide

This guide explains how to register a service, install and enroll native Server Security, configure protected access, and review security activity in the Silence AI admin panel.

Registration, installation, enrollment, policy configuration, and live enforcement are separate states. A value displayed in the panel confirms what is saved or reported by the panel; it does not by itself prove that a running server has applied the value.

## Table of contents

- [1. Before you begin](#1-before-you-begin)

- [2. Sign in and open Server Security](#2-sign-in-and-open-server-security)

- [3. Register and connect a server](#3-register-and-connect-a-server)

- [4. Install, enroll, and activate protection](#4-install-enroll-and-activate-protection)

- [5. Understand protection status](#5-understand-protection-status)

- [6. Configure MFA and protected access](#6-configure-mfa-and-protected-access)

- [7. Use the Server Security console](#7-use-the-server-security-console)

- [8. Review incidents and responses](#8-review-incidents-and-responses)

- [9. Configure security policy](#9-configure-security-policy)

- [10. Network access controls, globe, and live sessions](#10-network-access-controls-globe-and-live-sessions)

- [11. Review sensors, inventory, posture, and findings](#11-review-sensors-inventory-posture-and-findings)

- [12. Monitor events and telemetry](#12-monitor-events-and-telemetry)

- [13. Troubleshooting](#13-troubleshooting)


## 1. Before you begin

You need a Silence AI account with Server Security access, the service domain or server name, and network access from the target server to Silence AI. Hosted registration also needs the destination IP and access to the website. Self-Hosted registration needs the upstream URL and an approved deployment procedure for your environment. Native installation needs administrator access to the target Linux server.

Hosted traffic is usage-billed. Keep the account balance funded before relying on Hosted traffic protection; check the balance shown in the account billing area.

The current package selector exposes these native targets:

| Target | Package |

|---|---|

| Ubuntu Server 22.04 or 24.04 LTS, amd64 | DEB |

| Fedora Server 44, x86_64 | RPM |

The package selector in your account is authoritative. Other operating systems are outside the current documented target scope.

## 2. Sign in and open Server Security

1. Open the admin panel and select **Log in**.

2. Complete account MFA. New accounts configure it during registration; existing accounts enter the current six-digit authenticator code.

3. Open **Server Security** and select **Servers**.

Each server row can expose **Install**, **Setup / recovery**, and **Open Security**. The available action depends on whether that server has been enrolled.

## 3. Register and connect a server

### 3.1 Choose Hosted or Self-Hosted

Select **Register new agent**, then choose **Hosted** or **Self-Hosted**.

- **Hosted** registers a website for traffic protection through the Hosted service. It requires **Domain** and **IP Address**.

- **Self-Hosted** registers a service that runs in your environment. It requires **Domain** and **Upstream URL**.

Neither choice installs native Server Security or enrolls a Linux server automatically.

### 3.2 Create the service record

1. Select the deployment type and continue to the agent data step.

2. Enter **Domain**. Use the host name without a path.

3. For Hosted, enter **IP Address**. For Self-Hosted, enter **Upstream URL**.

4. Select **Register**.

This creates the service record. Registration does not by itself verify domain ownership, route traffic, install a native package, enroll a server, or activate native protection.

### 3.3 Verify Hosted domain ownership and route traffic

After Hosted registration, the panel displays both a DNS record and a website meta tag. They serve different purposes:

- The displayed **A record** routes the domain to the Hosted protection service. It is not the ownership-verification method.

- The displayed meta tag proves that you control the website.

1. Add the supplied meta tag inside the website's HTML `<head>`.

2. Save the website change and confirm that the existing website is publicly reachable at the registered domain.

3. In the registration dialog, select **Verify Domain Ownership** and confirm **Verification successful!**.

4. Add the displayed A record to the domain's DNS for Hosted traffic routing. Allow the change to propagate, then confirm the website remains reachable through the intended domain.

Verification succeeds only when the service can retrieve the expected meta tag from the registered domain. Website meta-tag verification and DNS routing are separate operations; complete verification before changing DNS when the existing website must remain available for the verification check. If verification fails, check the domain spelling, public reachability, meta-tag placement, and proxy or CDN host handling, then select **Redo verification**. Successful verification does not by itself prove that traffic is already flowing through the protection service; confirm that the website is reachable through the configured domain and that Hosted billing prerequisites are met.

### 3.4 Self-Hosted registration and deployment

Create the Self-Hosted service record, then follow the approved deployment procedure for your environment. Native Server Security installation is a separate action in the server table.

## 4. Install, enroll, and activate protection

**Registered** means a service record exists. **Installed** means the native package was installed. **Enrolled** means the one-time enrollment code was accepted. These states do not independently prove that the security stack is installed, healthy, or enforcing policy.

### 4.1 Install the native package

1. Select **Install**. For an already enrolled server, use **Setup / recovery** only when the panel directs you to do so.

2. In **Install Server Security**, under **1. Choose a native package**, select the matching operating system and architecture.

3. Under **2. Download and install**, select **Download .deb** or **Download .rpm**.

4. Select **Copy** beside **Install command** and run the displayed command on the target server with administrator privileges.

The displayed filename, command, and SHA-256 value are authoritative. The commands generally resemble:

- Ubuntu DEB: `sudo apt install ./<displayed-filename>.deb`
- Fedora RPM: `sudo dnf --setopt=localpkg_gpgcheck=1 install ./<displayed-filename>.rpm`

For RPM installation, use the package-signature prerequisites required by the displayed package and your approved administrator procedure. Do not obtain signing keys from an unapproved source or bypass signature checking. Browser download saves the file to the browser computer; it does not install remotely. Transfer the package using an approved secure method when necessary.

Installing the package is only the package step. Continue with enrollment and the installation stages shown by the dialog.

### 4.2 Enroll the server

1. Open **3. Enroll interactively**.

2. On the intended server, run:

   `sudo silence-server enroll`

3. Select **Generate enrollment code**.

4. Enter the displayed code only at the prompt on the intended server.

5. Leave the dialog open while the displayed provisioning stages run.

An enrollment code is single-use and expires after a maximum of 15 minutes. If an unused code needs to be replaced, select **Replace enrollment code**, confirm **Replace code**, and use the replacement. If a code was accepted and a later installation stage failed, the original code may already be consumed; do not assume that generating another initial code is the correct recovery step.

The dialog may show stages such as **Enrollment in progress**, **Verified release ready**, **Installing security stack**, **Installing core protection**, **Core check completed**, **Installing sensors**, and **Installation complete**. **This server is enrolled** confirms enrollment only. It does not confirm completed installation or active protection.

Never place an enrollment code in documentation, tickets, chat, or shell history.

### 4.3 Recovery and re-enrollment

For an enrolled server, open **Setup / recovery** and use **Re-enroll server** or **Generate recovery code** for the intended server. Keep an independent administrator session available while restoring access.

### 4.4 Confirm protection

Open **Open Security**, select **Overview**, and use the page's **Refresh** button. Review **Server protection**, **Provisioning**, **Sensor health**, and **Guard access security**.

Use the displayed protection state and recent telemetry together. Enrollment, **Installation complete**, **SSH 2FA: Active**, a saved policy, or a populated configuration dialog is not by itself proof that every corresponding runtime protection is active. If a policy shows **Saved · pending activation**, treat it as saved but not confirmed active.

## 5. Understand protection status

The Overview state describes the panel's current view of core protection and reported coverage:

| State | Meaning | Customer action |

|---|---|---|

| **ACTIVE** | Current core protection is reported as available. | Review optional sensor and policy status separately. |

| **DEGRADED** | Core protection may still be available, but one or more coverage or health signals needs attention. | Read the displayed reason and review **Sensors**. |

| **FAILED** | Provisioning or core protection reported a failure. | Read the error and use the safe troubleshooting steps. |

| **PENDING** | Installation, provisioning, or policy activation is incomplete. | Do not treat the setting as active; review the current stage. |

| **CONFIGURATION REQUIRED** | The panel does not have the current information required to confirm core health. | Confirm enrollment and review the displayed requirement. |

| **REMOVED** | Native protection was removed or is no longer reported. | Use the supported **Setup / recovery** path only when available. |

**ACTIVE** does not guarantee that every optional sensor, access restriction, country rule, or automatic response capability is enabled. **DEGRADED** does not necessarily mean that core protection has completely stopped. Sensor cards can separately show **Healthy**, **Degraded**, **Failed**, **Disabled**, **Unsupported**, **Needs configuration**, **Telemetry stale**, or **No telemetry**.

## 6. Configure MFA and protected access

### 6.1 Account MFA

During registration, open **Set up 2FA**, scan the QR code or enter the secret in an authenticator app, enter the current six-digit code, and select **Verify and finish**. Use a current code for later sign-ins. If you lose access to the authenticator, use a saved recovery code or your organization's approved account-recovery procedure. Keep QR codes, secrets, and recovery codes private.

### 6.2 Server-access MFA

**SSH 2FA** covers the configured protected TCP ports, not only SSH port 22. Keep an independent administrator session available while changing access settings.

1. In the server table, open the edit control and set the intended **TCP ports** in **Agent configuration**.
2. Select **SSH 2FA** in the server row and scan the QR code or enter the **Manual entry key** in your authenticator.
3. Save the eight **Backup / Recovery Codes** securely; each code is single-use.
4. Select **Next — Verify Code**, enter the current six-digit code, select **Verify**, and finish the setup.
5. Reopen **Agent configuration** to review the selected ports and access setting.

### 6.3 Port Guard authentication

Open the approved **Port Guard** address for your deployment from the same network used by the protected-service client. Enter a current authenticator code or one unused backup code, select **Unlock Ports**, then reconnect to the protected service. Use the access-window duration shown on the page. The protected service still requires its own credentials.

### 6.4 Disable or reset server-access MFA

To disable server-access MFA, turn **Enable 2FA for access** off and save. To reset its scope, change or remove the configured protected ports and save. Keep a working administrator session and an independent recovery method open. Check the panel's reported state and the target server's access after the agent applies the change. If the running server does not reflect the saved setting, ask the responsible administrator for assistance. Do not remove files or services manually.

## 7. Use the Server Security console

Open **Open Security** for a registered server. The available tabs are:

| Tab | What it shows |

|---|---|

| **Overview** | Protection state, provisioning, sensor health, incidents, responses, and recent activity. |

| **Incidents** | Correlated security activity for review. |

| **Responses** | Automatic response records and results. |

| **Sensors** | Sensor health and detection views. |

| **Posture** | Security Configuration Assessment findings and vulnerability-intelligence status. |

| **Inventory** | Reported package and server inventory. |

| **Events** | Filterable, paginated telemetry. |

| **Policy** | Response mode, IP policy, sensor switches, and Suricata interface. |

The global **Refresh** button refreshes the main console queries. The separately loaded **Events** explorer may require its own reload by changing the page or filter; do not treat the global button as proof that the explorer has refreshed.

## 8. Review incidents and responses

### 8.1 Incidents

The **Incidents** tab groups related reported activity so an administrator can review it. Select a row to open **Incident details**. Review the severity, summary, source information when available, **Timeline**, **Evidence**, and expandable **Technical details**.

Use the available review actions:

- **Mark investigating** changes the incident review status.

- **Resolve** records that review is complete.

- **Dismiss** records that the incident is not being pursued.

These actions change incident review status. They do not repair a compromised server, remove malware, terminate an attacker, or automatically block a source.

### 8.2 Responses

Review source, action and scope, reason, status, start time, and expiration together.

| Status | Meaning |

|---|---|

| **REQUESTED**, **OBSERVED**, **SHADOW_APPROVED**, or **APPROVED** | Recorded or approved for evaluation; application is not confirmed. |

| **APPLIED** | The response was recorded as applied at some point within its displayed scope. |

| **EXPIRED** | A temporary response is no longer active. |

| **REVOKED** | The response was withdrawn. |

| **FAILED** | The requested action did not complete successfully. |

| **SUPPRESSED** | The response was not enforced under the applicable policy. |

An **APPLIED** record is a recorded outcome, not an independent live firewall inspection. Check its expiration and refresh the view before treating it as current. Blocking new connections does not necessarily terminate existing established connections.

## 9. Configure security policy

### 9.1 Automatic response mode

| Mode | Customer-visible behavior |

|---|---|

| **Observe** | Records eligible decisions without automatic enforcement. |

| **Shadow** | Evaluates eligible detections without enforcing temporary blocks. |

| **Enforce** | Can apply approved temporary IP blocks when the required policy and detection conditions are active. |

The normal initial installed mode is **Shadow**. In **Policy → Automatic response mode**, select a mode. When switching to **Enforce**, review **Enable automatic enforcement?** and select **Enable Enforce** or **Cancel**. Confirm the displayed activation state before relying on automatic temporary blocking. Enforce applies only to eligible detections; it does not mean every detected threat is automatically blocked.

### 9.2 Trusted IPs

In **Policy → Trusted IPs**, enter **Trusted IP or CIDR**, optionally enter **Description**, and select **Add trusted source**. Select **Remove** to remove an entry. Select **Move to block** to convert it into an explicit block; the dialog requires a reason.

Trusted IPs exempts a source from eligible automatic-response blocking. It does not bypass MFA, country restrictions, Allowed IPs / CIDRs, service credentials, or other access controls. Use the narrowest range and avoid overlapping ranges. Saving the entry does not prove that the running server has applied it.

### 9.3 Allowed IPs / CIDRs

In the server row's pencil/edit control, open **Agent configuration** and use **Allowed IPs / CIDRs (comma-separated)**. Enter individual IPv4 or IPv6 addresses or CIDR ranges separated by commas, then select **Save**. Reopen the dialog to confirm what the panel retained.

Allowed IPs / CIDRs controls which source addresses may use Port Guard while it is active. An empty saved list allows all sources through this Port Guard address check; a nonempty list permits only matching addresses or ranges to continue to authentication. It is separate from Trusted IPs and Explicit blocks, and it does not itself grant service access or bypass MFA, country filtering, service credentials, or explicit blocks. The current interface does not provide a separate live-enforcement confirmation for this setting; a saved value is not proof that an installed server has applied it. Keep an independent administrator source available when changing it.

### 9.4 Explicit blocks

In **Policy → Explicit blocks**, enter **Blocked IP or CIDR**, the required **Reason**, and optional **Explicit block expiry**, then select **Add explicit block**. Select **Remove** to remove an entry; entries cannot be edited inline, so remove and recreate one when a correction is needed.

Native explicit blocks can deny new inbound connections from the source beyond only the ports configured for MFA. They are separate from temporary automatic responses. Check every administrator, monitoring, NAT, and shared address before saving a block, because you can block your own access. Saving an entry does not independently prove that the running server has enforced it.

### 9.5 Sensors and Suricata

In **Policy → Sensor state**, the available switches are **Inventory**, **File Integrity**, **Security Configuration**, **YARA-X**, **CrowdSec**, **Falco**, and **Suricata**. Saving a requested switch changes the panel policy; it does not by itself confirm that the running sensor configuration changed.

For Suricata, use **Policy → Suricata monitored interface**, choose a displayed candidate or enter a verified interface such as `ens3`, then select **Save interface**. Confirm fresh Suricata telemetry and the policy activation state. Do not guess the interface.

## 10. Network access controls, globe, and live sessions

Open **Network access** and select the managed server and protected TCP port you want to review. Use the globe and connection list to inspect the selected scope, source IPs, countries, ports, and session details shown in the interface.

In **Countries**, choose blacklist or whitelist mode and edit the country list for the selected port. In **IP addresses**, manage the server's **Always Block** and **Always Allow** entries. An Always Allow entry does not replace MFA or the protected service's authentication.

To act on a connection, open its menu and choose **Shut down session** or **Blacklist IP address**. Review the reported result and policy status after each action. A saved change or queued request is complete only when the interface reports its applied outcome.

## 11. Review sensors, inventory, posture, and findings

Open **Sensors** to review each sensor's state and latest signal. Use **Inventory** and **Search packages** to examine reported package details. Open **Posture** to review configuration findings and any displayed remediation guidance. Check the observation time when interpreting results.

## 12. Monitor events and telemetry

Open **Events** to review server telemetry. Filter by sensor, exact event type, or severity, and use **Previous** and **Next** to browse results. Review each event's source, evidence, severity, time, and linked incident when shown. Refresh the view before relying on older results.

## 13. Troubleshooting

If an action does not complete, check the selected server and port, the status and time shown in the console, and the details of any error. Retry the relevant action after correcting the input or connectivity issue. Keep an independent administrator session available when changing access rules. For account or server access recovery, use your organization's approved recovery route.
