# Silence AI

## Server Security 用户指南

面向最终用户的注册、安装、受保护访问、安全监控和策略管理说明。

> **客户文档**
> 使用本指南注册服务、安装原生 Server Security、配置访问控制、审查事件并监控服务器保护。

版本 1.0 • 2026 年 10 月

# 如何使用本指南

本指南适用于使用 Silence AI Server Security 的管理员和获授权操作员，重点介绍可从客户界面执行的操作，以及依赖保护或访问控制变更前应完成的检查。

> **重要操作原则**
> 注册、软件包安装、登记、策略配置和实时保护是不同阶段。当设置标记为 pending 时，请等待面板报告激活后再依赖该设置。

# 1. 开始之前

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

# 2. 登录并打开 Server Security

1. 打开 Silence AI 管理面板并选择 Log in。

2. 使用当前六位身份验证器代码完成账户 MFA。

3. 打开 Server Security，然后选择 Servers。

每个服务器行可能显示 Install、Setup / recovery 和 Open Security。可用操作取决于服务器当前登记状态。

# 3. 注册服务

## 3.1 选择 Hosted 或 Self-Hosted

| **部署类型** | **适用情况** | **必填字段** |
|---|---|---|
| Hosted | 流量将通过 Hosted 服务获得保护。 | Domain + IP Address |
| Self-Hosted | 服务在您的环境中运行。 | Domain + Upstream URL |

> **注册不等于安装**
> 创建 Hosted 或 Self-Hosted 服务记录不会安装原生 Server Security 软件包，也不会登记 Linux 服务器。

## 3.2 创建服务记录

4. 选择 Register new agent。

5. 选择 Hosted 或 Self-Hosted，然后继续执行代理数据步骤。

6. 在 Domain 中仅输入主机名，不要包含 URL 路径。

7. 对于 Hosted，输入 IP Address；对于 Self-Hosted，输入 Upstream URL。

8. 选择 Register。

## 3.3 Hosted：验证所有权并路由流量

注册流程显示两个独立项目：用于所有权验证的网站元标记，以及用于 Hosted 流量路由的 A 记录。

9. 将提供的元标记添加到网站 HTML \<head\> 内。

10. 发布变更，并确认可通过已注册域名公开访问网站。

11. 在注册对话框中选择 Verify Domain Ownership，并确认 Verification successful!。

12. 将显示的 A 记录添加到 DNS，用于 Hosted 流量路由。

13. DNS 传播后，确认仍可通过预期域名访问网站。

> **如果验证失败**
> 检查域名拼写、公开可访问性、元标记位置以及代理/CDN 主机处理，然后使用 Redo verification。

## 3.4 Self-Hosted 部署

创建 Self-Hosted 服务记录后，请遵循为环境提供的已批准部署流程。原生 Server Security 安装仍是服务器表中的单独 Install 操作。

# 4. 安装并登记原生 Server Security

## 4.1 安装原生软件包

14. 为目标服务器选择 Install。

15. 在 1. Choose a native package 下，选择与服务器匹配的操作系统和体系结构。

16. 在 2. Download and install 下，选择 Download .deb 或 Download .rpm。

17. 使用 Install command 旁的 Copy，并以管理员权限在目标服务器上运行显示的命令。

使用面板中显示的文件名、安装命令和 SHA-256 值。典型命令类似于：



> **软件包完整性**
> 对于 RPM 软件包，请保持签名检查启用，并遵循已批准的签名密钥流程。不要从未经批准的来源获取签名密钥，也不要绕过软件包验证。

## 4.2 登记服务器

18. 在安装对话框中打开 3. Enroll interactively。

19. 在目标服务器上运行 sudo silence-server enroll。

20. 选择 Generate enrollment code。

21. 仅在目标服务器的登记提示符中输入显示的代码。

22. 在预配阶段运行期间保持安装对话框打开。

> **登记代码安全**
> 登记代码仅可使用一次，最长 15 分钟后过期，绝不能复制到工单、文档、聊天或 shell 历史记录中。

预配期间，对话框可能显示 Enrollment in progress、Verified release ready、Installing security stack、Installing core protection、Core check completed、Installing sensors 和 Installation complete 等阶段。

## 4.3 恢复和重新登记

对于已显示为 enrolled 的服务器，Setup / recovery 可能提供 Re-enroll server 和 Generate recovery code。只能对目标服务器使用恢复功能，并在进行访问相关恢复时保留独立的管理员访问方式。

## 4.4 确认保护

23. 为服务器选择 Open Security。

