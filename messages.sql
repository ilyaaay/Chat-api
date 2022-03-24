CREATE DATABASE IF NOT EXISTS Chat;

USE Chat;

CREATE TABLE IF NOT EXISTS messages
(
    fromUserId INT(11),
    toUserId INT(11),
    message VARCHAR(255),
    createdAt DATETIME)
)
