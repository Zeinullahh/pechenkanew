# Guide utilisateur de Silence AI Server Security

Ce guide explique l’enregistrement d’un service, l’installation et l’enrôlement de Server Security natif, la configuration des accès protégés et l’analyse des activités de sécurité dans le panneau d’administration Silence AI.

Enregistrement, installation, enr?lement, configuration de la politique et application effective sont des ?tapes distinctes. V?rifiez l??tat affich? avant de poursuivre.

## Table des matières

1. Avant de commencer
2. Connexion et ouverture de Server Security
3. Enregistrement d’un service
4. Installation, enrôlement et activation
5. États de protection
6. MFA et accès protégés
7. Console Server Security
8. Incidents et réponses
9. Politique de sécurité
10. Accès réseau, globe et sessions actives
11. Capteurs, inventaire, posture et résultats
12. Événements et télémétrie
13. Dépannage

## 1. Avant de commencer

Préparez les informations et les accès suivants avant de commencer :

- Un compte Silence AI donnant accès à Server Security.
- Le domaine du service ou le nom du serveur à enregistrer.

- Une connectivité réseau entre le serveur cible et Silence AI.
- Des privilèges administrateur sur le serveur Linux cible pour l’installation native.

- Pour un enregistrement Hosted : l’adresse IP de destination et l’autorisation de modifier le site web et le DNS.
- Pour un enregistrement Self-Hosted : l’URL en amont et la procédure de déploiement approuvée par votre organisation.

| **Cible native prise en charge**          | **Paquet** |
|-------------------------------------------|------------|
| Ubuntu Server 22.04 ou 24.04 LTS, amd64   | DEB        |
| Fedora Server 44, x86_64                  | RPM        |

> **Facturation Hosted**
> La protection du trafic Hosted est facturée à l’usage. Vérifiez que le compte présente un solde suffisant avant de compter sur cette protection.

## 2. Se connecter et ouvrir Server Security

1.  Ouvrez le panneau d’administration Silence AI et sélectionnez Log in.

2.  Effectuez l’authentification MFA du compte avec le code actuel à six chiffres de l’application d’authentification.

3.  Ouvrez Server Security, puis sélectionnez Servers.

Chaque ligne de serveur peut proposer Install, Setup / recovery et Open Security. L’action disponible dépend de l’état actuel de l’enrôlement du serveur.

## 3. Enregistrer un service

### 3.1 Choisir Hosted ou Self-Hosted

| **Type de déploiement** | **À utiliser lorsque**                                      | **Champs obligatoires** |
|-------------------------|-------------------------------------------------------------|-------------------------|
| Hosted                  | Le trafic sera protégé par le service Hosted.               | Domain + IP Address     |
| Self-Hosted             | Le service s’exécute dans votre environnement.              | Domain + Upstream URL   |

> **L’enregistrement n’est pas l’installation**
> La création d’un enregistrement de service Hosted ou Self-Hosted n’installe pas le paquet natif Server Security et n’enrôle pas de serveur Linux.

S?lectionnez **Register new agent** avant de choisir **Hosted** ou **Self-Hosted**.

### 3.2 Créer l’enregistrement du service

4.  Sélectionnez Register new agent.

5.  Choisissez Hosted ou Self-Hosted et passez à l’étape des données de l’agent.

6.  Dans Domain, saisissez uniquement le nom d’hôte, sans chemin d’URL.

7.  Pour Hosted, saisissez IP Address. Pour Self-Hosted, saisissez Upstream URL.

8.  Sélectionnez Register.

### 3.3 Hosted : vérifier la propriété et acheminer le trafic

Le processus d’enregistrement affiche deux éléments distincts : une balise meta du site web pour vérifier la propriété et un enregistrement A pour acheminer le trafic Hosted.

9.  Ajoutez la balise meta fournie dans l’élément HTML \<head\> du site web.

10. Publiez la modification et vérifiez que le site web est accessible publiquement depuis le domaine enregistré.

11. Dans la boîte de dialogue d’enregistrement, sélectionnez Verify Domain Ownership et vérifiez que Verification successful! s’affiche.

12. Ajoutez au DNS l’enregistrement A affiché pour acheminer le trafic Hosted.

13. Après la propagation DNS, vérifiez que le site web reste accessible depuis le domaine prévu.

