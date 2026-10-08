# Silence AI Server Security User Guide

This guide explains how to register a service, install and enroll native Server Security, configure protected access, and review security activity in the Silence AI admin panel.

**Documentation status:** Sections outside Section 10 describe the audited current interface unless stated otherwise. [Section 10](#10-network-access-controls-globe-and-live-sessions) remains the authoritative implementation contract. The CMC and Guard network-access implementation is present but has not passed real Linux/Kubernetes connection validation; use the requirement audit in `NETWORK_ACCESS_NET_CHECKLIST.md` for exact status. Where older access-control behavior conflicts, Section 10 defines the target behavior.

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

- [14. Current limitations and feature availability](#14-current-limitations-and-feature-availability)

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

The current registration interface can create the Self-Hosted service record and display a **Self-Hosted Installation** result. It does not provide a verified complete downloadable deployment configuration through this workflow. Do not rely on the text referring to a `docker-compose.yml` download, and do not invent a deployment command from it.

Obtain the approved Self-Hosted deployment instructions for your environment from the responsible administrator or approved product documentation. If those instructions are unavailable, the service record can remain registered, but Self-Hosted protection cannot be safely completed from the current registration dialog alone. Native Server Security remains a separate **Install** action.

## 4. Install, enroll, and activate protection

**Registered** means a service record exists. **Installed** means the native package was installed. **Enrolled** means the one-time enrollment code was accepted. These states do not independently prove that the security stack is installed, healthy, or enforcing policy.

### 4.1 Install the native package

1. Select **Install**. For an already enrolled server, use **Setup / recovery** only when the panel directs you to do so.

2. In **Install Server Security**, under **1. Choose a native package**, select the matching operating system and architecture.

3. Under **2. Download and install**, select **Download .deb** or **Download .rpm**.

4. Select **Copy** beside **Install command** and run the displayed command on the target server with administrator privileges.

The displayed filename, command, and SHA-256 value are authoritative. The commands generally resemble:

```bash

sudo apt install ./<displayed-filename>.deb

sudo dnf --setopt=localpkg_gpgcheck=1 install ./<displayed-filename>.rpm

```

For RPM installation, use the package-signature prerequisites required by the displayed package and your approved administrator procedure. Do not obtain signing keys from an unapproved source or bypass signature checking. Browser download saves the file to the browser computer; it does not install remotely. Transfer the package using an approved secure method when necessary.

Installing the package is only the package step. Continue with enrollment and the installation stages shown by the dialog.

### 4.2 Enroll the server

1. Open **3. Enroll interactively**.

2. On the intended server, run:

   ```bash

   sudo silence-server enroll

   ```

3. Select **Generate enrollment code**.

4. Enter the displayed code only at the prompt on the intended server.

5. Leave the dialog open while the displayed provisioning stages run.

An enrollment code is single-use and expires after a maximum of 15 minutes. If an unused code needs to be replaced, select **Replace enrollment code**, confirm **Replace code**, and use the replacement. If a code was accepted and a later installation stage failed, the original code may already be consumed; do not assume that generating another initial code is the correct recovery step.

The dialog may show stages such as **Enrollment in progress**, **Verified release ready**, **Installing security stack**, **Installing core protection**, **Core check completed**, **Installing sensors**, and **Installation complete**. **This server is enrolled** confirms enrollment only. It does not confirm completed installation or active protection.

Never place an enrollment code in documentation, tickets, chat, or shell history.

### 4.3 Recovery and re-enrollment

For a server that the panel identifies as enrolled, **Setup / recovery** can expose **Re-enroll server** and **Generate recovery code**. Use this only for the intended recovery case and only with an independent administrator access method kept open.

Recovery is not guaranteed to restore every existing deployment or its previously configured access state. If recovery or a later installation stage fails, stop and record the non-secret error shown by the panel. Do not repeatedly issue recovery codes, delete security components, remove files, or disable access controls as a troubleshooting method. Recovery that requires administrator assistance cannot be completed safely from the current customer interface alone.

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

During account registration, complete the form and terms confirmation. On **Set up 2FA**, scan the QR code or enter the secret key in an authenticator application, enter the six-digit code, and select **Verify and finish**. At later sign-ins, enter the current code.

The current customer interface does not provide a verified self-service account-MFA reset or account-recovery workflow. If access to the authenticator is lost, use only an officially approved account-recovery channel when one is provided. Do not send the secret key or QR code to another person. The current project documentation does not establish a public support contact, so this guide does not invent one.

### 6.2 Server-access MFA

The control is labelled **SSH 2FA**, but it can protect all configured TCP ports, not only port 22. It does not cover UDP. Keep an independent administrator session or tested recovery method open before changing it.

1. In the server-management table, select the pencil/edit control.

2. In **Agent configuration**, configure **TCP ports** with **Add port** or **Remove**, then select **Save**. Ports must be whole numbers from 1 through 65535. Do not turn on **Enable 2FA for access** in this dialog before starting authenticator setup.

3. In the server row, turn on **SSH 2FA** to open the **2FA SSH Guard** setup dialog.

4. On **Scan QR**, scan the QR code with a TOTP authenticator app or enter the displayed **Manual entry key**.

5. The same screen generates and displays eight **Backup / Recovery Codes (Save these!)**. Save every code securely before selecting **Next — Verify Code** or leaving the screen; they are single-use and are not shown on a later screen.

6. Select **Next — Verify Code**, enter the current six-digit authenticator code, and select **Verify**.

7. Confirm **2FA verified successfully!**, then select **Done**. Reopen **Agent configuration** to confirm the ports and **Enable 2FA for access** value retained by the panel.

Starting setup sets the row to **SSH 2FA: Pending** until code verification succeeds. In the current interface, a pending row does not provide a customer-facing way to reopen the setup dialog. If **Enable 2FA for access** was saved before setup and the row is pending, do not assume that toggling or re-saving will restore the dialog; keep the independent access path and obtain approved administrator assistance.

Saving the requested setting and completing authenticator setup are separate from applying the configuration to the running server. **SSH 2FA: Active** and the Overview **Guard access security** section show saved/setup state and reported protected ports; neither independently proves that the installed server is enforcing the change. The current interface has no separate customer-facing **Apply Server Security** or **Update Server Security** action. Do not repeatedly save settings while waiting for an unimplemented automatic update. Keep the independent access method until live enforcement has been safely confirmed.

### 6.3 Port Guard authentication

Use the deployment-specific approved **Port Guard** address supplied for your installation. Do not assume that the protected website's ordinary HTTPS root is the Port Guard page, and do not publish an internal listener address as a universal URL.

1. Open the approved Port Guard address from the same network source that will connect to the protected service.

2. Enter the current six-digit authenticator code, or enter one unused backup code in **Enter an authenticator or one-time backup code**.

3. Select **Unlock Ports**.

4. Confirm that the page reports the ports are open, then reconnect promptly to the protected SSH, database, application, or other service.

In the current implementation, successful authentication temporarily authorizes the configured protected TCP ports together. The target design in Section 10 requires separate country/IP eligibility for each port, so one denied port must not suppress or unlock another port. The displayed access-window duration is authoritative; the generated default is 60 seconds. A new connection after expiration, or a connection from a different observed source, may require another authentication. Browser and service-client traffic must come from the same observed network source. Shared public IP addresses can therefore cause one user or network to share the same authorization scope, and changing networks can require re-authentication.

Port Guard does not replace the protected service's own credentials. Other access controls, country rules, Allowed IPs / CIDRs, explicit blocks, or network policies can still prevent connectivity. If authentication succeeds but the service remains inaccessible, verify the source network, service credentials, port, and other access restrictions while keeping the independent administrator path open.

### 6.4 Disable or reset server-access MFA

The panel lets an administrator save **Enable 2FA for access** as off and remove or change configured ports, but the current documentation audit does not verify that this action reliably updates every already installed server. Do not describe clicking **Save** as immediate live disablement. Keep a working administrator session and an independent recovery method, verify the panel's reported state, and obtain approved administrator assistance if the running server does not change as expected. Do not remove files or services manually.

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

The network-access implementation provides a dedicated **Network access** page for selecting a managed server and protected port, inspecting the globe and active-connection list, and editing the unified Countries/IP addresses policy described in Section 10. Its browser navigation and gestures have not been manually verified in the supplied evidence; follow the labels present in your deployment and treat saved policy changes as pending until the agent confirms them.

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

An **APPLIED** record is a recorded outcome, not an independent live firewall inspection. Check its expiration and refresh the view before treating it as current. Blocking new connections does not necessarily terminate existing established connections. The customer interface does not provide a general response-revocation action.

## 9. Configure security policy

The manual IP controls in Sections 9.2-9.4 describe existing behavior. The new Always Allow/Always Block controls and their migration are specified in Section 10. Do not implement them as additional conflicting manual lists, or assume existing Trusted IPs already provides the requested geographic exception.

The **Policy** tab can display **Saved · pending activation**. This means the panel saved a policy revision but has not confirmed that the running server applied it. A saved revision, a reopened dialog, or a page refresh is not proof of live enforcement.

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

**Implementation contract, requested 2026-10-06.** This section records the complete required product behavior. It is not a claim that every feature works in a live deployment. Before this implementation, the system had a traffic globe, separate country controls, and an unavailable session-termination action. The requirements below supersede the former instructions for account-level web-traffic country blocking and the separate Geo Rules JSON workflow for this feature.

**Implementation status (2026-10-06):** The code now includes a dedicated network-access CMC page, per-server/per-port country and IP policy APIs, signed Guard policy refresh, per-port nftables authorization, Linux host-namespace TCP snapshot reporting, and signed targeted socket shutdown commands. These passed the static/unit/cross-build checks recorded in `NETWORK_ACCESS_NET_CHECKLIST.md`. A database migration, real Linux socket teardown, SSH on port 2525, Kubernetes host-network endpoint, ordinary TCP service, browser gestures, restart persistence, and end-to-end agent acknowledgement have not been verified in this workspace. Treat policy changes as pending until a live agent confirms the revision; do not treat a queued shutdown as confirmed. Pod-private or other-node connections are outside the single-node host-namespace collector.

### 10.1 Purpose and scope (NET-01)

Provide one coherent CMC experience for controlling and monitoring network access to configured protected TCP ports. Reuse the existing attractive 3D globe, country list, blocking dialog, and upward-opening dashboard panel. Replace their web-traffic blocking purpose with the network-access behavior in this section. Do not create a second competing country-blocking feature.

A session means an actual active network connection from a source IP address to a protected port on a managed server. For example, SSH may run on TCP port **2525**, not just 22. While an employee uses that SSH connection, it must appear as an active session until it ends. The same requirement covers configured Kubernetes endpoints and any other protected TCP service. Service names must come from configuration or verified information, not a guess based solely on conventional port numbers.

For Kubernetes, identify and control the actual connection traversing the managed enforcement point. Do not label a TCP connection as a specific user, pod shell, or `kubectl exec` session without authoritative evidence. A multiplexed connection may carry more than one application operation; expose the actual termination scope. Support the deployed Kubernetes networking arrangement deliberately, rather than assuming that a host connection monitor can see every pod or API stream.

These requirements concern network connections, not website visits, HTTP requests, browser login sessions, user agents, or web-traffic country blocks. Independent HTTP analytics and unrelated registration/billing functionality are outside this replacement. Web access logs must not be used as a substitute for live protected-port session telemetry.

### 10.2 Server and port selection (NET-02)

Show which managed server and protected port the administrator is viewing or editing. Country policies are scoped to a server and a configured TCP port. Different ports may have different country modes and country lists. A rule for port 2525 must not silently change access to another port.

The globe and session list may offer an **All protected ports** view and service/port filters. An aggregate view must identify mixed country policies instead of presenting one port's block as a universal country block. Editing a country policy requires an explicit server and port scope; never silently apply it to every server in an account. Selection changes must refresh the globe, effective country lists, and session list consistently.

Always Allow and Always Block IP entries are persistent per-server lists applying across that server's configured protected ports. Show this scope beside the IP controls, even when viewing one port. The entries continue to apply when country mode changes; they do not become account-wide rules or rules for unrelated ports.

### 10.3 Blocking dialog and list design (NET-03)

Keep the existing country-blocking interface's useful visual design and move it to the network-access model. The top row has two tabs/columns: **Countries** and **IP addresses**.

Under **Countries**, the second row has **Blacklisted** and **Whitelisted** views. Also show a clearly labelled policy mode control: **Blacklist mode** or **Whitelist mode**. Browsing a list must not silently change the mode. Country rows support search, selection, addition, and removal. The lists and globe must show the effective result for the selected port, including the complement of the explicitly selected countries.

Under **IP addresses**, the second row has **Always Block** and **Always Allow** views. Each view has a **+** button, a simple IP address input, a saved-entry list, and an action to remove an entry. Both lists are active simultaneously. Changing tabs only changes the list being viewed; it never disables the other list or changes country mode.

Keep routine editing understandable without JSON or technical policy expressions. Use simple IP addresses, including valid IPv4 and IPv6, without user-agent fingerprints, IP-plus-user combinations, or an obligatory CIDR input. Normalize equivalent address representations and prevent duplicate entries.

### 10.4 Country blacklist and whitelist modes (NET-04)

For each selected protected port, exactly one country mode applies:

| Mode | Explicitly selected countries | All other known countries |
|---|---|---|
| **Blacklist mode** | Blocked | Allowed, subject to authentication and IP rules |
| **Whitelist mode** | Allowed, subject to authentication and IP rules | Blocked |

For example, putting Russia in the blacklist denies sources located in Russia for the selected port, except a source explicitly in Always Allow. Selecting Kazakhstan and Turkey in whitelist mode permits those countries and blocks the other countries, again subject to IP exceptions and required authentication.

An empty blacklist blocks no country. An empty whitelist allows no country. Make the effect of switching modes and an empty whitelist explicit before applying the change. Preserve explicit selections deliberately and document how selections are retained or transferred when switching modes; do not silently reinterpret a complemented display list as the saved selection.

Country rules must affect the requested port independently. The previous behavior that evaluated all protected ports as one authorization group must not cause denial on one port to deny an otherwise allowed port, or an allowed port to unlock a denied port. Successful MFA can authorize eligible ports, but it must not override the country/IP decision for each port.

For a source whose country cannot be determined, display **Unknown country** and do not invent a location. An unknown public country is denied when geographic filtering is enabled unless Always Allow matches; a failed GeoIP lookup must not silently disable restrictions. Private/local sources bypass country evaluation but remain subject to applicable IP restrictions and MFA. Distinguish these cases and retain necessary management/recovery behavior explicitly.

### 10.5 Always Allow and Always Block IP exceptions (NET-05)

**Always Allow** is the employee-travel exception. If Russia is blocked and an employee works remotely from Russia, an administrator can add the employee's observed source IP to Always Allow. That IP passes the geographic restriction in either country mode, on the server's protected ports, until the entry is removed. The same exception works when the employee's country is absent from a whitelist.

**Always Block** denies its matching IP regardless of whether its country is allowed by whitelist mode, absent from a blacklist, or otherwise permitted by the geographic policy. These entries persist until removed. Country mode changes do not disable, expire, or erase either IP list.

Always Allow bypasses country restrictions; it does not bypass the configured MFA challenge or the protected service's own authentication. Do not silently map it to the existing Trusted IPs setting, which currently has different automatic-response semantics, or to a legacy address allowlist that would deny every unlisted IP. Reconcile legacy manual address controls so they do not secretly contradict the new lists. Keep any separate automatic threat-response decision visible and explain its effective scope.

Reject adding the same normalized IP to both lists. Offer an explicit move between lists if useful. If contradictory data is received despite validation, block takes precedence and report the conflict rather than silently claiming the IP is always allowed. For ordinary valid configuration, evaluate manual access rules in this order: Always Block, Always Allow as a geographic exception, then the selected port's country mode. MFA and service authentication still apply to permitted access.

An IP entry matches the actual source address observed at the enforcement point. No additional user or device identity is required. Explain briefly that a shared public IP affects everyone using that address, and a changed source IP requires updating the exception. Do not imply that IP-only rules identify an individual employee.

### 10.6 The 3D globe and four heat-map levels (NET-06)

Keep the existing 3D globe as a practical view of protected network activity and country access policy. Show the countries currently blocked or allowed for the selected server/port, and show the source countries/IPs of its active sessions. An IP exception must remain understandable even when its country's normal policy is blocked.

Use four clearly labelled intensity levels for active-session density: **0**, **1–2**, **3–9**, and **10+** active connections. These are the thresholds recorded in the supplied implementation handoff; verify them against the latest checklist before calling them current verified values. The four levels describe measured session counts, not traffic categories or security states. Keep blocked/allowed country styling visually distinguishable from session-density styling, using a separate legend, overlay, or view control as needed. Mixed policies and unknown geography must have explicit presentation.

When several sessions or IPs belong to one country or marker cluster, let the administrator inspect the individual IPs and sessions. Provide source IP, server, protected port/service, session count, and effective access-policy information where available. Use country-level placement or verified location data; do not fabricate precise coordinates for an IP.

Do not reuse the old **Active Users** metric as a live-session counter: its existing source counts distinct IPs in recent access logs. The new globe must receive real connection telemetry. Terminated and closed connections must leave the active count after confirmed closure; missing telemetry must produce a stale/unknown state rather than an indefinitely active or falsely empty globe.

### 10.7 Swipe-up active-session list (NET-07)

The administrator can swipe upward to reveal a straightforward list of all current active sessions within the selected server/port scope. Provide a visible open/expand button as well, so this works with a mouse, keyboard, and devices without touch gestures. Reuse the current upward-opening panel where practical. Allow the administrator to close or collapse it and return to the globe.

The globe and list must use the same live data, filters, timestamps, and totals. The list is the readable operational alternative to the globe, not a separate access-log report. One row represents one actual connection; multiple simultaneous connections from the same source IP must remain distinguishable.

Show source IP, country or unknown/private status, managed server, destination port, configured service label when available, connection state, and the time information the agent can actually establish. Distinguish **First observed** from a verified connection start time. Make session identity available for exact actions without requiring users to understand internal identifiers. Support enough filtering/search and pagination or virtualization to reach every active row without presenting a partial page as the total.

### 10.8 Session context menu and shutdown (NET-08)

Right-click an IP/session in the globe's inspectable data or in the session list to open a menu with these two actions:

1. **Shut down session**.
2. **Blacklist IP address** (add to Always Block).

Provide an equivalent visible menu button for touch and keyboard use. If the selected IP has multiple connections, show the connections and require an unambiguous session selection before shutdown. Display the target server, source IP, and destination port. Do not terminate every connection sharing an IP when the administrator selected one session.

**Shut down session** must actually disconnect the selected live connection through the managed agent. This covers SSH on port 2525 or 22, a configured Kubernetes connection, and another protected TCP service; do not hard-code SSH as the only supported service. Closing a socket/stream does not necessarily stop work already launched inside an application, so describe the operation accurately.

Use an authoritative connection identity and revalidate it immediately before acting. Do not infer a target from username, a loose timestamp, an IP alone, or a reused PID. Do not kill a shared service process, container, pod, node, or unrelated connection as a substitute for targeted connection termination.

Show request progress and a confirmed result. Handle an already closed connection, agent offline/stale state, permission failure, unsupported connection path, expired command, and execution failure explicitly. CMC must not report success merely because a button was clicked or a command was queued. The currently unavailable `terminate_existing_session` action is a starting point to complete, not proof that the feature exists.

Where a deployment path cannot provide safe targeted termination, identify and report the concrete limitation. Do not treat a generic unsupported placeholder for every connection as completion of this requirement. Verify at least the supported SSH, Kubernetes networking path, and ordinary protected TCP path using real connections on an appropriate runtime.

Shutdown ends that selected connection. It does not add a persistent block, and the source can reconnect if its current rules and authentication permit it.

### 10.9 Blacklisting from a session (NET-09)

**Blacklist IP address** adds the selected source IP to the server's persistent Always Block list. Reflect the entry immediately as saved/pending, then show applied or failed based on the agent's confirmed result. The Countries and IP addresses dialog must show the same entry and effective state.

If the IP is in Always Allow, explicitly offer to move it to Always Block rather than silently retaining contradictory entries. Country selection and mode must remain consistent after the change. The block prevents new connections on the applicable protected ports once enforced. Existing-session shutdown remains a separate action: do not claim a current connection has ended merely because an IP was added to a list.

### 10.10 Saving, enforcement, and migration (NET-10)

Provide one coherent manual network-access policy across CMC, its API/storage, delivered agent configuration, and actual firewall/connection enforcement. Display saved, pending, applied, and failed states with the effective revision or observation time. If the agent is offline, retain the pending state; do not claim the new rule is enforced. Survive agent/CMC restarts and reject stale policy/command replay.

Retire the old web-traffic country-blocklist behavior from this dashboard workflow and replace the separate JSON-only geographic editor with this same policy experience. Do not maintain two independent editable sources of truth for the new country rules. Older controls that must remain for compatibility should point to the shared policy or be clearly identified during migration.

Inspect existing saved data and define an explicit migration. Never silently reinterpret an account-wide HTTP blocklist as a block on every server's SSH/Kubernetes ports. Preserve existing native restrictions until their intended server/port mapping is known and migrated. Reconcile manual IP lists and legacy address restrictions without silently weakening protection or creating hidden denials. Leave unrelated web hosting, traffic analytics, billing, sensors, and incident features outside this replacement.

Keep actor/tenant/server authorization on every policy edit, session read, and session action. Use the project's authenticated agent channel, protect commands against replay, and audit the administrator, target connection/IP, action, timing, and actual result. Scope changes to the intended server and ports. Use the project's established management/recovery safeguards rather than inventing a separate approval workflow.

### 10.11 Implementation completion and mandatory double-check (NET-11)

The coding agent must read this entire section before implementation, maintain a requirement-to-implementation checklist for NET-01 through NET-11, and reread the section before claiming completion. Include concrete file references, verification evidence, and any unresolved requirement in its final report. Do not mark a requirement complete on the basis of UI appearance, mocked data, or an unacknowledged backend request.

Verify all of the following:

- One unified network-access workflow replaces the old globe web-blocklist workflow, while preserving the requested globe/list design.
- Server/port selection is visible; different rules on two ports work independently, including SSH configured on port 2525.
- Blacklist mode blocks selected countries and allows other known countries; whitelist mode allows selected countries and blocks the remainder. Empty lists and mode changes behave as documented.
- The Countries/ IP addresses top row and Blacklisted/Whitelisted or Always Block/Always Allow second row work as specified. IP lists remain simultaneously active and have simple +/remove controls.
- A Russian source denied by country policy can connect after its IP is added to Always Allow and required authentication succeeds. Repeat under whitelist mode where Russia is not selected. Removing the exception restores the geographic decision.
- Always Block denies an otherwise country-permitted source in both modes. Equivalent/duplicate IPv4 and IPv6 representations and conflicting list membership are handled consistently.
- IP exceptions do not bypass MFA or service authentication. Legacy manual restrictions do not silently contradict the new model.
- Real live SSH, Kubernetes-path, and other protected TCP connections appear in both globe and list. Distinct connections from one IP remain distinguishable; closed connections disappear; unknown countries and stale/offline agents are represented accurately.
- Four heat-map intensity levels have defined thresholds and a readable legend; country blocking and activity density remain distinguishable. The total agrees with the session list under identical filters.
- Swipe-up, mouse/keyboard expansion, country/IP inspection, and context menus are usable. Every active session is reachable through list navigation.
- Shutdown closes exactly the selected real connection without terminating a different session, including a second session from the same IP. Already-closed, stale-identity, unauthorized, replayed, failed, and unsupported actions report truthful outcomes.
- Blacklist IP address updates the same persistent Always Block list, survives restart, and denies reconnects after confirmed enforcement. It does not falsely report an existing session as terminated.
- Policy/command delivery, saved-versus-applied status, server/tenant isolation, restart behavior, audits, and migration are verified.

Run appropriate UI, API, policy, and agent checks. Exercise real connection behavior on supported Linux/Kubernetes infrastructure when available; identify any unavailable runtime validation precisely and distinguish it from completed implementation. Update this guide to reflect verified availability when implementation is finished, retain any remaining limitations, and run the graphify refresh required by AGENTS.md after code changes.

## 11. Review sensors, inventory, posture, and findings

### 11.1 Sensors

In **Sensors**, **All health** shows the available sensor states. The individual views include **File Integrity**, **YARA-X**, **CrowdSec**, **Falco**, and **Suricata** when data is available. **Guard** is the core protection signal.

- File Integrity reports monitored file changes.

- YARA-X reports malware-pattern evidence.

- CrowdSec reports behavior-based security detections.

- Falco reports runtime and system detections.

- Suricata reports network detections.

- Inventory and Security Configuration provide reporting and assessment data.

Sensor availability depends on the supported platform, enabled configuration, and current operational status. A sensor detection is evidence; it is not automatically a block. Only eligible detections under an activated response policy can produce automatic temporary responses.

### 11.2 Inventory and vulnerability intelligence

In **Inventory**, use **Search packages** to search the customer-facing package table. The table can show package name, version, ecosystem, architecture, and last observed time. It does not patch packages, scan on demand, or remediate vulnerabilities.

Inventory telemetry and the package table are not guaranteed to be complete through the current native reporting path. An empty package table does not prove that inventory collection is healthy, and other inventory evidence does not guarantee a populated table.

Vulnerability intelligence availability differs by platform. Ubuntu and Fedora results can have different availability states, including **Unavailable on Fedora**. Unknown, unavailable, empty, or stale vulnerability information is not evidence that the server has no vulnerabilities.

### 11.3 Posture and findings

Use **Posture** for Security Configuration Assessment findings and the displayed vulnerability-intelligence status. Findings can show failed or regressed configuration checks and any supplied guidance. Posture is an assessment view; it is not a complete vulnerability-management system and does not patch or remediate the server.

## 12. Monitor events and telemetry

Open **Events** for the separately loaded event explorer. Use the available controls:

- **Filter by sensor**

- **Filter by event type** using the exact event type

- **Filter by severity** with **All severities**, **critical**, **high**, **medium**, **low**, or **info**

- **Previous** and **Next** for pagination

Review the event name, source, type, evidence, severity, timestamp, and linked incident when shown. The explorer is server-filtered and paginated; the current interface does not provide a time-range filter. Refresh the explorer or change its filters before drawing conclusions from old data. A global console **Refresh** does not necessarily reload this separately queried explorer.

## 13. Troubleshooting

Keep an independent administrator access method while changing access controls. Record displayed status and non-secret error text. Never share enrollment codes, authenticator secrets, backup codes, private keys, or screenshots containing them.

### Package installation fails

1. Confirm that the selected package matches the target operating system and architecture.

2. Download again from **Install Server Security** and compare the displayed SHA-256.

3. Run the copied command with administrator privileges on the intended server.

4. For RPM, keep signature checking enabled and follow the approved package-signature prerequisite procedure.

5. If the package or command remains unavailable, preserve the non-secret error and obtain administrator assistance. Do not use an unverified package source.

### Enrollment code expires or enrollment is interrupted

Generate a new code only when the previous code is unused or the panel explicitly allows replacement. Enter it before the 15-minute maximum lifetime. If the code was accepted and a later stage failed, it may already be consumed; use **Setup / recovery** only when the server is shown as enrolled. Do not repeatedly issue codes or manually remove security components.

### Installation completed but protection is not confirmed active

Open **Overview** and review **Server protection**, **Provisioning**, **Sensor health**, and **Guard access security**. A package, enrollment success, or **Installation complete** message is not enough. If the state is **PENDING**, **DEGRADED**, **FAILED**, or **CONFIGURATION REQUIRED**, follow the displayed reason and preserve the independent access path. Do not claim active protection until the current panel state and recent telemetry support it.

### A saved policy has not been applied

Read the policy badge. **Saved · pending activation** means the saved revision is not confirmed on the running server. Do not repeatedly save, refresh, or reopen the dialog expecting an automatic update. Keep the previous safe policy and administrator access in place, then obtain approved administrator assistance if activation does not complete.

### MFA setup fails

Check the authenticator clock, use a current six-digit code, and confirm the intended ports and **Enable 2FA for access** value in **Agent configuration**. Save the eight backup codes when they are first displayed. If verification fails, keep the existing administrator session open and do not disable firewall or access controls to test it.

### Port Guard authentication succeeds but the service is inaccessible

Reconnect promptly after **Unlock Ports**. Confirm that the browser and service client use the same observed public source, that the protected port is configured, and that the service's own credentials succeed. Check Allowed IPs / CIDRs, country rules, explicit blocks, automatic responses, and network policy. Authentication does not replace service authentication, and the temporary access window can expire.

### Authenticator access is lost

Use an unused backup code if one is available. Backup codes are single-use and the current interface does not provide a verified customer-facing regeneration or reset workflow. For account MFA or server-access MFA that cannot be recovered, keep any existing administrator session open and use only an approved administrator or account-recovery channel. Do not delete security files or services manually.

### IP or country restrictions behave unexpectedly

For the network-access interface described in Section 10, check the selected server/port, country mode, Always Block/Always Allow lists, actual source address, and confirmed policy state. Until the redesigned controls are confirmed applied in your deployment, legacy manual address and geo settings may still affect the running server; reconcile them during migration rather than treating them as another new blocking feature. Saved settings without confirmed activation do not prove runtime enforcement.

### A session appears stale or shutdown is unconfirmed

Check the selected server and port, the observation time, agent connectivity, and whether the list and globe share the same filters. An offline agent or missing host-network telemetry cannot prove that there are zero connections. **Shut down session** may be requested, expired, unsupported, or failed without a confirmed disconnect; inspect the reported outcome before removing the connection from the active count. If the source has several connections, confirm the exact connection selected. Adding the source to **Always Block** is a separate persistent action and does not prove that an existing connection ended.

### Sensor telemetry is missing or stale

Open **Sensors**, read the sensor reason, and review **Last signal**. Check whether the sensor is **Disabled**, **Unsupported**, **Needs configuration**, **Telemetry stale**, or **No telemetry**. For Suricata, use a verified interface and select **Save interface**. Stale telemetry limits what the panel can confirm; it is not proof that core protection stopped.

### Package inventory is empty

Open **Inventory**, use **Search packages**, and compare the package table with the inventory activity shown below it. The current reporting path does not guarantee that all telemetry populates the package table. An empty table is not proof that no packages exist and does not provide a manual scan or patch action.

### Self-Hosted deployment instructions are missing

The current registration dialog does not provide a verified complete downloadable Self-Hosted deployment configuration. Do not invent a Compose file or command. Keep the service record if useful, and obtain the approved deployment procedure from the responsible administrator or approved product documentation before routing production traffic.

### Support and account recovery

This project documentation does not establish a verified public support contact or complete self-service account-recovery process. Do not send secrets to an unverified address or invent a recovery procedure. Use an officially published channel if one is supplied with your deployment; otherwise ask the responsible administrator for the approved escalation route.

## 14. Current limitations and feature availability

- Native installation is documented for the Ubuntu DEB and Fedora RPM options exposed by the current selector.

- Hosted registration, domain ownership verification, DNS routing, and traffic reachability are separate customer actions.

- Hosted traffic protection has an account-balance prerequisite for usage billing.

- Self-Hosted registration creates a service record, but the current customer dialog does not provide a verified complete downloadable deployment configuration.

- Hosted or Self-Hosted registration does not install or enroll native Server Security.

- Package installation and enrollment do not guarantee completed provisioning or active protection.

- Saved MFA, port, country, Allowed IP, Trusted IP, Explicit block, sensor, Suricata, and response settings may remain pending activation; the interface does not provide a universal customer-facing apply operation for these native settings.

- **ACTIVE** describes reported core protection and does not guarantee every optional feature is enabled. **DEGRADED** can leave core protection available while reducing visibility or coverage.

- **Shadow** is the normal initial response mode. **Observe** and **Shadow** do not enforce automatic temporary blocks. **Enforce** requires explicit selection and confirmed activation, and only eligible detections can produce temporary responses.

- An **APPLIED** response is a recorded outcome and can later expire or be revoked. New-connection blocking does not necessarily terminate existing connections.

- Code for the dedicated Network access page includes unified controls, a four-level session heat map, a swipe-up list, and a targeted shutdown protocol. Their real Linux/Kubernetes operation and browser interactions remain unverified in the supplied documentation. The older dashboard globe still shows independent access-log analytics; its recent-IP metric is not a protected-port session count.

- Expiring MFA grants require nftables in the recorded implementation; the iptables path does not offer equivalent grants. The connection collector covers established TCP sockets in the selected node's host network namespace, not every Kubernetes pod, node, or external load balancer. Missing socket identity is reported as unsupported, and oversized snapshots must be treated as stale rather than complete. Real targeted teardown, another connection from the same IP, tuple reuse, SSH on 2525, ordinary TCP, Kubernetes, restart persistence, and agent acknowledgement still need runtime evidence.

- Legacy Trusted IPs, Allowed IPs / CIDRs, Explicit blocks, and geographic settings have different semantics. Section 10 requires a deliberate migration and replaces the old dashboard web-country-blocklist workflow with the network-access model.

- Inventory, vulnerability intelligence, posture, and sensor telemetry can be unavailable, incomplete, or stale. Unknown information is not proof of a clean or secure server.

- Resolving or dismissing an incident changes its review state; it does not remediate the underlying threat.

If a label or workflow is not present in your deployment, use the current panel state as authoritative and do not change server configuration manually to compensate.
