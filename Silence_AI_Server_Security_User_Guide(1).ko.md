# Silence AI

## Server Security 사용자 가이드

등록, 설치, 보호된 액세스, 보안 모니터링 및 정책 관리에 관한 최종 사용자 지침입니다.

> **고객 문서**
> 이 가이드를 사용하여 서비스를 등록하고, 네이티브 Server Security를 설치하고, 액세스 제어를 구성하고, 인시던트를 검토하고, 서버 보호를 모니터링하십시오.

버전 1.0 • 2026년 10월

# 이 가이드 사용 방법

이 가이드는 Silence AI Server Security를 사용하는 관리자와 승인된 운영자를 위한 것입니다. 고객 인터페이스에서 수행할 수 있는 작업과 보호 또는 액세스 제어 변경 사항을 신뢰하기 전에 완료해야 할 확인 사항을 중점적으로 설명합니다.

> **중요 운영 원칙**
> 등록, 패키지 설치, 등록 처리, 정책 구성 및 실시간 보호는 별개의 단계입니다. 설정이 pending으로 표시되면 패널에서 활성화가 보고될 때까지 해당 설정에 의존하지 마십시오.

# 1. 시작하기 전에

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

# 2. 로그인 및 Server Security 열기

1. Silence AI 관리 패널을 열고 Log in을 선택합니다.

2. 현재 6자리 인증 앱 코드를 사용하여 계정 MFA를 완료합니다.

3. Server Security를 연 다음 Servers를 선택합니다.

각 서버 행에는 Install, Setup / recovery 및 Open Security가 표시될 수 있습니다. 사용 가능한 작업은 서버의 현재 등록 상태에 따라 달라집니다.

# 3. 서비스 등록

## 3.1 Hosted 또는 Self-Hosted 선택

| **배포 유형** | **사용 시점** | **필수 필드** |
|---|---|---|
| Hosted | Hosted 서비스를 통해 트래픽을 보호할 경우. | Domain + IP Address |
| Self-Hosted | 서비스가 자체 환경에서 실행될 경우. | Domain + Upstream URL |

> **등록은 설치가 아닙니다**
> Hosted 또는 Self-Hosted 서비스 레코드를 생성해도 네이티브 Server Security 패키지가 설치되거나 Linux 서버가 등록되지는 않습니다.

## 3.2 서비스 레코드 생성

4. Register new agent를 선택합니다.

5. Hosted 또는 Self-Hosted를 선택하고 에이전트 데이터 단계로 진행합니다.

6. URL 경로 없이 호스트 이름만 Domain에 입력합니다.

7. Hosted의 경우 IP Address를, Self-Hosted의 경우 Upstream URL을 입력합니다.

8. Register를 선택합니다.

## 3.3 Hosted: 소유권 확인 및 트래픽 라우팅

등록 흐름에는 소유권 확인용 웹 사이트 메타 태그와 Hosted 트래픽 라우팅용 A 레코드가 별도로 표시됩니다.

9. 제공된 메타 태그를 웹 사이트 HTML \<head\> 안에 추가합니다.

10. 변경 사항을 게시하고 등록한 도메인에서 웹 사이트에 공개적으로 접근할 수 있는지 확인합니다.

11. 등록 대화 상자에서 Verify Domain Ownership을 선택하고 Verification successful!을 확인합니다.

12. Hosted 트래픽 라우팅을 위해 표시된 A 레코드를 DNS에 추가합니다.

13. DNS 전파 후 의도한 도메인을 통해 웹 사이트에 계속 접근할 수 있는지 확인합니다.

> **확인에 실패하는 경우**
> 도메인 철자, 공개 접근 가능 여부, 메타 태그 위치 및 프록시/CDN 호스트 처리를 확인한 다음 Redo verification을 사용하십시오.

## 3.4 Self-Hosted 배포

Self-Hosted 서비스 레코드를 생성한 후 환경에 제공된 승인된 배포 절차를 따르십시오. 네이티브 Server Security 설치는 서버 테이블의 별도 Install 작업입니다.

