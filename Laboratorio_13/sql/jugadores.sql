-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-03-2025 a las 16:44:00
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Base de datos: `yugioh_db`
-- --------------------------------------------------------

-- Crear base de datos yugioh_db
CREATE DATABASE IF NOT EXISTS `yugioh_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci;
USE `yugioh_db`;

-- Crear tabla `jugadores`
CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `contrasenia` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Añadir clave primaria y establecer auto_increment
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Insertar ejemplo de jugador
INSERT INTO `jugadores` (`nombre`, `contrasenia`) VALUES
('petabytes', '120804');

-- Finalizar la transacción
COMMIT;
