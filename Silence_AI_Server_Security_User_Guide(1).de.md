# Silence AI Server Security Benutzerhandbuch

Dieses Handbuch beschreibt die Dienstregistrierung, Installation und Registrierung des nativen Server Security, Einrichtung geschützter Zugriffe und Prüfung von Sicherheitsaktivitäten im Silence AI-Verwaltungspanel.

Registrierung, Paketinstallation, Enrollment, Policy-Speicherung und tats?chliche Durchsetzung sind getrennte Zust?nde. Pr?fen Sie den angezeigten Status vor weiteren ?nderungen.

## Inhaltsverzeichnis

1. Vorbereitung
2. Anmeldung und Server Security öffnen
3. Dienst registrieren
4. Installieren, anmelden und Schutz aktivieren
5. Schutzstatus verstehen
6. MFA und geschützten Zugriff konfigurieren
7. Server-Security-Konsole verwenden
8. Vorfälle und Reaktionen prüfen
9. Sicherheitsrichtlinie konfigurieren
10. Netzwerkzugriff, Globus und aktive Sitzungen
11. Sensoren, Inventar, Posture und Befunde
12. Ereignisse und Telemetrie
13. Fehlerbehebung

## 1. Vorbereitung

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

## 2. Anmelden und Server Security öffnen

1. Öffnen Sie das Silence-AI-Administrationspanel und wählen Sie Log in.

2. Schließen Sie die Konto-MFA mit dem aktuellen sechsstelligen Authenticator-Code ab.

3. Öffnen Sie Server Security und wählen Sie anschließend Servers.

Jede Serverzeile kann Install, Setup / recovery und Open Security anbieten. Die verfügbare Aktion hängt vom aktuellen Enrollment-Status des Servers ab.

## 3. Dienst registrieren

### 3.1 Hosted oder Self-Hosted auswählen

| **Bereitstellungstyp** | **Verwendung** | **Erforderliche Felder** |
|---|---|---|
| Hosted | Der Datenverkehr wird durch den Hosted-Dienst geschützt. | Domain + IP Address |
| Self-Hosted | Der Dienst wird in Ihrer Umgebung ausgeführt. | Domain + Upstream URL |

> **Registrierung ist keine Installation**
> Durch das Erstellen eines Hosted- oder Self-Hosted-Diensteintrags wird weder das native Server-Security-Paket installiert noch ein Linux-Server angemeldet.

W?hlen Sie **Register new agent**, bevor Sie **Hosted** oder **Self-Hosted** ausw?hlen.

### 3.2 Diensteintrag erstellen

4. Wählen Sie Register new agent.

5. Wählen Sie Hosted oder Self-Hosted und fahren Sie mit dem Schritt für Agentendaten fort.

6. Geben Sie unter Domain nur den Hostnamen ohne URL-Pfad ein.

7. Geben Sie für Hosted die IP Address und für Self-Hosted die Upstream URL ein.

8. Wählen Sie Register.

### 3.3 Hosted: Eigentum bestätigen und Verkehr weiterleiten

Der Registrierungsablauf zeigt zwei getrennte Elemente: ein Website-Meta-Tag zur Eigentumsbestätigung und einen A-Eintrag für die Hosted-Verkehrsweiterleitung.

9. Fügen Sie das bereitgestellte Meta-Tag innerhalb des HTML-Elements \<head\> der Website ein.

10. Veröffentlichen Sie die Änderung und prüfen Sie, dass die Website unter der registrierten Domain öffentlich erreichbar ist.

11. Wählen Sie im Registrierungsdialog Verify Domain Ownership und bestätigen Sie Verification successful!.

12. Fügen Sie den angezeigten A-Eintrag für die Hosted-Verkehrsweiterleitung zum DNS hinzu.

13. Vergewissern Sie sich nach der DNS-Propagierung, dass die Website weiterhin über die vorgesehene Domain erreichbar ist.

> **Wenn die Verifizierung fehlschlägt**
> Prüfen Sie Schreibweise der Domain, öffentliche Erreichbarkeit, Platzierung des Meta-Tags sowie Host-Verarbeitung durch Proxy/CDN und verwenden Sie anschließend Redo verification.

Der angezeigte **A record** leitet Hosted-Verkehr weiter und ist kein Eigentumsnachweis. Der Meta-Tag der Website dient der Prüfung; wenn die alte Website für die Prüfung erreichbar bleiben muss, bestätigen Sie den Tag vor der DNS-Umschaltung.