# 4. 네이티브 Server Security 설치 및 등록

## 4.1 네이티브 패키지 설치

14. 대상 서버에서 Install을 선택합니다.

15. 1. Choose a native package에서 서버와 일치하는 운영 체제와 아키텍처를 선택합니다.

16. 2. Download and install에서 Download .deb 또는 Download .rpm을 선택합니다.

17. Install command 옆의 Copy를 사용하고 표시된 명령을 대상 서버에서 관리자 권한으로 실행합니다.

패널에 표시된 파일 이름, 설치 명령 및 SHA-256 값을 사용하십시오. 일반적인 명령은 다음과 유사합니다.



> **패키지 무결성**
> RPM 패키지는 서명 확인을 활성화한 상태로 유지하고 승인된 서명 키 절차를 따르십시오. 승인되지 않은 출처에서 서명 키를 구하거나 패키지 확인을 우회하지 마십시오.

## 4.2 서버 등록

18. 설치 대화 상자에서 3. Enroll interactively를 엽니다.

19. 대상 서버에서 sudo silence-server enroll을 실행합니다.

20. Generate enrollment code를 선택합니다.

21. 표시된 코드는 대상 서버의 등록 프롬프트에만 입력합니다.

22. 프로비저닝 단계가 실행되는 동안 설치 대화 상자를 열어 둡니다.

> **등록 코드 보안**
> 등록 코드는 일회용이며 최대 15분 후 만료됩니다. 티켓, 문서, 채팅 또는 셸 기록에 절대 복사하지 마십시오.

프로비저닝 중 대화 상자에는 Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors 및 Installation complete 등의 단계가 표시될 수 있습니다.

## 4.3 복구 및 재등록

이미 enrolled로 표시된 서버의 경우 Setup / recovery에 Re-enroll server와 Generate recovery code가 표시될 수 있습니다. 복구는 대상 서버에만 사용하고, 액세스 관련 복구 중에는 독립적인 관리자 액세스 방법을 유지하십시오.

## 4.4 보호 확인

23. 서버에서 Open Security를 선택합니다.

24. Overview를 열고 Refresh를 선택합니다.

25. Server protection, Provisioning, Sensor health 및 Guard access security를 검토합니다.

26. 현재 상태와 최근 원격 측정이 예상한 보호와 일치하는지 확인합니다.

> **활성화 대기 중**
> Policy에 Saved · pending activation이 표시되면 구성이 저장된 것이지만 아직 활성 상태로 간주해서는 안 됩니다.

# 5. 보호 상태 이해

| **상태** | **의미** | **수행할 작업** |
|---|---|---|
| ACTIVE | 핵심 보호를 사용할 수 있다고 보고되었습니다. | 선택적 센서와 정책 상태를 별도로 검토합니다. |
| DEGRADED | 핵심 보호는 계속 사용 가능할 수 있지만 하나 이상의 상태 또는 적용 범위 신호에 주의가 필요합니다. | 이유를 읽고 Sensors를 검토합니다. |
| FAILED | 프로비저닝 또는 핵심 보호에서 실패를 보고했습니다. | 오류를 읽고 문제 해결 절차를 따릅니다. |
| PENDING | 설치, 프로비저닝 또는 정책 활성화가 완료되지 않았습니다. | 완료될 때까지 기다리고 변경을 활성 상태로 간주하지 마십시오. |
| CONFIGURATION REQUIRED | 핵심 상태를 확인하려면 추가 정보가 필요합니다. | 등록을 확인하고 표시된 요구 사항을 따릅니다. |
| REMOVED | 네이티브 보호가 제거되었거나 더 이상 보고되지 않습니다. | 가능한 경우 지원되는 Setup / recovery 워크플로를 사용합니다. |

센서 카드는 Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale 또는 No telemetry를 별도로 보고할 수 있습니다.

# 6. MFA 및 보호된 액세스 구성

## 6.1 계정 MFA

27. 계정 등록 중 Set up 2FA를 엽니다.

28. QR 코드를 스캔하거나 TOTP 인증 앱에 비밀 키를 입력합니다.

