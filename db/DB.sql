CREATE DATABASE  IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop`;
-- MySQL dump 10.13  Distrib 8.3.0, for macos14 (arm64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `ProdId` int DEFAULT NULL,
  `ProdName` varchar(255) DEFAULT NULL,
  `prodDescription` varchar(255) DEFAULT NULL,
  `prodPrice` double(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'Apple iPhone 13','The latest iPhone model with advanced features',999.99),(2,'Samsung Galaxy S21','High-performance Android smartphone',799.99),(3,'Sony PlayStation 5','Next-gen gaming console with stunning graphics',499.99),(4,'Apple MacBook Pro','Powerful laptop for professionals and creatives',1499.99),(5,'Dell XPS 13','Slim and lightweight laptop with impressive performance',1199.99),(6,'Canon EOS Rebel T7i','Versatile DSLR camera for photography enthusiasts',699.99),(7,'Sony Alpha A7 III','Mirrorless camera with exceptional low-light performance',1999.99),(8,'Bose QuietComfort 35 II','Wireless noise-canceling headphones for immersive audio',349.99),(9,'Apple AirPods Pro','True wireless earbuds with active noise cancellation',249.99),(10,'Samsung 55\" QLED 4K Smart TV','Ultra-high-definition smart TV with vibrant colors',1299.99),(1,'Apple iPhone 13','The latest iPhone model with advanced features',999.99),(2,'Samsung Galaxy S21','High-performance Android smartphone',799.99),(3,'Sony PlayStation 5','Next-gen gaming console with stunning graphics',499.99),(4,'Apple MacBook Pro','Powerful laptop for professionals and creatives',1499.99),(5,'Dell XPS 13','Slim and lightweight laptop with impressive performance',1199.99),(6,'Canon EOS Rebel T7i','Versatile DSLR camera for photography enthusiasts',699.99),(7,'Sony Alpha A7 III','Mirrorless camera with exceptional low-light performance',1999.99),(8,'Bose QuietComfort 35 II','Wireless noise-canceling headphones for immersive audio',349.99),(9,'Apple AirPods Pro','True wireless earbuds with active noise cancellation',249.99),(10,'Samsung 55\" QLED 4K Smart TV','Ultra-high-definition smart TV with vibrant colors',1299.99);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Firstname` varchar(255) DEFAULT NULL,
  `Lastname` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (47,'John','Doe','johndoe','john@example.com','password123'),(48,'Jane','Smith','janesmith','jane@example.com','letmein123'),(49,'Alice','Johnson','alicejohnson','alice@example.com','securepassword'),(50,'Bob','Brown','bobbrown','bob@example.com','mypassword'),(51,'Emily','Davis','emilydavis','emily@example.com','password1234');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-21 18:24:48