### 3.4 Self-Hosted-Bereitstellung

Erstellen Sie den Self-Hosted-Diensteintrag und befolgen Sie das für Ihre Umgebung genehmigte Bereitstellungsverfahren. Die native Server-Security-Installation ist ein separater Schritt in der Servertabelle.

## 4. Natives Server Security installieren und anmelden

**Registered** bedeutet vorhandener Diensteintrag, **Installed** installiertes natives Paket und **Enrolled** angenommener Einmalcode. Keiner dieser Zustände garantiert gesunden, aktiven Schutz.

### 4.1 Natives Paket installieren

14. Wählen Sie Install für den Zielserver.

15. Wählen Sie unter 1. Choose a native package das Betriebssystem und die Architektur des Servers aus.

16. Wählen Sie unter 2. Download and install die Option Download .deb oder Download .rpm.

17. Verwenden Sie Copy neben Install command und führen Sie den angezeigten Befehl mit Administratorberechtigungen auf dem Zielserver aus.

Verwenden Sie den im Panel angezeigten Dateinamen, Installationsbefehl und SHA-256-Wert. Typische Befehle ähneln:



> **Paketintegrität**
> Lassen Sie bei RPM-Paketen die Signaturprüfung aktiviert und befolgen Sie Ihr genehmigtes Signaturschlüsselverfahren. Beziehen Sie keine Signaturschlüssel aus nicht genehmigten Quellen und umgehen Sie die Paketprüfung nicht.

Wählen Sie in **Install Server Security** das passende native Paket. Übliche Befehle sind `sudo apt install ./<displayed-filename>.deb` auf Ubuntu und `sudo dnf --setopt=localpkg_gpgcheck=1 install ./<displayed-filename>.rpm` auf Fedora. Maßgeblich sind Name, Befehl und SHA-256 Ihrer Konsole. Ein Browser-Download installiert nichts auf dem Server; übertragen Sie das Paket bei Bedarf sicher nach genehmigtem Verfahren. Für bereits enrollte Server **Setup / recovery** nur nach Anweisung des Panels nutzen.

### 4.2 Server anmelden

18. Öffnen Sie im Installationsdialog 3. Enroll interactively.

19. Führen Sie auf dem vorgesehenen Server sudo silence-server enroll aus.

20. Wählen Sie Generate enrollment code.

21. Geben Sie den angezeigten Code ausschließlich an der Enrollment-Eingabeaufforderung des vorgesehenen Servers ein.

22. Lassen Sie den Installationsdialog geöffnet, während die Bereitstellungsphasen ausgeführt werden.

> **Sicherheit des Enrollment-Codes**
> Enrollment-Codes sind einmalig verwendbar, laufen nach höchstens 15 Minuten ab und dürfen niemals in Tickets, Dokumentation, Chat oder Shell-Verlauf kopiert werden.

Während der Bereitstellung kann der Dialog Phasen wie Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors und Installation complete anzeigen.

Zum Austausch eines unbenutzten Codes wählen Sie **Replace enrollment code**, bestätigen **Replace code** und verwenden den Ersatz. **This server is enrolled** bestätigt nur das Enrollment, nicht fertige Installation oder aktiven Schutz. Nach einem späteren Fehler kann der ursprüngliche Code bereits verbraucht sein.

### 4.3 Wiederherstellung und erneutes Enrollment

Öffnen Sie für einen registrierten Server **Setup / recovery** und verwenden Sie **Re-enroll server** oder **Generate recovery code** für den richtigen Server. Halten Sie während der Wiederherstellung einen unabhängigen Administratorzugang bereit.

### 4.4 Schutz bestätigen

23. Wählen Sie Open Security für den Server.

24. Öffnen Sie Overview und wählen Sie Refresh.

25. Prüfen Sie Server protection, Provisioning, Sensor health und Guard access security.

26. Bestätigen Sie, dass aktueller Status und aktuelle Telemetrie dem erwarteten Schutz entsprechen.

> **Ausstehende Aktivierung**
> Wenn Policy den Status Saved · pending activation anzeigt, ist die Konfiguration gespeichert, darf aber noch nicht als aktiv betrachtet werden.

**Installation complete** und **SSH 2FA: Active** beweisen ebenso wenig wie eine gespeicherte Richtlinie oder ein ausgef?llter Konfigurationsdialog, dass der entsprechende Schutz auf dem Server tats?chlich aktiv ist. Pr?fen Sie auch aktuelle Telemetrie und die tats?chliche Durchsetzung.

