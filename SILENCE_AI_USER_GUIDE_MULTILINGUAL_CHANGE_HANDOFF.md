# User-guide revision and translation handoff

Prepared: 2026-10-06.

This file is a self-contained instruction for the documentation agent. Copy its contents into that agent's chat. Update the English user guide and its existing language versions according to the requirements below. This task concerns documentation and translation; implementing application features, deploying services, or operating real sessions requires a separate implementation task.

## 1. Read these sources before editing

Repository: `C:\Users\Zen Yashima\Documents\Silence\ai-csd\Server_sec`.

Read:

1. `AGENTS.md` for repository instructions.
2. `SILENCE_AI_SERVER_SECURITY_USER_GUIDE.md`, especially Section 10, “Network access controls, globe, and live sessions,” including NET-01 through NET-11.
3. `NETWORK_ACCESS_NET_CHECKLIST.md` for implementation evidence, unverified behavior, and operational limitations.
4. The existing guides and terminology conventions for every language in your assigned documentation set. Discover actual files; do not invent filenames or claim translations were changed when they were not available.

Section 10 defines the requested product behavior. The implementation checklist records the evidence for current availability. Preserve both: a requirement is not proof that the feature works, and a missing feature must not disappear from the specification merely because it is incomplete.

The guide has already received the detailed network-access requirements. Apply the changes below idempotently: retain correct content, revise conflicting passages, and add missing explanations. Do not duplicate Section 10 or append a second competing specification. Translate the full relevant meaning, examples, conditions, and limitations, rather than a shortened summary.

## 2. State availability truthfully

At preparation time, the guide and checklist report that CMC/Guard code exists and static/unit/cross-build checks have been performed. Real Linux/Kubernetes connection validation and browser interaction validation remain incomplete. This handoff is not an independent runtime certification. Reread the latest checklist before writing availability claims.

The current guide contains a historical opening in Section 10 referring to the old traffic globe and unavailable termination action, followed by a newer implementation-status paragraph. Reconcile that wording: label the old description as the baseline before implementation, retain the requested behavior, and present the latest evidenced status clearly. Do not leave contradictory paragraphs implying both “not implemented” and “fully available.”

Use precise distinctions throughout all languages:

- **Required behavior:** the product must provide it; implementation or verification can still be incomplete.
- **Implemented, validation pending:** code is present, but the stated runtime checks are not complete.
- **Verified behavior:** supported by the cited verification evidence and limited to its tested deployment scope.
- **Saved/pending:** configuration or an action was accepted; live enforcement or completion is not confirmed.
- **Applied/confirmed:** the running agent has confirmed the specific policy revision or action outcome.

Do not turn developer acceptance criteria into unconditional customer instructions. If a step is still unverified, label it accordingly. Do not remove important limitations during translation.

## 3. Replace the old blocking explanation

The intended workflow uses the existing globe and country-list design to manage access to protected network ports. Remove the old customer instructions for using the globe's account-level web-traffic country blocklist as the relevant access-control feature.

Replace the separate JSON-only geographic editor instructions with the unified Countries/IP addresses workflow described below. Do not describe two new parallel geographic blocking systems.

Preserve unrelated web hosting, registration, billing, sensors, incident review, and independent traffic analytics documentation. Removing the old blocking workflow does not mean deleting every mention of websites or HTTP from the guide.

Explain migration when relevant: an account-wide HTTP country blocklist must not silently become a block on all managed servers' SSH or Kubernetes ports. Existing native restrictions and legacy IP settings require deliberate reconciliation. Historical controls may need a clearly labelled compatibility explanation; they must not appear as additional required steps in the new workflow.

## 4. Define a network session and its scope

A session here is an actual active TCP connection from an observed source IP to a configured protected destination port on a managed server. It is not a browser login, a website visitor, an HTTP request, or a count of unique IPs in access logs.

Keep the concrete example: **SSH running on TCP port 2525**. While someone is connected and using that service, their connection belongs in the active-session view. Do not assume SSH always uses port 22. Include configured Kubernetes endpoints and other protected TCP services, using verified service labels rather than guesses from port numbers.

For Kubernetes, distinguish a connection to the managed endpoint from a pod shell, named user, or individual `kubectl` operation. Do not claim those application identities unless the system actually establishes them. Closing a multiplexed connection can affect multiple application operations; describe the observed scope accurately.

