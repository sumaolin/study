--
-- ��SQLiteStudio v3.2.1 �������ļ� ���� ���� 10 12:16:21 2020
--
-- �ı����룺System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- ��todo
CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, todo_folder_id REFERENCES todo_folder (id) NOT NULL, text TEXT NOT NULL, completed BOOLEAN DEFAULT (false), created_at TIME, updated_at TIME);

-- ��todo_folder
CREATE TABLE todo_folder (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, user_id REFERENCES user (id) NOT NULL, title TEXT NOT NULL);

-- ��user
CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR (255) UNIQUE NOT NULL, email VARCHAR (40) UNIQUE NOT NULL, password VARCHAR (255) NOT NULL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
