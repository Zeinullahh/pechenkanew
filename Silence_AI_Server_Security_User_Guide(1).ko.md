# Silence AI Server Security 사용자 안내서

이 안내서는 Silence AI 관리 패널에서 서비스 등록, 네이티브 Server Security 설치 및 등록, 보호된 접근 설정, 보안 활동 확인을 설명합니다.

??? ??, ??? ??, ?? ??, ?? ??? ??? ?? ?? ?????. ???? ?? ??? ??? ?????.

## 목차

1. 시작하기 전에
2. 로그인 및 Server Security 열기
3. 서비스 등록
4. 설치, 서버 등록 및 보호 활성화
5. 보호 상태
6. MFA 및 보호된 접근 설정
7. Server Security 콘솔
8. 인시던트와 대응
9. 보안 정책
10. 네트워크 접근, 지구본 및 활성 연결
11. 센서, 인벤토리, 보안 태세 및 발견 사항
12. 이벤트와 원격 측정
13. 문제 해결

## 1. 시작하기 전에

시작하기 전에 다음 정보와 액세스 권한을 준비하십시오.

- Server Security에 액세스할 수 있는 Silence AI 계정.
- 등록할 서비스 도메인 또는 서버 이름.

- 대상 서버에서 Silence AI로의 네트워크 연결.
- 네이티브 설치를 위한 대상 Linux 서버의 관리자 권한.

- Hosted 등록: 대상 IP 주소 및 웹 사이트와 DNS를 업데이트할 권한.
- Self-Hosted 등록: 업스트림 URL 및 조직에서 승인한 배포 절차.

| **지원되는 네이티브 대상** | **패키지** |
|---|---|
| Ubuntu Server 22.04 또는 24.04 LTS, amd64 | DEB |
| Fedora Server 44, x86_64 | RPM |

> **Hosted 청구**
> Hosted 트래픽 보호는 사용량에 따라 청구됩니다. 이에 의존하기 전에 계정 잔액이 충분한지 확인하십시오.

## 2. 로그인 및 Server Security 열기

1. Silence AI 관리 패널을 열고 Log in을 선택합니다.

2. 현재 6자리 인증 앱 코드를 사용하여 계정 MFA를 완료합니다.

3. Server Security를 연 다음 Servers를 선택합니다.

각 서버 행에는 Install, Setup / recovery 및 Open Security가 표시될 수 있습니다. 사용 가능한 작업은 서버의 현재 등록 상태에 따라 달라집니다.

## 3. 서비스 등록

### 3.1 Hosted 또는 Self-Hosted 선택

| **배포 유형** | **사용 시점** | **필수 필드** |
|---|---|---|
| Hosted | Hosted 서비스를 통해 트래픽을 보호할 경우. | Domain + IP Address |
| Self-Hosted | 서비스가 자체 환경에서 실행될 경우. | Domain + Upstream URL |

> **등록은 설치가 아닙니다**
> Hosted 또는 Self-Hosted 서비스 레코드를 생성해도 네이티브 Server Security 패키지가 설치되거나 Linux 서버가 등록되지는 않습니다.

**Hosted** ?? **Self-Hosted**? ???? ?? **Register new agent**? ?????.

### 3.2 서비스 레코드 생성

4. Register new agent를 선택합니다.

5. Hosted 또는 Self-Hosted를 선택하고 에이전트 데이터 단계로 진행합니다.

6. URL 경로 없이 호스트 이름만 Domain에 입력합니다.

7. Hosted의 경우 IP Address를, Self-Hosted의 경우 Upstream URL을 입력합니다.

8. Register를 선택합니다.

### 3.3 Hosted: 소유권 확인 및 트래픽 라우팅

등록 흐름에는 소유권 확인용 웹 사이트 메타 태그와 Hosted 트래픽 라우팅용 A 레코드가 별도로 표시됩니다.

9. 제공된 메타 태그를 웹 사이트 HTML \<head\> 안에 추가합니다.

10. 변경 사항을 게시하고 등록한 도메인에서 웹 사이트에 공개적으로 접근할 수 있는지 확인합니다.

11. 등록 대화 상자에서 Verify Domain Ownership을 선택하고 Verification successful!을 확인합니다.

12. Hosted 트래픽 라우팅을 위해 표시된 A 레코드를 DNS에 추가합니다.

13. DNS 전파 후 의도한 도메인을 통해 웹 사이트에 계속 접근할 수 있는지 확인합니다.