> **En cas d’échec de la vérification**
> Vérifiez l’orthographe du domaine, son accessibilité publique, l’emplacement de la balise meta et la gestion de l’hôte par le proxy/CDN, puis utilisez Redo verification.

L’**A record** affiché sert au routage Hosted et non à prouver la propriété. La balise meta du site assure la vérification ; confirmez-la avant le basculement DNS si l’ancien site doit rester joignable.

### 3.4 Déploiement Self-Hosted

Créez l'enregistrement du service Self-Hosted, puis suivez la procédure de déploiement approuvée pour votre environnement. L'installation native de Server Security est une action distincte dans la liste des serveurs.

## 4. Installer et enrôler la version native de Server Security

**Registered** signifie qu’un service est enregistré ; **Installed** qu’un paquet natif est installé ; **Enrolled** qu’un code à usage unique a été accepté. Aucun de ces états ne garantit une protection saine et active.

### 4.1 Installer le paquet natif

14. Sélectionnez Install pour le serveur cible.

15. Sous 1. Choose a native package, sélectionnez le système d’exploitation et l’architecture correspondant au serveur.

16. Sous 2. Download and install, sélectionnez Download .deb ou Download .rpm.

17. Utilisez Copy à côté de Install command et exécutez la commande affichée sur le serveur cible avec des privilèges administrateur.

Utilisez le nom de fichier, la commande d’installation et la valeur SHA-256 affichés dans votre panneau. Les commandes habituelles se présentent comme suit :



> **Intégrité des paquets**
> Pour les paquets RPM, laissez la vérification des signatures activée et suivez la procédure approuvée relative aux clés de signature. Ne récupérez pas de clés de signature auprès de sources non approuvées et ne contournez pas la vérification des paquets.

Dans **Install Server Security**, choisissez le paquet natif adapté. Les commandes ressemblent à `sudo apt install ./<displayed-filename>.deb` sous Ubuntu et `sudo dnf --setopt=localpkg_gpgcheck=1 install ./<displayed-filename>.rpm` sous Fedora ; le nom, la commande et SHA-256 affichés dans votre console font foi. Un téléchargement dans le navigateur n’installe rien à distance : transférez le fichier par une méthode approuvée. Un serveur déjà enrôlé ne doit utiliser **Setup / recovery** que sur indication du panneau.

### 4.2 Enrôler le serveur

18. Dans la boîte de dialogue d’installation, ouvrez 3. Enroll interactively.

19. Sur le serveur concerné, exécutez sudo silence-server enroll.

20. Sélectionnez Generate enrollment code.

21. Saisissez le code affiché uniquement à l’invite d’enrôlement du serveur concerné.

22. Laissez la boîte de dialogue d’installation ouverte pendant l’exécution des étapes de provisionnement.

> **Sécurité du code d’enrôlement**
> Les codes d’enrôlement sont à usage unique, expirent après 15 minutes au maximum et ne doivent jamais être copiés dans des tickets, de la documentation, une messagerie instantanée ou l’historique du shell.

Pendant le provisionnement, la boîte de dialogue peut afficher des étapes telles que Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors et Installation complete.

Pour remplacer un code encore inutilisé, choisissez **Replace enrollment code**, confirmez **Replace code** et utilisez le nouveau code. **This server is enrolled** confirme uniquement l’enrôlement, pas la fin de l’installation ni l’activation de la protection. Si une phase ultérieure échoue, le code initial peut déjà avoir été consommé.

### 4.3 Récupération et nouvel enrôlement

Pour un serveur enregistré, ouvrez **Setup / recovery** et utilisez **Re-enroll server** ou **Generate recovery code** pour le bon serveur. Gardez un accès administrateur indépendant pendant la récupération.

### 4.4 Confirmer la protection

23. Sélectionnez Open Security pour le serveur.

24. Ouvrez Overview et sélectionnez Refresh.

25. Examinez Server protection, Provisioning, Sensor health et Guard access security.

26. Vérifiez que l’état actuel et la télémétrie récente correspondent à la protection attendue.

> **Activation en attente**
> Si Policy affiche Saved · pending activation, la configuration est enregistrée, mais ne doit pas encore être considérée comme active.

