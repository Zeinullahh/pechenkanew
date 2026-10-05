# WebSOC-Benutzerhandbuch

Die zentrale Verwaltungskonsole (CMC) von WebSOC dient zum Registrieren geschützter Dienste, Auswählen der anzuzeigenden Agent-Daten und Verwalten der Schutzeinstellungen. Der Agent bietet den aktiven Schutz; verwalten Sie ihn über die CMC.

## 1. Dashboard öffnen

Melden Sie sich mit Ihrem Konto bei der CMC an. Das Dashboard zeigt eine Weltkugel mit dem Datenverkehr nach Ländern und wird regelmäßig aktualisiert. Die Navigation umfasst **Dashboard**, **Compliance** sowie Links zu WebSOC- und Email-Security-Diensten und Produktanleitungen.

Über die Menütaste oben links erreichen Sie Anzeigeoptionen, Sprache, Zeitzone, Zahlungshistorie und Einstellungen für den AI-API-Schlüssel. Das Profilmenü enthält Teamzugriff, Abrechnungseinstellungen, Kontooptionen und Abmelden.

## 2. Geschützten Dienst registrieren

1. Öffnen Sie **Data source selection** oben links im Dashboard und wählen Sie **Register new agent**.
2. Wählen Sie **Website only** für eine Website im Reverse-Proxy-Modus oder **Other services** für andere Dienste wie SMTP, eine benutzerdefinierte App oder Kubernetes.
3. Geben Sie die Domain und den aktuellen Origin-/Service-Host oder die IP-Adresse ein. Für Websites kann die CMC einen Edge-Knoten vorschlagen.
4. Senden Sie bei einer Website das Formular zur Registrierung ab. Folgen Sie den angezeigten DNS-Angaben: Fügen Sie beim DNS-Anbieter den angeforderten ACME-Delegierungs-CNAME hinzu und richten Sie den DNS des Dienstes wie angegeben auf den WebSOC-Edge. ACME ist der automatisierte Zertifikatsprozess; DNS-Einträge belegen die Kontrolle über die Domain und leiten den Datenverkehr.
5. Wählen Sie nach dem Einrichten des CNAME **Verify DNS delegation**. Die Oberfläche meldet, ob die Delegierung bestätigt wurde, und weist darauf hin, dass weiterhin ein A-Eintrag erforderlich ist. Bei Bedarf können Sie **Redo verification** verwenden.
6. Bei **Other services** wird nach Eingabe der Dienstdetails **Get agent install command** angezeigt. Folgen Sie den für diesen Dienst erzeugten Anweisungen.

Die Agent-Liste zeigt Domain, Adresse und Status. **Active** bedeutet, dass der Schutz aktiv, Eigentum/Delegierung bestätigt und DNS zum WebSOC-Edge geroutet ist. **DNS pending** bedeutet, dass die Prüfung bestanden wurde, der Datenverkehr aber noch nicht geroutet ist. Auch **Delegation not verified** und **Paused** werden angezeigt.

## 3. Agents auswählen und Datenverkehr anzeigen

1. Öffnen Sie **Data source selection**.
2. Markieren Sie eine oder mehrere Agent-Zeilen, um Dienste in die Dashboard-Metriken aufzunehmen. Die Schaltfläche zeigt die Zahl der ausgewählten Agents.
3. Wählen Sie rechts im Metrikselektor **RPS** (Anfragen pro Sekunde), **Bandwidth** oder **Active Users**. Bewegen Sie den Mauszeiger über ein Land auf der Weltkugel, um die Aufschlüsselung nach Domain zu sehen.
4. Öffnen Sie über den Pfeil unten in der Mitte das Diagramm, um **Server Load Chart** und Zusammenfassungen der Länder mit den höchsten Werten anzuzeigen. Wählen Sie einen Zeitraum; markieren Sie einen Diagrammausschnitt, um die Zusammenfassungen darauf zu begrenzen.

## 4. Agent konfigurieren, pausieren, fortsetzen oder entfernen

Öffnen Sie **Data source selection** und verwenden Sie die Steuerelemente in einer Agent-Zeile:

