-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 167.99.229.86    Database: sema
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

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
-- Table structure for table `Schools List and Report`
--

DROP TABLE IF EXISTS `Schools List and Report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Schools List and Report` (
  `Kiosk` text,
  `Contact Name` text,
  `Number of Students` int(11) DEFAULT NULL,
  `GPS Coordinates` text,
  `What3Words` text,
  `Customer Type` text,
  `Sales Channel` text,
  `Total Gallons 2017` text,
  `New` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `crud_users`
--

DROP TABLE IF EXISTS `crud_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crud_users` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `permissions` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_account`
--

DROP TABLE IF EXISTS `customer_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_account` (
  `id` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL,
  `address` longtext,
  `contact_name` varchar(255) NOT NULL,
  `customer_type_id` bigint(20) NOT NULL,
  `due_amount` double NOT NULL,
  `gps_coordinates` varchar(255) DEFAULT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `serviceable_customer_base` bigint(20) DEFAULT NULL,
  `what3words` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `multimedia1` varchar(255) DEFAULT NULL,
  `multimedia2` varchar(255) DEFAULT NULL,
  `multimedia3` varchar(255) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`kiosk_id`,`contact_name`),
  KEY `FK3FEDF2CC303F70BE` (`customer_type_id`),
  KEY `FK3FEDF2CC6413D753` (`kiosk_id`),
  CONSTRAINT `FK3FEDF2CC303F70BE` FOREIGN KEY (`customer_type_id`) REFERENCES `customer_type` (`id`),
  CONSTRAINT `FK3FEDF2CC6413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_account_sponsors`
--

DROP TABLE IF EXISTS `customer_account_sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_account_sponsors` (
  `customer_account_id` varchar(255) NOT NULL,
  `sponsor_id` varchar(255) NOT NULL,
  PRIMARY KEY (`customer_account_id`,`sponsor_id`),
  KEY `FKA1CB4ACA462EED6` (`customer_account_id`),
  KEY `FKA1CB4AC17D4B373` (`sponsor_id`),
  CONSTRAINT `FKA1CB4AC17D4B373` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsor` (`id`),
  CONSTRAINT `FKA1CB4ACA462EED6` FOREIGN KEY (`customer_account_id`) REFERENCES `customer_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_account_temp`
--

DROP TABLE IF EXISTS `customer_account_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_account_temp` (
  `id` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL,
  `address` longtext,
  `contact_name` varchar(255) NOT NULL,
  `customer_type_id` bigint(20) NOT NULL,
  `due_amount` double NOT NULL,
  `gps_coordinates` varchar(255) DEFAULT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `serviceable_customer_base` bigint(20) DEFAULT NULL,
  `what3words` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`kiosk_id`,`contact_name`),
  KEY `FK3FEDF2CC303F70BE` (`customer_type_id`),
  KEY `FK3FEDF2CC6413D753` (`kiosk_id`),
  CONSTRAINT `FK3FEDF2CC303F70BE_customer_account_temp` FOREIGN KEY (`customer_type_id`) REFERENCES `customer_type` (`id`),
  CONSTRAINT `FK3FEDF2CC6413D753_customer_account_temp` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_type`
--

DROP TABLE IF EXISTS `customer_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `FK803B02FB5864D8AF` (`parent_id`),
  CONSTRAINT `FK803B02FB5864D8AF` FOREIGN KEY (`parent_id`) REFERENCES `customer_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `delivery_agent_id` bigint(20) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK31151BF46413D753` (`kiosk_id`),
  KEY `FK31151BF4569B1D2A` (`delivery_agent_id`),
  CONSTRAINT `FK31151BF4569B1D2A` FOREIGN KEY (`delivery_agent_id`) REFERENCES `delivery_agent` (`id`),
  CONSTRAINT `FK31151BF46413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delivery_agent`
--

DROP TABLE IF EXISTS `delivery_agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_agent` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKA8A8FAFA6413D753` (`kiosk_id`),
  CONSTRAINT `FKA8A8FAFA6413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delivery_configuration`
--

DROP TABLE IF EXISTS `delivery_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_configuration` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `default_value` int(11) NOT NULL,
  `gallons` float NOT NULL,
  `maximum_value` int(11) NOT NULL,
  `minimum_value` int(11) NOT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delivery_configuration_bkp`
--

DROP TABLE IF EXISTS `delivery_configuration_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_configuration_bkp` (
  `id` bigint(20) NOT NULL DEFAULT '0',
  `version` bigint(20) NOT NULL,
  `default_value` int(11) NOT NULL,
  `gallons` int(11) NOT NULL,
  `maximum_value` int(11) NOT NULL,
  `minimum_value` int(11) NOT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivers` (
  `driver_id` int(11) NOT NULL AUTO_INCREMENT,
  `kiosk_id` bigint(20) NOT NULL,
  `driver_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`driver_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kiosk`
--

DROP TABLE IF EXISTS `kiosk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kiosk` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `region_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `FK6153CE9E073EA21` (`region_id`),
  CONSTRAINT `FK6153CE9E073EA21` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kiosk_wise_parameter`
--

DROP TABLE IF EXISTS `kiosk_wise_parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kiosk_wise_parameter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `kiosk_id` bigint(20) NOT NULL,
  `parameter_id` bigint(20) NOT NULL,
  `sampling_site_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sampling_site_id` (`sampling_site_id`,`kiosk_id`,`parameter_id`),
  KEY `FK641883E433059AD3` (`parameter_id`),
  KEY `FK641883E46413D753` (`kiosk_id`),
  KEY `FK641883E48DF0B430` (`sampling_site_id`),
  CONSTRAINT `FK641883E433059AD3` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`id`),
  CONSTRAINT `FK641883E46413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`),
  CONSTRAINT `FK641883E48DF0B430` FOREIGN KEY (`sampling_site_id`) REFERENCES `sampling_site` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=849 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kiosk_wise_parameter_clone`
--

DROP TABLE IF EXISTS `kiosk_wise_parameter_clone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kiosk_wise_parameter_clone` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `kiosk_id` bigint(20) NOT NULL,
  `parameter_id` bigint(20) NOT NULL,
  `sampling_site_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sampling_site_id` (`sampling_site_id`,`kiosk_id`,`parameter_id`),
  KEY `FK641883E433059AD3` (`parameter_id`),
  KEY `FK641883E46413D753` (`kiosk_id`),
  KEY `FK641883E48DF0B430` (`sampling_site_id`)
) ENGINE=InnoDB AUTO_INCREMENT=676 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `measurement`
--

DROP TABLE IF EXISTS `measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `measurement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `parameter_id` bigint(20) NOT NULL,
  `reading_id` bigint(20) NOT NULL,
  `value` decimal(19,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK93F2DBBC33059AD3` (`parameter_id`),
  KEY `FK93F2DBBCABB2A633` (`reading_id`),
  CONSTRAINT `FK93F2DBBC33059AD3` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`id`),
  CONSTRAINT `FK93F2DBBCABB2A633` FOREIGN KEY (`reading_id`) REFERENCES `reading` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=232303 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parameter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `is_ok_not_ok` bit(1) NOT NULL,
  `is_used_in_totalizer` bit(1) NOT NULL,
  `manual` bit(1) NOT NULL,
  `maximum` decimal(19,2) DEFAULT NULL,
  `minimum` decimal(19,2) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `priority` int(11) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment_history`
--

DROP TABLE IF EXISTS `payment_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `customer_account_id` varchar(255) NOT NULL,
  `payment_date` datetime NOT NULL,
  `receipt_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9034575BB099F6B3` (`receipt_id`),
  KEY `FK9034575BA462EED6` (`customer_account_id`),
  CONSTRAINT `FK9034575BB099F6B3` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=175264 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `base64encoded_image` longtext NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `gallons` float NOT NULL,
  `maximum_quantity` int(11) DEFAULT NULL,
  `minimum_quantity` int(11) DEFAULT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `FKED8DCCEF74288202` (`category_id`),
  CONSTRAINT `FKED8DCCEF74288202` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=553 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_bkp`
--

DROP TABLE IF EXISTS `product_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_bkp` (
  `id` bigint(20) NOT NULL DEFAULT '0',
  `version` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `base64encoded_image` longtext NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `gallons` int(11) NOT NULL,
  `maximum_quantity` int(11) DEFAULT NULL,
  `minimum_quantity` int(11) DEFAULT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_mrp`
--

DROP TABLE IF EXISTS `product_mrp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_mrp` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `sales_channel_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sales_channel_id` (`sales_channel_id`,`kiosk_id`,`product_id`),
  KEY `FKA71C941B6413D753` (`kiosk_id`),
  KEY `FKA71C941BB9F6E753` (`product_id`),
  KEY `FKA71C941B54B1E8E8` (`sales_channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4442 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_mrp_bad`
--

DROP TABLE IF EXISTS `product_mrp_bad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_mrp_bad` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `sales_channel_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sales_channel_id` (`sales_channel_id`,`kiosk_id`,`product_id`),
  KEY `FKA71C941B6413D753` (`kiosk_id`),
  KEY `FKA71C941BB9F6E753` (`product_id`),
  KEY `FKA71C941B54B1E8E8` (`sales_channel_id`),
  CONSTRAINT `FKA71C941B54B1E8E8` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`),
  CONSTRAINT `FKA71C941B6413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`),
  CONSTRAINT `FKA71C941BB9F6E753` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3043 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_mrp_master_bkp`
--

DROP TABLE IF EXISTS `product_mrp_master_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_mrp_master_bkp` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `sales_channel_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sales_channel_id` (`sales_channel_id`,`kiosk_id`,`product_id`),
  KEY `FKA71C941B6413D753` (`kiosk_id`),
  KEY `FKA71C941BB9F6E753` (`product_id`),
  KEY `FKA71C941B54B1E8E8` (`sales_channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3043 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_mrp_new_kiosk`
--

DROP TABLE IF EXISTS `product_mrp_new_kiosk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_mrp_new_kiosk` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `price_amount` decimal(19,2) NOT NULL,
  `price_currency` varchar(255) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `sales_channel_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sales_channel_id` (`sales_channel_id`,`kiosk_id`,`product_id`),
  KEY `FKA71C941B6413D753` (`kiosk_id`),
  KEY `FKA71C941BB9F6E753` (`product_id`),
  KEY `FKA71C941B54B1E8E8` (`sales_channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2923 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `amount` decimal(19,2) NOT NULL,
  `applies_to` varchar(255) NOT NULL,
  `base64encoded_image` longtext NOT NULL,
  `end_date` datetime NOT NULL,
  `product_sku` varchar(255) DEFAULT NULL,
  `sku` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reading`
--

DROP TABLE IF EXISTS `reading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reading` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `sampling_site_id` bigint(20) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4065CE8C6413D753` (`kiosk_id`),
  KEY `FK4065CE8C8DF0B430` (`sampling_site_id`),
  CONSTRAINT `FK4065CE8C6413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`),
  CONSTRAINT `FK4065CE8C8DF0B430` FOREIGN KEY (`sampling_site_id`) REFERENCES `sampling_site` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44147 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rebate`
--

DROP TABLE IF EXISTS `rebate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rebate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `base64encoded_image` longtext,
  `name` varchar(255) NOT NULL,
  `no_of_free_skus` varchar(255) NOT NULL,
  `no_of_skus` int(11) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `FKC845C3A3B9F6E753` (`product_id`),
  CONSTRAINT `FKC845C3A3B9F6E753` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `currency_code` varchar(255) NOT NULL,
  `customer_account_id` varchar(255) NOT NULL,
  `customer_amount` decimal(19,2) DEFAULT NULL,
  `delivery_time` varchar(255) DEFAULT NULL,
  `is_sponsor_selected` bit(1) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `payment_mode` varchar(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `sales_channel_id` bigint(20) NOT NULL,
  `sponsor_id` varchar(255) DEFAULT NULL,
  `sponsor_amount` decimal(19,2) DEFAULT NULL,
  `total` decimal(19,2) NOT NULL,
  `total_gallons` float DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK408272386413D753` (`kiosk_id`),
  KEY `FK40827238A462EED6` (`customer_account_id`),
  KEY `FK4082723817D4B373` (`sponsor_id`),
  KEY `FK4082723854B1E8E8` (`sales_channel_id`),
  KEY `uuid_Idx` (`uuid`),
  CONSTRAINT `FK4082723817D4B373` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsor` (`id`),
  CONSTRAINT `FK4082723854B1E8E8` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`),
  CONSTRAINT `FK408272386413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=225286 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receipt_bkp`
--

DROP TABLE IF EXISTS `receipt_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt_bkp` (
  `id` bigint(20) NOT NULL DEFAULT '0',
  `version` bigint(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `currency_code` varchar(255) NOT NULL,
  `customer_account_id` varchar(255) NOT NULL,
  `customer_amount` decimal(19,2) DEFAULT NULL,
  `delivery_time` varchar(255) DEFAULT NULL,
  `is_sponsor_selected` bit(1) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `payment_mode` varchar(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `sales_channel_id` bigint(20) NOT NULL,
  `sponsor_id` varchar(255) DEFAULT NULL,
  `sponsor_amount` decimal(19,2) DEFAULT NULL,
  `total` decimal(19,2) NOT NULL,
  `total_gallons` int(11) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receipt_line_item`
--

DROP TABLE IF EXISTS `receipt_line_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt_line_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `currency_code` varchar(255) NOT NULL,
  `gallons` float NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `receipt_id` bigint(20) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `receipt_line_items_idx` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKABD16337B099F6B3` (`receipt_id`),
  CONSTRAINT `FKABD16337B099F6B3` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=255356 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receipt_line_item_bkp`
--

DROP TABLE IF EXISTS `receipt_line_item_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt_line_item_bkp` (
  `id` bigint(20) NOT NULL DEFAULT '0',
  `version` bigint(20) NOT NULL,
  `currency_code` varchar(255) NOT NULL,
  `gallons` int(11) NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `receipt_id` bigint(20) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `receipt_line_items_idx` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `country_id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `FKC84826F4605E91F3` (`country_id`),
  CONSTRAINT `FKC84826F4605E91F3` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region_promotions`
--

DROP TABLE IF EXISTS `region_promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region_promotions` (
  `promotion_id` bigint(20) NOT NULL,
  `region_id` bigint(20) NOT NULL,
  PRIMARY KEY (`region_id`,`promotion_id`),
  KEY `FKEAB6A65B5F724093` (`promotion_id`),
  KEY `FKEAB6A65BE073EA21` (`region_id`),
  CONSTRAINT `FKEAB6A65B5F724093` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  CONSTRAINT `FKEAB6A65BE073EA21` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region_rebates`
--

DROP TABLE IF EXISTS `region_rebates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region_rebates` (
  `rebate_id` bigint(20) NOT NULL,
  `region_id` bigint(20) NOT NULL,
  PRIMARY KEY (`region_id`,`rebate_id`),
  KEY `FK46FE4AE5CA8DF7C1` (`rebate_id`),
  KEY `FK46FE4AE5E073EA21` (`region_id`),
  CONSTRAINT `FK46FE4AE5CA8DF7C1` FOREIGN KEY (`rebate_id`) REFERENCES `rebate` (`id`),
  CONSTRAINT `FK46FE4AE5E073EA21` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `authority` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `authority` (`authority`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_channel`
--

DROP TABLE IF EXISTS `sales_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_channel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `delayed_delivery` bit(1) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount_amount` decimal(19,2) DEFAULT NULL,
  `discount_type` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_channel_customer_accounts`
--

DROP TABLE IF EXISTS `sales_channel_customer_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_channel_customer_accounts` (
  `customer_account_id` varchar(255) NOT NULL,
  `sales_channel_id` bigint(20) NOT NULL,
  PRIMARY KEY (`sales_channel_id`,`customer_account_id`),
  KEY `FK2F345D78A462EED6` (`customer_account_id`),
  KEY `FK2F345D7854B1E8E8` (`sales_channel_id`),
  CONSTRAINT `FK2F345D7854B1E8E8` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sampling_site`
--

DROP TABLE IF EXISTS `sampling_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sampling_site` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `followup_to_site_id` bigint(20) DEFAULT NULL,
  `is_used_for_totalizer` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKED08A09FA6ADD2D7` (`followup_to_site_id`),
  CONSTRAINT `FKED08A09FA6ADD2D7` FOREIGN KEY (`followup_to_site_id`) REFERENCES `sampling_site` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schools`
--

DROP TABLE IF EXISTS `schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schools` (
  `id` varchar(255) NOT NULL,
  `address` longtext,
  `contact_name` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `kiosk_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sensor`
--

DROP TABLE IF EXISTS `sensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `parameter_id` bigint(20) NOT NULL,
  `sampling_site_id` bigint(20) NOT NULL,
  `sensor_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sensor_id` (`sensor_id`),
  KEY `FKCA0053BA33059AD3` (`parameter_id`),
  KEY `FKCA0053BA6413D753` (`kiosk_id`),
  KEY `FKCA0053BA8DF0B430` (`sampling_site_id`),
  CONSTRAINT `FKCA0053BA33059AD3` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`id`),
  CONSTRAINT `FKCA0053BA6413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`),
  CONSTRAINT `FKCA0053BA8DF0B430` FOREIGN KEY (`sampling_site_id`) REFERENCES `sampling_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sponsor`
--

DROP TABLE IF EXISTS `sponsor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsor` (
  `id` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kiosk_id` (`kiosk_id`,`name`),
  KEY `FK88DB531A6413D753` (`kiosk_id`),
  CONSTRAINT `FK88DB531A6413D753` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tmp_customer`
--

DROP TABLE IF EXISTS `tmp_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tmp_customer` (
  `id` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL,
  `address` longtext,
  `contact_name` varchar(255) NOT NULL,
  `customer_type_id` bigint(20) NOT NULL,
  `due_amount` double NOT NULL,
  `gps_coordinates` varchar(255) DEFAULT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `serviceable_customer_base` bigint(20) DEFAULT NULL,
  `what3words` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `multimedia1` varchar(255) DEFAULT NULL,
  `multimedia2` varchar(255) DEFAULT NULL,
  `multimedia3` varchar(255) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`kiosk_id`,`contact_name`),
  KEY `FK3FEDF2CC303F70BE` (`customer_type_id`),
  KEY `FK3FEDF2CC6413D753` (`kiosk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip` (
  `trip_id` int(11) NOT NULL AUTO_INCREMENT,
  `trip_date` date NOT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `depart_kiosk` time DEFAULT NULL,
  `return_kiosk` time DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `FK_Trip_Kiosk_idx` (`kiosk_id`),
  KEY `fk_trip_drivers_idx` (`driver_id`),
  KEY `fk_trip_vehicles` (`vehicle_id`),
  CONSTRAINT `fk_trip_drivers` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`driver_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_kiosk` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_vehicles` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=504 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trip_details`
--

DROP TABLE IF EXISTS `trip_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip_details` (
  `trip_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `trip_id` int(11) NOT NULL,
  `customer_account_id` varchar(255) NOT NULL,
  `gallons_delivered` double DEFAULT NULL,
  `empty_jug_pickup` int(11) DEFAULT NULL,
  `customer_arrive` time DEFAULT NULL,
  `customer_depart` time DEFAULT NULL,
  `receipt_id` bigint(20) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `jugs_delivered` double DEFAULT NULL,
  `gallons_per_jug` int(11) DEFAULT '5',
  PRIMARY KEY (`trip_detail_id`),
  UNIQUE KEY `trip_detail_id_UNIQUE` (`trip_detail_id`),
  KEY `FK_TripDetails_Customer_account_idx` (`customer_account_id`),
  KEY `fk_trip_details_trip` (`trip_id`),
  CONSTRAINT `fk_trip_details_customer_account` FOREIGN KEY (`customer_account_id`) REFERENCES `customer_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_details_trip` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`trip_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1527 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `role_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  KEY `role_id` (`role_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_user_role_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `type` varchar(20) CHARACTER SET utf8 NOT NULL,
  `license` varchar(10) DEFAULT NULL,
  `kiosk_id` bigint(20) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  KEY `fk_vehicles_kiosk_idx` (`kiosk_id`),
  CONSTRAINT `fk_vehicles_kiosk` FOREIGN KEY (`kiosk_id`) REFERENCES `kiosk` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-18 13:18:19