**Installation complete** et **SSH 2FA: Active**, tout comme une politique enregistr?e ou une bo?te de configuration remplie, ne prouvent pas ? eux seuls que la protection correspondante fonctionne sur le serveur. V?rifiez aussi la t?l?m?trie r?cente et l?application r?elle.

## 5. Comprendre l’état de la protection

| **État**               | **Signification**                                                                                              | **Action à effectuer**                                                    |
|------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| ACTIVE                 | La protection principale est signalée comme disponible.                                                       | Examinez séparément l’état des capteurs facultatifs et des politiques.    |
| DEGRADED               | La protection principale peut rester disponible, mais un ou plusieurs signaux de santé ou de couverture nécessitent une intervention. | Lisez la raison et examinez Sensors.                       |
| FAILED                 | Le provisionnement ou la protection principale a signalé un échec.                                            | Lisez l’erreur et suivez les instructions de dépannage.                   |
| PENDING                | L’installation, le provisionnement ou l’activation de la politique est incomplet.                              | Attendez la fin ; ne considérez pas la modification comme active.         |
| CONFIGURATION REQUIRED | Le panneau a besoin d’informations supplémentaires pour confirmer la santé de la protection principale.        | Confirmez l’enrôlement et suivez l’exigence affichée.                      |
| REMOVED                | La protection native a été supprimée ou n’est plus signalée.                                                   | Utilisez le processus Setup / recovery pris en charge lorsqu’il existe.   |

Les fiches des capteurs peuvent signaler séparément Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale ou No telemetry.

## 6. Configurer la MFA et les accès protégés

### 6.1 MFA du compte

Lors de l'inscription, ouvrez **Set up 2FA**, scannez le code QR ou saisissez le secret dans une application d'authentification, entrez le code actuel à six chiffres et sélectionnez **Verify and finish**. Utilisez un code actuel lors des connexions suivantes. Si vous perdez l'accès à l'application, utilisez un code de récupération conservé ou la procédure de récupération de compte approuvée par votre organisation. Gardez secrets le code QR, le secret et les codes de récupération.

### 6.2 MFA d’accès au serveur (SSH 2FA / Port Guard)

**SSH 2FA** protège les ports TCP configurés, pas seulement le port SSH 22. Gardez une session administrateur indépendante pendant toute modification des règles d'accès.

1. Dans la liste des serveurs, ouvrez la modification et définissez les **TCP ports** protégés dans **Agent configuration**.
2. Dans la ligne du serveur, sélectionnez **SSH 2FA**, puis scannez le code QR ou saisissez la **Manual entry key** dans votre application d'authentification.
3. Conservez en lieu sûr les huit **Backup / Recovery Codes**; chaque code ne sert qu'une fois.
4. Sélectionnez **Next — Verify Code**, entrez le code actuel à six chiffres, sélectionnez **Verify** et terminez la configuration.
5. Rouvrez **Agent configuration** pour vérifier les ports et le paramètre d'accès.

### 6.3 S’authentifier avec Port Guard

Ouvrez l'adresse **Port Guard** approuvée pour votre déploiement depuis le même réseau que le client du service protégé. Saisissez un code d'authentification actuel ou un code de secours inutilisé, sélectionnez **Unlock Ports**, puis reconnectez-vous au service. Respectez la durée d'accès affichée. Le service protégé exige toujours ses propres identifiants.

### 6.4 Désactiver ou réinitialiser la MFA d’accès au serveur

Pour désactiver la MFA d’accès au serveur, désactivez **Enable 2FA for access**, puis enregistrez. Pour modifier son périmètre, changez ou retirez les ports protégés configurés, puis enregistrez. Gardez une session administrateur active et un moyen de récupération indépendant. Après l’application de la modification par l’agent, vérifiez l’état affiché dans le panneau et l’accès au serveur concerné. Si le serveur en cours d’exécution n’utilise pas le réglage enregistré, contactez l’administrateur responsable. Ne supprimez pas manuellement de fichiers ni de services.

## 7. Utiliser la console Server Security

La section 10 décrit la page Network access, le choix du serveur et du port, le globe, la liste des connexions et les commandes de politique.