- Das Stiftsymbol öffnet **Agent Configuration**. Bearbeiten Sie die Adresse, wählen Sie zulässige Ports (22, 80 und/oder 443), schalten Sie die Zwei-Faktor-Authentifizierung ein oder aus und wählen Sie **Save**.
- Das Dokumentsymbol öffnet **Domain setup details**. Prüfen Sie DNS-Delegierung, Routing, Diensttyp und TLS-Zertifikatsstatus. TLS ist die von Websites verwendete verschlüsselte Verbindung.
- Mit dem Aktualisierungssymbol prüfen Sie Eigentum und DNS-Delegierung.
- Benutzer mit entsprechender Rolle können den Schutz über das Pausensymbol pausieren oder über das Wiedergabesymbol fortsetzen. Die Dashboard-Pause dauert 60 Minuten.
- Wählen Sie das Papierkorbsymbol und bestätigen Sie, um den Agent aus Ihrem Konto zu löschen.

## 5. Vorfälle und Sicherheitswarnungen prüfen

Wählen Sie **Incidents** links im Dashboard, um Ereignisprotokolle anzusehen. Filtern Sie nach Quelle, Schweregrad, Ereignistyp, IP-Adresse oder Zeitraum. Die Liste ist paginiert; laden Sie passende Protokolle über die verfügbaren Exportfunktionen herunter.

Wenn eine handlungsrelevante Sicherheitswarnung erscheint, prüfen Sie Angriffsübersicht, IP-Indikator und vorgeschlagene Dauer. Sie können eine der angebotenen Dauern oder eine eigene Endzeit zum Sperren wählen, die Quelle nach Bestätigung zulassen oder die Warnung eskalieren. Die Auswahl gilt für die angezeigte Warnung.

## 6. IP-Zugriffsregeln verwalten

Öffnen Sie links im Dashboard die Schild-/IP-Zugriffskontrolle. Wählen Sie über **Add rule** die Regeldetails aus und speichern Sie sie. Über die Steuerelemente dieses Bereichs können vorhandene Regeln geprüft und entfernt oder widerrufen werden. Eine Blockliste enthält Quellen, die das System sperren soll; fügen Sie Ländercodes über **Add** hinzu oder entfernen Sie sie über **Remove**.

## 7. Team und Compliance

### Team & Access

1. Öffnen Sie das Profilmenü und wählen Sie **Team & Access**.
2. Geben Sie über **Invite** E-Mail-Adresse und Benutzernamen eines Teammitglieds ein, wählen Sie eine Rolle und speichern Sie.
3. Prüfen Sie Teammitglieder, ändern Sie Rollen über den Rollenselektor oder entfernen Sie Mitglieder über die Zeilenaktionen. Die Seite zeigt auch das Team-Auditprotokoll.

Verfügbare Rollen sind **Admin**, **Analyst** und **Viewer**. Admins und Analysts können Agents pausieren und fortsetzen.

### Compliance

Wählen Sie **Compliance** in der Hauptnavigation, um nach Framework gruppierte Kontrollübersichten und Statuswerte aufzurufen. **Refresh** lädt die Informationen neu. Eine Kontrolle kann Status, Datum der letzten Prüfung, nächste Überprüfung und Anzahl der Nachweise anzeigen.

## 8. Allgemeine Anzeige- und Kontooptionen

Die Menütaste bietet Einstellungen für Globusdarstellung, Sprache und Zeitzone. Das Profilmenü enthält Zahlungshistorie und Abrechnungseinstellungen. Melden Sie sich nach Abschluss über **Sign out** im Profilmenü ab.

---

## Zu bestätigende Informationen

Die CMC zeigt für **Other services** einen generierten Agent-Installationsbefehl an, enthält in der benutzerseitigen Oberfläche jedoch nicht das vollständige Installationsverfahren für jeden Diensttyp. Befolgen Sie den Befehl und die dienstspezifischen Anweisungen Ihrer CMC-Bereitstellung; klären Sie weitere Hostvoraussetzungen mit Ihrem WebSOC-Administrator.
