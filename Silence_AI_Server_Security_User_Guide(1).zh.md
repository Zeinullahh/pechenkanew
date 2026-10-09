# Silence AI Server Security 用户指南

本指南说明如何在 Silence AI 管理面板中注册服务、安装和注册原生 Server Security、设置受保护访问以及查看安全活动。

????????????????????????????????????????????????

## 目录

1. 开始之前
2. 登录并打开 Server Security
3. 注册服务
4. 安装、注册并启用防护
5. 理解防护状态
6. 设置 MFA 和受保护访问
7. 使用 Server Security 控制台
8. 查看事件和响应
9. 配置安全策略
10. 网络访问、地球仪与实时连接
11. 传感器、清单、态势和发现
12. 事件和遥测
13. 故障排除

## 1. 开始之前

开始前请准备以下信息和访问权限：

- 可访问 Server Security 的 Silence AI 账户。
- 要注册的服务域名或服务器名称。

- 目标服务器到 Silence AI 的网络连接。
- 在目标 Linux 服务器上进行原生安装的管理员权限。

- Hosted 注册：目标 IP 地址以及更新网站和 DNS 的权限。
- Self-Hosted 注册：上游 URL 和组织批准的部署流程。

| **支持的原生目标** | **软件包** |
|---|---|
| Ubuntu Server 22.04 或 24.04 LTS，amd64 | DEB |
| Fedora Server 44，x86_64 | RPM |

> **Hosted 计费**
> Hosted 流量保护按使用量计费。依赖该保护前，请确认账户余额充足。

## 2. 登录并打开 Server Security

1. 打开 Silence AI 管理面板并选择 Log in。

2. 使用当前六位身份验证器代码完成账户 MFA。

3. 打开 Server Security，然后选择 Servers。

每个服务器行可能显示 Install、Setup / recovery 和 Open Security。可用操作取决于服务器当前登记状态。

## 3. 注册服务

### 3.1 选择 Hosted 或 Self-Hosted

| **部署类型** | **适用情况** | **必填字段** |
|---|---|---|
| Hosted | 流量将通过 Hosted 服务获得保护。 | Domain + IP Address |
| Self-Hosted | 服务在您的环境中运行。 | Domain + Upstream URL |

> **注册不等于安装**
> 创建 Hosted 或 Self-Hosted 服务记录不会安装原生 Server Security 软件包，也不会登记 Linux 服务器。

??? **Register new agent**???? **Hosted** ? **Self-Hosted**?

### 3.2 创建服务记录

4. 选择 Register new agent。

5. 选择 Hosted 或 Self-Hosted，然后继续执行代理数据步骤。

6. 在 Domain 中仅输入主机名，不要包含 URL 路径。

7. 对于 Hosted，输入 IP Address；对于 Self-Hosted，输入 Upstream URL。

8. 选择 Register。

### 3.3 Hosted：验证所有权并路由流量

注册流程显示两个独立项目：用于所有权验证的网站元标记，以及用于 Hosted 流量路由的 A 记录。

9. 将提供的元标记添加到网站 HTML \<head\> 内。

10. 发布变更，并确认可通过已注册域名公开访问网站。

11. 在注册对话框中选择 Verify Domain Ownership，并确认 Verification successful!。

12. 将显示的 A 记录添加到 DNS，用于 Hosted 流量路由。

13. DNS 传播后，确认仍可通过预期域名访问网站。

> **如果验证失败**
> 检查域名拼写、公开可访问性、元标记位置以及代理/CDN 主机处理，然后使用 Redo verification。

显示的 **A record** 用于 Hosted 流量路由，并非所有权验证方式。网站 meta 标签用于证明控制权；如现有网站必须保持可访问以供验证，应先验证标签再切换 DNS。

### 3.4 Self-Hosted 部署

创建 Self-Hosted 服务记录，然后按照适用于您环境的批准部署流程操作。原生 Server Security 安装是服务器列表中的独立操作。

## 4. 安装并登记原生 Server Security

**Registered** 表示服务记录存在，**Installed** 表示原生软件包已安装，**Enrolled** 表示一次性代码已被接受。任何单一状态都不证明防护健康且实际生效。

