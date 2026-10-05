# Silence AI

## Guide utilisateur de Server Security

Instructions destinées aux utilisateurs finaux pour l’inscription, l’installation, les accès protégés, la surveillance de la sécurité et la gestion des politiques.

> **DOCUMENTATION CLIENT**
> Utilisez ce guide pour enregistrer des services, installer la version native de Server Security, configurer les contrôles d’accès, examiner les incidents et surveiller la protection des serveurs.

Version 1.0 • octobre 2026

# Comment utiliser ce guide

Ce guide s’adresse aux administrateurs et opérateurs autorisés qui utilisent Silence AI Server Security. Il porte sur les actions disponibles dans l’interface client et sur les vérifications à effectuer avant de se fier à une modification de la protection ou du contrôle d’accès.

> **Principe de fonctionnement important**
> L’enregistrement, l’installation du paquet, l’enrôlement, la configuration des politiques et la protection active constituent des étapes distinctes. Lorsqu’un paramètre est indiqué comme étant en attente, attendez que le panneau confirme son activation avant de vous y fier.

# 1. Avant de commencer

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

# 2. Se connecter et ouvrir Server Security

1.  Ouvrez le panneau d’administration Silence AI et sélectionnez Log in.

2.  Effectuez l’authentification MFA du compte avec le code actuel à six chiffres de l’application d’authentification.

3.  Ouvrez Server Security, puis sélectionnez Servers.

Chaque ligne de serveur peut proposer Install, Setup / recovery et Open Security. L’action disponible dépend de l’état actuel de l’enrôlement du serveur.

# 3. Enregistrer un service

## 3.1 Choisir Hosted ou Self-Hosted

| **Type de déploiement** | **À utiliser lorsque**                                      | **Champs obligatoires** |
|-------------------------|-------------------------------------------------------------|-------------------------|
| Hosted                  | Le trafic sera protégé par le service Hosted.               | Domain + IP Address     |
| Self-Hosted             | Le service s’exécute dans votre environnement.              | Domain + Upstream URL   |

> **L’enregistrement n’est pas l’installation**
> La création d’un enregistrement de service Hosted ou Self-Hosted n’installe pas le paquet natif Server Security et n’enrôle pas de serveur Linux.

## 3.2 Créer l’enregistrement du service

4.  Sélectionnez Register new agent.

5.  Choisissez Hosted ou Self-Hosted et passez à l’étape des données de l’agent.

6.  Dans Domain, saisissez uniquement le nom d’hôte, sans chemin d’URL.

7.  Pour Hosted, saisissez IP Address. Pour Self-Hosted, saisissez Upstream URL.

8.  Sélectionnez Register.

## 3.3 Hosted : vérifier la propriété et acheminer le trafic

Le processus d’enregistrement affiche deux éléments distincts : une balise meta du site web pour vérifier la propriété et un enregistrement A pour acheminer le trafic Hosted.

9.  Ajoutez la balise meta fournie dans l’élément HTML \<head\> du site web.

10. Publiez la modification et vérifiez que le site web est accessible publiquement depuis le domaine enregistré.

11. Dans la boîte de dialogue d’enregistrement, sélectionnez Verify Domain Ownership et vérifiez que Verification successful! s’affiche.

12. Ajoutez au DNS l’enregistrement A affiché pour acheminer le trafic Hosted.

13. Après la propagation DNS, vérifiez que le site web reste accessible depuis le domaine prévu.

> **En cas d’échec de la vérification**
> Vérifiez l’orthographe du domaine, son accessibilité publique, l’emplacement de la balise meta et la gestion de l’hôte par le proxy/CDN, puis utilisez Redo verification.

## 3.4 Déploiement Self-Hosted

Après avoir créé l’enregistrement du service Self-Hosted, suivez la procédure de déploiement approuvée fournie pour votre environnement. L’installation native de Server Security reste une action Install distincte dans le tableau des serveurs.

# 4. Installer et enrôler la version native de Server Security

## 4.1 Installer le paquet natif

14. Sélectionnez Install pour le serveur cible.

