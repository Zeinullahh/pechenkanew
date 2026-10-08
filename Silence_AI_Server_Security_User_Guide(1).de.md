# Silence AI

## Server Security Benutzerhandbuch

Endbenutzeranweisungen für Registrierung, Installation, geschützten Zugriff, Sicherheitsüberwachung und Richtlinienverwaltung.

> **KUNDENDOKUMENTATION**
> Verwenden Sie dieses Handbuch, um Dienste zu registrieren, natives Server Security zu installieren, Zugriffskontrollen zu konfigurieren, Vorfälle zu prüfen und den Serverschutz zu überwachen.

Version 1.0 • Oktober 2026

# Verwendung dieses Handbuchs

Dieses Handbuch richtet sich an Administratoren und autorisierte Bediener von Silence AI Server Security. Es behandelt die in der Kundenschnittstelle verfügbaren Aktionen und die Prüfungen, die Sie durchführen sollten, bevor Sie sich auf eine Änderung des Schutzes oder der Zugriffskontrolle verlassen.

> **Wichtiger Betriebsgrundsatz**
> Registrierung, Paketinstallation, Enrollment, Richtlinienkonfiguration und aktiver Schutz sind separate Phasen. Wenn eine Einstellung als pending gekennzeichnet ist, warten Sie auf die Aktivierungsmeldung des Panels, bevor Sie sich darauf verlassen.


**Dokumentationsstand:** Abschnitt 10 enthält Anforderungen und bekannte Grenzen. Code ist vorhanden; echte Linux/Kubernetes-Läufe und Browsergesten sind nach den vorliegenden Unterlagen nicht bestätigt. Gespeichert/ausstehend bedeutet nicht angewendet/bestätigt.