## 5. Schutzstatus verstehen

| **Status** | **Bedeutung** | **Maßnahme** |
|---|---|---|
| ACTIVE | Kernschutz wird als verfügbar gemeldet. | Prüfen Sie optionalen Sensor- und Richtlinienstatus separat. |
| DEGRADED | Der Kernschutz kann verfügbar bleiben, aber mindestens ein Gesundheits- oder Abdeckungssignal erfordert Aufmerksamkeit. | Lesen Sie den Grund und prüfen Sie Sensors. |
| FAILED | Bereitstellung oder Kernschutz hat einen Fehler gemeldet. | Lesen Sie den Fehler und befolgen Sie die Fehlerbehebung. |
| PENDING | Installation, Bereitstellung oder Richtlinienaktivierung ist unvollständig. | Warten Sie auf den Abschluss; betrachten Sie die Änderung nicht als aktiv. |
| CONFIGURATION REQUIRED | Das Panel benötigt weitere Informationen, um den Kernzustand zu bestätigen. | Bestätigen Sie das Enrollment und befolgen Sie die angezeigte Anforderung. |
| REMOVED | Nativer Schutz wurde entfernt oder wird nicht mehr gemeldet. | Verwenden Sie, sofern verfügbar, den unterstützten Ablauf Setup / recovery. |

Sensorkarten können unabhängig Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale oder No telemetry melden.

## 6. MFA und geschützten Zugriff konfigurieren

### 6.1 Konto-MFA

Öffnen Sie bei der Registrierung **Set up 2FA**, scannen Sie den QR-Code oder geben Sie das Geheimnis in eine Authenticator-App ein, geben Sie den aktuellen sechsstelligen Code ein und wählen Sie **Verify and finish**. Verwenden Sie bei späteren Anmeldungen einen aktuellen Code. Bei Verlust des Authenticators nutzen Sie einen gesicherten Wiederherstellungscode oder das genehmigte Kontowiederherstellungsverfahren Ihrer Organisation. Halten Sie QR-Code, Geheimnis und Wiederherstellungscodes vertraulich.

### 6.2 MFA für Serverzugriff (SSH 2FA / Port Guard)

**SSH 2FA** schützt die konfigurierten TCP-Ports, nicht nur SSH-Port 22. Halten Sie beim Ändern der Zugriffsregeln eine unabhängige Administratorsitzung offen.

1. Öffnen Sie in der Servertabelle die Bearbeitung und setzen Sie die geschützten **TCP ports** in **Agent configuration**.
2. Wählen Sie in der Serverzeile **SSH 2FA** und scannen Sie den QR-Code oder geben Sie den **Manual entry key** in Ihre Authenticator-App ein.
3. Bewahren Sie die acht **Backup / Recovery Codes** sicher auf; jeder Code kann nur einmal verwendet werden.
4. Wählen Sie **Next — Verify Code**, geben Sie den aktuellen sechsstelligen Code ein, wählen Sie **Verify** und schließen Sie die Einrichtung ab.
5. Öffnen Sie **Agent configuration** erneut und prüfen Sie Ports und Zugriffseinstellung.

### 6.3 Mit Port Guard authentifizieren

Öffnen Sie die für Ihre Bereitstellung genehmigte **Port Guard**-Adresse aus demselben Netzwerk wie der Client des geschützten Dienstes. Geben Sie einen aktuellen Authenticator-Code oder einen unbenutzten Backup-Code ein, wählen Sie **Unlock Ports** und verbinden Sie sich erneut mit dem Dienst. Beachten Sie die angezeigte Dauer des Zugriffsfensters. Der Dienst benötigt weiterhin seine eigenen Zugangsdaten.

### 6.4 MFA für den Serverzugriff deaktivieren oder zurücksetzen

Um die MFA für den Serverzugriff zu deaktivieren, schalten Sie **Enable 2FA for access** aus und speichern Sie. Um den Geltungsbereich zu ändern, passen Sie die konfigurierten geschützten Ports an oder entfernen Sie sie und speichern Sie erneut. Halten Sie eine funktionierende Administratorsitzung und einen unabhängigen Wiederherstellungsweg offen. Prüfen Sie nach der Anwendung durch den Agenten den gemeldeten Status im Panel und den Zugriff auf den Zielserver. Wenn der laufende Server die gespeicherte Einstellung nicht übernimmt, wenden Sie sich an den zuständigen Administrator. Entfernen Sie keine Dateien oder Dienste manuell.

