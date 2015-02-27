CREATE DATABASE  IF NOT EXISTS `cs-live` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `cs-live`;
-- MySQL dump 10.13  Distrib 5.6.22, for Win64 (x86_64)
--
-- Host: localhost    Database: cs-live
-- ------------------------------------------------------
-- Server version	5.6.22

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
-- Temporary view structure for view `_temp_view`
--

DROP TABLE IF EXISTS `_temp_view`;
/*!50001 DROP VIEW IF EXISTS `_temp_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `_temp_view` AS SELECT 
 1 AS `Company`,
 1 AS `Prospect`,
 1 AS `IndustryID`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `absence`
--

DROP TABLE IF EXISTS `absence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `absence` (
  `AbsenceId` int(11) NOT NULL AUTO_INCREMENT,
  `EmpID` int(11) DEFAULT NULL,
  `AbsenceTypeID` int(11) DEFAULT NULL,
  `AbsenceStatusID` int(11) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Days` decimal(4,2) DEFAULT NULL,
  `Notes` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`AbsenceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence`
--

LOCK TABLES `absence` WRITE;
/*!40000 ALTER TABLE `absence` DISABLE KEYS */;
/*!40000 ALTER TABLE `absence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `absencestatus`
--

DROP TABLE IF EXISTS `absencestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `absencestatus` (
  `AbsenceStatusID` int(11) NOT NULL DEFAULT '0',
  `AbsenceStatus` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`AbsenceStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absencestatus`
--

LOCK TABLES `absencestatus` WRITE;
/*!40000 ALTER TABLE `absencestatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `absencestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `absencettypes`
--

DROP TABLE IF EXISTS `absencettypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `absencettypes` (
  `AbsenceTypeID` int(11) NOT NULL DEFAULT '0',
  `AbsenceType` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AbsenceShortType` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`AbsenceTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absencettypes`
--

LOCK TABLES `absencettypes` WRITE;
/*!40000 ALTER TABLE `absencettypes` DISABLE KEYS */;
INSERT INTO `absencettypes` VALUES (10,'Annual Holiday','Hol'),(20,'Bank Holidays','BHol'),(30,'Absence, Doctor Certified','Abs'),(40,'Absence, Self Certified','Abs'),(50,'Absence, Other','Abs'),(60,'Birthday','BDay'),(70,'Compassionate Leave','CL'),(80,'Maternity/Paternity','MPL'),(90,'Paid Leave','PL'),(100,'Unauthorised Absence','UA');
/*!40000 ALTER TABLE `absencettypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `absencetypes`
--

DROP TABLE IF EXISTS `absencetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `absencetypes` (
  `AbsenceTypeID` int(11) NOT NULL DEFAULT '0',
  `AbsenceType` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AbsenceShortType` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`AbsenceTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absencetypes`
--

LOCK TABLES `absencetypes` WRITE;
/*!40000 ALTER TABLE `absencetypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `absencetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `ActivityID` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyID` decimal(11,0) DEFAULT NULL,
  `ContactID` decimal(11,0) DEFAULT NULL,
  `ProjectID` decimal(11,0) DEFAULT NULL,
  `UserID` decimal(11,0) DEFAULT NULL,
  `ActivityTypeID` decimal(11,0) DEFAULT NULL,
  `ActivityDate` datetime DEFAULT NULL,
  `From` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SentTo` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Activity` text COLLATE utf8_unicode_ci,
  `Body` mediumtext COLLATE utf8_unicode_ci,
  `Location` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `EmailID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ActivityID`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 5120 kB';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,3,NULL,NULL,1,2,'2014-11-28 11:09:23',NULL,NULL,'New Text Document.txt',NULL,'New Text Document.txt',NULL,NULL),(2,6,1,4,5,1,'2014-11-28 15:58:51',NULL,NULL,'Telephone conversation','We are very much on top of the application interface build so we are aiming to have this in demo form for you next week. This will be the interface itself with no functionality behind the buttons other than the page-to-page navigation.\r\n\r\nThe demo will be optimised for your chosen device but will run on other Windows devices (other than Windows mobile) so you can show it on the desktop PC for your projector, although there may well be some slight discrepancy between them.\r\n\r\nOn top of that - really as a belt-and-braces thing - we will provide a video demonstration of the screens so that if you have complete device failure (!) there will still be the opportunity to talk through the screens and the work flow.\r\n\r\nI hope that will meet your needs and I will update you again next week as we finalise this ready for your demonstration.',NULL,NULL,NULL),(3,3,NULL,NULL,2,1,'2014-11-29 19:33:35',NULL,NULL,'New Text Document.txt was deleted',NULL,NULL,NULL,NULL),(4,7,2,0,5,1,'2014-12-01 16:42:56',NULL,NULL,'Follow up email to Rob to see if he wants dates for next year',NULL,NULL,NULL,NULL),(5,0,NULL,1,7,1,'2014-12-08 11:44:36',NULL,NULL,'Project Status Changed to: Quotation Sent(waiting response)',NULL,NULL,NULL,NULL),(6,0,NULL,1,7,1,'2014-12-08 11:44:38',NULL,NULL,'Project Status Changed to: New(needs quotation)',NULL,NULL,NULL,NULL),(7,15,10,8,5,1,'2014-12-08 13:16:17',NULL,NULL,'Revised proposal requested','We read your offer and found that it was for the whole of the analysis and the project.\r\n \r\nYou may have noticed that the project is divided into two parts. The first part is regarding the client and the second part is regarding the server. The part regarding the server will be implemented by us.\r\n \r\nThus, could you please send  us an offer just for the second part regarding the client?',NULL,NULL,NULL),(8,15,10,8,5,1,'2014-12-11 10:38:13',NULL,NULL,'Internal authorisation to proceed with revised proposal','David and Steven had a conversation about the revised approach that is being taken on this project. Specifically, the Prospect is now taking on the Server side of the work.\r\n\r\nBecause the risk has increased - our solution for Client needs to integrate fully with their Server work - the proposal is to be split into 2 parts. The first part is for consultancy advice and solution proposal and the second phase is for realising the work against an agreed Functionality Spec.\r\n\r\nSteven suggested that BrightVisions may need to get involved to ensure that the Shield component operates effectively. It was also suggested that a disk-less image be rolled out to Clients which we configure. There is no suggestion that the Client has thought about either of these options and so this may well form part of our discussion with them during the first phase.\r\n\r\nWith the proviso that we ensure the project is clearly priced as indicative for phase 2 then it is OK to be drafted and can then be reviewed by PM.',NULL,NULL,NULL),(9,15,NULL,NULL,5,2,'2014-12-11 11:41:26',NULL,NULL,'Application Proposal V1.1',NULL,'application-proposal-v1-1.docx',NULL,NULL),(10,15,NULL,8,5,2,'2014-12-11 11:42:02',NULL,NULL,'Application Proposal V1.1',NULL,'application-proposal-v1-1.docx',NULL,NULL),(11,16,12,10,5,1,'2014-12-11 12:00:19',NULL,NULL,'Possible meeting to move forward on Elite','Hi Jenny,\r\n\r\nYes, sure. I can meet up with you whenever convenient. Perhaps we can meet in Cambridge, S John’s Innovation Centre and you can meet some of the team too. When would it be convenient to call you in order for us to  agree a suitable time to meet.\r\n\r\nWith regards to pricing, at the moment, similar to other companies, we price on a per user basis. Please note that this on a per user rather than concurrent user.  I hope this is OK for you.\r\n\r\nRegards,\r\n\r\nPhil',NULL,NULL,NULL),(12,0,NULL,2,5,2,'2014-12-11 13:14:46',NULL,NULL,'Application Proposal v1.0',NULL,'application-proposal-v1-0.pdf',NULL,NULL),(13,5,14,2,5,1,'2014-12-11 13:17:21',NULL,NULL,'Follow up on delivered proposal',NULL,NULL,NULL,NULL),(14,15,NULL,8,5,2,'2014-12-11 13:24:30',NULL,NULL,'Application Proposal V1.1 (Final to Customer)',NULL,'application-proposal-v1-1.pdf',NULL,NULL),(15,3,11,9,5,1,'2014-12-12 19:06:06',NULL,NULL,'On site visit to upgrade Elite','An onsite visit took place to upgrade the database, email and EliteBMS versions and add Outlook connector.\r\n\r\n** This client called EliteBMS GlobalPoint **\r\n\r\nA snag was found with the Outlook Connector involving MySQL Connector 6.9.4 which slowed us down. The work around was to manually install MySQL Connector 6.9.4 with every Outlook plugin.\r\n\r\nNot all machines were done but instructions for the remaining machines will be produced and with the help of BrightVisions the other client PCs will be migrated.',NULL,NULL,NULL),(16,3,NULL,9,5,2,'2014-12-12 19:13:26',NULL,NULL,'Onsite Report',NULL,'iij-onsite-121214.pdf',NULL,NULL),(17,17,NULL,11,5,1,'2014-12-15 07:03:37',NULL,NULL,'Project Status Changed to: Quotation Given',NULL,NULL,NULL,NULL),(18,17,15,11,5,1,'2014-12-15 07:06:40',NULL,NULL,'Application Quotation','Overview\r\nThe application will run any mainstream O/S device (iOS, Windows, Android but not Windows Mobile) and will deliver a single screen interface which your site engineers can use to record information about the hardware they are installing as well as the time that they have spent. This information is then signed off on the device both by the engineer and by the customer\\\'s site contact before being emailed.\r\n\r\nAssumptions\r\nIf you are intending to use a specific device then we try to tailor the display of the application to that device as much as possible. We would need to borrow any such device in order to do this. Otherwise, the general screen layout should fit most devices;\r\nYou want the information emailed directly from the device to a number of recipients including the customer and BV Admin. This email will be a standard template with a PDF attachment containing the information and the customer signatures;\r\nThere is no direct data-connectivity and all required information such as client email will need to be entered by the engineer;\r\nThe Operating System\\\'s native emailing system will be used to actually send the generated email.\r\nApproach\r\nWe would recommend a native application running on the device. This will give you the speed and responsiveness that is important when on client premises as well as meaning you do not need to have an internet connection as may be demanded by a web browser solution.\r\n\r\nCosts and Timeline\r\nWe would expect to deliver the completed application within 4 weeks of acceptance and at a cost of £1,650.00.\r\n\r\nWe offer a 90 day warranty on all of our work and would be able to provide support for the application based on a per user license of £10 per month.\r\n',NULL,NULL,NULL),(19,16,12,10,5,1,'2014-12-15 07:16:01',NULL,NULL,'Specification for Custom Fields ready','The technical and functional specification for the Custom Fields requirements is now completed and availabe for implementation when go ahead is given.',NULL,NULL,NULL),(20,12,7,15,5,1,'2014-12-15 13:24:41',NULL,NULL,'Prompted Alex for new WPJobBoard license key','New license has not yet been purchased so email to AC to tell him that we may no longer be able to do it today depending on when he can get it to us.',NULL,NULL,NULL),(21,11,6,18,5,1,'2014-12-16 12:19:42',NULL,NULL,'Email update to customer','Great to hear from you, thanks for giving me that update and no problem, I appreciate you\\\'re super busy.\r\n\r\nPlease do give me feedback on that latest tranche of work when you can and that will allow me to strike them off my list which would be great.\r\n\r\nIn addition, note that I am currently pending on a few updates and tweaks that I\\\'m finding on my own review of the system. I\\\'ll summarise these to you once I push them to you for preview but there shouldn\\\'t be anything too major.\r\n\r\nIn terms of shut-down we are officially away from Christmas Day until Monday January 5th. However, I\\\'m aware that this project is well overdue so am quite happy to field any feedback from you during that time so that it fits in with you. My phone may be off but my email inbox will be open :)\r\n\r\nIn terms of moving this phase to a conclusion, here\\\'s a summary of where we are:\r\nUpdates from your feedback are done and are waiting acceptance/tweaking;\r\nMy own review should be complete by the end of this week and I\\\'ll summarise these to you by email;\r\nTwo aspects are outstanding to allow us to provide a project for sign off:\r\nA key for Crafty Clicks postcode lookup;\r\nConfirmation/guidance on the setting of the membership renewal date so we can finish that bit of logic.\r\nMoving forward, we then have the following tasks:\r\nUser training manual (if required)\r\nUser training (scheduling will be required);\r\nTransfer of your data\r\nI\\\'m keen, as I am sure you are, to launch this in the New Year but also want to reassure you that the support will be available to you during post-launch period as we always have issues that could only ever have been noticed in a real operational environment.\r\n\r\nThanks again for getting in touch Sonia and I hope the above summary helps.\r\n\r\nI\\\'ll drop you a further update as soon as I can later this week.',NULL,NULL,NULL),(22,10,5,19,5,1,'2014-12-16 14:47:32',NULL,NULL,'Scrum meeting','- Selltrail implementation\r\n- Feedback document discussed in detail\r\n- Moonlight implementation to be discussed with NS\r\n- Name change on Content Groups to be allocated to Cat',NULL,NULL,NULL),(23,16,12,0,5,1,'2014-12-22 17:21:47',NULL,NULL,'Meeting with Jenny and Owen','Had meeting to explore the data fields and to hear additional functionality requirements for launch',NULL,NULL,NULL),(24,16,12,0,5,1,'2014-12-22 17:22:29',NULL,NULL,'Conversation with Jenny regarding CRM Strategy','Thanks for taking the call earlier and for talking through the CRM issues.\r\n\r\nI think it important to put the outcome of our discussion in writing but I\\\'m pleased that you feel better in yourself for the conversation and can see a good, practical way forward for your business.\r\n\r\nIt was recommended that you extend the VO license for another month or longer if you can. From what I hear it sounds as though that is well progressed. This will give you peace-of-mind for when you return to the office in January in the knowledge that you\\\'ll be dealing directly with a system you know and that your sales team understand.\r\n\r\nFrom a longer term point of view, this grace period that you\\\'ve purchased with VO will give you opportunity to do a thorough road test of OpenCRM and to hopefully switch to it. I personally think it will meet most of your urgent needs but in the long term it might prove a bit limiting. Nonetheless, check it out with a view to switching to it if/when VO licensing expires.\r\n\r\nImportantly, from an EliteBMS point of view both Phil and I are grateful for the time you have spent working with us and bringing your ways of working to the table for us to consider. We definitely would love you to become and EliteBMS customer but doing so at speed and with such a hard and close deadline will not benefit either of us.\r\n\r\nPlease do keep me informed of how you get on with VO and OpenCRM and in the meantime we\\\'ll be progressing Elite. We\\\'ll both know more in early January in terms of resource and suitability of the products for you and so we can talk more depending on how much of a fit OpenCRM is.\r\n\r\nI hope that summary helps but do feel free to pick up the phone or drop me an email if you want to talk any aspect through or if there is anything that we can directly help with.',NULL,NULL,NULL),(25,16,NULL,10,5,1,'2014-12-22 17:24:26',NULL,NULL,'Project Status Changed to: Quotation Given',NULL,NULL,NULL,NULL),(26,5,14,3,5,1,'2014-12-23 08:09:18',NULL,NULL,'Proposal corresponence to update the project','From: Geoff Silver 16/12/14\r\n\r\nThank you for your follow up email. The proposal arrived ok and is most informative.\r\nThe wheels turn fairly slowly from this point, now we’ve played our part, but hope to be in touch sooner rather than later.\r\n\r\nFrom: David McLeary 17/12/14\r\n\r\nMany thanks for the update, much appreciated.\r\n\r\nNo rush at our end but equally want to make sure we stay in touch on it. Perhaps we could touch base on it end of January or early February just to see where things are? From my point of view it\\\'s all about having the resources ready to assist if and when you want to move ahead.\r\n\r\nAnyhow, have a nice Christmas break Geoff - I assume you\\\'ll be getting one? - and speak to you at some point next year.\r\n\r\nThanks again.',NULL,NULL,NULL),(27,0,NULL,4,5,1,'2014-12-23 08:13:00',NULL,NULL,'Project Status Changed to: In Progress(PO received)',NULL,NULL,NULL,NULL),(28,6,1,4,5,1,'2014-12-23 08:13:31',NULL,NULL,'Chase on Database Approach and Schema','We\\\'re waiting on Tony regarding a few things that we\\\'ll need to move forward soon, both mentioned on Basecamp:\r\nGetting our hands on the Surface Pro 3 again in order to verify our screen display from the code we\\\'ve added;\r\nThe database schema/setup that we\\\'ll be feeding our collected data into, if he has one (otherwise we can supply our recommended one).\r\nI appreciate Christmas is almost upon us so I was intending to follow up with you in the New Year to move these on - we have coding to keep us busy in the meantime - but thought I\\\'d mention it anyway.\r\n\r\nI\\\'m around until Wednesday if you need anything from me, and then back on Monday 5th January so if I don\\\'t hear back from you have a nice Christmas and New Year - and I hope sickly child is much better now!\r\n',NULL,NULL,NULL),(29,4,13,21,5,1,'2014-12-23 09:42:51',NULL,NULL,'Update conversation with Jennifer','Had a conversation with Jennifer Baker to give her an update on the project.\r\n\r\na) Coachee Interface: Progressing OK but embryonic\r\nb) Coach Interface: Delivery depends on Elite Core so open ended at the moment;\r\nc) Functional Spec needs to be reviewed\r\nd) JB needs to have sight of Elite so she can visualise Coach users;\r\ne) Design/Name/Branding update - need to ask the question who we will use in March',NULL,NULL,NULL),(30,18,17,20,5,1,'2014-12-23 13:33:31',NULL,NULL,'Notes from meeting sent',NULL,NULL,NULL,NULL),(33,13,294,25,9,1,'2015-01-13 13:51:51',NULL,NULL,'More work to do',NULL,NULL,NULL,NULL),(34,0,NULL,25,9,2,'2015-01-16 15:02:50',NULL,NULL,'demo.sql',NULL,'demo.sql',NULL,NULL),(35,13,NULL,NULL,1,2,'2015-01-22 10:03:32',NULL,NULL,'Mutual Agreement',NULL,'MA13_691_Mutual Agreement.docx',NULL,NULL),(44,4,NULL,NULL,1,2,'2015-01-22 11:01:27',NULL,NULL,'Mutual Agreement',NULL,'CA4_366_Mutual Agreement.docx',NULL,NULL),(45,4,NULL,NULL,1,2,'2015-01-22 11:03:34',NULL,NULL,'Mutual Agreement',NULL,'CA4_746_Mutual Agreement.docx',NULL,NULL),(46,13,NULL,NULL,1,2,'2015-01-23 15:24:50',NULL,NULL,'Classes.txt',NULL,'Classes.txt',NULL,NULL),(47,4,13,NULL,5,4,'2015-02-05 11:43:07',NULL,NULL,'Re: Clickonce and github file hosting',NULL,'7469e918-5af5-4bf5-a62a-390ab42fe8c5.msg',NULL,1),(48,4,13,NULL,5,4,'2015-02-05 13:56:39',NULL,NULL,'Re: Clickonce and github file hosting',NULL,'8bfed3ce-b971-4485-964b-040221562a29.msg',NULL,2),(49,4,13,NULL,5,4,'2015-02-05 13:56:39',NULL,NULL,'Re: Clickonce and github file hosting',NULL,'9b67ec6d-11db-431b-a566-95f02f0b6675.msg',NULL,3),(50,17,15,NULL,0,4,'2015-02-09 13:31:32',NULL,NULL,'[#HWT-138-48849]: Fwd: New account',NULL,'569f515f-9383-49ab-b7bd-1166b7d105dd.msg',NULL,1),(51,18,17,NULL,0,4,'2015-02-09 13:31:32',NULL,NULL,'[#HWT-138-48849]: Fwd: New account',NULL,'569f515f-9383-49ab-b7bd-1166b7d105dd.msg',NULL,1),(52,4,13,NULL,5,4,'2015-02-09 13:31:32',NULL,NULL,'[#HWT-138-48849]: Fwd: New account',NULL,'569f515f-9383-49ab-b7bd-1166b7d105dd.msg',NULL,1),(71,14,NULL,NULL,1,2,'2015-02-11 13:03:16',NULL,NULL,'Mutual Agreement',NULL,'HU14_457_Mutual Agreement.docx',NULL,NULL),(72,4,13,NULL,5,4,'2015-02-16 09:26:03',NULL,NULL,'Re: ELITE ISSUE',NULL,'8df2be29-0b00-4af9-a181-a3f4a880d24c.msg',NULL,2),(73,17,15,NULL,0,4,'2015-02-16 09:26:03',NULL,NULL,'Re: ELITE ISSUE',NULL,'8df2be29-0b00-4af9-a181-a3f4a880d24c.msg',NULL,2),(74,4,13,NULL,5,4,'2015-02-16 09:26:02',NULL,NULL,'Re: ELITE ISSUE',NULL,'4babdae8-d2bb-4134-87e3-da60f29c3128.msg',NULL,3),(75,17,15,NULL,0,4,'2015-02-16 09:26:02',NULL,NULL,'Re: ELITE ISSUE',NULL,'4babdae8-d2bb-4134-87e3-da60f29c3128.msg',NULL,3),(76,4,13,NULL,5,4,'2015-02-05 11:43:14',NULL,NULL,'Re: BV Elite',NULL,'b3696461-a2e4-4cb7-b1a6-451c9a674a9a.msg',NULL,12),(77,4,13,NULL,5,4,'2015-02-17 07:44:24',NULL,NULL,'Fwd: Global Point outlook plugin issue',NULL,'1f33fb52-8f95-4a35-b5f3-84377650b48e.msg',NULL,13),(78,4,13,NULL,0,4,'2015-02-18 08:18:42',NULL,NULL,'Assistance with Richard Marsden',NULL,'32340e13-6939-44dc-bcde-0a7a60ce9f26.msg',NULL,16),(79,4,13,NULL,0,4,'2015-02-18 08:29:16',NULL,NULL,'Re: Tom had a boy....',NULL,'f3b976c2-224d-4090-bf7c-b2ef2c580783.msg',NULL,17),(80,4,13,NULL,0,4,'2015-02-18 08:18:42',NULL,NULL,'Tom had a boy....',NULL,'2a07dfab-140f-4929-8733-0bac7428d295.msg',NULL,18),(81,4,13,NULL,0,4,'2015-02-18 08:29:16',NULL,NULL,'Re: Tom had a boy....',NULL,'751f0de7-0150-47fb-a4ba-d96baa63c966.msg',NULL,20),(82,4,13,NULL,0,4,'2015-02-18 08:29:16',NULL,NULL,'Re: Tom had a boy....',NULL,'1f7d8659-b549-466f-9614-bfea79dda7ce.msg',NULL,21),(83,4,13,NULL,0,4,'2015-02-05 11:43:14',NULL,NULL,'Re: BV Elite',NULL,'eb76dc97-c145-42ee-8076-2efd18cca8f0.msg',NULL,32),(84,4,13,NULL,0,4,'2015-02-05 11:43:14',NULL,NULL,'Re: BV Elite',NULL,'59631911-3a4e-4f52-bb14-0e0cbd2763c1.msg',NULL,34),(85,4,13,NULL,0,4,'2015-02-05 11:43:14',NULL,NULL,'FW: Elite update problem',NULL,'b0e96a92-bc70-419f-be27-105fd44e7865.msg',NULL,36),(86,17,15,NULL,0,4,'2015-02-05 11:43:14',NULL,NULL,'FW: Elite update problem',NULL,'b0e96a92-bc70-419f-be27-105fd44e7865.msg',NULL,36),(87,4,13,NULL,0,4,'2015-02-05 11:43:14',NULL,NULL,'Re: BV Elite',NULL,'e03543cb-128a-4535-9725-6a8e8ac02671.msg',NULL,37),(88,4,13,NULL,0,4,'2015-02-18 08:18:42',NULL,NULL,'Fwd: Global Point outlook plugin issue',NULL,'da116480-a3fa-4b9c-aa11-6c86a38cde1d.msg',NULL,38),(89,4,13,NULL,0,4,'2015-02-18 09:36:05',NULL,NULL,'Uptime monitor',NULL,'abf58a50-e114-486d-a344-52c41b0538c1.msg',NULL,39),(90,4,13,NULL,0,4,'2015-02-18 09:36:05',NULL,NULL,'Uptime monitor',NULL,'c1067886-41cb-4b39-9ff7-ff3557ef3e9b.msg',NULL,40),(91,4,13,NULL,0,4,'2015-02-18 08:18:42',NULL,NULL,'[#GNP-571-62446]: Assistance with Richard Marsden',NULL,'6c94926d-d6b5-41a1-ae1c-1d99b4e2fa44.msg',NULL,41),(92,4,13,NULL,0,4,'2015-02-18 08:18:42',NULL,NULL,'Assistance with Richard Marsden',NULL,'150ddd46-39f7-4167-9a86-0a28e1caf45b.msg',NULL,42),(93,17,15,NULL,0,4,'2015-02-18 21:13:03',NULL,NULL,'CS8-RE: Elite',NULL,'f51ebab9-d79e-492d-b07e-747daaef4f1b.msg',NULL,1),(94,4,13,NULL,0,4,'2015-02-18 21:13:03',NULL,NULL,'CS8-RE: Elite',NULL,'f51ebab9-d79e-492d-b07e-747daaef4f1b.msg',NULL,1),(95,4,13,NULL,0,4,'2015-02-18 21:13:03',NULL,NULL,'Fwd: FW: CRM System Requirements',NULL,'164c6ffb-4d26-48e3-b7ec-8cbb9619779e.msg',NULL,5),(96,4,296,NULL,2,4,'2015-02-18 09:36:05',NULL,NULL,'Uptime monitor',NULL,'185ada5d-96bc-4fdb-808a-ea0a4c7549b0.msg',NULL,6),(97,4,296,NULL,2,4,'2015-02-18 09:36:05',NULL,NULL,'Uptime monitor',NULL,'06e5c284-6692-41fe-942a-506f51c1ff8a.msg',NULL,7),(98,4,13,NULL,0,4,'2015-02-18 09:36:05',NULL,NULL,'Uptime monitor',NULL,'06e5c284-6692-41fe-942a-506f51c1ff8a.msg',NULL,7),(103,4,296,28,2,4,'2015-02-18 09:36:05',NULL,NULL,'Uptime monitor',NULL,'0418ddfe-2a4e-4da0-950f-7e7acfe88222.msg',NULL,10),(104,4,13,28,3,4,'2015-02-18 09:36:05',NULL,NULL,'Uptime monitor',NULL,'0418ddfe-2a4e-4da0-950f-7e7acfe88222.msg',NULL,10),(105,4,296,28,2,4,'2015-02-25 07:34:58',NULL,NULL,'Test CS#-028',NULL,'fe05e2f3-0ad2-4c16-a1ae-32c923ddc6ae.msg',NULL,11),(106,4,296,26,2,4,'2015-02-25 07:33:58',NULL,NULL,'Fwd: GlobalPoint/Outlook issue: 25.02.15: Since GP add-ons to Outlook, Outlook now unresponsive, disconnecting, crashing constantly',NULL,'bd3ec35e-6f6b-440a-bfb1-e40a2f57c78a.msg',NULL,12),(107,4,13,26,3,4,'2015-02-25 07:33:58',NULL,NULL,'Fwd: GlobalPoint/Outlook issue: 25.02.15: Since GP add-ons to Outlook, Outlook now unresponsive, disconnecting, crashing constantly',NULL,'bd3ec35e-6f6b-440a-bfb1-e40a2f57c78a.msg',NULL,12),(108,4,296,NULL,2,4,'2015-02-25 07:33:58',NULL,NULL,'Daily Recap for Tuesday, February 24',NULL,'72975a2f-a45c-479b-9394-b4199ea9e401.msg',NULL,13),(109,4,296,NULL,2,4,'2015-02-25 07:33:57',NULL,NULL,'Re: Elite / add template',NULL,'44ed8528-3bff-402f-83c6-4a55669bdf90.msg',NULL,14),(110,4,13,NULL,3,4,'2015-02-25 07:33:57',NULL,NULL,'Re: Elite / add template',NULL,'44ed8528-3bff-402f-83c6-4a55669bdf90.msg',NULL,14),(111,4,296,27,2,4,'2015-02-25 11:26:23',NULL,NULL,'Re: (THSP Application Development) Server side work - DB and API',NULL,'79429587-45f6-4376-b63b-e443c72e4375.msg',NULL,15),(112,4,296,28,2,4,'2015-02-25 07:34:58',NULL,NULL,'Test CS#-028',NULL,'8466e976-b8a5-4e5a-8ad5-cef62d91ced2.msg',NULL,16),(113,4,296,27,2,4,'2015-02-25 11:26:23',NULL,NULL,'Re: (THSP Application Development) Server side work - DB and API',NULL,'ab56ca6e-ef7c-43f2-8af3-634847d764e0.msg',NULL,17);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activitysubjects`
--

DROP TABLE IF EXISTS `activitysubjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activitysubjects` (
  `ActivitySubjectID` int(11) NOT NULL AUTO_INCREMENT,
  `ActivitySubject` char(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ActivitySubjectID`,`ActivitySubject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitysubjects`
--

LOCK TABLES `activitysubjects` WRITE;
/*!40000 ALTER TABLE `activitysubjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `activitysubjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activitytype`
--

DROP TABLE IF EXISTS `activitytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activitytype` (
  `ActivityTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `ActivityType` char(16) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ActivityTypeID`,`ActivityType`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitytype`
--

LOCK TABLES `activitytype` WRITE;
/*!40000 ALTER TABLE `activitytype` DISABLE KEYS */;
INSERT INTO `activitytype` VALUES (1,'Note'),(2,'Document'),(3,'Not Used'),(4,'Email'),(5,'Letter'),(6,'Fax'),(7,'Phone'),(8,'Task'),(9,'Diary'),(10,'Email'),(11,'TeleMarketing');
/*!40000 ALTER TABLE `activitytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buildinglog`
--

DROP TABLE IF EXISTS `buildinglog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buildinglog` (
  `BuildingLogID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` decimal(11,0) DEFAULT NULL,
  `UserName` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EventDesc` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EventDate` datetime DEFAULT NULL,
  PRIMARY KEY (`BuildingLogID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildinglog`
--

LOCK TABLES `buildinglog` WRITE;
/*!40000 ALTER TABLE `buildinglog` DISABLE KEYS */;
/*!40000 ALTER TABLE `buildinglog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Content` text,
  `DateStamp` datetime DEFAULT NULL,
  `DocumentID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Comment','2015-01-23 15:24:56',78,1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `CompanyID` int(11) NOT NULL AUTO_INCREMENT,
  `ParentID` decimal(11,0) DEFAULT NULL,
  `AccMgrID` decimal(11,0) DEFAULT NULL,
  `PrimaryContactID` decimal(11,0) DEFAULT NULL,
  `FinanceContactID` decimal(11,0) DEFAULT NULL,
  `Company` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `Abbreviation` char(16) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `Address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `City` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `County` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PostCode` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Country` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Phone` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Fax` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Suspect` decimal(1,0) DEFAULT NULL,
  `Customer` decimal(1,0) DEFAULT NULL,
  `Supplier` decimal(1,0) DEFAULT NULL,
  `Elite` tinyint(1) DEFAULT NULL,
  `Competitor` decimal(1,0) DEFAULT NULL,
  `LastUpdateDate` date DEFAULT NULL,
  `NextActivity` date DEFAULT NULL,
  `SupportAbbreviation` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AccountNo` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `VAT` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ActiveSupportContractNo` varchar(17) COLLATE utf8_unicode_ci DEFAULT NULL,
  `OnlineBackupContractNo` varchar(17) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HostedServicesContractNo` varchar(17) COLLATE utf8_unicode_ci DEFAULT NULL,
  `BroadbandServicesContractNo` varchar(17) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SupportType` decimal(11,0) DEFAULT NULL,
  `InfrustrureDoc` mediumtext COLLATE utf8_unicode_ci,
  `HelpDeskAccount` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HelpDeskUser` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HelpDeskPassword` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HadGuide` decimal(1,0) DEFAULT NULL,
  `Active` decimal(1,0) DEFAULT NULL,
  `Approved` decimal(1,0) DEFAULT NULL,
  `KeyNotes` text COLLATE utf8_unicode_ci,
  `Notes` mediumtext COLLATE utf8_unicode_ci,
  `FinanceNotes` mediumtext COLLATE utf8_unicode_ci,
  `NextAction` text COLLATE utf8_unicode_ci,
  `NextActionDate` date DEFAULT NULL,
  `NextActionTime` time DEFAULT NULL,
  `VisitDate` date DEFAULT NULL,
  `ActionNotes` longtext COLLATE utf8_unicode_ci,
  `NDA1StatusDate` date DEFAULT NULL,
  `NDA2StatusDate` date DEFAULT NULL,
  `NDA1ExpiryDate` date DEFAULT NULL,
  `NDA2ExpiryDate` date DEFAULT NULL,
  `NDA1ID` decimal(11,0) DEFAULT NULL,
  `NDA2ID` decimal(11,0) DEFAULT NULL,
  `NDA1CDA` decimal(1,0) DEFAULT NULL,
  `NDA2CDA` decimal(1,0) DEFAULT NULL,
  `NDA1Warning` decimal(1,0) DEFAULT NULL,
  `NDA2Warning` decimal(1,0) DEFAULT NULL,
  `NDA1History` longtext COLLATE utf8_unicode_ci,
  `NDA2History` longtext COLLATE utf8_unicode_ci,
  `POPaymentMethodDefault` decimal(11,0) DEFAULT NULL,
  `PaymentMethod` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `BankAccNo` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `BankSortCode` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RemittenceEmail` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `WebSite` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanyEmail` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Distance` decimal(6,2) DEFAULT NULL,
  `GreetingCard` decimal(1,0) DEFAULT NULL,
  `SectorID` decimal(11,0) DEFAULT NULL,
  `SourceID` decimal(11,0) DEFAULT NULL,
  `CreditRatingID` decimal(11,0) DEFAULT NULL,
  `IndustryID` decimal(11,0) DEFAULT NULL,
  `DateEstablished` date DEFAULT NULL,
  `NoOfEmployees` decimal(3,0) DEFAULT NULL,
  `AccStatusID` decimal(1,0) DEFAULT NULL,
  `Prospect` decimal(1,0) DEFAULT NULL,
  `TimeDifference` decimal(1,0) DEFAULT NULL,
  `RecordCreationDate` datetime DEFAULT NULL,
  `RecordLastUpdated` datetime DEFAULT NULL,
  `RecordLastUpdatedBy` decimal(11,0) DEFAULT NULL,
  `RecordLastUpdateByAccMgr` datetime DEFAULT NULL,
  `TechInfoUpdated` datetime DEFAULT NULL,
  `TechInfoUpdatedBy` decimal(11,0) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CompanyID`),
  UNIQUE KEY `idx_comp` (`Abbreviation`,`Company`),
  KEY `idx_company` (`Company`)
) ENGINE=InnoDB AUTO_INCREMENT=1251 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (3,NULL,3,11,NULL,'Industrial Inkjet Ltd','II3','Unit 3\r\nMeridian\r\nBuckingway Business Park','Swavesey','Cambridgeshire','CB24 4AE','United Kingdom','1954 232 023  ','1954 230 566  ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.industrialij.com/','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-28',0,1,0,NULL,'2014-11-28 10:45:17','2014-12-12 19:47:36',5,NULL,NULL,NULL,'2014-12-12 19:45:13'),(4,NULL,5,NULL,NULL,'Cambridge Software Limited','CA4','St John\'s Innovation Centre, Cowley Road','CAMBRIDGE','Cambridgeshire','CB4 0EP','United Kingdom','0122 390 305 0 ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.cambridge-software.com','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-28',0,1,0,NULL,'2014-11-28 13:06:36','2015-01-22 14:33:51',1,NULL,NULL,NULL,'2015-01-22 14:33:51'),(5,NULL,5,14,NULL,'Asbestos Removal Company Association (ARCA)','AS5','Unit 1 Stretton Business Park 2\r\nBrunel Drive\r\nStretton\r\n','Burton upon Trent','Staffordshire','DE13 0BY','United Kingdom','01283566467 ','    ',0,0,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.arca.org.uk/','',0.00,NULL,NULL,2,4,NULL,'2014-11-28',0,1,-1,NULL,'2014-11-28 13:13:54','2014-12-11 13:16:14',5,NULL,NULL,NULL,'2014-12-11 13:13:52'),(6,NULL,5,1,NULL,'The Health and Safety People Ltd (THSP)','TH6','16a Market Square\r\n\r\n','Sandy','Bedfordshire','SG19 1HU','United Kingdom','0176 768 280 0 ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.thsp.co.uk/','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-28',0,1,0,NULL,'2014-11-28 15:50:28','2014-11-28 15:56:22',5,NULL,NULL,NULL,'2014-11-28 15:53:48'),(7,NULL,5,2,NULL,'S2 Partnership Ltd','S27','14-17 Avenue Business Park\r\nElsworth\r\n','Cambridge','Cambridgeshire','CB23 4EY','United Kingdom','0195 426 778 8 ','    ',0,0,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.s2partnership.co.uk/','',0.00,NULL,NULL,1,4,NULL,'2014-11-29',0,1,-1,NULL,'2014-11-29 08:15:12','2014-12-03 08:00:30',1,'2014-12-01 16:43:04',NULL,NULL,'2014-12-03 07:57:43'),(8,NULL,5,NULL,NULL,'Teddington Controls Ltd','TE8','Daniels Lane\r\nHolmbush\r\n\r\n','St Austell','Cornwall','PL25 3HG','United Kingdom','0172 622 250 5 ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-29',0,1,0,NULL,'2014-11-29 08:45:33','2015-01-12 10:15:01',9,NULL,NULL,NULL,'2015-01-12 10:15:00'),(9,NULL,5,4,NULL,'The Letchworth Centre for Healthy Living','TH9','Rosehill Hospital\r\nHitchin Road\r\n','Letchworth','Hertfordshire','SG6 3NA','United Kingdom','0146 267 880 4 ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.letchworthcentre.org/','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-29',0,1,0,NULL,'2014-11-29 08:56:51','2014-11-29 08:58:19',5,NULL,NULL,NULL,'2014-11-29 08:55:46'),(10,NULL,5,NULL,NULL,'Telltrail Enterprises Ltd','TE10','7 Farm View','RAYLEIGH','Essex','SS6 9PT','United Kingdom','01268782222','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.telltrail.com','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-29',0,1,0,NULL,'2014-11-29 09:45:06','2014-11-29 09:45:06',5,NULL,NULL,NULL,'2014-11-29 09:42:33'),(11,NULL,5,6,NULL,'Letchworth Settlement','LE11','Nevells Road','LETCHWORTH','Hertfordshire','SG64UB','United Kingdom','0146 268 282 8 ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'www.letchworthsettlement.org.uk','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-29',0,1,0,NULL,'2014-11-29 09:48:23','2014-11-29 09:50:06',5,NULL,NULL,NULL,'2014-11-29 09:47:33'),(12,NULL,5,7,NULL,'PiR Limited','PI12','14B Raleigh House\r\nCompass Point Business Park\r\nStocks Bridge Way','ST IVES','Cambridgeshire','PE275JL','United Kingdom','0148 049 958 0 ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.pir-resourcing.com/','',0.00,NULL,NULL,NULL,4,NULL,'2014-11-29',0,1,0,NULL,'2014-11-29 18:16:29','2014-11-29 18:17:50',5,NULL,NULL,NULL,'2014-11-29 18:15:16'),(13,NULL,5,16,NULL,'Make Believe Limited','MA13','143 Hills road','Cambridge','Cambridgeshire','CB2 8RA','United Kingdom','    ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'','',0.00,NULL,NULL,NULL,4,NULL,'2014-12-01',0,NULL,0,NULL,'2014-12-01 11:04:37','2015-01-12 11:35:44',9,NULL,NULL,NULL,'2015-01-12 11:35:44'),(14,NULL,3,8,NULL,'Huntingdonshire District Council','HU14','Pathfinder House\r\nSt Mary\'s Street','Huntingdon','Cambridgeshire','PE29 3TN','United Kingdom','1480 387 096  ','    ',0,0,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'www.huntingdonshire.gov.uk','',0.00,NULL,NULL,3,4,NULL,'2014-12-03',0,1,-1,NULL,'2014-12-03 07:39:41','2014-12-23 15:38:45',5,NULL,NULL,NULL,'2014-12-23 15:38:45'),(15,NULL,5,NULL,NULL,'Advanced Software Technologies','AD15','57001, Thermi\r\n','Thessaloniki','','','Haiti','2310 908 060  ','    ',0,0,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://ast.gr','',0.00,NULL,NULL,1,4,NULL,'2014-12-08',0,1,-1,NULL,'2014-12-08 13:13:13','2014-12-11 13:27:36',5,'2014-12-11 11:43:48',NULL,NULL,'2014-12-11 13:25:14'),(16,NULL,3,12,NULL,'Whizzle Ltd','WH16','Unit C\r\nThree Pillars Business Park\r\nSutton\r\n','Ely','Cambridgeshire','CB6 2RU','United Kingdom','0135 377 577 5 ','0135 377 700 7 ',0,0,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.whizzle.it/','',0.00,NULL,NULL,3,4,NULL,'2014-12-11',0,1,-1,NULL,'2014-12-11 07:28:45','2014-12-22 17:24:38',5,'2014-12-22 17:23:15',NULL,NULL,'2014-12-22 17:24:38'),(17,NULL,5,15,NULL,'BrightVisions Ltd','BR17','8 Eaton Court Road\r\nColmworth Business Park\r\n','St. Neots','Cambridgeshire','PE19 8ER','United Kingdom','01480 708 888','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.brightvisions.co.uk/','',0.00,NULL,NULL,3,4,NULL,'2014-12-11',0,1,0,NULL,'2014-12-11 15:18:21','2015-02-24 15:55:33',1,NULL,NULL,NULL,'2015-02-24 15:55:33'),(18,NULL,5,17,NULL,'IMV Europe Limited','IM18','Devonshire Business Centre\r\nWorks Road','Letchworth','Hertfordshire ','SG6 1GJ','United Kingdom','    ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'http://www.imv-tec.com/','',0.00,NULL,NULL,NULL,4,NULL,'2014-12-22',0,1,0,NULL,'2014-12-22 09:00:39','2014-12-23 15:36:44',5,NULL,NULL,NULL,'2014-12-23 15:36:44'),(19,NULL,9,295,NULL,'Trotters Independent Traders','TR19','Nelson Mandela House, Peckham','London','Greater London','W3 8TZ','United Kingdom','    ','    ',-1,0,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'','',0.00,NULL,NULL,NULL,4,NULL,'2015-01-12',0,1,0,NULL,'2015-01-12 15:50:42','2015-02-23 10:19:49',1,NULL,NULL,NULL,'2015-02-23 10:19:48'),(1248,NULL,7,468,NULL,'Centrotecnica Srl','CE1248','via F. Confalonieri  23','Masate','Milan','20060','Italy','0253 058 88  ','    ',-1,0,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'','',0.00,NULL,NULL,NULL,NULL,NULL,'2014-02-12',0,0,0,NULL,'2014-02-12 19:03:43','2014-02-26 16:17:13',6,'2014-02-12 19:03:43',NULL,NULL,'2015-02-04 09:33:31'),(1249,NULL,NULL,NULL,NULL,'Ministry of Defence','','WARSHIP SUPPORT AGENCY',NULL,NULL,NULL,NULL,'','',-1,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2015-02-04 09:33:31'),(1250,8,1,NULL,NULL,'Teddingtons','TE1250','','','','','United Kingdom','    ','    ',0,-1,0,NULL,0,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,'',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,0,0,'','',NULL,NULL,NULL,NULL,NULL,'','',0.00,NULL,NULL,NULL,4,NULL,'2015-02-23',0,1,0,NULL,'2015-02-23 10:13:46','2015-02-24 12:18:44',1,NULL,NULL,NULL,'2015-02-24 12:18:43');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companiescustomfields`
--

DROP TABLE IF EXISTS `companiescustomfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companiescustomfields` (
  `CompanyID` int(11) NOT NULL,
  `Visit Date` date DEFAULT NULL,
  `Visit Report` date DEFAULT NULL,
  `Latest Quote Date` date DEFAULT NULL,
  `KM NDA Expiry Date` date DEFAULT NULL,
  `IIJ NDA Expiry Date` date DEFAULT NULL,
  `Last Contact Date` date DEFAULT NULL,
  PRIMARY KEY (`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companiescustomfields`
--

LOCK TABLES `companiescustomfields` WRITE;
/*!40000 ALTER TABLE `companiescustomfields` DISABLE KEYS */;
INSERT INTO `companiescustomfields` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL,NULL),(13,NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL,NULL),(17,NULL,NULL,NULL,NULL,NULL,NULL),(18,NULL,NULL,NULL,NULL,NULL,NULL),(19,NULL,NULL,NULL,NULL,NULL,NULL),(20,NULL,NULL,NULL,NULL,NULL,NULL),(21,NULL,NULL,NULL,NULL,NULL,NULL),(22,NULL,NULL,NULL,NULL,NULL,NULL),(1248,NULL,NULL,NULL,NULL,NULL,NULL),(1250,NULL,NULL,NULL,NULL,NULL,NULL),(2723,NULL,NULL,NULL,NULL,NULL,NULL),(2724,NULL,NULL,NULL,NULL,NULL,NULL),(2725,NULL,NULL,NULL,NULL,NULL,NULL),(2726,NULL,NULL,NULL,NULL,NULL,NULL),(2727,NULL,NULL,NULL,NULL,NULL,NULL),(2728,NULL,NULL,NULL,NULL,NULL,NULL),(2729,NULL,NULL,NULL,NULL,NULL,NULL),(2730,NULL,NULL,NULL,NULL,NULL,NULL),(2731,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `companiescustomfields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companiestechinfolog`
--

DROP TABLE IF EXISTS `companiestechinfolog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companiestechinfolog` (
  `CompanyID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` decimal(11,0) DEFAULT NULL,
  `TechInfoTitle` tinytext COLLATE utf8_unicode_ci,
  `TechInfo` mediumtext COLLATE utf8_unicode_ci,
  `UpdateDate` date DEFAULT NULL,
  PRIMARY KEY (`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companiestechinfolog`
--

LOCK TABLES `companiestechinfolog` WRITE;
/*!40000 ALTER TABLE `companiestechinfolog` DISABLE KEYS */;
/*!40000 ALTER TABLE `companiestechinfolog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyinfoaccess`
--

DROP TABLE IF EXISTS `companyinfoaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companyinfoaccess` (
  `CompanyID` decimal(11,0) NOT NULL,
  `UserID` decimal(11,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyinfoaccess`
--

LOCK TABLES `companyinfoaccess` WRITE;
/*!40000 ALTER TABLE `companyinfoaccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `companyinfoaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companymarketsector`
--

DROP TABLE IF EXISTS `companymarketsector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companymarketsector` (
  `SectorID` int(11) NOT NULL DEFAULT '0',
  `Sector` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`SectorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 9216 kB';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companymarketsector`
--

LOCK TABLES `companymarketsector` WRITE;
/*!40000 ALTER TABLE `companymarketsector` DISABLE KEYS */;
INSERT INTO `companymarketsector` VALUES (1,'Undefined',NULL);
/*!40000 ALTER TABLE `companymarketsector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companymodules`
--

DROP TABLE IF EXISTS `companymodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companymodules` (
  `CompModID` int(11) NOT NULL,
  `CompModName` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ShowModule` tinyint(1) DEFAULT NULL,
  `ShowNdaTab` tinyint(1) DEFAULT NULL,
  `ShowTechInfoTab` tinyint(1) DEFAULT NULL,
  `ShowPOsTab` tinyint(1) DEFAULT NULL,
  `ShowContractsTab` tinyint(1) DEFAULT NULL,
  `ShowDevicesTab` tinyint(1) DEFAULT NULL,
  `ShowOppsTab` tinyint(1) DEFAULT NULL,
  `ShowProjectsTab` tinyint(1) DEFAULT NULL,
  `ShowDocumentsTab` tinyint(1) DEFAULT NULL,
  `TechInfoTabLabel` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ProductListLabel` char(16) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companymodules`
--

LOCK TABLES `companymodules` WRITE;
/*!40000 ALTER TABLE `companymodules` DISABLE KEYS */;
INSERT INTO `companymodules` VALUES (10,'Prospects_Edit',1,1,1,1,1,1,1,1,1,'Technical Info','Technical data'),(20,'Customers_Edit',1,1,1,1,1,1,1,1,1,'Technical Info','Technical data'),(30,'Suppliers_Edit',1,1,1,1,1,1,1,1,1,'Account Info','Interested in'),(5,'Suspects_Edit',1,1,1,1,1,1,1,1,1,'Not Used','Interested In'),(100,'All_Edit',1,1,1,1,1,1,1,1,1,'Technical Info','Technical data');
/*!40000 ALTER TABLE `companymodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companynda`
--

DROP TABLE IF EXISTS `companynda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companynda` (
  `NdaID` int(11) NOT NULL DEFAULT '0',
  `NdaType` char(16) COLLATE utf8_unicode_ci NOT NULL,
  `NdaDesc` char(64) COLLATE utf8_unicode_ci NOT NULL,
  `NdaValue` char(128) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companynda`
--

LOCK TABLES `companynda` WRITE;
/*!40000 ALTER TABLE `companynda` DISABLE KEYS */;
/*!40000 ALTER TABLE `companynda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companystatus`
--

DROP TABLE IF EXISTS `companystatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companystatus` (
  `AccStatusID` int(11) NOT NULL AUTO_INCREMENT,
  `AccStatus` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Colour` char(16) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`AccStatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companystatus`
--

LOCK TABLES `companystatus` WRITE;
/*!40000 ALTER TABLE `companystatus` DISABLE KEYS */;
INSERT INTO `companystatus` VALUES (1,'Green','White'),(2,'Yellow','Yellow'),(3,'Red','Red');
/*!40000 ALTER TABLE `companystatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `component`
--

DROP TABLE IF EXISTS `component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `component` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ParentID` int(11) DEFAULT NULL,
  `Name` varchar(512) DEFAULT NULL,
  `Reference` varchar(512) DEFAULT NULL,
  `Cost` decimal(15,2) DEFAULT NULL,
  `CostCurrencyID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component`
--

LOCK TABLES `component` WRITE;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;
INSERT INTO `component` VALUES (1,0,'My item','',5.00,1),(2,0,'My Name','',0.00,1);
/*!40000 ALTER TABLE `component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `componentdescription`
--

DROP TABLE IF EXISTS `componentdescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `componentdescription` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LanguageID` int(11) DEFAULT NULL,
  `Description` text,
  `ComponentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `componentdescription`
--

LOCK TABLES `componentdescription` WRITE;
/*!40000 ALTER TABLE `componentdescription` DISABLE KEYS */;
INSERT INTO `componentdescription` VALUES (1,1,'{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang2057{\\fonttbl{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}}\r\n\\viewkind4\\uc1\\pard\\f0\\fs17 Test\\par\r\n}\r\n',1),(2,2,'{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang2057{\\fonttbl{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}}\r\n\\viewkind4\\uc1\\pard\\f0\\fs17 Ich bin die Mann!\\par\r\n}\r\n',1);
/*!40000 ALTER TABLE `componentdescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `componentprice`
--

DROP TABLE IF EXISTS `componentprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `componentprice` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CurrencyID` int(11) DEFAULT NULL,
  `Value` decimal(15,2) DEFAULT NULL,
  `ComponentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `componentprice`
--

LOCK TABLES `componentprice` WRITE;
/*!40000 ALTER TABLE `componentprice` DISABLE KEYS */;
INSERT INTO `componentprice` VALUES (1,1,0.00,1);
/*!40000 ALTER TABLE `componentprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `ConfigID` int(11) NOT NULL AUTO_INCREMENT,
  `KeyType` char(16) COLLATE utf8_unicode_ci NOT NULL,
  `Description` char(64) COLLATE utf8_unicode_ci NOT NULL,
  `Value` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PDF` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ConfigID`)
) ENGINE=InnoDB AUTO_INCREMENT=503 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'','Company Path','C:\\Elite\\Companies',NULL),(2,'','Templates Path','C:\\Elite\\Templates',NULL),(3,'','Projects Path','C:\\Elite\\Projects',NULL),(4,'','Emails Path','C:\\Elite\\Emails',NULL),(5,'LicenseKey','Elite Master','7u5Kr9MroRANMKIP6WHRCDTNMI8mC02V8fZ7JT9X1BoF/8dvj7oT7Q==',NULL),(6,'','CompanyFolderTemplate','C:\\Elite\\Templates\\CompanyFolderTemplate',NULL),(7,'','ProjectFolderTemplate','C:\\Elite\\Templates\\ProjectFolderTemplate',NULL),(8,'FolderStrct','CreatesFolderStructure','0',NULL),(10,'Supplier','Purchase Order Form','',NULL),(25,'Project','Project Document 3','Blank',NULL),(26,'Company','DefaultCountry','United Kingdom',NULL),(27,'Email','ServerAddress','',NULL),(28,'Email','ServerDomain','',NULL),(29,'Email','UseDomain','0',NULL),(200,'Contact','Standard Letter','',NULL),(250,'Prospect','Letterhead','',NULL),(300,'Customer','Letterhead','',NULL),(350,'Supplier','Letterhead','',NULL),(401,'Contact','Invoice','',NULL),(450,'Opportunity','Quotation','',NULL),(501,'Customer','Mutual Agreement','Mutual Agreement.docx',NULL),(502,'Prospect','Mutual Agreement','Mutual Agreement.docx',NULL);
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactroles`
--

DROP TABLE IF EXISTS `contactroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contactroles` (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `Role` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactroles`
--

LOCK TABLES `contactroles` WRITE;
/*!40000 ALTER TABLE `contactroles` DISABLE KEYS */;
INSERT INTO `contactroles` VALUES (1,'Commercial'),(2,'Purchasing'),(3,'Technical');
/*!40000 ALTER TABLE `contactroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `ContactID` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyID` decimal(11,0) DEFAULT NULL,
  `RoleID` decimal(11,0) DEFAULT NULL,
  `Title` char(10) COLLATE utf8_unicode_ci DEFAULT '',
  `Forename` char(16) COLLATE utf8_unicode_ci DEFAULT '',
  `Surname` char(32) COLLATE utf8_unicode_ci DEFAULT '',
  `UserName` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `UseAddress` tinyint(1) DEFAULT NULL,
  `Address` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `City` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `County` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PostCode` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Country` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IMAddress` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Phone` char(24) COLLATE utf8_unicode_ci DEFAULT '',
  `Extension` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Mobile` char(24) COLLATE utf8_unicode_ci DEFAULT '',
  `Employee` decimal(1,0) DEFAULT NULL,
  `Email` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email2` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email3` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Department` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Inactive` decimal(1,0) DEFAULT NULL,
  `Notes` mediumtext COLLATE utf8_unicode_ci,
  `LastContactDate` datetime DEFAULT NULL,
  `NextContactDate` datetime DEFAULT NULL,
  `active` decimal(1,0) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ContactID`)
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,6,3,'Mr.','Michael','Rimmer',NULL,NULL,0,'','','','','United Kingdom','','0176 768 280 0','','',NULL,'michael.rimmer@thsp.co.uk','','','Consultant Director',NULL,NULL,'',NULL,NULL,-1,NULL),(2,7,3,'Mr.','Rob','Mead',NULL,NULL,0,'','','','','United Kingdom','','0195 426 778 8','','',NULL,'','','','Software Director',NULL,NULL,'',NULL,NULL,-1,NULL),(3,8,1,'Mr.','Kenny','Maxwell',NULL,NULL,0,'','','','','United Kingdom','','0172 622 250 5','','',NULL,'kenneth.m@tedcon.com','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(4,9,1,'Ms.','Roberta','Meldrum',NULL,NULL,0,'','','','','United Kingdom','','0146 267 880 4','','0774 839 076 2',NULL,'robertameldrum@letchworthcentre.org','','','Director',NULL,NULL,'',NULL,NULL,-1,NULL),(5,10,1,'Mr.','Anthony','Amey',NULL,NULL,0,'','','','','United Kingdom','','01268782222','','',NULL,'tonyamey@gmail.com','','','Managing Director',NULL,NULL,'',NULL,NULL,-1,NULL),(6,11,3,'Ms.','Sonia','Weston',NULL,NULL,0,'','','','','United Kingdom','','    01462682828','','0793 156 709 2',NULL,'soniaeweston@hotmail.com','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(7,12,3,'Mr.','Alex','Carson',NULL,NULL,0,'','','','','United Kingdom','','0148 049 958 0','','0772 063 325 9',NULL,'acarson@pir-resourcing.com','','','Social Media Executive',NULL,NULL,'',NULL,NULL,-1,NULL),(8,14,1,'Mr.','Ben','Hooson',NULL,NULL,0,'','','','','United Kingdom','','1480 387 096','','',NULL,'bhooson@hunts-dc.gov.uk','','','Economic Development',NULL,NULL,'',NULL,NULL,-1,'2015-02-12 08:12:03'),(9,14,1,'Mrs.','Sue','Bedlow',NULL,NULL,0,'','','','','United Kingdom','','1480 387 096','','',NULL,'','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(10,15,3,'','Athanassios','Tragazikis',NULL,NULL,0,'','','','','United Kingdom','','2310 908 060','','',NULL,'tragazikis@ast.gr','','','CTO, R&D Manager',NULL,NULL,'',NULL,NULL,-1,NULL),(11,3,1,'Mr.','Mike','Thwaites',NULL,NULL,0,'','','','','United Kingdom','','1954 232 023','','',NULL,'mikethwaites@industrialij.com','','','Global Sales Manager',NULL,NULL,'',NULL,NULL,-1,NULL),(12,16,1,'Ms.','Jenny','Read',NULL,NULL,0,'','','','','United Kingdom','','0135 377 577 5','','',NULL,'','','','Marketing Manager',NULL,NULL,'',NULL,NULL,-1,NULL),(13,4,3,'Mr.','David','McLeary',NULL,NULL,0,'','','','','United Kingdom','','0122 390 305 0','','7917 458 657',NULL,'david.mcleary@cambridge-software.com','','','Web Consultant',NULL,NULL,'',NULL,NULL,-1,NULL),(14,5,3,'Mr','Geoff','Silver',NULL,NULL,0,'','','','','United Kingdom','','01283566467','','',NULL,'geoff.silver@arca.org.uk','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(15,17,1,'Mr.','Philip','Mashinchi',NULL,NULL,0,'','','','','United Kingdom','','07940516003','','07940516003',NULL,'phil.mash@brightvisions.co.uk','','','Director',NULL,NULL,'',NULL,NULL,-1,'2015-02-24 15:00:46'),(16,13,1,'mr','simon','smith',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(17,18,3,'Mr.','John','Goodfellow',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'john.goodfellow@imv-tec.com','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(293,2726,1,'Mrs.','Jane','Doe',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(294,13,2,'Mr.','John','Allan',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'john.doe@makebelieve.co.uk','','','Supply Manager',NULL,NULL,'',NULL,NULL,-1,'2015-01-12 15:56:02'),(295,19,1,'Mr.','Rodney','Trotter',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'rodney@trotters.co.uk','','','Sales',NULL,NULL,'',NULL,NULL,-1,NULL),(296,4,3,'Mr.','Damien','Robson',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'damien.robson@cambridge-software.com','','','Software Engineer',NULL,NULL,'',NULL,NULL,-1,'2015-02-19 08:40:03'),(297,15,1,'Mr.','J','Doe',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(298,20,1,'Mr.','John','Doe',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'','','','',NULL,NULL,'',NULL,NULL,-1,NULL),(299,21,1,'Ms.','Jane','Doe',NULL,NULL,0,'','','','','United Kingdom','','','','',NULL,'','','','',NULL,NULL,'',NULL,NULL,-1,NULL);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacttitles`
--

DROP TABLE IF EXISTS `contacttitles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacttitles` (
  `TitleID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`TitleID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacttitles`
--

LOCK TABLES `contacttitles` WRITE;
/*!40000 ALTER TABLE `contacttitles` DISABLE KEYS */;
INSERT INTO `contacttitles` VALUES (1,'Mr'),(2,'Mrs'),(3,'Miss'),(4,'Dr');
/*!40000 ALTER TABLE `contacttitles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contractcategories`
--

DROP TABLE IF EXISTS `contractcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contractcategories` (
  `CategoryID` int(11) NOT NULL,
  `Category` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractcategories`
--

LOCK TABLES `contractcategories` WRITE;
/*!40000 ALTER TABLE `contractcategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contracts` (
  `ContractID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) DEFAULT NULL,
  `SupplierID` int(11) DEFAULT NULL,
  `AssetID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Service` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `RenewedOnDate` datetime DEFAULT NULL,
  `ServiceCost` smallint(6) DEFAULT NULL,
  `RenewalDate` date DEFAULT NULL,
  `LicenseDetails` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `Managed` tinyint(1) DEFAULT NULL,
  `Notes` mediumtext COLLATE utf8_unicode_ci,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ContractID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracttypes`
--

DROP TABLE IF EXISTS `contracttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contracttypes` (
  `SupportTypeID` int(11) NOT NULL DEFAULT '0',
  `SupportType` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SupportTypeAbb` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ContractTemplate` char(64) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`SupportTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracttypes`
--

LOCK TABLES `contracttypes` WRITE;
/*!40000 ALTER TABLE `contracttypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `contracttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `costrates`
--

DROP TABLE IF EXISTS `costrates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `costrates` (
  `CostRateID` int(11) NOT NULL DEFAULT '0',
  `CostRateDescription` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CostRate` double(4,2) DEFAULT NULL,
  PRIMARY KEY (`CostRateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costrates`
--

LOCK TABLES `costrates` WRITE;
/*!40000 ALTER TABLE `costrates` DISABLE KEYS */;
/*!40000 ALTER TABLE `costrates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `CountryID` int(11) NOT NULL AUTO_INCREMENT,
  `Country` char(48) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Code` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TimeDiff` float(3,1) DEFAULT NULL,
  UNIQUE KEY `CountryID` (`CountryID`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'','',0.0),(3,'Albania','355',1.0),(4,'Algeria','213',0.0),(5,'Andorra','376',1.0),(6,'Angola','244',1.0),(7,'Anguilla','264',-4.0),(8,'Antigua and Barbuda','268',-4.0),(9,'Argentina','54',-3.0),(10,'Armenia','374',4.0),(11,'Aruba','297',-4.0),(12,'Ascension Island','247',0.0),(13,'Australia','61',10.0),(14,'Austria','43',1.0),(15,'Azerbaijan','994',4.0),(16,'Bahamas','242',-5.0),(17,'Bahrain','973',3.0),(18,'Bangladesh','880',6.0),(19,'Barbados','246',-4.0),(20,'Belarus','375',3.0),(21,'Belgium','32',1.0),(22,'Belize','501',-6.0),(23,'Benin','229',1.0),(24,'Bermuda','441',-4.0),(25,'Bhutan','975',5.5),(26,'Bolivia','591',-4.0),(27,'Bosnia','387',1.0),(28,'Botswana','267',2.0),(29,'Brazil','55',-3.0),(30,'Brunei','673',8.0),(31,'Bulgaria','359',2.0),(32,'Burkina Faso','226',0.0),(33,'Burundi','257',2.0),(34,'Cambodia','855',7.0),(35,'Cameroon','237',1.0),(36,'Canada','1',-4.0),(37,'Cape Verde Islands','238',-1.0),(38,'Cayman Islands','345',-5.0),(39,'Central Africa Republic','236',1.0),(40,'Chad','235',1.0),(41,'Chile','56',-4.0),(42,'China','86',8.0),(43,'Columbia','57',-5.0),(44,'Comoros Island','269',3.0),(45,'Congo','242',1.0),(46,'Cook Islands','682',-10.0),(47,'Costa Rica','506',-6.0),(48,'Croatia','385',1.0),(49,'Cuba','53',-3.0),(50,'Cyprus','357',2.0),(51,'Czech Republic','420',1.0),(52,'Democratic Republic of Congo','243',2.0),(53,'Denmark','45',1.0),(54,'Diego Garcia','246',5.0),(55,'Djibouti','253',3.0),(56,'Dominica Islands','767',-4.0),(57,'Dominican Republic','809',-4.0),(58,'Ecuador','593',-5.0),(59,'Egypt','20',2.0),(60,'El Salvador','503',-6.0),(61,'Equatorial Guinea','240',1.0),(62,'Eritrea','291',3.0),(63,'Estonia','372',3.0),(64,'Ethiopia','251',3.0),(65,'Faeroe Islands','298',0.0),(66,'Falkland Islands','500',-4.0),(67,'Fiji Islands','679',12.0),(68,'Finland','358',2.0),(69,'France','33',1.0),(70,'French Guiana','594',-4.0),(71,'French Polynesia','689',-10.0),(72,'Gabon','241',1.0),(73,'Georgia','995',4.0),(74,'Germany','49',1.0),(75,'Ghana','233',0.0),(76,'Gibraltar','350',1.0),(77,'Greece','30',2.0),(78,'Greenland','299',-3.0),(79,'Grenada','473',-4.0),(80,'Guadeloupe','590',-4.0),(81,'Guam','671',10.0),(82,'Guatemala','502',-6.0),(83,'Guinea Bissau','245',-1.0),(84,'Guinea Republic','224',0.0),(85,'Guyana','592',-3.0),(86,'Haiti','509',-5.0),(87,'Honduras','503',-6.0),(88,'Hong Kong','852',8.0),(89,'Hungary','36',1.0),(90,'Iceland','354',0.0),(91,'India','91',5.5),(92,'Indonesia','62',9.0),(93,'Iran','98',3.5),(94,'Iraq','964',3.0),(95,'Ireland','353',0.0),(96,'Israel','972',2.0),(97,'Italy','39',1.0),(98,'Ivory Coast','225',0.0),(99,'Jamaica','876',-5.0),(100,'Japan','81',9.0),(101,'Jordan','962',2.0),(102,'Kazakhstan','7',6.0),(103,'Kenya','254',3.0),(104,'Kiribati','686',12.0),(105,'Korea, North','850',9.0),(106,'Korea, South','82',9.0),(107,'Kuwait','965',3.0),(108,'Kyrgyzstan','996',6.0),(109,'Laos','856',7.0),(110,'latvia','371',3.0),(111,'Lebanon','961',2.0),(112,'Lesotho','266',2.0),(113,'Liberia','231',0.0),(114,'Libya','218',2.0),(115,'Liechtenstein','423',1.0),(116,'Lithuania','370',2.0),(117,'Luxembourg','352',1.0),(118,'Macau','853',8.0),(119,'Macedonia (Fyrom)','389',1.0),(120,'Madagascar','261',3.0),(121,'Malawi','265',2.0),(122,'Malaysia','60',8.0),(123,'Maldives Republic','960',5.0),(124,'Mali','223',0.0),(125,'Malta','356',1.0),(126,'Mariana Islands','670',10.0),(127,'Marshall Islands','692',10.0),(128,'Martinique','596',-4.0),(129,'Mauritius','230',4.0),(130,'Mayotte Islands','269',3.0),(131,'Mexico','52',-6.0),(132,'Micronesia','691',10.0),(133,'Moldova','373',3.0),(134,'Monaco','377',1.0),(135,'Mongolia','976',8.0),(136,'Montserrat','664',-4.0),(137,'Morocco','212',0.0),(138,'Mozambique','258',2.0),(139,'Myanmar (Burma)','95',6.5),(140,'Namibia','264',2.0),(141,'Nauru','674',12.0),(142,'Nepal','977',5.5),(143,'Netherlands','31',1.0),(144,'Netherlands Antilles','599',-4.0),(145,'New Caledonia','687',11.0),(146,'New Zealand','64',12.0),(147,'Nicaragua','505',-6.0),(148,'Niger','227',1.0),(149,'Nigeria','234',1.0),(150,'Niue Island','683',-11.0),(151,'Norfolk Island','672',11.5),(152,'Norway','47',1.0),(153,'Oman','968',4.0),(154,'Pakistan','92',5.0),(155,'Palau','680',9.0),(156,'Palestine','970',2.0),(157,'Panama','507',-5.0),(158,'Papua New Guinea','675',10.0),(159,'Paraguay','595',-4.0),(160,'Peru','51',-5.0),(161,'Philippines','63',8.0),(162,'Poland','48',1.0),(163,'Portugal','351',0.0),(164,'Puerto Rico','787',-4.0),(165,'Qatar','974',3.0),(166,'Reunion Island','262',4.0),(167,'Romania','40',2.0),(168,'Russia','7',3.0),(169,'Rwanda','250',2.0),(170,'Samoa (American)','684',-11.0),(171,'Samoa (Western)','685',-11.0),(172,'San Marino','378',1.0),(173,'Sao Tome & Principe','239',0.0),(174,'Saudi Arabia','966',3.0),(175,'Senegal','221',0.0),(176,'Serbia','381',1.0),(177,'Seychelles','248',4.0),(178,'Sierra Leone','232',0.0),(179,'Singapore','65',8.0),(180,'Slovak Republic','421',1.0),(181,'Slovenia','386',1.0),(182,'Solomon Islands','677',11.0),(183,'Somalia','252',3.0),(184,'South Africa','27',2.0),(185,'Spain','34',1.0),(186,'Sri Lanka','94',5.5),(187,'St Helena','290',0.0),(188,'St Kitts & Nevia','869',-4.0),(189,'St Lucia','758',-4.0),(190,'Sudan','249',2.0),(191,'Surinam','597',-3.5),(192,'Swaziland','268',2.0),(193,'Sweden','46',1.0),(194,'Switzerland','41',1.0),(195,'Syria','963',2.0),(196,'Taiwan','886',8.0),(197,'Tajikistan','992',6.0),(198,'Tanzania','255',3.0),(199,'Thailand','66',7.0),(200,'The Gambia','220',0.0),(201,'Togo','228',0.0),(202,'Tonga','676',13.0),(203,'Trinidad & Tobago','868',-4.0),(204,'Tunisia','216',1.0),(205,'Turkey','90',2.0),(206,'Turkmenistan','993',5.0),(207,'Turks & Caicos Islands','649',-5.0),(208,'Tuvalu','688',12.0),(209,'Uganda','256',3.0),(210,'Ukraine','380',3.0),(211,'United Arab Emirates','971',4.0),(212,'United Kingdom','44',0.0),(213,'Uruguay','598',-3.0),(214,'United States of America','1',-5.0),(215,'Uzbekistan','998',6.0),(216,'Vanuatu','678',11.0),(217,'Venezuela','58',-4.0),(218,'Vietnam','84',7.0),(219,'Wallis & Futuna Islands','681',12.0),(220,'Yemen Arab Republic','967',3.0),(221,'Zambia','260',2.0),(222,'Zimbabwe','263',2.0);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credentials`
--

DROP TABLE IF EXISTS `credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credentials` (
  `CredentialID` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyID` int(11) DEFAULT NULL,
  `Description` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Username` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Password` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Updated_By` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Updated_On` datetime DEFAULT NULL,
  `Notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Active` tinyint(1) DEFAULT '1',
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`CredentialID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credentials`
--

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
INSERT INTO `credentials` VALUES (1,20,'Credential A',NULL,NULL,'Admin','2015-01-19 08:24:18',NULL,1,NULL),(2,20,'Credential B','damien',NULL,'Admin','2015-01-19 08:24:36',NULL,1,NULL),(3,4,'my test','why not?',NULL,'Admin','2015-01-22 14:32:41',NULL,1,NULL);
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credentials_history`
--

DROP TABLE IF EXISTS `credentials_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credentials_history` (
  `CredentialID` int(11) DEFAULT NULL,
  `CompanyID` int(11) DEFAULT NULL,
  `Description` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Username` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Password` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Updated_By` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Updated_On` datetime DEFAULT NULL,
  `Notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Active` tinyint(1) DEFAULT '1',
  `timestamp` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credentials_history`
--

LOCK TABLES `credentials_history` WRITE;
/*!40000 ALTER TABLE `credentials_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `credentials_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditrating`
--

DROP TABLE IF EXISTS `creditrating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creditrating` (
  `CreditRatingID` int(11) NOT NULL AUTO_INCREMENT,
  `CreditRating` char(32) COLLATE utf8_unicode_ci DEFAULT '',
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CreditRatingID`),
  UNIQUE KEY `idx_company` (`CreditRating`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 9216 kB';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditrating`
--

LOCK TABLES `creditrating` WRITE;
/*!40000 ALTER TABLE `creditrating` DISABLE KEYS */;
INSERT INTO `creditrating` VALUES (1,'Undefined',NULL),(2,'Poor',NULL),(3,'Fair',NULL),(4,'Average',NULL),(5,'Good',NULL),(6,'Excellent',NULL);
/*!40000 ALTER TABLE `creditrating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currencies` (
  `CurrencyID` int(11) NOT NULL AUTO_INCREMENT,
  `CurrencyName` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `CurrencySymbol` char(1) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`CurrencyID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
INSERT INTO `currencies` VALUES (1,'British Pound','£'),(2,'Euro','€');
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(64) DEFAULT NULL,
  `Iso4217Code` varchar(8) DEFAULT NULL,
  `SymbolUTF8` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (1,'British Pound Sterling','GBP','£');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_data`
--

DROP TABLE IF EXISTS `custom_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_data` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `NodeRef` int(11) DEFAULT NULL,
  `NodeParentRef` int(11) DEFAULT NULL,
  `CompanyID` int(11) DEFAULT NULL,
  `DataLevel` smallint(4) DEFAULT '0',
  `Position` tinyint(4) DEFAULT '0',
  `DataTitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DataContent` mediumtext COLLATE utf8_unicode_ci,
  `DataNotes` mediumtext COLLATE utf8_unicode_ci,
  `Printable` tinyint(1) DEFAULT '1',
  `Active` tinyint(1) DEFAULT '1',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`DataID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_data`
--

LOCK TABLES `custom_data` WRITE;
/*!40000 ALTER TABLE `custom_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_data_templates`
--

DROP TABLE IF EXISTS `custom_data_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_data_templates` (
  `NodeRef` int(11) NOT NULL,
  `CompanyID` int(11) DEFAULT NULL,
  `DataLevel` smallint(4) DEFAULT '0',
  `NodeParentRef` decimal(11,0) NOT NULL DEFAULT '0',
  `Position` tinyint(4) DEFAULT '0',
  `DataTitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DataContent` mediumtext COLLATE utf8_unicode_ci,
  `Printable` tinyint(1) DEFAULT '1',
  `Active` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`NodeRef`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_data_templates`
--

LOCK TABLES `custom_data_templates` WRITE;
/*!40000 ALTER TABLE `custom_data_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_data_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customfieldactualvalue`
--

DROP TABLE IF EXISTS `customfieldactualvalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customfieldactualvalue` (
  `ID` int(11) NOT NULL,
  `ProjectID` int(11) DEFAULT NULL,
  `CompanyID` int(11) DEFAULT NULL,
  `ContactID` int(11) DEFAULT NULL,
  `TaskID` int(11) DEFAULT NULL,
  `PurchaseOrderID` int(11) DEFAULT NULL,
  `FieldID` int(11) NOT NULL,
  `Value` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_CustomFieldActualValue_projects1_idx` (`ProjectID`),
  KEY `fk_CustomFieldActualValue_CustomFieldControl1_idx` (`FieldID`),
  KEY `fk_CustomFieldActualValue_companies1_idx` (`CompanyID`),
  KEY `fk_CustomFieldActualValue_contacts1_idx` (`ContactID`),
  KEY `fk_CustomFieldActualValue_tasks1_idx` (`TaskID`),
  KEY `fk_CustomFieldActualValue_pos1_idx` (`PurchaseOrderID`),
  CONSTRAINT `fk_CustomFieldActualValue_CustomFieldControl1` FOREIGN KEY (`FieldID`) REFERENCES `customfieldcontrol` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_CustomFieldActualValue_companies1` FOREIGN KEY (`CompanyID`) REFERENCES `companies` (`CompanyID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_CustomFieldActualValue_contacts1` FOREIGN KEY (`ContactID`) REFERENCES `contacts` (`ContactID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_CustomFieldActualValue_pos1` FOREIGN KEY (`PurchaseOrderID`) REFERENCES `pos` (`POID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_CustomFieldActualValue_projects1` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`ProjectID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_CustomFieldActualValue_tasks1` FOREIGN KEY (`TaskID`) REFERENCES `tasks` (`TaskID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customfieldactualvalue`
--

LOCK TABLES `customfieldactualvalue` WRITE;
/*!40000 ALTER TABLE `customfieldactualvalue` DISABLE KEYS */;
INSERT INTO `customfieldactualvalue` VALUES (1,25,NULL,NULL,NULL,NULL,1,'March'),(2,17,NULL,NULL,NULL,NULL,1,'January'),(3,4,NULL,NULL,NULL,NULL,1,'December'),(4,12,NULL,NULL,NULL,NULL,1,'March'),(5,28,NULL,NULL,NULL,NULL,1,'February'),(6,NULL,17,NULL,NULL,NULL,2,'24/02/2015');
/*!40000 ALTER TABLE `customfieldactualvalue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customfieldcontrol`
--

DROP TABLE IF EXISTS `customfieldcontrol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customfieldcontrol` (
  `ID` int(11) NOT NULL,
  `Model` enum('projects','companies','contacts','tasks','pos') COLLATE utf8_unicode_ci NOT NULL,
  `ControlType` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `Label` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Comment` text COLLATE utf8_unicode_ci,
  `SortOrder` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ToolTip` text COLLATE utf8_unicode_ci,
  `GroupID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_CustomFieldControl_CustomFieldDisplayGroup1_idx` (`GroupID`),
  CONSTRAINT `fk_CustomFieldControl_CustomFieldDisplayGroup1` FOREIGN KEY (`GroupID`) REFERENCES `customfielddisplaygroup` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customfieldcontrol`
--

LOCK TABLES `customfieldcontrol` WRITE;
/*!40000 ALTER TABLE `customfieldcontrol` DISABLE KEYS */;
INSERT INTO `customfieldcontrol` VALUES (1,'projects','TextBox','Sales Month','Sales Month','1','Sales Month',1),(2,'companies','DateTimePicker','Last Visit Date','Last Visit Date','1','Last Visit Date',2),(3,'companies','DateTimePicker','Next Visit Date','Next Visit Date','2','Next Visit Date',2);
/*!40000 ALTER TABLE `customfieldcontrol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customfielddisplaygroup`
--

DROP TABLE IF EXISTS `customfielddisplaygroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customfielddisplaygroup` (
  `ID` int(11) NOT NULL,
  `Label` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `SortOrder` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Comment` text COLLATE utf8_unicode_ci,
  `ToolTip` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customfielddisplaygroup`
--

LOCK TABLES `customfielddisplaygroup` WRITE;
/*!40000 ALTER TABLE `customfielddisplaygroup` DISABLE KEYS */;
INSERT INTO `customfielddisplaygroup` VALUES (1,'Extended Information','2','Projects','Projects'),(2,'Visit Information','2','Visit Information','Visit Information');
/*!40000 ALTER TABLE `customfielddisplaygroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customfieldoptionvalue`
--

DROP TABLE IF EXISTS `customfieldoptionvalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customfieldoptionvalue` (
  `ID` int(11) NOT NULL,
  `FieldID` int(11) NOT NULL,
  `Value` text COLLATE utf8_unicode_ci NOT NULL,
  `Comment` text COLLATE utf8_unicode_ci,
  `ToolTip` text COLLATE utf8_unicode_ci,
  `PlaceholderText` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`ID`,`FieldID`),
  KEY `fk_CustomFieldOptionValue_CustomFieldControl1_idx` (`FieldID`),
  CONSTRAINT `fk_CustomFieldOptionValue_CustomFieldControl1` FOREIGN KEY (`FieldID`) REFERENCES `customfieldcontrol` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customfieldoptionvalue`
--

LOCK TABLES `customfieldoptionvalue` WRITE;
/*!40000 ALTER TABLE `customfieldoptionvalue` DISABLE KEYS */;
/*!40000 ALTER TABLE `customfieldoptionvalue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customreport`
--

DROP TABLE IF EXISTS `customreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customreport` (
  `ReportID` int(11) NOT NULL AUTO_INCREMENT,
  `ReportTitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ReportSQL` text COLLATE utf8_unicode_ci NOT NULL,
  `ReportActive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ReportID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customreport`
--

LOCK TABLES `customreport` WRITE;
/*!40000 ALTER TABLE `customreport` DISABLE KEYS */;
INSERT INTO `customreport` VALUES (1,'Current Opportunities','SELECT \n	P.ProjectID AS \"Ref. No.\",\n	C.Company,\n    P.Description,\n    U.Name AS \"Acc. Mgr.\",\n    COALESCE(OS.OppStatus, \"Not Set\") AS \"Status\",\n    P.ProjectValue AS \"Project Value\",\n    P.OppProbability AS \"Probability\",\n    P.OppEstCloseDate AS \"Est. Close Date\",\n    P.RecordCreationDate AS \"Entry Date\",\n    COALESCE(I.Industry, \"Not Specified\") AS \"Industry\"\nFROM projects AS P\nLEFT JOIN companies AS C ON P.CompanyID = C.CompanyID\nLEFT JOIN users AS U ON P.AccMgrID = U.UserID\nLEFT JOIN opportunitystatus AS OS ON P.Status = OS.OppStatusID\nLEFT JOIN industry AS I ON C.IndustryID= I.IndustryID;',1),(2,'Current Suppliers','SELECT \n	C.Company,\n    C.Abbreviation AS \"Account Ref.\",\n    P.Description AS \"Supplier Project Description\",\n    P.ProjectID AS \"Opportunity Ref. No.\",\n    P.Description,\n    COALESCE(OS.OppStatus, \"Not Set\") AS \"Status\",\n    P.OppProbability AS \"Probability\",\n    P.OppEstCloseDate AS \"Est. Close Date\"\nFROM companies AS C\nLEFT JOIN projects AS P ON C.CompanyID = P.CompanyID\nLEFT JOIN opportunitystatus AS OS ON P.Status = OS.OppStatusID\nWHERE C.Supplier = -1;\n',0),(3,'Current Purchase Orders','SELECT \n	PO.POID AS \"PO Number\",\n    C.Company AS \"Supplier\",\n    \"SO Number\" AS \"SO Number\", #SO Number\n    CU.CurrencySymbol AS \"Currency\",\n    \"0.00\" AS \"Cost\", #Order Cost\n    \"Description\" AS \"Description\", #Description,\n    PO.PurchaseDate AS \"Order Date\",\n    \"Payment Timing\" AS \"Payment Timing\"\nFROM pos AS PO\nLEFT JOIN companies AS C ON PO.SupplierID = C.CompanyID\nLEFT JOIN currencies AS CU ON PO.CurrencyID = CU.CurrencyID;',0),(4,'Project Sales Months','SELECT \n 	P.ProjectID AS \"Ref. No\",\n     P.Description AS \"Project\",\n     CFAV.Value AS \"Sales Month\",\n     P.ProjectValue AS \"Value\",\n     U.Name AS \"Project Manager\"\n FROM projects AS P\n LEFT JOIN customfieldactualvalue AS CFAV on P.ProjectID = CFAV.ProjectID\n LEFT JOIN users AS U on P.AccMgrID = U.UserID\n WHERE CFAV.ProjectID IS NOT NULL\n AND CFAV.FieldID=(SELECT ID FROM customfieldcontrol WHERE Label=\"Sales Month\");',1);
/*!40000 ALTER TABLE `customreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deviceclass`
--

DROP TABLE IF EXISTS `deviceclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deviceclass` (
  `ClassID` int(11) NOT NULL DEFAULT '0',
  `Class` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ClassDescription` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ClassID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceclass`
--

LOCK TABLES `deviceclass` WRITE;
/*!40000 ALTER TABLE `deviceclass` DISABLE KEYS */;
/*!40000 ALTER TABLE `deviceclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `AssetID` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyID` decimal(11,0) DEFAULT NULL,
  `Make` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Model` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ComputerName` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `User` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Info` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SerialNo` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ClassID` decimal(11,0) DEFAULT NULL,
  `TotalDiskSpace` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Memory` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Processor` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PurchaseDate` date DEFAULT NULL,
  `WarrantyExpiryDate` date DEFAULT NULL,
  `EstimatedEOLDate` date DEFAULT NULL,
  `Active` decimal(1,0) DEFAULT NULL,
  `Dead` decimal(1,0) DEFAULT NULL,
  `Verified` decimal(1,0) DEFAULT NULL,
  `ContactID` decimal(11,0) DEFAULT NULL,
  `Notes` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`AssetID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,4,'DELL','Latitude E6440','SID-4784','Cambridge Software Ltd. Head Ofice',NULL,'','',NULL,'465GB','8192MB','Inter Core i5 4300M 2.60GHz','2015-01-09','2016-12-09','2018-12-31',-1,0,NULL,296,NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) DEFAULT NULL,
  `Location` text,
  `Type` varchar(45) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL,
  `CompanyID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (78,'Classes.txt','Classes.txt','.txt','2015-01-23 15:24:50',13);
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ToAddress` varchar(2048) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FromAddress` varchar(2048) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CC` varchar(2048) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Subject` varchar(4096) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PlainText` text COLLATE utf8_unicode_ci,
  `EmailLocation` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MessageEntryId` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email`
--

LOCK TABLES `email` WRITE;
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
INSERT INTO `email` VALUES (10,'damien.robson@cambridge-software.com; david.mcleary@cambridge-software.com; ','david.mcleary@cambridge-software.com','','Uptime monitor','Hello Damien,\r\n\r\nThis is the internet monitor that I cam across and wondered whether we could emulate?\r\n\r\nhttps://www.netuptimemonitor.com/\r\n\r\nRegards,\r\n\r\n\r\n\r\n\r\nDavid McLeary\r\nOperations Manager\r\n\r\nDDI: 01223 802902\r\nMob: 07917 458657','0418ddfe-2a4e-4da0-950f-7e7acfe88222.msg','VQBwAHQAaQBtAGUAIABtAG8AbgBpAHQAbwByAGQAYQBtAGkAZQBuAC4AcgBvAGIAcwBvAG4AQABjAGEAbQBiAHIAaQBkAGcAZQAtAHMAbwBmAHQAdwBhAHIAZQAuAGMAbwBtAGQAYQB2AGkAZAAuAG0AYwBsAGUAYQByAHkAQABjAGEAbQBiAHIAaQBkAGcAZQAtAHMAbwBmAHQAdwBhAHIAZQAuAGMAbwBtADEAOAAvADAAMgAvADIAMAAxADUAIAAwADkAOgAzADcAOgAxADEA'),(11,'damien.robson@cambridge-software.com; cam-soft@outlook.com; ','cam-soft@outlook.com','','Test CS#-028',' \r\n','fe05e2f3-0ad2-4c16-a1ae-32c923ddc6ae.msg','VABlAHMAdAAgAEMAUwAjAC0AMAAyADgAZABhAG0AaQBlAG4ALgByAG8AYgBzAG8AbgBAAGMAYQBtAGIAcgBpAGQAZwBlAC0AcwBvAGYAdAB3AGEAcgBlAC4AYwBvAG0AYwBhAG0ALQBzAG8AZgB0AEAAbwB1AHQAbABvAG8AawAuAGMAbwBtADIANQAvADAAMgAvADIAMAAxADUAIAAwADcAOgAzADUAOgAxADcA'),(12,'damien.robson@cambridge-software.com; david.mcleary@cambridge-software.com; ','david.mcleary@cambridge-software.com','','Fwd: GlobalPoint/Outlook issue: 25.02.15: Since GP add-ons to Outlook, Outlook now unresponsive, disconnecting, crashing constantly','---------- Forwarded message ----------\r\nFrom: \"Mike Thwaites\" <MikeThwaites@industrialij.com <mailto:MikeThwaites@industrialij.com> >\r\nDate: 25 Feb 2015 00:12\r\nSubject: GlobalPoint/Outlook issue: 25.02.15: Since GP add-ons to Outlook, Outlook now unresponsive, disconnecting, crashing constantly\r\nTo: \"David McLeary (david.mcleary@cambridge-software.com <mailto:david.mcleary@cambridge-software.com> )\" <david.mcleary@cambridge-software.com <mailto:david.mcleary@cambridge-software.com> >\r\nCc: \"Philip Mashinchi\" <phil.mash@brightvisions.co.uk <mailto:phil.mash@brightvisions.co.uk> >, \"Jo Carruthers\" <JoCarruthers@industrialij.com <mailto:JoCarruthers@industrialij.com> >, \"Ross Jackson\" <rossjackson@industrialij.com <mailto:rossjackson@industrialij.com> >\r\n\r\n\r\n\r\nHi David\r\n\r\n \r\n\r\nAll this week Outlook takes an age to load the GP add-ons, it takes ages to open an email, Outlook keeps being unresponsive and crashing\r\n\r\n \r\n\r\nI’m in the US and this is across the board with myself, Denise and Ed\r\n\r\n \r\n\r\nI’m in my hotel room with a 54Mbps connection and its just as bad\r\n\r\n \r\n\r\nRegards\r\n\r\n \r\n\r\nMike\r\n\r\n \r\n\r\nMike Thwaites\r\n\r\nGlobal Sales Manager\r\n\r\nIndustrial Inkjet Ltd               \r\n\r\nUnit 3 Meridian, Buckingway Business Park, Swavesey, Cambridgeshire, CB24 4AE\r\n\r\nPhone: +44 (0) 1954 232 023\r\n\r\nFax: +44 (0) 1954 230 566\r\n\r\nwww.industrialij.com <http://www.industrialij.com/> \r\n\r\n \r\n\r\n	\r\n\r\n \r\n\r\nThis email and any files transmitted with it are confidential and intended solely for the use of the addressee. If you have received this email in error please delete and notify the sender as soon as possible. Please note that any views or opinions presented in this email are solely those of the author and do not necessarily represent those of the company. Finally, whilst every precaution is taken against viruses, the recipient should check this email and any attachments for the presence of viruses. The company accepts no liability for any damage caused by any virus transmitted by this email, E&OE\r\n\r\nP     please consider the environment before printing this e-mail\r\n\r\n \r\n','bd3ec35e-6f6b-440a-bfb1-e40a2f57c78a.msg','RgB3AGQAOgAgAEcAbABvAGIAYQBsAFAAbwBpAG4AdAAvAE8AdQB0AGwAbwBvAGsAIABpAHMAcwB1AGUAOgAgADIANQAuADAAMgAuADEANQA6ACAAUwBpAG4AYwBlACAARwBQACAAYQBkAGQALQBvAG4AcwAgAHQAbwAgAE8AdQB0AGwAbwBvAGsALAAgAE8AdQB0AGwAbwBvAGsAIABuAG8AdwAgAHUAbgByAGUAcwBwAG8AbgBzAGkAdgBlACwAIABkAGkAcwBjAG8AbgBuAGUAYwB0AGkAbgBnACwAIABjAHIAYQBzAGgAaQBuAGcAIABjAG8AbgBzAHQAYQBuAHQAbAB5AGQAYQBtAGkAZQBuAC4AcgBvAGIAcwBvAG4AQABjAGEAbQBiAHIAaQBkAGcAZQAtAHMAbwBmAHQAdwBhAHIAZQAuAGMAbwBtAGQAYQB2AGkAZAAuAG0AYwBsAGUAYQByAHkAQABjAGEAbQBiAHIAaQBkAGcAZQAtAHMAbwBmAHQAdwBhAHIAZQAuAGMAbwBtADIANQAvADAAMgAvADIAMAAxADUAIAAwADcAOgA0ADAAOgAwADcA'),(13,'damien.robson@cambridge-software.com; notifications@basecamp.com; ','notifications@basecamp.com','','Daily Recap for Tuesday, February 24',' <https://d3dma7a8zw52bz.cloudfront.net/assets/mailer/bc_logo-4c962beca574c324ea2710c86db76c2f.png> 	\r\nBasecamp\r\n\r\n________________________________\r\n\r\n\r\nDaily Recap\r\nTuesday, February 24 \r\n\r\n________________________________\r\n\r\n\r\n1 project was updated:\r\n\r\n\r\n*	THSP Application Development <https://basecamp.com/2580594/projects/6987146>  \r\n\r\n\r\nTHSP Application Development <https://basecamp.com/2580594/projects/6987146> \r\n\r\n________________________________\r\n\r\n\r\n2 people contributed\r\n\r\n <https://basecamp.com/2580594/people/9630521>   <https://basecamp.com/2580594/people/9570532>  \r\n\r\n1 thing was discussed\r\n\r\n\r\nServer side work - DB and API <https://basecamp.com/2580594/projects/6987146/messages/38159285>  \r\n\r\nNew message by Jamie Collinson, 6 comments by Tony Hodge and Jamie Collinson \r\n\r\nStop receiving this daily email <https://basecamp.com/2580594/subscriptions/BAhbB2kDau2YSSITZ2xvYmFsX3N1bW1hcnkGOgZFVA==--1f9e903372512a926248450b4d4e4cccc5d88e08> . \r\n\r\n <http://dash.37signals.com/beanstalk/beacon.gif?return_receipt=RR/BCX/6dc46d8b8b86f71ca4663f27b7809e70> ','72975a2f-a45c-479b-9394-b4199ea9e401.msg','RABhAGkAbAB5ACAAUgBlAGMAYQBwACAAZgBvAHIAIABUAHUAZQBzAGQAYQB5ACwAIABGAGUAYgByAHUAYQByAHkAIAAyADQAZABhAG0AaQBlAG4ALgByAG8AYgBzAG8AbgBAAGMAYQBtAGIAcgBpAGQAZwBlAC0AcwBvAGYAdAB3AGEAcgBlAC4AYwBvAG0AbgBvAHQAaQBmAGkAYwBhAHQAaQBvAG4AcwBAAGIAYQBzAGUAYwBhAG0AcAAuAGMAbwBtADIANQAvADAAMgAvADIAMAAxADUAIAAwADcAOgA0ADAAOgAxADUA'),(14,'martin.engelke@imv-tec.com; damien.robson@cambridge-software.com; david.mcleary@cambridge-software.com; ','david.mcleary@cambridge-software.com','','Re: Elite / add template','Hello Martin,\r\n\r\nYou\'re welcome.\r\n\r\nOur new team works so fast here I don\'t even get time to let people know it\'s done! :D\r\n\r\nHappy to be of service.\r\n\r\nBest wishes,\r\n\r\n\r\n\r\n\r\n\r\nDavid McLeary\r\nOperations Manager\r\n\r\nDDI: 01223 802902\r\nMob: 07917 458657\r\n\r\nOn 24 February 2015 at 14:22, Martin Engelke <martin.engelke@imv-tec.com <mailto:martin.engelke@imv-tec.com> > wrote:\r\n\r\n\r\n	Hi David,\r\n\r\n	 \r\n\r\n	Have just seen that this is already done – many thanks for the quick turn around and your great support!\r\n\r\n	 \r\n\r\n	 \r\n\r\n	Viele Grüße / Best regards\r\n\r\n	Martin Engelke\r\n\r\n	 \r\n\r\n	From: David McLeary [mailto:david.mcleary@cambridge-software.com <mailto:david.mcleary@cambridge-software.com> ] \r\n	Sent: 24 February 2015 10:47\r\n	To: Martin Engelke\r\n	Cc: John Goodfellow\r\n	Subject: Re: Elite / add template\r\n\r\n	 \r\n\r\n	Good morning Martin,\r\n\r\n	 \r\n\r\n	Thanks for getting in touch and sending that over.\r\n\r\n	 \r\n\r\n	We\'ll get that work done for you shortly and I will come back to you when it\'s ready.\r\n\r\n	 \r\n\r\n	Should we need any further information I\'ll come back to you but for now please leave this with us.\r\n\r\n	 \r\n\r\n	Best wishes,\r\n\r\n	 \r\n\r\n	 \r\n\r\n	\r\n	\r\n\r\n	 \r\n\r\n	 \r\n\r\n	David McLeary\r\n\r\n	Operations Manager\r\n\r\n	DDI: 01223 802902\r\n\r\n	Mob: 07917 458657\r\n\r\n	 \r\n\r\n	On 24 February 2015 at 08:57, Martin Engelke <martin.engelke@imv-tec.com <mailto:martin.engelke@imv-tec.com> > wrote:\r\n\r\n		Hi David,\r\n\r\n		 \r\n\r\n		it would be great if you could please add the attached template (also already stored on the server in the Templates Folder) to the contacts (template available for the contact, similar to the Shortletter DE template).\r\n\r\n		 \r\n\r\n		 \r\n\r\n		 \r\n\r\n		 \r\n\r\n		 \r\n\r\n		Mit freundlichen Grüßen / Best regards\r\n\r\n		 \r\n\r\n		Martin Engelke\r\n\r\n		 \r\n\r\n		Dipl.-Ing. (FH) Martin Engelke\r\n\r\n		Sales and Marketing Manager\r\n\r\n		Austria, Germany, Switzerland\r\n\r\n		\r\n\r\n		Mobile: +49 (0)172 1705519\r\n\r\n		Office: +49 (0)89 90405 251\r\n\r\n		Skype-Name: marengelke\r\n\r\n		Fax: +49 (0)89 904050 66\r\n\r\n		 \r\n\r\n		IMV EUROPE Ltd.\r\n\r\n		Landsberger Straße 302\r\n\r\n		D-80687 München\r\n\r\n		www.imv-tec.com/de/ <http://www.imv-tec.com/de/> \r\n\r\n		www.eco-shaker.de <http://www.eco-shaker.de> \r\n\r\n		 \r\n\r\n		 \r\n\r\n		P Please consider the environment before printing this email\r\n\r\n		 \r\n\r\n		DISCLAIMER: This e-mail is intended solely for the named recipient.   If you are not the intended recipient of this email and/or you have received it in error, please notify the sender immediately and then delete it from your system.  This email (and any attachments) may contain confidential and/or privileged information.  Any unauthorised copying, printing, disclosure or distribution of the material contained in this email is strictly forbidden.  Internet communications are not necessarily secure. IMV Europe Ltd or any of its Group Company cannot accept any responsibility for the accuracy of completeness of the contents or attachments of this email, and cannot guarantee it to be virus free.  Anyone who communicates with us by email is taken to accept these risks.  No responsibility is accepted by IMV Europe Ltd or any of its Group Company for any personal emails or emails unconnected with the business of IMV Europe Ltd.\r\n\r\n		IMV Europe Limited is a private limited company incorporated in England and Wales under the registration number 8397294 at 1 Dunsbridge Business Park, Shepreth, Royston, Herts, SG8  6RA, United Kingdom.  \r\n\r\n		 \r\n\r\n	 \r\n\r\n	 \r\n\r\n	Cambridge Software Ltd\r\n\r\n	\r\n\r\n	01223 802900\r\n\r\n	www.cambridge-software.com <http://www.cambridge-software.com> \r\n\r\n	 \r\n\r\n	 <http://www.cambridge-software.com> \r\n\r\n	Join us on Twitter <https://twitter.com/cambridgesoft>  and LinkedIn <https://www.linkedin.com/company/cambridge-software> .\r\n\r\n	 \r\n\r\n	Cambridge Software Limited is registered in England and Wales as company number 8534878.\r\n\r\n	Registered Office: St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS\r\n\r\n	 \r\n\r\n	This E-mail is confidential. If you are not the addressee you may not copy, forward, disclose or use any part of it. If you have received this message in error, please delete it and all copies from your system and notify the sender immediately by return E-mail. Although Cambridge Software Limited operates anti-virus programmes, it does not accept responsibility for any damage whatsoever that is caused by viruses being passed. Any views or comments are personal to the writer and do not represent the official view of Cambridge Software Limited.\r\n\r\n','44ed8528-3bff-402f-83c6-4a55669bdf90.msg','UgBlADoAIABFAGwAaQB0AGUAIAAvACAAYQBkAGQAIAB0AGUAbQBwAGwAYQB0AGUAbQBhAHIAdABpAG4ALgBlAG4AZwBlAGwAawBlAEAAaQBtAHYALQB0AGUAYwAuAGMAbwBtAGQAYQBtAGkAZQBuAC4AcgBvAGIAcwBvAG4AQABjAGEAbQBiAHIAaQBkAGcAZQAtAHMAbwBmAHQAdwBhAHIAZQAuAGMAbwBtAGQAYQB2AGkAZAAuAG0AYwBsAGUAYQByAHkAQABjAGEAbQBiAHIAaQBkAGcAZQAtAHMAbwBmAHQAdwBhAHIAZQAuAGMAbwBtADIANQAvADAAMgAvADIAMAAxADUAIAAwADcAOgA0ADkAOgA0ADcA'),(15,'damien.robson@cambridge-software.com; notifications@basecamp.com; ','notifications@basecamp.com','','Re: (THSP Application Development) Server side work - DB and API','Write ABOVE THIS LINE to post a reply or view this on Basecamp <https://basecamp.com/2580594/projects/6987146/messages/38159285#comment_252760597>  \r\n\r\n <https://asset1.basecamp.com/2580594/people/9630521/photo/avatar.96.gif> 	Jamie Collinson posted a comment about this message on Basecamp. 	\r\n\r\nRe: Server side work - DB and API \r\n\r\nThanks Tony - just added Kirsty and copied her in on this thread.\r\n\r\nKirsty - if you click the link in the email and look back a couple of comments you\'ll see the fields we need to look up from the database. Can you help point us at which tables they\'re in? \r\n\r\nView this on Basecamp <https://basecamp.com/2580594/projects/6987146/messages/38159285#comment_252760597> \r\n\r\nThis email was sent to: David McLeary, Tony Hodge, Damien Robson, Jamie Collinson, and kirsty.trotter@thsp.co.uk. \r\n\r\nStop receiving emails <https://basecamp.com/2580594/subscriptions/BAhbB2kDau2YaQRxyRUk--cda098d4196ecb5de33b3b8a4d07a79b629acf28>  when comments are posted about this message. \r\n\r\n <http://dash.37signals.com/beanstalk/beacon.gif?return_receipt=RR/BCX/4462f33a6ab2cdaba15829d9f709fca0> ','79429587-45f6-4376-b63b-e443c72e4375.msg','UgBlADoAIAAoAFQASABTAFAAIABBAHAAcABsAGkAYwBhAHQAaQBvAG4AIABEAGUAdgBlAGwAbwBwAG0AZQBuAHQAKQAgAFMAZQByAHYAZQByACAAcwBpAGQAZQAgAHcAbwByAGsAIAAtACAARABCACAAYQBuAGQAIABBAFAASQBkAGEAbQBpAGUAbgAuAHIAbwBiAHMAbwBuAEAAYwBhAG0AYgByAGkAZABnAGUALQBzAG8AZgB0AHcAYQByAGUALgBjAG8AbQBuAG8AdABpAGYAaQBjAGEAdABpAG8AbgBzAEAAYgBhAHMAZQBjAGEAbQBwAC4AYwBvAG0AMgA1AC8AMAAyAC8AMgAwADEANQAgADEAMQA6ADIANwA6ADEANgA='),(16,'damien.robson@cambridge-software.com; cam-soft@outlook.com; ','cam-soft@outlook.com','','Test CS#-028',' \r\n','8466e976-b8a5-4e5a-8ad5-cef62d91ced2.msg','VABlAHMAdAAgAEMAUwAjAC0AMAAyADgAZABhAG0AaQBlAG4ALgByAG8AYgBzAG8AbgBAAGMAYQBtAGIAcgBpAGQAZwBlAC0AcwBvAGYAdAB3AGEAcgBlAC4AYwBvAG0AYwBhAG0ALQBzAG8AZgB0AEAAbwB1AHQAbABvAG8AawAuAGMAbwBtADIANQAvADAAMgAvADIAMAAxADUAIAAwADcAOgAzADYAOgAzADcA'),(17,'damien.robson@cambridge-software.com; notifications@basecamp.com; ','notifications@basecamp.com','','Re: (THSP Application Development) Server side work - DB and API','Write ABOVE THIS LINE to post a reply or view this on Basecamp <https://basecamp.com/2580594/projects/6987146/messages/38159285#comment_252768641>  \r\n\r\n <https://asset1.basecamp.com/2580594/people/10587481/photo/avatar.96.gif> 	Kirsty Trotter posted a comment about this message on Basecamp. 	\r\n\r\nRe: Server side work - DB and API \r\n\r\nHello, \r\n\r\nPlease see below.  This lists the entity the fields are located within, the field name, and the field type.\r\n\r\n\r\n\r\nClient data:\r\n\r\nclient_name – SV Entity – Account – Account look up\r\n\r\nclient_contact – SV Entity – Site Contact - Contact look up\r\n\r\nTHSP_client_number – SV Entity – Account Number \r\n\r\nsync_date\r\n\r\nemail1 – SV Entity - Site Report Recipient 1 – Contact look up\r\n\r\nemail2 - SV Entity - Site Report Recipient 2 - Contact look up\r\n\r\nemail3 - SV Entity - Site Report Recipient 3 - Contact look up\r\n\r\nemail4 - SV Entity - Site Report Recipient 4 - Contact look up\r\n\r\nJob data:\r\n\r\njob_name - SV Entity – Name\r\n\r\n \r\n\r\nWe have also added a field called job Refernce which is the unique identifier for the Site Visit.\r\n\r\n \r\n\r\nThanks, Kirsty \r\n\r\nView this on Basecamp <https://basecamp.com/2580594/projects/6987146/messages/38159285#comment_252768641> \r\n\r\nThis email was sent to: David McLeary, Tony Hodge, Damien Robson, Jamie Collinson, and Kirsty Trotter. \r\n\r\nStop receiving emails <https://basecamp.com/2580594/subscriptions/BAhbB2kDau2YaQRxyRUk--cda098d4196ecb5de33b3b8a4d07a79b629acf28>  when comments are posted about this message. \r\n\r\n <http://dash.37signals.com/beanstalk/beacon.gif?return_receipt=RR/BCX/ec151365f27c866dd383788e55c7d4b3> ','ab56ca6e-ef7c-43f2-8af3-634847d764e0.msg','UgBlADoAIAAoAFQASABTAFAAIABBAHAAcABsAGkAYwBhAHQAaQBvAG4AIABEAGUAdgBlAGwAbwBwAG0AZQBuAHQAKQAgAFMAZQByAHYAZQByACAAcwBpAGQAZQAgAHcAbwByAGsAIAAtACAARABCACAAYQBuAGQAIABBAFAASQBkAGEAbQBpAGUAbgAuAHIAbwBiAHMAbwBuAEAAYwBhAG0AYgByAGkAZABnAGUALQBzAG8AZgB0AHcAYQByAGUALgBjAG8AbQBuAG8AdABpAGYAaQBjAGEAdABpAG8AbgBzAEAAYgBhAHMAZQBjAGEAbQBwAC4AYwBvAG0AMgA1AC8AMAAyAC8AMgAwADEANQAgADEAMQA6ADIANwA6ADQAOAA=');
/*!40000 ALTER TABLE `email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailimportsettings`
--

DROP TABLE IF EXISTS `emailimportsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailimportsettings` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(512) NOT NULL,
  `Password` varchar(512) NOT NULL,
  `Domain` varchar(512) NOT NULL,
  `Server` varchar(512) DEFAULT NULL,
  `Port` int(11) DEFAULT NULL,
  `UseSSL` tinyint(1) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `MailboxType` varchar(256) NOT NULL,
  `SourceFolder` varchar(256) DEFAULT NULL,
  `ArchiveFolder` varchar(256) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailimportsettings`
--

LOCK TABLES `emailimportsettings` WRITE;
/*!40000 ALTER TABLE `emailimportsettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailimportsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `EmpID` int(11) NOT NULL AUTO_INCREMENT,
  `ManagerID` decimal(11,0) DEFAULT NULL,
  `CostRateID` decimal(11,0) DEFAULT NULL,
  `DefaultProjectID` decimal(11,0) DEFAULT NULL,
  `Title` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Forename` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Initials` char(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Surname` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Address` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `City` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `County` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PostCode` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Country` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HomePhone` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `OfficePhone` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PhoneExt` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Mobile` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `JoiningDate` date DEFAULT NULL,
  `LeavingDate` date DEFAULT NULL,
  `NationalInsuranceNo` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NextOfKin` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NextOfKinPhone` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NextOfKinRelationship` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Pension` tinyint(1) DEFAULT NULL,
  `HealthScheme` tinyint(1) DEFAULT NULL,
  `Timesheets` tinyint(1) DEFAULT NULL,
  `HolidaysRemaining` decimal(10,0) NOT NULL DEFAULT '0',
  `Active` tinyint(1) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`EmpID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,NULL,NULL,NULL,'Mr.','Philip',NULL,'Mashinchi','',NULL,'','','','','United Kingdom',NULL,'','','7940 516 003',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,0,1,'2014-12-13 07:14:16'),(2,NULL,NULL,NULL,'Mr.','Steven',NULL,'Ridley','',NULL,'','','','','United Kingdom',NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,0,1,'2014-12-13 07:14:20'),(3,NULL,NULL,NULL,'Mr.','Jason',NULL,'Mashinchi','',NULL,'','','','','United Kingdom',NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,0,1,NULL),(4,NULL,NULL,NULL,'Mr.','Damien',NULL,'Robson','',NULL,'','','','','United Kingdom',NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,-3,1,'2015-02-27 11:45:35'),(5,NULL,NULL,NULL,'Mr.','David',NULL,'McLeary','',NULL,'','','','','United Kingdom',NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,0,1,NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipmentclass`
--

DROP TABLE IF EXISTS `equipmentclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipmentclass` (
  `ClassID` int(11) NOT NULL DEFAULT '0',
  `Class` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ClassDescription` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ClassID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipmentclass`
--

LOCK TABLES `equipmentclass` WRITE;
/*!40000 ALTER TABLE `equipmentclass` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipmentclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventlog`
--

DROP TABLE IF EXISTS `eventlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventlog` (
  `EventID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` decimal(11,0) DEFAULT NULL,
  `ProjectID` decimal(11,0) DEFAULT NULL,
  `UserName` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EventCategory` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EventDate` datetime DEFAULT NULL,
  `EventDesc` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=1496 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventlog`
--

LOCK TABLES `eventlog` WRITE;
/*!40000 ALTER TABLE `eventlog` DISABLE KEYS */;
INSERT INTO `eventlog` VALUES (1,1,0,'Admin','Login','2014-10-10 13:23:05','Admin logged in...'),(2,1,0,'Admin','Logout','2014-10-10 13:23:43','Admin logged out...'),(3,1,0,'Admin','Login','2014-10-10 13:49:00','Admin logged in...'),(4,1,0,'Admin','Login','2014-10-10 13:52:57','Admin logged in...'),(5,1,0,'Admin','Logout','2014-10-10 13:53:17','Admin logged out...'),(6,1,0,'Admin','Login','2014-10-10 13:53:52','Admin logged in...'),(7,1,0,'Admin','Logout','2014-10-10 13:54:13','Admin logged out...'),(8,1,0,'Admin','Login','2014-10-15 08:18:47','Admin logged in...'),(9,1,0,'Admin','Logout','2014-10-15 08:28:36','Admin logged out...'),(10,1,0,'Admin','Login','2014-10-15 17:19:14','Admin logged in...'),(11,1,0,'Admin','Logout','2014-10-15 17:20:16','Admin logged out...'),(12,1,0,'Admin','Login','2014-10-15 17:20:53','Admin logged in...'),(13,1,0,'Admin','Login','2014-10-15 17:22:52','Admin logged in...'),(14,1,0,'Admin','Logout','2014-10-15 17:23:08','Admin logged out...'),(15,2,0,'Jason Mashinchi','Login','2014-10-18 15:40:04','Jason Mashinchi logged in...'),(16,2,0,'Jason Mashinchi','Logout','2014-10-18 15:40:32','Jason Mashinchi logged out...'),(17,2,0,'Jason Mashinchi','Login','2014-10-18 17:17:31','Jason Mashinchi logged in...'),(18,2,0,'Jason Mashinchi','Logout','2014-10-18 17:18:21','Jason Mashinchi logged out...'),(19,2,0,'Jason Mashinchi','Login','2014-10-27 22:32:52','Jason Mashinchi logged in...'),(20,2,0,'Jason Mashinchi','Logout','2014-10-27 22:33:01','Jason Mashinchi logged out...'),(21,2,0,'Jason Mashinchi','Login','2014-10-29 16:00:27','Jason Mashinchi logged in...'),(22,2,0,'Jason Mashinchi','Logout','2014-10-29 16:00:56','Jason Mashinchi logged out...'),(23,2,0,'Jason Mashinchi','Login','2014-10-29 16:07:40','Jason Mashinchi logged in...'),(24,2,0,'Jason Mashinchi','Logout','2014-10-29 16:12:38','Jason Mashinchi logged out...'),(25,2,0,'Jason Mashinchi','Login','2014-10-29 17:52:21','Jason Mashinchi logged in...'),(26,2,0,'Jason Mashinchi','Logout','2014-10-29 17:52:25','Jason Mashinchi logged out...'),(27,2,0,'Jason Mashinchi','Login','2014-10-30 20:40:08','Jason Mashinchi logged in...'),(28,2,0,'Jason Mashinchi','Login','2014-10-30 20:42:39','Jason Mashinchi logged in...'),(29,2,0,'Jason Mashinchi','Login','2014-10-30 20:48:04','Jason Mashinchi logged in...'),(30,2,0,'Jason Mashinchi','Login','2014-10-30 20:49:45','Jason Mashinchi logged in...'),(31,2,0,'Jason Mashinchi','Login','2014-10-30 20:50:48','Jason Mashinchi logged in...'),(32,2,0,'Jason Mashinchi','Login','2014-10-30 20:54:03','Jason Mashinchi logged in...'),(33,2,0,'Jason Mashinchi','Login','2014-10-30 20:55:11','Jason Mashinchi logged in...'),(34,2,0,'Jason Mashinchi','Login','2014-10-30 20:56:35','Jason Mashinchi logged in...'),(35,2,0,'Jason Mashinchi','Login','2014-10-30 20:58:13','Jason Mashinchi logged in...'),(36,2,0,'Jason Mashinchi','Login','2014-10-30 20:59:01','Jason Mashinchi logged in...'),(37,2,0,'Jason Mashinchi','Login','2014-10-30 21:02:10','Jason Mashinchi logged in...'),(38,2,0,'Jason Mashinchi','Login','2014-10-30 21:03:35','Jason Mashinchi logged in...'),(39,2,0,'Jason Mashinchi','Login','2014-10-30 21:04:51','Jason Mashinchi logged in...'),(40,2,0,'Jason Mashinchi','Login','2014-10-30 21:09:07','Jason Mashinchi logged in...'),(41,2,0,'Jason Mashinchi','Login','2014-10-30 21:11:24','Jason Mashinchi logged in...'),(42,2,0,'Jason Mashinchi','Login','2014-10-30 21:13:23','Jason Mashinchi logged in...'),(43,2,0,'Jason Mashinchi','Login','2014-10-30 21:15:22','Jason Mashinchi logged in...'),(44,2,0,'Jason Mashinchi','Login','2014-10-30 21:16:28','Jason Mashinchi logged in...'),(45,2,0,'Jason Mashinchi','Login','2014-10-30 21:18:30','Jason Mashinchi logged in...'),(46,2,0,'Jason Mashinchi','Login','2014-10-30 21:20:59','Jason Mashinchi logged in...'),(47,2,0,'Jason Mashinchi','Logout','2014-10-30 21:21:35','Jason Mashinchi logged out...'),(48,2,0,'Jason Mashinchi','Login','2014-10-30 21:22:41','Jason Mashinchi logged in...'),(49,2,0,'Jason Mashinchi','Login','2014-10-30 21:24:45','Jason Mashinchi logged in...'),(50,2,0,'Jason Mashinchi','Login','2014-10-30 21:25:28','Jason Mashinchi logged in...'),(51,2,0,'Jason Mashinchi','Login','2014-10-30 21:28:11','Jason Mashinchi logged in...'),(52,2,0,'Jason Mashinchi','Login','2014-10-31 08:41:33','Jason Mashinchi logged in...'),(53,2,0,'Jason Mashinchi','Logout','2014-10-31 09:04:06','Jason Mashinchi logged out...'),(54,2,0,'Jason Mashinchi','Login','2014-10-31 10:04:53','Jason Mashinchi logged in...'),(55,2,0,'Jason Mashinchi','Login','2014-10-31 10:07:10','Jason Mashinchi logged in...'),(56,2,0,'Jason Mashinchi','Login','2014-10-31 10:10:03','Jason Mashinchi logged in...'),(57,2,0,'Jason Mashinchi','Login','2014-10-31 10:11:44','Jason Mashinchi logged in...'),(58,2,0,'Jason Mashinchi','Login','2014-10-31 10:28:00','Jason Mashinchi logged in...'),(59,2,0,'Jason Mashinchi','Login','2014-10-31 10:31:38','Jason Mashinchi logged in...'),(60,2,0,'Jason Mashinchi','Login','2014-10-31 10:33:27','Jason Mashinchi logged in...'),(61,2,0,'Jason Mashinchi','Login','2014-10-31 10:34:46','Jason Mashinchi logged in...'),(62,2,0,'Jason Mashinchi','Login','2014-10-31 10:35:21','Jason Mashinchi logged in...'),(63,2,0,'Jason Mashinchi','Login','2014-10-31 10:38:02','Jason Mashinchi logged in...'),(64,2,0,'Jason Mashinchi','Login','2014-10-31 10:40:34','Jason Mashinchi logged in...'),(65,2,0,'Jason Mashinchi','Login','2014-10-31 10:41:19','Jason Mashinchi logged in...'),(66,2,0,'Jason Mashinchi','Login','2014-10-31 10:42:19','Jason Mashinchi logged in...'),(67,2,0,'Jason Mashinchi','Login','2014-10-31 10:43:05','Jason Mashinchi logged in...'),(68,2,0,'Jason Mashinchi','Login','2014-10-31 10:43:58','Jason Mashinchi logged in...'),(69,1,0,'Admin','Login','2014-11-22 16:38:53','Admin logged in...'),(70,1,0,'Admin','Login','2014-11-22 16:42:05','Admin logged in...'),(71,1,0,'Admin','Logout','2014-11-22 16:42:15','Admin logged out...'),(72,1,0,'Admin','Logout','2014-11-22 16:45:23','Admin logged out...'),(73,1,0,'Admin','Login','2014-11-22 16:46:22','Admin logged in...'),(74,1,0,'Admin','Logout','2014-11-22 16:46:51','Admin logged out...'),(75,1,0,'Admin','Login','2014-11-23 15:30:48','Admin logged in...'),(76,1,0,'Admin','Logout','2014-11-23 15:30:53','Admin logged out...'),(77,1,0,'Admin','Login','2014-11-28 10:27:25','Admin logged in...'),(78,1,0,'Admin','Login','2014-11-28 10:28:58','Admin logged in...'),(79,1,0,'Admin','Login','2014-11-28 10:42:15','Admin logged in...'),(80,7,0,'Jamie Collinson','Login','2014-11-28 11:03:28','Jamie Collinson logged in...'),(81,7,0,'Jamie Collinson','Logout','2014-11-28 11:06:49','Jamie Collinson logged out...'),(82,1,0,'Admin','Login','2014-11-28 11:09:01','Admin logged in...'),(83,1,0,'Admin','Logout','2014-11-28 11:28:27','Admin logged out...'),(84,1,0,'Admin','Login','2014-11-28 11:34:59','Admin logged in...'),(85,1,0,'Admin','Logout','2014-11-28 11:35:33','Admin logged out...'),(86,2,0,'Jason Mashinchi','Login','2014-11-28 11:37:33','Jason Mashinchi logged in...'),(87,5,0,'David McLeary','Login','2014-11-28 11:38:11','David McLeary logged in...'),(88,7,0,'Jamie Collinson','Login','2014-11-28 11:38:38','Jamie Collinson logged in...'),(89,2,0,'Jason Mashinchi','Logout','2014-11-28 11:40:56','Jason Mashinchi logged out...'),(90,7,0,'Jamie Collinson','Logout','2014-11-28 11:41:14','Jamie Collinson logged out...'),(91,2,0,'Jason Mashinchi','Login','2014-11-28 11:42:43','Jason Mashinchi logged in...'),(92,7,0,'Jamie Collinson','Login','2014-11-28 11:43:28','Jamie Collinson logged in...'),(93,7,0,'Jamie Collinson','Logout','2014-11-28 11:43:50','Jamie Collinson logged out...'),(94,2,0,'Jason Mashinchi','Logout','2014-11-28 11:57:28','Jason Mashinchi logged out...'),(95,2,0,'Jason Mashinchi','Login','2014-11-28 11:58:33','Jason Mashinchi logged in...'),(96,2,0,'Jason Mashinchi','Logout','2014-11-28 11:58:59','Jason Mashinchi logged out...'),(97,2,0,'Jason Mashinchi','Login','2014-11-28 12:02:59','Jason Mashinchi logged in...'),(98,2,0,'Jason Mashinchi','Logout','2014-11-28 12:03:13','Jason Mashinchi logged out...'),(99,2,0,'Jason Mashinchi','Login','2014-11-28 12:08:20','Jason Mashinchi logged in...'),(100,2,0,'Jason Mashinchi','Logout','2014-11-28 12:08:50','Jason Mashinchi logged out...'),(101,2,0,'Jason Mashinchi','Login','2014-11-28 12:09:24','Jason Mashinchi logged in...'),(102,2,0,'Jason Mashinchi','Logout','2014-11-28 12:09:44','Jason Mashinchi logged out...'),(103,7,0,'Jamie Collinson','Login','2014-11-28 12:28:59','Jamie Collinson logged in...'),(104,7,0,'Jamie Collinson','Logout','2014-11-28 12:29:27','Jamie Collinson logged out...'),(105,7,0,'Jamie Collinson','Login','2014-11-28 12:55:00','Jamie Collinson logged in...'),(106,7,0,'Jamie Collinson','Logout','2014-11-28 12:55:53','Jamie Collinson logged out...'),(107,5,1,'David McLeary','Projects','2014-11-28 13:05:44','Project updated and saved.'),(108,5,2,'David McLeary','Projects','2014-11-28 13:15:25','Project updated and saved.'),(109,5,3,'David McLeary','Projects','2014-11-28 13:16:49','Project updated and saved.'),(110,5,4,'David McLeary','Projects','2014-11-28 15:53:39','Project updated and saved.'),(111,5,0,'David McLeary','Logout','2014-11-28 17:23:58','David McLeary logged out...'),(112,2,0,'Jason Mashinchi','Login','2014-11-28 19:34:18','Jason Mashinchi logged in...'),(113,2,0,'Jason Mashinchi','Logout','2014-11-28 19:35:35','Jason Mashinchi logged out...'),(114,5,0,'David McLeary','Login','2014-11-29 08:10:35','David McLeary logged in...'),(115,5,5,'David McLeary','Projects','2014-11-29 08:14:04','Project updated and saved.'),(116,5,6,'David McLeary','Projects','2014-11-29 08:56:30','Project updated and saved.'),(117,5,0,'David McLeary','Login','2014-11-29 18:12:09','David McLeary logged in...'),(118,5,0,'David McLeary','Logout','2014-11-29 18:33:28','David McLeary logged out...'),(119,2,0,'Jason Mashinchi','Login','2014-11-29 19:05:49','Jason Mashinchi logged in...'),(120,2,0,'Jason Mashinchi','Logout','2014-11-29 19:08:14','Jason Mashinchi logged out...'),(121,2,0,'Jason Mashinchi','Login','2014-11-29 19:28:02','Jason Mashinchi logged in...'),(122,2,0,'Jason Mashinchi','Logout','2014-11-29 19:28:15','Jason Mashinchi logged out...'),(123,2,0,'Jason Mashinchi','Login','2014-11-29 19:28:50','Jason Mashinchi logged in...'),(124,2,0,'Jason Mashinchi','Logout','2014-11-29 19:28:57','Jason Mashinchi logged out...'),(125,2,0,'Jason Mashinchi','Login','2014-11-29 19:29:20','Jason Mashinchi logged in...'),(126,2,0,'Jason Mashinchi','Logout','2014-11-29 19:29:32','Jason Mashinchi logged out...'),(127,2,0,'Jason Mashinchi','Login','2014-11-29 19:32:53','Jason Mashinchi logged in...'),(128,2,0,'Jason Mashinchi','Logout','2014-11-29 19:35:03','Jason Mashinchi logged out...'),(129,2,0,'Jason Mashinchi','Login','2014-11-29 19:35:33','Jason Mashinchi logged in...'),(130,2,0,'Jason Mashinchi','Logout','2014-11-29 19:35:36','Jason Mashinchi logged out...'),(131,1,0,'Admin','Login','2014-11-30 19:02:03','Admin logged in...'),(132,1,0,'Admin','Logout','2014-11-30 19:02:19','Admin logged out...'),(133,1,0,'Admin','Login','2014-11-30 19:17:04','Admin logged in...'),(134,1,0,'Admin','Logout','2014-11-30 19:18:14','Admin logged out...'),(135,1,0,'Admin','Login','2014-12-01 07:03:19','Admin logged in...'),(136,7,0,'Jamie Collinson','Login','2014-12-01 09:45:20','Jamie Collinson logged in...'),(137,7,0,'Jamie Collinson','Logout','2014-12-01 09:55:24','Jamie Collinson logged out...'),(138,5,0,'David McLeary','Login','2014-12-01 10:12:34','David McLeary logged in...'),(139,5,0,'David McLeary','Login','2014-12-01 10:59:40','David McLeary logged in...'),(140,5,0,'David McLeary','Logout','2014-12-01 11:55:34','David McLeary logged out...'),(141,5,0,'David McLeary','Logout','2014-12-01 15:37:47','David McLeary logged out...'),(142,5,0,'David McLeary','Login','2014-12-01 15:54:53','David McLeary logged in...'),(143,8,0,'Wayne Johnson','Logout','2014-12-01 16:55:04','Wayne Johnson logged out...'),(144,8,0,'Wayne Johnson','Login','2014-12-01 16:55:16','Wayne Johnson logged in...'),(145,8,0,'Wayne Johnson','Logout','2014-12-01 16:55:22','Wayne Johnson logged out...'),(146,5,0,'David McLeary','Logout','2014-12-01 19:55:33','David McLeary logged out...'),(147,5,0,'David McLeary','Login','2014-12-02 07:01:37','David McLeary logged in...'),(148,8,0,'Wayne Johnson','Login','2014-12-02 11:05:26','Wayne Johnson logged in...'),(149,8,7,'Wayne Johnson','Projects','2014-12-02 11:51:49','Project updated and saved.'),(150,8,7,'Wayne Johnson','Projects','2014-12-02 12:02:55','Project updated and saved.'),(151,8,7,'Wayne Johnson','Projects','2014-12-02 12:17:23','Project updated and saved.'),(152,8,0,'Wayne Johnson','Logout','2014-12-02 12:17:43','Wayne Johnson logged out...'),(153,8,0,'Wayne Johnson','Login','2014-12-02 12:21:46','Wayne Johnson logged in...'),(154,8,0,'Wayne Johnson','Logout','2014-12-02 12:26:07','Wayne Johnson logged out...'),(155,8,0,'Wayne Johnson','Login','2014-12-02 13:45:45','Wayne Johnson logged in...'),(156,8,0,'Wayne Johnson','Logout','2014-12-02 13:45:58','Wayne Johnson logged out...'),(157,8,0,'Wayne Johnson','Login','2014-12-02 13:49:46','Wayne Johnson logged in...'),(158,8,0,'Wayne Johnson','Login','2014-12-02 14:03:00','Wayne Johnson logged in...'),(159,8,0,'Wayne Johnson','Logout','2014-12-02 14:04:17','Wayne Johnson logged out...'),(160,8,0,'Wayne Johnson','Login','2014-12-02 14:04:48','Wayne Johnson logged in...'),(161,8,0,'Wayne Johnson','Logout','2014-12-02 14:33:24','Wayne Johnson logged out...'),(162,1,0,'Admin','Login','2014-12-03 07:30:12','Admin logged in...'),(163,6,0,'Madison Latham','Login','2014-12-03 14:22:28','Madison Latham logged in...'),(164,6,0,'Madison Latham','Logout','2014-12-03 14:24:29','Madison Latham logged out...'),(165,2,0,'Jason Mashinchi','Login','2014-12-04 11:46:44','Jason Mashinchi logged in...'),(166,2,0,'Jason Mashinchi','Logout','2014-12-04 11:49:11','Jason Mashinchi logged out...'),(167,2,0,'Jason Mashinchi','Login','2014-12-05 11:30:11','Jason Mashinchi logged in...'),(168,2,0,'Jason Mashinchi','Logout','2014-12-05 11:30:24','Jason Mashinchi logged out...'),(169,5,0,'David McLeary','Login','2014-12-05 15:03:50','David McLeary logged in...'),(170,5,1,'David McLeary','Projects','2014-12-05 15:05:02','Project updated and saved.'),(171,5,0,'David McLeary','Logout','2014-12-05 19:35:59','David McLeary logged out...'),(172,2,0,'Jason Mashinchi','Login','2014-12-06 21:43:36','Jason Mashinchi logged in...'),(173,2,0,'Jason Mashinchi','Logout','2014-12-06 21:43:44','Jason Mashinchi logged out...'),(174,2,0,'Jason Mashinchi','Login','2014-12-06 21:44:10','Jason Mashinchi logged in...'),(175,2,0,'Jason Mashinchi','Logout','2014-12-06 21:44:43','Jason Mashinchi logged out...'),(176,2,0,'Jason Mashinchi','Login','2014-12-06 21:48:14','Jason Mashinchi logged in...'),(177,2,0,'Jason Mashinchi','Logout','2014-12-06 21:48:37','Jason Mashinchi logged out...'),(178,2,0,'Jason Mashinchi','Login','2014-12-06 21:53:16','Jason Mashinchi logged in...'),(179,2,0,'Jason Mashinchi','Logout','2014-12-06 21:53:36','Jason Mashinchi logged out...'),(180,2,0,'Jason Mashinchi','Login','2014-12-06 21:54:48','Jason Mashinchi logged in...'),(181,2,0,'Jason Mashinchi','Logout','2014-12-06 21:55:41','Jason Mashinchi logged out...'),(182,2,0,'Jason Mashinchi','Login','2014-12-06 21:56:33','Jason Mashinchi logged in...'),(183,2,0,'Jason Mashinchi','Logout','2014-12-06 21:58:15','Jason Mashinchi logged out...'),(184,5,0,'David McLeary','Login','2014-12-08 07:59:07','David McLeary logged in...'),(185,5,0,'David McLeary','Logout','2014-12-08 07:59:17','David McLeary logged out...'),(186,5,0,'David McLeary','Login','2014-12-08 11:17:27','David McLeary logged in...'),(187,7,0,'Jamie Collinson','Login','2014-12-08 11:20:46','Jamie Collinson logged in...'),(188,7,0,'Jamie Collinson','Logout','2014-12-08 11:43:39','Jamie Collinson logged out...'),(189,7,0,'Jamie Collinson','Login','2014-12-08 11:43:48','Jamie Collinson logged in...'),(190,7,1,'Jamie Collinson','Projects','2014-12-08 11:44:36','Project status changed to :Quotation Sent(waiting response)'),(191,7,1,'Jamie Collinson','Projects','2014-12-08 11:44:38','Project status changed to :New(needs quotation)'),(192,7,1,'Jamie Collinson','Projects','2014-12-08 11:44:43','Project updated and saved.'),(193,7,1,'Jamie Collinson','Projects','2014-12-08 11:44:48','Project updated and saved.'),(194,7,1,'Jamie Collinson','Projects','2014-12-08 11:45:32','Project updated and saved.'),(195,7,4,'Jamie Collinson','Projects','2014-12-08 11:45:43','Project updated and saved.'),(196,7,4,'Jamie Collinson','Projects','2014-12-08 11:45:52','Project updated and saved.'),(197,7,0,'Jamie Collinson','Logout','2014-12-08 12:25:35','Jamie Collinson logged out...'),(198,5,8,'David McLeary','Projects','2014-12-08 13:13:06','Project updated and saved.'),(199,5,8,'David McLeary','Projects','2014-12-08 13:13:42','Project updated and saved.'),(200,2,0,'Jason Mashinchi','Login','2014-12-09 16:20:38','Jason Mashinchi logged in...'),(201,2,0,'Jason Mashinchi','Login','2014-12-09 16:29:08','Jason Mashinchi logged in...'),(202,2,0,'Jason Mashinchi','Login','2014-12-09 17:03:04','Jason Mashinchi logged in...'),(203,2,0,'Jason Mashinchi','Login','2014-12-09 17:06:29','Jason Mashinchi logged in...'),(204,2,0,'Jason Mashinchi','Login','2014-12-09 17:09:14','Jason Mashinchi logged in...'),(205,2,0,'Jason Mashinchi','Logout','2014-12-09 17:11:07','Jason Mashinchi logged out...'),(206,7,0,'Jamie Collinson','Login','2014-12-10 16:17:34','Jamie Collinson logged in...'),(207,7,0,'Jamie Collinson','Logout','2014-12-10 16:18:19','Jamie Collinson logged out...'),(208,5,0,'David McLeary','Login','2014-12-11 06:38:15','David McLeary logged in...'),(209,5,9,'David McLeary','Projects','2014-12-11 07:12:50','Project updated and saved.'),(210,5,9,'David McLeary','Projects','2014-12-11 07:13:41','Project updated and saved.'),(211,5,10,'David McLeary','Projects','2014-12-11 07:31:06','Project updated and saved.'),(212,5,10,'David McLeary','Projects','2014-12-11 07:33:11','Project updated and saved.'),(213,7,0,'Jamie Collinson','Login','2014-12-11 08:34:59','Jamie Collinson logged in...'),(214,7,0,'Jamie Collinson','Logout','2014-12-11 10:08:37','Jamie Collinson logged out...'),(215,5,8,'David McLeary','Projects','2014-12-11 10:40:51','Project updated and saved.'),(216,5,8,'David McLeary','Projects','2014-12-11 11:43:06','Project updated and saved.'),(217,5,10,'David McLeary','Projects','2014-12-11 11:57:42','Project updated and saved.'),(218,5,10,'David McLeary','Projects','2014-12-11 11:58:34','Project updated and saved.'),(219,5,2,'David McLeary','Projects','2014-12-11 13:14:05','Project updated and saved.'),(220,5,2,'David McLeary','Projects','2014-12-11 13:14:17','Project updated and saved.'),(221,5,2,'David McLeary','Projects','2014-12-11 13:15:19','Project updated and saved.'),(222,5,8,'David McLeary','Projects','2014-12-11 13:23:42','Project updated and saved.'),(223,5,8,'David McLeary','Projects','2014-12-11 13:23:46','Project updated and saved.'),(224,5,8,'David McLeary','Projects','2014-12-11 13:24:49','Project updated and saved.'),(225,5,8,'David McLeary','Projects','2014-12-11 13:25:11','Project updated and saved.'),(226,5,11,'David McLeary','Projects','2014-12-11 15:18:54','Project updated and saved.'),(227,5,11,'David McLeary','Projects','2014-12-11 15:18:59','Project updated and saved.'),(228,5,11,'David McLeary','Projects','2014-12-11 16:33:30','Project updated and saved.'),(229,5,0,'David McLeary','Logout','2014-12-11 18:37:52','David McLeary logged out...'),(230,5,0,'David McLeary','Login','2014-12-12 06:45:24','David McLeary logged in...'),(231,5,12,'David McLeary','Projects','2014-12-12 06:47:10','Project updated and saved.'),(232,5,13,'David McLeary','Projects','2014-12-12 06:47:44','Project updated and saved.'),(233,5,14,'David McLeary','Projects','2014-12-12 06:59:17','Project updated and saved.'),(234,5,14,'David McLeary','Projects','2014-12-12 07:00:51','Project updated and saved.'),(235,5,9,'David McLeary','Projects','2014-12-12 19:45:11','Project updated and saved.'),(236,5,4,'David McLeary','Projects','2014-12-12 19:46:46','Project updated and saved.'),(237,5,0,'David McLeary','Logout','2014-12-12 19:57:23','David McLeary logged out...'),(238,3,0,'Philip Mashinchi','Login','2014-12-12 21:05:22','Philip Mashinchi logged in...'),(239,3,0,'Philip Mashinchi','Logout','2014-12-12 21:05:27','Philip Mashinchi logged out...'),(240,3,0,'Philip Mashinchi','Login','2014-12-12 21:09:00','Philip Mashinchi logged in...'),(241,3,0,'Philip Mashinchi','Logout','2014-12-12 21:09:06','Philip Mashinchi logged out...'),(242,3,0,'Philip Mashinchi','Login','2014-12-12 21:22:12','Philip Mashinchi logged in...'),(243,3,0,'Philip Mashinchi','Logout','2014-12-12 21:27:54','Philip Mashinchi logged out...'),(244,3,0,'Philip Mashinchi','Login','2014-12-12 21:28:06','Philip Mashinchi logged in...'),(245,3,0,'Philip Mashinchi','Login','2014-12-12 21:35:18','Philip Mashinchi logged in...'),(246,3,0,'Philip Mashinchi','Logout','2014-12-12 21:36:02','Philip Mashinchi logged out...'),(247,3,0,'Philip Mashinchi','Login','2014-12-12 21:40:10','Philip Mashinchi logged in...'),(248,3,0,'Philip Mashinchi','Logout','2014-12-12 21:43:19','Philip Mashinchi logged out...'),(249,3,0,'Philip Mashinchi','Login','2014-12-12 21:45:52','Philip Mashinchi logged in...'),(250,3,0,'Philip Mashinchi','Login','2014-12-12 21:50:15','Philip Mashinchi logged in...'),(251,3,0,'Philip Mashinchi','Login','2014-12-12 21:56:18','Philip Mashinchi logged in...'),(252,3,0,'Philip Mashinchi','Login','2014-12-12 21:57:56','Philip Mashinchi logged in...'),(253,3,0,'Philip Mashinchi','Logout','2014-12-12 22:05:22','Philip Mashinchi logged out...'),(254,3,0,'Philip Mashinchi','Login','2014-12-12 22:19:00','Philip Mashinchi logged in...'),(255,3,0,'Philip Mashinchi','Logout','2014-12-12 22:22:47','Philip Mashinchi logged out...'),(256,3,0,'Philip Mashinchi','Login','2014-12-12 22:29:18','Philip Mashinchi logged in...'),(257,3,0,'Philip Mashinchi','Login','2014-12-12 22:32:49','Philip Mashinchi logged in...'),(258,3,0,'Philip Mashinchi','Login','2014-12-12 22:34:55','Philip Mashinchi logged in...'),(259,3,0,'Philip Mashinchi','Logout','2014-12-12 22:37:39','Philip Mashinchi logged out...'),(260,3,0,'Philip Mashinchi','Login','2014-12-13 06:01:49','Philip Mashinchi logged in...'),(261,3,0,'Philip Mashinchi','Login','2014-12-13 06:05:48','Philip Mashinchi logged in...'),(262,3,0,'Philip Mashinchi','Login','2014-12-13 06:08:50','Philip Mashinchi logged in...'),(263,3,0,'Philip Mashinchi','Logout','2014-12-13 06:09:50','Philip Mashinchi logged out...'),(264,3,0,'Philip Mashinchi','Login','2014-12-13 06:12:10','Philip Mashinchi logged in...'),(265,3,0,'Philip Mashinchi','Login','2014-12-13 06:13:40','Philip Mashinchi logged in...'),(266,3,0,'Philip Mashinchi','Login','2014-12-13 06:16:05','Philip Mashinchi logged in...'),(267,3,0,'Philip Mashinchi','Logout','2014-12-13 06:36:18','Philip Mashinchi logged out...'),(268,3,0,'Philip Mashinchi','Login','2014-12-13 06:46:29','Philip Mashinchi logged in...'),(269,2,0,'Jason Mashinchi','Login','2014-12-13 14:06:32','Jason Mashinchi logged in...'),(270,2,0,'Jason Mashinchi','Logout','2014-12-13 14:07:42','Jason Mashinchi logged out...'),(271,5,0,'David McLeary','Login','2014-12-13 14:36:24','David McLeary logged in...'),(272,2,0,'Jason Mashinchi','Login','2014-12-13 15:14:16','Jason Mashinchi logged in...'),(273,2,0,'Jason Mashinchi','Logout','2014-12-13 15:20:20','Jason Mashinchi logged out...'),(274,5,0,'David McLeary','Logout','2014-12-13 19:58:12','David McLeary logged out...'),(275,1,0,'Admin','Login','2014-12-14 06:50:22','Admin logged in...'),(276,1,0,'Admin','Login','2014-12-14 07:56:29','Admin logged in...'),(277,1,0,'Admin','Logout','2014-12-14 08:06:38','Admin logged out...'),(278,1,0,'Admin','Login','2014-12-14 08:06:53','Admin logged in...'),(279,1,0,'Admin','Logout','2014-12-14 08:09:33','Admin logged out...'),(280,1,0,'Admin','Login','2014-12-14 19:57:02','Admin logged in...'),(281,5,0,'David McLeary','Login','2014-12-15 07:03:02','David McLeary logged in...'),(282,5,11,'David McLeary','Projects','2014-12-15 07:03:37','Project status changed to :Quotation Given'),(283,5,11,'David McLeary','Projects','2014-12-15 07:03:53','Project updated and saved.'),(284,7,0,'Jamie Collinson','Login','2014-12-15 09:11:48','Jamie Collinson logged in...'),(285,7,0,'Jamie Collinson','Logout','2014-12-15 09:12:19','Jamie Collinson logged out...'),(286,5,2,'David McLeary','Projects','2014-12-15 10:04:11','Project updated and saved.'),(287,7,0,'Jamie Collinson','Login','2014-12-15 10:46:04','Jamie Collinson logged in...'),(288,7,0,'Jamie Collinson','Logout','2014-12-15 10:46:15','Jamie Collinson logged out...'),(289,5,5,'David McLeary','Projects','2014-12-15 11:05:44','Project updated and saved.'),(290,5,15,'David McLeary','Projects','2014-12-15 13:21:53','Project updated and saved.'),(291,5,15,'David McLeary','Projects','2014-12-15 13:25:31','Project updated and saved.'),(292,5,0,'David McLeary','Login','2014-12-15 16:27:36','David McLeary logged in...'),(293,5,0,'David McLeary','Logout','2014-12-15 16:29:18','David McLeary logged out...'),(294,5,0,'David McLeary','Login','2014-12-15 16:30:26','David McLeary logged in...'),(295,5,0,'David McLeary','Logout','2014-12-15 16:31:14','David McLeary logged out...'),(296,5,0,'David McLeary','Login','2014-12-15 16:31:35','David McLeary logged in...'),(297,2,0,'Jason Mashinchi','Login','2014-12-15 17:09:03','Jason Mashinchi logged in...'),(298,5,0,'David McLeary','Logout','2014-12-15 17:11:58','David McLeary logged out...'),(299,2,0,'Jason Mashinchi','Logout','2014-12-15 17:30:11','Jason Mashinchi logged out...'),(300,5,0,'David McLeary','Logout','2014-12-15 19:52:43','David McLeary logged out...'),(301,5,0,'David McLeary','Login','2014-12-16 09:42:48','David McLeary logged in...'),(302,5,0,'David McLeary','Logout','2014-12-16 09:44:03','David McLeary logged out...'),(303,5,0,'David McLeary','Login','2014-12-16 09:44:20','David McLeary logged in...'),(304,5,16,'David McLeary','Projects','2014-12-16 10:04:39','Project updated and saved.'),(305,5,16,'David McLeary','Projects','2014-12-16 10:41:13','Project updated and saved.'),(306,5,17,'David McLeary','Projects','2014-12-16 10:46:07','Project updated and saved.'),(307,5,17,'David McLeary','Projects','2014-12-16 10:50:46','Project updated and saved.'),(308,5,0,'David McLeary','Logout','2014-12-16 10:51:02','David McLeary logged out...'),(309,5,0,'David McLeary','Login','2014-12-16 11:04:01','David McLeary logged in...'),(310,5,18,'David McLeary','Projects','2014-12-16 12:16:36','Project updated and saved.'),(311,5,19,'David McLeary','Projects','2014-12-16 14:44:22','Project updated and saved.'),(312,5,0,'David McLeary','Logout','2014-12-16 16:36:41','David McLeary logged out...'),(313,2,0,'Jason Mashinchi','Login','2014-12-17 11:12:38','Jason Mashinchi logged in...'),(314,2,0,'Jason Mashinchi','Logout','2014-12-17 11:14:22','Jason Mashinchi logged out...'),(315,7,0,'Jamie Collinson','Login','2014-12-18 09:18:13','Jamie Collinson logged in...'),(316,7,0,'Jamie Collinson','Logout','2014-12-18 09:18:21','Jamie Collinson logged out...'),(317,7,0,'Jamie Collinson','Login','2014-12-18 09:25:17','Jamie Collinson logged in...'),(318,7,0,'Jamie Collinson','Logout','2014-12-18 09:25:33','Jamie Collinson logged out...'),(319,5,0,'David McLeary','Login','2014-12-18 10:51:44','David McLeary logged in...'),(320,5,0,'David McLeary','Login','2014-12-22 08:59:31','David McLeary logged in...'),(321,5,20,'David McLeary','Projects','2014-12-22 09:01:03','Project updated and saved.'),(322,5,10,'David McLeary','Projects','2014-12-22 17:24:26','Project status changed to :Quotation Given'),(323,5,10,'David McLeary','Projects','2014-12-22 17:24:36','Project updated and saved.'),(324,5,3,'David McLeary','Projects','2014-12-23 08:11:34','Project updated and saved.'),(325,5,4,'David McLeary','Projects','2014-12-23 08:13:00','Project status changed to :In Progress(PO received)'),(326,5,4,'David McLeary','Projects','2014-12-23 08:14:27','Project updated and saved.'),(327,5,21,'David McLeary','Projects','2014-12-23 09:42:50','Project updated and saved.'),(328,2,0,'Jason Mashinchi','Login','2014-12-23 12:31:08','Jason Mashinchi logged in...'),(329,5,20,'David McLeary','Projects','2014-12-23 13:31:58','Project updated and saved.'),(330,5,20,'David McLeary','Projects','2014-12-23 13:33:29','Project updated and saved.'),(331,5,20,'David McLeary','Projects','2014-12-23 15:36:43','Project updated and saved.'),(332,5,22,'David McLeary','Projects','2014-12-23 15:37:56','Project updated and saved.'),(333,5,22,'David McLeary','Projects','2014-12-23 15:38:32','Project updated and saved.'),(334,9,0,'Damien Robson','Login','2015-01-05 15:23:17','Damien Robson logged in...'),(335,9,0,'Damien Robson','Logout','2015-01-05 15:24:47','Damien Robson logged out...'),(336,9,0,'Damien Robson','Login','2015-01-05 15:37:52','Damien Robson logged in...'),(337,9,0,'Damien Robson','Logout','2015-01-05 15:45:56','Damien Robson logged out...'),(338,9,0,'Damien Robson','Login','2015-01-05 15:46:10','Damien Robson logged in...'),(339,9,0,'Damien Robson','Login','2015-01-05 15:48:24','Damien Robson logged in...'),(340,9,0,'Damien Robson','Logout','2015-01-05 15:48:31','Damien Robson logged out...'),(341,9,0,'Damien Robson','Login','2015-01-05 16:15:37','Damien Robson logged in...'),(342,9,17,'Damien Robson','Projects','2015-01-05 16:16:50','Project updated and saved.'),(343,9,17,'Damien Robson','Projects','2015-01-05 16:23:54','Project updated and saved.'),(344,9,17,'Damien Robson','Projects','2015-01-05 16:24:09','Project updated and saved.'),(345,9,17,'Damien Robson','Projects','2015-01-05 16:24:18','Project updated and saved.'),(346,9,17,'Damien Robson','Projects','2015-01-05 16:25:21','Project updated and saved.'),(347,9,17,'Damien Robson','Projects','2015-01-05 16:25:43','Project updated and saved.'),(348,9,0,'Damien Robson','Login','2015-01-05 16:37:00','Damien Robson logged in...'),(349,9,0,'Damien Robson','Login','2015-01-05 16:42:23','Damien Robson logged in...'),(350,9,0,'Damien Robson','Login','2015-01-05 16:47:00','Damien Robson logged in...'),(351,9,0,'Damien Robson','Login','2015-01-05 16:52:00','Damien Robson logged in...'),(352,9,0,'Damien Robson','Login','2015-01-06 08:15:54','Damien Robson logged in...'),(353,9,0,'Damien Robson','Logout','2015-01-06 08:18:28','Damien Robson logged out...'),(354,9,0,'Damien Robson','Login','2015-01-06 08:19:59','Damien Robson logged in...'),(355,9,0,'Damien Robson','Login','2015-01-06 09:28:03','Damien Robson logged in...'),(356,9,0,'Damien Robson','Logout','2015-01-06 09:28:36','Damien Robson logged out...'),(357,9,0,'Damien Robson','Login','2015-01-06 09:28:44','Damien Robson logged in...'),(358,9,0,'Damien Robson','Logout','2015-01-06 09:28:58','Damien Robson logged out...'),(359,9,0,'Damien Robson','Login','2015-01-06 09:56:08','Damien Robson logged in...'),(360,9,0,'Damien Robson','Logout','2015-01-06 09:59:22','Damien Robson logged out...'),(361,9,0,'Damien Robson','Login','2015-01-06 10:46:48','Damien Robson logged in...'),(362,9,1,'Damien Robson','PO','2015-01-06 10:54:02','Purchase Order 1 was updated and saved.'),(363,9,1,'Damien Robson','PO','2015-01-06 10:54:43','Purchase Order 1 was updated and saved.'),(364,9,1,'Damien Robson','PO','2015-01-06 10:58:01','Purchase Order 1 was updated and saved.'),(365,9,1,'Damien Robson','PO','2015-01-06 10:58:03','Purchase Order 1 was updated and saved.'),(366,9,2,'Damien Robson','PO','2015-01-06 10:58:36','Purchase Order 2 was updated and saved.'),(367,9,2,'Damien Robson','PO','2015-01-06 10:59:28','Purchase Order 2 was updated and saved.'),(368,9,0,'Damien Robson','Logout','2015-01-06 11:01:20','Damien Robson logged out...'),(369,9,0,'Damien Robson','Login','2015-01-06 11:04:57','Damien Robson logged in...'),(370,9,0,'Damien Robson','Login','2015-01-06 11:19:04','Damien Robson logged in...'),(371,9,0,'Damien Robson','Logout','2015-01-06 11:19:24','Damien Robson logged out...'),(372,9,0,'Damien Robson','Login','2015-01-06 11:44:19','Damien Robson logged in...'),(373,9,1,'Damien Robson','PO','2015-01-06 11:49:02','Purchase Order 1 was updated and saved.'),(374,9,1,'Damien Robson','PO','2015-01-06 11:49:17','Purchase Order 1 was updated and saved.'),(375,9,1,'Damien Robson','PO','2015-01-06 11:49:29','Purchase Order 1 was updated and saved.'),(376,9,3,'Damien Robson','PO','2015-01-06 11:55:42','Purchase Order 3 was updated and saved.'),(377,9,4,'Damien Robson','PO','2015-01-06 11:56:02','Purchase Order 4 was updated and saved.'),(378,9,4,'Damien Robson','PO','2015-01-06 11:56:19','Purchase Order 4 was updated and saved.'),(379,9,4,'Damien Robson','PO','2015-01-06 11:56:58','Purchase Order 4 was updated and saved.'),(380,9,0,'Damien Robson','Login','2015-01-06 11:58:49','Damien Robson logged in...'),(381,9,5,'Damien Robson','PO','2015-01-06 12:04:04','Purchase Order 5 was updated and saved.'),(382,9,0,'Damien Robson','Login','2015-01-06 13:03:57','Damien Robson logged in...'),(383,9,0,'Damien Robson','Login','2015-01-06 13:13:48','Damien Robson logged in...'),(384,9,0,'Damien Robson','Login','2015-01-06 13:17:20','Damien Robson logged in...'),(385,9,0,'Damien Robson','Logout','2015-01-06 13:17:56','Damien Robson logged out...'),(386,9,0,'Damien Robson','Login','2015-01-06 13:18:30','Damien Robson logged in...'),(387,9,0,'Damien Robson','Login','2015-01-06 13:19:43','Damien Robson logged in...'),(388,9,0,'Damien Robson','Login','2015-01-06 13:20:25','Damien Robson logged in...'),(389,9,0,'Damien Robson','Login','2015-01-06 13:59:15','Damien Robson logged in...'),(390,9,0,'Damien Robson','Logout','2015-01-06 14:00:34','Damien Robson logged out...'),(391,9,0,'Damien Robson','Login','2015-01-06 14:04:58','Damien Robson logged in...'),(392,9,0,'Damien Robson','Login','2015-01-06 15:33:56','Damien Robson logged in...'),(393,9,0,'Damien Robson','Login','2015-01-06 15:35:58','Damien Robson logged in...'),(394,9,1,'Damien Robson','PO','2015-01-06 15:40:28','Purchase Order 1 was updated and saved.'),(395,9,1,'Damien Robson','PO','2015-01-06 15:40:52','Purchase Order 1 was updated and saved.'),(396,9,0,'Damien Robson','Login','2015-01-06 15:42:59','Damien Robson logged in...'),(397,9,0,'Damien Robson','Login','2015-01-06 15:44:26','Damien Robson logged in...'),(398,9,0,'Damien Robson','Login','2015-01-06 15:45:23','Damien Robson logged in...'),(399,9,0,'Damien Robson','Login','2015-01-06 15:48:49','Damien Robson logged in...'),(400,9,0,'Damien Robson','Login','2015-01-06 16:02:20','Damien Robson logged in...'),(401,9,0,'Damien Robson','Logout','2015-01-06 16:08:48','Damien Robson logged out...'),(402,9,0,'Damien Robson','Login','2015-01-07 08:46:20','Damien Robson logged in...'),(403,9,0,'Damien Robson','Login','2015-01-07 09:19:03','Damien Robson logged in...'),(404,9,0,'Damien Robson','Login','2015-01-07 09:37:07','Damien Robson logged in...'),(405,9,0,'Damien Robson','Logout','2015-01-07 09:37:49','Damien Robson logged out...'),(406,9,0,'Damien Robson','Login','2015-01-07 09:38:22','Damien Robson logged in...'),(407,9,0,'Damien Robson','Login','2015-01-07 09:42:17','Damien Robson logged in...'),(408,9,0,'Damien Robson','Logout','2015-01-07 09:46:37','Damien Robson logged out...'),(409,9,0,'Damien Robson','Login','2015-01-07 09:48:26','Damien Robson logged in...'),(410,9,1,'Damien Robson','Projects','2015-01-07 09:49:03','Project updated and saved.'),(411,9,0,'Damien Robson','Login','2015-01-07 09:54:57','Damien Robson logged in...'),(412,9,0,'Damien Robson','Login','2015-01-07 09:58:34','Damien Robson logged in...'),(413,9,0,'Damien Robson','Login','2015-01-07 09:59:33','Damien Robson logged in...'),(414,9,0,'Damien Robson','Login','2015-01-07 10:02:43','Damien Robson logged in...'),(415,9,0,'Damien Robson','Login','2015-01-07 13:02:50','Damien Robson logged in...'),(416,9,0,'Damien Robson','Logout','2015-01-07 13:03:38','Damien Robson logged out...'),(417,9,0,'Damien Robson','Login','2015-01-07 14:10:40','Damien Robson logged in...'),(418,9,17,'Damien Robson','Projects','2015-01-07 14:11:15','Project updated and saved.'),(419,9,0,'Damien Robson','Logout','2015-01-07 14:11:21','Damien Robson logged out...'),(420,9,0,'Damien Robson','Login','2015-01-07 14:14:01','Damien Robson logged in...'),(421,9,17,'Damien Robson','Projects','2015-01-07 14:14:33','Project updated and saved.'),(422,9,17,'Damien Robson','Projects','2015-01-07 14:16:12','Project updated and saved.'),(423,9,17,'Damien Robson','Projects','2015-01-07 14:18:06','Project updated and saved.'),(424,9,0,'Damien Robson','Logout','2015-01-07 14:20:00','Damien Robson logged out...'),(425,9,0,'Damien Robson','Login','2015-01-08 08:41:00','Damien Robson logged in...'),(426,9,0,'Damien Robson','Logout','2015-01-08 08:44:06','Damien Robson logged out...'),(427,9,0,'Damien Robson','Login','2015-01-08 08:45:30','Damien Robson logged in...'),(428,9,0,'Damien Robson','Login','2015-01-08 08:50:38','Damien Robson logged in...'),(429,9,0,'Damien Robson','Login','2015-01-08 08:52:29','Damien Robson logged in...'),(430,9,0,'Damien Robson','Login','2015-01-08 08:54:52','Damien Robson logged in...'),(431,9,0,'Damien Robson','Login','2015-01-08 08:55:34','Damien Robson logged in...'),(432,9,0,'Damien Robson','Login','2015-01-08 08:56:28','Damien Robson logged in...'),(433,9,0,'Damien Robson','Login','2015-01-08 08:59:01','Damien Robson logged in...'),(434,9,17,'Damien Robson','Projects','2015-01-08 08:59:22','Project updated and saved.'),(435,9,0,'Damien Robson','Login','2015-01-08 09:02:53','Damien Robson logged in...'),(436,9,0,'Damien Robson','Login','2015-01-08 09:10:24','Damien Robson logged in...'),(437,9,0,'Damien Robson','Logout','2015-01-08 09:10:51','Damien Robson logged out...'),(438,9,0,'Damien Robson','Login','2015-01-08 09:12:33','Damien Robson logged in...'),(439,9,0,'Damien Robson','Login','2015-01-08 09:15:34','Damien Robson logged in...'),(440,9,0,'Damien Robson','Login','2015-01-08 09:18:34','Damien Robson logged in...'),(441,9,0,'Damien Robson','Login','2015-01-08 09:20:16','Damien Robson logged in...'),(442,9,0,'Damien Robson','Logout','2015-01-08 09:20:29','Damien Robson logged out...'),(443,9,0,'Damien Robson','Login','2015-01-08 09:33:27','Damien Robson logged in...'),(444,9,0,'Damien Robson','Login','2015-01-08 09:54:47','Damien Robson logged in...'),(445,9,0,'Damien Robson','Login','2015-01-08 09:57:42','Damien Robson logged in...'),(446,9,0,'Damien Robson','Login','2015-01-08 09:59:47','Damien Robson logged in...'),(447,9,0,'Damien Robson','Login','2015-01-08 10:00:35','Damien Robson logged in...'),(448,9,0,'Damien Robson','Login','2015-01-08 10:02:46','Damien Robson logged in...'),(449,9,0,'Damien Robson','Login','2015-01-08 10:05:10','Damien Robson logged in...'),(450,9,0,'Damien Robson','Login','2015-01-08 10:06:05','Damien Robson logged in...'),(451,9,0,'Damien Robson','Login','2015-01-08 10:07:52','Damien Robson logged in...'),(452,9,0,'Damien Robson','Login','2015-01-08 10:08:45','Damien Robson logged in...'),(453,9,0,'Damien Robson','Login','2015-01-08 10:09:49','Damien Robson logged in...'),(454,9,0,'Damien Robson','Login','2015-01-08 10:15:21','Damien Robson logged in...'),(455,9,0,'Damien Robson','Login','2015-01-08 10:24:58','Damien Robson logged in...'),(456,9,0,'Damien Robson','Logout','2015-01-08 10:25:16','Damien Robson logged out...'),(457,9,0,'Damien Robson','Login','2015-01-09 08:25:16','Damien Robson logged in...'),(458,9,0,'Damien Robson','Login','2015-01-09 08:51:53','Damien Robson logged in...'),(459,9,0,'Damien Robson','Login','2015-01-09 08:59:26','Damien Robson logged in...'),(460,9,0,'Damien Robson','Login','2015-01-09 09:03:19','Damien Robson logged in...'),(461,9,0,'Damien Robson','Login','2015-01-09 09:05:05','Damien Robson logged in...'),(462,9,0,'Damien Robson','Login','2015-01-09 09:06:08','Damien Robson logged in...'),(463,9,0,'Damien Robson','Login','2015-01-09 09:07:20','Damien Robson logged in...'),(464,9,0,'Damien Robson','Logout','2015-01-09 09:07:41','Damien Robson logged out...'),(465,9,0,'Damien Robson','Login','2015-01-09 09:14:59','Damien Robson logged in...'),(466,9,0,'Damien Robson','Login','2015-01-09 09:21:45','Damien Robson logged in...'),(467,9,0,'Damien Robson','Login','2015-01-09 09:22:25','Damien Robson logged in...'),(468,9,0,'Damien Robson','Login','2015-01-09 09:24:20','Damien Robson logged in...'),(469,9,0,'Damien Robson','Login','2015-01-09 09:25:14','Damien Robson logged in...'),(470,9,0,'Damien Robson','Login','2015-01-09 09:26:18','Damien Robson logged in...'),(471,9,0,'Damien Robson','Login','2015-01-09 09:27:38','Damien Robson logged in...'),(472,9,0,'Damien Robson','Login','2015-01-09 09:28:55','Damien Robson logged in...'),(473,9,0,'Damien Robson','Login','2015-01-09 09:31:04','Damien Robson logged in...'),(474,9,0,'Damien Robson','Login','2015-01-09 09:33:48','Damien Robson logged in...'),(475,9,0,'Damien Robson','Login','2015-01-09 09:35:00','Damien Robson logged in...'),(476,9,0,'Damien Robson','Login','2015-01-09 09:36:54','Damien Robson logged in...'),(477,9,0,'Damien Robson','Login','2015-01-09 09:38:05','Damien Robson logged in...'),(478,9,0,'Damien Robson','Login','2015-01-09 09:38:36','Damien Robson logged in...'),(479,9,0,'Damien Robson','Login','2015-01-09 09:39:28','Damien Robson logged in...'),(480,9,0,'Damien Robson','Login','2015-01-09 09:50:46','Damien Robson logged in...'),(481,9,0,'Damien Robson','Login','2015-01-09 09:51:33','Damien Robson logged in...'),(482,9,0,'Damien Robson','Login','2015-01-09 09:52:43','Damien Robson logged in...'),(483,9,0,'Damien Robson','Login','2015-01-09 09:54:46','Damien Robson logged in...'),(484,9,0,'Damien Robson','Login','2015-01-09 09:55:22','Damien Robson logged in...'),(485,9,0,'Damien Robson','Login','2015-01-09 09:59:32','Damien Robson logged in...'),(486,9,0,'Damien Robson','Login','2015-01-09 10:00:31','Damien Robson logged in...'),(487,9,0,'Damien Robson','Login','2015-01-09 10:01:42','Damien Robson logged in...'),(488,9,0,'Damien Robson','Login','2015-01-09 10:03:49','Damien Robson logged in...'),(489,9,0,'Damien Robson','Login','2015-01-09 10:05:07','Damien Robson logged in...'),(490,9,0,'Damien Robson','Login','2015-01-09 10:27:55','Damien Robson logged in...'),(491,9,0,'Damien Robson','Login','2015-01-09 11:00:27','Damien Robson logged in...'),(492,9,0,'Damien Robson','Login','2015-01-09 11:42:10','Damien Robson logged in...'),(493,9,0,'Damien Robson','Login','2015-01-09 12:06:39','Damien Robson logged in...'),(494,9,0,'Damien Robson','Login','2015-01-09 12:10:08','Damien Robson logged in...'),(495,9,0,'Damien Robson','Login','2015-01-09 12:45:35','Damien Robson logged in...'),(496,9,0,'Damien Robson','Logout','2015-01-09 12:55:35','Damien Robson logged out...'),(497,9,0,'Damien Robson','Login','2015-01-09 12:55:49','Damien Robson logged in...'),(498,9,0,'Damien Robson','Logout','2015-01-09 13:00:24','Damien Robson logged out...'),(499,9,0,'Damien Robson','Login','2015-01-09 13:06:14','Damien Robson logged in...'),(500,9,0,'Damien Robson','Login','2015-01-09 13:15:45','Damien Robson logged in...'),(501,9,0,'Damien Robson','Login','2015-01-09 13:17:29','Damien Robson logged in...'),(502,9,0,'Damien Robson','Login','2015-01-09 13:40:02','Damien Robson logged in...'),(503,9,0,'Damien Robson','Login','2015-01-09 13:40:34','Damien Robson logged in...'),(504,9,0,'Damien Robson','Login','2015-01-09 13:48:21','Damien Robson logged in...'),(505,9,0,'Damien Robson','Login','2015-01-09 13:49:39','Damien Robson logged in...'),(506,9,0,'Damien Robson','Login','2015-01-09 13:53:08','Damien Robson logged in...'),(507,9,0,'Damien Robson','Login','2015-01-09 14:39:01','Damien Robson logged in...'),(508,9,0,'Damien Robson','Login','2015-01-09 14:40:17','Damien Robson logged in...'),(509,9,0,'Damien Robson','Login','2015-01-09 15:18:06','Damien Robson logged in...'),(510,9,0,'Damien Robson','Logout','2015-01-09 15:18:27','Damien Robson logged out...'),(511,9,0,'Damien Robson','Login','2015-01-09 15:20:08','Damien Robson logged in...'),(512,9,0,'Damien Robson','Logout','2015-01-09 15:20:18','Damien Robson logged out...'),(513,9,0,'Damien Robson','Login','2015-01-09 15:20:37','Damien Robson logged in...'),(514,9,0,'Damien Robson','Logout','2015-01-09 15:21:25','Damien Robson logged out...'),(515,9,0,'Damien Robson','Login','2015-01-09 15:21:44','Damien Robson logged in...'),(516,9,0,'Damien Robson','Logout','2015-01-09 15:22:40','Damien Robson logged out...'),(517,9,0,'Damien Robson','Login','2015-01-09 15:23:56','Damien Robson logged in...'),(518,9,0,'Damien Robson','Login','2015-01-09 15:24:58','Damien Robson logged in...'),(519,9,0,'Damien Robson','Logout','2015-01-09 15:27:17','Damien Robson logged out...'),(520,9,0,'Damien Robson','Login','2015-01-09 16:00:32','Damien Robson logged in...'),(521,9,0,'Damien Robson','Logout','2015-01-09 16:00:42','Damien Robson logged out...'),(522,9,0,'Damien Robson','Login','2015-01-09 16:09:06','Damien Robson logged in...'),(523,9,24,'Damien Robson','Projects','2015-01-09 16:09:24','Project updated and saved.'),(524,9,0,'Damien Robson','Login','2015-01-09 16:12:36','Damien Robson logged in...'),(525,9,25,'Damien Robson','Projects','2015-01-09 16:12:58','Project updated and saved.'),(526,9,0,'Damien Robson','Login','2015-01-09 16:15:04','Damien Robson logged in...'),(527,9,0,'Damien Robson','Logout','2015-01-09 16:15:39','Damien Robson logged out...'),(528,9,0,'Damien Robson','Login','2015-01-12 08:21:09','Damien Robson logged in...'),(529,9,0,'Damien Robson','Logout','2015-01-12 08:21:45','Damien Robson logged out...'),(530,9,0,'Damien Robson','Login','2015-01-12 08:24:56','Damien Robson logged in...'),(531,9,24,'Damien Robson','Projects','2015-01-12 08:33:12','Project updated and saved.'),(532,9,0,'Damien Robson','Login','2015-01-12 08:37:04','Damien Robson logged in...'),(533,9,25,'Damien Robson','Projects','2015-01-12 08:39:51','Project updated and saved.'),(534,9,1,'Damien Robson','PO','2015-01-12 08:43:43','Purchase Order 1 was updated and saved.'),(535,9,0,'Damien Robson','Login','2015-01-12 10:00:20','Damien Robson logged in...'),(536,9,0,'Damien Robson','Login','2015-01-12 10:02:48','Damien Robson logged in...'),(537,9,0,'Damien Robson','Logout','2015-01-12 10:21:50','Damien Robson logged out...'),(538,9,0,'Damien Robson','Login','2015-01-12 10:22:19','Damien Robson logged in...'),(539,9,0,'Damien Robson','Login','2015-01-12 10:44:09','Damien Robson logged in...'),(540,9,0,'Damien Robson','Login','2015-01-12 11:25:56','Damien Robson logged in...'),(541,9,0,'Damien Robson','Login','2015-01-12 11:27:20','Damien Robson logged in...'),(542,9,0,'Damien Robson','Login','2015-01-12 11:35:31','Damien Robson logged in...'),(543,9,0,'Damien Robson','Logout','2015-01-12 11:46:05','Damien Robson logged out...'),(544,9,0,'Damien Robson','Login','2015-01-12 11:52:05','Damien Robson logged in...'),(545,9,0,'Damien Robson','Login','2015-01-12 11:54:45','Damien Robson logged in...'),(546,9,0,'Damien Robson','Login','2015-01-12 11:57:40','Damien Robson logged in...'),(547,9,0,'Damien Robson','Login','2015-01-12 11:58:09','Damien Robson logged in...'),(548,9,0,'Damien Robson','Login','2015-01-12 11:59:26','Damien Robson logged in...'),(549,9,0,'Damien Robson','Login','2015-01-12 12:00:40','Damien Robson logged in...'),(550,9,0,'Damien Robson','Login','2015-01-12 12:02:39','Damien Robson logged in...'),(551,9,0,'Damien Robson','Login','2015-01-12 12:03:37','Damien Robson logged in...'),(552,9,0,'Damien Robson','Login','2015-01-12 12:04:47','Damien Robson logged in...'),(553,9,0,'Damien Robson','Login','2015-01-12 12:08:47','Damien Robson logged in...'),(554,9,0,'Damien Robson','Login','2015-01-12 12:10:29','Damien Robson logged in...'),(555,9,0,'Damien Robson','Login','2015-01-12 12:29:50','Damien Robson logged in...'),(556,9,0,'Damien Robson','Login','2015-01-12 12:31:55','Damien Robson logged in...'),(557,9,0,'Damien Robson','Login','2015-01-12 12:34:28','Damien Robson logged in...'),(558,9,0,'Damien Robson','Logout','2015-01-12 12:34:44','Damien Robson logged out...'),(559,9,0,'Damien Robson','Login','2015-01-12 12:46:32','Damien Robson logged in...'),(560,9,0,'Damien Robson','Logout','2015-01-12 12:48:38','Damien Robson logged out...'),(561,9,0,'Damien Robson','Login','2015-01-12 12:48:46','Damien Robson logged in...'),(562,9,0,'Damien Robson','Login','2015-01-12 12:56:11','Damien Robson logged in...'),(563,9,0,'Damien Robson','Login','2015-01-12 13:00:00','Damien Robson logged in...'),(564,9,0,'Damien Robson','Login','2015-01-12 13:03:58','Damien Robson logged in...'),(565,9,0,'Damien Robson','Login','2015-01-12 13:13:44','Damien Robson logged in...'),(566,9,0,'Damien Robson','Login','2015-01-12 13:16:46','Damien Robson logged in...'),(567,9,0,'Damien Robson','Login','2015-01-12 13:18:18','Damien Robson logged in...'),(568,9,0,'Damien Robson','Logout','2015-01-12 13:23:27','Damien Robson logged out...'),(569,9,0,'Damien Robson','Login','2015-01-12 13:23:47','Damien Robson logged in...'),(570,9,25,'Damien Robson','Projects','2015-01-12 13:29:19','Project updated and saved.'),(571,9,0,'Damien Robson','Logout','2015-01-12 13:30:08','Damien Robson logged out...'),(572,9,0,'Damien Robson','Login','2015-01-12 13:32:29','Damien Robson logged in...'),(573,9,0,'Damien Robson','Logout','2015-01-12 13:38:35','Damien Robson logged out...'),(574,9,0,'Damien Robson','Login','2015-01-12 14:15:46','Damien Robson logged in...'),(575,9,0,'Damien Robson','Login','2015-01-12 14:17:56','Damien Robson logged in...'),(576,9,0,'Damien Robson','Login','2015-01-12 14:18:50','Damien Robson logged in...'),(577,9,0,'Damien Robson','Login','2015-01-12 14:23:09','Damien Robson logged in...'),(578,9,0,'Damien Robson','Login','2015-01-12 14:27:27','Damien Robson logged in...'),(579,9,0,'Damien Robson','Login','2015-01-12 14:29:41','Damien Robson logged in...'),(580,9,0,'Damien Robson','Login','2015-01-12 14:31:30','Damien Robson logged in...'),(581,9,0,'Damien Robson','Login','2015-01-12 14:33:06','Damien Robson logged in...'),(582,9,0,'Damien Robson','Login','2015-01-12 14:35:44','Damien Robson logged in...'),(583,9,0,'Damien Robson','Logout','2015-01-12 14:36:50','Damien Robson logged out...'),(584,9,0,'Damien Robson','Login','2015-01-12 14:56:25','Damien Robson logged in...'),(585,9,0,'Damien Robson','Logout','2015-01-12 14:56:37','Damien Robson logged out...'),(586,9,0,'Damien Robson','Login','2015-01-12 15:04:25','Damien Robson logged in...'),(587,9,0,'Damien Robson','Logout','2015-01-12 15:04:43','Damien Robson logged out...'),(588,9,0,'Damien Robson','Login','2015-01-12 15:10:15','Damien Robson logged in...'),(589,9,0,'Damien Robson','Logout','2015-01-12 15:42:51','Damien Robson logged out...'),(590,9,0,'Damien Robson','Login','2015-01-12 15:50:27','Damien Robson logged in...'),(591,9,0,'Damien Robson','Logout','2015-01-12 15:52:23','Damien Robson logged out...'),(592,9,0,'Damien Robson','Login','2015-01-12 15:52:50','Damien Robson logged in...'),(593,9,0,'Damien Robson','Login','2015-01-13 08:39:43','Damien Robson logged in...'),(594,9,0,'Damien Robson','Login','2015-01-13 08:45:29','Damien Robson logged in...'),(595,9,0,'Damien Robson','Login','2015-01-13 08:51:38','Damien Robson logged in...'),(596,9,0,'Damien Robson','Login','2015-01-13 08:52:16','Damien Robson logged in...'),(597,9,0,'Damien Robson','Login','2015-01-13 08:54:20','Damien Robson logged in...'),(598,9,0,'Damien Robson','Login','2015-01-13 09:03:05','Damien Robson logged in...'),(599,9,0,'Damien Robson','Login','2015-01-13 09:26:25','Damien Robson logged in...'),(600,9,0,'Damien Robson','Logout','2015-01-13 09:26:31','Damien Robson logged out...'),(601,9,0,'Damien Robson','Login','2015-01-13 09:28:16','Damien Robson logged in...'),(602,9,0,'Damien Robson','Logout','2015-01-13 12:27:01','Damien Robson logged out...'),(603,9,0,'Damien Robson','Login','2015-01-13 12:27:22','Damien Robson logged in...'),(604,9,0,'Damien Robson','Login','2015-01-13 12:46:22','Damien Robson logged in...'),(605,9,0,'Damien Robson','Login','2015-01-13 12:48:29','Damien Robson logged in...'),(606,9,0,'Damien Robson','Login','2015-01-13 12:50:03','Damien Robson logged in...'),(607,9,0,'Damien Robson','Login','2015-01-13 12:51:11','Damien Robson logged in...'),(608,9,0,'Damien Robson','Login','2015-01-13 12:59:18','Damien Robson logged in...'),(609,9,0,'Damien Robson','Login','2015-01-13 12:59:53','Damien Robson logged in...'),(610,9,0,'Damien Robson','Login','2015-01-13 13:19:24','Damien Robson logged in...'),(611,9,0,'Damien Robson','Logout','2015-01-13 13:21:53','Damien Robson logged out...'),(612,9,0,'Damien Robson','Login','2015-01-13 13:49:21','Damien Robson logged in...'),(613,9,25,'Damien Robson','Projects','2015-01-13 13:49:50','Project updated and saved.'),(614,9,25,'Damien Robson','Projects','2015-01-13 13:50:27','Project updated and saved.'),(615,9,25,'Damien Robson','Projects','2015-01-13 13:52:35','Project updated and saved.'),(616,9,25,'Damien Robson','Projects','2015-01-13 13:52:40','Project updated and saved.'),(617,9,0,'Damien Robson','Login','2015-01-13 14:16:12','Damien Robson logged in...'),(618,9,0,'Damien Robson','Logout','2015-01-13 14:22:02','Damien Robson logged out...'),(619,9,0,'Damien Robson','Login','2015-01-13 14:22:11','Damien Robson logged in...'),(620,9,0,'Damien Robson','Login','2015-01-13 14:27:39','Damien Robson logged in...'),(621,9,0,'Damien Robson','Login','2015-01-13 14:49:52','Damien Robson logged in...'),(622,9,0,'Damien Robson','Login','2015-01-13 14:56:33','Damien Robson logged in...'),(623,9,0,'Damien Robson','Login','2015-01-13 15:02:20','Damien Robson logged in...'),(624,9,0,'Damien Robson','Login','2015-01-13 15:23:23','Damien Robson logged in...'),(625,9,0,'Damien Robson','Logout','2015-01-13 15:24:05','Damien Robson logged out...'),(626,9,0,'Damien Robson','Login','2015-01-13 15:32:40','Damien Robson logged in...'),(627,9,26,'Damien Robson','Projects','2015-01-13 15:38:53','Project updated and saved.'),(628,9,0,'Damien Robson','Logout','2015-01-13 15:55:00','Damien Robson logged out...'),(629,9,0,'Damien Robson','Login','2015-01-13 16:09:52','Damien Robson logged in...'),(630,9,0,'Damien Robson','Login','2015-01-13 16:21:36','Damien Robson logged in...'),(631,9,0,'Damien Robson','Logout','2015-01-13 16:23:42','Damien Robson logged out...'),(632,9,0,'Damien Robson','Login','2015-01-13 16:23:53','Damien Robson logged in...'),(633,9,0,'Damien Robson','Logout','2015-01-13 16:30:10','Damien Robson logged out...'),(634,9,0,'Damien Robson','Login','2015-01-14 13:48:46','Damien Robson logged in...'),(635,9,0,'Damien Robson','Logout','2015-01-14 13:52:10','Damien Robson logged out...'),(636,9,0,'Damien Robson','Login','2015-01-14 16:16:55','Damien Robson logged in...'),(637,9,1,'Damien Robson','PO','2015-01-14 16:22:27','Purchase Order 1 was updated and saved.'),(638,9,1,'Damien Robson','PO','2015-01-14 16:22:29','Purchase Order 1 was updated and saved.'),(639,9,1,'Damien Robson','PO','2015-01-14 16:22:42','Purchase Order 1 was updated and saved.'),(640,9,1,'Damien Robson','PO','2015-01-14 16:24:32','Purchase Order 1 was updated and saved.'),(641,9,1,'Damien Robson','PO','2015-01-14 16:24:38','Purchase Order 1 was updated and saved.'),(642,9,1,'Damien Robson','PO','2015-01-14 16:26:10','Purchase Order 1 was updated and saved.'),(643,9,1,'Damien Robson','PO','2015-01-14 16:26:14','Purchase Order 1 was updated and saved.'),(644,9,1,'Damien Robson','PO','2015-01-14 16:26:52','Purchase Order 1 was updated and saved.'),(645,9,1,'Damien Robson','PO','2015-01-14 16:26:54','Purchase Order 1 was updated and saved.'),(646,9,0,'Damien Robson','Login','2015-01-14 16:27:47','Damien Robson logged in...'),(647,9,1,'Damien Robson','PO','2015-01-14 16:27:54','Purchase Order 1 was updated and saved.'),(648,9,1,'Damien Robson','PO','2015-01-14 16:27:57','Purchase Order 1 was updated and saved.'),(649,9,1,'Damien Robson','PO','2015-01-14 16:28:34','Purchase Order 1 was updated and saved.'),(650,9,1,'Damien Robson','PO','2015-01-14 16:28:36','Purchase Order 1 was updated and saved.'),(651,9,1,'Damien Robson','PO','2015-01-14 16:29:25','Purchase Order 1 was updated and saved.'),(652,9,1,'Damien Robson','PO','2015-01-14 16:29:29','Purchase Order 1 was updated and saved.'),(653,9,1,'Damien Robson','PO','2015-01-14 16:30:54','Purchase Order 1 was updated and saved.'),(654,9,1,'Damien Robson','PO','2015-01-14 16:30:58','Purchase Order 1 was updated and saved.'),(655,9,0,'Damien Robson','Login','2015-01-14 16:32:44','Damien Robson logged in...'),(656,9,1,'Damien Robson','PO','2015-01-14 16:32:54','Purchase Order 1 was updated and saved.'),(657,9,1,'Damien Robson','PO','2015-01-14 16:32:56','Purchase Order 1 was updated and saved.'),(658,9,1,'Damien Robson','PO','2015-01-14 16:33:30','Purchase Order 1 was updated and saved.'),(659,9,1,'Damien Robson','PO','2015-01-14 16:33:34','Purchase Order 1 was updated and saved.'),(660,9,0,'Damien Robson','Login','2015-01-14 16:38:34','Damien Robson logged in...'),(661,9,1,'Damien Robson','PO','2015-01-14 16:38:39','Purchase Order 1 was updated and saved.'),(662,9,1,'Damien Robson','PO','2015-01-14 16:38:41','Purchase Order 1 was updated and saved.'),(663,9,0,'Damien Robson','Logout','2015-01-14 16:39:34','Damien Robson logged out...'),(664,9,0,'Damien Robson','Login','2015-01-14 16:39:59','Damien Robson logged in...'),(665,9,1,'Damien Robson','PO','2015-01-14 16:40:08','Purchase Order 1 was updated and saved.'),(666,9,1,'Damien Robson','PO','2015-01-14 16:40:10','Purchase Order 1 was updated and saved.'),(667,9,0,'Damien Robson','Logout','2015-01-14 16:40:53','Damien Robson logged out...'),(668,9,0,'Damien Robson','Login','2015-01-14 19:12:49','Damien Robson logged in...'),(669,9,0,'Damien Robson','Logout','2015-01-14 19:13:21','Damien Robson logged out...'),(670,9,0,'Damien Robson','Login','2015-01-15 11:20:26','Damien Robson logged in...'),(671,9,0,'Damien Robson','Login','2015-01-15 11:21:27','Damien Robson logged in...'),(672,9,0,'Damien Robson','Login','2015-01-15 11:26:50','Damien Robson logged in...'),(673,9,0,'Damien Robson','Login','2015-01-15 11:27:25','Damien Robson logged in...'),(674,9,0,'Damien Robson','Login','2015-01-15 11:29:22','Damien Robson logged in...'),(675,9,0,'Damien Robson','Logout','2015-01-15 11:29:36','Damien Robson logged out...'),(676,9,0,'Damien Robson','Login','2015-01-15 11:30:11','Damien Robson logged in...'),(677,9,27,'Damien Robson','Projects','2015-01-15 11:31:24','Project updated and saved.'),(678,9,0,'Damien Robson','Login','2015-01-15 11:34:26','Damien Robson logged in...'),(679,9,0,'Damien Robson','Login','2015-01-15 11:45:21','Damien Robson logged in...'),(680,9,0,'Damien Robson','Logout','2015-01-15 11:45:38','Damien Robson logged out...'),(681,9,0,'Damien Robson','Login','2015-01-15 14:36:53','Damien Robson logged in...'),(682,9,0,'Damien Robson','Logout','2015-01-15 14:37:15','Damien Robson logged out...'),(683,9,0,'Damien Robson','Login','2015-01-16 08:22:16','Damien Robson logged in...'),(684,9,0,'Damien Robson','Logout','2015-01-16 08:24:13','Damien Robson logged out...'),(685,9,0,'Damien Robson','Login','2015-01-16 08:24:41','Damien Robson logged in...'),(686,9,0,'Damien Robson','Login','2015-01-16 09:58:27','Damien Robson logged in...'),(687,9,0,'Damien Robson','Logout','2015-01-16 10:21:58','Damien Robson logged out...'),(688,9,0,'Damien Robson','Login','2015-01-16 10:22:16','Damien Robson logged in...'),(689,9,0,'Damien Robson','Login','2015-01-16 10:23:05','Damien Robson logged in...'),(690,9,0,'Damien Robson','Logout','2015-01-16 12:26:29','Damien Robson logged out...'),(691,9,0,'Damien Robson','Login','2015-01-16 14:33:49','Damien Robson logged in...'),(692,9,0,'Damien Robson','Logout','2015-01-16 14:35:18','Damien Robson logged out...'),(693,9,0,'Damien Robson','Login','2015-01-16 14:35:28','Damien Robson logged in...'),(694,9,0,'Damien Robson','Logout','2015-01-16 15:05:36','Damien Robson logged out...'),(695,9,0,'Damien Robson','Login','2015-01-16 15:05:49','Damien Robson logged in...'),(696,9,0,'Damien Robson','Logout','2015-01-16 15:09:40','Damien Robson logged out...'),(697,1,0,'Admin','Login','2015-01-16 15:10:05','Admin logged in...'),(698,1,0,'Admin','Logout','2015-01-16 16:07:35','Admin logged out...'),(699,1,0,'Admin','Login','2015-01-19 08:10:08','Admin logged in...'),(700,1,0,'Admin','Login','2015-01-19 08:26:55','Admin logged in...'),(701,1,0,'Admin','Login','2015-01-19 08:38:35','Admin logged in...'),(702,1,0,'Admin','Logout','2015-01-19 08:42:27','Admin logged out...'),(703,1,0,'Admin','Login','2015-01-19 13:49:52','Admin logged in...'),(704,1,0,'Admin','Logout','2015-01-19 15:01:54','Admin logged out...'),(705,1,0,'Admin','Login','2015-01-19 15:38:58','Admin logged in...'),(706,1,0,'Admin','Logout','2015-01-19 15:39:07','Admin logged out...'),(707,1,0,'Admin','Login','2015-01-19 15:40:05','Admin logged in...'),(708,1,0,'Admin','Logout','2015-01-19 15:40:15','Admin logged out...'),(709,1,0,'Admin','Login','2015-01-19 15:45:03','Admin logged in...'),(710,1,0,'Admin','Login','2015-01-19 15:46:40','Admin logged in...'),(711,1,0,'Admin','Login','2015-01-19 15:48:52','Admin logged in...'),(712,1,0,'Admin','Login','2015-01-19 15:55:33','Admin logged in...'),(713,1,0,'Admin','Logout','2015-01-19 15:55:45','Admin logged out...'),(714,1,0,'Admin','Login','2015-01-19 15:57:07','Admin logged in...'),(715,1,0,'Admin','Logout','2015-01-19 15:57:13','Admin logged out...'),(716,1,0,'Admin','Login','2015-01-19 15:57:38','Admin logged in...'),(717,1,0,'Admin','Logout','2015-01-19 15:57:45','Admin logged out...'),(718,1,0,'Admin','Login','2015-01-19 16:02:09','Admin logged in...'),(719,1,0,'Admin','Login','2015-01-19 16:04:46','Admin logged in...'),(720,1,0,'Admin','Logout','2015-01-19 16:05:05','Admin logged out...'),(721,1,0,'Admin','Login','2015-01-19 16:05:38','Admin logged in...'),(722,1,0,'Admin','Login','2015-01-19 16:16:18','Admin logged in...'),(723,1,0,'Admin','Login','2015-01-20 13:27:56','Admin logged in...'),(724,1,0,'Admin','Login','2015-01-20 13:57:20','Admin logged in...'),(725,1,0,'Admin','Logout','2015-01-20 13:57:42','Admin logged out...'),(726,1,0,'Admin','Login','2015-01-20 14:04:07','Admin logged in...'),(727,1,0,'Admin','Login','2015-01-20 14:06:12','Admin logged in...'),(728,1,0,'Admin','Login','2015-01-20 14:09:09','Admin logged in...'),(729,1,0,'Admin','Login','2015-01-20 14:10:12','Admin logged in...'),(730,1,0,'Admin','Logout','2015-01-20 14:10:39','Admin logged out...'),(731,1,0,'Admin','Login','2015-01-20 14:11:55','Admin logged in...'),(732,1,0,'Admin','Logout','2015-01-20 14:13:12','Admin logged out...'),(733,1,0,'Admin','Login','2015-01-20 14:13:51','Admin logged in...'),(734,1,0,'Admin','Logout','2015-01-20 14:14:06','Admin logged out...'),(735,1,0,'Admin','Login','2015-01-20 14:14:56','Admin logged in...'),(736,1,0,'Admin','Login','2015-01-20 14:17:03','Admin logged in...'),(737,1,0,'Admin','Logout','2015-01-20 14:17:42','Admin logged out...'),(738,1,0,'Admin','Login','2015-01-20 14:18:47','Admin logged in...'),(739,1,0,'Admin','Logout','2015-01-20 14:19:08','Admin logged out...'),(740,1,0,'Admin','Login','2015-01-20 14:20:08','Admin logged in...'),(741,1,0,'Admin','Login','2015-01-20 14:21:56','Admin logged in...'),(742,1,0,'Admin','Logout','2015-01-20 14:22:06','Admin logged out...'),(743,1,0,'Admin','Login','2015-01-20 14:25:12','Admin logged in...'),(744,1,0,'Admin','Logout','2015-01-20 14:26:06','Admin logged out...'),(745,1,0,'Admin','Login','2015-01-20 14:26:50','Admin logged in...'),(746,1,0,'Admin','Logout','2015-01-20 14:28:05','Admin logged out...'),(747,1,0,'Admin','Login','2015-01-20 14:40:52','Admin logged in...'),(748,1,0,'Admin','Logout','2015-01-20 14:41:03','Admin logged out...'),(749,1,0,'Admin','Login','2015-01-20 14:48:49','Admin logged in...'),(750,1,0,'Admin','Login','2015-01-20 15:03:40','Admin logged in...'),(751,1,0,'Admin','Login','2015-01-20 15:04:33','Admin logged in...'),(752,1,0,'Admin','Login','2015-01-20 15:06:18','Admin logged in...'),(753,1,0,'Admin','Login','2015-01-20 15:11:04','Admin logged in...'),(754,1,0,'Admin','Login','2015-01-20 15:11:45','Admin logged in...'),(755,1,0,'Admin','Login','2015-01-20 15:12:11','Admin logged in...'),(756,1,0,'Admin','Login','2015-01-20 15:30:00','Admin logged in...'),(757,1,0,'Admin','Logout','2015-01-20 15:31:09','Admin logged out...'),(758,1,0,'Admin','Login','2015-01-20 15:31:37','Admin logged in...'),(759,1,0,'Admin','Logout','2015-01-20 15:36:11','Admin logged out...'),(760,1,0,'Admin','Login','2015-01-20 15:39:04','Admin logged in...'),(761,1,0,'Admin','Logout','2015-01-20 15:45:15','Admin logged out...'),(762,1,0,'Admin','Login','2015-01-20 15:48:08','Admin logged in...'),(763,1,0,'Admin','Logout','2015-01-20 15:48:31','Admin logged out...'),(764,1,0,'Admin','Login','2015-01-21 09:12:26','Admin logged in...'),(765,1,0,'Admin','Login','2015-01-21 15:07:36','Admin logged in...'),(766,1,0,'Admin','Login','2015-01-21 15:11:09','Admin logged in...'),(767,1,0,'Admin','Login','2015-01-21 15:16:13','Admin logged in...'),(768,1,0,'Admin','Logout','2015-01-21 15:16:54','Admin logged out...'),(769,1,0,'Admin','Login','2015-01-21 15:17:51','Admin logged in...'),(770,1,0,'Admin','Login','2015-01-21 15:20:03','Admin logged in...'),(771,1,0,'Admin','Logout','2015-01-21 15:21:09','Admin logged out...'),(772,1,0,'Admin','Login','2015-01-21 15:26:13','Admin logged in...'),(773,1,0,'Admin','Login','2015-01-21 15:29:19','Admin logged in...'),(774,1,0,'Admin','Logout','2015-01-21 15:30:38','Admin logged out...'),(775,1,0,'Admin','Login','2015-01-22 07:58:02','Admin logged in...'),(776,1,0,'Admin','Logout','2015-01-22 08:01:25','Admin logged out...'),(777,1,0,'Admin','Login','2015-01-22 08:19:07','Admin logged in...'),(778,1,0,'Admin','Login','2015-01-22 08:22:10','Admin logged in...'),(779,1,0,'Admin','Logout','2015-01-22 08:23:11','Admin logged out...'),(780,1,0,'Admin','Login','2015-01-22 09:51:12','Admin logged in...'),(781,1,0,'Admin','Login','2015-01-22 09:53:11','Admin logged in...'),(782,1,0,'Admin','Login','2015-01-22 09:56:22','Admin logged in...'),(783,1,0,'Admin','Logout','2015-01-22 09:56:48','Admin logged out...'),(784,1,0,'Admin','Login','2015-01-22 09:57:01','Admin logged in...'),(785,1,0,'Admin','Login','2015-01-22 09:58:10','Admin logged in...'),(786,1,0,'Admin','Login','2015-01-22 10:00:13','Admin logged in...'),(787,1,0,'Admin','Login','2015-01-22 10:13:00','Admin logged in...'),(788,1,0,'Admin','Login','2015-01-22 10:23:04','Admin logged in...'),(789,1,0,'Admin','Login','2015-01-22 10:24:54','Admin logged in...'),(790,1,0,'Admin','Login','2015-01-22 10:27:40','Admin logged in...'),(791,1,0,'Admin','Login','2015-01-22 10:28:16','Admin logged in...'),(792,1,0,'Admin','Login','2015-01-22 10:28:48','Admin logged in...'),(793,1,0,'Admin','Login','2015-01-22 10:30:10','Admin logged in...'),(794,1,0,'Admin','Login','2015-01-22 10:43:35','Admin logged in...'),(795,1,0,'Admin','Logout','2015-01-22 10:46:27','Admin logged out...'),(796,1,0,'Admin','Login','2015-01-22 10:48:56','Admin logged in...'),(797,1,0,'Admin','Logout','2015-01-22 11:08:37','Admin logged out...'),(798,1,0,'Admin','Login','2015-01-22 12:43:27','Admin logged in...'),(799,1,0,'Admin','Logout','2015-01-22 12:45:40','Admin logged out...'),(800,1,0,'Admin','Login','2015-01-22 12:46:25','Admin logged in...'),(801,1,0,'Admin','Login','2015-01-22 12:48:41','Admin logged in...'),(802,1,0,'Admin','Logout','2015-01-22 12:49:09','Admin logged out...'),(803,1,0,'Admin','Login','2015-01-22 12:49:55','Admin logged in...'),(804,1,0,'Admin','Login','2015-01-22 13:58:07','Admin logged in...'),(805,1,0,'Admin','Login','2015-01-22 14:15:29','Admin logged in...'),(806,1,0,'Admin','Logout','2015-01-22 14:19:25','Admin logged out...'),(807,1,0,'Admin','Login','2015-01-22 14:21:55','Admin logged in...'),(808,1,0,'Admin','Logout','2015-01-22 14:24:02','Admin logged out...'),(809,1,0,'Admin','Login','2015-01-22 14:31:16','Admin logged in...'),(810,1,0,'Admin','Logout','2015-01-22 14:32:50','Admin logged out...'),(811,1,0,'Admin','Login','2015-01-22 14:33:34','Admin logged in...'),(812,1,0,'Admin','Logout','2015-01-22 14:34:45','Admin logged out...'),(813,1,0,'Admin','Login','2015-01-22 16:25:51','Admin logged in...'),(814,1,0,'Admin','Logout','2015-01-22 16:32:27','Admin logged out...'),(815,1,0,'Admin','Login','2015-01-23 08:44:19','Admin logged in...'),(816,1,0,'Admin','Login','2015-01-23 08:48:04','Admin logged in...'),(817,1,0,'Admin','Logout','2015-01-23 08:48:36','Admin logged out...'),(818,1,0,'Admin','Login','2015-01-23 08:49:36','Admin logged in...'),(819,1,0,'Admin','Logout','2015-01-23 08:49:51','Admin logged out...'),(820,1,0,'Admin','Login','2015-01-23 08:50:34','Admin logged in...'),(821,1,0,'Admin','Logout','2015-01-23 08:51:00','Admin logged out...'),(822,1,0,'Admin','Login','2015-01-23 08:53:34','Admin logged in...'),(823,1,0,'Admin','Logout','2015-01-23 08:53:46','Admin logged out...'),(824,1,0,'Admin','Login','2015-01-23 08:55:25','Admin logged in...'),(825,1,0,'Admin','Logout','2015-01-23 08:55:48','Admin logged out...'),(826,1,0,'Admin','Login','2015-01-23 08:57:29','Admin logged in...'),(827,1,0,'Admin','Logout','2015-01-23 08:59:00','Admin logged out...'),(828,1,0,'Admin','Login','2015-01-23 08:59:31','Admin logged in...'),(829,1,0,'Admin','Logout','2015-01-23 08:59:53','Admin logged out...'),(830,1,0,'Admin','Login','2015-01-23 09:00:15','Admin logged in...'),(831,1,0,'Admin','Logout','2015-01-23 09:00:39','Admin logged out...'),(832,1,0,'Admin','Login','2015-01-23 09:03:02','Admin logged in...'),(833,1,0,'Admin','Login','2015-01-23 09:04:16','Admin logged in...'),(834,1,0,'Admin','Logout','2015-01-23 09:04:32','Admin logged out...'),(835,1,0,'Admin','Login','2015-01-23 09:04:57','Admin logged in...'),(836,1,0,'Admin','Logout','2015-01-23 09:05:16','Admin logged out...'),(837,1,0,'Admin','Login','2015-01-23 09:05:38','Admin logged in...'),(838,1,0,'Admin','Logout','2015-01-23 09:06:01','Admin logged out...'),(839,1,0,'Admin','Login','2015-01-23 09:06:25','Admin logged in...'),(840,1,0,'Admin','Logout','2015-01-23 09:06:44','Admin logged out...'),(841,1,0,'Admin','Login','2015-01-23 09:07:07','Admin logged in...'),(842,1,0,'Admin','Login','2015-01-23 09:08:21','Admin logged in...'),(843,1,0,'Admin','Logout','2015-01-23 09:08:53','Admin logged out...'),(844,1,0,'Admin','Login','2015-01-23 09:09:13','Admin logged in...'),(845,1,0,'Admin','Logout','2015-01-23 09:10:24','Admin logged out...'),(846,1,0,'Admin','Login','2015-01-23 09:10:53','Admin logged in...'),(847,1,0,'Admin','Logout','2015-01-23 09:11:14','Admin logged out...'),(848,1,0,'Admin','Login','2015-01-23 09:12:50','Admin logged in...'),(849,1,0,'Admin','Logout','2015-01-23 09:13:03','Admin logged out...'),(850,1,0,'Admin','Login','2015-01-23 09:13:21','Admin logged in...'),(851,1,0,'Admin','Logout','2015-01-23 09:13:51','Admin logged out...'),(852,1,0,'Admin','Login','2015-01-23 09:14:52','Admin logged in...'),(853,1,0,'Admin','Logout','2015-01-23 09:15:05','Admin logged out...'),(854,1,0,'Admin','Login','2015-01-23 09:15:32','Admin logged in...'),(855,1,0,'Admin','Logout','2015-01-23 09:15:42','Admin logged out...'),(856,1,0,'Admin','Login','2015-01-23 09:16:03','Admin logged in...'),(857,1,0,'Admin','Logout','2015-01-23 09:16:30','Admin logged out...'),(858,1,0,'Admin','Login','2015-01-23 09:16:52','Admin logged in...'),(859,1,0,'Admin','Logout','2015-01-23 09:17:03','Admin logged out...'),(860,1,0,'Admin','Login','2015-01-23 09:17:34','Admin logged in...'),(861,1,0,'Admin','Logout','2015-01-23 09:17:48','Admin logged out...'),(862,1,0,'Admin','Login','2015-01-23 09:18:08','Admin logged in...'),(863,1,0,'Admin','Login','2015-01-23 09:19:26','Admin logged in...'),(864,1,0,'Admin','Logout','2015-01-23 09:19:38','Admin logged out...'),(865,1,0,'Admin','Login','2015-01-23 09:20:02','Admin logged in...'),(866,1,0,'Admin','Logout','2015-01-23 09:20:14','Admin logged out...'),(867,1,0,'Admin','Login','2015-01-23 09:20:34','Admin logged in...'),(868,1,0,'Admin','Logout','2015-01-23 09:20:46','Admin logged out...'),(869,1,0,'Admin','Login','2015-01-23 09:21:04','Admin logged in...'),(870,1,0,'Admin','Logout','2015-01-23 09:21:27','Admin logged out...'),(871,1,0,'Admin','Login','2015-01-23 09:22:25','Admin logged in...'),(872,1,0,'Admin','Logout','2015-01-23 09:22:39','Admin logged out...'),(873,1,0,'Admin','Login','2015-01-23 09:24:09','Admin logged in...'),(874,1,0,'Admin','Logout','2015-01-23 09:24:23','Admin logged out...'),(875,1,0,'Admin','Login','2015-01-23 09:24:39','Admin logged in...'),(876,1,0,'Admin','Logout','2015-01-23 09:24:50','Admin logged out...'),(877,1,0,'Admin','Login','2015-01-23 09:25:07','Admin logged in...'),(878,1,0,'Admin','Logout','2015-01-23 09:25:28','Admin logged out...'),(879,1,0,'Admin','Login','2015-01-23 09:25:54','Admin logged in...'),(880,1,0,'Admin','Logout','2015-01-23 09:26:12','Admin logged out...'),(881,1,0,'Admin','Login','2015-01-23 09:29:03','Admin logged in...'),(882,1,0,'Admin','Logout','2015-01-23 09:29:18','Admin logged out...'),(883,1,0,'Admin','Login','2015-01-23 09:29:37','Admin logged in...'),(884,1,0,'Admin','Logout','2015-01-23 09:29:50','Admin logged out...'),(885,1,0,'Admin','Login','2015-01-23 09:30:16','Admin logged in...'),(886,1,0,'Admin','Logout','2015-01-23 09:30:34','Admin logged out...'),(887,1,0,'Admin','Login','2015-01-23 09:32:36','Admin logged in...'),(888,1,0,'Admin','Logout','2015-01-23 09:32:45','Admin logged out...'),(889,1,0,'Admin','Login','2015-01-23 09:34:09','Admin logged in...'),(890,1,0,'Admin','Logout','2015-01-23 09:34:39','Admin logged out...'),(891,1,0,'Admin','Login','2015-01-23 09:35:10','Admin logged in...'),(892,1,0,'Admin','Logout','2015-01-23 09:35:22','Admin logged out...'),(893,1,0,'Admin','Login','2015-01-23 09:35:47','Admin logged in...'),(894,1,0,'Admin','Logout','2015-01-23 09:36:00','Admin logged out...'),(895,1,0,'Admin','Login','2015-01-23 09:36:39','Admin logged in...'),(896,1,0,'Admin','Logout','2015-01-23 09:37:10','Admin logged out...'),(897,1,0,'Admin','Login','2015-01-23 10:54:05','Admin logged in...'),(898,1,0,'Admin','Logout','2015-01-23 12:49:48','Admin logged out...'),(899,1,0,'Admin','Login','2015-01-23 12:56:03','Admin logged in...'),(900,1,0,'Admin','Login','2015-01-23 13:03:08','Admin logged in...'),(901,1,0,'Admin','Logout','2015-01-23 13:03:48','Admin logged out...'),(902,1,0,'Admin','Login','2015-01-23 13:15:28','Admin logged in...'),(903,1,0,'Admin','Logout','2015-01-23 13:16:01','Admin logged out...'),(904,1,0,'Admin','Login','2015-01-23 13:17:15','Admin logged in...'),(905,1,0,'Admin','Login','2015-01-23 13:18:29','Admin logged in...'),(906,1,0,'Admin','Login','2015-01-23 13:19:31','Admin logged in...'),(907,1,1,'Admin','Projects','2015-01-23 13:19:55','Project updated and saved.'),(908,1,0,'Admin','Logout','2015-01-23 13:20:33','Admin logged out...'),(909,1,0,'Admin','Login','2015-01-23 13:21:20','Admin logged in...'),(910,1,0,'Admin','Logout','2015-01-23 13:21:32','Admin logged out...'),(911,1,0,'Admin','Login','2015-01-23 13:21:48','Admin logged in...'),(912,1,0,'Admin','Logout','2015-01-23 13:26:18','Admin logged out...'),(913,1,0,'Admin','Login','2015-01-23 13:30:17','Admin logged in...'),(914,1,0,'Admin','Logout','2015-01-23 13:42:38','Admin logged out...'),(915,1,0,'Admin','Login','2015-01-23 15:19:37','Admin logged in...'),(916,1,0,'Admin','Logout','2015-01-23 15:28:30','Admin logged out...'),(917,1,0,'Admin','Login','2015-01-23 16:03:20','Admin logged in...'),(918,1,0,'Admin','Logout','2015-01-23 16:23:43','Admin logged out...'),(919,1,0,'Admin','Login','2015-01-26 09:21:54','Admin logged in...'),(920,1,0,'Admin','Logout','2015-01-26 09:46:04','Admin logged out...'),(921,1,0,'Admin','Login','2015-01-26 09:46:17','Admin logged in...'),(922,1,0,'Admin','Login','2015-01-26 11:06:09','Admin logged in...'),(923,1,0,'Admin','Logout','2015-01-26 12:47:07','Admin logged out...'),(924,1,0,'Admin','Login','2015-01-27 08:30:34','Admin logged in...'),(925,1,0,'Admin','Logout','2015-01-27 08:31:08','Admin logged out...'),(926,1,0,'Admin','Login','2015-01-27 08:32:56','Admin logged in...'),(927,1,0,'Admin','Login','2015-01-27 09:35:44','Admin logged in...'),(928,1,0,'Admin','Logout','2015-01-27 09:36:30','Admin logged out...'),(929,1,0,'Admin','Login','2015-01-27 13:45:14','Admin logged in...'),(930,1,0,'Admin','Logout','2015-01-27 13:56:37','Admin logged out...'),(931,1,0,'Admin','Login','2015-01-29 09:58:40','Admin logged in...'),(932,1,0,'Admin','Logout','2015-01-29 10:02:31','Admin logged out...'),(933,9,0,'Damien Robson','Login','2015-01-29 10:02:46','Damien Robson logged in...'),(934,9,0,'Damien Robson','Login','2015-01-29 10:49:23','Damien Robson logged in...'),(935,9,0,'Damien Robson','Login','2015-01-29 10:52:39','Damien Robson logged in...'),(936,9,0,'Damien Robson','Login','2015-01-29 10:54:26','Damien Robson logged in...'),(937,9,0,'Damien Robson','Logout','2015-01-29 10:55:01','Damien Robson logged out...'),(938,9,0,'Damien Robson','Login','2015-01-29 10:55:46','Damien Robson logged in...'),(939,9,0,'Damien Robson','Login','2015-01-29 10:58:47','Damien Robson logged in...'),(940,9,0,'Damien Robson','Logout','2015-01-29 10:59:13','Damien Robson logged out...'),(941,9,0,'Damien Robson','Login','2015-01-29 14:01:31','Damien Robson logged in...'),(942,9,1,'Damien Robson','PO','2015-01-29 14:02:22','Purchase Order 1 was updated and saved.'),(943,9,0,'Damien Robson','Logout','2015-01-29 14:03:02','Damien Robson logged out...'),(944,9,0,'Damien Robson','Login','2015-01-29 14:04:05','Damien Robson logged in...'),(945,9,0,'Damien Robson','Logout','2015-01-29 14:04:34','Damien Robson logged out...'),(946,9,0,'Damien Robson','Login','2015-01-29 14:06:43','Damien Robson logged in...'),(947,9,0,'Damien Robson','Login','2015-01-29 14:15:02','Damien Robson logged in...'),(948,9,0,'Damien Robson','Logout','2015-01-29 14:15:13','Damien Robson logged out...'),(949,9,0,'Damien Robson','Login','2015-01-29 14:16:55','Damien Robson logged in...'),(950,9,0,'Damien Robson','Logout','2015-01-29 15:24:15','Damien Robson logged out...'),(951,9,0,'Damien Robson','Login','2015-01-30 12:23:07','Damien Robson logged in...'),(952,9,0,'Damien Robson','Logout','2015-01-30 12:23:18','Damien Robson logged out...'),(953,9,0,'Damien Robson','Login','2015-01-30 12:59:39','Damien Robson logged in...'),(954,9,0,'Damien Robson','Login','2015-01-30 13:00:28','Damien Robson logged in...'),(955,9,0,'Damien Robson','Logout','2015-01-30 13:00:32','Damien Robson logged out...'),(956,9,0,'Damien Robson','Login','2015-01-30 13:00:54','Damien Robson logged in...'),(957,9,0,'Damien Robson','Logout','2015-01-30 13:01:28','Damien Robson logged out...'),(958,9,0,'Damien Robson','Login','2015-01-30 13:11:22','Damien Robson logged in...'),(959,9,0,'Damien Robson','Login','2015-01-30 13:12:31','Damien Robson logged in...'),(960,9,0,'Damien Robson','Login','2015-01-30 13:19:30','Damien Robson logged in...'),(961,9,27,'Damien Robson','Projects','2015-01-30 13:19:51','Project updated and saved.'),(962,9,0,'Damien Robson','Logout','2015-01-30 13:20:15','Damien Robson logged out...'),(963,9,0,'Damien Robson','Login','2015-01-30 13:20:38','Damien Robson logged in...'),(964,9,0,'Damien Robson','Logout','2015-01-30 13:21:04','Damien Robson logged out...'),(965,9,0,'Damien Robson','Login','2015-01-30 13:26:20','Damien Robson logged in...'),(966,9,0,'Damien Robson','Logout','2015-01-30 13:26:35','Damien Robson logged out...'),(967,9,0,'Damien Robson','Login','2015-01-30 13:33:41','Damien Robson logged in...'),(968,9,0,'Damien Robson','Login','2015-01-30 13:35:05','Damien Robson logged in...'),(969,9,0,'Damien Robson','Login','2015-01-30 13:36:30','Damien Robson logged in...'),(970,9,0,'Damien Robson','Login','2015-01-30 13:41:46','Damien Robson logged in...'),(971,9,0,'Damien Robson','Login','2015-01-30 13:42:35','Damien Robson logged in...'),(972,9,0,'Damien Robson','Login','2015-01-30 13:43:08','Damien Robson logged in...'),(973,9,0,'Damien Robson','Logout','2015-01-30 13:43:36','Damien Robson logged out...'),(974,9,0,'Damien Robson','Login','2015-01-30 13:46:11','Damien Robson logged in...'),(975,9,0,'Damien Robson','Logout','2015-01-30 13:46:46','Damien Robson logged out...'),(976,9,0,'Damien Robson','Login','2015-01-30 13:47:45','Damien Robson logged in...'),(977,9,0,'Damien Robson','Logout','2015-01-30 13:48:20','Damien Robson logged out...'),(978,9,0,'Damien Robson','Login','2015-01-30 13:50:57','Damien Robson logged in...'),(979,9,0,'Damien Robson','Login','2015-01-30 13:53:14','Damien Robson logged in...'),(980,9,0,'Damien Robson','Login','2015-01-30 13:54:13','Damien Robson logged in...'),(981,9,0,'Damien Robson','Login','2015-01-30 13:54:53','Damien Robson logged in...'),(982,9,0,'Damien Robson','Login','2015-01-30 13:56:05','Damien Robson logged in...'),(983,9,0,'Damien Robson','Login','2015-01-30 13:59:52','Damien Robson logged in...'),(984,9,0,'Damien Robson','Login','2015-01-30 14:00:36','Damien Robson logged in...'),(985,9,0,'Damien Robson','Login','2015-01-30 14:01:23','Damien Robson logged in...'),(986,9,0,'Damien Robson','Login','2015-01-30 14:02:32','Damien Robson logged in...'),(987,9,0,'Damien Robson','Login','2015-01-30 14:04:37','Damien Robson logged in...'),(988,9,0,'Damien Robson','Login','2015-01-30 14:07:54','Damien Robson logged in...'),(989,9,0,'Damien Robson','Login','2015-01-30 14:10:21','Damien Robson logged in...'),(990,9,0,'Damien Robson','Login','2015-01-30 14:12:08','Damien Robson logged in...'),(991,9,0,'Damien Robson','Login','2015-01-30 14:13:06','Damien Robson logged in...'),(992,9,0,'Damien Robson','Login','2015-01-30 14:20:25','Damien Robson logged in...'),(993,9,0,'Damien Robson','Login','2015-01-30 14:33:27','Damien Robson logged in...'),(994,9,0,'Damien Robson','Logout','2015-01-30 14:33:44','Damien Robson logged out...'),(995,9,0,'Damien Robson','Login','2015-01-30 14:36:40','Damien Robson logged in...'),(996,9,0,'Damien Robson','Login','2015-01-30 14:37:42','Damien Robson logged in...'),(997,9,0,'Damien Robson','Login','2015-01-30 14:42:53','Damien Robson logged in...'),(998,9,0,'Damien Robson','Login','2015-01-30 14:47:58','Damien Robson logged in...'),(999,9,0,'Damien Robson','Login','2015-01-30 14:48:41','Damien Robson logged in...'),(1000,9,0,'Damien Robson','Login','2015-01-30 14:49:53','Damien Robson logged in...'),(1001,9,0,'Damien Robson','Logout','2015-01-30 14:51:16','Damien Robson logged out...'),(1002,9,0,'Damien Robson','Login','2015-01-30 14:51:42','Damien Robson logged in...'),(1003,9,0,'Damien Robson','Logout','2015-01-30 14:52:36','Damien Robson logged out...'),(1004,9,0,'Damien Robson','Login','2015-01-30 14:58:05','Damien Robson logged in...'),(1005,9,26,'Damien Robson','Projects','2015-01-30 15:00:46','Project updated and saved.'),(1006,9,27,'Damien Robson','Projects','2015-01-30 15:00:52','Project updated and saved.'),(1007,9,0,'Damien Robson','Logout','2015-01-30 15:01:47','Damien Robson logged out...'),(1008,9,0,'Damien Robson','Login','2015-02-02 09:12:40','Damien Robson logged in...'),(1009,9,0,'Damien Robson','Logout','2015-02-02 09:12:47','Damien Robson logged out...'),(1010,9,0,'Damien Robson','Login','2015-02-02 15:34:03','Damien Robson logged in...'),(1011,9,0,'Damien Robson','Logout','2015-02-02 15:36:03','Damien Robson logged out...'),(1012,9,0,'Damien Robson','Login','2015-02-02 15:37:44','Damien Robson logged in...'),(1013,9,0,'Damien Robson','Logout','2015-02-02 15:38:30','Damien Robson logged out...'),(1014,9,0,'Damien Robson','Login','2015-02-03 08:56:09','Damien Robson logged in...'),(1015,9,0,'Damien Robson','Logout','2015-02-03 08:56:13','Damien Robson logged out...'),(1016,9,0,'Damien Robson','Login','2015-02-03 12:49:33','Damien Robson logged in...'),(1017,9,0,'Damien Robson','Logout','2015-02-03 12:49:39','Damien Robson logged out...'),(1018,9,0,'Damien Robson','Login','2015-02-03 13:11:41','Damien Robson logged in...'),(1019,9,0,'Damien Robson','Login','2015-02-03 13:42:48','Damien Robson logged in...'),(1020,9,0,'Damien Robson','Logout','2015-02-03 13:44:10','Damien Robson logged out...'),(1021,9,0,'Damien Robson','Login','2015-02-03 13:44:56','Damien Robson logged in...'),(1022,9,0,'Damien Robson','Logout','2015-02-03 13:47:18','Damien Robson logged out...'),(1023,9,0,'Damien Robson','Login','2015-02-03 13:47:26','Damien Robson logged in...'),(1024,9,0,'Damien Robson','Logout','2015-02-03 13:47:44','Damien Robson logged out...'),(1025,9,0,'Damien Robson','Login','2015-02-03 13:48:18','Damien Robson logged in...'),(1026,9,0,'Damien Robson','Logout','2015-02-03 13:49:27','Damien Robson logged out...'),(1027,9,0,'Damien Robson','Login','2015-02-04 08:22:07','Damien Robson logged in...'),(1028,9,0,'Damien Robson','Login','2015-02-04 08:23:21','Damien Robson logged in...'),(1029,9,0,'Damien Robson','Login','2015-02-04 08:24:39','Damien Robson logged in...'),(1030,9,0,'Damien Robson','Login','2015-02-04 08:27:28','Damien Robson logged in...'),(1031,9,0,'Damien Robson','Login','2015-02-04 08:34:54','Damien Robson logged in...'),(1032,9,0,'Damien Robson','Logout','2015-02-04 08:36:49','Damien Robson logged out...'),(1033,9,0,'Damien Robson','Login','2015-02-04 08:38:21','Damien Robson logged in...'),(1034,9,0,'Damien Robson','Logout','2015-02-04 08:39:14','Damien Robson logged out...'),(1035,9,0,'Damien Robson','Login','2015-02-04 09:05:09','Damien Robson logged in...'),(1036,9,0,'Damien Robson','Logout','2015-02-04 09:10:45','Damien Robson logged out...'),(1037,9,0,'Damien Robson','Login','2015-02-04 09:11:05','Damien Robson logged in...'),(1038,9,0,'Damien Robson','Logout','2015-02-04 09:11:48','Damien Robson logged out...'),(1039,9,0,'Damien Robson','Login','2015-02-04 09:27:05','Damien Robson logged in...'),(1040,9,0,'Damien Robson','Login','2015-02-04 09:29:13','Damien Robson logged in...'),(1041,9,0,'Damien Robson','Login','2015-02-04 09:30:24','Damien Robson logged in...'),(1042,9,0,'Damien Robson','Login','2015-02-04 09:32:34','Damien Robson logged in...'),(1043,9,0,'Damien Robson','Login','2015-02-04 09:34:03','Damien Robson logged in...'),(1044,9,0,'Damien Robson','Logout','2015-02-04 09:34:34','Damien Robson logged out...'),(1045,9,0,'Damien Robson','Login','2015-02-04 09:40:17','Damien Robson logged in...'),(1046,9,0,'Damien Robson','Login','2015-02-04 09:40:53','Damien Robson logged in...'),(1047,9,0,'Damien Robson','Logout','2015-02-04 09:46:11','Damien Robson logged out...'),(1048,9,0,'Damien Robson','Login','2015-02-04 10:19:22','Damien Robson logged in...'),(1049,9,0,'Damien Robson','Login','2015-02-04 10:21:48','Damien Robson logged in...'),(1050,9,0,'Damien Robson','Login','2015-02-04 10:22:59','Damien Robson logged in...'),(1051,9,0,'Damien Robson','Login','2015-02-04 10:24:45','Damien Robson logged in...'),(1052,9,0,'Damien Robson','Login','2015-02-04 10:27:10','Damien Robson logged in...'),(1053,9,0,'Damien Robson','Login','2015-02-04 10:28:47','Damien Robson logged in...'),(1054,9,0,'Damien Robson','Logout','2015-02-04 10:29:34','Damien Robson logged out...'),(1055,9,0,'Damien Robson','Login','2015-02-04 10:34:09','Damien Robson logged in...'),(1056,9,0,'Damien Robson','Login','2015-02-04 10:38:13','Damien Robson logged in...'),(1057,9,0,'Damien Robson','Login','2015-02-04 10:40:20','Damien Robson logged in...'),(1058,9,0,'Damien Robson','Logout','2015-02-04 10:40:38','Damien Robson logged out...'),(1059,9,0,'Damien Robson','Login','2015-02-04 10:56:08','Damien Robson logged in...'),(1060,9,0,'Damien Robson','Logout','2015-02-04 10:56:28','Damien Robson logged out...'),(1061,9,0,'Damien Robson','Login','2015-02-04 10:58:41','Damien Robson logged in...'),(1062,9,0,'Damien Robson','Logout','2015-02-04 10:58:53','Damien Robson logged out...'),(1063,9,0,'Damien Robson','Login','2015-02-04 11:07:22','Damien Robson logged in...'),(1064,9,0,'Damien Robson','Logout','2015-02-04 11:07:36','Damien Robson logged out...'),(1065,9,0,'Damien Robson','Login','2015-02-04 12:19:58','Damien Robson logged in...'),(1066,9,0,'Damien Robson','Logout','2015-02-04 12:20:14','Damien Robson logged out...'),(1067,9,0,'Damien Robson','Login','2015-02-04 12:25:57','Damien Robson logged in...'),(1068,9,0,'Damien Robson','Login','2015-02-04 12:27:38','Damien Robson logged in...'),(1069,9,0,'Damien Robson','Login','2015-02-04 12:28:49','Damien Robson logged in...'),(1070,9,0,'Damien Robson','Logout','2015-02-04 12:30:49','Damien Robson logged out...'),(1071,9,0,'Damien Robson','Login','2015-02-04 12:34:13','Damien Robson logged in...'),(1072,9,0,'Damien Robson','Logout','2015-02-04 12:34:50','Damien Robson logged out...'),(1073,9,0,'Damien Robson','Login','2015-02-04 12:35:26','Damien Robson logged in...'),(1074,9,0,'Damien Robson','Logout','2015-02-04 12:35:40','Damien Robson logged out...'),(1075,9,0,'Damien Robson','Login','2015-02-04 12:39:01','Damien Robson logged in...'),(1076,9,0,'Damien Robson','Login','2015-02-04 12:40:02','Damien Robson logged in...'),(1077,9,0,'Damien Robson','Logout','2015-02-04 12:40:44','Damien Robson logged out...'),(1078,9,0,'Damien Robson','Login','2015-02-04 12:40:51','Damien Robson logged in...'),(1079,9,0,'Damien Robson','Login','2015-02-04 12:42:33','Damien Robson logged in...'),(1080,9,0,'Damien Robson','Logout','2015-02-04 12:43:10','Damien Robson logged out...'),(1081,9,0,'Damien Robson','Login','2015-02-04 12:44:00','Damien Robson logged in...'),(1082,9,0,'Damien Robson','Logout','2015-02-04 13:02:06','Damien Robson logged out...'),(1083,9,0,'Damien Robson','Login','2015-02-04 13:02:21','Damien Robson logged in...'),(1084,9,0,'Damien Robson','Logout','2015-02-04 13:03:47','Damien Robson logged out...'),(1085,9,0,'Damien Robson','Login','2015-02-05 08:56:39','Damien Robson logged in...'),(1086,9,0,'Damien Robson','Logout','2015-02-05 08:57:39','Damien Robson logged out...'),(1087,9,0,'Damien Robson','Login','2015-02-05 09:05:39','Damien Robson logged in...'),(1088,9,25,'Damien Robson','Projects','2015-02-05 09:05:56','Project updated and saved.'),(1089,9,0,'Damien Robson','Logout','2015-02-05 09:06:00','Damien Robson logged out...'),(1090,9,0,'Damien Robson','Login','2015-02-05 09:07:40','Damien Robson logged in...'),(1091,9,12,'Damien Robson','Projects','2015-02-05 09:12:57','Project updated and saved.'),(1092,9,12,'Damien Robson','Projects','2015-02-05 09:12:58','Project updated and saved.'),(1093,9,4,'Damien Robson','Projects','2015-02-05 09:12:59','Project updated and saved.'),(1094,9,17,'Damien Robson','Projects','2015-02-05 09:12:59','Project updated and saved.'),(1095,9,12,'Damien Robson','Projects','2015-02-05 09:14:32','Project updated and saved.'),(1096,9,12,'Damien Robson','Projects','2015-02-05 09:14:44','Project updated and saved.'),(1097,9,0,'Damien Robson','Logout','2015-02-05 09:19:47','Damien Robson logged out...'),(1098,9,0,'Damien Robson','Login','2015-02-05 10:04:58','Damien Robson logged in...'),(1099,9,0,'Damien Robson','Logout','2015-02-05 10:05:02','Damien Robson logged out...'),(1100,9,0,'Damien Robson','Login','2015-02-05 10:05:15','Damien Robson logged in...'),(1101,9,0,'Damien Robson','Logout','2015-02-05 10:09:17','Damien Robson logged out...'),(1102,9,0,'Damien Robson','Login','2015-02-05 10:17:05','Damien Robson logged in...'),(1103,9,0,'Damien Robson','Logout','2015-02-05 10:18:37','Damien Robson logged out...'),(1104,9,0,'Damien Robson','Login','2015-02-05 10:20:53','Damien Robson logged in...'),(1105,9,0,'Damien Robson','Logout','2015-02-05 10:21:57','Damien Robson logged out...'),(1106,9,0,'Damien Robson','Login','2015-02-05 10:53:33','Damien Robson logged in...'),(1107,9,0,'Damien Robson','Logout','2015-02-05 10:53:52','Damien Robson logged out...'),(1108,9,0,'Damien Robson','Login','2015-02-05 10:54:03','Damien Robson logged in...'),(1109,9,0,'Damien Robson','Logout','2015-02-05 10:54:16','Damien Robson logged out...'),(1110,9,0,'Damien Robson','Login','2015-02-05 10:58:59','Damien Robson logged in...'),(1111,9,0,'Damien Robson','Logout','2015-02-05 10:59:08','Damien Robson logged out...'),(1112,9,0,'Damien Robson','Login','2015-02-05 11:08:16','Damien Robson logged in...'),(1113,9,0,'Damien Robson','Logout','2015-02-05 11:09:20','Damien Robson logged out...'),(1114,9,0,'Damien Robson','Login','2015-02-05 11:09:46','Damien Robson logged in...'),(1115,9,0,'Damien Robson','Login','2015-02-05 11:13:00','Damien Robson logged in...'),(1116,9,0,'Damien Robson','Logout','2015-02-05 11:13:19','Damien Robson logged out...'),(1117,9,0,'Damien Robson','Login','2015-02-05 11:17:24','Damien Robson logged in...'),(1118,9,0,'Damien Robson','Logout','2015-02-05 11:17:44','Damien Robson logged out...'),(1119,9,0,'Damien Robson','Login','2015-02-06 09:59:28','Damien Robson logged in...'),(1120,9,0,'Damien Robson','Logout','2015-02-06 10:01:22','Damien Robson logged out...'),(1121,9,0,'Damien Robson','Login','2015-02-06 10:01:34','Damien Robson logged in...'),(1122,9,0,'Damien Robson','Login','2015-02-06 10:03:20','Damien Robson logged in...'),(1123,9,0,'Damien Robson','Login','2015-02-06 10:07:18','Damien Robson logged in...'),(1124,9,0,'Damien Robson','Logout','2015-02-06 10:07:41','Damien Robson logged out...'),(1125,9,0,'Damien Robson','Login','2015-02-06 10:08:02','Damien Robson logged in...'),(1126,9,0,'Damien Robson','Logout','2015-02-06 10:08:48','Damien Robson logged out...'),(1127,9,0,'Damien Robson','Login','2015-02-06 10:08:58','Damien Robson logged in...'),(1128,9,0,'Damien Robson','Logout','2015-02-06 10:09:32','Damien Robson logged out...'),(1129,9,0,'Damien Robson','Login','2015-02-06 10:09:49','Damien Robson logged in...'),(1130,9,0,'Damien Robson','Logout','2015-02-06 10:12:52','Damien Robson logged out...'),(1131,9,0,'Damien Robson','Login','2015-02-06 10:18:48','Damien Robson logged in...'),(1132,9,0,'Damien Robson','Logout','2015-02-06 10:19:05','Damien Robson logged out...'),(1133,9,0,'Damien Robson','Login','2015-02-06 10:19:43','Damien Robson logged in...'),(1134,9,0,'Damien Robson','Login','2015-02-06 10:20:29','Damien Robson logged in...'),(1135,9,0,'Damien Robson','Logout','2015-02-06 10:22:11','Damien Robson logged out...'),(1136,9,0,'Damien Robson','Login','2015-02-06 11:20:09','Damien Robson logged in...'),(1137,9,0,'Damien Robson','Logout','2015-02-06 11:20:35','Damien Robson logged out...'),(1138,9,0,'Damien Robson','Login','2015-02-06 11:21:54','Damien Robson logged in...'),(1139,9,0,'Damien Robson','Logout','2015-02-06 11:22:11','Damien Robson logged out...'),(1140,9,0,'Damien Robson','Login','2015-02-06 11:38:39','Damien Robson logged in...'),(1141,9,0,'Damien Robson','Logout','2015-02-06 11:38:45','Damien Robson logged out...'),(1142,9,0,'Damien Robson','Login','2015-02-06 11:39:53','Damien Robson logged in...'),(1143,9,0,'Damien Robson','Logout','2015-02-06 11:39:56','Damien Robson logged out...'),(1144,9,0,'Damien Robson','Login','2015-02-06 11:47:22','Damien Robson logged in...'),(1145,9,0,'Damien Robson','Login','2015-02-06 11:49:33','Damien Robson logged in...'),(1146,9,0,'Damien Robson','Logout','2015-02-06 11:50:10','Damien Robson logged out...'),(1147,9,0,'Damien Robson','Login','2015-02-06 11:50:44','Damien Robson logged in...'),(1148,9,0,'Damien Robson','Logout','2015-02-06 11:51:09','Damien Robson logged out...'),(1149,9,0,'Damien Robson','Login','2015-02-06 11:53:56','Damien Robson logged in...'),(1150,9,0,'Damien Robson','Logout','2015-02-06 11:55:22','Damien Robson logged out...'),(1151,9,0,'Damien Robson','Login','2015-02-06 11:58:40','Damien Robson logged in...'),(1152,9,0,'Damien Robson','Logout','2015-02-06 11:59:00','Damien Robson logged out...'),(1153,1,0,'Admin','Login','2015-02-06 12:01:03','Admin logged in...'),(1154,1,0,'Admin','Logout','2015-02-06 12:01:24','Admin logged out...'),(1155,1,0,'Admin','Login','2015-02-06 12:05:49','Admin logged in...'),(1156,1,0,'Admin','Logout','2015-02-06 12:07:34','Admin logged out...'),(1157,9,0,'Damien Robson','Login','2015-02-06 14:22:01','Damien Robson logged in...'),(1158,9,0,'Damien Robson','Logout','2015-02-06 14:24:05','Damien Robson logged out...'),(1159,9,0,'Damien Robson','Login','2015-02-06 14:25:09','Damien Robson logged in...'),(1160,9,0,'Damien Robson','Logout','2015-02-06 14:26:59','Damien Robson logged out...'),(1161,1,0,'Admin','Login','2015-02-09 08:36:06','Admin logged in...'),(1162,1,0,'Admin','Login','2015-02-09 08:39:07','Admin logged in...'),(1163,1,0,'Admin','Login','2015-02-09 08:41:02','Admin logged in...'),(1164,1,0,'Admin','Login','2015-02-09 08:44:10','Admin logged in...'),(1165,1,0,'Admin','Logout','2015-02-09 08:44:38','Admin logged out...'),(1166,1,0,'Admin','Login','2015-02-09 08:54:46','Admin logged in...'),(1167,1,0,'Admin','Logout','2015-02-09 08:55:28','Admin logged out...'),(1168,1,0,'Admin','Login','2015-02-09 09:10:40','Admin logged in...'),(1169,1,0,'Admin','Logout','2015-02-09 09:10:49','Admin logged out...'),(1170,1,0,'Admin','Login','2015-02-09 09:13:25','Admin logged in...'),(1171,1,0,'Admin','Logout','2015-02-09 09:14:30','Admin logged out...'),(1172,1,0,'Admin','Login','2015-02-09 09:21:56','Admin logged in...'),(1173,1,0,'Admin','Logout','2015-02-09 09:22:57','Admin logged out...'),(1174,1,0,'Admin','Login','2015-02-09 09:55:15','Admin logged in...'),(1175,1,0,'Admin','Login','2015-02-09 10:28:12','Admin logged in...'),(1176,1,0,'Admin','Logout','2015-02-09 10:29:11','Admin logged out...'),(1177,1,0,'Admin','Login','2015-02-09 10:31:21','Admin logged in...'),(1178,1,0,'Admin','Logout','2015-02-09 10:31:25','Admin logged out...'),(1179,1,0,'Admin','Login','2015-02-09 13:33:00','Admin logged in...'),(1180,1,0,'Admin','Logout','2015-02-09 13:41:49','Admin logged out...'),(1181,1,0,'Admin','Login','2015-02-11 08:20:47','Admin logged in...'),(1182,1,0,'Admin','Logout','2015-02-11 08:26:40','Admin logged out...'),(1183,1,0,'Admin','Login','2015-02-11 08:26:49','Admin logged in...'),(1184,1,0,'Admin','Login','2015-02-11 08:41:22','Admin logged in...'),(1185,1,0,'Admin','Logout','2015-02-11 08:43:35','Admin logged out...'),(1186,1,0,'Admin','Login','2015-02-11 08:46:04','Admin logged in...'),(1187,1,0,'Admin','Logout','2015-02-11 08:46:41','Admin logged out...'),(1188,1,0,'Admin','Login','2015-02-11 08:52:04','Admin logged in...'),(1189,1,0,'Admin','Logout','2015-02-11 08:56:52','Admin logged out...'),(1190,1,0,'Admin','Login','2015-02-11 08:58:10','Admin logged in...'),(1191,1,0,'Admin','Logout','2015-02-11 09:06:21','Admin logged out...'),(1192,1,0,'Admin','Login','2015-02-11 09:07:44','Admin logged in...'),(1193,1,0,'Admin','Login','2015-02-11 09:09:54','Admin logged in...'),(1194,1,0,'Admin','Logout','2015-02-11 09:10:40','Admin logged out...'),(1195,1,0,'Admin','Login','2015-02-11 09:12:47','Admin logged in...'),(1196,1,0,'Admin','Logout','2015-02-11 09:13:13','Admin logged out...'),(1197,1,0,'Admin','Login','2015-02-11 09:14:30','Admin logged in...'),(1198,1,0,'Admin','Login','2015-02-11 09:17:47','Admin logged in...'),(1199,1,0,'Admin','Logout','2015-02-11 09:19:19','Admin logged out...'),(1200,1,0,'Admin','Login','2015-02-11 09:22:54','Admin logged in...'),(1201,1,0,'Admin','Login','2015-02-11 09:29:04','Admin logged in...'),(1202,1,0,'Admin','Logout','2015-02-11 09:30:10','Admin logged out...'),(1203,1,0,'Admin','Login','2015-02-11 09:39:01','Admin logged in...'),(1204,1,0,'Admin','Login','2015-02-11 09:42:58','Admin logged in...'),(1205,1,0,'Admin','Logout','2015-02-11 09:44:19','Admin logged out...'),(1206,1,0,'Admin','Login','2015-02-11 09:50:11','Admin logged in...'),(1207,1,0,'Admin','Logout','2015-02-11 09:50:50','Admin logged out...'),(1208,1,0,'Admin','Login','2015-02-11 09:55:05','Admin logged in...'),(1209,1,0,'Admin','Logout','2015-02-11 09:55:35','Admin logged out...'),(1210,1,0,'Admin','Login','2015-02-11 10:18:22','Admin logged in...'),(1211,1,0,'Admin','Logout','2015-02-11 10:43:56','Admin logged out...'),(1212,1,0,'Admin','Login','2015-02-11 10:44:19','Admin logged in...'),(1213,1,0,'Admin','Logout','2015-02-11 10:50:11','Admin logged out...'),(1214,1,0,'Admin','Login','2015-02-11 11:15:06','Admin logged in...'),(1215,1,0,'Admin','Logout','2015-02-11 11:28:53','Admin logged out...'),(1216,1,0,'Admin','Login','2015-02-11 13:01:26','Admin logged in...'),(1217,1,0,'Admin','Login','2015-02-11 14:38:47','Admin logged in...'),(1218,1,2,'Admin','PO','2015-02-11 14:39:01','Purchase Order 2 was updated and saved.'),(1219,1,2,'Admin','PO','2015-02-11 14:39:20','Purchase Order 2 was updated and saved.'),(1220,1,0,'Admin','Logout','2015-02-11 14:39:40','Admin logged out...'),(1221,1,0,'Admin','Login','2015-02-11 14:40:56','Admin logged in...'),(1222,1,1,'Admin','PO','2015-02-11 14:41:07','Purchase Order 1 was updated and saved.'),(1223,1,0,'Admin','Logout','2015-02-11 14:41:23','Admin logged out...'),(1224,1,0,'Admin','Login','2015-02-12 08:07:50','Admin logged in...'),(1225,1,0,'Admin','Login','2015-02-12 08:08:54','Admin logged in...'),(1226,1,0,'Admin','Login','2015-02-12 08:14:37','Admin logged in...'),(1227,1,0,'Admin','Logout','2015-02-12 08:15:57','Admin logged out...'),(1228,1,0,'Admin','Login','2015-02-12 08:19:32','Admin logged in...'),(1229,1,0,'Admin','Login','2015-02-12 08:20:55','Admin logged in...'),(1230,1,0,'Admin','Login','2015-02-12 08:37:51','Admin logged in...'),(1231,1,0,'Admin','Login','2015-02-12 08:39:26','Admin logged in...'),(1232,1,0,'Admin','Login','2015-02-12 08:40:55','Admin logged in...'),(1233,1,0,'Admin','Login','2015-02-12 08:41:32','Admin logged in...'),(1234,1,0,'Admin','Login','2015-02-12 08:44:25','Admin logged in...'),(1235,1,0,'Admin','Login','2015-02-12 08:46:06','Admin logged in...'),(1236,1,0,'Admin','Login','2015-02-12 09:18:47','Admin logged in...'),(1237,1,0,'Admin','Logout','2015-02-12 09:21:26','Admin logged out...'),(1238,1,0,'Admin','Login','2015-02-16 10:22:23','Admin logged in...'),(1239,1,0,'Admin','Login','2015-02-16 10:25:44','Admin logged in...'),(1240,1,0,'Admin','Logout','2015-02-16 10:27:31','Admin logged out...'),(1241,1,0,'Admin','Login','2015-02-16 10:34:58','Admin logged in...'),(1242,1,0,'Admin','Logout','2015-02-16 10:35:05','Admin logged out...'),(1243,1,0,'Admin','Login','2015-02-16 12:26:47','Admin logged in...'),(1244,1,0,'Admin','Logout','2015-02-16 12:27:18','Admin logged out...'),(1245,1,0,'Admin','Login','2015-02-16 12:28:41','Admin logged in...'),(1246,1,0,'Admin','Login','2015-02-16 12:29:09','Admin logged in...'),(1247,1,0,'Admin','Login','2015-02-16 12:29:44','Admin logged in...'),(1248,1,0,'Admin','Login','2015-02-16 12:31:19','Admin logged in...'),(1249,1,0,'Admin','Login','2015-02-16 12:33:47','Admin logged in...'),(1250,1,0,'Admin','Logout','2015-02-16 12:41:06','Admin logged out...'),(1251,1,0,'Admin','Login','2015-02-16 13:14:27','Admin logged in...'),(1252,1,0,'Admin','Login','2015-02-16 13:15:19','Admin logged in...'),(1253,1,0,'Admin','Login','2015-02-16 13:21:17','Admin logged in...'),(1254,1,0,'Admin','Logout','2015-02-16 13:21:34','Admin logged out...'),(1255,1,0,'Admin','Login','2015-02-16 13:23:19','Admin logged in...'),(1256,1,0,'Admin','Login','2015-02-16 13:24:48','Admin logged in...'),(1257,1,0,'Admin','Logout','2015-02-16 13:25:11','Admin logged out...'),(1258,1,0,'Admin','Login','2015-02-16 13:46:13','Admin logged in...'),(1259,1,0,'Admin','Login','2015-02-16 13:47:34','Admin logged in...'),(1260,1,0,'Admin','Logout','2015-02-16 13:48:47','Admin logged out...'),(1261,1,0,'Admin','Login','2015-02-16 14:08:32','Admin logged in...'),(1262,1,0,'Admin','Logout','2015-02-16 14:08:50','Admin logged out...'),(1263,1,0,'Admin','Login','2015-02-16 14:10:51','Admin logged in...'),(1264,1,0,'Admin','Logout','2015-02-16 14:11:36','Admin logged out...'),(1265,1,0,'Admin','Login','2015-02-16 14:14:18','Admin logged in...'),(1266,1,0,'Admin','Logout','2015-02-16 14:14:31','Admin logged out...'),(1267,1,0,'Admin','Login','2015-02-16 14:16:37','Admin logged in...'),(1268,1,0,'Admin','Logout','2015-02-16 14:19:49','Admin logged out...'),(1269,1,0,'Admin','Login','2015-02-16 14:26:00','Admin logged in...'),(1270,1,0,'Admin','Logout','2015-02-16 14:26:20','Admin logged out...'),(1271,1,0,'Admin','Login','2015-02-16 14:27:20','Admin logged in...'),(1272,1,0,'Admin','Logout','2015-02-16 14:27:41','Admin logged out...'),(1273,1,0,'Admin','Login','2015-02-16 14:31:29','Admin logged in...'),(1274,1,0,'Admin','Logout','2015-02-16 14:31:52','Admin logged out...'),(1275,1,0,'Admin','Login','2015-02-16 14:33:21','Admin logged in...'),(1276,1,0,'Admin','Logout','2015-02-16 14:33:30','Admin logged out...'),(1277,1,0,'Admin','Login','2015-02-16 14:45:51','Admin logged in...'),(1278,1,0,'Admin','Login','2015-02-16 14:47:00','Admin logged in...'),(1279,1,0,'Admin','Logout','2015-02-16 14:47:15','Admin logged out...'),(1280,1,0,'Admin','Login','2015-02-16 14:49:43','Admin logged in...'),(1281,1,0,'Admin','Logout','2015-02-16 14:50:23','Admin logged out...'),(1282,1,0,'Admin','Login','2015-02-16 14:50:34','Admin logged in...'),(1283,1,0,'Admin','Logout','2015-02-16 14:50:38','Admin logged out...'),(1284,1,0,'Admin','Login','2015-02-16 15:53:29','Admin logged in...'),(1285,1,0,'Admin','Logout','2015-02-16 15:53:41','Admin logged out...'),(1286,1,0,'Admin','Login','2015-02-16 15:54:42','Admin logged in...'),(1287,1,0,'Admin','Logout','2015-02-16 15:55:32','Admin logged out...'),(1288,1,0,'Admin','Login','2015-02-16 15:57:43','Admin logged in...'),(1289,1,0,'Admin','Logout','2015-02-16 16:12:03','Admin logged out...'),(1290,1,0,'Admin','Login','2015-02-17 08:12:49','Admin logged in...'),(1291,1,0,'Admin','Login','2015-02-17 08:18:12','Admin logged in...'),(1292,1,0,'Admin','Login','2015-02-17 08:23:54','Admin logged in...'),(1293,1,0,'Admin','Logout','2015-02-17 08:24:31','Admin logged out...'),(1294,1,0,'Admin','Login','2015-02-17 08:25:14','Admin logged in...'),(1295,1,0,'Admin','Login','2015-02-17 08:27:07','Admin logged in...'),(1296,1,0,'Admin','Logout','2015-02-17 08:27:54','Admin logged out...'),(1297,1,0,'Admin','Login','2015-02-17 08:53:27','Admin logged in...'),(1298,1,0,'Admin','Logout','2015-02-17 08:54:31','Admin logged out...'),(1299,1,0,'Admin','Login','2015-02-17 08:54:57','Admin logged in...'),(1300,1,0,'Admin','Login','2015-02-17 08:58:13','Admin logged in...'),(1301,1,0,'Admin','Logout','2015-02-17 08:58:44','Admin logged out...'),(1302,1,0,'Admin','Login','2015-02-17 09:02:22','Admin logged in...'),(1303,1,0,'Admin','Logout','2015-02-17 09:03:09','Admin logged out...'),(1304,1,0,'Admin','Login','2015-02-17 09:16:29','Admin logged in...'),(1305,1,0,'Administrator','Login','2015-02-17 09:22:34','Administrator logged in...'),(1306,1,0,'Administrator','Logout','2015-02-17 09:25:12','Administrator logged out...'),(1307,1,0,'Administrator','Login','2015-02-17 09:50:33','Administrator logged in...'),(1308,1,0,'Administrator','Logout','2015-02-17 09:51:42','Administrator logged out...'),(1309,1,0,'Administrator','Login','2015-02-17 09:53:05','Administrator logged in...'),(1310,1,0,'Administrator','Logout','2015-02-17 10:04:32','Administrator logged out...'),(1311,1,0,'Administrator','Login','2015-02-17 10:05:08','Administrator logged in...'),(1312,1,0,'Administrator','Logout','2015-02-17 10:06:57','Administrator logged out...'),(1313,1,0,'Administrator','Login','2015-02-17 13:52:43','Administrator logged in...'),(1314,1,0,'Administrator','Logout','2015-02-17 14:05:46','Administrator logged out...'),(1315,1,0,'Administrator','Login','2015-02-18 10:28:30','Administrator logged in...'),(1316,1,0,'Administrator','Logout','2015-02-18 10:29:14','Administrator logged out...'),(1317,1,0,'Administrator','Login','2015-02-18 10:58:32','Administrator logged in...'),(1318,1,0,'Administrator','Logout','2015-02-18 11:02:48','Administrator logged out...'),(1319,1,0,'Administrator','Login','2015-02-18 11:05:03','Administrator logged in...'),(1320,1,9,'Administrator','Projects','2015-02-18 11:08:25','Project updated and saved.'),(1321,1,0,'Administrator','Logout','2015-02-18 11:09:19','Administrator logged out...'),(1322,1,0,'Administrator','Login','2015-02-18 11:18:12','Administrator logged in...'),(1323,1,0,'Administrator','Logout','2015-02-18 11:19:17','Administrator logged out...'),(1324,1,0,'Administrator','Login','2015-02-18 11:21:10','Administrator logged in...'),(1325,1,0,'Administrator','Logout','2015-02-18 11:24:28','Administrator logged out...'),(1326,1,0,'Administrator','Login','2015-02-19 08:43:18','Administrator logged in...'),(1327,1,28,'Administrator','Projects','2015-02-19 08:44:02','Project updated and saved.'),(1328,1,28,'Administrator','Projects','2015-02-19 08:45:18','Project updated and saved.'),(1329,1,28,'Administrator','Projects','2015-02-19 08:45:42','Project updated and saved.'),(1330,1,0,'Administrator','Logout','2015-02-19 08:45:49','Administrator logged out...'),(1331,1,0,'Administrator','Login','2015-02-19 08:47:12','Administrator logged in...'),(1332,1,28,'Administrator','Projects','2015-02-19 08:47:47','Project updated and saved.'),(1333,1,0,'Administrator','Logout','2015-02-19 08:47:50','Administrator logged out...'),(1334,1,0,'Administrator','Login','2015-02-19 08:49:03','Administrator logged in...'),(1335,1,0,'Administrator','Logout','2015-02-19 08:53:11','Administrator logged out...'),(1336,1,0,'Administrator','Login','2015-02-19 13:38:50','Administrator logged in...'),(1337,1,0,'Administrator','Logout','2015-02-19 13:39:04','Administrator logged out...'),(1338,1,0,'Administrator','Login','2015-02-19 13:40:07','Administrator logged in...'),(1339,1,0,'Administrator','Login','2015-02-19 13:44:18','Administrator logged in...'),(1340,1,0,'Administrator','Login','2015-02-19 13:44:58','Administrator logged in...'),(1341,1,0,'Administrator','Logout','2015-02-19 13:45:14','Administrator logged out...'),(1342,2,0,'Damien Robson','Login','2015-02-19 13:45:39','Damien Robson logged in...'),(1343,2,0,'Damien Robson','Logout','2015-02-19 13:49:34','Damien Robson logged out...'),(1344,2,0,'Damien Robson','Login','2015-02-19 13:49:56','Damien Robson logged in...'),(1345,2,0,'Damien Robson','Login','2015-02-19 13:51:26','Damien Robson logged in...'),(1346,2,0,'Damien Robson','Login','2015-02-19 13:52:27','Damien Robson logged in...'),(1347,2,0,'Damien Robson','Logout','2015-02-19 13:56:32','Damien Robson logged out...'),(1348,2,0,'Damien Robson','Login','2015-02-19 14:33:33','Damien Robson logged in...'),(1349,2,0,'Damien Robson','Logout','2015-02-19 14:33:36','Damien Robson logged out...'),(1350,2,0,'Damien Robson','Login','2015-02-19 14:56:24','Damien Robson logged in...'),(1351,2,0,'Damien Robson','Logout','2015-02-19 14:56:38','Damien Robson logged out...'),(1352,1,0,'Administrator','Login','2015-02-19 15:17:38','Administrator logged in...'),(1353,1,0,'Administrator','Logout','2015-02-19 15:17:52','Administrator logged out...'),(1354,1,0,'Administrator','Login','2015-02-19 15:18:54','Administrator logged in...'),(1355,1,0,'Administrator','Login','2015-02-19 15:21:00','Administrator logged in...'),(1356,1,0,'Administrator','Login','2015-02-19 15:23:18','Administrator logged in...'),(1357,1,0,'Administrator','Login','2015-02-19 15:25:42','Administrator logged in...'),(1358,1,0,'Administrator','Login','2015-02-19 15:29:47','Administrator logged in...'),(1359,1,0,'Administrator','Login','2015-02-19 15:31:54','Administrator logged in...'),(1360,1,0,'Administrator','Login','2015-02-19 15:34:17','Administrator logged in...'),(1361,1,0,'Administrator','Logout','2015-02-19 15:34:42','Administrator logged out...'),(1362,1,0,'Administrator','Login','2015-02-23 09:24:44','Administrator logged in...'),(1363,1,0,'Administrator','Logout','2015-02-23 09:25:22','Administrator logged out...'),(1364,1,0,'Administrator','Login','2015-02-23 10:11:38','Administrator logged in...'),(1365,1,0,'Administrator','Login','2015-02-23 10:19:31','Administrator logged in...'),(1366,1,0,'Administrator','Logout','2015-02-23 10:22:23','Administrator logged out...'),(1367,1,0,'Administrator','Login','2015-02-24 09:15:46','Administrator logged in...'),(1368,1,0,'Administrator','Logout','2015-02-24 09:15:53','Administrator logged out...'),(1369,1,0,'Administrator','Login','2015-02-24 09:16:18','Administrator logged in...'),(1370,1,0,'Administrator','Logout','2015-02-24 09:16:36','Administrator logged out...'),(1371,1,0,'Administrator','Login','2015-02-24 09:17:40','Administrator logged in...'),(1372,1,0,'Administrator','Logout','2015-02-24 09:18:13','Administrator logged out...'),(1373,1,0,'Administrator','Login','2015-02-24 09:41:08','Administrator logged in...'),(1374,1,0,'Administrator','Login','2015-02-24 09:41:35','Administrator logged in...'),(1375,1,0,'Administrator','Login','2015-02-24 09:42:52','Administrator logged in...'),(1376,1,0,'Administrator','Login','2015-02-24 09:44:11','Administrator logged in...'),(1377,1,0,'Administrator','Login','2015-02-24 09:49:20','Administrator logged in...'),(1378,1,0,'Administrator','Login','2015-02-24 09:50:49','Administrator logged in...'),(1379,1,0,'Administrator','Login','2015-02-24 09:53:30','Administrator logged in...'),(1380,1,0,'Administrator','Login','2015-02-24 09:56:47','Administrator logged in...'),(1381,1,0,'Administrator','Login','2015-02-24 10:52:37','Administrator logged in...'),(1382,1,0,'Administrator','Logout','2015-02-24 10:53:24','Administrator logged out...'),(1383,1,0,'Administrator','Login','2015-02-24 10:54:52','Administrator logged in...'),(1384,1,0,'Administrator','Login','2015-02-24 10:56:15','Administrator logged in...'),(1385,1,0,'Administrator','Login','2015-02-24 10:57:19','Administrator logged in...'),(1386,1,0,'Administrator','Login','2015-02-24 10:58:40','Administrator logged in...'),(1387,1,0,'Administrator','Login','2015-02-24 11:08:17','Administrator logged in...'),(1388,1,0,'Administrator','Login','2015-02-24 12:18:08','Administrator logged in...'),(1389,1,0,'Administrator','Logout','2015-02-24 12:18:55','Administrator logged out...'),(1390,1,0,'Administrator','Login','2015-02-24 12:24:24','Administrator logged in...'),(1391,1,0,'Administrator','Logout','2015-02-24 12:24:48','Administrator logged out...'),(1392,1,0,'Administrator','Login','2015-02-24 12:29:20','Administrator logged in...'),(1393,1,0,'Administrator','Logout','2015-02-24 12:29:47','Administrator logged out...'),(1394,1,0,'Administrator','Login','2015-02-24 12:31:50','Administrator logged in...'),(1395,1,0,'Administrator','Logout','2015-02-24 12:32:16','Administrator logged out...'),(1396,1,0,'Administrator','Login','2015-02-24 12:34:15','Administrator logged in...'),(1397,1,0,'Administrator','Logout','2015-02-24 12:34:40','Administrator logged out...'),(1398,1,0,'Administrator','Login','2015-02-24 12:36:21','Administrator logged in...'),(1399,1,0,'Administrator','Logout','2015-02-24 12:36:42','Administrator logged out...'),(1400,2,0,'Damien Robson','Login','2015-02-24 13:12:24','Damien Robson logged in...'),(1401,2,0,'Damien Robson','Logout','2015-02-24 13:13:14','Damien Robson logged out...'),(1402,2,0,'Damien Robson','Login','2015-02-24 13:14:45','Damien Robson logged in...'),(1403,2,0,'Damien Robson','Login','2015-02-24 13:16:04','Damien Robson logged in...'),(1404,2,0,'Damien Robson','Login','2015-02-24 13:18:35','Damien Robson logged in...'),(1405,2,0,'Damien Robson','Login','2015-02-24 13:23:03','Damien Robson logged in...'),(1406,2,0,'Damien Robson','Login','2015-02-24 13:26:21','Damien Robson logged in...'),(1407,1,0,'Administrator','Login','2015-02-24 14:37:02','Administrator logged in...'),(1408,1,0,'Administrator','Logout','2015-02-24 14:37:28','Administrator logged out...'),(1409,1,0,'Administrator','Login','2015-02-24 14:47:14','Administrator logged in...'),(1410,1,0,'Administrator','Logout','2015-02-24 14:49:17','Administrator logged out...'),(1411,1,0,'Administrator','Login','2015-02-24 15:00:06','Administrator logged in...'),(1412,1,0,'Administrator','Logout','2015-02-24 15:01:12','Administrator logged out...'),(1413,1,0,'Administrator','Login','2015-02-24 15:02:35','Administrator logged in...'),(1414,1,0,'Administrator','Login','2015-02-24 15:19:47','Administrator logged in...'),(1415,1,0,'Administrator','Logout','2015-02-24 15:21:42','Administrator logged out...'),(1416,1,0,'Administrator','Login','2015-02-24 15:54:27','Administrator logged in...'),(1417,1,0,'Administrator','Login','2015-02-25 08:45:14','Administrator logged in...'),(1418,1,0,'Administrator','Logout','2015-02-25 08:45:46','Administrator logged out...'),(1419,1,0,'Administrator','Login','2015-02-25 08:46:51','Administrator logged in...'),(1420,1,0,'Administrator','Logout','2015-02-25 08:46:59','Administrator logged out...'),(1421,1,0,'Administrator','Login','2015-02-25 09:41:05','Administrator logged in...'),(1422,1,0,'Administrator','Logout','2015-02-25 09:41:36','Administrator logged out...'),(1423,1,0,'Administrator','Login','2015-02-25 09:41:49','Administrator logged in...'),(1424,1,0,'Administrator','Logout','2015-02-25 09:41:55','Administrator logged out...'),(1425,1,0,'Administrator','Login','2015-02-25 09:42:23','Administrator logged in...'),(1426,1,0,'Administrator','Logout','2015-02-25 09:43:02','Administrator logged out...'),(1427,1,0,'Administrator','Login','2015-02-25 09:52:23','Administrator logged in...'),(1428,1,0,'Administrator','Logout','2015-02-25 09:52:46','Administrator logged out...'),(1429,1,0,'Administrator','Login','2015-02-25 09:53:31','Administrator logged in...'),(1430,1,0,'Administrator','Logout','2015-02-25 09:53:45','Administrator logged out...'),(1431,1,0,'Administrator','Login','2015-02-25 09:54:37','Administrator logged in...'),(1432,1,0,'Administrator','Logout','2015-02-25 09:54:49','Administrator logged out...'),(1433,1,0,'Administrator','Login','2015-02-25 11:16:18','Administrator logged in...'),(1434,1,0,'Administrator','Logout','2015-02-25 11:20:13','Administrator logged out...'),(1435,1,0,'Administrator','Login','2015-02-25 11:20:45','Administrator logged in...'),(1436,1,0,'Administrator','Logout','2015-02-25 11:25:16','Administrator logged out...'),(1437,1,0,'Administrator','Login','2015-02-25 14:01:27','Administrator logged in...'),(1438,1,0,'Administrator','Logout','2015-02-25 14:02:05','Administrator logged out...'),(1439,1,0,'Administrator','Login','2015-02-27 09:47:15','Administrator logged in...'),(1440,1,0,'Administrator','Login','2015-02-27 09:47:59','Administrator logged in...'),(1441,1,0,'Administrator','Login','2015-02-27 09:48:23','Administrator logged in...'),(1442,2,0,'Damien Robson','Login','2015-02-27 09:51:00','Damien Robson logged in...'),(1443,2,0,'Damien Robson','Login','2015-02-27 09:52:13','Damien Robson logged in...'),(1444,1,0,'Administrator','Login','2015-02-27 09:53:10','Administrator logged in...'),(1445,1,0,'Administrator','Login','2015-02-27 09:55:29','Administrator logged in...'),(1446,1,0,'Administrator','Login','2015-02-27 09:58:12','Administrator logged in...'),(1447,1,0,'Administrator','Login','2015-02-27 09:59:04','Administrator logged in...'),(1448,1,0,'Administrator','Login','2015-02-27 10:02:40','Administrator logged in...'),(1449,1,0,'Administrator','Login','2015-02-27 10:03:32','Administrator logged in...'),(1450,1,0,'Administrator','Logout','2015-02-27 10:03:51','Administrator logged out...'),(1451,1,0,'Administrator','Login','2015-02-27 10:04:18','Administrator logged in...'),(1452,1,0,'Administrator','Logout','2015-02-27 10:04:28','Administrator logged out...'),(1453,1,0,'Administrator','Login','2015-02-27 10:04:50','Administrator logged in...'),(1454,1,0,'Administrator','Login','2015-02-27 10:05:45','Administrator logged in...'),(1455,1,0,'Administrator','Login','2015-02-27 10:06:37','Administrator logged in...'),(1456,2,0,'Damien Robson','Login','2015-02-27 10:07:30','Damien Robson logged in...'),(1457,2,0,'Damien Robson','Login','2015-02-27 10:09:03','Damien Robson logged in...'),(1458,2,0,'Damien Robson','Login','2015-02-27 10:11:18','Damien Robson logged in...'),(1459,2,0,'Damien Robson','Login','2015-02-27 10:14:47','Damien Robson logged in...'),(1460,2,0,'Damien Robson','Login','2015-02-27 10:18:38','Damien Robson logged in...'),(1461,2,0,'Damien Robson','Login','2015-02-27 10:19:51','Damien Robson logged in...'),(1462,2,0,'Damien Robson','Logout','2015-02-27 10:19:56','Damien Robson logged out...'),(1463,2,0,'Damien Robson','Login','2015-02-27 10:20:21','Damien Robson logged in...'),(1464,2,0,'Damien Robson','Login','2015-02-27 10:21:59','Damien Robson logged in...'),(1465,2,0,'Damien Robson','Login','2015-02-27 10:23:07','Damien Robson logged in...'),(1466,2,0,'Damien Robson','Login','2015-02-27 10:26:08','Damien Robson logged in...'),(1467,2,0,'Damien Robson','Logout','2015-02-27 10:26:51','Damien Robson logged out...'),(1468,2,0,'Damien Robson','Login','2015-02-27 10:34:41','Damien Robson logged in...'),(1469,2,0,'Damien Robson','Logout','2015-02-27 10:35:06','Damien Robson logged out...'),(1470,2,0,'Damien Robson','Login','2015-02-27 10:58:59','Damien Robson logged in...'),(1471,2,0,'Damien Robson','Login','2015-02-27 11:11:29','Damien Robson logged in...'),(1472,2,0,'Damien Robson','Logout','2015-02-27 11:11:45','Damien Robson logged out...'),(1473,2,0,'Damien Robson','Login','2015-02-27 11:24:30','Damien Robson logged in...'),(1474,2,0,'Damien Robson','Login','2015-02-27 11:24:56','Damien Robson logged in...'),(1475,2,0,'Damien Robson','Logout','2015-02-27 11:25:37','Damien Robson logged out...'),(1476,2,0,'Damien Robson','Login','2015-02-27 11:26:23','Damien Robson logged in...'),(1477,2,0,'Damien Robson','Logout','2015-02-27 11:26:38','Damien Robson logged out...'),(1478,2,0,'Damien Robson','Login','2015-02-27 11:27:46','Damien Robson logged in...'),(1479,2,0,'Damien Robson','Login','2015-02-27 11:28:30','Damien Robson logged in...'),(1480,2,0,'Damien Robson','Login','2015-02-27 11:30:15','Damien Robson logged in...'),(1481,2,0,'Damien Robson','Logout','2015-02-27 11:30:44','Damien Robson logged out...'),(1482,2,0,'Damien Robson','Login','2015-02-27 11:43:44','Damien Robson logged in...'),(1483,2,0,'Damien Robson','Logout','2015-02-27 11:43:59','Damien Robson logged out...'),(1484,2,0,'Damien Robson','Login','2015-02-27 11:45:15','Damien Robson logged in...'),(1485,2,0,'Damien Robson','Logout','2015-02-27 11:47:38','Damien Robson logged out...'),(1486,1,0,'Administrator','Login','2015-02-27 11:47:51','Administrator logged in...'),(1487,1,0,'Administrator','Logout','2015-02-27 11:48:21','Administrator logged out...'),(1488,1,0,'Administrator','Login','2015-02-27 11:48:58','Administrator logged in...'),(1489,1,0,'Administrator','Logout','2015-02-27 11:50:12','Administrator logged out...'),(1490,1,0,'Administrator','Login','2015-02-27 12:43:54','Administrator logged in...'),(1491,1,0,'Administrator','Logout','2015-02-27 12:44:23','Administrator logged out...'),(1492,1,0,'Administrator','Login','2015-02-27 12:53:15','Administrator logged in...'),(1493,1,0,'Administrator','Logout','2015-02-27 12:53:37','Administrator logged out...'),(1494,1,0,'Administrator','Login','2015-02-27 12:54:28','Administrator logged in...'),(1495,1,0,'Administrator','Logout','2015-02-27 12:55:07','Administrator logged out...');
/*!40000 ALTER TABLE `eventlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupmembers`
--

DROP TABLE IF EXISTS `groupmembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupmembers` (
  `GroupMemberID` int(11) NOT NULL AUTO_INCREMENT,
  `GroupID` int(11) NOT NULL,
  `CompanyID` int(11) DEFAULT NULL,
  `ContactID` int(11) DEFAULT NULL,
  PRIMARY KEY (`GroupMemberID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupmembers`
--

LOCK TABLES `groupmembers` WRITE;
/*!40000 ALTER TABLE `groupmembers` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupmembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `GroupID` int(11) NOT NULL AUTO_INCREMENT,
  `Group` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `GroupDescription` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdatedByUserID` int(11) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`GroupID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (10,'Test Group',NULL,2,'2015-01-12 12:32:09');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday`
--

DROP TABLE IF EXISTS `holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holiday` (
  `HolidayID` int(11) NOT NULL,
  `EmployeeID` int(11) NOT NULL,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime NOT NULL,
  `Length` decimal(10,0) NOT NULL DEFAULT '0',
  `Reason` text COLLATE utf8_unicode_ci NOT NULL,
  `RequestStatusID` int(11) NOT NULL DEFAULT '1',
  `ManagerReason` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`HolidayID`),
  KEY `fk_reqstat_idx` (`RequestStatusID`),
  CONSTRAINT `fk_reqstat` FOREIGN KEY (`RequestStatusID`) REFERENCES `holidayrequeststatus` (`RequestStatusID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
INSERT INTO `holiday` VALUES (1,4,'2015-02-27 10:26:14','2015-02-28 10:26:14',1,'Test holiday request',2,'Agreed 3 days');
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holidayrequeststatus`
--

DROP TABLE IF EXISTS `holidayrequeststatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holidayrequeststatus` (
  `RequestStatusID` int(11) NOT NULL,
  `RequestStatus` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`RequestStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidayrequeststatus`
--

LOCK TABLES `holidayrequeststatus` WRITE;
/*!40000 ALTER TABLE `holidayrequeststatus` DISABLE KEYS */;
INSERT INTO `holidayrequeststatus` VALUES (1,'Pending'),(2,'Approved'),(3,'Denied');
/*!40000 ALTER TABLE `holidayrequeststatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industry`
--

DROP TABLE IF EXISTS `industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `industry` (
  `IndustryID` int(11) NOT NULL AUTO_INCREMENT,
  `Industry` char(32) COLLATE utf8_unicode_ci DEFAULT '',
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IndustryID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 9216 kB';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industry`
--

LOCK TABLES `industry` WRITE;
/*!40000 ALTER TABLE `industry` DISABLE KEYS */;
INSERT INTO `industry` VALUES (1,'Oil',NULL),(2,'Gas',NULL);
/*!40000 ALTER TABLE `industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `POID` decimal(11,0) DEFAULT NULL,
  `ProjectID` decimal(11,0) DEFAULT NULL,
  `InvoiceItem` tinyint(1) DEFAULT NULL,
  `Description` char(255) COLLATE utf8_unicode_ci DEFAULT '',
  `Part_No` char(255) COLLATE utf8_unicode_ci DEFAULT '',
  `Quantity` decimal(10,2) DEFAULT '0.00',
  `Cost` decimal(10,2) DEFAULT '0.00',
  `Margin` decimal(6,2) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT '0.00',
  `TotalPrice` decimal(10,2) DEFAULT '0.00',
  `ETA` date DEFAULT NULL,
  `RTA` date DEFAULT NULL,
  `Received` tinyint(1) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (6,1,NULL,0,'My Item','9846157',1.00,2.00,NULL,NULL,0.00,NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(64) DEFAULT NULL,
  `Iso639Code` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'English','en'),(2,'German','de');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opportunitystages`
--

DROP TABLE IF EXISTS `opportunitystages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opportunitystages` (
  `OppStageID` int(11) NOT NULL AUTO_INCREMENT,
  `OppStage` char(64) COLLATE utf8_unicode_ci DEFAULT '',
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OppStageID`),
  UNIQUE KEY `idx_company` (`OppStage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 9216 kB';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opportunitystages`
--

LOCK TABLES `opportunitystages` WRITE;
/*!40000 ALTER TABLE `opportunitystages` DISABLE KEYS */;
/*!40000 ALTER TABLE `opportunitystages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opportunitystatus`
--

DROP TABLE IF EXISTS `opportunitystatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opportunitystatus` (
  `OppStatusID` int(11) NOT NULL AUTO_INCREMENT,
  `OppStatus` char(32) COLLATE utf8_unicode_ci DEFAULT '',
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OppStatusID`),
  UNIQUE KEY `idx_company` (`OppStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 9216 kB';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opportunitystatus`
--

LOCK TABLES `opportunitystatus` WRITE;
/*!40000 ALTER TABLE `opportunitystatus` DISABLE KEYS */;
INSERT INTO `opportunitystatus` VALUES (10,'Open','2014-10-10 12:36:47'),(20,'Closed - Won','2014-10-10 12:36:48'),(30,'Closed - Lost','2014-10-10 12:36:50');
/*!40000 ALTER TABLE `opportunitystatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popaymentmethod`
--

DROP TABLE IF EXISTS `popaymentmethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `popaymentmethod` (
  `POPaymentMethodID` int(11) NOT NULL DEFAULT '0',
  `POPaymentMethod` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`POPaymentMethodID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popaymentmethod`
--

LOCK TABLES `popaymentmethod` WRITE;
/*!40000 ALTER TABLE `popaymentmethod` DISABLE KEYS */;
INSERT INTO `popaymentmethod` VALUES (10,'Supplier Credit Account'),(20,'Company Credit Card'),(40,'Company Debit Card'),(50,'Other');
/*!40000 ALTER TABLE `popaymentmethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pos`
--

DROP TABLE IF EXISTS `pos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pos` (
  `POID` int(11) NOT NULL AUTO_INCREMENT,
  `RequestorID` int(11) DEFAULT NULL,
  `SupplierID` int(11) DEFAULT NULL,
  `ContactID` int(11) DEFAULT NULL,
  `ProjectID` int(11) DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  `CurrencyID` int(11) DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `POStatus` int(11) DEFAULT NULL,
  `PurchaseDate` date DEFAULT NULL,
  `DeliveryDate` date DEFAULT NULL,
  `SupplierRef` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `POPaymetnMethod` int(11) DEFAULT NULL,
  `PONotes` mediumtext COLLATE utf8_unicode_ci,
  `tstamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`POID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pos`
--

LOCK TABLES `pos` WRITE;
/*!40000 ALTER TABLE `pos` DISABLE KEYS */;
INSERT INTO `pos` VALUES (1,9,20,298,NULL,NULL,1,NULL,30,'2015-01-14',NULL,'',10,'','2015-02-11 14:41:07'),(2,1,NULL,NULL,NULL,NULL,1,NULL,30,'2015-02-11',NULL,'',10,'','2015-02-11 14:39:21');
/*!40000 ALTER TABLE `pos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postatus`
--

DROP TABLE IF EXISTS `postatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postatus` (
  `POStatusID` int(11) NOT NULL DEFAULT '0',
  `POStatus` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`POStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postatus`
--

LOCK TABLES `postatus` WRITE;
/*!40000 ALTER TABLE `postatus` DISABLE KEYS */;
INSERT INTO `postatus` VALUES (10,'New'),(20,'Rejected'),(30,'Submitted'),(40,'Authorised'),(50,'Ordered'),(60,'Confirmed'),(80,'Recieved'),(90,'Cancelled'),(100,'Complete');
/*!40000 ALTER TABLE `postatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectclass`
--

DROP TABLE IF EXISTS `projectclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectclass` (
  `ClassID` int(11) NOT NULL,
  `TypeID` decimal(11,0) DEFAULT NULL,
  `Classification` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ClassID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectclass`
--

LOCK TABLES `projectclass` WRITE;
/*!40000 ALTER TABLE `projectclass` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectcomponents`
--

DROP TABLE IF EXISTS `projectcomponents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectcomponents` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ParentID` int(11) DEFAULT NULL,
  `Name` varchar(512) DEFAULT NULL,
  `Reference` varchar(512) DEFAULT NULL,
  `Description` text,
  `Price` decimal(15,2) DEFAULT NULL,
  `Cost` decimal(15,2) DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `DateUpdated` datetime DEFAULT NULL,
  `ProjectID` int(11) DEFAULT NULL,
  `CurrencyID` int(11) DEFAULT NULL,
  `ComponentPriority` int(3) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectcomponents`
--

LOCK TABLES `projectcomponents` WRITE;
/*!40000 ALTER TABLE `projectcomponents` DISABLE KEYS */;
INSERT INTO `projectcomponents` VALUES (7,0,'My item','','{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang2057{\\fonttbl{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}}\r\n\\viewkind4\\uc1\\pard\\f0\\fs17 Test\\par\r\n}\r\n',0.00,5.00,'2015-01-30 13:51:07','2015-01-30 15:00:51',27,1,1),(8,0,'My Name','','',0.00,0.00,'2015-01-30 13:51:07','2015-01-30 15:00:49',27,1,0),(9,0,'My item','','{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang2057{\\fonttbl{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}}\r\n\\viewkind4\\uc1\\pard\\f0\\fs17 Test\\par\r\n}\r\n',0.00,5.00,'2015-01-30 13:51:22','2015-01-30 15:00:02',27,1,1),(10,0,'My item','','{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang2057{\\fonttbl{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}}\r\n\\viewkind4\\uc1\\pard\\f0\\fs17 Test\\par\r\n}\r\n',0.00,5.00,'2015-01-30 15:00:45','2015-01-30 15:00:45',26,1,1),(11,0,'My Name','','',0.00,0.00,'2015-01-30 15:00:45','2015-01-30 15:01:31',26,1,2),(12,0,'My item','','{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang2057{\\fonttbl{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}}\r\n\\viewkind4\\uc1\\pard\\f0\\fs17 Test\\par\r\n}\r\n',0.00,5.00,'2015-01-30 15:01:27','2015-01-30 15:01:29',26,1,1);
/*!40000 ALTER TABLE `projectcomponents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectmodules`
--

DROP TABLE IF EXISTS `projectmodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectmodules` (
  `ModID` int(11) NOT NULL,
  `ModName` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ModTitle` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ModRef` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RecordIDTitle` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ShowFinancialStatus` tinyint(1) DEFAULT NULL,
  `ShowCustomerPrices` tinyint(1) DEFAULT NULL,
  `ChargeableByDefault` tinyint(1) DEFAULT NULL,
  `ShowClassification` tinyint(1) DEFAULT NULL,
  `ShowValue` tinyint(1) DEFAULT NULL,
  `ShowProbability` tinyint(1) DEFAULT NULL,
  `ShowAuthorisation` tinyint(1) DEFAULT NULL,
  `ShowPriority` tinyint(1) DEFAULT NULL,
  `ShowPurchaseOrdersTab` tinyint(1) DEFAULT NULL,
  `ShowTimesheetsTab` tinyint(1) DEFAULT NULL,
  `ShowItemsTab` tinyint(1) DEFAULT NULL,
  `ShowLastUpdateDate` tinyint(1) DEFAULT NULL,
  `ShowPlannedStartDate` tinyint(1) DEFAULT NULL,
  `ShowPlannedEndDate` tinyint(1) DEFAULT NULL,
  `ShowActualStartDate` tinyint(1) DEFAULT NULL,
  `ShowActualEndDate` tinyint(1) DEFAULT NULL,
  `LastUpdateDateLabel` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PlannedStartDateLabel` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PlannedEndDateLabel` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ActualStartDateLabel` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ActualEndDateLabel` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdateWarningLevel1` int(2) DEFAULT NULL,
  `UpdateWarningLevel2` int(2) DEFAULT NULL,
  `UpdateWarningLevel3` int(2) DEFAULT NULL,
  PRIMARY KEY (`ModID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectmodules`
--

LOCK TABLES `projectmodules` WRITE;
/*!40000 ALTER TABLE `projectmodules` DISABLE KEYS */;
INSERT INTO `projectmodules` VALUES (5,'Opportunity','Opportunities','OPP',NULL,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'Last Update/Contact','Creation Date:','Planned End:','Start Date:','Actual End:',14,-1,28),(10,'Project','Project','PROJ',NULL,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'Last Update/Contact','Creation Date:','Planned End:','Start Date:','Actual End:',-1,-1,-1);
/*!40000 ALTER TABLE `projectmodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectpriorities`
--

DROP TABLE IF EXISTS `projectpriorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectpriorities` (
  `PriorityID` char(128) COLLATE utf8_unicode_ci NOT NULL,
  `Priority` char(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`PriorityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectpriorities`
--

LOCK TABLES `projectpriorities` WRITE;
/*!40000 ALTER TABLE `projectpriorities` DISABLE KEYS */;
INSERT INTO `projectpriorities` VALUES ('10','Low'),('20','Medium'),('30','High');
/*!40000 ALTER TABLE `projectpriorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `ProjectID` int(11) NOT NULL AUTO_INCREMENT,
  `ClassID` decimal(11,0) DEFAULT NULL,
  `CompanyID` decimal(11,0) DEFAULT NULL,
  `ContactID` decimal(11,0) DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Type` decimal(11,0) DEFAULT NULL,
  `AuthorisationToProceedDate` datetime DEFAULT NULL,
  `AuthorisationPO` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` decimal(11,0) DEFAULT NULL,
  `PriorityID` decimal(11,0) DEFAULT NULL,
  `ProjectSourceID` decimal(11,0) DEFAULT NULL,
  `AccMgrID` decimal(11,0) DEFAULT NULL,
  `NextActionByID` decimal(11,0) DEFAULT NULL,
  `PlannedStartDate` datetime DEFAULT NULL,
  `PlannedEndDate` datetime DEFAULT NULL,
  `ActualStartDate` datetime DEFAULT NULL,
  `ActualEndDate` datetime DEFAULT NULL,
  `ProjectValue` decimal(8,0) DEFAULT NULL,
  `Chargeable` tinyint(1) DEFAULT NULL,
  `BudgetMaterialsCosts` decimal(8,2) DEFAULT NULL,
  `BudgetResourceCosts` decimal(8,2) DEFAULT NULL,
  `Notes` mediumtext COLLATE utf8_unicode_ci,
  `CreationDate` datetime DEFAULT NULL,
  `AuthorisationPODate` datetime DEFAULT NULL,
  `StatusUpdateDate` datetime DEFAULT NULL,
  `OppStatusID` decimal(11,0) DEFAULT NULL,
  `OppStageID` decimal(11,0) DEFAULT NULL,
  `OppProbability` int(3) DEFAULT NULL,
  `OppEstCloseDate` datetime DEFAULT NULL,
  `RecordCreationDate` datetime DEFAULT NULL,
  `RecordLastUpdated` datetime DEFAULT NULL,
  `RecordLastUpdatedBy` decimal(11,0) DEFAULT NULL,
  `RecordLastUpdateByAccMgr` datetime DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ProjectID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,NULL,4,13,'Elite Business Management Systems',10,NULL,'',10,10,NULL,1,1,'2014-11-28 00:00:00',NULL,'2014-12-01 00:00:00',NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-11-28 00:00:00','2014-11-28 13:08:18','2015-01-23 13:19:55',1,'2015-01-23 13:19:55','2015-01-23 13:19:55'),(2,NULL,5,14,'Application Development and Workflow Integration',5,NULL,'',10,10,NULL,5,5,'2014-11-28 00:00:00',NULL,NULL,NULL,54820,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,40,'2014-12-11 00:00:00','2014-11-28 13:17:58','2014-12-15 10:06:43',5,'2014-12-15 10:06:43','2014-12-15 10:04:10'),(3,NULL,5,14,'Application Development and Workflow Integration',5,NULL,'',10,10,NULL,5,5,'2014-11-28 00:00:00',NULL,NULL,NULL,54820,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,60,'2014-12-17 00:00:00','2014-11-28 13:19:22','2014-12-23 08:11:35',5,'2014-12-23 08:11:35','2014-12-23 08:11:34'),(4,NULL,6,1,'Safety Inspection Application Development',10,NULL,'',40,10,NULL,5,5,'2014-11-28 00:00:00',NULL,NULL,NULL,16320,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-22 00:00:00','2014-11-28 15:56:12','2015-02-05 09:12:59',9,'2014-12-23 08:14:28','2015-02-05 09:12:59'),(5,NULL,7,2,'Software Development Support',5,NULL,'',10,10,NULL,5,5,'2014-11-29 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,50,'2014-11-24 00:00:00','2014-11-29 08:16:36','2014-12-15 11:08:17',5,'2014-12-15 11:08:17','2014-12-15 11:05:44'),(6,NULL,9,4,'Technical Management',10,NULL,'',NULL,10,NULL,5,5,'2014-11-29 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-11-20 00:00:00','2014-11-29 08:59:02','2014-11-29 08:59:02',5,'2014-11-29 08:59:02',NULL),(7,NULL,13,NULL,'WJ Test',10,NULL,'',NULL,10,NULL,8,8,'2014-12-02 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-02 00:00:00','2014-12-02 11:53:20','2014-12-02 12:18:48',8,'2014-12-02 12:18:48','2014-12-02 12:17:09'),(8,NULL,15,NULL,'Server & Client Application Deployment',5,NULL,'',20,10,NULL,5,5,'2014-12-08 00:00:00',NULL,NULL,NULL,23700,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,50,'2014-12-24 00:00:00','2014-12-08 13:16:12','2014-12-11 13:27:33',5,'2014-12-11 13:27:33','2014-12-11 13:25:10'),(9,NULL,3,11,'EliteLocal',10,NULL,'',10,10,NULL,1,1,'2014-12-11 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-11 00:00:00','2014-12-11 07:15:11','2015-02-18 11:08:25',1,'2015-02-18 11:08:25','2015-02-18 11:08:25'),(10,NULL,16,12,'EliteHosted',5,NULL,'',20,10,NULL,3,5,'2014-12-11 00:00:00',NULL,NULL,NULL,30,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,50,'2014-12-22 00:00:00','2014-12-11 07:33:27','2014-12-22 17:24:37',5,'2014-12-11 07:33:27','2014-12-22 17:24:36'),(11,NULL,17,15,'Site Visit Activity App',5,NULL,'',20,10,NULL,5,5,'2014-12-11 00:00:00',NULL,NULL,NULL,1650,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,80,'2014-12-15 00:00:00','2014-12-11 15:21:16','2014-12-15 07:06:25',5,'2014-12-15 07:06:25','2014-12-15 07:03:52'),(12,NULL,4,13,'CS Website',10,NULL,'',40,10,NULL,6,6,'2014-12-12 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-12 00:00:00','2014-12-12 06:49:31','2015-02-05 09:14:45',9,NULL,'2015-02-05 09:14:44'),(13,NULL,4,13,'Hunts Business Fair April 2015',10,NULL,'',40,10,NULL,6,6,'2014-12-12 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-12 00:00:00','2014-12-12 06:50:04','2014-12-12 06:50:04',5,NULL,NULL),(14,NULL,8,3,'EliteHosted (5 user)',10,NULL,'',40,10,NULL,5,5,'2014-12-12 00:00:00',NULL,NULL,NULL,45,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-11 00:00:00','2014-12-12 07:01:38','2014-12-12 07:03:12',5,'2014-12-12 07:03:12','2014-12-12 07:00:51'),(15,NULL,12,7,'Website Support',10,NULL,'',40,10,NULL,5,5,'2014-12-15 00:00:00',NULL,NULL,NULL,40,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-15 00:00:00','2014-12-15 13:24:25','2014-12-15 13:28:03',5,'2014-12-15 13:28:03','2014-12-15 13:25:30'),(16,NULL,13,16,'application development',5,NULL,'',10,10,NULL,1,1,'2014-12-16 00:00:00',NULL,NULL,NULL,20000,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,50,'2014-12-16 00:00:00','2014-12-16 10:07:44','2014-12-16 10:44:18',5,'2014-12-16 10:07:44','2014-12-16 10:41:12'),(17,NULL,13,NULL,'Review of website',10,NULL,'',30,10,NULL,5,5,'2014-12-16 00:00:00',NULL,NULL,NULL,300,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-16 00:00:00','2014-12-16 10:49:12','2015-02-05 09:13:00',9,'2014-12-16 10:53:51','2015-02-05 09:12:59'),(18,NULL,11,6,'Web Database System',10,NULL,'',10,10,NULL,5,5,'2014-12-16 00:00:00',NULL,NULL,NULL,5170,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-16 00:00:00','2014-12-16 12:19:41','2014-12-16 12:19:41',5,'2014-12-16 12:19:41',NULL),(19,NULL,10,5,'Technical Advocacy',10,NULL,'',40,10,NULL,5,5,'2014-12-16 00:00:00',NULL,NULL,NULL,50,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-16 00:00:00','2014-12-16 14:47:27','2014-12-16 14:47:27',5,'2014-12-16 14:47:27',NULL),(20,NULL,18,17,'EliteHosted',10,NULL,'',10,10,NULL,5,5,'2014-12-22 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-23 00:00:00','2014-12-22 09:01:04','2014-12-23 15:36:43',5,'2014-12-23 15:36:43','2014-12-23 15:36:43'),(21,NULL,4,13,'The Coach Online',10,NULL,'',40,10,NULL,5,5,'2014-12-23 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2014-12-23 00:00:00','2014-12-23 09:42:50','2014-12-23 09:42:50',5,'2014-12-23 09:42:50',NULL),(22,NULL,14,8,'EliteLocal',5,NULL,'',10,10,NULL,3,3,'2014-12-23 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,40,'2014-12-08 00:00:00','2014-12-23 15:37:56','2014-12-23 15:38:32',5,NULL,'2014-12-23 15:38:32'),(23,NULL,NULL,NULL,'Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,NULL,NULL,NULL,'Test',5,NULL,'',10,10,NULL,9,9,'2015-01-12 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2015-01-12 00:00:00','2015-01-12 08:33:12','2015-01-12 08:33:12',9,'2015-01-12 08:33:12',NULL),(25,NULL,13,294,'Test',10,NULL,'',10,10,NULL,9,9,'2015-01-13 00:00:00','2016-01-13 00:00:00','2015-01-13 00:00:00','2016-01-13 00:00:00',0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2015-01-13 00:00:00','2015-01-13 13:49:50','2015-02-05 09:05:57',9,'2015-02-05 09:05:57','2015-02-05 09:05:56'),(26,NULL,13,294,'My Opportunity',5,NULL,'',10,10,NULL,9,9,'2015-01-13 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2015-01-13 00:00:00','2015-01-13 15:38:53','2015-01-30 15:00:47',9,'2015-01-30 15:00:47','2015-01-30 15:00:46'),(27,NULL,13,294,'Test ',5,NULL,'',10,10,NULL,9,9,'2015-01-15 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,'2015-01-15 00:00:00','2015-01-15 11:31:24','2015-01-30 15:00:53',9,'2015-01-30 15:00:53','2015-01-30 15:00:52'),(28,NULL,4,13,'Uptime Monitor',10,NULL,'',40,10,NULL,2,2,'2015-02-19 00:00:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,100,'2015-02-19 00:00:00','2015-02-19 08:44:03','2015-02-19 08:47:47',1,NULL,'2015-02-19 08:47:46');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectscustomfields`
--

DROP TABLE IF EXISTS `projectscustomfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectscustomfields` (
  `ProjectID` int(11) NOT NULL,
  `Priority` smallint(6) DEFAULT '99',
  `Comment` text COLLATE utf8_unicode_ci,
  `Information Date` date DEFAULT NULL,
  `Material Date` date DEFAULT NULL,
  `Completed Date` date DEFAULT NULL,
  `LabourTime` smallint(6) DEFAULT '0',
  PRIMARY KEY (`ProjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectscustomfields`
--

LOCK TABLES `projectscustomfields` WRITE;
/*!40000 ALTER TABLE `projectscustomfields` DISABLE KEYS */;
INSERT INTO `projectscustomfields` VALUES (1,99,'',NULL,NULL,NULL,NULL),(2,99,'',NULL,NULL,NULL,NULL),(3,99,'',NULL,NULL,NULL,NULL),(4,99,'',NULL,NULL,NULL,NULL),(5,99,NULL,NULL,NULL,NULL,NULL),(6,99,'',NULL,NULL,NULL,NULL),(7,99,'',NULL,NULL,NULL,NULL),(9,99,'',NULL,NULL,NULL,NULL),(10,99,'',NULL,NULL,NULL,NULL),(11,99,'',NULL,NULL,NULL,NULL),(12,99,NULL,NULL,NULL,NULL,0),(14,99,'',NULL,NULL,NULL,NULL),(17,99,'',NULL,NULL,NULL,NULL),(20,99,NULL,NULL,NULL,NULL,0),(25,99,'Test',NULL,NULL,NULL,NULL),(26,99,NULL,NULL,NULL,NULL,NULL),(27,99,NULL,NULL,NULL,NULL,NULL),(28,99,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `projectscustomfields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectsources`
--

DROP TABLE IF EXISTS `projectsources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectsources` (
  `ProjectSourceID` int(11) NOT NULL AUTO_INCREMENT,
  `ProjectSource` char(64) COLLATE utf8_unicode_ci DEFAULT '',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ProjectSourceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectsources`
--

LOCK TABLES `projectsources` WRITE;
/*!40000 ALTER TABLE `projectsources` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectsources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectstages`
--

DROP TABLE IF EXISTS `projectstages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectstages` (
  `StageID` int(11) NOT NULL DEFAULT '0',
  `TypeID` decimal(11,0) DEFAULT NULL,
  `Stage` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectstages`
--

LOCK TABLES `projectstages` WRITE;
/*!40000 ALTER TABLE `projectstages` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectstages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectstatus`
--

DROP TABLE IF EXISTS `projectstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectstatus` (
  `StatusID` int(11) NOT NULL DEFAULT '0',
  `TypeID` decimal(11,0) DEFAULT NULL,
  `Status` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectstatus`
--

LOCK TABLES `projectstatus` WRITE;
/*!40000 ALTER TABLE `projectstatus` DISABLE KEYS */;
INSERT INTO `projectstatus` VALUES (10,10,'New(needs quotation)'),(20,10,'Quotation Sent(waiting response)'),(30,10,'On Hold'),(40,10,'In Progress(PO received)'),(45,10,'In Progress(Waiting on Customer)'),(50,10,'Reopened(issue resolution)'),(80,10,'To Accounts(work completed)'),(90,10,'Rejected'),(100,10,'Complete(invoiced in full)'),(10,15,'Not Started'),(15,15,'Started'),(25,15,'Waiting for Image'),(30,15,'Waiting for Media'),(40,30,'Waiting for Customer visit'),(45,15,'Waiting for Print Engine'),(55,15,'On Hold'),(90,15,'Cancelled'),(100,15,'Completed'),(10,5,'Budget Proposal'),(20,5,'Quotation Given'),(30,5,'Final Quotation'),(40,5,'Quotation Accepted'),(50,5,'Order Received'),(90,5,'Order Lost'),(100,5,'Order Accepted'),(10,35,'Ink Problem'),(20,35,'Electronics'),(30,35,'Software'),(40,35,'Ink System'),(50,35,'Printhead Failure'),(60,35,'Print Quality Problem'),(90,35,'Cancelled'),(100,35,'Resolved'),(50,15,'Waiting for Ink'),(10,20,'Waiting Product'),(15,20,'Waiting RMA Form'),(20,20,'Assigned to JW'),(25,20,'Assigned to TL'),(30,20,'Lab / Technical Report sent waiting respone'),(35,20,'Attemp repair / Recovery'),(40,20,'Return to supplier (if in warranty)'),(50,20,'Put in stock'),(55,20,'Use as internal part'),(60,20,'Scrap and send replacement'),(65,20,'Scrap no replacement'),(100,20,'Process completed'),(10,25,'Ink Sample Requested'),(20,25,'Ink sample received'),(30,25,'Testing carried out'),(40,25,'Ink Sample sent to KM'),(50,25,'Ink Sample sent to client'),(60,25,'Approved'),(100,25,'Complete'),(100,30,'Completed'),(50,30,'Waiting for Ink'),(90,30,'Cancelled'),(10,30,'Not Started'),(15,30,'Started'),(25,30,'Waiting for Image'),(30,30,'Waiting for Media'),(40,30,'Waiting for Customer visit'),(45,30,'Waiting for Print Engine'),(55,30,'On Hold'),(99,5,'Completed (remove from list)'),(40,15,'Waiting for client visit'),(45,20,'Return to customer'),(95,5,'No progress (remove from list)');
/*!40000 ALTER TABLE `projectstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projecttype`
--

DROP TABLE IF EXISTS `projecttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projecttype` (
  `ProjectTypeID` int(11) NOT NULL DEFAULT '0',
  `ProjectType` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ProjectTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecttype`
--

LOCK TABLES `projecttype` WRITE;
/*!40000 ALTER TABLE `projecttype` DISABLE KEYS */;
INSERT INTO `projecttype` VALUES (5,'Opportunity'),(10,'External');
/*!40000 ALTER TABLE `projecttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposalsections`
--

DROP TABLE IF EXISTS `proposalsections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposalsections` (
  `SectionID` int(11) NOT NULL DEFAULT '0',
  `SectionTitle` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `SectionFilename` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposalsections`
--

LOCK TABLES `proposalsections` WRITE;
/*!40000 ALTER TABLE `proposalsections` DISABLE KEYS */;
/*!40000 ALTER TABLE `proposalsections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposalsubsections`
--

DROP TABLE IF EXISTS `proposalsubsections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposalsubsections` (
  `SubSectionID` int(11) NOT NULL DEFAULT '0',
  `SectionID` decimal(11,0) DEFAULT NULL,
  `SubsectionTitle` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SubsectionFilename` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposalsubsections`
--

LOCK TABLES `proposalsubsections` WRITE;
/*!40000 ALTER TABLE `proposalsubsections` DISABLE KEYS */;
/*!40000 ALTER TABLE `proposalsubsections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposaltemplates`
--

DROP TABLE IF EXISTS `proposaltemplates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposaltemplates` (
  `NodeID` decimal(11,0) NOT NULL,
  `NodeLevel` decimal(11,0) DEFAULT NULL,
  `NodeParent` decimal(11,0) DEFAULT NULL,
  `NodeTitle` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NodeTemplate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`NodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposaltemplates`
--

LOCK TABLES `proposaltemplates` WRITE;
/*!40000 ALTER TABLE `proposaltemplates` DISABLE KEYS */;
/*!40000 ALTER TABLE `proposaltemplates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `ReportID` int(11) NOT NULL DEFAULT '0',
  `ReportTitle` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `ReportName` char(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `ReqID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` decimal(11,0) DEFAULT NULL,
  `ReqDate` date DEFAULT NULL,
  `Request` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ReqID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,5,'2014-12-15','This is a test, please ignore',1),(2,5,'2014-12-16','this is a test',1);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `RegisteredToCompanyID` int(11) NOT NULL DEFAULT '0',
  `AccountsEmailAddress` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `EmailStorePath` char(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`RegisteredToCompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `software` (
  `SoftwareID` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyID` int(11) DEFAULT NULL,
  `DeviceID` int(11) DEFAULT NULL,
  `SoftwareTypeID` int(11) DEFAULT NULL,
  `Title` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SerialNo` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NoOfLicenses` tinyint(4) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `RecordCreationDate` date DEFAULT NULL,
  PRIMARY KEY (`SoftwareID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources` (
  `SourceID` int(11) NOT NULL AUTO_INCREMENT,
  `Priority` smallint(6) DEFAULT NULL,
  `Source` char(64) COLLATE utf8_unicode_ci DEFAULT '',
  `Active` decimal(1,0) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SourceID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 9216 kB';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources`
--

LOCK TABLES `sources` WRITE;
/*!40000 ALTER TABLE `sources` DISABLE KEYS */;
INSERT INTO `sources` VALUES (1,1,'Web Site',1,'2014-12-03 07:56:54'),(2,2,'Customer Referral',1,'2014-12-03 07:56:55'),(3,3,'Phil\'s Personal Contact',1,'2014-12-03 07:56:55');
/*!40000 ALTER TABLE `sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplieraccounts`
--

DROP TABLE IF EXISTS `supplieraccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplieraccounts` (
  `CompanyID` int(11) NOT NULL,
  `Description` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `WebLink` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserName` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Password` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Notes` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplieraccounts`
--

LOCK TABLES `supplieraccounts` WRITE;
/*!40000 ALTER TABLE `supplieraccounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplieraccounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliercontractcategories`
--

DROP TABLE IF EXISTS `suppliercontractcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliercontractcategories` (
  `CategoryID` int(11) NOT NULL,
  `Category` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliercontractcategories`
--

LOCK TABLES `suppliercontractcategories` WRITE;
/*!40000 ALTER TABLE `suppliercontractcategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliercontractcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliercontracts`
--

DROP TABLE IF EXISTS `suppliercontracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliercontracts` (
  `SupplierContractID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) DEFAULT NULL,
  `SupplierID` int(11) DEFAULT NULL,
  `DeviceID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `RenewedOnDate` date DEFAULT NULL,
  `ServiceCost` smallint(6) DEFAULT NULL,
  `RenewalDate` date DEFAULT NULL,
  `LicenseDetails` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `Managed` tinyint(1) DEFAULT NULL,
  `Notes` mediumtext COLLATE utf8_unicode_ci,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SupplierContractID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliercontracts`
--

LOCK TABLES `suppliercontracts` WRITE;
/*!40000 ALTER TABLE `suppliercontracts` DISABLE KEYS */;
INSERT INTO `suppliercontracts` VALUES (1,17,19,NULL,NULL,'Description','2015-01-09','2015-01-09',0,'2015-01-09','',1,1,'',NULL);
/*!40000 ALTER TABLE `suppliercontracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supporttype`
--

DROP TABLE IF EXISTS `supporttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supporttype` (
  `SupportTypeID` int(11) NOT NULL DEFAULT '0',
  `SupportType` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`SupportTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supporttype`
--

LOCK TABLES `supporttype` WRITE;
/*!40000 ALTER TABLE `supporttype` DISABLE KEYS */;
/*!40000 ALTER TABLE `supporttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system`
--

DROP TABLE IF EXISTS `system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system` (
  `SysID` int(11) NOT NULL,
  `SysKey` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `SysValue` char(128) COLLATE utf8_unicode_ci NOT NULL,
  `UsageNote` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Version` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanyName` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanyAddress` char(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Company PostCode` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanyPhone` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanyFax` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanySupportNo` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanyRegNo` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CompanyVAT` char(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MarkupRate` double DEFAULT NULL,
  `LowValueMarkupRate` double DEFAULT NULL,
  `VatRate` decimal(6,3) DEFAULT NULL,
  PRIMARY KEY (`SysID`,`SysKey`,`SysValue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system`
--

LOCK TABLES `system` WRITE;
/*!40000 ALTER TABLE `system` DISABLE KEYS */;
INSERT INTO `system` VALUES (1,'ProductDisplayName','EliteBMS','The Product name displayed to the user',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'DefaultCountry','United Kingdom','Used to set the default country when creating new companies',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(101,'eMailFrom','elite@cambridge-software.com','Email address used when Elite sends email',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(102,'eMailPort','25','Port used to communicate with email server',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(103,'eMailServer','outlook.office365.com','Email server used to send emails through','1.080001','BrightVisions Limited','8 Eaton Court Road\r\nColmworth Business Park\r\nSt. Neots\r\nCambridgeshire','PE19 8ER','01480 219 261','01480 219 262','01480 477 238','4668361','811 8200 69',0.15,0.25,1.150),(104,'eMailUser','257+55ZL8QhzDt4G9D1sljOsA==','Account used to logon for sending emails (Must be encrypted)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(105,'eMailUserPw','494tLusHSLLRZJs+Er3oEJrIA==','The password for the email account (Must be encrypted)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(106,'BugFixEmailTo','cs.support@cambridge-software.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(107,'NewFeatureRequestTo','cs.feature-requests@cambridge-software.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(202,'ProjectEmailPrefix','CS#-','Project email prefix for the subject line. Used to process emails automatically',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(301,'POAuthoriser','','Addresses used to send PO autorisation requests to',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(302,'POUpdateProjectManager','0','If set to 1 all purchase order updates are emailed to the project managers',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(401,'DatabaseVersion','o}$K-p7Hb@VqW[Pf)!x?mDmC','The current version of the database. If the version within the Elite code base does not match the value given here, then it will fail to run.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(901,'CompanyName','Cambridge Software','Name of the current customer company',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemclasses`
--

DROP TABLE IF EXISTS `systemclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemclasses` (
  `SystemClassID` int(11) NOT NULL DEFAULT '0',
  `Classification` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`SystemClassID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemclasses`
--

LOCK TABLES `systemclasses` WRITE;
/*!40000 ALTER TABLE `systemclasses` DISABLE KEYS */;
INSERT INTO `systemclasses` VALUES (1,'Elite Thick Client'),(2,'EliteDesktop'),(3,'EliteLocal'),(4,'EliteCloud'),(5,'EliteHosted'),(6,'Elite (Other)');
/*!40000 ALTER TABLE `systemclasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemcomponentcategories`
--

DROP TABLE IF EXISTS `systemcomponentcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemcomponentcategories` (
  `CategoryID` int(11) NOT NULL DEFAULT '0',
  `Category` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcomponentcategories`
--

LOCK TABLES `systemcomponentcategories` WRITE;
/*!40000 ALTER TABLE `systemcomponentcategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `systemcomponentcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemcomponents`
--

DROP TABLE IF EXISTS `systemcomponents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemcomponents` (
  `SystemComponentID` int(11) NOT NULL AUTO_INCREMENT,
  `SystemID` int(11) NOT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Component` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Model` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Serial_No` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Purchase_Date` date DEFAULT NULL,
  `Warranty_Expiry` date DEFAULT NULL,
  `Vehicle` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Dealer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `Additional_Info` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`SystemComponentID`,`SystemID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcomponents`
--

LOCK TABLES `systemcomponents` WRITE;
/*!40000 ALTER TABLE `systemcomponents` DISABLE KEYS */;
INSERT INTO `systemcomponents` VALUES (3,1,NULL,'Test item',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `systemcomponents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemmodules`
--

DROP TABLE IF EXISTS `systemmodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemmodules` (
  `SysModID` int(11) DEFAULT NULL,
  `SysModName` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ShowModule` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemmodules`
--

LOCK TABLES `systemmodules` WRITE;
/*!40000 ALTER TABLE `systemmodules` DISABLE KEYS */;
INSERT INTO `systemmodules` VALUES (10,'Marketing',1),(50,'General',1),(20,'HR',1),(30,'Timesheet',1),(40,'Absence',1),(50,'Supplier Contracts',1),(60,'Devices',1),(70,'Support Centre',1);
/*!40000 ALTER TABLE `systemmodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systems`
--

DROP TABLE IF EXISTS `systems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systems` (
  `SystemID` int(11) NOT NULL AUTO_INCREMENT,
  `SystemClassID` decimal(11,0) DEFAULT NULL,
  `CompanyID` decimal(11,0) DEFAULT NULL,
  `ContactID` decimal(11,0) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`SystemID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systems`
--

LOCK TABLES `systems` WRITE;
/*!40000 ALTER TABLE `systems` DISABLE KEYS */;
INSERT INTO `systems` VALUES (1,2,4,296,1),(2,6,6,1,1),(3,6,4,13,1);
/*!40000 ALTER TABLE `systems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemsetting`
--

DROP TABLE IF EXISTS `systemsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemsetting` (
  `SystemSettingID` int(11) NOT NULL AUTO_INCREMENT,
  `SystemSettingKey` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `SystemSettingDescription` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `SystemSettingValue` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`SystemSettingID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemsetting`
--

LOCK TABLES `systemsetting` WRITE;
/*!40000 ALTER TABLE `systemsetting` DISABLE KEYS */;
INSERT INTO `systemsetting` VALUES (1,'WebFormTimeout','The default timeout value applied to Elite Web form sessions','25'),(2,'WebTimeout','The default timeout value applied to Elite Web sessions','30');
/*!40000 ALTER TABLE `systemsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemsettings`
--

DROP TABLE IF EXISTS `systemsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemsettings` (
  `ListPosition` int(11) DEFAULT NULL,
  `SysKey` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SysValue` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` char(128) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemsettings`
--

LOCK TABLES `systemsettings` WRITE;
/*!40000 ALTER TABLE `systemsettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `systemsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `targets`
--

DROP TABLE IF EXISTS `targets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `targets` (
  `TargetID` int(11) NOT NULL AUTO_INCREMENT,
  `TargetMonth` date DEFAULT NULL,
  `ProjectsTarget` decimal(10,0) DEFAULT NULL,
  `ContractsTarget` decimal(10,0) DEFAULT NULL,
  `SpecialProjectsTarget` decimal(10,0) DEFAULT NULL,
  UNIQUE KEY `CountryID` (`TargetID`),
  UNIQUE KEY `Country` (`TargetMonth`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `targets`
--

LOCK TABLES `targets` WRITE;
/*!40000 ALTER TABLE `targets` DISABLE KEYS */;
/*!40000 ALTER TABLE `targets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskgroups`
--

DROP TABLE IF EXISTS `taskgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taskgroups` (
  `TaskGroupID` int(11) NOT NULL AUTO_INCREMENT,
  `TaskGroup` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `TaskGroupDescription` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdatedByUserID` int(11) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TaskGroupID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskgroups`
--

LOCK TABLES `taskgroups` WRITE;
/*!40000 ALTER TABLE `taskgroups` DISABLE KEYS */;
INSERT INTO `taskgroups` VALUES (1,'Project Enquiru',NULL,5,'2014-12-15 16:57:37'),(2,'New EliteBMS Enquiry',NULL,5,'2014-12-15 17:06:58');
/*!40000 ALTER TABLE `taskgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskgroupstasks`
--

DROP TABLE IF EXISTS `taskgroupstasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taskgroupstasks` (
  `TaskGroupTaskID` int(11) NOT NULL AUTO_INCREMENT,
  `TaskGroupID` int(11) DEFAULT NULL,
  `TaskOrder` smallint(4) DEFAULT '99',
  `Description` text COLLATE utf8_unicode_ci,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TaskGroupTaskID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskgroupstasks`
--

LOCK TABLES `taskgroupstasks` WRITE;
/*!40000 ALTER TABLE `taskgroupstasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `taskgroupstasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `TaskID` int(11) NOT NULL AUTO_INCREMENT,
  `TaskOrder` smallint(4) DEFAULT '99',
  `ProjectID` decimal(11,0) DEFAULT NULL,
  `AssignedToID` decimal(11,0) DEFAULT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `DueDate` date DEFAULT NULL,
  `PercentageComplete` tinyint(4) DEFAULT '0',
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TaskID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,NULL,9,3,'Addition of new R&D Document template','2014-12-12',50,NULL),(2,100,9,3,'Addition of new Led Validation Document template','2014-12-12',NULL,NULL),(3,NULL,8,3,'Review application proposal','2014-12-11',100,NULL),(4,NULL,14,7,'Set up instance of AWS ready to receive inception dbase','2014-12-12',NULL,NULL),(5,98,14,4,'Set up Corporate AWS account','2014-12-12',NULL,NULL),(6,97,14,3,'Provide \"cleaned\" database that can be templated and used for inception of instances','2014-12-12',NULL,NULL),(7,NULL,17,NULL,'review of website',NULL,NULL,NULL),(8,98,17,NULL,'get list of all web pages',NULL,NULL,NULL),(9,NULL,25,NULL,'wdgffg','2015-01-30',NULL,NULL),(10,NULL,25,NULL,'<','2015-02-09',NULL,NULL),(11,1,28,NULL,'Design',NULL,NULL,NULL),(12,2,28,NULL,'Prototype',NULL,NULL,NULL),(13,3,28,NULL,'Test prototype',NULL,NULL,NULL),(14,4,28,NULL,'Implement full',NULL,NULL,NULL),(15,5,28,NULL,'Test full (internal)',NULL,NULL,NULL),(16,6,28,NULL,'Test full (external)',NULL,NULL,NULL),(17,7,28,NULL,'Release',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasktemplateitems`
--

DROP TABLE IF EXISTS `tasktemplateitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasktemplateitems` (
  `TaskTemplateItemID` int(11) NOT NULL AUTO_INCREMENT,
  `TaskTemplateID` int(11) DEFAULT NULL,
  `TaskOrder` smallint(4) DEFAULT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TaskTemplateItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasktemplateitems`
--

LOCK TABLES `tasktemplateitems` WRITE;
/*!40000 ALTER TABLE `tasktemplateitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasktemplateitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasktemplates`
--

DROP TABLE IF EXISTS `tasktemplates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasktemplates` (
  `TaskTemplateID` int(11) NOT NULL AUTO_INCREMENT,
  `TaskTemplateDescription` text COLLATE utf8_unicode_ci,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TaskTemplateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasktemplates`
--

LOCK TABLES `tasktemplates` WRITE;
/*!40000 ALTER TABLE `tasktemplates` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasktemplates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `techinfo`
--

DROP TABLE IF EXISTS `techinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `techinfo` (
  `TechInfoID` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyID` int(11) DEFAULT NULL,
  `ListPosition` tinyint(4) DEFAULT NULL,
  `Title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Details` mediumtext COLLATE utf8_unicode_ci,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CatID` decimal(11,0) DEFAULT NULL,
  PRIMARY KEY (`TechInfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `techinfo`
--

LOCK TABLES `techinfo` WRITE;
/*!40000 ALTER TABLE `techinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `techinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `techinfocategories`
--

DROP TABLE IF EXISTS `techinfocategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `techinfocategories` (
  `CatID` int(11) NOT NULL AUTO_INCREMENT,
  `CatTitle` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `techinfocategories`
--

LOCK TABLES `techinfocategories` WRITE;
/*!40000 ALTER TABLE `techinfocategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `techinfocategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templatecategories`
--

DROP TABLE IF EXISTS `templatecategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templatecategories` (
  `TemplateCategoryID` int(11) NOT NULL DEFAULT '0',
  `TemplateCategory` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`TemplateCategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templatecategories`
--

LOCK TABLES `templatecategories` WRITE;
/*!40000 ALTER TABLE `templatecategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatecategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `NodeID` decimal(11,0) NOT NULL,
  `NodeLevel` decimal(11,0) DEFAULT NULL,
  `NodeParent` decimal(11,0) DEFAULT NULL,
  `NodeTitle` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NodeTemplate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`NodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testtable`
--

DROP TABLE IF EXISTS `testtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testtable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `testint` int(11) DEFAULT NULL,
  `teststring` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testtable`
--

LOCK TABLES `testtable` WRITE;
/*!40000 ALTER TABLE `testtable` DISABLE KEYS */;
INSERT INTO `testtable` VALUES (34,1,'test'),(35,2,'another test');
/*!40000 ALTER TABLE `testtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timesheetentries`
--

DROP TABLE IF EXISTS `timesheetentries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timesheetentries` (
  `TimesheetEntryID` int(11) NOT NULL AUTO_INCREMENT,
  `TimesheetID` int(11) DEFAULT NULL,
  `ProjCont` char(8) COLLATE utf8_unicode_ci NOT NULL,
  `ProjectID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `EmpID` int(11) DEFAULT NULL,
  `ProjContID` int(11) DEFAULT NULL,
  `Proj_or_Cont` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MondayHours` decimal(4,2) DEFAULT NULL,
  `TuesdayHours` decimal(4,2) DEFAULT NULL,
  `WednesdayHours` decimal(4,2) DEFAULT NULL,
  `ThursdayHours` decimal(4,2) DEFAULT NULL,
  `FridayHours` decimal(4,2) DEFAULT NULL,
  `SaturdayHours` decimal(4,2) DEFAULT NULL,
  `SundayHours` decimal(4,2) DEFAULT NULL,
  `Notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TimesheetEntryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timesheetentries`
--

LOCK TABLES `timesheetentries` WRITE;
/*!40000 ALTER TABLE `timesheetentries` DISABLE KEYS */;
/*!40000 ALTER TABLE `timesheetentries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timesheets`
--

DROP TABLE IF EXISTS `timesheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timesheets` (
  `TimesheetID` int(11) NOT NULL AUTO_INCREMENT,
  `EmpID` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `Notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TimesheetID`),
  UNIQUE KEY `EmpID_and_StartDate` (`EmpID`,`StartDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timesheets`
--

LOCK TABLES `timesheets` WRITE;
/*!40000 ALTER TABLE `timesheets` DISABLE KEYS */;
/*!40000 ALTER TABLE `timesheets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timesheetstatus`
--

DROP TABLE IF EXISTS `timesheetstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timesheetstatus` (
  `TimesheetStatusID` int(11) NOT NULL DEFAULT '0',
  `TimesheetStatus` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`TimesheetStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timesheetstatus`
--

LOCK TABLES `timesheetstatus` WRITE;
/*!40000 ALTER TABLE `timesheetstatus` DISABLE KEYS */;
INSERT INTO `timesheetstatus` VALUES (10,'New'),(20,'Rejected'),(50,'Submitted'),(90,'Approved'),(100,'Accepted');
/*!40000 ALTER TABLE `timesheetstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpreferences`
--

DROP TABLE IF EXISTS `userpreferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpreferences` (
  `UserID` int(11) NOT NULL,
  `ThemeID` tinyint(4) DEFAULT '0',
  `TabCloseButtonOnTheForm` tinyint(4) DEFAULT '0',
  `DefaultMainMenuTab` tinyint(4) DEFAULT '0',
  `DefaultCompanyTab` tinyint(4) DEFAULT '0',
  `DefaultProjectTab` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpreferences`
--

LOCK TABLES `userpreferences` WRITE;
/*!40000 ALTER TABLE `userpreferences` DISABLE KEYS */;
INSERT INTO `userpreferences` VALUES (1,0,0,0,0,0),(2,0,0,0,0,0),(3,0,0,0,0,0);
/*!40000 ALTER TABLE `userpreferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userrole` (
  `RoleID` int(11) NOT NULL DEFAULT '1',
  `RoleName` tinytext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (1,'Administrator'),(2,'General User'),(3,'Guest');
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `ContactID` int(11) DEFAULT NULL,
  `EmployeeID` int(11) DEFAULT NULL,
  `Name` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserInitials` char(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserName` char(32) COLLATE utf8_unicode_ci DEFAULT '',
  `UserPassword` char(32) COLLATE utf8_unicode_ci DEFAULT '',
  `Password` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserEmail` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsAccountManager` tinyint(4) DEFAULT '1',
  `IsOpportunityManager` tinyint(1) DEFAULT '0',
  `IsProjectManager` tinyint(1) DEFAULT '0',
  `RequiresTimesheets` tinyint(1) DEFAULT NULL,
  `ShowFilterPanel` tinyint(1) DEFAULT NULL,
  `ShowMyTasksOnly` tinyint(1) DEFAULT NULL,
  `NoOfItemsPerPage` tinyint(1) DEFAULT NULL,
  `EmailServerUserName` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EmailServerPassword` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EmailServerSourceMailFolder` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EmailServerArchiveMailFolder` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EmailServerKeepCopy` tinyint(1) DEFAULT NULL,
  `EmailLinkFrequency` smallint(6) DEFAULT NULL,
  `qUseOutlook` tinyint(1) DEFAULT NULL,
  `DefaultDocumentFolder` char(64) COLLATE utf8_unicode_ci DEFAULT 'c:\\',
  `CanSeeOpps` tinyint(1) DEFAULT NULL,
  `CanSeeProjType2` tinyint(1) DEFAULT NULL,
  `CanSeeProjType3` tinyint(1) DEFAULT NULL,
  `CanSeeProjType4` tinyint(1) DEFAULT NULL,
  `CanSeeProjType5` tinyint(1) DEFAULT NULL,
  `CanSeeProjType6` tinyint(1) DEFAULT NULL,
  `CanSeeProjType7` tinyint(1) DEFAULT NULL,
  `CanSeeProjType8` tinyint(1) DEFAULT NULL,
  `LoggedInMachineName` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LoggedInOsUserName` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastLoginTime` datetime DEFAULT NULL,
  `Active` tinyint(1) DEFAULT '1',
  `CurrentEliteVersion` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RoleID` int(11) NOT NULL DEFAULT '2',
  `HolidayAuthoriser` tinyint(1) NOT NULL DEFAULT '0',
  `IsSuperUser` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'Administrator','ADMIN','Admin','admin',NULL,'admin',1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c:\\',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SID-4784','damien.robson','2015-02-27 12:54:26',1,'2.14.5536.23193',2,0,1),(2,NULL,4,'Damien Robson','DPR','damien.robson','995AVp80jskRIafcaat4eGx7Q==','890AVp80jskRIafcaat4eGx7Q==','damien.robson@cambridge-software.com',1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c:\\',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SID-4784','damien.robson','2015-02-27 11:45:13',1,'2.14.5536.21141',2,1,0),(3,NULL,5,'David McLeary','DM','david.mcleary','2pcJ$G+n*NP2',NULL,'jamie.collinson@cambridge-software.com',1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c:\\',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,2,1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersaccesscontrol`
--

DROP TABLE IF EXISTS `usersaccesscontrol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersaccesscontrol` (
  `UserID` int(11) NOT NULL DEFAULT '0',
  `CanUseSuspects` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProspects` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseCustomers` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseSuppliers` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseAllCompanies` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType1` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType2` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType3` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType4` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType5` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType6` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType7` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProjType8` tinyint(1) NOT NULL DEFAULT '0',
  `CanDeleteCompanies` tinyint(1) NOT NULL DEFAULT '0',
  `CanDeleteContacts` tinyint(1) NOT NULL DEFAULT '0',
  `CanDeleteProjects` tinyint(1) NOT NULL DEFAULT '0',
  `CanDeleteActivities` tinyint(1) NOT NULL DEFAULT '0',
  `CanDeleteSupplierContracts` tinyint(1) NOT NULL DEFAULT '0',
  `CanDeleteCustomData` tinyint(1) NOT NULL DEFAULT '0',
  `CanAuthorisePOs` tinyint(1) NOT NULL DEFAULT '0',
  `CanCompletePOs` tinyint(1) NOT NULL DEFAULT '0',
  `CanCancelPOs` tinyint(1) NOT NULL DEFAULT '0',
  `CanDeletePOs` tinyint(1) NOT NULL DEFAULT '0',
  `CanUpdateLookupTables` tinyint(1) NOT NULL DEFAULT '0',
  `CanRejectOrCompleteProjects` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseTimeSheet` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseAbsence` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseSupplierContracts` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseServiceDesk` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseProcurementList` tinyint(1) NOT NULL DEFAULT '0',
  `CanUsePurchaseOrders` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseDevices` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseTemplates` tinyint(1) NOT NULL DEFAULT '1',
  `CanUseProducts` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseDataImport` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseDataExport` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseReports` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseSupportReports` tinyint(1) NOT NULL DEFAULT '0',
  `CanUseHRAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `CanApproveAbsence` tinyint(1) NOT NULL DEFAULT '0',
  `CanApproveTimesheets` tinyint(1) NOT NULL DEFAULT '0',
  `CanAcceptTimesheets` tinyint(1) NOT NULL DEFAULT '0',
  `AllowBlankProjectProbability` tinyint(1) NOT NULL DEFAULT '0',
  `AllowBlankProjectValue` tinyint(1) NOT NULL DEFAULT '0',
  `AllowBlankProjectPlannedEndDate` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersaccesscontrol`
--

LOCK TABLES `usersaccesscontrol` WRITE;
/*!40000 ALTER TABLE `usersaccesscontrol` DISABLE KEYS */;
INSERT INTO `usersaccesscontrol` VALUES (1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1),(2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1),(3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `usersaccesscontrol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_contacts_list`
--

DROP TABLE IF EXISTS `v_contacts_list`;
/*!50001 DROP VIEW IF EXISTS `v_contacts_list`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_contacts_list` AS SELECT 
 1 AS `ContactID`,
 1 AS `Name`,
 1 AS `CompanyID`,
 1 AS `Company`,
 1 AS `Phone`,
 1 AS `Mobile`,
 1 AS `Email`,
 1 AS `Customer`,
 1 AS `Supplier`,
 1 AS `active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_costs_project_time`
--

DROP TABLE IF EXISTS `v_costs_project_time`;
/*!50001 DROP VIEW IF EXISTS `v_costs_project_time`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_costs_project_time` AS SELECT 
 1 AS `EmpID`,
 1 AS `ProjCont`,
 1 AS `EmpCost`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_list_3rd_party_contracts`
--

DROP TABLE IF EXISTS `v_list_3rd_party_contracts`;
/*!50001 DROP VIEW IF EXISTS `v_list_3rd_party_contracts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_list_3rd_party_contracts` AS SELECT 
 1 AS `ContractID`,
 1 AS `Customer`,
 1 AS `Category`,
 1 AS `Description`,
 1 AS `Supplier`,
 1 AS `Renewal Date`,
 1 AS `Active`,
 1 AS `Is Active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_list_customers`
--

DROP TABLE IF EXISTS `v_list_customers`;
/*!50001 DROP VIEW IF EXISTS `v_list_customers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_list_customers` AS SELECT 
 1 AS `CompanyID`,
 1 AS `Company`,
 1 AS `Phone`,
 1 AS `WebSite`,
 1 AS `Customer`,
 1 AS `Active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_list_pos`
--

DROP TABLE IF EXISTS `v_list_pos`;
/*!50001 DROP VIEW IF EXISTS `v_list_pos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_list_pos` AS SELECT 
 1 AS `PO #`,
 1 AS `ProjectID`,
 1 AS `Project`,
 1 AS `SupplierID`,
 1 AS `Supplier`,
 1 AS `Description`,
 1 AS `POStatusID`,
 1 AS `Status`,
 1 AS `Purchase Date`,
 1 AS `Delivery Date`,
 1 AS `CustomerID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_list_suppliers`
--

DROP TABLE IF EXISTS `v_list_suppliers`;
/*!50001 DROP VIEW IF EXISTS `v_list_suppliers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_list_suppliers` AS SELECT 
 1 AS `CompanyID`,
 1 AS `AccountNo`,
 1 AS `Company`,
 1 AS `Abbreviation`,
 1 AS `Web Site`,
 1 AS `Phone`,
 1 AS `Supplier`,
 1 AS `Approved`,
 1 AS `Is Approved`,
 1 AS `Active`,
 1 AS `IsActive`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_po_list`
--

DROP TABLE IF EXISTS `v_po_list`;
/*!50001 DROP VIEW IF EXISTS `v_po_list`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_po_list` AS SELECT 
 1 AS `POID`,
 1 AS `RequestorID`,
 1 AS `ProjectID`,
 1 AS `CompanyID`,
 1 AS `Company`,
 1 AS `CustomerID`,
 1 AS `Description`,
 1 AS `POStatusID`,
 1 AS `PurchaseDate`,
 1 AS `POStatus`,
 1 AS `DeliveryDate`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_projects_labour_costs`
--

DROP TABLE IF EXISTS `v_projects_labour_costs`;
/*!50001 DROP VIEW IF EXISTS `v_projects_labour_costs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_projects_labour_costs` AS SELECT 
 1 AS `EmpID`,
 1 AS `ProjCont`,
 1 AS `EmpCost`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_rep_3rd_party_contracts`
--

DROP TABLE IF EXISTS `v_rep_3rd_party_contracts`;
/*!50001 DROP VIEW IF EXISTS `v_rep_3rd_party_contracts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_rep_3rd_party_contracts` AS SELECT 
 1 AS `CustomerID`,
 1 AS `Customer`,
 1 AS `Supplier`,
 1 AS `Service`,
 1 AS `Category`,
 1 AS `StartDate`,
 1 AS `RenewedOnDate`,
 1 AS `ServiceCost`,
 1 AS `RenewalDate`,
 1 AS `Managed`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_status_pos`
--

DROP TABLE IF EXISTS `v_status_pos`;
/*!50001 DROP VIEW IF EXISTS `v_status_pos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_status_pos` AS SELECT 
 1 AS `POID`,
 1 AS `Company`,
 1 AS `Description`,
 1 AS `POStatus`,
 1 AS `DeliveryDate`,
 1 AS `DeliveryDueInDays`,
 1 AS `RequestorID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_employees`
--

DROP TABLE IF EXISTS `vew_employees`;
/*!50001 DROP VIEW IF EXISTS `vew_employees`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_employees` AS SELECT 
 1 AS `EmpID`,
 1 AS `SurnameForename`,
 1 AS `Active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_active_project_details`
--

DROP TABLE IF EXISTS `vew_list_active_project_details`;
/*!50001 DROP VIEW IF EXISTS `vew_list_active_project_details`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_active_project_details` AS SELECT 
 1 AS `ProjectID`,
 1 AS `Description`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_contacts`
--

DROP TABLE IF EXISTS `vew_list_contacts`;
/*!50001 DROP VIEW IF EXISTS `vew_list_contacts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_contacts` AS SELECT 
 1 AS `ContactID`,
 1 AS `CompanyID`,
 1 AS `Title`,
 1 AS `Contact`,
 1 AS `Position`,
 1 AS `Phone`,
 1 AS `Mobile`,
 1 AS `Email`,
 1 AS `LastContactDate`,
 1 AS `NextContactDate`,
 1 AS `Active`,
 1 AS `Notes`,
 1 AS `timestamp`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_customers`
--

DROP TABLE IF EXISTS `vew_list_customers`;
/*!50001 DROP VIEW IF EXISTS `vew_list_customers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_customers` AS SELECT 
 1 AS `CompanyID`,
 1 AS `Company`,
 1 AS `PostCode`,
 1 AS `Phone`,
 1 AS `WebSite`,
 1 AS `Active`,
 1 AS `AccStatusID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_prospectcompanies`
--

DROP TABLE IF EXISTS `vew_list_prospectcompanies`;
/*!50001 DROP VIEW IF EXISTS `vew_list_prospectcompanies`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_prospectcompanies` AS SELECT 
 1 AS `CompanyID`,
 1 AS `Company`,
 1 AS `PostCode`,
 1 AS `Phone`,
 1 AS `WebSite`,
 1 AS `Industry`,
 1 AS `Source`,
 1 AS `Active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_prospectcontacts`
--

DROP TABLE IF EXISTS `vew_list_prospectcontacts`;
/*!50001 DROP VIEW IF EXISTS `vew_list_prospectcontacts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_prospectcontacts` AS SELECT 
 1 AS `ContactID`,
 1 AS `CompanyID`,
 1 AS `Title`,
 1 AS `Contact`,
 1 AS `Position`,
 1 AS `Phone`,
 1 AS `Mobile`,
 1 AS `Email`,
 1 AS `LastContactDate`,
 1 AS `NextContactDate`,
 1 AS `Active`,
 1 AS `Notes`,
 1 AS `timestamp`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_purchaseorders`
--

DROP TABLE IF EXISTS `vew_list_purchaseorders`;
/*!50001 DROP VIEW IF EXISTS `vew_list_purchaseorders`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_purchaseorders` AS SELECT 
 1 AS `POID`,
 1 AS `ProjectID`,
 1 AS `Project`,
 1 AS `CustomerID`,
 1 AS `Customer`,
 1 AS `SupplierID`,
 1 AS `Supplier`,
 1 AS `Description`,
 1 AS `POStatusID`,
 1 AS `Status`,
 1 AS `PurchaseDate`,
 1 AS `DeliveryDate`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_suppliers`
--

DROP TABLE IF EXISTS `vew_list_suppliers`;
/*!50001 DROP VIEW IF EXISTS `vew_list_suppliers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_suppliers` AS SELECT 
 1 AS `CompanyID`,
 1 AS `Company`,
 1 AS `PostCode`,
 1 AS `Phone`,
 1 AS `WebSite`,
 1 AS `Active`,
 1 AS `AccStatusID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_list_timesheetentries_bookedtime`
--

DROP TABLE IF EXISTS `vew_list_timesheetentries_bookedtime`;
/*!50001 DROP VIEW IF EXISTS `vew_list_timesheetentries_bookedtime`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_list_timesheetentries_bookedtime` AS SELECT 
 1 AS `ProjCont`,
 1 AS `Date`,
 1 AS `Name`,
 1 AS `Mon`,
 1 AS `Tue`,
 1 AS `Wed`,
 1 AS `Thu`,
 1 AS `Fri`,
 1 AS `Sat`,
 1 AS `Sun`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vew_my_tasks`
--

DROP TABLE IF EXISTS `vew_my_tasks`;
/*!50001 DROP VIEW IF EXISTS `vew_my_tasks`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vew_my_tasks` AS SELECT 
 1 AS `Company`,
 1 AS `TaskID`,
 1 AS `TaskOrder`,
 1 AS `ProjectID`,
 1 AS `AssignedToID`,
 1 AS `Description`,
 1 AS `DueDate`,
 1 AS `PercentageComplete`,
 1 AS `timestamp`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'cs-live'
--
/*!50003 DROP PROCEDURE IF EXISTS `backup temp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `backup temp`()
INSERT timesheets (EmpID, StartDate) select EmpID,  cast((now() - interval (dayofweek(now()) - 2) day) as date)  from employees E where RequiresTimesheets = -1
and not exists (select * from timesheets T where  T.EmpId = E.EmpId And T.StartDate =  cast((now() - interval (dayofweek(now()) - 2) day) as date) ) ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `export_companies` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `export_companies`(IN qActive INT)
BEGIN
		SELECT
			"" as "AccountID",
			CO.Company as "CustomerName",
			IF(CO.Suspect = -1, "Lead", IF (CO.Prospect = -1, "Prospect", IF(CO.Customer = -1, "Existing", if(CO.Supplier = -1, "Existing","Lead")))) as "CompanyState",
			"UK" as "Jurisdiction",
			"Default Industry" as "Industry",
			#if(I.Industry is null ,"Undefined",I.Industry) as "Industry",
			CO.website as "Website",
			IF(CO.Supplier = -1, "Yes", "No") AS "IsReseller",
			"" AS "QuoteFooter",
			"" AS "InvoiceFooter",
			"" AS "OrderFooter",
			"" AS "EstimateFooter",
			"phil.mash@brightvisions.co.uk" as "AccountManager",
			"phil.mash@brightvisions.co.uk" AS "ContractAdministrator",
			"phil.mash@brightvisions.co.uk" AS "InvoiceAdministrator",
			"" AS "PaymentTermDays",
			"Head Office" AS "PrimaryAddressName",
			if((SELECT C.Forename FROM Contacts C WHERE C.ContactID = CO.PrimaryContactID) is null, "Unknown",(SELECT C.Forename FROM Contacts C WHERE C.ContactID = CO.PrimaryContactID)) AS "PrimaryContactFirstName",
			if((SELECT C.Surname FROM Contacts C WHERE C.ContactID = CO.PrimaryContactID) is null, "Unknown",(SELECT C.Surname FROM Contacts C WHERE C.ContactID = CO.PrimaryContactID)) AS "PrimaryContactLastName",
			"" AS "PrimaryInvoiceContactFirstName",
			"" AS "PrimaryInvoiceContactLastName",
			"" AS "DefaultTaxRule",
			"" AS "Domains"
		FROM Companies CO
		LEFT JOIN industry I ON CO.IndustryID = I.IndustryID
		WHERE CO.Active = qActive and CO.Customer = -1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `export_company_addresses` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `export_company_addresses`(IN qActive INT)
BEGIN
		SELECT
			CO.Company as "CompanyName",
			"Head Office" As "AddressName",
			CO.Address as "AddressLine1",
			"" AS "AddressLine2",
			CO.City as "Town",
			CO.County as "County",
			CO.PostCode as "Postcode",
			CO.Country as "Country"
		FROM Companies CO
		WHERE CO.Active = qActive and CO.Customer = -1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `export_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `export_contacts`(IN qActive INT)
BEGIN
		SELECT
			CO.Company as "CompanyName",
			C.Forename as "ContactFirstName",
			C.Surname as "ContactLastName",
			"" as "ContactTitle",
			C.Position as "ContactPosition",
			C.Phone as "ContactTelephone",
			CO.Fax As "ContactFax",
			C.Mobile AS "ContactMobile",
			C.Email as "ContactEmail",
			"NO" as "IsPrimaryContact",
			"NO" AS "IsPrimaryInvoiceContact"
			
		FROM Contacts C
		LEFT JOIN Companies CO ON CO.CompanyID = C.CompanyID
		WHERE C.Active = qActive and CO.Active = qActive and CO.Customer = -1 and length(C.Email) > 0 ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetItemsWithoutProjects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetItemsWithoutProjects`(IN qNotUsed INT)
BEGIN
	SELECT *
	FROM items
	WHERE ProjectID IS NULL
	ORDER BY ProjectID, ItemID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetProjectProfitAndLossReport` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetProjectProfitAndLossReport`(IN qNotUsed INT)
BEGIN
		SELECT
			P.ProjectID,
			(SELECT PT.ProjectType from ProjectType PT where PT.ProjectTypeID = P.Type) as 'Type',
			(SElect C.Company from companies C where C.companyID = P.CompanyID) as 'Company',
			P.Description,
			(SELECT SUM(IP.Quantity * IP.Price) FROM Items IP WHERE IP.ProjectID = P.ProjectID) AS 'Sale Value',
			(SELECT SUM(IC.Quantity * IC.Cost) FROM Items IC WHERE IC.ProjectID = P.ProjectID) AS 'Project Costs',
			(SELECT SUM(case when TE.MondayHours > 0 then TE.MondayHours else 0 end) +
				SUM(CASE WHEN TE.TuesdayHours > 0 THEN TE.TuesdayHours ELSE 0 END) +
				SUM(CASE WHEN TE.WednesdayHours > 0 THEN TE.WednesdayHours ELSE 0 END) +
				SUM(CASE WHEN TE.ThursdayHours > 0 THEN TE.ThursdayHours ELSE 0 END) +
				SUM(CASE WHEN TE.FridayHours > 0 THEN TE.FridayHours ELSE 0 END) +
				SUM(CASE WHEN TE.SaturdayHours > 0 THEN TE.SaturdayHours ELSE 0 END) +
				SUM(CASE WHEN TE.SundayHours > 0 THEN TE.SundayHours ELSE 0 END)
				FROM TimesheetEntries TE WHERE TE.ProjectID = P.ProjectID) AS 'Time Booked',
			'Travelling Expenses',
			'Other Expenses'
		FROM Projects AS P
		WHERE P.Type <= 10;
	END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `moveActivitiesToDocs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `moveActivitiesToDocs`()
BEGIN
	declare tempID int;
	declare currentActivityID int;
    declare bDone int;
    
    declare vName varchar(255);
    declare vLocation varchar(255);
    declare vType varchar(255);
    declare iCompany int;
    declare iCurr int;
    
	DECLARE cs cursor for SELECT ActivityID, Activity, Location, CompanyID FROM activity where activitytypeid=2;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET bDone = 1;
         
SELECT 
    MAX(ID)
INTO tempID FROM
    document;
    
    OPEN cs;
    SET bDone = 0;
    REPEAT
		set tempID = tempID + 1;
		fetch cs into currentActivityID, vName, vLocation, iCompany;		
        
        if ! bDone then
			SELECT CONCAT('.', SUBSTRING_INDEX(vLocation, '.', -1)) INTO vType;
						
			insert into document(id,name,location,type,dateadded,companyid)
			values (tempID,vName,vLocation,vType,NOW(),iCompany);
        end if;
    Until bDone END REPEAT;
    close cs;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_activity_with_username` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_activity_with_username`(IN intCompanyID INT, IN intType INT)
BEGIN
CASE intType
	WHEN 2 THEN
		SELECT
		ActivityID, ActivityType, Users.Name, ActivityDate, Activity, Location
		FROM Activity
		LEFT JOIN Users ON (Activity.UserID = Users.UserID)
		LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
		WHERE  ActivityType = 2 AND CompanyID = intCompanyID
		ORDER BY ActivityDate DESC;
		
	ELSE
		SELECT
		ActivityID, ActivityType, Users.Name, ActivityDate, Activity, Location
		FROM Activity
		LEFT JOIN Users ON (Activity.UserID = Users.UserID)
		LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
		WHERE  CompanyID = intCompanyID
		ORDER BY ActivityDate DESC;
	END CASE;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_company_activity_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_company_activity_list`(IN intCompanyID INT, IN intType INT)
BEGIN
CASE intType
	WHEN 0 THEN
		SELECT
		ActivityID, Activity.ActivityTypeID, ActivityType, Users.Name, ActivityDate,
		CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `FullName`,
		contacts.Position,
		Activity,
		Location
		FROM Activity
		LEFT JOIN Users ON (Activity.UserID = Users.UserID)
		LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
		LEFT JOIN Contacts ON (contacts.ContactID = Activity.ContactID)
		WHERE  Activity.CompanyID = intCompanyID
		ORDER BY ActivityDate DESC;		
	ELSE
		SELECT
		ActivityID, Activity.ActivityTypeID, ActivityType, Users.Name, ActivityDate,
		CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `FullName`,
		contacts.Position,
		Activity,
		Location
		FROM Activity
		LEFT JOIN Users ON (Activity.UserID = Users.UserID)
		LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
		LEFT JOIN Contacts ON (contacts.ContactID = Activity.ContactID)
		WHERE  Activity.ActivityTypeID = intType AND Activity.CompanyID = intCompanyID
		ORDER BY ActivityDate DESC;
	END CASE;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_company_info_user_access` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_company_info_user_access`(IN intUserID INT, qGranted INT)
BEGIN
	IF qGranted = -1 THEN
		SELECT 
			Companies.CompanyID,
			CompanyInfoAccess.UserID,
			Companies.Company
		FROM CompanyInfoAccess
		LEFT JOIN Companies ON (CompanyInfoAccess.CompanyID =Companies.CompanyID)
		WHERE CompanyInfoAccess.UserID = intUserID AND (Companies.Customer = -1 OR Companies.Supplier = -1)
		ORDER BY Company;
	ELSE # No Access Allowed
		SELECT 
			Companies.CompanyID,
			CompanyInfoAccess.UserID,
			Companies.Company
		FROM Companies
		left JOIN CompanyInfoAccess ON (Companies.CompanyID = CompanyInfoAccess.CompanyID)
		WHERE (CompanyInfoAccess.UserID is null or CompanyInfoAccess.UserID <> intUserID) and (Companies.Customer = -1 or Companies.Supplier = -1)
		ORDER BY Company;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_company_project_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_company_project_items`(IN intCompanyID INT, IN intType INT)
BEGIN
	SELECT
		Items.ProjectID,
		ProjectClass.Classification,
		Items.Description,
		Items.Quantity
	FROM Items
	LEFT JOIN Projects ON (Projects.ProjectID = Items.ProjectID)
	LEFT JOIN Companies ON (Companies.CompanyID = Projects.CompanyID)
	left join ProjectClass on (ProjectClass.ClassID  = Projects.ClassID)
	where Companies.CompanyID = intCompanyID and Projects.Type = intType
	ORDER BY Items.ProjectID DESC;		
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_timesheets` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_timesheets`()
INSERT timesheets (EmpID, Status, StartDate,timestamp) select EmpID, 10, cast((now() - interval (dayofweek(now()) - 2) day) as date),now()  from employees E where RequiresTimesheets = -1
and not exists (select * from timesheets T where  T.EmpId = E.EmpId And T.StartDate =  cast((now() - interval (dayofweek(now()) - 2) day) as date) ) ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_timesheets_DO_NOT_USE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_timesheets_DO_NOT_USE`()
INSERT timesheets (UserID, EmpID, `Status`, StartDate,`timestamp`)
	select
		U.UserID,
		U.EmployeeID,
		10,
		cast((now() - interval (dayofweek(now()) - 2) day) as date),
		now()
	From Users U
	WHERE
		NOT EXISTS (SELECT * FROM timesheets T WHERE  T.UserID = U.UserID AND T.StartDate =  CAST((NOW() - INTERVAL (DAYOFWEEK(NOW()) - 2) DAY) AS DATE) ) ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_dashboard`(IN NotUsed INT)
BEGIN
	SELECT
		Date(projects.PlannedStartDate),
		Date(projects.ActualStartDate),
		date(projects.PlannedEndDate),
		date(projects.ActualEndDate),
		sources.Source,
		projectstatus.Status,
		projectmodules.ModTitle,
		projects.ProjectValue
	FROM projects
	left join sources on projects.SourceID = sources.SourceID
	left join projectstatus on projects.Status = projectstatus.StatusID
	left join projectmodules on projects.Type = projectmodules.ModID
			#LEFT JOIN opportunitystages ON (projects.OppStageID = opportunitystages.OppStageID)
	where projects.CreationDate > "2010-01-01"
	Group by projects.ActualEndDate;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_all_records` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_all_records`(IN qDelete INT)
BEGIN
		CASE qDelete
			WHEN 9912 THEN # Project Type = Opportunity
				Begin
					DELETE from activity;
					delete from companies;
					delete from contacts;
					delete from projects;
				end;
		ELSE
			BEGIN
			END;    
		end case;
	END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_contacts`(IN qSuspects INT, IN qProspects INT, qCustomers INT, qSuppliers INT, IN qActive INT)
BEGIN
		SELECT
			ContactID,
			CO.Company,
			Forename,
			Surname
		FROM Contacts C
		LEFT JOIN Companies CO ON CO.CompanyID = C.CompanyID
		WHERE (CO.Suspect = qSuspects OR CO.Prospect = qProspects OR CO.Customer = qCustomers OR CO.Supplier = qSuppliers) AND C.Active = qActive;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_groups` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_groups`()
BEGIN
        	SELECT
                GroupID,
                Groups.Group
	        FROM Groups;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_products` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_products`()
BEGIN
        	SELECT
                ProdID,
                Products.PartNo
	        FROM Products;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_product_components` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_product_components`(IN intProductID INT)
BEGIN
        	SELECT
                *
	        FROM ProductComponents PC
	        WHERE PC.ProdID = intProductID;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_project_sources` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_project_sources`()
BEGIN
        	SELECT *
	        FROM ProjectSources;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_suspect_companies` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_suspect_companies`()
BEGIN
	SELECT *
	FROM Companies;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_task_groups` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_task_groups`()
BEGIN
        	SELECT
                TaskGroupID,
                TaskGroup
	        FROM TaskGroups;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_company_phone` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_company_phone`(IN intRecID INT)
BEGIN
            SELECT 
                CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Companies.Phone) AS Phone
            FROM companies
	        LEFT JOIN Countries ON (Countries.Country = Companies.Country)
            WHERE CompanyID = intRecID;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_contact_group_memberships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_contact_group_memberships`(IN intContactID INT)
BEGIN
        	SELECT
        	G.GroupID,
        	G.Group       	
	        FROM groupmembers GM
	        LEFT JOIN groups G ON GM.GroupID = G.GroupID
	        WHERE GM.ContactID = intContactID;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_contact_group_nonmemberships` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_contact_group_nonmemberships`(IN intContactID INT)
BEGIN
        	SELECT
        	G.GroupID,
        	G.Group       	
	        FROM groups G
	        WHERE NOT EXISTS (SELECT GM.GroupID, GM.ContactID FROM groupmembers GM WHERE intContactID = GM.ContactID AND G.GroupID = GM.GroupID);
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_contact_phone` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_contact_phone`(IN intRecID INT)
BEGIN
            SELECT 
                CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Contacts.Phone) AS Phone
            FROM contacts
	        LEFT JOIN Companies ON (Companies.CompanyID = Contacts.CompanyID)
	        LEFT JOIN Countries ON (Countries.Country = Companies.Country)
            WHERE ContactID = intRecID;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_group_members` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_group_members`(IN intGroupID INT)
BEGIN
        	SELECT
        	C.ContactID,
        	C.Title,
        	C.Forename,
        	C.Surname,
        	(SELECT companies.Company FROM companies WHERE companies.CompanyID = C.CompanyID) AS 'Company',
        	(SELECT companies.Address FROM companies WHERE companies.CompanyID = C.CompanyID) AS 'Address',
        	(SELECT companies.City FROM companies WHERE companies.CompanyID = C.CompanyID) AS 'City',
        	(SELECT companies.Country FROM companies WHERE companies.CompanyID = C.CompanyID) AS 'Country',
        	(SELECT companies.PostCode FROM companies WHERE companies.CompanyID = C.CompanyID) AS 'Postcode',       	
        	(SELECT CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),companies.Phone) FROM companies, countries WHERE countries.Country = companies.Country AND companies.CompanyID = C.CompanyID) AS 'Phone',
        	C.Email
	        FROM groupmembers GM
	        LEFT JOIN contacts C ON GM.ContactID = C.ContactID
	        WHERE GM.GroupID = intGroupID;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_group_nonmembers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_group_nonmembers`(IN intGroupID INT)
BEGIN
        	SELECT
        	C.ContactID,
        	C.Title,
        	C.Forename,
        	C.Surname,
        	(SELECT companies.Company FROM companies WHERE companies.CompanyID = C.CompanyID) AS 'Company'
        	
	        FROM contacts C
	        WHERE NOT EXISTS (SELECT GM.GroupID, GM.ContactID FROM groupmembers GM WHERE C.ContactID = GM.ContactID AND intGroupID = GM.GroupID);
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_project_labour_costs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_project_labour_costs`(IN intProjectID INTEGER)
BEGIN
        	SELECT
	            (`costrates`.`CostRate` * SUM(((((((COALESCE(`timesheetentries`.`MondayHours`,0) + COALESCE(`timesheetentries`.`TuesdayHours`,0)) + COALESCE(`timesheetentries`.`WednesdayHours`,0)) + COALESCE(`timesheetentries`.`ThursdayHours`,0)) + COALESCE(`timesheetentries`.`FridayHours`,0)) + COALESCE(`timesheetentries`.`SaturdayHours`,0)) + COALESCE(`timesheetentries`.`SundayHours`,0))))
	        FROM timesheetentries
        	JOIN users ON timesheetentries.UserID = users.UserID
	        JOIN employees ON Users.EmployeeID = employees.EmpID
	        JOIN costrates	ON employees.CostRateID = costrates.CostRateID
	        WHERE timesheetentries.ProjectID = intProjectID;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_project_material_costs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_project_material_costs`(IN intProjectID INT)
BEGIN
	        SELECT
		        SUM(`items`.`Quantity` * `items`.`Cost`)
	        FROM items
	        JOIN pos ON items.POID = pos.POID
	        WHERE items.ProjectID = intProjectID AND pos.POStatus <> 90;
        END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_kpi_actual_project_values` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_kpi_actual_project_values`(IN TargetYear INT, in ClassID int)
BEGIN
	SELECT
		CAST(DATE_FORMAT(projects.AuthorisationToProceedDate, '%b %y') AS CHAR) AS "Month",
		SUM(projects.ProjectValue) AS "Value"
	FROM projects
	WHERE projects.AuthorisationToProceedDate < NOW() and
	      year(projects.AuthorisationToProceedDate) = TargetYear AND
	      projects.ClassID = ClassID
	GROUP BY DATE_FORMAT(projects.AuthorisationToProceedDate, '%b %y')
	ORDER BY projects.AuthorisationToProceedDate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_kpi_actual_project_values_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_kpi_actual_project_values_list`(IN TargetYear INT, in ClassID int)
BEGIN
	SELECT
		CAST(DATE_FORMAT(projects.AuthorisationToProceedDate, '%b %y') AS CHAR) AS "Month",
		projects.ProjectID as "Ref #",
		projects.Description as "Description",
		projects.ProjectValue AS "Value"
	FROM projects
	WHERE projects.AuthorisationToProceedDate < NOW() and
	      year(projects.AuthorisationToProceedDate) = TargetYear AND
	      projects.ClassID = ClassID
	#GROUP BY DATE_FORMAT(projects.AuthorisationToProceedDate, '%b %y')
	ORDER BY projects.AuthorisationToProceedDate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_kpi_targets_project_values` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_kpi_targets_project_values`(IN TargetYear int, IN ClassID INT)
BEGIN
	CASE ClassID
		WHEN 1000 THEN # Projects
			SELECT
				CAST(DATE_FORMAT(TargetMonth,  '%b %y') AS CHAR) AS "Month",
				ProjectsTarget as "TargetValue"
			FROM targets
			WHERE YEAR(TargetMonth) = TargetYear
			ORDER BY TargetMonth;
		
		when 1001 then # Contracts
			SELECT
				CAST(DATE_FORMAT(TargetMonth,  '%b %y') AS CHAR) AS "Month",
				ContractsTarget as "TargetValue"
			FROM targets
			WHERE YEAR(TargetMonth) = TargetYear
			ORDER BY TargetMonth;
		when 1002 then # H + H
			SELECT
				CAST(DATE_FORMAT(TargetMonth,  '%b %y') AS CHAR) AS "Month",
				SpecialProjectsTarget AS "TargetValue"
			FROM targets
			WHERE YEAR(TargetMonth) = TargetYear
			ORDER BY TargetMonth;
		ELSE  # All
			SELECT
				CAST(DATE_FORMAT(TargetMonth,  '%b %y') AS CHAR) AS "Month",
				ProjectsTarget + ContractsTarget + SpecialProjectsTarget AS "TargetValue"
			FROM targets
			WHERE YEAR(TargetMonth) = TargetYear
			ORDER BY TargetMonth;
	end case;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_absences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_absences`(IN intEmpID INT, IN intYear INT)
BEGIN
	SELECT
		AbsenceID,
		AbsenceStatus As "Status",
		AbsenceType as "Type",
		StartDate as "Start Date",
		EndDate AS "End Date",
		FORMAT(Days,1) as "Days",
		Absence.Notes
	FROM Absence
	LEFT JOIN Employees ON Absence.EmpID = Employees.EmpID
	LEFT JOIN AbsenceTypes ON Absence.AbsenceTypeID = AbsenceTypes.AbsenceTypeID
	LEFT JOIN AbsenceStatus ON Absence.AbsenceStatusID = AbsenceStatus.AbsenceStatusID
	WHERE Absence.EmpID = intEmpID and year(startdate) = intYear
	ORDER BY StartDate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_active_opportunities_and_projects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_active_opportunities_and_projects`()
BEGIN
	SELECT
		ProjectID,
		concat(ProjectID,' - ',Description) AS Description
	FROM projects
	WHERE (Projects.Status < 90);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_all_companies` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_all_companies`(IN qActive INT)
BEGIN
	SELECT 
		Companies.CompanyID,
		IF(Companies.Prospect = -1, 'Prospect', IF(Companies.Customer = -1, 'Customer', IF(Companies.Supplier = -1, 'Supplier', 'Other')) ) AS `CompanyType`,
		Companies.Company,
		Companies.AccMgrID,
		Users.Name AS "AccMgr",
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' ')) AS "CountryCode",
		Companies.Phone,
		Countries.TimeDiff,
		Companies.Country,
		Companies.LastUpdateDate,
		Companies.SourceID,
		Sources.Source,
		Companies.PrimaryContactID,
		Contacts.Forename,
		Contacts.Surname,
		Contacts.Email,
		Companies.NextAction,
		Companies.NextActionDate
	FROM companies
	LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
	LEFT JOIN Contacts ON (Contacts.ContactID = Companies.PrimaryContactID)
	LEFT JOIN Countries ON (Countries.Country = Companies.Country)
	LEFT JOIN Sources ON (Sources.SourceID = Companies.SourceID)
	WHERE IF(qActive = -1,Companies.Active = -1, Companies.Active <> 999)
	ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_all_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_all_contacts`(IN qActive INT)
BEGIN
		SELECT
			ContactID,
			Contacts.CompanyID,
			Company,
			Forename,
			Surname,
			Companies.Country,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.phone) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Phone) AS Phone,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.Mobile) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Mobile) AS Mobile,
			Email
		FROM Contacts
		LEFT JOIN Companies ON Companies.CompanyID = Contacts.CompanyID
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		WHERE	IF(qActive = -1,Contacts.Active = -1,Contacts.Active <> 9999);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_all_devices` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_all_devices`(IN qActive INT)
BEGIN
	SELECT
		`assets`.`AssetID` as `DeviceID`,
		`companies`.`Company`    AS `Company`,
		CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `User`,
		`assets`.`SerialNo`      AS `Serial No`,
		`assets`.`ComputerName`  AS `Computer Name`,
		`equipmentclass`.`Class` AS `Class`,
		assets.PurchaseDate AS `Purchase Date`,
		assets.WarrantyExpiryDate AS `Warranty Expity Date`,
		assets.EstimatedEOLDate AS `Estimated EOL Date`
	FROM `assets`
		LEFT JOIN `contacts` ON (`assets`.`ContactID` = `contacts`.`ContactID`)
		LEFT JOIN `equipmentclass` ON (`assets`.`ClassID` = `equipmentclass`.`ClassID`)
		LEFT JOIN `companies` ON (`assets`.`CompanyID` = `companies`.`CompanyID`)
	WHERE IF(qActive = -1,assets.Active = -1, assets.Active <> 999)
	ORDER BY assets.AssetID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_buildinglog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_buildinglog`()
BEGIN
	SELECT
		UserName AS "Name",
		EventDesc AS "Activity",
		EventDate AS "Date / Time"
	FROM BuildingLog
	ORDER BY UserName, EventDate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_companies` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_companies`(IN strType VARCHAR(32), IN intUserID INT, in qActive INT)
BEGIN	
	CASE lower(strType)
	WHEN 'suspects' THEN
	
	# Return the list of Suspect companies based on Active and User flags
		SELECT
			CompanyID,
			Company,
			Abbreviation AS "Acc Ref",
			Sources.Source,
			Industry.Industry,
			#PostCode,
			#CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
			Companies.City,
			Companies.Country,
			#RecordLastUpdated as 'Last Update',
			Users.Name AS AccMgr,
			Companies.RecordLastUpdateByAccMgr AS 'Last Updated',
			#Companies.LastUpdateDate as 'Last Update',
			AccStatusID
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		LEFT JOIN Industry ON (Industry.IndustryID = Companies.IndustryID)
		LEFT JOIN Sources ON (Sources.SourceID = Companies.SourceID)
		where Suspect = -1 and if(qActive = -1,
			if(intUserID > 0, Companies.Active = -1 and Companies.AccMgrID = intUserID,Companies.Active = -1 ),
			if(intUserID > 0, Companies.AccMgrID = intUserID, Companies.AccMgrID <> -1))
		ORDER BY Company;
   	WHEN "prospects" THEN
	# Return the list of Prospects companies based on Active and User flags
		SELECT
			CompanyID,
			Company,
			Abbreviation AS "Acc Ref",
			Sources.Source,
			Industry.Industry,
			#PostCode,
			#CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
			Companies.City,
			Companies.Country,
			#RecordLastUpdated as 'Last Update',
			Users.Name AS AccMgr,
			Companies.RecordLastUpdateByAccMgr AS 'Last Updated',
			#Companies.LastUpdateDate as 'Last Update',
			AccStatusID
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		LEFT JOIN Industry ON (Industry.IndustryID = Companies.IndustryID)
		LEFT JOIN Sources ON (Sources.SourceID = Companies.SourceID)
		WHERE Prospect = -1 AND IF(qActive = -1,
			IF(intUserID > 0, Companies.Active = -1 AND Companies.AccMgrID = intUserID,Companies.Active = -1 ),
			IF(intUserID > 0, Companies.AccMgrID = intUserID, Companies.AccMgrID <> -1))
		ORDER BY Company;
	
	WHEN "customers" THEN
	# Return the list of Customer companies based on Active and User flags
		SELECT 
			CompanyID,
			Company,
			Abbreviation AS "Acc Ref",
			Sources.Source,
			Industry.Industry,
			#PostCode,
			#CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
			Companies.City,
			Companies.Country,
			#RecordLastUpdated as 'Last Update',
			Users.Name AS AccMgr,
			Companies.RecordLastUpdateByAccMgr AS 'Last Updated',
			#Companies.LastUpdateDate AS 'Last Update',
			AccStatusID
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		LEFT JOIN Industry ON (Industry.IndustryID = Companies.IndustryID)
		LEFT JOIN Sources ON (Sources.SourceID = Companies.SourceID)
		WHERE Customer = -1 AND IF(qActive = -1,
			IF(intUserID > 0, Companies.Active = -1 AND Companies.AccMgrID = intUserID,Companies.Active = -1 ),
			IF(intUserID > 0, Companies.AccMgrID = intUserID, Companies.AccMgrID <> -1))
		ORDER BY Company;
	
	when "suppliers" then
	# Return the list of Supplier companies based on Active and User flags
		SELECT 
			CompanyID,
			Company,
			Industry.Industry,
			Users.Name AS AccMgr,
			PostCode,
			#Phone,
			CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
			Companies.City,
			Companies.Country,
			AccStatusID
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		LEFT JOIN Industry ON (Industry.IndustryID = Companies.IndustryID)
		WHERE Supplier = -1 AND IF(qActive = -1,
			IF(intUserID > 0, Companies.Active = -1 AND Companies.AccMgrID = intUserID,Companies.Active = -1 ),
			IF(intUserID > 0, Companies.AccMgrID = intUserID, Companies.AccMgrID <> -1))
		ORDER BY Company;
		
	ELSE # Assume All Companies
	# Return the list of Supplier companies based on Active and User flags
		SELECT 
			Companies.CompanyID,
			Companies.Company,
			IF(Companies.Suspect = -1, 'Suspect', IF(Companies.Prospect = -1, 'Prospect', IF(Companies.Customer = -1, 'Customer', IF(Companies.Supplier = -1, 'Supplier', 'Other'))) ) AS `Company Type`,
			#IF(Companies.Prospect = -1, 'Prospect', IF(Companies.Customer = -1, 'Customer', IF(Companies.Supplier = -1, 'Supplier', 'Other')) ) AS `Company Type`,
			CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' ')) AS "Country Code",
			Companies.Phone,
			Companies.County,
			Companies.Country,
			(SELECT I.Industry FROM Industry I WHERE I.IndustryID = Companies.IndustryID) AS 'Industry',
		 	#CompanyMarketSector.Sector,
			#Companies.SourceID,
			(SELECT S.Source FROM Sources S WHERE S.SourceID = Companies.SourceID) AS 'Source',
			#RecordLastUpdated as 'Last Update',
			Users.Name AS "AccMgr",
			Companies.RecordLastUpdateByAccMgr AS 'Last Updated',
			#Companies.LastUpdateDate AS "Last Update Date",
			#Companiescustomfields.`Last Contact Date`,
			#Companies.NextActionDate AS "Next Action Date",
			#Companies.NextAction AS "Next Action",
			#Companies.AccMgrID,
			AccStatusID
		FROM companies
		INNER JOIN CompaniesCustomFields ON (CompaniesCustomFields.CompanyID = Companies.CompanyID)
		INNER JOIN Users ON (Users.UserID = Companies.AccMgrID)
		#LEFT JOIN Contacts ON (Contacts.ContactID = Companies.PrimaryContactID)
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		-- inner JOIN CompanyMarketSector ON (CompanyMarketSector.SectorID = Companies.SectorID)
		WHERE IF(qActive = -1,
			IF(intUserID > 0, Companies.Active = -1 AND Companies.AccMgrID = intUserID,Companies.Active = -1 ),
			IF(intUserID > 0, Companies.AccMgrID = intUserID, Companies.AccMgrID <> -1))
		ORDER BY Company;
	END CASE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_company_activities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_company_activities`(IN intCompanyID INT, IN intType INT)
BEGIN
CASE intType
	WHEN 0 THEN
		SELECT
		ActivityID, Activity.ActivityTypeID, ActivityType, Users.Name, ActivityDate,
		CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `FullName`,
		#contacts.Position,
		Activity,
		Location
		FROM Activity
		LEFT JOIN Users ON (Activity.UserID = Users.UserID)
		LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
		LEFT JOIN Contacts ON (contacts.ContactID = Activity.ContactID)
		WHERE  Activity.CompanyID = intCompanyID
		ORDER BY ActivityDate DESC;		
	ELSE
		SELECT
		ActivityID, Activity.ActivityTypeID, ActivityType, Users.Name, ActivityDate,
		CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `FullName`,
		contacts.Position,
		Activity,
		Location
		FROM Activity
		LEFT JOIN Users ON (Activity.UserID = Users.UserID)
		LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
		LEFT JOIN Contacts ON (contacts.ContactID = Activity.ContactID)
		WHERE  Activity.ActivityTypeID = intType AND Activity.CompanyID = intCompanyID
		ORDER BY ActivityDate DESC;
	END CASE;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_company_devices` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_company_devices`(IN intCompanyID INT, IN qActive INT)
BEGIN
	SELECT
		`devices`.`AssetID`,
		CONVERT(`devices`.`AssetID` USING utf8) AS `Device ID`,
		CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `User`,
		`devices`.`SerialNo`      AS `Serial No`,
		`devices`.`ComputerName`  AS `Computer Name`,
		`equipmentclass`.`Class` AS `Class`,
		devices.PurchaseDate AS `Purchase Date`,
		devices.WarrantyExpiryDate AS `Warranty Expiry Date`,
		devices.EstimatedEOLDate AS `Estimated EOL Date`
	FROM `devices`
		LEFT JOIN `contacts` ON (`devices`.`ContactID` = `contacts`.`ContactID`)
		LEFT JOIN `equipmentclass` ON (`devices`.`ClassID` = `equipmentclass`.`ClassID`)
		LEFT JOIN `companies` ON (`devices`.`CompanyID` = `companies`.`CompanyID`)
	WHERE IF(qActive,Companies.CompanyID = intCompanyID AND devices.Active = -1, Companies.CompanyID = intCompanyID)
	ORDER BY devices.AssetID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_contacts`(IN intCompanyID INT, IN qActive INT)
BEGIN
		SELECT
			ContactID,
			Forename,
			Surname,
			LEFT(Contacts.Position,15) as "Position",
			Contacts.Phone,
			Mobile,
			Email
		FROM Contacts
		LEFT JOIN Companies ON Companies.CompanyID = Contacts.CompanyID
		WHERE	IF(qActive = -1,
			IF(intCompanyID > 0, Contacts.CompanyID = intCompanyID AND Contacts.Active = -1, Contacts.Active = -1),
			IF(intCompanyID > 0, Contacts.CompanyID = intCompanyID, Contacts.CompanyID > 0))
		ORDER BY Forename, Surname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_contact_activities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_contact_activities`(IN intCompanyID INT,IN intContactID INT)
BEGIN
	SELECT
		ActivityID,
		Activity.ActivityTypeID,
		ActivityType,
		Users.Name,
		ActivityDate,
		Activity,
		Location
	FROM Activity
	LEFT JOIN Users ON (Activity.UserID = Users.UserID)
	LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
	WHERE  CompanyID = intCompanyID AND Activity.ContactID = intContactID
	ORDER BY ActivityDate DESC;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_contact_activity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_contact_activity`(IN intCompanyID INT,IN intContactID INT)
BEGIN
	SELECT
	ActivityID, ActivityType, Users.Name, ActivityDate, Activity, Location
	FROM Activity
	LEFT JOIN Users ON (Activity.UserID = Users.UserID)
	LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
	WHERE  CompanyID = intCompanyID AND Activity.ContactID = intContactID
	ORDER BY ActivityDate DESC;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_customers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_customers`(IN qActive INT)
BEGIN
	SELECT 
		CompanyID,
		Company,
		Abbreviation AS "Acc Ref",
		Users.Name AS AccMgr,
		#Phone,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
		Companies.City,
		PostCode,
		Companies.NextActionDate AS "Next Action Date",
		Companies.LastUpdateDate AS 'Last Update',
		AccStatusID
	FROM companies
	LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
	LEFT JOIN Countries ON (Countries.Country = Companies.Country)
	WHERE IF(qActive = -1,Customer = -1 AND companies.Active = -1, Customer = -1)
	ORDER BY Company;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_customer_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_customer_contacts`(IN qActive INT)
BEGIN
		SELECT
			ContactID,
			#Contacts.CompanyID,
			Company,
			Forename,
			Surname,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.phone) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Phone) AS Phone,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.Mobile) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Mobile) AS Mobile,
			Email
		FROM Contacts
		LEFT JOIN Companies ON Companies.CompanyID = Contacts.CompanyID
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		WHERE	IF(qActive = -1,Companies.Customer = -1 AND Contacts.Active = -1, Companies.Customer = -1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_customer_contracts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_customer_contracts`(IN qActive INT)
BEGIN
	SELECT 
		Projects.CompanyID,
		Companies.Company,
		Companies.AccStatusID,
		GROUP_CONCAT(ProjectClass.Classification  ORDER BY ProjectClass.Classification ASC SEPARATOR ' | ') as "Purchased Services"
		
	FROM Projects
	LEFT JOIN Companies ON (Companies.companyID = Projects.CompanyID)
	LEFT JOIN ProjectClass ON (ProjectClass.ClassID = Projects.ClassID)
	WHERE IF(qActive = -1,Companies.Customer = -1 AND Companies.Active = -1 AND Projects.Status < 90, Companies.Customer = -1 AND Projects.Status < 90)  
	Group By Projects.CompanyID;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_devices` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`elite`@`%` PROCEDURE `sp_list_devices`(IN qActive INT)
BEGIN	SELECT		`devices`.`AssetID`,		CONVERT(`devices`.`AssetID` USING utf8) AS `Device ID`,		companies.Company,		CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `User`,		`devices`.`SerialNo`      AS `Serial No`,		`devices`.`ComputerName`  AS `Computer Name`,		`equipmentclass`.`Class` AS `Class`,		devices.PurchaseDate AS `Purchase Date`,		devices.WarrantyExpiryDate AS `Warranty Expiry Date`,		devices.EstimatedEOLDate AS `Estimated EOL Date`	FROM `devices`		LEFT JOIN `contacts` ON (`devices`.`ContactID` = `contacts`.`ContactID`)		LEFT JOIN `equipmentclass` ON (`devices`.`ClassID` = `equipmentclass`.`ClassID`)		LEFT JOIN `companies` ON (`devices`.`CompanyID` = `companies`.`CompanyID`)	WHERE IF(qActive = -1,devices.Active = -1, devices.Active <> 999)	ORDER BY devices.AssetID;END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_device_software` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_device_software`(IN NotUsed INT)
BEGIN
	SELECT
		Assets.AssetID,
		Assets.AssetID AS `Device ID`,
		Companies.Company as `Company`,
		Assets.ComputerName as `Computer Name`,
		Assets.Make as `Make`,
		Assets.Model as `Model`,
		Software.Title as `Title`
	FROM `software`
	LEFT JOIN `assets`   ON `software`.`DeviceID` = `assets`.`AssetID`
	LEFT JOIN `companies` ON (`assets`.`CompanyID` = `companies`.`CompanyID`);
	#WHERE `products`.`ProdCatID` = `productcategories`.`ProdCatID`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_employees` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_employees`(IN qActive INT)
BEGIN
	SELECT
		EmpID,
		Forename,
		Surname,
		OfficePhone as "Phone",
		PhoneExt as "Extension",
		if(instr(Mobile,"x") = 1,"Ex Directory",Mobile) as "Mobile",		
		IF(INSTR(HomePhone,"x") = 1,"Ex Directory",HomePhone) As "Home Phone",		
		JoiningDate as "Joining Date"
	FROM Employees
	WHERE	if(qActive = 1, Active = 1, Active <> 999)
	ORDER BY Surname, Forename;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_Opportunities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_Opportunities`(IN intStatusID INT)
BEGIN
	SELECT
		projects.ProjectID,
		projects.Description,
		projects.CompanyID,
		companies.Company,
		users.name as AssignedTo,
		opportunitystatus.OppStatusID,
		opportunitystatus.OppStatus,
		opportunitystages.OppStageID,
		opportunitystages.OppStage,
		projects.ProjectValue,
		projects.OppProbability
	FROM projects
	LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
	LEFT JOIN opportunitystatus ON (projects.OppStatusID = opportunitystatus.OppStatusID)
	LEFT JOIN opportunitystages ON (projects.OppStageID = opportunitystages.OppStageID)
	left JOIN users on (projects.AssignedTo = users.UserID)
	WHERE IF(intStatusID = 10, projects.CompanyID = companies.CompanyID AND projects.Type = 5 AND projects.OppStatusID = intStatusID,
				   projects.CompanyID = companies.CompanyID AND projects.Type = 5 AND projects.OppStatusID > 0);
	# Project Type 5 = Opportunity. This value will never change
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_procurement_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_procurement_items`()
BEGIN
	SELECT
		items.ItemID,
		CAST(items.ProjectID AS CHAR) AS "Project #",
		companies.Company,
		projects.Description AS "Project Description",
		items.Description AS "Item Description",
		items.Quantity,
		items.Cost
	FROM items
	LEFT JOIN projects ON (projects.ProjectID = items.ProjectID)
	LEFT JOIN companies ON (Companies.CompanyID = Projects.CompanyID)
	# Only show records with a Project type of > 10 in order to avoid opps as they are not confirmed yet
	WHERE (POID IS NULL) AND projects.Type >= 10
	ORDER BY items.ProjectID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_products` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_products`(IN qActive INT)
BEGIN
	SELECT
		`products`.`ProdID`            AS `ProdID`,
		`productcategories`.`CatTitle` AS `Category`,
		`products`.`ProdCode`          AS `Product Code`,
		`products`.`ProdTitle`         AS `Title`,
		CONCAT('£', FORMAT(`products`.`ProdCost`, 2)) AS `Cost`,
		CONCAT('£', format(`products`.`ProdRrpPrice`, 2)) AS `Rrp Price`,
		CONCAT('£', FORMAT(`products`.`ProdMinPrice`, 2)) AS `Min Price`
	FROM `products`
	LEFT JOIN `productcategories`   ON `products`.`ProdCatID` = `productcategories`.`ProdCatID`
	WHERE `products`.`ProdCatID` = `productcategories`.`ProdCatID`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_projects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_projects`(IN intProjTypeID INT, qAllRecords INT)
BEGIN
	CASE intProjTypeID
		WHEN 5 THEN # Project Type = Opportunity
			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				projects.Description,
				companies.Company,
				users.name AS `Acc Manager`,
				projectstatus.Status,
				#opportunitystatus.OppStatusID,
				#opportunitystatus.OppStatus,
				projects.ProjectValue,
				projects.OppProbability,
				projects.OppEstCloseDate
			FROM projects
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			#LEFT JOIN opportunitystages ON (projects.OppStageID = opportunitystages.OppStageID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, (projects.status IS NULL OR projects.Status < 90) AND projects.Type = intProjTypeID);
		
		WHEN 10 THEN # Project Type = Standard Project
			SELECT
				projects.ProjectID AS ProjectID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				`projects`.`CompanyID`          AS `CompanyID`,
				`companies`.`Company`           AS `Company`,
				`projects`.`Description`        AS `Description`,
				 projectstatus.Status,
				 projects.AuthorisationPO as `PO Number`,
				users.name AS `Acc Manager`,
				#CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `Acc Manager`,
				`projects`.`PlannedEndDate`     AS `PlannedEndDate`,
				`projects`.`ProjectValue`       AS `ProjectValue`,
				projects.OppEstCloseDate
			FROM projects
			LEFT JOIN companies ON (`projects`.`CompanyID` = `companies`.`CompanyID`)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		
		WHEN 15 THEN #Project Type = Print Samples
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.Chargeable,
				projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 20 THEN #Project Type = RMA
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.Chargeable
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 25 THEN
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 30 THEN #Project Type = Print Samples US
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.Chargeable,
				projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 35 THEN #Project Type = Tech Support
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		ELSE
			BEGIN
			END;    
	END CASE;    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_projects_by_company` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_projects_by_company`(IN intProjTypeID INT, IN intCompanyID INT, qAllRecords INT)
BEGIN
	CASE intProjTypeID
		WHEN 5 THEN # Project Type = Opportunity
			SELECT
				projects.ProjectID,
				projects.ProjectID AS `Ref #`,
				companies.Company,
				projects.Description,
				projectstatus.Status,
				Users.Name AS `Acc Manager`,
				projects.PlannedEndDate AS `Planned End Date`,
				projects.ProjectValue
			FROM projects
			JOIN companies ON (`projects`.`CompanyID` = `companies`.`CompanyID`)
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN Users ON (projects.AccMgrID = Users.UserID)
			LEFT JOIN projectmodules ON (projectmodules.modID = projects.Type)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID AND projects.CompanyID = intCompanyID, projects.Type = intProjTypeID AND projects.Status < 90 AND projects.CompanyID = intCompanyID);
		
		ELSE #All other project types
			SELECT
				projects.ProjectID,
				projects.ProjectID AS `Ref #`,
				projectmodules.ModTitle AS `Type`,
				companies.Company,
				projects.Description,
				projectstatus.Status,
				Users.Name AS `Acc Manager`,
				projects.PlannedEndDate AS `Planned End Date`,
				projects.ProjectValue
			FROM projects
			JOIN companies ON (`projects`.`CompanyID` = `companies`.`CompanyID`)
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN Users ON (projects.AccMgrID = Users.UserID)
			LEFT JOIN projectmodules ON (projectmodules.modID = projects.Type)
			WHERE IF(qAllRecords = -1, projects.Type <> 5 AND projects.CompanyID = intCompanyID, projects.Type <> 5 AND projects.Status < 90 AND projects.CompanyID = intCompanyID);	END CASE;    
			# Ignore all project types of 5 as they are opportunities
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_projects_by_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_projects_by_type`(IN intProjTypeID INT, qAllRecords INT, qProspects INT, qCustomers INT)
BEGIN
	CASE intProjTypeID
		WHEN 5 THEN # Project Type = Opportunity
			SELECT
				projects.ProjectID,
				projects.CompanyID,
				projects.Description,
				companies.Company,
				projectstatus.Status,
				#opportunitystatus.OppStatusID,
				#opportunitystatus.OppStatus,
				projects.ProjectValue,
				projects.OppProbability,
				projects.OppEstCloseDate,
                users.name As "Next Action By",
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				users.name AS `Acc Manager`
			FROM projects
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			#LEFT JOIN opportunitystages ON (projects.OppStageID = opportunitystages.OppStageID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			#LEFT JOIN sources ON projects.SourceID = sources.SourceID
			WHERE	(IF(qProspects = -1,companies.Prospect = -1,companies.Prospect = 999) OR
				IF(qCustomers = -1,companies.Customer = -1,companies.Customer = 999)) AND
				IF(qAllRecords = -1, projects.Type = intProjTypeID, (projects.status IS NULL OR projects.Status < 90) AND projects.Type = intProjTypeID);
		
		WHEN 10 THEN # Project Type = Standard Project
			SELECT
				projects.ProjectID AS ProjectID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				`projects`.`CompanyID`          AS `CompanyID`,
				`companies`.`Company`           AS `Company`,
				`projects`.`Description`        AS `Description`,
				 projectstatus.Status,
				 projects.AuthorisationPO AS `PO Number`,
				users.name AS `Acc Manager`,
				#CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `Acc Manager`,
				`projects`.`PlannedEndDate`     AS `PlannedEndDate`,
				`projects`.`ProjectValue`       AS `ProjectValue`,
				projects.OppEstCloseDate
			FROM projects
			LEFT JOIN companies ON (`projects`.`CompanyID` = `companies`.`CompanyID`)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			#LEFT JOIN sources ON projects.SourceID = sources.SourceID
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		
		WHEN 15 THEN #Project Type = Print Samples
    			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				#projectpriorities.Priority,
				projects.Description,
				#projectstatus.Status,
				users.name AS `Acc Manager`,
				(SELECT U.Name FROM Users U WHERE projects.NextActionByID = U.UserID) AS 'Next Action By',
				projectscustomfields.`Priority`,
				projectscustomfields.`Comment`,
				projectscustomfields.`Information Date`,
				projectscustomfields.`Material Date`,
				projectscustomfields.`Completed Date`
				#projects.actualstartdate AS `Start Date`,
				#projects.Chargeable,
				#projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			LEFT JOIN projectscustomfields ON (projects.ProjectID = projectscustomfields.ProjectID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		
		
		WHEN 20 THEN #Project Type = RMA
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projects.Description,
				projectstatus.Status,
				users.name AS `Next Action By`,
				projects.OppEstCloseDate
				
				#projectpriorities.Priority,
				#users.name AS `Acc Manager`,
				#projects.actualstartdate AS `Start Date`,
				#projects.Chargeable
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.NextActionByID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 25 THEN
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 30 THEN #Project Type = Print Samples (US)
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.Chargeable,
				projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 35 THEN #Project Type = Tech Support
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 40 THEN #Project Type = Contract
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectclass.Classification,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.projectvalue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			LEFT JOIN projectclass ON (projects.ClassID = projectclass.ClassID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		ELSE
			BEGIN
			END;    
	END CASE;    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_projects_by_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_projects_by_user`(IN intProjTypeID INT, intUserID INT, qProspects INT, qCustomers INT)
BEGIN
	CASE intProjTypeID
		WHEN 5 THEN # Project Type = Opportunity
			SELECT
				P.ProjectID,
				P.CompanyID,
				CAST(P.ProjectID AS CHAR) AS "Ref #",
				C.Company,
				P.Description,
				(SELECT PS.Status FROM ProjectStatus PS WHERE P.Type = PS.TypeID AND P.Status = PS.StatusID) AS 'Status',
				P.ProjectValue,
				P.OppProbability,
				P.RecordCreationDate AS "Creation Date",
				P.OppEstCloseDate
			FROM projects AS P
			LEFT JOIN companies C ON (P.CompanyID = C.CompanyID)
			WHERE	(IF(qProspects = -1,C.Prospect = -1,C.Prospect = 999) OR
				IF(qCustomers = -1,C.Customer = -1,C.Customer = 999)) AND
				P.AccMgrID = intUserID AND
				(P.status IS NULL OR P.Status < 90) AND
				 P.Type = intProjTypeID;
		
		WHEN 10 THEN # Project Type = Standard Project
			SELECT
				P.ProjectID,
				P.CompanyID,
				CAST(P.ProjectID AS CHAR) AS "Ref #",
				C.Company,
				P.Description,
				(SELECT PS.Status FROM ProjectStatus PS WHERE P.Type = PS.TypeID AND P.Status = PS.StatusID) AS 'Status',
				P.ProjectValue,
				DATEDIFF(NOW(),P.AuthorisationToProceedDate) AS "Age (days)",
				P.OppEstCloseDate
			FROM projects AS P
			LEFT JOIN companies C ON (P.CompanyID = C.CompanyID)
			WHERE	P.AccMgrID = intUserID AND
				(P.status IS NULL OR P.Status < 90) AND
				 P.Type = intProjTypeID;
		WHEN 15 THEN #Project Type = Print Samples
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.Chargeable,
				projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 20 THEN #Project Type = RMA
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.Chargeable
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 25 THEN
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.ProjectValue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 35 THEN #Project Type = Tech Support
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectpriorities.Priority,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		WHEN 40 THEN #Project Type = Contract
     			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projectclass.Classification,
				projects.Description,
				projectstatus.Status,
				users.name AS `Acc Manager`,
				projects.actualstartdate AS `Start Date`,
				projects.projectvalue
			FROM projects
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectpriorities ON (projects.PriorityID = projectpriorities.PriorityID)
			LEFT JOIN projectclass ON (projects.ClassID = projectclass.ClassID)
			WHERE IF(qAllRecords = -1, projects.Type = intProjTypeID, projects.Status < 90 AND projects.Type = intProjTypeID);
		ELSE
			SELECT
				projects.ProjectID,
				projects.CompanyID,
				CAST(projects.ProjectID AS CHAR) AS "Ref #",
				companies.Company,
				projects.Description,
				users.name AS `Acc Manager`,
				projectstatus.Status,
				#opportunitystatus.OppStatusID,
				#opportunitystatus.OppStatus,
				projects.ProjectValue,
				projects.OppProbability,
				projects.RecordCreationDate AS "Creation Date",
				#projects.PlannedEndDate AS "Est. Close Date",
				projects.OppEstCloseDate
				#sources.Source
			FROM projects
			LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
			#LEFT JOIN opportunitystages ON (projects.OppStageID = opportunitystages.OppStageID)
			LEFT JOIN users ON (projects.AccMgrID = users.UserID)
			LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
			LEFT JOIN sources ON projects.SourceID = sources.SourceID;
	END CASE;    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_project_activities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_project_activities`(IN intProjectID INT)
BEGIN
	SELECT
	ActivityID, Activity.ActivityTypeID, ActivityType, Users.Name, ActivityDate, Activity, Location, EmailID
	FROM Activity
	LEFT JOIN Users ON (Activity.UserID = Users.UserID)
	LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
	WHERE  ProjectID = intProjectID
	ORDER BY ActivityDate DESC;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_project_tasks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_project_tasks`(IN intProjectID INT, in qReturnIncompleteTasksOnly int)
BEGIN
		SELECT
			*
		FROM Tasks T
		WHERE	T.ProjectID = intProjectID and IF(qReturnIncompleteTasksOnly = true,T.PercentageComplete < 100, 1=1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_prospects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_prospects`(IN qActive INT)
BEGIN
		SELECT
			CompanyID,
			Company,
			Abbreviation AS "Acc Ref",
			Users.Name as AccMgr,
			PostCode,
			#Phone,
			CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
			Companies.City,
			Companies.LastUpdateDate AS 'Last Update',
			Companies.RecordCreationDate AS 'Creation Date',
			AccStatusID
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		WHERE IF(qActive = -1,Prospect = -1 AND companies.Active = -1, Prospect = -1)
		ORDER BY Company;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_prospect_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_prospect_contacts`(IN qActive INT)
BEGIN
		SELECT
			ContactID,
			#Contacts.CompanyID,
			Company,
			Forename,
			Surname,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.phone) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Phone) AS Phone,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.Mobile) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Mobile) AS Mobile,
			Email
		FROM Contacts
		LEFT JOIN Companies ON Companies.CompanyID = Contacts.CompanyID
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		WHERE	IF(qActive = -1,Companies.Prospect = -1 AND Contacts.Active = -1, Companies.Prospect = -1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_purchase_orders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_purchase_orders`(IN qSupplier INT, IN intCompanyID INT, IN qActive INT)
BEGIN
	SELECT
	#	CONVERT(pos.POID USING utf8) AS `PO #`,
		pos.POID AS `PO #`,
		companies.Company AS `Supplier`,
		pos.SupplierRef AS `Supplier Reference`,
		pos.PurchaseDate AS `Purchase Date`,
		`postatus`.`POStatus` AS `Status`,
		Users.Name AS "Requestor"
	FROM pos
		LEFT JOIN companies ON ((pos.SupplierID = companies.CompanyID))
		LEFT JOIN users ON pos.RequestorID = users.UserID
		LEFT JOIN `postatus` ON ((pos.POStatus = postatus.POStatusID))
	WHERE IF(qActive,POStatusID < 90, POStatusID < 999)
	ORDER BY pos.POID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_purchase_order_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_purchase_order_items`(IN qSupplier INT, IN intCompanyID INT, IN qActive INT)
BEGIN
	SELECT
		items.POID,
		items.ProjectID,
		companies.Company AS "Customer",
		items.Description,
		items.Part_No,
		items.Quantity,
		items.Cost,
		items.RTA,
		items.ETA,
		items.Received
		
	FROM items
		LEFT JOIN pos ON (pos.POID = items.POID)
		LEFT JOIN projects ON (projects.ProjectID = items.ProjectID)
		LEFT JOIN companies ON (companies.CompanyID = projects.CompanyID)
	WHERE IF(qActive,items.Received = FALSE, items.Received <> 999)
	ORDER BY items.POID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_requests` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_requests`(IN qActive INT)
BEGIN
	SELECT 
		ReqID,
		Users.Name,
		ReqDate,
		Request
	FROM Requests
	LEFT JOIN Users ON (Users.UserID = Requests.UserID)
	WHERE IF(qActive = -1,Active = 1, ReqID > 0)
	ORDER BY ReqDate;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_software` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_software`(IN NotUsed INT)
BEGIN
	SELECT
		Software.DeviceID as "SID",
		Assets.ComputerName as "Computer Name",
		Assets.Make,
		Assets.Model,
		Software.Title,
		Software.SerialNo as "Serial No"
	FROM `software`
	LEFT JOIN `assets`   ON `software`.`DeviceID` = `assets`.`AssetID`;
	#WHERE `products`.`ProdCatID` = `productcategories`.`ProdCatID`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_suppliers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_suppliers`(IN qActive INT)
BEGIN
	SELECT 
		CompanyID,
		Company,
		Users.Name AS AccMgr,
		PostCode,
		#Phone,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
		Companies.City,
		Companies.Country,
		AccStatusID
	FROM companies
	LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
	LEFT JOIN Countries ON (Countries.Country = Companies.Country)
	WHERE IF(qActive = -1,Supplier = -1 AND companies.Active = -1, Supplier = -1)
	ORDER BY Company;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_Supplier_Contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_Supplier_Contacts`(IN qActive INT)
BEGIN
		SELECT
			ContactID,
			Company,
			Forename,
			Surname,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.phone) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Phone) AS Phone,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.Mobile) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Mobile) AS Mobile,
			Email
		FROM Contacts
		LEFT JOIN Companies ON Companies.CompanyID = Contacts.CompanyID
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		WHERE	IF(qActive = -1,Companies.Supplier = -1 AND Contacts.Active = -1, Companies.Supplier = -1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_supplier_contracts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_supplier_contracts`(IN qActive INT)
BEGIN
	SELECT 
		Cont.SupplierContractID,
		CAST(Cont.SupplierContractID AS CHAR) as "Ref #",
		Cust.Company as "Customer",
		Supp.Company AS "Supplier",
		Cat.Category,
		Cont.Description,
		Cont.RenewalDate as "Renewal Date"
	FROM SupplierContracts Cont
	left join Companies Cust ON (Cust.CompanyID = Cont.CustomerID)
	LEFT JOIN Companies Supp ON (Supp.CompanyID = Cont.SupplierID)
	left join SupplierContractCategories Cat ON (Cat.CategoryID = Cont.CategoryID)
	WHERE IF(qActive = -1,Cont.Active = -1 or Cont.Active = 1, qActive > -999)
	ORDER BY Cont.SupplierContractID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_suspects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_suspects`(IN qActive INT)
BEGIN
	SELECT
		Companies.CompanyID,
		Company,
		CONCAT(Contacts.Forename,' ', Contacts.Surname) AS 'Primary Contact',
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Companies.Phone) AS 'Phone',
		Companies.City,
		Companies.PostCode AS 'Post Code',
		Users.Name AS 'Manager',
		Companies.RecordCreationDate AS 'Creation Date',
		AccStatusID
	FROM companies
	LEFT JOIN Contacts ON (Contacts.ContactID = Companies.PrimaryContactID)
	LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
	LEFT JOIN Countries ON (Countries.Country = Companies.Country)
	WHERE IF(qActive = -1,Suspect = -1 AND Companies.Active = -1, Suspect = -1)
	ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_Suspect_Contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_Suspect_Contacts`(IN qActive INT)
BEGIN
		SELECT
			ContactID,
			Company,
			Forename,
			Surname,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.phone) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Phone) AS Phone,
			CONCAT(IF(Countries.Code = 0, '', '+'),IF(LENGTH(contacts.Mobile) > 0,Countries.Code,""),IF(Countries.Code = 0, '', ' '),Contacts.Mobile) AS Mobile,
			Email
		FROM Contacts
		LEFT JOIN Companies ON Companies.CompanyID = Contacts.CompanyID
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		WHERE	IF(qActive = -1,Companies.Suspect = -1 AND Contacts.Active = -1, Companies.Suspect = -1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_systems` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_systems`(IN qActive INT)
BEGIN
	SELECT
		Systems.SystemID,
		SystemClasses.Classification,
		companies.Company AS "Customer",
		#CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS "Operator",
		SystemComponents.Component,
		SystemComponents.Model,
		Serial_No,
		Additional_Info
	FROM Systems
		LEFT JOIN Companies ON (Systems.CompanyID = Companies.CompanyID)
		LEFT JOIN SystemComponents ON (Systems.SystemID = SystemComponents.SystemID)
		LEFT JOIN SystemClasses ON SystemClasses.SystemClassID = Systems.SystemClassID
		LEFT JOIN SystemComponentCategories ON (SystemComponentCategories.CategoryID = SystemComponents.CategoryID)
	WHERE IF(qActive = -1,Systems.Active = -1, Systems.Active <> 999)
	ORDER BY Systems.SystemID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_system_components` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_system_components`(IN qActive INT)
BEGIN
	SELECT
		Systems.SystemID,
		SystemClassification.Classification,
		companies.Company as "Customer",
		#CONCAT(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS "Operator",
		SystemComponents.Make,
		SystemComponents.Model,
		Serial_No,
		Computer_Name
	FROM SystemComponents
		left join Systems on SystemComponents.SystemID = Systems.SystemID
		left join SystemClassification on SystemClassification.SystemClassID = Systems.SystemClassID
		#LEFT JOIN `contacts` ON (`SystemComponents`.`ContactID` = `contacts`.`ContactID`)
		LEFT JOIN `companies` ON (Systems.CompanyID = Companies.CompanyID)
	WHERE IF(qActive = -1,SystemComponents.Active = -1, SystemComponents.Active <> 999)
	ORDER BY SystemComponents.SystemID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_timesheets` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_timesheets`(IN intEmpID INT, IN intStatusID INT)
BEGIN
	SELECT
		TimesheetID,
		Users.Name,
		TimesheetStatus,
		StartDate,
		Notes
	FROM Timesheets
	LEFT JOIN Users ON (Users.EmployeeID = Timesheets.EmpID)
	LEFT JOIN TimesheetStatus ON (TimesheetStatus.TimesheetStatusID = Timesheets.Status)
	WHERE
		IF(intEmpID > 0,Timesheets.EmpID = intEmpID, Timesheets.EmpID > 0)
		AND Timesheets.Status <= intStatusID
	ORDER BY StartDate DESC;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_timesheets_booked_time` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_timesheets_booked_time`(IN ProjID INT)
BEGIN
	SELECT
		(SELECT TS.StartDate FROM timesheets TS WHERE TS.TimesheetID = TSE.TimesheetID) AS 'Date',		
		(SELECT U.UserName FROM Users U WHERE U.UserID = TSE.UserID) AS 'Name',
		TSE.`MondayHours`    AS `Mon`,
		TSE.`TuesdayHours`   AS `Tue`,
		TSE.`WednesdayHours` AS `Wed`,
		TSE.`ThursdayHours`  AS `Thu`,
		TSE.`FridayHours`    AS `Fri`,
		TSE.`SaturdayHours`  AS `Sat`,
		TSE.`SundayHours`    AS `Sun`
	FROM timesheetentries TSE
	WHERE TSE.ProjectID = ProjID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_project_activity_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_project_activity_list`(IN intProjectID INT)
BEGIN
	SELECT
	ActivityID, ActivityType, Users.Name, ActivityDate, Activity, Location
	FROM Activity
	LEFT JOIN Users ON (Activity.UserID = Users.UserID)
	LEFT JOIN ActivityType ON (Activity.ActivityTypeID = ActivityType.ActivityTypeID)
	WHERE  ProjectID = intProjectID
	ORDER BY ActivityDate DESC;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_companies_activity_report` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_companies_activity_report`(IN qActive INT)
BEGIN
	SELECT
		Company,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
		IF(Companies.Customer = -1,"Yes","No") as "Customer",
		users.name AS "Account Manager",
		Companies.Country,
		#Industry,
		#Sector,
		Sources.Source as "Source",
		LastUpdateDate AS "Last Update",
		NextActionDate AS "Next Action Date",
		NextAction as "Next Planned Action"
			
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		LEFT JOIN Industry ON (Industry.IndustryID = Companies.IndustryID)
		LEFT JOIN CompanyMarketSector ON (CompanyMarketSector.SectorID = Companies.SectorID)
		left join Sources ON (Sources.SourceID = Companies.SourceID)
		LEFT JOIN Countries ON (Countries.Country = Companies.Country)
		WHERE IF(qActive = -1,(Prospect = -1 or Customer = -1) AND Companies.Active = -1, Prospect = -1 OR Customer = -1)
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_companies_prospects_and_customers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_companies_prospects_and_customers`(IN qActive INT)
BEGIN
	SELECT
		Company,
		NextActionDate as "Lead Date",
		users.name as "Name",
		Companies.Country,
		Sources.Source,
		NextAction as "Notes"
			
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		left join Sources ON (Sources.SourceID = Companies.SourceID)
		
		WHERE IF(qActive = -1,(Prospect = -1 or Customer = -1) AND Companies.Active = -1, Prospect = -1 OR Customer = -1)
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_customer_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_customer_contacts`(IN qActive INT)
BEGIN
	SELECT
		Users.Name AS "Account Manager",
		Title,
		Forename,
		Surname,
		Contacts.Position,
		Companies.Company,
		Companies.Address,
		Companies.City,
		Companies.County,
		Companies.PostCode,
		Countries.Country,
		Email
		
	FROM Contacts
	LEFT JOIN Companies ON (Companies.CompanyID = Contacts.CompanyID)
	left join Countries ON (Countries.Country = Companies.Country)
	LEFT JOIN Users ON (Companies.AccMgrID = Users.UserID)
	WHERE IF(qActive = -1,Customer = -1 AND Companies.Active = -1 and Contacts.Active = -1, Customer = -1 AND Companies.Active = -1 and Contacts.Active <> 999)
	ORDER BY Surname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_expired_nda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_expired_nda`(IN qActive INT)
BEGIN
	SELECT
		Company,
		concat(contacts.Forename," ",contacts.Surname) as "Primary Contact",
		NDA1ExpiryDate as "KM DNA Expiry Date",
		NDA2ExpiryDate AS "IIJ DNA Expiry Date"
		
		#users.name as "Name",
		#Companies.Country,
		#Sources.Source,
		#NextAction as "Notes"
			
		FROM companies
		left join contacts on Contacts.ContactID = Companies.PrimaryContactID
		#LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		#left join Sources ON (Sources.SourceID = Companies.SourceID)
		
		WHERE IF(qActive = -1,(Prospect = -1 or Customer = -1) AND Companies.Active = -1, Prospect = -1 OR Customer = -1) and 
			(NDA1ExpiryDate < now() or NDA2ExpiryDate < now())
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_leads` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_leads`(IN qActive INT)
BEGIN
	SELECT
		Company,
		Users.Name as "Account Manager",
		Country,
		Sources.Source
			
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		LEFT JOIN Sources ON (Sources.SourceID = Companies.SourceID)
		WHERE IF(qActive = -1,Prospect = -1 AND Companies.Active = -1, Prospect = -1)
		ORDER BY Company;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_NDA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_NDA`(IN qActive INT)
BEGIN
	SELECT
		Company,
		NDA2.NdaDesc AS "KM NDA Status",
		NDA2StatusDate AS "KM CDA Date",
		NDA2ExpiryDate AS "KM NDA Expiry Date",
		NDA1.NdaDesc AS "IIJ NDA Status",
		NDA1StatusDate AS "IIJ CDA Date",
		NDA1ExpiryDate AS "IIJ NDA Expiry Date"
						
		FROM Companies
		LEFT JOIN Companynda NDA1 ON (Companies.NDA1ID = NDA1.NdaValue AND NDA1.NdaType = "NDA1")
		LEFT JOIN Companynda NDA2 ON (Companies.NDA2ID = NDA2.NdaValue AND NDA2.NdaType = "NDA2")
		WHERE
			(Customer = -1 OR Prospect = -1) AND
			(NOT ISNULL(NDA1.NdaDesc) OR NOT ISNULL(NDA2.NdaDesc)) AND
			IF(qActive = -1, Companies.Active = -1, Companies.Active <> 999)
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_opportunities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_opportunities`(IN qActive INT)
BEGIN
	SELECT
		if(comp.Prospect = -1,"Yes","No") AS "Prospect",
		if(comp.Customer = -1,"Yes","No") AS "Customer",
		projects.ProjectID as "Ref #",
		projects.Description,
		Comp.Company,
		Comp.Phone,
		Comp.City,
		Comp.Country,
		Comp.PostCode,
		Comp.CompanyEmail,
		Usr.name as "Acc Mgr",
		projects.ProjectValue,
		projects.OppProbability,
		Concat(Src.Source, " ") as "Source",
		Projects.OppEstCloseDate as "Last Contact Date",
		Concat(Cont.Forename," ", Cont.Surname) as "Contact",
		Projects.Notes as "Details"
		
	FROM projects
	LEFT JOIN companies Comp ON (projects.CompanyID = Comp.CompanyID)
	LEFT JOIN Sources Src ON (projects.SourceID = Src.SourceID)
	left JOIN users Usr on (projects.AccMgrID = Usr.UserID)
	left join Contacts Cont on (projects.contactID = Cont.ContactID)
	WHERE IF(qActive = -1, projects.Type = 5 AND projects.Status < 80,
				   projects.Type = 5 AND projects.Status > 0);
	# Project Type 5 = Opportunity. This value will never change
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_projects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_projects`(qAllRecords INT)
BEGIN
	SELECT
		projects.ProjectID AS `Ref #`,
		configmodules.Itemdesc AS `Type`,
		companies.Company,
		projects.Description,
		users.name AS "Manager",
		projects.ProjectValue AS "Value",
		projects.OppProbability AS "Probability",
		(projects.ProjectValue * projects.OppProbability) / 100 AS "Weighted Value",
		OppEstCloseDate as "Estimated Close"
	FROM projects
	LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
	LEFT JOIN users ON (projects.AccMgrID = users.UserID)
	LEFT JOIN configmodules ON (configmodules.ItemName = "Projects" AND configmodules.ItemValue = projects.Type)
	WHERE IF(qAllRecords = -1, (projects.status is null or projects.Status < 90) AND projects.Type <> 999, projects.Type <> 999);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_prospect_and_customer_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_prospect_and_customer_contacts`(IN qActive INT)
BEGIN
	SELECT
		Users.Name AS "Account Manager",
		Title,
		Forename,
		Surname,
		Contacts.Position,
		Companies.Company,
		Sources.Source,
		Industry.Industry,
		CompanyMarketSector.Sector,
		Companies.Address,
		Companies.City,
		Companies.County,
		Companies.PostCode,
		Countries.Country,
		Email
		
	FROM Contacts
	LEFT JOIN Companies ON (Companies.CompanyID = Contacts.CompanyID)
	left join Countries ON (Countries.Country = Companies.Country)
	LEFT JOIN Users ON (Companies.AccMgrID = Users.UserID)
	LEFT JOIN Industry ON (Companies.IndustryID = Industry.IndustryID)
	LEFT JOIN Sources ON (Companies.SourceID = Sources.SourceID)
	LEFT JOIN CompanyMarketSector ON (Companies.SectorID = CompanyMarketSector.SectorID)
	WHERE IF(qActive = -1,(Customer = -1 OR Prospect = -1) AND
	                      Companies.Active = -1 and
	                      Contacts.Active = -1,
	                     (Customer = -1 OR Prospect = -1) AND
	                      Companies.Active = -1 and
	                      Contacts.Active <> 999)
	ORDER BY Surname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_prospect_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_prospect_contacts`(IN qActive INT)
BEGIN
	SELECT
		Users.Name as "Account Manager",
		Contacts.Title,
		Contacts.Forename,
		Contacts.Surname,
		Contacts.Position,
		Companies.Company,
		Companies.Address,
		Companies.City,
		Companies.County,
		Companies.PostCode,
		Countries.Country,
		Contacts.Email
		
	FROM Contacts
	LEFT JOIN Companies ON (Companies.CompanyID = Contacts.CompanyID)
	left join Countries ON (Countries.Country = Companies.Country)
	LEFT JOIN Users ON (Companies.AccMgrID = Users.UserID)
	WHERE IF(qActive = -1,prospect = -1 AND Companies.Active = -1 and Contacts.Active = -1, prospect = -1 AND Companies.Active = -1 and Contacts.Active <> 999)
	ORDER BY Surname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_quick_contact_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_quick_contact_list`(IN qActive INT)
BEGIN
	SELECT
		Title,
		Forename,
		Surname,
		Company,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Contacts.Phone) AS Phone,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Mobile) AS Mobile,
		Email
		
	FROM Contacts
	LEFT JOIN Companies ON (Companies.CompanyID = Contacts.CompanyID)
	left join Countries ON (Countries.Country = Companies.Country)
	WHERE IF(qActive = -1,Contacts.Active = -1, Contacts.Active <> 999)
	ORDER BY Surname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_quick_customer_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_quick_customer_list`(IN qActive INT)
BEGIN
	SELECT
		Company,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
		City,
		Companies.Country,
		CompanyEmail as "Email"
			
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		left join Countries ON (Countries.Country = Companies.Country)
		WHERE IF(qActive = -1,Customer = -1 AND Companies.Active = -1, Customer = -1)
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_quick_prospect_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_quick_prospect_list`(IN qActive INT)
BEGIN
	SELECT
		Company,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
		City,
		Companies.Country,
		CompanyEmail as "Email"
			
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		left join Countries ON (Countries.Country = Companies.Country)
		WHERE IF(qActive = -1,Prospect = -1 AND Companies.Active = -1, Prospect = -1)
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_quick_supplier_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_quick_supplier_list`(IN qActive INT)
BEGIN
	SELECT
		Company,
		CONCAT(IF(Countries.Code = 0, '', '+'),Countries.Code,IF(Countries.Code = 0, '', ' '),Phone) AS Phone,
		City,
		Companies.Country,
		CompanyEmail as "Email"
			
		FROM companies
		LEFT JOIN Users ON (Users.UserID = Companies.AccMgrID)
		left join Countries ON (Countries.Country = Companies.Country)
		WHERE IF(qActive = -1,Supplier = -1 AND Companies.Active = -1, Supplier = -1)
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_supplier_contacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_supplier_contacts`(IN qActive INT)
BEGIN
	SELECT
		Title,
		Forename,
		Surname,
		Contacts.Position,
		Companies.Company,
		Companies.Address,
		Companies.City,
		Companies.County,
		Companies.PostCode,
		Countries.Country,
		Email
		
	FROM Contacts
	LEFT JOIN Companies ON (Companies.CompanyID = Contacts.CompanyID)
	left join Countries ON (Countries.Country = Companies.Country)
	WHERE IF(qActive = -1,supplier = -1 AND Companies.Active = -1 and Contacts.Active = -1, supplier = -1 AND Companies.Active = -1 and Contacts.Active <> 999)
	ORDER BY Surname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_rep_technical_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rep_technical_data`(IN qActive INT)
BEGIN
	SELECT
		Company,
		ProdTitle as "Technical Data"
						
		FROM ProductMembers
		LEFT JOIN Companies ON (Companies.CompanyID = ProductMembers.CompanyID)
		LEFT JOIN Products ON (Products.ProdID = ProductMembers.ProdID)
		WHERE
			IF(qActive = -1, Companies.Active = -1, Companies.Active <> 999)
		ORDER BY Company;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_sales_by_account_manager` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sales_by_account_manager`()
BEGIN
	SELECT
		users.name,
		sum(projects.ProjectValue) as "Value",
		CAST(DATE_FORMAT(projects.AuthorisationToProceedDate,  '%b %y') AS CHAR) AS "Month"
		
	FROM projects
	#LEFT JOIN companies ON (projects.CompanyID = companies.CompanyID)
	#LEFT JOIN opportunitystages ON (projects.OppStageID = opportunitystages.OppStageID)
	LEFT JOIN users ON (projects.AccMgrID = users.UserID)
	#LEFT JOIN projectstatus ON (projects.Type = projectstatus.TypeID AND projects.Status = projectstatus.StatusID)
	#LEFT JOIN sources ON projects.SourceID = sources.SourceID
WHERE projects.AuthorisationToProceedDate < now()
GROUP BY users.name, DATE_FORMAT(projects.AuthorisationToProceedDate,  '%b %y') # MONTH(projects.AuthorisationToProceedDate)
ORDER BY projects.AuthorisationToProceedDate;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_test` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_test`()
BEGIN
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Andrew','Chatten ','andrew.chatten@mt.com','01763257901','210/284','07912 309784');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Andrew','Kingsland','andrew.kingsland@mt.com','','207','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Andy','Pepper','andy.pepper@mt.com','','239','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Andy','Rance','andy.rance@mt.com','','312','07889331833');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Anthony','Darragh','anthony.darragh@mt.com','07712190143','213','07712190143');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Arlene','Heynes','arlene.heynes@mt.com','','320','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Barry','Baker','barry.baker@mt.com','','214','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Barry','Davies','barry.davies@mt.com','','232','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Chris','Caterer','chris.caterer@mt.com','','311','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Chris','Hemsley','chris.hemsley@mt.com','','317','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Dale','Godfrey','dale.godfrey@mt.com','01763 257902','220','07971 833521');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Daniela','Verhaeg','daniela.verhaeg@mt.com','01763 257918','222','07811942187');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'David','Inskip','david.inskip@mt.com','01763 257903','221','07889331834');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'David','Leith ','david.leith@mt.com','','316','07966201307');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'David','Masterson','david.masterson@mt.com','01763 257910','226','07912309833');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'David','Souza','david.souza@mt.com','','309','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'David','Wood','david.wood@mt.com','01763 257926','301','07912309863');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Dean','Harris','dean.harris@mt.com','','319','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Frank','Wang','frank.wang@mt.com','','205','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Gemma','Duffy','gemma.duffy@mt.com','01763 257919','211','07894 937031');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Graham','Fowler','graham.fowler@mt.com','01763 257914','231','07738986385');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Jo','Ratcliff','jo.ratcliff@mt.com','','313','07899668564');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Joanne','Woollacott','joanne.woollacott@mt.com','','236','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'John','Coleman','john.coleman@mt.com','','to page','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Kristian','Laskey','kristian.laskey@mt.com','01763257906','204/287','07912309948');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Lars','Renhed','lars.renhed@mt.com','','305','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Lee','Scotchford ','lee.scotchford@mt.com','Stores Cage','228','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Mark','Banks','mark.banks@mt.com','','308','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Mark','Pullen','mark.pullen@mt.com','','317','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Michael','Pipe','michael.pipe@mt.com','01763 257920','227','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Michelle','Barnes','michelle.barnes@mt.com','','237','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Mike','Reed ','mike.reed@mt.com','01763 257905','206','07912309625');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Neil','Rogan','neil.rogan@mt.com','','228','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Niall','McRory','niall.mcrory@mt.com','01763 257917','238','07912308249');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Nick','Bridger','nick.bridger@mt.com','01763 257925','215','07968 607321');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Nigel','King','nigel.king@mt.com','01763 257907','217','07976 365027');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Paolo','Nash','paolo.nash@mt.com','','202','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Paul','King','paul.king@mt.com','01763 257916','224','07816 925620');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Paul','Newman','paul.newman@mt.com','01763 257913',' 202','07912309864');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Peter','Kelland','peter.kelland@mt.com','','314','07712190142');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Prakash','Parthasarathy','prakash.parthasarathy@mt.com','','318','07889331835');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Ralph','Morbey','ralph.morbey@mt.com','','304','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Reg','Osborne','reg.osborne@mt.com','','321','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Richard','Airey','richard.airey@mt.com','01763 257911','209','07894 422557');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Richard','Griffiths','richard.griffiths@mt.com','','239','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Richard','Leiser','richard.leiser@mt.com','','212','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Richard','Peet ','richard.peet@mt.com','','203','077713197041');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Russell','Phillips','russell.phillips@mt.com','','216','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Steve','Farrall','steve.farrall@mt.com','','315','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Steve','Gusterson','steve.gusterson@mt.com','0161 875 1055','235','');
INSERT INTO Contacts (CompanyID, Forename, Surname, Email, Phone, Extension, mobile) VALUES(596,'Stuart','Martin ','stuart.martin@mt.com','','229','');
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `_Update_Company_PrimaryContacts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `_Update_Company_PrimaryContacts`()
BEGIN
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Kelly' AND companies.Company = '1st Lighten The Load Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Joachim Werner' AND companies.Company = '3A Composites GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerardo Pezzotta' AND companies.Company = '3D Sublimation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marshall Hampton' AND companies.Company = '3D Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Nolan' AND companies.Company = '3M Deutchland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Don Peterson' AND companies.Company = '3M Medical Division';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frank Marin' AND companies.Company = '3MG Factuprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Bridson' AND companies.Company = '4B Martinvest Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'William Strater' AND companies.Company = '509 Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neven Gaspic' AND companies.Company = '5M IGI';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brad Price' AND companies.Company = 'A B Signs';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexander Boldyrev Mr' AND companies.Company = 'A2 Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pieter Poels' AND companies.Company = 'AAE BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'ABC Test Account';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Abdullah Tahhan' AND companies.Company = 'Abdullah Tahhan & Associates Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'abec-gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniel Schelin' AND companies.Company = 'Abetterink.com';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Hyde' AND companies.Company = 'ABG International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Ability Plastics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Allewell' AND companies.Company = 'Ablestik';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amar Abd Elatif' AND companies.Company = 'ABU Hagam Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Colin Knight' AND companies.Company = 'Acco Brands';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Accu-Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'William Leach' AND companies.Company = 'AccuDrop Integration LLP';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ana Maria Olcese, Mrs.' AND companies.Company = 'Achernar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Darko' AND companies.Company = 'ACNOVEL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chuck Taylor' AND companies.Company = 'Action Images Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Charlotte Ward' AND companies.Company = 'AD Communications';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Griessen' AND companies.Company = 'Cibolo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dan Krieger' AND companies.Company = 'Addresser Based Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Axel Demberger' AND companies.Company = 'Adevi GMbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albert Dietrich' AND companies.Company = 'Adga-Adolf Gampper GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing. Daniel Varsky' AND companies.Company = 'Adhepel SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yannick Vivier Mr' AND companies.Company = 'Adheprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Le Pennec Hugues' AND companies.Company = 'Aditec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Adolph Gottscho, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Palazzolo' AND companies.Company = 'AdPhos';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Pelling' AND companies.Company = 'Adphos UK Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Adsale Exhibition Services Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Samantha Deverell' AND companies.Company = 'Adtech Polymer Engineering Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Davey' AND companies.Company = 'Advanced Barcode & Label Technologies, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alan Rollason' AND companies.Company = 'Advanced Chemical Etching Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Valentina' AND companies.Company = 'Galeks';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Advanced Digital Printing Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nick Mansell' AND companies.Company = 'Advanced Inkjet Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Charlie Madden' AND companies.Company = 'Advanced Labelworx Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bruce Zwicker' AND companies.Company = 'Advanced Nano Products';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Guy Yogev' AND companies.Company = 'Advanced Vision Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas D\'Alessio' AND companies.Company = 'Aerosource, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Cliff Jolliffe' AND companies.Company = 'Aerotech Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pedro Martinez' AND companies.Company = 'Afford Industrial SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'France Brodeur' AND companies.Company = 'AG Amerique Graphique';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean Pierre Wirth' AND companies.Company = 'Agedis';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marc Graindourze' AND companies.Company = 'AGFA Geveart NV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rashed Chughtai' AND companies.Company = 'Agfa Oceania';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roeland De Vriese' AND companies.Company = 'Agfa-Dotrix NV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ken Bach' AND companies.Company = 'GEI Calgraph';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerry Ryan' AND companies.Company = 'Agile Software Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jose Maria Nogues Gorricho' AND companies.Company = 'Agor S.L';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alberto Sadun' AND companies.Company = 'Aigle Macchine Srl.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rahul A Khambat' AND companies.Company = 'Akshita Enterprises';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Haitham F Aziza' AND companies.Company = 'Al Adib Converting & Printing Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michel Grauwen' AND companies.Company = 'Aladin Code';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Alain Boutet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Alan Butcher Components Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phillipe Albon' AND companies.Company = 'ALBON';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Alcan ( See Amcor Flexibles)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Keith R Alden' AND companies.Company = 'Alden & Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alex Challinor' AND companies.Company = 'Alex Challinor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Flavio Albanese' AND companies.Company = 'Alfaservice SRL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Habib Prem M Naseer' AND companies.Company = 'Ali Alhashemi Trading Est.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christophe Aliaga' AND companies.Company = 'Alia Consulting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dan Crews' AND companies.Company = 'Alio Industries';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kostas Fotakis' AND companies.Company = 'All Graphics KF';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Elliott' AND companies.Company = 'Allen Datagraph Systems Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrei Cracion' AND companies.Company = 'Allprint Graphic Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrzej Misiewicz' AND companies.Company = 'Alma Trend';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Layth M Hussin, Mr' AND companies.Company = 'Al-Naizak Offset Printing & Separation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Simon King' AND companies.Company = 'Alpha Converting Equipment Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mourad Mezghani' AND companies.Company = 'Alpha Etiquettes';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ernest Nikiruy' AND companies.Company = 'Alpha Research & Manufacturing Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean Marc Hoffer' AND companies.Company = 'Alphacode/Advanpost';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Keith Cooper' AND companies.Company = 'Alphagraphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gilberto Jordao' AND companies.Company = 'Alphashirt';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Balshaw' AND companies.Company = 'Alphasonics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Miller' AND companies.Company = 'Alraun Technik GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albert Nuno' AND companies.Company = 'Als Co UV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Liefke' AND companies.Company = 'ALS engineering GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hugo Cueto' AND companies.Company = 'Altatec Paraquay';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Matthias Borella' AND companies.Company = 'Altatech Semiconductor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Piero Salvini Dr.' AND companies.Company = 'ALTECH  s r l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Felix E Sammartino' AND companies.Company = 'ALTO PARANA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sven Troskot' AND companies.Company = 'Aluflexpack d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Augusto Picco' AND companies.Company = 'AM S.p.A';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Amazing Grace ENT';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Rudolf Janacek' AND companies.Company = 'Amcor Flexibles Kreuzlingen';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karolina Rosengerger' AND companies.Company = 'Amcor Flexibles Neuhausen';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ken Huckaby' AND companies.Company = 'American Solutions for Business';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frank Catanzarite' AND companies.Company = 'AMERICANTRIM';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mason Wang' AND companies.Company = 'Amica China Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Chiang' AND companies.Company = 'Amica Software';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ricardo Augusto Lie' AND companies.Company = 'AMPLA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Don Rasmussen' AND companies.Company = 'AnaJet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Leopoldo Lopes' AND companies.Company = 'Anasiscor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francisco Correia' AND companies.Company = 'Ancor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Byvalin Vyacheslav' AND companies.Company = 'Andas Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Heiko Koenij' AND companies.Company = 'Anderson Europe GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicolas Sande' AND companies.Company = 'Animal Print SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Anka Seramik San ve Tic Ltd Sti';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Annick Bonhomme' AND companies.Company = 'Annick Bonhomme';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Zhivko Zheliazkov' AND companies.Company = 'Anons';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roan Westerhof Mr' AND companies.Company = 'Anorad';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Willem-Jan Kersten' AND companies.Company = 'Apex Group of Companies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Russell Cornsby' AND companies.Company = 'Apex Machine Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nathalie Moinard' AND companies.Company = 'Aplix S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Kawsek, Jr' AND companies.Company = 'APO International M Corp';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ed Birch' AND companies.Company = 'Applied Laser Engineering Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Boris Kobrin, Ph.D.' AND companies.Company = 'Applied MicroStructures Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Applied Nano Technology - SEE XINTEK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian David' AND companies.Company = 'Appligraphic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ashis Roy Choudhury' AND companies.Company = 'Apsom Technologies (India) Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ken Salsman' AND companies.Company = 'Aptina Imaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Johnson' AND companies.Company = 'Arca Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roberto Sala' AND companies.Company = 'Arca Etichette Spa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mickaël Barret Ph. D. Mr' AND companies.Company = 'Ardeje';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = ' ' AND companies.Company = 'Ardis Markss';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Monsieur Le Pennec' AND companies.Company = 'Ardop';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Janna \'Alexandrovna\' Vopnyarskaya' AND companies.Company = 'Arenga';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Soonhong Lee' AND companies.Company = 'Argonne National Lab';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mitesh Kothari' AND companies.Company = 'Arihant Digiprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adriano Fontana' AND companies.Company = 'Arioli Spa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Zhong Xu' AND companies.Company = 'Arkwright Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Arpeco (A Precision Automation Company)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerrit Willems' AND companies.Company = 'Array Graphics BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Howard Manning Dr' AND companies.Company = 'Arrayjet Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott Barnett' AND companies.Company = 'Art & Science of Marketing Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nikolay Buzin' AND companies.Company = 'Art Maschina';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dan Ciobotaru' AND companies.Company = 'Art Press';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Valentina Malanot' AND companies.Company = 'ArtCodex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shibeko Igor' AND companies.Company = 'Artel Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Luciano Molina' AND companies.Company = 'Artenergy Publishing S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniel Dumitru' AND companies.Company = 'Artirom PRO SRL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrick Chong' AND companies.Company = 'Artrender Industries';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eugene Schaeffer' AND companies.Company = 'Arts Graphiques Systemes';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ivo Strujic' AND companies.Company = 'Artus Str.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Arvanitis';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dan Ottolenghi' AND companies.Company = 'Arza (Ofer) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Endel Linask' AND companies.Company = 'AS Ferdida';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bradley Crume' AND companies.Company = 'Ascent Solar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hitesh N Mevada' AND companies.Company = 'Aseptic Technology Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerard A Fakhoury' AND companies.Company = 'Ashraf & Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kim Phillipp Heise' AND companies.Company = 'Aspiron GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anand Madhavan' AND companies.Company = 'Associated Printers (Madras) Private Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'M G Ittan' AND companies.Company = 'AST';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Meir Grunhunt' AND companies.Company = 'Astor Chocolate';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael J Sullivan' AND companies.Company = 'Astro-Med Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eugene Mostovoy' AND companies.Company = 'AT Design';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Avi Porat' AND companies.Company = 'Athelos Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Naiden Naidenov' AND companies.Company = 'Atia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juan Carlos Gallardo' AND companies.Company = 'Atlantic Zeiser - Spain';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Berndtsson,  Mr Anders' AND companies.Company = 'Atlantic Zeiser GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Penne' AND companies.Company = 'Atlantic Zeiser SAS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Kaye' AND companies.Company = 'Atlantic Zeiser UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Atlantic Zeiser USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Nethercote' AND companies.Company = 'Atlas for Industry';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ton Schraven' AND companies.Company = 'Atlas Tecocel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Harvey' AND companies.Company = 'Atomjet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alain Foucou Mr' AND companies.Company = 'ATT - Advanced Track and Trace';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'ATT Tekstile';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Attop USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nigel Griffiths' AND companies.Company = 'Atwell Self-Adhesive';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wlodzimierz Kwasniewski' AND companies.Company = 'Audioexpert';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eugene Schaeffer' AND companies.Company = 'Augend Technologies nv';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Glynn Stokes' AND companies.Company = 'Augustus Martin';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Mackaay' AND companies.Company = 'Aurelon';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrey "Nikolaevich" Nikolskiy' AND companies.Company = 'Austrian Paper (RUS)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Simon Needham' AND companies.Company = 'Autobox Machinery Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Colin Amery' AND companies.Company = 'Autofilm Australia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Miguel Angel Cascone Mr' AND companies.Company = 'Autopack SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Angelo Morano' AND companies.Company = 'Autotex Italia Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Andrew P Shawcross' AND companies.Company = 'Avecia Biologics Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Evgeniy Leonidovich' AND companies.Company = 'Avers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ángel Gea Martínez' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joe Daley' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dale Loree' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ray Blanchard' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Forrest Browning' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andy Walton' AND companies.Company = 'Avery Dennison';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alex Donaldson' AND companies.Company = 'Avery Dennison Retail Information Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vittorio Avezzano' AND companies.Company = 'Avezzano Sistemi Informatici srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Axicon Auto ID Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Francois Vaussenat' AND companies.Company = 'Axode';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergio Albuquerque' AND companies.Company = 'Azevedo Albuquerque';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mladen Rosko' AND companies.Company = 'AZON Printer d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kai Offers' AND companies.Company = 'B Braun Avitum AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'B Bunch Co Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jaime Ramirez Paredes' AND companies.Company = 'B Logik';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alessandro Cafano Mr' AND companies.Company = 'B. MA Zuccheri';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neil Kaminar' AND companies.Company = 'Baccini s.p.a';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Gårlin' AND companies.Company = 'Baldwin IVT AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Elting, Jr' AND companies.Company = 'Baldwin Oxy-Dry Americas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'BALTEA Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniel Craig Carr' AND companies.Company = 'Bar Graphics Machinery Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eladio Lerga' AND companies.Company = 'Barberan';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jane Bowd' AND companies.Company = 'Barclays';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ray Barnett' AND companies.Company = 'Barnett Design Consultants Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Donovan Deal' AND companies.Company = 'Barry Controls';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefan Vogel' AND companies.Company = 'BASF';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Georg Wigger' AND companies.Company = 'BASF Coatings AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Provost Dr' AND companies.Company = 'BASF Plc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Milijan Savic' AND companies.Company = 'Bato&Divajn';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jose Luiz Litvay' AND companies.Company = 'Baumgarten';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Uwe Baumgarten' AND companies.Company = 'Baumgarten Handels Vertretung';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Bayer MaterialScience AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergey Bachurin' AND companies.Company = 'Bazilprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Kearney' AND companies.Company = 'BDT AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott Stubbs' AND companies.Company = 'Bechtle Direct UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Beda Kunzle, Mr' AND companies.Company = 'Beda Kuenzle';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kang Ying Cheng' AND companies.Company = 'Beijing Basch Co Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jian Wang' AND companies.Company = 'Beijing D & H Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Liu Zhihong Mr' AND companies.Company = 'Beijing Founder Electronics Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tony Zhao' AND companies.Company = 'Beijing Innovation Technology Company Ltd (JHF)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rong Jin' AND companies.Company = 'Beijing Kincolor Digital Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicholas Munch' AND companies.Company = 'Beijing Meikeyi Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Doug Watson' AND companies.Company = 'Bekaert Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Mombourquette' AND companies.Company = 'Belquette Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Bergstein' AND companies.Company = 'Bergstein BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matt Berkeley' AND companies.Company = 'Berkeley Machinery';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alison Taylor Ms' AND companies.Company = 'Berkshire International Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manfred Schaer' AND companies.Company = 'Bern University of Applied Sciences';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Berra S.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joseph Dewig' AND companies.Company = 'Berry Plastics Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Elfriede Maurer' AND companies.Company = 'Beschriftung & Druck GesmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adrian Tippetts' AND companies.Company = 'Bespoke';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joe Valdez' AND companies.Company = 'Bestforms';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stuart Goze' AND companies.Company = 'Betts';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Ruiz' AND companies.Company = 'Betulo Labels S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yaniv Harari' AND companies.Company = 'BH Barcode';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marin Pericic' AND companies.Company = 'Bial ruza';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'BIC Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergi Pejoan' AND companies.Company = 'BIC Graphic Europe';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Cross' AND companies.Company = 'Bic Graphic USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bengt Theilgaard' AND companies.Company = 'Big Image Systems Deutschland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'English,  William Jr.' AND companies.Company = 'Bill English';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Johannes Bischoff Mr' AND companies.Company = 'Bischoff International AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Volker Braun' AND companies.Company = 'BITCom LAB Europe';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian Bittrich' AND companies.Company = 'Bittrich Industrial s.r.c.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sung In Seog' AND companies.Company = 'Bixolon Co Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Meyer Daniel' AND companies.Company = 'Bixos Automation France';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francois Goedegebuure' AND companies.Company = 'BIZZclips International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Blackjet Inks Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrew Ainge' AND companies.Company = 'Blanc Canvas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Turyk Fedor' AND companies.Company = 'Blick';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tarek Kalaawi' AND companies.Company = 'Blue Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Thodey' AND companies.Company = 'Blue Print Imaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephan Stirnemann' AND companies.Company = 'Blumer Maschinenbau AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vittorio Galli' AND companies.Company = 'Blupoint - now Sun Chemical';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christophe Veron' AND companies.Company = 'BNP Paribas Lease Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Vroegop' AND companies.Company = 'BO Publications BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Philippe Besson' AND companies.Company = 'BOBST SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sherrill Luce' AND companies.Company = 'Boehm Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adam Bokwa Mr' AND companies.Company = 'Bokwa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Fern' AND companies.Company = 'Boldman Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Xavier Van Beekum' AND companies.Company = 'Books Holland b.v.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bengt Theilgaard' AND companies.Company = 'BOP Mastinteknik AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frédéric Boehlen Mr' AND companies.Company = 'Bopack Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Macit Orhan' AND companies.Company = 'Boras Iletisim Teknolojileri A.S.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Barry Griffiths' AND companies.Company = 'Borble Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Abi Naemi' AND companies.Company = 'Bordarshib Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amnon Shalev' AND companies.Company = 'Bordeaux Digital Printing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Willi Schnidrig' AND companies.Company = 'BOSCH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Johnson' AND companies.Company = 'Bosch Rexroth Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brigitte Furth' AND companies.Company = 'Bosch und Siemens Hausgeräte Gmbh (BSH)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike West' AND companies.Company = 'Boss Industrial Mouldings Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bryan T Frack' AND companies.Company = 'Bowe Bell & Howell';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert J Hapy' AND companies.Company = 'Brady Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philip Raemdonck' AND companies.Company = 'Brady Europe';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tim Qian' AND companies.Company = 'Brady Worldwide Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian House' AND companies.Company = 'Brainwave Media Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anders Ekhagen' AND companies.Company = 'Brand Factory Nordic AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Clarina Beallweg' AND companies.Company = 'Brand Gmbh + Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philip Mashini' AND companies.Company = 'BrightVisions Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'British Telecommunications plc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sonia Gadh' AND companies.Company = 'Britomatics America Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Premysl Kršek' AND companies.Company = 'Brno University of Technology, Faculty of IT';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Maloney' AND companies.Company = 'Broadford & Maloney';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Brodbeck' AND companies.Company = 'Brodbeck GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ramon Lee' AND companies.Company = 'Brotech';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nick Blinov' AND companies.Company = 'BS Company Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Baker' AND companies.Company = 'BSA Baker Self Adhesive Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Wiebe' AND companies.Company = 'BST International GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerhard Wiesspeiner' AND companies.Company = 'BTI  Technology & Innovation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Buck Crowley' AND companies.Company = 'Buck Automation International LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger B Goetze' AND companies.Company = 'Business Link';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ram Prasad' AND companies.Company = 'Business Solution';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'William Dale' AND companies.Company = 'Business Solution Company, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roy Kropman' AND companies.Company = 'Buskro International Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Moore' AND companies.Company = 'Buskro USA Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bradley Wilson' AND companies.Company = 'BW Consulting Durban South Africa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Clément Kleinclauss' AND companies.Company = 'Cab Technologies Sarl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Friedrich Von Gottberg' AND companies.Company = 'Cabot Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Cabot Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gino Laureti' AND companies.Company = 'Cad Computer Solution s.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Evans' AND companies.Company = 'Cadlink Technology Corporation Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joseph Mergui' AND companies.Company = 'Caldera';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marco Minardi' AND companies.Company = 'Calf S.p.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Becky Brown' AND companies.Company = 'Cambridge Belfry';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Trevor' AND companies.Company = 'Cambridge Cleaning Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Cambridge Design Partnership';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Laura Webb' AND companies.Company = 'Cambridge Display Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Justin Haywood' AND companies.Company = 'Cambridge Investment Research Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Thorne' AND companies.Company = 'Cambridge Micro Engineering Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phil' AND companies.Company = 'Cambridge Premier Chauffeurs';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Taylor' AND companies.Company = 'Cametrics Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Doug Picklyk' AND companies.Company = 'Canadian Printer Magazine';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuko Suga' AND companies.Company = 'Canon Finetech Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hansjoerg Ladstaetter' AND companies.Company = 'Cansol Packaging Machines GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Emmanuel Desfond' AND companies.Company = 'Cap Cod';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phil Robertson' AND companies.Company = 'Carclo Technical Plastics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Ohlhaber' AND companies.Company = 'CardSmart Systems Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Esteban Ramallo' AND companies.Company = 'Caribbean Forms Manufacturers, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eberhard Hauser' AND companies.Company = 'Carl Valentin GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefano Lodi' AND companies.Company = 'Cartes S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Catchpoint Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans-Juergen Miss' AND companies.Company = 'CCE Convenience Coding Equipment GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manuel Faria' AND companies.Company = 'CCL Label';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'CCL Labels - Munich';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Geoff Martin' AND companies.Company = 'CCL Labels - USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Felix Jaeggi' AND companies.Company = 'CDNP';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dariusz Cekus' AND companies.Company = 'Cedar-Pol';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Young' AND companies.Company = 'Ceema Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrew Kownacki' AND companies.Company = 'Ceetak Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jesus Manuel Ramirez Ing.' AND companies.Company = 'CEI';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vittorio Pasolini Mr' AND companies.Company = 'Cembre';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fernando Varela' AND companies.Company = 'Cemitec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christophe Trehoult' AND companies.Company = 'Centre Technique du Papier';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Centrum Reklamy & Poligraphii';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lucija Cepe' AND companies.Company = 'Cepe d.o.o';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Ceracasa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nick Van den Borg' AND companies.Company = 'Cerclindus nv/sa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Benoît Javelaud' AND companies.Company = 'Cerinnov France';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Weinkamp' AND companies.Company = 'Cerion GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerardo Alcantar' AND companies.Company = 'CESS Comercializadora de Equipos Sistemas y Servicios S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Sherritt' AND companies.Company = 'CET Color';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albert Marszalek' AND companies.Company = 'Cham Paper Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steffen Ohr' AND companies.Company = 'Cham-Tenero Paper Mills Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thiago Fabbrini' AND companies.Company = 'Channel Marketing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alan Felstead' AND companies.Company = 'Chauffeurlink UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcel Oonk' AND companies.Company = 'Checkpoint Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Declan Devine' AND companies.Company = 'Checkpoint Systems UK Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Charis' AND companies.Company = 'Chef de la Maison Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Gerhardt' AND companies.Company = 'Chemical Inkjet Technology (CIJet)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian Rahnfeld' AND companies.Company = 'Chemnitz University of Technology, Institute for Print and Media Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Andaloro' AND companies.Company = 'Chemque Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Frank De Voeght' AND companies.Company = 'Chemstream';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jesse Leskanic' AND companies.Company = 'Cheran Digital Imaging & Consulting Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stuart Woor' AND companies.Company = 'Chesterton Light Engineering';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Agusti Dalmau' AND companies.Company = 'Chiasa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Toshinaga OE' AND companies.Company = 'Chikujyo Printing Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Antonio Lopez' AND companies.Company = 'Chimigraf';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Antonio Sande' AND companies.Company = 'Chromatic Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peder Nelson' AND companies.Company = 'Chromaticity';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philipp Frommenwiler' AND companies.Company = 'Chromos';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phillippe Prade' AND companies.Company = 'Chronoexpo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tarry Pidgeon' AND companies.Company = 'Church Budget';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carmelo Cilento' AND companies.Company = 'Cilento SRL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rennie Bottali' AND companies.Company = 'Citiphones';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karen Wells' AND companies.Company = 'City Link';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Clarcom Production';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Loughton' AND companies.Company = 'Clarion Printed Products';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nick Geraghty' AND companies.Company = 'CLC (UK) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefano Monti' AND companies.Company = 'CLEAF S.p.a.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pavel Salach' AND companies.Company = 'CNI Tisk Servis spol s.r.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Massimo Banfi' AND companies.Company = 'Coban srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nilton Mattos' AND companies.Company = 'Coca-Cola Company, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael A Dalton' AND companies.Company = 'Codaco Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gino Cornacchia Mr.' AND companies.Company = 'Codas snc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'CODIFICHECK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marco Ghini' AND companies.Company = 'G D SpA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bruno Moreau' AND companies.Company = 'Codimag';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Diego Gaston Puntin' AND companies.Company = 'Codymarc S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rod Jones' AND companies.Company = 'Cojo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Cole Parmer';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Sarnataro' AND companies.Company = 'Colgate-Palmolive Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Collamat AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Stephen Sung PhD' AND companies.Company = 'Collins Ink Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Jose M Lorenzo' AND companies.Company = 'Colorcon No-Tox Product';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Janis Katomeris' AND companies.Company = 'ColorGATE';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hatice Kuyumcu' AND companies.Company = 'Colorink';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kartheinz Weimer' AND companies.Company = 'ColorVision Gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ann Noonan' AND companies.Company = 'Colour Interlink';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Allan Rumney' AND companies.Company = 'Colour Scanner Technology (South Africa)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wilfred Meffre' AND companies.Company = 'Coloursource';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicolas Sande' AND companies.Company = 'Comercio Digital';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Miquel Marco' AND companies.Company = 'Comexi Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dimitris Tzias' AND companies.Company = 'Commercial Graphic Arts S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ian Bresoline' AND companies.Company = 'Commercial Labels Products Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Comor Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Eulenfeld' AND companies.Company = 'COMPAREX Services GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Sit' AND companies.Company = 'Compose';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kevin Caughtry' AND companies.Company = 'Compose System (Europe) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexandre Maiolo' AND companies.Company = 'Comprint S.r l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Claudio Granata' AND companies.Company = 'Comprint s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Geldmacher Mr' AND companies.Company = 'Computer and Sign Centre';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'E Kryonas' AND companies.Company = 'Computer Art Electric Sign Co ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Computer Warehouse Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Kuimov' AND companies.Company = 'Concern Ruspoligraph Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Steve Thomas' AND companies.Company = 'Conductive Inkjet Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Continental Plastic Card';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Hughes' AND companies.Company = 'Contractor Sales Ltd.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Control Logic Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralf Naujoks' AND companies.Company = 'Converter Solutions Systemtechnik GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Simon Gross' AND companies.Company = 'Converting Equipment Intl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Larry Wallace' AND companies.Company = 'Cooley Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Cooper Mr' AND companies.Company = 'Cooper Printing Machinery Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Herve Hily' AND companies.Company = 'Copymix';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Woods' AND companies.Company = 'Copytrax Technologies UK Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ian Tracy' AND companies.Company = 'Corning Incorporated';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Walker' AND companies.Company = 'Country Lane & Business Association (CLA)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefano Favero' AND companies.Company = 'Coveme SpA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brent Coy' AND companies.Company = 'Coy Engineering Services Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'CPI Card Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pete Glennon' AND companies.Company = 'Creative Dataproducts';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Atila Canadi' AND companies.Company = 'Creative Line d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Rosenquist' AND companies.Company = 'Creative Type';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manuel Roca' AND companies.Company = 'Cretaprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stevo Miketek' AND companies.Company = 'Crograf';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gilles Prevot' AND companies.Company = 'CROMA JET Digital Printing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Changlong Sun' AND companies.Company = 'Crown Packaging UK Plc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans Mathea' AND companies.Company = 'CSAT Gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Don Clugston' AND companies.Company = 'CSG Solar AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott Partlin' AND companies.Company = 'CSG Solar Pty Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marachai Kongboonma' AND companies.Company = 'CSP/Chan Wanich Security Printing Company Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Taylor' AND companies.Company = 'CT Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Takashi Nakagawa' AND companies.Company = 'CTC Japan';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Sasaki' AND companies.Company = 'CubicVue LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Fransman' AND companies.Company = 'Custom Made D.P.I.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stuart Dunklin' AND companies.Company = 'Cutting Edge Precision Engineering';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrik Pols' AND companies.Company = 'Cuvée Holdings Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Clayton Sampson' AND companies.Company = 'CYAN UV Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Denise Gustavson' AND companies.Company = 'Cygnus Graphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sameer K Joshi' AND companies.Company = 'Cygnus Marking and Coding Pvt Ltd.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joe Grosemans' AND companies.Company = 'Cytec Industries Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Lakey' AND companies.Company = 'D & G Computer Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dennis Mott' AND companies.Company = 'D Mott & Co Accountants';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dennis Orell' AND companies.Company = 'D Orell Consulting Llc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Imasha De Silva Ms' AND companies.Company = 'Da Vinci Computerised labels PVT Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuzo Nakashioya' AND companies.Company = 'DAC Engineering Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Koji Morioka' AND companies.Company = 'Dai Nippon Ink & Chemicals';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Toshikazu Suganuma' AND companies.Company = 'Dai Nippon Ink and Chemicals Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Masato Okabe' AND companies.Company = 'Dai Nippon Printing Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Osamu Kitagawa' AND companies.Company = 'Dai Nippon Screen Mfg Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuhong (Johann) Huang Ph.D.' AND companies.Company = 'Danaher Motion - Dover';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jai Lilaramani' AND companies.Company = 'Dar Al Andalus Printing, Pub & Dist. LLC ( DAAPP )';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kenneth Darrow' AND companies.Company = 'Dartronics Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marty Cassidy' AND companies.Company = 'Data2 Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexey Vladimirovich Bruno' AND companies.Company = 'DATA-BY';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sébastien Michenet' AND companies.Company = 'Datacard GLR S.A.S.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tim Flitsch' AND companies.Company = 'Datacard Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger Potvin' AND companies.Company = 'Datacard Group Florida';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lenny McGrath' AND companies.Company = 'Datacard Ltd (UK)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Ameranis' AND companies.Company = 'Dataworks';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Blankenaufulland' AND companies.Company = 'David Blankenaufulland';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tsion Habshush' AND companies.Company = 'Davik';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'DayMark Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adrienne Cress' AND companies.Company = 'Dayton Mailing Services (DMS)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Doris Mao' AND companies.Company = 'DBS Bank (China) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Denis Lemaitre' AND companies.Company = 'DCM Usimeca';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ariel De Blasi' AND companies.Company = 'De Blasi Maquinaria Agroindustrial';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paulo Forno' AND companies.Company = 'Debuit Do Brasil';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Russ Brown' AND companies.Company = 'DEC (Digital Equipment Corporation)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. André Saugy' AND companies.Company = 'Decopro GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Goran Petrovski' AND companies.Company = 'Deko Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexander Segeda' AND companies.Company = 'Delfin group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pierre Gallé' AND companies.Company = 'DELNA S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sarbjit Parhar' AND companies.Company = 'Delphax Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen Hemphill' AND companies.Company = 'Delphax Technologies Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen Hubbard' AND companies.Company = 'Delphax Technologies Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Refai Yacine' AND companies.Company = 'Delta Adhesif';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Evan Schiebout' AND companies.Company = 'Delta Industrial Services Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dave Davies' AND companies.Company = 'Deluxe Corp';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ted Legarski' AND companies.Company = 'Dentsply International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob van Berkom' AND companies.Company = 'Deonet B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jack Kahn' AND companies.Company = 'DEP';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christophe Caenepeel' AND companies.Company = 'Depro Profiles';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Raouf Y.Nasser' AND companies.Company = 'Design Grafix';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cathy' AND companies.Company = 'Desktop Factory';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kurt K Wolf' AND companies.Company = 'Deutscher Drucker';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bob Licari' AND companies.Company = 'DevLex International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael O\'Neill' AND companies.Company = 'Dezign-A-Badge';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frau Kausch' AND companies.Company = 'DFO e.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Yu' AND companies.Company = 'D-Gen';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Sanders' AND companies.Company = 'DGS Visueel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fred Villatoro' AND companies.Company = 'DGTech Soluciones Technologia SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcello Bonini' AND companies.Company = 'DGTek SRL (Almiotek)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eli Moshe' AND companies.Company = 'DH Media Company Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shaun' AND companies.Company = 'DHL Express';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wanda Harrold' AND companies.Company = 'Diageo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joachin Weischer' AND companies.Company = 'Diagramm Halbach GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juan E Lopez' AND companies.Company = 'Diagraph-An Itw Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Hitch' AND companies.Company = 'Diamond Photofoil Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Panos Antoniadis Mr.' AND companies.Company = 'DIASTASIS S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'DIC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Masakazu Yoshida' AND companies.Company = 'DIC Europe GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralf Martin Eckert' AND companies.Company = 'Dicojet GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerd Schäfer' AND companies.Company = 'Digi Direct';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bernard F Girma' AND companies.Company = 'Digi Tech Strategy';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Armando Mota da Silva' AND companies.Company = 'Digidelta Internacional';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcello Zunica' AND companies.Company = 'Digiflash';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Mohab Fahmi' AND companies.Company = 'Digigraphics International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans W Bracht' AND companies.Company = 'Digikett';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Cooper' AND companies.Company = 'DigiLeaflet Technologies Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Sevenoaks' AND companies.Company = 'DigiLeaflet Technologies Ltd (Farnborough)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gilberto M Olmedo' AND companies.Company = 'Digiper S.A. De CV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexander Podkopaev' AND companies.Company = 'Digiprom LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anthony Lim' AND companies.Company = 'Digiskin Singapore';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Viktor Ilievski' AND companies.Company = 'Digital Centar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Knight' AND companies.Company = 'Digital Direct Technologies bvba';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexia Rizzi' AND companies.Company = 'Digital Document Magazine';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roberto Rodriguez' AND companies.Company = 'Digital Graphic Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Keun-Soo Choi' AND companies.Company = 'Digital Illustrate Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kai Liu' AND companies.Company = 'Digital Photonics Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vladimir Galentovsky' AND companies.Company = 'Digital Sign Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Herbert Mayrhofer' AND companies.Company = 'Digotex GmbH (MHM Group)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Docho Chemshirov' AND companies.Company = 'Dilcom Bulgaria';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Udo Nikolai' AND companies.Company = 'DILETTA ID-Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Youn-Goo Lee' AND companies.Company = 'Dilli Precision Ind. Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mario Ortega Morales' AND companies.Company = 'DIM S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Marie Plenet' AND companies.Company = 'DINAC SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rom Condrea' AND companies.Company = 'Dip-Tech Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan A Krols' AND companies.Company = 'Dipymac Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Blair Allen' AND companies.Company = 'Direct Color Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tamarind Finch' AND companies.Company = 'Direct Corporate Design LTD';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jonas Christiansen' AND companies.Company = 'DIS (Dansk Ingeniorservice A/S)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rick Williams' AND companies.Company = 'Dispensa-Matic Label Dispensers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lance Barry' AND companies.Company = 'Display Business';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Istvan' AND companies.Company = 'Disz Tipo srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rubens Nakano' AND companies.Company = 'Dixie Toga Bemis';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dick van der Maal' AND companies.Company = 'DJM';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Boris Gratiot' AND companies.Company = 'DMA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Siris Cherniak' AND companies.Company = 'DMSI';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kazuhide Motegi' AND companies.Company = 'DNP Corporation Usa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Raymund' AND companies.Company = 'Do.Well Swiss International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Saman Berkun' AND companies.Company = 'Dogus Etiket ve Ambalaj San. Tic Ltd STi';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bilal Karakus' AND companies.Company = 'Dogus Ofset';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Ulf Wilhelm' AND companies.Company = 'Dokumental GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oliver Menke Entwicklung' AND companies.Company = 'Dollken-Kunststoffverarbeitung GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Olga Avramchuk' AND companies.Company = 'Dominanta';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Ellen' AND companies.Company = 'Domino Amjet Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Lilley' AND companies.Company = 'Domino UK Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Dotzauer' AND companies.Company = 'Dotzauer Design Studio';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Olivier Roussel' AND companies.Company = 'Doublet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alain Dunand Mr' AND companies.Company = 'Dover Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Henrik Lindskov' AND companies.Company = 'DPL Industri A/S';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neal Peters' AND companies.Company = 'DPM Enterprises';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Enrico Panzeri' AND companies.Company = 'DPR Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Mitchell' AND companies.Company = 'DPST Digital Printing Solutions and Technolgies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wolfgang Kiefer' AND companies.Company = 'Dr. Honle AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Ashley' AND companies.Company = 'Dreamscape Interiors';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Jensen' AND companies.Company = 'Drent Goebel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neil' AND companies.Company = 'Driver Electrical Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Friz' AND companies.Company = 'Drohmann GmbH Easycut';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manfred Terno' AND companies.Company = 'DRUCKHAUS Terno';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Justyna Palusinska' AND companies.Company = 'Druku';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Claudia Neira' AND companies.Company = 'DS Productions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steven Richardson' AND companies.Company = 'DTG Digital';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Du Pont de Nemours Italiana S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philippe Ayala' AND companies.Company = 'Dubuit Do Brasil';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcelo Cabanas' AND companies.Company = 'Ducoprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gilles Prevot' AND companies.Company = 'Dunvegan European Office';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Dunvegan Technology LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Morris Lin' AND companies.Company = 'Dupack Pty Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jose Antonio Perex Gutierrez' AND companies.Company = 'DupliCD';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark E Dawes' AND companies.Company = 'DuPont (UK) Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael L Rudolph' AND companies.Company = 'DuPont Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Claude Labro' AND companies.Company = 'DuPont de Nemours (France)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frank-Peter Tiegs' AND companies.Company = 'DuPont Performance Coatings GmbH &  Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Dürr Systems GmbH Vertrieb';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Franz Obertegger' AND companies.Company = 'Durst Phototechnik AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Weingartner' AND companies.Company = 'Durst Phototechnik Digital Technology GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'François Collard' AND companies.Company = 'Dutch Dipping Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michiel Fransien' AND companies.Company = 'Dutchband BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joachim Rupp' AND companies.Company = 'DVD-CD Joachim Rupp (Handel & Service)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yoav Brand' AND companies.Company = 'Dykam';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Dymo bvba';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Antoine El Kara' AND companies.Company = 'Dynagraph for Printing Industry SAL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Abdul Ghani Ghneim' AND companies.Company = 'Dynagraph Saudia Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Arunesh Bansal' AND companies.Company = 'Dynamic Labels & Packaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Angela Squair' AND companies.Company = 'Dyne Technology Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Semih Havlioglu' AND companies.Company = 'Dyo Printing Inks Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'DYSS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Dystar Textilfarben GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hamid Meddahi' AND companies.Company = 'E Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Clive Barnett' AND companies.Company = 'E Profile';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Said Ouahbi' AND companies.Company = 'Eagle IG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ed Brown' AND companies.Company = 'Eastman Kodak Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fernando J Garcia' AND companies.Company = 'Eastman Kodak Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Enrique Bonilla Otoya' AND companies.Company = 'EB Grafica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Avi Paryente' AND companies.Company = 'EB Zour Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michel Guillaume' AND companies.Company = 'ECA (Expert Conseils Associes)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcelo Rocha' AND companies.Company = 'Ecadat S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Florian Preiss' AND companies.Company = 'ECH Will GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Colin Appleyard' AND companies.Company = 'Eckart GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Des O\'Neill' AND companies.Company = 'Eckart UK Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Eckhart' AND companies.Company = 'Eckhart & Company Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Greg Newman' AND companies.Company = 'Ecolab';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael J Fox' AND companies.Company = 'Ecoline Labeling Technolgy Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Raul Molina' AND companies.Company = 'Ecuatech Digital';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karl Schmucker' AND companies.Company = 'Edale America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kevin Trimble' AND companies.Company = 'Edale Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adolph Guenter' AND companies.Company = 'Edelmann Graphics GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Eduardo Chiozzi SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Caroline Porterfield' AND companies.Company = 'Edwardthompson';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fred Rosenzweig' AND companies.Company = 'EFI for Imaging Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen Emery' AND companies.Company = 'Efi Inkware';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eli Shalev' AND companies.Company = 'EFI Israel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Edwards' AND companies.Company = 'EFI Jetrion Industrial Inkjet Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jason Oliver' AND companies.Company = 'EFI Jetrion, LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Walter Wafler' AND companies.Company = 'EFI Rastek';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joe Lahut' AND companies.Company = 'EFI VUTEk';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Henry Dou' AND companies.Company = 'EFI, China';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ardis Markss' AND companies.Company = 'Eforma';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerhard Schneider' AND companies.Company = 'Eforma Communication Industry Leaders AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Victor Lopez' AND companies.Company = 'EGT - PlanetB Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ramses M Louca' AND companies.Company = 'Egyptian Paper Converting Co (EPAC)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Berhardt Ehret' AND companies.Company = 'Ehret Control GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Giovanni Tabasso' AND companies.Company = 'Eidos S.P.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicholas' AND companies.Company = 'Elba Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Varin Havlicek' AND companies.Company = 'Electron spol. Sro';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Electronic Data Magnetics, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Josef Kirmeier' AND companies.Company = 'Elmeco Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kovac Akos' AND companies.Company = 'Elmed d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shlomo Avraham Mr' AND companies.Company = 'Elsop Fontisop Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexander Kazancev' AND companies.Company = 'EL-TEK (Label Technology)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Gunter Tautorus' AND companies.Company = 'Eltromat GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Volkmann' AND companies.Company = 'Elvo Coding GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergio Arce Hiriartt' AND companies.Company = 'Em Graphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Evgeni Mateev' AND companies.Company = 'EMA Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Shepherd' AND companies.Company = 'Emdot Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr Boat' AND companies.Company = 'EME-Engel BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrey Zalesskiy' AND companies.Company = 'Eminent Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mohammed Al Hashimi' AND companies.Company = 'Emirates Trans Graphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adam Robak' AND companies.Company = 'EMIS Sp. z.o.o';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Samir Buhatem' AND companies.Company = 'Empresa Brasileria de Embalagens Flexiveis EMBRAFLEX';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mustafa Colak' AND companies.Company = 'EMS Sistem Otomasyon';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Salvatore Puglisi' AND companies.Company = 'EMWI Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Louis Dubuit' AND companies.Company = 'Encres Dubuit';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Bateson' AND companies.Company = 'Engage Technologies, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ken Hawley' AND companies.Company = 'Engineered Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gunnar Oli Erlingsson' AND companies.Company = 'ENSO';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dirk De Vroede' AND companies.Company = 'Enveloppen De Vroede';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shavkat Turakhanov' AND companies.Company = 'EOS RISQ Uzbekistan';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fiona Macbeth' AND companies.Company = 'epMI Printview';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vladimir (Nikolaevich) Tokarev' AND companies.Company = 'EPO';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wilfried Rohde' AND companies.Company = 'Epsilon Gessellschaft';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Takashi (Tom) Miyasaka' AND companies.Company = 'Epson';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Duncan Ferguson' AND companies.Company = 'Epson';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tuyoshi Sano' AND companies.Company = 'Epson America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jordi Castillo' AND companies.Company = 'Epson Marketing Division';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rafael Latorre' AND companies.Company = 'Equipamentos MCPACK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Anderau' AND companies.Company = 'Eracom Ecole Romande d\'Arts et Communication';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Aykut A Dortkol' AND companies.Company = 'Erdem Label';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans-Peter Tobler' AND companies.Company = 'ErgoSoft AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ercan Yavuz' AND companies.Company = 'Ermet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Krainicuik' AND companies.Company = 'Ernest Green & Son Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erich Herbolzheimer' AND companies.Company = 'Ertec S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hensen Gurt' AND companies.Company = 'ES International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roberto Posarelli' AND companies.Company = 'Esanastri';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Krikunova Oxana' AND companies.Company = 'Esaprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian Bender' AND companies.Company = 'ESB - Elektro Systembau Bender GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jorn Hartmann' AND companies.Company = 'ESC Europa-Siebdruckmaschinen-Centrum GmbH & Co.KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Najeeb Khalid Mr' AND companies.Company = 'Escher-Grad Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrice Giraud' AND companies.Company = 'Esisar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Argen Maarleveld' AND companies.Company = 'EskoArtwork';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Buttiens' AND companies.Company = 'ESMA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philippe Diot' AND companies.Company = 'Essilog/Asilab';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephanie Poirer' AND companies.Company = 'Essilor Internatinal SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Norbert Estermann' AND companies.Company = 'Estermann';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marc Schlappach' AND companies.Company = 'ETA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Julien Marguet' AND companies.Company = 'Etel S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frederic La Brie' AND companies.Company = 'ETI Converting Equipment';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alfonso Adauy Ch' AND companies.Company = 'ETI Press';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Etiexpress Ltda';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Winfried Dudzik' AND companies.Company = 'Etifix GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adrian Romo' AND companies.Company = 'Etiflex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tomaz Praprotnik' AND companies.Company = 'ETIKETA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paulo Cesar Lage' AND companies.Company = 'Etilage';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Samuel Scheunia' AND companies.Company = 'Etilux';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jes Hilfling' AND companies.Company = 'Etipol A/S Printing Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Etiport';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerardo Gonzalez Serna' AND companies.Company = 'Etiprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fabio Stefani' AND companies.Company = 'Etiquetas Adhesivas, S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Olga Vargas' AND companies.Company = 'Etiquetas Autoadhesivas SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pierre Roberge' AND companies.Company = 'Etiquettes Profecta Labels Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rodis Ferrari' AND companies.Company = 'Etirama Industria de Maquinas Ltda';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Etter' AND companies.Company = 'Etter Druck & Organisation GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alain Feiguel Mr' AND companies.Company = 'Eurisys';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wim De Buck Mr.' AND companies.Company = 'Euro Griffe sas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcio Valentim' AND companies.Company = 'Eurofarma';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Shin' AND companies.Company = 'Europe Graphics Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'European Master Batch';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frederic M Lagier' AND companies.Company = 'Europrocess';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Raffaele Schirinzi' AND companies.Company = 'EUROSCREEN S.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Safak Aydogan' AND companies.Company = 'Eurotech Printers (Teknotan Ltd)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adam Zur Mr' AND companies.Company = 'Eurotrade Grupa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gilles Richard' AND companies.Company = 'Euteles';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dragan Gajevic' AND companies.Company = 'Everest D.O.O.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rajitha De Silva' AND companies.Company = 'EW-Informations Systems Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'S K Chi' AND companies.Company = 'Exax';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sabine Mewis' AND companies.Company = 'Excel Automotive Deutschland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrew Keating' AND companies.Company = 'Excel Labels Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kristo Karamanov' AND companies.Company = 'Excellpak Bulgaria LTD';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Kay' AND companies.Company = 'EXFO Photonic Solutions Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Davie' AND companies.Company = 'Expedite';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Johnny Fernando' AND companies.Company = 'Expo Industrial Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Expoelectronica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Zeev Sela' AND companies.Company = 'EZ Hi Tech International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chrizos Demetriou Mr' AND companies.Company = 'F & C Georgiou Trading Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Allan Paterson' AND companies.Company = 'F Bender Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Isaac Salm Pinsky' AND companies.Company = 'Fabrica de Cajas de Carton S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Reed' AND companies.Company = 'Farban';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cornelis Bouman' AND companies.Company = 'Farbwerke Herkula St. Vith S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Farnell';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Breunig' AND companies.Company = 'Fast Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Angell' AND companies.Company = 'FATS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Osbon' AND companies.Company = 'FedEx Express';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Luca Fedrizzi Mr' AND companies.Company = 'Fedrizzi Etichette';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philip Grimm' AND companies.Company = 'Felga B&G Etichette';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ciaran McAleer' AND companies.Company = 'Fen Technology Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alberto Barabino Mr' AND companies.Company = 'Ferrania Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergio Benedetto' AND companies.Company = 'Ferrero SpA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Didier Cordeau' AND companies.Company = 'Ferro Couleurs France S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Artur Bechtloff' AND companies.Company = 'Ferro GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pedro Haussdorff' AND companies.Company = 'Ferro Spain S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kristian Larsen' AND companies.Company = 'Ferrosan A/S';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Floyd van der Koppel' AND companies.Company = 'Ferrostaal Equipment Solutions (Pty) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ricardo Rodriguez Delgado' AND companies.Company = 'FESPA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nigel Bromley' AND companies.Company = 'FFEI (Fuji Film Electronic Imaging)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Farinelli' AND companies.Company = 'Fiber Packaging Systems Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Swartz' AND companies.Company = 'File System Labs';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hubert Veyrat' AND companies.Company = 'First EIE SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Philippe Muller' AND companies.Company = 'Fisher Clinical Services GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Nicholas Hellmuth' AND companies.Company = 'Flaar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Roberts' AND companies.Company = 'Flashbay';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John' AND companies.Company = 'Fleetwood Packaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Diego Fischer' AND companies.Company = 'Flexcell - VHF Technologies SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'FlexoArt Graphic Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Julie Alan' AND companies.Company = 'Flexocolor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Igor V Kistenev' AND companies.Company = 'Flexography & Special Printing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Rasenberger' AND companies.Company = 'FlexoLaser GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joseph Kong' AND companies.Company = 'Flexolutions Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr Straaigar' AND companies.Company = 'Flexprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bob Klosinski' AND companies.Company = 'Fluxin LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Flying Null Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Berdsley' AND companies.Company = 'Focus Label Machinery Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Foil Stamping & Embossing Association';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adam Morawiecki' AND companies.Company = 'Foldruk';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Micha Mueller' AND companies.Company = 'Folex AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manny Laureano' AND companies.Company = 'Food For All, Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yaroslav Vladimirovich Dragunov' AND companies.Company = 'Forintek-Bel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuri Pasko' AND companies.Company = 'FORJET';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Lundgren' AND companies.Company = 'FORMAC AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oscar Pereda' AND companies.Company = 'Formacion Digital';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mauricio Benavides' AND companies.Company = 'ForzaForm S.A. de C.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hermann Müller' AND companies.Company = 'FPT Robotik GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rodolphe Pailliez' AND companies.Company = 'France Graphique';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Josepe Giannino' AND companies.Company = 'Franchini & C S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frank Brunner' AND companies.Company = 'Frank Brunner Elektroservice';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Claudia Schickling' AND companies.Company = 'Franz Barta GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marco Roda' AND companies.Company = 'Fratelli Roda SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adrian Goldberg Mr' AND companies.Company = 'Fraunhofer Institut IKTS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Reinhard R Baumann' AND companies.Company = 'Fraunhofer Institut Zuverlassigkeit und Mikrointegration';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dieter Ondratschek' AND companies.Company = 'Fraunhofer Institute, Manufacturing Engineering and Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Specht' AND companies.Company = 'Fraunhofer-Institut für Solare Energiesysteme ISE';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adriaan Bekker' AND companies.Company = 'Free State Business';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carlos Correa' AND companies.Company = 'Freitas & Correa Ltda';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergio Alfredo Serafini' AND companies.Company = 'Freshline';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marco Fontana' AND companies.Company = 'FTEX s.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Ormshaw' AND companies.Company = 'Fujifilm Imaging Colorants Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jose Liserre' AND companies.Company = 'Full Mark S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albert Torras' AND companies.Company = 'Funitec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Harbourne' AND companies.Company = 'Fusion UV Systems Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'K N Shivakumar' AND companies.Company = 'Futura';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Edmunds' AND companies.Company = 'Future Wales';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Todor V Domoustchiev' AND companies.Company = 'Fuzion Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Chambers' AND companies.Company = 'GALF';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pat' AND companies.Company = 'Gallows Guest House';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Baumann' AND companies.Company = 'Gallus Ferd Rüesch AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniele Madureri' AND companies.Company = 'GAM International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alberto Gambarelli' AND companies.Company = 'Gambarelli Impianti s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hossam Elsayed' AND companies.Company = 'Gamma Electronics - Eygpt';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Gamma Firma Fonograficzna';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Gandi' AND companies.Company = 'Gandi Innovations Corp';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Munther Jaber' AND companies.Company = 'Gasman Advertising';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Danni Issa' AND companies.Company = 'GBC Australia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jason Su' AND companies.Company = 'GCC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'GCC Europe B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lars Vreeke' AND companies.Company = 'GCS Nederland BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'G K Deshpande' AND companies.Company = 'Geekay Print and Packaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sebastien SUBRA' AND companies.Company = 'Gemalto';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Gems Sensors & Controls';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Maurer' AND companies.Company = 'Gems Sensors Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yukinari Ishida' AND companies.Company = 'General';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mikiya Okochi' AND companies.Company = 'General Technology (Japan)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Park' AND companies.Company = 'Genix Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Nurmi' AND companies.Company = 'Genoa Inkjet Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Vanast' AND companies.Company = 'Gentex Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kehinde Adewale' AND companies.Company = 'Geo Kena (Nig.) Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Harold Stickney' AND companies.Company = 'George Schmitt & Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rita Geraerts' AND companies.Company = 'Geraerts NV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adrian Cardoso' AND companies.Company = 'Gerardo Ortiz & Hijos c.Ltda';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jeff Brodersen' AND companies.Company = 'Gerber Scientific Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John E LaFleche' AND companies.Company = 'Gerber Scientific Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kenny Hechmann' AND companies.Company = 'Gerhardt Internationl A/S';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Kobi Tadmor' AND companies.Company = 'Getter Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerard Vanloo' AND companies.Company = 'Gevalo NV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Lyus' AND companies.Company = 'GEW (EC) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Walter' AND companies.Company = 'GEWA Etiketten GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Dieter Gwinner' AND companies.Company = 'GfO Gesellschaft fur Oberflachentechnik mbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerald Gliemann' AND companies.Company = 'GG Golfzubehoer';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicholas P Barker Ph.D' AND companies.Company = 'GI Company, Inc (The)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Montse Sardina Mr' AND companies.Company = 'Giapack';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jordi Codina Pujol' AND companies.Company = 'Giave';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pierre Perdriaud' AND companies.Company = 'GIC Omegher';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Goetz' AND companies.Company = 'Giesecke & Devrient GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Atsushi Ishikawa' AND companies.Company = 'Gifu Shellac Mfg Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Gilles Buisson Consulting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Franklin J Nice' AND companies.Company = 'Gintzler Graphics Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Perry Kaye' AND companies.Company = 'Gizmo Enterprises';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Guilherme S. Cirilo' AND companies.Company = 'GJG Studio';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergey Vasiliev' AND companies.Company = 'Glasstools Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rodolfo Panuco Rodriguez' AND companies.Company = 'Global Graphic Equipment S.A. de C.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ayman Abo El Farag' AND companies.Company = 'Global Graphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nick Geddes' AND companies.Company = 'Global Inkjet Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juan Diaz Diaz' AND companies.Company = 'Global Print Monitor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Valery Tupov' AND companies.Company = 'Global Printing Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nigel Williams' AND companies.Company = 'Global Security Technologies Inc - GST';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Pedersen' AND companies.Company = 'Global Tag & Label Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oliver Weinmann' AND companies.Company = 'Glücksband Roth GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Baker-Homes' AND companies.Company = 'Glunz & Jensen';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Godex Europe GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob/Emma/Nicola' AND companies.Company = 'Golden Ball Hotel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Reza Golestaneh' AND companies.Company = 'Golestaneh Press';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Gluck' AND companies.Company = 'Gordon Sinclair';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing. Marcello Gobita' AND companies.Company = 'Graf s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fabrizio Campini' AND companies.Company = 'Grafica SIVA srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Tanner' AND companies.Company = 'Graficon Maschinenbau AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Grafika Plus';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ariel Prieto' AND companies.Company = 'GRAFIN';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Irina Nitusova' AND companies.Company = 'Grafische Maschinen - Grafimex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Freitag' AND companies.Company = 'Grafische Systeme';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bernard Brkic' AND companies.Company = 'Grafit d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mats Markland' AND companies.Company = 'Grafotronic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tim Catoor' AND companies.Company = 'Imec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Vaughn' AND companies.Company = 'Grafton Projects';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ivan A. Cherkasov' AND companies.Company = 'Gramex Flexo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Crosby' AND companies.Company = 'Grand Rapids Label Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Markus Portmann' AND companies.Company = 'Graph Tech USA LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Panos Dimitropoulos' AND companies.Company = 'Graphcom';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kristen Read' AND companies.Company = 'Graphic Arts Magazine';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin L Cleary' AND companies.Company = 'Graphic Controls LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing. Orlando Sanabria Cano' AND companies.Company = 'Graphic Solutions International Ltda';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'GraphicAll Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jerry Feil' AND companies.Company = 'Graphicsland';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fabrice Vernay' AND companies.Company = 'Graphimat';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Charlie Yang' AND companies.Company = 'Graph-Tec America Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcel Galliker' AND companies.Company = 'Graph-Tech';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Donna Ivy Aranha Ms' AND companies.Company = 'Grapo Technologies a.s.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ruud Schenning' AND companies.Company = 'Grauel International BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pierre-Yves Arroyo' AND companies.Company = 'Gravograph';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'GRE Digital Solutions Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger Wey' AND companies.Company = 'GRE Engineering AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Mueller' AND companies.Company = 'Green Curtain Projects';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Renat Rahimov' AND companies.Company = 'Green light';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gaetano Di Cioccio' AND companies.Company = 'Greis';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Grethe Softeland' AND companies.Company = 'Grenen Digitaltrykkeri';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Umbdenstock' AND companies.Company = 'Griffin-Rutgers Co., Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Grigi Ruben' AND companies.Company = 'Grigi Grafica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francesco Parisi Dr' AND companies.Company = 'GRINP lights your plasma s.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stu Brownell' AND companies.Company = 'Group O';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fabrice Pianet' AND companies.Company = 'Groupe Gresset';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oscar Pereda' AND companies.Company = 'Grupo Industrial ELVOD S.A. de C.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oscar Ayerve' AND companies.Company = 'Grupo Taski';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Luiz Coube' AND companies.Company = 'Grupo Tiliform';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alberto Annovi' AND companies.Company = 'Gruppo TecnoFerrari S.p.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Angel Garcia Martinez Mr' AND companies.Company = 'GRYS Romero Garcia S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger Wey' AND companies.Company = 'GS & S Partners GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yasuhito Sato' AND companies.Company = 'GS Yuasa Lighting Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Harris' AND companies.Company = 'GSM Graphic Supplies & Machinery Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrew Farthing Mr' AND companies.Company = 'GSM Primographic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Gregory Whiting' AND companies.Company = 'GTI';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Davide Guidolin' AND companies.Company = 'Guidolin Davide';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dennis Flanagan' AND companies.Company = 'Gulton Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Selter' AND companies.Company = 'Gustav Selter GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hercules Heracleous' AND companies.Company = 'H. Hercules Sports Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bhavesh Doshi' AND companies.Company = 'H.K. Printers Pvt. Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans Cuppen' AND companies.Company = 'HaCuTec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Konstantin V Salastey' AND companies.Company = 'Halk.Ru';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gary Hall' AND companies.Company = 'Hallmark equipment service ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen P Lyon' AND companies.Company = 'Halm Industries Co Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marco Verkade' AND companies.Company = 'Halm Industries International Co Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Christian Heyn' AND companies.Company = 'Hamburg University';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'M R Lesaras' AND companies.Company = 'Hamta Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gadi Arnon' AND companies.Company = 'Hanita Coatings';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Braden Chang' AND companies.Company = 'Hanky & Partners Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mathias Theiler' AND companies.Company = 'Hapa AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Burmester' AND companies.Company = 'HAPS Enterprise Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefan Harder' AND companies.Company = 'Harder Druckerei';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Potter' AND companies.Company = 'Harland Machine Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hussein Hawatmeh' AND companies.Company = 'Hawatmeh P Press Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Guilherme Madureira' AND companies.Company = 'HD Brasil';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Terri Reeb' AND companies.Company = 'Health Care Logistics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Goos' AND companies.Company = 'Heidelberg Druckmaschinen AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicole Schaefer' AND companies.Company = 'Heidelberger Druckmaschinen AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joerg Suhr' AND companies.Company = 'Heidelberger Druckmaschinen Imaging Systems AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vera Winter' AND companies.Company = 'Heinr W Trott GmbH & Co KG - Seltro';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rainer Flohr Dr' AND companies.Company = 'Heinrich Mantel AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philippe Toussieux' AND companies.Company = 'Heliocopie';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Didier Libs' AND companies.Company = 'Helios International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthew Taylor Ph.D' AND companies.Company = 'HelioVolt';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oliver Arghirescu' AND companies.Company = 'Hell Advertising';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicola Mingirulli' AND companies.Company = 'Helmholtz-Zentrum Berlin für Materialien und Energie GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexander Golub' AND companies.Company = 'Helvetica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Borja Henche Cuesta' AND companies.Company = 'Henche';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Julian Priddle' AND companies.Company = 'Heraeus Amba Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jurgen Woityschyn' AND companies.Company = 'Herpa Miniaturmodelle GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ingo Hess' AND companies.Company = 'Hess GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert (Bob) Coppola' AND companies.Company = 'Hewlett Packard Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Hewlett Packard Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniel Sparrow' AND companies.Company = 'Hewlett Packard Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sara Fortea' AND companies.Company = 'Hewlett Packard Espanola, S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bruno Trouve' AND companies.Company = 'Hewlett Packard France';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phil Keenan' AND companies.Company = 'Hewlett Packard Ireland Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francesco Montrone' AND companies.Company = 'Hewlett Packard Italiana s.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Napoleon  Leoni,  Ph. D.' AND companies.Company = 'Hewlett Packard Labs';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nachi Tamura' AND companies.Company = 'Hewlett-Packard Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Hexion Speciality Chemicals';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karl A Karst' AND companies.Company = 'HID Global';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Artashes G Harutyunyan' AND companies.Company = 'Hider Trading (Shanghai) Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Filip Maricak' AND companies.Company = 'Hijet d.o.o';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Parks' AND companies.Company = 'Hijet Inkjet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dan Slep' AND companies.Company = 'Hilord Chemical Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Hine' AND companies.Company = 'Hine Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Hintermann Ink Jet Service';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scipio Schneider' AND companies.Company = 'Hirlinger Precision Rulers ag';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Stevenson' AND companies.Company = 'Hitec Sheet Metal';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albert Hof Mr.' AND companies.Company = 'Hofprint Etiketten';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Chiang' AND companies.Company = 'Holo Image Technology, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tymoshenko Andriy Mr' AND companies.Company = 'Holography';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Navneet Kumar Goel' AND companies.Company = 'Holostik India Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Maosheng Ren, Ph D.' AND companies.Company = 'Holst Centre/TNO';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dipl. -Ing. Ludwig Albrecht' AND companies.Company = 'Homag Holzbearbeitungssysteme AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Homayoun Shahrestani' AND companies.Company = 'Honaz FZCO';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Andy Wragg' AND companies.Company = 'Honeywell Control Systems Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tatsushi Shimomura' AND companies.Company = 'Hong Kong A-POS Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Magdy Farid' AND companies.Company = 'Hoshan Company Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rick Bigaouette' AND companies.Company = 'HP ColorSpan Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Aya Blumberg' AND companies.Company = 'HP Scitex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Per Sørensen' AND companies.Company = 'HSA Systems ApS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'HSA USA - SEE DARTRONICS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Wolfgang Eberhardt' AND companies.Company = 'HSG-IMAT';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jochen D Westerich' AND companies.Company = 'Hugo Hamann';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bob Huhle Mr' AND companies.Company = 'Huhle Marketing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eagle Zhong' AND companies.Company = 'Huizhou A&C  Import & Export Co.Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jonathan Seres' AND companies.Company = 'HUMA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mack Xin' AND companies.Company = 'Human Digital Technology (Shanghai) Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Hails' AND companies.Company = 'HumphreyLine Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Till Bär Mr.' AND companies.Company = 'Hydro Aluminium Deutschland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian Heys' AND companies.Company = 'Hydrophilm Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Meier' AND companies.Company = 'Hymmen GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sheldon Brear' AND companies.Company = 'Hyperthem Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Arnoud Augustinus Mr' AND companies.Company = 'IAI Industrial Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'José Antonio Bou Ortells' AND companies.Company = 'Ibersoluciones';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gabriella Galli' AND companies.Company = 'IBM Research GmbH - Zürich Research Laboratory';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Charlie Hanna' AND companies.Company = 'IBS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tomek Wierzchowski' AND companies.Company = 'ICD Coatings';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chien Hung Chen' AND companies.Company = 'ICF Technology Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Edward Ettehad' AND companies.Company = 'ICG International Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sanjeev Bajaj' AND companies.Company = 'ICH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Christopher' AND companies.Company = 'Ichris Industries';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Igor Korczagin' AND companies.Company = 'ICI Strategic Technology Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Xavier Granados' AND companies.Company = 'ICMAB - CSIC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wolfgang Mitterhuemer' AND companies.Company = 'Icon Print Innovations Pty Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Greg Benn' AND companies.Company = 'ID & C Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Levien' AND companies.Company = 'Identify Direct Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Geoff Giles' AND companies.Company = 'iDi Pac Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lutz Lagemann' AND companies.Company = 'ID-Label GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'ID-SYSTEC GMBH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Tomczyk' AND companies.Company = 'IGH Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Schipper' AND companies.Company = 'IGT Testing Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Luc Lessard' AND companies.Company = 'Iguane Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tokuya Ohta' AND companies.Company = 'IJ-DynamiX';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Louis Gautier' AND companies.Company = 'iJet/Inkjet Engine Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dale Pearce' AND companies.Company = 'IJS Global (UK) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John van Dockum' AND companies.Company = 'Imaca';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lesley Simpson' AND companies.Company = 'Image Reports';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Reza Jafari' AND companies.Company = 'Imagemart';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joan Ashley' AND companies.Company = 'ImageXpert';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jürgen Tesch' AND companies.Company = 'Imaging Solutions AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Hopkins' AND companies.Company = 'Imaging Systems Group Inc (iSys), The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Imaging Technology Inc,  iTi USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Demyanovich' AND companies.Company = 'Imaging Technology International,  iTi UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Hristov' AND companies.Company = 'Imax Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralf Eisele' AND companies.Company = 'IMO, Ingo Mueller Oberflaechentechnik e.K.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Henning Frunder' AND companies.Company = 'Impaction';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fernando Soriano Iniesta' AND companies.Company = 'Impaorsa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kingsley Ho' AND companies.Company = 'Imperial College London';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bruno Marmonnier' AND companies.Company = 'Impika SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kurt Wallerstorfer' AND companies.Company = 'Impress Decor Gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Richardson' AND companies.Company = 'Impression Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cristiano Klein' AND companies.Company = 'Impressiona';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bamford,  Bill' AND companies.Company = 'Impressions International Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ron Mifsud' AND companies.Company = 'Impressions Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pierre Delferriere' AND companies.Company = 'Imprimerie Delferriere';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frederic d\'Orsay' AND companies.Company = 'Impuls Technologies, S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Buskirk' AND companies.Company = 'Imtech';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen Tunnicliffe Wilson' AND companies.Company = 'Inca Digital Printers Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Per J Hellsung' AND companies.Company = 'IncJet Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Arjun Dev Mr' AND companies.Company = 'India Sign Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'G Pramod' AND companies.Company = 'Indo European Machinery Co. Pvt. Ltd.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marc Vandegaar' AND companies.Company = 'Industrial Solutions in Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Industromatic/Cibolo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jos Moonen' AND companies.Company = 'INEDA Engineering B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dov Gatmon Mr.' AND companies.Company = 'Infoband';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carlos Macario Meseguer' AND companies.Company = 'Infomac Ordenadores SL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Curt Fuller' AND companies.Company = 'Infoprint Solutions Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Piergianni Gaeta' AND companies.Company = 'Informa Digital Printing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sophie Matthews-Paul' AND companies.Company = 'InfoTrends';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jeff Hayes' AND companies.Company = 'Infotrends (US)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rajesh K Sethi' AND companies.Company = 'INFRES Methodex Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karl-Heinz Prostler' AND companies.Company = 'Ingenieurburo Prostler';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ronald A Ryavec' AND companies.Company = 'Ink Big Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ben Adner' AND companies.Company = 'Inkcups Now Corp';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul McGovern' AND companies.Company = 'Inkjet Consultants LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Daniel Hall' AND companies.Company = 'Inkski Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jerry Kim' AND companies.Company = 'InkTec Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Bates' AND companies.Company = 'Inline Offline Graphics Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lode Goukens' AND companies.Company = 'Innerkrust Records bvba';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Maxim Kelman' AND companies.Company = 'Innovalight Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Elaine Pullen' AND companies.Company = 'Innovation & Technology Strategies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans-Ueli Wolff' AND companies.Company = 'Innovation Wings';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Doi' AND companies.Company = 'Innovative Label Technology Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrick Becq' AND companies.Company = 'INOV-proJET SAS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albert Picher' AND companies.Company = 'Inoxcrom S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Andrew Grenville' AND companies.Company = 'Inpria Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Robert Carpenter' AND companies.Company = 'Inside 2 Outside';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Rosland' AND companies.Company = 'Intech Direct';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erwin Kempeneers' AND companies.Company = 'Integration and Consultancy Services (IACS)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Integration Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tristan Billers' AND companies.Company = 'Integration Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'George Malouf' AND companies.Company = 'Intel Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gwen Simms' AND companies.Company = 'InteliCoat';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cesar Asmat' AND companies.Company = 'Inter Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gautam Kothari' AND companies.Company = 'Interlabels Industries (P) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'International Laminating Corp.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian Shultz' AND companies.Company = 'International Plastic Cards, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fred Christopher' AND companies.Company = 'International Trimmings & Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ivan Mihaylovich Leonchik' AND companies.Company = 'InterPak';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralf Landgraf' AND companies.Company = 'Interpane';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Katarzyna Augustyniak' AND companies.Company = 'Intrex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joakim Staberg' AND companies.Company = 'Inventech Europe AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Willis \'Smiler\' Reese' AND companies.Company = 'INX Digital International Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Deborah Cross' AND companies.Company = 'INX International Ink Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexey Zaika' AND companies.Company = 'IPS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roland Friedmann' AND companies.Company = 'IQ Intelligentes Ingenieur';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Hasiuk' AND companies.Company = 'IQ Technology LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Detzner' AND companies.Company = 'Isimat';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrey Karataev' AND companies.Company = 'Isograph';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Norbert Peytour' AND companies.Company = 'IST France sarl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Achime Herzog, Mr' AND companies.Company = 'IST Metz GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Hanley' AND companies.Company = 'IT Strategies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Davide Pasini' AND companies.Company = 'Itasystem srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'M Ballini Mr' AND companies.Company = 'ITD S.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gavin Towers' AND companies.Company = 'Itochu Europe Plc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eduard Peters' AND companies.Company = 'Itraco GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Herring' AND companies.Company = 'Itw Film & Foils / Cfc Int L';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'ITW I. Kela';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Pfeifle' AND companies.Company = 'ITW Morlock GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tony Preece' AND companies.Company = 'J M Heaford Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pall Marton Mr' AND companies.Company = 'JAC Print Office';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Weber' AND companies.Company = 'Jakob Müller AG Frick';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joan Westendorff Mr' AND companies.Company = 'Jalema';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roel Augustus' AND companies.Company = 'Jalema BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Jan Molnar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Javier Nunez' AND companies.Company = 'Januve Films';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Genjiro Inukai Mr' AND companies.Company = 'Japan Electronics Ind Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Parag S Kothari' AND companies.Company = 'Jay Instruments & Systems Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kemp Tan' AND companies.Company = 'JCI Applications Pte Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'P Kumar Welengoda' AND companies.Company = 'JDC Printing Technologies (Pvt) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nick Dixon' AND companies.Company = 'JDSU Printing Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Derreck A Ford' AND companies.Company = 'JETEC Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mick Meszaros' AND companies.Company = 'JetPlate Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Furley' AND companies.Company = 'JF Machines Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wang Jun' AND companies.Company = 'Jialong Pack Group Zhaoqing B&L machine manufactur Co., LTD';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Barry Donegan' AND companies.Company = 'Jiffy Packaging Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jochen Renfordt' AND companies.Company = 'Jochen Renfordt Label Consulting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Culley' AND companies.Company = 'John Culley';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Donnelly' AND companies.Company = 'John R Wald Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Detlef Rehorek' AND companies.Company = 'Johnson Matthey Colour Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Cartlidge' AND companies.Company = 'Johnson Matthey Colour Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joohyung Lee' AND companies.Company = 'Joohyung Lee';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Khalil Mohaisen' AND companies.Company = 'Jordan Computer Forms Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Loic Delor' AND companies.Company = 'Josero SARL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christopher A Johnson' AND companies.Company = 'Jostens';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Luca Guggiari' AND companies.Company = 'J-Teck3 S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jules Farkas' AND companies.Company = 'Jules Farkas Consultants';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christopher J Shepherd' AND companies.Company = 'JumpStart Consultants';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vicente López' AND companies.Company = 'Juprima S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian Johnson' AND companies.Company = 'Just Labels Industrial';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Keith/Maggie' AND companies.Company = 'K Cars';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anil Joshi' AND companies.Company = 'K Joshi & Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James A Rice' AND companies.Company = 'K2 Advisors';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Joachim' AND companies.Company = 'K2plus Kunststofftechnik GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sailesh Kadakia' AND companies.Company = 'Kadakia International Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Kamex Graphics Kft';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jonas Zdenek' AND companies.Company = 'Kamo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuji Kitagaki' AND companies.Company = 'Kanae Engineering Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Itaru Nose' AND companies.Company = 'Kanematsu Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tatsuki Yokokura Mr' AND companies.Company = 'Kanematsu Europe Plc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kevin Tanigawa' AND companies.Company = 'Kanematsu USA Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Kanematsu USA Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kurt Schauer' AND companies.Company = 'Kaos';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kari Gronholm Mr' AND companies.Company = 'KARICO OY';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Markus Dilger' AND companies.Company = 'Karl Knauer KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'kevin G. karstedt' AND companies.Company = 'Karstedt Associates Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr G Texves' AND companies.Company = 'Katsamakis Apostolos';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Schmitt Mr.' AND companies.Company = 'KBA-Metronic AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'KCL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tomasz Dabrowski' AND companies.Company = 'KDS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Solomon Z Martins' AND companies.Company = 'KEL Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sabine Kemna Heckmann' AND companies.Company = 'Kemna Druck Kamen GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rafael Vicent' AND companies.Company = 'Kerajet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefano Pelosi' AND companies.Company = 'Kern Sistemi S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Quentin N Leef' AND companies.Company = 'Kerning Data Systems Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Derek Chard' AND companies.Company = 'Kernow Coatings';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wolfgang Zierhut' AND companies.Company = 'Kersten Elektrostatik GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dario Karpovich' AND companies.Company = 'Ketan Argentina';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pedro Gaspar' AND companies.Company = 'Key Plastics Portugal S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fabio Moretti' AND companies.Company = 'Kiian Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lewis P Orchard' AND companies.Company = 'Kimberly-Clark';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hansjörg Kirchner' AND companies.Company = 'Kimetec GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bill Jones' AND companies.Company = 'Kimoto';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jenny' AND companies.Company = 'Kingfisher Timber Products Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian Croll Mr' AND companies.Company = 'KIS, Photo-Me Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Reto Furrer' AND companies.Company = 'KNF Flodos AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jenny Nightingale' AND companies.Company = 'KNF Neuberger UK Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tadashi Honda' AND companies.Company = 'Kobayashi Create Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lars Beck' AND companies.Company = 'Kocher + Beck GmbH & Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Darko Saje' AND companies.Company = 'Koda Press Tiskarna Saje';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael J Piatt' AND companies.Company = 'Kodak Versamark Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Saso Stropnik' AND companies.Company = 'Koding';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Heinz-Bernd Schepers' AND companies.Company = 'Koechlin, Baumgartner & Cie. GmbH (KBC Manufaktur)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing. Karel Matejcek' AND companies.Company = 'Komfi';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nelson Pong' AND companies.Company = 'Komi IJ Development Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yutaka Iwata' AND companies.Company = 'Komori';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kaz Sato' AND companies.Company = 'Konica Minolta Business Machines';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark (Masahiko) Makimoto' AND companies.Company = 'Konica Minolta Business Solutions (Belgium) NV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Simpson' AND companies.Company = 'Konica Minolta Business Solutions (UK) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vit Kulka' AND companies.Company = 'Konica Minolta Business Solutions Czech, spol s.r.o';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Lindenmann' AND companies.Company = 'Konica Minolta Business Solutions Deutschland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Claude Cornillet' AND companies.Company = 'Konica Minolta Business Solutions France';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eva Dahlman' AND companies.Company = 'Konica Minolta Business Solutions Sweden AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kenichiro (Kenny) Fukasawa' AND companies.Company = 'Konica Minolta Business Solutions U.S.A., Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bobby Curtis' AND companies.Company = 'Konica Minolta Business Solutions USA Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Neal Ross' AND companies.Company = 'Konica Minolta Business Systems Solutions New Zealand Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexey Lukiyanchuk' AND companies.Company = 'Konica Minolta Business systems Solutions Russia LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Junichi Arai' AND companies.Company = 'Konica Minolta Business Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bart Snell' AND companies.Company = 'Konica Minolta Graphic Imaging USA Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Konica Minolta IJ Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shunsuke (Sean) Nishimura' AND companies.Company = 'Konica Minolta Medical & Graphic, Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Konica Minolta Medical and Graphic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Konica Minolta Photo Imaging Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Claus-Peter Schweim' AND companies.Company = 'Konica Minolta Sensing Europe B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bojan Zupancic' AND companies.Company = 'Konica Minolta Slovenija';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erik Walberg' AND companies.Company = 'Konica Minolta Technology U.S.A., Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Igor Butar' AND companies.Company = 'Konica Minolta Ukraine';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stanislav S. Ten' AND companies.Company = 'Kontinent Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'KOR Engineering';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pandet Thamangraksat' AND companies.Company = 'KOR. Printing and Sticker Tunjai Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ofer Ben Zur' AND companies.Company = 'Kornit Digital Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'W.A.C. Oostdam' AND companies.Company = 'Kortho BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Dunfield' AND companies.Company = 'Korvis Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erik Kurtz' AND companies.Company = 'Kosel GmbH & Co.KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sanjay C. Maheshwari' AND companies.Company = 'Kothari Info-Tech ltd. (KITL)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erik C Scher  Ph.D' AND companies.Company = 'Kovio Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Glenn Miller' AND companies.Company = 'KPG (Europe) Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Koji Komine' AND companies.Company = 'KPG Corporation (Japan)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrej Klima' AND companies.Company = 'KPK Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Antoine Krier' AND companies.Company = 'Krier SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hartmut Davidson' AND companies.Company = 'Krones AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francesco Schinco' AND companies.Company = 'KS Ceramic Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Petra Kammann' AND companies.Company = 'KSM';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wolfgang Engel' AND companies.Company = 'Kuhnast Strahlungstechnik GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Asif Jan Muhammad Kukda' AND companies.Company = 'Kukda Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Hedgecock' AND companies.Company = 'Kwik Kopy';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lloyd Jones' AND companies.Company = 'L & R Graphic Supply Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daoshen Bi' AND companies.Company = 'L1 Identity Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'La Metallurgica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Lab Waste';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Barry Hunt' AND companies.Company = 'Label and Labeling';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kevin Liu' AND companies.Company = 'Label and Labeling China';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Zdenek Tuma' AND companies.Company = 'Label Design';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jack Korkowski' AND companies.Company = 'Label Graphics Co Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'C P Liauh' AND companies.Company = 'Label Leader';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Malone' AND companies.Company = 'Label Power';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Boniface' AND companies.Company = 'Label Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'William G Mahoney Jr' AND companies.Company = 'Label Systems Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tim Lydell' AND companies.Company = 'Label Vision Systems Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Declan O\'Rourke' AND companies.Company = 'Label World Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Randy Bittinger' AND companies.Company = 'Label.Com';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Simon' AND companies.Company = 'Labelident GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Jackson' AND companies.Company = 'LabelMakers Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Quirk' AND companies.Company = 'Labels and Labeling Latin America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Labwaste Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ladislao C A Berkes' AND companies.Company = 'Ladislao Berkes';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rola' AND companies.Company = 'Lamasatsigns';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kovacs Ferenc' AND companies.Company = 'Laminator';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Lamitex Continuous Laminates';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Edvardas Umbrasas' AND companies.Company = 'Lanleksas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Laptops and spares';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Svetlana Balashova' AND companies.Company = 'Larsen Trade';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Larry Johnson' AND companies.Company = 'Lasersoft on Demand';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karl-Heinz Gerster' AND companies.Company = 'LÄSSER AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'William Dinauer' AND companies.Company = 'LasX Industries Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Abdelhamid Elgendi' AND companies.Company = 'Lava Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roald Leif' AND companies.Company = 'Lawrence Livermore National Security';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexander Szyszko' AND companies.Company = 'Lawson Screen & Digital Products';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joan Enrich Mr' AND companies.Company = 'Layret Trading';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marc Lafarge' AND companies.Company = 'Le Faconneur';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Henry Ralton' AND companies.Company = 'Lead Lasers BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert King' AND companies.Company = 'Leader Graphic Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Codos' AND companies.Company = 'Leggett and Platt Digital Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Torben Paarup Andersen' AND companies.Company = 'LEGO System A/S';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manfred Wenger' AND companies.Company = 'Leibinger Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Butch Lauver' AND companies.Company = 'Leibinger Numbering Machine LP';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'N Gopinathan' AND companies.Company = 'Lekshmi Offset Printers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Viktor (Borisovich) Trushin' AND companies.Company = 'Lenchrom';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Clain Anderson Mr' AND companies.Company = 'Lenovo International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'King L Lai' AND companies.Company = 'Leo Paper Group (Hong Kong) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ms. Noemi Scardovi' AND companies.Company = 'Lesepidado';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nobuyuki Nishijima' AND companies.Company = 'Lester Industry Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Smith' AND companies.Company = 'Lexitron Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Decker' AND companies.Company = 'Lexmark International, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike McPeak' AND companies.Company = 'LFP Products Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anna Sigina' AND companies.Company = 'LG Electronics Russia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ilmars Ozolins-Ozols' AND companies.Company = 'Liepajas Papirs';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jordi Limiñana' AND companies.Company = 'Limitronic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthew R Beaver' AND companies.Company = 'Lincoln Coders Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mario Rotonda' AND companies.Company = 'Linea Tessile';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kazuhiro Kusakari' AND companies.Company = 'Lintec Europe B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martyn Ward' AND companies.Company = 'Linx Printing Technologies plc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ronald Micchia' AND companies.Company = 'Lip Balm Express';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Emmanouel Bakopoulos' AND companies.Company = 'Litho Mecanica Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eduardo Smovir Ing' AND companies.Company = 'Litografía J Luis Smovir';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jill Fifoot' AND companies.Company = 'Lloyd International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Aboutanos, Vickie' AND companies.Company = 'Lomond';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Watkins' AND companies.Company = 'Longford International Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wray Porter' AND companies.Company = 'Longwood Industries Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Looser' AND companies.Company = 'Looser & Braun AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erhard Lorch' AND companies.Company = 'Lorch Engineering Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Johnston' AND companies.Company = 'Lorimier Pty. Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amit Sirpaul' AND companies.Company = 'Lotus Digital/Shanghai Zhong Yin International Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Loughborough Surface Analysis Limited (LSA)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gary Anderson' AND companies.Company = 'Loxleys Print Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Theodor Lazarescu' AND companies.Company = 'LTHD Romania';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Lucas' AND companies.Company = 'Lucas Projects Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Luciano Packaging Technologies, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bosse Andersson' AND companies.Company = 'Lundens Tryckeri AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Haller' AND companies.Company = 'Lüscher AG Maschinenbau';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Mayhew' AND companies.Company = 'Lyra Research Europe';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Baratz' AND companies.Company = 'Lyra Research Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Julia Freeman' AND companies.Company = 'Lyreco Stationery Supplies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ed Etter' AND companies.Company = 'M Rosenthal Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shelldon Stoute' AND companies.Company = 'M Solv Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joshua Schlegelmilch' AND companies.Company = 'Mac Arthur Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neil Bolding' AND companies.Company = 'MacDermid Autotype Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Ganjei' AND companies.Company = 'MacDermid Electronics Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'MacDermid Printing Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sales' AND companies.Company = 'Machine Building Systems Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stuart Milne' AND companies.Company = 'Machinery Development Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Louis Dubuit' AND companies.Company = 'Machines Dubuit';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexey Kulik' AND companies.Company = 'MacHOUSE';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bohumir Straka' AND companies.Company = 'Macron Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Oberhansli' AND companies.Company = 'MADAG Printing Systems AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Madico Graphic Films';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Doron Vanuno' AND companies.Company = 'Madnet Printing Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rajah Sunder Singh' AND companies.Company = 'Madras Secuirty Printers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Mag-Jestic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Evgeniy Kozlovskiy' AND companies.Company = 'Mahaon Techno';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott Thomson' AND companies.Company = 'Mail-O-Matic Services Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger Tangwei' AND companies.Company = 'Main Top Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pietro Silvi' AND companies.Company = 'Malbate Mecamarc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Schulmeister' AND companies.Company = 'Man Roland';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian Broussard' AND companies.Company = 'Manchac Technologies LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Umberto De Rossi' AND companies.Company = 'Mankiewicz Gebr & Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Coyne' AND companies.Company = 'Maplejet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alvaro Reyes Retana Mr' AND companies.Company = 'Maquiladora Grafica Mexicana';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'H P Schori' AND companies.Company = 'Maquinaria Suiza, S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefan Wörl' AND companies.Company = 'Marabu GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jesu Brizil' AND companies.Company = 'Marina House Advertising LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Walter Eitner' AND companies.Company = 'Mark Andy AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ken Swartz' AND companies.Company = 'Mark Andy Comco Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Howard' AND companies.Company = 'Mark Andy Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joseph P Parisi' AND companies.Company = 'Markem';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Markem Imaje SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ted Michel' AND companies.Company = 'Marking Solutions (Pty) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Bluhm Mr' AND companies.Company = 'Mark-O-Print GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eduardo Quartim Chede' AND companies.Company = 'Marte Rotulos Especiais';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Saverio Ardizzone' AND companies.Company = 'Martinenghi S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Naresh Nanda' AND companies.Company = 'Masterline Telebiz Pvt Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Santiago Bueno' AND companies.Company = 'Mastertec Document Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr Hannan' AND companies.Company = 'Matan Digital Printers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hugo Yubi' AND companies.Company = 'Matiz';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrick Sonally-LePoivre' AND companies.Company = 'Matthews';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carl Auer' AND companies.Company = 'Mayr-Melnhof Packaging Austria GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Andreas Grether' AND companies.Company = 'MBO Maschinenbau Oppenweiler Binder GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jacek Machala' AND companies.Company = 'MCD Electronics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Keith Rosenthal' AND companies.Company = 'McLoone';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Sri Priya Sundararajan' AND companies.Company = 'McMaster University';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'MCS Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jordi Grau' AND companies.Company = 'MDP Mag-D-Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Voss' AND companies.Company = 'Measurement Specialities';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Luc Martron' AND companies.Company = 'Mecanélec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ernesto Leguizamon' AND companies.Company = 'Mecanica Grafica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Plyhm' AND companies.Company = 'Meckelborg Oy';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Massimiliano Carlucci Mr' AND companies.Company = 'Mecstar srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Takeru Okumura' AND companies.Company = 'Media Technology Japan Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuri Loginov' AND companies.Company = 'Mega Factory';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Uros Slemenik' AND companies.Company = 'Megalogos d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'S J S Ghasemipour' AND companies.Company = 'Megaps Tlc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shailesh Mehta' AND companies.Company = 'Mehta Cad Cam Systems Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dirk Melzer' AND companies.Company = 'Melzer';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Juergen Schneider' AND companies.Company = 'Membrana';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sean Marske' AND companies.Company = 'Memjet Labels Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Adrian Steele' AND companies.Company = 'Mercian Labels Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Mark James' AND companies.Company = 'Merck Chemicals Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phil May' AND companies.Company = 'Merck Chemicals Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr M Heckmeier' AND companies.Company = 'Merck KGaA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Merlino Giorgio' AND companies.Company = 'Merlino Pubblicita';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Liu Kuan-Chih' AND companies.Company = 'Metal Industries Research & Development Centre';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Max Robbie' AND companies.Company = 'Metal Sign & Label Pty Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Web' AND companies.Company = 'Metal Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Ainge' AND companies.Company = 'MetalFX Technology Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mauro Castelli' AND companies.Company = 'Metallurgica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carlo Bertolini Mr' AND companies.Company = 'METALUX SpA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nabel El Ammari' AND companies.Company = 'Metaplex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sandeep M Lal' AND companies.Company = 'Metro Label Group Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrea Mettifogo' AND companies.Company = 'Mettifogo Gianni & Franco snc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andy Hancock' AND companies.Company = 'Mexar Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frank Rice' AND companies.Company = 'Meyers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mihajlo Grujicic' AND companies.Company = 'MG Printers (PVT)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Edmond Abergel' AND companies.Company = 'MGI - France SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Victor Abergel' AND companies.Company = 'MGI - USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard I. Michelman Ph.D.' AND companies.Company = 'Michelman';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Charles Tung' AND companies.Company = 'Microfluidic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Krusch' AND companies.Company = 'Microplex Printware AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stuart Clarke' AND companies.Company = 'Microsharp Corporation Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Inaki Ruiz' AND companies.Company = 'Mida Maquinaria';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michal Filipek' AND companies.Company = 'MIF s.r.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Skyte' AND companies.Company = 'Migvan';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mikael Hamskog' AND companies.Company = 'Mikael Hamskog';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Peter Atherton' AND companies.Company = 'MIKOH Corporation Ltd Research & Development Centre';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Finn Beck' AND companies.Company = 'Mikrojet Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Miroslaw Misiak' AND companies.Company = 'Mikron Poligrafia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Stoker' AND companies.Company = 'Millet The Printer';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Drew Morris' AND companies.Company = 'Milliken And Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tomislav Jurlin' AND companies.Company = 'Miltonia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Mimaki Engineering Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lonny Houn' AND companies.Company = 'Ming Kuang Enterprises Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Fisher' AND companies.Company = 'Mirage Inks Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francesco Traficante' AND companies.Company = 'MIT - Macchine Industriali Traficante';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcel Michorius' AND companies.Company = 'MITECON Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Mitra Anonim Sirketi';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Mihail Boico' AND companies.Company = 'Mitra Grup';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Takeshi Amano' AND companies.Company = 'Miyakoshi';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'M Mohsin Chowdhury' AND companies.Company = 'MMS Consortium';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Sommer' AND companies.Company = 'Modern Graphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian Thyen' AND companies.Company = 'Moderne Glass';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vittorio Corazza Mr' AND companies.Company = 'Modulsnap srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anders Moll Hansen' AND companies.Company = 'Moeller & Devicon';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuri Zaharjevskiy' AND companies.Company = 'MoloPack';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'T P Jain' AND companies.Company = 'Monotech Systems Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Miguel A.Moras' AND companies.Company = 'Moras & Cia S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ignacio Mosca' AND companies.Company = 'Mosca Empress Grafica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lionel Charpentier' AND companies.Company = 'MPO France';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Morlock' AND companies.Company = 'Mprint Morlock GmbH & Co.kg';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Denny McGee' AND companies.Company = 'MPS America LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andre Verkleij' AND companies.Company = 'MPS Systems B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Takeshi Kurihara' AND companies.Company = 'MPT-Falcon GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rico Bradley' AND companies.Company = 'MPV7';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frederic Garcia' AND companies.Company = 'MSABU Converting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manfred Muecke' AND companies.Company = 'MSC Computer';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'M-Style';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Hale' AND companies.Company = 'Mt&l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'M-Team Slovakia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'V M Gandhi' AND companies.Company = 'M-Tech Innovations Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gregory Rodin' AND companies.Company = 'MTL Print Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen Bandutsya' AND companies.Company = 'MTS / MEMS Technical Service Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Meddour Ahmed' AND companies.Company = 'MTS Constructeur';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Volker Brod' AND companies.Company = 'Mühlbauer AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerald Steinwasser' AND companies.Company = 'Mühlbauer Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Kearns' AND companies.Company = 'Muller Martini';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gjorgji Hristovski-Goshe' AND companies.Company = 'Multi Medija';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Reha Emden' AND companies.Company = 'Multi Packaging Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bendjedid El Mendji' AND companies.Company = 'Multi Systemes & Materials (MSM)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daren Hudson' AND companies.Company = 'Multi-Color Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hay de Bitter' AND companies.Company = 'MultiCopy Venlo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rafal Sochacki' AND companies.Company = 'MultiGraf';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vernon Ralston' AND companies.Company = 'Multiplastics Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hassan Kittaneh' AND companies.Company = 'Multisystem Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ryszard Kiernicki' AND companies.Company = 'Multivac Spolka z.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nishant Aggarwal' AND companies.Company = 'Munshiram International Business Machines (MIBM)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Toru (Tom) Hiraoka' AND companies.Company = 'Muratec Europe GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sakir Yalcin Mr' AND companies.Company = 'MUSTAFA YALCIN Poultry Food Machine Constr. Ind & Trade Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adrian Musumeci' AND companies.Company = 'Musumeci Grafica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Mutoh Belgium NV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'My Memory';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ron  Zohar' AND companies.Company = 'MY Polymers Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juergen Belthle' AND companies.Company = 'Myminis';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kenan Erdem' AND companies.Company = 'NAC Digital Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Werner Nagels' AND companies.Company = 'Nagels Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Satoshi Ogata' AND companies.Company = 'Nakan Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matt Spencer' AND companies.Company = 'Nanocomposix';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Henyk' AND companies.Company = 'Nanogate Advanced Materials GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ikuo Mori' AND companies.Company = 'NanoGram Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Oliver Schurr' AND companies.Company = 'Nanoident';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Mathias Morgenroth' AND companies.Company = 'Nanosec GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sascha Lehmann' AND companies.Company = 'NANO-X GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuriy Grebennykov' AND companies.Company = 'Naroozhka -Ukraine edition-';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Yost' AND companies.Company = 'National Carton And Coating Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fermin Coei' AND companies.Company = 'Navarest';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sharif Khan' AND companies.Company = 'Navin Digitech Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Judy Heft' AND companies.Company = 'Nazdar Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jamie Moores' AND companies.Company = 'Nazdar UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nikolas Karamalikis' AND companies.Company = 'NCA Hellas Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcel van Veen' AND companies.Company = 'Nedap Light Controls';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gifir Sing Negi' AND companies.Company = 'Negi Sign Systems & Supplies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Cassin' AND companies.Company = 'Nelson\'s Labels (Manchester ) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Pearce' AND companies.Company = 'Nemco';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philippe Weber' AND companies.Company = 'Neo Color';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing Giovanni Meani' AND companies.Company = 'NEOLT SpA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Franck Chevallier' AND companies.Company = 'Neopost Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Woods' AND companies.Company = 'Neopost Technologies Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefano Bavelloni' AND companies.Company = 'Neptun SrL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dominique Martin' AND companies.Company = 'Neryos';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrei Stein' AND companies.Company = 'Nestra Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Murray' AND companies.Company = 'New Era Packaging Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'New Hi-Tech Products';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hermann Will' AND companies.Company = 'New Media Magazine Verlag GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrej Hvalic' AND companies.Company = 'New System - Orbotech';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Horn' AND companies.Company = 'New Technology CADCAM Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bret Bailey' AND companies.Company = 'Newfoil Machines Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Loop' AND companies.Company = 'Nexgen Packaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Julian Brown' AND companies.Company = 'Nexus Electronics Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tsunetake Itakura' AND companies.Company = 'Nichia Europe B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Stepan' AND companies.Company = 'Nicos CZ';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Nikkoshi Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alton Phillips' AND companies.Company = 'Nikon Research Corporation of America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jakob Landberg' AND companies.Company = 'Nilpeter A/S';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Yeomans' AND companies.Company = 'Nimlok Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Maria' AND companies.Company = 'Nimlok USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tetsuya Tomita' AND companies.Company = 'Nippon Kayaku Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michel Martino Mr' AND companies.Company = 'Nipson SAS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrey Vasiliev' AND companies.Company = 'NISSA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Y Hwang' AND companies.Company = 'Noah\'s Paper Mill Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefan Tenghagen' AND companies.Company = 'Nolato AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergio Engrassi' AND companies.Company = 'Nordest Nova';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alan Mills' AND companies.Company = 'Nordson UV Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yuki Tsuji' AND companies.Company = 'Noritsu Koki Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brad Elledge' AND companies.Company = 'Nosco';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Damien Ruegg' AND companies.Company = 'Notestec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Detlef Machei' AND companies.Company = 'Novamelt GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roberto Michelena' AND companies.Company = 'Novaprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juan Carlos Cantu' AND companies.Company = 'Novaprint/Pharmapack';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dario Camorani' AND companies.Company = 'Novattiva S.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Max Klipper' AND companies.Company = 'Novel Design INT.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'G Jeffrey Arippol' AND companies.Company = 'Novelprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gianfranco Orlandi' AND companies.Company = 'Nowel Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Newton' AND companies.Company = 'nScrypt Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'NT Cadcam';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Porthouse' AND companies.Company = 'Numatic International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Federico D\'Annunzio' AND companies.Company = 'Nuova Gidue S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nachum Korman' AND companies.Company = 'NUR America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marian Cofier' AND companies.Company = 'NUR Macroprinters';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lee Hock Peng' AND companies.Company = 'Nutek Private Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Williams' AND companies.Company = 'Nypro Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Nypro Tool Hong Kong Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bari Ari' AND companies.Company = 'O N E  Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Meir Bar Nathan' AND companies.Company = 'Objet Geometries Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tim Crandall' AND companies.Company = 'Océ Display Graphics Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Klaas Brons' AND companies.Company = 'Océ Nederland B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joost Anne Veerman' AND companies.Company = 'Océ Technologies BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'K C Chao' AND companies.Company = 'Ocean Net Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian Marsch' AND companies.Company = 'Océ-Deutschland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mag. Wolfgang Glaser' AND companies.Company = 'Océ-Osterreich GesmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Victor Corral' AND companies.Company = 'Ocsa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mauro Atti' AND companies.Company = 'Officine SMAC S.p.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tim Leciejewski' AND companies.Company = 'Ohio Addressing Machine Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Tanuma' AND companies.Company = 'OKI Data Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Oki Europe Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Czeslaw Olejniczak' AND companies.Company = 'Oltronik';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Olympus';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefano Corani' AND companies.Company = 'Omet Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Victor Pena' AND companies.Company = 'Omniprint International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David L Hardman Jr' AND companies.Company = 'Omnova';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paolo Rocchi Mr' AND companies.Company = 'Ondaplast S.P.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Vandegaer' AND companies.Company = 'One Solutions S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'OoVoo';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alejandro Szpektor' AND companies.Company = 'Open Pack';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phil Bowles' AND companies.Company = 'Optaglio Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Ostendorf' AND companies.Company = 'Optikett';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Herbert Wong' AND companies.Company = 'Optimas Technologies Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Opus 21';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gabi Weissman' AND companies.Company = 'Orbotech Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Overton' AND companies.Company = 'Ordnance Survey';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Munira Raja' AND companies.Company = 'Organic Electronics Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Giuseppe Ortali' AND companies.Company = 'Orgraf Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Misao Nakamura' AND companies.Company = 'Osaka Sealing Printing Co ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Diepens' AND companies.Company = 'OTB Solar - PixDro Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roy Theisen' AND companies.Company = 'Output Solutions GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anu Ilmonen' AND companies.Company = 'Oy Keskuslaboratorio-Centrallaboratorium Ab';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Heinz Klaskala' AND companies.Company = 'P&S Vertriebs GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hirofumi Oshima' AND companies.Company = 'P.T. Ohtomi';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matei Iulian' AND companies.Company = 'Paco Media (Magazine de Publicitate)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Julian Joffe' AND companies.Company = 'Pad Print Machinery of Vermont';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dan Ljungdahl' AND companies.Company = 'Pad Return AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrik Lutz' AND companies.Company = 'PadaLuma Ink-Jet-Solutions GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Friedrich Wilhelm Dorse' AND companies.Company = 'Paderdigital';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mahmood Padidar' AND companies.Company = 'Padid Pardazesh Paydar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Doug Clark' AND companies.Company = 'Paedia LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Benno Bieri' AND companies.Company = 'Pago AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tibor Küstermann' AND companies.Company = 'PAGO Etikettiersysteme GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Sesztak' AND companies.Company = 'Paletta Invent Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Irina Guskova "Yurevna"' AND companies.Company = 'Palitra';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Graham Rogers' AND companies.Company = 'Pall Microelectronics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yves Bolis' AND companies.Company = 'Pantec Engineering AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Frei' AND companies.Company = 'Pantec GS Systems AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Panzeri';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manuel Correa' AND companies.Company = 'Papel Card';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dmitriy Shchesyuk' AND companies.Company = 'Paper House';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Geoff Southwell' AND companies.Company = 'Paperfeel ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Buzinkay' AND companies.Company = 'Papier a Polygrafia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Guido Schwender' AND companies.Company = 'Papier Schwender';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juergen Leber' AND companies.Company = 'Papierfabrik August Koehler AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pavel Putyato' AND companies.Company = 'Papillons';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Bitner' AND companies.Company = 'Paragon Machinery Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Young' AND companies.Company = 'Park Comms';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Russ Sutherland' AND companies.Company = 'Parker Racor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Zoltan Kelemen' AND companies.Company = 'Partners Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wayne Baird' AND companies.Company = 'PAT Technology Systems Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Surguy' AND companies.Company = 'Patterning Technologies Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Klaus Specker' AND companies.Company = 'Paul LEIBINGER GmbH & Co.KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Pavel Chmelar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Paxar Americas Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Paxton Sheet Metal';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Bushell' AND companies.Company = 'Peak Production Equipment Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter E J Legierse' AND companies.Company = 'Pele Consultancy International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Isabelle Kazandjian Gutgsell' AND companies.Company = 'Pelikan Hardcopy Production AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike West' AND companies.Company = 'Perancea Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Holiday' AND companies.Company = 'Performance Packaging (UK) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans Baartmans' AND companies.Company = 'Pharmalabel BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ehab Sherif' AND companies.Company = 'Pharoh Press House & Graphic Design';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Brice' AND companies.Company = 'Phast Enterprises, Llc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Willem-Jan de Wijs' AND companies.Company = 'Philips Applied Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Philips Business Center for OLED Lighting,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ir. W. Wage' AND companies.Company = 'Philips Lighting B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Hack' AND companies.Company = 'Philips Research';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Greene' AND companies.Company = 'Phillips Plastics Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'C B Park' AND companies.Company = 'Phil-Tech International Co. Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albrecht Schierholz' AND companies.Company = 'Phoenix Contact';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Les Lowry' AND companies.Company = 'Phoenix Fabrications Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Owen' AND companies.Company = 'Phoseon Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Karsten' AND companies.Company = 'Phoseon Technology UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Edward A Crowley' AND companies.Company = 'Photizo Group LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Taylor' AND companies.Company = 'Photo Electronic Services P.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Gaydarov' AND companies.Company = 'Photojet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Khalid Zahouily' AND companies.Company = 'Photon & Polymers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anatoly Schelkanov' AND companies.Company = 'Pic-Ofset';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul T McGovern' AND companies.Company = 'PicoJet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Potter' AND companies.Company = 'Picosoft';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Mayer' AND companies.Company = 'Pitney Bowes';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eddy Edel' AND companies.Company = 'Pitney Bowes Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rafal Raczka' AND companies.Company = 'Planet Graf S.C.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'PlanetB Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Elman MBA' AND companies.Company = 'Plastic Dress-Up Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Louis Glahn' AND companies.Company = 'Plastipak Packaging Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Kastberg' AND companies.Company = 'Plastprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bundit Supakijsilp' AND companies.Company = 'Platinum Research (Thailand) Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manus MacCrosain' AND companies.Company = 'Playprint Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karl Hoffman' AND companies.Company = 'PLITEK LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Colin Barnes' AND companies.Company = 'Plotter Technology Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Modesto Fabra Valls' AND companies.Company = 'Plus Stocks Trading S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Velimir Jankovic' AND companies.Company = 'PMTC Pozamanterija.HR';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Rieke' AND companies.Company = 'PNNL - Pacific Northwest National Laboratory';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philip Shaw' AND companies.Company = 'Polaris Instruments Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Myrna Belluzzo' AND companies.Company = 'POLImark S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcelo Garza' AND companies.Company = 'Poliregio S.A. De C.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hamed Modarres' AND companies.Company = 'Poly drape';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Levan Tevdorashvili' AND companies.Company = 'Polyexpress Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vladimir Litshenko' AND companies.Company = 'Polygraph Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Dinsdale' AND companies.Company = 'Polyplex Europa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Wolfgang Romer' AND companies.Company = 'Polytech Consulting GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Albrecht' AND companies.Company = 'Polytype America Corp.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Ruth' AND companies.Company = 'Polytype SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dinesh Ghosalkar' AND companies.Company = 'Pooja Graphics India Pvt ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nikola' AND companies.Company = 'Pope Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jeff Henkemeyer' AND companies.Company = 'Porous Media Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr Joan Alberich' AND companies.Company = 'PORTA Sistemas S.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Salvador Perez' AND companies.Company = 'Postal Systems Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Kilbourn' AND companies.Company = 'Poster Works, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Deering' AND companies.Company = 'Pr Products';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jasper Hulstein' AND companies.Company = 'PR Techniek Technical Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frank Pagano' AND companies.Company = 'Practical Robotic Services Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Prakesh S Sanglavi' AND companies.Company = 'Prakash Textile';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerry Renzi' AND companies.Company = 'Precision Automation Co Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nitin Patwardham' AND companies.Company = 'Precision Cutting Systems PVT Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Cox' AND companies.Company = 'Precision Engineering Plastics Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nathan L Zender' AND companies.Company = 'Precision Press';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Walker' AND companies.Company = 'Preco Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Maria Lourdes Perez' AND companies.Company = 'Prega Impresiones';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Sullivan' AND companies.Company = 'Presstek';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralf Ehrlich' AND companies.Company = 'Prettl Appliance Systems GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark D Strobel' AND companies.Company = 'Primera Technology Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Atkins' AND companies.Company = 'Primera Technology, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Birger Lolk' AND companies.Company = 'Print & Cut Scandinavia AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Garath Ward' AND companies.Company = 'Print Business';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Igor Kovalchuk' AND companies.Company = 'Print Master';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yulian Yordanov' AND companies.Company = 'Print Media ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tolnai Laszlo' AND companies.Company = 'Print Publishing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Jacobsen' AND companies.Company = 'Print Synergy 09';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steven Scaffardi' AND companies.Company = 'Print Week (Haymarket Brand Media)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Jan Franck' AND companies.Company = 'Print XChange';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shai Aveizer' AND companies.Company = 'Printar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'William Lamparter' AND companies.Company = 'PrintCom Consulting Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amer Zin Alabdeen' AND companies.Company = 'Printec Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shawn Decker' AND companies.Company = 'Printed Electronics Laboratory';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neil Chilton' AND companies.Company = 'Printed Electronics Ltd (PEL)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rick Birmingham' AND companies.Company = 'Printer Source, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Arlo E.H. Swartz' AND companies.Company = 'PrinterXpert';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Toni McQuilken' AND companies.Company = 'Printing News';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Curtis Miller' AND companies.Company = 'Printing Technology Services Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Zamir Bar-Lev' AND companies.Company = 'Printivpress';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Katharine Williams' AND companies.Company = 'Printlink';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manish Sharma' AND companies.Company = 'Printo Document Services Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing. Vladimir Lunacek' AND companies.Company = 'Print-Shop';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bernd Leising' AND companies.Company = 'Printum Maschinen und Service GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anthony Morgain' AND companies.Company = 'Printware';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rolando Sy' AND companies.Company = 'Printwealth Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Prism Coatings & Inks Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Dickin' AND companies.Company = 'Prism Electronics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yossi Kolton' AND companies.Company = 'Pro4Tech Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul France' AND companies.Company = 'Procter & Gamble Company, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marc Jobin' AND companies.Company = 'Prodevco Industries';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rich Edmisten' AND companies.Company = 'Profold, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Casagrande Renzo' AND companies.Company = 'PROGETEC s.n.c di Casagrande Renzo & C.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pietro Grazia' AND companies.Company = 'Projecta S.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'George Kalogiannidis' AND companies.Company = 'Promotex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ruben Padilla' AND companies.Company = 'Protopak Innovations';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Willard Charles Raymond' AND companies.Company = 'Prototype & Production Systems, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'PRS ROBOTICS - SEE SCRIBE US FOR CONTACTS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Panunto' AND companies.Company = 'PSI Engineering';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Udi Zohar' AND companies.Company = 'PSik Solutions Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrew Olive' AND companies.Company = 'PTFE Parts Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ilidio Dantas' AND companies.Company = 'Publicitaria Dantas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Liya Skvortsova' AND companies.Company = 'Publish';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Lode Deprez' AND companies.Company = 'Punch Graphix (Xeikon)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Josef Kratz' AND companies.Company = 'Punch Graphix Deutschland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'D C Bane' AND companies.Company = 'Pune Metagraph';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ongky Irawan' AND companies.Company = 'Pura Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris' AND companies.Company = 'Wixroyd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Franklin M Roedel' AND companies.Company = 'Pura Impressao';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'PURGUS AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Purple Hotel Cambridge';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Fernando de la Vega' AND companies.Company = 'PV NanoCell Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jordan Simas' AND companies.Company = 'PVC Floor Cooperation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philip Wallington' AND companies.Company = 'Q - Sys UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Iyad Qara\'in' AND companies.Company = 'Qaraman Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Florian' AND companies.Company = 'Q-Cells SE';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Angel Quiroga Vazquez' AND companies.Company = 'QL Etiquetas S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alan Barrett' AND companies.Company = 'Quad Graphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joe Uhlir' AND companies.Company = 'Quadrel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ming-Kai Tse, Ph.D' AND companies.Company = 'Quality Engineering Associates Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Deane Fletcher' AND companies.Company = 'Quality Transfer & Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Calogero Quartana' AND companies.Company = 'Quartana';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Raju Pradhan' AND companies.Company = 'Quaza Transfers Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'France Brodeur' AND companies.Company = 'Quebec Imprimerie';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Will Ahmad' AND companies.Company = 'Questex Asia Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Puzzuti' AND companies.Company = 'Quick Label Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gary Stamp' AND companies.Company = 'Quill Coding Solutions Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carlos Martinez' AND companies.Company = 'Quimica Grafica C.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erhard Knappe' AND companies.Company = 'QUNDIS Advanced Measuring Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francisco Bruno Mr' AND companies.Company = 'QUORUS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Howes' AND companies.Company = 'Qwik Tape';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul French' AND companies.Company = 'R A Rodriguez Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rafael Sirkis' AND companies.Company = 'R Sirkis Publishers Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard J Losch' AND companies.Company = 'R3D2 Consulting LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joze Racman' AND companies.Company = 'Racman Audio Visual Studio d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'JB Frans Erdmann Mr' AND companies.Company = 'RADER';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ferenc Borbas' AND companies.Company = 'RADIUS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chanda Bhandari' AND companies.Company = 'Rainbow Sales Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marco Nieter' AND companies.Company = 'Rako Etiketten GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ramon Baez' AND companies.Company = 'Ramon L Baez';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Miguel Gonsalez Degado' AND companies.Company = 'Ramondin Capsulas S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jürgen Hein' AND companies.Company = 'RASTAL GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rak Kumar' AND companies.Company = 'Raster Printers Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Florian Knell' AND companies.Company = 'Ravensburger Spieleverlag GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lorenzo' AND companies.Company = 'Raxyline S.R.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frantisek Mazac' AND companies.Company = 'Rayfilm s.r.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Judek' AND companies.Company = 'Raysa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Holger Herzog Mr' AND companies.Company = 'REA Elektronik GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ross Read' AND companies.Company = 'Read Label Pty';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mario Vidigal Lage' AND companies.Company = 'Ready Etiquetas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Syd Reading' AND companies.Company = 'Readyprint Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Rivett' AND companies.Company = 'REAL Digital International Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Sewell' AND companies.Company = 'REC Technology US Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fiona Neal' AND companies.Company = 'Redback Design';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger Robinson' AND companies.Company = 'Reddoordigital.Com, Llc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mike Mills' AND companies.Company = 'Redwood Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anja Heukrath' AND companies.Company = 'Reed Exhibitions Deutschland GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neil Collier' AND companies.Company = 'Reel Label Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nigel Wilson' AND companies.Company = 'Reflex Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Tymons' AND companies.Company = 'Reflex Printing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rajesh Saini' AND companies.Company = 'Regent Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Antonino Tricomi' AND companies.Company = 'Reggiani Macchine Industriali srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Ing. Ralf Sander' AND companies.Company = 'Rehau AG+Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Artur Skalski' AND companies.Company = 'Reichle & De-Massari AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergei Tchemodurov' AND companies.Company = 'Rekolte Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marko Repec' AND companies.Company = 'Rema';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Lasinger' AND companies.Company = 'RENA GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Maximilian Jaeger' AND companies.Company = 'Rena Systems Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniel Lebed' AND companies.Company = 'Repalco';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Antonio Dorigato Mr' AND companies.Company = 'Reprochimica';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Retroflex Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Raphael Ducos' AND companies.Company = 'Review of Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Armstrong' AND companies.Company = 'RFD Beaufort Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Horacio Huergo' AND companies.Company = 'Rial Sudamericana SRL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Altair M Previato' AND companies.Company = 'Riatla Papeis';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joseph J Ryan' AND companies.Company = 'RICOH Printing Systems America, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andreas Stelter' AND companies.Company = 'Ring Werbung';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jova' AND companies.Company = 'RioPrint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rajesh Nayak' AND companies.Company = 'Ripro Color Solutions Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cristiano Jory' AND companies.Company = 'Riskema Informática e Automação Ltda';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rogerio Takeshita' AND companies.Company = 'RIzon Industrial Company (Serilon)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joseph E Ward Ph. D' AND companies.Company = 'RJA Dispersions LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Norbert Müller' AND companies.Company = 'Robert Bosch GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean Herve Thimouy' AND companies.Company = 'ROC pre presse';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Chuang' AND companies.Company = 'Rockefeller University';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrew Holmes' AND companies.Company = 'Rockwell Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nuri Rodoslu' AND companies.Company = 'Rodoslu';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oprea Petrica' AND companies.Company = 'Rofobit';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr William Scholz' AND companies.Company = 'Rogers Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Julie Gederos' AND companies.Company = 'Roland DGA Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Federico Ghiringhelli' AND companies.Company = 'Roll Cover Italiana';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ulises De Carlo' AND companies.Company = 'Roll Paper S.R.L.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Rolt' AND companies.Company = 'Rolt Marketing Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nitay Rot' AND companies.Company = 'Roltag Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Giuseppe Gregori' AND companies.Company = 'Romana Promotion';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bart Roosen' AND companies.Company = 'Roosen Printing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Keng Chan' AND companies.Company = 'Roots (China Roots packaging plc)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Leszek Trzaskowski' AND companies.Company = 'Rotary Die Company Sp Z.o.o';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Davide Torresin' AND companies.Company = 'Rotas Italia S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francisco Alriols Serra' AND companies.Company = 'Rotatek';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerd Ermert' AND companies.Company = 'Roth and Weber GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nick Harrison' AND companies.Company = 'Round Peg';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Genovel Puchianu' AND companies.Company = 'Rowex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Istvan Nagy' AND companies.Company = 'RRE Szeged';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'RS Components';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Chee' AND companies.Company = 'RSI';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jurgen Schmidkunz' AND companies.Company = 'RUCO Druckfarben';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marian Pouykov' AND companies.Company = 'Runel';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pramod Tawale' AND companies.Company = 'Rushabh Investment PVT Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ilya Nadorshin' AND companies.Company = 'RUSNANO';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Rüttimann' AND companies.Company = 'Rüttimann Trade AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Graham Page' AND companies.Company = 'SA International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jochen Renfordt' AND companies.Company = 'SA.S.S. Datentechnik AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frank Basch' AND companies.Company = 'Saati America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juan Pablo Sacerdoti Ing' AND companies.Company = 'Sacerdoti S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Michael Reichenstein' AND companies.Company = 'Safe ID Solutions AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'A Dhanasekaran' AND companies.Company = 'Safire Offset Printers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pierre Henri Gerbet' AND companies.Company = 'SAGA Arts and Graphiques';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pietro Casolari' AND companies.Company = 'SAIEM SRL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dieter Mönch Mr' AND companies.Company = 'Saier Verpackungstechnik GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ismail Yilmaz' AND companies.Company = 'Sakarya Iz Reklam Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Sakata Inx';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hassan Salhami' AND companies.Company = 'Salhani';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefan Fiedler' AND companies.Company = 'Salon Iris';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tanaka Murinata' AND companies.Company = 'SamMuri Label';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marco Tozzi' AND companies.Company = 'Samor International Group S.p.A';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kim, JangSub Ph.D.' AND companies.Company = 'Samsung Electronics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rick Weyermann' AND companies.Company = 'Sancoa International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Barry McKillip' AND companies.Company = 'Sancoa International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jordan MacDonald' AND companies.Company = 'SanDisk Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Umit Sansal' AND companies.Company = 'Sansal';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ivars Sarkans' AND companies.Company = 'Sarkans and Associates';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ian Hutchinson' AND companies.Company = 'Sartomer';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sabine Slaughter' AND companies.Company = 'SAS Visuelle Kommunikation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bjorn Devos' AND companies.Company = 'SATO Europe';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Chu' AND companies.Company = 'Saturn';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Moneer S Shaikh' AND companies.Company = 'Saudi Oger Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ming Xu' AND companies.Company = 'Sawgrass Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sabine Wilcek Ms' AND companies.Company = 'SCA Tissue Europe';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Allan Prittie' AND companies.Company = 'Scantech Automation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Bührer' AND companies.Company = 'Schärer Schweiter Mettler AG (SSM)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amgad Khalil' AND companies.Company = 'Schering Plough';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mary K Schilling' AND companies.Company = 'Schilling Graphic Consulting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Prof. Dr. Michael Doran' AND companies.Company = 'Schmid Technology GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gunther Schmidt' AND companies.Company = 'Schmidt Siedruck GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Helmut F Schreiner' AND companies.Company = 'Schreiner Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefan Frey' AND companies.Company = 'Schwinn & Partner';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Scitex Digital see EASTMAN KODAK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eli Grinberg' AND companies.Company = 'Scodix Ltd.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Krzysztof Pisera' AND companies.Company = 'Scorpio Sp. z.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eiji Nanaho' AND companies.Company = 'Screen Media Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bui Burke Mr' AND companies.Company = 'Screen UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bob Deets' AND companies.Company = 'Scribe US';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'SCS Europe';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alan Saul' AND companies.Company = 'Sealpack Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen Nickenig' AND companies.Company = 'Secap';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manny Laureano' AND companies.Company = 'Secure Packaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Franco Domeniconi' AND companies.Company = 'Sefran Etichettificio';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Elisa' AND companies.Company = 'Seinse Kent SL';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Micah Rush' AND companies.Company = 'Select Impressions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Heather Powell' AND companies.Company = 'Sense';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John P Kane' AND companies.Company = 'Sensient Color Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bryan Palphreyman' AND companies.Company = 'Sensient Colors UK Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Olaf Gelsen' AND companies.Company = 'Sensient Imaging Technologies GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephan Knocke' AND companies.Company = 'Sensient Imaging Technologies SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michiel Fransen' AND companies.Company = 'Sentega';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karl-Heinz Ebner' AND companies.Company = 'SEPIAX Ink Technology GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrea Ruffato Mr' AND companies.Company = 'Ser Tec Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Keith Nixon' AND companies.Company = 'Sericol Imaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Huguette Palardy' AND companies.Company = 'Serigraphie Rejean';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Renata Segretti' AND companies.Company = 'Serilon';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'O Lebal' AND companies.Company = 'Seripress';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vitaliy Sergeevich Nikiforov' AND companies.Company = 'Service Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fabian Haro' AND companies.Company = 'Seryflex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rakhesh Rao' AND companies.Company = 'Seshaasai Business Forms';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gürbüz Erenoglu' AND companies.Company = 'Setag Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mohammed Samer Siouty' AND companies.Company = 'Setco';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jeff Burton' AND companies.Company = 'Sgia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Shaaban Printing Services';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr Chen' AND companies.Company = 'Shanghai Printing Machinery Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jeffrey Jiang' AND companies.Company = 'Shanghai SonicJet Technologies Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stella Hu' AND companies.Company = 'Shanghai Teckwin Development Co ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Shengluo Xu' AND companies.Company = 'Shanghai Yaselan Digital Equipment Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Igor Zolotov' AND companies.Company = 'Shar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jon G Gypsyn' AND companies.Company = 'Sharp Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dmitriy Drobyazko' AND companies.Company = 'Shear Tech';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Niran Singh' AND companies.Company = 'Shereno Printers';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'M Yoshioka' AND companies.Company = 'Shiki Machine Supply Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Willem van Daal' AND companies.Company = 'Shima Seiki';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Shin' AND companies.Company = 'SHINJI High Tech';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sitaram Bhandari' AND companies.Company = 'Shree Kalinchowk Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vadim Vevers Mr' AND companies.Company = 'SIA BASS Technologijas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'SIAD Group srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cecile Pinto' AND companies.Company = 'SICPA Security Solutions SA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tony Nadais' AND companies.Company = 'SID Signs';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rogerio Cavallari' AND companies.Company = 'SID Signs';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Werner Esslinger' AND companies.Company = 'Siebdruck Esslinger';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paritosh Jha' AND companies.Company = 'Siegwerk India Private Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicolas Leveille' AND companies.Company = 'SIFA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ertan Ipek' AND companies.Company = 'Sigma';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gwilym Kingdom' AND companies.Company = 'SIGMA-CGI';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kenny Wan' AND companies.Company = 'Sign Future Marketing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sonal Khurana' AND companies.Company = 'Sign Graphics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Herman Hartman' AND companies.Company = 'Sign Pro';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralf Timm' AND companies.Company = 'Sign Trade';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrick le Galudec' AND companies.Company = 'Sihl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'SII Printek Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yves Munier' AND companies.Company = 'Siliflow S.A.S.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Saleh Al kindi' AND companies.Company = 'Silk Corp';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Serge Pigeot' AND companies.Company = 'Simp\'ex Ltd/Ipac Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kris Vercamer' AND companies.Company = 'Sioen Chemicals';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mario Ferri' AND companies.Company = 'Sirpi';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Miguel Garcia Gil' AND companies.Company = 'SIS Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tarner Kanturer' AND companies.Company = 'Sisecam';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Raimundo Cuenca' AND companies.Company = 'Sisgrafic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniele Martelloni' AND companies.Company = 'Sitech s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jurg Vollenweider' AND companies.Company = 'Sitech Systems Gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Czeslaw Dabrowski Mr' AND companies.Company = 'Skilt-Dekor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Enric Casas' AND companies.Company = 'SKIS Rossignol S.A.S.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daksesh S Patel' AND companies.Company = 'Small Products Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcello Lolli' AND companies.Company = 'Smart Res Spa';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pramod Tawale' AND companies.Company = 'Smart Tech';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Davide Catalano Mr' AND companies.Company = 'Smartcolor s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrey Makachev' AND companies.Company = 'SMART-T';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Gerussi' AND companies.Company = 'SMG S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oliver Naumann' AND companies.Company = 'SML (Central Europe) GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Danny Smith' AND companies.Company = 'SML Europe Ltd (UK)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jean-Pierre Rousselet' AND companies.Company = 'SMT Digital (Serigraphie Numerique)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Wängdahl' AND companies.Company = 'SNA Europe [Industries] AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Societa Macchine Cartotecniche Cartarie';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christophe Goemaere' AND companies.Company = 'Soenen';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hennes Leuchter' AND companies.Company = 'SOFHA GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Mooney' AND companies.Company = 'Software Imaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Harvey Beaudry' AND companies.Company = 'Sohn Manufacturing Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Solarmer Energy Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Fisher' AND companies.Company = 'Solid Terrain Modeling Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juergen Bergschnelder' AND companies.Company = 'Solid Weave';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alain Flament' AND companies.Company = 'Solimp';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Annie Bellocq' AND companies.Company = 'SOLSYSTEMS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manuel Lopez' AND companies.Company = 'Soluciones Integrales para el rotulista';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Graham King' AND companies.Company = 'Solution Consulting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nicholas Adami' AND companies.Company = 'Solutions Graphiques';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Sirusas' AND companies.Company = 'Solvay Solexis Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Bayer' AND companies.Company = 'Solvotec GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Akakiy Dzhvarsheishvili' AND companies.Company = 'Soma Engineering';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Somaflex GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jagdev Rehal' AND companies.Company = 'Somitrack AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Josef Hasibeder' AND companies.Company = 'Sony DADC Austria AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marc Vagogne' AND companies.Company = 'Sopan Sajic';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Sorveh - SEE MAPLEJET & HONAZ';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Johan Spies' AND companies.Company = 'Spandex';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Henry' AND companies.Company = 'Spear System';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Barry Moss' AND companies.Company = 'Specialised Industrial Chemicals Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dene H Taylor' AND companies.Company = 'Speciality Papers & Films Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergey Goncharov' AND companies.Company = 'SpecTechnology Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Haak' AND companies.Company = 'Spikix';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vineet Jain Mr' AND companies.Company = 'Spinks India Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rolf Reichle' AND companies.Company = 'Sprimag Spritzmachinenbau GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Giuseppe Camisa' AND companies.Company = 'Sprint srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Spuhl - SEE WP DIGITAL - Spuhl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gregory Sharpless' AND companies.Company = 'ST Media Group International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Noemi Graziana Sparta' AND companies.Company = 'ST Microelectronics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anke Mueller Ms' AND companies.Company = 'Staedtler Mars GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Concetta Patane' AND companies.Company = 'Stampare Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Watson Gullett' AND companies.Company = 'Standard Register';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Washburn' AND companies.Company = 'Standard Register Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Angela Starck' AND companies.Company = 'Starck';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert A Van der Laan' AND companies.Company = 'StarTrack LVS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Petr Miks' AND companies.Company = 'Statni Tiskarna Cenin (STC)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amit Agarwal' AND companies.Company = 'Steel City Compto Aids Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Brüninghaus' AND companies.Company = 'Steinhauer & Lueck (Luck)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve Clayton' AND companies.Company = 'Steve Clayton Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcus Rehberger' AND companies.Company = 'STFI Packforsk AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anton' AND companies.Company = 'StickyLine';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'StopStatic.com';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ed James' AND companies.Company = 'Stork Print America Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Smallegenge' AND companies.Company = 'Stork Prints B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralph Carlson' AND companies.Company = 'Strategic Automation Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Looney' AND companies.Company = 'Streamstown Moulding Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Johnson' AND companies.Company = 'Stuart & Co Insurance Consultants';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Patrice Besset Mr' AND companies.Company = 'Studio FX';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Simon Martineau' AND companies.Company = 'Styro Rail Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Oscar Suarez' AND companies.Company = 'Suarmec Incleos S.R.L';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Vittorio Galli' AND companies.Company = 'Sun Chemical Group S.p.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Linda Webster' AND companies.Company = 'Sun Chemical ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vladislav Mirchev' AND companies.Company = 'SUN LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Grzegorz Grefkowicz' AND companies.Company = 'SUN Poland';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Deepak Gupta' AND companies.Company = 'Sun Sign & Technologies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcus Levine' AND companies.Company = 'SUN UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Horatiu Gheorghe Opris' AND companies.Company = 'Sunimprof GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Walshe' AND companies.Company = 'SUNJET';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amberly Yates' AND companies.Company = 'SunJet USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Rogers' AND companies.Company = 'SunPower Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Sunrise Electronics Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mayur Dama' AND companies.Company = 'Super';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'William Lee' AND companies.Company = 'Super Labels Enterprise SDN. BHD.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dwayne Brandon' AND companies.Company = 'Superior Tape & Label';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Stephan Schunck' AND companies.Company = 'Surteco SE';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Serdar B Konyali' AND companies.Company = 'SVN Basim Ticaret ve Sanayi A.S.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Jakubiszyn' AND companies.Company = 'Swiat Druku';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roberto Raul Garcia' AND companies.Company = 'SwissLab Argentina S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roland Fetting Mr' AND companies.Company = 'SwissQprint AG Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cardelli Fabio' AND companies.Company = 'Synergy Europe S.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Victor Gu' AND companies.Company = 'Syntax Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Gray' AND companies.Company = 'Synvir Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Agusti Pons' AND companies.Company = 'Sysdide';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paolo Casarini Mr' AND companies.Company = 'System Ceramics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roberto Girlanda' AND companies.Company = 'System Milano s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vadim Zaika' AND companies.Company = 'Systema Ltd.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jost Schiefer' AND companies.Company = 'Systeme Ident Service (SIS Media) Gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alain De Veleer Mr' AND companies.Company = 'TA & Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Omer Salvi' AND companies.Company = 'Tadbik';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Azat Gabidullin' AND companies.Company = 'Taflex JSC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ernest Daddey' AND companies.Company = 'Taiyo America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'TalTechPlast';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Tampere University of Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bernd Berberich' AND companies.Company = 'TAMPOflex GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dietmar Schweinbenz' AND companies.Company = 'Tampoprint AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'S A Barker' AND companies.Company = 'Tanzeem Press';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sakovoy Dmitry' AND companies.Company = 'Tanzor';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Davide Perego' AND companies.Company = 'Tapematic SpA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'David Hill' AND companies.Company = 'Tapematic UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tony Denning' AND companies.Company = 'Tapematic USA Inc.,';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Samer Tarabichi' AND companies.Company = 'Tarabichi Printing and Packaging';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Steve' AND companies.Company = 'Target Print Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carolina Andrade' AND companies.Company = 'Targuet Srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Geraint Davies' AND companies.Company = 'Tarsus';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Juan Carlos Aboitiz' AND companies.Company = 'Tasic Sa De Cv';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jimi Dabach' AND companies.Company = 'Tavit 2000';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eduard Dekhovich' AND companies.Company = 'Tavro';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Martin Koebel' AND companies.Company = 'Taylor Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Len Taylor' AND companies.Company = 'Taylor Partnership, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'dott. Giovanni Angeli' AND companies.Company = 'TBE s.r.l';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Frederic Mailles' AND companies.Company = 'TDM Ingénierie';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ryan Wood' AND companies.Company = 'Tec Ink Pty Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniel Hodhod' AND companies.Company = 'Tec Lighting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sandra Rudat' AND companies.Company = 'Teca-Print AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Javier Domingo' AND companies.Company = 'Teca-Print Iberica S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexis Becquey' AND companies.Company = 'Techmay Etiquetage';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erik Tavergne' AND companies.Company = 'Techni-Coat International N.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Guillermos RojasJ Fajardo' AND companies.Company = 'Technicote';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tony Vinciguerra' AND companies.Company = 'Technicote Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'TechnoINK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andew Jason' AND companies.Company = 'Technoloco Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Henry B Freedman' AND companies.Company = 'Technologe Watch';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rolph Southwork' AND companies.Company = 'Technology Business, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Clive Ayling' AND companies.Company = 'Technology Partnership, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr. Gianfranco Borghi' AND companies.Company = 'Technomec Borghi s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hendrik Schottstaedt' AND companies.Company = 'Technoplot CAD Vertriebs GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Courgey,  Andre' AND companies.Company = 'Technopole';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kelvin Hung' AND companies.Company = 'Techway Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Barton' AND companies.Company = 'Teckwin Int\'l UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Fabio Zandona' AND companies.Company = 'Tecniche Nuove';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Giuseppe Marazzi' AND companies.Company = 'TecnoExamina (TecnoFerrari Group)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Antonio Prudente' AND companies.Company = 'Tecnofoil srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Guiseppe Tornetti' AND companies.Company = 'Tecnomac S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Marttila' AND companies.Company = 'Tecnomar Oy';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Joseph Trš Ing' AND companies.Company = 'Tecom paper s.r.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Celso Caravlho' AND companies.Company = 'Tecplotter';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tim Coldwell' AND companies.Company = 'TECSA Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nuno Mira' AND companies.Company = 'Tectend Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kotaro Kato' AND companies.Company = 'Teikoku Printing Inks Mfg Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr. Samir Abed' AND companies.Company = 'Tejaratgaran Alvand Talaie Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neil Avner Cikurel' AND companies.Company = 'Tek iz Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stefan Joris' AND companies.Company = 'Telelingua International';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ake Nilsson' AND companies.Company = 'TePe Munhygienprodukter AB';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Albert' AND companies.Company = 'Termoprint';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrey Shkolny' AND companies.Company = 'Terra Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Serhiy Hryhorchuk' AND companies.Company = 'Terratel LLC';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Christoph Dietrich' AND companies.Company = 'Tesa Scribos GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Tesa Tape Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sebastian Balz' AND companies.Company = 'Tesa Werk Offenburg GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Oliver Bolender' AND companies.Company = 'Tetenal';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Peter Stevenson' AND companies.Company = 'Tex Industrial Plastics Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Heinz Mehrrath' AND companies.Company = 'Textileiketten';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alex Kostenko' AND companies.Company = 'TH \'Verias\'';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Neshan S.N. Balian' AND companies.Company = 'The Armenian Ceramics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yury Kasyanov' AND companies.Company = 'The Ukraine Paper Company Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Evangelos Theodorou PhD' AND companies.Company = 'Theodorou Automation Saict';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Bausch' AND companies.Company = 'Thermopatch';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Petteri Kinnunen' AND companies.Company = 'Theta Optics Ltd Oy';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Konrad Vosteen' AND companies.Company = 'Thieme GmbH & Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Simon Petrie' AND companies.Company = 'THK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francis Goossens' AND companies.Company = 'Thomas Greg & Sons Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vanessa Childs' AND companies.Company = 'Thrifty Car & Van Rental';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Danny Daniels' AND companies.Company = 'Thriveman';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Britta Kaubke' AND companies.Company = 'TICOM Tillmanns GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christophe Coquelet' AND companies.Company = 'TIFLEX';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gerald Hemedinger' AND companies.Company = 'TIGER Coatings GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hasan Osman' AND companies.Company = 'Tillys Cleaning Service';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Avi Rabinowitz' AND companies.Company = 'Timestrip Technical Services Ltd.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jeroen Verheul' AND companies.Company = 'Tinct';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Zoltan Abraham' AND companies.Company = 'TIPO Direct s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Octavio Toledo Alvarado' AND companies.Company = 'TOC Maquinas Industriales';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alejandro Hernandez' AND companies.Company = 'Todo en Etiquetas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Thomas Gerhardt' AND companies.Company = 'ToJET GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hiroyuki Obiya' AND companies.Company = 'Tokyo Ohka Kogyo Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mark Debono Eng Eur. Ing' AND companies.Company = 'Toly Products (Malta)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrew Lee' AND companies.Company = 'Tonejet Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chiara Tonelli' AND companies.Company = 'Tonelli Tipografia';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kuljeet Singh Juneja' AND companies.Company = 'Top Class Sales Pvt Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Top Two Company';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Francesc Canudas' AND companies.Company = 'Topack Maquinaria';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Giuseppe Zanasi' AND companies.Company = 'TOPJET s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Satoru Kihara' AND companies.Company = 'Toppan Forms Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Enrique Guillamon Vivas' AND companies.Company = 'Torrecid, S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Toshiba';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yasuhiro Jingu' AND companies.Company = 'Toshiba TEC Germany Imaging Systems GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jamil Ferreira' AND companies.Company = 'Total Plotter';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karel Van Wiggen' AND companies.Company = 'Total Xpress';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Tottene Administracao e Participacaoes S/A - see RIzon';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sergio Pera' AND companies.Company = 'Toyo Ink do Brasil';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Laurent Mignot' AND companies.Company = 'Toyo Ink Europe (Paris) S.A.S.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tetsuya Okuma' AND companies.Company = 'Toyo Ink Europe S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ken Yamasaki' AND companies.Company = 'Toyo Ink Mfg Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Toyo Ink MFG Co.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian Panek' AND companies.Company = 'Toyo Ink Mfg. America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ayman Mahmoud' AND companies.Company = 'Track Int\'l Trade';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Yasin Gökdemir' AND companies.Company = 'Transteknik Teknoloji A.S.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Oel' AND companies.Company = 'Trautwein GmbH & Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mieke Clemens' AND companies.Company = 'Travel Event Service Team';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger Ricketts' AND companies.Company = 'Travel Tags';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gregg Trebnick' AND companies.Company = 'Trebnick';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paolo Mensurati' AND companies.Company = 'Trend s.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Trespa International BV';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Triangle Digital INX';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Laborde' AND companies.Company = 'Tristar Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Jens Simon' AND companies.Company = 'Tritron GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ibrahim Ugur' AND companies.Company = 'Troyjet Co';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jakaphong Kongpanya' AND companies.Company = 'TSGA (Thai Screen Printing & Graphic Imaging Association)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Glenn van Doorn' AND companies.Company = 'TTC Group B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Tukan';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ramzi H. Hawa' AND companies.Company = 'Tulip Inks (Victor Inks LLC)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ramazan kocyigit' AND companies.Company = 'Turkuaz Baski Cozumleri';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Norman Durham' AND companies.Company = 'Turner Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paolo Gentilini' AND companies.Company = 'TWS S.p.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Philippe Contri' AND companies.Company = 'Tyco Electronics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stathis Tsorpatzoglou' AND companies.Company = 'Typochrom S.A.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Nikos' AND companies.Company = 'Typoglass';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jörg Riekenbrauck' AND companies.Company = 'Uhlmann Pac-Systeme GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vic Clements' AND companies.Company = 'UK Environment Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing. Ernst Herzog' AND companies.Company = 'Ulrich Etiketten';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ercin Mesci' AND companies.Company = 'Ultra Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Damien Vergnault' AND companies.Company = 'Une Histoire De Gout';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian Pezzini' AND companies.Company = 'UNICOQUE';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andy Richards' AND companies.Company = 'Unilever';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Phillip Francis' AND companies.Company = 'Unilever UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lindsay Orr' AND companies.Company = 'Unique Finishing Equipment (ufe)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manuel Barba' AND companies.Company = 'United Barcode Systems';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Univers Papier';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lee Kuo-Sheng' AND companies.Company = 'Universal Olympic Coding Form Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bernd Hillers' AND companies.Company = 'University of Bremen - IAT';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Simon Hopkins' AND companies.Company = 'University of Cambridge';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Trevor Lambourne' AND companies.Company = 'University of Leeds';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jonas Örtegren PhD' AND companies.Company = 'University of Mid Sweden';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roland Utama' AND companies.Company = 'University of New South Wales';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ing. Miroslav Tejkl' AND companies.Company = 'University of Pardubice';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bernard Polzinger' AND companies.Company = 'University of Stuttgart';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'University of Switzerland';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexandra Plasencio Cooper' AND companies.Company = 'University of Texas';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Don McCallum' AND companies.Company = 'University of Wollongong';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eugen Formanek' AND companies.Company = 'Uniware Slovakia spol s.r.o';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Chrisoforo' AND companies.Company = 'Untouchable Sign Solutions Corp.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jack Beattie' AND companies.Company = 'Url Pharma';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Trish Fritz' AND companies.Company = 'US Government Printing Office';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'James Tyler' AND companies.Company = 'US Lab Supplies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott Fresener' AND companies.Company = 'US Screen Print & Inkjet Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sheryl Cox' AND companies.Company = 'Useful Products Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stan Rasser' AND companies.Company = 'USP Indicator Solutions GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lothar Wurmbach' AND companies.Company = 'UTSCH AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'UV Inks (Australia)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stephen B Siegel' AND companies.Company = 'UV Process Supply Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Giovanni Bussetti' AND companies.Company = 'UV Ray srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott Fitzgerald' AND companies.Company = 'UVio Limited';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Valls, Modesto Fabra';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Value Plastics - USE WEST GROUP';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Bonten' AND companies.Company = 'Van der Eng Labels';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Amiram van Kloeten' AND companies.Company = 'Van Kloeten Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Henk C Ockerse' AND companies.Company = 'Van Zalinge Benelux B.V.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roel de Weijert' AND companies.Company = 'Vantec';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Andrey Pavlov' AND companies.Company = 'Variant';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Markus Halter' AND companies.Company = 'Vario-Optics ag';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Vince Cahill' AND companies.Company = 'VCE Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Igor' AND companies.Company = 'VD-Centre';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Werner Van de Wynckel' AND companies.Company = 'VdW Consulting';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bharat Wadhwa' AND companies.Company = 'Vee Kay Enterprises';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Straaijer' AND companies.Company = 'Veldkamp Technische Service (Flexprint)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Manuel Vellerino' AND companies.Company = 'Vellerino Sistemas de Impresion';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'John Glenning' AND companies.Company = 'Velocys';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Enrico Verga' AND companies.Company = 'Verga IT srl';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Luc Uytterhaeghe' AND companies.Company = 'Veriplast';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Pyankov Oleg' AND companies.Company = 'Verje-1';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Versus Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Paul Bird' AND companies.Company = 'Videojet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dmitriy Katerinochkin' AND companies.Company = 'Videojet Technologies (Russia)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Videojet Technologies Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Viktor Rüedi AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ralph Peach' AND companies.Company = 'Vilac';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ted Weiswasser' AND companies.Company = 'Vintage 99';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Adrian Down' AND companies.Company = 'VIP Color Technologies USA, Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris "CT" Thomas' AND companies.Company = 'Vision Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Guiliano Pistoni' AND companies.Company = 'Vision-e S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Madis-Marius Vahtre' AND companies.Company = 'Visitret Advanced Materials';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Imbusch' AND companies.Company = 'Vistaprint Schweiz GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Carmine Marcarella' AND companies.Company = 'VisuaScan';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ilija Popadic' AND companies.Company = 'Vlatacom d.o.o.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jörg Wohner M. Sc. Mr' AND companies.Company = 'Volvo Car Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Ingo Ederer' AND companies.Company = 'Voxeljet Technology GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Arkadiy Agamirov' AND companies.Company = 'Vremena Goda';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Vrl Pharma';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Miroslav Pohorsky' AND companies.Company = 'Vydos Bohemia s.r.o';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Beau Wilson' AND companies.Company = 'W L Gore Associates';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'San Aung' AND companies.Company = 'W2P Solutions';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Borje Erikson' AND companies.Company = 'Walki Group';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jens Teves-Humme' AND companies.Company = 'Walther Hulvershorn Gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Roger Kraft' AND companies.Company = 'Ward/Kraft';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Daniel Paczesny' AND companies.Company = 'Warsaw University of Technology';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Elizabeth Krill' AND companies.Company = 'Wctc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Stewart Partridge' AND companies.Company = 'Web Consulting Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Olaf Ruthe' AND companies.Company = 'Weber';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ian Seymour' AND companies.Company = 'Webtech (NI) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Marcus Trow' AND companies.Company = 'Weedon Electronics ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Lothar Weidich' AND companies.Company = 'Weidich\'s Badge & Record Service';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael Gockel' AND companies.Company = 'Weidmüller Interface GmbH & Co. KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chen Ji Jun' AND companies.Company = 'Weifan Huaguang Precision Machinery Co Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Walter Weiss' AND companies.Company = 'Weiss Messwerkzeuge GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Welwyn Components';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Helmut Bergman' AND companies.Company = 'Wemhoener Surface Technologies GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hector Napoles' AND companies.Company = 'Werbetechnik (WMT)';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Christian Maas' AND companies.Company = 'Werner Kammann Machinenfabrik GmbH & Co KG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Barney Hanrahan' AND companies.Company = 'Werner Kammann Machines Inc USA';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Brian L Laming' AND companies.Company = 'Werner Kammann UK';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Selby' AND companies.Company = 'West Group, The';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Kirill Klochkov' AND companies.Company = 'West Market';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Erika Hrehorova, Ph.D.' AND companies.Company = 'Western Michigan University';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Bjorn Aarhuus' AND companies.Company = 'West-Papier GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Richard Shaieb' AND companies.Company = 'Whitlam Label Company, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Rob Mulligan' AND companies.Company = 'Whitmar Publications Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Alexander' AND companies.Company = 'Wide.com.ua';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Matthias Riepenhoff' AND companies.Company = 'WIFAG Polytype';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Don P. Duncan, PH.D.' AND companies.Company = 'Wikoff Color Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jörg Wilhelm' AND companies.Company = 'Wilhelm Microeletronic Gmbh';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Mr Zhou' AND companies.Company = 'Win Win Digital';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sanfran Mo' AND companies.Company = 'Win Win Digital';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Arthur Limbach' AND companies.Company = 'Wit-Color Digital Printing Equipment';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Verena Grundel' AND companies.Company = 'WNP Verlag GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Christian Weg' AND companies.Company = 'Wolco AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Garnetas Tasos' AND companies.Company = 'Woodbox A & E Garneta OE';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sabine A Slaughter' AND companies.Company = 'World of Print';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Ramon Taja Wheeler' AND companies.Company = 'World Textile Resources WTR';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hans Oosterhof' AND companies.Company = 'World-Chem';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Andrea Quintel' AND companies.Company = 'WP Digital AG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tomasz Mlynski' AND companies.Company = 'Wropack';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Xaar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Xaar US';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Xennia Technology Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Xiuyan Sun' AND companies.Company = 'Xennia Technology Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Arnold Hackett' AND companies.Company = 'Xerox';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Xerox';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dr Gregory J Kovacs' AND companies.Company = 'Xerox Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott P Snietka' AND companies.Company = 'Xijet';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Valerie Ginsberg Sr' AND companies.Company = 'Xintek Inc';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Robert Even' AND companies.Company = 'Xjet Solar';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Gianni Iurato' AND companies.Company = 'XLogic S.r.l.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Silvia Mader' AND companies.Company = 'X-Media';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Cengiz Unutmaz' AND companies.Company = 'Y Dijital Ltd/Yagiz Lojistik Hiz. Tic. Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Loic Delor' AND companies.Company = 'Yat Fung';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Anton Nekozeevskiy' AND companies.Company = 'Yava-In';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Sven Gohdes' AND companies.Company = 'YELLOWDOG';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jérome Mouly' AND companies.Company = 'Yole Development';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = '' AND companies.Company = 'Y-Tex - SEE SCRIBE FOR CONTACTS';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Michael A. Licata' AND companies.Company = 'Yupo Corporation America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Eric Wellenhofer' AND companies.Company = 'Yupo Europe GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karen Gehring' AND companies.Company = 'Yusen Global Logistics Air & Sea Service (UK) Ltd';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tom Davidson' AND companies.Company = 'Z Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jaco Van Zyl' AND companies.Company = 'ZA Electronics';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Imad Zain Al Abdin' AND companies.Company = 'Zain Al Abdin Printing';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Tony Baker' AND companies.Company = 'ZBE Incorporated';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jim Clark' AND companies.Company = 'Zebra Technologies Corporation';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Scott Ryan' AND companies.Company = 'Zefon International, Inc.';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Jan Bennewitz Mr' AND companies.Company = 'Zenergy Power GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Igor Gurzhuyenko' AND companies.Company = 'Zenon - Sign Supplies';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Chris Panayi' AND companies.Company = 'ZIM GmbH';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Hannes Fischer' AND companies.Company = 'Zimmer Austria';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Dirk Leiber' AND companies.Company = 'Zimmer Machinery America';
UPDATE companies, contacts SET companies.PrimaryContactID = contacts.ContactID WHERE CONCAT(contacts.Forename,' ',contacts.Surname) = 'Karl Zund' AND companies.Company = 'Zund';
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `_temp_view`
--

/*!50001 DROP VIEW IF EXISTS `_temp_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `_temp_view` AS (select `companies`.`Company` AS `Company`,`companies`.`Prospect` AS `Prospect`,`companies`.`IndustryID` AS `IndustryID` from `companies` where (`companies`.`IndustryID` = 5)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_contacts_list`
--

/*!50001 DROP VIEW IF EXISTS `v_contacts_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_contacts_list` AS select `contacts`.`ContactID` AS `ContactID`,concat(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `Name`,`contacts`.`CompanyID` AS `CompanyID`,`companies`.`Company` AS `Company`,`contacts`.`Phone` AS `Phone`,`contacts`.`Mobile` AS `Mobile`,`contacts`.`Email` AS `Email`,`companies`.`Customer` AS `Customer`,`companies`.`Supplier` AS `Supplier`,`contacts`.`active` AS `active` from (`contacts` join `companies` on((`contacts`.`CompanyID` = `companies`.`CompanyID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_costs_project_time`
--

/*!50001 DROP VIEW IF EXISTS `v_costs_project_time`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_costs_project_time` AS select `timesheets`.`EmpID` AS `EmpID`,`timesheetentries`.`ProjCont` AS `ProjCont`,(`costrates`.`CostRate` * sum(((((((coalesce(`timesheetentries`.`MondayHours`,0) + coalesce(`timesheetentries`.`TuesdayHours`,0)) + coalesce(`timesheetentries`.`WednesdayHours`,0)) + coalesce(`timesheetentries`.`ThursdayHours`,0)) + coalesce(`timesheetentries`.`FridayHours`,0)) + coalesce(`timesheetentries`.`SaturdayHours`,0)) + coalesce(`timesheetentries`.`SundayHours`,0)))) AS `EmpCost` from (((`timesheets` join `timesheetentries` on((`timesheets`.`TimesheetID` = `timesheetentries`.`TimesheetID`))) join `employees` on((`timesheets`.`EmpID` = `employees`.`EmpID`))) join `costrates` on((`employees`.`CostRateID` = `costrates`.`CostRateID`))) group by `timesheets`.`EmpID`,`timesheetentries`.`ProjCont` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_list_3rd_party_contracts`
--

/*!50001 DROP VIEW IF EXISTS `v_list_3rd_party_contracts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_list_3rd_party_contracts` AS select `contracts`.`ContractID` AS `ContractID`,`companies`.`Company` AS `Customer`,`contractcategories`.`Category` AS `Category`,`contracts`.`Service` AS `Description`,`companies_1`.`Company` AS `Supplier`,`contracts`.`RenewalDate` AS `Renewal Date`,`contracts`.`Active` AS `Active`,if((`contracts`.`Active` = -(1)),_utf8'Yes',_utf8'') AS `Is Active` from (((`contracts` left join `companies` on((`contracts`.`CustomerID` = `companies`.`CompanyID`))) left join `contractcategories` on((`contracts`.`CategoryID` = `contractcategories`.`CategoryID`))) left join `companies` `companies_1` on((`contracts`.`SupplierID` = `companies_1`.`CompanyID`))) order by `contracts`.`RenewalDate` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_list_customers`
--

/*!50001 DROP VIEW IF EXISTS `v_list_customers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_list_customers` AS select `companies`.`CompanyID` AS `CompanyID`,`companies`.`Company` AS `Company`,`companies`.`Phone` AS `Phone`,`companies`.`WebSite` AS `WebSite`,`companies`.`Customer` AS `Customer`,`companies`.`Active` AS `Active` from `companies` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_list_pos`
--

/*!50001 DROP VIEW IF EXISTS `v_list_pos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_list_pos` AS select `pos`.`POID` AS `PO #`,`pos`.`ProjectID` AS `ProjectID`,convert(lpad(`pos`.`ProjectID`,5,_utf8'P0000') using utf8) AS `Project`,`companies`.`CompanyID` AS `SupplierID`,`companies`.`Company` AS `Supplier`,`pos`.`Description` AS `Description`,`pos`.`POStatus` AS `POStatusID`,`postatus`.`POStatus` AS `Status`,`pos`.`PurchaseDate` AS `Purchase Date`,`pos`.`DeliveryDate` AS `Delivery Date`,`pos`.`CustomerID` AS `CustomerID` from ((`pos` join `companies` on((`pos`.`SupplierID` = `companies`.`CompanyID`))) left join `postatus` on((`pos`.`POStatus` = `postatus`.`POStatusID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_list_suppliers`
--

/*!50001 DROP VIEW IF EXISTS `v_list_suppliers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_list_suppliers` AS select `companies`.`CompanyID` AS `CompanyID`,`companies`.`AccountNo` AS `AccountNo`,`companies`.`Company` AS `Company`,`companies`.`Abbreviation` AS `Abbreviation`,`companies`.`WebSite` AS `Web Site`,`companies`.`Phone` AS `Phone`,`companies`.`Supplier` AS `Supplier`,`companies`.`Approved` AS `Approved`,if((`companies`.`Approved` = -(1)),_utf8'Yes',_utf8'') AS `Is Approved`,`companies`.`Active` AS `Active`,if((`companies`.`Active` = -(1)),_utf8'Yes',_utf8'') AS `IsActive` from `companies` where (`companies`.`Supplier` = -(1)) order by `companies`.`Company` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_po_list`
--

/*!50001 DROP VIEW IF EXISTS `v_po_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_po_list` AS select `pos`.`POID` AS `POID`,`pos`.`RequestorID` AS `RequestorID`,`pos`.`ProjectID` AS `ProjectID`,`companies`.`CompanyID` AS `CompanyID`,`companies`.`Company` AS `Company`,`pos`.`CustomerID` AS `CustomerID`,`pos`.`Description` AS `Description`,`pos`.`POStatus` AS `POStatusID`,`pos`.`PurchaseDate` AS `PurchaseDate`,`postatus`.`POStatus` AS `POStatus`,`pos`.`DeliveryDate` AS `DeliveryDate` from ((`pos` join `companies` on((`pos`.`SupplierID` = `companies`.`CompanyID`))) join `postatus` on((`pos`.`POStatus` = `postatus`.`POStatusID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_projects_labour_costs`
--

/*!50001 DROP VIEW IF EXISTS `v_projects_labour_costs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_projects_labour_costs` AS select `timesheets`.`EmpID` AS `EmpID`,`timesheetentries`.`ProjCont` AS `ProjCont`,(`costrates`.`CostRate` * sum(((((((coalesce(`timesheetentries`.`MondayHours`,0) + coalesce(`timesheetentries`.`TuesdayHours`,0)) + coalesce(`timesheetentries`.`WednesdayHours`,0)) + coalesce(`timesheetentries`.`ThursdayHours`,0)) + coalesce(`timesheetentries`.`FridayHours`,0)) + coalesce(`timesheetentries`.`SaturdayHours`,0)) + coalesce(`timesheetentries`.`SundayHours`,0)))) AS `EmpCost` from (((`timesheets` join `timesheetentries` on((`timesheets`.`TimesheetID` = `timesheetentries`.`TimesheetID`))) join `employees` on((`timesheets`.`EmpID` = `employees`.`EmpID`))) join `costrates` on((`employees`.`CostRateID` = `costrates`.`CostRateID`))) group by `timesheets`.`EmpID`,`timesheetentries`.`ProjCont` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_rep_3rd_party_contracts`
--

/*!50001 DROP VIEW IF EXISTS `v_rep_3rd_party_contracts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_rep_3rd_party_contracts` AS select `companies`.`CompanyID` AS `CustomerID`,`companies`.`Company` AS `Customer`,`companies_1`.`Company` AS `Supplier`,`contracts`.`Service` AS `Service`,`contractcategories`.`Category` AS `Category`,`contracts`.`StartDate` AS `StartDate`,`contracts`.`RenewedOnDate` AS `RenewedOnDate`,`contracts`.`ServiceCost` AS `ServiceCost`,`contracts`.`RenewalDate` AS `RenewalDate`,`contracts`.`Managed` AS `Managed` from (((`contracts` left join `companies` on((`contracts`.`CustomerID` = `companies`.`CompanyID`))) left join `companies` `companies_1` on((`contracts`.`SupplierID` = `companies_1`.`CompanyID`))) left join `contractcategories` on((`contracts`.`CategoryID` = `contractcategories`.`CategoryID`))) where (`contracts`.`Active` = -(1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_status_pos`
--

/*!50001 DROP VIEW IF EXISTS `v_status_pos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_status_pos` AS select `pos`.`POID` AS `POID`,`companies`.`Company` AS `Company`,`pos`.`Description` AS `Description`,`postatus`.`POStatus` AS `POStatus`,`pos`.`DeliveryDate` AS `DeliveryDate`,(to_days(`pos`.`DeliveryDate`) - to_days(now())) AS `DeliveryDueInDays`,`pos`.`RequestorID` AS `RequestorID` from ((`pos` join `companies` on((`pos`.`CustomerID` = `companies`.`CompanyID`))) join `postatus` on((`pos`.`POStatus` = `postatus`.`POStatusID`))) where (`postatus`.`POStatusID` < 90) order by `pos`.`DeliveryDate` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_employees`
--

/*!50001 DROP VIEW IF EXISTS `vew_employees`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_employees` AS select `employees`.`EmpID` AS `EmpID`,concat(`employees`.`Surname`,_utf8', ',`employees`.`Forename`) AS `SurnameForename`,`employees`.`Active` AS `Active` from `employees` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_active_project_details`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_active_project_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_active_project_details` AS select `projects`.`ProjectID` AS `ProjectID`,concat(convert(lpad(`projects`.`ProjectID`,5,_utf8'P0000') using utf8),_utf8' - ',`projects`.`Description`) AS `Description` from `projects` where (`projects`.`Status` < 90) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_contacts`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_contacts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_contacts` AS select `contacts`.`ContactID` AS `ContactID`,`contacts`.`CompanyID` AS `CompanyID`,`contacts`.`Title` AS `Title`,concat(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `Contact`,`contacts`.`Position` AS `Position`,`contacts`.`Phone` AS `Phone`,`contacts`.`Mobile` AS `Mobile`,`contacts`.`Email` AS `Email`,`contacts`.`LastContactDate` AS `LastContactDate`,`contacts`.`NextContactDate` AS `NextContactDate`,`contacts`.`active` AS `Active`,`contacts`.`Notes` AS `Notes`,`contacts`.`timestamp` AS `timestamp` from `contacts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_customers`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_customers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_customers` AS select `companies`.`CompanyID` AS `CompanyID`,`companies`.`Company` AS `Company`,`companies`.`PostCode` AS `PostCode`,`companies`.`Phone` AS `Phone`,`companies`.`WebSite` AS `WebSite`,`companies`.`Active` AS `Active`,`companies`.`AccStatusID` AS `AccStatusID` from `companies` where (`companies`.`Customer` = -(1)) order by `companies`.`Company` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_prospectcompanies`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_prospectcompanies`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_prospectcompanies` AS select `companies`.`CompanyID` AS `CompanyID`,`companies`.`Company` AS `Company`,`companies`.`PostCode` AS `PostCode`,`companies`.`Phone` AS `Phone`,`companies`.`WebSite` AS `WebSite`,`industry`.`Industry` AS `Industry`,`sources`.`Source` AS `Source`,if((`companies`.`Active` = -(1)),_utf8'Yes',_utf8'') AS `Active` from ((`companies` left join `industry` on((`companies`.`IndustryID` = `industry`.`IndustryID`))) left join `sources` on((`companies`.`SourceID` = `sources`.`SourceID`))) where (`companies`.`Prospect` = -(1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_prospectcontacts`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_prospectcontacts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_prospectcontacts` AS select `contacts`.`ContactID` AS `ContactID`,`contacts`.`CompanyID` AS `CompanyID`,`contacts`.`Title` AS `Title`,concat(`contacts`.`Forename`,_utf8' ',`contacts`.`Surname`) AS `Contact`,`contacts`.`Position` AS `Position`,`contacts`.`Phone` AS `Phone`,`contacts`.`Mobile` AS `Mobile`,`contacts`.`Email` AS `Email`,`contacts`.`LastContactDate` AS `LastContactDate`,`contacts`.`NextContactDate` AS `NextContactDate`,`contacts`.`active` AS `Active`,`contacts`.`Notes` AS `Notes`,`contacts`.`timestamp` AS `timestamp` from `contacts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_purchaseorders`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_purchaseorders`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_purchaseorders` AS select cast(`pos`.`POID` as char charset utf8) AS `POID`,`pos`.`ProjectID` AS `ProjectID`,convert(lpad(`pos`.`ProjectID`,5,_utf8'P0000') using utf8) AS `Project`,`c`.`CompanyID` AS `CustomerID`,`c`.`Company` AS `Customer`,`s`.`CompanyID` AS `SupplierID`,`s`.`Company` AS `Supplier`,`pos`.`Description` AS `Description`,`pos`.`POStatus` AS `POStatusID`,`postatus`.`POStatus` AS `Status`,`pos`.`PurchaseDate` AS `PurchaseDate`,`pos`.`DeliveryDate` AS `DeliveryDate` from (((`pos` left join `companies` `c` on((`pos`.`CustomerID` = `c`.`CompanyID`))) left join `companies` `s` on((`pos`.`SupplierID` = `s`.`CompanyID`))) left join `postatus` on((`pos`.`POStatus` = `postatus`.`POStatusID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_suppliers`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_suppliers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_suppliers` AS select `companies`.`CompanyID` AS `CompanyID`,`companies`.`Company` AS `Company`,`companies`.`PostCode` AS `PostCode`,`companies`.`Phone` AS `Phone`,`companies`.`WebSite` AS `WebSite`,`companies`.`Active` AS `Active`,`companies`.`AccStatusID` AS `AccStatusID` from `companies` where (`companies`.`Supplier` = -(1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_list_timesheetentries_bookedtime`
--

/*!50001 DROP VIEW IF EXISTS `vew_list_timesheetentries_bookedtime`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_list_timesheetentries_bookedtime` AS select `timesheetentries`.`ProjCont` AS `ProjCont`,`timesheets`.`StartDate` AS `Date`,`users`.`UserName` AS `Name`,`timesheetentries`.`MondayHours` AS `Mon`,`timesheetentries`.`TuesdayHours` AS `Tue`,`timesheetentries`.`WednesdayHours` AS `Wed`,`timesheetentries`.`ThursdayHours` AS `Thu`,`timesheetentries`.`FridayHours` AS `Fri`,`timesheetentries`.`SaturdayHours` AS `Sat`,`timesheetentries`.`SundayHours` AS `Sun` from ((`timesheets` join `timesheetentries` on((`timesheets`.`TimesheetID` = `timesheetentries`.`TimesheetID`))) left join `users` on((`users`.`EmployeeID` = `timesheets`.`EmpID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vew_my_tasks`
--

/*!50001 DROP VIEW IF EXISTS `vew_my_tasks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vew_my_tasks` AS (select `companies`.`Company` AS `Company`,`tasks`.`TaskID` AS `TaskID`,`tasks`.`TaskOrder` AS `TaskOrder`,`tasks`.`ProjectID` AS `ProjectID`,`tasks`.`AssignedToID` AS `AssignedToID`,`tasks`.`Description` AS `Description`,`tasks`.`DueDate` AS `DueDate`,`tasks`.`PercentageComplete` AS `PercentageComplete`,`tasks`.`timestamp` AS `timestamp` from ((`tasks` left join `projects` on((`projects`.`ProjectID` = `tasks`.`ProjectID`))) left join `companies` on((`companies`.`CompanyID` = `projects`.`CompanyID`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-27 13:33:17
