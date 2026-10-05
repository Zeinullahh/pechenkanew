# Silence AI

## Server Security User Guide

End-user instructions for registration, installation, protected access, security monitoring, and policy management.

> **CUSTOMER DOCUMENTATION**
> Use this guide to register services, install native Server Security, configure access controls, review incidents, and monitor server protection.

Version 1.0 • October 2026

# How to use this guide

This guide is intended for administrators and authorized operators using Silence AI Server Security. It focuses on the actions you can perform from the customer interface and the checks you should complete before relying on a protection or access-control change.

> **Important operating principle**
> Registration, package installation, enrollment, policy configuration, and live protection are separate stages. When a setting is marked pending, wait for the panel to report activation before relying on it.

# 1. Before you begin

Have the following information and access ready before starting:

- A Silence AI account with access to Server Security.
- The service domain or server name you plan to register.

- Network connectivity from the target server to Silence AI.
- Administrator privileges on the target Linux server for native installation.

- For Hosted registration: the destination IP address and permission to update the website and DNS.
- For Self-Hosted registration: the upstream URL and your organization’s approved deployment procedure.

| **Supported native target**             | **Package** |
|-----------------------------------------|-------------|
| Ubuntu Server 22.04 or 24.04 LTS, amd64 | DEB         |
| Fedora Server 44, x86_64                | RPM         |

> **Hosted billing**
> Hosted traffic protection is usage-billed. Confirm that the account has sufficient balance before relying on Hosted traffic protection.

# 2. Sign in and open Server Security

1.  Open the Silence AI admin panel and select Log in.

2.  Complete account MFA using the current six-digit authenticator code.

3.  Open Server Security, then select Servers.

Each server row can expose Install, Setup / recovery, and Open Security. The available action depends on the server’s current enrollment state.

# 3. Register a service

## 3.1 Choose Hosted or Self-Hosted

| **Deployment type** | **Use when**                                          | **Required fields**   |
|---------------------|-------------------------------------------------------|-----------------------|
| Hosted              | Traffic will be protected through the Hosted service. | Domain + IP Address   |
| Self-Hosted         | The service runs in your environment.                 | Domain + Upstream URL |

> **Registration is not installation**
> Creating a Hosted or Self-Hosted service record does not install the native Server Security package or enroll a Linux server.

## 3.2 Create the service record

4.  Select Register new agent.

5.  Choose Hosted or Self-Hosted and continue to the agent data step.

6.  Enter Domain using the host name only, without a URL path.

7.  For Hosted, enter IP Address. For Self-Hosted, enter Upstream URL.

8.  Select Register.

## 3.3 Hosted: verify ownership and route traffic

The registration flow displays two separate items: a website meta tag for ownership verification and an A record for Hosted traffic routing.

9.  Add the supplied meta tag inside the website HTML \<head\>.

10. Publish the change and confirm the website is publicly reachable at the registered domain.

11. In the registration dialog, select Verify Domain Ownership and confirm Verification successful!.

12. Add the displayed A record to DNS for Hosted traffic routing.

13. After DNS propagation, confirm that the website remains reachable through the intended domain.

> **If verification fails**
> Check the domain spelling, public reachability, meta-tag placement, and proxy/CDN host handling, then use Redo verification.

## 3.4 Self-Hosted deployment

After creating the Self-Hosted service record, follow the approved deployment procedure supplied for your environment. Native Server Security installation remains a separate Install action in the server table.

# 4. Install and enroll native Server Security

## 4.1 Install the native package

14. Select Install for the target server.

15. Under 1. Choose a native package, select the operating system and architecture that match the server.

16. Under 2. Download and install, select Download .deb or Download .rpm.

17. Use Copy beside Install command and run the displayed command on the target server with administrator privileges.

Use the filename, install command, and SHA-256 value shown in your panel. Typical commands resemble:



> **Package integrity**
> For RPM packages, keep signature checking enabled and follow your approved signing-key procedure. Do not obtain signing keys from unapproved sources or bypass package verification.

## 4.2 Enroll the server

18. Open 3. Enroll interactively in the installation dialog.

19. On the intended server, run sudo silence-server enroll.

20. Select Generate enrollment code.

21. Enter the displayed code only at the enrollment prompt on the intended server.

22. Keep the installation dialog open while the provisioning stages run.

> **Enrollment code security**
> Enrollment codes are single-use, expire after a maximum of 15 minutes, and must never be copied into tickets, documentation, chat, or shell history.

During provisioning, the dialog can show stages such as Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors, and Installation complete.

