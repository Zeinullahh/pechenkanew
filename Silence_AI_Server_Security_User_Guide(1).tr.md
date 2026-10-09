# Silence AI Server Security Kullanıcı Kılavuzu

Bu kılavuz, Silence AI yönetim panelinde hizmet kaydı, yerel Server Security kurulumu ve sunucu kaydı, korumalı erişim ayarları ve güvenlik etkinliklerinin incelenmesini açıklar.

Kay?t, paket kurulumu, sunucunun kaydedilmesi, ilkenin saklanmas? ve uygulanmas? ayr? a?amalard?r. Devam etmeden ?nce g?sterilen durumu kontrol edin.

## İçindekiler

1. Başlamadan önce
2. Giriş ve Server Security'yi açma
3. Hizmet kaydetme
4. Kurulum, kayıt ve korumayı etkinleştirme
5. Koruma durumu
6. MFA ve korumalı erişim
7. Server Security konsolu
8. Olaylar ve yanıtlar
9. Güvenlik ilkesi
10. Ağ erişimi, küre ve etkin oturumlar
11. Sensörler, envanter, duruş ve bulgular
12. Olaylar ve telemetri
13. Sorun giderme

## 1. Başlamadan önce

Başlamadan önce aşağıdaki bilgileri ve erişimi hazırlayın:

- Server Security erişimi bulunan bir Silence AI hesabı.
- Kaydetmeyi planladığınız hizmet alan adı veya sunucu adı.

- Hedef sunucudan Silence AI'a ağ bağlantısı.
- Yerel kurulum için hedef Linux sunucusunda yönetici ayrıcalıkları.

- Hosted kaydı için: hedef IP adresi ve web sitesi ile DNS'i güncelleme izni.
- Self-Hosted kaydı için: upstream URL ve kuruluşunuzun onaylı dağıtım prosedürü.

| **Desteklenen yerel hedef** | **Paket** |
|---|---|
| Ubuntu Server 22.04 veya 24.04 LTS, amd64 | DEB |
| Fedora Server 44, x86_64 | RPM |

> **Hosted faturalandırması**
> Hosted trafik koruması kullanım üzerinden faturalandırılır. Hosted trafik korumasına güvenmeden önce hesapta yeterli bakiye bulunduğunu doğrulayın.

## 2. Oturum açma ve Server Security'yi açma

1. Silence AI yönetim panelini açın ve Log in'i seçin.

2. Geçerli altı haneli kimlik doğrulayıcı koduyla hesap MFA işlemini tamamlayın.

3. Server Security'yi açın, ardından Servers'ı seçin.

Her sunucu satırında Install, Setup / recovery ve Open Security bulunabilir. Kullanılabilir işlem, sunucunun geçerli kayıt durumuna bağlıdır.

## 3. Hizmet kaydetme

### 3.1 Hosted veya Self-Hosted seçme

| **Dağıtım türü** | **Kullanım durumu** | **Gerekli alanlar** |
|---|---|---|
| Hosted | Trafik Hosted hizmeti üzerinden korunacaksa. | Domain + IP Address |
| Self-Hosted | Hizmet kendi ortamınızda çalışıyorsa. | Domain + Upstream URL |

> **Kayıt, kurulum değildir**
> Hosted veya Self-Hosted hizmet kaydı oluşturmak, yerel Server Security paketini kurmaz ya da bir Linux sunucusunu sisteme kaydetmez.

**Hosted** veya **Self-Hosted** se?meden ?nce **Register new agent** se?in.

### 3.2 Hizmet kaydını oluşturma

4. Register new agent'ı seçin.

5. Hosted veya Self-Hosted'ı seçip ajan verileri adımına geçin.

6. Domain alanına URL yolu olmadan yalnızca ana bilgisayar adını girin.

7. Hosted için IP Address, Self-Hosted için Upstream URL girin.

8. Register'ı seçin.

