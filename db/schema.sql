DROP DATABASE IF EXISTS companysEmployee;
-- Create Database
CREATE DATABASE IF NOT EXISTS companysEmployee;

-- Show list of databases
SHOW DATABASES;

-- Select which database to use for query
USE companysEmployee;

-- Create table Department
CREATE TABLE  Department
(
did INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
-- Create table Department primary key
CONSTRAINT Department_PK PRIMARY KEY (did)
);

-- Create table Role
CREATE TABLE  Role
(
rid INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(9,2),
did_FK INT NOT NULL,
-- Create table Role primary key
CONSTRAINT Role_PK PRIMARY KEY (rid),
-- Create table Role foreign key reference back to Department Table
CONSTRAINT Role_FK FOREIGN KEY (did_FK) REFERENCES Department(did)
);

-- Create table Employee
CREATE TABLE  Employee
(
eid INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
rid_FK INT NOT NULL,
mid INT,


-- Create table Employee primary key
CONSTRAINT Employee_PK PRIMARY KEY (eid),
-- Create table Employee foreign key reference back to Role Table
CONSTRAINT Employee_FK1 FOREIGN KEY (rid_FK) REFERENCES Role(rid),
CONSTRAINT Employee_FK2 FOREIGN KEY (mid) REFERENCES Role(rid)
);

SELECT * FROM Employee;
SELECT * FROM Role;
SELECT * FROM Department;