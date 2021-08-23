# FredigoNans_P7_23072021_backend

## Installation:   

$ npm install    
$ nodemon server    

Listening on port 8080   

## Création BDD 

Dans le dossier config fichier config.json remplacer username et password mysql par les votres

$ sequelize db:migrate    

J'ai créer quelques utilisateurs et posts pour meubler le projet, les fichiers .sql se trouve dans le dossier Dump.

Dans le dump j'ai creer un compte admin.

voici les logs:     
* email: groupomania.moderator@mail.com       
* mdp: antidefisinus1229     

Pour donner les droits d'admin a un utilisateur.
ligne de commande mysql:     

* UPDATE `users` SET `isAdmin`=true WHERE `email`=email de l'utilisateur;
* pour les retirer repasser isAdmin a false.      