## 4.3 Recovery and re-enrollment

For a server already shown as enrolled, Setup / recovery can expose Re-enroll server and Generate recovery code. Use recovery only for the intended server and keep an independent administrator access method available while performing access-related recovery.

## 4.4 Confirm protection

23. Select Open Security for the server.

24. Open Overview and select Refresh.

25. Review Server protection, Provisioning, Sensor health, and Guard access security.

26. Confirm that the current status and recent telemetry match the protection you expect.

> **Pending activation**
> If Policy shows Saved · pending activation, the configuration is saved but should not yet be treated as active.

# 5. Understand protection status

| **State**              | **Meaning**                                                                                       | **What to do**                                              |
|------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| ACTIVE                 | Core protection is reported as available.                                                         | Review optional sensor and policy status separately.        |
| DEGRADED               | Core protection may remain available, but one or more health or coverage signals needs attention. | Read the reason and review Sensors.                         |
| FAILED                 | Provisioning or core protection reported a failure.                                               | Read the error and follow troubleshooting.                  |
| PENDING                | Installation, provisioning, or policy activation is incomplete.                                   | Wait for completion; do not treat the change as active.     |
| CONFIGURATION REQUIRED | The panel needs additional information to confirm core health.                                    | Confirm enrollment and follow the displayed requirement.    |
| REMOVED                | Native protection was removed or is no longer reported.                                           | Use the supported Setup / recovery workflow when available. |

Sensor cards can separately report Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale, or No telemetry.

# 6. Configure MFA and protected access

## 6.1 Account MFA

27. During account registration, open Set up 2FA.

28. Scan the QR code or enter the secret key in a TOTP authenticator application.

29. Enter the current six-digit code and select Verify and finish.

30. At future sign-ins, use the current authenticator code.

> **Protect MFA secrets**
> Never send an authenticator secret, QR code, or recovery code to another person. If you lose authenticator access, use your organization’s approved account-recovery channel.

## 6.2 Server-access MFA (SSH 2FA / Port Guard)

The SSH 2FA control protects the configured TCP ports as a group; it is not limited to SSH port 22 and it does not cover UDP.

> **Before changing access controls**
> Keep an independent administrator session or tested recovery method available until access has been confirmed from the intended source network.

31. In the server table, open the pencil/edit control.

32. In Agent configuration, add or remove the protected TCP ports, then select Save. Ports must be whole numbers from 1 through 65535.

33. In the server row, turn on SSH 2FA to open the 2FA SSH Guard setup.

34. Scan the QR code or enter the Manual entry key in your authenticator app.

35. Save all eight Backup / Recovery Codes before continuing. Each code is single-use.

36. Select Next — Verify Code, enter the current six-digit code, and select Verify.

37. Confirm 2FA verified successfully!, select Done, then reopen Agent configuration and confirm the intended ports and access setting.

## 6.3 Authenticate with Port Guard

38. Open the Port Guard address supplied for your deployment from the same network source that will connect to the protected service.

39. Enter the current six-digit authenticator code or one unused backup code.

40. Select Unlock Ports.

41. After the page reports that the ports are open, reconnect promptly to the protected service.

The configured protected TCP ports are authorized together for a temporary access window. The displayed duration is authoritative; the generated default is 60 seconds. The protected service still requires its own credentials.

> **Same source network**
> The browser used for Port Guard and the SSH/database/application client should appear from the same observed source network. Changing networks can require re-authentication.

# 7. Use the Server Security console

| **Tab**   | **Purpose**                                                                               |
|-----------|-------------------------------------------------------------------------------------------|
| Overview  | Protection state, provisioning, sensor health, incidents, responses, and recent activity. |
| Incidents | Correlated security activity for review.                                                  |
| Responses | Automatic response records and results.                                                   |
| Sensors   | Sensor health and detection views.                                                        |
| Posture   | Security Configuration Assessment findings and vulnerability-intelligence status.         |
| Inventory | Reported package and server inventory.                                                    |
| Events    | Filterable, paginated server telemetry.                                                   |
| Policy    | Automatic response mode, IP policy, sensor switches, and Suricata interface.              |

Use Refresh for the main console. In Events, change the page or filter when you need to refresh the event explorer itself.

# 8. Review incidents and responses

## 8.1 Incidents

Select an incident to open Incident details. Review severity, summary, source information when available, Timeline, Evidence, and Technical details.

| **Action**         | **Effect**                                                           |
|--------------------|----------------------------------------------------------------------|
| Mark investigating | Changes the incident review status to indicate active investigation. |
| Resolve            | Records that incident review is complete.                            |
| Dismiss            | Records that the incident will not be pursued.                       |