### 4.1 安装原生软件包

14. 为目标服务器选择 Install。

15. 在 1. Choose a native package 下，选择与服务器匹配的操作系统和体系结构。

16. 在 2. Download and install 下，选择 Download .deb 或 Download .rpm。

17. 使用 Install command 旁的 Copy，并以管理员权限在目标服务器上运行显示的命令。

使用面板中显示的文件名、安装命令和 SHA-256 值。典型命令类似于：



> **软件包完整性**
> 对于 RPM 软件包，请保持签名检查启用，并遵循已批准的签名密钥流程。不要从未经批准的来源获取签名密钥，也不要绕过软件包验证。

在 **Install Server Security** 选择匹配的原生软件包。常见命令形式为 Ubuntu 的 `sudo apt install ./<displayed-filename>.deb` 和 Fedora 的 `sudo dnf --setopt=localpkg_gpgcheck=1 install ./<displayed-filename>.rpm`；须以您控制台显示的文件名、命令和 SHA-256 为准。浏览器下载只把文件保存到当前电脑，不会远程安装；需要时按批准的安全方式传送。对于已注册服务器，仅在面板指示时使用 **Setup / recovery**。

### 4.2 登记服务器

18. 在安装对话框中打开 3. Enroll interactively。

19. 在目标服务器上运行 sudo silence-server enroll。

20. 选择 Generate enrollment code。

21. 仅在目标服务器的登记提示符中输入显示的代码。

22. 在预配阶段运行期间保持安装对话框打开。

> **登记代码安全**
> 登记代码仅可使用一次，最长 15 分钟后过期，绝不能复制到工单、文档、聊天或 shell 历史记录中。

预配期间，对话框可能显示 Enrollment in progress、Verified release ready、Installing security stack、Installing core protection、Core check completed、Installing sensors 和 Installation complete 等阶段。

替换未使用的代码时选择 **Replace enrollment code**，确认 **Replace code** 并使用新码。**This server is enrolled** 只确认注册，不证明安装完毕或防护生效。如果后续阶段失败，原代码可能已经消耗。

### 4.3 恢复和重新登记

对于已注册的服务器，打开 **Setup / recovery**，对目标服务器使用 **Re-enroll server** 或 **Generate recovery code**。恢复期间保留独立的管理员访问方式。

### 4.4 确认保护

23. 为服务器选择 Open Security。

24. 打开 Overview 并选择 Refresh。

25. 查看 Server protection、Provisioning、Sensor health 和 Guard access security。

26. 确认当前状态和近期遥测与预期保护相符。

> **等待激活**
> 如果 Policy 显示 Saved · pending activation，则配置已保存，但尚不应视为活动状态。

**Installation complete**?**SSH 2FA: Active**??????????????????????????????????????????????????????

## 5. 了解保护状态

| **状态** | **含义** | **处理方式** |
|---|---|---|
| ACTIVE | 报告核心保护可用。 | 单独审查可选传感器和策略状态。 |
| DEGRADED | 核心保护可能仍可用，但一个或多个运行状况或覆盖信号需要处理。 | 阅读原因并查看 Sensors。 |
| FAILED | 预配或核心保护报告失败。 | 阅读错误并执行故障排除。 |
| PENDING | 安装、预配或策略激活尚未完成。 | 等待完成；不要将变更视为活动状态。 |
| CONFIGURATION REQUIRED | 面板需要更多信息才能确认核心运行状况。 | 确认登记并遵循显示的要求。 |
| REMOVED | 原生保护已移除或不再报告。 | 可用时使用受支持的 Setup / recovery 工作流。 |

传感器卡片还可分别报告 Healthy、Degraded、Failed、Disabled、Unsupported、Needs configuration、Telemetry stale 或 No telemetry。

## 6. 配置 MFA 和受保护访问

### 6.1 账户 MFA

注册时打开 **Set up 2FA**，扫描二维码或在身份验证应用中输入密钥，输入当前六位验证码并选择 **Verify and finish**。后续登录使用当前验证码。如果无法使用身份验证应用，请使用已保存的恢复码或组织批准的账户恢复流程。不要向他人提供二维码、密钥或恢复码。