> **확인에 실패하는 경우**
> 도메인 철자, 공개 접근 가능 여부, 메타 태그 위치 및 프록시/CDN 호스트 처리를 확인한 다음 Redo verification을 사용하십시오.

표시된 **A record**는 Hosted 트래픽 경로용이며 소유권 검증 방법이 아닙니다. 사이트의 meta 태그가 소유권을 증명합니다. 기존 사이트가 확인 동안 접속 가능해야 한다면 DNS 전환 전에 태그를 검증하세요.

### 3.4 Self-Hosted 배포

Self-Hosted 서비스 레코드를 만든 다음 환경에 승인된 배포 절차를 따릅니다. 네이티브 Server Security 설치는 서버 목록에서 수행하는 별도 작업입니다.

## 4. 네이티브 Server Security 설치 및 등록

**Registered**는 서비스 기록 존재, **Installed**는 네이티브 패키지 설치, **Enrolled**는 일회용 코드 승인만 뜻합니다. 어느 하나도 보호가 정상 작동하거나 적용됐다는 독립 증거가 아닙니다.

### 4.1 네이티브 패키지 설치

14. 대상 서버에서 Install을 선택합니다.

15. 1. Choose a native package에서 서버와 일치하는 운영 체제와 아키텍처를 선택합니다.

16. 2. Download and install에서 Download .deb 또는 Download .rpm을 선택합니다.

17. Install command 옆의 Copy를 사용하고 표시된 명령을 대상 서버에서 관리자 권한으로 실행합니다.

패널에 표시된 파일 이름, 설치 명령 및 SHA-256 값을 사용하십시오. 일반적인 명령은 다음과 유사합니다.



> **패키지 무결성**
> RPM 패키지는 서명 확인을 활성화한 상태로 유지하고 승인된 서명 키 절차를 따르십시오. 승인되지 않은 출처에서 서명 키를 구하거나 패키지 확인을 우회하지 마십시오.

**Install Server Security**에서 서버에 맞는 패키지를 고릅니다. 명령은 보통 Ubuntu의 `sudo apt install ./<displayed-filename>.deb`, Fedora의 `sudo dnf --setopt=localpkg_gpgcheck=1 install ./<displayed-filename>.rpm` 형태이지만 콘솔에 나온 실제 파일명·명령·SHA-256을 사용하세요. 브라우저 다운로드는 현재 PC에 저장할 뿐 서버에 원격 설치하지 않습니다. 필요한 경우 승인된 안전한 방법으로 옮기세요. 이미 등록된 서버에서는 패널 지시가 있을 때만 **Setup / recovery**를 사용합니다.

### 4.2 서버 등록

18. 설치 대화 상자에서 3. Enroll interactively를 엽니다.

19. 대상 서버에서 sudo silence-server enroll을 실행합니다.

20. Generate enrollment code를 선택합니다.

21. 표시된 코드는 대상 서버의 등록 프롬프트에만 입력합니다.

22. 프로비저닝 단계가 실행되는 동안 설치 대화 상자를 열어 둡니다.

> **등록 코드 보안**
> 등록 코드는 일회용이며 최대 15분 후 만료됩니다. 티켓, 문서, 채팅 또는 셸 기록에 절대 복사하지 마십시오.

프로비저닝 중 대화 상자에는 Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors 및 Installation complete 등의 단계가 표시될 수 있습니다.

미사용 코드를 교체할 때 **Replace enrollment code**를 선택하고 **Replace code**를 확인한 뒤 새 코드를 사용합니다. **This server is enrolled**는 등록만 확인하며 설치 완료나 보호 활성화를 뜻하지 않습니다. 나중 단계가 실패했다면 원래 코드는 이미 사용됐을 수 있습니다.

### 4.3 복구 및 재등록

등록된 서버에서 **Setup / recovery**를 열고 해당 서버에 **Re-enroll server** 또는 **Generate recovery code**를 사용합니다. 복구 중에는 독립적인 관리자 접근 경로를 유지하세요.

### 4.4 보호 확인

23. 서버에서 Open Security를 선택합니다.

24. Overview를 열고 Refresh를 선택합니다.

25. Server protection, Provisioning, Sensor health 및 Guard access security를 검토합니다.

26. 현재 상태와 최근 원격 측정이 예상한 보호와 일치하는지 확인합니다.

