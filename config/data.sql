-- phpMyAdmin SQL Dump
-- version 3.4.3.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 29, 2013 at 03:42 PM
-- Server version: 5.5.28
-- PHP Version: 5.3.19

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `hutber`
--

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `url`) VALUES
(1, 'VWsd', 'http://www.vw.com'),
(2, 'Personal', 'http://www.hutber.com'),
(3, 'Bulletboys', 'http://www.bulletboys.co.uk'),
(4, 'Mayfield Athletic FC', 'http://www.mayfieldafc.com'),
(5, 'Nike', 'http://www.nike.com'),
(6, 'RPR', 'http://rpr-recruitment.co.uk/');

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `copy`, `clientId`, `tags`, `url`, `gallery`, `main`, `personal`, `datestart`, `datefinish`) VALUES
(3, 'Bulletboys', 'I loved football, i made a website about it', 2, ',jQuery,CSS3,HTML5,', 'www.bulletboys.co.uk', 0, 0, 1, '2003-01-01', '1970-01-01'),
(13, '3rds.co.uk', 'When I left my boyhood football club Wood Green Old Boys we moved to Mayfield Athletic. It happened that we played for the 3rd team. So I decided to make a dedicated website for this side. \r\n\r\nThis was the first site that I ever used PHP and MySQL. In fact it was the first time I had ever heard of MySQL and PHP. The joy I experience when I saw my first datetime stamp really was magical to me.\r\n\r\nPreviously I had been trying to use access and hosting it on my server that had a storage of 25mb\\''s. Once I managed to get this route working.', 4, ',CSS,HTML,', 'http://www.3rds.co.uk', 0, 0, 1, '2006-01-01', '2007-01-01'),
(14, 'Nike', 'Thegirleffect.com', 5, 'jQuery,CSS3,HTML5,', 'http://www.girleffect.org', 1, 1, 0, '2012-08-01', '2012-11-01'),
(15, 'Rpr-recruitment.co.uk', 'A new start up wanted a crisp, clean but above all easy to use recruitment website.\r\n\r\nI was tasked as the full web developer to write a complete solution for their website. It needed to have a working CMS, to be searchable.', 6, ',PHP,MySQL,jQuery,HTML,CSS,MVC,', 'http://rpr-recruitment.co.uk/', 1, 0, 0, '2009-06-01', '2009-08-01');