### 3.3 Hosted: sahipliği doğrulama ve trafiği yönlendirme

Kayıt akışı iki ayrı öğe gösterir: sahiplik doğrulaması için web sitesi meta etiketi ve Hosted trafik yönlendirmesi için A kaydı.

9. Sağlanan meta etiketini web sitesi HTML'sindeki \<head\> öğesinin içine ekleyin.

10. Değişikliği yayımlayın ve web sitesinin kayıtlı alan adından herkese açık olduğunu doğrulayın.

11. Kayıt iletişim kutusunda Verify Domain Ownership'yi seçin ve Verification successful! iletisini doğrulayın.

12. Hosted trafik yönlendirmesi için gösterilen A kaydını DNS'e ekleyin.

13. DNS yayılımından sonra web sitesine amaçlanan alan adı üzerinden hâlâ erişilebildiğini doğrulayın.

> **Doğrulama başarısız olursa**
> Alan adı yazımını, genel erişilebilirliği, meta etiketi yerleşimini ve proxy/CDN ana bilgisayar işlemesini kontrol edip Redo verification'ı kullanın.

Görüntülenen **A record** Hosted trafiğini yönlendirir; sahiplik doğrulaması değildir. Web sitesinin meta etiketi sahipliği kanıtlar. Eski sitenin doğrulama sırasında erişilebilir kalması gerekiyorsa DNS geçişinden önce etiketi doğrulayın.

### 3.4 Self-Hosted dağıtımı

Self-Hosted hizmet kaydını oluşturun ve ortamınız için onaylanan dağıtım prosedürünü izleyin. Yerel Server Security kurulumu, sunucu tablosundaki ayrı bir işlemdir.

## 4. Yerel Server Security'yi kurma ve kaydetme

**Registered** hizmet kaydı bulunduğunu, **Installed** yerel paketin kurulduğunu, **Enrolled** tek kullanımlık kodun kabul edildiğini gösterir. Hiçbiri tek başına sağlıklı etkin koruma kanıtı değildir.

### 4.1 Yerel paketi kurma

14. Hedef sunucu için Install'ı seçin.

15. 1. Choose a native package altında sunucuyla eşleşen işletim sistemini ve mimariyi seçin.

16. 2. Download and install altında Download .deb veya Download .rpm'yi seçin.

17. Install command yanındaki Copy'yi kullanın ve gösterilen komutu hedef sunucuda yönetici ayrıcalıklarıyla çalıştırın.

Panelinizde gösterilen dosya adını, kurulum komutunu ve SHA-256 değerini kullanın. Tipik komutlar şuna benzer:



> **Paket bütünlüğü**
> RPM paketlerinde imza kontrolünü etkin tutun ve onaylı imzalama anahtarı prosedürünüzü izleyin. İmzalama anahtarlarını onaylanmamış kaynaklardan edinmeyin veya paket doğrulamasını atlamayın.

**Install Server Security** içinden uygun yerel paketi seçin. Yaygın komutlar Ubuntu için `sudo apt install ./<displayed-filename>.deb` ve Fedora için `sudo dnf --setopt=localpkg_gpgcheck=1 install ./<displayed-filename>.rpm` biçimindedir; konsolunuzda gösterilen dosya adı, komut ve SHA-256 esas alınır. Tarayıcı indirmesi uzak sunucuya kurmaz; gerekirse paketi onaylı güvenli yöntemle aktarın. Önceden enrolled sunucuda **Setup / recovery** işlemini yalnız panel yönlendirmesiyle kullanın.

### 4.2 Sunucuyu kaydetme

18. Kurulum iletişim kutusunda 3. Enroll interactively'yi açın.

19. Amaçlanan sunucuda `sudo silence-server enroll` komutunu çalıştırın.

20. Generate enrollment code'u seçin.

21. Gösterilen kodu yalnızca amaçlanan sunucudaki kayıt istemine girin.

