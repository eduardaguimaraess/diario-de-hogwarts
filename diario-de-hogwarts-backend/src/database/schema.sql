CREATE DATABASE IF NOT EXISTS diario_hogwarts
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE diario_hogwarts;

CREATE TABLE IF NOT EXISTS schedule (
  id VARCHAR(30) PRIMARY KEY,
  subject VARCHAR(100) NOT NULL,
  professor VARCHAR(100) NOT NULL,
  classroom VARCHAR(100) NOT NULL,
  time VARCHAR(30) NOT NULL,
  dayOfWeek VARCHAR(30) NOT NULL
);