29. 현재 6자리 코드를 입력하고 Verify and finish를 선택합니다.

30. 이후 로그인할 때 현재 인증 앱 코드를 사용합니다.

> **MFA 비밀 정보 보호**
> 인증 앱 비밀 키, QR 코드 또는 복구 코드를 다른 사람에게 보내지 마십시오. 인증 앱 액세스를 잃은 경우 조직에서 승인한 계정 복구 채널을 사용하십시오.

## 6.2 서버 액세스 MFA(SSH 2FA / Port Guard)

SSH 2FA 제어는 구성된 TCP 포트를 그룹으로 보호합니다. SSH 포트 22에만 국한되지 않으며 UDP에는 적용되지 않습니다.

> **액세스 제어를 변경하기 전에**
> 의도한 원본 네트워크에서 액세스가 확인될 때까지 독립적인 관리자 세션 또는 테스트된 복구 방법을 유지하십시오.

31. 서버 테이블에서 연필/편집 컨트롤을 엽니다.

32. Agent configuration에서 보호할 TCP 포트를 추가하거나 제거한 다음 Save를 선택합니다. 포트는 1~65535의 정수여야 합니다.

33. 서버 행에서 SSH 2FA를 켜 2FA SSH Guard 설정을 엽니다.

34. QR 코드를 스캔하거나 Manual entry key를 인증 앱에 입력합니다.

35. 계속하기 전에 8개의 Backup / Recovery Codes를 모두 저장합니다. 각 코드는 일회용입니다.

36. Next — Verify Code를 선택하고 현재 6자리 코드를 입력한 다음 Verify를 선택합니다.

37. 2FA verified successfully!를 확인하고 Done을 선택한 다음 Agent configuration을 다시 열어 의도한 포트와 액세스 설정을 확인합니다.

## 6.3 Port Guard로 인증

38. 보호된 서비스에 연결할 동일한 네트워크 원본에서 배포용으로 제공된 Port Guard 주소를 엽니다.

39. 현재 6자리 인증 앱 코드 또는 사용하지 않은 백업 코드 하나를 입력합니다.

40. Unlock Ports를 선택합니다.

41. 페이지에서 포트가 열렸다고 보고하면 즉시 보호된 서비스에 다시 연결합니다.

구성된 보호 TCP 포트는 임시 액세스 기간 동안 함께 승인됩니다. 표시된 기간이 기준이며 생성되는 기본값은 60초입니다. 보호된 서비스에는 여전히 자체 자격 증명이 필요합니다.

> **동일한 원본 네트워크**
> Port Guard용 브라우저와 SSH/데이터베이스/애플리케이션 클라이언트는 관측상 동일한 원본 네트워크에서 온 것으로 보여야 합니다. 네트워크를 변경하면 재인증이 필요할 수 있습니다.

# 7. Server Security 콘솔 사용

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

# 8. 인시던트 및 대응 검토

## 8.1 인시던트

인시던트를 선택하여 Incident details를 엽니다. 심각도, 요약, 가능한 경우 소스 정보, Timeline, Evidence 및 Technical details를 검토합니다.

| **작업** | **효과** |
|---|---|
| Mark investigating | 인시던트 검토 상태를 조사 중으로 변경합니다. |
| Resolve | 인시던트 검토가 완료되었음을 기록합니다. |
| Dismiss | 인시던트를 더 이상 추적하지 않음을 기록합니다. |

> **인시던트 상태는 해결 조치가 아닙니다**
> 인시던트 검토 상태를 변경하는 것만으로는 맬웨어 제거, 공격자 차단 또는 침해된 서버 복구가 이루어지지 않습니다.

## 8.2 대응

| **상태** | **의미** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | 평가를 위해 기록 또는 승인되었으며 적용 여부는 확인되지 않았습니다. |
| APPLIED | 표시된 범위 내에서 대응이 적용된 것으로 기록되었습니다. |
| EXPIRED | 임시 대응이 더 이상 활성 상태가 아닙니다. |
| REVOKED | 대응이 철회되었습니다. |
| FAILED | 요청한 작업이 성공적으로 완료되지 않았습니다. |
| SUPPRESSED | 해당 정책에 따라 대응이 시행되지 않았습니다. |

