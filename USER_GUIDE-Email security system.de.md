# Benutzerhandbuch für die einheitliche E-Mail-Plattform

Die Plattform vereint drei eigenständige Produkte: **Admin Console / Silence 365 Email Visualizer** für E-Mail-Domains, Nachrichtenflüsse, Bedrohungen und Organisationsverwaltung; **Email Protector** für sicheres Lesen, Senden, Ordnen und Migrieren von E-Mails; **WebSOC / AI-SOC Web** für den Anschluss von Webdomains an das Sicherheitsgateway, Verkehrsüberwachung, Ländersperren und Guthaben. Ansicht und Funktionen hängen von Rolle, Tarif und Organisationseinstellungen ab. Die Adressen der drei Konsolen erhalten Sie von Ihrer Organisationsadministration. Melden Sie sich nicht mit der Adresse einer anderen Konsole an.

## Inhalt

1. [Plattformüberblick](#1-platform-overview)
2. [Kontozugriff](#2-account-access)
3. [Admin Console — Silence 365 Email Visualizer](#3-admin-console-silence-365-email-visualizer)
4. [Email Protector](#4-email-protector)
5. [WebSOC / AI-SOC Web](#5-websoc-ai-soc-web)
6. [Häufige Probleme](#6-common-issues)
7. [Sicherheitsempfehlungen](#7-security-recommendations)
8. [Glossar](#8-glossary)
9. [Support kontaktieren](#9-contacting-support)

## 1. Plattformüberblick

### 1.1 Welches Produkt für welche Aufgabe?

| Aufgabe | Produkt |
|---|---|
| E-Mail-Domain hinzufügen, MX/SPF/DKIM/DMARC einrichten, Nachrichtenflüsse und Bedrohungen prüfen, Mitarbeiter, Abteilungen und Firmen-Mailserver verwalten | Admin Console; Verwaltungsaufgaben erfordern Administratorrechte |
| E-Mails lesen, senden und ordnen, Klassifizierung und Anhangprüfung ansehen, Post aus anderen Diensten migrieren | Email Protector |
| Webdomain mit Sicherheitsgateway verbinden, RPS, Bandbreite, aktive IP-Adressen und Verkehrsherkunft ansehen, Länder oder zulässige Ports einschränken | WebSOC |

### 1.2 Rollen und Rechte

| Rolle | Hauptfunktionen |
|---|---|
| E-Mail-Nutzer | Eigene Nachrichten, Ordner und persönliche Einstellungen |
| Organisationsadministrator | Mitarbeiter, Abteilungen, Domains, gemeinsame Signaturen und Schutzregeln |
| Domainadministrator | DNS und Mailserver einrichten, Domainstatus prüfen |
| WebSOC-Administrator | Webdomains verbinden, Ursprungsadresse und Länderliste ändern |
| Plattformmitarbeiter | Vereinbarte Kundenpreise verwalten; für normale Kunden nicht verfügbar |

Fehlen Funktionen oder Rechte, wenden Sie sich an Ihre Organisationsadministration. Verwenden Sie kein fremdes Konto, um Beschränkungen zu umgehen.

### 1.3 Vorbereitung

Halten Sie je nach Aufgabe die Konsolenadresse, ein funktionierendes Konto, eine Authenticator-App für 2FA, Zugang zur DNS-Verwaltung, Berechtigung zur Änderung von Website und DNS für WebSOC, Hostname oder Adresse des Ursprungsservers, Zugangsdaten eines externen Postfachs oder Microsoft-Freigabe für die Migration und bei Aufladung eine Zahlungsberechtigung bereit.

> Wichtig: DNS-Werte, IP-Adressen, Prüfschlüssel und Beträge stammen immer aus Ihrer eigenen Konsole. Übernehmen Sie keine Beispiele oder Werte anderer Kunden.

## 2. Kontozugriff

### 2.1 Allgemeine Anmeldung

Jede Konsole hat eine eigene Anmeldeseite und Sitzung. Bei SSO erfolgt die Weiterleitung zu **AI-CSD** oder es erscheint **Sign in with AI-CSD / Sign in**. Öffnen Sie die vom Administrator angegebene Produktadresse, wählen Sie eine angebotene Methode und schließen Sie bei SSO, Google oder Microsoft die Prüfung beim Anbieter ab. Wenn 2FA erscheint, geben Sie den sechsstelligen Code ein. Prüfen Sie anschließend, ob das Profil das richtige Konto anzeigt.

### 2.2 Admin Console öffnen

Mögliche Verfahren: **Sign in** mit E-Mail und Kennwort, **Continue with Google**, **Continue with Outlook** und bei SSO **Sign in with AI-CSD / Sign in**. Für ein Kundenkonto wählen Sie **Create account**, **Monthly** oder **Yearly** und einen Tarif anhand der aktuell angezeigten Namen, Grenzen und Preise. Geben Sie Benutzername und E-Mail ein, senden Sie mit der Schaltfläche neben dem E-Mail-Feld einen Prüfcode, tragen Sie Code und Kennwort ein, ergänzen Sie gegebenenfalls vor Abschluss einen Aktionscode und melden Sie sich nach der Registrierung an.

Bei lokalen Konten verlangt die Konsole 2FA: Scannen Sie unter **Set Up Two-Factor Authentication** den QR-Code mit der Authenticator-App. Falls Scannen nicht möglich ist, wählen Sie **Can't scan? Enter key manually** und übernehmen den angezeigten Schlüssel. Geben Sie den sechsstelligen Code ein und wählen **Activate 2FA**. Bei späteren Anmeldungen geben Sie den Code unter **Two-Factor Authentication** ein und wählen **Verify**.

### 2.3 Email Protector öffnen

SSO kann automatisch starten. Ansonsten werden gegebenenfalls **Continue with Google**, **Continue with Microsoft**, **Email** und **Password** mit **Sign in** oder **Login with QR Code** angeboten. Lokale Konten erstellt gewöhnlich die Organisationsadministration. Bei der ersten Anmeldung müssen Sie eventuell das vorläufige Kennwort ändern, 2FA einrichten und mit einem sechsstelligen Code bestätigen. Für QR-Anmeldung wählen Sie **Login with QR Code**, scannen den angezeigten Code mit einem zweiten autorisierten Gerät und bestätigen die Anmeldung auf der Bestätigungsseite.

### 2.4 WebSOC öffnen

Registrierung: Unter **Welcome** wählen Sie **Register**, füllen **Email**, **Username**, Kennwort und **Confirm password** aus. Tragen Sie falls nötig **Recovery password**, **Recovery email** und **Promocode** ein. Bestätigen Sie Alter und Nutzungsbedingungen und wählen **Continue**. Unter **Set up 2FA** scannen Sie den QR-Code oder geben den Geheimschlüssel manuell ein, tragen den **6-digit code** ein und wählen **Verify and finish**. WebSOC-Kennwörter, auch Wiederherstellungskennwörter, müssen mindestens einen lateinischen Großbuchstaben und eine Ziffer enthalten; erlaubt sind nur lateinische Buchstaben und Ziffern.

Zur normalen Anmeldung wählen Sie **Log in**, geben **Email or Username** und **Password** ein, wählen **Continue**, tragen unter **Two-factor authentication** den Code ein und wählen **Verify and continue**. Bei vergessenem Kennwort fordern Sie über **Forgot password?** einen E-Mail-Code an und geben Code und neues Kennwort ein. **Resend code** sendet den Code erneut.

## 3. Admin Console — Silence 365 Email Visualizer

### 3.1 Ersteinrichtung

Wählen Sie für ein selbst angelegtes Kundenkonto einen Tarif und durchlaufen Sie **Initial domain mail setup** mit **Domain**, **DNS verification**, **Security** und **Ready**. Der Fortschritt wird pro Domain gespeichert. Nutzt die Organisation nur Google oder Outlook und ist **Use AI-SOC as security layer (Gmail/Outlook only)** vorhanden, können Sie ohne Einrichtung gehosteter Domain-Post weitermachen. Stimmen Sie dies vorher mit der Domainadministration ab.

### 3.2 Domain hinzufügen und prüfen

Geben Sie bei **Step 1. Add domain** die Domain ohne `https://` und ohne Pfad ein und wählen **Continue**. Kopieren Sie bei **Step 2. Verify domain via DNS** **TXT name** und **TXT value**, erstellen Sie den TXT-Eintrag in der DNS-Verwaltung und warten Sie auf die Verteilung. Wählen Sie **Check now**; der Assistent prüft auch regelmäßig. Erst bei **Verified** fortfahren. Manche DNS-Oberflächen hängen die Domain automatisch an Name an. Befolgen Sie den Hinweis der Konsole, um doppelte Endungen zu vermeiden.

### 3.3 MX, SPF, DKIM und DMARC einrichten

**Step 3. Security setup** zeigt die genauen Einträge. MX leitet eingehende Post an den Mailserver, SPF benennt zulässige Sender, DKIM veröffentlicht den Prüfschlüssel für ausgehende Signaturen und DMARC regelt Richtlinie und Berichte bei SPF-/DKIM-Fehlern. Erzeugen Sie erforderliche Einträge, kopieren **Type**, **Name/Host**, **Value**, **Priority** und **TTL** exakt, erstellen oder ändern sie im DNS, warten auf die Verteilung, wählen **Verify** und prüfen **Configured**. Die gegebenenfalls angeforderten DMARC-Aliasse RUA und RUF dienen aggregierten Berichten bzw. Fehlerberichten.

> Wichtig: Stimmen Sie Änderungen an vorhandenem SPF mit der Mailadministration ab. Mehrere SPF-Einträge für denselben Namen können die Absenderprüfung stören.

**Not configured** bedeutet nicht gefunden, **Update required** abweichender Wert, **Configured** erwarteter Wert, **Pending verification** Änderung noch nicht erkannt und **Error** Prüfung nicht abgeschlossen. Nach der Einrichtung wählen Sie **Step 4. Ready** und **Go to dashboard**.

### 3.4 Domains verwalten

Unter **Domains** und **Domain management** können Administratoren Domains hinzufügen, Prüftoken kopieren, **Verify** wiederholen, MX/SPF/DKIM/DMARC getrennt kontrollieren, **Set default** setzen, IP-Adressen zulässiger SMTP-Server eintragen, **DNS setup** öffnen, Domains umbenennen oder löschen. Stellen Sie vor dem Löschen sicher, dass Mitarbeiter und Mailprogramme die Domain nicht mehr nutzen. Das Löschen erfordert eine eigene Bestätigung.

### 3.5 Dashboard und Nachrichtenfluss

Im Diagramm sind Mitarbeiter, Abteilungen oder Domains Knoten und ihre E-Mail-Verbindungen Kanten. Wählen Sie **Incoming** oder **Outgoing** und unter **Time range** die letzte Stunde, 3/6/12/24 Stunden, alle Daten oder einen eigenen Zeitraum. Füllen Sie bei Bedarf unter **Filter** Absender, Empfänger, Betreff, Text oder Anhang aus und wählen **Apply filters**. Ein Knoten öffnet zugehörige Nachrichten. Nutzen Sie Suche sowie **Newest first** / **Oldest first** und prüfen Sie Inhalt, Kopfzeilen und Anhänge. Analysekarten gibt es für Abteilungen und Domains. Ein eigener Zeitraum darf nicht in der Zukunft enden; sein Anfang muss vor dem Ende liegen.

### 3.6 Bedrohungskategorien

Der Pfeil am unteren Rand öffnet **Threat categories**. **Possibly spoofed** kennzeichnet mögliche Absender- oder Domainfälschung, **Spam** unerwünschte Post, **Dangerous link** einen möglicherweise gefährlichen Link, **Possibly phishing** den möglichen Versuch, Anmelde- oder Zahlungsdaten zu erlangen, **Malware in the attachment** einen gefährlichen Anhang und **Secure emails** keine bekannten Bedrohungsanzeichen. Wählen Sie eine Karte und **Click to view** für Absender, Empfänger, Datum, Inhalt, Quelltext und Anhänge. Anhangstatus: **Safe**, **Suspicious**, **Malware detected**, **Pending scan**. In Trash verschieben ist etwas anderes als **Delete permanently**; prüfen Sie die Auswahl vor endgültigem Löschen.

### 3.7 Mitarbeiter und Administratoren

Unter **Settings** → **Employees** → **+ Add** → **Create manually** geben Sie E-Mail, Vor- und Nachname und weitere Pflichtdaten ein. Prüfen Sie die Anmeldung über Google, Microsoft oder ein internes Konto; ergänzen Sie bei Bedarf Adressen, Telefonnummern und Aliasse, dann **Create**. Für Sammelanlagen wählen Sie **Upload employee list**, laden **Download CSV template** herunter, bewahren dessen Struktur, starten **Import** und prüfen **Created** und **Skipped**. Das Mitarbeitermenü kann **Edit**, **Change password** für interne Konten, **Edit aliases**, **Make administrator** / **Revoke administrator rights** und **Delete** enthalten. Administratorrechte nur bei tatsächlichem Bedarf vergeben.

### 3.8 Abteilungen

Öffnen Sie **Settings** → **Departments**, erstellen Sie eine Abteilung mit eindeutigem Namen, öffnen Sie die Mitgliederliste und fügen Mitarbeiter hinzu. Mit Entfernen nehmen Sie Mitarbeiter aus der Abteilung. Prüfen Sie vor dem Löschen Mitgliedschaft und Auswirkungen auf die Darstellung.

### 3.9 Allgemeine Schutzeinstellungen

Der nur für Administratoren sichtbare Reiter **Security** kann **Enable phishing detector**, **Enable attachment virus scanning**, **Block management** für Domains und Adressen sowie einen Link zu Firmen-Mailservern enthalten. Warten Sie nach einer Schalteränderung, bis sie gespeichert ist, und prüfen Sie den neuen Zustand.

### 3.10 Firmen-Mailserver

Unter **Company Email Servers** tragen Sie **IMAP server**, **IMAP port** und **IMAP security** ein; bei Bedarf auch **SMTP server**, **SMTP port** und **SMTP security**. Wählen Sie passend zum Server **SSL/TLS** oder **STARTTLS**, speichern Sie und prüfen Sie die Mailprogramm-Parameter. Ohne SMTP können externe Clients per IMAP empfangen; Senden geht dann nur in der Webanwendung. **None / plain text** überträgt Daten ohne Kanalschutz und darf nur in einem isolierten vertrauenswürdigen Netz nach Entscheidung der Sicherheitsadministration genutzt werden.

### 3.11 Organisation und KI

Unter **General** stellen Sie Sprache und Zeitzone ein; mit ausreichenden Rechten auch Organisationsname und Logo. Ist **AI Agent** verfügbar, kann ein Administrator Anbieter und Modell wählen, einen Endpunkt nur für eine unterstützte Konfiguration eintragen, den Zugriffsschlüssel sicher verwahren, speichern und den integrierten Verbindungstest ausführen. Geben Sie den Schlüssel nicht an Mitarbeiter weiter und zeigen Sie ihn nicht in Bildschirmfotos.

### 3.12 Tarif, Guthaben und Zahlung

Das Profilmenü enthält **Balance**, **Top Up Balance** und **Manage Plan**. Beim Aufladen prüfen Sie Währung und angezeigte Mindest- und Höchstbeträge, geben einen Betrag ein, wählen **Pay**, schließen auf der sicheren Zahlungsseite ab und prüfen anschließend das Guthaben. Beim Tarifwechsel vergleichen Sie Grenzen für Nutzer, Administratoren, Speicher und KI-Operationen, wählen monatliche oder jährliche Abrechnung und einen Tarif, prüfen Aktivierungs- oder Wechselkosten und bestätigen. Preise und Währung richten sich nach Bereitstellung und Kundenvertrag; maßgeblich ist Ihre Konsole.

## 4. Email Protector

### 4.1 Hauptbereiche

Nach der Anmeldung sehen Sie Ordnerleiste, Nachrichtenliste, Lesebereich mit Sicherheitsdetails, **Compose**, Suche, Kontoauswahl, **Settings** sowie Sprach- und Abmeldemenü. Systemordner können **All mail**, **Important**, **Inbox**, **Sent**, **Drafts**, **Scheduled**, **Trash** sein. Im Bereich Security liegen verfügbare Quarantäne- und Fehlerordner; eigene Ordner stehen unter **My folders**.

### 4.2 Nachricht lesen und prüfen

Wählen Sie Ordner und Nachricht; prüfen Sie Absender, Empfänger, Betreff, Datum, Farbindikator und Sicherheitsklasse. Öffnen Sie **Attachments** und prüfen Sie jede Datei, nötigenfalls auch **Show details** und **Show source text**. Bei **Secure** bleiben Sie grundsätzlich vorsichtig. Bei **Spam** prüfen Sie den Absender und antworten nicht auf unerbetene Post. Bei **Possibly Spoofed** bestätigen Sie den Absender über einen unabhängigen Kanal. Bei **Possibly Phishing** klicken Sie keine Links und geben keine Anmeldedaten ein. Gefährliche Links nicht vor fachlicher Prüfung öffnen, gefährliche Anhänge nicht herunterladen oder ausführen.

Bei Anhängen bedeutet **Clean**, dass Herunterladen verfügbar ist; **Suspicious**, Details prüfen und bei Unklarheit die Administration fragen; **Download blocked**, Sperre nicht umgehen; **Scanning…**, Abschluss abwarten; **Not scanned**, vor dem Öffnen zusätzlich prüfen. Auch bei **Clean** müssen Kontext, Absenderadresse und Erwartbarkeit des Anhangs geprüft werden.

### 4.3 Suche und Listenaktionen

Geben Sie Text in **Search emails...** ein und verwenden Sie **All**, **Secure**, **Spam**, **Spoofing**, **Threats found**. Der Stern fügt eine Nachricht zu **Important** hinzu. Im Ordnermenü verschieben Sie in einen eigenen Ordner oder zurück nach **Inbox**. Mehrere Nachrichten lassen sich gemeinsam nach Trash verschieben. In **Trash** wählen Sie **Restore** oder dauerhaftes Löschen; **Load more** zeigt weitere Einträge. Dauerhaftes Löschen ist unwiderruflich: erst Ordner und ausgewählte Nachrichten prüfen.

### 4.4 Schreiben und senden

Wählen Sie **Compose**, füllen **To** und bei Bedarf **Cc** und **Bcc** sowie Betreff und Text aus. Fügen Sie Dateien über die Anhangschaltfläche hinzu. Für späteres Senden wählen Sie **Schedule send** mit einem künftigen Datum und Zeitpunkt, danach **Send email**. Entwürfe aus **Drafts** können bearbeitet und gesendet werden; Nachrichten unter **Scheduled** können vor Zustellung über die vorgesehene Aktion geprüft und abgebrochen werden.

### 4.5 Aktionen an einer geöffneten Nachricht

Je nach Nachricht und Berechtigung können Sie **Important** setzen oder entfernen, Vollansicht und Quelltext öffnen, in einen Ordner verschieben, übersetzen und zum Original zurückkehren, einen KI-Antwortentwurf erstellen, sich bei unterstütztem Link abmelden oder nach Trash verschieben. Prüfen Sie vor einer Abmeldung den Absender und verwenden Sie keinen Abmeldelink einer offensichtlich betrügerischen Nachricht.

### 4.6 Eigene Ordner und Regeln

Wählen Sie **New folder** oder **Create folder**, geben **Folder name** ein, ergänzen **Inclusion rules** für aufzunehmende Adressen oder Domains und **Exclusion rules** für Ausnahmen und wählen **Save**. Ausschlüsse haben Vorrang. Im Ordnermenü lassen sich Name und Regeln ändern oder der Ordner löschen; lesen Sie vorher die Warnung.

### 4.7 Konto wechseln

Über das Kontomenü können Sie ein weiteres autorisiertes Konto hinzufügen und wechseln. Wählen Sie **Add account**, melden Sie sich bei Google oder Microsoft beim Anbieter an oder geben Sie bei einem lokalen Konto E-Mail, Kennwort und gegebenenfalls 2FA-Code ein. Wählen Sie danach das gewünschte Konto. Das gerade aktive Konto kann nicht aus der Liste entfernt werden. Beim Wechsel zu einem lokalen Konto kann das Kennwort erneut nötig sein.

### 4.8 Postfacheinstellungen

Öffnen Sie **Settings** und den gewünschten Bereich.

#### Allgemein

Stellen Sie **Sender name**, Gesendet-Ordner, Zeitzone und Datumsformat ein und wählen **Save**.

#### Signatur

Aktivieren Sie **Add to outgoing emails**, erstellen die Signatur im Editor, prüfen **Signature preview** und speichern.

#### Automatische Antwort

Aktivieren Sie **Autoresponder**, geben Anfang, Ende und Antworttext ein, nutzen bei Bedarf **Reply once per sender**, prüfen die Vorschau und speichern.

#### Weiterleitung

Geben Sie eine Weiterleitungsadresse ein, wählen **Add**, entscheiden über **Keep a copy in Inbox** und speichern.

#### Gesperrte Absender

Geben Sie eine Adresse ein und wählen **Block sender**. Nachrichten von dort landen automatisch in Spam. **Unblock** hebt dies auf.

#### Kontoverwaltung

Ändern Sie Anzeigenamen und E-Mail eines gespeicherten Kontos oder entfernen Sie ein inaktives Konto aus der Liste.

#### Speicher

Prüfen Sie belegten Speicher und Quotenanteil. Über 90 % löschen Sie unnötige Nachrichten und Anhänge oder fragen die Administration nach dem Tarif.

#### Darstellung und Verhalten

Mögliche Optionen sind automatische Löschfrist für Trash, eigener Hintergrund und Unschärfe, Glas-Effekt, Gelesen-Markierung, Vorschaufenster, Gesprächsansicht sowie Schrift und Textgröße beim Schreiben.

### 4.9 Mailmigration

Öffnen Sie **Account settings** → **Email migration** → **Start migration**. Unterstützt werden **Gmail**, **Outlook**, **iCloud** und **Custom IMAP**. Für Gmail oder iCloud wählen Sie den Anbieter und geben externes Postfach und, falls verlangt, ein beim Anbieter erstelltes App-Kennwort statt des Hauptkennworts ein; dann **Start Migration**. Für Outlook wählen Sie **Connect Outlook Account** und genehmigen den Zugriff bei Microsoft. Für **Custom IMAP** geben Sie auch **IMAP Server** und **Port** ein. Fortschritt in Prozent, bearbeitete Nachrichten und aktueller Ordner werden angezeigt. **Pause** und **Resume** steuern den Vorgang, **Migration Complete!** meldet den Abschluss. Widerrufen Sie Zugriff und App-Kennwort nicht vor Abschluss.

### 4.10 KI-Funktionen

Falls freigeschaltet, erstellt das KI-Symbol an einer Nachricht einen Antwortentwurf; **AI auto reply** kann eine generierte Antwort als Entwurf zur Prüfung speichern; der KI-Assistent kann Nachrichten zusammenfassen, erklären und Antworten vorbereiten. Automatisches Senden nur gemäß Organisationsrichtlinie aktivieren. Vor dem Senden Empfänger, Fakten, Anhänge und Ton prüfen. Keine Geheimnisse, Kennwörter oder sachfremden personenbezogenen Daten eingeben.

### 4.11 Calendly

**Calendly** zeigt **Connected** oder **Not connected**. Erzeugen Sie in den Calendly-Integrationen ein persönliches Token, tragen es in **Calendly API token** ein, wählen **Connect Calendly** und prüfen **Connected**. **Disconnect Calendly** beendet die Anbindung. Behandeln Sie das Token vertraulich.

### 4.12 Nutzerverwaltung und gemeinsame Signaturen

Administratoren verwalten berechtigte Nutzer und Firmensignaturen. Wählen Sie unter **Company Signatures** **New**, geben **Signature Name** ein und wählen **Company**, **Domain**, **Department** oder **User** als Geltungsbereich. Geben Sie Inhalt ein, prüfen **Preview**, aktivieren **Active** und wählen **Create** oder **Save**. Bei Änderungen den ausgewählten Bereich kontrollieren. Das Löschen erfordert eine gesonderte Bestätigung.

## 5. WebSOC / AI-SOC Web

### 5.1 Domain verbinden

WebSOC nennt die Verbindung „Agent“, aber der Assistent richtet eine Domain und einen Ursprungs-Webserver ein. Installieren Sie keine Software über ungeprüfte Befehle. Öffnen Sie **Data source selection**, wählen **Add new agent** oder **Register new agent**, geben unter **Domain** die zu schützende Domain und unter **IP address** den aktuellen Ursprungs-Host oder dessen IP ein und wählen **Register**.

#### Schritt 1. Website-Eigentum prüfen

Unter **Step 1. Add ownership meta tag on your origin website** wählen Sie **Copy tag**, fügen den angezeigten Meta-Tag in `<head>` der Startseite ein, veröffentlichen die Seite und prüfen deren öffentliche Erreichbarkeit über den Domainnamen. **Copy key** kopiert nur den Schlüssel, **Copy tag** den ganzen Tag.

#### Schritt 2. ACME delegieren

Kopieren Sie unter **Step 2. Add ACME delegation CNAME** **Name** und **Hostname (target)**, erstellen den CNAME-Eintrag, warten auf DNS-Verteilung und wählen **Verify ownership and DNS**. **Ownership and DNS verified** bestätigt dies; die Verkehrsweiterleitung kann dennoch inaktiv sein.

#### Schritt 3. Verkehr umschalten

Nach der Prüfung erscheint **Step 3. DNS A record to add (switch traffic through WebSOC)**. Kopieren Sie **Name** und **IP address**, prüfen Sie, ob der WebSOC-Ursprung stimmt und auf einem zulässigen Port antwortet, erstellen oder ändern den A-Eintrag und warten auf DNS-Verteilung. Prüfen Sie **DNS routing** in **Domain setup details**. Die A-Eintragsänderung schaltet den Nutzerverkehr um: Führen Sie sie im genehmigten Wartungsfenster aus und behalten Sie DNS- und Ursprungsserverzugang für die Wiederherstellung.

### 5.2 Domainstatus

**Delegation not verified**: Meta-Tag oder CNAME ungeprüft. **Delegation verified / DNS pending**: Eigentum und Delegation bestätigt, aber A-Eintrag leitet noch nicht durch WebSOC. **Active**: Delegation und DNS-Weiterleitung aktiv. Der Kreispfeil wiederholt die Prüfung; das Dokumentsymbol öffnet **Domain setup details** mit allen nötigen Werten.

### 5.3 Ursprungsserver einstellen

Suchen Sie in **Data source selection** die Domain, wählen den Stift und prüfen **IP address** in **Agent configuration**. Tragen Sie neuen Ursprungs-Host oder IP ein, wählen **Save** und warten auf **Configuration updated successfully!**. Prüfen Sie vor der Änderung, ob der neue Ursprung erreichbar ist und die richtige Domain bedient.

### 5.4 Domains wählen und Verkehrskarte verwenden

Wählen Sie in **Data source selection** die zu analysierenden Domains. Rechts stehen **RPS** für Anfragen pro Sekunde, **Bandwidth** für Datenmenge und **Active Users** für aktive IP-Adressen. Zeigen Sie auf ein Land der Weltkugel für dessen Daten. Die Farbintensität vergleicht Länder nach der gewählten Kennzahl; beurteilen Sie Trends auch anhand des Diagramms.

### 5.5 Diagramme und führende Länder

Der untere Pfeil öffnet **Server load chart** mit **1 day**, **2 days**, **7 days**, **14 days**, **1 month** und **3 months**. Das Fenster nennt Länder mit den meisten aktiven IPs, höchster Bandbreite und höchstem RPS. Ein ausgewählter Diagrammbereich grenzt den Zeitraum verwandter Kennzahlen ein. Vergleichen Sie gleiche Domains und Zeiträume.

### 5.6 Anomaliehinweise

Bei erkannter Anomalie erscheint oben eine rote Meldung. Lesen Sie sie, notieren Domain und Zeitpunkt und wählen **OK**. Das Schließen bestätigt nur die Kenntnisnahme und behebt die Ursache nicht. Prüfen Sie Diagramme und Ursprungsdienst und informieren Sie bei Bedarf die Sicherheitsadministration.

### 5.7 Ländersperrliste

Wählen Sie **Country blacklist**, öffnen **Not blacklisted** oder suchen ein Land, wählen es und **Add**; prüfen Sie den Eintrag unter **Blacklisted**. Zum Rückgängigmachen wählen Sie das Land unter **Blacklisted** und **delete**. Prüfen Sie vorher Mitarbeiter, Kunden, externe Überwachung und Zahlungssysteme in dem Land; behalten Sie administrativen Zugang aus einem zulässigen Land.

### 5.8 Sprache und Darstellung

Links oben finden Sie **Globe style**, **Select language**, **Payment history** und **Promo code**.

### 5.9 Guthaben und Zahlungen

Das Profilmenü zeigt das Guthaben. Wählen Sie **Top up balance**, geben mindestens den angezeigten Mindestbetrag ein, wählen **Create payment**, schließen im sicheren Zahlungsfenster ab und warten auf die Guthabenaktualisierung. Über **Payment history** sehen Sie Transaktionen: **Completed** ist gutgeschrieben, **Pending** wird verarbeitet, **Failed** wurde nicht abgeschlossen. Unter **Promo code** geben Sie einen Aktionscode ein; **Locked** bedeutet, dass er für dieses Konto nicht mehr geändert werden kann.

### 5.10 Domain löschen

Das Papierkorbsymbol neben einer Domain löscht sie nach Bestätigung. Sichern Sie zuerst alle Angaben, um das DNS wieder zum Ursprung zu führen, und prüfen Sie, dass WebSOC die Domain nicht länger bedienen soll.

## 6. Häufige Probleme

### 6.1 Anmeldung nicht möglich

Prüfen Sie die richtige Konsole und Anmeldemethode (SSO, Google, Microsoft oder lokal), Tastaturlayout und E-Mail-Adresse. Nutzen Sie gegebenenfalls die lokale Kennwortwiederherstellung. Bei fehlenden Rechten fragen Sie Ihre Organisationsadministration.

### 6.2 2FA-Code abgelehnt

Geben Sie einen neuen Authenticator-Code ein, aktivieren automatische Uhrzeit und Datum am Telefon und wählen das richtige Konto in der App. Verwenden Sie keinen SMS-Code, wenn ein App-Code verlangt wird. Nach wiederholten Fehlern aufhören und den Support kontaktieren.

### 6.3 Prüf- oder Wiederherstellungscode fehlt

Prüfen Sie E-Mail-Adresse, Spam und Quarantäne, warten einige Minuten und senden einmal erneut. Filtert die Organisation Systemnachrichten, kontaktieren Sie die Mailadministration.

### 6.4 Admin-Console-Domain bleibt ausstehend

Vergleichen Sie TXT-Name und -Wert Zeichen für Zeichen, prüfen Sie auf doppelt angehängte Domain und richtige DNS-Zone, warten auf Verteilung und wählen **Check now**.

### 6.5 SPF, DKIM, DMARC oder MX wird nicht geprüft

Öffnen Sie den Eintrag erneut und vergleichen Typ, Name, Wert, Priorität und TTL. Bei SPF prüfen Sie widersprüchliche Einträge; bei DKIM Selektor und `_domainkey`; bei DMARC `_dmarc` und Berichtsadressen; bei MX Zielhost und Priorität. Nach Korrektur und DNS-Verteilung wählen Sie **Verify**.

### 6.6 Nachrichten oder Kennzahlen unverändert

Wählen Sie gegebenenfalls **Refresh**, prüfen Ordner, Domain, Richtung, Zeitraum, zu enge Filter und aktives Konto, laden die Seite neu und versuchen es erneut.

### 6.7 Anhang gesperrt

Schalten Sie den Schutz nicht ab und bitten den Absender nicht, die Datei zur Umgehung der Prüfung umzubenennen. Geben Sie der Administration Absender, Betreff, Empfangszeit, Dateiname und angezeigten Prüfstatus samt Details weiter, ohne geheime Inhalte zu offenbaren.

### 6.8 Mailmigration verbindet nicht

Prüfen Sie Anbieter; verwenden Sie bei Gmail oder iCloud ein gültiges App-Kennwort, bei Outlook erneut **Connect Outlook Account**, bei **Custom IMAP** Server, Port, E-Mail und Kennwort; wählen **Resume**, falls pausiert.

### 6.9 WebSOC prüft Domain nicht

Prüfen Sie, ob der Meta-Tag auf der erreichbaren Ursprungsseite veröffentlicht ist, vergleichen CNAME Name und Hostname mit **Domain setup details**, warten auf DNS und wählen **Verify ownership and DNS** oder das Wiederholen-Symbol. Bei **Delegation verified / DNS pending** prüfen Sie den A-Eintrag getrennt.

### 6.10 Nach WebSOC-Änderung kein Zugriff

Prüfen Sie, ob Ihr Land in **Country blacklist** steht und ob Ursprungs-Host oder IP stimmen. Nutzen Sie den bewahrten Administrationszugang, um eine falsche Sperre zurückzunehmen.

### 6.11 Zahlung bleibt ausstehend

Erstellen Sie nicht sofort eine neue Zahlung. Prüfen Sie **Payment history** und aktualisieren das Guthaben nach Bearbeitung. Bleibt der Status unverändert, geben Sie Support Zeitpunkt, Betrag und Transaktions-ID. Nie Kartennummer, CVC oder Bestätigungscodes senden.

## 7. Sicherheitsempfehlungen

- Verwenden Sie eindeutige Kennwörter im Passwortmanager; schützen Sie 2FA-Geheimnis und Authenticator-Gerät.
- Teilen Sie nie Prüfcode, Wiederherstellungs- oder App-Kennwörter, KI-Schlüssel oder Calendly-Token. Entfernen Sie Geheimnisse aus Support-Bildschirmfotos.
- Vergleichen Sie DNS-Werte unmittelbar vor Veröffentlichung mit der aktuellen Konsole. Schalten Sie Phishing- und Anhangprüfungen nicht für Tests ab.
- Vertrauen Sie einem vertraut wirkenden Absender nicht blind; prüfen Sie überraschende Zahlungsbitten und geänderte Zahlungsdaten auf einem unabhängigen Weg.
- Erteilen Sie Administratorrechte sparsam und bewahren Sie einen Ersatz-Administrationszugang vor Ländersperren.
- Prüfen Sie regelmäßig Domain-, Bedrohungs-, Anhang-, WebSOC- und Zahlungsstatus.

## 8. Glossar

| Begriff | Bedeutung |
|---|---|
| 2FA | Zweiter Anmeldefaktor: Einmalcode aus einer Authenticator-App |
| App-Kennwort | Eigenes Kennwort eines E-Mail-Anbieters für Anwendungszugriff |
| DKIM | Mit einem DNS-Schlüssel geprüfte Signatur ausgehender Nachrichten |
| DMARC | Richtlinie und Berichte für Nachrichten, die SPF oder DKIM nicht bestehen |
| DNS | Domain-Einträge, die Namen mit Diensten und Einstellungen verbinden |
| IMAP | Protokoll zum Zugriff auf E-Mail auf einem Server |
| MX | DNS-Eintrag für den empfangenden Mailserver |
| Ursprung | Webserver, an den WebSOC zulässige Anfragen weiterleitet |
| Quarantäne | Abgesonderter Bereich für verdächtige Nachrichten |
| RPS | Webanfragen pro Sekunde |
| SMTP | Protokoll zum Versenden von E-Mails |
| SPF | DNS-Richtlinie mit zulässigen Absenderquellen einer Domain |
| TTL | Zwischenspeicherdauer eines DNS-Eintrags |

## 9. Support kontaktieren

Nutzen Sie den Supportweg Ihrer Organisation. Bereiten Sie Produkt (Admin Console, Email Protector oder WebSOC), Konto-E-Mail ohne Kennwort, gegebenenfalls Domain, Datum, genaue Uhrzeit und Zeitzone, Handlungsschritte, exakten Fehlertext und ein Bild ohne Schlüssel, Token, QR-Codes und persönliche Daten vor. Bei Zahlungen nennen Sie Betrag, Status und Transaktions-ID ohne Kartendaten; bei E-Mail Absender, Betreff und Zeitpunkt, vertraulichen Inhalt nur falls erforderlich. Senden Sie niemals Kennwort, sechsstelligen 2FA-Code, Geheimschlüssel, Wiederherstellungs- oder vollständiges App-Kennwort, CVC oder privaten KI-Schlüssel.
