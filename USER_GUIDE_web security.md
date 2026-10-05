# WebSOC User Guide

WebSOC’s Centralized Management Console (CMC) is where you register protected services, select which agents’ traffic to view, and manage protection settings. The Agent provides the active protection; use the CMC to manage it.

## 1. Open the dashboard

Sign in to the CMC with your account. The dashboard opens on a globe view of traffic by country. The display refreshes periodically. The navigation includes **Dashboard**, **Compliance**, and links to the WebSOC and Email Security services and product instructions.

Use the menu button in the upper left for display preferences, language, time zone, payment history, and AI API key settings. Your profile menu contains team access, billing settings, account options, and sign out.

## 2. Register a protected service

1. Open **Data source selection** near the upper left of the dashboard, then choose **Register new agent**.
2. Choose **Website only** for a website protected in reverse proxy mode, or **Other services** for another service such as SMTP, a custom app, or Kubernetes.
3. Enter the domain and the current origin/service host or IP address. For a website, the CMC may suggest an edge node.
4. For a website, submit the form to register it. Follow the displayed DNS setup details: add the requested ACME delegation CNAME at your DNS provider, then point the service’s DNS to the WebSOC edge as instructed. ACME is the automated certificate process; DNS records prove domain control and direct traffic.
5. Select **Verify DNS delegation** when the CNAME is in place. The interface reports whether delegation was verified; it notes that an A record is still required. You can use **Redo verification** if needed.
6. For **Other services**, the form provides **Get agent install command** after you enter the service details. Follow the generated instructions for that service.

The agent list shows each domain, address, and status. **Active** means protection is active, ownership/delegation is verified, and DNS is routed to the WebSOC edge. **DNS pending** means verification passed but traffic is not yet routed. **Delegation not verified** and **Paused** are also shown as statuses.

## 3. Choose agents and view traffic

1. Open **Data source selection**.
2. Check one or more agent rows to choose which services to include in dashboard metrics. The button shows how many agents are selected.
3. Choose **RPS** (requests per second), **Bandwidth**, or **Active Users** in the metric selector on the right. Hover over a country on the globe for the per-domain breakdown.
4. Open the chart from the bottom-center arrow to see the **Server Load Chart** and top-country summaries. Choose a time range; select a section of the chart to focus the summaries on that period.

## 4. Configure, pause, resume, or remove an agent

Open **Data source selection** and use the controls on an agent’s row:

- Select the pencil icon to open **Agent Configuration**. Edit the address, choose allowed ports (22, 80, and/or 443), and switch two-factor authentication on or off, then select **Save**.
- Select the document icon to open **Domain setup details**. Review DNS delegation, routing, service type, and TLS certificate status. TLS is the encrypted connection used by websites.
- Select the refresh icon to verify ownership and DNS delegation.
- Users with the appropriate role can select the pause icon to pause protection, or the play icon to resume it. The dashboard pause action is for 60 minutes.
- Select the trash icon and confirm to delete the agent from your account.

## 5. Review incidents and security alerts

Select **Incidents** on the left side of the dashboard to review event logs. Filter by source, severity, event type, IP address, or date range. The list is paginated; use the available export controls to download matching logs.

When an actionable security alert appears, review its attack summary, IP indicator, and suggested duration. You can block for one of the offered durations or choose a custom end time, allow the source (after confirming), or escalate the alert. These choices apply to the alert shown.

## 6. Manage IP access rules

Open the shield/IP access control on the dashboard’s left side. Use **Add rule** to choose the rule details and save it. Existing rules can be reviewed and removed or revoked through the controls in this panel. A blocklist is a list of sources the system is set to block; add or remove country codes using the panel’s **Add** and **Remove** controls.

## 7. Team and compliance

### Team & Access

1. Open your profile menu and choose **Team & Access**.
2. Use **Invite** to enter a teammate’s email and username, choose a role, and save.
3. Review team members, change a member’s role with the role selector, or remove a member using the row actions. The page also shows the team audit log.

The available roles are **Admin**, **Analyst**, and **Viewer**. Agent pause/resume is available to Admins and Analysts.

### Compliance

Choose **Compliance** in the main navigation to view control summaries and statuses, grouped by framework. Use **Refresh** to reload the information. Each control can show its status, last checked date, next review, and evidence item count.

## 8. Common display and account options

The menu button provides globe style, language, and time-zone preferences. Your profile menu includes payment history and billing settings. Use **Sign out** in the profile menu when you finish.

---

## Information to confirm

The CMC presents a generated agent install command for **Other services**, but the project does not include the full installation procedure for every service type in the user-facing interface. Follow the command and service-specific instructions shown by your CMC deployment; confirm any additional host prerequisites with your WebSOC administrator.
