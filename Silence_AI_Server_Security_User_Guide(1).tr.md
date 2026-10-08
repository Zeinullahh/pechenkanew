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


**Belge durumu:** Bölüm 10 gereksinimleri ve bilinen sınırları açıklar. Kod vardır ancak sağlanan belgelere göre gerçek Linux/Kubernetes denemeleri ve tarayıcı hareketleri doğrulanmamıştır. Kaydedildi/bekliyor, uygulandı/onaylandı demek değildir.

- [1. Başlamadan önce](#1-başlamadan-önce)
- [2. Oturum açma ve Server Security'yi açma](#2-oturum-açma-ve-server-security-yi-açma)
- [3. Hizmet kaydetme](#3-hizmet-kaydetme)
- [4. Yerel Server Security'yi kurma ve kaydetme](#4-yerel-server-security-yi-kurma-ve-kaydetme)
- [5. Koruma durumunu anlama](#5-koruma-durumunu-anlama)
- [6. MFA ve korumalı erişimi yapılandırma](#6-mfa-ve-korumalı-erişimi-yapılandırma)
- [7. Server Security konsolunu kullanma](#7-server-security-konsolunu-kullanma)
- [8. Olayları ve yanıtları inceleme](#8-olayları-ve-yanıtları-inceleme)
- [9. Güvenlik politikasını yapılandırma](#9-güvenlik-politikasını-yapılandırma)
- [10. Ağ erişimi denetimleri, küre ve canlı oturumlar](#10-ağ-erişimi-denetimleri-küre-ve-canlı-oturumlar)
- [11. Sensörleri, envanteri, duruşu ve bulguları inceleme](#11-sensörleri-envanteri-duruşu-ve-bulguları-inceleme)
- [12. Olayları ve telemetriyi izleme](#12-olayları-ve-telemetriyi-izleme)
- [13. Sorun giderme](#13-sorun-giderme)
- [14. En iyi güvenlik ve işletim uygulamaları](#14-en-iyi-güvenlik-ve-işletim-uygulamaları)

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

**Port bazında erişim:** Bölüm 10'un hedefi her port için bağımsız uygunluk denetimidir. MFA uygun portları geçici açabilir ama başka porttaki ülke/IP reddini aşamaz; hizmet kimlik doğrulaması sürer. Eski grup açma davranışı bağımsız denetimin çalıştığını kanıtlamaz.

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

**Network access:** Bölüm 10 ayrı sayfayı, sunucu/port seçimini, küreyi, listeyi ve ilke işlemlerini anlatır. Kaydırma ve karşılık gelen denetimler gerçek tarayıcıda henüz doğrulanmamıştır; kurulumunuzda gerçekten görünen etiketleri izleyin.

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

**Farklı işlemler:** **Shut down session** mevcut bağlantıyı hedefler; **Blacklist IP address** kapsamındaki yeni bağlantılar için kalıcı engel kaydeder. Otomatik yanıt geçici olabilir ve farklı kurallara bağlıdır. İstek veya kayıt kapatma ya da uygulama onayı değildir.

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

**Ayrı listeler:** **Trusted IPs** otomatik yanıtlarla, **Allowed IPs / CIDRs** Port Guard erişimiyle ilgilidir; açık engeller daha geniş olabilir. Hiçbiri Bölüm 10'daki **Always Allow** veya **Always Block** değildir. Eski kuralları geçişte uzlaştırın; hesap genelindeki HTTP listesi kendiliğinden SSH/Kubernetes engeline dönüşmez.

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

# 10. Ağ erişimi denetimleri, küre ve canlı oturumlar

**2026-10-06 tarihli işlev gereksinimi.** Bu bölüm istenen davranışı açıklar; üretim ortamında doğrulama iddiası değildir. Önceden küre web trafiğini gösteriyor, ülke denetimleri ayrıydı ve oturum sonlandırma kullanılamıyordu. CMC/Guard kodunda artık Network access sayfası, sunucu ve porta göre ilkeler, imzalı Guard yenilemesi, port bazında nftables yetkilendirmesi, Linux ana makine ağ ad alanındaki TCP bağlantılarının anlık görüntüsü ve imzalı hedefli kapatma komutları vardır. `NETWORK_ACCESS_NET_CHECKLIST.md` statik, birim ve çapraz derleme kontrollerini kaydeder. Veritabanı geçişi, gerçek Linux/Kubernetes bağlantıları, 2525 üzerinde SSH, tarayıcı etkileşimleri, yeniden başlatma kalıcılığı ve uçtan uca aracı onayı sağlanan belgelerde henüz doğrulanmamıştır. Kaydedilen ilke, çalışan aracı sürümü onaylayana kadar beklemededir; sıraya alınmış komut doğrulanmış kapatma değildir.

## 10.1 Amaç ve kapsam (NET-01)

CMC, yapılandırılmış korumalı TCP portlarının erişimini yönetmek için 3B küreyi, ülke listelerini, engelleme penceresini ve yukarı açılan paneli birleştirmelidir. **Ağ oturumu**, gözlenen kaynak IP'den yönetilen sunucunun yapılandırılmış hedef portuna gerçek ve etkin bir TCP bağlantısıdır. SSH **2525** portunda çalışıyorsa kullanılan bağlantı bitene kadar görünür; SSH her zaman 22 değildir. Yapılandırılmış Kubernetes uçları ve diğer korumalı TCP hizmetleri de kapsam içindedir. Hizmet adı yalnızca yapılandırma veya doğrulanmış bilgiden gelir. Kubernetes TCP bağlantısı tek başına kullanıcıyı, pod kabuğunu veya belirli `kubectl exec` işlemini tanımlamaz; çoklanmış bağlantıyı kapatmak birden çok işlemi etkileyebilir. Web ziyareti, HTTP isteği, tarayıcı oturumu, user agent veya erişim günlüğündeki benzersiz IP sayısı ağ oturumu değildir. Bağımsız barındırma, HTTP analizi, kayıt ve faturalama ayrı kalır.

## 10.2 Sunucu ve port seçimi (NET-02)

Görmeden veya düzenlemeden önce seçili sunucuyu ve korumalı TCP portunu gösterin. Her portun ülke modu ve listesi ayrı olabilir; 2525 kuralı başka portu sessizce değiştiremez. **All protected ports** birleşik görünümü karma ilkeleri belirtmelidir. Seçim ve filtreler küreyi, etkin ülke listelerini ve oturum listesini birlikte günceller. Kalıcı **Always Allow** ve **Always Block** IP listeleri seçili sunucunun yapılandırılmış korumalı portlarında geçerlidir; otomatik olarak tüm hesaba veya ilgisiz portlara yayılmaz.

## 10.3 Pencere ve listeler (NET-03)

İlk satır **Countries** ve **IP addresses** sekmelerinden oluşur. **Countries** altında ikinci satır **Blacklisted** ve **Whitelisted** görünümüdür; ülke arama, ekleme ve kaldırma ile ayrı bir **Blacklist mode / Whitelist mode** seçicisi bulunur. Bir listeye bakmak modu değiştirmez. Açıkça seçilen ülkeler ve görüntülenen tamamlayıcı küme seçilen port için anlaşılır olmalıdır. **IP addresses** altında ikinci satır **Always Block** ve **Always Allow** görünümüdür. Her birinde **+**, basit IP girişi, kayıtlı liste ve kaldırma vardır. İki liste sekme veya ülke modu değişse bile aynı anda etkindir. Tekil IPv4 ve IPv6 adreslerini kabul edip eşdeğer yazımları normalleştirin, tekrarları önleyin; JSON, tarayıcı parmak izi, IP-kullanıcı birleşimi veya zorunlu CIDR gerekmez.

## 10.4 Ülke modları (NET-04)

| Mod | Açıkça seçilen ülkeler | Diğer bütün bilinen ülkeler |
|---|---|---|
| **Blacklist mode** | Engelli | IP kuralları ve kimlik doğrulamaya bağlı olarak izinli |
| **Whitelist mode** | IP kuralları ve kimlik doğrulamaya bağlı olarak izinli | Engelli |

Boş kara liste hiçbir ülkeyi engellemez; boş beyaz liste hiçbir ülkeye izin vermez. Mod değişiminde açık seçimlerin korunmasını veya taşınmasını açıklayın; görüntülenen tamamlayıcı listeyi sessizce kayıtlı seçim saymayın. **Whitelist mode** içinde Kazakistan ve Türkiye seçilirse geçerli IP istisnası dışında diğer ülkeler reddedilir. Her port bağımsız değerlendirilir: bir portun reddi başka izinli portu reddetmez, bir portun izni reddedileni açmaz. MFA zorunludur. Konum bilinmiyorsa **Unknown country** gösterin; ülke uydurmayın. Genel IP için GeoIP hatası kısıtı sessizce kaldırmamalıdır; beyaz liste modunda bilinmeyen ülke **Always Allow** olmadan reddedilir. Özel/yerel kaynaklar coğrafi denetimi atlar fakat IP kısıtları ve MFA'ya tabidir; bunları genel IP arama hatasından ayırın.

## 10.5 Kalıcı IP istisnaları (NET-05)

**Always Allow**, gözlenen kaynak IP'yi bu sunucunun korumalı portlarında ülke kısıtından kayıt kaldırılana kadar muaf tutar. Örnek: Rusya engellidir, ancak bir çalışan Rusya'dan uzaktan çalışır. Gözlenen IP'sini **Always Allow** listesine eklemek ülke kararını aşar; MFA ve SSH kimlik doğrulaması yine gerekir. Rusya beyaz listede yoksa da aynı istisna işler; kaydı kaldırmak normal ülke kararını geri getirir. **Always Block**, ülkesi izinli olsa da IP'yi reddeder. İki liste mod değişiminde de kalıcı ve aynı anda etkindir. **Always Allow**, hizmet kimlik bilgilerini veya bağımsız otomatik tehdit yanıtlarını atlamaz. **Trusted IPs** bu yanıtlarla ilgilidir ve eşanlamlı değildir; eski kaynak izin listeleri ve açık engeller bilinçli uzlaştırılmalıdır. Aynı normalleştirilmiş IP iki listede olamaz: açık taşıma sunun. Çelişkili veri gelirse engelleme üstün gelir ve çelişki bildirilir. Sıra: **Always Block**, coğrafi istisna **Always Allow**, ilgili portun ülke modu; MFA ve hizmet girişi ayrıca uygulanır. Paylaşılan genel IP aynı adresi kullanan herkesi etkiler; kaynak IP değişirse istisnayı güncelleyin. Yalnız IP bir çalışanı tanımlamaz.

## 10.6 Küre ve dört yoğunluk düzeyi (NET-06)

Küre, seçili kapsamda izinli/engelli ülkeleri ve etkin bağlantıları gösterir; engelli ülkedeki izinli IP istisnası anlaşılmalıdır. Ülke ilkesi renkleri ile oturum yoğunluğunu ayrı göstergelerle ayırın. Kaydedilmiş dört düzey **0, 1–2, 3–9 ve 10+ oturumdur**; değerleri doğrulanmış diye yayımlamadan önce güncel uygulama kanıtını kontrol edin. İşaret kümeleri tekil IP ve bağlantılara açılmalı, ülke bilgisinden kesin IP koordinatı türetilmemelidir. Karma ilkeleri ve bilinmeyen/özel konumları belirtin. Eski **Active Users** metriği erişim günlüklerindeki yakın tarihli IP'leri sayıyordu; etkin TCP bağlantılarını değil. Küre ve liste filtreleri, zamanları, toplamları ve veri tazeliğini paylaşır. Kapatıldığı doğrulanan bağlantı sayıdan çıkar; çevrimdışı aracı veya eksik telemetri sıfır değil bilinmeyen/eski veri anlamına gelir.

## 10.7 Oturum listesi (NET-07)

Yukarı kaydırma listeyi açar; görünür aç/genişlet düğmesi fare ve klavye ile aynı erişimi sağlar. Kapatma/daraltma olmalıdır. Her satır bir bağlantıdır; aynı IP'deki birden çok bağlantı ayrı kalır. Kaynak IP, ülke veya özel/bilinmeyen durumu, sunucu, hedef port, biliniyorsa yapılandırılmış hizmet adı, durum ve gerçekten bilinen zaman gösterilir. **First observed** ilk bilinen gözlemdir; gerçek bağlantı başlangıcı olmak zorunda değildir. Arama, kapsam filtreleri ve sayfalama bütün satırlara eriştirmeli; bir sonuç sayfası toplam sayı değildir.

## 10.8 Bağlam menüsü ve kapatma (NET-08)

Kürede veya listede incelenebilir IP/oturuma sağ tıklamak **Shut down session** ve **Blacklist IP address** işlemlerini açar; dokunmatik ve klavye için görünür eşdeğer menü gerekir. Bir IP'nin birçok bağlantısı varsa tam bağlantı, sunucu ve port açıkça seçilir. **Shut down session**, aracı üzerinden sadece seçili gerçek bağlantıyı keser: 2525/22 SSH, desteklenen Kubernetes yolu veya başka korumalı TCP hizmeti. Sunucuyu, hizmeti, podu veya diğer bağlantıları kapatmaz; başlamış uygulama işini mutlaka durdurmaz ve yeniden bağlanmayı kalıcı engellemez. İşlemden hemen önce bağlantı kimliğini yeniden doğrulayın; tek başına IP, kullanıcı adı, yaklaşık zaman veya yeniden kullanılan PID yeterli değildir. İstenen/kuyruktaki işlem ile doğrulanmış sonucu ayırın; zaten kapanmış, eski kimlik, çevrimdışı, yetkisiz, desteklenmeyen, süresi dolmuş ve başarısız durumları doğru bildirin. Komut göndermek başarı kanıtı değildir; güvenli hedefli kesme yapılamıyorsa somut nedeni belirtin.

## 10.9 Oturumdan engelleme (NET-09)

**Blacklist IP address**, kaynak IP'yi sunucunun aynı kalıcı **Always Block** listesine ekler. Önce kaydedildi/bekliyor, aracı onayından sonra uygulandı veya başarısız gösterin; aynı kayıt **IP addresses** penceresinde görünür. IP **Always Allow** içindeyse açık taşıma işlemi sunun. Uygulandığında kapsamdaki yeni bağlantıları önler; açık bağlantının kapandığı anlamına gelmez, bunun için ayrı kapatma gerekir.

## 10.10 Kaydetme, uygulama ve geçiş (NET-10)

Tek ilke CMC, API/depolama, aracıya teslim edilen yapılandırma ve gerçek yaptırımı bağlar. Kaydedildi, bekliyor, uygulandı ve başarısız durumlarını sürüm/zaman ile ayırın; çevrimdışı aracının kuralı beklemede kalır. Yeniden başlatmada koruyun, eski komutları/tekrarları reddedin, işlemi yapan kişi/hesap/sunucu yetkilerini denetleyin; hedef, işlem, zaman ve sonucu kaydedin. Hesap çapındaki eski HTTP ülke engellemesi ve ayrı Geo JSON düzenleyicisi talimatlarını bu ortak süreçle değiştirin. Hesabın HTTP kara listesini sessizce tüm sunucuların SSH/Kubernetes engeline dönüştürmeyin. Yerel ve IP kısıtlarını korumayı zayıflatmadan veya gizli red oluşturmadan bilinçli taşıyın. Bağımsız HTTP analizi ve diğer özellikler kalır.

## 10.11 Zorunlu kontrol (NET-11)

Tamamlandı demeden önce **NET-01**–**NET-11** için dosya, kanıt ve açık eksikleri kontrol edin: 2525 SSH dahil bağımsız iki port; iki mod, boş listeler ve mod değişimi; iki sekme sırası ve birlikte etkin IP listeleri; Rusya'daki çalışanın her iki modda MFA ile istisnası; engel önceliği, IPv4/IPv6 ve tekrarlar; kürede ve listede gerçek SSH, Kubernetes ve sıradan TCP bağlantıları; dört düzey, eşit toplam ve eski telemetri; kaydırma, fare/klavye ve menüler; aynı IP'de bile yalnız seçili bağlantının kapatılması; zaten kapalı, yetkisiz, eski, başarısız ve desteklenmeyen sonuçlar; kalıcı engel, aracı onayı, yeniden başlatma, hesap ayrımı ve geçiş. Görsel arayüz veya sahte veriler yeterli değildir. Eksik gerçek Linux/Kubernetes ve tarayıcı denemelerini ayrıca belirtin.

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

**Veri tazeliği:** erişim günlükleri ve eski **Active Users** etkin TCP bağlantılarını saymaz. Bölüm 10'daki küre ile liste filtreleri, toplamları ve zamanları paylaşır. Eksik veya eski telemetri sıfır değil bilinmeyen/eski anlamına gelir.

Events'ı açın ve kullanılabilir filtreleri kullanın:

- Sensöre göre filtreleyin.
- Tam olay türünü kullanarak olay türüne göre filtreleyin.

- Önem derecesine göre filtreleyin: All severities, critical, high, medium, low veya info.
- Sayfalandırma için Previous ve Next'i kullanın.

Gösterildiğinde olay adını, kaynağını, türünü, kanıtını, önemini, zaman damgasını ve bağlantılı olayı inceleyin.

# 13. Sorun giderme

**Beklenmeyen erişim:** sunucu/portu, ülke modunu, gerçekten gözlenen kaynak IP'yi, **Always Block**/**Always Allow** listelerini, eski kısıtları ve uygulanan sürümü kontrol edin. IP değişince istisnayı güncelleyin. Bekleyen ilke, çevrimdışı aracı veya eski oturum gerçek durumu doğrulamaz; istenen, süresi dolan ya da desteklenmeyen kapatma doğrulanmış kapatma değildir.

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

**Güncel sınırlar:** Bölüm 10 kodunun tam gerçek Linux/Kubernetes ve tarayıcı doğrulaması sağlanan belgelerde yoktur. Süreli MFA izinleri nftables gerektirir. Toplayıcı yalnız seçilen düğümün ana makine ağ ad alanındaki kurulmuş TCP soketlerini görür; bütün podları, düğümleri veya dış yük dengeleyicileri değil. Soket kimliği yoksa durum desteklenmiyor; büyük anlık görüntü tam değil eski sayılır. Yeniden başlatma, aracı onayı ve hedefli kapatma henüz doğrulanmalıdır.

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
