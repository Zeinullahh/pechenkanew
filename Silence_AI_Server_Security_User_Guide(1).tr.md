# Silence AI

## Server Security Kullanıcı Kılavuzu

Kayıt, kurulum, korumalı erişim, güvenlik izleme ve politika yönetimi için son kullanıcı talimatları.

> **MÜŞTERİ BELGELERİ**
> Hizmetleri kaydetmek, yerel Server Security'yi kurmak, erişim denetimlerini yapılandırmak, olayları incelemek ve sunucu korumasını izlemek için bu kılavuzu kullanın.

Sürüm 1.0 • Ekim 2026

# Bu kılavuz nasıl kullanılır

Bu kılavuz, Silence AI Server Security kullanan yöneticiler ve yetkili operatörler içindir. Müşteri arayüzünden gerçekleştirebileceğiniz işlemlere ve bir koruma ya da erişim denetimi değişikliğine güvenmeden önce tamamlamanız gereken kontrollere odaklanır.

> **Önemli çalışma ilkesi**
> Kayıt, paket kurulumu, sisteme kaydetme, politika yapılandırması ve canlı koruma ayrı aşamalardır. Bir ayar pending olarak işaretlenmişse ona güvenmeden önce panelin etkinleştirildiğini bildirmesini bekleyin.

# 1. Başlamadan önce

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

# 2. Oturum açma ve Server Security'yi açma

1. Silence AI yönetim panelini açın ve Log in'i seçin.

2. Geçerli altı haneli kimlik doğrulayıcı koduyla hesap MFA işlemini tamamlayın.

3. Server Security'yi açın, ardından Servers'ı seçin.

Her sunucu satırında Install, Setup / recovery ve Open Security bulunabilir. Kullanılabilir işlem, sunucunun geçerli kayıt durumuna bağlıdır.

# 3. Hizmet kaydetme

## 3.1 Hosted veya Self-Hosted seçme

| **Dağıtım türü** | **Kullanım durumu** | **Gerekli alanlar** |
|---|---|---|
| Hosted | Trafik Hosted hizmeti üzerinden korunacaksa. | Domain + IP Address |
| Self-Hosted | Hizmet kendi ortamınızda çalışıyorsa. | Domain + Upstream URL |

> **Kayıt, kurulum değildir**
> Hosted veya Self-Hosted hizmet kaydı oluşturmak, yerel Server Security paketini kurmaz ya da bir Linux sunucusunu sisteme kaydetmez.

## 3.2 Hizmet kaydını oluşturma

4. Register new agent'ı seçin.

5. Hosted veya Self-Hosted'ı seçip ajan verileri adımına geçin.

6. Domain alanına URL yolu olmadan yalnızca ana bilgisayar adını girin.

7. Hosted için IP Address, Self-Hosted için Upstream URL girin.

8. Register'ı seçin.

## 3.3 Hosted: sahipliği doğrulama ve trafiği yönlendirme

Kayıt akışı iki ayrı öğe gösterir: sahiplik doğrulaması için web sitesi meta etiketi ve Hosted trafik yönlendirmesi için A kaydı.

9. Sağlanan meta etiketini web sitesi HTML'sindeki \<head\> öğesinin içine ekleyin.

10. Değişikliği yayımlayın ve web sitesinin kayıtlı alan adından herkese açık olduğunu doğrulayın.

11. Kayıt iletişim kutusunda Verify Domain Ownership'yi seçin ve Verification successful! iletisini doğrulayın.

12. Hosted trafik yönlendirmesi için gösterilen A kaydını DNS'e ekleyin.

13. DNS yayılımından sonra web sitesine amaçlanan alan adı üzerinden hâlâ erişilebildiğini doğrulayın.

> **Doğrulama başarısız olursa**
> Alan adı yazımını, genel erişilebilirliği, meta etiketi yerleşimini ve proxy/CDN ana bilgisayar işlemesini kontrol edip Redo verification'ı kullanın.

## 3.4 Self-Hosted dağıtımı

Self-Hosted hizmet kaydını oluşturduktan sonra ortamınız için sağlanan onaylı dağıtım prosedürünü izleyin. Yerel Server Security kurulumu, sunucu tablosunda ayrı bir Install işlemi olmaya devam eder.

# 4. Yerel Server Security'yi kurma ve kaydetme