> **활성화 대기 중**
> Policy에 Saved · pending activation이 표시되면 구성이 저장된 것이지만 아직 활성 상태로 간주해서는 안 됩니다.

**Installation complete**, **SSH 2FA: Active**, ??? ???? ??? ?? ???????? ?? ??? ???? ?? ?? ??? ??? ? ????. ?? ?????? ?? ?? ??? ?????.

## 5. 보호 상태 이해

| **상태** | **의미** | **수행할 작업** |
|---|---|---|
| ACTIVE | 핵심 보호를 사용할 수 있다고 보고되었습니다. | 선택적 센서와 정책 상태를 별도로 검토합니다. |
| DEGRADED | 핵심 보호는 계속 사용 가능할 수 있지만 하나 이상의 상태 또는 적용 범위 신호에 주의가 필요합니다. | 이유를 읽고 Sensors를 검토합니다. |
| FAILED | 프로비저닝 또는 핵심 보호에서 실패를 보고했습니다. | 오류를 읽고 문제 해결 절차를 따릅니다. |
| PENDING | 설치, 프로비저닝 또는 정책 활성화가 완료되지 않았습니다. | 완료될 때까지 기다리고 변경을 활성 상태로 간주하지 마십시오. |
| CONFIGURATION REQUIRED | 핵심 상태를 확인하려면 추가 정보가 필요합니다. | 등록을 확인하고 표시된 요구 사항을 따릅니다. |
| REMOVED | 네이티브 보호가 제거되었거나 더 이상 보고되지 않습니다. | 가능한 경우 지원되는 Setup / recovery 워크플로를 사용합니다. |

센서 카드는 Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale 또는 No telemetry를 별도로 보고할 수 있습니다.

## 6. MFA 및 보호된 액세스 구성

### 6.1 계정 MFA

등록 중 **Set up 2FA**를 열고 QR 코드를 스캔하거나 인증 앱에 비밀 키를 입력한 다음 현재 6자리 코드를 입력하고 **Verify and finish**를 선택합니다. 이후 로그인에는 현재 코드를 사용합니다. 인증 앱에 접근할 수 없으면 보관한 복구 코드 또는 조직에서 승인한 계정 복구 절차를 사용하세요. QR 코드, 비밀 키, 복구 코드를 다른 사람에게 전달하지 마세요.

### 6.2 서버 액세스 MFA(SSH 2FA / Port Guard)

**SSH 2FA**는 SSH 포트 22뿐 아니라 설정된 보호 TCP 포트에 적용됩니다. 접근 설정을 변경하는 동안 독립적인 관리자 세션을 유지하세요.

1. 서버 목록에서 편집을 열고 **Agent configuration**에서 보호할 **TCP ports**를 설정합니다.
2. 서버 행에서 **SSH 2FA**를 선택하고 QR 코드를 스캔하거나 인증 앱에 **Manual entry key**를 입력합니다.
3. 8개의 **Backup / Recovery Codes**를 안전하게 보관합니다. 각 코드는 한 번만 사용할 수 있습니다.
4. **Next — Verify Code**를 선택하고 현재 6자리 코드를 입력한 뒤 **Verify**로 설정을 마칩니다.
5. **Agent configuration**을 다시 열어 포트와 접근 설정을 확인합니다.

### 6.3 Port Guard로 인증

보호 서비스 클라이언트와 같은 네트워크에서 배포 환경에 승인된 **Port Guard** 주소를 엽니다. 현재 인증 코드 또는 사용하지 않은 백업 코드 하나를 입력하고 **Unlock Ports**를 선택한 뒤 서비스에 다시 연결합니다. 화면에 표시된 접근 시간을 확인하세요. 보호 서비스 자체의 자격 증명도 계속 필요합니다.

### 6.4 서버 액세스 MFA 비활성화 또는 재설정

서버 액세스 MFA를 비활성화하려면 **Enable 2FA for access**를 끄고 저장하세요. 적용 범위를 바꾸려면 설정된 보호 포트를 변경하거나 제거한 뒤 저장하세요. 작동 중인 관리자 세션과 별도의 액세스 복구 수단을 유지하세요. 에이전트가 변경 사항을 적용한 후 패널의 상태와 대상 서버 접속을 확인하세요. 실행 중인 서버에 저장된 설정이 반영되지 않으면 담당 관리자에게 문의하세요. 파일이나 서비스를 수동으로 삭제하지 마세요.

## 7. Server Security 콘솔 사용

