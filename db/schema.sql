-- phpMyAdmin SQL Dump
-- version 4.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 02, 2015 at 12:17 AM
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

DROP TABLE IF EXISTS `emails_sent`;
CREATE TABLE IF NOT EXISTS `emails_sent` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(6) NOT NULL,
  `date` datetime NOT NULL,
  `type` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- Table structure for table `members_log`
--

DROP TABLE IF EXISTS `members_log`;
CREATE TABLE IF NOT EXISTS `members_log` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) NOT NULL,
  `logtype` tinyint(1) NOT NULL DEFAULT '1',
  `datelogged` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=117 ;

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
CREATE TABLE IF NOT EXISTS `sites` (
  `id` int(7) NOT NULL,
  `elevation` int(11) NOT NULL,
  `latitude` decimal(18,5) NOT NULL,
  `longitude` decimal(18,5) NOT NULL,
  `name` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `unitaryAuthArea` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