15. Sous 1. Choose a native package, sélectionnez le système d’exploitation et l’architecture correspondant au serveur.

16. Sous 2. Download and install, sélectionnez Download .deb ou Download .rpm.

17. Utilisez Copy à côté de Install command et exécutez la commande affichée sur le serveur cible avec des privilèges administrateur.

Utilisez le nom de fichier, la commande d’installation et la valeur SHA-256 affichés dans votre panneau. Les commandes habituelles se présentent comme suit :



> **Intégrité des paquets**
> Pour les paquets RPM, laissez la vérification des signatures activée et suivez la procédure approuvée relative aux clés de signature. Ne récupérez pas de clés de signature auprès de sources non approuvées et ne contournez pas la vérification des paquets.

## 4.2 Enrôler le serveur

18. Dans la boîte de dialogue d’installation, ouvrez 3. Enroll interactively.

19. Sur le serveur concerné, exécutez sudo silence-server enroll.

20. Sélectionnez Generate enrollment code.

21. Saisissez le code affiché uniquement à l’invite d’enrôlement du serveur concerné.

22. Laissez la boîte de dialogue d’installation ouverte pendant l’exécution des étapes de provisionnement.

> **Sécurité du code d’enrôlement**
> Les codes d’enrôlement sont à usage unique, expirent après 15 minutes au maximum et ne doivent jamais être copiés dans des tickets, de la documentation, une messagerie instantanée ou l’historique du shell.

Pendant le provisionnement, la boîte de dialogue peut afficher des étapes telles que Enrollment in progress, Verified release ready, Installing security stack, Installing core protection, Core check completed, Installing sensors et Installation complete.

## 4.3 Récupération et nouvel enrôlement

Pour un serveur déjà indiqué comme enrôlé, Setup / recovery peut proposer Re-enroll server et Generate recovery code. N’utilisez la récupération que pour le serveur concerné et conservez une méthode d’accès administrateur indépendante pendant toute opération de récupération liée aux accès.

## 4.4 Confirmer la protection

23. Sélectionnez Open Security pour le serveur.

24. Ouvrez Overview et sélectionnez Refresh.

25. Examinez Server protection, Provisioning, Sensor health et Guard access security.

26. Vérifiez que l’état actuel et la télémétrie récente correspondent à la protection attendue.

> **Activation en attente**
> Si Policy affiche Saved · pending activation, la configuration est enregistrée, mais ne doit pas encore être considérée comme active.

# 5. Comprendre l’état de la protection

| **État**               | **Signification**                                                                                              | **Action à effectuer**                                                    |
|------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| ACTIVE                 | La protection principale est signalée comme disponible.                                                       | Examinez séparément l’état des capteurs facultatifs et des politiques.    |
| DEGRADED               | La protection principale peut rester disponible, mais un ou plusieurs signaux de santé ou de couverture nécessitent une intervention. | Lisez la raison et examinez Sensors.                       |
| FAILED                 | Le provisionnement ou la protection principale a signalé un échec.                                            | Lisez l’erreur et suivez les instructions de dépannage.                   |
| PENDING                | L’installation, le provisionnement ou l’activation de la politique est incomplet.                              | Attendez la fin ; ne considérez pas la modification comme active.         |
| CONFIGURATION REQUIRED | Le panneau a besoin d’informations supplémentaires pour confirmer la santé de la protection principale.        | Confirmez l’enrôlement et suivez l’exigence affichée.                      |
| REMOVED                | La protection native a été supprimée ou n’est plus signalée.                                                   | Utilisez le processus Setup / recovery pris en charge lorsqu’il existe.   |

Les fiches des capteurs peuvent signaler séparément Healthy, Degraded, Failed, Disabled, Unsupported, Needs configuration, Telemetry stale ou No telemetry.

# 6. Configurer la MFA et les accès protégés

## 6.1 MFA du compte

27. Lors de l’inscription du compte, ouvrez Set up 2FA.

28. Scannez le code QR ou saisissez la clé secrète dans une application d’authentification TOTP.

