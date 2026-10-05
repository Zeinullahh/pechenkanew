# WebSOC Kullanıcı Kılavuzu

WebSOC Merkezi Yönetim Konsolu (CMC), korunan hizmetleri kaydetmenizi, görüntülenecek Agent trafiğini seçmenizi ve koruma ayarlarını yönetmenizi sağlar. Etkin korumayı Agent sağlar; yönetim için CMC'yi kullanın.

## 1. Kontrol panelini açma

Hesabınızla CMC'de oturum açın. Kontrol paneli, ülkelere göre trafiği bir küre üzerinde gösterir ve düzenli aralıklarla yenilenir. Gezinme bölümünde **Dashboard**, **Compliance**, WebSOC ve Email Security hizmetlerine ve ürün talimatlarına bağlantılar bulunur.

Sol üstteki menü düğmesini görüntü tercihleri, dil, saat dilimi, ödeme geçmişi ve AI API anahtarı ayarları için kullanın. Profil menüsünde ekip erişimi, faturalandırma ayarları, hesap seçenekleri ve oturumu kapatma bulunur.

## 2. Korunan hizmet kaydetme

1. Kontrol panelinin sol üst tarafındaki **Data source selection** öğesini açın ve **Register new agent** seçeneğini belirleyin.
2. Ters proxy modunda korunan bir web sitesi için **Website only**; SMTP, özel uygulama veya Kubernetes gibi başka bir hizmet için **Other services** seçeneğini belirleyin.
3. Etki alanını ve geçerli origin/hizmet ana bilgisayarını veya IP adresini girin. Web sitesi için CMC bir edge düğümü önerebilir.
4. Web sitesi için formu göndererek kaydedin. Görüntülenen DNS kurulum ayrıntılarını izleyin: DNS sağlayıcınıza istenen ACME delegasyon CNAME kaydını ekleyin, ardından hizmetin DNS kaydını talimatlara göre WebSOC edge'e yönlendirin. ACME otomatik sertifika sürecidir; DNS kayıtları etki alanı denetimini kanıtlar ve trafiği yönlendirir.
5. CNAME ayarlandıktan sonra **Verify DNS delegation** seçeneğini belirleyin. Arayüz delegasyonun doğrulanıp doğrulanmadığını bildirir ve ayrıca A kaydı gerektiğini belirtir. Gerekirse **Redo verification** seçeneğini kullanın.
6. **Other services** için hizmet bilgilerini girdikten sonra formda **Get agent install command** görünür. O hizmet için oluşturulan talimatları izleyin.

Agent listesinde her etki alanı, adres ve durum gösterilir. **Active**, korumanın etkin, sahiplik/delegasyonun doğrulanmış ve DNS'in WebSOC edge'e yönlendirilmiş olduğu anlamına gelir. **DNS pending**, doğrulamanın başarılı olduğu ancak trafiğin henüz yönlendirilmediği anlamına gelir. **Delegation not verified** ve **Paused** durumları da gösterilir.

## 3. Agent seçme ve trafiği görüntüleme

1. **Data source selection** öğesini açın.
2. Kontrol paneli metriklerine dahil edilecek hizmetleri seçmek için bir veya daha fazla Agent satırını işaretleyin. Düğme seçili Agent sayısını gösterir.
3. Sağdaki metrik seçicisinden **RPS** (saniye başına istek), **Bandwidth** veya **Active Users** seçin. Etki alanına göre ayrıntıyı görmek için küredeki bir ülkenin üzerine gelin.
4. **Server Load Chart** ve en yüksek ülke özetlerini görmek için alt ortadaki okla grafiği açın. Bir zaman aralığı seçin; özetleri bu döneme odaklamak için grafiğin bir bölümünü seçin.

## 4. Agent yapılandırma, duraklatma, sürdürme veya kaldırma

**Data source selection** öğesini açın ve Agent satırındaki kontrolleri kullanın:

