-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2023 a las 17:31:22
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `apellidos`, `cedula`, `telefono`) VALUES
(13, 'leanne ', 'brte graham', 77073680, 392659390),
(14, 'clementine', 'brauch jacobson', 4631235447, 3491709223),
(15, 'katerine patricia', 'lebsack', 4931709623, 954129833);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id` int(20) NOT NULL,
  `fecha` timestamp NULL DEFAULT NULL,
  `fechaSalida` timestamp NULL DEFAULT NULL,
  `valor` int(11) DEFAULT 0,
  `tiempo` varchar(25) DEFAULT '0',
  `id_vehiculo` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id`, `fecha`, `fechaSalida`, `valor`, `tiempo`, `id_vehiculo`, `id_cliente`) VALUES
(1, '2023-05-05 05:23:42', NULL, 0, '0', 24, 13),
(2, '2023-05-05 05:31:50', '2023-05-05 05:47:38', 500, '15 minutos', 25, 14),
(3, '2023-05-05 03:37:38', '2023-05-05 05:46:40', 8000, '2 hora/s', 26, 15),
(4, '2023-05-05 05:39:48', '2023-05-05 14:45:08', 7000, '9 hora/s', 28, 14),
(5, '2023-05-05 14:46:17', '2023-05-05 15:28:13', 1100, '41 minutos', 27, 15),
(6, '2023-05-05 15:12:36', NULL, 0, '0', 28, 14);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarifas`
--

INSERT INTO `tarifas` (`id`, `tipoVehiculo`, `primero`, `segundo`, `tercero`, `cuarto`, `quinto`) VALUES
(1, 1, 500, 900, 4000, 5000, 44000),
(2, 2, 600, 1100, 4200, 7000, 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipovehiculo`
--

CREATE TABLE `tipovehiculo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id`, `placa`, `modelo`, `marca`, `tipoVehiculo`) VALUES
(24, 'ABC-12A', 2018, 'chevrolet', 1),
(25, 'DEF-45F', 2020, 'auteco', 1),
(26, 'GHI-78E', 2021, 'pulsar', 1),
(27, 'ZYT-678', 2019, 'chevrolet', 2),
(28, 'PPS-231', 2022, 'renahul', 2);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `tarifas_FK` (`tipoVehiculo`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipovehiculo`
--
ALTER TABLE `tipovehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tarifas`
--
ALTER TABLE `tarifas`
  ADD CONSTRAINT `tarifas_FK` FOREIGN KEY (`tipoVehiculo`) REFERENCES `tipovehiculo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