29. Saisissez le code actuel à six chiffres et sélectionnez Verify and finish.

30. Lors des connexions ultérieures, utilisez le code actuel de l’application d’authentification.

> **Protéger les secrets MFA**
> Ne transmettez jamais un secret d’authentification, un code QR ou un code de récupération à une autre personne. Si vous perdez l’accès à l’application d’authentification, utilisez le canal de récupération de compte approuvé par votre organisation.

## 6.2 MFA d’accès au serveur (SSH 2FA / Port Guard)

Le contrôle SSH 2FA protège collectivement les ports TCP configurés ; il n’est pas limité au port SSH 22 et ne couvre pas UDP.

> **Avant de modifier les contrôles d’accès**
> Conservez une session administrateur indépendante ou une méthode de récupération testée jusqu’à ce que l’accès depuis le réseau source prévu ait été confirmé.

31. Dans le tableau des serveurs, ouvrez la commande représentant un crayon/modifier.

32. Dans Agent configuration, ajoutez ou supprimez les ports TCP protégés, puis sélectionnez Save. Les ports doivent être des nombres entiers compris entre 1 et 65535.

33. Sur la ligne du serveur, activez SSH 2FA pour ouvrir la configuration de 2FA SSH Guard.

34. Scannez le code QR ou saisissez la Manual entry key dans votre application d’authentification.

35. Enregistrez les huit Backup / Recovery Codes avant de continuer. Chaque code est à usage unique.

36. Sélectionnez Next — Verify Code, saisissez le code actuel à six chiffres, puis sélectionnez Verify.

37. Vérifiez que 2FA verified successfully! s’affiche, sélectionnez Done, puis rouvrez Agent configuration et vérifiez les ports et le paramètre d’accès prévus.

## 6.3 S’authentifier avec Port Guard

38. Ouvrez l’adresse Port Guard fournie pour votre déploiement depuis la même source réseau que celle qui se connectera au service protégé.

39. Saisissez le code actuel à six chiffres de l’application d’authentification ou un code de secours inutilisé.

40. Sélectionnez Unlock Ports.

41. Dès que la page indique que les ports sont ouverts, reconnectez-vous rapidement au service protégé.

Les ports TCP protégés configurés sont autorisés ensemble pendant une fenêtre d’accès temporaire. La durée affichée fait foi ; la valeur générée par défaut est de 60 secondes. Les identifiants propres au service protégé restent obligatoires.

> **Même réseau source**
> Le navigateur utilisé pour Port Guard et le client SSH/de base de données/d’application doivent apparaître comme provenant du même réseau source observé. Un changement de réseau peut nécessiter une nouvelle authentification.

# 7. Utiliser la console Server Security

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

# 8. Examiner les incidents et les réponses

## 8.1 Incidents

Sélectionnez un incident pour ouvrir Incident details. Examinez la gravité, le résumé, les informations sur la source lorsqu’elles sont disponibles, Timeline, Evidence et Technical details.

| **Action**         | **Effet**                                                              |
|--------------------|------------------------------------------------------------------------|
| Mark investigating | Modifie l’état d’examen de l’incident pour indiquer une enquête active. |
| Resolve            | Indique que l’examen de l’incident est terminé.                         |
| Dismiss            | Indique que l’incident ne fera pas l’objet d’un suivi.                  |

> **L’état d’un incident n’est pas une remédiation**
> La modification de l’état d’examen d’un incident ne supprime pas à elle seule un logiciel malveillant, n’interrompt pas un attaquant et ne répare pas un serveur compromis.

## 8.2 Réponses

| **État**                                            | **Signification**                                                           |
|-----------------------------------------------------|-----------------------------------------------------------------------------|
| REQUESTED / OBSERVED / SHADOW_APPROVED / APPROVED   | Enregistrée ou approuvée pour évaluation ; son application n’est pas confirmée. |
| APPLIED                                             | La réponse a été enregistrée comme appliquée dans la portée affichée.       |
| EXPIRED                                             | Une réponse temporaire n’est plus active.                                   |
| REVOKED                                             | La réponse a été retirée.                                                    |
| FAILED                                              | L’action demandée n’a pas abouti.                                            |
| SUPPRESSED                                          | La réponse n’a pas été appliquée en vertu de la politique concernée.         |