소스, 작업과 범위, 이유, 상태, 시작 시간 및 만료를 함께 검토하십시오. 새 연결 차단이 이미 설정된 연결을 반드시 종료하는 것은 아닙니다.

# 9. 보안 정책 구성

## 9.1 자동 대응 모드

| **모드** | **동작** |
|---|---|
| Observe | 자동 시행 없이 대상 결정을 기록합니다. |
| Shadow | 임시 차단을 시행하지 않고 대상 탐지를 평가합니다. |
| Enforce | 정책 및 탐지 조건이 활성 상태일 때 승인된 임시 IP 차단을 적용할 수 있습니다. |

일반적인 초기 설치 모드는 Shadow입니다. Enforce를 사용하려면 Enforce를 선택하고 Enable automatic enforcement?를 검토한 다음 Enable Enforce를 확인합니다. Enforce는 대상 탐지에만 적용됩니다.

## 9.2 신뢰할 수 있는 IP

42. Policy → Trusted IPs를 엽니다.

43. Trusted IP or CIDR과 선택적으로 Description을 입력합니다.

44. Add trusted source를 선택합니다.

45. Remove로 항목을 삭제하거나 Move to block으로 명시적 차단으로 변환합니다.

Trusted IPs는 대상 자동 대응 차단에서 원본을 제외합니다. MFA, 국가 제한, Allowed IPs / CIDRs, 서비스 자격 증명 또는 기타 액세스 제어를 우회하지는 않습니다.

## 9.3 허용된 IP / CIDR

46. 서버 행의 연필/편집 컨트롤을 엽니다.

47. Agent configuration의 Allowed IPs / CIDRs에 개별 IPv4/IPv6 주소 또는 CIDR 범위를 쉼표로 구분하여 입력합니다.

48. Save를 선택하고 대화 상자를 다시 열어 패널에 값이 유지되었는지 확인합니다.

저장된 목록이 비어 있으면 Port Guard 주소 확인에서 모든 원본이 인증을 계속할 수 있습니다. 목록이 비어 있지 않으면 일치하는 주소나 범위만 계속할 수 있습니다.

## 9.4 명시적 차단

49. Policy → Explicit blocks를 엽니다.

50. Blocked IP or CIDR, 필수 Reason 및 선택적 Explicit block expiry를 입력합니다.

51. Add explicit block을 선택합니다.

52. Remove로 항목을 삭제합니다. 항목을 수정하려면 삭제한 후 새로 만듭니다.

> **관리자 잠금 방지**
> 차단을 추가하기 전에 동일한 원본 IP 또는 CIDR을 사용할 수 있는 관리자, 모니터링, NAT 및 공유 주소를 확인하십시오.

## 9.5 센서 및 Suricata

Policy → Sensor state에는 Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco 및 Suricata 스위치가 표시될 수 있습니다.

Suricata의 경우 Policy → Suricata monitored interface를 열고 표시된 후보를 선택하거나 ens3 같은 확인된 인터페이스를 입력한 다음 Save interface를 선택합니다. 변경 후 새로운 Suricata 원격 측정을 확인합니다.

# 10. 국가 기반 액세스 제어 관리

## 10.1 서버별 Geo-Country Filtering

서버별 Geo-Country Filtering은 구성된 보호 TCP 포트 그룹에 적용되며 확인된 서버 액세스 MFA가 필요합니다.

53. 보호 TCP 포트를 구성하고 SSH 2FA 설정을 완료합니다.

54. Agent configuration을 열고 Enable Geo-Country Filtering을 켭니다.

55. Default Policy에서 Allow Unmatched 또는 Deny Unmatched를 선택합니다.

56. 유효한 Geo Rules (JSON Array) 값을 입력하고 Save를 선택합니다.

57. Agent configuration을 다시 열어 저장된 스위치, 기본 정책, 규칙, 포트 및 2FA 설정을 확인합니다.



