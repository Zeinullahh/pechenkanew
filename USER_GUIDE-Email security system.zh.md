# 统一电子邮件平台用户指南

本平台包含三个独立产品：**Admin Console / Silence 365 Email Visualizer** 用于邮件域名配置、邮件流向和威胁查看以及组织管理；**Email Protector** 用于安全地阅读、发送、整理和迁移邮件；**WebSOC / AI-SOC Web** 用于将网站域名接入安全网关、监控流量、限制访问国家及管理余额。界面和功能取决于用户角色、套餐及组织设置。请向组织管理员索取三个控制台各自的地址，不要用一个控制台的地址登录另一个。

## 目录

1. [平台概览](#1-platform-overview)
2. [账户访问](#2-account-access)
3. [Admin Console — Silence 365 Email Visualizer](#3-admin-console-silence-365-email-visualizer)
4. [Email Protector](#4-email-protector)
5. [WebSOC / AI-SOC Web](#5-websoc-ai-soc-web)
6. [常见问题](#6-common-issues)
7. [安全建议](#7-security-recommendations)
8. [术语表](#8-glossary)
9. [联系支持](#9-contacting-support)

## 1. 平台概览

### 1.1 按任务选择产品

| 任务 | 产品 |
|---|---|
| 添加邮件域名，设置 MX、SPF、DKIM、DMARC；查看邮件流向和威胁；管理员工、部门及企业邮件服务器 | Admin Console；管理操作需要管理员权限 |
| 阅读、发送、整理邮件；检查邮件分类和附件扫描结果；从其他服务迁移邮件 | Email Protector |
| 将网站域名接入安全网关；查看 RPS、带宽、活跃 IP 和流量地理分布；按国家或允许端口限制流量 | WebSOC |

### 1.2 角色与访问权限

| 角色 | 主要权限 |
|---|---|
| 邮件用户 | 处理自己的邮件、文件夹和个人设置 |
| 组织管理员 | 管理员工、部门、域名、共享签名和防护设置 |
| 域名管理员 | 配置 DNS 和邮件服务器，检查域名状态 |
| WebSOC 管理员 | 接入网站域名，修改源站地址和国家列表 |
| 平台员工 | 管理约定的客户价格；普通客户无法访问此区域 |

如缺少所需功能或访问被拒绝，请联系组织管理员。不要借用他人账户绕过限制。

### 1.3 开始前的准备

视任务准备：目标控制台地址、有效账户、用于双重身份验证（2FA）的验证器应用、域名 DNS 管理权限、接入 WebSOC 所需的网站及 DNS 修改权限、WebSOC 源站的名称或地址、迁移所需的外部邮箱凭据或 Microsoft 授权，以及充值所需的付款权限。

> 重要：DNS 值、IP 地址、验证密钥和金额一律以您自己的控制台为准。不要复制示例或其他客户的值。

## 2. 账户访问

### 2.1 通用登录规则

每个控制台都有独立的登录页面和会话。启用单点登录时，控制台会跳转到 **AI-CSD** 或显示 **Sign in with AI-CSD / Sign in**。打开管理员提供的产品地址，选择可用的登录方式；使用 SSO、Google 或 Microsoft 时，在提供方完成验证；出现 2FA 页面时输入六位验证码。登录后确认个人资料显示预期账户。

### 2.2 访问 Admin Console

可用方式可能包括：使用邮箱和密码的 **Sign in**、**Continue with Google**、**Continue with Outlook**，以及启用 SSO 时的 **Sign in with AI-CSD / Sign in**。

创建客户账户时，选择 **Create account**，再选 **Monthly** 或 **Yearly**，根据当前页面显示的名称、限额和价格选择套餐。填写用户名和邮箱，通过邮箱字段旁的按钮发送验证码，输入收到的验证码和密码；如适用，在完成注册前填写促销码。完成后登录 Admin Console。

本地账户需要设置 2FA：在 **Set Up Two-Factor Authentication** 用验证器扫描二维码；无法扫描时选择 **Can't scan? Enter key manually** 并添加显示的密钥。输入六位验证码，选择 **Activate 2FA**。以后登录时，在 **Two-Factor Authentication** 输入验证码并选择 **Verify**。

### 2.3 访问 Email Protector

可能自动开始 SSO，也可能显示 **Continue with Google**、**Continue with Microsoft**、使用 **Email** 和 **Password** 的 **Sign in**、**Login with QR Code**。本地账户通常由组织管理员创建。首次登录时可能需要修改临时密码、设置 2FA 并输入六位验证码。使用二维码登录时，选择 **Login with QR Code**，在第二台已授权设备上扫描显示的代码，并在确认页面批准登录。

### 2.4 访问 WebSOC

注册：在 **Welcome** 选择 **Register**，填写 **Email**、**Username**、密码及 **Confirm password**。按需填写 **Recovery password**、**Recovery email**、**Promocode**。确认年龄并接受条款，选择 **Continue**。在 **Set up 2FA** 扫描二维码或手动输入密钥，填写 **6-digit code** 并选择 **Verify and finish**。WebSOC 密码和恢复密码均须至少包含一个拉丁大写字母及一个数字，且只能使用拉丁字母和数字。

日常登录：选择 **Log in**，填写 **Email or Username** 和 **Password**，选择 **Continue**；在 **Two-factor authentication** 输入验证码，选择 **Verify and continue**。忘记密码时使用 **Forgot password?** 请求邮件验证码，再输入验证码和新密码；**Resend code** 可重新发送。

## 3. Admin Console — Silence 365 Email Visualizer

### 3.1 初始设置

自助创建的客户账户需选择套餐并完成 **Initial domain mail setup**。向导有 **Domain**、**DNS verification**、**Security**、**Ready** 四阶段，进度按域名保存。如果组织只使用 Google 或 Outlook，且有 **Use AI-SOC as security layer (Gmail/Outlook only)** 选项，可不配置托管域名邮件而继续；选择前须与域名管理员商定。

### 3.2 添加并验证域名

在 **Step 1. Add domain** 输入不含 `https://` 或路径的域名，选择 **Continue**。在 **Step 2. Verify domain via DNS** 复制 **TXT name** 和 **TXT value**，到域名 DNS 面板创建 TXT 记录，等待解析传播，然后选择 **Check now**；向导也会定期检查。出现 **Verified** 后方可继续。有些 DNS 面板会自动给 Name 附加域名，请按 Admin Console 提示操作，避免重复后缀。

### 3.3 配置 MX、SPF、DKIM 和 DMARC

**Step 3. Security setup** 显示需要添加的准确记录。MX 指定收件服务器；SPF 列出允许代表域名发送邮件的来源；DKIM 发布验证外发邮件签名的密钥；DMARC 定义 SPF 或 DKIM 验证失败邮件的策略和报告。按需生成每条记录，准确复制 **Type**、**Name/Host**、**Value**、**Priority**、**TTL**，在 DNS 中创建或更新，等待传播，选择 **Verify** 并确认 **Configured**。要求填写的 DMARC RUA 和 RUF 别名分别接收汇总报告和失败报告。

> 重要：修改现有 SPF 前先与邮件管理员协调。同一名称下的多条 SPF 记录可能使发件人验证失败。

**Not configured** 表示未找到记录，**Update required** 表示与建议值不同，**Configured** 表示符合预期，**Pending verification** 表示尚未检测到更改，**Error** 表示无法完成验证。全部配置完后进入 **Step 4. Ready**，选择 **Go to dashboard**。

### 3.4 管理域名

管理员可在 **Domains** 和 **Domain management** 添加域名、复制验证令牌、重试 **Verify**、分别查看 MX/SPF/DKIM/DMARC 状态、使用 **Set default**、填写允许的 SMTP 服务器 IP、打开 **DNS setup**、重命名或删除域名。删除前确认员工和邮件客户端均不再使用该域名；删除需要单独确认。

### 3.5 仪表板与邮件流向

图表以节点表示员工、部门或域名，以连线表示邮件交换。选择 **Incoming** 或 **Outgoing**；在 **Time range** 选择最近一小时、3/6/12/24 小时、全部时间或自定义范围。需要时打开 **Filter**，填写发件人、收件人、主题、正文或附件条件，选择 **Apply filters**。点击节点查看相关邮件；可搜索并使用 **Newest first** / **Oldest first** 排序，打开邮件检查内容、邮件头和附件。部门及域名还有分析卡片。自定义范围的结束时间不能在未来，开始时间须早于结束时间。

### 3.6 威胁类别

仪表板底部箭头打开 **Threat categories**。**Possibly spoofed** 表示发件人或域名可能被冒用；**Spam** 表示疑似垃圾邮件；**Dangerous link** 表示发现潜在危险链接；**Possibly phishing** 表示邮件可能试图获取凭据或支付数据；**Malware in the attachment** 表示附件有危险内容；**Secure emails** 表示未发现已知威胁指标。选择类别卡片和 **Click to view**，可查看发件人、收件人、日期、内容、源文本和附件。附件状态包括 **Safe**、**Suspicious**、**Malware detected**、**Pending scan**。移至 Trash 与 **Delete permanently** 不同；永久删除前确认所选邮件。

### 3.7 员工和管理员

管理员进入 **Settings** → **Employees** → **+ Add** → **Create manually**，填写必需的邮箱、名、姓等资料；确认登录使用 Google、Microsoft 还是内部账户，按需添加地址、电话或别名，再选择 **Create**。批量创建时使用 **Upload employee list**，下载 **Download CSV template**，保持结构不变，执行 **Import** 并查看 **Created** 和 **Skipped**。员工菜单可能包含 **Edit**、内部账户的 **Change password**、**Edit aliases**、**Make administrator** / **Revoke administrator rights** 和 **Delete**。仅在确实需要管理组织时授予管理员权限。

### 3.8 部门

进入 **Settings** → **Departments**，用唯一名称创建部门，打开成员列表添加员工；使用移除操作将员工从部门移出。删除部门前检查成员关系及其对可视化的影响。

### 3.9 通用防护设置

仅管理员可见的 **Security** 标签可能提供 **Enable phishing detector**、**Enable attachment virus scanning**、针对域名和地址的 **Block management** 以及企业邮件服务器设置链接。调整开关后等待保存完成，再确认新状态仍被选中。

### 3.10 企业邮件服务器

在 **Company Email Servers** 填写 **IMAP server**、**IMAP port**、**IMAP security**；按需填写 **SMTP server**、**SMTP port**、**SMTP security**。依据服务器配置选择 **SSL/TLS** 或 **STARTTLS**，保存并检查邮件客户端参数。如果省略 SMTP，外部客户端可通过 IMAP 收信，但只能在 Web 应用中发信。**None / plain text** 不加密传输通道；仅在隔离的可信网络中且经安全管理员决定后使用。

### 3.11 组织与 AI 设置

**General** 标签可设置语言和时区；有足够权限时还能修改组织名称及徽标。若 **AI Agent** 可用，管理员可选择提供方和模型，仅在支持的配置中填写端点，安全保存访问密钥，保存后运行内置连接测试。不要向员工共享密钥或让其出现在截图中。

### 3.12 套餐、钱包和付款

个人资料菜单有 **Balance**、**Top Up Balance**、**Manage Plan**。充值时检查显示的币种和金额上下限，输入金额，选择 **Pay**，在安全付款页面完成后确认余额更新。更换套餐时比较用户、管理员、存储及 AI 操作限额，选择月付或年付与套餐，核对启用或转换费用并确认。价格和币种取决于部署及客户协议；仅以您自己控制台的值为准。

## 4. Email Protector

### 4.1 主界面区域

登录后可见文件夹侧栏、邮件列表、阅读及安全详情区域、**Compose**、搜索、账户切换器、**Settings**、语言和退出菜单。系统文件夹可能有 **All mail**、**Important**、**Inbox**、**Sent**、**Drafts**、**Scheduled**、**Trash**。Security 区域包含组织可用的隔离和错误文件夹；用户文件夹在 **My folders** 下。

### 4.2 阅读并检查邮件

选择文件夹和邮件，核对发件人、收件人、主题、日期、颜色标记和安全分类。展开 **Attachments** 查看每个文件的状态，必要时选择 **Show details** 或 **Show source text**。**Secure** 仍需正常谨慎；**Spam** 应核实发件人，不回复不请自来的邮件；**Possibly Spoofed** 应通过独立渠道确认身份；**Possibly Phishing** 不得打开链接或输入凭据。危险链接在专家审查前不要打开，危险附件不要下载或运行。

附件状态：**Clean** 可下载；**Suspicious** 需查看详情，拿不准时咨询管理员；**Download blocked** 不得绕过；**Scanning…** 等待完成；**Not scanned** 未追加检查前不要打开。即使显示 **Clean**，也要核查邮件上下文、发件地址以及是否预期收到该附件。

### 4.3 搜索与列表操作

在 **Search emails...** 输入文字，使用 **All**、**Secure**、**Spam**、**Spoofing**、**Threats found** 筛选。星标可加入 **Important**；文件夹菜单可移至自定义文件夹或返回 **Inbox**。可多选邮件批量移至 Trash。在 **Trash** 中可用 **Restore** 或永久删除；列表仅显示一部分时选择 **Load more**。永久删除不可撤销，先确认 Trash 及目标邮件。

### 4.4 编写并发送

选择 **Compose**，填写 **To**，按需展开 **Cc** 和 **Bcc**，输入主题及正文，通过附件按钮添加文件。稍后发送时选择 **Schedule send** 并输入未来日期和时间，然后选择 **Send email**。可从 **Drafts** 打开草稿编辑并发送；**Scheduled** 中的定时邮件可在投递前查看并通过相应操作取消。

### 4.5 已打开邮件的操作

按邮件和权限，可以设置或取消 **Important**、打开完整视图、移至文件夹、显示源文本、翻译或返回原文、生成 AI 回复草稿、有支持的链接时退订，或移至 Trash。退订前核实发件人；明显钓鱼邮件中的退订链接不要使用。

### 4.6 自定义文件夹和规则

选择 **New folder** 或 **Create folder**，填写 **Folder name**。在 **Inclusion rules** 添加要归入的地址或域名，在 **Exclusion rules** 添加例外，选择 **Save**。排除规则优先。文件夹菜单可重命名、修改规则或删除；删除前阅读屏幕警告。

### 4.7 切换账户

账户菜单可添加另一已授权账户并在账户间切换。打开切换器选 **Add account**；Google 或 Microsoft 账户在提供方完成登录；本地账户输入邮箱、密码及要求的 2FA 代码。再从列表选择所需账户。当前活跃账户不能从列表移除；切换到本地账户时可能再次要求密码。

### 4.8 邮箱设置

打开 **Settings** 并选择相应区域。

#### 常规

设置 **Sender name**、已发送文件夹、时区和日期格式，选择 **Save**。

#### 签名

启用 **Add to outgoing emails**，在编辑器中制作签名，查看 **Signature preview** 并保存。

#### 自动回复

启用 **Autoresponder**，填写起止日期和回复文字，按需启用 **Reply once per sender**，查看预览后保存。

#### 转发

填写转发地址并选择 **Add**，决定是否 **Keep a copy in Inbox**，再保存。

#### 已屏蔽发件人

输入地址并选择 **Block sender**，该发件人的邮件将自动进入 Spam；使用 **Unblock** 解除。

#### 账户管理

修改已保存账户的显示名称和邮箱，或从列表删除不活跃账户。

#### 存储

查看已用空间和配额百分比。超过 90% 时，删除不必要的邮件及附件，或向管理员咨询套餐。

#### 显示与行为

可用选项可能包括 Trash 自动删除期限、自定义背景与模糊、玻璃效果、标记已读方式、预览面板、会话模式以及撰写字体和字号。

### 4.9 邮件迁移

打开 **Account settings** → **Email migration** → **Start migration**。支持 **Gmail**、**Outlook**、**iCloud**、**Custom IMAP**。Gmail 或 iCloud 需选择提供方、填写外部邮箱，并在要求时使用提供方创建的应用密码而非主密码，然后选择 **Start Migration**。Outlook 需选择 **Connect Outlook Account** 并在 Microsoft 授权。**Custom IMAP** 还需填写 **IMAP Server** 和 **Port**。界面显示完成百分比、已处理邮件数和当前文件夹；**Pause** 与 **Resume** 可控制任务；结束时出现 **Migration Complete!**。完成前不要撤销邮箱访问权或应用密码。

### 4.10 AI 功能

管理员启用后，邮件上的 AI 图标可创建回复草稿；**AI auto reply** 可把生成的回复保存为待检查草稿；AI Assistant 可概括、解释邮件并拟写回复。仅按组织政策启用自动发送。发送前核查收件人、事实、附件和语气。不要向助手提供秘密、密码或无关的个人数据。

### 4.11 Calendly

**Calendly** 显示 **Connected** 或 **Not connected**。在 Calendly 集成设置创建个人令牌，填入 **Calendly API token**，选择 **Connect Calendly** 并确认 **Connected**。使用 **Disconnect Calendly** 结束集成。令牌应保密。

### 4.12 用户管理和共享签名

管理员可管理获准用户及企业签名。创建共享签名时，在 **Company Signatures** 选择 **New**，填写 **Signature Name**，在 **Company**、**Domain**、**Department**、**User** 中选范围，输入内容并检查 **Preview**，启用 **Active**，再选 **Create** 或 **Save**。编辑时核对所选域名、部门或用户。删除共享签名需要单独确认。

## 5. WebSOC / AI-SOC Web

### 5.1 连接域名

WebSOC 把连接对象称为“agent”，但用户向导配置的是域名和源站 Web 服务器。无需通过未经验证的命令安装软件。打开 **Data source selection**，选择 **Add new agent** 或 **Register new agent**，在 **Domain** 输入待保护域名，在 **IP address** 输入当前源站主机或服务器 IP，然后选择 **Register**。

#### 第一步：验证网站所有权

在 **Step 1. Add ownership meta tag on your origin website** 选择 **Copy tag**，把显示的 meta 标签加入首页 `<head>`，发布并确认可以通过域名公开访问。**Copy key** 仅复制密钥值，**Copy tag** 复制整个标签。

#### 第二步：委派 ACME

在 **Step 2. Add ACME delegation CNAME** 复制 **Name** 和 **Hostname (target)**，创建 CNAME 记录，等待 DNS 传播并选择 **Verify ownership and DNS**。出现 **Ownership and DNS verified** 即验证成功，但流量路由可能尚未启用。

#### 第三步：切换流量

验证后出现 **Step 3. DNS A record to add (switch traffic through WebSOC)**。复制 **Name** 和 **IP address**，确认 WebSOC 源站正确且在允许端口响应；以显示的值创建或更新域名 A 记录，等待 DNS 传播，并在 **Domain setup details** 检查 **DNS routing**。更改 A 记录会切换用户流量；应在批准的变更窗口实施，并保留 DNS 和源站服务器访问权以便恢复。

### 5.2 域名状态

**Delegation not verified**：meta 标签或 CNAME 未验证；**Delegation verified / DNS pending**：所有权与委派已验证，但 A 记录还未通过 WebSOC 路由；**Active**：委派与 DNS 路由均已启用。圆形箭头重新验证；文档按钮打开包含所有必要值的 **Domain setup details**。

### 5.3 配置源站服务器

在 **Data source selection** 找到域名，点击铅笔，在 **Agent configuration** 检查 **IP address**，输入新的源站主机或 IP，选择 **Save** 并等待 **Configuration updated successfully!**。更改前确认新源站可访问且提供正确域名。

### 5.4 选择域名并使用流量地图

在 **Data source selection** 选择待分析域名。右侧可选 **RPS**（每秒请求数）、**Bandwidth**（传输数据量）、**Active Users**（活跃 IP 数）。将指针移到地球仪上的国家即可查看所选域名数据。地图颜色深浅按所选指标比较国家；评估趋势还应查看图表，而非只看当前颜色。

### 5.5 图表和主要国家

用底部箭头打开 **Server load chart**，可选 **1 day**、**2 days**、**7 days**、**14 days**、**1 month**、**3 months**。窗口还列出活跃 IP、带宽和 RPS 排名前列的国家。选择图表区域会缩小相关指标的时间范围。比较时使用相同的域名和时段，避免误判。

### 5.6 异常通知

检测到异常时，顶部显示红色消息面板。阅读并记录域名和时间，然后选择 **OK**。关闭面板仅表示已经看过，并不会解决原因。检查图表和源站服务，必要时上报安全管理员。

### 5.7 国家黑名单

选择 **Country blacklist**，打开 **Not blacklisted** 或搜索国家，选中后选择 **Add**，确认其出现在 **Blacklisted** 下。要撤销，在 **Blacklisted** 选中该国并选择 **delete**。添加前检查该国是否有员工、客户、外部监控或支付系统，并保留从允许国家进行管理的途径。

### 5.8 语言和主题

左上角菜单提供 **Globe style**、**Select language**、**Payment history**、**Promo code**。

### 5.9 余额与付款

个人资料菜单显示余额。选择 **Top up balance**，输入不低于显示下限的金额，选择 **Create payment**，在安全付款窗口完成并等待余额更新。菜单中的 **Payment history** 可查看交易。**Completed** 表示成功入账；**Pending** 表示处理中；**Failed** 表示未完成。在 **Promo code** 输入促销码；若显示 **Locked**，该账户不能更改。

### 5.10 删除域名

域名旁的垃圾桶图标经确认后删除域名。先保存将 DNS 指回源站所需的信息，并确认 WebSOC 不应再为该域名提供服务。

## 6. 常见问题

### 6.1 无法登录

确认打开了正确控制台，使用正确的 SSO、Google、Microsoft 或本地账户方式；检查键盘布局及邮箱。可用时使用本地账户密码恢复。权限不足时联系组织管理员。

### 6.2 2FA 代码被拒绝

输入新的验证器代码；旧码可能已过期。开启手机自动日期和时间，在验证器中选正确账户。要求应用代码时不要使用短信码。反复失败后停止重试并联系支持。

### 6.3 未收到验证或恢复代码

检查邮箱地址、Spam 和 Quarantine，等待几分钟后只重新发送一次。组织过滤系统邮件时请联系邮件管理员。

### 6.4 Admin Console 域名始终待验证

逐字比较 TXT 名称和值，检查 DNS 面板有无重复附加域名、是否使用正确 DNS 区域，等待传播后选择 **Check now**。

### 6.5 SPF、DKIM、DMARC 或 MX 验证失败

重新打开 Admin Console 记录，比较类型、名称、值、优先级和 TTL。SPF 检查同名冲突记录；DKIM 检查选择器及 `_domainkey`；DMARC 检查 `_dmarc` 和报告地址；MX 检查目标主机及优先级。更正并等待 DNS 传播后选择 **Verify**。

### 6.6 邮件或指标未更新

可用时选择 **Refresh**；检查所选文件夹、域名、方向、时间范围、过窄的筛选条件及活跃账户；刷新页面后重试。

### 6.7 附件被阻止

不要关闭防护，也不要要求发件人改名以绕过扫描。向管理员提供发件人、主题、接收时间、文件名及显示的扫描状态和详情，不泄露秘密内容。

### 6.8 邮件迁移无法连接

检查提供方；Gmail 或 iCloud 使用有效应用密码；Outlook 重试 **Connect Outlook Account**；**Custom IMAP** 核对服务器、端口、邮箱和密码；暂停时选择 **Resume**。

### 6.9 WebSOC 无法验证域名

确认 meta 标签已发布在可访问的源站页面，核对 CNAME 的 Name、Hostname 与 **Domain setup details**，等待 DNS 后选择 **Verify ownership and DNS** 或重试图标。若已显示 **Delegation verified / DNS pending**，另行检查 A 记录。

### 6.10 WebSOC 更改后无法访问

检查您的国家是否被加入 **Country blacklist**，核对源站主机或 IP，并通过预留的管理通道撤销错误限制。

### 6.11 付款一直待处理

不要立即发起第二笔付款。查看 **Payment history**，处理完成后刷新余额。如状态不变，向支持提供时间、金额和交易 ID。绝不发送卡号、CVC 或确认码。

## 7. 安全建议

- 使用密码管理器保存独有密码，保护 2FA 密钥和验证器设备。
- 不分享验证码、恢复密码、应用密码、AI 密钥或 Calendly 令牌；向支持发送截图前遮蔽秘密。
- 发布 DNS 记录前立即与当前控制台核对；不要为了测试关闭钓鱼或附件检查。
- 不要只因邮件看似熟悉就信任发件人；对意外的付款要求和变更的收款信息通过独立渠道核实。
- 按最小权限授予管理员角色；限制国家前保留备用管理通道。
- 定期检查域名、威胁、附件、WebSOC 和付款状态。

## 8. 术语表

| 术语 | 含义 |
|---|---|
| 2FA | 登录的第二重因素，即验证器应用的一次性代码 |
| 应用密码 | 邮件提供方为应用访问单独创建的密码 |
| DKIM | 由 DNS 密钥验证的外发邮件签名 |
| DMARC | SPF 或 DKIM 失败邮件的策略及报告 |
| DNS | 将域名与服务及配置相连的记录 |
| IMAP | 访问服务器上邮件的协议 |
| MX | 指定收信服务器的 DNS 记录 |
| 源站 | WebSOC 将允许的请求转发到的原始 Web 服务器 |
| Quarantine | 隔离可疑邮件的区域 |
| RPS | 每秒 Web 请求数 |
| SMTP | 发送电子邮件的协议 |
| SPF | 列出获准代表域名发信来源的 DNS 策略 |
| TTL | DNS 记录的缓存时长 |

## 9. 联系支持

使用组织提供的支持渠道。准备产品名称（Admin Console、Email Protector 或 WebSOC）、不含密码的账户邮箱、相关域名、日期及准确时间和时区、操作顺序、屏幕上的完整错误文本，以及不含密钥、令牌、二维码和个人数据的截图。付款问题提供金额、状态、交易 ID，但不提供银行卡信息；邮件问题提供发件人、主题和时间，除非必要不要提供机密内容。绝不向支持发送密码、六位 2FA 代码、密钥、恢复密码、完整应用密码、CVC 或私有 AI 密钥。
