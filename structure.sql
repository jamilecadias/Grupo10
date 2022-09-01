CREATE DATABASE  IF NOT EXISTS `coffea_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `coffea_db`;
-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: coffea_db
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `origins`
--

DROP TABLE IF EXISTS `origins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `origins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origins`
--

LOCK TABLES `origins` WRITE;
/*!40000 ALTER TABLE `origins` DISABLE KEYS */;
INSERT INTO `origins` VALUES (1,'Colombia'),(2,'Brasil'),(3,'Vietnam');
/*!40000 ALTER TABLE `origins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `origin_id` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `origin_id` (`origin_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`origin_id`) REFERENCES `origins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (7,'Café Juan Valdéz Premium Selection Colombia 340g',NULL,5000,'Café liofilizado Juan Valdez es un café rico y fácil de preparar que le dará un toque cálido y tradicional a tus mañanas. Su practicidad lo convierten en el aliado perfecto cada vez que quieras disfrutar un café con sabor tradicional y sin complicaciones. ¡Llévalo y aprovecha la calidad y sabor con los que Juan Valdez sabe sorprendernos!','product-1660825285853.jpg'),(8,'Café Pilao Tradicional Brasil 500g',NULL,3500,'El café Tradicional Pilão, de intensidad 8, está disponible en la versión de vacío de 500 g, tiene un punto de tueste acentuado y un proceso de molienda fina y uniforme, que garantizan y conservan su sabor fuerte y con cuerpo. Es perfecto para tu día a día.','product-1660825340811.jpg'),(9,'Café Trung Nguyen Gourmet Blend Vietnam 500g',NULL,10000,'Trung Nguyen Gourmet Blend es una combinación cuidadosamente seleccionada de café Arábica, Robusta, Chari (o Excelsa) y Catimore. La mezcla es increíblemente fragante y llena la habitación con aromas de especias, chocolates y frutas.','product-1660825394065.jpeg'),(10,'Café La Virginia Clasico 250g',NULL,250,'Un rico cafecito! ','product-1660825448889.jpg'),(11,'Café 3 Coraçoes Tradicional 500gr',NULL,2500,'Otra opción de café brasilero. ','product-1661994096572.jpg'),(12,'Café Morenita Colombia 500g',NULL,3800,'Otró café colombiano para disfrutar.','product-1660825623862.jpg'),(13,'Café Dolca Clasico 170g',NULL,360,'Un buen café!','product-1660858351111.jpg'),(14,'Café Nescafé Clasico 200g',NULL,600,'Un café para probar! ','product-1661994114175.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'Nicolás','nico@dh.com','1234567890','$2a$10$UbogumEYaqEjzhDT40pHF.Wdkn2i8BNLBYkivQ3iiSeB/IiKxNDMO','user-1660932626684.png'),(18,'Cosme Fulanito','cosmefulanito@dh.com','no tengo!','$2a$10$3.vK/r3PHvneShM4e5W2UOA2fxcpBPYJBIt27/61Tt7Ji3go8KzXi','user-1661993854375.png');
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

-- Dump completed on 2022-08-31 22:04:01