| **Onglet** | **Fonction**                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------|
| Overview   | État de la protection, provisionnement, santé des capteurs, incidents, réponses et activité récente.           |
| Incidents  | Activité de sécurité corrélée à examiner.                                                                        |
| Responses  | Enregistrements et résultats des réponses automatiques.                                                         |
| Sensors    | Santé des capteurs et vues des détections.                                                                        |
| Posture    | Résultats de Security Configuration Assessment et état des renseignements sur les vulnérabilités.              |
| Inventory  | Inventaire signalé des paquets et du serveur.                                                                    |
| Events     | Télémétrie serveur filtrable et paginée.                                                                         |
| Policy     | Mode de réponse automatique, politique IP, interrupteurs des capteurs et interface Suricata.                   |

Utilisez Refresh pour la console principale. Dans Events, changez de page ou de filtre lorsque vous devez actualiser l’explorateur d’événements lui-même.

## 8. Examiner les incidents et les réponses

**Actions distinctes :** **Shut down session** vise une connexion existante ; **Blacklist IP address** enregistre un blocage durable des nouvelles connexions dans sa portée ; une réponse automatique peut être temporaire et relever d'autres règles. Une demande ou une politique enregistrée ne confirme ni l'arrêt ni l'application.

### 8.1 Incidents

Sélectionnez un incident pour ouvrir Incident details. Examinez la gravité, le résumé, les informations sur la source lorsqu’elles sont disponibles, Timeline, Evidence et Technical details.

| **Action**         | **Effet**                                                              |
|--------------------|------------------------------------------------------------------------|
| Mark investigating | Modifie l’état d’examen de l’incident pour indiquer une enquête active. |
| Resolve            | Indique que l’examen de l’incident est terminé.                         |
| Dismiss            | Indique que l’incident ne fera pas l’objet d’un suivi.                  |

> **L’état d’un incident n’est pas une remédiation**
> La modification de l’état d’examen d’un incident ne supprime pas à elle seule un logiciel malveillant, n’interrompt pas un attaquant et ne répare pas un serveur compromis.

### 8.2 Réponses

| **État**                                            | **Signification**                                                           |
|-----------------------------------------------------|-----------------------------------------------------------------------------|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED   | Enregistrée ou approuvée pour évaluation ; son application n’est pas confirmée. |
| APPLIED                                             | La réponse a été enregistrée comme appliquée dans la portée affichée.       |
| EXPIRED                                             | Une réponse temporaire n’est plus active.                                   |
| REVOKED                                             | La réponse a été retirée.                                                    |
| FAILED                                              | L’action demandée n’a pas abouti.                                            |
| SUPPRESSED                                          | La réponse n’a pas été appliquée en vertu de la politique concernée.         |

Examinez conjointement la source, l’action et sa portée, la raison, l’état, l’heure de début et l’expiration. Le blocage des nouvelles connexions ne met pas nécessairement fin à une connexion déjà établie.

## 9. Configurer la politique de sécurité

### 9.1 Mode de réponse automatique

| **Mode** | **Comportement**                                                                                   |
|----------|----------------------------------------------------------------------------------------------------|
| Observe  | Enregistre les décisions admissibles sans application automatique.                                 |
| Shadow   | Évalue les détections admissibles sans appliquer de blocages temporaires.                           |
| Enforce  | Peut appliquer des blocages IP temporaires approuvés lorsque la politique et les conditions de détection sont actives. |

Le mode initial normal après l’installation est Shadow. Pour utiliser Enforce, sélectionnez Enforce, examinez Enable automatic enforcement?, puis confirmez avec Enable Enforce. Enforce ne s’applique qu’aux détections admissibles.

Dans **Policy → Automatic response mode**, choisissez le mode. Pour **Enforce**, examinez **Enable automatic enforcement?** puis choisissez **Enable Enforce** ou **Cancel**. Confirmez l’activation avant de compter sur un blocage automatique ; toutes les détections ne déclenchent pas une réponse.

### 9.2 Adresses IP de confiance

42. Ouvrez Policy → Trusted IPs.

43. Saisissez Trusted IP or CIDR et, éventuellement, une Description.

44. Sélectionnez Add trusted source.

45. Utilisez Remove pour supprimer une entrée ou Move to block pour la convertir en blocage explicite.