### 6.2 服务器访问 MFA（SSH 2FA / Port Guard）

**SSH 2FA** 适用于已配置的受保护 TCP 端口，不限于 SSH 端口 22。更改访问设置时保留独立的管理员会话。

1. 在服务器列表中打开编辑，在 **Agent configuration** 中设置受保护的 **TCP ports**。
2. 在服务器行选择 **SSH 2FA**，扫描二维码或在身份验证应用中输入 **Manual entry key**。
3. 安全保存八个 **Backup / Recovery Codes**；每个代码只能使用一次。
4. 选择 **Next — Verify Code**，输入当前六位验证码，选择 **Verify** 并完成设置。
5. 重新打开 **Agent configuration**，检查端口和访问设置。

### 6.3 使用 Port Guard 进行身份验证

从与受保护服务客户端相同的网络打开部署环境批准的 **Port Guard** 地址。输入当前身份验证代码或一个未使用的备用代码，选择 **Unlock Ports**，然后重新连接服务。以页面显示的访问时长为准。受保护服务仍需其自身凭据。

### 6.4 禁用或重置服务器访问 MFA

要禁用服务器访问 MFA，请关闭 **Enable 2FA for access** 并保存。要调整 MFA 的适用范围，请更改或移除已配置的受保护端口并保存。保持一个可用的管理员会话及独立的访问恢复方式。代理应用更改后，检查面板报告的状态以及目标服务器的访问情况。如果运行中的服务器未采用已保存的设置，请联系负责的管理员。不要手动删除文件或服务。

## 7. 使用 Server Security 控制台

第 10 节介绍 Network access 页面中的服务器与端口选择、地球视图、连接列表和策略操作。


| **选项卡** | **用途** |
|---|---|
| Overview | 保护状态、预配、传感器运行状况、事件、响应和近期活动。 |
| Incidents | 供审查的关联安全活动。 |
| Responses | 自动响应记录和结果。 |
| Sensors | 传感器运行状况和检测视图。 |
| Posture | Security Configuration Assessment 发现结果和漏洞情报状态。 |
| Inventory | 报告的软件包和服务器清单。 |
| Events | 可筛选、分页的服务器遥测。 |
| Policy | 自动响应模式、IP 策略、传感器开关和 Suricata 接口。 |

主控制台使用 Refresh。在 Events 中，如需刷新事件浏览器本身，请切换页面或筛选器。

## 8. 审查事件和响应

**不同操作：****Shut down session** 面向已有连接；**Blacklist IP address** 保存其范围内新连接的持久封禁。自动响应可能临时生效并遵循不同规则。提出请求或保存不等于确认断开或应用。

### 8.1 事件

选择事件以打开 Incident details。查看严重性、摘要、可用时的来源信息、Timeline、Evidence 和 Technical details。

| **操作** | **效果** |
|---|---|
| Mark investigating | 更改事件审查状态，表示正在调查。 |
| Resolve | 记录事件审查已完成。 |
| Dismiss | 记录该事件将不再跟进。 |

> **事件状态不等于修复**
> 更改事件审查状态本身不会移除恶意软件、终止攻击者或修复被入侵服务器。

### 8.2 响应

| **状态** | **含义** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | 已记录或获准评估；尚未确认应用。 |
| APPLIED | 响应已记录为在显示范围内应用。 |
| EXPIRED | 临时响应不再有效。 |
| REVOKED | 响应已撤销。 |
| FAILED | 请求的操作未成功完成。 |
| SUPPRESSED | 在适用策略下未强制执行响应。 |

应综合查看来源、操作和范围、原因、状态、开始时间和到期时间。阻止新连接不一定会终止已建立的连接。

## 9. 配置安全策略

### 9.1 自动响应模式

| **模式** | **行为** |
|---|---|
| Observe | 记录符合条件的决策，但不自动强制执行。 |
| Shadow | 评估符合条件的检测，但不强制执行临时阻止。 |
| Enforce | 当策略和检测条件处于活动状态时，可应用已批准的临时 IP 阻止。 |

