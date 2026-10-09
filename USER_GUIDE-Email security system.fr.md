# Guide utilisateur de la plateforme de messagerie unifiée

La plateforme réunit trois produits distincts : **Admin Console / Silence 365 Email Visualizer** pour les domaines de messagerie, les flux, les menaces et l'organisation ; **Email Protector** pour lire, envoyer, classer et migrer les courriels sécurisés ; **WebSOC / AI-SOC Web** pour connecter les domaines Web à la passerelle de sécurité, surveiller le trafic, appliquer des restrictions géographiques et gérer le solde. L'interface et les fonctions dépendent du rôle, de l'offre et de l'organisation. Demandez à votre administrateur l'adresse de chaque console ; n'utilisez pas l'adresse de l'une pour vous connecter à une autre.

## Sommaire

1. [Présentation de la plateforme](#1-platform-overview)
2. [Accès au compte](#2-account-access)
3. [Admin Console — Silence 365 Email Visualizer](#3-admin-console-silence-365-email-visualizer)
4. [Email Protector](#4-email-protector)
5. [WebSOC / AI-SOC Web](#5-websoc-ai-soc-web)
6. [Problèmes courants](#6-common-issues)
7. [Recommandations de sécurité](#7-security-recommendations)
8. [Glossaire](#8-glossary)
9. [Contacter l'assistance](#9-contacting-support)

## 1. Présentation de la plateforme

### 1.1 Choisir le bon produit

| Tâche | Produit |
|---|---|
| Ajouter un domaine de messagerie, configurer MX, SPF, DKIM et DMARC ; consulter les flux et les menaces ; gérer employés, services et serveurs de messagerie | Admin Console ; les fonctions de gestion exigent le rôle administrateur |
| Lire, envoyer et organiser les messages ; vérifier leur classification et l'analyse des pièces jointes ; migrer une boîte externe | Email Protector |
| Connecter un domaine Web ; consulter RPS, bande passante, adresses IP actives et répartition géographique ; limiter le trafic par pays ou ports autorisés | WebSOC |

### 1.2 Rôles et droits d'accès

| Rôle | Possibilités principales |
|---|---|
| Utilisateur de messagerie | Gérer ses messages, dossiers et paramètres personnels |
| Administrateur de l'organisation | Gérer employés, services, domaines, signatures communes et paramètres de protection |
| Administrateur de domaine | Configurer DNS et serveurs de messagerie et contrôler l'état des domaines |
| Administrateur WebSOC | Connecter des domaines Web et modifier l'adresse du serveur d'origine et la liste des pays |
| Employé de la plateforme | Gérer les tarifs convenus avec les clients ; cet espace est inaccessible aux clients ordinaires |

Si une fonction manque ou que l'accès est refusé, contactez l'administrateur de votre organisation. N'utilisez pas le compte d'autrui pour contourner les restrictions.

### 1.3 Avant de commencer

Selon la tâche, préparez l'adresse de la console, un compte actif, une application d'authentification pour la 2FA, l'accès au panneau DNS, l'autorisation de modifier le site et le DNS pour WebSOC, le nom ou l'adresse du serveur Web d'origine, les identifiants d'une boîte externe ou l'autorisation Microsoft pour une migration, et le droit de payer pour approvisionner le solde.

> Important : relevez toujours les valeurs DNS, adresses IP, clés de vérification et montants dans votre propre console. Ne recopiez pas ceux d'exemples ou d'un autre client.

## 2. Accès au compte

### 2.1 Règles générales de connexion

Chaque console a son propre écran de connexion et sa propre session. Si l'authentification unique est activée, la console redirige vers **AI-CSD** ou affiche **Sign in with AI-CSD / Sign in**. Ouvrez l'adresse fournie par l'administrateur, choisissez une méthode proposée, terminez l'authentification auprès du fournisseur pour SSO, Google ou Microsoft, entrez le code à six chiffres si la page 2FA s'ouvre, puis vérifiez que le profil correspond au bon compte.

### 2.2 Accéder à Admin Console

Selon la configuration : **Sign in** avec adresse électronique et mot de passe, **Continue with Google**, **Continue with Outlook**, ou **Sign in with AI-CSD / Sign in** pour SSO.

Pour créer un compte client, choisissez **Create account**, puis **Monthly** ou **Yearly** et une offre selon les noms, limites et prix actuellement affichés. Saisissez un nom d'utilisateur et une adresse électronique ; cliquez sur le bouton à côté de cette adresse pour recevoir un code de vérification. Entrez le code et un mot de passe, ajoutez un code promotionnel avant de terminer si nécessaire, puis inscrivez-vous et connectez-vous.

Pour un compte local, dans **Set Up Two-Factor Authentication**, scannez le code QR avec une application d'authentification. Si ce n'est pas possible, choisissez **Can't scan? Enter key manually** et ajoutez la clé affichée. Saisissez le code à six chiffres et cliquez sur **Activate 2FA**. Aux connexions suivantes, saisissez le code dans **Two-Factor Authentication** et cliquez sur **Verify**.

### 2.3 Accéder à Email Protector

La connexion SSO peut démarrer automatiquement. Sinon, les choix possibles sont **Continue with Google**, **Continue with Microsoft**, **Email** et **Password** puis **Sign in**, ou **Login with QR Code**. L'administrateur crée normalement les comptes locaux. Lors de la première connexion, il peut falloir changer le mot de passe temporaire, configurer la 2FA et confirmer avec un code à six chiffres. Pour se connecter par QR, choisissez **Login with QR Code**, scannez le code affiché avec un deuxième appareil autorisé et approuvez la connexion sur la page de confirmation.

### 2.4 Accéder à WebSOC

Inscription : sur **Welcome**, choisissez **Register**, renseignez **Email**, **Username**, le mot de passe et **Confirm password**. Si nécessaire, indiquez **Recovery password**, **Recovery email** et **Promocode**. Confirmez votre âge et l'acceptation des conditions, puis **Continue**. Dans **Set up 2FA**, scannez le QR ou saisissez la clé secrète, entrez le **6-digit code** et choisissez **Verify and finish**. Un mot de passe WebSOC, y compris celui de récupération, doit contenir au moins une majuscule latine et un chiffre ; seules les lettres latines et les chiffres sont admis.

Connexion normale : choisissez **Log in**, saisissez **Email or Username** et **Password**, puis **Continue**. Dans **Two-factor authentication**, saisissez le code et choisissez **Verify and continue**. Pour récupérer un mot de passe, utilisez **Forgot password?**, demandez un code par courriel, puis entrez ce code et le nouveau mot de passe. **Resend code** renvoie le code.

## 3. Admin Console — Silence 365 Email Visualizer

### 3.1 Configuration initiale

Pour un compte client en libre-service, choisissez une offre et achevez **Initial domain mail setup**. L'assistant comporte quatre étapes, **Domain**, **DNS verification**, **Security**, **Ready**, et conserve l'avancement par domaine. Si l'organisation utilise seulement Google ou Outlook et propose **Use AI-SOC as security layer (Gmail/Outlook only)**, il est possible de continuer sans configurer la messagerie hébergée du domaine, après accord avec l'administrateur du domaine.

### 3.2 Ajouter et vérifier un domaine

À **Step 1. Add domain**, entrez le domaine sans `https://` ni chemin et cliquez sur **Continue**. À **Step 2. Verify domain via DNS**, copiez **TXT name** et **TXT value**, créez l'enregistrement TXT dans le panneau DNS, attendez sa propagation et cliquez sur **Check now** ; l'assistant effectue aussi des contrôles périodiques. Ne poursuivez qu'après **Verified**. Certains panneaux DNS ajoutent automatiquement le domaine au champ Name : suivez l'indication de la console pour éviter un suffixe doublé.

### 3.3 Configurer MX, SPF, DKIM et DMARC

**Step 3. Security setup** indique les valeurs exactes. MX dirige les courriels entrants vers le serveur voulu ; SPF répertorie les sources autorisées à envoyer ; DKIM publie la clé de vérification des signatures sortantes ; DMARC définit la politique et les rapports pour les messages qui échouent à SPF ou DKIM. Pour chaque enregistrement, générez-le si nécessaire, copiez exactement **Type**, **Name/Host**, **Value**, **Priority** et **TTL**, créez ou modifiez le DNS, attendez la propagation, cliquez sur **Verify** et confirmez **Configured**. Pour DMARC, les alias RUA et RUF demandés reçoivent respectivement les rapports agrégés et les rapports d'échec.

> Important : coordonnez toute modification du SPF existant avec l'administrateur de messagerie. Plusieurs enregistrements SPF sous le même nom peuvent empêcher la vérification de l'expéditeur.

**Not configured** signifie introuvable ; **Update required**, valeur différente de celle recommandée ; **Configured**, valeur attendue ; **Pending verification**, modification non encore détectée ; **Error**, vérification impossible. Une fois tous les enregistrements configurés, passez à **Step 4. Ready** et choisissez **Go to dashboard**.

### 3.4 Gérer les domaines

Dans **Domains** et **Domain management**, les administrateurs peuvent ajouter un domaine, copier son jeton, répéter **Verify**, examiner séparément MX/SPF/DKIM/DMARC, utiliser **Set default**, saisir les IP des serveurs SMTP autorisés, ouvrir **DNS setup**, renommer ou supprimer un domaine. Avant suppression, vérifiez que les employés et clients de messagerie ne l'utilisent plus ; une confirmation distincte est exigée.

### 3.5 Tableau de bord et flux de messagerie

Le graphique montre employés, services ou domaines sous forme de nœuds et leurs échanges de courriels sous forme de liens. Choisissez **Incoming** ou **Outgoing**, puis **Time range** : dernière heure, 3/6/12/24 heures, toute la période ou intervalle personnalisé. Au besoin, ouvrez **Filter**, renseignez expéditeur, destinataire, objet, texte ou pièce jointe et cliquez sur **Apply filters**. Cliquez sur un nœud pour ouvrir les messages liés ; utilisez la recherche et le tri **Newest first** / **Oldest first**, puis consultez le contenu, les en-têtes et les pièces jointes. Des cartes d'analyse couvrent services et domaines. Dans un intervalle personnalisé, le début doit précéder la fin, qui ne peut être future.

### 3.6 Catégories de menaces

La flèche en bas du tableau ouvre **Threat categories**. **Possibly spoofed** signale une possible usurpation de l'expéditeur ou du domaine ; **Spam**, un message indésirable ; **Dangerous link**, un lien potentiellement dangereux ; **Possibly phishing**, une possible recherche d'identifiants ou de données de paiement ; **Malware in the attachment**, un objet dangereux joint ; **Secure emails**, l'absence d'indicateurs de menace connus. Sélectionnez une carte puis **Click to view** pour voir expéditeur, destinataire, date, contenu, source et pièces jointes. Les états des pièces jointes sont **Safe**, **Suspicious**, **Malware detected**, **Pending scan**. Déplacer vers Trash diffère de **Delete permanently** : vérifiez le message avant la suppression définitive.

### 3.7 Employés et administrateurs

Dans **Settings** → **Employees** → **+ Add** → **Create manually**, entrez l'adresse, le prénom, le nom et les autres données requises. Vérifiez si la connexion utilise Google, Microsoft ou un compte interne ; ajoutez au besoin adresses, téléphones ou alias, puis **Create**. Pour un import groupé, utilisez **Upload employee list**, téléchargez **Download CSV template**, respectez sa structure, lancez **Import** et vérifiez **Created** et **Skipped**. Le menu d'un employé peut proposer **Edit**, **Change password** pour les comptes internes, **Edit aliases**, **Make administrator** / **Revoke administrator rights**, et **Delete**. N'accordez le rôle administrateur que lorsque la gestion de l'organisation l'exige réellement.

### 3.8 Services

Dans **Settings** → **Departments**, créez un service au nom unique, ouvrez ses membres et ajoutez les employés ; l'action de retrait enlève un employé du service. Avant de supprimer un service, vérifiez ses membres et l'effet sur la visualisation.

### 3.9 Paramètres généraux de protection

L'onglet **Security**, réservé aux administrateurs, peut comporter **Enable phishing detector**, **Enable attachment virus scanning**, **Block management** pour domaines et adresses, et un lien vers les serveurs de messagerie. Après une modification, attendez l'enregistrement et confirmez que le nouvel état reste sélectionné.

### 3.10 Serveurs de messagerie de l'entreprise

Dans **Company Email Servers**, renseignez **IMAP server**, **IMAP port**, **IMAP security** et, si nécessaire, **SMTP server**, **SMTP port**, **SMTP security**. Choisissez **SSL/TLS** ou **STARTTLS** selon le serveur ; enregistrez puis contrôlez les paramètres du client de messagerie. Sans SMTP, les clients externes reçoivent par IMAP, mais l'envoi n'est possible que dans l'application Web. **None / plain text** transmet sans protection du canal : ne l'utilisez que sur un réseau isolé de confiance et sur décision de l'administrateur de sécurité.

### 3.11 Organisation et IA

L'onglet **General** permet de choisir langue et fuseau horaire et, avec les droits suffisants, de modifier le nom et le logo de l'organisation. Si **AI Agent** est disponible, l'administrateur peut choisir fournisseur et modèle, indiquer un point de terminaison uniquement dans une configuration prise en charge, conserver la clé d'accès en sécurité, enregistrer et exécuter le test de connexion intégré. Ne communiquez pas la clé aux employés et ne la montrez pas sur des captures.

### 3.12 Offre, portefeuille et paiements

Le menu du profil contient **Balance**, **Top Up Balance**, **Manage Plan**. Pour approvisionner, vérifiez la devise et les bornes affichées, saisissez un montant, choisissez **Pay**, terminez sur la page de paiement sécurisée, puis contrôlez le nouveau solde. Pour changer d'offre, comparez les limites d'utilisateurs, d'administrateurs, de stockage et d'opérations IA ; choisissez facturation mensuelle ou annuelle et offre, vérifiez le coût d'activation ou de transition et confirmez. Prix et devise dépendent du déploiement et du contrat client : fiez-vous uniquement à votre console.

## 4. Email Protector

### 4.1 Zones principales

Après connexion, l'interface propose barre de dossiers, liste des messages, zone de lecture et de détails de sécurité, **Compose**, recherche, changement de compte, **Settings**, langue et déconnexion. Les dossiers système peuvent comprendre **All mail**, **Important**, **Inbox**, **Sent**, **Drafts**, **Scheduled**, **Trash**. La zone Security contient les dossiers de quarantaine et d'erreurs disponibles pour l'organisation ; les dossiers personnels figurent sous **My folders**.

### 4.2 Lire et vérifier un message

Choisissez un dossier et un message ; contrôlez expéditeur, destinataires, objet, date, indicateur de couleur et classification. Dépliez **Attachments** pour vérifier chaque fichier et, au besoin, ouvrez **Show details** ou **Show source text**. Avec **Secure**, restez normalement prudent ; pour **Spam**, vérifiez l'expéditeur et ne répondez pas aux envois non sollicités ; pour **Possibly Spoofed**, confirmez l'identité par un autre canal ; pour **Possibly Phishing**, n'ouvrez aucun lien et ne saisissez pas d'identifiants. N'ouvrez pas un lien dangereux avant l'avis d'un spécialiste, ni ne téléchargez ou exécutez une pièce jointe dangereuse.

Pour les pièces jointes, **Clean** autorise le téléchargement ; **Suspicious** demande l'examen des détails et, en cas de doute, l'avis d'un administrateur ; **Download blocked** ne doit pas être contourné ; **Scanning…** exige d'attendre ; **Not scanned** exige une vérification supplémentaire avant ouverture. Même avec **Clean**, contrôlez le contexte, l'adresse de l'expéditeur et si le fichier était attendu.

### 4.3 Recherche et actions dans la liste

Saisissez du texte dans **Search emails...**, utilisez **All**, **Secure**, **Spam**, **Spoofing**, **Threats found**. L'étoile ajoute à **Important** ; le menu de dossier déplace vers un dossier personnalisé ou ramène à **Inbox**. Vous pouvez sélectionner plusieurs messages pour les mettre dans Trash. Dans **Trash**, utilisez **Restore** ou la suppression définitive ; **Load more** affiche la suite de la liste. La suppression définitive est irréversible : vérifiez d'abord le dossier et les messages sélectionnés.

### 4.4 Rédiger et envoyer

Choisissez **Compose**, remplissez **To** et, si nécessaire, **Cc** et **Bcc**, l'objet et le corps. Ajoutez des fichiers via le bouton de pièce jointe. Pour un envoi ultérieur, utilisez **Schedule send** avec une date et une heure futures, puis **Send email**. Les brouillons de **Drafts** peuvent être modifiés et envoyés ; les messages de **Scheduled** peuvent être consultés et annulés avant livraison par l'action prévue.

### 4.5 Actions sur un message ouvert

Selon le message et vos droits : ajouter ou retirer **Important**, afficher en plein écran, déplacer, afficher la source, traduire puis revenir à l'original, préparer une réponse IA, se désabonner si un lien pris en charge existe, ou déplacer vers Trash. Vérifiez l'expéditeur avant de vous désabonner ; n'utilisez pas le lien d'un message manifestement frauduleux.

### 4.6 Dossiers personnalisés et règles

Choisissez **New folder** ou **Create folder**, entrez **Folder name**, ajoutez dans **Inclusion rules** les adresses ou domaines à classer et dans **Exclusion rules** les exceptions, puis **Save**. Les exclusions sont prioritaires. Le menu permet de renommer, modifier les règles ou supprimer ; lisez l'avertissement affiché avant suppression.

### 4.7 Changer de compte

Le menu de compte ajoute un autre compte autorisé et permet de basculer. Choisissez **Add account** ; pour Google ou Microsoft, terminez la connexion chez le fournisseur ; pour un compte local, entrez adresse, mot de passe et code 2FA si demandé. Choisissez ensuite le compte voulu. Le compte actif ne peut être retiré de la liste ; lors d'un basculement vers un compte local, le mot de passe peut être redemandé.

### 4.8 Paramètres de la boîte

Ouvrez **Settings** et la rubrique souhaitée.

#### Général

Réglez **Sender name**, le dossier des envois, le fuseau horaire et le format de date, puis **Save**.

#### Signature

Activez **Add to outgoing emails**, composez la signature, vérifiez **Signature preview** et enregistrez.

#### Réponse automatique

Activez **Autoresponder**, indiquez dates de début et de fin et texte ; au besoin, activez **Reply once per sender**, vérifiez l'aperçu et enregistrez.

#### Transfert

Entrez une adresse de transfert, choisissez **Add**, décidez de **Keep a copy in Inbox**, puis enregistrez.

#### Expéditeurs bloqués

Entrez une adresse et choisissez **Block sender** : ses messages vont automatiquement dans Spam. **Unblock** annule le blocage.

#### Gestion des comptes

Modifiez le nom affiché ou l'adresse d'un compte enregistré, ou retirez de la liste un compte inactif.

#### Stockage

Consultez l'espace utilisé et le pourcentage du quota. Au-delà de 90 %, supprimez les messages et pièces jointes inutiles ou demandez à l'administrateur des renseignements sur l'offre.

#### Affichage et comportement

Les options possibles comprennent le délai de suppression automatique de Trash, le fond et son flou, l'effet de verre, le marquage comme lu, le volet d'aperçu, le mode conversation, la police et la taille du texte de rédaction.

### 4.9 Migration de messagerie

Ouvrez **Account settings** → **Email migration** → **Start migration**. Les sources sont **Gmail**, **Outlook**, **iCloud**, **Custom IMAP**. Pour Gmail ou iCloud, choisissez le fournisseur, saisissez la boîte externe et, si demandé, un mot de passe d'application créé chez ce fournisseur plutôt que le mot de passe principal, puis **Start Migration**. Pour Outlook, utilisez **Connect Outlook Account** et autorisez l'accès chez Microsoft. Pour **Custom IMAP**, indiquez aussi **IMAP Server** et **Port**. La migration affiche pourcentage, nombre de messages traités et dossier actuel ; **Pause** et **Resume** la contrôlent, et **Migration Complete!** marque sa fin. Ne révoquez ni l'accès ni le mot de passe d'application avant la fin.

### 4.10 Fonctions d'IA

Si l'administrateur les active, l'icône IA d'un message crée un brouillon de réponse ; **AI auto reply** peut enregistrer une réponse générée comme brouillon à vérifier ; l'assistant IA peut résumer ou expliquer le message et préparer une réponse. N'activez l'envoi automatique que conformément à la politique de l'organisation. Avant tout envoi, vérifiez destinataires, faits, pièces jointes et ton. Ne transmettez jamais à l'assistant secrets, mots de passe ni données personnelles sans rapport.

### 4.11 Calendly

**Calendly** affiche **Connected** ou **Not connected**. Créez un jeton personnel dans les intégrations Calendly, saisissez-le dans **Calendly API token**, choisissez **Connect Calendly** et vérifiez **Connected**. **Disconnect Calendly** met fin à l'intégration. Gardez le jeton secret.

### 4.12 Gestion des utilisateurs et signatures communes

Les administrateurs gèrent les utilisateurs autorisés et les signatures de l'entreprise. Dans **Company Signatures**, choisissez **New**, renseignez **Signature Name**, choisissez la portée **Company**, **Domain**, **Department** ou **User**, saisissez le contenu et contrôlez **Preview**. Activez **Active**, puis **Create** ou **Save**. Lors d'une modification, vérifiez le domaine, service ou utilisateur sélectionné. La suppression d'une signature commune exige une confirmation distincte.

## 5. WebSOC / AI-SOC Web

### 5.1 Connecter un domaine

WebSOC appelle l'objet de connexion « agent », mais l'assistant configure un domaine et un serveur Web d'origine. N'installez aucun logiciel à partir d'une commande non vérifiée. Dans **Data source selection**, choisissez **Add new agent** ou **Register new agent**, renseignez le domaine protégé dans **Domain**, l'hôte ou l'IP du serveur d'origine dans **IP address**, puis **Register**.

#### Étape 1. Vérifier la propriété du site

Dans **Step 1. Add ownership meta tag on your origin website**, choisissez **Copy tag**, ajoutez la balise meta à `<head>` de l'accueil, publiez et vérifiez l'accès public par nom de domaine. **Copy key** ne copie que la clé ; **Copy tag** copie toute la balise.

#### Étape 2. Déléguer ACME

Dans **Step 2. Add ACME delegation CNAME**, copiez **Name** et **Hostname (target)**, créez le CNAME, attendez la propagation DNS et choisissez **Verify ownership and DNS**. **Ownership and DNS verified** indique le succès, mais le routage du trafic peut encore être inactif.

#### Étape 3. Basculer le trafic

Après vérification apparaît **Step 3. DNS A record to add (switch traffic through WebSOC)**. Copiez **Name** et **IP address**, assurez-vous que l'origine WebSOC est correcte et répond sur un port autorisé, créez ou modifiez l'enregistrement A, attendez la propagation, puis contrôlez **DNS routing** dans **Domain setup details**.

> Important : modifier l'enregistrement A bascule le trafic des utilisateurs. Effectuez l'opération pendant une fenêtre de changement approuvée et conservez l'accès au DNS et au serveur d'origine pour pouvoir revenir en arrière.

### 5.2 États des domaines

**Delegation not verified** : balise meta ou CNAME non vérifié ; **Delegation verified / DNS pending** : propriété et délégation vérifiées, mais l'enregistrement A ne passe pas encore par WebSOC ; **Active** : délégation et routage DNS actifs. La flèche circulaire relance la vérification ; l'icône de document ouvre **Domain setup details** avec toutes les valeurs requises.

### 5.3 Configurer le serveur d'origine

Dans **Data source selection**, repérez le domaine et cliquez sur le crayon. Vérifiez **IP address** dans **Agent configuration**, indiquez le nouvel hôte ou IP, choisissez **Save** et attendez **Configuration updated successfully!**. Avant toute modification, confirmez que la nouvelle origine est accessible et sert le bon domaine.

### 5.4 Choisir des domaines et lire la carte

Dans **Data source selection**, choisissez les domaines à analyser. À droite, sélectionnez **RPS** pour les requêtes par seconde, **Bandwidth** pour le volume transféré ou **Active Users** pour le nombre d'IP actives. Survolez un pays du globe pour voir ses données. L'intensité de la carte compare les pays selon l'indicateur choisi ; utilisez aussi le graphique pour apprécier les tendances.

### 5.5 Graphiques et principaux pays

La flèche du bas ouvre **Server load chart**. Périodes : **1 day**, **2 days**, **7 days**, **14 days**, **1 month**, **3 months**. La fenêtre liste aussi les pays en tête pour IP actives, bande passante et RPS. Sélectionner une zone du graphique restreint la période des mesures associées. Comparez les mêmes domaines et périodes pour éviter les conclusions trompeuses.

### 5.6 Notifications d'anomalie

Une anomalie déclenche un panneau rouge en haut. Lisez-le, notez le domaine et l'heure, puis choisissez **OK**. Fermer le panneau confirme seulement sa lecture, sans résoudre la cause. Consultez les graphiques et le service d'origine, puis alertez l'administrateur de sécurité si nécessaire.

### 5.7 Liste noire des pays

Choisissez **Country blacklist**, ouvrez **Not blacklisted** ou recherchez un pays, sélectionnez-le et cliquez sur **Add** ; vérifiez sa présence sous **Blacklisted**. Pour annuler, sélectionnez le pays sous **Blacklisted** et choisissez **delete**. Avant tout ajout, tenez compte des employés, clients, systèmes de surveillance externes et paiements situés dans ce pays. Gardez un accès administrateur depuis un pays autorisé.

### 5.8 Langue et thème

Le menu en haut à gauche propose **Globe style**, **Select language**, **Payment history**, **Promo code**.

### 5.9 Solde et paiements

Le menu du profil affiche le solde. Choisissez **Top up balance**, saisissez au moins le minimum affiché, cliquez sur **Create payment**, terminez dans la fenêtre sécurisée et attendez la mise à jour du solde. Consultez les opérations via **Payment history**. **Completed** signifie crédit effectué ; **Pending**, paiement en cours ; **Failed**, paiement non terminé. Entrez un code dans **Promo code** ; **Locked** signifie qu'il ne peut plus être modifié pour ce compte.

### 5.10 Supprimer un domaine

La corbeille à côté du domaine le supprime après confirmation. Conservez d'abord les informations nécessaires pour rétablir le DNS vers l'origine et confirmez que WebSOC ne doit plus servir le domaine.

## 6. Problèmes courants

### 6.1 Connexion impossible

Vérifiez la console, la méthode de connexion (SSO, Google, Microsoft ou locale), la disposition du clavier et l'adresse électronique. Utilisez la récupération du mot de passe local si disponible. Si les droits manquent, contactez l'administrateur de l'organisation.

### 6.2 Code 2FA refusé

Utilisez un code récent ; le précédent a pu expirer. Activez la date et l'heure automatiques du téléphone, sélectionnez le bon compte dans l'application et n'utilisez pas un code SMS quand un code de l'application est demandé. Après plusieurs échecs, arrêtez les essais et contactez l'assistance.

### 6.3 Code de vérification ou de récupération absent

Contrôlez l'adresse, Spam et Quarantine. Attendez quelques minutes et renvoyez une seule fois. Si l'organisation filtre les messages système, contactez l'administrateur de messagerie.

### 6.4 Domaine Admin Console toujours en attente

Comparez caractère par caractère le nom et la valeur TXT, vérifiez l'absence de suffixe ajouté deux fois et la bonne zone DNS, attendez la propagation puis utilisez **Check now**.

### 6.5 SPF, DKIM, DMARC ou MX non vérifié

Rouvrez l'enregistrement dans Admin Console et comparez type, nom, valeur, priorité et TTL. Pour SPF, cherchez des enregistrements en conflit ; pour DKIM, contrôlez le sélecteur et `_domainkey` ; pour DMARC, `_dmarc` et les adresses de rapport ; pour MX, l'hôte cible et la priorité. Après correction et propagation DNS, cliquez sur **Verify**.

### 6.6 Messages ou mesures non actualisés

Choisissez **Refresh** si disponible, vérifiez dossier, domaine, sens, période, filtres trop stricts et compte actif, actualisez la page puis réessayez.

### 6.7 Pièce jointe bloquée

Ne désactivez pas la protection et ne demandez pas de renommer le fichier pour contourner l'analyse. Communiquez à l'administrateur l'expéditeur, l'objet, l'heure de réception, le nom du fichier et l'état ou les détails affichés, sans divulguer de contenu secret.

### 6.8 Migration impossible à connecter

Vérifiez le fournisseur ; utilisez un mot de passe d'application valide pour Gmail ou iCloud ; refaites **Connect Outlook Account** pour Outlook ; vérifiez serveur, port, adresse et mot de passe pour **Custom IMAP** ; cliquez sur **Resume** si l'opération est suspendue.

### 6.9 WebSOC ne vérifie pas le domaine

Vérifiez la publication de la balise meta sur une page d'origine accessible ; comparez les champs Name et Hostname du CNAME avec **Domain setup details** ; attendez le DNS et utilisez **Verify ownership and DNS** ou l'icône de reprise. Si l'état est déjà **Delegation verified / DNS pending**, vérifiez séparément l'enregistrement A.

### 6.10 Accès perdu après modification WebSOC

Vérifiez si votre pays figure dans **Country blacklist** et si l'hôte ou l'IP de l'origine est correct ; utilisez l'accès administrateur conservé pour annuler la restriction erronée.

### 6.11 Paiement toujours en attente

Ne créez pas tout de suite un deuxième paiement. Consultez **Payment history**, actualisez le solde après traitement ; si l'état ne change pas, transmettez à l'assistance l'heure, le montant et l'identifiant de transaction. Ne transmettez jamais numéro de carte, CVC ni codes de confirmation.

## 7. Recommandations de sécurité

- Utilisez des mots de passe uniques dans un gestionnaire ; protégez le secret 2FA et l'appareil d'authentification.
- Ne partagez jamais codes de vérification, mots de passe de récupération ou d'application, clés IA ou jetons Calendly. Masquez les secrets dans les captures destinées à l'assistance.
- Revérifiez les valeurs DNS dans la console actuelle juste avant publication. Ne désactivez pas les contrôles de phishing et de pièces jointes pour des tests.
- Ne faites pas confiance à un expéditeur au seul motif que son message paraît familier. Vérifiez les demandes de paiement inattendues et changements de coordonnées bancaires par un canal indépendant.
- Accordez le rôle administrateur selon le moindre privilège et préservez un accès administrateur de secours avant toute restriction par pays.
- Contrôlez régulièrement l'état des domaines, menaces, pièces jointes, WebSOC et paiements.

## 8. Glossaire

| Terme | Sens |
|---|---|
| 2FA | Deuxième facteur de connexion : code à usage unique d'une application d'authentification |
| Mot de passe d'application | Mot de passe distinct créé par le fournisseur de messagerie pour une application |
| DKIM | Signature des messages sortants vérifiée avec une clé DNS |
| DMARC | Politique et rapports pour les messages échouant à SPF ou DKIM |
| DNS | Enregistrements reliant les noms de domaine aux services et à leur configuration |
| IMAP | Protocole d'accès aux courriels sur un serveur |
| MX | Enregistrement DNS désignant le serveur de réception |
| Origine | Serveur Web source auquel WebSOC transmet les requêtes autorisées |
| Quarantaine | Espace isolant les messages suspects |
| RPS | Requêtes Web par seconde |
| SMTP | Protocole d'envoi de courriels |
| SPF | Politique DNS répertoriant les sources autorisées à envoyer pour un domaine |
| TTL | Durée de mise en cache d'un enregistrement DNS |

## 9. Contacter l'assistance

Utilisez le canal indiqué par votre organisation. Préparez le produit concerné (Admin Console, Email Protector ou WebSOC), l'adresse du compte sans mot de passe, le domaine si pertinent, la date, l'heure exacte et le fuseau, la suite des actions, le texte exact de l'erreur et une capture sans clés, jetons, QR ni données personnelles. Pour un paiement, indiquez montant, état et identifiant de transaction sans données de carte ; pour un message, expéditeur, objet et heure, sans contenu confidentiel sauf nécessité. Ne transmettez jamais mot de passe, code 2FA à six chiffres, clé secrète, mot de passe de récupération ou d'application complet, CVC ou clé IA privée.
