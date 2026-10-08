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


**文档状态：**第 10 节列出要求和已知限制。代码已存在，但提供的资料未确认真实 Linux/Kubernetes 连接及浏览器操作。已保存/待处理与已应用/已确认不能混同。

- [1. 开始之前](#1-开始之前)
- [2. 登录并打开 Server Security](#2-登录并打开-server-security)
- [3. 注册服务](#3-注册服务)
- [4. 安装并登记原生 Server Security](#4-安装并登记原生-server-security)
- [5. 了解保护状态](#5-了解保护状态)
- [6. 配置 MFA 和受保护访问](#6-配置-mfa-和受保护访问)
- [7. 使用 Server Security 控制台](#7-使用-server-security-控制台)
- [8. 审查事件和响应](#8-审查事件和响应)
- [9. 配置安全策略](#9-配置安全策略)
- [10. 网络访问控制、地球视图和实时连接](#10-网络访问控制-地球视图和实时连接)
- [11. 审查传感器、清单、态势和发现结果](#11-审查传感器-清单-态势和发现结果)
- [12. 监控事件和遥测](#12-监控事件和遥测)
- [13. 故障排除](#13-故障排除)
- [14. 安全和操作最佳实践](#14-安全和操作最佳实践)

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

**逐端口访问：**第 10 节的目标是每个端口独立判断资格。MFA 可暂时开放合格端口，但不能覆盖另一个端口的国家/IP 拒绝；服务身份验证仍需完成。旧端口组统一解锁不证明独立判断已运行。

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

**Network access：**第 10 节说明专用页面、服务器/端口选择、地球视图、列表和策略操作。滑动及相应控件尚未在真实浏览器验证；请以部署中实际出现的标签为准。

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

**不同操作：****Shut down session** 面向已有连接；**Blacklist IP address** 保存其范围内新连接的持久封禁。自动响应可能临时生效并遵循不同规则。提出请求或保存不等于确认断开或应用。

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

**不同名单：****Trusted IPs** 用于自动响应，**Allowed IPs / CIDRs** 涉及 Port Guard 访问，明确封禁的范围可能更广。它们都不等同于第 10 节的 **Always Allow** 或 **Always Block**。迁移时核对旧规则；账户 HTTP 名单不能自动变成 SSH/Kubernetes 封禁。

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

# 10. 网络访问控制、地球视图和实时连接

**2026-10-06 提出的功能要求。** 本节规定目标行为，并不证明功能已在生产环境通过验证。过去的地球视图展示 Web 流量，国家规则分散，终止连接的操作不可用。当前 CMC/Guard 代码包含 Network access 页面、按服务器和端口划分的策略、签名的 Guard 更新、逐端口 nftables 授权、Linux 主机网络命名空间内的 TCP 连接快照，以及签名的定向断开命令。`NETWORK_ACCESS_NET_CHECKLIST.md` 记录了静态、单元和交叉构建检查。提供的资料尚未证明数据库迁移、真实 Linux/Kubernetes 连接、2525 端口的 SSH、浏览器操作、重启后的持久性和代理端到端确认。策略已保存不等于代理已应用；命令已排队不等于连接已断开。

## 10.1 目的和范围 (NET-01)

CMC 应把已有的 3D 地球视图、国家列表、封禁窗口和向上展开的面板统一用于配置的受保护 TCP 端口。**网络会话**是从观察到的源 IP 到受管服务器已配置目标端口的一条实际活跃 TCP 连接。SSH 如果运行在 **2525** 端口，使用中的连接应显示直至结束；不能假定 SSH 总在 22 端口。已配置的 Kubernetes 端点和其他受保护 TCP 服务也适用。服务名称必须来自配置或可靠证据。Kubernetes TCP 连接本身不能证明具体用户、Pod shell 或单次 `kubectl exec` 操作；关闭复用连接可能影响多项操作。网站访问、HTTP 请求、浏览器登录、User-Agent 和访问日志中的去重 IP 数不是此处的网络会话。独立的网站托管、HTTP 分析、注册与计费功能保持原有用途。

## 10.2 服务器和端口选择 (NET-02)

查看或修改前明确显示所选受管服务器和受保护 TCP 端口。不同端口可以采用不同国家模式和名单；2525 端口的规则不能暗中更改其他端口。**All protected ports** 汇总视图应标明混合规则。切换范围和筛选时，地球视图、有效国家名单与连接列表应同步更新。持久的 **Always Allow** 与 **Always Block** IP 名单适用于所选服务器配置的受保护端口，不自动扩大到整个账户或无关端口。

## 10.3 窗口和名单 (NET-03)

第一行是 **Countries** 与 **IP addresses**。**Countries** 下的第二行是 **Blacklisted** 与 **Whitelisted**，支持搜索、添加和删除国家；另设明确的 **Blacklist mode / Whitelist mode** 模式选择。浏览名单不会改变模式。必须区分明确保存的国家与显示上的补集。**IP addresses** 下的第二行是 **Always Block** 与 **Always Allow**。每个名单有 **+** 按钮、简单的 IP 输入框、已保存条目和删除操作。无论切换标签页或国家模式，两份名单都同时生效。接受单个 IPv4/IPv6 地址，规范化等价写法并防止重复；无需 JSON、浏览器指纹、IP 加用户组合或强制 CIDR 表达式。

## 10.4 国家模式 (NET-04)

| 模式 | 明确选择的国家 | 其他所有已知国家 |
|---|---|---|
| **Blacklist mode** | 拒绝 | 符合 IP 规则及身份验证时允许 |
| **Whitelist mode** | 符合 IP 规则及身份验证时允许 | 拒绝 |

空黑名单不封禁任何国家；空白名单不允许任何国家。切换模式时说明明确选择的项目如何保留或转移，不得把显示的补集偷偷当作保存选择。若白名单只选择哈萨克斯坦和土耳其，其他国家会被拒绝，除非存在有效 IP 例外。每个端口独立判断：一个端口拒绝不应拒绝另一个允许的端口，一个端口允许也不能解锁被拒端口。MFA 仍然必需。无法确定位置时显示 **Unknown country**，不得捏造国家。公共 IP 的 GeoIP 查询失败不应悄悄关闭地理限制；白名单模式下未知国家在没有 **Always Allow** 时拒绝。私有/本地地址跳过国家判断，但仍受 IP 限制和 MFA 约束；应与公共 IP 查询失败区分。

## 10.5 持久 IP 例外 (NET-05)

**Always Allow** 让观察到的源 IP 在本服务器的受保护端口上不受国家限制，直到删除条目。例子：俄罗斯被封禁，但员工从俄罗斯远程工作。将其观察到的 IP 加入 **Always Allow** 后可通过国家限制，仍须完成 MFA 和 SSH 身份验证。俄罗斯不在白名单时也适用；删除条目会恢复正常国家判断。**Always Block** 即使所在国家获准也拒绝匹配 IP。两份名单同时且持久生效，不因国家模式切换失效。**Always Allow** 不绕过服务凭据或独立的自动威胁响应。**Trusted IPs** 用于后者，并非同义词；旧来源允许名单与明确封禁需要有意识地核对。规范化后的同一 IP 不得同时属于两份名单，应提供明确移动操作；若收到冲突数据，则封禁优先并报告冲突。判断顺序为 **Always Block**、作为地理例外的 **Always Allow**、所选端口的国家模式；MFA 和服务身份验证另外适用。共享公共 IP 会影响该地址所有使用者；源 IP 变化后需要更新例外。单靠 IP 不能识别员工个人。

## 10.6 地球视图与四档密度 (NET-06)

地球视图展示所选范围内有效的允许/封禁国家及活跃连接；封禁国家内获准的 IP 例外也应易于理解。用不同图例区分国家策略和连接密度。记录中的四档为 **0、1–2、3–9、10+ 个连接**；发布为当前已验证数值前须核对最新实现证据。聚合标记应能查看单个 IP 和连接，不能仅凭国家推断精确 IP 坐标。明确展示混合策略、未知和私有位置。旧 **Active Users** 统计的是近期访问日志的不同 IP，不是活跃 TCP 连接。地球视图与列表共用筛选、时间、总数和新鲜度。已确认关闭的连接从活跃数移除；代理离线或无遥测意味着未知/过期，而不是零。

## 10.7 连接列表 (NET-07)

向上滑动打开列表，同时提供可见的展开按钮供鼠标和键盘使用；还应能关闭或折叠。每行代表一条连接，同一 IP 的多条连接分别显示。展示源 IP、国家或私有/未知状态、服务器、目标端口、可用时的配置服务名、状态及确实已知的时间。**First observed** 是第一次观察到的时间，不一定是真正开始连接的时间。搜索、范围筛选和翻页应覆盖全部行；一页结果不是连接总数。

## 10.8 菜单与断开连接 (NET-08)

在地球视图或列表中右键可检查的 IP/连接，菜单提供 **Shut down session** 与 **Blacklist IP address**；触屏和键盘另有可见的等效菜单。若同一 IP 有多条连接，须明确选择具体连接、服务器和端口。**Shut down session** 通过代理只断开选中的真实连接，涵盖 2525/22 端口 SSH、受支持的 Kubernetes 路径和其他受保护 TCP 服务。它不关闭服务器、服务、Pod 或同 IP 的其他连接，不一定取消已启动的应用任务，也不永久阻止重连。执行前重新核实连接身份；不能仅凭 IP、用户名、模糊时间或重复使用的 PID 猜测目标。区分请求/排队与已确认结果，明确显示已关闭、数据过期、代理离线、无权限、不支持、命令过期及失败。发送命令不能证明成功；若无法安全定向断开，应说明具体限制。

## 10.9 从连接封禁 IP (NET-09)

**Blacklist IP address** 把源 IP 加入同一服务器的持久 **Always Block** 名单。先显示已保存/待处理，代理确认后才显示已应用或失败；**IP addresses** 窗口应显示同一条目。若 IP 已在 **Always Allow**，提供明确的移动操作。应用后阻止范围内的新连接；并不能证明现有连接结束，断开需单独操作。

## 10.10 保存、执行与迁移 (NET-10)

单一策略贯通 CMC、API/存储、下发的代理配置及实际执行。分别显示已保存、待处理、已应用和失败，附带版本与时间；代理离线时保持待处理。重启后保留，拒绝旧命令及重放，检查操作者/租户/服务器权限，记录目标、操作、时间和实际结果。用此统一流程替换旧账户级 HTTP 国家封禁和单独的 Geo JSON 编辑说明。绝不把账户 HTTP 黑名单暗中转换为所有服务器的 SSH/Kubernetes 封禁。现有原生与 IP 限制需审慎迁移，不可无声削弱保护或造成隐藏拒绝。独立 HTTP 分析等功能仍保留。

## 10.11 强制检查 (NET-11)

宣称完成前，逐项核对 **NET-01** 至 **NET-11**，提供文件、验证证据及未解决差异：包括 SSH 2525 的两个独立端口；两种模式、空名单和模式切换；两行标签及同时生效的 IP 名单；俄罗斯员工在两种模式下通过 MFA 的例外；封禁优先、IPv4/IPv6 和重复项；地球与列表中的真实 SSH、Kubernetes 和普通 TCP 连接；四档、相等总数和过期数据；滑动、鼠标/键盘和菜单；即使共享 IP 也仅断开所选连接；已关闭、过期、未授权、失败与不支持的结果；持久封禁、代理确认、重启、租户隔离和迁移。外观或模拟数据不足以证明完成。未做的真实 Linux/Kubernetes 和浏览器检查须单独标注。

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

**数据新鲜度：**访问日志和旧 **Active Users** 不统计活跃 TCP 连接。第 10 节的地球视图与列表必须共用筛选、总数和时间。遥测缺失或过期表示未知/过期，不能当作零。

打开 Events 并使用可用筛选器：

- 按传感器筛选。
- 使用准确事件类型按事件类型筛选。

- 按严重性筛选：All severities、critical、high、medium、low 或 info。
- 使用 Previous 和 Next 分页。

查看显示的事件名称、来源、类型、证据、严重性、时间戳和关联事件。

# 13. 故障排除

**访问异常：**先核对服务器/端口、国家模式、实际观察到的源 IP、**Always Block**/**Always Allow**、旧限制与已应用版本。IP 变化后更新例外。待处理策略、离线代理或过期连接不能确认实时状态；已请求、已过期或不支持的断开并非已确认断开。

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

**当前限制：**提供的资料没有第 10 节代码在真实 Linux/Kubernetes 和浏览器中的完整验证。限时 MFA 授权需要 nftables。收集器只覆盖所选节点主机网络命名空间内的已建立 TCP 套接字，不能看到所有 Pod、节点或外部负载均衡器。缺少套接字身份时状态为不支持；过大的快照应标为过期而非完整。重启、代理确认与定向断开仍待验证。

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
