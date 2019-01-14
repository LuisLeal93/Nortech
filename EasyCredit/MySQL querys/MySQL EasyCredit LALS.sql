create database if not exists easycredit;

use easycredit;

# // ==================
# // USUARIO
# // ================== 
DROP TABLE IF EXISTS `easycredit`.`usuario`;
CREATE TABLE `easycredit`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `edad` int NOT NULL,
  `tarjetaCredito` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATE NOT NULL DEFAULT 0,
  `updated_at` DATE NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
DROP TRIGGER IF EXISTS `easycredit`.`usuario_BEFORE_INSERT`;
DELIMITER $$
USE `easycredit`$$
CREATE DEFINER = CURRENT_USER TRIGGER `easycredit`.`usuario_BEFORE_INSERT` 
BEFORE INSERT ON `usuario` FOR EACH ROW
BEGIN

SET NEW.created_at = CURDATE();

END$$
DELIMITER ;


# // ==================
# // CONFIGURACION
# // ================== 
  DROP TABLE IF EXISTS `easycredit`.`configuracion`;
  CREATE TABLE `easycredit`.`configuracion` (
  `plazo` INT NOT NULL DEFAULT 3,
  `pInteres` INT NOT NULL DEFAULT 5,
  PRIMARY KEY (`plazo`),
  UNIQUE INDEX `plazo_UNIQUE` (`plazo` ASC) VISIBLE);
  
  
# // ==================
# // CREDITO
# // ================== 
  
  DROP TABLE IF EXISTS `easycredit`.`credito`;
  CREATE TABLE `easycredit`.`credito` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `estado` VARCHAR(50) NOT NULL DEFAULT 'pendiente',
  `plazo` INT NOT NULL DEFAULT 0,
  `monto` DECIMAL(15,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
  ALTER TABLE `easycredit`.`credito` 
ADD INDEX `FK_plazos_idx` (`plazo` ASC) VISIBLE;
ALTER TABLE `easycredit`.`credito` 
ADD CONSTRAINT `FK_plazos`
  FOREIGN KEY (`plazo`)
  REFERENCES `easycredit`.`configuracion` (`plazo`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

# // ==================
# // STORED PROCEDURES, CREDITO
# // ================== 

USE `easycredit`;
DROP procedure IF EXISTS `getAllCredits`;
DELIMITER $$
USE `easycredit`$$
CREATE PROCEDURE `getAllCredits` ()
BEGIN
	select
	u.username, c.estado, c.plazo, c.monto, concat(cf.pInteres,'%') as pInteres,
	round(( (c.monto * pInteres) / 100),2) as interes, round(( monto + (c.monto * pInteres) / 100),2) as Total
	FROM credito as c JOIN usuario as u JOIN configuracion as cf
	ON (c.username = u.username and c.plazo = cf.plazo)
	order by  c.username, c.plazo asc, c.estado asc;
END$$
DELIMITER ;



USE `easycredit`;
DROP procedure IF EXISTS `getCredits`;
DELIMITER $$
USE `easycredit`$$
CREATE PROCEDURE `getCredits` (IN in_username varchar(50))
BEGIN
		SELECT
		c.id, u.username, c.estado, c.plazo, c.monto, concat(cf.pInteres,'%') as pInteres,
		round(( (c.monto * pInteres) / 100),2) as interes, round(( monto + (c.monto * pInteres) / 100),2) as Total
		FROM credito as c JOIN usuario as u JOIN configuracion as cf
		ON (c.username = u.username and c.plazo = cf.plazo and c.username = in_username )
		order by  c.id desc;
END$$
DELIMITER ;


  
# // ==================
# // INSERTS
# // ================== 

insert into usuario (username, edad)
values ('test1', 20);


insert into configuracion
values (3, 5);
insert into configuracion
values (6, 7);
insert into configuracion
values (9, 12);


insert into credito (username, estado, plazo, monto)
values ('test1', 'pendiente' ,3, 1200);
insert into credito (username, estado, plazo, monto)
values ('test1', 'aceptado' ,6, 2500);
insert into credito (username, estado, plazo, monto)
values ('test1', 'rechazado' ,9, 3800);

# select * from usuario;
# select * from credito;
# select * from configuracion;
#  CALL getAllCredits() ;
CALL getCredits('test1');