- [1. Vorbereitung](#1-vorbereitung)
- [2. Anmelden und Server Security öffnen](#2-anmelden-und-server-security-öffnen)
- [3. Dienst registrieren](#3-dienst-registrieren)
- [4. Natives Server Security installieren und anmelden](#4-natives-server-security-installieren-und-anmelden)
- [5. Schutzstatus verstehen](#5-schutzstatus-verstehen)
- [6. MFA und geschützten Zugriff konfigurieren](#6-mfa-und-geschützten-zugriff-konfigurieren)
- [7. Server-Security-Konsole verwenden](#7-server-security-konsole-verwenden)
- [8. Vorfälle und Reaktionen prüfen](#8-vorfälle-und-reaktionen-prüfen)
- [9. Sicherheitsrichtlinie konfigurieren](#9-sicherheitsrichtlinie-konfigurieren)
- [10. Netzwerkzugriff, Globus und aktive Sitzungen](#10-netzwerkzugriff-globus-und-aktive-sitzungen)
- [11. Sensoren, Bestand, Sicherheitslage und Befunde prüfen](#11-sensoren-bestand-sicherheitslage-und-befunde-prüfen)
- [12. Ereignisse und Telemetrie überwachen](#12-ereignisse-und-telemetrie-überwachen)
- [13. Fehlerbehebung](#13-fehlerbehebung)
- [14. Bewährte Sicherheits- und Betriebsverfahren](#14-bewährte-sicherheits-und-betriebsverfahren)

# 1. Vorbereitung

Halten Sie vor Beginn folgende Informationen und Zugriffsrechte bereit:

- Ein Silence-AI-Konto mit Zugriff auf Server Security.
- Die Dienstdomain oder den Servernamen, den Sie registrieren möchten.

- Netzwerkverbindung vom Zielserver zu Silence AI.
- Administratorberechtigungen auf dem Linux-Zielserver für die native Installation.

- Für Hosted-Registrierung: Ziel-IP-Adresse und Berechtigung zum Aktualisieren von Website und DNS.
- Für Self-Hosted-Registrierung: Upstream-URL und das genehmigte Bereitstellungsverfahren Ihrer Organisation.

| **Unterstütztes natives Ziel** | **Paket** |
|---|---|
| Ubuntu Server 22.04 oder 24.04 LTS, amd64 | DEB |
| Fedora Server 44, x86_64 | RPM |

> **Hosted-Abrechnung**
> Hosted-Verkehrsschutz wird nach Nutzung abgerechnet. Prüfen Sie, dass das Konto ausreichend Guthaben besitzt, bevor Sie sich auf den Hosted-Verkehrsschutz verlassen.

# 2. Anmelden und Server Security öffnen

1. Öffnen Sie das Silence-AI-Administrationspanel und wählen Sie Log in.

2. Schließen Sie die Konto-MFA mit dem aktuellen sechsstelligen Authenticator-Code ab.

3. Öffnen Sie Server Security und wählen Sie anschließend Servers.

Jede Serverzeile kann Install, Setup / recovery und Open Security anbieten. Die verfügbare Aktion hängt vom aktuellen Enrollment-Status des Servers ab.

# 3. Dienst registrieren

## 3.1 Hosted oder Self-Hosted auswählen

| **Bereitstellungstyp** | **Verwendung** | **Erforderliche Felder** |
|---|---|---|
| Hosted | Der Datenverkehr wird durch den Hosted-Dienst geschützt. | Domain + IP Address |
| Self-Hosted | Der Dienst wird in Ihrer Umgebung ausgeführt. | Domain + Upstream URL |

> **Registrierung ist keine Installation**
> Durch das Erstellen eines Hosted- oder Self-Hosted-Diensteintrags wird weder das native Server-Security-Paket installiert noch ein Linux-Server angemeldet.

## 3.2 Diensteintrag erstellen

4. Wählen Sie Register new agent.

5. Wählen Sie Hosted oder Self-Hosted und fahren Sie mit dem Schritt für Agentendaten fort.

6. Geben Sie unter Domain nur den Hostnamen ohne URL-Pfad ein.

7. Geben Sie für Hosted die IP Address und für Self-Hosted die Upstream URL ein.

8. Wählen Sie Register.

## 3.3 Hosted: Eigentum bestätigen und Verkehr weiterleiten

Der Registrierungsablauf zeigt zwei getrennte Elemente: ein Website-Meta-Tag zur Eigentumsbestätigung und einen A-Eintrag für die Hosted-Verkehrsweiterleitung.

9. Fügen Sie das bereitgestellte Meta-Tag innerhalb des HTML-Elements \<head\> der Website ein.

10. Veröffentlichen Sie die Änderung und prüfen Sie, dass die Website unter der registrierten Domain öffentlich erreichbar ist.

11. Wählen Sie im Registrierungsdialog Verify Domain Ownership und bestätigen Sie Verification successful!.

12. Fügen Sie den angezeigten A-Eintrag für die Hosted-Verkehrsweiterleitung zum DNS hinzu.

13. Vergewissern Sie sich nach der DNS-Propagierung, dass die Website weiterhin über die vorgesehene Domain erreichbar ist.

> **Wenn die Verifizierung fehlschlägt**
> Prüfen Sie Schreibweise der Domain, öffentliche Erreichbarkeit, Platzierung des Meta-Tags sowie Host-Verarbeitung durch Proxy/CDN und verwenden Sie anschließend Redo verification.

## 3.4 Self-Hosted-Bereitstellung

Befolgen Sie nach dem Erstellen des Self-Hosted-Diensteintrags das für Ihre Umgebung genehmigte Bereitstellungsverfahren. Die native Server-Security-Installation bleibt eine separate Install-Aktion in der Servertabelle.

# 4. Natives Server Security installieren und anmelden

## 4.1 Natives Paket installieren

14. Wählen Sie Install für den Zielserver.

15. Wählen Sie unter 1. Choose a native package das Betriebssystem und die Architektur des Servers aus.

16. Wählen Sie unter 2. Download and install die Option Download .deb oder Download .rpm.

17. Verwenden Sie Copy neben Install command und führen Sie den angezeigten Befehl mit Administratorberechtigungen auf dem Zielserver aus.

Verwenden Sie den im Panel angezeigten Dateinamen, Installationsbefehl und SHA-256-Wert. Typische Befehle ähneln:



> **Paketintegrität**
> Lassen Sie bei RPM-Paketen die Signaturprüfung aktiviert und befolgen Sie Ihr genehmigtes Signaturschlüsselverfahren. Beziehen Sie keine Signaturschlüssel aus nicht genehmigten Quellen und umgehen Sie die Paketprüfung nicht.

## 4.2 Server anmelden

18. Öffnen Sie im Installationsdialog 3. Enroll interactively.

19. Führen Sie auf dem vorgesehenen Server sudo silence-server enroll aus.

20. Wählen Sie Generate enrollment code.

21. Geben Sie den angezeigten Code ausschließlich an der Enrollment-Eingabeaufforderung des vorgesehenen Servers ein.

22. Lassen Sie den Installationsdialog geöffnet, während die Bereitstellungsphasen ausgeführt werden.

> **Sicherheit des Enrollment-Codes**
> Enrollment-Codes sind einmalig verwendbar, laufen nach höchstens 15 Minuten ab und dürfen niemals in Tickets, Dokumentation, Chat oder Shell-Verlauf kopiert werden.

Während der Bereitstellung kann der Dialog Phasen wie Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors und Installation complete anzeigen.

## 4.3 Wiederherstellung und erneutes Enrollment

Bei einem bereits als enrolled angezeigten Server kann Setup / recovery die Optionen Re-enroll server und Generate recovery code anbieten. Verwenden Sie die Wiederherstellung nur für den vorgesehenen Server und halten Sie während zugriffsbezogener Wiederherstellungen eine unabhängige Administratorzugriffsmethode bereit.

## 4.4 Schutz bestätigen

23. Wählen Sie Open Security für den Server.

24. Öffnen Sie Overview und wählen Sie Refresh.

25. Prüfen Sie Server protection, Provisioning, Sensor health und Guard access security.

26. Bestätigen Sie, dass aktueller Status und aktuelle Telemetrie dem erwarteten Schutz entsprechen.

> **Ausstehende Aktivierung**
> Wenn Policy den Status Saved · pending activation anzeigt, ist die Konfiguration gespeichert, darf aber noch nicht als aktiv betrachtet werden.

# 5. Schutzstatus verstehen

| **Status** | **Bedeutung** | **Maßnahme** |
|---|---|---|
| ACTIVE | Kernschutz wird als verfügbar gemeldet. | Prüfen Sie optionalen Sensor- und Richtlinienstatus separat. |
| DEGRADED | Der Kernschutz kann verfügbar bleiben, aber mindestens ein Gesundheits- oder Abdeckungssignal erfordert Aufmerksamkeit. | Lesen Sie den Grund und prüfen Sie Sensors. |
| FAILED | Bereitstellung oder Kernschutz hat einen Fehler gemeldet. | Lesen Sie den Fehler und befolgen Sie die Fehlerbehebung. |
| PENDING | Installation, Bereitstellung oder Richtlinienaktivierung ist unvollständig. | Warten Sie auf den Abschluss; betrachten Sie die Änderung nicht als aktiv. |
| CONFIGURATION REQUIRED | Das Panel benötigt weitere Informationen, um den Kernzustand zu bestätigen. | Bestätigen Sie das Enrollment und befolgen Sie die angezeigte Anforderung. |
| REMOVED | Nativer Schutz wurde entfernt oder wird nicht mehr gemeldet. | Verwenden Sie, sofern verfügbar, den unterstützten Ablauf Setup / recovery. |

Sensorkarten können unabhängig Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale oder No telemetry melden.

# 6. MFA und geschützten Zugriff konfigurieren

**Zugriff je Port:** Ziel nach Abschnitt 10 ist eine unabhängige Zulässigkeitsprüfung für jeden Port. MFA kann zulässige Ports kurzzeitig freigeben, überschreibt jedoch keine Länder-/IP-Sperre eines anderen Ports; Dienstanmeldung bleibt nötig. Die bisherige Gruppenfreigabe belegt die unabhängige Prüfung noch nicht.

## 6.1 Konto-MFA

27. Öffnen Sie bei der Kontoregistrierung Set up 2FA.

28. Scannen Sie den QR-Code oder geben Sie den geheimen Schlüssel in eine TOTP-Authenticator-Anwendung ein.

29. Geben Sie den aktuellen sechsstelligen Code ein und wählen Sie Verify and finish.

30. Verwenden Sie bei künftigen Anmeldungen den aktuellen Authenticator-Code.

> **MFA-Geheimnisse schützen**
> Senden Sie niemals Authenticator-Geheimnis, QR-Code oder Wiederherstellungscode an andere Personen. Nutzen Sie bei Verlust des Authenticator-Zugriffs den genehmigten Kontowiederherstellungskanal Ihrer Organisation.

## 6.2 MFA für Serverzugriff (SSH 2FA / Port Guard)

Die SSH-2FA-Steuerung schützt die konfigurierten TCP-Ports als Gruppe; sie ist nicht auf SSH-Port 22 beschränkt und deckt UDP nicht ab.

> **Vor dem Ändern von Zugriffskontrollen**
> Halten Sie eine unabhängige Administratorsitzung oder getestete Wiederherstellungsmethode bereit, bis der Zugriff aus dem vorgesehenen Quellnetz bestätigt wurde.

31. Öffnen Sie in der Servertabelle das Stift-/Bearbeitungselement.

32. Fügen Sie in Agent configuration geschützte TCP-Ports hinzu oder entfernen Sie sie und wählen Sie Save. Ports müssen ganze Zahlen zwischen 1 und 65535 sein.

33. Aktivieren Sie in der Serverzeile SSH 2FA, um die Einrichtung von 2FA SSH Guard zu öffnen.

34. Scannen Sie den QR-Code oder geben Sie Manual entry key in Ihrer Authenticator-App ein.

35. Speichern Sie vor dem Fortfahren alle acht Backup / Recovery Codes. Jeder Code ist einmalig verwendbar.

36. Wählen Sie Next — Verify Code, geben Sie den aktuellen sechsstelligen Code ein und wählen Sie Verify.

37. Bestätigen Sie 2FA verified successfully!, wählen Sie Done, öffnen Sie Agent configuration erneut und prüfen Sie die vorgesehenen Ports und Zugriffseinstellungen.

## 6.3 Mit Port Guard authentifizieren

38. Öffnen Sie die für Ihre Bereitstellung bereitgestellte Port-Guard-Adresse aus derselben Netzwerkquelle, die sich mit dem geschützten Dienst verbinden wird.

39. Geben Sie den aktuellen sechsstelligen Authenticator-Code oder einen unbenutzten Sicherungscode ein.

40. Wählen Sie Unlock Ports.

41. Stellen Sie umgehend erneut eine Verbindung zum geschützten Dienst her, nachdem die Seite die geöffneten Ports meldet.

Die konfigurierten geschützten TCP-Ports werden gemeinsam für ein temporäres Zugriffsfenster autorisiert. Die angezeigte Dauer ist maßgeblich; der erzeugte Standardwert beträgt 60 Sekunden. Der geschützte Dienst erfordert weiterhin eigene Anmeldedaten.

> **Dieselbe Netzwerkquelle**
> Der Port-Guard-Browser und der SSH-/Datenbank-/Anwendungsclient sollten aus derselben beobachteten Netzwerkquelle erscheinen. Ein Netzwerkwechsel kann erneute Authentifizierung erfordern.

# 7. Server-Security-Konsole verwenden

**Network access:** Abschnitt 10 beschreibt die eigene Seite, Server-/Portwahl, Globus, Liste und Richtlinienbedienung. Wischgesten und entsprechende Knöpfe sind in einem echten Browser noch nicht geprüft; maßgeblich sind die tatsächlich angezeigten Bezeichnungen Ihrer Installation.

| **Registerkarte** | **Zweck** |
|---|---|
| Overview | Schutzstatus, Bereitstellung, Sensorzustand, Vorfälle, Reaktionen und letzte Aktivitäten. |
| Incidents | Korrelierte Sicherheitsaktivität zur Prüfung. |
| Responses | Datensätze und Ergebnisse automatischer Reaktionen. |
| Sensors | Sensorzustand und Erkennungsansichten. |
| Posture | Ergebnisse der Security Configuration Assessment und Status der Schwachstelleninformationen. |
| Inventory | Gemeldeter Paket- und Serverbestand. |
| Events | Filterbare, paginierte Servertelemetrie. |
| Policy | Automatischer Reaktionsmodus, IP-Richtlinie, Sensorschalter und Suricata-Schnittstelle. |

Verwenden Sie Refresh für die Hauptkonsole. Ändern Sie in Events Seite oder Filter, um den Ereignis-Explorer selbst zu aktualisieren.

# 8. Vorfälle und Reaktionen prüfen

**Verschiedene Aktionen:** **Shut down session** betrifft eine bestehende Verbindung; **Blacklist IP address** speichert eine dauerhafte Sperre neuer Verbindungen in ihrem Bereich. Automatische Antworten können zeitlich begrenzt und anders geregelt sein. Antrag oder Speichern bestätigt weder Trennung noch Anwendung.

## 8.1 Vorfälle

Wählen Sie einen Vorfall, um Incident details zu öffnen. Prüfen Sie Schweregrad, Zusammenfassung, verfügbare Quellinformationen, Timeline, Evidence und Technical details.

| **Aktion** | **Auswirkung** |
|---|---|
| Mark investigating | Ändert den Prüfstatus des Vorfalls und kennzeichnet eine aktive Untersuchung. |
| Resolve | Zeichnet auf, dass die Vorfallprüfung abgeschlossen ist. |
| Dismiss | Zeichnet auf, dass der Vorfall nicht weiterverfolgt wird. |

> **Vorfallstatus ist keine Behebung**
> Das Ändern des Prüfstatus entfernt nicht selbstständig Schadsoftware, stoppt keinen Angreifer und repariert keinen kompromittierten Server.

## 8.2 Reaktionen

| **Status** | **Bedeutung** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | Zur Auswertung aufgezeichnet oder genehmigt; Anwendung ist nicht bestätigt. |
| APPLIED | Die Reaktion wurde im angezeigten Umfang als angewendet aufgezeichnet. |
| EXPIRED | Eine temporäre Reaktion ist nicht mehr aktiv. |
| REVOKED | Die Reaktion wurde zurückgenommen. |
| FAILED | Die angeforderte Aktion wurde nicht erfolgreich abgeschlossen. |
| SUPPRESSED | Die Reaktion wurde gemäß anwendbarer Richtlinie nicht erzwungen. |

Prüfen Sie Quelle, Aktion und Umfang, Grund, Status, Startzeit und Ablauf gemeinsam. Das Blockieren neuer Verbindungen beendet nicht unbedingt eine bereits bestehende Verbindung.

# 9. Sicherheitsrichtlinie konfigurieren

**Unterschiedliche Listen:** **Trusted IPs** betrifft automatische Antworten, **Allowed IPs / CIDRs** den Port-Guard-Zugang; ausdrückliche Sperren können weiter reichen. Keine davon ist **Always Allow** oder **Always Block** aus Abschnitt 10. Alte Regeln bei der Migration abgleichen; eine kontoübergreifende HTTP-Liste wird nie automatisch zur SSH/Kubernetes-Portsperre.

## 9.1 Automatischer Reaktionsmodus

| **Modus** | **Verhalten** |
|---|---|
| Observe | Zeichnet geeignete Entscheidungen ohne automatische Durchsetzung auf. |
| Shadow | Bewertet geeignete Erkennungen, ohne temporäre Sperren durchzusetzen. |
| Enforce | Kann genehmigte temporäre IP-Sperren anwenden, wenn Richtlinien- und Erkennungsbedingungen aktiv sind. |

Der normale anfängliche Installationsmodus ist Shadow. Wählen Sie für Enforce die Option Enforce, prüfen Sie Enable automatic enforcement? und bestätigen Sie Enable Enforce. Enforce gilt nur für geeignete Erkennungen.

## 9.2 Vertrauenswürdige IPs

42. Öffnen Sie Policy → Trusted IPs.

43. Geben Sie Trusted IP or CIDR und optional eine Description ein.

44. Wählen Sie Add trusted source.

45. Löschen Sie Einträge mit Remove oder wandeln Sie sie mit Move to block in eine explizite Sperre um.

Trusted IPs nimmt eine Quelle von geeigneten Sperren automatischer Reaktionen aus. MFA, Ländereinschränkungen, Allowed IPs / CIDRs, Dienstanmeldedaten oder andere Zugriffskontrollen werden dadurch nicht umgangen.

## 9.3 Allowed IPs / CIDRs

46. Öffnen Sie das Stift-/Bearbeitungselement in der Serverzeile.

47. Geben Sie in Agent configuration einzelne IPv4-/IPv6-Adressen oder CIDR-Bereiche unter Allowed IPs / CIDRs kommagetrennt ein.

48. Wählen Sie Save und öffnen Sie den Dialog erneut, um die Speicherung des Werts zu prüfen.

Ist die gespeicherte Liste leer, lässt die Port-Guard-Adressprüfung alle Quellen mit der Authentifizierung fortfahren. Ist sie nicht leer, dürfen nur übereinstimmende Adressen oder Bereiche fortfahren.

## 9.4 Explizite Sperren

49. Öffnen Sie Policy → Explicit blocks.

50. Geben Sie Blocked IP or CIDR, den erforderlichen Reason und optional Explicit block expiry ein.

51. Wählen Sie Add explicit block.

52. Löschen Sie einen Eintrag mit Remove. Entfernen Sie einen fehlerhaften Eintrag und erstellen Sie ihn neu.

> **Administratorsperre vermeiden**
> Prüfen Sie vor einer Sperre Administrator-, Überwachungs-, NAT- und gemeinsam genutzte Adressen, die dieselbe Quell-IP oder dasselbe CIDR verwenden könnten.

## 9.5 Sensoren und Suricata

Policy → Sensor state kann Schalter für Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco und Suricata anbieten.

Öffnen Sie für Suricata Policy → Suricata monitored interface, wählen Sie einen angezeigten Kandidaten oder geben Sie eine verifizierte Schnittstelle wie ens3 ein und wählen Sie Save interface. Bestätigen Sie nach der Änderung neue Suricata-Telemetrie.

# 10. Netzwerkzugriff, Globus und aktive Sitzungen

**Funktionsanforderung vom 2026-10-06.** Dieser Abschnitt beschreibt das geforderte Verhalten und bescheinigt keinen Produktivbetrieb. Vor der Implementierung zeigte der Globus Webverkehr; Länderregeln waren getrennt und das Beenden einer Sitzung nicht verfügbar. CMC/Guard-Code enthält inzwischen eine Network-access-Seite, Richtlinien je Server und Port, signierte Guard-Aktualisierung, nftables-Freigabe je Port, TCP-Momentaufnahmen im Linux-Host-Netzwerk-Namespace und signierte Befehle zum gezielten Trennen. `NETWORK_ACCESS_NET_CHECKLIST.md` nennt statische, Unit- und Cross-Build-Prüfungen. Datenbankmigration, reale Linux/Kubernetes-Verbindungen, SSH an Port 2525, Browserbedienung, Neustarts und vollständige Bestätigung durch den Agenten sind in den vorliegenden Unterlagen noch nicht Ende zu Ende geprüft. Gespeichert bedeutet ausstehend, bis der laufende Agent die Revision bestätigt; ein eingereihter Befehl bedeutet keine bestätigte Trennung.

## 10.1 Zweck und Geltungsbereich (NET-01)

CMC soll 3D-Globus, Länderlisten, Sperrdialog und nach oben ausklappbares Panel für den Zugriff auf konfigurierte geschützte TCP-Ports zusammenführen. Eine **Netzwerksitzung** ist eine tatsächlich aktive TCP-Verbindung von einer beobachteten Quell-IP zu einem konfigurierten Zielport eines verwalteten Servers. Läuft SSH auf Port **2525**, muss die Verbindung während ihrer Nutzung erscheinen; SSH ist nicht auf 22 beschränkt. Dasselbe gilt für konfigurierte Kubernetes-Endpunkte und andere geschützte TCP-Dienste. Dienstnamen müssen aus Konfiguration oder verlässlicher Beobachtung stammen. Eine Kubernetes-TCP-Verbindung beweist weder Benutzeridentität noch Pod-Shell oder einzelne `kubectl exec`-Operation. Das Schließen einer gebündelten Verbindung kann mehrere Vorgänge betreffen. Website-Besuche, HTTP-Anfragen, Browseranmeldungen, User-Agents und einzelne IPs aus Zugriffsprotokollen sind keine solchen Sitzungen. Unabhängiges Webhosting, HTTP-Analyse, Registrierung und Abrechnung bleiben getrennt.

## 10.2 Server- und Portauswahl (NET-02)

Vor Ansicht oder Bearbeitung den ausgewählten Server und geschützten TCP-Port zeigen. Jeder Port kann eigenen Ländermodus und eigene Länderliste haben; eine Regel für 2525 darf keinen anderen Port stillschweigend ändern. **All protected ports** darf aggregieren, muss aber gemischte Regeln kenntlich machen. Auswahl und Filter aktualisieren Globus, wirksame Länderlisten und Sitzungsliste gemeinsam. Die dauerhaften IP-Listen **Always Allow** und **Always Block** gelten für die konfigurierten geschützten Ports des ausgewählten Servers, nicht automatisch für das ganze Konto oder fremde Ports.

## 10.3 Dialog und Listen (NET-03)

Die erste Reihe enthält **Countries** und **IP addresses**. Unter **Countries** enthält die zweite **Blacklisted** und **Whitelisted**, Suche, Hinzufügen und Entfernen sowie einen getrennten Schalter **Blacklist mode / Whitelist mode**. Der Wechsel der Listenansicht ändert nicht den Modus. Explizit gespeicherte Länder und die wirksame Gegenmenge müssen für den gewählten Port verständlich sein. Unter **IP addresses** enthält die zweite Reihe **Always Block** und **Always Allow**. Jede Liste bietet **+**, ein einfaches IP-Eingabefeld, gespeicherte Einträge und Entfernen. Beide Listen wirken gleichzeitig, unabhängig von Tab und Ländermodus. Einzelne IPv4- und IPv6-Adressen akzeptieren, äquivalente Formen normalisieren und Dubletten verhindern; JSON, Browser-Fingerprints, IP-Benutzer-Paare und verpflichtende CIDR-Ausdrücke sind nicht nötig.

## 10.4 Ländermodi (NET-04)

| Modus | Explizit ausgewählte Länder | Alle anderen bekannten Länder |
|---|---|---|
| **Blacklist mode** | Gesperrt | Erlaubt, vorbehaltlich IP-Regeln und Authentifizierung |
| **Whitelist mode** | Erlaubt, vorbehaltlich IP-Regeln und Authentifizierung | Gesperrt |

Eine leere schwarze Liste sperrt kein Land; eine leere weiße Liste erlaubt keines. Beim Moduswechsel erklären, ob explizite Einträge erhalten oder übertragen werden; eine angezeigte Gegenmenge nicht heimlich als Auswahl speichern. Kasachstan und die Türkei in **Whitelist mode** erlauben diese Länder und sperren alle anderen, soweit keine gültige IP-Ausnahme greift. Jeder Port wird einzeln bewertet: Eine Sperre auf einem Port sperrt keinen sonst erlaubten Port, und dessen Freigabe öffnet keinen gesperrten Port. MFA bleibt erforderlich. Fehlende Herkunft als **Unknown country** kennzeichnen, nie ein Land erfinden. Unbekannte öffentliche IPs dürfen bei GeoIP-Ausfall Regeln nicht stillschweigend abschalten; im Whitelist-Modus sind sie ohne **Always Allow** gesperrt. Private/lokale Quellen umgehen die Länderbewertung, bleiben aber IP-Regeln und MFA unterworfen und sind von fehlgeschlagener öffentlicher GeoIP-Auflösung zu unterscheiden.

## 10.5 Dauerhafte IP-Ausnahmen (NET-05)

**Always Allow** nimmt die beobachtete Quell-IP bis zum Entfernen von Länderbeschränkungen auf den geschützten Ports dieses Servers aus. Beispiel: Russland ist gesperrt, aber ein Mitarbeiter arbeitet dort aus der Ferne. Seine beobachtete IP in **Always Allow** überwindet die Länderregel; MFA und SSH-Anmeldung bleiben nötig. Dasselbe gilt im Whitelist-Modus ohne Russland. Entfernen stellt die normale Länderentscheidung wieder her. **Always Block** sperrt eine passende IP selbst bei sonst erlaubtem Land. Beide Listen bleiben gleichzeitig und über Moduswechsel hinweg wirksam. **Always Allow** umgeht weder Dienstanmeldung noch unabhängige automatische Gefahrenabwehr. **Trusted IPs** betrifft diese Abwehr und ist kein Synonym; alte Quell-Positivlisten und ausdrückliche Sperren müssen bewusst abgeglichen werden. Dieselbe normalisierte IP darf nicht in beiden Listen stehen: einen ausdrücklichen Verschiebevorgang anbieten. Bei widersprüchlichen Daten hat Sperren Vorrang und der Konflikt wird gemeldet. Reihenfolge: **Always Block**, **Always Allow** als Länderausnahme, dann Ländermodus des Ports; MFA und Dienstanmeldung folgen. Eine gemeinsame öffentliche IP betrifft alle Nutzer dieser Adresse; bei Adresswechsel die Ausnahme aktualisieren. Eine IP allein identifiziert keinen Mitarbeiter.

## 10.6 Globus und vier Dichtestufen (NET-06)

Der Globus zeigt wirksame erlaubte/gesperrte Länder und aktive Verbindungen im gewählten Bereich; eine erlaubte IP in einem gesperrten Land muss erkennbar sein. Länderfarben und Sitzungsdichte getrennt erläutern. Die dokumentierten vier Stufen lauten **0, 1–2, 3–9 und 10+ Sitzungen**; aktuelle Werte vor Veröffentlichung als verifiziert anhand neuer Implementierungsbelege prüfen. Markergruppen müssen zu einzelnen IPs und Verbindungen führen, ohne aus einem Land genaue IP-Koordinaten abzuleiten. Gemischte Regeln sowie unbekannte/private Orte sichtbar machen. Das alte **Active Users** zählte jüngste Protokoll-IPs, keine aktiven TCP-Verbindungen. Globus und Liste verwenden dieselben Filter, Zeitstempel, Summen und Aktualität. Bestätigt geschlossene Verbindungen verschwinden; ein Offline-Agent oder fehlende Telemetrie bedeutet unbekannt/veraltet, nicht null.

## 10.7 Sitzungsliste (NET-07)

Nach oben wischen öffnet die Liste; eine sichtbare Öffnen-/Erweitern-Schaltfläche bietet Maus und Tastatur dieselbe Funktion. Schließen/Einklappen führt zurück zum Globus. Jede Zeile steht für eine Verbindung; mehrere Verbindungen derselben IP bleiben getrennt. Quell-IP, Land oder privat/unbekannt, Server, Zielport, konfigurierter Dienstname wenn verfügbar, Status und tatsächlich bekannte Zeiten anzeigen. **First observed** ist die erste bekannte Beobachtung, nicht zwingend der echte Verbindungsbeginn. Suche, Bereichsfilter und Navigation müssen jede Zeile erreichbar machen; eine Ergebnisseite ist nicht die Gesamtsumme.

## 10.8 Kontextmenü und Trennung (NET-08)

Rechtsklick auf prüfbare IP/Sitzung im Globus oder der Liste bietet **Shut down session** und **Blacklist IP address**; für Touch und Tastatur ein sichtbares gleichwertiges Menü. Bei mehreren Verbindungen derselben IP die genaue Verbindung mit Server und Port auswählen. **Shut down session** trennt nur diese reale Verbindung über den Agenten, auch SSH auf 2525/22, den unterstützten Kubernetes-Pfad und andere geschützte TCP-Dienste. Es schaltet weder Server, Dienst, Pod noch weitere Verbindungen ab, stoppt nicht unbedingt bereits angestoßene Arbeit und sperrt keine erneute Verbindung. Verbindungsidentität unmittelbar vorher prüfen; IP allein, Benutzername, ungenauer Zeitstempel oder wiederverwendete PID reichen nicht. Angefordert/eingereiht und bestätigt unterscheiden; bereits geschlossen, veraltet, Agent offline, unberechtigt, nicht unterstützt, abgelaufen und fehlgeschlagen ehrlich melden. Ein versandter Befehl ist kein Nachweis; fehlende sichere gezielte Trennung konkret benennen.

## 10.9 Sperren aus einer Sitzung (NET-09)

**Blacklist IP address** fügt die Quell-IP derselben dauerhaften serverbezogenen Liste **Always Block** hinzu. Zuerst gespeichert/ausstehend, erst nach Agentenbestätigung angewendet oder fehlgeschlagen zeigen; der Dialog **IP addresses** zeigt denselben Eintrag. Steht die IP in **Always Allow**, einen ausdrücklichen Wechsel anbieten. Nach Anwendung werden neue Verbindungen im Geltungsbereich verhindert; bestehende Sitzungen sind dadurch nicht nachweislich beendet und benötigen eine gesonderte Trennung.

## 10.10 Speichern, Anwendung und Migration (NET-10)

Eine Richtlinie verbindet CMC, API/Speicher, gelieferte Agentenkonfiguration und tatsächliche Durchsetzung. Gespeichert, ausstehend, angewendet und fehlgeschlagen samt Revision/Zeit getrennt zeigen; Offline-Agenten bleiben ausstehend. Neustarts überstehen, alte Befehle und Richtlinienwiedergaben abweisen, Berechtigung für Akteur/Konto/Server prüfen und Ziel, Aktion, Zeitpunkt und Ergebnis protokollieren. Alte Anleitung zur kontoübergreifenden HTTP-Ländersperre und separaten Geo-JSON-Bearbeitung durch diesen gemeinsamen Ablauf ersetzen. Eine HTTP-Sperrliste niemals stillschweigend in SSH/Kubernetes-Sperren aller Server umdeuten. Bestehende native und IP-Regeln gezielt migrieren, ohne Schutz zu schwächen oder verdeckte Ablehnungen zu erzeugen. Unabhängige HTTP-Analyse und andere Funktionen bleiben bestehen.

## 10.11 Pflichtprüfung (NET-11)

Vor Fertigmeldung **NET-01** bis **NET-11** mit Dateien, Prüfnachweisen und offenen Abweichungen durchgehen: zwei unabhängige Ports einschließlich SSH 2525; beide Modi, leere Listen und Moduswechsel; zwei Tab-Reihen und gleichzeitig aktive IP-Listen; Mitarbeiter in Russland in beiden Modi samt MFA; Sperrvorrang, IPv4/IPv6 und Dubletten; echte SSH-, Kubernetes- und andere TCP-Verbindungen in Globus und Liste; vier Stufen, gleiche Summen und veraltete Daten; Wischen, Maus/Tastatur und Menüs; Trennen genau einer Verbindung auch bei gleicher IP; bereits geschlossen, unberechtigt, veraltet, fehlgeschlagen und nicht unterstützt; dauerhafte Sperre, Agentenbestätigung, Neustarts, Kontoisolation und Migration. Aussehen oder simulierte Daten genügen nicht. Fehlende reale Linux/Kubernetes- und Browserprüfungen getrennt dokumentieren.

# 11. Sensoren, Bestand, Sicherheitslage und Befunde prüfen

## 11.1 Sensoren

| **Sensor / Ansicht** | **Gemeldete Informationen** |
|---|---|
| Guard | Kernschutzsignal. |
| File Integrity | Überwachte Dateiänderungen. |
| YARA-X | Nachweise für Schadsoftwaremuster. |
| CrowdSec | Verhaltensbasierte Sicherheitserkennungen. |
| Falco | Laufzeit- und Systemerkennungen. |
| Suricata | Netzwerkerkennungen. |
| Inventory / Security Configuration | Bestands- und Bewertungsdaten. |

Eine Sensorerkennung ist ein Nachweis. Automatische temporäre Reaktionen erfolgen nur für geeignete Erkennungen im Rahmen einer aktivierten Reaktionsrichtlinie.

## 11.2 Bestand und Schwachstelleninformationen

Inventory kann Paketname, Version, Ökosystem, Architektur und Zeitpunkt der letzten Beobachtung anzeigen. Filtern Sie die kundenseitige Pakettabelle mit Search packages. Der Bestand dient zur Information; er patcht weder Pakete noch behebt er Schwachstellen.

> **Leere oder veraltete Daten vorsichtig interpretieren**
> Leere, nicht verfügbare, unbekannte oder veraltete Bestands-/Schwachstelleninformationen belegen nicht, dass ein Server keine Pakete oder Schwachstellen aufweist.

## 11.3 Sicherheitslage

Verwenden Sie Posture für Ergebnisse der Security Configuration Assessment und den Status der Schwachstelleninformationen. Befunde können fehlgeschlagene oder zurückgefallene Prüfungen und bereitgestellte Hinweise anzeigen. Posture ist eine Bewertungsansicht und behebt den Server nicht automatisch.

# 12. Ereignisse und Telemetrie überwachen

**Aktualität:** Zugriffsprotokolle und das alte **Active Users** zählen keine aktiven TCP-Verbindungen. Globus und Liste nach Abschnitt 10 benötigen gleiche Filter, Summen und Zeitstempel. Fehlende oder alte Telemetrie bedeutet unbekannt/veraltet, nicht null.

Öffnen Sie Events und verwenden Sie die verfügbaren Filter:

- Nach Sensor filtern.
- Mit dem exakten Ereignistyp nach Ereignistyp filtern.

- Nach Schweregrad filtern: All severities, critical, high, medium, low oder info.
- Previous und Next zur Seitennavigation verwenden.

Prüfen Sie Ereignisname, Quelle, Typ, Nachweis, Schweregrad, Zeitstempel und gegebenenfalls den verknüpften Vorfall.

# 13. Fehlerbehebung

**Unerwarteter Zugriff:** Server und Port, Ländermodus, tatsächlich beobachtete Quell-IP, **Always Block**/**Always Allow**, alte Einschränkungen und angewendete Revision prüfen. Nach IP-Wechsel Ausnahme aktualisieren. Ausstehende Richtlinie, Offline-Agent oder alte Sitzung belegen keinen Live-Zustand; angeforderte, abgelaufene oder nicht unterstützte Trennung ist keine bestätigte Trennung.

> **Erste Regel**
> Halten Sie beim Ändern von Zugriffskontrollen einen unabhängigen Administratorzugriff bereit. Zeichnen Sie nicht vertraulichen Fehlertext auf und teilen Sie niemals Enrollment-Codes, MFA-Geheimnisse, Sicherungscodes, private Schlüssel oder Screenshots, die diese enthalten.

| **Situation** | **Empfohlene Maßnahme** |
|---|---|
| Paketinstallation schlägt fehl | Stellen Sie sicher, dass das Paket zu Betriebssystem/Architektur passt, laden Sie es erneut herunter, vergleichen Sie SHA-256 und führen Sie den kopierten Befehl mit Administratorrechten aus. Lassen Sie bei RPM die Signaturprüfung aktiviert. |
| Enrollment-Code läuft ab | Erzeugen Sie nur einen neuen Code, wenn der vorherige unbenutzt ist oder das Panel einen Ersatz ausdrücklich erlaubt. Wurde ein Code vor einem späteren Fehler akzeptiert, verwenden Sie Setup / recovery, wenn der Server als enrolled angezeigt wird. |
| Schutz ist nicht als aktiv bestätigt | Öffnen Sie Overview und prüfen Sie Server protection, Provisioning, Sensor health und Guard access security. Befolgen Sie den angezeigten Grund für PENDING, DEGRADED, FAILED oder CONFIGURATION REQUIRED. |
| Policy zeigt Saved · pending activation | Betrachten Sie die Richtlinie als gespeichert, aber noch nicht aktiv. Behalten Sie die vorherige sichere Konfiguration und den Administratorzugriff bis zum Abschluss der Aktivierung bei. |
| MFA-Einrichtung schlägt fehl | Prüfen Sie die Authenticator-Zeit, verwenden Sie einen aktuellen sechsstelligen Code, prüfen Sie die vorgesehenen Ports und lassen Sie die bestehende Administratorsitzung geöffnet. |
| Port Guard entsperrt, aber der Dienst ist nicht erreichbar | Verbinden Sie sich zeitnah erneut, bestätigen Sie dieselbe beobachtete Quelle für Browser/Client, prüfen Sie geschützten Port und Dienstanmeldedaten sowie Allowed IPs, Länderregeln, explizite Sperren, automatische Reaktionen und Netzwerkrichtlinie. |
| Authenticator-Zugriff geht verloren | Verwenden Sie, sofern verfügbar, einen unbenutzten Sicherungscode und danach den genehmigten Wiederherstellungsprozess Ihrer Organisation. |
| IP- oder Länderbeschränkungen verhalten sich unerwartet | Bestimmen Sie die steuernde Funktion, prüfen Sie Quelladresse und Port, Regelvorrang und Ablauf und vermeiden Sie eine versehentliche Administratorsperre, bevor Sie weitere Regeln hinzufügen. |
| Sensortelemetrie fehlt oder ist veraltet | Öffnen Sie Sensors, prüfen Sie Sensorstatus und Last signal sowie relevante Konfigurationen wie die Suricata-Schnittstelle. |
| Paketbestand ist leer | Verwenden Sie Search packages und vergleichen Sie die Pakettabelle mit anderer Bestandsaktivität. Betrachten Sie eine leere Tabelle als unvollständige Information, nicht als Beleg für fehlende Pakete. |

# 14. Bewährte Sicherheits- und Betriebsverfahren

**Aktuelle Grenzen:** Der Code aus Abschnitt 10 hat laut vorliegenden Unterlagen keine vollständigen realen Linux/Kubernetes- oder Browserprüfungen. Befristete MFA-Freigaben benötigen nftables. Der Sammler sieht nur etablierte TCP-Sockets im Host-Netzwerk-Namespace des gewählten Knotens, nicht sämtliche Pods, Knoten oder Load Balancer. Ohne Socket-Identität lautet der Zustand nicht unterstützt; zu große Momentaufnahmen sind veraltet, nicht vollständig. Neustarts, Bestätigung und gezielte Trennung bleiben zu prüfen.

- Verwenden Sie für vertrauenswürdige und erlaubte Quellen möglichst enge IP-/CIDR-Bereiche.
- Halten Sie beim Aktivieren von MFA, expliziten Sperren oder Länderbeschränkungen einen getesteten Administrator-Wiederherstellungsweg bereit.

- Verlassen Sie sich nicht auf eine gespeicherte Konfiguration, bevor das Panel einen geeigneten aktiven/fehlerfreien Zustand meldet und aktuelle Telemetrie ihn stützt.
- Behandeln Sie Sensorerkennungen als zu untersuchende Nachweise; nehmen Sie nicht an, dass jede Erkennung automatisch blockiert wurde.

- Prüfen Sie den Ablauf einer Reaktion, bevor Sie annehmen, dass eine automatische Sperre noch aktiv ist.
- Entfernen Sie Sicherheitsdateien oder -dienste nicht manuell als Wiederherstellungsmethode, sofern Ihr genehmigtes Betriebsverfahren dies nicht ausdrücklich verlangt.

# Anhang A — Statuskurzübersicht

| **Element** | **Interpretation für Kunden** |
|---|---|
| Registered | Der Diensteintrag ist vorhanden. |
| Installed | Das native Paket wurde installiert. |
| Enrolled | Der einmalige Enrollment-Code wurde akzeptiert. |
| Installation complete | Die Bereitstellung hat die Abschlussphase erreicht; prüfen Sie den aktuellen Overview-Status und die Telemetrie. |
| Saved · pending activation | Die Änderung ist im Panel gespeichert, darf aber noch nicht als aktiv betrachtet werden. |
| SSH 2FA: Active | Die Authenticator-Einrichtung für die Zeile ist abgeschlossen; prüfen Sie vorgesehene geschützte Ports und aktuellen Schutzstatus. |
