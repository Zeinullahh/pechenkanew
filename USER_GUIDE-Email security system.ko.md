# 통합 이메일 플랫폼 사용자 안내서

플랫폼은 세 가지 독립 제품으로 구성됩니다. **Admin Console / Silence 365 Email Visualizer**는 메일 도메인, 메일 흐름, 위협 및 조직을 관리합니다. **Email Protector**는 안전한 웹메일, 메시지 분류, 첨부 파일 검사, 폴더 및 메일 이전을 제공합니다. **WebSOC / AI-SOC Web**은 웹 도메인을 보안 게이트웨이에 연결하고 트래픽, 국가별 제한 및 잔액을 관리합니다. 화면과 기능은 역할, 요금제, 조직 설정에 따라 달라집니다. 세 콘솔의 주소는 조직 관리자에게 받고, 다른 콘솔의 주소로 로그인하지 마세요.

## 목차

1. [플랫폼 개요](#1-platform-overview)
2. [계정 접속](#2-account-access)
3. [Admin Console — Silence 365 Email Visualizer](#3-admin-console-silence-365-email-visualizer)
4. [Email Protector](#4-email-protector)
5. [WebSOC / AI-SOC Web](#5-websoc-ai-soc-web)
6. [일반적인 문제](#6-common-issues)
7. [보안 권장 사항](#7-security-recommendations)
8. [용어집](#8-glossary)
9. [지원팀 문의](#9-contacting-support)

## 1. 플랫폼 개요

### 1.1 작업에 맞는 제품

| 작업 | 제품 |
|---|---|
| 메일 도메인 추가 및 MX, SPF, DKIM, DMARC 설정; 메일 흐름과 위협 확인; 직원, 부서, 회사 메일 서버 관리 | Admin Console. 관리 작업에는 관리자 권한 필요 |
| 메일 읽기·보내기·정리; 분류와 첨부 파일 검사 결과 확인; 다른 메일 서비스에서 이전 | Email Protector |
| 웹 도메인 보안 게이트웨이 연결; RPS, 대역폭, 활성 IP, 국가별 트래픽 확인; 국가 또는 허용 포트 제한 | WebSOC |

### 1.2 역할과 접근 권한

| 역할 | 주요 권한 |
|---|---|
| 이메일 사용자 | 자신의 메시지, 폴더, 개인 설정 관리 |
| 조직 관리자 | 직원, 부서, 도메인, 공통 서명, 보호 설정 관리 |
| 도메인 관리자 | DNS 및 메일 서버 설정과 도메인 상태 확인 |
| WebSOC 관리자 | 웹 도메인 연결 및 원본 서버 주소와 국가 목록 변경 |
| 플랫폼 직원 | 합의된 고객 가격 관리. 일반 고객은 접근 불가 |

필요한 항목이 없거나 접근이 거부되면 조직 관리자에게 문의하세요. 제한을 우회하기 위해 다른 사람의 계정을 사용하지 마세요.

### 1.3 시작 전 준비

작업에 따라 콘솔 주소, 정상 계정, 2FA 인증 앱, 도메인의 DNS 관리 권한, WebSOC 연결을 위한 웹사이트·DNS 변경 권한, 원본 웹 서버 이름이나 주소, 메일 이전용 외부 계정 정보 또는 Microsoft 승인, 잔액 충전 시 결제 권한을 준비합니다.

> 중요: DNS 값, IP 주소, 확인 키, 금액은 반드시 본인 콘솔에서 확인하세요. 예시나 다른 고객의 값을 복사하지 마세요.

## 2. 계정 접속

### 2.1 공통 로그인 규칙

각 콘솔에는 별도의 로그인 화면과 세션이 있습니다. SSO가 활성화되어 있으면 **AI-CSD**로 이동하거나 **Sign in with AI-CSD / Sign in**이 표시됩니다. 관리자가 제공한 제품 주소를 열고 가능한 방법을 선택합니다. SSO, Google, Microsoft를 사용하면 해당 제공업체에서 인증을 마치고, 2FA 화면이 열리면 6자리 코드를 입력합니다. 로그인 후 프로필에 올바른 계정이 표시되는지 확인하세요.

### 2.2 Admin Console 접속

**Sign in**을 통한 이메일·비밀번호 로그인, **Continue with Google**, **Continue with Outlook**, SSO 활성화 시 **Sign in with AI-CSD / Sign in**이 제공될 수 있습니다.

고객 계정을 만들려면 **Create account**를 선택하고 **Monthly** 또는 **Yearly**와 현재 화면의 이름·한도·가격을 기준으로 요금제를 고릅니다. 사용자 이름과 이메일을 입력하고 이메일 칸 옆 버튼으로 확인 코드를 보냅니다. 받은 코드와 비밀번호를 입력하고 필요하면 등록 완료 전에 프로모션 코드를 넣은 뒤 가입하고 로그인합니다.

로컬 계정에서는 2FA를 설정합니다. **Set Up Two-Factor Authentication**에서 인증 앱으로 QR 코드를 스캔합니다. 불가능하면 **Can't scan? Enter key manually**를 선택해 표시된 키를 추가합니다. 6자리 코드를 입력하고 **Activate 2FA**를 선택합니다. 다음 로그인부터는 **Two-Factor Authentication**에 코드를 넣고 **Verify**를 선택합니다.

### 2.3 Email Protector 접속

SSO가 자동으로 시작되거나 **Continue with Google**, **Continue with Microsoft**, **Email**과 **Password**를 사용하는 **Sign in**, **Login with QR Code**가 표시될 수 있습니다. 로컬 계정은 보통 조직 관리자가 생성합니다. 첫 로그인 때 임시 비밀번호 변경, 2FA 설정, 6자리 코드 확인이 필요할 수 있습니다. QR 로그인은 **Login with QR Code**를 선택하고 두 번째 승인된 기기에서 표시된 코드를 스캔한 다음 확인 페이지에서 로그인 승인을 합니다.

### 2.4 WebSOC 접속

가입: **Welcome**에서 **Register**를 선택하고 **Email**, **Username**, 비밀번호, **Confirm password**를 입력합니다. 필요한 경우 **Recovery password**, **Recovery email**, **Promocode**도 입력합니다. 나이와 약관 동의를 확인하고 **Continue**를 선택합니다. **Set up 2FA**에서 QR 코드를 스캔하거나 비밀 키를 직접 입력한 뒤 **6-digit code**를 넣고 **Verify and finish**를 선택합니다. WebSOC 비밀번호와 복구 비밀번호에는 라틴 대문자 한 개 이상과 숫자 한 개 이상이 필요하며, 라틴 문자와 숫자만 사용할 수 있습니다.

평소 로그인: **Log in**을 선택하고 **Email or Username**, **Password**를 입력한 뒤 **Continue**를 선택합니다. **Two-factor authentication**에 코드를 넣고 **Verify and continue**를 선택합니다. 비밀번호를 잊었다면 **Forgot password?**에서 이메일 코드를 요청하고 코드와 새 비밀번호를 입력합니다. **Resend code**는 코드를 다시 보냅니다.

## 3. Admin Console — Silence 365 Email Visualizer

### 3.1 초기 설정

직접 등록한 고객 계정은 요금제를 고르고 **Initial domain mail setup**을 완료합니다. 마법사는 **Domain**, **DNS verification**, **Security**, **Ready**의 네 단계이며 진행 상태는 도메인별로 저장됩니다. 조직이 Google 또는 Outlook만 사용하고 **Use AI-SOC as security layer (Gmail/Outlook only)**가 있으면 호스팅 도메인 메일 설정 없이 진행할 수 있습니다. 먼저 도메인 관리자와 합의하세요.

### 3.2 도메인 추가 및 확인

**Step 1. Add domain**에 `https://`나 경로를 제외한 도메인을 입력하고 **Continue**를 선택합니다. **Step 2. Verify domain via DNS**에서 **TXT name**과 **TXT value**를 복사해 DNS 관리 화면에 TXT 레코드를 만듭니다. DNS 전파를 기다린 뒤 **Check now**를 선택합니다. 마법사도 주기적으로 확인하며, **Verified**가 표시된 뒤에만 진행합니다. 일부 DNS 화면은 Name에 도메인을 자동으로 덧붙이므로, 접미사가 중복되지 않도록 콘솔 안내를 따르세요.

### 3.3 MX, SPF, DKIM, DMARC 설정

**Step 3. Security setup**에 정확한 레코드가 나옵니다. MX는 수신 서버, SPF는 허용 발신 출처, DKIM은 발신 서명 확인용 키, DMARC는 SPF 또는 DKIM 실패 메일의 정책과 보고를 정의합니다. 필요하면 레코드를 생성하고 **Type**, **Name/Host**, **Value**, **Priority**, **TTL**을 정확히 복사해 DNS에 생성하거나 수정합니다. 전파 후 **Verify**를 선택해 **Configured**를 확인합니다. DMARC가 요청하는 RUA와 RUF 별칭은 각각 집계 및 실패 보고를 받을 주소입니다.

> 중요: 기존 SPF를 바꾸기 전에 메일 관리자와 협의하세요. 같은 이름에 여러 SPF 레코드가 있으면 발신자 확인이 실패할 수 있습니다.

**Not configured**는 미발견, **Update required**는 권장값과 다름, **Configured**는 예상값과 일치, **Pending verification**은 변경 미감지, **Error**는 확인 실패를 뜻합니다. 모두 설정한 후 **Step 4. Ready**로 이동해 **Go to dashboard**를 선택합니다.

### 3.4 도메인 관리

관리자는 **Domains**와 **Domain management**에서 도메인 추가, 확인 토큰 복사, **Verify** 재실행, MX/SPF/DKIM/DMARC의 개별 상태 확인, **Set default**, 허용 SMTP 서버 IP 입력, **DNS setup** 열기, 이름 변경, 삭제를 할 수 있습니다. 삭제 전 직원과 메일 클라이언트가 더 이상 도메인을 사용하지 않는지 확인하세요. 삭제에는 별도 확인이 필요합니다.

### 3.5 대시보드와 메일 흐름

그래프는 직원·부서·도메인을 노드로, 메일 교환을 연결선으로 보여 줍니다. **Incoming** 또는 **Outgoing**을 선택하고 **Time range**에서 최근 1시간, 3/6/12/24시간, 전체 또는 직접 지정한 기간을 선택합니다. 필요하면 **Filter**에 발신자, 수신자, 제목, 본문, 첨부 조건을 넣고 **Apply filters**를 선택합니다. 노드를 선택해 관련 메시지를 열고 검색 및 **Newest first** / **Oldest first** 정렬을 사용한 뒤 본문, 헤더, 첨부 파일을 확인합니다. 부서와 도메인 분석 카드도 제공됩니다. 직접 지정한 기간의 종료 시점은 미래일 수 없고 시작 시점은 종료보다 앞서야 합니다.

### 3.6 위협 분류

대시보드 하단 화살표로 **Threat categories**를 엽니다. **Possibly spoofed**는 발신자 또는 도메인 사칭 가능성, **Spam**은 원치 않는 메일, **Dangerous link**는 잠재적으로 위험한 링크, **Possibly phishing**은 자격 증명이나 결제 정보를 노리는 가능성, **Malware in the attachment**는 첨부 파일의 위험한 항목, **Secure emails**는 알려진 위협 징후가 없음을 뜻합니다. 카드의 **Click to view**로 발신자, 수신자, 날짜, 내용, 원문, 첨부 정보를 봅니다. 첨부 상태는 **Safe**, **Suspicious**, **Malware detected**, **Pending scan**입니다. Trash로 이동하는 것과 **Delete permanently**는 다릅니다. 영구 삭제 전 선택한 메시지를 확인하세요.

### 3.7 직원 및 관리자

**Settings** → **Employees** → **+ Add** → **Create manually**에서 필수 이메일, 이름, 성 등 정보를 입력합니다. Google, Microsoft, 내부 계정 중 로그인 방식을 확인하고 필요하면 주소, 전화번호, 별칭을 추가한 뒤 **Create**를 선택합니다. 일괄 추가는 **Upload employee list**에서 **Download CSV template**을 내려받고 구조를 유지해 **Import**한 후 **Created**와 **Skipped**를 확인합니다. 직원 메뉴에는 **Edit**, 내부 계정용 **Change password**, **Edit aliases**, **Make administrator** / **Revoke administrator rights**, **Delete**가 있을 수 있습니다. 조직 관리에 실제로 필요한 경우에만 관리자 권한을 부여하세요.

### 3.8 부서

**Settings** → **Departments**에서 고유한 이름으로 부서를 만들고 구성원 목록을 열어 직원을 추가합니다. 제거 기능으로 직원을 부서에서 빼낼 수 있습니다. 삭제 전 구성원과 시각화에 미치는 영향을 확인하세요.

### 3.9 일반 보호 설정

관리자 전용 **Security** 탭에는 **Enable phishing detector**, **Enable attachment virus scanning**, 도메인·주소용 **Block management**, 회사 메일 서버 설정 링크가 있을 수 있습니다. 스위치를 변경한 뒤 저장 완료를 기다리고 새 상태가 유지되는지 확인하세요.

### 3.10 회사 메일 서버

**Company Email Servers**에서 **IMAP server**, **IMAP port**, **IMAP security**를 입력하고 필요하면 **SMTP server**, **SMTP port**, **SMTP security**도 입력합니다. 서버 설정에 맞춰 **SSL/TLS** 또는 **STARTTLS**를 선택하고 저장한 뒤 메일 클라이언트 매개변수를 확인합니다. SMTP를 생략하면 외부 클라이언트는 IMAP으로 수신할 수 있지만 발신은 웹 앱에서만 가능합니다. **None / plain text**는 채널 보호 없이 전송하므로 격리된 신뢰 네트워크에서 보안 관리자의 결정에 따라서만 사용하세요.

### 3.11 조직과 AI 설정

**General**에서 언어와 시간대를 설정하고 권한이 충분하면 조직명과 로고를 바꿀 수 있습니다. **AI Agent**가 제공되면 관리자는 제공업체와 모델을 고르고 지원되는 구성에서만 엔드포인트를 입력하며, 접근 키를 안전하게 보관하고 저장 후 내장 연결 테스트를 실행할 수 있습니다. 키를 직원에게 공유하거나 화면 캡처에 노출하지 마세요.

### 3.12 요금제, 지갑, 결제

프로필 메뉴에는 **Balance**, **Top Up Balance**, **Manage Plan**이 있습니다. 충전할 때 표시된 통화와 최솟값·최댓값을 확인하고 금액을 입력해 **Pay**를 선택한 뒤 안전한 결제 페이지에서 마치고 잔액을 확인합니다. 요금제 변경 시 사용자·관리자·저장 공간·AI 작업 한도를 비교하고 월간 또는 연간 결제와 요금제를 고른 뒤 활성화·전환 비용을 확인해 확정합니다. 가격과 통화는 배포 환경과 고객 계약에 따라 다르므로 본인 콘솔의 값만 사용하세요.

## 4. Email Protector

### 4.1 주요 화면

로그인하면 폴더 목록, 메시지 목록, 읽기 및 보안 상세 영역, **Compose**, 검색, 계정 전환, **Settings**, 언어·로그아웃 메뉴가 있습니다. 시스템 폴더에는 **All mail**, **Important**, **Inbox**, **Sent**, **Drafts**, **Scheduled**, **Trash**가 포함될 수 있습니다. Security 영역에는 조직에서 사용 가능한 격리 및 오류 폴더, **My folders**에는 사용자 폴더가 있습니다.

### 4.2 메시지 읽기 및 검사

폴더와 메시지를 선택하고 발신자, 수신자, 제목, 날짜, 색상 표시, 보안 분류를 확인합니다. **Attachments**를 펼쳐 각 파일의 상태를 확인하고 필요하면 **Show details** 또는 **Show source text**를 선택합니다. **Secure**라도 일반적인 주의를 유지합니다. **Spam**이면 발신자를 확인하고 원치 않는 메일에 답하지 않습니다. **Possibly Spoofed**이면 별도 경로로 발신자 신원을 확인합니다. **Possibly Phishing**이면 링크를 열거나 자격 증명을 입력하지 않습니다. 위험한 링크는 전문가 검토 전 열지 않고 위험한 첨부 파일은 내려받거나 실행하지 않습니다.

첨부 상태 **Clean**은 다운로드 가능, **Suspicious**는 상세 확인 및 필요 시 관리자 문의, **Download blocked**는 우회 금지, **Scanning…**은 완료 대기, **Not scanned**는 추가 검사 없이 열지 말라는 뜻입니다. **Clean**도 메시지 맥락, 발신 주소, 첨부가 예상된 것인지 확인해야 합니다.

### 4.3 검색과 목록 작업

**Search emails...**에 텍스트를 입력하고 **All**, **Secure**, **Spam**, **Spoofing**, **Threats found** 필터를 사용합니다. 별표로 **Important**에 추가하고 폴더 메뉴에서 사용자 폴더로 옮기거나 **Inbox**로 되돌립니다. 여러 메시지를 선택해 Trash로 한꺼번에 옮길 수 있습니다. **Trash**에서 **Restore** 또는 영구 삭제를 선택하고 목록이 일부만 나오면 **Load more**를 선택합니다. 영구 삭제는 취소할 수 없으므로 폴더와 대상 메시지를 먼저 확인하세요.

### 4.4 작성과 발송

**Compose**를 선택하고 **To**, 필요 시 **Cc**·**Bcc**, 제목과 본문을 채웁니다. 첨부 버튼으로 파일을 넣습니다. 나중에 보내려면 **Schedule send**에서 미래 날짜와 시각을 지정하고 **Send email**을 선택합니다. **Drafts**의 초안을 수정해 보낼 수 있고 **Scheduled**의 예약 메일은 전송 전 화면의 해당 기능으로 확인·취소할 수 있습니다.

### 4.5 열린 메시지 작업

메시지와 권한에 따라 **Important** 설정·해제, 전체 보기, 폴더 이동, 원문 보기, 번역 및 원문 복귀, AI 답장 초안, 지원되는 링크가 있는 경우 수신 거부, Trash 이동이 가능합니다. 수신 거부 전 발신자를 확인하고 명백한 피싱 메일의 수신 거부 링크는 사용하지 마세요.

### 4.6 사용자 폴더와 규칙

**New folder** 또는 **Create folder**를 선택하고 **Folder name**을 입력합니다. 해당 폴더에 넣을 주소·도메인을 **Inclusion rules**에, 예외를 **Exclusion rules**에 추가한 뒤 **Save**합니다. 제외 규칙이 우선합니다. 폴더 메뉴에서 이름·규칙을 바꾸거나 삭제할 수 있으며 삭제 전 화면 경고를 읽으세요.

### 4.7 계정 전환

계정 메뉴에서 다른 승인된 계정을 추가하고 전환할 수 있습니다. **Add account**를 선택하고 Google·Microsoft는 제공업체에서 로그인하며, 로컬 계정은 이메일과 비밀번호 및 요구되는 2FA 코드를 입력합니다. 목록에서 대상 계정을 선택합니다. 현재 활성 계정은 목록에서 제거할 수 없으며 로컬 계정으로 바꿀 때 비밀번호를 다시 요구할 수 있습니다.

### 4.8 메일함 설정

**Settings**를 열고 필요한 영역을 선택합니다.

#### 일반

**Sender name**, 보낸 메일 폴더, 시간대, 날짜 형식을 설정하고 **Save**합니다.

#### 서명

**Add to outgoing emails**를 켜고 편집기에서 서명을 만든 뒤 **Signature preview**를 보고 저장합니다.

#### 자동 응답

**Autoresponder**를 켜고 시작·종료일과 답장 내용을 입력합니다. 필요하면 **Reply once per sender**를 켜고 미리 보기를 확인한 후 저장합니다.

#### 전달

전달 주소를 입력해 **Add**를 선택하고 **Keep a copy in Inbox** 여부를 정한 후 저장합니다.

#### 차단된 발신자

주소를 입력해 **Block sender**를 선택하면 해당 발신자의 메일이 자동으로 Spam으로 이동합니다. **Unblock**으로 해제합니다.

#### 계정 관리

저장된 계정의 표시 이름과 이메일을 변경하거나 사용하지 않는 계정을 목록에서 제거합니다.

#### 저장 공간

사용 공간과 할당량 비율을 확인합니다. 90%를 넘으면 불필요한 메시지와 첨부를 지우거나 요금제에 관해 관리자에게 문의합니다.

#### 화면과 동작

Trash 자동 삭제 기간, 사용자 배경과 흐림, 유리 효과, 읽음 표시 동작, 미리 보기 창, 대화 모드, 작성 글꼴과 크기 등이 제공될 수 있습니다.

### 4.9 메일 이전

**Account settings** → **Email migration** → **Start migration**을 엽니다. **Gmail**, **Outlook**, **iCloud**, **Custom IMAP**을 지원합니다. Gmail 또는 iCloud는 제공업체와 외부 메일함을 선택하고, 요구되면 기본 비밀번호 대신 제공업체에서 만든 앱 비밀번호를 넣은 뒤 **Start Migration**을 선택합니다. Outlook은 **Connect Outlook Account**에서 Microsoft 접근을 승인합니다. **Custom IMAP**은 **IMAP Server**와 **Port**도 입력합니다. 진행률, 처리된 메시지 수, 현재 폴더가 표시되며 **Pause**와 **Resume**로 제어합니다. 완료 시 **Migration Complete!**가 보입니다. 끝나기 전에 메일 접근 권한이나 앱 비밀번호를 취소하지 마세요.

### 4.10 AI 기능

관리자가 활성화하면 메시지의 AI 아이콘으로 답장 초안을 만들 수 있습니다. **AI auto reply**는 생성된 답장을 검토용 초안으로 저장하고, AI Assistant는 메일을 요약·설명하거나 답장을 준비합니다. 자동 발송은 조직 정책에 따라야 합니다. 발송 전 수신자, 사실, 첨부, 어조를 확인하세요. 비밀, 비밀번호, 관계없는 개인정보를 제공하지 마세요.

### 4.11 Calendly

**Calendly**에는 **Connected** 또는 **Not connected**가 표시됩니다. Calendly 통합에서 개인 토큰을 만들어 **Calendly API token**에 입력하고 **Connect Calendly**를 선택해 **Connected**를 확인합니다. **Disconnect Calendly**로 연결을 종료합니다. 토큰을 비밀로 보관하세요.

### 4.12 사용자 관리와 공통 서명

관리자는 허용된 사용자와 회사 서명을 관리합니다. **Company Signatures**에서 **New**를 선택하고 **Signature Name**을 입력한 뒤 적용 범위를 **Company**, **Domain**, **Department**, **User**에서 고릅니다. 내용을 입력해 **Preview**를 확인하고 **Active**를 켠 후 **Create** 또는 **Save**를 선택합니다. 수정할 때 대상 도메인·부서·사용자를 확인하세요. 공통 서명 삭제에는 별도 확인이 필요합니다.

## 5. WebSOC / AI-SOC Web

### 5.1 도메인 연결

WebSOC는 연결 객체를 “agent”라고 부르지만 사용자 마법사는 도메인과 원본 웹 서버를 설정합니다. 검증되지 않은 명령으로 소프트웨어를 설치할 필요가 없습니다. **Data source selection**에서 **Add new agent** 또는 **Register new agent**를 선택하고 **Domain**에 보호할 도메인, **IP address**에 현재 원본 호스트 또는 서버 IP를 입력해 **Register**를 선택합니다.

#### 1단계. 사이트 소유권 확인

**Step 1. Add ownership meta tag on your origin website**에서 **Copy tag**를 선택하고 표시된 메타 태그를 홈페이지의 `<head>`에 넣어 게시한 뒤 도메인 이름으로 공개 접근되는지 확인합니다. **Copy key**는 키 값만, **Copy tag**는 전체 태그를 복사합니다.

#### 2단계. ACME 위임

**Step 2. Add ACME delegation CNAME**의 **Name**과 **Hostname (target)**을 복사해 CNAME을 만들고 DNS 전파를 기다린 뒤 **Verify ownership and DNS**를 선택합니다. **Ownership and DNS verified**가 성공 표시이지만 트래픽 라우팅은 아직 비활성일 수 있습니다.

#### 3단계. 트래픽 전환

확인 후 **Step 3. DNS A record to add (switch traffic through WebSOC)**가 나타납니다. **Name**과 **IP address**를 복사하고 WebSOC 원본이 정확하며 허용 포트에서 응답하는지 확인합니다. 표시된 값으로 A 레코드를 만들거나 수정하고 전파 후 **Domain setup details**의 **DNS routing**을 확인합니다. A 레코드 변경은 사용자 트래픽을 전환합니다. 승인된 변경 시간에 진행하고 복구를 위해 DNS와 원본 서버 접근을 유지하세요.

### 5.2 도메인 상태

**Delegation not verified**는 메타 태그 또는 CNAME 미확인, **Delegation verified / DNS pending**는 소유권과 위임 확인 완료지만 A 레코드가 WebSOC를 경유하지 않음, **Active**는 위임과 DNS 라우팅이 모두 활성이라는 뜻입니다. 원형 화살표는 확인을 반복하고 문서 버튼은 모든 필요 값이 있는 **Domain setup details**를 엽니다.

### 5.3 원본 서버 설정

**Data source selection**에서 도메인의 연필을 선택하고 **Agent configuration**의 **IP address**를 확인합니다. 새 원본 호스트 또는 IP를 입력하고 **Save**를 선택한 뒤 **Configuration updated successfully!**를 기다립니다. 변경 전 새 원본에 접속 가능하고 올바른 도메인을 제공하는지 확인하세요.

### 5.4 도메인 선택과 트래픽 지도

**Data source selection**에서 분석할 도메인을 선택합니다. 오른쪽의 **RPS**는 초당 요청 수, **Bandwidth**는 전송 데이터량, **Active Users**는 활성 IP 수입니다. 지구본의 국가에 포인터를 놓으면 선택한 도메인의 해당 국가 자료를 볼 수 있습니다. 색상 강도는 선택 지표로 국가를 비교합니다. 추세는 현재 색상뿐 아니라 차트도 보세요.

### 5.5 차트와 상위 국가

하단 화살표로 **Server load chart**를 엽니다. 기간은 **1 day**, **2 days**, **7 days**, **14 days**, **1 month**, **3 months**입니다. 활성 IP, 대역폭, RPS가 높은 국가도 나옵니다. 차트 영역 선택은 관련 지표의 기간을 좁힙니다. 오해를 피하려면 동일한 도메인과 기간을 비교하세요.

### 5.6 이상 알림

이상이 감지되면 화면 위에 빨간 알림창이 나타납니다. 내용을 읽고 도메인과 시각을 기록한 뒤 **OK**를 선택합니다. 창을 닫는 것은 읽었다는 확인일 뿐 원인을 해결하지 않습니다. 차트와 원본 서비스를 확인하고 필요하면 보안 관리자에게 보고하세요.

### 5.7 국가 차단 목록

**Country blacklist**를 선택하고 **Not blacklisted**를 열거나 국가를 검색합니다. 국가를 선택해 **Add**하고 **Blacklisted**에 표시되는지 확인합니다. 되돌리려면 **Blacklisted**에서 국가를 골라 **delete**를 선택합니다. 추가 전에 해당 국가의 직원, 고객, 외부 감시 및 결제 시스템을 확인하고 허용된 국가에서 관리자 접근을 유지하세요.

### 5.8 언어와 테마

왼쪽 위 메뉴에서 **Globe style**, **Select language**, **Payment history**, **Promo code**를 사용할 수 있습니다.

### 5.9 잔액과 결제

프로필 메뉴에서 잔액을 봅니다. **Top up balance**를 선택하고 표시된 최소 금액 이상을 입력해 **Create payment**를 누른 뒤 안전한 결제창에서 마치고 잔액 갱신을 기다립니다. 메뉴의 **Payment history**에서 내역을 봅니다. **Completed**는 입금 완료, **Pending**은 처리 중, **Failed**는 결제 미완료입니다. **Promo code**에 프로모션 코드를 넣습니다. **Locked**는 해당 계정에서 변경할 수 없다는 뜻입니다.

### 5.10 도메인 삭제

도메인 옆 휴지통 아이콘으로 확인 후 삭제합니다. 먼저 DNS를 원본으로 되돌릴 정보를 보관하고 WebSOC가 더 이상 도메인을 제공하지 않아야 하는지 확인하세요.

## 6. 일반적인 문제

### 6.1 로그인할 수 없음

올바른 콘솔인지, SSO·Google·Microsoft·로컬 계정 중 맞는 방식을 쓰는지 확인합니다. 키보드 배열과 이메일을 확인하고 가능한 경우 로컬 계정 비밀번호 복구를 사용합니다. 권한이 없다면 조직 관리자에게 문의하세요.

### 6.2 2FA 코드 거부

이전 코드가 만료됐을 수 있으므로 새 인증 앱 코드를 입력하고 휴대전화의 날짜와 시간을 자동으로 설정합니다. 인증 앱에서 맞는 계정을 고르고 앱 코드를 요구할 때 SMS 코드를 쓰지 않습니다. 반복 실패하면 재시도를 멈추고 지원팀에 문의하세요.

### 6.3 확인 또는 복구 코드가 오지 않음

이메일 주소, Spam, Quarantine을 확인합니다. 몇 분 기다렸다가 한 번만 재전송합니다. 조직에서 시스템 메일을 필터링한다면 메일 관리자에게 문의하세요.

### 6.4 Admin Console 도메인이 대기 중

TXT 이름과 값을 문자별로 비교하고 DNS 화면에서 도메인을 두 번 붙이지 않았는지, 올바른 DNS 영역인지 확인합니다. 전파를 기다리고 **Check now**를 선택합니다.

### 6.5 SPF, DKIM, DMARC 또는 MX 확인 실패

Admin Console의 레코드를 다시 열어 종류, 이름, 값, 우선순위, TTL을 비교합니다. SPF는 같은 이름의 충돌, DKIM은 선택자와 `_domainkey`, DMARC는 `_dmarc`와 보고 주소, MX는 대상 호스트와 우선순위를 확인합니다. 수정 후 DNS 전파를 기다려 **Verify**를 선택합니다.

### 6.6 메시지나 지표가 갱신되지 않음

가능하면 **Refresh**를 선택하고 폴더, 도메인, 방향, 기간, 너무 좁은 필터, 활성 계정을 확인합니다. 페이지를 새로 고침한 뒤 다시 시도하세요.

### 6.7 첨부 파일 차단

검사를 우회하려고 보호를 끄거나 발신자에게 파일 이름 변경을 요청하지 마세요. 비밀 내용을 공개하지 말고 발신자, 제목, 수신 시각, 파일명, 표시된 검사 상태와 상세 내용을 관리자에게 알려주세요.

### 6.8 메일 이전 연결 실패

제공업체를 확인하고 Gmail·iCloud는 유효한 앱 비밀번호, Outlook은 **Connect Outlook Account** 재실행, **Custom IMAP**은 서버·포트·이메일·비밀번호를 확인합니다. 일시 중지됐다면 **Resume**을 선택합니다.

### 6.9 WebSOC 도메인 확인 실패

접근 가능한 원본 페이지에 메타 태그가 게시됐는지, CNAME의 Name과 Hostname이 **Domain setup details**와 일치하는지 확인합니다. DNS 전파 후 **Verify ownership and DNS** 또는 재시도 아이콘을 선택합니다. 이미 **Delegation verified / DNS pending**이면 A 레코드를 별도로 확인하세요.

### 6.10 WebSOC 변경 후 접근 불가

자국이 **Country blacklist**에 추가됐는지와 원본 호스트 또는 IP가 맞는지 확인합니다. 남겨 둔 관리자 경로로 잘못된 제한을 취소하세요.

### 6.11 결제 대기 상태 지속

즉시 다른 결제를 만들지 마세요. **Payment history**를 확인하고 처리 후 잔액을 새로 고칩니다. 변함없으면 지원팀에 시각, 금액, 거래 ID를 제공하세요. 카드 번호, CVC, 확인 코드는 보내지 마세요.

## 7. 보안 권장 사항

- 비밀번호 관리자에 저장한 고유 비밀번호를 쓰고 2FA 비밀과 인증 기기를 보호하세요.
- 확인 코드, 복구·앱 비밀번호, AI 키, Calendly 토큰을 공유하지 말고 지원팀에 보내는 화면 캡처에서 비밀을 제거하세요.
- DNS를 게시하기 직전 현재 콘솔 값과 비교하고 테스트를 위해 피싱·첨부 검사를 끄지 마세요.
- 익숙해 보이는 메일이라고 발신자를 맹신하지 말고 예기치 못한 결제 요청과 변경된 지급 정보를 독립 경로로 확인하세요.
- 관리자 권한은 최소한으로 부여하고 국가 제한 전에 예비 관리자 접속을 남기세요.
- 도메인, 위협, 첨부, WebSOC, 결제 상태를 정기적으로 확인하세요.

## 8. 용어집

| 용어 | 뜻 |
|---|---|
| 2FA | 인증 앱의 일회용 코드로 수행하는 두 번째 로그인 요소 |
| 앱 비밀번호 | 메일 제공업체가 앱 접근용으로 따로 발급한 비밀번호 |
| DKIM | DNS 키로 확인하는 발신 메일 서명 |
| DMARC | SPF 또는 DKIM에 실패한 메일의 정책과 보고 |
| DNS | 도메인 이름을 서비스와 설정에 연결하는 레코드 |
| IMAP | 서버의 메일에 접근하는 프로토콜 |
| MX | 수신 메일 서버를 지정하는 DNS 레코드 |
| 원본 | WebSOC가 허용된 요청을 전달하는 원래 웹 서버 |
| Quarantine | 의심스러운 메일을 격리하는 공간 |
| RPS | 초당 웹 요청 수 |
| SMTP | 이메일 발송 프로토콜 |
| SPF | 도메인 발신을 허용하는 출처 목록의 DNS 정책 |
| TTL | DNS 레코드의 캐시 유지 시간 |

## 9. 지원팀 문의

조직에서 제공한 지원 채널을 사용하세요. 제품 이름(Admin Console, Email Protector 또는 WebSOC), 비밀번호를 제외한 계정 이메일, 관련 도메인, 날짜와 정확한 시각·시간대, 실행 순서, 화면에 나온 정확한 오류 문구, 키·토큰·QR 코드·개인정보를 제거한 화면 캡처를 준비합니다. 결제 문제라면 카드 정보 없이 금액·상태·거래 ID를, 메일 문제라면 발신자·제목·시각을 제공하고 꼭 필요한 경우가 아니면 기밀 내용은 보내지 마세요. 비밀번호, 6자리 2FA 코드, 비밀 키, 복구 비밀번호, 앱 비밀번호 전체, CVC, 개인 AI 키는 절대 보내지 마세요.