Examinez conjointement la source, l’action et sa portée, la raison, l’état, l’heure de début et l’expiration. Le blocage des nouvelles connexions ne met pas nécessairement fin à une connexion déjà établie.

# 9. Configurer la politique de sécurité

## 9.1 Mode de réponse automatique

| **Mode** | **Comportement**                                                                                   |
|----------|----------------------------------------------------------------------------------------------------|
| Observe  | Enregistre les décisions admissibles sans application automatique.                                 |
| Shadow   | Évalue les détections admissibles sans appliquer de blocages temporaires.                           |
| Enforce  | Peut appliquer des blocages IP temporaires approuvés lorsque la politique et les conditions de détection sont actives. |

Le mode initial normal après l’installation est Shadow. Pour utiliser Enforce, sélectionnez Enforce, examinez Enable automatic enforcement?, puis confirmez avec Enable Enforce. Enforce ne s’applique qu’aux détections admissibles.

## 9.2 Adresses IP de confiance

42. Ouvrez Policy → Trusted IPs.

43. Saisissez Trusted IP or CIDR et, éventuellement, une Description.

44. Sélectionnez Add trusted source.

45. Utilisez Remove pour supprimer une entrée ou Move to block pour la convertir en blocage explicite.

Trusted IPs exempte une source des blocages de réponse automatique admissibles. Cette liste ne contourne ni la MFA, ni les restrictions par pays, ni Allowed IPs / CIDRs, ni les identifiants du service, ni les autres contrôles d’accès.

## 9.3 Adresses IP/CIDR autorisées

46. Ouvrez la commande représentant un crayon/modifier sur la ligne du serveur.

47. Dans Agent configuration, saisissez des adresses IPv4/IPv6 individuelles ou des plages CIDR dans Allowed IPs / CIDRs (séparées par des virgules).

48. Sélectionnez Save et rouvrez la boîte de dialogue pour vérifier que la valeur a été conservée par le panneau.

Lorsque la liste enregistrée est vide, la vérification de l’adresse Port Guard permet à toutes les sources de passer à l’authentification. Lorsqu’elle n’est pas vide, seules les adresses ou plages correspondantes peuvent continuer.

## 9.4 Blocages explicites

49. Ouvrez Policy → Explicit blocks.

50. Saisissez Blocked IP or CIDR, la Reason obligatoire et, éventuellement, une Explicit block expiry.

51. Sélectionnez Add explicit block.

52. Utilisez Remove pour supprimer une entrée. Pour corriger une entrée, supprimez-la et créez-en une nouvelle.

> **Éviter de bloquer les administrateurs**
> Avant d’ajouter un blocage, vérifiez les adresses d’administration, de surveillance, de NAT et les adresses partagées susceptibles d’utiliser la même IP source ou le même CIDR.

## 9.5 Capteurs et Suricata

Policy → Sensor state peut proposer des interrupteurs pour Inventory, File Integrity, Security Configuration, YARA-X, CrowdSec, Falco et Suricata.

Pour Suricata, ouvrez Policy → Suricata monitored interface, choisissez une interface candidate affichée ou saisissez une interface vérifiée telle que ens3, puis sélectionnez Save interface. Vérifiez la présence d’une télémétrie Suricata récente après la modification.

# 10. Gérer les contrôles d’accès par pays

## 10.1 Geo-Country Filtering par serveur

Le Geo-Country Filtering par serveur s’applique au groupe de ports TCP protégés configuré et nécessite une MFA d’accès au serveur vérifiée.

53. Configurez les ports TCP protégés et terminez la configuration SSH 2FA.

54. Ouvrez Agent configuration et activez Enable Geo-Country Filtering.

55. Sous Default Policy, choisissez Allow Unmatched ou Deny Unmatched.