22. Sağlama aşamaları çalışırken kurulum iletişim kutusunu açık tutun.

> **Kayıt kodu güvenliği**
> Kayıt kodları tek kullanımlıktır, en fazla 15 dakika içinde sona erer ve biletlere, belgelere, sohbete veya shell geçmişine asla kopyalanmamalıdır.

Sağlama sırasında iletişim kutusu Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors ve Installation complete gibi aşamalar gösterebilir.

Kullanılmamış kodu değiştirmek için **Replace enrollment code** seçip **Replace code** onaylayın ve yeni kodu kullanın. **This server is enrolled** yalnız kaydı doğrular; kurulumu ve etkin korumayı doğrulamaz. Daha sonraki aşama başarısız olduysa ilk kod tüketilmiş olabilir.

### 4.3 Kurtarma ve yeniden kaydetme

Kayıtlı bir sunucu için **Setup / recovery** bölümünü açın ve ilgili sunucuda **Re-enroll server** veya **Generate recovery code** seçeneğini kullanın. Kurtarma sırasında bağımsız yönetici erişimini koruyun.

### 4.4 Korumayı doğrulama

23. Sunucu için Open Security'yi seçin.

24. Overview'ı açın ve Refresh'i seçin.

25. Server protection, Provisioning, Sensor health ve Guard access security'yi inceleyin.

26. Geçerli durumun ve son telemetrinin beklediğiniz korumayla eşleştiğini doğrulayın.

> **Bekleyen etkinleştirme**
> Policy, Saved · pending activation gösteriyorsa yapılandırma kaydedilmiştir ancak henüz etkin kabul edilmemelidir.

**Installation complete**, **SSH 2FA: Active**, kaydedilmi? ilke veya doldurulmu? yap?land?rma penceresi tek ba??na ilgili koruman?n sunucuda ger?ekten uyguland???n? kan?tlamaz. G?ncel telemetriyi ve ger?ek uygulama durumunu da kontrol edin.

## 5. Koruma durumunu anlama

| **Durum** | **Anlamı** | **Yapılacak işlem** |
|---|---|---|
| ACTIVE | Çekirdek korumanın kullanılabilir olduğu bildirilir. | İsteğe bağlı sensör ve politika durumunu ayrı olarak inceleyin. |
| DEGRADED | Çekirdek koruma kullanılabilir kalabilir ancak bir veya daha fazla sağlık ya da kapsam sinyali ilgi gerektirir. | Nedeni okuyun ve Sensors'ı inceleyin. |
| FAILED | Sağlama veya çekirdek koruma bir hata bildirdi. | Hatayı okuyun ve sorun giderme adımlarını izleyin. |
| PENDING | Kurulum, sağlama veya politika etkinleştirmesi tamamlanmadı. | Tamamlanmasını bekleyin; değişikliği etkin kabul etmeyin. |
| CONFIGURATION REQUIRED | Panelin çekirdek sağlığını doğrulaması için ek bilgi gerekir. | Kaydı doğrulayın ve gösterilen gereksinimi izleyin. |
| REMOVED | Yerel koruma kaldırıldı veya artık bildirilmiyor. | Varsa desteklenen Setup / recovery iş akışını kullanın. |

Sensör kartları ayrı olarak Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale veya No telemetry bildirebilir.

## 6. MFA ve korumalı erişimi yapılandırma

### 6.1 Hesap MFA'sı

Kayıt sırasında **Set up 2FA** bölümünü açın, QR kodunu tarayın veya gizli anahtarı kimlik doğrulama uygulamasına girin, geçerli altı haneli kodu yazın ve **Verify and finish** seçeneğini seçin. Sonraki girişlerde güncel kodu kullanın. Uygulamaya erişimi kaybederseniz sakladığınız kurtarma kodunu veya kuruluşunuzun onaylı hesap kurtarma prosedürünü kullanın. QR kodunu, gizli anahtarı ve kurtarma kodlarını paylaşmayın.