## 4.1 Yerel paketi kurma

14. Hedef sunucu için Install'ı seçin.

15. 1. Choose a native package altında sunucuyla eşleşen işletim sistemini ve mimariyi seçin.

16. 2. Download and install altında Download .deb veya Download .rpm'yi seçin.

17. Install command yanındaki Copy'yi kullanın ve gösterilen komutu hedef sunucuda yönetici ayrıcalıklarıyla çalıştırın.

Panelinizde gösterilen dosya adını, kurulum komutunu ve SHA-256 değerini kullanın. Tipik komutlar şuna benzer:



> **Paket bütünlüğü**
> RPM paketlerinde imza kontrolünü etkin tutun ve onaylı imzalama anahtarı prosedürünüzü izleyin. İmzalama anahtarlarını onaylanmamış kaynaklardan edinmeyin veya paket doğrulamasını atlamayın.

## 4.2 Sunucuyu kaydetme

18. Kurulum iletişim kutusunda 3. Enroll interactively'yi açın.

19. Amaçlanan sunucuda `sudo silence-server enroll` komutunu çalıştırın.

20. Generate enrollment code'u seçin.

21. Gösterilen kodu yalnızca amaçlanan sunucudaki kayıt istemine girin.

22. Sağlama aşamaları çalışırken kurulum iletişim kutusunu açık tutun.

> **Kayıt kodu güvenliği**
> Kayıt kodları tek kullanımlıktır, en fazla 15 dakika içinde sona erer ve biletlere, belgelere, sohbete veya shell geçmişine asla kopyalanmamalıdır.

Sağlama sırasında iletişim kutusu Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors ve Installation complete gibi aşamalar gösterebilir.

## 4.3 Kurtarma ve yeniden kaydetme

Zaten kayıtlı görünen bir sunucuda Setup / recovery, Re-enroll server ve Generate recovery code seçeneklerini gösterebilir. Kurtarmayı yalnızca amaçlanan sunucu için kullanın ve erişimle ilgili kurtarma sırasında bağımsız bir yönetici erişim yöntemini kullanılabilir tutun.

## 4.4 Korumayı doğrulama

23. Sunucu için Open Security'yi seçin.

24. Overview'ı açın ve Refresh'i seçin.

25. Server protection, Provisioning, Sensor health ve Guard access security'yi inceleyin.

26. Geçerli durumun ve son telemetrinin beklediğiniz korumayla eşleştiğini doğrulayın.

> **Bekleyen etkinleştirme**
> Policy, Saved · pending activation gösteriyorsa yapılandırma kaydedilmiştir ancak henüz etkin kabul edilmemelidir.

# 5. Koruma durumunu anlama

| **Durum** | **Anlamı** | **Yapılacak işlem** |
|---|---|---|
| ACTIVE | Çekirdek korumanın kullanılabilir olduğu bildirilir. | İsteğe bağlı sensör ve politika durumunu ayrı olarak inceleyin. |
| DEGRADED | Çekirdek koruma kullanılabilir kalabilir ancak bir veya daha fazla sağlık ya da kapsam sinyali ilgi gerektirir. | Nedeni okuyun ve Sensors'ı inceleyin. |
| FAILED | Sağlama veya çekirdek koruma bir hata bildirdi. | Hatayı okuyun ve sorun giderme adımlarını izleyin. |
| PENDING | Kurulum, sağlama veya politika etkinleştirmesi tamamlanmadı. | Tamamlanmasını bekleyin; değişikliği etkin kabul etmeyin. |
| CONFIGURATION REQUIRED | Panelin çekirdek sağlığını doğrulaması için ek bilgi gerekir. | Kaydı doğrulayın ve gösterilen gereksinimi izleyin. |
| REMOVED | Yerel koruma kaldırıldı veya artık bildirilmiyor. | Varsa desteklenen Setup / recovery iş akışını kullanın. |

Sensör kartları ayrı olarak Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale veya No telemetry bildirebilir.

# 6. MFA ve korumalı erişimi yapılandırma

## 6.1 Hesap MFA'sı

27. Hesap kaydı sırasında Set up 2FA'yı açın.

28. QR kodunu tarayın veya gizli anahtarı bir TOTP kimlik doğrulayıcı uygulamasına girin.

29. Geçerli altı haneli kodu girip Verify and finish'i seçin.