- Kalem simgesi **Agent Configuration** ekranını açar. Adresi düzenleyin, izin verilen bağlantı noktalarını (22, 80 ve/veya 443) seçin, iki faktörlü kimlik doğrulamayı açıp kapatın ve **Save** seçeneğini belirleyin.
- Belge simgesi **Domain setup details** ekranını açar. DNS delegasyonunu, yönlendirmeyi, hizmet türünü ve TLS sertifikası durumunu inceleyin. TLS, web sitelerinin kullandığı şifreli bağlantıdır.
- Yenileme simgesi sahipliği ve DNS delegasyonunu doğrular.
- Uygun role sahip kullanıcılar duraklat simgesiyle korumayı duraklatabilir veya oynat simgesiyle sürdürebilir. Kontrol panelindeki duraklatma işlemi 60 dakika sürer.
- Çöp kutusu simgesini seçip onaylayarak Agent'ı hesabınızdan silin.

## 5. Olayları ve güvenlik uyarılarını inceleme

Olay günlüklerini incelemek için kontrol panelinin solundaki **Incidents** seçeneğini belirleyin. Kaynağa, önem derecesine, olay türüne, IP adresine veya tarih aralığına göre filtreleyin. Liste sayfalandırılmıştır; eşleşen günlükleri indirmek için kullanılabilir dışa aktarma kontrollerini kullanın.

İşlem gerektiren bir güvenlik uyarısı göründüğünde saldırı özetini, IP göstergesini ve önerilen süreyi inceleyin. Sunulan sürelerden biri veya özel bitiş zamanı için engelleme yapabilir, onayladıktan sonra kaynağa izin verebilir ya da uyarıyı üst seviyeye taşıyabilirsiniz. Bu seçimler görüntülenen uyarıya uygulanır.

## 6. IP erişim kurallarını yönetme

Kontrol panelinin solundaki kalkan/IP erişim denetimini açın. Kural ayrıntılarını seçip kaydetmek için **Add rule** seçeneğini kullanın. Bu paneldeki kontrollerle mevcut kuralları inceleyebilir, kaldırabilir veya iptal edebilirsiniz. Engelleme listesi, sistemin engelleyecek şekilde ayarlandığı kaynakların listesidir; ülke kodlarını paneldeki **Add** ve **Remove** kontrolleriyle ekleyin veya kaldırın.

## 7. Ekip ve uyumluluk

### Team & Access

1. Profil menüsünü açıp **Team & Access** seçeneğini belirleyin.
2. **Invite** ile ekip arkadaşınızın e-posta adresini ve kullanıcı adını girin, bir rol seçin ve kaydedin.
3. Ekip üyelerini inceleyin, rol seçicisiyle rollerini değiştirin veya satır işlemleriyle üyeyi kaldırın. Sayfada ekip denetim günlüğü de gösterilir.

Kullanılabilir roller **Admin**, **Analyst** ve **Viewer** şeklindedir. Agent duraklatma/sürdürme işlemleri Admin ve Analyst rollerine açıktır.

### Compliance

Çerçevelere göre gruplandırılmış kontrol özetlerini ve durumlarını görüntülemek için ana gezinme menüsünden **Compliance** seçeneğini belirleyin. Bilgileri yeniden yüklemek için **Refresh** seçeneğini kullanın. Her kontrol; durumunu, son kontrol tarihini, sonraki incelemeyi ve kanıt öğesi sayısını gösterebilir.

## 8. Genel görüntü ve hesap seçenekleri

Menü düğmesi küre stili, dil ve saat dilimi tercihlerini sunar. Profil menüsünde ödeme geçmişi ve faturalandırma ayarları bulunur. İşiniz bittiğinde profil menüsünden **Sign out** seçeneğini kullanın.

---

## Doğrulanması gereken bilgiler

CMC, **Other services** için oluşturulmuş bir Agent kurulum komutu sunar ancak kullanıcı arayüzü her hizmet türü için kurulum sürecinin tamamını içermez. CMC dağıtımınızda gösterilen komutu ve hizmete özel talimatları izleyin; ek ana bilgisayar ön koşullarını WebSOC yöneticinize doğrulatın.
