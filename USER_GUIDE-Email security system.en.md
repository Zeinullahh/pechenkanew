# Unified Email Platform User Guide

Unified Email Platform combines three independent products:

- **CMC / Silence 365 Email Visualizer** — email-domain setup, mail-flow visualization, threat review, and organization management;
- **Email Protector** — secure webmail with message classification, attachment scanning, folders, settings, and mail migration;
- **WebSOC / AI-SOC Web** — connecting web domains to the security gateway, traffic monitoring, geographic restrictions, and balance management.

The appearance and available features depend on the user role, plan, and organization settings. Your organization administrator provides the addresses of all three consoles. Do not use one console's address to sign in to another.

## Contents

1. [Platform overview](#1-platform-overview)
2. [Account access](#2-account-access)
3. [CMC — Silence 365 Email Visualizer](#3-cmc-silence-365-email-visualizer)
4. [Email Protector](#4-email-protector)
5. [WebSOC / AI-SOC Web](#5-websoc-ai-soc-web)
6. [Common issues](#6-common-issues)
7. [Security recommendations](#7-security-recommendations)
8. [Glossary](#8-glossary)
9. [Contacting support](#9-contacting-support)

## 1. Platform overview

### 1.1 Which product to use

| Task | Product |
|---|---|
| Add an email domain and configure MX, SPF, DKIM, and DMARC | CMC |
| Review mail-flow directions and threat categories | CMC |
| Manage employees, departments, and company email servers | CMC, administrator role |
| Read, send, and organize email | Email Protector |
| Check a message classification or attachment-scan result | Email Protector |
| Migrate messages from another email service | Email Protector |
| Connect a web domain to the security gateway | WebSOC |
| Review RPS, bandwidth, active IP addresses, and traffic geography | WebSOC |
| Restrict web traffic by country or allowed ports | WebSOC |

### 1.2 Roles and access rights

| Role | Main capabilities |
|---|---|
| Email user | Work with their own messages, folders, and personal settings |
| Organization administrator | Manage employees, departments, domains, shared signatures, and protection settings |
| Domain administrator | Configure DNS and email servers and check domain statuses |
| WebSOC administrator | Connect web domains and change the origin address and country list |
| Platform employee | Manage agreed customer pricing; this area is unavailable to ordinary customers |

If a required item is missing or access is denied, contact your organization administrator. Do not use another person's account to bypass restrictions.

### 1.3 Before you begin

Depending on the task, prepare:

- the address of the required console;
- a working account;
- an authenticator app for 2FA;
- access to the domain's DNS panel;
- permission to change the website and DNS for WebSOC connection;
- the address or name of the origin web server for WebSOC;
- external-mailbox credentials or Microsoft authorization for migration;
- payment authority if the balance must be topped up.

> Important: always take DNS values, IP addresses, verification keys, and amounts from your own console. Do not copy values from examples or another customer's instructions.

## 2. Account access

### 2.1 General sign-in rules

Each console has its own sign-in screen and session. If single sign-on is enabled, the console redirects you to **AI-CSD** or displays **Sign in with AI-CSD / Sign in**.

1. Open the product address supplied by your administrator.
2. Select an available sign-in method.
3. Complete verification with the account provider when using SSO, Google, or Microsoft.
4. Enter the six-digit code if the 2FA page opens.
5. After signing in, confirm that the profile shows the expected account.

### 2.2 Accessing CMC

CMC may offer:

- **Sign in** with email and password;
- **Continue with Google**;
- **Continue with Outlook**;
- **Sign in with AI-CSD / Sign in** when SSO is enabled.

To create a customer account:

1. Select **Create account**.
2. Select **Monthly** or **Yearly**.
3. Select an available plan. Use the names, limits, and prices shown on the current screen.
4. Enter a username and email.
5. Use the button beside the email field to send a verification code.
6. Enter the received code and a password.
7. Enter a promo code before completing registration, if applicable.
8. Complete registration and sign in to CMC.

For a local account, CMC asks you to configure 2FA:

1. On **Set Up Two-Factor Authentication**, scan the QR code with an authenticator app.
2. If scanning is unavailable, select **Can't scan? Enter key manually** and add the displayed key.
3. Enter the six-digit code.
4. Select **Activate 2FA**.

On subsequent sign-ins, enter the code on **Two-Factor Authentication** and select **Verify**.

### 2.3 Accessing Email Protector

Email Protector may open SSO automatically or show:

- **Continue with Google**;
- **Continue with Microsoft**;
- **Email** and **Password** with **Sign in**;
- **Login with QR Code**.

Local accounts are normally created by the organization administrator. At first sign-in, you may be required to change the temporary password, configure 2FA, and confirm sign-in with a six-digit code.

For QR sign-in, select **Login with QR Code**, scan the displayed code on a second authorized device, and approve the sign-in on the confirmation page.

### 2.4 Accessing WebSOC

To register:

1. On **Welcome**, select **Register**.
2. Complete **Email** and **Username**.
3. Enter a password and repeat it in **Confirm password**.
4. If needed, provide **Recovery password**, **Recovery email**, and **Promocode**.
5. Confirm your age and acceptance of the terms.
6. Select **Continue**.
7. On **Set up 2FA**, scan the QR code or enter the secret key manually.
8. Enter the **6-digit code** and select **Verify and finish**.

A WebSOC password must contain at least one uppercase Latin letter and one digit and may contain only Latin letters and digits. The same rules apply to a recovery password.

For normal sign-in:

1. Select **Log in**.
2. Enter **Email or Username** and **Password**.
3. Select **Continue**.
4. Enter the code on **Two-factor authentication**.
5. Select **Verify and continue**.

To recover a password, select **Forgot password?**, request an email code, then enter the code and new password. **Resend code** sends it again.

## 3. CMC — Silence 365 Email Visualizer

### 3.1 Initial setup

For a self-service CMC customer account, select a plan and complete **Initial domain mail setup**. The wizard has four stages: **Domain**, **DNS verification**, **Security**, and **Ready**. Progress is saved for the domain.

If the organization uses only Google or Outlook and **Use AI-SOC as security layer (Gmail/Outlook only)** is available, you may continue without configuring hosted domain mail. Use this option only after agreement with the domain administrator.

### 3.2 Adding and verifying a domain

1. At **Step 1. Add domain**, enter the domain without `https://` or a path.
2. Select **Continue**.
3. At **Step 2. Verify domain via DNS**, copy the displayed **TXT name** and **TXT value**.
4. Create the TXT record in the domain's DNS panel.
5. Wait for DNS propagation.
6. Select **Check now**; the wizard also checks periodically.
7. Continue only after **Verified** appears.

Some DNS panels append the domain to Name automatically. Follow the CMC prompt to avoid a duplicated domain suffix.

### 3.3 Configuring MX, SPF, DKIM, and DMARC

At **Step 3. Security setup**, CMC shows the exact records to add.

| Record | Purpose |
|---|---|
| MX | Routes incoming mail to the required mail server |
| SPF | Lists sources allowed to send mail for the domain |
| DKIM | Publishes the key used to verify outgoing-message signatures |
| DMARC | Defines policy and reporting for messages that fail SPF or DKIM |

For every record, generate it if required; copy **Type**, **Name/Host**, **Value**, **Priority**, and **TTL** exactly; create or update it in DNS; wait for propagation; select **Verify**; and confirm **Configured**.

For DMARC, provide RUA and RUF aliases when requested. They define aggregate- and failure-report addresses.

> Important: coordinate changes to an existing SPF record with the mail administrator. Multiple SPF records for one name can break sender verification.

| Status | Meaning |
|---|---|
| **Not configured** | The required record was not found |
| **Update required** | The discovered value differs from the recommendation |
| **Configured** | The record matches the expected value |
| **Pending verification** | The change has not yet been detected |
| **Error** | Verification could not be completed |

After all records are configured, proceed to **Step 4. Ready** and select **Go to dashboard**.

### 3.4 Managing domains

Administrators can use **Domains** and **Domain management** to add a domain, copy its verification token, repeat **Verify**, review separate MX/SPF/DKIM/DMARC statuses, use **Set default**, enter allowed SMTP-server IP addresses, open **DNS setup**, rename a domain, or delete it.

Before deletion, confirm that employees and mail clients no longer use the domain. Deletion requires separate confirmation.

### 3.5 Dashboard and mail-flow visualization

The CMC dashboard graph represents employees, departments, or domains as nodes and mail exchange as connections. It provides **Incoming**, **Outgoing**, **Time range**, **Filter**, and analytics cards for departments and domains.

1. Select **Incoming** or **Outgoing**.
2. Open **Time range** and choose the last hour, 3/6/12/24 hours, all time, or a custom range.
3. If needed, open **Filter**, complete sender, recipient, subject, text, or attachment fields, and select **Apply filters**.
4. Select a graph node to open related messages.
5. Use search and **Newest first** / **Oldest first** sorting.
6. Open a message to review its content, headers, and attachments.

A custom range cannot end in the future, and its start must precede its end.

### 3.6 Threat categories

The arrow at the bottom of the dashboard opens **Threat categories**.

| Category | Meaning |
|---|---|
| **Possibly spoofed** | The sender or domain may be impersonated |
| **Spam** | The message resembles unsolicited mail |
| **Dangerous link** | A potentially dangerous link was found |
| **Possibly phishing** | The message may seek credentials or payment data |
| **Malware in the attachment** | A dangerous object was found in an attachment |
| **Secure emails** | Checks found no known threat indicators |

Select a category card and **Click to view** to open the message. Details include sender, recipient, date, content, source text, and attachment information.

Attachment statuses are **Safe**, **Suspicious**, **Malware detected**, and **Pending scan**. Moving a message to Trash is different from **Delete permanently**; use permanent deletion only after checking the selected message.

### 3.7 Employees and administrators

Administrators can open **Settings** → **Employees** and use **+ Add** → **Create manually**. Enter the required email, first name, last name, and other data; verify whether sign-in uses Google, Microsoft, or an internal account; add addresses, phone numbers, or aliases if needed; then select **Create**.

For bulk creation, use **Upload employee list**, download **Download CSV template**, preserve its structure, run **Import**, and review **Created** and **Skipped**.

An employee's menu may offer **Edit**, **Change password** for internal accounts, **Edit aliases**, **Make administrator** / **Revoke administrator rights**, and **Delete**. Grant administrator rights only when organization management is genuinely required.

### 3.8 Departments

Administrators can create departments and assign employees:

1. Open **Settings** → **Departments**.
2. Create a department with a unique name.
3. Open its member list and add employees.
4. Use the remove action to remove an employee from the department.

Do not delete a department until its membership and effect on visualization have been checked.

### 3.9 General protection settings

The administrator-only **Security** tab may contain **Enable phishing detector**, **Enable attachment virus scanning**, **Block management** for domains and addresses, and a link to company mail-server settings. After changing a switch, wait for saving to finish and verify that its new state remains selected.

### 3.10 Company email servers

In **Company Email Servers**:

1. Enter **IMAP server**, **IMAP port**, and **IMAP security**.
2. If needed, enter **SMTP server**, **SMTP port**, and **SMTP security**.
3. Select **SSL/TLS** or **STARTTLS** according to the server configuration.
4. Save and review the resulting mail-client parameters.

If SMTP is omitted, external clients can receive through IMAP, but sending remains available only in the web app.

> Important: **None / plain text** sends data without channel protection. Use it only on an isolated trusted network and by decision of the security administrator.

### 3.11 Organization and AI settings

The **General** tab lets you select language and time zone and, with sufficient rights, change the organization name and logo.

If **AI Agent** is available, an administrator can select a provider and model, enter an endpoint only for a supported configuration, store the access key securely, save, and run the built-in connection test. Never share the key with employees or expose it in screenshots.

### 3.12 Plan, wallet, and payments

The profile menu contains **Balance**, **Top Up Balance**, and **Manage Plan**.

To top up, open **Top Up Balance**, verify the displayed currency and minimum/maximum, enter an amount, select **Pay**, finish on the secure payment page, and confirm the updated balance after returning.

To change plan, select **Manage Plan**, compare user, administrator, storage, and AI-operation limits, choose monthly or yearly billing, choose a plan, review the activation or transition cost, and confirm.

Prices and currency depend on the deployment and customer agreement. Use only values shown in your console.

## 4. Email Protector

### 4.1 Main interface areas

After sign-in, **Email Protector** provides a folder sidebar, message list, reading and security-details area, **Compose** button, search, account switcher, **Settings**, and language/sign-out menu.

System folders may include **All mail**, **Important**, **Inbox**, **Sent**, **Drafts**, **Scheduled**, and **Trash**. The Security area contains quarantine and error folders available to the organization. User folders appear under **My folders**.

### 4.2 Reading and checking a message

1. Select a folder and message.
2. Check sender, recipients, subject, and date.
3. Review the color indicator and security classification.
4. Expand **Attachments** and check every file's status.
5. If needed, select **Show details** or **Show source text**.

| Classification | Recommended action |
|---|---|
| **Secure** | Work normally while retaining standard caution |
| **Spam** | Verify the sender; do not reply to unsolicited mail |
| **Possibly Spoofed** | Confirm the sender's identity over an independent channel |
| **Possibly Phishing** | Do not follow links or enter credentials |
| Dangerous links | Do not open before specialist review |
| Dangerous attachments | Do not download or run the file |

| Attachment status | Action |
|---|---|
| **Clean** | Download is available |
| **Suspicious** | Review details and consult an administrator if uncertain |
| **Download blocked** | Do not attempt to bypass the block |
| **Scanning…** | Wait for completion |
| **Not scanned** | Do not open without an additional check |

A **Clean** result does not replace checking message context, the sender address, and whether the attachment was expected.

### 4.3 Search and message-list actions

- Enter text in **Search emails...**.
- Use **All**, **Secure**, **Spam**, **Spoofing**, and **Threats found** filters.
- Select the star to add a message to **Important**.
- Use the folder menu to move a message to a custom folder or return it to **Inbox**.
- Select multiple messages for bulk movement to Trash.
- In **Trash**, select **Restore** or permanent deletion.
- Select **Load more** when only part of the list is shown.

> Important: permanent deletion cannot be undone. First confirm that **Trash** and the intended messages are selected.

### 4.4 Composing and sending

1. Select **Compose**.
2. Complete **To** and, if needed, expand **Cc** and **Bcc**.
3. Enter a subject and body.
4. Add files with the attachment button.
5. To send later, select **Schedule send** and enter a future date and time.
6. Select **Send email**.

Open a draft from **Drafts** to edit and send it. Scheduled messages are available in **Scheduled** and can be reviewed and cancelled before delivery through the corresponding interface action.

### 4.5 Actions on an open message

Depending on the message and permissions, you can mark/unmark **Important**, open full view, move to a folder, show source text, translate and return to the original, create an AI reply draft, unsubscribe when a supported link exists, or move the message to Trash.

Verify the sender before unsubscribing. Do not use an unsubscribe link in an obviously phishing message.

### 4.6 Custom folders and rules

1. Select **New folder** or **Create folder**.
2. Enter **Folder name**.
3. Add **Inclusion rules** for addresses or domains whose messages belong in the folder.
4. Add **Exclusion rules** for exceptions.
5. Select **Save**.

Exclusion rules take priority. A folder's menu can rename it, change its rules, or delete it. Review the on-screen warning before deletion.

### 4.7 Switching accounts

The account menu can add another authorized account and switch between accounts.

1. Open the account switcher and select **Add account**.
2. For Google or Microsoft, complete provider sign-in.
3. For a local account, enter email and password, then a 2FA code if requested.
4. Select the required account from the list to switch.

The active account cannot be removed from the list. A local account may require its password again when switching.

### 4.8 Mailbox settings

Open **Settings**, then select the required area.

#### General

Configure **Sender name**, the sent folder, time zone, and date format, then select **Save**.

#### Signature

Enable **Add to outgoing emails**, create the signature in the editor, review **Signature preview**, and save.

#### Autoresponder

Enable **Autoresponder**, enter start/end dates and reply text, optionally enable **Reply once per sender**, review the preview, and save.

#### Forwarding

Enter a forwarding address and select **Add**. Choose whether to **Keep a copy in Inbox**, then save.

#### Blocked senders

Enter an address and select **Block sender**. Messages from it go to Spam automatically. Use **Unblock** to reverse the action.

#### Security

**Enable phishing detector** controls checks for known phishing domains, suspicious links, and domain risk for your account.

#### Account management

Change a saved account's display name and email or remove an inactive account from the list.

#### Storage

Review used space and quota percentage. Above 90%, delete unnecessary messages and attachments or ask the administrator about the plan.

#### Display and behavior

Available options may include Trash auto-deletion period, custom background and blur, glassmorphism, mark-as-read behavior, preview pane, conversation mode, and compose font/text size.

### 4.9 Mail migration

Open **Account settings** → **Email migration** → **Start migration**. The screen supports **Gmail**, **Outlook**, **iCloud**, and **Custom IMAP**.

For Gmail or iCloud, select the provider, enter the external mailbox, enter a provider-created app password rather than the primary password when required, and select **Start Migration**. For Outlook, select **Connect Outlook Account** and authorize access in Microsoft. For **Custom IMAP**, also enter **IMAP Server** and **Port**.

Migration shows completion percentage, processed-message count, and current folder. **Pause** and **Resume** control the task; **Migration Complete!** appears when finished. Do not revoke mailbox access or the app password before completion.

### 4.10 AI features

If enabled by the administrator:

- the AI icon on a message creates a reply draft;
- **AI auto reply** can save a generated response as a draft for review;
- automatic sending should be enabled only under organization policy;
- AI Assistant can summarize or explain a message and prepare a reply.

Before sending, verify recipients, facts, attachments, and tone. Never give the assistant secrets, passwords, or unrelated personal data.

### 4.11 Calendly

**Calendly** displays **Connected** or **Not connected**. Create a personal token in Calendly integrations, enter it in **Calendly API token**, select **Connect Calendly**, and confirm **Connected**. Use **Disconnect Calendly** to end the integration. Treat the token as a secret.

### 4.12 User management and shared signatures

Administrators can manage permitted users and company signatures. For a shared signature:

1. Open **Company Signatures** and select **New**.
2. Enter **Signature Name**.
3. Select **Company**, **Domain**, **Department**, or **User** scope.
4. Enter content and review **Preview**.
5. Enable **Active** and select **Create** or **Save**.

When editing, verify the selected domain, department, or user. Shared-signature deletion requires separate confirmation.

## 5. WebSOC / AI-SOC Web

### 5.1 Connecting a domain

WebSOC calls a connection object an agent, but the user wizard configures a domain and origin web server. You do not need to install software from an unverified command.

1. Open **Data source selection**.
2. Select **Add new agent** or **Register new agent**.
3. Enter the protected domain in **Domain**.
4. Enter the current origin host or server IP in **IP address**.
5. Select **Register**.

#### Step 1. Verify site ownership

In **Step 1. Add ownership meta tag on your origin website**, select **Copy tag**, add the displayed meta tag to the home page's `<head>`, publish, and confirm that the page is publicly reachable by domain name. **Copy key** copies only the key value; **Copy tag** copies the complete tag.

#### Step 2. Delegate ACME

In **Step 2. Add ACME delegation CNAME**, copy **Name** and **Hostname (target)**, create the CNAME record, wait for DNS propagation, and select **Verify ownership and DNS**. Success appears as **Ownership and DNS verified**; traffic routing may still be inactive.

#### Step 3. Switch traffic

After verification, **Step 3. DNS A record to add (switch traffic through WebSOC)** appears.

1. Copy **Name** and **IP address**.
2. Confirm that the WebSOC origin is correct and responds on an allowed port.
3. Create or update the domain's A record with the displayed value.
4. Wait for DNS propagation.
5. Open **Domain setup details** and check **DNS routing**.

> Important: changing the A record switches user traffic. Do this in an approved change window and retain DNS and origin-server access for recovery.

### 5.2 Domain statuses

| Status | Meaning |
|---|---|
| **Delegation not verified** | The meta tag or CNAME has not been verified |
| **Delegation verified / DNS pending** | Ownership and delegation are verified, but the A record does not yet route through WebSOC |
| **Active** | Delegation is verified and DNS routing is active |

The circular-arrow button repeats verification. The document button opens **Domain setup details** with every required value.

### 5.3 Configuring the origin server

In **Data source selection**, find the domain, select the pencil, check **IP address** in **Agent configuration**, enter the new origin host or IP, select **Save**, and wait for **Configuration updated successfully!**. Confirm that the new origin is reachable and serves the required domain before changing it.

### 5.4 Selecting domains and using the traffic map

1. Open **Data source selection** and select the domains to analyze.
2. On the right, select:
   - **RPS** — requests per second;
   - **Bandwidth** — data transferred;
   - **Active Users** — active IP-address count.
3. Point to a country on the globe to review data for the selected domains.

Map intensity compares countries by the chosen metric. Use the chart, not only the current color, when assessing trends.

### 5.5 Charts and leading countries

Use the bottom arrow to open **Server load chart**. Available periods are **1 day**, **2 days**, **7 days**, **14 days**, **1 month**, and **3 months**.

The window also lists countries with the most active IP addresses, highest bandwidth, and highest RPS. Selecting a chart region narrows the period for related metrics. Compare identical domains and periods to avoid misleading conclusions.

### 5.6 Anomaly notifications

When an anomaly is detected, a red message panel appears at the top. Read it, record the domain and time, then select **OK**. Closing the panel confirms only that the message was viewed; it does not resolve the cause. Review charts and the origin service and escalate to the security administrator if needed.

### 5.7 Country blacklist

1. Select **Country blacklist**.
2. Open **Not blacklisted** or search for a country.
3. Select it and choose **Add**.
4. Confirm that it appears under **Blacklisted**.

To reverse the action, select the country under **Blacklisted** and choose **delete**.

> Important: before adding a country, check for employees, customers, external monitoring, or payment systems located there. Preserve administrative access from an allowed country.

### 5.8 Language and theme

The upper-left menu provides **Globe style**, **Select language**, **Payment history**, and **Promo code**.

### 5.9 Balance and payments

The profile menu displays the balance. To top up, select **Top up balance**, enter at least the displayed minimum, select **Create payment**, complete the secure payment window, and wait for the balance to update. Open menu → **Payment history** to review operations.

| Status | Meaning |
|---|---|
| **Completed** | Funds were credited successfully |
| **Pending** | The payment is still processing |
| **Failed** | The payment was not completed |

Enter a promo code under **Promo code**. If the interface says it is **Locked**, it cannot be changed for that account.

### 5.10 Deleting a domain

The trash icon beside a domain deletes it after confirmation. First save the information required to return DNS to the origin and confirm that WebSOC should no longer serve the domain.

## 6. Common issues

### 6.1 Unable to sign in

1. Confirm that the correct console is open.
2. Confirm the sign-in method: SSO, Google, Microsoft, or local account.
3. Check keyboard layout and email address.
4. Use password recovery for a local account when available.
5. If permission is missing, contact the organization administrator.

### 6.2 2FA code rejected

1. Enter a new authenticator code; the previous one may have expired.
2. Enable automatic date and time on the phone.
3. Select the correct account in the authenticator app.
4. Do not use an SMS code when an authenticator-app code is requested.
5. After repeated failures, stop retrying and contact support.

### 6.3 Verification or recovery code not received

Check the email address, Spam, and Quarantine. Wait several minutes and resend once. If the organization filters system messages, contact the mail administrator.

### 6.4 CMC domain remains pending

Compare the TXT name and value character by character, check that the DNS panel did not append the domain twice, confirm the correct DNS zone, wait for propagation, and select **Check now**.

### 6.5 SPF, DKIM, DMARC, or MX does not verify

1. Reopen the CMC record and compare type, name, value, priority, and TTL.
2. For SPF, check for conflicting records at one name.
3. For DKIM, check the selector and `_domainkey`.
4. For DMARC, check `_dmarc` and reporting addresses.
5. For MX, check target host and priority.
6. After correction, wait for DNS propagation and select **Verify**.

### 6.6 Messages or metrics did not update

Select **Refresh** when available; check the selected folder, domain, direction, and time range; clear overly narrow filters; confirm the active account; then retry after refreshing the page.

### 6.7 Attachment blocked

Do not disable protection or ask the sender to rename a file to bypass scanning. Give the administrator the sender, subject, receipt time, filename, and displayed scan status/details without disclosing secret content.

### 6.8 Mail migration will not connect

Check the provider; use a valid app password for Gmail or iCloud; repeat **Connect Outlook Account** for Outlook; verify server, port, email, and password for **Custom IMAP**; and select **Resume** if paused.

### 6.9 WebSOC will not verify a domain

Confirm that the meta tag is published on a reachable origin page, compare CNAME Name and Hostname with **Domain setup details**, wait for DNS, and select **Verify ownership and DNS** or the retry icon. If status is already **Delegation verified / DNS pending**, check the A record separately.

### 6.10 No access after a WebSOC change

Check whether your country was added to **Country blacklist**, verify the origin host or IP, and use the preserved administrative channel to undo an incorrect restriction.

### 6.11 Payment remains pending

Do not create another payment immediately. Check **Payment history**, refresh the balance after processing, and if the status remains unchanged, give support the time, amount, and transaction ID. Never send card number, CVC, or confirmation codes.

## 7. Security recommendations

- Use unique passwords stored in a password manager.
- Protect the 2FA secret and authenticator device.
- Never share verification codes, recovery passwords, app passwords, AI keys, or Calendly tokens.
- Remove secrets from screenshots before sending them to support.
- Compare DNS values with the current console immediately before publishing.
- Do not disable phishing or attachment checks for testing.
- Do not trust a sender merely because a message looks familiar.
- Verify unexpected financial requests and changed payment details over an independent channel.
- Grant administrator rights under least privilege.
- Preserve backup administrative access before restricting countries.
- Regularly review domain, threat, attachment, WebSOC, and payment statuses.

## 8. Glossary

| Term | Meaning |
|---|---|
| 2FA | A second sign-in factor: a one-time code from an authenticator app |
| App password | A separate password created by an email provider for application access |
| DKIM | An outgoing-message signature verified with a DNS key |
| DMARC | Policy and reporting for messages that fail SPF or DKIM |
| DNS | Domain records that connect names to services and configuration |
| IMAP | Protocol for accessing email on a server |
| MX | DNS record identifying the server that receives mail |
| Origin | The source web server to which WebSOC forwards allowed requests |
| Quarantine | An isolated area for suspicious messages |
| RPS | Web requests per second |
| SMTP | Protocol for sending email |
| SPF | DNS policy listing sources allowed to send mail for a domain |
| TTL | The caching period of a DNS record |

## 9. Contacting support

Use the support channel provided by your organization. Prepare:

- product name: CMC, Email Protector, or WebSOC;
- account email without the password;
- domain, when relevant;
- date, exact time, and time zone;
- the sequence of actions performed;
- exact visible error text;
- a screenshot without keys, tokens, QR codes, or personal data;
- for payments, amount, status, and transaction ID without card details;
- for email, sender, subject, and time, but not confidential content unless necessary.

Never send support your password, six-digit 2FA code, secret key, recovery password, complete app password, CVC, or private AI key.