24. 打开 Overview 并选择 Refresh。

25. 查看 Server protection、Provisioning、Sensor health 和 Guard access security。

26. 确认当前状态和近期遥测与预期保护相符。

> **等待激活**
> 如果 Policy 显示 Saved · pending activation，则配置已保存，但尚不应视为活动状态。

# 5. 了解保护状态

| **状态** | **含义** | **处理方式** |
|---|---|---|
| ACTIVE | 报告核心保护可用。 | 单独审查可选传感器和策略状态。 |
| DEGRADED | 核心保护可能仍可用，但一个或多个运行状况或覆盖信号需要处理。 | 阅读原因并查看 Sensors。 |
| FAILED | 预配或核心保护报告失败。 | 阅读错误并执行故障排除。 |
| PENDING | 安装、预配或策略激活尚未完成。 | 等待完成；不要将变更视为活动状态。 |
| CONFIGURATION REQUIRED | 面板需要更多信息才能确认核心运行状况。 | 确认登记并遵循显示的要求。 |
| REMOVED | 原生保护已移除或不再报告。 | 可用时使用受支持的 Setup / recovery 工作流。 |

传感器卡片还可分别报告 Healthy、Degraded、Failed、Disabled、Unsupported、Needs configuration、Telemetry stale 或 No telemetry。

# 6. 配置 MFA 和受保护访问

## 6.1 账户 MFA

27. 注册账户期间，打开 Set up 2FA。

28. 扫描二维码，或在 TOTP 身份验证器应用程序中输入密钥。

29. 输入当前六位代码，然后选择 Verify and finish。

30. 今后登录时使用当前身份验证器代码。

> **保护 MFA 机密**
> 切勿向他人发送身份验证器密钥、二维码或恢复代码。如果失去身份验证器访问权限，请使用组织批准的账户恢复渠道。

## 6.2 服务器访问 MFA（SSH 2FA / Port Guard）

SSH 2FA 控件将配置的 TCP 端口作为一组进行保护；它不限于 SSH 端口 22，也不涵盖 UDP。

> **更改访问控制之前**
> 在确认可从预期来源网络访问之前，请保留独立管理员会话或经过测试的恢复方法。

31. 在服务器表中打开铅笔/编辑控件。

32. 在 Agent configuration 中添加或移除受保护 TCP 端口，然后选择 Save。端口必须是 1 到 65535 的整数。

33. 在服务器行中开启 SSH 2FA，以打开 2FA SSH Guard 设置。

34. 扫描二维码，或在身份验证器应用中输入 Manual entry key。

35. 继续之前保存全部八个 Backup / Recovery Codes。每个代码仅可使用一次。

36. 选择 Next — Verify Code，输入当前六位代码，然后选择 Verify。

37. 确认 2FA verified successfully!，选择 Done，然后重新打开 Agent configuration，确认预期端口和访问设置。

## 6.3 使用 Port Guard 进行身份验证

38. 从将连接受保护服务的同一网络来源打开为部署提供的 Port Guard 地址。

39. 输入当前六位身份验证器代码或一个未使用的备份代码。

40. 选择 Unlock Ports。

41. 页面报告端口已打开后，立即重新连接受保护服务。

配置的受保护 TCP 端口在临时访问窗口内一并获得授权。显示的持续时间为准；生成的默认值为 60 秒。受保护服务仍需要其自身凭据。

> **相同来源网络**
> 用于 Port Guard 的浏览器与 SSH/数据库/应用程序客户端应呈现为来自同一观测来源网络。切换网络可能需要重新进行身份验证。

# 7. 使用 Server Security 控制台

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

# 8. 审查事件和响应

## 8.1 事件

选择事件以打开 Incident details。查看严重性、摘要、可用时的来源信息、Timeline、Evidence 和 Technical details。

| **操作** | **效果** |
|---|---|
| Mark investigating | 更改事件审查状态，表示正在调查。 |
| Resolve | 记录事件审查已完成。 |
| Dismiss | 记录该事件将不再跟进。 |

> **事件状态不等于修复**
> 更改事件审查状态本身不会移除恶意软件、终止攻击者或修复被入侵服务器。

## 8.2 响应

| **状态** | **含义** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | 已记录或获准评估；尚未确认应用。 |
| APPLIED | 响应已记录为在显示范围内应用。 |
| EXPIRED | 临时响应不再有效。 |
| REVOKED | 响应已撤销。 |
| FAILED | 请求的操作未成功完成。 |
| SUPPRESSED | 在适用策略下未强制执行响应。 |