- 구성된 포트의 명시적 규칙은 기본 정책보다 우선합니다.
- allow 규칙은 나열된 국가를 허용하고 해당 규칙에 없는 국가는 거부합니다.

- deny 규칙은 나열된 국가를 거부하고 해당 규칙에 없는 국가는 허용합니다.
- 기본 정책은 명시적 규칙이 없는 구성된 포트에만 적용됩니다.

## 10.2 계정 수준 국가 차단 목록

일반 대시보드의 Blacklist countries는 계정 수준 웹 트래픽 차단 목록이며 서버별 Geo-Country Filtering과 별개입니다.

58. Blacklist countries를 엽니다.

59. Non-Blacklisted를 열고 필요한 경우 국가 이름이나 두 자리 코드로 검색합니다.

60. 국가를 선택하고 Add를 선택합니다. 변경 사항은 즉시 저장됩니다.

61. 국가가 Blacklisted 아래에 표시되는지 확인합니다.

국가를 제거하려면 Blacklisted를 열고 차단된 국가를 선택한 다음 remove를 선택합니다. 해당 국가는 Non-Blacklisted로 돌아갑니다.

# 11. 센서, 인벤토리, 보안 태세 및 결과 검토

## 11.1 센서

| **센서 / 보기** | **보고 내용** |
|---|---|
| Guard | 핵심 보호 신호. |
| File Integrity | 모니터링되는 파일 변경. |
| YARA-X | 맬웨어 패턴 증거. |
| CrowdSec | 동작 기반 보안 탐지. |
| Falco | 런타임 및 시스템 탐지. |
| Suricata | 네트워크 탐지. |
| Inventory / Security Configuration | 인벤토리 및 평가 데이터. |

센서 탐지는 증거입니다. 자동 임시 대응은 활성화된 대응 정책에 따라 대상 탐지에 대해서만 발생합니다.

## 11.2 인벤토리 및 취약성 인텔리전스

Inventory에는 패키지 이름, 버전, 에코시스템, 아키텍처 및 마지막 관측 시간이 표시될 수 있습니다. Search packages로 고객용 패키지 테이블을 필터링합니다. Inventory는 정보 제공용이며 패키지를 패치하거나 취약성을 해결하지 않습니다.

> **비어 있거나 오래된 데이터를 신중하게 해석하십시오**
> 비어 있음, 사용 불가, 알 수 없음 또는 오래된 인벤토리/취약성 정보는 서버에 패키지나 취약성이 없다는 증거가 아닙니다.

## 11.3 보안 태세

Security Configuration Assessment 결과와 취약성 인텔리전스 상태는 Posture에서 확인합니다. 결과에는 실패하거나 퇴행한 검사 및 제공된 지침이 표시될 수 있습니다. Posture는 평가 보기이며 서버를 자동으로 해결하지 않습니다.

# 12. 이벤트 및 원격 측정 모니터링

Events를 열고 사용 가능한 필터를 사용합니다.

- 센서로 필터링합니다.
- 정확한 이벤트 유형을 사용하여 이벤트 유형으로 필터링합니다.

- 심각도로 필터링합니다: All severities, critical, high, medium, low 또는 info.
- Previous와 Next로 페이지를 이동합니다.

표시되는 이벤트 이름, 소스, 유형, 증거, 심각도, 타임스탬프 및 연결된 인시던트를 검토합니다.

# 13. 문제 해결

> **첫 번째 원칙**
> 액세스 제어를 변경하는 동안 독립적인 관리자 액세스를 유지하십시오. 기밀이 아닌 오류 텍스트를 기록하고 등록 코드, MFA 비밀 정보, 백업 코드, 개인 키 또는 이를 포함한 스크린샷을 공유하지 마십시오.