## 7. Server-Security-Konsole verwenden

Abschnitt 10 beschreibt die Seite Network access, die Server- und Portauswahl, den Globus, die Verbindungsliste und die Richtliniensteuerung.


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

## 8. Vorfälle und Reaktionen prüfen

**Verschiedene Aktionen:** **Shut down session** betrifft eine bestehende Verbindung; **Blacklist IP address** speichert eine dauerhafte Sperre neuer Verbindungen in ihrem Bereich. Automatische Antworten können zeitlich begrenzt und anders geregelt sein. Antrag oder Speichern bestätigt weder Trennung noch Anwendung.

### 8.1 Vorfälle

Wählen Sie einen Vorfall, um Incident details zu öffnen. Prüfen Sie Schweregrad, Zusammenfassung, verfügbare Quellinformationen, Timeline, Evidence und Technical details.

| **Aktion** | **Auswirkung** |
|---|---|
| Mark investigating | Ändert den Prüfstatus des Vorfalls und kennzeichnet eine aktive Untersuchung. |
| Resolve | Zeichnet auf, dass die Vorfallprüfung abgeschlossen ist. |
| Dismiss | Zeichnet auf, dass der Vorfall nicht weiterverfolgt wird. |

> **Vorfallstatus ist keine Behebung**
> Das Ändern des Prüfstatus entfernt nicht selbstständig Schadsoftware, stoppt keinen Angreifer und repariert keinen kompromittierten Server.

### 8.2 Reaktionen

| **Status** | **Bedeutung** |
|---|---|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED | Zur Auswertung aufgezeichnet oder genehmigt; Anwendung ist nicht bestätigt. |
| APPLIED | Die Reaktion wurde im angezeigten Umfang als angewendet aufgezeichnet. |
| EXPIRED | Eine temporäre Reaktion ist nicht mehr aktiv. |
| REVOKED | Die Reaktion wurde zurückgenommen. |
| FAILED | Die angeforderte Aktion wurde nicht erfolgreich abgeschlossen. |
| SUPPRESSED | Die Reaktion wurde gemäß anwendbarer Richtlinie nicht erzwungen. |

Prüfen Sie Quelle, Aktion und Umfang, Grund, Status, Startzeit und Ablauf gemeinsam. Das Blockieren neuer Verbindungen beendet nicht unbedingt eine bereits bestehende Verbindung.

## 9. Sicherheitsrichtlinie konfigurieren

### 9.1 Automatischer Reaktionsmodus

| **Modus** | **Verhalten** |
|---|---|
| Observe | Zeichnet geeignete Entscheidungen ohne automatische Durchsetzung auf. |
| Shadow | Bewertet geeignete Erkennungen, ohne temporäre Sperren durchzusetzen. |
| Enforce | Kann genehmigte temporäre IP-Sperren anwenden, wenn Richtlinien- und Erkennungsbedingungen aktiv sind. |

Der normale anfängliche Installationsmodus ist Shadow. Wählen Sie für Enforce die Option Enforce, prüfen Sie Enable automatic enforcement? und bestätigen Sie Enable Enforce. Enforce gilt nur für geeignete Erkennungen.

Wählen Sie unter **Policy → Automatic response mode** den Modus. Bei **Enforce** prüfen Sie **Enable automatic enforcement?** und wählen **Enable Enforce** oder **Cancel**. Verlassen Sie sich erst nach bestätigter Aktivierung auf automatische Sperren; nicht jede Erkennung führt zu einer Reaktion.

### 9.2 Vertrauenswürdige IPs

42. Öffnen Sie Policy → Trusted IPs.

43. Geben Sie Trusted IP or CIDR und optional eine Description ein.

44. Wählen Sie Add trusted source.

45. Löschen Sie Einträge mit Remove oder wandeln Sie sie mit Move to block in eine explizite Sperre um.

Trusted IPs nimmt eine Quelle von geeigneten Sperren automatischer Reaktionen aus. MFA, Ländereinschränkungen, Allowed IPs / CIDRs, Dienstanmeldedaten oder andere Zugriffskontrollen werden dadurch nicht umgangen.

### 9.3 Allowed IPs / CIDRs

46. Öffnen Sie das Stift-/Bearbeitungselement in der Serverzeile.

47. Geben Sie in Agent configuration einzelne IPv4-/IPv6-Adressen oder CIDR-Bereiche unter Allowed IPs / CIDRs kommagetrennt ein.

