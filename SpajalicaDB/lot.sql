/*
-- Query: SELECT * FROM spajalicadb.logininfo
LIMIT 0, 1000

-- Date: 2017-01-17 23:11
*/
INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES ('test','test@gmail.com','test');
INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES ('admin','admin@admin.com','admin');
INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES ('Marko','marko@gmail.com','marko');
/*
-- Query: SELECT * FROM spajalicadb.usersinfo
LIMIT 0, 1000

-- Date: 2017-01-17 23:11
*/
INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES ('ТестниКорисникИме','ТестниКорисникПрезиме','1980-01-01','2017-01-15','М','Београд',51,NULL,'Самац');
INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES ('Opaki','Admin','1800-01-01','2017-01-15','M','Brasil',52,NULL,'Admini nisu u vezi!');
INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES (NULL,NULL,NULL,'2017-01-16',NULL,NULL,53,NULL,NULL);

INSERT INTO `spajalicadb`.`userstatusupdates` (`statusMessage`, `statusTime`, `statusLocation`, `idloginInfo`) VALUES ('Neki status, potpuno nebitno', NOW(), 'Belgrade', '1');

DELETE FROM `spajalicadb`.`userblocks` WHERE `idloginInfo`='1';
DELETE FROM `spajalicadb`.`userfollows` WHERE `idFollowed`='3';

use spajalicadb;
DELETE FROM userpreftag WHERE idpreferenceTags=1 and idloginInfo = 1;