제10절에서는 Network access 페이지의 서버 및 포트 선택, 지구본, 연결 목록과 정책 작업을 설명합니다.


| **탭** | **목적** |
|---|---|
| Overview | 보호 상태, 프로비저닝, 센서 상태, 인시던트, 대응 및 최근 활동. |
| Incidents | 검토할 상관관계가 있는 보안 활동. |
| Responses | 자동 대응 기록 및 결과. |
| Sensors | 센서 상태 및 탐지 보기. |
| Posture | Security Configuration Assessment 결과 및 취약성 인텔리전스 상태. |
| Inventory | 보고된 패키지 및 서버 인벤토리. |
| Events | 필터링 및 페이지 이동이 가능한 서버 원격 측정. |
| Policy | 자동 대응 모드, IP 정책, 센서 스위치 및 Suricata 인터페이스. |

기본 콘솔에서는 Refresh를 사용합니다. Events에서 이벤트 탐색기 자체를 새로 고쳐야 할 때는 페이지나 필터를 변경합니다.

## 8. 인시던트 및 대응 검토

**서로 다른 작업:** **Shut down session**은 기존 연결 하나를 대상으로 하고 **Blacklist IP address**는 범위 내 새 연결에 대한 지속 차단을 저장합니다. 자동 대응은 일시적이며 다른 규칙을 따를 수 있습니다. 요청 또는 저장만으로 종료나 적용을 확인할 수 없습니다.

### 8.1 인시던트

인시던트를 선택하여 Incident details를 엽니다. 심각도, 요약, 가능한 경우 소스 정보, Timeline, Evidence 및 Technical details를 검토합니다.

| **작업** | **효과** |
|---|---|
| Mark investigating | 인시던트 검토 상태를 조사 중으로 변경합니다. |
| Resolve | 인시던트 검토가 완료되었음을 기록합니다. |
| Dismiss | 인시던트를 더 이상 추적하지 않음을 기록합니다. |

> **인시던트 상태는 해결 조치가 아닙니다**
> 인시던트 검토 상태를 변경하는 것만으로는 맬웨어 제거, 공격자 차단 또는 침해된 서버 복구가 이루어지지 않습니다.

### 8.2 대응

| **상태** | **의미** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | 평가를 위해 기록 또는 승인되었으며 적용 여부는 확인되지 않았습니다. |
| APPLIED | 표시된 범위 내에서 대응이 적용된 것으로 기록되었습니다. |
| EXPIRED | 임시 대응이 더 이상 활성 상태가 아닙니다. |
| REVOKED | 대응이 철회되었습니다. |
| FAILED | 요청한 작업이 성공적으로 완료되지 않았습니다. |
| SUPPRESSED | 해당 정책에 따라 대응이 시행되지 않았습니다. |

소스, 작업과 범위, 이유, 상태, 시작 시간 및 만료를 함께 검토하십시오. 새 연결 차단이 이미 설정된 연결을 반드시 종료하는 것은 아닙니다.

## 9. 보안 정책 구성

### 9.1 자동 대응 모드

| **모드** | **동작** |
|---|---|
| Observe | 자동 시행 없이 대상 결정을 기록합니다. |
| Shadow | 임시 차단을 시행하지 않고 대상 탐지를 평가합니다. |
| Enforce | 정책 및 탐지 조건이 활성 상태일 때 승인된 임시 IP 차단을 적용할 수 있습니다. |

일반적인 초기 설치 모드는 Shadow입니다. Enforce를 사용하려면 Enforce를 선택하고 Enable automatic enforcement?를 검토한 다음 Enable Enforce를 확인합니다. Enforce는 대상 탐지에만 적용됩니다.

**Policy → Automatic response mode**에서 모드를 선택합니다. **Enforce** 전환 시 **Enable automatic enforcement?**을 확인하고 **Enable Enforce** 또는 **Cancel**을 선택합니다. 자동 임시 차단에 의존하기 전 적용 상태를 확인하세요. 모든 탐지가 대응을 만들지는 않습니다.

### 9.2 신뢰할 수 있는 IP

42. Policy → Trusted IPs를 엽니다.

43. Trusted IP or CIDR과 선택적으로 Description을 입력합니다.

44. Add trusted source를 선택합니다.

45. Remove로 항목을 삭제하거나 Move to block으로 명시적 차단으로 변환합니다.