应综合查看来源、操作和范围、原因、状态、开始时间和到期时间。阻止新连接不一定会终止已建立的连接。

# 9. 配置安全策略

## 9.1 自动响应模式

| **模式** | **行为** |
|---|---|
| Observe | 记录符合条件的决策，但不自动强制执行。 |
| Shadow | 评估符合条件的检测，但不强制执行临时阻止。 |
| Enforce | 当策略和检测条件处于活动状态时，可应用已批准的临时 IP 阻止。 |

正常初始安装模式为 Shadow。要使用 Enforce，请选择 Enforce，查看 Enable automatic enforcement?，然后确认 Enable Enforce。Enforce 仅适用于符合条件的检测。

## 9.2 受信任 IP

42. 打开 Policy → Trusted IPs。

43. 输入 Trusted IP or CIDR，并可选择输入 Description。

44. 选择 Add trusted source。

45. 使用 Remove 删除条目，或使用 Move to block 将其转换为显式阻止。

Trusted IPs 可使来源免受符合条件的自动响应阻止，但不会绕过 MFA、国家/地区限制、Allowed IPs / CIDRs、服务凭据或其他访问控制。

## 9.3 允许的 IP / CIDR

46. 打开服务器行的铅笔/编辑控件。

47. 在 Agent configuration 的 Allowed IPs / CIDRs 中输入单个 IPv4/IPv6 地址或 CIDR 范围（以逗号分隔）。

48. 选择 Save 并重新打开对话框，验证面板保留了该值。

保存的列表为空时，Port Guard 地址检查允许所有来源继续进行身份验证。列表非空时，只有匹配的地址或范围可以继续。

## 9.4 显式阻止

49. 打开 Policy → Explicit blocks。

50. 输入 Blocked IP or CIDR、必填 Reason 和可选的 Explicit block expiry。

51. 选择 Add explicit block。

52. 使用 Remove 删除条目。要更正条目，请将其删除后重新创建。

> **避免锁定管理员**
> 添加阻止前，请检查可能使用相同来源 IP 或 CIDR 的管理员、监控、NAT 和共享地址。

## 9.5 传感器和 Suricata

Policy → Sensor state 可能提供 Inventory、File Integrity、Security Configuration、YARA-X、CrowdSec、Falco 和 Suricata 开关。

对于 Suricata，请打开 Policy → Suricata monitored interface，选择显示的候选项或输入经过验证的接口（如 ens3），然后选择 Save interface。变更后确认有新的 Suricata 遥测。

# 10. 管理基于国家/地区的访问控制

## 10.1 每台服务器的 Geo-Country Filtering

每台服务器的 Geo-Country Filtering 应用于配置的受保护 TCP 端口组，并要求已验证的服务器访问 MFA。

53. 配置受保护 TCP 端口，并完成 SSH 2FA 设置。

54. 打开 Agent configuration 并开启 Enable Geo-Country Filtering。

55. 在 Default Policy 下选择 Allow Unmatched 或 Deny Unmatched。

56. 输入有效的 Geo Rules (JSON Array) 值，然后选择 Save。

57. 重新打开 Agent configuration，验证已保存的开关、默认策略、规则、端口和 2FA 设置。



- 配置端口的显式规则优先于默认策略。
- allow 规则允许列出的国家/地区，并拒绝该规则中未列出的国家/地区。

- deny 规则拒绝列出的国家/地区，并允许该规则中未列出的国家/地区。
- 默认策略仅适用于没有显式规则的已配置端口。

## 10.2 账户级国家/地区阻止列表

常规仪表板上的 Blacklist countries 是账户级 Web 流量阻止列表，与每台服务器的 Geo-Country Filtering 分开。

58. 打开 Blacklist countries。

59. 打开 Non-Blacklisted，必要时按国家/地区名称或两字母代码搜索。

60. 选择国家/地区，然后选择 Add。更改会立即保存。

61. 确认该国家/地区显示在 Blacklisted 下。

要移除国家/地区，请打开 Blacklisted，选择已阻止的国家/地区，然后选择 remove。该国家/地区将返回 Non-Blacklisted。

# 11. 审查传感器、清单、态势和发现结果

## 11.1 传感器

| **传感器/视图** | **报告内容** |
|---|---|
| Guard | 核心保护信号。 |
| File Integrity | 受监控文件的更改。 |
| YARA-X | 恶意软件模式证据。 |
| CrowdSec | 基于行为的安全检测。 |
| Falco | 运行时和系统检测。 |
| Suricata | 网络检测。 |
| Inventory / Security Configuration | 清单和评估数据。 |