### 6.2 Sunucu erişimi MFA'sı (SSH 2FA / Port Guard)

**SSH 2FA**, yalnızca SSH portu 22'yi değil, yapılandırılmış korumalı TCP portlarını kapsar. Erişim ayarlarını değiştirirken bağımsız bir yönetici oturumu açık tutun.

1. Sunucu tablosunda düzenlemeyi açın ve **Agent configuration** altında korumalı **TCP ports** değerlerini ayarlayın.
2. Sunucu satırında **SSH 2FA** seçeneğini seçip QR kodunu tarayın veya **Manual entry key** değerini kimlik doğrulama uygulamasına girin.
3. Sekiz **Backup / Recovery Codes** kodunu güvenle saklayın; her kod tek kullanımlıktır.
4. **Next — Verify Code** seçeneğini seçin, geçerli altı haneli kodu girin, **Verify** ile doğrulayın ve kurulumu tamamlayın.
5. Portları ve erişim ayarını gözden geçirmek için **Agent configuration** bölümünü yeniden açın.

### 6.3 Port Guard ile kimlik doğrulama

Dağıtımınız için onaylanan **Port Guard** adresini, korumalı hizmet istemcisiyle aynı ağdan açın. Geçerli kimlik doğrulama kodunu veya kullanılmamış bir yedek kodu girin, **Unlock Ports** seçeneğini seçin ve hizmete yeniden bağlanın. Sayfada gösterilen erişim süresini dikkate alın. Korumalı hizmetin kendi kimlik bilgileri de gereklidir.

### 6.4 Sunucu erişimi MFA'sını devre dışı bırakma veya sıfırlama

Sunucu erişimi MFA'sını devre dışı bırakmak için **Enable 2FA for access** seçeneğini kapatıp kaydedin. Kapsamını değiştirmek için yapılandırılmış korumalı portları değiştirin veya kaldırın ve kaydedin. Çalışan bir yönetici oturumunu ve bağımsız bir erişim kurtarma yöntemini açık tutun. Ajan değişikliği uyguladıktan sonra panelde bildirilen durumu ve hedef sunucuya erişimi kontrol edin. Çalışan sunucu kayıtlı ayarı kullanmıyorsa sorumlu yöneticiye başvurun. Dosyaları veya hizmetleri elle silmeyin.

## 7. Server Security konsolunu kullanma

Bölüm 10, Network access sayfasını, sunucu ve port seçimini, küreyi, bağlantı listesini ve ilke işlemlerini açıklar.


| **Sekme** | **Amaç** |
|---|---|
| Overview | Koruma durumu, sağlama, sensör sağlığı, olaylar, yanıtlar ve son etkinlik. |
| Incidents | İnceleme için ilişkilendirilmiş güvenlik etkinliği. |
| Responses | Otomatik yanıt kayıtları ve sonuçları. |
| Sensors | Sensör sağlığı ve algılama görünümleri. |
| Posture | Security Configuration Assessment bulguları ve güvenlik açığı istihbaratı durumu. |
| Inventory | Bildirilen paket ve sunucu envanteri. |
| Events | Filtrelenebilir, sayfalandırılmış sunucu telemetrisi. |
| Policy | Otomatik yanıt modu, IP politikası, sensör anahtarları ve Suricata arayüzü. |

Ana konsol için Refresh'i kullanın. Events içinde olay gezginini yenilemeniz gerektiğinde sayfayı veya filtreyi değiştirin.

## 8. Olayları ve yanıtları inceleme

**Farklı işlemler:** **Shut down session** mevcut bağlantıyı hedefler; **Blacklist IP address** kapsamındaki yeni bağlantılar için kalıcı engel kaydeder. Otomatik yanıt geçici olabilir ve farklı kurallara bağlıdır. İstek veya kayıt kapatma ya da uygulama onayı değildir.

