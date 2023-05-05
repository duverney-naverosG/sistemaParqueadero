-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2023 a las 02:44:41
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `parqueadero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(240) NOT NULL,
  `apellidos` varchar(240) NOT NULL,
  `cedula` bigint(14) NOT NULL,
  `telefono` bigint(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `apellidos`, `cedula`, `telefono`) VALUES
(1, 'duverney', 'gonzalez naveros', 1007682071, 3124236991),
(2, 'duverney', 'naveros gonzalez', 12345, 320929599),
(3, 'etelvina', 'gonzalez ramirez', 26460272, 3209295991);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id` int(20) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fechaSalida` timestamp NULL DEFAULT NULL,
  `valor` int(11) DEFAULT 0,
  `tiempo` varchar(25) DEFAULT '0',
  `id_vehiculo` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id`, `fecha`, `fechaSalida`, `valor`, `tiempo`, `id_vehiculo`, `id_cliente`) VALUES
(3, '2023-03-29 03:12:09', '2023-04-01 05:07:30', 15000, '3 dias/ 1 horas /0 minuto', 1, 2),
(4, '2023-03-29 03:16:02', NULL, 0, '0', 1, 1),
(6, '2023-03-29 03:23:18', NULL, 0, '0', 1, 1),
(7, '2023-03-30 21:50:04', NULL, 0, '0', 2, 3),
(8, '2023-03-30 22:15:59', NULL, 0, '0', 1, 2),
(9, '2023-03-30 23:26:37', NULL, 0, '0', 2, 3),
(10, '2023-03-31 05:15:30', NULL, 0, '0', 2, 3),
(11, '2023-03-31 14:17:14', NULL, 0, '0', 12, 1),
(12, '2023-03-31 15:29:00', NULL, 0, '0', 12, 3),
(13, '2023-03-31 16:20:55', NULL, 0, '0', 1, 2),
(14, '2023-03-31 17:07:03', NULL, 0, '0', 2, 2),
(15, '2023-04-01 03:08:57', NULL, 0, '0', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifas`
--

CREATE TABLE `tarifas` (
  `id` int(11) NOT NULL,
  `tipoVehiculo` int(11) NOT NULL,
  `primero` int(11) NOT NULL,
  `segundo` int(11) NOT NULL,
  `tercero` int(11) NOT NULL,
  `cuarto` int(11) NOT NULL,
  `quinto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tarifas`
--

INSERT INTO `tarifas` (`id`, `tipoVehiculo`, `primero`, `segundo`, `tercero`, `cuarto`, `quinto`) VALUES
(1, 1, 500, 900, 4000, 5000, 44000),
(2, 2, 600, 1100, 4200, 7000, 50000),
(3, 1, 900, 1000, 2000, 2200, 60000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipovehiculo`
--

CREATE TABLE `tipovehiculo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipovehiculo`
--

INSERT INTO `tipovehiculo` (`id`, `nombre`) VALUES
(1, 'moto'),
(2, 'carro particular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id` int(11) NOT NULL,
  `placa` varchar(30) NOT NULL,
  `modelo` int(10) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `tipoVehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id`, `placa`, `modelo`, `marca`, `tipoVehiculo`) VALUES
(1, 'OQL85E', 2018, 'victory', 1),
(2, 'OQL856', 2018, 'auteco', 1),
(12, 'ABC23Y', 2022, 'victory', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipovehiculo`
--
ALTER TABLE `tipovehiculo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipovehiculo`
--
ALTER TABLE `tipovehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;
