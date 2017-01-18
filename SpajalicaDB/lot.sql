/*
-- Query: SELECT * FROM spajalicadb.logininfo
LIMIT 0, 1000

-- Date: 2017-01-17 23:11
*/
INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES (1,'test','test@gmail.com','test');
INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES (2,'admin','admin@admin.com','admin');
INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES (3,'Marko','marko@gmail.com','marko');
/*
-- Query: SELECT * FROM spajalicadb.usersinfo
LIMIT 0, 1000

-- Date: 2017-01-17 23:11
*/
INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES ('ТестниКорисникИме','ТестниКорисникПрезиме','1980-01-01','2017-01-15','М','Београд',1,NULL,'Самац');
INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES ('Opaki','Admin','1800-01-01','2017-01-15','M','Brasil',2,NULL,'Admini nisu u vezi!');
INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES (NULL,NULL,NULL,'2017-01-16',NULL,NULL,3,NULL,NULL);