正常初始安装模式为 Shadow。要使用 Enforce，请选择 Enforce，查看 Enable automatic enforcement?，然后确认 Enable Enforce。Enforce 仅适用于符合条件的检测。

在 **Policy → Automatic response mode** 选择模式。切换到 **Enforce** 时查看 **Enable automatic enforcement?**，然后选择 **Enable Enforce** 或 **Cancel**。依赖自动临时封锁前先确认激活；并非每项检测都会触发响应。

### 9.2 受信任 IP

42. 打开 Policy → Trusted IPs。

43. 输入 Trusted IP or CIDR，并可选择输入 Description。

44. 选择 Add trusted source。

45. 使用 Remove 删除条目，或使用 Move to block 将其转换为显式阻止。

Trusted IPs 可使来源免受符合条件的自动响应阻止，但不会绕过 MFA、国家/地区限制、Allowed IPs / CIDRs、服务凭据或其他访问控制。

### 9.3 允许的 IP / CIDR

46. 打开服务器行的铅笔/编辑控件。

47. 在 Agent configuration 的 Allowed IPs / CIDRs 中输入单个 IPv4/IPv6 地址或 CIDR 范围（以逗号分隔）。

48. 选择 Save 并重新打开对话框，验证面板保留了该值。

保存的列表为空时，Port Guard 地址检查允许所有来源继续进行身份验证。列表非空时，只有匹配的地址或范围可以继续。

???????? **Allowed IPs / CIDRs (comma-separated)**?????????????? Port Guard??????????????????? MFA?????????????????? **Trusted IPs** ???????????????????????????????????

### 9.4 显式阻止

49. 打开 Policy → Explicit blocks。

50. 输入 Blocked IP or CIDR、必填 Reason 和可选的 Explicit block expiry。

51. 选择 Add explicit block。

52. 使用 Remove 删除条目。要更正条目，请将其删除后重新创建。

> **避免锁定管理员**
> 添加阻止前，请检查可能使用相同来源 IP 或 CIDR 的管理员、监控、NAT 和共享地址。

### 9.5 传感器和 Suricata

Policy → Sensor state 可能提供 Inventory、File Integrity、Security Configuration、YARA-X、CrowdSec、Falco 和 Suricata 开关。

对于 Suricata，请打开 Policy → Suricata monitored interface，选择显示的候选项或输入经过验证的接口（如 ens3），然后选择 Save interface。变更后确认有新的 Suricata 遥测。

## 10. 网络访问控制、地球视图和实时连接

打开 **Network access**，选择托管服务器和受保护的 TCP 端口。使用地球视图和连接列表查看所选范围内的来源 IP、国家、端口和会话详情。

在 **Countries** 中选择黑名单或白名单模式，并编辑所选端口的国家列表。在 **IP addresses** 中管理服务器的 **Always Block** 和 **Always Allow** 列表。Always Allow 不能替代 MFA 或受保护服务的身份验证。

打开连接菜单，选择 **Shut down session** 或 **Blacklist IP address**。操作后检查显示的结果和策略状态。只有界面报告应用结果后，已保存的更改或排队的请求才算完成。

## 11. 审查传感器、清单、态势和发现结果

打开 **Sensors** 查看各传感器的状态和最近信号。使用 **Inventory** 和 **Search packages** 查看报告的软件包详情。在 **Posture** 中查看配置检查结果和显示的建议。解读结果时请核对观测时间。

## 12. 监控事件和遥测

打开 **Events** 查看服务器遥测数据。按传感器、准确的事件类型或严重程度筛选，并使用 **Previous** 和 **Next** 翻页。检查来源、证据、严重程度、时间以及显示的关联事件。依据较旧结果作出判断前先刷新视图。

## 13. 故障排除

如果操作未完成，请检查所选服务器和端口、界面显示的状态与时间以及错误详情。修正输入或连接问题后重试。更改访问规则时保留独立的管理员会话。恢复账户或服务器访问时，请使用组织批准的流程。