传感器检测是证据。只有在已激活响应策略下符合条件的检测，才会触发自动临时响应。

## 11.2 清单和漏洞情报

Inventory 可显示软件包名称、版本、生态系统、体系结构和上次观测时间。使用 Search packages 筛选面向客户的软件包表。Inventory 仅供参考，不会修补软件包或修复漏洞。

> **谨慎解读空白或陈旧数据**
> 空白、不可用、未知或陈旧的清单/漏洞信息，不能证明服务器没有软件包或漏洞。

## 11.3 态势

使用 Posture 查看 Security Configuration Assessment 发现结果和漏洞情报状态。发现结果可显示失败或退化的检查以及任何所提供指导。Posture 是评估视图，不会自动修复服务器。

# 12. 监控事件和遥测

打开 Events 并使用可用筛选器：

- 按传感器筛选。
- 使用准确事件类型按事件类型筛选。

- 按严重性筛选：All severities、critical、high、medium、low 或 info。
- 使用 Previous 和 Next 分页。

查看显示的事件名称、来源、类型、证据、严重性、时间戳和关联事件。

# 13. 故障排除

> **首要原则**
> 更改访问控制时，请保持独立管理员访问可用。记录非机密错误文本，切勿共享登记代码、MFA 密钥、备份代码、私钥或包含这些内容的屏幕截图。

| **情况** | **建议操作** |
|---|---|
| 软件包安装失败 | 确认所选软件包与操作系统/体系结构匹配，重新下载，将显示的 SHA-256 进行比较，并以管理员权限运行复制的命令。对于 RPM，请保持签名检查启用。 |
| 登记代码过期 | 仅当先前代码未使用或面板明确允许替换时生成新代码。如果代码在后续失败前已被接受，而服务器显示为 enrolled，请使用 Setup / recovery。 |
| 未确认保护处于活动状态 | 打开 Overview，查看 Server protection、Provisioning、Sensor health 和 Guard access security。遵循为 PENDING、DEGRADED、FAILED 或 CONFIGURATION REQUIRED 显示的原因。 |
| Policy 显示 Saved · pending activation | 将策略视为已保存但尚未激活。在激活完成前，请保持先前的安全配置和管理员访问可用。 |
| MFA 设置失败 | 检查身份验证器时间，使用当前六位代码，验证预期端口，并保持现有管理员会话打开。 |
| Port Guard 已解锁但服务不可访问 | 立即重新连接，确认浏览器/客户端使用相同观测来源，验证受保护端口和服务凭据，并检查 Allowed IPs、国家/地区规则、显式阻止、自动响应和网络策略。 |
| 失去身份验证器访问权限 | 可用时使用未使用的备份代码，然后使用组织批准的恢复流程。 |
| IP 或国家/地区限制行为异常 | 确定控制功能，验证来源地址和端口，检查规则优先级和到期时间，并在添加其他规则前检查是否意外锁定管理员。 |
| 传感器遥测缺失或陈旧 | 打开 Sensors，查看传感器状态和 Last signal，并在相关时验证 Suricata 接口等配置。 |
| 软件包清单为空 | 使用 Search packages，并将软件包表与其他清单活动进行比较。应将空表视为信息不完整，而不是没有软件包的证明。 |

# 14. 安全和操作最佳实践

- 对受信任和允许的来源使用切实可行的最窄 IP/CIDR 范围。
- 启用 MFA、显式阻止或国家/地区限制时，请保留经过测试的管理员恢复路径。

- 在面板报告适当的 active/healthy 状态且近期遥测支持该状态前，不要依赖已保存的配置。
- 将传感器检测视为待调查证据；不要假设每项检测均已自动阻止。

- 在假定自动阻止仍然有效前，检查响应到期时间。
- 除非已批准操作流程明确要求，否则不要将手动移除安全文件或服务作为恢复方法。

# 附录 A — 状态快速参考

| **项目** | **客户解释** |
|---|---|
| Registered | 服务记录已存在。 |
| Installed | 已安装原生软件包。 |
| Enrolled | 一次性登记代码已被接受。 |
| Installation complete | 预配已达到安装完成阶段；请确认当前 Overview 状态和遥测。 |
| Saved · pending activation | 变更已存储在面板中，但尚不应视为活动状态。 |
| SSH 2FA: Active | 该行的身份验证器设置已完成；请确认预期受保护端口和当前保护状态。 |