56. Saisissez une valeur Geo Rules (JSON Array) valide et sélectionnez Save.

57. Rouvrez Agent configuration et vérifiez l’interrupteur, la politique par défaut, les règles, les ports et le paramètre 2FA enregistrés.



- Une règle explicite pour un port configuré prévaut sur la politique par défaut.
- Une règle allow autorise les pays répertoriés et refuse ceux qui ne figurent pas dans cette règle.

- Une règle deny refuse les pays répertoriés et autorise ceux qui ne figurent pas dans cette règle.
- La politique par défaut ne s’applique qu’aux ports configurés dépourvus de règle explicite.

## 10.2 Liste noire de pays au niveau du compte

Blacklist countries sur le tableau de bord général est une liste noire du trafic web au niveau du compte ; elle est distincte du Geo-Country Filtering par serveur.

58. Ouvrez Blacklist countries.

59. Ouvrez Non-Blacklisted et recherchez au besoin le nom du pays ou son code à deux lettres.

60. Sélectionnez un pays et choisissez Add. La modification est enregistrée immédiatement.

61. Vérifiez que le pays apparaît sous Blacklisted.

Pour retirer un pays, ouvrez Blacklisted, sélectionnez le pays bloqué et choisissez remove. Le pays revient dans Non-Blacklisted.

# 11. Examiner les capteurs, l’inventaire, la posture et les résultats

## 11.1 Capteurs

| **Capteur/vue**                    | **Informations signalées**                         |
|------------------------------------|----------------------------------------------------|
| Guard                              | Signal de protection principale.                   |
| File Integrity                     | Modifications des fichiers surveillés.             |
| YARA-X                             | Preuves fondées sur des signatures de logiciels malveillants. |
| CrowdSec                           | Détections de sécurité fondées sur le comportement.|
| Falco                              | Détections au niveau de l’exécution et du système. |
| Suricata                           | Détections réseau.                                  |
| Inventory / Security Configuration | Données d’inventaire et d’évaluation.               |

Une détection de capteur constitue une preuve. Les réponses temporaires automatiques ne concernent que les détections admissibles soumises à une politique de réponse activée.

## 11.2 Inventaire et renseignements sur les vulnérabilités

Inventory peut afficher le nom du paquet, sa version, son écosystème, son architecture et l’heure de sa dernière observation. Utilisez Search packages pour filtrer le tableau des paquets destiné aux clients. L’inventaire est fourni à titre informatif ; il n’applique aucun correctif aux paquets et ne remédie pas aux vulnérabilités.

> **Interpréter avec prudence les données vides ou obsolètes**
> Des informations d’inventaire ou de vulnérabilité vides, indisponibles, inconnues ou obsolètes ne prouvent pas qu’un serveur ne contient aucun paquet ou aucune vulnérabilité.

## 11.3 Posture

Utilisez Posture pour les résultats de Security Configuration Assessment et l’état des renseignements sur les vulnérabilités. Les résultats peuvent afficher les contrôles ayant échoué ou régressé ainsi que les recommandations fournies. Posture est une vue d’évaluation et ne remédie pas automatiquement au serveur.

# 12. Surveiller les événements et la télémétrie

Ouvrez Events et utilisez les filtres disponibles :

- Filtrez par capteur.
- Filtrez par type d’événement en utilisant le type exact.

- Filtrez par gravité : All severities, critical, high, medium, low ou info.
- Utilisez Previous et Next pour la pagination.

Examinez le nom de l’événement, la source, le type, les preuves, la gravité, l’horodatage et l’incident lié lorsqu’il est affiché.

# 13. Dépannage

> **Première règle**
> Conservez un accès administrateur indépendant lorsque vous modifiez les contrôles d’accès. Consignez le texte non secret des erreurs et ne communiquez jamais les codes d’enrôlement, secrets MFA, codes de secours, clés privées ou captures d’écran qui les contiennent.