Trusted IPs exempte une source des blocages de réponse automatique admissibles. Cette liste ne contourne ni la MFA, ni les restrictions par pays, ni Allowed IPs / CIDRs, ni les identifiants du service, ni les autres contrôles d’accès.

### 9.3 Adresses IP/CIDR autorisées

46. Ouvrez la commande représentant un crayon/modifier sur la ligne du serveur.

47. Dans Agent configuration, saisissez des adresses IPv4/IPv6 individuelles ou des plages CIDR dans Allowed IPs / CIDRs (séparées par des virgules).

48. Sélectionnez Save et rouvrez la boîte de dialogue pour vérifier que la valeur a été conservée par le panneau.

Lorsque la liste enregistrée est vide, la vérification de l’adresse Port Guard permet à toutes les sources de passer à l’authentification. Lorsqu’elle n’est pas vide, seules les adresses ou plages correspondantes peuvent continuer.

Le champ exact est **Allowed IPs / CIDRs (comma-separated)**. Cette liste limite les sources admises ? la page Port Guard ; elle ne donne pas acc?s au service et ne contourne ni MFA, ni filtrage g?ographique, ni identifiants du service, ni blocages explicites. Elle est distincte de **Trusted IPs**. Une valeur enregistr?e ne prouve pas son application par le serveur ; conservez une source administrateur ind?pendante pendant la modification.

### 9.4 Blocages explicites

49. Ouvrez Policy → Explicit blocks.

50. Saisissez Blocked IP or CIDR, la Reason obligatoire et, éventuellement, une Explicit block expiry.

51. Sélectionnez Add explicit block.

52. Utilisez Remove pour supprimer une entrée. Pour corriger une entrée, supprimez-la et créez-en une nouvelle.

> **Éviter de bloquer les administrateurs**
> Avant d’ajouter un blocage, vérifiez les adresses d’administration, de surveillance, de NAT et les adresses partagées susceptibles d’utiliser la même IP source ou le même CIDR.

### 9.5 Capteurs et Suricata

Policy → Sensor state peut proposer des interrupteurs pour Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco et Suricata.

Pour Suricata, ouvrez Policy → Suricata monitored interface, choisissez une interface candidate affichée ou saisissez une interface vérifiée telle que ens3, puis sélectionnez Save interface. Vérifiez la présence d’une télémétrie Suricata récente après la modification.

## 10. Contrôles d’accès réseau, globe et sessions actives

Ouvrez **Network access** et sélectionnez le serveur géré ainsi que le port TCP protégé. Utilisez le globe et la liste des connexions pour consulter les IP sources, pays, ports et détails des sessions correspondant à cette sélection.

Dans **Countries**, choisissez le mode liste noire ou liste blanche et modifiez les pays du port sélectionné. Dans **IP addresses**, gérez les listes du serveur **Always Block** et **Always Allow**. Always Allow ne remplace ni la MFA ni l'authentification du service protégé.

Ouvrez le menu d'une connexion et choisissez **Shut down session** ou **Blacklist IP address**. Vérifiez ensuite le résultat affiché et l'état de la politique. Une modification enregistrée ou une demande en attente n'est achevée qu'après le résultat d'application affiché.

## 11. Examiner les capteurs, l’inventaire, la posture et les résultats

Ouvrez **Sensors** pour vérifier l'état de chaque capteur et son dernier signal. Utilisez **Inventory** et **Search packages** pour examiner les paquets signalés. Dans **Posture**, consultez les constats de configuration et les recommandations affichées. Tenez compte de l'heure d'observation lors de l'analyse.

## 12. Surveiller les événements et la télémétrie

Ouvrez **Events** pour consulter la télémétrie du serveur. Filtrez par capteur, type exact d'événement ou gravité, puis naviguez avec **Previous** et **Next**. Vérifiez la source, les preuves, la gravité, l'heure et l'incident associé s'il apparaît. Actualisez la vue avant de tirer des conclusions d'anciens résultats.

## 13. Dépannage

Si une action ne s'achève pas, vérifiez le serveur et le port sélectionnés, l'état et l'heure affichés ainsi que le message d'erreur. Corrigez la saisie ou le problème de connexion, puis réessayez. Gardez une session administrateur indépendante pendant les changements d'accès. Pour récupérer l'accès au compte ou au serveur, utilisez la procédure approuvée par votre organisation.