30. Gelecekteki oturum açmalarda geçerli kimlik doğrulayıcı kodunu kullanın.

> **MFA sırlarını koruyun**
> Kimlik doğrulayıcı sırrını, QR kodunu veya kurtarma kodunu asla başka bir kişiye göndermeyin. Kimlik doğrulayıcı erişimini kaybederseniz kuruluşunuzun onaylı hesap kurtarma kanalını kullanın.

## 6.2 Sunucu erişimi MFA'sı (SSH 2FA / Port Guard)

SSH 2FA denetimi yapılandırılmış TCP bağlantı noktalarını grup olarak korur; yalnızca SSH bağlantı noktası 22 ile sınırlı değildir ve UDP'yi kapsamaz.

> **Erişim denetimlerini değiştirmeden önce**
> Amaçlanan kaynak ağından erişim doğrulanana kadar bağımsız bir yönetici oturumunu veya test edilmiş kurtarma yöntemini kullanılabilir tutun.

31. Sunucu tablosunda kalem/düzenleme denetimini açın.

32. Agent configuration içinde korumalı TCP bağlantı noktalarını ekleyin veya kaldırın, ardından Save'i seçin. Bağlantı noktaları 1 ile 65535 arasında tam sayı olmalıdır.

33. 2FA SSH Guard kurulumunu açmak için sunucu satırında SSH 2FA'yı etkinleştirin.

34. QR kodunu tarayın veya Manual entry key'i kimlik doğrulayıcı uygulamanıza girin.

35. Devam etmeden önce sekiz Backup / Recovery Codes kodunun tümünü kaydedin. Her kod tek kullanımlıktır.

36. Next — Verify Code'u seçin, geçerli altı haneli kodu girin ve Verify'ı seçin.

37. 2FA verified successfully! iletisini doğrulayın, Done'ı seçin; ardından Agent configuration'ı yeniden açıp amaçlanan bağlantı noktalarını ve erişim ayarını doğrulayın.

## 6.3 Port Guard ile kimlik doğrulama

38. Dağıtımınız için sağlanan Port Guard adresini, korumalı hizmete bağlanacak aynı ağ kaynağından açın.

39. Geçerli altı haneli kimlik doğrulayıcı kodunu veya kullanılmamış bir yedek kodu girin.

40. Unlock Ports'u seçin.

41. Sayfa bağlantı noktalarının açık olduğunu bildirdikten sonra korumalı hizmete hemen yeniden bağlanın.

Yapılandırılmış korumalı TCP bağlantı noktalarına geçici bir erişim penceresi boyunca birlikte yetki verilir. Gösterilen süre belirleyicidir; oluşturulan varsayılan değer 60 saniyedir. Korumalı hizmet yine kendi kimlik bilgilerini gerektirir.

> **Aynı kaynak ağ**
> Port Guard için kullanılan tarayıcı ile SSH/veritabanı/uygulama istemcisi, gözlemlenen aynı kaynak ağdan görünmelidir. Ağ değiştirmek yeniden kimlik doğrulama gerektirebilir.

# 7. Server Security konsolunu kullanma

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

# 8. Olayları ve yanıtları inceleme

## 8.1 Olaylar

Incident details'ı açmak için bir olayı seçin. Önem derecesini, özeti, varsa kaynak bilgilerini, Timeline'ı, Evidence'ı ve Technical details'ı inceleyin.

| **İşlem** | **Etkisi** |
|---|---|
| Mark investigating | Olay inceleme durumunu etkin soruşturmayı belirtecek biçimde değiştirir. |
| Resolve | Olay incelemesinin tamamlandığını kaydeder. |
| Dismiss | Olayın takip edilmeyeceğini kaydeder. |

> **Olay durumu düzeltme değildir**
> Olayın inceleme durumunu değiştirmek tek başına kötü amaçlı yazılımı kaldırmaz, saldırganı sonlandırmaz veya güvenliği ihlal edilmiş sunucuyu onarmaz.

## 8.2 Yanıtlar

| **Durum** | **Anlamı** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | Değerlendirme için kaydedildi veya onaylandı; uygulama doğrulanmadı. |
| APPLIED | Yanıt, gösterilen kapsamda uygulanmış olarak kaydedildi. |
| EXPIRED | Geçici yanıt artık etkin değil. |
| REVOKED | Yanıt geri çekildi. |
| FAILED | İstenen işlem başarıyla tamamlanmadı. |
| SUPPRESSED | Yanıt, geçerli politika kapsamında uygulanmadı. |