Country policies are per server and per protected port. Different ports may use different modes and country lists. Show the selected scope in every procedure. If an all-ports view aggregates different rules, explain its mixed state instead of implying one country's status applies to every port.

Always Allow and Always Block IP lists apply to the selected server's configured protected ports. They are not automatically account-wide or applicable to unrelated ports.

## 5. Describe the exact interface structure

Retain the useful appearance of the existing blocking dialog, globe, and lists. Document this structure:

| First row | Second row | Meaning |
|---|---|---|
| Countries | Blacklisted / Whitelisted | Effective country lists for the selected server/port |
| IP addresses | Always Block / Always Allow | Two persistent, simultaneously active IP lists |

Country enforcement also has a clearly labelled **Blacklist mode / Whitelist mode** selector. Browsing a list does not change the mode. Country entries support searching, adding, and removing selections.

Each IP list has a **+** button, a simple IP input, a saved-entry list, and removal. Describe individual IPv4 and IPv6 addresses. Do not require user agents, fingerprints, usernames, IP-plus-user combinations, JSON, or obligatory CIDR expressions.

Explain server/port selection before editing. Use the actual verified navigation and labels; do not invent buttons or claim a screen was manually tested when it was not. If the actual UI does not yet match the required structure, keep the requirement and record the discrepancy.

## 6. Explain country modes without ambiguity

| Mode | Explicitly selected countries | Other known countries |
|---|---|---|
| Blacklist mode | Blocked | Allowed, subject to IP rules and authentication |
| Whitelist mode | Allowed, subject to IP rules and authentication | Blocked |

An empty blacklist blocks no country. An empty whitelist allows no country. Explain how switching modes retains or transfers selected entries according to verified behavior. Do not confuse the explicit saved selection with its displayed complement.

Keep an example of allowing Kazakhstan and Turkey in whitelist mode, with other countries denied unless a valid IP exception applies.

Explain that eligibility is evaluated independently for each protected port. A denial on one port must not deny another otherwise allowed port, and an allowed port must not unlock a denied port. Revise old group-authorization wording accordingly, preserving any remaining implementation limitation as a limitation.

Unknown countries must be shown honestly. Do not turn a failed lookup into a fabricated country or a promise of unrestricted access. Describe unknown public addresses, GeoIP failure, and private/local addresses using current evidence. At preparation time, the checklist states that unknown public countries fail closed and private/local sources bypass geo evaluation while remaining subject to applicable IP restrictions and MFA. Keep the distinction from Always Allow clear.

## 7. Explain the persistent IP exceptions

**Always Allow:** the address passes geographic restrictions regardless of the selected country mode. The entry persists until removed. This does not bypass MFA, service credentials, or independently applicable automatic threat-response restrictions.

**Always Block:** the address is denied regardless of whether its country would otherwise be allowed. The entry persists until removed.

Both lists operate simultaneously. Opening one tab does not turn off the other list. Switching country mode does not erase or disable either list.

Preserve the employee-travel example in every language: Russia is blacklisted, but an employee is working remotely from Russia. Adding the employee's observed IP to Always Allow exempts that source from the country restriction while required MFA and SSH authentication still apply. The same exception works in whitelist mode when Russia is not listed. Removing the entry restores the country's normal decision.

Explain conflicting membership: the same normalized address cannot be in both lists; an explicit move can change its membership. Do not describe contradictory data as simultaneously allowed and blocked. If validation is bypassed, the documented defensive precedence is block first.

Explain that a shared public IP represents everyone using that observed address, and a changed source IP requires updating the exception. Do not imply IP-only matching identifies a particular person.

Do not equate Always Allow with the existing Trusted IPs feature or a legacy source allowlist: their purposes differ. Explain the actual migration or remaining restrictions without requiring the customer to manage unexplained duplicate lists.

## 8. Explain the globe and its heat map

The requested globe shows effective blocked/allowed countries and live protected-port sessions in the selected scope. It must make an allowed IP exception understandable even within a normally blocked country.

Document four session-density levels with numeric thresholds and a legend, separately distinguishable from country-policy colors. At preparation time, the implementation checklist records **0, 1–2, 3–9, and 10+ sessions**. Verify these against the latest implementation evidence before publishing them as current values. Do not invent a fifth level, unspecified security categories, or an unverified color mapping.

