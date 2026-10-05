# Guide utilisateur WebSOC

La console de gestion centralisée (CMC) de WebSOC permet d’enregistrer les services protégés, de choisir le trafic des agents à afficher et de gérer les paramètres de protection. L’Agent assure la protection active ; gérez-la depuis la CMC.

## 1. Ouvrir le tableau de bord

Connectez-vous à la CMC avec votre compte. Le tableau de bord affiche un globe du trafic par pays et s’actualise périodiquement. La navigation comprend **Dashboard**, **Compliance**, ainsi que des liens vers les services WebSOC et Email Security et leurs instructions produit.

Le bouton de menu en haut à gauche donne accès aux préférences d’affichage, à la langue, au fuseau horaire, à l’historique des paiements et aux paramètres de clé AI API. Le menu de profil contient l’accès à l’équipe, la facturation, les options du compte et la déconnexion.

## 2. Enregistrer un service protégé

1. Ouvrez **Data source selection** près du coin supérieur gauche du tableau de bord, puis choisissez **Register new agent**.
2. Choisissez **Website only** pour un site protégé en mode reverse proxy, ou **Other services** pour un autre service comme SMTP, une application personnalisée ou Kubernetes.
3. Saisissez le domaine et l’hôte ou l’adresse IP actuelle de l’origine/du service. Pour un site, la CMC peut suggérer un nœud edge.
4. Pour un site, envoyez le formulaire pour l’enregistrer. Suivez les détails DNS affichés : ajoutez chez votre fournisseur DNS le CNAME de délégation ACME demandé, puis pointez le DNS du service vers l’edge WebSOC comme indiqué. ACME est le processus automatisé de certificat ; les enregistrements DNS prouvent le contrôle du domaine et dirigent le trafic.
5. Une fois le CNAME en place, sélectionnez **Verify DNS delegation**. L’interface indique si la délégation est vérifiée et précise qu’un enregistrement A reste nécessaire. Utilisez **Redo verification** si besoin.
6. Pour **Other services**, le formulaire propose **Get agent install command** après la saisie des détails du service. Suivez les instructions générées pour ce service.

La liste des agents affiche chaque domaine, adresse et état. **Active** signifie que la protection est active, que la propriété/la délégation est vérifiée et que le DNS est routé vers l’edge WebSOC. **DNS pending** signifie que la vérification a réussi, mais que le trafic n’est pas encore routé. **Delegation not verified** et **Paused** figurent également parmi les états.

## 3. Choisir des agents et afficher le trafic

1. Ouvrez **Data source selection**.
2. Cochez une ou plusieurs lignes d’agents pour inclure ces services dans les métriques du tableau de bord. Le bouton indique le nombre d’agents sélectionnés.
3. Dans le sélecteur de métrique à droite, choisissez **RPS** (requêtes par seconde), **Bandwidth** ou **Active Users**. Survolez un pays sur le globe pour afficher le détail par domaine.
4. Ouvrez le graphique avec la flèche en bas au centre pour consulter le **Server Load Chart** et les résumés des principaux pays. Choisissez une période ; sélectionnez une section du graphique pour limiter les résumés à cette période.

## 4. Configurer, suspendre, reprendre ou supprimer un agent

Ouvrez **Data source selection** et utilisez les commandes sur la ligne d’un agent :

- L’icône crayon ouvre **Agent Configuration**. Modifiez l’adresse, choisissez les ports autorisés (22, 80 et/ou 443), activez ou désactivez l’authentification à deux facteurs, puis sélectionnez **Save**.
- L’icône document ouvre **Domain setup details**. Consultez la délégation DNS, le routage, le type de service et l’état du certificat TLS. TLS désigne la connexion chiffrée utilisée par les sites web.
- L’icône d’actualisation vérifie la propriété et la délégation DNS.
- Les utilisateurs disposant du rôle approprié peuvent suspendre la protection avec l’icône pause ou la reprendre avec l’icône lecture. La suspension depuis le tableau de bord dure 60 minutes.
- Sélectionnez la corbeille et confirmez pour supprimer l’agent de votre compte.

## 5. Examiner les incidents et alertes de sécurité

Sélectionnez **Incidents** à gauche du tableau de bord pour consulter les journaux d’événements. Filtrez par source, gravité, type d’événement, adresse IP ou période. La liste est paginée ; utilisez les commandes d’export disponibles pour télécharger les journaux correspondants.

Lorsqu’une alerte de sécurité nécessite une action, examinez le résumé de l’attaque, l’indicateur IP et la durée suggérée. Vous pouvez bloquer pour l’une des durées proposées ou jusqu’à une heure de fin personnalisée, autoriser la source (après confirmation), ou faire remonter l’alerte. Ces choix s’appliquent à l’alerte affichée.

## 6. Gérer les règles d’accès IP

Ouvrez le contrôle d’accès shield/IP à gauche du tableau de bord. Utilisez **Add rule** pour choisir les détails de la règle et l’enregistrer. Les commandes de ce panneau permettent de consulter et de supprimer ou révoquer les règles existantes. Une blocklist répertorie les sources que le système doit bloquer ; ajoutez ou supprimez des codes pays avec **Add** et **Remove**.

## 7. Équipe et conformité

### Team & Access

1. Ouvrez le menu de profil et choisissez **Team & Access**.
2. Utilisez **Invite** pour saisir l’e-mail et le nom d’utilisateur d’un collègue, choisir un rôle et enregistrer.
3. Consultez les membres, modifiez leur rôle avec le sélecteur ou supprimez-les avec les actions de ligne. La page affiche aussi le journal d’audit de l’équipe.

Les rôles disponibles sont **Admin**, **Analyst** et **Viewer**. Les Admins et Analysts peuvent suspendre/reprendre les agents.

### Compliance

Choisissez **Compliance** dans la navigation principale pour consulter les résumés et états des contrôles, regroupés par référentiel. **Refresh** recharge les informations. Chaque contrôle peut afficher son état, la date du dernier contrôle, la prochaine révision et le nombre d’éléments de preuve.

## 8. Options générales d’affichage et du compte

Le bouton de menu propose le style du globe, la langue et le fuseau horaire. Le menu de profil comprend l’historique des paiements et les paramètres de facturation. Lorsque vous avez terminé, utilisez **Sign out** dans le menu de profil.

---

## Informations à confirmer

La CMC affiche une commande d’installation d’agent générée pour **Other services**, mais l’interface destinée aux utilisateurs ne contient pas la procédure complète d’installation de chaque type de service. Suivez la commande et les instructions propres au service affichées dans votre déploiement CMC ; confirmez les autres prérequis de l’hôte auprès de votre administrateur WebSOC.
