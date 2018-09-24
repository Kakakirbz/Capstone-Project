-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2018 at 01:29 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `steamclouddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `activity_title` text NOT NULL,
  `activity_content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activity_id`, `post_id`, `activity_title`, `activity_content`) VALUES
(1, 1, 'Hello world', 'asdasdasdasd');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `bookId` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `ISBN` varchar(64) NOT NULL,
  `edition` int(11) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ched`
--

CREATE TABLE `ched` (
  `adminId` int(11) NOT NULL,
  `fname` varchar(64) NOT NULL,
  `lname` varchar(64) NOT NULL,
  `mname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ched`
--

INSERT INTO `ched` (`adminId`, `fname`, `lname`, `mname`, `email`, `password`) VALUES
(1, 'Ched', 'Admin', 'The', 'chedadmin@ched.gov.ph', 'chedadmin');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `chairmanId` int(11) DEFAULT NULL,
  `departmentName` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departmentId`, `schoolId`, `chairmanId`, `departmentName`) VALUES
(1, 1, NULL, 'Department of Computer and Information Sciences');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `facultyId` int(11) NOT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `schoolId` int(11) DEFAULT NULL,
  `institutionId` int(11) DEFAULT NULL,
  `fname` varchar(64) NOT NULL,
  `lname` varchar(64) NOT NULL,
  `mname` varchar(64) NOT NULL,
  `position` varchar(64) NOT NULL,
  `educationalAttainment` enum('associate','bachelor','master','doctorate') NOT NULL,
  `yearGraduated` int(11) NOT NULL,
  `schoolGraduated` varchar(128) NOT NULL,
  `gender` enum('m','f') NOT NULL,
  `dateOfBirth` date NOT NULL,
  `facultyType` enum('full-time','part-time') NOT NULL,
  `specialization` varchar(64) NOT NULL,
  `dateHired` date NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `accessLevel` enum('0','1','2','3') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`facultyId`, `departmentId`, `schoolId`, `institutionId`, `fname`, `lname`, `mname`, `position`, `educationalAttainment`, `yearGraduated`, `schoolGraduated`, `gender`, `dateOfBirth`, `facultyType`, `specialization`, `dateHired`, `email`, `password`, `accessLevel`) VALUES
(1, NULL, NULL, 1, 'Admin', 'Admin', 'Admin', 'Admin', 'doctorate', 2000, 'Admin', 'm', '2018-06-30', 'full-time', 'Education', '2018-06-30', 'admin@admin.com', 'admin', '1'),
(2, 1, 1, 1, 'Kris', 'Capao', 'A.', 'Instructor', 'bachelor', 2006, 'Cebu Normal University', 'm', '2018-07-10', 'full-time', 'Data Analytics', '2018-07-10', 'kacapao@usc.edu.ph', '1234', '3');

-- --------------------------------------------------------

--
-- Table structure for table `faculty_book`
--

CREATE TABLE `faculty_book` (
  `facultyId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_journal`
--

CREATE TABLE `faculty_journal` (
  `facultyId` int(11) NOT NULL,
  `journalId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_research`
--

CREATE TABLE `faculty_research` (
  `facultyId` int(11) NOT NULL,
  `researchId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `file_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filetype` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`file_id`, `post_id`, `filename`, `filetype`) VALUES