| **상황** | **권장 조치** |
|---|---|
| 패키지 설치 실패 | 선택한 패키지가 OS/아키텍처와 일치하는지 확인하고 다시 다운로드하여 표시된 SHA-256과 비교한 후 복사한 명령을 관리자 권한으로 실행합니다. RPM은 서명 확인을 활성화합니다. |
| 등록 코드 만료 | 이전 코드가 사용되지 않았거나 패널에서 명시적으로 교체를 허용할 때만 새 코드를 생성합니다. 이후 실패 전에 코드가 승인되었고 서버가 enrolled로 표시되면 Setup / recovery를 사용합니다. |
| 보호가 활성 상태로 확인되지 않음 | Overview를 열고 Server protection, Provisioning, Sensor health 및 Guard access security를 검토합니다. PENDING, DEGRADED, FAILED 또는 CONFIGURATION REQUIRED에 표시된 이유를 따릅니다. |
| Policy에 Saved · pending activation 표시 | 정책을 저장되었지만 아직 활성화되지 않은 것으로 취급합니다. 활성화가 완료될 때까지 이전의 안전한 구성과 관리자 액세스를 유지합니다. |
| MFA 설정 실패 | 인증 앱 시간을 확인하고 현재 6자리 코드를 사용하며 의도한 포트를 확인하고 기존 관리자 세션을 열어 둡니다. |
| Port Guard 잠금 해제 후 서비스 접근 불가 | 즉시 다시 연결하고 브라우저/클라이언트가 동일한 관측 원본을 사용하는지 확인하며 보호 포트와 서비스 자격 증명을 확인하고 Allowed IPs, 국가 규칙, 명시적 차단, 자동 대응 및 네트워크 정책을 검토합니다. |
| 인증 앱 액세스 상실 | 가능한 경우 사용하지 않은 백업 코드를 사용한 후 조직의 승인된 복구 절차를 사용합니다. |
| IP 또는 국가 제한이 예기치 않게 동작 | 제어 기능을 식별하고 원본 주소와 포트를 확인하며 규칙 우선순위와 만료를 검토하고 다른 규칙을 추가하기 전에 관리자 잠금 여부를 확인합니다. |
| 센서 원격 측정 누락 또는 오래됨 | Sensors를 열고 센서 상태와 Last signal을 검토하며 해당하는 경우 Suricata 인터페이스 같은 구성을 확인합니다. |
| 패키지 인벤토리가 비어 있음 | Search packages를 사용하고 패키지 테이블을 다른 인벤토리 활동과 비교합니다. 빈 테이블은 패키지가 없다는 증거가 아니라 불완전한 정보로 취급합니다. |

# 14. 보안 및 운영 모범 사례

- 신뢰 및 허용 원본에는 실용적인 범위에서 가장 좁은 IP/CIDR 범위를 사용합니다.
- MFA, 명시적 차단 또는 국가 제한을 활성화할 때 테스트된 관리자 복구 경로를 유지합니다.

- 패널에서 적절한 active/healthy 상태를 보고하고 최근 원격 측정이 이를 뒷받침할 때까지 저장된 구성에 의존하지 마십시오.
- 센서 탐지를 조사할 증거로 취급하고 모든 탐지가 자동으로 차단되었다고 가정하지 마십시오.

- 자동 차단이 여전히 활성이라고 가정하기 전에 대응 만료를 검토합니다.
- 승인된 운영 절차에서 명시적으로 요구하지 않는 한 복구 방법으로 보안 파일이나 서비스를 수동 제거하지 마십시오.

# 부록 A — 빠른 상태 참조

| **항목** | **고객 해석** |
|---|---|
| Registered | 서비스 레코드가 존재합니다. |
| Installed | 네이티브 패키지가 설치되었습니다. |
| Enrolled | 일회용 등록 코드가 승인되었습니다. |
| Installation complete | 프로비저닝이 설치 완료 단계에 도달했습니다. 현재 Overview 상태와 원격 측정을 확인하십시오. |
| Saved · pending activation | 변경 사항이 패널에 저장되었지만 아직 활성 상태로 간주해서는 안 됩니다. |
| SSH 2FA: Active | 해당 행의 인증 앱 설정이 완료되었습니다. 의도한 보호 포트와 현재 보호 상태를 확인하십시오. |