> **Incident status is not remediation**
> Changing an incident’s review state does not itself remove malware, terminate an attacker, or repair a compromised server.

## 8.2 Responses

| **Status**                                        | **Meaning**                                                        |
|---------------------------------------------------|--------------------------------------------------------------------|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | Recorded or approved for evaluation; application is not confirmed. |
| APPLIED                                           | The response was recorded as applied within the displayed scope.   |
| EXPIRED                                           | A temporary response is no longer active.                          |
| REVOKED                                           | The response was withdrawn.                                        |
| FAILED                                            | The requested action did not complete successfully.                |
| SUPPRESSED                                        | The response was not enforced under the applicable policy.         |

Review the source, action and scope, reason, status, start time, and expiration together. Blocking new connections does not necessarily terminate an already established connection.

# 9. Configure security policy

## 9.1 Automatic response mode

| **Mode** | **Behavior**                                                                            |
|----------|-----------------------------------------------------------------------------------------|
| Observe  | Records eligible decisions without automatic enforcement.                               |
| Shadow   | Evaluates eligible detections without enforcing temporary blocks.                       |
| Enforce  | Can apply approved temporary IP blocks when policy and detection conditions are active. |

The normal initial installed mode is Shadow. To use Enforce, select Enforce, review Enable automatic enforcement?, and confirm Enable Enforce. Enforce applies only to eligible detections.

## 9.2 Trusted IPs

42. Open Policy → Trusted IPs.

43. Enter Trusted IP or CIDR and, optionally, a Description.

44. Select Add trusted source.

45. Use Remove to delete an entry or Move to block to convert it into an explicit block.

Trusted IPs exempts a source from eligible automatic-response blocking. It does not bypass MFA, country restrictions, Allowed IPs / CIDRs, service credentials, or other access controls.

## 9.3 Allowed IPs / CIDRs

46. Open the server row’s pencil/edit control.

47. In Agent configuration, enter individual IPv4/IPv6 addresses or CIDR ranges in Allowed IPs / CIDRs (comma-separated).

48. Select Save and reopen the dialog to verify the value retained by the panel.

When the saved list is empty, the Port Guard address check allows all sources to continue to authentication. When the list is nonempty, only matching addresses or ranges may continue.

## 9.4 Explicit blocks

49. Open Policy → Explicit blocks.

50. Enter Blocked IP or CIDR, the required Reason, and an optional Explicit block expiry.

51. Select Add explicit block.

52. Use Remove to delete an entry. To correct an entry, remove it and create a new one.

> **Avoid administrator lockout**
> Before adding a block, check administrator, monitoring, NAT, and shared addresses that may use the same source IP or CIDR.

## 9.5 Sensors and Suricata

Policy → Sensor state can expose Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco, and Suricata switches.

For Suricata, open Policy → Suricata monitored interface, choose a displayed candidate or enter a verified interface such as ens3, then select Save interface. Confirm fresh Suricata telemetry after the change.

# 10. Manage country-based access controls

## 10.1 Per-server Geo-Country Filtering

Per-server Geo-Country Filtering applies to the configured protected TCP-port group and requires verified server-access MFA.

53. Configure the protected TCP ports and complete SSH 2FA setup.

54. Open Agent configuration and turn on Enable Geo-Country Filtering.

55. Choose Allow Unmatched or Deny Unmatched under Default Policy.

56. Enter a valid Geo Rules (JSON Array) value and select Save.

57. Reopen Agent configuration and verify the saved switch, default policy, rules, ports, and 2FA setting.



- An explicit rule for a configured port takes precedence over the default policy.
- An allow rule permits the listed countries and denies countries not listed in that rule.

- A deny rule denies the listed countries and permits countries not listed in that rule.
- The default policy applies only to configured ports without an explicit rule.

## 10.2 Account-level country blocklist

Blacklist countries on the general dashboard is an account-level web-traffic blocklist and is separate from per-server Geo-Country Filtering.

58. Open Blacklist countries.

59. Open Non-Blacklisted and search by country name or two-letter code if needed.

60. Select a country and choose Add. The change is saved immediately.

61. Confirm the country appears under Blacklisted.

To remove a country, open Blacklisted, select the blocked country, and choose remove. The country returns to Non-Blacklisted.

# 11. Review sensors, inventory, posture, and findings

## 11.1 Sensors