Kaynağı, işlemi ve kapsamı, nedeni, durumu, başlangıç zamanını ve sona erme zamanını birlikte inceleyin. Yeni bağlantıları engellemek, önceden kurulmuş bir bağlantıyı her zaman sonlandırmaz.

# 9. Güvenlik politikasını yapılandırma

## 9.1 Otomatik yanıt modu

| **Mod** | **Davranış** |
|---|---|
| Observe | Uygun kararları otomatik uygulama olmadan kaydeder. |
| Shadow | Uygun algılamaları geçici engelleme uygulamadan değerlendirir. |
| Enforce | Politika ve algılama koşulları etkinken onaylı geçici IP engelleri uygulayabilir. |

Kurulumdaki normal başlangıç modu Shadow'dur. Enforce kullanmak için Enforce'u seçin, Enable automatic enforcement? iletisini inceleyin ve Enable Enforce'u onaylayın. Enforce yalnızca uygun algılamalara uygulanır.

## 9.2 Güvenilen IP'ler

42. Policy → Trusted IPs'i açın.

43. Trusted IP or CIDR ve isteğe bağlı olarak Description girin.

44. Add trusted source'u seçin.

45. Bir girdiyi silmek için Remove'u, açık engele dönüştürmek için Move to block'u kullanın.

Trusted IPs, kaynağı uygun otomatik yanıt engellemesinden muaf tutar. MFA'yı, ülke kısıtlamalarını, Allowed IPs / CIDRs'ı, hizmet kimlik bilgilerini veya diğer erişim denetimlerini atlamaz.

## 9.3 Allowed IPs / CIDRs

46. Sunucu satırındaki kalem/düzenleme denetimini açın.

47. Agent configuration içinde Allowed IPs / CIDRs alanına tek tek IPv4/IPv6 adresleri veya CIDR aralıkları girin (virgülle ayrılmış).

48. Save'i seçin ve panelin değeri koruduğunu doğrulamak için iletişim kutusunu yeniden açın.

Kaydedilen liste boşsa Port Guard adres kontrolü tüm kaynakların kimlik doğrulamaya devam etmesine izin verir. Liste boş değilse yalnızca eşleşen adresler veya aralıklar devam edebilir.

## 9.4 Açık engeller

49. Policy → Explicit blocks'u açın.

50. Blocked IP or CIDR, gerekli Reason ve isteğe bağlı Explicit block expiry girin.

51. Add explicit block'u seçin.

52. Bir girdiyi silmek için Remove'u kullanın. Girdiyi düzeltmek için kaldırıp yenisini oluşturun.

> **Yönetici kilitlenmesini önleyin**
> Engel eklemeden önce aynı kaynak IP'yi veya CIDR'ı kullanabilecek yönetici, izleme, NAT ve paylaşılan adresleri kontrol edin.

## 9.5 Sensörler ve Suricata

Policy → Sensor state; Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco ve Suricata anahtarlarını gösterebilir.

Suricata için Policy → Suricata monitored interface'i açın, gösterilen adayı seçin veya `ens3` gibi doğrulanmış bir arayüz girin, ardından Save interface'i seçin. Değişiklikten sonra yeni Suricata telemetrisini doğrulayın.

# 10. Ülke tabanlı erişim denetimlerini yönetme

## 10.1 Sunucu başına Geo-Country Filtering

Sunucu başına Geo-Country Filtering, yapılandırılmış korumalı TCP bağlantı noktası grubuna uygulanır ve doğrulanmış sunucu erişimi MFA'sı gerektirir.

53. Korumalı TCP bağlantı noktalarını yapılandırın ve SSH 2FA kurulumunu tamamlayın.

54. Agent configuration'ı açıp Enable Geo-Country Filtering'i etkinleştirin.

55. Default Policy altında Allow Unmatched veya Deny Unmatched'ı seçin.

56. Geçerli bir Geo Rules (JSON Array) değeri girip Save'i seçin.

57. Agent configuration'ı yeniden açın ve kaydedilmiş anahtarı, varsayılan politikayı, kuralları, bağlantı noktalarını ve 2FA ayarını doğrulayın.