Describe inspecting country/marker clusters to reach individual IPs and connections. Country-level placement must not be described as precise IP geolocation. Mixed policies, unknown/private locations, and stale telemetry require explicit presentation.

Explain that the old “Active Users” metric counted recent access-log IPs; it did not prove current active connections. Keep any legacy analytics clearly labelled and separate from the live-session count.

The globe and list must share filters, totals, and data freshness. Confirmed closed sessions leave the active count. An offline agent or missing telemetry means unknown/stale information, not automatically zero sessions.

## 9. Describe the swipe-up session list

Explain how to swipe upward to open the readable active-session list, and the equivalent visible expand/open control for mouse and keyboard use. Describe collapse/close behavior using the actual interface.

One row represents one connection. Multiple connections from the same source IP remain separate. Document source IP, country/private/unknown status, managed server, destination port, configured service label when available, state, and available time information.

Translate **First observed** distinctly from **Connection started**. Do not imply a start time is known when collection only establishes first observation.

Document available search, scope filters, and navigation. A page of results is not the total connection count. Do not claim complete visibility when collection limits or deployment boundaries prevent it.

## 10. Describe session actions and their different effects

Right-clicking an inspectable IP/session on the globe or in the list exposes:

1. **Shut down session**.
2. **Blacklist IP address**, which adds the source to Always Block.

Describe the equivalent visible action menu for touch and keyboard use. If an IP has several connections, the selected shutdown target must identify the exact connection, server, and port.

**Shut down session** disconnects that selected network connection. It does not shut down the server, service, pod, or every connection from the same IP. It does not necessarily cancel application work already started. It does not persistently block reconnection.

Distinguish requested/queued execution from confirmed shutdown. Explain already-closed, stale, offline, expired, unauthorized, unsupported, and failed outcomes where exposed. Do not claim success from a submitted command alone.

**Blacklist IP address** changes the persistent Always Block list and prevents new connections within its scope once applied. It must show the same entry in the IP-address dialog. If the IP is in Always Allow, describe the explicit move operation. Adding a block is not proof that an existing connection ended; shutdown is a separate action.

## 11. Preserve deployment and verification limitations

Use the latest `NETWORK_ACCESS_NET_CHECKLIST.md`; the following are a dated snapshot, not permanent assumptions:

- Live enforcement of expiring MFA grants currently requires nftables; the iptables path does not provide equivalent grants.
- Collection covers established TCP sockets in the selected node's host network namespace at protected ports. It is not visibility into every Kubernetes pod, node, or external load balancer.
- The recorded Kubernetes configuration pins the endpoint's node. Pod-private and other-node connections remain outside that collector.
- The collector reports unsupported when necessary socket identity is unavailable. Oversized snapshots are rejected/shown stale rather than silently presented as complete results.
- Real socket teardown, preservation of another connection from the same IP, tuple-reuse behavior, SSH on port 2525, Kubernetes, and ordinary TCP runtime behavior remain unverified in the recorded audit.
- Database migration, connected policy acknowledgement, restart persistence, browser gestures, and other acceptance checks still have pending runtime evidence.

Express customer-relevant consequences in plain language. Keep technical verification details in an implementation-status or limitations note. Do not copy shell commands or internal tooling into ordinary user instructions unless needed for the documented role.

Update these statements only when newer evidence closes or changes them. Do not delete limitations simply to make translations sound more confident.

## 12. Update all affected guide sections

| Location | Required editorial change |
|---|---|
| Introduction/status note | Explain the distinction between requested behavior, code present, and verified availability. Resolve stale status contradictions. |
| Table of contents | Include the revised Section 10 title and correct local anchors in every language. |
| Section 6: MFA and protected access | Explain per-port eligibility, retain required MFA/service authentication, and remove misleading group-unlock implications for the target model. |
| Section 7: console/navigation | Add verified navigation to Network access, globe, list, and policy controls. Keep intended/unverified gestures qualified. |
| Section 8: responses | Distinguish manual session shutdown, persistent IP blocking, and automatic threat responses. |
| Section 9: IP/security policy | Reconcile Trusted IPs, legacy allowed sources, and explicit blocks with the new lists. Explain migration and any surviving different scope. |
| Section 10: full network-access specification | Preserve every NET-01 through NET-11 requirement, examples, interface structure, rules, session behavior, and acceptance criteria. Improve wording without narrowing the contract. |
| Section 12: telemetry | Explain connection freshness, matching globe/list data, and the difference from access-log analytics where relevant. |
| Section 13: troubleshooting | Cover wrong server/port selection, unexpected country decisions, source-IP changes, conflicting lists, pending policies, stale sessions, and unconfirmed/unsupported shutdown. |
| Section 14: limitations | Reflect current evidence, Kubernetes scope, firewall prerequisites, and outstanding runtime/browser checks. |
| Related translated instructions | Remove obsolete web-blocklist directions and contradictory claims; update cross-references and terminology consistently. |