### 8.1 Olaylar

Incident details'ı açmak için bir olayı seçin. Önem derecesini, özeti, varsa kaynak bilgilerini, Timeline'ı, Evidence'ı ve Technical details'ı inceleyin.

| **İşlem** | **Etkisi** |
|---|---|
| Mark investigating | Olay inceleme durumunu etkin soruşturmayı belirtecek biçimde değiştirir. |
| Resolve | Olay incelemesinin tamamlandığını kaydeder. |
| Dismiss | Olayın takip edilmeyeceğini kaydeder. |

> **Olay durumu düzeltme değildir**
> Olayın inceleme durumunu değiştirmek tek başına kötü amaçlı yazılımı kaldırmaz, saldırganı sonlandırmaz veya güvenliği ihlal edilmiş sunucuyu onarmaz.

### 8.2 Yanıtlar

| **Durum** | **Anlamı** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | Değerlendirme için kaydedildi veya onaylandı; uygulama doğrulanmadı. |
| APPLIED | Yanıt, gösterilen kapsamda uygulanmış olarak kaydedildi. |
| EXPIRED | Geçici yanıt artık etkin değil. |
| REVOKED | Yanıt geri çekildi. |
| FAILED | İstenen işlem başarıyla tamamlanmadı. |
| SUPPRESSED | Yanıt, geçerli politika kapsamında uygulanmadı. |

Kaynağı, işlemi ve kapsamı, nedeni, durumu, başlangıç zamanını ve sona erme zamanını birlikte inceleyin. Yeni bağlantıları engellemek, önceden kurulmuş bir bağlantıyı her zaman sonlandırmaz.

## 9. Güvenlik politikasını yapılandırma

### 9.1 Otomatik yanıt modu

| **Mod** | **Davranış** |
|---|---|
| Observe | Uygun kararları otomatik uygulama olmadan kaydeder. |
| Shadow | Uygun algılamaları geçici engelleme uygulamadan değerlendirir. |
| Enforce | Politika ve algılama koşulları etkinken onaylı geçici IP engelleri uygulayabilir. |

Kurulumdaki normal başlangıç modu Shadow'dur. Enforce kullanmak için Enforce'u seçin, Enable automatic enforcement? iletisini inceleyin ve Enable Enforce'u onaylayın. Enforce yalnızca uygun algılamalara uygulanır.

**Policy → Automatic response mode** altında modu seçin. **Enforce** için **Enable automatic enforcement?** ekranını inceleyip **Enable Enforce** veya **Cancel** seçin. Otomatik engellemeye güvenmeden önce etkinleşmeyi doğrulayın; her tespit yanıt üretmez.

### 9.2 Güvenilen IP'ler

42. Policy → Trusted IPs'i açın.

43. Trusted IP or CIDR ve isteğe bağlı olarak Description girin.

44. Add trusted source'u seçin.

45. Bir girdiyi silmek için Remove'u, açık engele dönüştürmek için Move to block'u kullanın.

Trusted IPs, kaynağı uygun otomatik yanıt engellemesinden muaf tutar. MFA'yı, ülke kısıtlamalarını, Allowed IPs / CIDRs'ı, hizmet kimlik bilgilerini veya diğer erişim denetimlerini atlamaz.

### 9.3 Allowed IPs / CIDRs

46. Sunucu satırındaki kalem/düzenleme denetimini açın.

47. Agent configuration içinde Allowed IPs / CIDRs alanına tek tek IPv4/IPv6 adresleri veya CIDR aralıkları girin (virgülle ayrılmış).

48. Save'i seçin ve panelin değeri koruduğunu doğrulamak için iletişim kutusunu yeniden açın.

Kaydedilen liste boşsa Port Guard adres kontrolü tüm kaynakların kimlik doğrulamaya devam etmesine izin verir. Liste boş değilse yalnızca eşleşen adresler veya aralıklar devam edebilir.