- Yapılandırılmış bağlantı noktası için açık kural, varsayılan politikadan önceliklidir.
- allow kuralı listelenen ülkelere izin verir ve o kuralda listelenmeyenleri reddeder.

- deny kuralı listelenen ülkeleri reddeder ve o kuralda listelenmeyenlere izin verir.
- Varsayılan politika yalnızca açık kuralı bulunmayan yapılandırılmış bağlantı noktalarına uygulanır.

## 10.2 Hesap düzeyinde ülke engelleme listesi

Genel panodaki Blacklist countries, hesap düzeyinde web trafiği engelleme listesidir ve sunucu başına Geo-Country Filtering'den ayrıdır.

58. Blacklist countries'ı açın.

59. Non-Blacklisted'ı açın ve gerekirse ülke adına veya iki harfli koda göre arayın.

60. Bir ülke seçip Add'i seçin. Değişiklik hemen kaydedilir.

61. Ülkenin Blacklisted altında göründüğünü doğrulayın.

Bir ülkeyi kaldırmak için Blacklisted'ı açın, engellenen ülkeyi seçin ve remove'u seçin. Ülke Non-Blacklisted'a döner.

# 11. Sensörleri, envanteri, duruşu ve bulguları inceleme

## 11.1 Sensörler

| **Sensör / görünüm** | **Bildirdiği öğe** |
|---|---|
| Guard | Çekirdek koruma sinyali. |
| File Integrity | İzlenen dosya değişiklikleri. |
| YARA-X | Kötü amaçlı yazılım örüntüsü kanıtı. |
| CrowdSec | Davranış tabanlı güvenlik algılamaları. |
| Falco | Çalışma zamanı ve sistem algılamaları. |
| Suricata | Ağ algılamaları. |
| Inventory / Security Configuration | Envanter ve değerlendirme verileri. |

Sensör algılaması bir kanıttır. Otomatik geçici yanıtlar yalnızca etkinleştirilmiş bir yanıt politikası kapsamındaki uygun algılamalarda gerçekleşir.

## 11.2 Envanter ve güvenlik açığı istihbaratı

Inventory; paket adını, sürümünü, ekosistemini, mimarisini ve son gözlemlenme zamanını gösterebilir. Müşteriye yönelik paket tablosunu filtrelemek için Search packages'ı kullanın. Envanter bilgi amaçlıdır; paketlere yama uygulamaz veya güvenlik açıklarını düzeltmez.

> **Boş veya eski verileri dikkatle yorumlayın**
> Boş, kullanılamayan, bilinmeyen ya da eski envanter/güvenlik açığı bilgisi, sunucuda paket veya güvenlik açığı bulunmadığının kanıtı değildir.

## 11.3 Duruş

Security Configuration Assessment bulguları ve güvenlik açığı istihbaratı durumu için Posture'ı kullanın. Bulgular başarısız veya gerilemiş kontrolleri ve sağlanan rehberleri gösterebilir. Posture bir değerlendirme görünümüdür ve sunucuyu otomatik olarak düzeltmez.

# 12. Olayları ve telemetriyi izleme

Events'ı açın ve kullanılabilir filtreleri kullanın:

- Sensöre göre filtreleyin.
- Tam olay türünü kullanarak olay türüne göre filtreleyin.

- Önem derecesine göre filtreleyin: All severities, critical, high, medium, low veya info.
- Sayfalandırma için Previous ve Next'i kullanın.

Gösterildiğinde olay adını, kaynağını, türünü, kanıtını, önemini, zaman damgasını ve bağlantılı olayı inceleyin.

# 13. Sorun giderme

> **İlk kural**
> Erişim denetimlerini değiştirirken bağımsız yönetici erişimini kullanılabilir tutun. Gizli olmayan hata metnini kaydedin; kayıt kodlarını, MFA sırlarını, yedek kodları, özel anahtarları veya bunları içeren ekran görüntülerini asla paylaşmayın.

