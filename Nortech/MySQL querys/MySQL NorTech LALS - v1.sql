drop database nortech_lals;
create database if not exists nortech_lals;

use nortech_lals;

# // ==================
# // CREAR USUARIO PARA CONEXION
# // ================== 

CREATE USER IF NOT EXISTS 'NorTech_LALS'@'localhost' identified by '123456';
grant all privileges on nortech_lals.* to 'NorTech_LALS'@'localhost';
ALTER USER IF EXISTS 'NorTech_LALS'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;

# // ==================
# // CONFIGURACION
# // ================== 
DROP TABLE IF EXISTS `nortech_lals`.`config`;
CREATE TABLE `nortech_lals`.`config` (
  `ciudad` VARCHAR(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  PRIMARY KEY (`ciudad`),
  UNIQUE INDEX `ciudad_UNIQUE` (`ciudad` ASC) VISIBLE);
  -- tipos validos ? : natacion, carrera, bicicleta
  

# // ==================
# // USUARIO
# // ================== 
DROP TABLE IF EXISTS `nortech_lals`.`usuario`;
CREATE TABLE `nortech_lals`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `password` VARCHAR(70) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `edad` int NOT NULL,
  `imagen` MEDIUMBLOB,
  `created_at` DATE NOT NULL DEFAULT 0,
  `updated_at` DATE NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
DROP TRIGGER IF EXISTS `nortech_lals`.`usuario_BEFORE_INSERT`;
DELIMITER $$
USE `nortech_lals`$$
CREATE DEFINER = CURRENT_USER TRIGGER `nortech_lals`.`usuario_BEFORE_INSERT` 
BEFORE INSERT ON `usuario` FOR EACH ROW
BEGIN

SET NEW.created_at = CURDATE();

END$$
DELIMITER ;


# // ==================
# // COMPETENCIA
# // ================== 
  DROP TABLE IF EXISTS `nortech_lals`.`competencia`;
  CREATE TABLE `nortech_lals`.`competencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `ciudad` VARCHAR(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `ubicacion` VARCHAR(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `fecha` DATETIME NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`ciudad`) REFERENCES `nortech_lals`.`config` (`ciudad`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nmcdfch_UNIQUE` (`name` ASC, `ciudad` ASC, `fecha` ASC ) VISIBLE);

  