| **Sensor / view**                  | **What it reports**                 |
|------------------------------------|-------------------------------------|
| Guard                              | Core protection signal.             |
| File Integrity                     | Monitored file changes.             |
| YARA-X                             | Malware-pattern evidence.           |
| CrowdSec                           | Behavior-based security detections. |
| Falco                              | Runtime and system detections.      |
| Suricata                           | Network detections.                 |
| Inventory / Security Configuration | Inventory and assessment data.      |

A sensor detection is evidence. Automatic temporary responses occur only for eligible detections under an activated response policy.

## 11.2 Inventory and vulnerability intelligence

Inventory can show package name, version, ecosystem, architecture, and last observed time. Use Search packages to filter the customer-facing package table. Inventory is informational; it does not patch packages or remediate vulnerabilities.

> **Interpret empty or stale data carefully**
> Empty, unavailable, unknown, or stale inventory/vulnerability information is not evidence that a server has no packages or vulnerabilities.

## 11.3 Posture

Use Posture for Security Configuration Assessment findings and vulnerability-intelligence status. Findings can show failed or regressed checks and any supplied guidance. Posture is an assessment view and does not automatically remediate the server.

# 12. Monitor events and telemetry

Open Events and use the available filters:

- Filter by sensor.
- Filter by event type using the exact event type.

- Filter by severity: All severities, critical, high, medium, low, or info.
- Use Previous and Next for pagination.

Review event name, source, type, evidence, severity, timestamp, and linked incident when shown.

# 13. Troubleshooting

> **First rule**
> Keep independent administrator access available while changing access controls. Record non-secret error text, and never share enrollment codes, MFA secrets, backup codes, private keys, or screenshots containing them.

| **Situation**                                      | **Recommended action**                                                                                                                                                                                                       |
|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Package installation fails                         | Confirm the selected package matches the OS/architecture, download it again, compare the displayed SHA-256, and run the copied command with administrator privileges. For RPM, keep signature checking enabled.              |
| Enrollment code expires                            | Generate a new code only when the previous one is unused or the panel explicitly allows replacement. If a code was accepted before a later failure, use Setup / recovery when the server is shown as enrolled.               |
| Protection is not confirmed active                 | Open Overview and review Server protection, Provisioning, Sensor health, and Guard access security. Follow the displayed reason for PENDING, DEGRADED, FAILED, or CONFIGURATION REQUIRED.                                    |
| Policy shows Saved · pending activation            | Treat the policy as saved but not yet active. Keep the previous safe configuration and administrator access available until activation completes.                                                                            |
| MFA setup fails                                    | Check authenticator time, use a current six-digit code, verify the intended ports, and keep the existing administrator session open.                                                                                         |
| Port Guard unlocks but the service is inaccessible | Reconnect promptly, confirm browser/client use the same observed source, verify the protected port and service credentials, and review Allowed IPs, country rules, explicit blocks, automatic responses, and network policy. |
| Authenticator access is lost                       | Use an unused backup code when available and then use your organization’s approved recovery process.                                                                                                                         |
| IP or country restrictions behave unexpectedly     | Identify the controlling feature, verify the source address and port, review rule precedence and expiry, and check for accidental administrator lockout before adding another rule.                                          |
| Sensor telemetry is missing or stale               | Open Sensors, review the sensor state and Last signal, and verify configuration such as the Suricata interface when relevant.                                                                                                |
| Package inventory is empty                         | Use Search packages and compare the package table with other inventory activity. Treat an empty table as incomplete information rather than proof that no packages exist.                                                    |

# 14. Security and operating best practices

- Use the narrowest practical IP/CIDR ranges for trusted and allowed sources.
- Keep a tested administrator recovery path when enabling MFA, explicit blocks, or country restrictions.

- Do not rely on a saved configuration until the panel reports an appropriate active/healthy state and recent telemetry supports it.
- Treat sensor detections as evidence to investigate; do not assume every detection has been automatically blocked.

- Review response expiration before assuming an automatic block is still active.
- Do not manually remove security files or services as a recovery method unless your approved operational procedure explicitly requires it.

# Appendix A — Quick status reference

| **Item**                   | **Customer interpretation**                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| Registered                 | The service record exists.                                                                                  |
| Installed                  | The native package was installed.                                                                           |
| Enrolled                   | The one-time enrollment code was accepted.                                                                  |
| Installation complete      | Provisioning reached the installation-complete stage; confirm current Overview state and telemetry.         |
| Saved · pending activation | The change is stored in the panel but should not yet be treated as active.                                  |
| SSH 2FA: Active            | Authenticator setup is complete for the row; confirm intended protected ports and current protection state. |
