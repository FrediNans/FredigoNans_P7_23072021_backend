-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania_development
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,3,1,'Je compatis ...','2021-08-23 08:12:22','2021-08-23 08:12:22'),(2,5,2,'Je m\'occupe du dessert, je suis le roi de la tarte au citron !!!','2021-08-23 08:19:29','2021-08-23 08:19:29'),(3,5,1,'Moi le lundi j\'ai la pêche !!! ;)','2021-08-23 08:20:14','2021-08-23 08:20:14'),(4,2,3,'J\'aimerai bien mais j\'ai pas de moto..... Ni le permis d\'ailleurs :p','2021-08-23 08:24:09','2021-08-23 08:24:09'),(5,2,2,'J\'habite trop loin désolé :(','2021-08-23 08:25:13','2021-08-23 08:25:13'),(6,6,3,'Dispo, mais que samedi :) ','2021-08-23 08:28:43','2021-08-23 08:28:43'),(7,6,2,'Je peu aider a préparer mais je suis un peu une quiche en cuisine lol !','2021-08-23 08:29:46','2021-08-23 08:29:46'),(8,4,4,'trop content pour toi :)','2021-08-23 08:31:27','2021-08-23 08:31:27'),(9,4,3,'Je viens d\'acheter une ducat !!!! Avec grand plaisir !!!','2021-08-23 08:32:15','2021-08-23 08:32:15'),(10,4,1,'Oui vivement vendredi :)','2021-08-23 08:33:00','2021-08-23 08:33:00'),(11,4,2,'Je m\'occupe de la bière !!!!!!!','2021-08-23 08:33:51','2021-08-23 08:33:51');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `publications`
--

LOCK TABLES `publications` WRITE;
/*!40000 ALTER TABLE `publications` DISABLE KEYS */;
INSERT INTO `publications` VALUES (1,7,'C\'est lundi ......','',0,'http://localhost:8080/images/100.webp1629706288402.webp','2021-08-23 08:11:28','2021-08-23 08:11:28'),(2,3,'Hello, un petit coup de main ','J\'organise un barbecue entre collègues sur Nantes, nous sommes déjà 28 participants. Si quelques cuisiniers amateurs  veulent se joindre à moi ce serai fort sympathique :) !!!',0,NULL,'2021-08-23 08:16:05','2021-08-23 08:16:05'),(3,5,'Salut les Groupoworkers !!!!','Du monde pous un tour en bécanne ce week ?',0,'http://localhost:8080/images/téléchargement.jpg1629706921250.jpg','2021-08-23 08:22:01','2021-08-23 08:22:01'),(4,6,'Enfin eu mon augmentation !!!!','Trop contente !',0,'http://localhost:8080/images/200.webp1629707285786.webp','2021-08-23 08:28:05','2021-08-23 08:28:05'),(5,4,'Un bowling ce weekend ?','',0,'http://localhost:8080/images/200_(1).webp1629707901593.webp','2021-08-23 08:38:21','2021-08-23 08:38:21'),(6,1,'Bienvenu sur le réseau social de Groupomania !','Ici on peut parler de tout et de rien mais toujours dans le respect des autres !!! ',0,'http://localhost:8080/images/giphy_(1).gif1629708071674.gif','2021-08-23 08:41:11','2021-08-23 08:41:11');
/*!40000 ALTER TABLE `publications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210726112315-create-user.js'),('20210806082050-create-publication.js'),('20210817094519-create-comment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'groupomania.moderator@mail.com','Modérateur','groupomania','$2b$10$SgdSyGqYa38fNXgC3MY43eVoU7gYw.q2ozwFYsxs6dWqNt.NGUIAm',NULL,1,'2021-08-20 09:36:00','2021-08-22 13:43:53'),(2,'jean@mail.com','dupont','jean','$2b$10$eEjFRYH5QwGVXWXEGTYpoOSewRlA2dCqniTaiwf9uQZCnn0aPrs/a','centre',0,'2021-08-21 14:11:25','2021-08-21 14:11:25'),(3,'pierre@mail.com','ponce','pierre','$2b$10$ipYVvWUF1kJih.cEKJ0QOesIDB/6x0Xp6Sz50d3XySc6/d1lha9e2','centre',0,'2021-08-23 07:05:27','2021-08-23 07:05:27'),(4,'denis@mail.com','lamalice','denis','$2b$10$VV1UwEBY.jdu9CRKuiHiWe7LZKLMQu5cFLQnJ/Ja3SySUhjPixqfO','est',0,'2021-08-23 07:06:30','2021-08-23 07:06:30'),(5,'edouard@mail.com','bracame','edouard','$2b$10$yALOTGxQqFvQ3Rp3yb62C..iR3weDZ5J5GQYU4o606Lvqz2EtFzMm','bourgogne',0,'2021-08-23 07:08:59','2021-08-23 07:08:59'),(6,'irene@mail.com','lamurene','irene','$2b$10$PyPl6YCtZo.B2DvoHpz.deXWCKVK/VDi7AecZaXZoR7iSsPJg6bG6','paris',0,'2021-08-23 07:40:54','2021-08-23 07:40:54'),(7,'lisa@mail.com','durand','lisa ','$2b$10$9v0mP0QalomK8rTfK2tpL.b4BKuu9sc6T/A2t3y5DWSCCOxczAy4y','centre',0,'2021-08-23 07:43:22','2021-08-23 07:43:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-23 11:48:24