# // ==================
# // GRUPO COMPETENCIA
# // ================== 
  
	DROP TABLE IF EXISTS `nortech_lals`.`grupoCompetencia`;
  CREATE TABLE `nortech_lals`.`grupoCompetencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_competencia` INT NOT NULL,
  `username` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `lugar` VARCHAR(10) NOT NULL DEFAULT 'OH', -- 1er lugar
  PRIMARY KEY (`id`),
  FOREIGN KEY(`id_competencia`) REFERENCES `nortech_lals`.`competencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(`username`) REFERENCES `nortech_lals`.`usuario` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE INDEX `userComp_UNIQUE` (id_competencia ASC, username ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  

# // ==================
# // STORED PROCEDURES
# // ================== 

-- Obtiene las competencias y el total de competidores registrados
USE `nortech_lals`;
DROP procedure IF EXISTS `getCompetencias`;
DELIMITER $$
USE `nortech_lals`$$
CREATE PROCEDURE `getCompetencias`()
BEGIN
    SELECT
	c.id, c.name, c.ciudad, c.ubicacion, c.fecha, 
		COUNT( DISTINCT gc.username) as num_competidores
		FROM competencia as c LEFT JOIN grupoCompetencia as gc
		ON (c.id = gc.id_competencia)
    GROUP BY c.name, c.ciudad, c.fecha
	order by  c.fecha asc, c.ciudad asc, c.name asc;
END$$
DELIMITER ;

-- Obtiene las competencias y el total de competidores registrados de x ciudad
USE `nortech_lals`;
DROP procedure IF EXISTS `getCompetenciasCiudad`;
DELIMITER $$
USE `nortech_lals`$$
CREATE PROCEDURE `getCompetenciasCiudad`(IN in_ciudad VARCHAR(20))
BEGIN
    SELECT
	c.id, c.name, c.ciudad, c.ubicacion, c.fecha, 
		COUNT( DISTINCT gc.username) as num_competidores
		FROM competencia as c LEFT JOIN grupoCompetencia as gc
		ON (c.id = gc.id_competencia)
		WHERE c.ciudad = in_ciudad
    GROUP BY c.name, c.ciudad, c.fecha
	order by  c.fecha asc, c.ciudad asc, c.name asc;
END$$
DELIMITER ;

-- Obtener las competencias en el que un usuario se ha registrado
USE `nortech_lals`;
DROP procedure IF EXISTS `getCompetenciaPersonal`;
DELIMITER $$
USE `nortech_lals`$$
CREATE PROCEDURE `getCompetenciaPersonal` (IN in_username varchar(50))
BEGIN
		SELECT gc.id_competencia, gc.username, c.name, c.ciudad, c.ubicacion, c.fecha, gc.lugar
		FROM competencia as c JOIN grupoCompetencia as gc
		ON (c.id = gc.id_competencia)
        WHERE gc.username = in_username
    GROUP BY gc.username, c.name, c.ciudad, c.fecha
	order by  c.fecha asc, c.ciudad asc, c.name asc;
END$$
DELIMITER ;

-- Obtener los competidores de una competencia
USE `nortech_lals`;
DROP procedure IF EXISTS `getCompetenciaUsuarios`;
DELIMITER $$
USE `nortech_lals`$$
CREATE PROCEDURE `getCompetenciaUsuarios` (IN inid_competencia int)
BEGIN
		SELECT gc.id_competencia, gc.username, c.name, c.ciudad, c.ubicacion, c.fecha, gc.lugar
		FROM competencia as c JOIN grupoCompetencia as gc
		ON (c.id = gc.id_competencia)
        WHERE gc.id_competencia = inid_competencia
    GROUP BY gc.username, c.name, c.ciudad, c.fecha
	order by  c.fecha asc, c.ciudad asc, c.name asc;
END$$
DELIMITER ;


  
# // ==================
# // INSERTS
# // ================== 

insert into config values ('Culiacan');
insert into config values ('Mazatlan');
insert into config values ('Guasave');

insert into usuario (username, edad, password)
values ('test1', 20, '123456');
insert into usuario (username, edad, password)
values ('test2', 18, '123456');
insert into usuario (username, edad, password)
values ('test3', 22, '123456');

-- error ignore
insert ignore into competencia (name, ciudad, ubicacion, fecha)
values ('CAMINATA DEPORTIVA 1', 'invalido', 'Parque constitucion', '2019-01-14 10:30:00');

insert into competencia (name, ciudad, ubicacion, fecha)
values ('CAMINATA DEPORTIVA 1', 'Culiacan', 'Parque constitucion', '2019-01-14 10:30:00');
insert into competencia (name, ciudad, ubicacion, fecha)
values ('CAMINATA DEPORTIVA 2', 'Mazatlan', 'Zona dorada', '2019-01-14 10:30:00');

insert into competencia (name, ciudad, ubicacion, fecha)
values ('CARRERA DE BICICLETAS 1', 'Culiacan', 'Antigua Catedral Basílica', '2019-02-05 09:00:00');
insert into competencia (name, ciudad, ubicacion, fecha)
values ('CARRERA DE BICICLETAS 2', 'Mazatlan', 'Zona dorada', '2019-02-05 09:00:00');

insert into competencia (name, ciudad, ubicacion, fecha)
values ('CAMINATA DEPORTIVA 1', 'Culiacan', 'Parque constitucion', '2019-01-14 11:30:00');


INSERT INTO grupoCompetencia(id_competencia, username)
VALUES (2, 'test1');
INSERT INTO grupoCompetencia(id_competencia, username)
VALUES (2, 'test2');
INSERT INTO grupoCompetencia(id_competencia, username)
VALUES (5, 'test2');
INSERT INTO grupoCompetencia(id_competencia, username)
VALUES (6, 'test1');



select * from config;
select * from usuario;
select * from competencia;
select * from grupoCompetencia;


CALL getCompetencias();
CALL getCompetenciasCiudad('mazatlan');
CALL getCompetenciaPersonal('test2');
CALL getCompetenciaUsuarios(2);



