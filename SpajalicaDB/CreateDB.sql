-- MySQL Script generated by MySQL Workbench
-- 03/16/17 08:37:05
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SpajalicaDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SpajalicaDB` ;

-- -----------------------------------------------------
-- Schema SpajalicaDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SpajalicaDB` DEFAULT CHARACTER SET utf8 ;
USE `SpajalicaDB` ;

-- -----------------------------------------------------
-- Table `SpajalicaDB`.`loginInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`loginInfo` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`loginInfo` (
  `idloginInfo` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idloginInfo`),
  UNIQUE INDEX `user_name_UNIQUE` (`userName` ASC),
  UNIQUE INDEX `idlogin_info_UNIQUE` (`idloginInfo` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`usersInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`usersInfo` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`usersInfo` (
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `birthDate` DATE NULL,
  `joinedDate` DATE NOT NULL,
  `sex` VARCHAR(1) NULL,
  `location` VARCHAR(45) NULL,
  `idloginInfo` INT UNSIGNED NOT NULL,
  `profilePicture` BLOB(1000000) NULL,
  `relationshipStatus` VARCHAR(20) NULL,
  INDEX `fk_users_loginInfo_idx` (`idloginInfo` ASC),
  CONSTRAINT `fk_users_loginInfo`
    FOREIGN KEY (`idloginInfo`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`preferenceTags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`preferenceTags` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`preferenceTags` (
  `idpreferenceTags` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `preferenceName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idpreferenceTags`),
  UNIQUE INDEX `idpreferanceTags_UNIQUE` (`idpreferenceTags` ASC),
  UNIQUE INDEX `preferanceName_UNIQUE` (`preferenceName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`userProfileTags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`userProfileTags` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`userProfileTags` (
  `idloginInfo` INT UNSIGNED NOT NULL,
  `idpreferenceTags` INT UNSIGNED NOT NULL,
  INDEX `fk_userPreferance_loginInfo1_idx` (`idloginInfo` ASC),
  INDEX `fk_userProfileTags_preferenceTags1_idx` (`idpreferenceTags` ASC),
  CONSTRAINT `fk_userPreferance_loginInfo1`
    FOREIGN KEY (`idloginInfo`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userProfileTags_preferenceTags1`
    FOREIGN KEY (`idpreferenceTags`)
    REFERENCES `SpajalicaDB`.`preferenceTags` (`idpreferenceTags`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`userFollows`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`userFollows` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`userFollows` (
  `idloginInfo` INT UNSIGNED NOT NULL,
  `idFollowed` INT UNSIGNED NOT NULL,
  INDEX `fk_userFolows_loginInfo1_idx` (`idloginInfo` ASC),
  CONSTRAINT `fk_userFolows_loginInfo1`
    FOREIGN KEY (`idloginInfo`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`userPrefTag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`userPrefTag` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`userPrefTag` (
  `idpreferenceTags` INT UNSIGNED NOT NULL,
  `idloginInfo` INT UNSIGNED NOT NULL,
  `value` INT NOT NULL,
  INDEX `fk_userPrefTag_preferanceTags1_idx` (`idpreferenceTags` ASC),
  INDEX `fk_userPrefTag_loginInfo1_idx` (`idloginInfo` ASC),
  CONSTRAINT `fk_userPrefTag_preferanceTags1`
    FOREIGN KEY (`idpreferenceTags`)
    REFERENCES `SpajalicaDB`.`preferenceTags` (`idpreferenceTags`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userPrefTag_loginInfo1`
    FOREIGN KEY (`idloginInfo`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`Messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`Messages` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`Messages` (
  `idMessages` INT NOT NULL AUTO_INCREMENT,
  `idloginInfoSender` INT UNSIGNED NOT NULL,
  `idloginInfoReceiver` INT UNSIGNED NOT NULL,
  `messageText` VARCHAR(250) NOT NULL,
  `messageTime` DATETIME(6) NOT NULL,
  PRIMARY KEY (`idMessages`),
  UNIQUE INDEX `idMessages_UNIQUE` (`idMessages` ASC),
  INDEX `fk_Messages_loginInfo1_idx` (`idloginInfoSender` ASC),
  CONSTRAINT `fk_Messages_loginInfo1`
    FOREIGN KEY (`idloginInfoSender`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`userBlocks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`userBlocks` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`userBlocks` (
  `idloginInfo` INT UNSIGNED NOT NULL,
  `idBlocked` INT UNSIGNED NOT NULL,
  INDEX `fk_userBlocks_loginInfo1_idx` (`idloginInfo` ASC),
  CONSTRAINT `fk_userBlocks_loginInfo1`
    FOREIGN KEY (`idloginInfo`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`Books`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`Books` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`Books` (
  `idBooks` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idBooks`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`Sports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`Sports` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`Sports` (
  `idSports` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idSports`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`areasOfInterest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`areasOfInterest` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`areasOfInterest` (
  `idareasOfInterest` INT NOT NULL AUTO_INCREMENT,
  `idloginInfo` INT UNSIGNED NOT NULL,
  `Books_idBooks` INT NOT NULL,
  `Sports_idSports` INT NOT NULL,
  PRIMARY KEY (`idareasOfInterest`),
  UNIQUE INDEX `idareasOfInterest_UNIQUE` (`idareasOfInterest` ASC),
  INDEX `fk_areasOfInterest_loginInfo1_idx` (`idloginInfo` ASC),
  INDEX `fk_areasOfInterest_Books1_idx` (`Books_idBooks` ASC),
  INDEX `fk_areasOfInterest_Sports1_idx` (`Sports_idSports` ASC),
  CONSTRAINT `fk_areasOfInterest_loginInfo1`
    FOREIGN KEY (`idloginInfo`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_areasOfInterest_Books1`
    FOREIGN KEY (`Books_idBooks`)
    REFERENCES `SpajalicaDB`.`Books` (`idBooks`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_areasOfInterest_Sports1`
    FOREIGN KEY (`Sports_idSports`)
    REFERENCES `SpajalicaDB`.`Sports` (`idSports`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SpajalicaDB`.`userStatusUpdates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SpajalicaDB`.`userStatusUpdates` ;

CREATE TABLE IF NOT EXISTS `SpajalicaDB`.`userStatusUpdates` (
  `iduserStatusUpdates` INT NOT NULL AUTO_INCREMENT,
  `statusMessage` VARCHAR(250) NOT NULL,
  `statusTime` DATETIME(6) NOT NULL,
  `statusLocation` VARCHAR(45) NULL,
  `idloginInfo` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`iduserStatusUpdates`),
  INDEX `fk_userStatusUpdates_loginInfo1_idx` (`idloginInfo` ASC),
  CONSTRAINT `fk_userStatusUpdates_loginInfo1`
    FOREIGN KEY (`idloginInfo`)
    REFERENCES `SpajalicaDB`.`loginInfo` (`idloginInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `SpajalicaDB`;

DELIMITER $$

USE `SpajalicaDB`$$
DROP TRIGGER IF EXISTS `SpajalicaDB`.`loginInfo_AFTER_INSERT` $$
USE `SpajalicaDB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `SpajalicaDB`.`loginInfo_AFTER_INSERT` AFTER INSERT ON `loginInfo` FOR EACH ROW
BEGIN
	insert into usersInfo 
    (idLoginInfo, firstName, lastName, birthDate, joinedDate, sex, location, profilePicture, relationshipStatus) 
    values (NEW.idloginInfo, null, null, null, NOW(), null, null, null, null);
END$$


USE `SpajalicaDB`$$
DROP TRIGGER IF EXISTS `SpajalicaDB`.`userFolows_BEFORE_INSERT` $$
USE `SpajalicaDB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `SpajalicaDB`.`userFolows_BEFORE_INSERT` BEFORE INSERT ON `userFollows` FOR EACH ROW
BEGIN
	IF (new.idFollowed not in (select idloginInfo from loginInfo) or 
		new.idloginInfo = new.idFollowed or
        exists (select idloginInfo, idBlocked 
				from userBlocks 
                where idloginInfo = new.idloginInfo and idBlocked = new.idFollowed
					or idloginInfo = new.idFollowed and idBlocked = new.idloginInfo)
		)
	THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Primalac mora biti postojeci korisnik i neblokiran!';
    END IF;
END$$


USE `SpajalicaDB`$$
DROP TRIGGER IF EXISTS `SpajalicaDB`.`Messages_BEFORE_INSERT` $$
USE `SpajalicaDB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `SpajalicaDB`.`Messages_BEFORE_INSERT` BEFORE INSERT ON `Messages` FOR EACH ROW
BEGIN
	IF (new.idloginInfoReceiver not in (select idloginInfo from loginInfo) or 
		exists (select idloginInfo, idBlocked 
				from userBlocks 
                where idloginInfo = new.idloginInfoSender and idBlocked = new.idloginInfoReceiver
					or idloginInfo = new.idloginInfoReceiver and idBlocked = new.idloginInfoSender) or
		not exists (select idloginInfo, idFollowed 
					from userFollows
                    where idloginInfo = new.idloginInfoSender and idFollowed = new.idloginInfoReceiver) or
		not exists (select idloginInfo, idFollowed 
					from userFollows
                    where idloginInfo = new.idloginInfoReceiver and idFollowed = new.idloginInfoSender))
	THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Primalac mora biti postojeci korisnik koji nije blokiran i zapracen je!';
    END IF;
END$$


USE `SpajalicaDB`$$
DROP TRIGGER IF EXISTS `SpajalicaDB`.`userBlocks_BEFORE_INSERT` $$
USE `SpajalicaDB`$$
CREATE DEFINER = CURRENT_USER TRIGGER `SpajalicaDB`.`userBlocks_BEFORE_INSERT` BEFORE INSERT ON `userBlocks` FOR EACH ROW
BEGIN
	IF (new.idBlocked not in (select idloginInfo from loginInfo) and new.idloginInfo <> new.idBlocked)
	THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Primalac mora biti postojeci korisnik!';
    END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
