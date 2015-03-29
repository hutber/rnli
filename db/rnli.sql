-- phpMyAdmin SQL Dump
-- version 4.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 25, 2015 at 03:59 PM
-- Server version: 5.5.36
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `rnli`
--

-- --------------------------------------------------------

--
-- Table structure for table `emails_sent`
--

CREATE TABLE IF NOT EXISTS `emails_sent` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(6) NOT NULL,
  `date` datetime NOT NULL,
  `type` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `emails_sent`
--

INSERT INTO `emails_sent` (`id`, `uid`, `date`, `type`, `address`) VALUES
(24, 0, '2015-02-16 23:35:59', 'Registration', 'jamie@hutber.com'),
(25, 0, '2015-02-16 23:44:27', 'Registration', 'jamie@hutber.com');

-- --------------------------------------------------------

--
-- Table structure for table `members_log`
--

CREATE TABLE IF NOT EXISTS `members_log` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) NOT NULL,
  `logtype` tinyint(1) NOT NULL DEFAULT '1',
  `datelogged` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=116 ;

--
-- Dumping data for table `members_log`
--

INSERT INTO `members_log` (`id`, `uid`, `logtype`, `datelogged`) VALUES
(81, '3', 1, '2015-02-17 22:58:10'),
(82, '3', 1, '2015-02-17 23:04:03'),
(83, '3', 1, '2015-02-17 23:43:55'),
(84, '3', 1, '2015-02-17 23:44:08'),
(85, '3', 1, '2015-02-17 23:58:24'),
(86, '3', 1, '2015-02-17 23:58:24'),
(87, '3', 1, '2015-02-17 23:58:29'),
(88, '3', 1, '2015-02-17 23:58:29'),
(89, '3', 1, '2015-02-17 23:59:02'),
(90, '3', 1, '2015-02-17 23:59:02'),
(91, '3', 1, '2015-02-17 23:59:30'),
(92, '3', 1, '2015-02-17 23:59:30'),
(93, '3', 1, '2015-02-19 23:27:04'),
(94, '3', 1, '2015-02-19 23:38:33'),
(95, '3', 1, '2015-02-19 23:46:03'),
(96, '3', 1, '2015-02-19 23:47:02'),
(97, '3', 1, '2015-02-19 23:48:22'),
(98, '3', 1, '2015-02-19 23:50:05'),
(99, '3', 1, '2015-02-19 23:52:02'),
(100, '3', 1, '2015-02-19 23:53:24'),
(101, '3', 1, '2015-02-19 23:53:55'),
(102, '3', 1, '2015-02-21 20:53:07'),
(103, '3', 1, '2015-02-21 20:53:19'),
(104, '3', 1, '2015-02-21 20:53:37'),
(105, '3', 1, '2015-02-21 20:53:52'),
(106, '3', 1, '2015-02-21 21:28:19'),
(107, '3', 1, '2015-02-21 21:28:40'),
(108, '3', 1, '2015-02-21 21:35:10'),
(109, '3', 1, '2015-02-23 22:29:42'),
(110, '3', 1, '2015-02-23 22:39:51'),
(111, '3', 1, '2015-02-23 22:41:25'),
(112, '3', 1, '2015-02-23 22:44:20'),
(113, '3', 1, '2015-02-23 22:44:53'),
(114, '3', 1, '2015-02-23 22:46:03'),
(115, '3', 1, '2015-02-23 22:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(6) NOT NULL AUTO_INCREMENT,
  `fname` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sname` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pword` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rank` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmed` tinyint(1) unsigned zerofill DEFAULT '0',
  `device` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `version` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `sessionCheck` char(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`),
  KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `fname`, `sname`, `username`, `email`, `pword`, `rank`, `confirmed`, `device`, `version`, `regdate`, `ip`, `sessionCheck`) VALUES
(3, 'Jamie', 'Hutber', 'jamiehutber', 'jamie@hutber.com', 'jadwiga', NULL, 1, 'android', '1.0.0', '2015-02-16 23:44:27', '127.0.0.1', '7dddb7c9f716313d1961f5b6239a5a57'),
(4, 'Jamie', 'Hutber', 'jamiehutber4', 'jamie@hutber.com', 'jadwiga', NULL, 1, 'android', '1.0.0', '2015-02-16 23:52:49', '127.0.0.1', '7dddb7c9f716313d1961f5b6239a5a57'),
(5, 'Jamie', 'Hutber', 'jamiehutber5', 'jamie@hutber.com', 'jadwiga', NULL, 1, 'android', '1.0.0', '2015-02-16 23:53:35', '127.0.0.1', '7dddb7c9f716313d1961f5b6239a5a57'),
(6, 'Jamie', 'Hutber', 'jamiehutber', 'ajamie@hutber.com', 'jadwiga', NULL, 1, 'android', '1.0.0', '2015-02-16 23:55:23', '127.0.0.1', ''),
(7, 'Jamie', 'Hutber', 'jamiehutber', 'jamie@hutber.comw', 'jadwiga', NULL, 1, 'android', '1.0.0', '2015-02-17 19:56:33', '127.0.0.1', ''),
(8, 'Jamie', 'Hutber', 'jamiehutber', '1jamie@hutber.com', 'jadwiga', NULL, 1, 'android', '1.0.0', '2015-02-17 19:58:20', '127.0.0.1', ''),
(9, 'Jamie', 'Hutber', 'jamiehutber', 'jam1ie@hutber.com', 'jadwiga', NULL, 1, 'android', '1.0.0', '2015-02-17 19:59:07', '127.0.0.1', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
