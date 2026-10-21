"""Seed Polish, Malay, and Indonesian catalogs with local translations."""

import copy
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "src" / "locales"
english = json.loads((root / "en.json").read_text(encoding="utf-8"))

translations = {
    "id": {
        "languageSelector": {
            "triggerLabel": "Pilih bahasa", "menuLabel": "Pilih bahasa", "searchLabel": "Cari bahasa",
            "searchPlaceholder": "Cari berdasarkan nama", "searchResults": "Hasil pencarian",
            "noMatches": "Tidak ada bahasa yang cocok.", "popular": "Paling populer", "allLanguages": "Semua bahasa",
        },
        "header": {
            "andManyMore": "Dan masih banyak lagi...",
            "nav": {"main": "Utama", "pricing": "Harga", "articles": "Artikel", "compliance": "Kepatuhan",
                    "partners": "Klien/Mitra", "affiliate": "Program afiliasi", "instructions": "Panduan",
                    "home": "Beranda", "systems": "Sistem", "services": "Layanan",
                    "developerServices": "Layanan pengembangan", "instructionsEmailSecurity": "Keamanan Email",
                    "instructionsWebSecurity": "Keamanan Web", "instructionsServerSecurity": "Keamanan Server"},
            "login": "Masuk",
            "cta": {"loginRegister": "Masuk/Daftar", "contact": "Hubungi", "download": "Unduh",
                    "requestDemo": "Minta demo", "get": "Mulai"},
        },
        "footer": {"contactLabel": "Kontak", "addressLabel": "Alamat", "addressValue": "Astana, Kazakhstan",
                   "links": {"cookies": "Kebijakan Cookie", "termsUse": "Ketentuan Penggunaan",
                             "termsService": "Ketentuan Layanan", "privacy": "Kebijakan Privasi",
                             "affiliateTerms": "Ketentuan Program Afiliasi"}},
        "home": {
            "hero": {"title": "Keamanan siber kini tidak lagi", "titleHighlight": "rumit atau mahal",
                     "subtitle": "Bangun dengan aman. Luncurkan dengan percaya diri."},
            "systems": {"title": "Sistem", "cta": "Lihat detail", "aiSoc": {"badge": "Langganan"},
                        "sithub": {"badge": "Langganan"}, "supreme": {"badge": "Ekstensi"}},
            "services": {"title": "Layanan pengembangan khusus", "cta": "Lihat layanan"},
            "resources": {"title": "Artikel pilihan", "viewAll": "Lihat semua artikel"},
            "compliance": {"title": "Dirancang untuk kepatuhan global"},
            "story": {"loading": "Memuat ikhtisar keamanan…"},
        },
        "homePartners": {"title": "Klien dan Mitra", "billion": "Miliar", "million": "Juta"},
        "homeCompliance": {"badge": "Kepatuhan Regulasi", "title": "Dirancang untuk Kepatuhan Global",
                           "statusLabel": "Patuh"},
        "hero": {"headline": "AI-CSD — Departemen Keamanan Siber Berbasis AI",
                 "buttons": {"connect": "Hubungkan dalam 4 menit", "tour": "Tonton demo 90 detik"}},
        "pricingCta": {"requestSystem": "Minta sistem"},
        "contactForm": {"title": "Hubungi Kami", "success": "Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.",
                        "errorRequired": "Harap isi nama, email, dan pesan singkat Anda.",
                        "errorSend": "Pesan tidak dapat dikirim. Silakan coba lagi nanti.",
                        "placeholders": {"name": "Nama Anda", "type": "Jenis proyek (opsional)",
                                         "budget": "Anggaran (opsional)", "message": "Ceritakan proyek Anda..."},
                        "submit": {"idle": "Kirim Pesan", "loading": "Mengirim…"}},
        "notFound": {"title": "Halaman tidak ditemukan", "description": "Kami tidak dapat menemukan halaman ini.",
                     "cta": "Kembali ke beranda"},
        "backToTop": {"label": "Kembali ke atas"},
    },
    "pl": {
        "languageSelector": {
            "triggerLabel": "Wybierz język", "menuLabel": "Wybierz język", "searchLabel": "Szukaj języków",
            "searchPlaceholder": "Szukaj po nazwie", "searchResults": "Wyniki wyszukiwania",
            "noMatches": "Nie znaleziono języka.", "popular": "Najpopularniejsze", "allLanguages": "Wszystkie języki",
        },
        "header": {
            "andManyMore": "I wiele więcej...",
            "nav": {"main": "Strona główna", "pricing": "Cennik", "articles": "Artykuły", "compliance": "Zgodność",
                    "partners": "Klienci/Partnerzy", "affiliate": "Program partnerski", "instructions": "Instrukcje",
                    "home": "Strona główna", "systems": "Systemy", "services": "Usługi",
                    "developerServices": "Usługi programistyczne", "instructionsEmailSecurity": "Bezpieczeństwo poczty",
                    "instructionsWebSecurity": "Bezpieczeństwo stron", "instructionsServerSecurity": "Bezpieczeństwo serwerów"},
            "login": "Zaloguj się",
            "cta": {"loginRegister": "Zaloguj się/Zarejestruj", "contact": "Kontakt", "download": "Pobierz",
                    "requestDemo": "Poproś o demo", "get": "Rozpocznij"},
        },
        "footer": {"contactLabel": "Kontakt", "addressLabel": "Adres", "addressValue": "Astana, Kazachstan",
                   "links": {"cookies": "Polityka plików cookie", "termsUse": "Warunki korzystania",
                             "termsService": "Warunki świadczenia usług", "privacy": "Polityka prywatności",
                             "affiliateTerms": "Warunki programu partnerskiego"}},
        "home": {
            "hero": {"title": "Cyberbezpieczeństwo nie musi już być", "titleHighlight": "skomplikowane ani drogie",
                     "subtitle": "Twórz bezpiecznie. Wdrażaj z pewnością."},
            "systems": {"title": "Systemy", "cta": "Zobacz szczegóły", "aiSoc": {"badge": "Subskrypcja"},
                        "sithub": {"badge": "Subskrypcja"}, "supreme": {"badge": "Rozszerzenie"}},
            "services": {"title": "Usługi tworzenia oprogramowania na zamówienie", "cta": "Zobacz usługi"},
            "resources": {"title": "Polecane artykuły", "viewAll": "Zobacz wszystkie artykuły"},
            "compliance": {"title": "Zgodność z globalnymi standardami"},
            "story": {"loading": "Ładowanie przeglądu bezpieczeństwa…"},
        },
        "homePartners": {"title": "Klienci i partnerzy", "billion": "Miliard", "million": "Milion"},
        "homeCompliance": {"badge": "Zgodność z przepisami", "title": "Zgodność z globalnymi standardami",
                           "statusLabel": "Zgodny"},
        "hero": {"headline": "AI-CSD — dział cyberbezpieczeństwa oparty na AI",
                 "buttons": {"connect": "Połącz w 4 minuty", "tour": "Obejrzyj 90-sekundowe demo"}},
        "pricingCta": {"requestSystem": "Zamów system"},
        "contactForm": {"title": "Skontaktuj się z nami", "success": "Dziękujemy! Wiadomość została wysłana. Wkrótce się skontaktujemy.",
                        "errorRequired": "Podaj imię, adres e-mail i krótką wiadomość.",
                        "errorSend": "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
                        "placeholders": {"name": "Twoje imię", "type": "Rodzaj projektu (opcjonalnie)",
                                         "budget": "Budżet (opcjonalnie)", "message": "Opowiedz nam o swoim projekcie..."},
                        "submit": {"idle": "Wyślij wiadomość", "loading": "Wysyłanie…"}},
        "notFound": {"title": "Nie znaleziono strony", "description": "Nie udało nam się znaleźć tej strony.",
                     "cta": "Wróć na stronę główną"},
        "backToTop": {"label": "Wróć na górę"},
    },
    "ms": {
        "languageSelector": {
            "triggerLabel": "Pilih bahasa", "menuLabel": "Pilih bahasa", "searchLabel": "Cari bahasa",
            "searchPlaceholder": "Cari mengikut nama", "searchResults": "Hasil carian",
            "noMatches": "Tiada bahasa yang sepadan.", "popular": "Paling popular", "allLanguages": "Semua bahasa",
        },
        "header": {
            "andManyMore": "Dan banyak lagi...",
            "nav": {"main": "Utama", "pricing": "Harga", "articles": "Artikel", "compliance": "Pematuhan",
                    "partners": "Pelanggan/Rakan kongsi", "affiliate": "Program afiliasi", "instructions": "Panduan",
                    "home": "Laman utama", "systems": "Sistem", "services": "Perkhidmatan",
                    "developerServices": "Perkhidmatan pembangunan", "instructionsEmailSecurity": "Keselamatan E-mel",
                    "instructionsWebSecurity": "Keselamatan Web", "instructionsServerSecurity": "Keselamatan Pelayan"},
            "login": "Log masuk",
            "cta": {"loginRegister": "Log masuk/Daftar", "contact": "Hubungi", "download": "Muat turun",
                    "requestDemo": "Minta demo", "get": "Mula sekarang"},
        },
        "footer": {"contactLabel": "Hubungi", "addressLabel": "Alamat", "addressValue": "Astana, Kazakhstan",
                   "links": {"cookies": "Dasar Kuki", "termsUse": "Terma Penggunaan",
                             "termsService": "Terma Perkhidmatan", "privacy": "Dasar Privasi",
                             "affiliateTerms": "Terma Program Afiliasi"}},
        "home": {
            "hero": {"title": "Keselamatan siber kini tidak lagi", "titleHighlight": "rumit atau mahal",
                     "subtitle": "Bina dengan selamat. Lancarkan dengan yakin."},
            "systems": {"title": "Sistem", "cta": "Lihat butiran", "aiSoc": {"badge": "Langganan"},
                        "sithub": {"badge": "Langganan"}, "supreme": {"badge": "Sambungan"}},
            "services": {"title": "Perkhidmatan pembangunan tersuai", "cta": "Lihat perkhidmatan"},
            "resources": {"title": "Artikel pilihan", "viewAll": "Lihat semua artikel"},
            "compliance": {"title": "Dibina untuk pematuhan global"},
            "story": {"loading": "Memuatkan gambaran keselamatan…"},
        },
        "homePartners": {"title": "Pelanggan dan Rakan Kongsi", "billion": "Bilion", "million": "Juta"},
        "homeCompliance": {"badge": "Pematuhan Peraturan", "title": "Dibina untuk Pematuhan Global",
                           "statusLabel": "Patuh"},
        "hero": {"headline": "AI-CSD — Jabatan Keselamatan Siber Dikuasakan AI",
                 "buttons": {"connect": "Sambung dalam 4 minit", "tour": "Tonton demo 90 saat"}},
        "pricingCta": {"requestSystem": "Minta sistem"},
        "contactForm": {"title": "Hubungi Kami", "success": "Terima kasih! Mesej anda telah dihantar. Kami akan menghubungi anda tidak lama lagi.",
                        "errorRequired": "Sila isi nama, e-mel dan mesej ringkas anda.",
                        "errorSend": "Mesej tidak dapat dihantar. Sila cuba lagi kemudian.",
                        "placeholders": {"name": "Nama anda", "type": "Jenis projek (pilihan)",
                                         "budget": "Bajet (pilihan)", "message": "Ceritakan tentang projek anda..."},
                        "submit": {"idle": "Hantar Mesej", "loading": "Menghantar…"}},
        "notFound": {"title": "Halaman tidak ditemui", "description": "Kami tidak dapat menemui halaman ini.",
                     "cta": "Kembali ke laman utama"},
        "backToTop": {"label": "Kembali ke atas"},
    },
}


def merge(target, changes):
    for key, value in changes.items():
        if isinstance(value, dict):
            merge(target[key], value)
        else:
            target[key] = value


for locale, changes in translations.items():
    data = copy.deepcopy(english)
    merge(data, changes)
    (root / f"{locale}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
