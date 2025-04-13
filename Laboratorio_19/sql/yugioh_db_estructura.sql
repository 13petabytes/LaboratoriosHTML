CREATE DATABASE IF NOT EXISTS yugioh_db;
USE yugioh_db;

-- Tabla jugadores (antes usuarios)
CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Tabla privilegios (con nombres modificados)
CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Tabla roles
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Tabla rol_privilegio
CREATE TABLE `rol_privilegio` (
  `rol_id` int(11) NOT NULL,
  `privilegio_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rol_id`, `privilegio_id`),
  KEY `privilegio_id` (`privilegio_id`),
  FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  FOREIGN KEY (`privilegio_id`) REFERENCES `privilegios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Tabla jugador_rol (antes usuario_rol)
CREATE TABLE `jugador_rol` (
  `jugador_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rol_id`, `jugador_id`),
  KEY `jugador_id` (`jugador_id`),
  FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`),
  FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Tabla duelistas (antes personajes)
CREATE TABLE `duelistas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `imagen` mediumblob DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;


-- Poblar tabla privilegios
INSERT INTO `privilegios` (`id`, `nombre`, `created_at`) VALUES
(1, 'observador', current_timestamp()),
(2, 'creador', current_timestamp());

-- Poblar tabla roles
INSERT INTO `roles` (`id`, `nombre`, `created_at`) VALUES
(1, 'visitante', current_timestamp()),
(2, 'admin', current_timestamp());

-- Relación rol - privilegios
INSERT INTO `rol_privilegio` (`rol_id`, `privilegio_id`, `created_at`) VALUES
(1, 1, current_timestamp()),
(2, 1, current_timestamp()),
(2, 2, current_timestamp());

-- Poblar tabla jugadores
INSERT INTO `jugadores` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'pitu', '120804', current_timestamp()),
(2, 'coco', '1304', current_timestamp());

-- Relación jugadores - roles
INSERT INTO `jugador_rol` (`jugador_id`, `rol_id`, `created_at`) VALUES
(1, 2, current_timestamp()), -- pitu → admin
(2, 1, current_timestamp()); -- coco → visitante

-- Poblar tabla duelistas con 3 personajes de cada serie
INSERT INTO `duelistas` (`nombre`, `created_at`) VALUES
-- Yu-Gi-Oh!
('Yugi Muto', current_timestamp()),
('Seto Kaiba', current_timestamp()),
('Joey Wheeler', current_timestamp()),
-- GX
('Jaden Yuki', current_timestamp()),
('Chazz Princeton', current_timestamp()),
('Alexis Rhodes', current_timestamp()),
-- 5D\'s
('Yusei Fudo', current_timestamp()),
('Jack Atlas', current_timestamp()),
('Akiza Izinski', current_timestamp()),
-- ZEXAL
('Yuma Tsukumo', current_timestamp()),
('Reginald Kastle', current_timestamp()),
('Kite Tenjo', current_timestamp()),
-- ARC-V
('Yuya Sakaki', current_timestamp()),
('Yuto', current_timestamp()),
('Declan Akaba', current_timestamp());