Preserve unrelated sections and all required safety/authentication semantics. If customer-facing procedures and developer requirements need separate subsections, keep the full implementation contract accessible in the guide and referenced by stable NET identifiers.

## 13. Translation rules and glossary

Use the product's established terminology in each language. Where an on-screen label remains English, retain that exact label and give the localized explanation; do not make up a translated button the customer cannot find. Where a verified localized label exists, use it consistently.

| Source term | Meaning that must survive translation |
|---|---|
| Network session / active connection | Actual observed TCP connection to a configured protected port |
| Protected port | Configured destination TCP port governed by this server's access policy |
| Blacklist mode | Selected countries denied; other known countries permitted subject to other checks |
| Whitelist mode | Selected countries permitted subject to other checks; other countries denied |
| Always Block | Persistent IP denial in the selected server's protected-port scope |
| Always Allow | Persistent IP exception to geographic restrictions; authentication still required |
| Blacklisted / Whitelisted | Country-list views; browsing them is not a policy-mode switch |
| Shut down session | Disconnect the selected connection, not power off a server or kill a service |
| Blacklist IP address | Add the IP to Always Block; distinct from disconnecting an existing connection |
| Saved / pending / applied / failed | Different policy or action states, not interchangeable success labels |
| First observed | Earliest known observation, not necessarily the true connection start time |
| Stale / unknown / unsupported | Different visibility or execution limitations, not zero activity |
| Trusted IPs | Existing automatic-response concept; not a synonym for Always Allow |

Keep `NET-01` through `NET-11`, filenames, paths, API/code identifiers, IP literals, and port numbers unchanged. Country names may be translated; ISO codes such as `RU`, `KZ`, and `TR` must remain unchanged if used. Preserve the SSH-on-2525 and employee-in-Russia examples. Use neutral factual wording for every country.

Preserve negation, exceptions, scope, and quantifiers carefully: “all other countries,” “this server,” “this port,” “both lists simultaneously,” “until removed,” and “only the selected connection” must mean the same in every language. Translate “always” with its documented authentication and scope qualifications; do not turn it into unconditional access.

Use UTF-8, correct locale typography, valid Markdown tables, and working localized heading anchors. Do not translate machine-readable identifiers or accidentally alter numbers when adjusting punctuation.

## 14. Mandatory review and delivery

Before finishing, reread Section 10, the latest implementation checklist, and this handoff. Create a coverage review for NET-01 through NET-11 in every edited language, with the corresponding section/file location and unresolved discrepancy where applicable.

Double-check these scenarios in the documentation:

- SSH on 2525 and another protected port can have independent country rules.
- Country blacklist and whitelist modes invert the treatment of unselected countries; empty-list behavior is explicit.
- The two-level tab layout and the difference between country modes and simultaneous IP lists are preserved.
- The employee-in-Russia Always Allow example works in both modes without bypassing authentication.
- Always Block applies even to a country-permitted source; conflicts and source-IP changes are explained.
- Four heat levels, accurate geography, scope, freshness, and matching globe/list totals are explained without implying unsupported precision.
- Swipe-up and mouse/keyboard alternatives, row details, and multiple sessions from one IP are included.
- Right-click actions have distinct results: selected-connection shutdown versus persistent IP blocking.
- Pending acknowledgement, actual deployment coverage, and remaining validation limits are unchanged in meaning across languages.
- Obsolete web-blocklist/JSON-editor instructions no longer compete with the new workflow, and unrelated guide content remains intact.

Validate headings, anchors, internal links, tables, and terminology. Do not mark language versions complete based only on successful file creation or fluent prose. Check semantic parity against the English requirements.

In the final report list the files and languages updated, summarize the replaced/added sections, identify source contradictions resolved, and disclose any missing language files or unresolved implementation evidence. Do not claim runtime testing or product implementation as part of this documentation task.
