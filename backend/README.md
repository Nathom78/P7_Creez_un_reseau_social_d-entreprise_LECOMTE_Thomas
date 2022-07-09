# FORMATION DEVELOPPEUR WEB - OPEN CLASSROOMS - PROJET 6 #
# Construction d'une API sécurisée pour une application d'avis gastronomiques #
![piiquante logo](https://user-images.githubusercontent.com/94392055/160183909-35ac8aff-bd5c-40fc-bd41-495fb63dfa18.png)
### CONTEXTE ###

**Piiquante** se dédie à la **création de sauces épicées** dont les recettes sont gardées secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une **application web** dans laquelle les utilisateurs peuvent **ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres**.

L'application frontend a été développée en amont par OpenClassrooms, elle est disponible sur [ce repository](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6).

Notre mission est de développer une **API REST sécurisée** pour cette application.
<hr>

### INSTALLATION ###

Créer un dossier vide. Il contiendra le code complet du projet, regroupé dans deux dossiers : un dossier frontend et un dossier backend.

#### 1. Installation de l'application Frontend ####

Ouvrez un terminal. 
Depuis le dossier précédement créé, clonez le repository de l'application frontend avec la commande :
<pre><code>git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git frontend</code></pre>
Suivez les instructions d'installation de l'application frontend détaillées dans le document README.md.


#### 2. Installation de l'API ####

Ouvrez un nouveau terminal.
Depuis le dossier précédement créé, clonez le repository de l'API avec la commande :
<pre><code>git clone https://github.com/Nathom78/backend---P6.git backend</code></pre>

ou depuis  [ce repository](https://github.com/Nathom78/backend---P6.git)

Depuis le dossier backend, installez le gestionnaire de paquets par défaut pour l'environnement d'exécution JavaScript avec la commande :
<pre><code>npm install</code></pre>

ainsi que les packages cités en derniers.
<pre><code>npm install nom_du_package</code></pre>

#### 3. Création d'une base de données noSQL MongoDB ####

Rendez-vous sur le site de [MongoDb](https://account.mongodb.com/) et créez un compte.

Une fois le compte créé, créez votre base de données en veillant à la configurer de sorte à ce que l'utilisateur puisse exécuter l'application sur sa propre machine :
<pre>Network Access -> Allow access from anywhere</pre>

Une fois la base de données créé, vous devriez avoir :
- Un identifiant de connexion à la base de données
- Un mot de passe de connexion à la base de données
- une adresse pour accéder à la base afin de se connecter qui peux se trouver dans Deployment -> Cluster -> Connect -> connect your application : 
(de type mongodb+srv://<username>:<password>@cluster0.afknvvw.mongodb.net/<nom_de_la_database>?retryWrites=true&w=majority) où <nom_de_la_database> est le nom si une de crée manuellement sinon par defaut c'est vierge.

#### 4. Configuration des variables d'environnement ####
A la racine du dossier backend, créez un fichier .env dans lequel seront renseignés vos identifiants de connexion à MongoDB et les différentes chaînes de cryptage :

<pre><code>
non besoin PORT = 3000 par défault sinon cela dépend de votre frontend  pour que le front puisse communiquer avec l'API.

JWT_KEY="chaîne de caractères aléatoire"
EMAIL_ENCRYPTION_KEY="chaîne de caractères aléatoire"

DB_ID="identifiant de connexion à la base de données"
DB_MDP="mot de passe de connexion à la base de données"
DB_ADDRESS="adresse de la base de donné" ex: @cluster0.afknvvw.mongodb.net/nom_de_la_database?retryWrites=true&w=majority

</code></pre>

A la racine du dossier backend, créer un fichier .gitignore dans lequel vous placez les node modules, le fichier .env et le dossier /images :
<pre><code>/node_modules
.env
/images</code></pre>

Enfin, démarrez le serveur avec la commande :
<pre><code>nodemon server</code></pre>

Si tout se passe bien, les messages suivants apparaissent dans le terminal :

**Listening on port 3000**

**Connexion à MongoDB par mongoose réussie !**
<hr>

### CONTRAINTES ###

#### 8 routes à implémenter ####
- Une route **POST /api/auth/signup** permettant l'inscription d'un utilisateur
- Une route **POST /api/auth/login** permettant la connexion d'un utilisateur
- Une route **GET /api/sauces** pour l'affichage de toutes les sauces présentes dans la base de données
- Une route **GET /api/sauces/:id** pour l'affichage d'une sauce en particulier
- Une route **POST /api/sauces** pour publier une nouvelle sauce
- Une route **PUT /api/sauces/:id** pour modifier une sauce éxistante
- Une route **DELETE /api/sauces/:id** pour supprimer une sauce
- Une route **POST /api/sauces/:id/like** pour évaluer une sauce

#### Exigences de sécurité : ####
- Le **mot de passe** de l'utilisateur doit être **haché**
- L'**Authentification** doit être **renforcée** sur toutes les routes sauce requises
- Les **adresses électroniques** dans la base de données sont **uniques** et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs
- La sécurité de la base de données MongoDB ne doit **pas empêcher l'application de se lancer** sur la machine d'un utilisateur
- Un plugin Mongoose doit assurer la **remontée des erreurs** issues de la base de données
- Les **versions les plus récentes des logicels** sont utilisées avec des correctifs de sécurité actualisés
- Le contenu du **dossier images ne doit pas être téléchargé sur GitHub**

<hr>

### TECHNOLOGIES ###

#### Environnement de développement : ####

- Utilisation du runtime **Node.js**
- Utilisation du framework **Express**
- Utilisation de **MongoDB** pour l'hébergement et la gestion de la base de données

#### Packages utilisés à installer: ####

- **bcrypt :** pour le cryptage des mots de passe grâce à son algorithme unidirectionnel
- **crypto-js :** pour le cryptage du mail avant l'enregistrement dans la base de données
- **dotenv :** pour l'utilisation des variables d'environnement 
- **password-validator :** pour la vérification des mots de passe lors de l'inscription
- **jsonwebtoken :** pour créer et vérifier les tokens d'authentification
- **mongoose :** pour connecter l'application avec la base de données
- **mongoose-unique-validator :** pour assurer que deux utilisateurs ne puissent s'inscrire avec la même adresse email
- **multer :** pour la gestion des fichiers envoyés dans les requêtes
- **helmet:** Helmet vous aide à sécuriser vos applications Express en définissant divers en-têtes HTTP
- **express-mongo-sanitize:** Par défaut, $ et . les caractères sont complètement supprimés de l'entrée fournie par l'utilisateur aux endroits suivants :
// - req.body
// - req.params
// - en-têtes requis
// - req.query
- **nodemon :** afin d'éviter de devoir relancer le serveur à chaque modification (en option lancement de l'API par la commande **nodemon server**)
