-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: i7b306.p.ssafy.io    Database: drinkus
-- ------------------------------------------------------
-- Server version	5.7.39

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `user_beer` int(11) DEFAULT NULL,
  `user_birthday` varchar(255) DEFAULT NULL,
  `user_delete_date` datetime DEFAULT NULL,
  `user_deleted` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_fullname` varchar(255) DEFAULT NULL,
  `user_grade` varchar(255) DEFAULT NULL,
  `user_img` varchar(255) DEFAULT NULL,
  `user_introduce` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_nickname` varchar(255) DEFAULT NULL,
  `user_point` bigint(20) DEFAULT NULL,
  `user_popularity` int(11) DEFAULT NULL,
  `user_popularity_limit` int(11) DEFAULT NULL,
  `user_provider` varchar(255) DEFAULT NULL,
  `user_provider_id` varchar(255) DEFAULT NULL,
  `user_pw` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `user_soju` int(11) DEFAULT NULL,
  `user_stop_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-08-10 10:55:34','2022-08-10 10:55:34',0,'19980819',NULL,'N','gksekqls9808@naver.com','한다빈',NULL,NULL,NULL,'gksekqls9808@naver.com','척추측만증이 걸린 사장',0,0,5,'local',NULL,'$2a$10$83rS.KQfTYdyl/nxqCUCGObWKhqSpcWvGGmEYvFhnnwx.HMJ7UHTS','ROLE_USER',0,NULL),(2,'2022-08-10 10:55:34','2022-08-10 21:13:02',6,'20220809',NULL,'N','mingyu1218@naver.com','조민규',NULL,'','','mingyu1218@naver.com','고구마치즈불닭',0,7,5,'local',NULL,'$2a$10$F7JvAOYJDHx.OTxq86CWluuSkOdHGkHpdeaK0V5TNPuc0NgLylRiu','ROLE_USER',17,NULL),(3,'2022-08-10 10:55:35','2022-08-10 16:37:20',3,'20000209',NULL,'N','ssafy@naver.com','박무지',NULL,'','안녕하세요 무지막지입니다.','ssafy@naver.com','수석입학한 솜이불',0,77,5,'local',NULL,'$2a$10$qgzMbJSFdPnX8T6xgIzLhOZZ.SLtyUVD/OK4EZ/RwlYL0GTxewSEq','ROLE_USER',1,NULL),(4,'2022-08-10 10:55:58','2022-08-11 12:39:18',2,'19991212',NULL,'N','codemj11@gmail.com','김민정',NULL,NULL,'방가','codemj11@gmail.com','장염 걸린 트롤',0,14,5,'local',NULL,'$2a$10$QBd3os1Rs9ZBUTK9J6X98OWwlN9lS87Ql3E4/D/6chGNC.0VKrUf.','ROLE_USER',1,NULL),(5,'2022-08-10 10:56:11','2022-08-10 10:56:11',0,'20220810',NULL,'N','admin@naver.com','관리자',NULL,NULL,NULL,'admin@naver.com','외계에서 온 맛집평론가',0,0,5,'local',NULL,'$2a$10$MDmRqL4v86x69JJl9yNNXe2qSUMMkMFncsIjds2zdhU3gF5MizZvu','ROLE_ADMIN',0,NULL),(6,'2022-08-10 10:56:31','2022-08-11 11:24:16',0,'19971101',NULL,'N','rkarud13245@naver.com','갑갑경이',NULL,NULL,NULL,'rkarud13245@naver.com','할머니를 사랑하는 둘리',0,17,5,'local',NULL,'$2a$10$girLZTyH8q3U1ccidvmKJumF.lCWZ/3R2J3kVG.bPO2fK6/tCw5eu','ROLE_USER',0,NULL),(7,'2022-08-10 11:33:01','2022-08-10 11:33:01',0,NULL,NULL,'N','ssafy9808@naver.com','한싸피',NULL,NULL,NULL,'ssafy9808@naver.com','결벽증있는 고객센터',0,0,5,'local',NULL,'$2a$10$SL9XIyeY3bGkLuFu.YRI5eEgSfWxcMnNLIG6khTfYi0cD7RXxlQNS','ROLE_USER',0,NULL),(10,'2022-08-10 23:40:39','2022-08-10 23:40:39',0,'19990903',NULL,'N','test01@naver.com','테스트',NULL,NULL,NULL,'test01@naver.com','야식을 좋아하는 물장수',0,0,5,'local',NULL,'$2a$10$JAptnOAU6FuIOmK6CC6tyOqKU2xllF7Kynv/qZsV3md6fSxJJUQB6','ROLE_USER',0,NULL),(11,'2022-08-10 23:40:45','2022-08-10 23:40:45',0,'19990903',NULL,'N','test02@naver.com','테스트2',NULL,NULL,NULL,'test02@naver.com','부서진 단백질쉐이크',0,0,5,'local',NULL,'$2a$10$khVw/vco4/RF7CHxQsUFYeeqaK/DszDEDnhnRYEgCagB9IubjeNa.','ROLE_USER',0,NULL),(12,'2022-08-10 23:40:49','2022-08-10 23:40:49',0,'19990903',NULL,'N','test03@naver.com','테스트3',NULL,NULL,NULL,'test03@naver.com','후기가 안 좋은 대나무',0,0,5,'local',NULL,'$2a$10$ttjgp97U7fMslTcVzFAtPeQklpajv7DAZbtGHg4KsEzrXT0qn/njy','ROLE_USER',0,NULL),(13,'2022-08-11 13:17:49','2022-08-11 13:17:49',0,'19861208',NULL,'N','asya390@naver.com','한기철',NULL,NULL,NULL,'asya390@naver.com','주먹이 무서운 잼민이',0,0,5,'local',NULL,'$2a$10$fORHtgB6QfVXRI6aW./v.O.HBzkj6OpgG2Oc1uJmebj16EiR9z.Xy','ROLE_USER',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 13:54:49