Trusted IPs는 대상 자동 대응 차단에서 원본을 제외합니다. MFA, 국가 제한, Allowed IPs / CIDRs, 서비스 자격 증명 또는 기타 액세스 제어를 우회하지는 않습니다.

### 9.3 허용된 IP / CIDR

46. 서버 행의 연필/편집 컨트롤을 엽니다.

47. Agent configuration의 Allowed IPs / CIDRs에 개별 IPv4/IPv6 주소 또는 CIDR 범위를 쉼표로 구분하여 입력합니다.

48. Save를 선택하고 대화 상자를 다시 열어 패널에 값이 유지되었는지 확인합니다.

저장된 목록이 비어 있으면 Port Guard 주소 확인에서 모든 원본이 인증을 계속할 수 있습니다. 목록이 비어 있지 않으면 일치하는 주소나 범위만 계속할 수 있습니다.

??? ?? ??? **Allowed IPs / CIDRs (comma-separated)**???. ? ??? Port Guard? ??? ? ?? ???? ?????. ??? ??? ?? ????? MFA, ?? ??, ??? ?? ?? ?? ??? ??? ???? ????. **Trusted IPs**? ?????. ??? ?? ?? ??? ??? ???? ?? ??? ???? ??? ?? ??? ?????.

### 9.4 명시적 차단

49. Policy → Explicit blocks를 엽니다.

50. Blocked IP or CIDR, 필수 Reason 및 선택적 Explicit block expiry를 입력합니다.

51. Add explicit block을 선택합니다.

52. Remove로 항목을 삭제합니다. 항목을 수정하려면 삭제한 후 새로 만듭니다.

> **관리자 잠금 방지**
> 차단을 추가하기 전에 동일한 원본 IP 또는 CIDR을 사용할 수 있는 관리자, 모니터링, NAT 및 공유 주소를 확인하십시오.

### 9.5 센서 및 Suricata

Policy → Sensor state에는 Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco 및 Suricata 스위치가 표시될 수 있습니다.

Suricata의 경우 Policy → Suricata monitored interface를 열고 표시된 후보를 선택하거나 ens3 같은 확인된 인터페이스를 입력한 다음 Save interface를 선택합니다. 변경 후 새로운 Suricata 원격 측정을 확인합니다.

## 10. 네트워크 접근 제어, 지구본 및 활성 연결

**Network access**를 열고 관리 서버와 보호 TCP 포트를 선택합니다. 지구본과 연결 목록에서 선택한 범위의 출발지 IP, 국가, 포트 및 세션 정보를 확인합니다.

**Countries**에서 블랙리스트 또는 화이트리스트 모드를 선택하고 해당 포트의 국가 목록을 편집합니다. **IP addresses**에서 서버의 **Always Block** 및 **Always Allow** 목록을 관리합니다. Always Allow는 MFA나 보호 서비스 인증을 대신하지 않습니다.

연결 메뉴에서 **Shut down session** 또는 **Blacklist IP address**를 선택합니다. 작업 후 표시된 결과와 정책 상태를 확인하세요. 저장된 변경이나 대기 중인 요청은 적용 결과가 표시된 뒤에 완료된 것으로 판단합니다.

## 11. 센서, 인벤토리, 보안 태세 및 결과 검토

**Sensors**에서 각 센서의 상태와 마지막 신호를 확인합니다. **Inventory**와 **Search packages**로 보고된 패키지 정보를 살펴봅니다. **Posture**에서 구성 점검 결과와 표시된 권장 사항을 확인합니다. 결과를 해석할 때 관측 시각을 함께 확인하세요.

## 12. 이벤트 및 원격 측정 모니터링

서버 원격 측정 데이터를 보려면 **Events**를 엽니다. 센서, 정확한 이벤트 유형 또는 심각도로 필터링하고 **Previous**와 **Next**로 이동합니다. 출처, 증거, 심각도, 시간 및 표시되는 관련 사건을 확인하세요. 이전 결과를 바탕으로 판단하기 전에 화면을 새로 고칩니다.

## 13. 문제 해결

작업이 완료되지 않으면 선택한 서버와 포트, 화면에 표시된 상태와 시간, 오류 내용을 확인합니다. 입력 또는 연결 문제를 수정한 뒤 다시 시도하세요. 접근 규칙을 변경하는 동안 독립적인 관리자 세션을 유지합니다. 계정이나 서버 접근 복구에는 조직에서 승인한 절차를 사용합니다.
