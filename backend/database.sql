-- SQL schema for the school management system

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(255) NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  occupation VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NULL,
  avatarURL VARCHAR(255) NULL,
  teacherId CHAR(36) NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  warningsAmount INT DEFAULT 0,
  CONSTRAINT fk_users_teacher FOREIGN KEY (teacherId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS subjects (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(255) NULL,
  name VARCHAR(255) NOT NULL,
  teacherId CHAR(36) NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_subjects_teacher FOREIGN KEY (teacherId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS grades (
  id CHAR(36) PRIMARY KEY,
  studentId CHAR(36) NULL,
  subjectId CHAR(36) NULL,
  firstGrade FLOAT DEFAULT 0,
  secondGrade FLOAT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_grades_student FOREIGN KEY (studentId) REFERENCES users(id),
  CONSTRAINT fk_grades_subject FOREIGN KEY (subjectId) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS warnings (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(255) NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL,
  studentId CHAR(36) NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_warnings_student FOREIGN KEY (studentId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_tokens (
  id CHAR(36) PRIMARY KEY,
  userId CHAR(36) NOT NULL,
  refreshToken VARCHAR(255) NOT NULL,
  expiresDate DATETIME NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_tokens_user FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS subjects_students (
  subjectId CHAR(36) NOT NULL,
  userId CHAR(36) NOT NULL,
  PRIMARY KEY (subjectId, userId),
  CONSTRAINT fk_subjects_students_subject FOREIGN KEY (subjectId) REFERENCES subjects(id),
  CONSTRAINT fk_subjects_students_user FOREIGN KEY (userId) REFERENCES users(id)
);