| **Situation**                                      | **Action recommandée**                                                                                                                                                                                                       |
|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Échec de l’installation du paquet                  | Vérifiez que le paquet sélectionné correspond au système d’exploitation et à l’architecture, téléchargez-le de nouveau, comparez le SHA-256 affiché et exécutez la commande copiée avec des privilèges administrateur. Pour RPM, laissez la vérification des signatures activée. |
| Expiration du code d’enrôlement                    | Ne générez un nouveau code que si le précédent n’a pas été utilisé ou si le panneau autorise explicitement son remplacement. Si un code a été accepté avant un échec ultérieur, utilisez Setup / recovery lorsque le serveur apparaît comme enrôlé. |
| La protection active n’est pas confirmée           | Ouvrez Overview et examinez Server protection, Provisioning, Sensor health et Guard access security. Suivez la raison affichée pour PENDING, DEGRADED, FAILED ou CONFIGURATION REQUIRED. |
| Policy affiche Saved · pending activation          | Considérez la politique comme enregistrée, mais pas encore active. Conservez la configuration sûre précédente et l’accès administrateur jusqu’à la fin de l’activation. |
| Échec de la configuration MFA                      | Vérifiez l’heure de l’application d’authentification, utilisez un code actuel à six chiffres, vérifiez les ports prévus et laissez la session administrateur existante ouverte. |
| Port Guard déverrouille les ports, mais le service est inaccessible | Reconnectez-vous rapidement, vérifiez que le navigateur et le client utilisent la même source observée, vérifiez le port protégé et les identifiants du service, puis examinez Allowed IPs, les règles par pays, les blocages explicites, les réponses automatiques et la politique réseau. |
| Perte de l’accès à l’application d’authentification | Utilisez un code de secours inutilisé s’il en existe un, puis suivez le processus de récupération approuvé par votre organisation. |
| Comportement inattendu des restrictions IP ou par pays | Identifiez la fonction qui exerce le contrôle, vérifiez l’adresse source et le port, examinez la priorité et l’expiration des règles et recherchez un blocage accidentel des administrateurs avant d’ajouter une autre règle. |
| Télémétrie d’un capteur absente ou obsolète        | Ouvrez Sensors, examinez l’état du capteur et Last signal, puis vérifiez la configuration, notamment l’interface Suricata le cas échéant. |
| Inventaire des paquets vide                        | Utilisez Search packages et comparez le tableau des paquets aux autres activités d’inventaire. Considérez un tableau vide comme une information incomplète et non comme la preuve qu’aucun paquet n’existe. |

# 14. Bonnes pratiques de sécurité et d’exploitation

- Utilisez les plages IP/CIDR de confiance et autorisées les plus restreintes possible.
- Conservez un moyen de récupération administrateur testé lorsque vous activez la MFA, des blocages explicites ou des restrictions par pays.

- Ne vous fiez pas à une configuration enregistrée tant que le panneau n’indique pas un état actif/sain approprié et qu’une télémétrie récente ne le confirme pas.
- Considérez les détections des capteurs comme des preuves à examiner ; ne supposez pas que chaque détection a été automatiquement bloquée.

- Vérifiez l’expiration de la réponse avant de supposer qu’un blocage automatique est toujours actif.
- Ne supprimez pas manuellement des fichiers ou services de sécurité à des fins de récupération, sauf si votre procédure opérationnelle approuvée l’exige explicitement.

# Annexe A — Référence rapide des états

| **Élément**                 | **Interprétation pour le client**                                                                            |
|-----------------------------|---------------------------------------------------------------------------------------------------------------|
| Registered                  | L’enregistrement du service existe.                                                                          |
| Installed                   | Le paquet natif a été installé.                                                                               |
| Enrolled                    | Le code d’enrôlement à usage unique a été accepté.                                                            |
| Installation complete       | Le provisionnement a atteint l’étape de fin d’installation ; vérifiez l’état actuel dans Overview et la télémétrie. |
| Saved · pending activation  | La modification est stockée dans le panneau, mais ne doit pas encore être considérée comme active.           |
| SSH 2FA: Active             | La configuration de l’application d’authentification est terminée pour la ligne ; vérifiez les ports protégés prévus et l’état actuel de la protection. |