| **Durum** | **Önerilen işlem** |
|---|---|
| Paket kurulumu başarısız | Seçilen paketin işletim sistemi/mimariyle eşleştiğini doğrulayın, yeniden indirin, gösterilen SHA-256'yı karşılaştırın ve kopyalanan komutu yönetici ayrıcalıklarıyla çalıştırın. RPM için imza kontrolünü etkin tutun. |
| Kayıt kodunun süresi doluyor | Yalnızca önceki kod kullanılmadıysa veya panel açıkça değiştirmeye izin veriyorsa yeni kod üretin. Kod sonraki bir hatadan önce kabul edildiyse sunucu kayıtlı göründüğünde Setup / recovery'yi kullanın. |
| Korumanın etkin olduğu doğrulanmadı | Overview'ı açıp Server protection, Provisioning, Sensor health ve Guard access security'yi inceleyin. PENDING, DEGRADED, FAILED veya CONFIGURATION REQUIRED için gösterilen nedeni izleyin. |
| Policy, Saved · pending activation gösteriyor | Politikayı kaydedilmiş fakat henüz etkin değil kabul edin. Etkinleştirme tamamlanana kadar önceki güvenli yapılandırmayı ve yönetici erişimini koruyun. |
| MFA kurulumu başarısız | Kimlik doğrulayıcı saatini kontrol edin, geçerli altı haneli kod kullanın, amaçlanan bağlantı noktalarını doğrulayın ve mevcut yönetici oturumunu açık tutun. |
| Port Guard kilidi açıyor ancak hizmete erişilemiyor | Hemen yeniden bağlanın; tarayıcı/istemcinin gözlemlenen aynı kaynağı kullandığını doğrulayın; korumalı bağlantı noktasını, hizmet kimlik bilgilerini, Allowed IPs'i, ülke kurallarını, açık engelleri, otomatik yanıtları ve ağ politikasını inceleyin. |
| Kimlik doğrulayıcı erişimi kaybedildi | Varsa kullanılmamış yedek kod kullanın ve ardından kuruluşunuzun onaylı kurtarma sürecini uygulayın. |
| IP veya ülke kısıtlamaları beklenmedik davranıyor | Denetleyen özelliği belirleyin, kaynak adresini ve bağlantı noktasını doğrulayın, kural önceliği ile süre sonunu inceleyin ve başka kural eklemeden önce yanlışlıkla yönetici kilitlenmesini kontrol edin. |
| Sensör telemetrisi eksik veya eski | Sensors'ı açın, sensör durumunu ve Last signal'ı inceleyin; uygun olduğunda Suricata arayüzü gibi yapılandırmaları doğrulayın. |
| Paket envanteri boş | Search packages'ı kullanın ve paket tablosunu diğer envanter etkinliğiyle karşılaştırın. Boş tabloyu hiç paket bulunmadığının kanıtı değil, eksik bilgi sayın. |

# 14. En iyi güvenlik ve işletim uygulamaları

- Güvenilen ve izin verilen kaynaklar için kullanılabilecek en dar IP/CIDR aralıklarını kullanın.
- MFA, açık engeller veya ülke kısıtlamaları etkinleştirirken test edilmiş yönetici kurtarma yolunu koruyun.

- Panel uygun bir etkin/sağlıklı durum bildirene ve güncel telemetri bunu destekleyene kadar kaydedilmiş yapılandırmaya güvenmeyin.
- Sensör algılamalarını incelenecek kanıtlar olarak değerlendirin; her algılamanın otomatik olarak engellendiğini varsaymayın.

- Otomatik engelin hâlâ etkin olduğunu varsaymadan önce yanıtın sona erme zamanını inceleyin.
- Onaylı işletim prosedürünüz açıkça gerektirmedikçe kurtarma yöntemi olarak güvenlik dosyalarını veya hizmetlerini elle kaldırmayın.

# Ek A — Hızlı durum başvurusu

| **Öğe** | **Müşteri yorumu** |
|---|---|
| Registered | Hizmet kaydı var. |
| Installed | Yerel paket kuruldu. |
| Enrolled | Tek kullanımlık kayıt kodu kabul edildi. |
| Installation complete | Sağlama, kurulumun tamamlanması aşamasına ulaştı; geçerli Overview durumunu ve telemetriyi doğrulayın. |
| Saved · pending activation | Değişiklik panelde saklanmıştır ancak henüz etkin kabul edilmemelidir. |
| SSH 2FA: Active | Satır için kimlik doğrulayıcı kurulumu tamamlandı; amaçlanan korumalı bağlantı noktalarını ve geçerli koruma durumunu doğrulayın. |