Alan?n tam ad? **Allowed IPs / CIDRs (comma-separated)** ?eklindedir. Bu liste Port Guard kullanabilecek kaynaklar? s?n?rlar; hizmet eri?imi vermez ve MFA, ?lke filtresi, hizmet kimlik bilgileri veya a??k engelleri atlatmaz. **Trusted IPs** listesinden ayr?d?r. Kaydedilmi? de?er sunucuda uyguland???n? kan?tlamaz; de?i?iklik s?ras?nda ba??ms?z y?netici eri?imini koruyun.

### 9.4 Açık engeller

49. Policy → Explicit blocks'u açın.

50. Blocked IP or CIDR, gerekli Reason ve isteğe bağlı Explicit block expiry girin.

51. Add explicit block'u seçin.

52. Bir girdiyi silmek için Remove'u kullanın. Girdiyi düzeltmek için kaldırıp yenisini oluşturun.

> **Yönetici kilitlenmesini önleyin**
> Engel eklemeden önce aynı kaynak IP'yi veya CIDR'ı kullanabilecek yönetici, izleme, NAT ve paylaşılan adresleri kontrol edin.

### 9.5 Sensörler ve Suricata

Policy → Sensor state; Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco ve Suricata anahtarlarını gösterebilir.

Suricata için Policy → Suricata monitored interface'i açın, gösterilen adayı seçin veya `ens3` gibi doğrulanmış bir arayüz girin, ardından Save interface'i seçin. Değişiklikten sonra yeni Suricata telemetrisini doğrulayın.

## 10. Ağ erişimi denetimleri, küre ve canlı oturumlar

**Network access** sayfasını açıp yönetilen sunucuyu ve korumalı TCP portunu seçin. Küre ve bağlantı listesinden seçilen kapsamın kaynak IP'lerini, ülkelerini, portlarını ve oturum bilgilerini inceleyin.

**Countries** bölümünde blacklist veya whitelist modunu seçip ilgili portun ülke listesini düzenleyin. **IP addresses** bölümünde sunucunun **Always Block** ve **Always Allow** listelerini yönetin. Always Allow, MFA veya korumalı hizmetin kimlik doğrulamasının yerini almaz.

Bir bağlantının menüsünden **Shut down session** veya **Blacklist IP address** işlemini seçin. Ardından bildirilen sonucu ve ilke durumunu kontrol edin. Kaydedilen değişiklik veya kuyruğa alınan istek, ancak uygulama sonucu bildirildiğinde tamamlanmış sayılır.

## 11. Sensörleri, envanteri, duruşu ve bulguları inceleme

Her sensörün durumunu ve son sinyalini incelemek için **Sensors** bölümünü açın. Bildirilen paket bilgilerini **Inventory** ve **Search packages** ile inceleyin. Yapılandırma bulgularını ve gösterilen önerileri **Posture** bölümünde kontrol edin. Sonuçları yorumlarken gözlem zamanını dikkate alın.

## 12. Olayları ve telemetriyi izleme

Sunucu telemetrisini incelemek için **Events** bölümünü açın. Sensöre, tam olay türüne veya önem düzeyine göre filtreleyin; **Previous** ve **Next** ile sayfaları değiştirin. Kaynağı, kanıtı, önem düzeyini, zamanı ve varsa ilişkili olayı inceleyin. Eski sonuçlara dayanarak karar vermeden önce görünümü yenileyin.

## 13. Sorun giderme

Bir işlem tamamlanmazsa seçilen sunucu ve portu, gösterilen durumu ve zamanı, ayrıca hata mesajını kontrol edin. Girdiyi veya bağlantı sorununu düzeltip işlemi yeniden deneyin. Erişim kurallarını değiştirirken bağımsız yönetici oturumunu açık tutun. Hesap veya sunucu erişimini kurtarmak için kuruluşunuzun onaylı prosedürünü kullanın.
