## Bienvenue dans le projet Dashboard de l'entreprise **P.E.IoT** !
L'objectif de ce projet est la création d'une **application Web** sous la forme d'un **Dashboard**. Ce tableau de bord permet aux utilisateurs et administrateurs de visualiser les différentes valeurs mesurées par les capteurs présents dans leur domicile.
Chaque habitation possède des informations telles que :
- La localisation,
- Le nombre de personnes dans la maison,
- La taille du foyer.
  De plus, ces habitations sont équipées de capteurs de mesure pour :
- L'humidité,
- La pollution de l'air,
- La température.
  Ces capteurs ont pour but de sensibiliser les utilisateurs à la qualité
  de l'environnement dans lequel ils évoluent. Ainsi, ils pourront adapter
  leur mode de vie afin d'améliorer leur bien-être et réduire leur impact
  sur l'écosystème.
  Grâce aux informations fournies par le Dashboard, les
  utilisateurs pourront prendre des décisions éclairées pour optimiser la
  gestion de leur habitat et contribuer à un environnement plus sain.
### Structure du Projet
Ce projet est divisé en deux parties distinctes :
- **Front-end :** Cette partie est dédiée à l'interface utilisateur du
  Dashboard. Elle offre une expérience conviviale et intuitive pour
  visualiser les données des capteurs de manière claire et compréhensible.
- **Back-end :** Cette section gère la logique métier du Dashboard.
  Elle s'occupe du traitement et de la gestion des
  données provenant des capteurs, garantissant ainsi un fonctionnement
  fluide et efficace de l'application.
  Le projet est structuré autour de deux répertoires principaux :
  "server" dédié au back-end et "web" consacré au front-end.
  Voici une vue d'ensemble de la structure du projet :
```shell
├── node_modules
├── rules
├── server
├── web
└── readme.md
```
### Getting started
Pour lancer le serveur et le front-end, veuillez suivre les instructions ci-dessous dans deux terminaux distincts :
> Lancer le serveur
>
    1. `cd server`
    2. `npm install`
    3. `npm run start`
> Lancer l'interface
>
    1. `cd web` 
    2. `npm install`
    3. `npm run dev`
## Front-end
La partie front-end est la partie visible par l'utilisateur.
Elle utilise [React](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) pour créer des composants réutilisables,
Nous utilisons la bibliothèque Recharts pour concevoir divers widgets
graphiques, fournissant ainsi à l'utilisateur une visualisation rapide
de l'état de son quotidien.
### Pages du Front-end
Le projet comporte trois pages distinctes :
> **Page d'accueil** (Login) :
La page d'accueil permet de se connecter avec son compte à notre
application à l'aide d'une adresse email et d'un mot de passe.
> **Page principale** (Client) :

Une fois connecté, l'utilisateur peut visualiser les données de ses capteurs :
- L'humidité,
- La température,
- La pollution de l'air,
- La météo du jour et du lendemain.
  Tous ces capteurs et ces données seront chargés à l'aide de requêtes à la base de données.
  Cet espace se décompose en 4 pages avec un accès global et trois pages dédiées
  aux mesures selon le type du capteur (humidité, température, pollution de l'air).
> **Page d'administration** (Admin) :
La page administrateur permet de gérer les utilisateurs et leurs capteurs.
Cette interface inclus des fonctionnalités CRUD (Créer, Lire, Modifier, Supprimer) pour les utilisateurs et les capteurs.
Il est donc possible :
- D'ajouter un utilisateur,
- De supprimer un utilisateur,
- De gérer les capteurs d'un utilisateur :
    - Ajouter
    - Modifier
    - Supprimer
      De plus, les administrateurs ont accès à une page statistiques donnant des informations sur le nombre de
      personnes touchées selon leur pays et la disparité des tailles de maisons.
      Ainsi, il peut en être déduit d'autres données avec un regard plus poussé comme la part de personnes touchées selon
      la taille du foyer étant souvent un indicateur de richesse).
## Back-end
Le back-end expose une API REST permettant d'accéder aux données nécessaires aux widgets du front-end. Il est réalisé
avec le framework [ExpressJS](https://expressjs.com/fr/) et implémente les opérations CRUD pour gérer les données stockées dans une base de
données [MongoDB](https://www.mongodb.com/fr-fr).

Pour MongoDB, nous avons utilisé un compte personnel pour s'y connecter. Il faut donc préciser l'autorisation pour chaque adresse IP et lancer la connection. Cette base de
données comporte 3 collections, sensor, measure et user.
## Wireframe
Nous avons créé un [wireframe](https://www.figma.com/file/SC6KIVX94aw5RdwBDXK77z/Projet-WEb-ing4?type=design&node-id=0%3A1&mode=design&t=nIGYMTfib3y61ArQ-1) de notre site à l'aide de Figma. Ce wireframe nous a permis de conceptualiser
à la fois l'expérience utilisateur (UX) et l'interface utilisateur (UI)
## Organisation
Pour l'organisation des tâches, Monday a été utilisé.
## Informations
Vous pourrez trouver un lien vidéo de présentation du projet [ici](https://youtu.be/raiVOQ_8SNw)

Il peut y avoir des interférences en utilisant git, en effet le fichier package-lock.json se voit convertir les LF en CRLF.
Ce qui peut entraîner un dysfonctionnement de lecture selon le système d'exploitation.

Réalisatrice du projet : Isabelle Bricaud

## Sources  
- [Mongo DB Documentation](https://www.mongodb.com/docs/)
- [Geeks for Geeks](https://www.geeksforgeeks.org/reactjs-usenavigate-hook/)