(1, 1, '1537830522297 - 30579ca48f21b99.jpg', 'image/jpeg'),
(2, 1, '1537830522297 - 41482760_1177355722625196_2156220775416201216_n.png', 'image/png'),
(3, 1, '1537830522315 - capture.png', 'image/png'),
(4, 1, '1537830522316 - eb6ca8a6672e1d4a7425689084c58f79.jpg', 'image/jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `institution`
--

CREATE TABLE `institution` (
  `institutionId` int(11) NOT NULL,
  `directorId` int(11) DEFAULT NULL,
  `institutionName` varchar(128) NOT NULL,
  `address` varchar(128) NOT NULL,
  `region` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `institution`
--

INSERT INTO `institution` (`institutionId`, `directorId`, `institutionName`, `address`, `region`) VALUES
(1, NULL, 'University of San Carlos', 'P. del Rosario Street, Cebu City Philippines 6000', 'visayas'),
(3, NULL, 'Cebu Doctor\'s University', '1 Dr. P.V. Larrazabal Jr. Avenue, North Reclamation, Mandaue City, Cebu, Philippines', 'visayas');

-- --------------------------------------------------------

--
-- Table structure for table `journal`
--

CREATE TABLE `journal` (
  `journalId` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `link` varchar(256) NOT NULL,
  `year` int(11) NOT NULL,
  `volume` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `share` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `faculty_id`, `title`, `description`, `share`) VALUES
(1, 1, 'Ischemic Heart Disease', 'blah blah blah blah', 1);

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `programId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `programdata`
--

CREATE TABLE `programdata` (
  `programId` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `availability` enum('Offered','Not Offered','','') NOT NULL,
  `population` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reference`
--

CREATE TABLE `reference` (
  `reference_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `reference` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reference`
--

INSERT INTO `reference` (`reference_id`, `post_id`, `reference`) VALUES
(1, 1, 'asdasdasdasd');

-- --------------------------------------------------------

--
-- Table structure for table `research`
--

CREATE TABLE `research` (
  `researchId` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `status` enum('on-going','completed') NOT NULL,
  `collaborations` varchar(256) NOT NULL,
  `description` varchar(256) NOT NULL,
  `co-researchers` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `schoolId` int(11) NOT NULL,
  `institutionId` int(11) NOT NULL,
  `deanId` int(11) DEFAULT NULL,
  `schoolName` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`schoolId`, `institutionId`, `deanId`, `schoolName`) VALUES
(1, 1, NULL, 'School of Arts and Sciences'),
(2, 1, NULL, 'School of Engineering'),
(3, 1, NULL, 'School of Business and Economics');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `studentId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  `programId` int(11) NOT NULL,
  `fname` varchar(64) NOT NULL,
  `lname` varchar(64) NOT NULL,
  `mname` varchar(64) NOT NULL,
  `yearLevel` enum('1','2','3','4','5') NOT NULL,
  `gender` enum('m','f') NOT NULL,
  `dateOfBirth` date NOT NULL,
  `status` enum('regular','probationary') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `studentdata`
--

CREATE TABLE `studentdata` (
  `departmentId` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `enrollees` int(11) NOT NULL,
  `graduated` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student_thesis`
--

CREATE TABLE `student_thesis` (
  `studentId` int(11) NOT NULL,
  `thesisId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `thesis`
--

CREATE TABLE `thesis` (
  `thesisId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `facultyId` int(11) NOT NULL,
  `dateDefended` date NOT NULL,
  `publicationStatus` enum('published','not published') NOT NULL,
  `topic` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `video_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `video_title` text NOT NULL,
  `filename` text NOT NULL,
  `filetype` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`video_id`, `post_id`, `video_title`, `filename`, `filetype`) VALUES
(1, 1, 'undefined', '1537830565333 - 1.3 acute myocardial infarction & post-mi timeline.mp4', 'video/mp4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`bookId`);

--
-- Indexes for table `ched`
--
ALTER TABLE `ched`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departmentId`),
  ADD KEY `schoolId` (`schoolId`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`facultyId`),
  ADD KEY `departmentId` (`departmentId`),
  ADD KEY `departmentId_2` (`departmentId`),
  ADD KEY `departmentId_3` (`departmentId`),
  ADD KEY `departmentId_4` (`departmentId`),
  ADD KEY `schoolId` (`schoolId`),
  ADD KEY `institutionId` (`institutionId`);

--
-- Indexes for table `faculty_book`
--
ALTER TABLE `faculty_book`
  ADD KEY `facultyId` (`facultyId`),
  ADD KEY `bookId` (`bookId`);

--
-- Indexes for table `faculty_journal`
--
ALTER TABLE `faculty_journal`
  ADD KEY `facultyId` (`facultyId`),
  ADD KEY `journalId` (`journalId`);

--
-- Indexes for table `faculty_research`
--
ALTER TABLE `faculty_research`
  ADD KEY `facultyId` (`facultyId`),
  ADD KEY `researchId` (`researchId`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `institution`
--
ALTER TABLE `institution`
  ADD PRIMARY KEY (`institutionId`);

--
-- Indexes for table `journal`
--
ALTER TABLE `journal`
  ADD PRIMARY KEY (`journalId`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`programId`),
  ADD KEY `departmentId` (`departmentId`);

--
-- Indexes for table `programdata`
--
ALTER TABLE `programdata`
  ADD KEY `programId` (`programId`),
  ADD KEY `programId_2` (`programId`);

--
-- Indexes for table `reference`
--
ALTER TABLE `reference`
  ADD PRIMARY KEY (`reference_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `research`
--
ALTER TABLE `research`
  ADD PRIMARY KEY (`researchId`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`schoolId`),
  ADD KEY `institutionId` (`institutionId`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`studentId`),
  ADD KEY `departmentId` (`departmentId`),
  ADD KEY `programId` (`programId`);

--
-- Indexes for table `studentdata`
--
ALTER TABLE `studentdata`
  ADD KEY `departmentId` (`departmentId`);

--
-- Indexes for table `student_thesis`
--
ALTER TABLE `student_thesis`
  ADD KEY `studentId` (`studentId`),
  ADD KEY `thesisId` (`thesisId`);

--
-- Indexes for table `thesis`
--
ALTER TABLE `thesis`
  ADD PRIMARY KEY (`thesisId`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `facultyId` (`facultyId`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`video_id`),
  ADD KEY `post_id` (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `bookId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ched`
--
ALTER TABLE `ched`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `institution`
--
ALTER TABLE `institution`
  MODIFY `institutionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `journal`
--
ALTER TABLE `journal`
  MODIFY `journalId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `programId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reference`
--
ALTER TABLE `reference`
  MODIFY `reference_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `research`
--
ALTER TABLE `research`
  MODIFY `researchId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `schoolId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `studentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thesis`
--
ALTER TABLE `thesis`
  MODIFY `thesisId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE;

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolId`);

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`),
  ADD CONSTRAINT `faculty_ibfk_2` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolId`),
  ADD CONSTRAINT `faculty_ibfk_3` FOREIGN KEY (`institutionId`) REFERENCES `institution` (`institutionId`);

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `file_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`facultyId`);

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`);

--
-- Constraints for table `programdata`
--
ALTER TABLE `programdata`
  ADD CONSTRAINT `programdata_ibfk_1` FOREIGN KEY (`programId`) REFERENCES `program` (`programId`);

--
-- Constraints for table `reference`
--
ALTER TABLE `reference`
  ADD CONSTRAINT `reference_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE;

--
-- Constraints for table `school`
--
ALTER TABLE `school`
  ADD CONSTRAINT `school_ibfk_1` FOREIGN KEY (`institutionId`) REFERENCES `institution` (`institutionId`);

--
-- Constraints for table `studentdata`
--
ALTER TABLE `studentdata`
  ADD CONSTRAINT `studentdata_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`);

--
-- Constraints for table `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
