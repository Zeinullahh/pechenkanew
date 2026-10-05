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

# 10. Länderbasierte Zugriffskontrollen verwalten

## 10.1 Geo-Country Filtering pro Server

Das serverspezifische Geo-Country Filtering gilt für die konfigurierte Gruppe geschützter TCP-Ports und erfordert verifizierte Serverzugriffs-MFA.

53. Konfigurieren Sie die geschützten TCP-Ports und schließen Sie die SSH-2FA-Einrichtung ab.

54. Öffnen Sie Agent configuration und aktivieren Sie Enable Geo-Country Filtering.

55. Wählen Sie unter Default Policy die Option Allow Unmatched oder Deny Unmatched.

56. Geben Sie einen gültigen Wert für Geo Rules (JSON Array) ein und wählen Sie Save.

57. Öffnen Sie Agent configuration erneut und prüfen Sie gespeicherten Schalter, Standardrichtlinie, Regeln, Ports und 2FA-Einstellung.



- Eine explizite Regel für einen konfigurierten Port hat Vorrang vor der Standardrichtlinie.
- Eine allow-Regel erlaubt die aufgeführten Länder und verweigert Länder, die nicht in dieser Regel enthalten sind.

- Eine deny-Regel verweigert die aufgeführten Länder und erlaubt Länder, die nicht in dieser Regel enthalten sind.
- Die Standardrichtlinie gilt nur für konfigurierte Ports ohne explizite Regel.

## 10.2 Länder-Sperrliste auf Kontoebene

Blacklist countries im allgemeinen Dashboard ist eine Sperrliste für Webverkehr auf Kontoebene und getrennt vom serverspezifischen Geo-Country Filtering.

58. Öffnen Sie Blacklist countries.

59. Öffnen Sie Non-Blacklisted und suchen Sie gegebenenfalls nach Ländernamen oder zweistelligem Code.

60. Wählen Sie ein Land und dann Add. Die Änderung wird sofort gespeichert.

61. Bestätigen Sie, dass das Land unter Blacklisted erscheint.

Um ein Land zu entfernen, öffnen Sie Blacklisted, wählen das gesperrte Land und dann remove. Das Land wird zu Non-Blacklisted zurückgeführt.

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

Öffnen Sie Events und verwenden Sie die verfügbaren Filter:

- Nach Sensor filtern.
- Mit dem exakten Ereignistyp nach Ereignistyp filtern.

- Nach Schweregrad filtern: All severities, critical, high, medium, low oder info.
- Previous und Next zur Seitennavigation verwenden.

Prüfen Sie Ereignisname, Quelle, Typ, Nachweis, Schweregrad, Zeitstempel und gegebenenfalls den verknüpften Vorfall.

# 13. Fehlerbehebung

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
