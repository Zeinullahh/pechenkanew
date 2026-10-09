# Birleşik E-posta Platformu Kullanım Kılavuzu

Platform üç bağımsız ürünü bir araya getirir: **Admin Console / Silence 365 Email Visualizer** e-posta etki alanı kurulumu, posta akışı, tehdit incelemesi ve kuruluş yönetimi için; **Email Protector** güvenli web postası, mesaj sınıflandırması, ek taraması, klasörler ve taşıma için; **WebSOC / AI-SOC Web** web etki alanlarını güvenlik ağ geçidine bağlama, trafiği izleme, ülke kısıtlamaları ve bakiye yönetimi için kullanılır. Görünüm ve özellikler role, plana ve kuruluş ayarlarına bağlıdır. Üç konsolun adresini kuruluş yöneticinizden alın; birinin adresiyle diğerine giriş yapmayın.

## İçindekiler

1. [Platforma genel bakış](#1-platform-overview)
2. [Hesaba erişim](#2-account-access)
3. [Admin Console — Silence 365 Email Visualizer](#3-admin-console-silence-365-email-visualizer)
4. [Email Protector](#4-email-protector)
5. [WebSOC / AI-SOC Web](#5-websoc-ai-soc-web)
6. [Yaygın sorunlar](#6-common-issues)
7. [Güvenlik önerileri](#7-security-recommendations)
8. [Sözlük](#8-glossary)
9. [Destekle iletişim](#9-contacting-support)

## 1. Platforma genel bakış

### 1.1 Göreve göre ürün seçimi

| Görev | Ürün |
|---|---|
| E-posta etki alanı ekleyip MX, SPF, DKIM, DMARC ayarlama; posta akışını ve tehditleri inceleme; çalışanları, bölümleri ve şirket posta sunucularını yönetme | Admin Console; yönetim için yönetici rolü gerekir |
| E-posta okuma, gönderme, düzenleme; mesaj sınıflandırmasını ve ek taramasını kontrol etme; başka bir hizmetten posta taşıma | Email Protector |
| Web etki alanını güvenlik ağ geçidine bağlama; RPS, bant genişliği, etkin IP adresleri ve trafik coğrafyasını inceleme; ülke veya izin verilen bağlantı noktalarını kısıtlama | WebSOC |

### 1.2 Roller ve erişim hakları

| Rol | Temel yetenekler |
|---|---|
| E-posta kullanıcısı | Kendi mesajlarını, klasörlerini ve kişisel ayarlarını yönetir |
| Kuruluş yöneticisi | Çalışanları, bölümleri, etki alanlarını, ortak imzaları ve koruma ayarlarını yönetir |
| Etki alanı yöneticisi | DNS ve posta sunucularını yapılandırır; etki alanı durumunu kontrol eder |
| WebSOC yöneticisi | Web etki alanlarını bağlar; kaynak adresini ve ülke listesini değiştirir |
| Platform çalışanı | Kararlaştırılan müşteri fiyatlarını yönetir; bu alan sıradan müşterilere kapalıdır |

Gerekli öğe yoksa veya erişim reddedilirse kuruluş yöneticinize başvurun. Kısıtlamaları aşmak için başkasının hesabını kullanmayın.

### 1.3 Başlamadan önce

Göreve göre gereken konsol adresini, çalışan bir hesabı, 2FA için kimlik doğrulama uygulamasını, DNS paneli erişimini, WebSOC için site ve DNS değiştirme yetkisini, kaynak web sunucusunun adını veya adresini, taşıma için dış posta kutusu kimlik bilgilerini ya da Microsoft yetkilendirmesini ve bakiye yükleyecekseniz ödeme yetkisini hazırlayın.

> Önemli: DNS değerlerini, IP adreslerini, doğrulama anahtarlarını ve tutarları daima kendi konsolunuzdan alın. Örnekleri veya başka müşterinin değerlerini kopyalamayın.

## 2. Hesaba erişim

### 2.1 Genel giriş kuralları

Her konsolun ayrı giriş ekranı ve oturumu vardır. Tek oturum açma etkinse konsol **AI-CSD** adresine yönlendirir veya **Sign in with AI-CSD / Sign in** gösterir. Yöneticinizin verdiği ürün adresini açın, sunulan yöntemi seçin, SSO, Google veya Microsoft için sağlayıcı doğrulamasını tamamlayın. 2FA sayfası açılırsa altı haneli kodu girin. Girişten sonra profilde beklediğiniz hesabın göründüğünü doğrulayın.

### 2.2 Admin Console'a erişim

Sunulabilecek seçenekler: e-posta ve parolayla **Sign in**, **Continue with Google**, **Continue with Outlook**, SSO etkinse **Sign in with AI-CSD / Sign in**. Müşteri hesabı oluşturmak için **Create account**, **Monthly** veya **Yearly** ve ekrandaki güncel ad, sınır ve fiyatlara göre plan seçin. Kullanıcı adı ve e-posta girin; e-posta alanının yanındaki düğmeyle doğrulama kodu gönderin. Gelen kodu ve parolayı yazın, varsa kayıt bitmeden promosyon kodunu girin, kaydı tamamlayıp Admin Console'a giriş yapın.

Yerel hesap için 2FA kurulur: **Set Up Two-Factor Authentication** ekranında QR kodunu bir kimlik doğrulama uygulamasıyla tarayın. Taranamıyorsa **Can't scan? Enter key manually** ile gösterilen anahtarı ekleyin. Altı haneli kodu girip **Activate 2FA** seçin. Sonraki girişlerde kodu **Two-Factor Authentication** ekranına yazıp **Verify** seçin.

### 2.3 Email Protector'a erişim

SSO otomatik açılabilir veya **Continue with Google**, **Continue with Microsoft**, **Email** ve **Password** ile **Sign in**, ya da **Login with QR Code** görünebilir. Yerel hesapları genellikle kuruluş yöneticisi oluşturur. İlk girişte geçici parolayı değiştirme, 2FA kurma ve altı haneli kodla doğrulama gerekebilir. QR ile giriş için **Login with QR Code** seçin, görüntülenen kodu ikinci bir yetkili cihazla tarayın ve onay sayfasında girişi onaylayın.

### 2.4 WebSOC'a erişim

Kayıt için **Welcome** ekranında **Register** seçin; **Email**, **Username**, parola ve **Confirm password** doldurun. Gerekirse **Recovery password**, **Recovery email**, **Promocode** ekleyin. Yaşınızı ve koşulları kabul ettiğinizi onaylayıp **Continue** seçin. **Set up 2FA** ekranında QR kodunu tarayın veya gizli anahtarı elle girin; **6-digit code** yazıp **Verify and finish** seçin. WebSOC parolası ve kurtarma parolası en az bir büyük Latin harf ve bir rakam içermeli, yalnız Latin harfleriyle rakamlardan oluşmalıdır.

Normal girişte **Log in** seçin, **Email or Username** ve **Password** girip **Continue** seçin; **Two-factor authentication** kodunu yazıp **Verify and continue** seçin. Parola kurtarmak için **Forgot password?** ile e-posta kodu isteyin, kodu ve yeni parolayı girin. **Resend code** tekrar gönderir.

## 3. Admin Console — Silence 365 Email Visualizer

### 3.1 İlk kurulum

Kendi kendine kayıt olan müşteri hesabında plan seçip **Initial domain mail setup** işlemini tamamlayın. Sihirbazın dört aşaması **Domain**, **DNS verification**, **Security**, **Ready** olup ilerleme etki alanı için saklanır. Kuruluş yalnız Google veya Outlook kullanıyorsa ve **Use AI-SOC as security layer (Gmail/Outlook only)** varsa barındırılan etki alanı postasını yapılandırmadan devam edebilirsiniz. Bu seçeneği önce etki alanı yöneticisiyle kararlaştırın.

### 3.2 Etki alanı ekleme ve doğrulama

**Step 1. Add domain** alanına `https://` ve yol olmadan etki alanını girip **Continue** seçin. **Step 2. Verify domain via DNS** ekranındaki **TXT name** ve **TXT value** değerlerini kopyalayıp DNS panelinde TXT kaydı oluşturun. DNS yayılımını bekleyin, **Check now** seçin; sihirbaz düzenli aralıklarla da kontrol eder. **Verified** görünmeden ilerlemeyin. Bazı DNS panelleri Name'e etki alanını kendiliğinden ekler; yinelenen soneki önlemek için konsol uyarısını izleyin.

### 3.3 MX, SPF, DKIM ve DMARC yapılandırma

**Step 3. Security setup** eklenecek tam kayıtları gösterir. MX gelen postayı doğru sunucuya yönlendirir; SPF izin verilen gönderen kaynakları listeler; DKIM dışarı giden imzaları doğrulama anahtarını yayımlar; DMARC SPF veya DKIM'den geçemeyen iletilerin politikasını ve raporlamasını tanımlar. Gerekiyorsa kayıt oluşturun; **Type**, **Name/Host**, **Value**, **Priority**, **TTL** değerlerini aynen kopyalayıp DNS'de oluşturun veya güncelleyin; yayılımı bekleyip **Verify** seçin ve **Configured** durumunu doğrulayın. İstenirse DMARC RUA ve RUF takma adları, toplu ve hata raporlarının adresleridir.

> Önemli: Mevcut SPF kaydını değiştirmeden posta yöneticisiyle koordine edin. Aynı ad altında birden çok SPF kaydı gönderen doğrulamasını bozabilir.

**Not configured** kayıt bulunamadı; **Update required** önerilen değerden farklı; **Configured** beklenen değere eşit; **Pending verification** değişiklik henüz görülmedi; **Error** doğrulama tamamlanamadı demektir. Hepsi hazırsa **Step 4. Ready** aşamasına geçip **Go to dashboard** seçin.

### 3.4 Etki alanlarını yönetme

Yöneticiler **Domains** ve **Domain management** üzerinden etki alanı ekleyebilir, doğrulama belirtecini kopyalayabilir, **Verify** işlemini yineleyebilir, MX/SPF/DKIM/DMARC durumlarını ayrı görebilir, **Set default** kullanabilir, izin verilen SMTP sunucu IP'lerini girebilir, **DNS setup** açabilir, yeniden adlandırabilir veya silebilir. Silmeden önce çalışanların ve posta istemcilerinin etki alanını kullanmadığını doğrulayın. Silme ayrıca onay ister.

### 3.5 Pano ve posta akışı

Pano grafiği çalışan, bölüm veya etki alanlarını düğüm, posta alışverişini bağlantı olarak gösterir. **Incoming** veya **Outgoing** seçin; **Time range** içinde son saat, 3/6/12/24 saat, tüm zamanlar veya özel aralık seçin. Gerekirse **Filter** içinde gönderen, alıcı, konu, metin veya ek koşullarını girip **Apply filters** seçin. İlgili iletiler için bir düğümü açın; arama ve **Newest first** / **Oldest first** sıralamasını kullanıp içerik, üstbilgiler ve ekleri inceleyin. Bölüm ve etki alanı analiz kartları da vardır. Özel aralık gelecekte bitemez ve başlangıcı bitişinden önce olmalıdır.

### 3.6 Tehdit kategorileri

Panonun alt okundan **Threat categories** açılır. **Possibly spoofed** gönderen veya etki alanı taklidi olasılığı, **Spam** istenmeyen posta, **Dangerous link** tehlikeli olabilecek bağlantı, **Possibly phishing** kimlik veya ödeme bilgisi toplama olasılığı, **Malware in the attachment** ekte zararlı nesne, **Secure emails** bilinen tehdit göstergesi bulunmaması demektir. Kartı ve **Click to view** seçerek gönderen, alıcı, tarih, içerik, kaynak metin ve ekleri görün. Ek durumları **Safe**, **Suspicious**, **Malware detected**, **Pending scan** şeklindedir. Trash'e taşıma ile **Delete permanently** farklıdır; kalıcı silmeden önce seçili iletiyi kontrol edin.

### 3.7 Çalışanlar ve yöneticiler

**Settings** → **Employees** → **+ Add** → **Create manually** üzerinden gerekli e-posta, ad, soyad ve diğer verileri girin. Google, Microsoft veya iç hesap giriş yöntemini doğrulayın, gerekirse adres, telefon ve takma ad ekleyip **Create** seçin. Toplu eklemede **Upload employee list**, **Download CSV template**, şablon yapısını koruma, **Import**, ardından **Created** ve **Skipped** durumlarını inceleme adımlarını uygulayın. Çalışan menüsünde **Edit**, iç hesaplarda **Change password**, **Edit aliases**, **Make administrator** / **Revoke administrator rights**, **Delete** bulunabilir. Yönetici hakkını yalnız kuruluş yönetimi gerçekten gerekiyorsa verin.

### 3.8 Bölümler

**Settings** → **Departments** ekranında benzersiz adla bölüm oluşturun, üye listesinden çalışan ekleyin veya kaldırma eylemiyle çıkarın. Bölümü silmeden üyeleri ve görselleştirmeye etkisini kontrol edin.

### 3.9 Genel koruma ayarları

Yalnız yöneticilere açık **Security** sekmesinde **Enable phishing detector**, **Enable attachment virus scanning**, etki alanı ve adresler için **Block management** ve şirket posta sunucusu ayarlarına bağlantı bulunabilir. Anahtar değiştirdikten sonra kaydın bitmesini bekleyin ve yeni durumun korunduğunu doğrulayın.

### 3.10 Şirket e-posta sunucuları

**Company Email Servers** içinde **IMAP server**, **IMAP port**, **IMAP security** ve gerekiyorsa **SMTP server**, **SMTP port**, **SMTP security** girin. Sunucuya göre **SSL/TLS** veya **STARTTLS** seçin; kaydedip posta istemcisi parametrelerini inceleyin. SMTP belirtilmezse dış istemciler IMAP ile alır, ancak gönderme yalnız web uygulamasında mümkündür. **None / plain text** veriyi kanal korumasız iletir; sadece yalıtılmış güvenilir ağda güvenlik yöneticisinin kararıyla kullanın.

### 3.11 Kuruluş ve yapay zekâ ayarları

**General** sekmesinde dil ve saat dilimi seçilir; yeterli yetkiyle kuruluş adı ve logosu da değişir. **AI Agent** varsa yönetici sağlayıcı ve model seçebilir, yalnız desteklenen yapılandırmada uç nokta girebilir, erişim anahtarını güvenli saklayıp kaydedebilir ve yerleşik bağlantı testini çalıştırabilir. Anahtarı çalışanlarla paylaşmayın veya ekran görüntülerinde göstermeyin.

### 3.12 Plan, cüzdan ve ödemeler

Profil menüsünde **Balance**, **Top Up Balance**, **Manage Plan** vardır. Yükleme için görünen para birimini ve alt/üst sınırları kontrol edip tutar girin, **Pay** seçin, güvenli ödeme sayfasında tamamlayın ve yeni bakiyeyi doğrulayın. Plan değiştirmek için kullanıcı, yönetici, depolama ve yapay zekâ işlem sınırlarını karşılaştırın; aylık veya yıllık faturalamayı ve planı seçip etkinleştirme veya geçiş maliyetini inceleyerek onaylayın. Fiyat ve para birimi dağıtıma ve müşteri sözleşmesine bağlıdır; yalnız kendi konsolunuzdaki değerleri kullanın.

## 4. Email Protector

### 4.1 Ana arayüz alanları

Girişten sonra klasör kenar çubuğu, ileti listesi, okuma ve güvenlik ayrıntıları, **Compose**, arama, hesap değiştirici, **Settings**, dil ve çıkış menüsü vardır. Sistem klasörleri **All mail**, **Important**, **Inbox**, **Sent**, **Drafts**, **Scheduled**, **Trash** içerebilir. Security alanında kuruluşun karantina ve hata klasörleri; **My folders** altında kişisel klasörler bulunur.

### 4.2 İleti okuma ve kontrol

Klasörü ve iletiyi seçip göndereni, alıcıları, konuyu, tarihi, renk göstergesini ve güvenlik sınıfını kontrol edin. **Attachments** bölümünü açarak her dosyanın durumuna bakın; gerekirse **Show details** veya **Show source text** seçin. **Secure** olsa da temel dikkati sürdürün. **Spam** için göndereni doğrulayın ve istenmeyen postayı yanıtlamayın. **Possibly Spoofed** için göndereni bağımsız kanaldan doğrulayın. **Possibly Phishing** için bağlantılara gitmeyin veya kimlik bilgisi girmeyin. Tehlikeli bağlantıyı uzman incelemesi öncesi açmayın; tehlikeli eki indirmeyin ya da çalıştırmayın.

Eklerde **Clean** indirmeye izin verildiğini, **Suspicious** ayrıntı incelemesi ve gerekirse yönetici görüşü gerektiğini, **Download blocked** engelin aşılamayacağını, **Scanning…** beklenmesi gerektiğini, **Not scanned** ek kontrol olmadan açılmaması gerektiğini belirtir. **Clean** sonucu bile iletinin bağlamı, gönderen adresi ve ekin beklenip beklenmediği kontrolünün yerine geçmez.

### 4.3 Arama ve liste işlemleri

**Search emails...** alanına metin girin ve **All**, **Secure**, **Spam**, **Spoofing**, **Threats found** filtrelerini kullanın. Yıldız iletiyi **Important** içine ekler. Klasör menüsü özel klasöre taşır veya **Inbox** içine döndürür. Birden çok ileti topluca Trash'e taşınabilir. **Trash** içinde **Restore** veya kalıcı silmeyi seçin; yalnız listenin bir bölümü görünüyorsa **Load more** kullanın. Kalıcı silme geri alınamaz; önce Trash'i ve seçili iletileri doğrulayın.

### 4.4 İleti yazma ve gönderme

**Compose** seçin; **To**, gerekirse **Cc** ve **Bcc**, konu ve metni doldurun. Ek düğmesiyle dosya ekleyin. Sonra göndermek için **Schedule send** ile gelecekte bir tarih ve saat seçip **Send email** kullanın. **Drafts** içindeki taslak düzenlenip gönderilebilir; **Scheduled** içindeki iletiler teslimden önce ilgili işlemle incelenip iptal edilebilir.

### 4.5 Açık iletide işlemler

İleti ve yetkiye göre **Important** işaretini koyup kaldırabilir, tam görünümü veya kaynak metni açabilir, klasöre taşıyabilir, çevirip aslına dönebilir, yapay zekâ yanıt taslağı oluşturabilir, desteklenen bağlantı varsa abonelikten çıkabilir veya Trash'e taşıyabilirsiniz. Abonelikten çıkmadan göndereni doğrulayın; açıkça kimlik avı olan iletideki çıkış bağlantısını kullanmayın.

### 4.6 Özel klasörler ve kurallar

**New folder** veya **Create folder** seçip **Folder name** girin. Klasöre alınacak adres veya etki alanlarını **Inclusion rules**, istisnaları **Exclusion rules** bölümüne ekleyip **Save** seçin. Dışlama kuralları önceliklidir. Klasör menüsünden ad ve kuralları değiştirebilir veya silebilirsiniz; silmeden ekrandaki uyarıyı okuyun.

### 4.7 Hesap değiştirme

Hesap menüsü yetkili başka bir hesap ekleyip geçiş yapar. **Add account** seçin; Google veya Microsoft için sağlayıcıda oturum açın, yerel hesap için e-posta, parola ve istenirse 2FA kodu girin. Listeden geçilecek hesabı seçin. Etkin hesap listeden kaldırılamaz; yerel hesaba geçerken parola yeniden istenebilir.

### 4.8 Posta kutusu ayarları

**Settings** içinde istediğiniz bölümü açın.

#### Genel

**Sender name**, gönderilenler klasörü, saat dilimi ve tarih biçimini ayarlayıp **Save** seçin.

#### İmza

**Add to outgoing emails** etkinleştirin, düzenleyicide imzayı hazırlayıp **Signature preview** inceleyin ve kaydedin.

#### Otomatik yanıt

**Autoresponder** etkinleştirin; başlangıç ve bitiş tarihleriyle yanıt metnini girin, isterseniz **Reply once per sender** kullanın, önizlemeyi kontrol edip kaydedin.

#### Yönlendirme

Yönlendirme adresi girip **Add** seçin, **Keep a copy in Inbox** seçeneğine karar verin ve kaydedin.

#### Engellenen gönderenler

Adres girip **Block sender** seçin; iletileri otomatik Spam'e gider. **Unblock** ile geri alın.

#### Hesap yönetimi

Kayıtlı hesabın görünen adını ve e-postasını değiştirin veya etkin olmayan hesabı listeden çıkarın.

#### Depolama

Kullanılan alan ve kota yüzdesini inceleyin. %90'ı aşarsa gereksiz ileti ve ekleri silin veya plan için yöneticiye danışın.

#### Görünüm ve davranış

Trash otomatik silme süresi, özel arka plan ve bulanıklık, cam görünümü, okundu işaretleme davranışı, önizleme paneli, konuşma modu, yazma yazı tipi ve boyutu sunulabilir.

### 4.9 Posta taşıma

**Account settings** → **Email migration** → **Start migration** açın. **Gmail**, **Outlook**, **iCloud**, **Custom IMAP** desteklenir. Gmail veya iCloud için sağlayıcıyı ve dış posta kutusunu seçin; istendiğinde ana parola yerine sağlayıcının oluşturduğu uygulama parolasını girip **Start Migration** seçin. Outlook için **Connect Outlook Account** ile Microsoft erişimini onaylayın. **Custom IMAP** için **IMAP Server** ve **Port** da girin. İlerleme yüzdesi, işlenen ileti sayısı ve geçerli klasör görünür; **Pause** ve **Resume** işlemi yönetir, bitince **Migration Complete!** çıkar. Bitmeden posta erişimini veya uygulama parolasını iptal etmeyin.

### 4.10 Yapay zekâ özellikleri

Yönetici açtıysa iletideki AI simgesi yanıt taslağı oluşturur; **AI auto reply** üretilen yanıtı incelemek üzere taslak olarak saklayabilir; AI Assistant iletiyi özetleyebilir, açıklayabilir veya yanıt hazırlayabilir. Otomatik gönderimi yalnız kuruluş politikasına uygun biçimde açın. Göndermeden alıcıları, olguları, ekleri ve üslubu kontrol edin. Asistana sır, parola veya ilgisiz kişisel veri vermeyin.

### 4.11 Calendly

**Calendly** durum olarak **Connected** veya **Not connected** gösterir. Calendly entegrasyonlarında kişisel belirteç oluşturup **Calendly API token** alanına girin, **Connect Calendly** seçin ve **Connected** durumunu doğrulayın. **Disconnect Calendly** bağlantıyı sonlandırır. Belirteci gizli tutun.

### 4.12 Kullanıcı yönetimi ve ortak imzalar

Yöneticiler izinli kullanıcıları ve şirket imzalarını yönetir. Ortak imza için **Company Signatures** altında **New** seçin, **Signature Name** girin, kapsamı **Company**, **Domain**, **Department** veya **User** seçin, içeriği yazıp **Preview** inceleyin, **Active** açıp **Create** veya **Save** seçin. Düzenlerken seçili etki alanı, bölüm veya kullanıcıyı kontrol edin. Silme ayrıca onay gerektirir.

## 5. WebSOC / AI-SOC Web

### 5.1 Etki alanı bağlama

WebSOC bağlantı nesnesine “agent” der; kullanıcı sihirbazı ise etki alanı ve kaynak web sunucusunu yapılandırır. Doğrulanmamış bir komutla yazılım kurmanız gerekmez. **Data source selection** açıp **Add new agent** veya **Register new agent** seçin, korunan etki alanını **Domain**, mevcut kaynak sunucu veya IP'yi **IP address** alanına girip **Register** seçin.

#### Adım 1. Site sahipliğini doğrulama

**Step 1. Add ownership meta tag on your origin website** ekranında **Copy tag** seçin; gösterilen meta etiketini ana sayfanın `<head>` bölümüne ekleyip yayımlayın ve sayfanın etki alanı adıyla herkese açık olduğunu doğrulayın. **Copy key** yalnız anahtarı, **Copy tag** etiketin tamamını kopyalar.

#### Adım 2. ACME yetkilendirmesi

**Step 2. Add ACME delegation CNAME** içindeki **Name** ve **Hostname (target)** değerlerini kopyalayıp CNAME kaydı oluşturun, DNS yayılımını bekleyip **Verify ownership and DNS** seçin. **Ownership and DNS verified** başarıyı gösterir; trafik yönlendirmesi henüz etkin olmayabilir.

#### Adım 3. Trafiği değiştirme

Doğrulama sonrası **Step 3. DNS A record to add (switch traffic through WebSOC)** görünür. **Name** ve **IP address** kopyalayın, WebSOC kaynak sunucusunun doğru ve izinli bağlantı noktasında yanıt verdiğini kontrol edin. Gösterilen A kaydını oluşturun veya güncelleyin, DNS yayılımını bekleyin ve **Domain setup details** içindeki **DNS routing** durumunu inceleyin. A kaydı kullanıcı trafiğini değiştirir; onaylanmış değişiklik penceresinde yapın ve kurtarma için DNS ile kaynak sunucu erişimini koruyun.

### 5.2 Etki alanı durumları

**Delegation not verified** meta etiketi veya CNAME doğrulanmadı; **Delegation verified / DNS pending** sahiplik ve yetkilendirme doğrulandı ancak A kaydı henüz WebSOC üzerinden gitmiyor; **Active** yetkilendirme ve DNS yönlendirmesi etkin demektir. Dairesel ok yeniden doğrular, belge düğmesi gerekli değerlerin tamamını içeren **Domain setup details** açar.

### 5.3 Kaynak sunucuyu ayarlama

**Data source selection** içinde etki alanını bulun, kalemi seçin ve **Agent configuration** içindeki **IP address** değerini inceleyin. Yeni kaynak sunucu veya IP'yi girip **Save** seçin, **Configuration updated successfully!** mesajını bekleyin. Değiştirmeden yeni kaynağa erişilebildiğini ve doğru etki alanını sunduğunu doğrulayın.

### 5.4 Etki alanlarını ve trafik haritasını kullanma

**Data source selection** içinden incelenecek etki alanlarını seçin. Sağda **RPS** saniyedeki istekleri, **Bandwidth** aktarılan veriyi, **Active Users** etkin IP sayısını gösterir. Seçili alanların verileri için kürede bir ülkenin üzerine gelin. Harita yoğunluğu ülkeleri seçilen ölçüte göre karşılaştırır; eğilimi yorumlarken yalnız renge değil grafiğe de bakın.

### 5.5 Grafikler ve başlıca ülkeler

Alttaki ok **Server load chart** açar; süreler **1 day**, **2 days**, **7 days**, **14 days**, **1 month**, **3 months**. Pencere ayrıca etkin IP, bant genişliği ve RPS bakımından önde gelen ülkeleri listeler. Grafikte bölge seçimi ilişkili ölçütlerin süresini daraltır. Yanıltıcı sonuçlardan kaçınmak için aynı etki alanlarını ve süreleri karşılaştırın.

### 5.6 Anormallik bildirimleri

Anormallikte üstte kırmızı mesaj paneli çıkar. Okuyup etki alanını ve saati kaydedin, ardından **OK** seçin. Paneli kapatmak yalnız okunduğunu doğrular, nedeni çözmez. Grafiklerle kaynak hizmeti inceleyin ve gerekirse güvenlik yöneticisine bildirin.

### 5.7 Ülke kara listesi

**Country blacklist** seçin, **Not blacklisted** açın veya ülke arayın, ülkeyi seçip **Add** kullanın; **Blacklisted** altında göründüğünü doğrulayın. Geri almak için **Blacklisted** içindeki ülkeyi seçip **delete** kullanın. Eklemeden o ülkedeki çalışanları, müşterileri, dış izleme veya ödeme sistemlerini değerlendirin; izin verilen ülkeden yönetici erişimini koruyun.

### 5.8 Dil ve tema

Sol üst menü **Globe style**, **Select language**, **Payment history**, **Promo code** içerir.

### 5.9 Bakiye ve ödemeler

Profil menüsü bakiyeyi gösterir. **Top up balance** seçin, görüntülenen asgari tutar veya üstünü girin, **Create payment** seçin, güvenli ödeme penceresinde tamamlayıp bakiyenin güncellenmesini bekleyin. **Payment history** işlemleri gösterir: **Completed** tutar yatırıldı, **Pending** işlem sürüyor, **Failed** ödeme tamamlanmadı. **Promo code** altına promosyon kodu girin; **Locked** görünürse o hesap için değiştirilemez.

### 5.10 Etki alanı silme

Etki alanının yanındaki çöp simgesi onaydan sonra siler. Önce DNS'yi kaynağa geri çevirmek için gereken bilgiyi kaydedin ve WebSOC'un artık alanı sunmaması gerektiğini doğrulayın.

## 6. Yaygın sorunlar

### 6.1 Giriş yapılamıyor

Doğru konsolu, SSO/Google/Microsoft/yerel hesap yöntemini, klavye düzenini ve e-postayı kontrol edin. Varsa yerel parola kurtarmasını kullanın. Yetki eksikse kuruluş yöneticisine danışın.

### 6.2 2FA kodu reddedildi

Eski kodun süresi dolmuş olabilir; yeni kimlik doğrulama kodu girin. Telefonda tarih ve saati otomatik yapın, uygulamada doğru hesabı seçin. Uygulama kodu istenirken SMS kodu kullanmayın. Tekrarlanan hatada denemeyi durdurup desteğe başvurun.

### 6.3 Doğrulama veya kurtarma kodu gelmedi

E-posta adresini, Spam ve Quarantine klasörlerini kontrol edin; birkaç dakika bekleyip bir kez yeniden gönderin. Kuruluş sistem iletilerini filtreliyorsa posta yöneticisine danışın.

### 6.4 Admin Console etki alanı beklemede kaldı

TXT adı ve değerini karakter karakter karşılaştırın; DNS panelinin alanı iki kez eklemediğini ve doğru DNS bölgesinde olduğunuzu kontrol edin, yayılımı bekleyip **Check now** seçin.

### 6.5 SPF, DKIM, DMARC veya MX doğrulanmıyor

Admin Console kaydını tekrar açıp tür, ad, değer, öncelik ve TTL karşılaştırın. SPF için çakışan kayıtlar; DKIM için seçici ile `_domainkey`; DMARC için `_dmarc` ve rapor adresleri; MX için hedef sunucu ve öncelik kontrol edilir. Düzeltme ve DNS yayılımından sonra **Verify** seçin.

### 6.6 Mesajlar veya ölçütler güncellenmedi

Varsa **Refresh** seçin; klasör, etki alanı, yön, süre, çok dar filtreler ve etkin hesabı kontrol edin, sayfayı yenileyip tekrar deneyin.

### 6.7 Ek engellendi

Korumayı kapatmayın veya taramayı aşmak için gönderenden dosyanın adını değiştirmesini istemeyin. Gizli içeriği açıklamadan yöneticiye göndereni, konuyu, alınma saatini, dosya adını ve görünen tarama durumunu/ayrıntılarını verin.

### 6.8 Posta taşıma bağlanmıyor

Sağlayıcıyı kontrol edin; Gmail veya iCloud için geçerli uygulama parolası kullanın; Outlook için **Connect Outlook Account** yineleyin; **Custom IMAP** için sunucu, bağlantı noktası, e-posta ve parolayı doğrulayın; duraklatıldıysa **Resume** seçin.

### 6.9 WebSOC etki alanını doğrulamıyor

Meta etiketinin erişilebilir kaynak sayfada yayımlandığını doğrulayın; CNAME Name ve Hostname değerlerini **Domain setup details** ile karşılaştırın; DNS'yi bekleyip **Verify ownership and DNS** veya yeniden deneme simgesini seçin. Durum **Delegation verified / DNS pending** ise A kaydını ayrıca inceleyin.

### 6.10 WebSOC değişikliği sonrası erişim yok

Ülkenizin **Country blacklist** içine eklenip eklenmediğini, kaynak sunucu veya IP'yi kontrol edin ve korunan yönetim kanalından yanlış kısıtlamayı geri alın.

### 6.11 Ödeme beklemede kaldı

Hemen başka ödeme oluşturmayın. **Payment history** inceleyin, işlemden sonra bakiyeyi yenileyin. Durum değişmiyorsa desteğe saat, tutar ve işlem kimliğini verin. Kart numarası, CVC veya onay kodu göndermeyin.

## 7. Güvenlik önerileri

- Parola yöneticisinde saklanan benzersiz parolalar kullanın; 2FA sırrını ve kimlik doğrulama cihazını koruyun.
- Doğrulama kodlarını, kurtarma ve uygulama parolalarını, AI anahtarlarını veya Calendly belirteçlerini paylaşmayın. Destek ekran görüntülerinden sırları silin.
- DNS değerlerini yayımlamadan hemen önce güncel konsolla karşılaştırın. Deneme için kimlik avı veya ek taramasını kapatmayın.
- Mesaj tanıdık diye gönderene güvenmeyin; beklenmedik para taleplerini ve değişen ödeme bilgilerini bağımsız kanaldan doğrulayın.
- Yönetici yetkilerini en az ayrıcalıkla verin, ülke kısıtlamasından önce yedek yönetici erişimini koruyun.
- Etki alanı, tehdit, ek, WebSOC ve ödeme durumlarını düzenli kontrol edin.

## 8. Sözlük

| Terim | Anlamı |
|---|---|
| 2FA | Kimlik doğrulama uygulamasından tek kullanımlık kodla ikinci giriş faktörü |
| Uygulama parolası | E-posta sağlayıcısının uygulama erişimi için oluşturduğu ayrı parola |
| DKIM | DNS anahtarıyla doğrulanan giden ileti imzası |
| DMARC | SPF veya DKIM'den geçemeyen iletilerin politikası ve raporlanması |
| DNS | Alan adlarını hizmetlere ve ayarlara bağlayan kayıtlar |
| IMAP | Sunucudaki postaya erişim protokolü |
| MX | Posta alan sunucuyu tanımlayan DNS kaydı |
| Kaynak sunucu | WebSOC'un izinli istekleri ilettiği asıl web sunucusu |
| Quarantine | Şüpheli iletiler için yalıtılmış alan |
| RPS | Saniyedeki web isteği |
| SMTP | E-posta gönderme protokolü |
| SPF | Etki alanı adına göndermeye izin verilen kaynakların DNS politikası |
| TTL | DNS kaydının önbellek süresi |

## 9. Destekle iletişim

Kuruluşunuzun sağladığı destek kanalını kullanın. Ürün adı (Admin Console, Email Protector veya WebSOC), parola olmadan hesap e-postası, gerekirse etki alanı, tarih, kesin saat ve saat dilimi, eylem sırası, görünen hata metninin tamamı, anahtar/belirteç/QR/kişisel veri içermeyen ekran görüntüsü hazırlayın. Ödeme için kart bilgisi olmadan tutar, durum ve işlem kimliği; e-posta için gönderici, konu ve saat verin, zorunlu olmadıkça gizli içerik göndermeyin. Parolanızı, altı haneli 2FA kodunu, gizli anahtarı, kurtarma parolasını, uygulama parolasının tamamını, CVC'yi veya özel AI anahtarını asla göndermeyin.
