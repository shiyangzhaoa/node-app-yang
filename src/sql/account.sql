CREATE TABLE   IF NOT EXISTS  `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `sex` int(10) DEFAULT NULL,
  `motto` varchar(150) DEFAULT NULL,
  `interest` varchar(150) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8