48. Wählen Sie Save und öffnen Sie den Dialog erneut, um die Speicherung des Werts zu prüfen.

Ist die gespeicherte Liste leer, lässt die Port-Guard-Adressprüfung alle Quellen mit der Authentifizierung fortfahren. Ist sie nicht leer, dürfen nur übereinstimmende Adressen oder Bereiche fortfahren.

Das genaue Feld hei?t **Allowed IPs / CIDRs (comma-separated)**. Diese Liste begrenzt die Quelladressen f?r Port Guard; sie gew?hrt keinen Dienstzugang und umgeht weder MFA noch L?nderfilter, Dienstanmeldedaten oder explizite Sperren. Sie ist von **Trusted IPs** getrennt. Ein gespeicherter Wert belegt keine Anwendung auf dem Server; halten Sie beim ?ndern einen unabh?ngigen Administratorzugang bereit.

### 9.4 Explizite Sperren

49. Öffnen Sie Policy → Explicit blocks.

50. Geben Sie Blocked IP or CIDR, den erforderlichen Reason und optional Explicit block expiry ein.

51. Wählen Sie Add explicit block.

52. Löschen Sie einen Eintrag mit Remove. Entfernen Sie einen fehlerhaften Eintrag und erstellen Sie ihn neu.

> **Administratorsperre vermeiden**
> Prüfen Sie vor einer Sperre Administrator-, Überwachungs-, NAT- und gemeinsam genutzte Adressen, die dieselbe Quell-IP oder dasselbe CIDR verwenden könnten.

### 9.5 Sensoren und Suricata

Policy → Sensor state kann Schalter für Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco und Suricata anbieten.

Öffnen Sie für Suricata Policy → Suricata monitored interface, wählen Sie einen angezeigten Kandidaten oder geben Sie eine verifizierte Schnittstelle wie ens3 ein und wählen Sie Save interface. Bestätigen Sie nach der Änderung neue Suricata-Telemetrie.

## 10. Netzwerkzugriff, Globus und aktive Sitzungen

Öffnen Sie **Network access** und wählen Sie den verwalteten Server sowie den geschützten TCP-Port. Verwenden Sie Globus und Verbindungsliste, um Quell-IP-Adressen, Länder, Ports und Sitzungsdetails für diese Auswahl zu prüfen.

Unter **Countries** wählen Sie den Blacklist- oder Whitelist-Modus und bearbeiten die Länderliste für den Port. Unter **IP addresses** verwalten Sie die serverweiten Listen **Always Block** und **Always Allow**. Always Allow ersetzt weder MFA noch die Anmeldung am geschützten Dienst.

Öffnen Sie für eine Verbindung das Menü und wählen Sie **Shut down session** oder **Blacklist IP address**. Prüfen Sie anschließend Ergebnis und Richtlinienstatus. Eine gespeicherte Änderung oder eine eingereihte Anfrage gilt erst mit gemeldetem Anwendungsergebnis als abgeschlossen.

## 11. Sensoren, Bestand, Sicherheitslage und Befunde prüfen

Öffnen Sie **Sensors** und prüfen Sie den Zustand jedes Sensors sowie das letzte Signal. Verwenden Sie **Inventory** und **Search packages**, um gemeldete Paketdaten zu prüfen. Unter **Posture** sehen Sie Konfigurationsbefunde und angezeigte Empfehlungen. Beachten Sie bei der Auswertung die Beobachtungszeit.

## 12. Ereignisse und Telemetrie überwachen

Öffnen Sie **Events**, um Servertelemetrie zu prüfen. Filtern Sie nach Sensor, genauem Ereignistyp oder Schweregrad und blättern Sie mit **Previous** und **Next**. Prüfen Sie Quelle, Nachweis, Schweregrad, Zeit und gegebenenfalls den verknüpften Vorfall. Aktualisieren Sie die Ansicht, bevor Sie sich auf ältere Ergebnisse stützen.

## 13. Fehlerbehebung

Wenn eine Aktion nicht abgeschlossen wird, prüfen Sie Server und Port, den angezeigten Status und Zeitpunkt sowie die Fehlermeldung. Korrigieren Sie Eingaben oder Verbindungsprobleme und wiederholen Sie die Aktion. Halten Sie beim Ändern von Zugriffsregeln eine unabhängige Administratorsitzung offen. Für die Wiederherstellung von Konto- oder Serverzugang nutzen Sie das genehmigte Verfahren Ihrer Organisation.
